"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:n,...a}=e;return(0,i.jsx)(o,{className:r,style:n,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,i.jsx)(x,{children:r.map((e,t)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,i.jsx)(s,{children:n.map((e,t)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>S});var n=r(9950),i=r(4752),o=r(4185),a=r(4414);const s=i.Ay.div`
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
`,u=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=i.Ay.span`
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
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,b=i.Ay.textarea`
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
`,B=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,_=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,z=i.Ay.input`
  display: none;
`,S=e=>{let{entityType:t,entityId:r,currentUserId:i,onMarkRead:S}=e;const[$,D]=(0,n.useState)([]),[N,T]=(0,n.useState)(""),[I,O]=(0,n.useState)([]),[M,U]=(0,n.useState)(!1),[L,P]=(0,n.useState)(!1),R=(0,n.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&D(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),S&&S()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const Y=async()=>{const e=N.trim(),n=I.length>0;if((e||n)&&!L){P(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:N.trim(),attachments:n?I:void 0})})).ok&&(T(""),O([]),J())}catch(i){console.error("Error adding comment:",i)}finally{P(!1)}}},W=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",$.length,")"]}),$.length>0?(0,a.jsx)(d,{children:$.map(e=>{var t,r,n;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(m,{children:W(e.createdAt)}),i&&e.author_id===i&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&J()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(b,{value:N,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Y())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(A,{onClick:()=>{var e;return null===(e=R.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:Y,disabled:!N.trim()&&0===I.length||L,children:"Send"})]})]}),(I.length>0||M)&&(0,a.jsxs)(E,{children:[M&&(0,a.jsx)(_,{children:"Uploading..."}),I.map((e,t)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=I[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),O(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(z,{ref:R,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-I.length,n=Array.from(t).slice(0,r);if(0!==n.length){U(!0);try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await r.json();i.success&&i.data&&O(e=>[...e,...i.data])}catch(i){console.error("File upload error:",i)}finally{U(!1)}}}})]})}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ne});var n=r(9950),i=r(4752),o=r(1367),a=r(3832),s=r(5665),l=r(2488),d=r(7455),c=r(4185),p=r(4302),x=r(4414);const h=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,u=i.Ay.button`
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
`,g=i.Ay.div`
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

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

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
`,v=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,j=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,b=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,F=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,k=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,C=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,B=i.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,_=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,z=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,S=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=i.Ay.button`
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
`,N=i.Ay.div`
  padding: 24px;
`,T=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,I=i.Ay.div`
  margin-bottom: 20px;
`,O=i.Ay.label`
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

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,U=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,J=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  transition: background 0.1s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,Y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,W=i.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`,K=i.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,Q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,X=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,Z=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,q=i.Ay.div`
  margin-bottom: 24px;
