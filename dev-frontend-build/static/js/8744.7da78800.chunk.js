"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var r=n(4752),o=n(4414);const i=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,a=r.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

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
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:r}=e;return(0,o.jsx)(i,{className:n,style:r,children:t})},d=e=>{let{active:t,onClick:n,children:r,className:i}=e;return(0,o.jsx)(a,{active:t,onClick:n,className:i,children:r})},c=e=>{let{count:t,variant:n="default",showZero:r=!1}=e;return 0!==t||r?(0,o.jsx)(s,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>i});var r=n(9950),o=n(4492);function i(e){const[t,n]=(0,o.ok)(),i=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(i());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},4185:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var r=n(4752),o=n(4414);const i=r.Ay.div`
  margin-top: 12px;
`,a=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=r.Ay.a`
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
`,c=r.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=r.Ay.span`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),r=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,o.jsx)(x,{children:n.map((e,t)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},t))}),r.length>0&&(0,o.jsx)(s,{children:r.map((e,t)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(r=e.mimeType,"application/pdf"===r?"\ud83d\udcc4":r.includes("word")||r.includes("document")?"\ud83d\udcdd":r.includes("sheet")||r.includes("excel")?"\ud83d\udcca":r.includes("zip")||r.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,r})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>I});var r=n(9950),o=n(4752),i=n(4185),a=n(9061),s=n(4414);const l=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,c=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,p=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=o.Ay.div`
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
`,h=o.Ay.div`
  flex: 1;
  min-width: 0;
`,u=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,v=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,w=o.Ay.textarea`
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
`,A=o.Ay.div`
  display: flex;
  gap: 4px;
`,k=o.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,C=o.Ay.button`
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
`,B=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,_=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,S=o.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=o.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=o.Ay.input`
  display: none;
`,N=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,D=o.Ay.label`
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
`,I=e=>{let{entityType:t,entityId:n,currentUserId:o,onMarkRead:I}=e;const[q,P]=(0,r.useState)([]),[O,U]=(0,r.useState)(""),[L,M]=(0,r.useState)(!1),[Q,J]=(0,r.useState)([]),[R,H]=(0,r.useState)(!1),[W,K]=(0,r.useState)(""),[Y,Z]=(0,r.useState)(!1),G=(0,r.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&P(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,r.useEffect)(()=>{n&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),I&&I(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const X=async()=>{if(R)return;const e=O.trim(),r=Q.length>0;if((e||r)&&!Y){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:O.trim(),attachments:r?Q:void 0,is_internal:L||void 0})})).ok&&(U(""),J([]),M(!1),V())}catch(o){console.error("Error adding comment:",o)}finally{Z(!1)}}},ee=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),r=Math.floor(n/6e4);if(r<1)return"Just now";if(r<60)return`${r}m ago`;const o=Math.floor(r/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",q.length,")"]}),q.length>0?(0,s.jsx)(c,{children:q.map(e=>{var t,n,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(f,{children:"Internal"}),(0,s.jsx)(y,{children:ee(e.createdAt)}),o&&e.author_id===o&&(0,s.jsx)(j,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&V()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(v,{children:e.content.split("\n").map((e,t)=>(0,s.jsxs)(r.Fragment,{children:[t>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(B,{children:"No comments yet"}),(0,s.jsxs)(b,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(w,{value:O,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:L?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(C,{onClick:X,disabled:!O.trim()&&0===Q.length||Y||R,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(D,{children:[(0,s.jsx)("input",{type:"checkbox",checked:L,onChange:e=>M(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Q.length>0||R||W)&&(0,s.jsxs)(E,{children:[R&&(0,s.jsx)(S,{children:"Uploading..."}),W&&(0,s.jsx)($,{children:W}),Q.map((e,t)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(_,{onClick:()=>(e=>{const t=Q[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),J(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(T,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-Q.length,r=Array.from(t).slice(0,n);if(e.target.value="",0!==r.length){H(!0),K("");try{const e=new FormData;r.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await n.json();o.success&&o.data?J(e=>[...e,...o.data]):K(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),K("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},8744:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ae});var r=n(9950),o=n(4752),i=n(2853),a=n(8409),s=n(2597),l=n(2653),d=n(6038),c=n(4302),p=n(1367),x=n(4414);const h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,g=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,m=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,f=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=o.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=o.Ay.div`
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
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=o.Ay.div`
  flex: 1;
  min-width: 0;
`,A=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,k=o.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,E=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,z=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin: 8px 0 4px 0;
`,_=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,$=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=o.Ay.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`,N=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,D=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,I=o.Ay.div`
  font-size: 14px;
`,q=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,P=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,O=o.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,U=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,L=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,M=o.Ay.div`
  margin-bottom: 20px;
`,Q=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,J=o.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,R=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,H=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,W=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,K=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,Y=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,Z=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,G=o.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,V=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F0F4FF;
  }

  &:last-child {
    border-bottom: none;
  }
