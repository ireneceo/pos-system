"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{2488:(e,t,i)=>{i.d(t,{DO:()=>l,Jt:()=>p,Qn:()=>s});i(9950);var n=i(4752),r=i(4414);const o=n.Ay.div`
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
`,d=n.Ay.select`
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
`,s=e=>{let{children:t,className:i,style:n,...a}=e;return(0,r.jsx)(o,{className:i,style:n,...a,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,r.jsx)(a,{placeholder:t,...i})},p=e=>{let{children:t,...i}=e;return(0,r.jsx)(d,{...i,children:t})}},7140:(e,t,i)=>{i.r(t),i.d(t,{default:()=>de});var n=i(9950),r=i(4752),o=i(4492),a=i(3832),d=i(5665),s=i(2488),l=i(4414);const p=r.Ay.div`
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
`,x=r.Ay.div`
  display: grid;
  gap: 16px;
`,c=r.Ay.div`
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
`,h=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,m=r.Ay.div`
  flex: 1;
  min-width: 0;
`,u=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,g=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,f=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,y=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,w=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,j=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,A=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,v=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,F=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,C=r.Ay.div`
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
`,B=r.Ay.div`
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
`,k=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,z=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,S=r.Ay.button`
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
`,_=r.Ay.div`
  padding: 24px;
`,D=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,$=r.Ay.button`
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
`,L=r.Ay.div`
  margin-bottom: 24px;
`,U=r.Ay.div`
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
`,O=r.Ay.div`
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
`,N=r.Ay.div`
  flex: 1;
`,P=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,Y=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,J=r.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,K=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,W=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,H=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,M=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 24px;
`,Q=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,R=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,q=r.Ay.div`
  display: flex;
  gap: 12px;
`,G=r.Ay.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
`,V=r.Ay.div`
  flex: 1;
`,X=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Z=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,ee=r.Ay.span`
  font-size: 11px;
  color: #6B7280;