`,G=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,H=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,V=i.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,ee=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,te=i.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,re=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ne=()=>{var e,t,r;const{user:i}=(0,o.As)(),[ne,ie]=(0,n.useState)([]),[oe,ae]=(0,n.useState)([]),[se,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)(!0),[pe,xe]=(0,n.useState)("received"),[he,ue]=(0,n.useState)(""),[ge,me]=(0,n.useState)(""),[fe,ye]=(0,n.useState)(!1),[ve,je]=(0,n.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal"}),[be,we]=(0,n.useState)(!1),[Ae,Fe]=(0,n.useState)(null),[ke,Ee]=(0,n.useState)(!1),[Ce,Be]=(0,n.useState)({}),[_e,ze]=(0,n.useState)([]),Se={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},$e=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Be(e=>({...e,...t}))}}}catch(t){}},De=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Se});if(e.ok){const t=await e.json();t.success&&le(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Ne=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Se});if(e.ok){const t=await e.json();t.success&&(ie(t.data),$e(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Te=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Se});if(e.ok){const t=await e.json();t.success&&(ae(t.data),$e(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Ie=(0,n.useCallback)(async()=>{ce(!0),await Promise.all([De(),Ne(),Te()]),ce(!1)},[De,Ne,Te]);(0,n.useEffect)(()=>{i&&Ie()},[i,Ie]);const Oe=e=>e.filter(e=>{var t;const r=!he||e.title.toLowerCase().includes(he.toLowerCase())||(null===(t=e.author_name)||void 0===t?void 0:t.toLowerCase().includes(he.toLowerCase())),n=!ge||e.priority===ge;return r&&n}),Me=Oe(ne),Ue=Oe(oe),Le="received"===pe?Me:Ue,Pe={total:ne.length,unread:ne.filter(e=>!e.read_at).length,important:ne.filter(e=>"important"===e.priority).length,urgent:ne.filter(e=>"urgent"===e.priority).length},Re=(new Date).getMonth(),Je=(new Date).getFullYear(),Ye={total:oe.length,thisMonth:oe.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Re&&t.getFullYear()===Je}).length,important:oe.filter(e=>"important"===e.priority).length,urgent:oe.filter(e=>"urgent"===e.priority).length},We=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"Just now":n<60?`${n}m ago`:i<24?`${i}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Ke=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return de?(0,x.jsxs)(a.mc,{children:[(0,x.jsx)(a.Y9,{children:(0,x.jsx)(a.hE,{children:"Notices"})}),(0,x.jsx)(a.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,x.jsxs)(a.mc,{children:[(0,x.jsxs)(a.Y9,{children:[(0,x.jsx)(a.hE,{children:"Notices"}),(0,x.jsx)(a.ex,{children:(null===se||void 0===se?void 0:se.canSend)&&(0,x.jsx)(a.$n,{variant:"primary",onClick:()=>{var e,t,r,n,i;je({title:"",content:"",target_type:(null===se||void 0===se||null===(e=se.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===se||void 0===se||null===(r=se.foodcourts)||void 0===r||null===(n=r[0])||void 0===n||null===(i=n.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[],priority:"normal"}),ye(!0)},children:"New Notice"})})]}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{active:"received"===pe,onClick:()=>xe("received"),children:["Received (",ne.length,")"]}),(0,x.jsxs)(u,{active:"sent"===pe,onClick:()=>xe("sent"),children:["Sent (",oe.length,")"]})]}),"received"===pe?(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Pe.total}),(0,x.jsx)(s.v0,{children:"Total Received"})]}),(0,x.jsxs)(s.hI,{color:"#3B82F6",children:[(0,x.jsx)(s.Os,{children:Pe.unread}),(0,x.jsx)(s.v0,{children:"Unread"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Pe.important}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Pe.urgent}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}):(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Ye.total}),(0,x.jsx)(s.v0,{children:"Total Sent"})]}),(0,x.jsxs)(s.hI,{color:"#3B82F6",children:[(0,x.jsx)(s.Os,{children:Ye.thisMonth}),(0,x.jsx)(s.v0,{children:"This Month"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Ye.important}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Ye.urgent}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsx)(l.DO,{type:"text",placeholder:"Search notices...",value:he,onChange:e=>ue(e.target.value)}),(0,x.jsxs)(l.Jt,{value:ge,onChange:e=>me(e.target.value),children:[(0,x.jsx)("option",{value:"",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(m,{children:[Le.map(e=>{var t,r,n;const i="received"===pe&&!e.read_at;return(0,x.jsxs)(f,{unread:i,onClick:()=>(async e=>{Fe(e),Ee(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:Se});if(t.ok){const e=await t.json();e.success&&Fe(e.data)}Ne()}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[i&&(0,x.jsx)(j,{}),(0,x.jsxs)("div",{children:[(0,x.jsx)(b,{children:e.title}),(0,x.jsxs)(w,{children:[(0,x.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"Unknown"]}),(0,x.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===pe&&(0,x.jsxs)(B,{children:["To: ",Ke(e)]})]})]})]}),(0,x.jsx)(A,{children:(0,x.jsx)(F,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(k,{children:e.content}),(0,x.jsxs)(E,{children:[(0,x.jsx)("span",{children:We(e.createdAt)}),e.commentCount>0&&(0,x.jsxs)(C,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(n=Ce[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ce[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Le.length&&(0,x.jsxs)(ee,{children:[(0,x.jsx)("h3",{children:"No notices found"}),(0,x.jsx)("p",{children:"received"===pe?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),fe&&(0,x.jsx)(_,{onClick:()=>ye(!1),children:(0,x.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(S,{children:[(0,x.jsx)($,{children:"New Notice"}),(0,x.jsx)(D,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Title *"}),(0,x.jsx)(M,{type:"text",value:ve.title,onChange:e=>je({...ve,title:e.target.value}),placeholder:"Notice title"})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Content *"}),(0,x.jsx)(L,{value:ve.content,onChange:e=>je({...ve,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Attachments"}),(0,x.jsx)(d.A,{files:_e,onChange:ze,maxFiles:5})]}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Target"}),(0,x.jsx)(U,{value:ve.target_type,onChange:e=>{var t,r,n;return je({...ve,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===se||void 0===se||null===(t=se.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(n=r.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[]})},children:null===se||void 0===se||null===(e=se.targetOptions)||void 0===e?void 0:e.map(e=>(0,x.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Priority"}),(0,x.jsxs)(U,{value:ve.priority,onChange:e=>je({...ve,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===ve.target_type&&(null===se||void 0===se?void 0:se.foodcourts)&&se.foodcourts.length>0&&(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Select Foodcourt"}),(0,x.jsx)(U,{value:ve.foodcourt_id,onChange:e=>je({...ve,foodcourt_id:e.target.value}),children:se.foodcourts.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===ve.target_type&&(null===se||void 0===se?void 0:se.restaurants)&&(0,x.jsxs)(I,{children:[(0,x.jsx)(O,{children:"Select Restaurants"}),(0,x.jsxs)(Y,{children:[(0,x.jsxs)(K,{children:[ve.restaurant_ids.length," of ",se.restaurants.length," selected"]}),(0,x.jsx)(W,{onClick:()=>{if(!se)return;const e=se.restaurants.map(e=>e.id),t=e.every(e=>ve.restaurant_ids.includes(e));je(r=>({...r,restaurant_ids:t?[]:e}))},children:ve.restaurant_ids.length===se.restaurants.length?"Deselect All":"Select All"})]}),(0,x.jsxs)(R,{children:[se.restaurants.map(e=>(0,x.jsxs)(J,{children:[(0,x.jsx)("input",{type:"checkbox",checked:ve.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void je(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===se.restaurants.length&&(0,x.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(a.$n,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,x.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(ve.title.trim()&&ve.content.trim()){we(!0);try{const e={title:ve.title,content:ve.content,target_type:ve.target_type,priority:ve.priority,attachments:_e.length>0?_e:void 0};"foodcourt"===ve.target_type?e.foodcourt_id=parseInt(ve.foodcourt_id):"restaurant"===ve.target_type&&(e.restaurant_ids=ve.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Se,body:JSON.stringify(e)})).ok?(ye(!1),ze([]),await Promise.all([Te(),Ne()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}we(!1)}},disabled:be||!ve.title.trim()||!ve.content.trim()||"restaurant"===ve.target_type&&0===ve.restaurant_ids.length,children:be?"Sending...":"Send Notice"})]})]})}),ke&&Ae&&(0,x.jsx)(_,{onClick:()=>{Ee(!1),Fe(null)},children:(0,x.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,x.jsxs)(S,{children:[(0,x.jsx)($,{children:Ae.title}),(0,x.jsx)(D,{onClick:()=>{Ee(!1),Fe(null)},children:"\xd7"})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(X,{children:[(0,x.jsxs)(Z,{children:["From: ",(0,x.jsx)("strong",{style:{marginLeft:"4px"},children:Ae.author_name||(null===(t=Ae.author)||void 0===t?void 0:t.name)||"Unknown"})]}),(0,x.jsx)(Z,{children:Ae.author_role||(null===(r=Ae.author)||void 0===r?void 0:r.role)||""}),(0,x.jsx)(Z,{children:(Qe=Ae.createdAt,new Date(Qe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,x.jsx)(F,{priority:Ae.priority,children:Ae.priority})]}),(0,x.jsx)(Q,{children:Ae.content}),(null===Ae||void 0===Ae?void 0:Ae.attachments)&&Ae.attachments.length>0&&(0,x.jsx)("div",{style:{marginTop:"16px"},children:(0,x.jsx)(c.A,{attachments:Ae.attachments})}),String(Ae.author_id)===String(null===i||void 0===i?void 0:i.id)&&Ae.recipients&&Ae.recipients.length>0&&(0,x.jsxs)(q,{children:[(0,x.jsx)(G,{children:"Recipients"}),(0,x.jsx)(H,{children:Ae.recipients.map((e,t)=>{var r,n;return(0,x.jsx)(V,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient ${t+1}`},t)})})]}),(0,x.jsx)(p.A,{entityType:"notice",entityId:String(Ae.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>Be(e=>{const t={...e},r=String(Ae.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),String(Ae.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,x.jsx)(T,{children:(0,x.jsx)(re,{children:(0,x.jsx)(te,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Se})).ok&&(Ee(!1),Fe(null),await Promise.all([Te(),Ne()]))}catch(t){console.error("Error deleting notice:",t)}})(Ae.id),children:"Delete Notice"})})})]})})]});var Qe}},7455:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),i=r(4752),o=r(4414);const a=i.Ay.div`
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
`,u=i.Ay.div`
  flex: 1;
  min-width: 0;
`,g=i.Ay.div`
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
`,v=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const j=e=>{let{files:t,onChange:r,maxFiles:i=5,maxSizeMB:j=10,disabled:b=!1,compact:w=!1}=e;const[A,F]=(0,n.useState)(!1),[k,E]=(0,n.useState)(!1),C=(0,n.useRef)(null),B=!b&&!k&&t.length<i,_=async e=>{const n=i-t.length,o=Array.from(e).slice(0,n);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const n=localStorage.getItem("auth_token"),i=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await i.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:A,disabled:!B,onClick:()=>{var e;return B&&(null===(e=C.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&_(e.dataTransfer.files)},children:w?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",i,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",i-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:C,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&_(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(v,{}),"Uploading..."]}),t.map((e,n)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(m,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]}),!b&&(0,o.jsx)(f,{onClick:()=>(async e=>{const n=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:n.url})})}catch(i){}r(t.filter((t,r)=>r!==e))})(n),title:"Remove",children:"\u2715"})]},e.url);var i,a})]})]})}}}]);