`,X=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ee=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,te=o.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,ne=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,re=o.Ay.div`
  flex: 1;
`,oe=["new","contacted","confirmed"],ie=["invoiced","cancelled"],ae=()=>{var e,t,n,o,ae,se,le,de;const{user:ce}=(0,p.As)(),[pe,xe]=(0,r.useState)([]),[he,ue]=(0,r.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[ge,me]=(0,r.useState)(!0),[fe,ye]=(0,r.useState)(""),[ve,je]=(0,r.useState)("all"),[be,Fe]=(0,l.M)("active"),[we,Ae]=(0,r.useState)(!1),[ke,Ce]=(0,r.useState)(null),[Be,Ee]=(0,r.useState)(""),[ze,_e]=(0,r.useState)(""),[Se,$e]=(0,r.useState)(!1),[Te,Ne]=(0,r.useState)(!1),[De,Ie]=(0,r.useState)(!1),[qe,Pe]=(0,r.useState)(""),[Oe,Ue]=(0,r.useState)([]),[Le,Me]=(0,r.useState)(!1),[Qe,Je]=(0,r.useState)(!1),[Re,He]=(0,r.useState)(""),[We,Ke]=(0,r.useState)("none"),[Ye,Ze]=(0,r.useState)(""),[Ge,Ve]=(0,r.useState)([]),[Xe,et]=(0,r.useState)(!1),tt=()=>localStorage.getItem("auth_token"),nt=(0,r.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||me(!0);const t=tt(),n=new URLSearchParams;"all"!==ve&&n.append("status",ve),fe&&n.append("search",fe);const[r,o]=await Promise.all([fetch(`/api/hardware-quotes?${n}`,{headers:{Authorization:`Bearer ${t}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${t}`}})]);if(r.ok){const e=await r.json();xe(e.data||e)}if(o.ok){const e=await o.json();ue(e.data||e)}}catch(t){console.error("Error loading hardware quotes:",t)}finally{me(!1)}},[fe,ve]);(0,r.useEffect)(()=>{nt()},[nt]),(0,r.useEffect)(()=>{const e=setInterval(()=>nt(!0),1e4);return()=>clearInterval(e)},[nt]);const rt=pe.filter(e=>("active"===be?oe:ie).includes(e.status)),ot=pe.filter(e=>oe.includes(e.status)).length,it=pe.filter(e=>ie.includes(e.status)).length,at=async e=>{try{const t=tt(),n=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),t=e.data||e;Ce(t),Ee(t.status),_e(t.admin_notes||""),Ae(!0)}}catch(t){console.error("Error loading quote detail:",t)}},st=()=>{Pe(""),Ue([]),Ie(!0)},lt=(0,r.useCallback)(async e=>{if(e.length<2)Ue([]);else{Me(!0);try{const t=tt(),n=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),t=Array.isArray(e)?e:e.data||[];Ue(t.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(t){console.error("Error searching users:",t)}finally{Me(!1)}}},[]);(0,r.useEffect)(()=>{const e=setTimeout(()=>{qe&&lt(qe)},300);return()=>clearTimeout(e)},[qe,lt]);const dt=(e,t,n)=>{Ve(r=>r.map((r,o)=>o===e?{...r,[t]:n}:r))},ct=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),pt=e=>e.charAt(0).toUpperCase()+e.slice(1),xt=(null===ke||void 0===ke?void 0:ke.currency)||"MYR";return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(a.mc,{children:[(0,x.jsx)(a.Y9,{children:(0,x.jsx)(a.hE,{children:"Hardware Quotes"})}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{color:"#635BFF",children:[(0,x.jsx)(g,{children:he.total}),(0,x.jsx)(m,{children:"Total"})]}),(0,x.jsxs)(u,{color:"#F59E0B",children:[(0,x.jsx)(g,{children:he.new}),(0,x.jsx)(m,{children:"New"})]}),(0,x.jsxs)(u,{color:"#3B82F6",children:[(0,x.jsx)(g,{children:he.contacted}),(0,x.jsx)(m,{children:"Contacted"})]}),(0,x.jsxs)(u,{color:"#10B981",children:[(0,x.jsx)(g,{children:he.confirmed}),(0,x.jsx)(m,{children:"Confirmed"})]}),(0,x.jsxs)(u,{color:"#8B5CF6",children:[(0,x.jsx)(g,{children:he.invoiced}),(0,x.jsx)(m,{children:"Invoiced"})]})]}),(0,x.jsxs)(s.tU,{children:[(0,x.jsxs)(s.oz,{active:"active"===be,onClick:()=>Fe("active"),children:["Active Quotes (",ot,")"]}),(0,x.jsxs)(s.oz,{active:"closed"===be,onClick:()=>Fe("closed"),children:["Closed Quotes (",it,")"]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(y,{placeholder:"Search by name, email, company, quote number...",value:fe,onChange:e=>ye(e.target.value)}),(0,x.jsxs)(v,{value:ve,onChange:e=>je(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),"active"===be?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"new",children:"New"}),(0,x.jsx)("option",{value:"contacted",children:"Contacted"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),ge?(0,x.jsx)(i.pp,{children:"Loading..."}):0===rt.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,x.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","active"===be?"active":"closed"," quotes"]}),(0,x.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,x.jsx)(j,{children:rt.map(e=>{var t,n,r;return(0,x.jsxs)(b,{onClick:()=>at(e),children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:e.quote_number}),(0,x.jsx)(k,{children:e.contact_name}),(0,x.jsx)(C,{children:e.contact_email}),e.company_name&&(0,x.jsx)(B,{children:e.company_name})]}),(0,x.jsx)(E,{status:e.status,children:pt(e.status)})]}),(0,x.jsx)(z,{children:(null===(t=e.packageProduct)||void 0===t?void 0:t.name)||(null===(n=e.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),e.addon_items&&e.addon_items.length>0&&(0,x.jsx)(_,{children:(r=e.addon_items,r&&0!==r.length?"+ "+r.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,x.jsx)(S,{children:(0,d.vv)(e.total_amount,e.currency)}),(0,x.jsxs)($,{children:[(0,x.jsx)("span",{children:ct(e.created_at)}),"active"===be&&(0,x.jsx)(T,{onClick:t=>{t.stopPropagation(),(async e=>{try{const t=tt();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(xe(t=>t.map(t=>t.id===e.id?{...t,status:"cancelled"}:t)),nt(!0))}catch(t){console.error("Error closing quote:",t)}})(e)},children:"Close"})]})]},e.id)})})]}),we&&ke&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ae(!1),title:`Quote ${ke.quote_number}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(U,{variant:"danger",onClick:()=>Ne(!0),children:"Delete"}),(0,x.jsx)("div",{style:{flex:1}}),"confirmed"===ke.status&&!ke.invoice_id&&(0,x.jsx)(U,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),He(e.toISOString().split("T")[0]),Ke("none"),Ze(""),Ve([]),Je(!0)},children:"Create Invoice"}),(0,x.jsx)(U,{onClick:()=>Ae(!1),children:"Close"})]}),children:[(0,x.jsx)(N,{style:{marginTop:0},children:"Quote Info"}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Quote Number"}),(0,x.jsx)(P,{style:{fontFamily:"monospace"},children:ke.quote_number})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Status"}),(0,x.jsx)(P,{children:(0,x.jsxs)(O,{value:Be,onChange:e=>(async e=>{if(ke){Ee(e);try{const t=tt();(await fetch(`/api/hardware-quotes/${ke.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(xe(t=>t.map(t=>t.id===ke.id?{...t,status:e}:t)),Ce(t=>t?{...t,status:e}:null),nt(!0))}catch(t){console.error("Error updating status:",t)}}})(e.target.value),disabled:"invoiced"===Be,children:[(0,x.jsx)("option",{value:"new",children:"New"}),(0,x.jsx)("option",{value:"contacted",children:"Contacted"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"}),"invoiced"===Be&&(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Created"}),(0,x.jsx)(P,{children:ct(ke.created_at)})]})]}),(0,x.jsx)(N,{children:"Customer Info"}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Name"}),(0,x.jsx)(P,{children:ke.contact_name})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Email"}),(0,x.jsx)(P,{children:ke.contact_email})]}),ke.contact_phone&&(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Phone"}),(0,x.jsx)(P,{children:ke.contact_phone})]}),ke.company_name&&(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Company"}),(0,x.jsx)(P,{children:ke.company_name})]})]}),(0,x.jsx)(N,{children:"Linked User"}),ke.user?(0,x.jsxs)(Y,{children:[(0,x.jsxs)(Z,{children:[(0,x.jsx)("strong",{children:ke.user.full_name}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",ke.user.email,")"]}),(0,x.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:ke.user.role})]}),(0,x.jsx)(U,{onClick:st,children:"Change"})]}):(0,x.jsxs)(Y,{style:{background:"#F9FAFB"},children:[(0,x.jsx)(Z,{style:{color:"#6B7280"},children:"Not linked"}),(0,x.jsx)(U,{variant:"primary",onClick:st,children:"Link User"})]}),(0,x.jsx)(N,{children:"Quote Details"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,x.jsxs)(W,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(e=ke.packageProduct)||void 0===e?void 0:e.name)||(null===(t=ke.package_snapshot)||void 0===t?void 0:t.name)||"N/A"}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(n=ke.packageProduct)||void 0===n?void 0:n.set_group)||""," - ",(null===(o=ke.packageProduct)||void 0===o?void 0:o.set_tier)||"",")"]})]}),(0,x.jsx)("div",{style:{fontWeight:600},children:(0,d.vv)(ke.package_price,xt)})]}),ke.addon_items&&ke.addon_items.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),ke.addon_items.map((e,t)=>(0,x.jsxs)(W,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,xt)})]},t))]}),(0,x.jsxs)(K,{children:[(0,x.jsx)("div",{children:"Total"}),(0,x.jsx)("div",{children:(0,d.vv)(ke.total_amount,xt)})]})]}),ke.message&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Customer Message"}),(0,x.jsx)(L,{children:ke.message})]}),(0,x.jsx)(N,{children:"Admin Notes"}),(0,x.jsxs)(M,{style:{marginBottom:0},children:[(0,x.jsx)(J,{value:ze,onChange:e=>_e(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,x.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,x.jsx)(U,{variant:"primary",onClick:async()=>{if(ke){$e(!0);try{const e=tt();(await fetch(`/api/hardware-quotes/${ke.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:ze})})).ok&&Ce(e=>e?{...e,admin_notes:ze}:null)}catch(e){console.error("Error saving notes:",e)}finally{$e(!1)}}},disabled:Se||ze===(ke.admin_notes||""),children:Se?"Saving...":"Save Notes"})})]}),(0,x.jsx)(N,{children:"Comments"}),(0,x.jsx)(c.A,{entityType:"hardware_quote",entityId:String(ke.id),currentUserId:null===ce||void 0===ce?void 0:ce.id}),ke.invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Invoice"}),(0,x.jsx)(te,{children:(0,x.jsxs)(D,{style:{marginBottom:0},children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Invoice Number"}),(0,x.jsx)(P,{style:{fontFamily:"monospace"},children:ke.invoice.invoice_number})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Status"}),(0,x.jsx)(P,{children:(0,x.jsx)(E,{status:ke.invoice.status,children:pt(ke.invoice.status)})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{children:"Amount"}),(0,x.jsx)(P,{style:{fontWeight:600},children:(0,d.vv)(ke.invoice.total_amount,ke.invoice.currency)})]})]})})]})]}),De&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ie(!1),title:"Link User to Quote",footer:(0,x.jsx)(U,{onClick:()=>Ie(!1),children:"Cancel"}),children:[(0,x.jsxs)(M,{children:[(0,x.jsx)(Q,{children:"Search users by name or email"}),(0,x.jsx)(R,{value:qe,onChange:e=>Pe(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Le&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Oe.length>0&&(0,x.jsx)(G,{children:Oe.map(e=>(0,x.jsxs)(V,{onClick:()=>(async e=>{if(ke)try{const t=tt();(await fetch(`/api/hardware-quotes/${ke.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(Ie(!1),at(ke))}catch(t){console.error("Error linking user:",t)}})(e.id),children:[(0,x.jsx)(X,{children:e.full_name}),(0,x.jsxs)(ee,{children:[e.email," - ",e.role]})]},e.id))}),qe.length>=2&&!Le&&0===Oe.length&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),Qe&&ke&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>Je(!1),title:"Create Invoice from Quote",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(U,{onClick:()=>Je(!1),children:"Cancel"}),(0,x.jsx)(U,{variant:"primary",onClick:async()=>{if(ke){et(!0);try{const e=tt(),t={due_date:Re};"none"!==We&&Ye&&(t.discount_type=We,t.discount_value=parseFloat(Ye));const n=Ge.filter(e=>e.name&&e.amount);n.length>0&&(t.additional_charges=n.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const r=await fetch(`/api/hardware-quotes/${ke.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(r.ok)Je(!1),Ae(!1),nt();else{const e=await r.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{et(!1)}}},disabled:Xe,children:Xe?"Creating...":"Create Invoice"})]}),children:[(0,x.jsx)(N,{style:{marginTop:0},children:"Quote Summary"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(W,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(ae=ke.packageProduct)||void 0===ae?void 0:ae.name)||(null===(se=ke.package_snapshot)||void 0===se?void 0:se.name)||"N/A"})," (",(null===(le=ke.packageProduct)||void 0===le?void 0:le.set_group)||""," - ",(null===(de=ke.packageProduct)||void 0===de?void 0:de.set_tier)||"",")"]}),(0,x.jsx)("div",{children:(0,d.vv)(ke.package_price,xt)})]}),ke.addon_items&&ke.addon_items.map((e,t)=>(0,x.jsxs)(W,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,xt)})]},t)),(0,x.jsxs)(K,{children:[(0,x.jsx)("div",{children:"Subtotal"}),(0,x.jsx)("div",{children:(0,d.vv)(ke.total_amount,xt)})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(Q,{children:"Due Date"}),(0,x.jsx)(R,{type:"date",value:Re,onChange:e=>He(e.target.value)})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(Q,{children:"Discount"}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(H,{style:{width:"auto",minWidth:150},value:We,onChange:e=>Ke(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:"No Discount"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==We&&(0,x.jsx)(R,{type:"number",min:"0",step:"0.01",value:Ye,onChange:e=>Ze(e.target.value),placeholder:"percentage"===We?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(Q,{children:"Additional Charges"}),Ge.map((e,t)=>(0,x.jsxs)(ne,{children:[(0,x.jsx)(re,{children:(0,x.jsx)(R,{value:e.name,onChange:e=>dt(t,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(re,{children:(0,x.jsx)(R,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>dt(t,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(U,{variant:"danger",onClick:()=>{return e=t,void Ve(t=>t.filter((t,n)=>n!==e));var e},style:{flexShrink:0},children:"Remove"})]},t)),(0,x.jsx)(U,{onClick:()=>{Ve(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsxs)(K,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:"Invoice Total"}),(0,x.jsx)("div",{children:(0,d.vv)((()=>{if(!ke)return 0;let e=ke.total_amount;return"percentage"===We&&Ye?e-=e*(parseFloat(Ye)/100):"fixed"===We&&Ye&&(e-=parseFloat(Ye)),Ge.forEach(t=>{t.amount&&(e+=parseFloat(t.amount))}),Math.max(0,e)})(),xt)})]})]}),Te&&(0,x.jsx)(a.aF,{isOpen:!0,onClose:()=>Ne(!1),title:"Confirm Delete",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(U,{onClick:()=>Ne(!1),children:"Cancel"}),(0,x.jsx)(U,{variant:"danger",onClick:async()=>{if(ke)try{const e=tt();await fetch(`/api/hardware-quotes/${ke.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Ne(!1),Ae(!1),nt()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,x.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,x.jsx)("strong",{children:null===ke||void 0===ke?void 0:ke.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var r=n(9950),o=n(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(i);return 1===t.length?e:t.map((e,t)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,o.jsx)(r.Fragment,{children:e},t))}}}]);