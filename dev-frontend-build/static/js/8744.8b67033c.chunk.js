"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2653:(e,n,r)=>{r.d(n,{M:()=>t});var i=r(9950),a=r(4492);function t(e){const[n,r]=(0,a.ok)(),t=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[o,s]=(0,i.useState)(t());return[o,(0,i.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4185:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var i=r(4752),a=r(4414);const t=i.Ay.div`
  margin-top: 12px;
`,o=i.Ay.div`
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
`,l=i.Ay.span`
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
`,h=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,u=i.Ay.a`
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
`;const x=e=>{let{attachments:n}=e;if(!n||0===n.length)return null;const r=n.filter(e=>{var n;return null===(n=e.mimeType)||void 0===n?void 0:n.startsWith("image/")}),i=n.filter(e=>{var n;return!(null!==(n=e.mimeType)&&void 0!==n&&n.startsWith("image/"))});return(0,a.jsxs)(t,{children:[(0,a.jsxs)(o,{children:["Attachments (",n.length,")"]}),r.length>0&&(0,a.jsx)(h,{children:r.map((e,n)=>(0,a.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,a.jsx)("img",{src:e.url,alt:e.originalName})},n))}),i.length>0&&(0,a.jsx)(s,{children:i.map((e,n)=>{return(0,a.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,a.jsx)(l,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,a.jsx)(c,{children:e.originalName}),(0,a.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},n);var r,i})})]})}},4302:(e,n,r)=>{r.d(n,{A:()=>I});var i=r(9950),a=r(4752),t=r(4185),o=r(9061),s=r(5030),d=r(4414);const l=a.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=a.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,h=a.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,u=a.Ay.div`
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
`,x=a.Ay.div`
  flex: 1;
  min-width: 0;
`,g=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=a.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,v=a.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=a.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,j=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,y=a.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=a.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,w=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=a.Ay.textarea`
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
`,_=a.Ay.div`
  display: flex;
  gap: 4px;
`,k=a.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,C=a.Ay.button`
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
`,B=a.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,P=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=a.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=a.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,Q=a.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=a.Ay.input`
  display: none;
