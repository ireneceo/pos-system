"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>p,Qn:()=>s});n(9950);var r=n(4752),i=n(4414);const o=r.Ay.div`
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
`,a=r.Ay.input`
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
`,l=r.Ay.select`
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
`,s=e=>{let{children:t,className:n,style:r,...a}=e;return(0,i.jsx)(o,{className:n,style:r,...a,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(a,{placeholder:t,...n})},p=e=>{let{children:t,...n}=e;return(0,i.jsx)(l,{...n,children:t})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var r=n(4752),i=n(4414);const o=r.Ay.div`
  margin-top: 12px;
`,a=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,s=r.Ay.a`
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
`,d=r.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=r.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,c=r.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=r.Ay.a`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),r=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,t)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),r.length>0&&(0,i.jsx)(l,{children:r.map((e,t)=>{return(0,i.jsxs)(s,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(r=e.mimeType,"application/pdf"===r?"\ud83d\udcc4":r.includes("word")||r.includes("document")?"\ud83d\udcdd":r.includes("sheet")||r.includes("excel")?"\ud83d\udcca":r.includes("zip")||r.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,r})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>N});var r=n(9950),i=n(4752),o=n(4185),a=n(9061),l=n(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=i.Ay.div`
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
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=i.Ay.div`
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
`,h=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,w=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=i.Ay.textarea`
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
`,F=i.Ay.div`
  display: flex;
  gap: 4px;
`,k=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,E=i.Ay.button`
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
`,B=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=i.Ay.button`
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
`,$=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,D=i.Ay.input`
  display: none;
`,I=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=i.Ay.label`
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
`,N=e=>{let{entityType:t,entityId:n,currentUserId:i,onMarkRead:N}=e;const[U,L]=(0,r.useState)([]),[O,R]=(0,r.useState)(""),[G,J]=(0,r.useState)(!1),[M,P]=(0,r.useState)([]),[W,Y]=(0,r.useState)(!1),[K,H]=(0,r.useState)(""),[Q,q]=(0,r.useState)(!1),V=(0,r.useRef)(null),X=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,r.useEffect)(()=>{n&&(X(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const Z=async()=>{if(W)return;const e=O.trim(),r=M.length>0;if((e||r)&&!Q){q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:O.trim(),attachments:r?M:void 0,is_internal:G||void 0})})).ok&&(R(""),P([]),J(!1),X())}catch(i){console.error("Error adding comment:",i)}finally{q(!1)}}},ee=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),r=Math.floor(n/6e4);if(r<1)return"Just now";if(r<60)return`${r}m ago`;const i=Math.floor(r/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(s,{children:[(0,l.jsxs)(d,{children:["Comments (",U.length,")"]}),U.length>0?(0,l.jsx)(p,{children:U.map(e=>{var t,n,s;return(0,l.jsxs)(c,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(m,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(f,{children:"Internal"}),(0,l.jsx)(y,{children:ee(e.createdAt)}),i&&e.author_id===i&&(0,l.jsx)(b,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&X()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(w,{children:e.content.split("\n").map((e,t)=>(0,l.jsxs)(r.Fragment,{children:[t>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(B,{children:"No comments yet"}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)(A,{value:O,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},placeholder:G?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{onClick:()=>{var e;return null===(e=V.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(E,{onClick:Z,disabled:!O.trim()&&0===M.length||Q||W,children:"Send"})]})]}),(0,l.jsx)(I,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:G,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(M.length>0||W||K)&&(0,l.jsxs)(C,{children:[W&&(0,l.jsx)(_,{children:"Uploading..."}),K&&(0,l.jsx)($,{children:K}),M.map((e,t)=>(0,l.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(S,{onClick:()=>(e=>{const t=M[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),P(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(D,{ref:V,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-M.length,r=Array.from(t).slice(0,n);if(e.target.value="",0!==r.length){Y(!0),H("");try{const e=new FormData;r.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await n.json();i.success&&i.data?P(e=>[...e,...i.data]):H(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),H("File upload failed. Please try again.")}finally{Y(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>V});var r=n(9950),i=n(4752),o=n(2853),a=n(4492),l=n(3832),s=n(5665),d=n(2488),p=n(4185),c=n(4302),x=n(9061),h=n(1367),u=n(4414);const g=i.Ay.div`
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

  ${e=>e.isUnread&&"\n    border-left: 3px solid #635BFF;\n  "}

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
`,w=i.Ay.div`
  flex: 1;
  min-width: 0;
`,b=i.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,j=i.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,v=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,A=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,F=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,k=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,E=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,B=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,C=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,z=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
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
`,_=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,$=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,I=i.Ay.button`
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
`,T=i.Ay.div`
  padding: 24px;
`,N=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=i.Ay.button`
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
`,L=i.Ay.div`
  margin-bottom: 24px;
`,O=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,R=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,G=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,J=i.Ay.div`
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
`,M=i.Ay.div`
  flex: 1;
`,P=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,W=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Y=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,K=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,H=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Q=i.Ay.span`
  font-size: 14px;
  color: #374151;
`,q=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,V=()=>{const{restaurantId:e}=(0,a.g)(),[t,n]=(0,r.useState)([]),[i,V]=(0,r.useState)(!0),[X,Z]=(0,r.useState)(""),[ee,te]=(0,r.useState)("all"),[ne,re]=(0,r.useState)("all"),[ie,oe]=(0,r.useState)("all"),[ae,le]=(0,r.useState)(!1),[se,de]=(0,r.useState)(null),[pe,ce]=(0,r.useState)(null),[xe,he]=(0,r.useState)({}),{user:ue}=(0,h.As)(),ge=localStorage.getItem("auth_token"),me=async()=>{try{V(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${ge}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];n(i),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${ge}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),he(t)}}}catch(t){}})(i)}}catch(e){console.error("Failed to fetch notices:",e)}finally{V(!1)}};(0,r.useEffect)(()=>{me()},[]);const fe=e=>{de(e),ce(null),le(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${ge}`,"Content-Type":"application/json"}});if(t.ok){const r=await t.json(),i=r.data||r;ce(i),n(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id)},ye=()=>{le(!1),de(null),ce(null)},we=t.filter(e=>{const t=e.title.toLowerCase().includes(X.toLowerCase())||e.content.toLowerCase().includes(X.toLowerCase())||e.author_name.toLowerCase().includes(X.toLowerCase()),n="all"===ee||e.priority===ee,r="all"===ne||(e.category||"general")===ne,i="all"===ie||e.author_role===ie;return t&&n&&r&&i}),be=t.length,je=t.filter(e=>!e.read_at).length,ve=t.filter(e=>"important"===e.priority).length,Ae=t.filter(e=>"urgent"===e.priority).length,Fe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,u.jsxs)(l.mc,{children:[(0,u.jsx)(l.Y9,{children:(0,u.jsx)(l.hE,{children:"Notices"})}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{color:"#635BFF",children:[(0,u.jsx)(s.Os,{children:be}),(0,u.jsx)(s.v0,{children:"Total Received"})]}),(0,u.jsxs)(s.hI,{color:"#2563EB",children:[(0,u.jsx)(s.Os,{children:je}),(0,u.jsx)(s.v0,{children:"Unread"})]}),(0,u.jsxs)(s.hI,{color:"#D97706",children:[(0,u.jsx)(s.Os,{children:ve}),(0,u.jsx)(s.v0,{children:"Important"})]}),(0,u.jsxs)(s.hI,{color:"#DC2626",children:[(0,u.jsx)(s.Os,{children:Ae}),(0,u.jsx)(s.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>re(e),style:{padding:"6px 16px",borderRadius:"20px",border:ne===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ne===e?"#F0EFFF":"white",color:ne===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ne===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(g,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:X,onChange:e=>Z(e.target.value)}),(0,u.jsxs)(d.Jt,{value:ie,onChange:e=>oe(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(d.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),i?(0,u.jsx)(q,{children:"Loading notices..."}):0===we.length?(0,u.jsxs)(o.pp,{children:[(0,u.jsx)("h3",{children:"No notices found"}),(0,u.jsx)("p",{children:X||"all"!==ee?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,u.jsx)(m,{children:we.map(e=>{var t;const n=!e.read_at;return(0,u.jsx)(f,{isUnread:n,onClick:()=>fe(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,u.jsxs)(y,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(b,{isUnread:n,children:[n&&(0,u.jsx)(j,{}),e.title]}),(0,u.jsx)(v,{children:Fe(e.content)}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(F,{children:[e.author_name,(0,u.jsx)(k,{role:e.author_role,children:e.author_role})]}),(0,u.jsx)(z,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,u.jsxs)(C,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=xe[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[xe[String(e.id)].unread_count," new"]})]})]})]}),(0,u.jsxs)(E,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(B,{priority:e.priority,children:e.priority})]})]})},e.id);var r})}),ae&&se&&(0,u.jsx)(S,{onClick:ye,children:(0,u.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)($,{children:[(0,u.jsx)(D,{children:"Notice Details"}),(0,u.jsx)(I,{onClick:ye,children:"\xd7"})]}),(0,u.jsxs)(T,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:se.title}),(0,u.jsx)(B,{priority:se.priority,children:se.priority})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(O,{children:"From"}),(0,u.jsxs)(G,{children:[(0,u.jsx)(J,{children:(Ee=(null===pe||void 0===pe?void 0:pe.author_name)||se.author_name,Ee?Ee.charAt(0).toUpperCase():"?")}),(0,u.jsxs)(M,{children:[(0,u.jsx)(P,{children:(null===pe||void 0===pe?void 0:pe.author_name)||se.author_name}),(0,u.jsx)(W,{children:(null===pe||void 0===pe?void 0:pe.author_role)||se.author_role})]})]})]}),(0,u.jsxs)(Y,{children:[(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Date"}),(0,u.jsx)(Q,{children:(ke=(null===pe||void 0===pe?void 0:pe.createdAt)||se.createdAt,new Date(ke).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Priority"}),(0,u.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===pe||void 0===pe?void 0:pe.priority)||se.priority})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Status"}),(0,u.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===pe||void 0===pe?void 0:pe.status)||se.status})]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(O,{children:"Content"}),(0,u.jsx)(R,{children:((null===pe||void 0===pe?void 0:pe.content)||se.content).split("\n").map((e,t)=>(0,u.jsxs)(r.Fragment,{children:[t>0&&(0,u.jsx)("br",{}),(0,x.c)(e)]},t))})]}),((null===pe||void 0===pe?void 0:pe.attachments)||(null===se||void 0===se?void 0:se.attachments))&&((null===pe||void 0===pe?void 0:pe.attachments)||(null===se||void 0===se?void 0:se.attachments)||[]).length>0&&(0,u.jsxs)(L,{children:[(0,u.jsx)(O,{children:"Attachments"}),(0,u.jsx)(p.A,{attachments:(null===pe||void 0===pe?void 0:pe.attachments)||(null===se||void 0===se?void 0:se.attachments)||[]})]}),(0,u.jsx)(c.A,{entityType:"notice",entityId:String(se.id),currentUserId:null===ue||void 0===ue?void 0:ue.id,onMarkRead:()=>he(e=>{const t={...e},n=String(se.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]}),(0,u.jsx)(N,{children:(0,u.jsx)(U,{variant:"secondary",onClick:ye,children:"Close"})})]})})]})]});var ke,Ee}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var r=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(o);return 1===t.length?e:t.map((e,t)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,i.jsx)(r.Fragment,{children:e},t))}}}]);