`,te=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
`,ie=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`,ne=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,re=r.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.15s;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,oe=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
  text-align: center;
  padding: 20px 0;
`,ae=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,de=()=>{const{restaurantId:e}=(0,o.g)(),[t,i]=(0,n.useState)([]),[r,de]=(0,n.useState)(!0),[se,le]=(0,n.useState)(""),[pe,xe]=(0,n.useState)("all"),[ce,he]=(0,n.useState)(!1),[me,ue]=(0,n.useState)(null),[ge,fe]=(0,n.useState)(null),[ye,we]=(0,n.useState)([]),[je,be]=(0,n.useState)(!1),[Ae,ve]=(0,n.useState)(""),[Fe,Ce]=(0,n.useState)(!1),Be=localStorage.getItem("auth_token");(0,n.useEffect)(()=>{(async()=>{try{de(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Be}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),n=t.data||t;i(Array.isArray(n)?n:[])}}catch(e){console.error("Failed to fetch notices:",e)}finally{de(!1)}})()},[]);const ke=async e=>{try{be(!0);const t=await fetch(`/api/comments/notice/${e}`,{headers:{Authorization:`Bearer ${Be}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json(),i=e.data||e;we(Array.isArray(i)?i:[])}}catch(t){console.error("Failed to fetch comments:",t)}finally{be(!1)}},ze=async()=>{if(Ae.trim()&&me&&!Fe)try{Ce(!0);(await fetch("/api/comments",{method:"POST",headers:{Authorization:`Bearer ${Be}`,"Content-Type":"application/json"},body:JSON.stringify({entity_type:"notice",entity_id:me.id,content:Ae.trim()})})).ok&&(ve(""),ke(me.id),i(e=>e.map(e=>e.id===me.id?{...e,commentCount:(e.commentCount||0)+1}:e)))}catch(e){console.error("Failed to submit comment:",e)}finally{Ce(!1)}},Ee=e=>{ue(e),fe(null),we([]),ve(""),he(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${Be}`,"Content-Type":"application/json"}});if(t.ok){const n=await t.json(),r=n.data||n;fe(r),i(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id),ke(e.id)},Se=()=>{he(!1),ue(null),fe(null),we([]),ve("")},_e=t.filter(e=>{const t=e.title.toLowerCase().includes(se.toLowerCase())||e.content.toLowerCase().includes(se.toLowerCase())||e.author_name.toLowerCase().includes(se.toLowerCase()),i="all"===pe||e.priority===pe;return t&&i}),De=t.length,$e=t.filter(e=>!e.read_at).length,Le=t.filter(e=>"important"===e.priority).length,Ue=t.filter(e=>"urgent"===e.priority).length,Ie=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Te=e=>e?e.charAt(0).toUpperCase():"?",Oe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,l.jsxs)(a.mc,{children:[(0,l.jsx)(a.Y9,{children:(0,l.jsx)(a.hE,{children:"Notices"})}),(0,l.jsxs)(a.UC,{children:[(0,l.jsxs)(d.MD,{children:[(0,l.jsxs)(d.hI,{color:"#635BFF",children:[(0,l.jsx)(d.Os,{children:De}),(0,l.jsx)(d.v0,{children:"Total Received"})]}),(0,l.jsxs)(d.hI,{color:"#2563EB",children:[(0,l.jsx)(d.Os,{children:$e}),(0,l.jsx)(d.v0,{children:"Unread"})]}),(0,l.jsxs)(d.hI,{color:"#D97706",children:[(0,l.jsx)(d.Os,{children:Le}),(0,l.jsx)(d.v0,{children:"Important"})]}),(0,l.jsxs)(d.hI,{color:"#DC2626",children:[(0,l.jsx)(d.Os,{children:Ue}),(0,l.jsx)(d.v0,{children:"Urgent"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:se,onChange:e=>le(e.target.value)}),(0,l.jsxs)(s.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priorities"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),r?(0,l.jsx)(ae,{children:"Loading notices..."}):0===_e.length?(0,l.jsxs)(C,{children:[(0,l.jsx)("h3",{children:"No notices found"}),(0,l.jsx)("p",{children:se||"all"!==pe?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,l.jsx)(x,{children:_e.map(e=>{const t=!e.read_at;return(0,l.jsx)(c,{isUnread:t,onClick:()=>Ee(e),children:(0,l.jsxs)(h,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)(u,{isUnread:t,children:[t&&(0,l.jsx)(g,{}),e.title]}),(0,l.jsx)(f,{children:Oe(e.content)}),(0,l.jsxs)(y,{children:[(0,l.jsxs)(w,{children:[e.author_name,(0,l.jsx)(j,{role:e.author_role,children:e.author_role})]}),(0,l.jsx)(F,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,l.jsxs)(v,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments"]})]})]}),(0,l.jsx)(b,{children:(0,l.jsx)(A,{priority:e.priority,children:e.priority})})]})},e.id);var i})}),ce&&me&&(0,l.jsx)(B,{onClick:Se,children:(0,l.jsxs)(k,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(z,{children:[(0,l.jsx)(E,{children:"Notice Details"}),(0,l.jsx)(S,{onClick:Se,children:"\xd7"})]}),(0,l.jsxs)(_,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,l.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:me.title}),(0,l.jsx)(A,{priority:me.priority,children:me.priority})]}),(0,l.jsxs)(L,{children:[(0,l.jsx)(U,{children:"From"}),(0,l.jsxs)(T,{children:[(0,l.jsx)(O,{children:Te((null===ge||void 0===ge?void 0:ge.author_name)||me.author_name)}),(0,l.jsxs)(N,{children:[(0,l.jsx)(P,{children:(null===ge||void 0===ge?void 0:ge.author_name)||me.author_name}),(0,l.jsx)(Y,{children:(null===ge||void 0===ge?void 0:ge.author_role)||me.author_role})]})]})]}),(0,l.jsxs)(J,{children:[(0,l.jsxs)(K,{children:[(0,l.jsx)(W,{children:"Date"}),(0,l.jsx)(H,{children:Ie((null===ge||void 0===ge?void 0:ge.createdAt)||me.createdAt)})]}),(0,l.jsxs)(K,{children:[(0,l.jsx)(W,{children:"Priority"}),(0,l.jsx)(H,{style:{textTransform:"capitalize"},children:(null===ge||void 0===ge?void 0:ge.priority)||me.priority})]}),(0,l.jsxs)(K,{children:[(0,l.jsx)(W,{children:"Status"}),(0,l.jsx)(H,{style:{textTransform:"capitalize"},children:(null===ge||void 0===ge?void 0:ge.status)||me.status})]})]}),(0,l.jsxs)(L,{children:[(0,l.jsx)(U,{children:"Content"}),(0,l.jsx)(I,{children:(null===ge||void 0===ge?void 0:ge.content)||me.content})]}),(0,l.jsxs)(M,{children:[(0,l.jsxs)(Q,{children:["Comments (",ye.length,")"]}),je?(0,l.jsx)(ae,{children:"Loading comments..."}):0===ye.length?(0,l.jsx)(oe,{children:"No comments yet."}):(0,l.jsx)(R,{children:ye.map(e=>(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:Te(e.author_name)}),(0,l.jsxs)(V,{children:[(0,l.jsxs)(X,{children:[(0,l.jsx)(Z,{children:e.author_name}),(0,l.jsx)(ee,{children:e.author_role}),(0,l.jsx)(te,{children:Ie(e.createdAt)})]}),(0,l.jsx)(ie,{children:e.content})]})]},e.id))}),(0,l.jsxs)(ne,{children:[(0,l.jsx)(re,{placeholder:"Write a comment...",value:Ae,onChange:e=>ve(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ze())}}),(0,l.jsx)($,{variant:"primary",onClick:ze,disabled:!Ae.trim()||Fe,children:Fe?"Sending...":"Send"})]})]})]}),(0,l.jsx)(D,{children:(0,l.jsx)($,{variant:"secondary",onClick:Se,children:"Close"})})]})})]})]})}}}]);