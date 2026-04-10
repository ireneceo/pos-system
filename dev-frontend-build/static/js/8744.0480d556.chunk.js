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
`;const x=e=>{let{attachments:n}=e;if(!n||0===n.length)return null;const r=n.filter(e=>{var n;return null===(n=e.mimeType)||void 0===n?void 0:n.startsWith("image/")}),i=n.filter(e=>{var n;return!(null!==(n=e.mimeType)&&void 0!==n&&n.startsWith("image/"))});return(0,a.jsxs)(t,{children:[(0,a.jsxs)(o,{children:["Attachments (",n.length,")"]}),r.length>0&&(0,a.jsx)(h,{children:r.map((e,n)=>(0,a.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,a.jsx)("img",{src:e.url,alt:e.originalName})},n))}),i.length>0&&(0,a.jsx)(s,{children:i.map((e,n)=>{return(0,a.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,a.jsx)(l,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,a.jsx)(c,{children:e.originalName}),(0,a.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},n);var r,i})})]})}},4302:(e,n,r)=>{r.d(n,{A:()=>N});var i=r(9950),a=r(4752),t=r(4185),o=r(9061),s=r(5030),d=r(9955),l=r(4414);const c=a.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=a.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,h=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,u=a.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=a.Ay.div`
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
`,g=a.Ay.div`
  flex: 1;
  min-width: 0;
`,m=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,v=a.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=a.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,j=a.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=a.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,w=a.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,F=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,_=a.Ay.textarea`
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
`,k=a.Ay.div`
  display: flex;
  gap: 4px;
`,C=a.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,B=a.Ay.button`
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
`,P=a.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=a.Ay.div`
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
`,Q=a.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,T=a.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,$=a.Ay.input`
  display: none;
