"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>p});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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
`,l=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,d=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
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
`,p=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(o,{className:n,style:i,...a,children:t})},c=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:o,...s}=e;return(0,r.jsxs)(l,{style:o,children:[(0,r.jsx)(a,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...s}),n&&(0,r.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,r.jsx)(s,{...n,children:t})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,r.jsx)(x,{children:n.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,r.jsx)(l,{children:i.map((e,t)=>{return(0,r.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(s,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(p,{children:e.originalName}),(0,r.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>N});var i=n(9950),r=n(4752),o=n(4185),a=n(9061),l=n(4414);const d=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=r.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=r.Ay.div`
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
`,h=r.Ay.div`
  flex: 1;
  min-width: 0;
`,u=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=r.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,w=r.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,v=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=r.Ay.textarea`
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
`,F=r.Ay.div`
  display: flex;
  gap: 4px;
`,k=r.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,E=r.Ay.button`
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
`,B=r.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=r.Ay.div`
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
`,S=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,_=r.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=r.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,D=r.Ay.input`
  display: none;
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=r.Ay.label`
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
`,N=e=>{let{entityType:t,entityId:n,currentUserId:r,onMarkRead:N}=e;const[L,U]=(0,i.useState)([]),[O,R]=(0,i.useState)(""),[W,G]=(0,i.useState)(!1),[J,M]=(0,i.useState)([]),[P,Y]=(0,i.useState)(!1),[K,H]=(0,i.useState)(""),[Q,q]=(0,i.useState)(!1),V=(0,i.useRef)(null),X=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&U(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(X(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const Z=async()=>{if(P)return;const e=O.trim(),i=J.length>0;if((e||i)&&!Q){q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:O.trim(),attachments:i?J:void 0,is_internal:W||void 0})})).ok&&(R(""),M([]),G(!1),X())}catch(r){console.error("Error adding comment:",r)}finally{q(!1)}}},ee=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);if(r<24)return`${r}h ago`;const o=Math.floor(r/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(s,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(p,{children:L.map(e=>{var t,n,d;return(0,l.jsxs)(c,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(m,{children:(null===(d=e.author)||void 0===d?void 0:d.role)||e.author_role}),e.is_internal&&(0,l.jsx)(f,{children:"Internal"}),(0,l.jsx)(y,{children:ee(e.createdAt)}),r&&e.author_id===r&&(0,l.jsx)(b,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&X()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(w,{children:e.content.split("\n").map((e,t)=>(0,l.jsxs)(i.Fragment,{children:[t>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(B,{children:"No comments yet"}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(A,{value:O,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},placeholder:W?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{onClick:()=>{var e;return null===(e=V.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(E,{onClick:Z,disabled:!O.trim()&&0===J.length||Q||P,children:"Send"})]})]}),(0,l.jsx)(I,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:W,onChange:e=>G(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||P||K)&&(0,l.jsxs)(C,{children:[P&&(0,l.jsx)(_,{children:"Uploading..."}),K&&(0,l.jsx)($,{children:K}),J.map((e,t)=>(0,l.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(S,{onClick:()=>(e=>{const t=J[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),M(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(D,{ref:V,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-J.length,i=Array.from(t).slice(0,n);if(e.target.value="",0!==i.length){Y(!0),H("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),r=await n.json();r.success&&r.data?M(e=>[...e,...r.data]):H(r.message||"Upload failed")}catch(r){console.error("File upload error:",r),H("File upload failed. Please try again.")}finally{Y(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>V});var i=n(9950),r=n(4752),o=n(2853),a=n(4492),l=n(3832),d=n(5665),s=n(2488),p=n(4185),c=n(4302),x=n(9061),h=n(1367),u=n(4414);const g=r.Ay.div`
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
`,m=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=r.Ay.div`
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
`,y=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=r.Ay.div`
  flex: 1;
  min-width: 0;
`,b=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,v=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,j=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,A=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,F=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,k=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,E=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,B=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,C=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,z=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,S=r.Ay.div`
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
`,_=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,$=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=r.Ay.h2`
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
`,T=r.Ay.div`
  padding: 24px;
`,N=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=r.Ay.button`
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
`,O=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,R=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,W=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,G=r.Ay.div`
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
`,M=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,P=r.Ay.div`
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
`,V=()=>{(0,a.g)();const[e,t]=(0,i.useState)([]),[n,r]=(0,i.useState)(!0),[V,X]=(0,i.useState)(""),[Z,ee]=(0,i.useState)("all"),[te,ne]=(0,i.useState)("all"),[ie,re]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)(!1),[le,de]=(0,i.useState)(null),[se,pe]=(0,i.useState)(null),[ce,xe]=(0,i.useState)({}),{user:he}=(0,h.As)(),ue=localStorage.getItem("auth_token"),ge=async()=>{try{r(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${ue}`,"Content-Type":"application/json"}});if(e.ok){const n=await e.json(),i=n.data||n,r=Array.isArray(i)?i:[];t(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${ue}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),xe(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{r(!1)}};(0,i.useEffect)(()=>{ge()},[]);const me=e=>{de(e),pe(null),ae(!0),(async e=>{try{const n=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${ue}`,"Content-Type":"application/json"}});if(n.ok){const i=await n.json(),r=i.data||i;pe(r),t(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(n){console.error("Failed to fetch notice detail:",n)}})(e.id)},fe=()=>{ae(!1),de(null),pe(null)},ye=e.filter(e=>{const t=e.title.toLowerCase().includes(V.toLowerCase())||e.content.toLowerCase().includes(V.toLowerCase())||e.author_name.toLowerCase().includes(V.toLowerCase()),n="all"===Z||e.priority===Z,i="all"===te||(e.category||"general")===te,r="all"===ie||e.author_role===ie;return t&&n&&i&&r}),we=e.length,be=e.filter(e=>!e.read_at).length,ve=e.filter(e=>"important"===e.priority).length,je=e.filter(e=>"urgent"===e.priority).length,Ae=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,u.jsxs)(l.mc,{children:[(0,u.jsx)(l.Y9,{children:(0,u.jsx)(l.hE,{children:"Notices"})}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(d.MD,{children:[(0,u.jsxs)(d.hI,{color:"#635BFF",children:[(0,u.jsx)(d.Os,{children:we}),(0,u.jsx)(d.v0,{children:"Total Received"})]}),(0,u.jsxs)(d.hI,{color:"#2563EB",children:[(0,u.jsx)(d.Os,{children:be}),(0,u.jsx)(d.v0,{children:"Unread"})]}),(0,u.jsxs)(d.hI,{color:"#D97706",children:[(0,u.jsx)(d.Os,{children:ve}),(0,u.jsx)(d.v0,{children:"Important"})]}),(0,u.jsxs)(d.hI,{color:"#DC2626",children:[(0,u.jsx)(d.Os,{children:je}),(0,u.jsx)(d.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>ne(e),style:{padding:"6px 16px",borderRadius:"20px",border:te===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:te===e?"#F0EFFF":"white",color:te===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:te===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(g,{children:[(0,u.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:V,onChange:e=>X(e.target.value)}),(0,u.jsxs)(s.Jt,{value:ie,onChange:e=>re(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(s.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),n?(0,u.jsx)(q,{children:"Loading notices..."}):0===ye.length?(0,u.jsxs)(o.pp,{children:[(0,u.jsx)("h3",{children:"No notices found"}),(0,u.jsx)("p",{children:V||"all"!==Z?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,u.jsx)(m,{children:ye.map(e=>{var t;const n=!e.read_at;return(0,u.jsx)(f,{isUnread:n,onClick:()=>me(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,u.jsxs)(y,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(b,{isUnread:n,children:[n&&(0,u.jsx)(v,{}),e.title]}),(0,u.jsx)(j,{children:Ae(e.content)}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(F,{children:[e.author_name,(0,u.jsx)(k,{role:e.author_role,children:e.author_role})]}),(0,u.jsx)(z,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,u.jsxs)(C,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=ce[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[ce[String(e.id)].unread_count," new"]})]})]})]}),(0,u.jsxs)(E,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(B,{priority:e.priority,children:e.priority})]})]})},e.id);var i})}),oe&&le&&(0,u.jsx)(S,{onClick:fe,children:(0,u.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)($,{children:[(0,u.jsx)(D,{children:"Notice Details"}),(0,u.jsx)(I,{onClick:fe,children:"\xd7"})]}),(0,u.jsxs)(T,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:le.title}),(0,u.jsx)(B,{priority:le.priority,children:le.priority})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(O,{children:"From"}),(0,u.jsxs)(W,{children:[(0,u.jsx)(G,{children:(ke=(null===se||void 0===se?void 0:se.author_name)||le.author_name,ke?ke.charAt(0).toUpperCase():"?")}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:(null===se||void 0===se?void 0:se.author_name)||le.author_name}),(0,u.jsx)(P,{children:(null===se||void 0===se?void 0:se.author_role)||le.author_role})]})]})]}),(0,u.jsxs)(Y,{children:[(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Date"}),(0,u.jsx)(Q,{children:(Fe=(null===se||void 0===se?void 0:se.createdAt)||le.createdAt,new Date(Fe).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Priority"}),(0,u.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===se||void 0===se?void 0:se.priority)||le.priority})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(H,{children:"Status"}),(0,u.jsx)(Q,{style:{textTransform:"capitalize"},children:(null===se||void 0===se?void 0:se.status)||le.status})]})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(O,{children:"Content"}),(0,u.jsx)(R,{children:((null===se||void 0===se?void 0:se.content)||le.content).split("\n").map((e,t)=>(0,u.jsxs)(i.Fragment,{children:[t>0&&(0,u.jsx)("br",{}),(0,x.c)(e)]},t))})]}),((null===se||void 0===se?void 0:se.attachments)||(null===le||void 0===le?void 0:le.attachments))&&((null===se||void 0===se?void 0:se.attachments)||(null===le||void 0===le?void 0:le.attachments)||[]).length>0&&(0,u.jsxs)(U,{children:[(0,u.jsx)(O,{children:"Attachments"}),(0,u.jsx)(p.A,{attachments:(null===se||void 0===se?void 0:se.attachments)||(null===le||void 0===le?void 0:le.attachments)||[]})]}),(0,u.jsx)(c.A,{entityType:"notice",entityId:String(le.id),currentUserId:null===he||void 0===he?void 0:he.id,onMarkRead:()=>xe(e=>{const t={...e},n=String(le.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]}),(0,u.jsx)(N,{children:(0,u.jsx)(L,{variant:"secondary",onClick:fe,children:"Close"})})]})})]})]});var Fe,ke}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var i=n(9950),r=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(o);return 1===t.length?e:t.map((e,t)=>o.test(e)?(0,r.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,r.jsx)(i.Fragment,{children:e},t))}}}]);