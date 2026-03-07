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
`,s=i.Ay.button`
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
`,d=i.Ay.select`
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
`,p=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(o,{className:n,style:i,...a,children:t})},c=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:o,...d}=e;return(0,r.jsxs)(l,{style:o,children:[(0,r.jsx)(a,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,r.jsx)(s,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,r.jsx)(d,{...n,children:t})}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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
`,s=i.Ay.a`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,r.jsx)(x,{children:n.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,r.jsx)(l,{children:i.map((e,t)=>{return(0,r.jsxs)(s,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(p,{children:e.originalName}),(0,r.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>N});var i=n(9950),r=n(4752),o=n(4185),a=n(9061),l=n(4414);const s=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=r.Ay.h4`
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
`,v=r.Ay.button`
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
`,N=e=>{let{entityType:t,entityId:n,currentUserId:r,onMarkRead:N}=e;const[L,U]=(0,i.useState)([]),[O,R]=(0,i.useState)(""),[W,G]=(0,i.useState)(!1),[J,M]=(0,i.useState)([]),[P,Y]=(0,i.useState)(!1),[K,H]=(0,i.useState)(""),[Q,q]=(0,i.useState)(!1),V=(0,i.useRef)(null),X=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&U(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(X(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const Z=async()=>{if(P)return;const e=O.trim(),i=J.length>0;if((e||i)&&!Q){q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:O.trim(),attachments:i?J:void 0,is_internal:W||void 0})})).ok&&(R(""),M([]),G(!1),X())}catch(r){console.error("Error adding comment:",r)}finally{q(!1)}}},ee=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);if(r<24)return`${r}h ago`;const o=Math.floor(r/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(s,{children:[(0,l.jsxs)(d,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(p,{children:L.map(e=>{var t,n,s;return(0,l.jsxs)(c,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(m,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(f,{children:"Internal"}),(0,l.jsx)(y,{children:ee(e.createdAt)}),r&&e.author_id===r&&(0,l.jsx)(v,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&X()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(w,{children:e.content.split("\n").map((e,t)=>(0,l.jsxs)(i.Fragment,{children:[t>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(B,{children:"No comments yet"}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(A,{value:O,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},placeholder:W?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{onClick:()=>{var e;return null===(e=V.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(E,{onClick:Z,disabled:!O.trim()&&0===J.length||Q||P,children:"Send"})]})]}),(0,l.jsx)(I,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:W,onChange:e=>G(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||P||K)&&(0,l.jsxs)(C,{children:[P&&(0,l.jsx)(_,{children:"Uploading..."}),K&&(0,l.jsx)($,{children:K}),J.map((e,t)=>(0,l.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(S,{onClick:()=>(e=>{const t=J[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),M(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(D,{ref:V,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-J.length,i=Array.from(t).slice(0,n);if(e.target.value="",0!==i.length){Y(!0),H("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),r=await n.json();r.success&&r.data?M(e=>[...e,...r.data]):H(r.message||"Upload failed")}catch(r){console.error("File upload error:",r),H("File upload failed. Please try again.")}finally{Y(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>P});var i=n(9950),r=n(4752),o=n(2853),a=n(4492),l=n(3832),s=n(8409),d=n(5665),p=n(2488),c=n(4185),x=n(4302),h=n(9061),u=n(1367),g=n(4414);const m=r.Ay.div`
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
`,f=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=r.Ay.div`
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
`,w=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,v=r.Ay.div`
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
`,j=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,A=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,k=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,E=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,B=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,C=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,z=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,S=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,_=r.Ay.button`
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
`,$=r.Ay.div`
  margin-bottom: 24px;
`,D=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,I=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,T=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,N=r.Ay.div`
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
`,L=r.Ay.div`
  flex: 1;