`,$=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,D=a.Ay.label`
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
`,I=e=>{let{entityType:n,entityId:r,currentUserId:a,onMarkRead:I}=e;const{t:q}=(0,s.Bd)("common"),[N,O]=(0,i.useState)([]),[W,U]=(0,i.useState)(""),[R,L]=(0,i.useState)(!1),[M,J]=(0,i.useState)([]),[H,K]=(0,i.useState)(!1),[Y,G]=(0,i.useState)(""),[V,X]=(0,i.useState)(!1),Z=(0,i.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${n}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r})}),I&&I(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[n,r]);const ne=async()=>{if(H)return;const e=W.trim(),i=M.length>0;if((e||i)&&!V){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r,content:W.trim(),attachments:i?M:void 0,is_internal:R||void 0})})).ok&&(U(""),J([]),L(!1),ee())}catch(a){console.error("Error adding comment:",a)}finally{X(!1)}}},re=e=>{const n=new Date(e),r=(new Date).getTime()-n.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const a=Math.floor(i/60);if(a<24)return`${a}h ago`;const t=Math.floor(a/24);return t<7?`${t}d ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(l,{children:[(0,d.jsxs)(c,{children:["Comments (",N.length,")"]}),N.length>0?(0,d.jsx)(p,{children:N.map(e=>{var n,r,s;return(0,d.jsxs)(h,{isInternal:e.is_internal,children:[(0,d.jsx)(u,{children:((null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,d.jsx)(v,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,d.jsx)(f,{children:"Internal"}),(0,d.jsx)(j,{children:re(e.createdAt)}),a&&e.author_id===Number(a)&&(0,d.jsx)(b,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&ee()}catch(n){console.error("Error deleting comment:",n)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(y,{children:e.content.split("\n").map((e,n)=>(0,d.jsxs)(i.Fragment,{children:[n>0&&(0,d.jsx)("br",{}),(0,o.c)(e)]},n))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(t.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(B,{children:"No comments yet"}),(0,d.jsxs)(w,{children:[(0,d.jsxs)(F,{children:[(0,d.jsx)(A,{value:W,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(_,{children:[(0,d.jsx)(k,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(C,{onClick:ne,disabled:!W.trim()&&0===M.length||V||H,children:"Send"})]})]}),(0,d.jsx)($,{children:(0,d.jsxs)(D,{children:[(0,d.jsx)("input",{type:"checkbox",checked:R,onChange:e=>L(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(M.length>0||H||Y)&&(0,d.jsxs)(P,{children:[H&&(0,d.jsx)(z,{children:"Uploading..."}),Y&&(0,d.jsx)(Q,{children:Y}),M.map((e,n)=>(0,d.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)(S,{onClick:()=>(e=>{const n=M[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:n.url})}).catch(()=>{}),J(n=>n.filter((n,r)=>r!==e))})(n),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(T,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const n=e.target.files;if(!n||0===n.length)return;const r=5-M.length,i=Array.from(n).slice(0,r);if(e.target.value="",0!==i.length){K(!0),G("");try{const e=new FormData;i.forEach(n=>e.append("files",n));const n=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await r.json();a.success&&a.data?J(e=>[...e,...a.data]):G(a.message||"Upload failed")}catch(a){console.error("File upload error:",a),G("File upload failed. Please try again.")}finally{K(!1)}}}})]})}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ce});var i=r(9950),a=r(4492),t=r(4752),o=r(2853),s=r(8409),d=r(2597),l=r(2653),c=r(6038),p=r(4302),h=r(1367),u=r(5030),x=r(4414);const g=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,v=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,f=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,j=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,b=t.Ay.select`
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
`,w=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,F=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,_=t.Ay.div`
  flex: 1;
  min-width: 0;
`,k=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,C=t.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=t.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,P=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,E=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,S=t.Ay.div`
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
`,z=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,Q=t.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,T=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,$=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=t.Ay.button`
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
`,I=t.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,q=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,N=t.Ay.div`
  font-size: 14px;
`,O=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,W=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,U=t.Ay.select`
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
`,R=t.Ay.button`
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
`,L=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,M=t.Ay.div`
  margin-bottom: 20px;
`,J=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,H=t.Ay.textarea`
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
`,K=t.Ay.input`
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
`,Y=t.Ay.select`
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
`,G=t.Ay.div`
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
`,V=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,X=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,Z=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,ee=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,ne=t.Ay.div`
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
`,re=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ie=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,ae=t.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,te=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,oe=t.Ay.div`
  flex: 1;
`,se=["new"],de=["contacted","confirmed"],le=["invoiced","cancelled"],ce=()=>{var e,n,r,t,ce,pe,he,ue,xe,ge,me,ve,fe,je,ye,be,we,Fe,Ae,_e,ke,Ce;const{t:Be}=(0,u.Bd)("admin"),{user:Pe}=(0,h.As)(),[Ee,Se]=(0,i.useState)([]),[ze,Qe]=(0,i.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[Te,$e]=(0,i.useState)(!0),[De]=(0,a.ok)(),[Ie,qe]=(0,i.useState)(De.get("search")||""),[Ne,Oe]=(0,i.useState)("all"),[We,Ue]=(0,l.M)("new"),[Re,Le]=(0,i.useState)(!1),[Me,Je]=(0,i.useState)(null),[He,Ke]=(0,i.useState)(""),[Ye,Ge]=(0,i.useState)(""),[Ve,Xe]=(0,i.useState)(!1),[Ze,en]=(0,i.useState)(!1),[nn,rn]=(0,i.useState)(!1),[an,tn]=(0,i.useState)(""),[on,sn]=(0,i.useState)([]),[dn,ln]=(0,i.useState)(!1),[cn,pn]=(0,i.useState)(!1),[hn,un]=(0,i.useState)(""),[xn,gn]=(0,i.useState)("none"),[mn,vn]=(0,i.useState)(""),[fn,jn]=(0,i.useState)([]),[yn,bn]=(0,i.useState)(!1),[wn,Fn]=(0,i.useState)(!1),[An,_n]=(0,i.useState)(""),[kn,Cn]=(0,i.useState)("none"),[Bn,Pn]=(0,i.useState)(""),[En,Sn]=(0,i.useState)([]),[zn,Qn]=(0,i.useState)(!1),[Tn,$n]=(0,i.useState)(!1),[Dn,In]=(0,i.useState)(null),qn=()=>localStorage.getItem("auth_token"),Nn=(0,i.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||$e(!0);const n=qn(),r=new URLSearchParams;"all"!==Ne&&r.append("status",Ne),Ie&&r.append("search",Ie);const[i,a]=await Promise.all([fetch(`/api/hardware-quotes?${r}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(i.ok){const e=await i.json();Se(e.data||e)}if(a.ok){const e=await a.json();Qe(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{$e(!1)}},[Ie,Ne]);(0,i.useEffect)(()=>{Nn()},[Nn]),(0,i.useEffect)(()=>{const e=setInterval(()=>Nn(!0),1e4);return()=>clearInterval(e)},[Nn]);const On=Ee.filter(e=>("new"===We?se:"progress"===We?de:le).includes(e.status)),Wn=Ee.filter(e=>se.includes(e.status)).length,Un=Ee.filter(e=>de.includes(e.status)).length,Rn=Ee.filter(e=>le.includes(e.status)).length,Ln=async e=>{try{const n=qn(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;Je(n),Ke(n.status),Ge(n.admin_notes||""),Le(!0)}}catch(n){console.error("Error loading quote detail:",n)}},Mn=()=>{tn(""),sn([]),rn(!0)},Jn=(0,i.useCallback)(async e=>{if(e.length<2)sn([]);else{ln(!0);try{const n=qn(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];sn(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{ln(!1)}}},[]);(0,i.useEffect)(()=>{const e=setTimeout(()=>{an&&Jn(an)},300);return()=>clearTimeout(e)},[an,Jn]);const Hn=(e,n,r)=>{jn(i=>i.map((i,a)=>a===e?{...i,[n]:r}:i))},Kn=(e,n,r)=>{Sn(i=>i.map((i,a)=>a===e?{...i,[n]:r}:i))},Yn=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Gn=e=>({new:"New",contacted:"In Progress",confirmed:"Confirmed",invoiced:"Invoiced",cancelled:"Closed"}[e]||e.charAt(0).toUpperCase()+e.slice(1)),Vn=(null===Me||void 0===Me?void 0:Me.currency)||"MYR";return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsx)(s.Y9,{children:(0,x.jsx)(s.hE,{children:Be("admin:hardwareQuotesPage.hardwareQuotes")})}),(0,x.jsxs)(s.UC,{children:[(0,x.jsxs)(g,{children:[(0,x.jsxs)(m,{color:"#635BFF",children:[(0,x.jsx)(v,{children:ze.total}),(0,x.jsx)(f,{children:Be("admin:hardwareQuotesPage.total")})]}),(0,x.jsxs)(m,{color:"#F59E0B",children:[(0,x.jsx)(v,{children:ze.new}),(0,x.jsx)(f,{children:Be("admin:hardwareQuotesPage.new")})]}),(0,x.jsxs)(m,{color:"#3B82F6",children:[(0,x.jsx)(v,{children:ze.contacted}),(0,x.jsx)(f,{children:Be("admin:hardwareQuotesPage.contacted")})]}),(0,x.jsxs)(m,{color:"#10B981",children:[(0,x.jsx)(v,{children:ze.confirmed}),(0,x.jsx)(f,{children:Be("admin:hardwareQuotesPage.confirmed")})]}),(0,x.jsxs)(m,{color:"#8B5CF6",children:[(0,x.jsx)(v,{children:ze.invoiced}),(0,x.jsx)(f,{children:Be("admin:hardwareQuotesPage.invoiced")})]})]}),(0,x.jsxs)(d.tU,{children:[(0,x.jsxs)(d.oz,{active:"new"===We,onClick:()=>Ue("new"),children:["New (",Wn,")"]}),(0,x.jsxs)(d.oz,{active:"progress"===We,onClick:()=>Ue("progress"),children:["In Progress (",Un,")"]}),(0,x.jsxs)(d.oz,{active:"closed"===We,onClick:()=>Ue("closed"),children:["Closed (",Rn,")"]})]}),(0,x.jsxs)(j,{children:[(0,x.jsx)(y,{placeholder:"Search by name, email, company, quote number...",value:Ie,onChange:e=>qe(e.target.value)}),(0,x.jsxs)(b,{value:Ne,onChange:e=>Oe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:Be("admin:hardwareQuotesPage.allStatus")}),"new"===We?(0,x.jsx)("option",{value:"new",children:Be("admin:hardwareQuotesPage.new")}):"progress"===We?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"contacted",children:Be("admin:hardwareQuotesPage.contacted")}),(0,x.jsx)("option",{value:"confirmed",children:Be("admin:hardwareQuotesPage.confirmed")})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"invoiced",children:Be("admin:hardwareQuotesPage.invoiced")}),(0,x.jsx)("option",{value:"cancelled",children:Be("admin:hardwareQuotesPage.cancelled")})]})]})]}),Te?(0,x.jsx)(o.pp,{children:Be("admin:hardwareQuotesPage.loading")}):0===On.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,x.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","new"===We?"new":"progress"===We?"in progress":"closed"," quotes"]}),(0,x.jsx)("p",{children:Be("admin:hardwareQuotesPage.hardwareQuotesWillAppearHereWhenSubmitted")})]}):(0,x.jsx)(w,{children:On.map(e=>{var n,r,i,a,t;return(0,x.jsxs)(F,{onClick:()=>Ln(e),children:[(0,x.jsxs)(A,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(k,{children:e.quote_number}),(0,x.jsx)(C,{children:e.contact_name}),(0,x.jsx)(B,{children:e.contact_email}),e.company_name&&(0,x.jsx)(P,{children:e.company_name})]}),(0,x.jsx)(E,{status:e.status,children:Gn(e.status)})]}),(0,x.jsx)(S,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(r=e.package_snapshot)||void 0===r?void 0:r.name)||"N/A"}),e.plan_id&&(0,x.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:600,background:"#ECFDF5",color:"#059669",marginBottom:"4px"},children:["+ Subscription: ",(null===(i=e.plan_snapshot)||void 0===i?void 0:i.display_name)||"Plan"," (",e.billing_cycle||"monthly",")"]}),e.addon_items&&e.addon_items.length>0&&(0,x.jsx)(z,{children:(t=e.addon_items,t&&0!==t.length?"+ "+t.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,x.jsx)(Q,{children:(0,c.vv)(e.total_amount,e.currency)}),e.invoice_id&&(0,x.jsxs)("div",{style:{marginTop:"8px",display:"flex",alignItems:"center",gap:"6px"},children:[(0,x.jsx)("span",{style:{padding:"3px 8px",fontSize:"11px",fontWeight:600,background:"#ECFDF5",color:"#059669",borderRadius:"4px"},children:Be("admin:hardwareQuotesPage.invoiceCreated")}),(null===(a=e.invoice)||void 0===a?void 0:a.invoice_number)&&(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${e.invoice.invoice_number}`,onClick:e=>e.stopPropagation(),style:{fontSize:"11px",color:"#635BFF",textDecoration:"none",fontWeight:500},children:[e.invoice.invoice_number," \u2192"]})]}),(0,x.jsx)(T,{}),(0,x.jsxs)($,{children:[(0,x.jsx)("span",{children:Yn(e.created_at)}),"new"===We&&(0,x.jsx)(D,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=qn();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"contacted"})})).ok&&(Se(n=>n.map(n=>n.id===e.id?{...n,status:"contacted"}:n)),Nn(!0))}catch(n){console.error("Error starting process:",n)}})(e)},style:{background:"#F0F0FF",color:"#635BFF",borderColor:"#635BFF"},children:"Start Process"}),"progress"===We&&(0,x.jsx)(D,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=qn();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(Se(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),Nn(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),Re&&Me&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>Le(!1),title:`Quote ${Me.quote_number}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{variant:"danger",onClick:()=>en(!0),children:"Delete"}),(0,x.jsx)("div",{style:{flex:1}}),"invoiced"!==Me.status&&"cancelled"!==Me.status&&!Me.invoice_id&&(Me.plan_id?(0,x.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),_n(e.toISOString().split("T")[0]),Cn("none"),Pn(""),Sn([]),Qn(!1),In(null),Le(!1),setTimeout(()=>Fn(!0),200)})(),children:"Proceed Contract"}):(0,x.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),un(e.toISOString().split("T")[0]),gn("none"),vn(""),jn([]),Le(!1),setTimeout(()=>pn(!0),200)})(),children:"Create Invoice"})),(0,x.jsx)(R,{onClick:()=>Le(!1),children:"Close"})]}),children:[(0,x.jsx)(I,{style:{marginTop:0},children:Be("admin:hardwareQuotesPage.quoteInfo")}),(0,x.jsxs)(q,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.quoteNumber")}),(0,x.jsx)(W,{style:{fontFamily:"monospace"},children:Me.quote_number})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.status")}),(0,x.jsx)(W,{children:(0,x.jsxs)(U,{value:He,onChange:e=>(async e=>{if(Me){Ke(e);try{const n=qn();(await fetch(`/api/hardware-quotes/${Me.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(Se(n=>n.map(n=>n.id===Me.id?{...n,status:e}:n)),Je(n=>n?{...n,status:e}:null),Nn(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),disabled:"invoiced"===He,children:[(0,x.jsx)("option",{value:"new",children:Be("admin:hardwareQuotesPage.new")}),(0,x.jsx)("option",{value:"contacted",children:Be("admin:hardwareQuotesPage.inProgress")}),(0,x.jsx)("option",{value:"confirmed",children:Be("admin:hardwareQuotesPage.confirmed")}),"invoiced"===He&&(0,x.jsx)("option",{value:"invoiced",children:Be("admin:hardwareQuotesPage.invoiced")}),(0,x.jsx)("option",{value:"cancelled",children:Be("admin:hardwareQuotesPage.closed")})]})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.created")}),(0,x.jsx)(W,{children:Yn(Me.created_at)})]})]}),(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.customerInfo")}),(0,x.jsxs)(q,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.name")}),(0,x.jsx)(W,{children:Me.contact_name})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.email")}),(0,x.jsx)(W,{children:Me.contact_email})]}),Me.contact_phone&&(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.phone")}),(0,x.jsx)(W,{children:Me.contact_phone})]}),Me.company_name&&(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.company")}),(0,x.jsx)(W,{children:Me.company_name})]})]}),(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.linkedUser")}),Me.user?(0,x.jsxs)(X,{children:[(0,x.jsxs)(Z,{children:[(0,x.jsx)("strong",{children:Me.user.full_name}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Me.user.email,")"]}),(0,x.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Me.user.role})]}),(0,x.jsx)(R,{onClick:Mn,children:Be("admin:hardwareQuotesPage.change")})]}):(0,x.jsxs)(X,{style:{background:"#F9FAFB"},children:[(0,x.jsx)(Z,{style:{color:"#6B7280"},children:Be("admin:hardwareQuotesPage.notLinked")}),(0,x.jsx)(R,{variant:"primary",onClick:Mn,children:Be("admin:hardwareQuotesPage.linkUser")})]}),(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.quoteDetails")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,x.jsxs)(G,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(e=Me.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Me.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(r=Me.packageProduct)||void 0===r?void 0:r.set_group)||""," - ",(null===(t=Me.packageProduct)||void 0===t?void 0:t.set_tier)||"",")"]})]}),(0,x.jsx)("div",{style:{fontWeight:600},children:(0,c.vv)(Me.package_price,Vn)})]}),Me.addon_items&&Me.addon_items.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Me.addon_items.map((e,n)=>(0,x.jsxs)(G,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Vn)})]},n))]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("div",{children:Be("admin:hardwareQuotesPage.total")}),(0,x.jsx)("div",{children:(0,c.vv)(Me.total_amount,Vn)})]}),((null===(ce=Me.package_snapshot)||void 0===ce?void 0:ce.set_setup_items)||(null===(pe=Me.packageProduct)||void 0===pe?void 0:pe.set_setup_items))&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:16,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Included Setup"}),((null===(he=Me.package_snapshot)||void 0===he?void 0:he.set_setup_items)||(null===(ue=Me.packageProduct)||void 0===ue?void 0:ue.set_setup_items)||[]).map((e,n)=>(0,x.jsxs)("div",{style:{fontSize:13,color:"#374151",padding:"3px 0",display:"flex",alignItems:"center",gap:6},children:[(0,x.jsx)("span",{style:{color:"#10B981"},children:"\u2713"})," ",e]},n))]})]}),Me.plan_id&&Me.plan_snapshot&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.subscriptionPlan")}),(0,x.jsx)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:16,borderLeft:"3px solid #059669"},children:(0,x.jsxs)(q,{style:{marginBottom:0},children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.plan")}),(0,x.jsx)(W,{style:{fontWeight:600},children:Me.plan_snapshot.display_name})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.billingCycle")}),(0,x.jsx)(W,{style:{textTransform:"capitalize"},children:Me.billing_cycle||"monthly"})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.monthlyPrice")}),(0,x.jsxs)(W,{children:[(0,c.vv)((null===(xe=Me.plan_snapshot.currency_prices)||void 0===xe||null===(ge=xe[Vn])||void 0===ge?void 0:ge.monthly)||Me.plan_snapshot.base_price_monthly,Vn),"/mo"]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.annualPrice")}),(0,x.jsxs)(W,{children:[(0,c.vv)((null===(me=Me.plan_snapshot.currency_prices)||void 0===me||null===(ve=me[Vn])||void 0===ve?void 0:ve.annual)||Me.plan_snapshot.base_price_annual,Vn),"/yr"]})]})]})})]}),Me.message&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.customerMessage")}),(0,x.jsx)(L,{children:Me.message})]}),(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.adminNotes")}),(0,x.jsxs)(M,{style:{marginBottom:0},children:[(0,x.jsx)(H,{value:Ye,onChange:e=>Ge(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,x.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Me){Xe(!0);try{const e=qn();(await fetch(`/api/hardware-quotes/${Me.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Ye})})).ok&&Je(e=>e?{...e,admin_notes:Ye}:null)}catch(e){console.error("Error saving notes:",e)}finally{Xe(!1)}}},disabled:Ve||Ye===(Me.admin_notes||""),children:Ve?"Saving...":"Save Notes"})})]}),(0,x.jsx)(p.A,{entityType:"hardware_quote",entityId:String(Me.id),currentUserId:null!==Pe&&void 0!==Pe&&Pe.id?Number(Pe.id):void 0}),Me.invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.hardwareInvoice")}),(0,x.jsx)(ae,{children:(0,x.jsxs)(q,{style:{marginBottom:0},children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.invoiceNumber")}),(0,x.jsx)(W,{children:(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${Me.invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Me.invoice.invoice_number," \u2192"]})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.status")}),(0,x.jsx)(W,{children:(0,x.jsx)(E,{status:Me.invoice.status,children:Gn(Me.invoice.status)})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.amount")}),(0,x.jsx)(W,{style:{fontWeight:600},children:(0,c.vv)(Me.invoice.total_amount,Me.invoice.currency)})]})]})})]}),Me.subscription_invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.subscriptionInvoice")}),(0,x.jsx)(ae,{style:{borderLeftColor:"#059669"},children:(0,x.jsxs)(q,{style:{marginBottom:0},children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.invoiceNumber")}),(0,x.jsx)(W,{children:(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${Me.subscription_invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Me.subscription_invoice.invoice_number," \u2192"]})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.status")}),(0,x.jsx)(W,{children:(0,x.jsx)(E,{status:Me.subscription_invoice.status,children:Gn(Me.subscription_invoice.status)})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{children:Be("admin:hardwareQuotesPage.amount")}),(0,x.jsx)(W,{style:{fontWeight:600},children:(0,c.vv)(Me.subscription_invoice.total_amount,Me.subscription_invoice.currency)})]})]})})]})]}),nn&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>rn(!1),title:"Link User to Quote",footer:(0,x.jsx)(R,{onClick:()=>rn(!1),children:Be("admin:hardwareQuotesPage.cancel")}),children:[(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.searchUsersByNameOrEmail")}),(0,x.jsx)(K,{value:an,onChange:e=>tn(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),dn&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:Be("admin:hardwareQuotesPage.searching")}),on.length>0&&(0,x.jsx)(ee,{children:on.map(e=>(0,x.jsxs)(ne,{onClick:()=>(async e=>{if(Me)try{const n=qn();(await fetch(`/api/hardware-quotes/${Me.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(rn(!1),Ln(Me))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,x.jsx)(re,{children:e.full_name}),(0,x.jsxs)(ie,{children:[e.email," - ",e.role]})]},e.id))}),an.length>=2&&!dn&&0===on.length&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:Be("admin:hardwareQuotesPage.noUsersFound")})]}),cn&&Me&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>pn(!1),title:"Create Invoice from Quote",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>pn(!1),children:Be("admin:hardwareQuotesPage.cancel")}),(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Me){bn(!0);try{const e=qn(),n={due_date:hn};"none"!==xn&&mn&&(n.discount_type=xn,n.discount_value=parseFloat(mn));const r=fn.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const i=await fetch(`/api/hardware-quotes/${Me.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(i.ok)pn(!1),Le(!1),Nn();else{const e=await i.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{bn(!1)}}},disabled:yn,children:yn?"Creating...":"Create Invoice"})]}),children:[(0,x.jsx)(I,{style:{marginTop:0},children:Be("admin:hardwareQuotesPage.quoteSummary")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(G,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(fe=Me.packageProduct)||void 0===fe?void 0:fe.name)||(null===(je=Me.package_snapshot)||void 0===je?void 0:je.name)||"N/A"})," (",(null===(ye=Me.packageProduct)||void 0===ye?void 0:ye.set_group)||""," - ",(null===(be=Me.packageProduct)||void 0===be?void 0:be.set_tier)||"",")"]}),(0,x.jsx)("div",{children:(0,c.vv)(Me.package_price,Vn)})]}),Me.addon_items&&Me.addon_items.map((e,n)=>(0,x.jsxs)(G,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Vn)})]},n)),(0,x.jsxs)(V,{children:[(0,x.jsx)("div",{children:Be("admin:hardwareQuotesPage.subtotal")}),(0,x.jsx)("div",{children:(0,c.vv)(Me.total_amount,Vn)})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.dueDate")}),(0,x.jsx)(K,{type:"date",value:hn,onChange:e=>un(e.target.value)})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.discount")}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(Y,{style:{width:"auto",minWidth:150},value:xn,onChange:e=>gn(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:Be("admin:hardwareQuotesPage.noDiscount")}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:Be("admin:hardwareQuotesPage.fixedAmount")})]}),"none"!==xn&&(0,x.jsx)(K,{type:"number",min:"0",step:"0.01",value:mn,onChange:e=>vn(e.target.value),placeholder:"percentage"===xn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.additionalCharges")}),fn.map((e,n)=>(0,x.jsxs)(te,{children:[(0,x.jsx)(oe,{children:(0,x.jsx)(K,{value:e.name,onChange:e=>Hn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(oe,{children:(0,x.jsx)(K,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Hn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void jn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,x.jsx)(R,{onClick:()=>{jn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsxs)(V,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:Be("admin:hardwareQuotesPage.invoiceTotal")}),(0,x.jsx)("div",{children:(0,c.vv)((()=>{if(!Me)return 0;let e=Me.total_amount;return"percentage"===xn&&mn?e-=e*(parseFloat(mn)/100):"fixed"===xn&&mn&&(e-=parseFloat(mn)),fn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Vn)})]})]}),wn&&Me&&(0,x.jsx)(s.aF,{isOpen:!0,onClose:()=>{Fn(!1),In(null)},title:"Proceed Contract",footer:Dn?(0,x.jsx)(R,{onClick:()=>{Fn(!1),Le(!1),In(null),Nn()},children:"Close"}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>Fn(!1),children:Be("admin:hardwareQuotesPage.cancel")}),(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Me){$n(!0);try{const o=qn(),s={due_date:An,mark_as_paid:zn};"none"!==kn&&Bn&&(s.discount_type=kn,s.discount_value=parseFloat(Bn));const d=En.filter(e=>e.name&&e.amount);d.length>0&&(s.additional_charges=d.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const l=await fetch(`/api/hardware-quotes/${Me.id}/proceed`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(l.ok){var e,n,r,i,a,t;const o=await l.json();In({hardware_invoice:(null===(e=o.data)||void 0===e||null===(n=e.hardware_invoice)||void 0===n?void 0:n.invoice_number)||(null===(r=o.hardware_invoice)||void 0===r?void 0:r.invoice_number),subscription_invoice:(null===(i=o.data)||void 0===i||null===(a=i.subscription_invoice)||void 0===a?void 0:a.invoice_number)||(null===(t=o.subscription_invoice)||void 0===t?void 0:t.invoice_number)}),Nn(!0)}else{const e=await l.json();alert(e.message||"Failed to proceed contract")}}catch(o){console.error("Error proceeding contract:",o)}finally{$n(!1)}}},disabled:Tn||!Me.user_id,children:Tn?"Processing...":"Proceed Contract"})]}),children:Dn?(0,x.jsxs)("div",{style:{background:"#ECFDF5",border:"1px solid #10B981",borderRadius:8,padding:24,textAlign:"center",color:"#065F46",lineHeight:1.6},children:[(0,x.jsx)("div",{style:{fontSize:18,fontWeight:700,marginBottom:12},children:Be("admin:hardwareQuotesPage.contractCreatedSuccessfully")}),Dn.hardware_invoice&&(0,x.jsxs)("div",{children:["Hardware Invoice: ",(0,x.jsx)("strong",{style:{fontFamily:"monospace"},children:Dn.hardware_invoice})]}),Dn.subscription_invoice&&(0,x.jsxs)("div",{children:["Subscription Invoice: ",(0,x.jsx)("strong",{style:{fontFamily:"monospace"},children:Dn.subscription_invoice})]})]}):(0,x.jsxs)(x.Fragment,{children:[!Me.user_id&&(0,x.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:"#92400E"},children:"A linked user is required to proceed. Please link a user first."}),(0,x.jsx)(I,{style:{marginTop:0},children:Be("admin:hardwareQuotesPage.hardware")}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(G,{children:[(0,x.jsx)("div",{children:(0,x.jsx)("strong",{children:(null===(we=Me.packageProduct)||void 0===we?void 0:we.name)||(null===(Fe=Me.package_snapshot)||void 0===Fe?void 0:Fe.name)||"N/A"})}),(0,x.jsx)("div",{children:(0,c.vv)(Me.package_price,Vn)})]}),Me.addon_items&&Me.addon_items.map((e,n)=>(0,x.jsxs)(G,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Vn)})]},n)),(0,x.jsxs)(V,{children:[(0,x.jsx)("div",{children:Be("admin:hardwareQuotesPage.hardwareSubtotal")}),(0,x.jsx)("div",{children:(0,c.vv)(Me.total_amount,Vn)})]})]}),Me.plan_snapshot&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{children:Be("admin:hardwareQuotesPage.subscriptionPlan")}),(0,x.jsxs)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:20,borderLeft:"3px solid #059669"},children:[(0,x.jsx)("div",{style:{fontWeight:600,fontSize:14,color:"#0A2540",marginBottom:4},children:Me.plan_snapshot.display_name}),(0,x.jsxs)("div",{style:{fontSize:13,color:"#6B7280"},children:["annual"===Me.billing_cycle?"Annual":"Monthly"," billing -"," ",(0,c.vv)("annual"===Me.billing_cycle?(null===(Ae=Me.plan_snapshot.currency_prices)||void 0===Ae||null===(_e=Ae[Vn])||void 0===_e?void 0:_e.annual)||Me.plan_snapshot.base_price_annual:(null===(ke=Me.plan_snapshot.currency_prices)||void 0===ke||null===(Ce=ke[Vn])||void 0===Ce?void 0:Ce.monthly)||Me.plan_snapshot.base_price_monthly,Vn),"annual"===Me.billing_cycle?"/yr":"/mo"]})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.dueDate")}),(0,x.jsx)(K,{type:"date",value:An,onChange:e=>_n(e.target.value)})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.hardwareDiscount")}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(Y,{style:{width:"auto",minWidth:150},value:kn,onChange:e=>Cn(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:Be("admin:hardwareQuotesPage.noDiscount")}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:Be("admin:hardwareQuotesPage.fixedAmount")})]}),"none"!==kn&&(0,x.jsx)(K,{type:"number",min:"0",step:"0.01",value:Bn,onChange:e=>Pn(e.target.value),placeholder:"percentage"===kn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(J,{children:Be("admin:hardwareQuotesPage.additionalCharges")}),En.map((e,n)=>(0,x.jsxs)(te,{children:[(0,x.jsx)(oe,{children:(0,x.jsx)(K,{value:e.name,onChange:e=>Kn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(oe,{children:(0,x.jsx)(K,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Kn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void Sn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,x.jsx)(R,{onClick:()=>{Sn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsx)(M,{children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",fontSize:"14px",color:"#374151"},children:[(0,x.jsx)("input",{type:"checkbox",checked:zn,onChange:e=>Qn(e.target.checked),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),"Mark hardware invoice as paid"]})}),(0,x.jsxs)(V,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:Be("admin:hardwareQuotesPage.hardwareInvoiceTotal")}),(0,x.jsx)("div",{children:(0,c.vv)((()=>{if(!Me)return 0;let e=Me.total_amount;return"percentage"===kn&&Bn?e-=e*(parseFloat(Bn)/100):"fixed"===kn&&Bn&&(e-=parseFloat(Bn)),En.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Vn)})]})]})}),Ze&&(0,x.jsx)(s.aF,{isOpen:!0,onClose:()=>en(!1),title:"Confirm Delete",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>en(!1),children:Be("admin:hardwareQuotesPage.cancel")}),(0,x.jsx)(R,{variant:"danger",onClick:async()=>{if(Me)try{const e=qn();await fetch(`/api/hardware-quotes/${Me.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),en(!1),Le(!1),Nn()}catch(e){console.error("Error deleting quote:",e)}},children:Be("admin:hardwareQuotesPage.delete")})]}),children:(0,x.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,x.jsx)("strong",{children:null===Me||void 0===Me?void 0:Me.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,n,r)=>{r.d(n,{c:()=>o});var i=r(9950),a=r(4414);const t=/(https?:\/\/[^\s<]+)/g;function o(e){const n=e.split(t);return 1===n.length?e:n.map((e,n)=>t.test(e)?(0,a.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},n):(0,a.jsx)(i.Fragment,{children:e},n))}}}]);