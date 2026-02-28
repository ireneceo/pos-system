"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.input`
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
`,s=n.Ay.select`
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
`,l=e=>{let{children:t,className:r,style:n,...a}=e;return(0,i.jsx)(o,{className:r,style:n,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=n.Ay.a`
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
`,d=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=n.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=n.Ay.a`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,i.jsx)(x,{children:r.map((e,t)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,i.jsx)(s,{children:n.map((e,t)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>S});var n=r(9950),i=r(4752),o=r(4185),a=r(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=i.Ay.h4`
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
`,c=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  flex: 1;
  min-width: 0;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,g=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=i.Ay.p`
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
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=i.Ay.textarea`
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
`,w=i.Ay.div`
  display: flex;
  gap: 4px;
`,A=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=i.Ay.button`
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
`,k=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,_=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,B=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,z=i.Ay.input`
  display: none;
`,S=e=>{let{entityType:t,entityId:r,currentUserId:i,onMarkRead:S}=e;const[D,$]=(0,n.useState)([]),[N,T]=(0,n.useState)(""),[I,O]=(0,n.useState)([]),[U,L]=(0,n.useState)(!1),[M,P]=(0,n.useState)(!1),R=(0,n.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&$(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),S&&S()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const W=async()=>{const e=N.trim(),n=I.length>0;if((e||n)&&!M){P(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:N.trim(),attachments:n?I:void 0})})).ok&&(T(""),O([]),J())}catch(i){console.error("Error adding comment:",i)}finally{P(!1)}}},Y=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var t,r,n;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(m,{children:Y(e.createdAt)}),i&&e.author_id===i&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&J()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(v,{value:N,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),W())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(A,{onClick:()=>{var e;return null===(e=R.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:W,disabled:!N.trim()&&0===I.length||M,children:"Send"})]})]}),(I.length>0||U)&&(0,a.jsxs)(E,{children:[U&&(0,a.jsx)(B,{children:"Uploading..."}),I.map((e,t)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(_,{onClick:()=>(e=>{const t=I[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),O(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(z,{ref:R,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-I.length,n=Array.from(t).slice(0,r);if(0!==n.length){L(!0);try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await r.json();i.success&&i.data&&O(e=>[...e,...i.data])}catch(i){console.error("File upload error:",i)}finally{L(!1)}}}})]})}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>te});var n=r(9950),i=r(4752),o=r(1367),a=r(3832),s=r(5665),l=r(2488),d=r(7455),c=r(4185),p=r(4302),x=r(4414);const h=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,g=i.Ay.button`
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
`,u=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,b=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,j=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,v=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,A=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,F=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,k=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,C=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,_=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,B=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,z=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,S=i.Ay.div`
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
`,D=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,$=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,T=i.Ay.button`
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
`,I=i.Ay.div`
  padding: 24px;
`,O=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=i.Ay.div`
  margin-bottom: 20px;
`,L=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=i.Ay.input`
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
`,P=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,R=i.Ay.select`
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
`,J=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,Y=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,K=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,Q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,X=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,Z=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,q=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,G=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,H=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,V=i.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,te=()=>{var e,t,r;const{user:i}=(0,o.As)(),[te,re]=(0,n.useState)("received"),[ne,ie]=(0,n.useState)([]),[oe,ae]=(0,n.useState)([]),[se,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)(""),[he,ge]=(0,n.useState)(!1),[ue,me]=(0,n.useState)(!1),[fe,ye]=(0,n.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),[be,je]=(0,n.useState)(!1),[ve,we]=(0,n.useState)([]),[Ae,Fe]=(0,n.useState)(!1),[ke,Ee]=(0,n.useState)(null),[Ce,_e]=(0,n.useState)({}),Be=(0,n.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),ze=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),_e(e=>({...e,...t}))}}}catch(t){}},Se=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Be()});if(e.ok){const t=await e.json();le(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[Be]),De=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Be()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];ie(n),ze(n)}}catch(e){console.error("Error fetching received notices:",e)}},[Be]),$e=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Be()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];ae(n),ze(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[Be]),Ne=(0,n.useCallback)(async()=>{ge(!0),await Promise.all([Se(),De(),$e()]),ge(!1)},[Se,De,$e]);(0,n.useEffect)(()=>{i&&Ne()},[i,Ne]);const Te=async e=>{Ee(e),Fe(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:Be()});if(t.ok){const e=await t.json(),r=e.data||e;Ee(r),De()}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Ie=("received"===te?ne:oe).filter(e=>{const t=!de||e.title.toLowerCase().includes(de.toLowerCase())||e.content.toLowerCase().includes(de.toLowerCase()),r=!pe||e.priority===pe;return t&&r}),Oe=ne.length,Ue=ne.filter(e=>!e.read_at).length,Le=ne.filter(e=>"important"===e.priority).length,Me=ne.filter(e=>"urgent"===e.priority).length,Pe=oe.length,Re=oe.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Je=oe.filter(e=>"important"===e.priority).length,We=oe.filter(e=>"urgent"===e.priority).length,Ye=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Ke=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Qe=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,x.jsxs)(a.mc,{children:[(0,x.jsxs)(a.Y9,{children:[(0,x.jsx)(a.hE,{children:"Notices"}),(0,x.jsx)(a.ex,{children:(0,x.jsx)(a.$n,{variant:"primary",onClick:()=>{ye({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),we([]),me(!0)},children:"New Notice"})})]}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{active:"received"===te,onClick:()=>re("received"),children:["Received (",Oe,")"]}),(0,x.jsxs)(g,{active:"sent"===te,onClick:()=>re("sent"),children:["Sent (",Pe,")"]})]}),"received"===te?(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Oe}),(0,x.jsx)(s.v0,{children:"Total Received"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Ue}),(0,x.jsx)(s.v0,{children:"Unread"})]}),(0,x.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,x.jsx)(s.Os,{children:Le}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Me}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}):(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Pe}),(0,x.jsx)(s.v0,{children:"Total Sent"})]}),(0,x.jsxs)(s.hI,{color:"#10B981",children:[(0,x.jsx)(s.Os,{children:Re}),(0,x.jsx)(s.v0,{children:"This Month"})]}),(0,x.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,x.jsx)(s.Os,{children:Je}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:We}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(u,{children:[(0,x.jsx)(l.DO,{type:"text",placeholder:"Search notices...",value:de,onChange:e=>ce(e.target.value)}),(0,x.jsxs)(l.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,x.jsx)("option",{value:"",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(m,{children:[he&&0===Ie.length&&(0,x.jsx)(H,{children:(0,x.jsx)("p",{children:"Loading notices..."})}),!he&&0===Ie.length&&(0,x.jsxs)(H,{children:[(0,x.jsx)("h3",{children:"No notices found"}),(0,x.jsx)("p",{children:"received"===te?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Ie.map(e=>{var t,r;return(0,x.jsxs)(f,{unread:"received"===te&&!e.read_at,onClick:()=>Te(e),children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(b,{children:["received"===te&&!e.read_at&&(0,x.jsx)(j,{}),(0,x.jsx)(v,{children:e.title})]}),(0,x.jsx)(w,{children:(0,x.jsx)(A,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(k,{children:e.content}),(0,x.jsxs)(E,{children:[(0,x.jsx)(C,{children:"received"===te?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(B,{children:[e.author_name||"Unknown",(0,x.jsx)(F,{children:e.author_role||"Admin"})]})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(B,{children:["To: ",Ye(e)]}),(0,x.jsxs)(B,{children:[Ke(e),"/",Qe(e)," read"]})]})}),(0,x.jsxs)(_,{children:[e.commentCount>0&&(0,x.jsxs)(z,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Ce[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ce[String(e.id)].unread_count," new"]})]}),(0,x.jsx)(B,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ue&&(0,x.jsx)(S,{onClick:()=>me(!1),children:(0,x.jsxs)(D,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(N,{children:"New Notice"}),(0,x.jsx)(T,{onClick:()=>me(!1),children:"\xd7"})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Title *"}),(0,x.jsx)(M,{type:"text",placeholder:"Enter notice title",value:fe.title,onChange:e=>ye({...fe,title:e.target.value})})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Content *"}),(0,x.jsx)(P,{placeholder:"Enter notice content...",value:fe.content,onChange:e=>ye({...fe,content:e.target.value})})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Attachments"}),(0,x.jsx)(d.A,{files:ve,onChange:we,maxFiles:5})]}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Target Type *"}),(0,x.jsxs)(R,{value:fe.target_type,onChange:e=>ye({...fe,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,x.jsx)("option",{value:"",children:"Select target..."}),(null===se||void 0===se||null===(e=se.targetOptions)||void 0===e?void 0:e.map(e=>(0,x.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"brand",children:"By Brand"}),(0,x.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Priority"}),(0,x.jsxs)(R,{value:fe.priority,onChange:e=>ye({...fe,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"brand"===fe.target_type&&(null===se||void 0===se?void 0:se.brands)&&(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Select Brand *"}),(0,x.jsxs)(R,{value:fe.brand_id,onChange:e=>ye({...fe,brand_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Choose a brand..."}),se.brands.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===fe.target_type&&(null===se||void 0===se?void 0:se.restaurants)&&(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Select Restaurants *"}),(0,x.jsxs)(W,{children:[se.restaurants.map(e=>(0,x.jsxs)(Y,{children:[(0,x.jsx)("input",{type:"checkbox",checked:fe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ye(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===se.restaurants.length&&(0,x.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,x.jsxs)(K,{children:[fe.restaurant_ids.length," restaurant",1!==fe.restaurant_ids.length?"s":""," selected"]})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(a.$n,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,x.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(fe.title.trim()&&fe.content.trim()&&fe.target_type){je(!0);try{const e={title:fe.title.trim(),content:fe.content.trim(),target_type:fe.target_type,priority:fe.priority,attachments:ve.length>0?ve:void 0};"brand"===fe.target_type&&fe.brand_id&&(e.brand_id=Number(fe.brand_id)),"select_restaurants"===fe.target_type&&fe.restaurant_ids.length>0&&(e.restaurant_ids=fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Be(),body:JSON.stringify(e)})).ok&&(me(!1),we([]),$e())}catch(e){console.error("Error creating notice:",e)}finally{je(!1)}}},disabled:be||!fe.title.trim()||!fe.content.trim()||!fe.target_type||"brand"===fe.target_type&&!fe.brand_id||"select_restaurants"===fe.target_type&&0===fe.restaurant_ids.length,children:be?"Sending...":"Send Notice"})]})]})}),Ae&&ke&&(0,x.jsx)(S,{onClick:()=>{Fe(!1),Ee(null)},children:(0,x.jsxs)(D,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(N,{children:ke.title}),(0,x.jsxs)(ee,{children:[(0,x.jsx)(A,{priority:ke.priority,children:ke.priority}),(Ze=ke,String(Ze.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,x.jsx)(V,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Be()})).ok&&(Fe(!1),Ee(null),$e(),De())}catch(t){console.error("Error deleting notice:",t)}})(ke.id),children:"Delete"})),(0,x.jsx)(T,{onClick:()=>{Fe(!1),Ee(null)},children:"\xd7"})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(X,{children:[(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"From"}),(0,x.jsxs)(G,{children:[ke.author_name||(null===(t=ke.author)||void 0===t?void 0:t.name)||"Unknown"," ","(",ke.author_role||(null===(r=ke.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"To"}),(0,x.jsx)(G,{children:Ye(ke)})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Date"}),(0,x.jsx)(G,{children:(Xe=ke.createdAt,new Date(Xe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),ke.recipients&&ke.recipients.length>0&&(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Read Status"}),(0,x.jsxs)(G,{children:[Ke(ke),"/",Qe(ke)," read"]})]})]}),(0,x.jsx)(Q,{children:ke.content}),(null===ke||void 0===ke?void 0:ke.attachments)&&ke.attachments.length>0&&(0,x.jsx)(c.A,{attachments:ke.attachments}),(0,x.jsx)(p.A,{entityType:"notice",entityId:String(ke.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>_e(e=>{const t={...e},r=String(ke.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]});var Xe,Ze}},7455:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),i=r(4752),o=r(4414);const a=i.Ay.div`
  margin-top: 8px;
`,s=i.Ay.div`
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
`,l=i.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=i.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=i.Ay.input`
  display: none;
`,p=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=i.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,g=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=i.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,f=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,b=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const j=e=>{let{files:t,onChange:r,maxFiles:i=5,maxSizeMB:j=10,disabled:v=!1,compact:w=!1}=e;const[A,F]=(0,n.useState)(!1),[k,E]=(0,n.useState)(!1),C=(0,n.useRef)(null),_=!v&&!k&&t.length<i,B=async e=>{const n=i-t.length,o=Array.from(e).slice(0,n);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const n=localStorage.getItem("auth_token"),i=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await i.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[_&&(0,o.jsx)(s,{isDragging:A,disabled:!_,onClick:()=>{var e;return _&&(null===(e=C.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),_&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),_&&e.dataTransfer.files.length>0&&B(e.dataTransfer.files)},children:w?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",i,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",i-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:C,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&B(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,n)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(m,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(f,{onClick:()=>(async e=>{const n=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:n.url})})}catch(i){}r(t.filter((t,r)=>r!==e))})(n),title:"Remove",children:"\u2715"})]},e.url);var i,a})]})]})}}}]);