`,U=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,O=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=r.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,W=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,G=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,J=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,M=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,P=()=>{(0,a.g)();const[e,t]=(0,i.useState)([]),[n,r]=(0,i.useState)(!0),[P,Y]=(0,i.useState)(""),[K,H]=(0,i.useState)("all"),[Q,q]=(0,i.useState)("all"),[V,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)(!1),[te,ne]=(0,i.useState)(null),[ie,re]=(0,i.useState)(null),[oe,ae]=(0,i.useState)({}),{user:le}=(0,u.As)(),se=localStorage.getItem("auth_token"),de=async()=>{try{r(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${se}`,"Content-Type":"application/json"}});if(e.ok){const n=await e.json(),i=n.data||n,r=Array.isArray(i)?i:[];t(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${se}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{r(!1)}};(0,i.useEffect)(()=>{de()},[]);const pe=e=>{ne(e),re(null),ee(!0),(async e=>{try{const n=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${se}`,"Content-Type":"application/json"}});if(n.ok){const i=await n.json(),r=i.data||i;re(r),t(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(n){console.error("Failed to fetch notice detail:",n)}})(e.id)},ce=()=>{ee(!1),ne(null),re(null)},xe=e.filter(e=>{const t=e.title.toLowerCase().includes(P.toLowerCase())||e.content.toLowerCase().includes(P.toLowerCase())||e.author_name.toLowerCase().includes(P.toLowerCase()),n="all"===K||e.priority===K,i="all"===Q||(e.category||"general")===Q,r="all"===V||e.author_role===V;return t&&n&&i&&r}),he=e.length,ue=e.filter(e=>!e.read_at).length,ge=e.filter(e=>"important"===e.priority).length,me=e.filter(e=>"urgent"===e.priority).length,fe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,g.jsxs)(l.mc,{children:[(0,g.jsx)(l.Y9,{children:(0,g.jsx)(l.hE,{children:"Notices"})}),(0,g.jsxs)(l.UC,{children:[(0,g.jsxs)(d.MD,{children:[(0,g.jsxs)(d.hI,{color:"#635BFF",children:[(0,g.jsx)(d.Os,{children:he}),(0,g.jsx)(d.v0,{children:"Total Received"})]}),(0,g.jsxs)(d.hI,{color:"#2563EB",children:[(0,g.jsx)(d.Os,{children:ue}),(0,g.jsx)(d.v0,{children:"Unread"})]}),(0,g.jsxs)(d.hI,{color:"#D97706",children:[(0,g.jsx)(d.Os,{children:ge}),(0,g.jsx)(d.v0,{children:"Important"})]}),(0,g.jsxs)(d.hI,{color:"#DC2626",children:[(0,g.jsx)(d.Os,{children:me}),(0,g.jsx)(d.v0,{children:"Urgent"})]})]}),(0,g.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,g.jsx)("button",{onClick:()=>q(e),style:{padding:"6px 16px",borderRadius:"20px",border:Q===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:Q===e?"#F0EFFF":"white",color:Q===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:Q===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,g.jsxs)(m,{children:[(0,g.jsx)(p.DO,{type:"text",placeholder:"Search notices...",value:P,onChange:e=>Y(e.target.value)}),(0,g.jsxs)(p.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Senders"}),(0,g.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,g.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,g.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,g.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,g.jsxs)(p.Jt,{value:K,onChange:e=>H(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Priorities"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),n?(0,g.jsx)(M,{children:"Loading notices..."}):0===xe.length?(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("h3",{children:"No notices found"}),(0,g.jsx)("p",{children:P||"all"!==K?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,g.jsx)(f,{children:xe.map(e=>{var t;const n=!e.read_at;return(0,g.jsx)(y,{isUnread:n,onClick:()=>pe(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,g.jsxs)(w,{children:[(0,g.jsxs)(v,{children:[(0,g.jsxs)(b,{isUnread:n,children:[n&&(0,g.jsx)(j,{}),e.title]}),(0,g.jsx)(A,{children:fe(e.content)}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(k,{children:[e.author_name,(0,g.jsx)(E,{role:e.author_role,children:e.author_role})]}),(0,g.jsx)(S,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,g.jsxs)(z,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=oe[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[oe[String(e.id)].unread_count," new"]})]})]})]}),(0,g.jsxs)(B,{children:["guide"===e.category&&(0,g.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,g.jsx)(C,{priority:e.priority,children:e.priority})]})]})},e.id);var i})}),Z&&te&&(0,g.jsxs)(s.aF,{isOpen:!0,onClose:ce,title:"Notice Details",size:"large",footer:(0,g.jsx)(_,{variant:"secondary",onClick:ce,children:"Close"}),children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:te.title}),(0,g.jsx)(C,{priority:te.priority,children:te.priority})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(D,{children:"From"}),(0,g.jsxs)(T,{children:[(0,g.jsx)(N,{children:(we=(null===ie||void 0===ie?void 0:ie.author_name)||te.author_name,we?we.charAt(0).toUpperCase():"?")}),(0,g.jsxs)(L,{children:[(0,g.jsx)(U,{children:(null===ie||void 0===ie?void 0:ie.author_name)||te.author_name}),(0,g.jsx)(O,{children:(null===ie||void 0===ie?void 0:ie.author_role)||te.author_role})]})]})]}),(0,g.jsxs)(R,{children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(G,{children:"Date"}),(0,g.jsx)(J,{children:(ye=(null===ie||void 0===ie?void 0:ie.createdAt)||te.createdAt,new Date(ye).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(G,{children:"Priority"}),(0,g.jsx)(J,{style:{textTransform:"capitalize"},children:(null===ie||void 0===ie?void 0:ie.priority)||te.priority})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(G,{children:"Status"}),(0,g.jsx)(J,{style:{textTransform:"capitalize"},children:(null===ie||void 0===ie?void 0:ie.status)||te.status})]})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(D,{children:"Content"}),(0,g.jsx)(I,{children:((null===ie||void 0===ie?void 0:ie.content)||te.content).split("\n").map((e,t)=>(0,g.jsxs)(i.Fragment,{children:[t>0&&(0,g.jsx)("br",{}),(0,h.c)(e)]},t))})]}),((null===ie||void 0===ie?void 0:ie.attachments)||(null===te||void 0===te?void 0:te.attachments))&&((null===ie||void 0===ie?void 0:ie.attachments)||(null===te||void 0===te?void 0:te.attachments)||[]).length>0&&(0,g.jsxs)($,{children:[(0,g.jsx)(D,{children:"Attachments"}),(0,g.jsx)(c.A,{attachments:(null===ie||void 0===ie?void 0:ie.attachments)||(null===te||void 0===te?void 0:te.attachments)||[]})]}),(0,g.jsx)(x.A,{entityType:"notice",entityId:String(te.id),currentUserId:null===le||void 0===le?void 0:le.id,onMarkRead:()=>ae(e=>{const t={...e},n=String(te.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})]})]});var ye,we}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var i=n(9950),r=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(o);return 1===t.length?e:t.map((e,t)=>o.test(e)?(0,r.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,r.jsx)(i.Fragment,{children:e},t))}}}]);