`,D=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,q=a.Ay.label`
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
`,N=e=>{let{entityType:n,entityId:r,currentUserId:a,onMarkRead:N}=e;const{t:I}=(0,s.Bd)("common"),[O,W]=(0,i.useState)([]),[U,R]=(0,i.useState)(""),[L,M]=(0,i.useState)(!1),[J,H]=(0,i.useState)([]),[K,Y]=(0,i.useState)(!1),[G,V]=(0,i.useState)(""),[X,Z]=(0,i.useState)(!1),ee=(0,i.useRef)(null),ne=async()=>{try{const e=(0,d.c4)(),i=await fetch(`/api/comments/${n}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&W(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(ne(),(async()=>{try{const e=(0,d.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[n,r]);const re=async()=>{if(K)return;const e=U.trim(),i=J.length>0;if((e||i)&&!X){Z(!0);try{const e=(0,d.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r,content:U.trim(),attachments:i?J:void 0,is_internal:L||void 0})})).ok&&(R(""),H([]),M(!1),ne())}catch(a){console.error("Error adding comment:",a)}finally{Z(!1)}}},ie=e=>{const n=new Date(e),r=(new Date).getTime()-n.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const a=Math.floor(i/60);if(a<24)return`${a}h ago`;const t=Math.floor(a/24);return t<7?`${t}d ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:["Comments (",O.length,")"]}),O.length>0?(0,l.jsx)(h,{children:O.map(e=>{var n,r,s;return(0,l.jsxs)(u,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(v,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(j,{children:"Internal"}),(0,l.jsx)(y,{children:ie(e.createdAt)}),a&&e.author_id===Number(a)&&(0,l.jsx)(w,{onClick:()=>(async e=>{try{const n=(0,d.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&ne()}catch(n){console.error("Error deleting comment:",n)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(b,{children:e.content.split("\n").map((e,n)=>(0,l.jsxs)(i.Fragment,{children:[n>0&&(0,l.jsx)("br",{}),(0,o.c)(e)]},n))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(t.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(P,{children:"No comments yet"}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(_,{value:U,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),re())},placeholder:L?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)(C,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(B,{onClick:re,disabled:!U.trim()&&0===J.length||X||K,children:"Send"})]})]}),(0,l.jsx)(D,{children:(0,l.jsxs)(q,{children:[(0,l.jsx)("input",{type:"checkbox",checked:L,onChange:e=>M(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||K||G)&&(0,l.jsxs)(E,{children:[K&&(0,l.jsx)(Q,{children:"Uploading..."}),G&&(0,l.jsx)(T,{children:G}),J.map((e,n)=>(0,l.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(S,{onClick:()=>(e=>{const n=J[e],r=(0,d.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:n.url})}).catch(()=>{}),H(n=>n.filter((n,r)=>r!==e))})(n),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)($,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const n=e.target.files;if(!n||0===n.length)return;const r=5-J.length,i=Array.from(n).slice(0,r);if(e.target.value="",0!==i.length){Y(!0),V("");try{const e=new FormData;i.forEach(n=>e.append("files",n));const n=(0,d.c4)(),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await r.json();a.success&&a.data?H(e=>[...e,...a.data]):V(a.message||"Upload failed")}catch(a){console.error("File upload error:",a),V("File upload failed. Please try again.")}finally{Y(!1)}}}})]})}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>pe});var i=r(9950),a=r(4492),t=r(4752),o=r(2853),s=r(8409),d=r(2597),l=r(2653),c=r(6038),p=r(4302),h=r(1367),u=r(5030),x=r(9955),g=r(4414);const m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,f=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,j=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,y=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,b=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=t.Ay.select`
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
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,A=t.Ay.div`
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
`,_=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,k=t.Ay.div`
  flex: 1;
  min-width: 0;
`,C=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,B=t.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,P=t.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,E=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,z=t.Ay.span`
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
`,Q=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,T=t.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,$=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,D=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,q=t.Ay.button`
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
`,N=t.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,I=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,O=t.Ay.div`
  font-size: 14px;
`,W=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,U=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,R=t.Ay.select`
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
`,L=t.Ay.button`
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
`,M=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,J=t.Ay.div`
  margin-bottom: 20px;
`,H=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,K=t.Ay.textarea`
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
`,Y=t.Ay.input`
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
`,G=t.Ay.select`
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
`,V=t.Ay.div`
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
`,X=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,Z=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,ee=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,ne=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,re=t.Ay.div`
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
`,ie=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ae=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,te=t.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,oe=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,se=t.Ay.div`
  flex: 1;
`,de=["new"],le=["contacted","confirmed"],ce=["invoiced","cancelled"],pe=()=>{var e,n,r,t,pe,he,ue,xe,ge,me,ve,fe,je,ye,be,we,Fe,Ae,_e,ke,Ce,Be;const{t:Pe}=(0,u.Bd)("admin"),{user:Ee}=(0,h.As)(),[ze,Se]=(0,i.useState)([]),[Qe,Te]=(0,i.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[$e,De]=(0,i.useState)(!0),[qe]=(0,a.ok)(),[Ne,Ie]=(0,i.useState)(qe.get("search")||""),[Oe,We]=(0,i.useState)("all"),[Ue,Re]=(0,l.M)("new"),[Le,Me]=(0,i.useState)(!1),[Je,He]=(0,i.useState)(null),[Ke,Ye]=(0,i.useState)(""),[Ge,Ve]=(0,i.useState)(""),[Xe,Ze]=(0,i.useState)(!1),[en,nn]=(0,i.useState)(!1),[rn,an]=(0,i.useState)(!1),[tn,on]=(0,i.useState)(""),[sn,dn]=(0,i.useState)([]),[ln,cn]=(0,i.useState)(!1),[pn,hn]=(0,i.useState)(!1),[un,xn]=(0,i.useState)(""),[gn,mn]=(0,i.useState)("none"),[vn,fn]=(0,i.useState)(""),[jn,yn]=(0,i.useState)([]),[bn,wn]=(0,i.useState)(!1),[Fn,An]=(0,i.useState)(!1),[_n,kn]=(0,i.useState)(""),[Cn,Bn]=(0,i.useState)("none"),[Pn,En]=(0,i.useState)(""),[zn,Sn]=(0,i.useState)([]),[Qn,Tn]=(0,i.useState)(!1),[$n,Dn]=(0,i.useState)(!1),[qn,Nn]=(0,i.useState)(null),In=()=>(0,x.c4)(),On=(0,i.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||De(!0);const n=In(),r=new URLSearchParams;"all"!==Oe&&r.append("status",Oe),Ne&&r.append("search",Ne);const[i,a]=await Promise.all([fetch(`/api/hardware-quotes?${r}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(i.ok){const e=await i.json();Se(e.data||e)}if(a.ok){const e=await a.json();Te(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{De(!1)}},[Ne,Oe]);(0,i.useEffect)(()=>{On()},[On]),(0,i.useEffect)(()=>{const e=setInterval(()=>On(!0),1e4);return()=>clearInterval(e)},[On]);const Wn=ze.filter(e=>("new"===Ue?de:"progress"===Ue?le:ce).includes(e.status)),Un=ze.filter(e=>de.includes(e.status)).length,Rn=ze.filter(e=>le.includes(e.status)).length,Ln=ze.filter(e=>ce.includes(e.status)).length,Mn=async e=>{try{const n=In(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;He(n),Ye(n.status),Ve(n.admin_notes||""),Me(!0)}}catch(n){console.error("Error loading quote detail:",n)}},Jn=()=>{on(""),dn([]),an(!0)},Hn=(0,i.useCallback)(async e=>{if(e.length<2)dn([]);else{cn(!0);try{const n=In(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];dn(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{cn(!1)}}},[]);(0,i.useEffect)(()=>{const e=setTimeout(()=>{tn&&Hn(tn)},300);return()=>clearTimeout(e)},[tn,Hn]);const Kn=(e,n,r)=>{yn(i=>i.map((i,a)=>a===e?{...i,[n]:r}:i))},Yn=(e,n,r)=>{Sn(i=>i.map((i,a)=>a===e?{...i,[n]:r}:i))},Gn=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Vn=e=>({new:"New",contacted:"In Progress",confirmed:"Confirmed",invoiced:"Invoiced",cancelled:"Closed"}[e]||e.charAt(0).toUpperCase()+e.slice(1)),Xn=(null===Je||void 0===Je?void 0:Je.currency)||"MYR";return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(s.mc,{children:[(0,g.jsx)(s.Y9,{children:(0,g.jsx)(s.hE,{children:Pe("admin:hardwareQuotesPage.hardwareQuotes")})}),(0,g.jsxs)(s.UC,{children:[(0,g.jsxs)(m,{children:[(0,g.jsxs)(v,{color:"#635BFF",children:[(0,g.jsx)(f,{children:Qe.total}),(0,g.jsx)(j,{children:Pe("admin:hardwareQuotesPage.total")})]}),(0,g.jsxs)(v,{color:"#F59E0B",children:[(0,g.jsx)(f,{children:Qe.new}),(0,g.jsx)(j,{children:Pe("admin:hardwareQuotesPage.new")})]}),(0,g.jsxs)(v,{color:"#3B82F6",children:[(0,g.jsx)(f,{children:Qe.contacted}),(0,g.jsx)(j,{children:Pe("admin:hardwareQuotesPage.contacted")})]}),(0,g.jsxs)(v,{color:"#10B981",children:[(0,g.jsx)(f,{children:Qe.confirmed}),(0,g.jsx)(j,{children:Pe("admin:hardwareQuotesPage.confirmed")})]}),(0,g.jsxs)(v,{color:"#8B5CF6",children:[(0,g.jsx)(f,{children:Qe.invoiced}),(0,g.jsx)(j,{children:Pe("admin:hardwareQuotesPage.invoiced")})]})]}),(0,g.jsxs)(d.tU,{children:[(0,g.jsxs)(d.oz,{active:"new"===Ue,onClick:()=>Re("new"),children:["New (",Un,")"]}),(0,g.jsxs)(d.oz,{active:"progress"===Ue,onClick:()=>Re("progress"),children:["In Progress (",Rn,")"]}),(0,g.jsxs)(d.oz,{active:"closed"===Ue,onClick:()=>Re("closed"),children:["Closed (",Ln,")"]})]}),(0,g.jsxs)(y,{children:[(0,g.jsx)(b,{placeholder:"Search by name, email, company, quote number...",value:Ne,onChange:e=>Ie(e.target.value)}),(0,g.jsxs)(w,{value:Oe,onChange:e=>We(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:Pe("admin:hardwareQuotesPage.allStatus")}),"new"===Ue?(0,g.jsx)("option",{value:"new",children:Pe("admin:hardwareQuotesPage.new")}):"progress"===Ue?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"contacted",children:Pe("admin:hardwareQuotesPage.contacted")}),(0,g.jsx)("option",{value:"confirmed",children:Pe("admin:hardwareQuotesPage.confirmed")})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"invoiced",children:Pe("admin:hardwareQuotesPage.invoiced")}),(0,g.jsx)("option",{value:"cancelled",children:Pe("admin:hardwareQuotesPage.cancelled")})]})]})]}),$e?(0,g.jsx)(o.pp,{children:Pe("admin:hardwareQuotesPage.loading")}):0===Wn.length?(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,g.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","new"===Ue?"new":"progress"===Ue?"in progress":"closed"," quotes"]}),(0,g.jsx)("p",{children:Pe("admin:hardwareQuotesPage.hardwareQuotesWillAppearHereWhenSubmitted")})]}):(0,g.jsx)(F,{children:Wn.map(e=>{var n,r,i,a,t;return(0,g.jsxs)(A,{onClick:()=>Mn(e),children:[(0,g.jsxs)(_,{children:[(0,g.jsxs)(k,{children:[(0,g.jsx)(C,{children:e.quote_number}),(0,g.jsx)(B,{children:e.contact_name}),(0,g.jsx)(P,{children:e.contact_email}),e.company_name&&(0,g.jsx)(E,{children:e.company_name})]}),(0,g.jsx)(z,{status:e.status,children:Vn(e.status)})]}),(0,g.jsx)(S,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(r=e.package_snapshot)||void 0===r?void 0:r.name)||"N/A"}),e.plan_id&&(0,g.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:600,background:"#ECFDF5",color:"#059669",marginBottom:"4px"},children:["+ Subscription: ",(null===(i=e.plan_snapshot)||void 0===i?void 0:i.display_name)||"Plan"," (",e.billing_cycle||"monthly",")"]}),e.addon_items&&e.addon_items.length>0&&(0,g.jsx)(Q,{children:(t=e.addon_items,t&&0!==t.length?"+ "+t.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,g.jsx)(T,{children:(0,c.vv)(e.total_amount,e.currency)}),e.invoice_id&&(0,g.jsxs)("div",{style:{marginTop:"8px",display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)("span",{style:{padding:"3px 8px",fontSize:"11px",fontWeight:600,background:"#ECFDF5",color:"#059669",borderRadius:"4px"},children:Pe("admin:hardwareQuotesPage.invoiceCreated")}),(null===(a=e.invoice)||void 0===a?void 0:a.invoice_number)&&(0,g.jsxs)("a",{href:`/pos/admin/invoices?search=${e.invoice.invoice_number}`,onClick:e=>e.stopPropagation(),style:{fontSize:"11px",color:"#635BFF",textDecoration:"none",fontWeight:500},children:[e.invoice.invoice_number," \u2192"]})]}),(0,g.jsx)($,{}),(0,g.jsxs)(D,{children:[(0,g.jsx)("span",{children:Gn(e.created_at)}),"new"===Ue&&(0,g.jsx)(q,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=In();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"contacted"})})).ok&&(Se(n=>n.map(n=>n.id===e.id?{...n,status:"contacted"}:n)),On(!0))}catch(n){console.error("Error starting process:",n)}})(e)},style:{background:"#F0F0FF",color:"#635BFF",borderColor:"#635BFF"},children:"Start Process"}),"progress"===Ue&&(0,g.jsx)(q,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=In();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(Se(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),On(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),Le&&Je&&(0,g.jsxs)(s.aF,{isOpen:!0,onClose:()=>Me(!1),title:`Quote ${Je.quote_number}`,footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{variant:"danger",onClick:()=>nn(!0),children:"Delete"}),(0,g.jsx)("div",{style:{flex:1}}),"invoiced"!==Je.status&&"cancelled"!==Je.status&&!Je.invoice_id&&(Je.plan_id?(0,g.jsx)(L,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),kn(e.toISOString().split("T")[0]),Bn("none"),En(""),Sn([]),Tn(!1),Nn(null),Me(!1),setTimeout(()=>An(!0),200)})(),children:"Proceed Contract"}):(0,g.jsx)(L,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),xn(e.toISOString().split("T")[0]),mn("none"),fn(""),yn([]),Me(!1),setTimeout(()=>hn(!0),200)})(),children:"Create Invoice"})),(0,g.jsx)(L,{onClick:()=>Me(!1),children:"Close"})]}),children:[(0,g.jsx)(N,{style:{marginTop:0},children:Pe("admin:hardwareQuotesPage.quoteInfo")}),(0,g.jsxs)(I,{children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.quoteNumber")}),(0,g.jsx)(U,{style:{fontFamily:"monospace"},children:Je.quote_number})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.status")}),(0,g.jsx)(U,{children:(0,g.jsxs)(R,{value:Ke,onChange:e=>(async e=>{if(Je){Ye(e);try{const n=In();(await fetch(`/api/hardware-quotes/${Je.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(Se(n=>n.map(n=>n.id===Je.id?{...n,status:e}:n)),He(n=>n?{...n,status:e}:null),On(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),disabled:"invoiced"===Ke,children:[(0,g.jsx)("option",{value:"new",children:Pe("admin:hardwareQuotesPage.new")}),(0,g.jsx)("option",{value:"contacted",children:Pe("admin:hardwareQuotesPage.inProgress")}),(0,g.jsx)("option",{value:"confirmed",children:Pe("admin:hardwareQuotesPage.confirmed")}),"invoiced"===Ke&&(0,g.jsx)("option",{value:"invoiced",children:Pe("admin:hardwareQuotesPage.invoiced")}),(0,g.jsx)("option",{value:"cancelled",children:Pe("admin:hardwareQuotesPage.closed")})]})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.created")}),(0,g.jsx)(U,{children:Gn(Je.created_at)})]})]}),(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.customerInfo")}),(0,g.jsxs)(I,{children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.name")}),(0,g.jsx)(U,{children:Je.contact_name})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.email")}),(0,g.jsx)(U,{children:Je.contact_email})]}),Je.contact_phone&&(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.phone")}),(0,g.jsx)(U,{children:Je.contact_phone})]}),Je.company_name&&(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.company")}),(0,g.jsx)(U,{children:Je.company_name})]})]}),(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.linkedUser")}),Je.user?(0,g.jsxs)(Z,{children:[(0,g.jsxs)(ee,{children:[(0,g.jsx)("strong",{children:Je.user.full_name}),(0,g.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Je.user.email,")"]}),(0,g.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Je.user.role})]}),(0,g.jsx)(L,{onClick:Jn,children:Pe("admin:hardwareQuotesPage.change")})]}):(0,g.jsxs)(Z,{style:{background:"#F9FAFB"},children:[(0,g.jsx)(ee,{style:{color:"#6B7280"},children:Pe("admin:hardwareQuotesPage.notLinked")}),(0,g.jsx)(L,{variant:"primary",onClick:Jn,children:Pe("admin:hardwareQuotesPage.linkUser")})]}),(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.quoteDetails")}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:(null===(e=Je.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Je.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,g.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(r=Je.packageProduct)||void 0===r?void 0:r.set_group)||""," - ",(null===(t=Je.packageProduct)||void 0===t?void 0:t.set_tier)||"",")"]})]}),(0,g.jsx)("div",{style:{fontWeight:600},children:(0,c.vv)(Je.package_price,Xn)})]}),Je.addon_items&&Je.addon_items.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Je.addon_items.map((e,n)=>(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,g.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Xn)})]},n))]}),(0,g.jsxs)(X,{children:[(0,g.jsx)("div",{children:Pe("admin:hardwareQuotesPage.total")}),(0,g.jsx)("div",{children:(0,c.vv)(Je.total_amount,Xn)})]}),((null===(pe=Je.package_snapshot)||void 0===pe?void 0:pe.set_setup_items)||(null===(he=Je.packageProduct)||void 0===he?void 0:he.set_setup_items))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:16,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Included Setup"}),((null===(ue=Je.package_snapshot)||void 0===ue?void 0:ue.set_setup_items)||(null===(xe=Je.packageProduct)||void 0===xe?void 0:xe.set_setup_items)||[]).map((e,n)=>(0,g.jsxs)("div",{style:{fontSize:13,color:"#374151",padding:"3px 0",display:"flex",alignItems:"center",gap:6},children:[(0,g.jsx)("span",{style:{color:"#10B981"},children:"\u2713"})," ",e]},n))]})]}),Je.plan_id&&Je.plan_snapshot&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.subscriptionPlan")}),(0,g.jsx)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:16,borderLeft:"3px solid #059669"},children:(0,g.jsxs)(I,{style:{marginBottom:0},children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.plan")}),(0,g.jsx)(U,{style:{fontWeight:600},children:Je.plan_snapshot.display_name})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.billingCycle")}),(0,g.jsx)(U,{style:{textTransform:"capitalize"},children:Je.billing_cycle||"monthly"})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.monthlyPrice")}),(0,g.jsxs)(U,{children:[(0,c.vv)((null===(ge=Je.plan_snapshot.currency_prices)||void 0===ge||null===(me=ge[Xn])||void 0===me?void 0:me.monthly)||Je.plan_snapshot.base_price_monthly,Xn),"/mo"]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.annualPrice")}),(0,g.jsxs)(U,{children:[(0,c.vv)((null===(ve=Je.plan_snapshot.currency_prices)||void 0===ve||null===(fe=ve[Xn])||void 0===fe?void 0:fe.annual)||Je.plan_snapshot.base_price_annual,Xn),"/yr"]})]})]})})]}),Je.message&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.customerMessage")}),(0,g.jsx)(M,{children:Je.message})]}),(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.adminNotes")}),(0,g.jsxs)(J,{style:{marginBottom:0},children:[(0,g.jsx)(K,{value:Ge,onChange:e=>Ve(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,g.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,g.jsx)(L,{variant:"primary",onClick:async()=>{if(Je){Ze(!0);try{const e=In();(await fetch(`/api/hardware-quotes/${Je.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Ge})})).ok&&He(e=>e?{...e,admin_notes:Ge}:null)}catch(e){console.error("Error saving notes:",e)}finally{Ze(!1)}}},disabled:Xe||Ge===(Je.admin_notes||""),children:Xe?"Saving...":"Save Notes"})})]}),(0,g.jsx)(p.A,{entityType:"hardware_quote",entityId:String(Je.id),currentUserId:null!==Ee&&void 0!==Ee&&Ee.id?Number(Ee.id):void 0}),Je.invoice&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.hardwareInvoice")}),(0,g.jsx)(te,{children:(0,g.jsxs)(I,{style:{marginBottom:0},children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.invoiceNumber")}),(0,g.jsx)(U,{children:(0,g.jsxs)("a",{href:`/pos/admin/invoices?search=${Je.invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Je.invoice.invoice_number," \u2192"]})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.status")}),(0,g.jsx)(U,{children:(0,g.jsx)(z,{status:Je.invoice.status,children:Vn(Je.invoice.status)})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.amount")}),(0,g.jsx)(U,{style:{fontWeight:600},children:(0,c.vv)(Je.invoice.total_amount,Je.invoice.currency)})]})]})})]}),Je.subscription_invoice&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.subscriptionInvoice")}),(0,g.jsx)(te,{style:{borderLeftColor:"#059669"},children:(0,g.jsxs)(I,{style:{marginBottom:0},children:[(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.invoiceNumber")}),(0,g.jsx)(U,{children:(0,g.jsxs)("a",{href:`/pos/admin/invoices?search=${Je.subscription_invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Je.subscription_invoice.invoice_number," \u2192"]})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.status")}),(0,g.jsx)(U,{children:(0,g.jsx)(z,{status:Je.subscription_invoice.status,children:Vn(Je.subscription_invoice.status)})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(W,{children:Pe("admin:hardwareQuotesPage.amount")}),(0,g.jsx)(U,{style:{fontWeight:600},children:(0,c.vv)(Je.subscription_invoice.total_amount,Je.subscription_invoice.currency)})]})]})})]})]}),rn&&(0,g.jsxs)(s.aF,{isOpen:!0,onClose:()=>an(!1),title:"Link User to Quote",footer:(0,g.jsx)(L,{onClick:()=>an(!1),children:Pe("admin:hardwareQuotesPage.cancel")}),children:[(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.searchUsersByNameOrEmail")}),(0,g.jsx)(Y,{value:tn,onChange:e=>on(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),ln&&(0,g.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:Pe("admin:hardwareQuotesPage.searching")}),sn.length>0&&(0,g.jsx)(ne,{children:sn.map(e=>(0,g.jsxs)(re,{onClick:()=>(async e=>{if(Je)try{const n=In();(await fetch(`/api/hardware-quotes/${Je.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(an(!1),Mn(Je))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,g.jsx)(ie,{children:e.full_name}),(0,g.jsxs)(ae,{children:[e.email," - ",e.role]})]},e.id))}),tn.length>=2&&!ln&&0===sn.length&&(0,g.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:Pe("admin:hardwareQuotesPage.noUsersFound")})]}),pn&&Je&&(0,g.jsxs)(s.aF,{isOpen:!0,onClose:()=>hn(!1),title:"Create Invoice from Quote",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{onClick:()=>hn(!1),children:Pe("admin:hardwareQuotesPage.cancel")}),(0,g.jsx)(L,{variant:"primary",onClick:async()=>{if(Je){wn(!0);try{const e=In(),n={due_date:un};"none"!==gn&&vn&&(n.discount_type=gn,n.discount_value=parseFloat(vn));const r=jn.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const i=await fetch(`/api/hardware-quotes/${Je.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(i.ok)hn(!1),Me(!1),On();else{const e=await i.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{wn(!1)}}},disabled:bn,children:bn?"Creating...":"Create Invoice"})]}),children:[(0,g.jsx)(N,{style:{marginTop:0},children:Pe("admin:hardwareQuotesPage.quoteSummary")}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("strong",{children:(null===(je=Je.packageProduct)||void 0===je?void 0:je.name)||(null===(ye=Je.package_snapshot)||void 0===ye?void 0:ye.name)||"N/A"})," (",(null===(be=Je.packageProduct)||void 0===be?void 0:be.set_group)||""," - ",(null===(we=Je.packageProduct)||void 0===we?void 0:we.set_tier)||"",")"]}),(0,g.jsx)("div",{children:(0,c.vv)(Je.package_price,Xn)})]}),Je.addon_items&&Je.addon_items.map((e,n)=>(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,g.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Xn)})]},n)),(0,g.jsxs)(X,{children:[(0,g.jsx)("div",{children:Pe("admin:hardwareQuotesPage.subtotal")}),(0,g.jsx)("div",{children:(0,c.vv)(Je.total_amount,Xn)})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.dueDate")}),(0,g.jsx)(Y,{type:"date",value:un,onChange:e=>xn(e.target.value)})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.discount")}),(0,g.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,g.jsxs)(G,{style:{width:"auto",minWidth:150},value:gn,onChange:e=>mn(e.target.value),children:[(0,g.jsx)("option",{value:"none",children:Pe("admin:hardwareQuotesPage.noDiscount")}),(0,g.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,g.jsx)("option",{value:"fixed",children:Pe("admin:hardwareQuotesPage.fixedAmount")})]}),"none"!==gn&&(0,g.jsx)(Y,{type:"number",min:"0",step:"0.01",value:vn,onChange:e=>fn(e.target.value),placeholder:"percentage"===gn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.additionalCharges")}),jn.map((e,n)=>(0,g.jsxs)(oe,{children:[(0,g.jsx)(se,{children:(0,g.jsx)(Y,{value:e.name,onChange:e=>Kn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,g.jsx)(se,{children:(0,g.jsx)(Y,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Kn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,g.jsx)(L,{variant:"danger",onClick:()=>{return e=n,void yn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,g.jsx)(L,{onClick:()=>{yn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,g.jsxs)(X,{style:{fontSize:18},children:[(0,g.jsx)("div",{children:Pe("admin:hardwareQuotesPage.invoiceTotal")}),(0,g.jsx)("div",{children:(0,c.vv)((()=>{if(!Je)return 0;let e=Je.total_amount;return"percentage"===gn&&vn?e-=e*(parseFloat(vn)/100):"fixed"===gn&&vn&&(e-=parseFloat(vn)),jn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Xn)})]})]}),Fn&&Je&&(0,g.jsx)(s.aF,{isOpen:!0,onClose:()=>{An(!1),Nn(null)},title:"Proceed Contract",footer:qn?(0,g.jsx)(L,{onClick:()=>{An(!1),Me(!1),Nn(null),On()},children:"Close"}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{onClick:()=>An(!1),children:Pe("admin:hardwareQuotesPage.cancel")}),(0,g.jsx)(L,{variant:"primary",onClick:async()=>{if(Je){Dn(!0);try{const o=In(),s={due_date:_n,mark_as_paid:Qn};"none"!==Cn&&Pn&&(s.discount_type=Cn,s.discount_value=parseFloat(Pn));const d=zn.filter(e=>e.name&&e.amount);d.length>0&&(s.additional_charges=d.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const l=await fetch(`/api/hardware-quotes/${Je.id}/proceed`,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(l.ok){var e,n,r,i,a,t;const o=await l.json();Nn({hardware_invoice:(null===(e=o.data)||void 0===e||null===(n=e.hardware_invoice)||void 0===n?void 0:n.invoice_number)||(null===(r=o.hardware_invoice)||void 0===r?void 0:r.invoice_number),subscription_invoice:(null===(i=o.data)||void 0===i||null===(a=i.subscription_invoice)||void 0===a?void 0:a.invoice_number)||(null===(t=o.subscription_invoice)||void 0===t?void 0:t.invoice_number)}),On(!0)}else{const e=await l.json();alert(e.message||"Failed to proceed contract")}}catch(o){console.error("Error proceeding contract:",o)}finally{Dn(!1)}}},disabled:$n||!Je.user_id,children:$n?"Processing...":"Proceed Contract"})]}),children:qn?(0,g.jsxs)("div",{style:{background:"#ECFDF5",border:"1px solid #10B981",borderRadius:8,padding:24,textAlign:"center",color:"#065F46",lineHeight:1.6},children:[(0,g.jsx)("div",{style:{fontSize:18,fontWeight:700,marginBottom:12},children:Pe("admin:hardwareQuotesPage.contractCreatedSuccessfully")}),qn.hardware_invoice&&(0,g.jsxs)("div",{children:["Hardware Invoice: ",(0,g.jsx)("strong",{style:{fontFamily:"monospace"},children:qn.hardware_invoice})]}),qn.subscription_invoice&&(0,g.jsxs)("div",{children:["Subscription Invoice: ",(0,g.jsx)("strong",{style:{fontFamily:"monospace"},children:qn.subscription_invoice})]})]}):(0,g.jsxs)(g.Fragment,{children:[!Je.user_id&&(0,g.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:"#92400E"},children:"A linked user is required to proceed. Please link a user first."}),(0,g.jsx)(N,{style:{marginTop:0},children:Pe("admin:hardwareQuotesPage.hardware")}),(0,g.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,g.jsxs)(V,{children:[(0,g.jsx)("div",{children:(0,g.jsx)("strong",{children:(null===(Fe=Je.packageProduct)||void 0===Fe?void 0:Fe.name)||(null===(Ae=Je.package_snapshot)||void 0===Ae?void 0:Ae.name)||"N/A"})}),(0,g.jsx)("div",{children:(0,c.vv)(Je.package_price,Xn)})]}),Je.addon_items&&Je.addon_items.map((e,n)=>(0,g.jsxs)(V,{children:[(0,g.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,g.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Xn)})]},n)),(0,g.jsxs)(X,{children:[(0,g.jsx)("div",{children:Pe("admin:hardwareQuotesPage.hardwareSubtotal")}),(0,g.jsx)("div",{children:(0,c.vv)(Je.total_amount,Xn)})]})]}),Je.plan_snapshot&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(N,{children:Pe("admin:hardwareQuotesPage.subscriptionPlan")}),(0,g.jsxs)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:20,borderLeft:"3px solid #059669"},children:[(0,g.jsx)("div",{style:{fontWeight:600,fontSize:14,color:"#0A2540",marginBottom:4},children:Je.plan_snapshot.display_name}),(0,g.jsxs)("div",{style:{fontSize:13,color:"#6B7280"},children:["annual"===Je.billing_cycle?"Annual":"Monthly"," billing -"," ",(0,c.vv)("annual"===Je.billing_cycle?(null===(_e=Je.plan_snapshot.currency_prices)||void 0===_e||null===(ke=_e[Xn])||void 0===ke?void 0:ke.annual)||Je.plan_snapshot.base_price_annual:(null===(Ce=Je.plan_snapshot.currency_prices)||void 0===Ce||null===(Be=Ce[Xn])||void 0===Be?void 0:Be.monthly)||Je.plan_snapshot.base_price_monthly,Xn),"annual"===Je.billing_cycle?"/yr":"/mo"]})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.dueDate")}),(0,g.jsx)(Y,{type:"date",value:_n,onChange:e=>kn(e.target.value)})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.hardwareDiscount")}),(0,g.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,g.jsxs)(G,{style:{width:"auto",minWidth:150},value:Cn,onChange:e=>Bn(e.target.value),children:[(0,g.jsx)("option",{value:"none",children:Pe("admin:hardwareQuotesPage.noDiscount")}),(0,g.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,g.jsx)("option",{value:"fixed",children:Pe("admin:hardwareQuotesPage.fixedAmount")})]}),"none"!==Cn&&(0,g.jsx)(Y,{type:"number",min:"0",step:"0.01",value:Pn,onChange:e=>En(e.target.value),placeholder:"percentage"===Cn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,g.jsxs)(J,{children:[(0,g.jsx)(H,{children:Pe("admin:hardwareQuotesPage.additionalCharges")}),zn.map((e,n)=>(0,g.jsxs)(oe,{children:[(0,g.jsx)(se,{children:(0,g.jsx)(Y,{value:e.name,onChange:e=>Yn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,g.jsx)(se,{children:(0,g.jsx)(Y,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Yn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,g.jsx)(L,{variant:"danger",onClick:()=>{return e=n,void Sn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,g.jsx)(L,{onClick:()=>{Sn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,g.jsx)(J,{children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",fontSize:"14px",color:"#374151"},children:[(0,g.jsx)("input",{type:"checkbox",checked:Qn,onChange:e=>Tn(e.target.checked),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),"Mark hardware invoice as paid"]})}),(0,g.jsxs)(X,{style:{fontSize:18},children:[(0,g.jsx)("div",{children:Pe("admin:hardwareQuotesPage.hardwareInvoiceTotal")}),(0,g.jsx)("div",{children:(0,c.vv)((()=>{if(!Je)return 0;let e=Je.total_amount;return"percentage"===Cn&&Pn?e-=e*(parseFloat(Pn)/100):"fixed"===Cn&&Pn&&(e-=parseFloat(Pn)),zn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Xn)})]})]})}),en&&(0,g.jsx)(s.aF,{isOpen:!0,onClose:()=>nn(!1),title:"Confirm Delete",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{onClick:()=>nn(!1),children:Pe("admin:hardwareQuotesPage.cancel")}),(0,g.jsx)(L,{variant:"danger",onClick:async()=>{if(Je)try{const e=In();await fetch(`/api/hardware-quotes/${Je.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),nn(!1),Me(!1),On()}catch(e){console.error("Error deleting quote:",e)}},children:Pe("admin:hardwareQuotesPage.delete")})]}),children:(0,g.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,g.jsx)("strong",{children:null===Je||void 0===Je?void 0:Je.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,n,r)=>{r.d(n,{c:()=>o});var i=r(9950),a=r(4414);const t=/(https?:\/\/[^\s<]+)/g;function o(e){const n=e.split(t);return 1===n.length?e:n.map((e,n)=>t.test(e)?(0,a.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},n):(0,a.jsx)(i.Fragment,{children:e},n))}}}]);