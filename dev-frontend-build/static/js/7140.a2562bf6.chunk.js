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
`,s=e=>{let{children:t,className:i,style:n,...a}=e;return(0,r.jsx)(o,{className:i,style:n,...a,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,r.jsx)(a,{placeholder:t,...i})},p=e=>{let{children:t,...i}=e;return(0,r.jsx)(d,{...i,children:t})}},4185:(e,t,i)=>{i.d(t,{A:()=>m});i(9950);var n=i(4752),r=i(4414);const o=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,s=n.Ay.a`
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
`,l=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,c=n.Ay.span`
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
`;const m=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const i=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),i.length>0&&(0,r.jsx)(x,{children:i.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,r.jsx)(d,{children:n.map((e,t)=>{return(0,r.jsxs)(s,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(l,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(p,{children:e.originalName}),(0,r.jsx)(c,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]},t);var i,n})})]})}},7140:(e,t,i)=>{i.r(t),i.d(t,{default:()=>se});var n=i(9950),r=i(4752),o=i(4492),a=i(3832),d=i(5665),s=i(2488),l=i(4185),p=i(4414);const c=r.Ay.div`
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,h=r.Ay.div`
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
`,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,u=r.Ay.div`
  flex: 1;
  min-width: 0;
`,g=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,f=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,y=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,w=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,j=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,b=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,v=r.Ay.div`
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
`,F=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,B=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,k=r.Ay.div`
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
`,C=r.Ay.div`
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
`,z=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,E=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,S=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,_=r.Ay.button`
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
`,$=r.Ay.div`
  padding: 24px;
`,D=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=r.Ay.button`
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
`,T=r.Ay.div`
  margin-bottom: 24px;
`,L=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,O=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,U=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,I=r.Ay.div`
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
`,P=r.Ay.div`
  flex: 1;
`,W=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,J=r.Ay.div`
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
`,M=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,R=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,H=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 24px;
`,Q=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,q=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,G=r.Ay.div`
  display: flex;
  gap: 12px;
`,V=r.Ay.div`
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
`,X=r.Ay.div`
  flex: 1;
`,Z=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,ee=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,te=r.Ay.span`
  font-size: 11px;
  color: #6B7280;
`,ie=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
`,ne=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`,re=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,oe=r.Ay.textarea`
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
`,ae=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
  text-align: center;
  padding: 20px 0;
`,de=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,se=()=>{const{restaurantId:e}=(0,o.g)(),[t,i]=(0,n.useState)([]),[r,se]=(0,n.useState)(!0),[le,pe]=(0,n.useState)(""),[ce,xe]=(0,n.useState)("all"),[he,me]=(0,n.useState)(!1),[ue,ge]=(0,n.useState)(null),[fe,ye]=(0,n.useState)(null),[we,je]=(0,n.useState)([]),[be,ve]=(0,n.useState)(!1),[Ae,Fe]=(0,n.useState)(""),[Be,ke]=(0,n.useState)(!1),[Ce,ze]=(0,n.useState)({}),Ee=localStorage.getItem("auth_token"),Se=async()=>{try{se(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Ee}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),n=t.data||t,r=Array.isArray(n)?n:[];i(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Ee}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ze(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{se(!1)}};(0,n.useEffect)(()=>{Se()},[]);const _e=async e=>{try{ve(!0);const t=await fetch(`/api/comments/notice/${e}`,{headers:{Authorization:`Bearer ${Ee}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json(),i=e.data||e;je(Array.isArray(i)?i:[])}}catch(t){console.error("Failed to fetch comments:",t)}finally{ve(!1)}},$e=async()=>{if(Ae.trim()&&ue&&!Be)try{ke(!0);(await fetch("/api/comments",{method:"POST",headers:{Authorization:`Bearer ${Ee}`,"Content-Type":"application/json"},body:JSON.stringify({entity_type:"notice",entity_id:ue.id,content:Ae.trim()})})).ok&&(Fe(""),_e(ue.id),i(e=>e.map(e=>e.id===ue.id?{...e,commentCount:(e.commentCount||0)+1}:e)))}catch(e){console.error("Failed to submit comment:",e)}finally{ke(!1)}},De=e=>{ge(e),ye(null),je([]),Fe(""),me(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${Ee}`,"Content-Type":"application/json"}});if(t.ok){const n=await t.json(),r=n.data||n;ye(r),i(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id),_e(e.id),fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Ee}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),ze(t=>{const i={...t};return i[String(e.id)]&&(i[String(e.id)]={...i[String(e.id)],unread_count:0}),i})},Ne=()=>{me(!1),ge(null),ye(null),je([]),Fe("")},Te=t.filter(e=>{const t=e.title.toLowerCase().includes(le.toLowerCase())||e.content.toLowerCase().includes(le.toLowerCase())||e.author_name.toLowerCase().includes(le.toLowerCase()),i="all"===ce||e.priority===ce;return t&&i}),Le=t.length,Oe=t.filter(e=>!e.read_at).length,Ue=t.filter(e=>"important"===e.priority).length,Ie=t.filter(e=>"urgent"===e.priority).length,Pe=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),We=e=>e?e.charAt(0).toUpperCase():"?",Je=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,p.jsxs)(a.mc,{children:[(0,p.jsx)(a.Y9,{children:(0,p.jsx)(a.hE,{children:"Notices"})}),(0,p.jsxs)(a.UC,{children:[(0,p.jsxs)(d.MD,{children:[(0,p.jsxs)(d.hI,{color:"#635BFF",children:[(0,p.jsx)(d.Os,{children:Le}),(0,p.jsx)(d.v0,{children:"Total Received"})]}),(0,p.jsxs)(d.hI,{color:"#2563EB",children:[(0,p.jsx)(d.Os,{children:Oe}),(0,p.jsx)(d.v0,{children:"Unread"})]}),(0,p.jsxs)(d.hI,{color:"#D97706",children:[(0,p.jsx)(d.Os,{children:Ue}),(0,p.jsx)(d.v0,{children:"Important"})]}),(0,p.jsxs)(d.hI,{color:"#DC2626",children:[(0,p.jsx)(d.Os,{children:Ie}),(0,p.jsx)(d.v0,{children:"Urgent"})]})]}),(0,p.jsxs)(c,{children:[(0,p.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:le,onChange:e=>pe(e.target.value)}),(0,p.jsxs)(s.Jt,{value:ce,onChange:e=>xe(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priorities"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),r?(0,p.jsx)(de,{children:"Loading notices..."}):0===Te.length?(0,p.jsxs)(k,{children:[(0,p.jsx)("h3",{children:"No notices found"}),(0,p.jsx)("p",{children:le||"all"!==ce?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,p.jsx)(x,{children:Te.map(e=>{var t;const i=!e.read_at;return(0,p.jsx)(h,{isUnread:i,onClick:()=>De(e),children:(0,p.jsxs)(m,{children:[(0,p.jsxs)(u,{children:[(0,p.jsxs)(g,{isUnread:i,children:[i&&(0,p.jsx)(f,{}),e.title]}),(0,p.jsx)(y,{children:Je(e.content)}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(j,{children:[e.author_name,(0,p.jsx)(b,{role:e.author_role,children:e.author_role})]}),(0,p.jsx)(B,{children:(n=e.createdAt,new Date(n).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,p.jsxs)(F,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=Ce[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ce[String(e.id)].unread_count," new"]})]})]})]}),(0,p.jsx)(v,{children:(0,p.jsx)(A,{priority:e.priority,children:e.priority})})]})},e.id);var n})}),he&&ue&&(0,p.jsx)(C,{onClick:Ne,children:(0,p.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(S,{children:"Notice Details"}),(0,p.jsx)(_,{onClick:Ne,children:"\xd7"})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:ue.title}),(0,p.jsx)(A,{priority:ue.priority,children:ue.priority})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"From"}),(0,p.jsxs)(U,{children:[(0,p.jsx)(I,{children:We((null===fe||void 0===fe?void 0:fe.author_name)||ue.author_name)}),(0,p.jsxs)(P,{children:[(0,p.jsx)(W,{children:(null===fe||void 0===fe?void 0:fe.author_name)||ue.author_name}),(0,p.jsx)(J,{children:(null===fe||void 0===fe?void 0:fe.author_role)||ue.author_role})]})]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)(M,{children:"Date"}),(0,p.jsx)(R,{children:Pe((null===fe||void 0===fe?void 0:fe.createdAt)||ue.createdAt)})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(M,{children:"Priority"}),(0,p.jsx)(R,{style:{textTransform:"capitalize"},children:(null===fe||void 0===fe?void 0:fe.priority)||ue.priority})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(M,{children:"Status"}),(0,p.jsx)(R,{style:{textTransform:"capitalize"},children:(null===fe||void 0===fe?void 0:fe.status)||ue.status})]})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Content"}),(0,p.jsx)(O,{children:(null===fe||void 0===fe?void 0:fe.content)||ue.content})]}),((null===fe||void 0===fe?void 0:fe.attachments)||(null===ue||void 0===ue?void 0:ue.attachments))&&((null===fe||void 0===fe?void 0:fe.attachments)||(null===ue||void 0===ue?void 0:ue.attachments)||[]).length>0&&(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:"Attachments"}),(0,p.jsx)(l.A,{attachments:(null===fe||void 0===fe?void 0:fe.attachments)||(null===ue||void 0===ue?void 0:ue.attachments)||[]})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(Q,{children:["Comments (",we.length,")"]}),be?(0,p.jsx)(de,{children:"Loading comments..."}):0===we.length?(0,p.jsx)(ae,{children:"No comments yet."}):(0,p.jsx)(q,{children:we.map(e=>(0,p.jsxs)(G,{children:[(0,p.jsx)(V,{children:We(e.author_name)}),(0,p.jsxs)(X,{children:[(0,p.jsxs)(Z,{children:[(0,p.jsx)(ee,{children:e.author_name}),(0,p.jsx)(te,{children:e.author_role}),(0,p.jsx)(ie,{children:Pe(e.createdAt)})]}),(0,p.jsx)(ne,{children:e.content})]})]},e.id))}),(0,p.jsxs)(re,{children:[(0,p.jsx)(oe,{placeholder:"Write a comment...",value:Ae,onChange:e=>Fe(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),$e())}}),(0,p.jsx)(N,{variant:"primary",onClick:$e,disabled:!Ae.trim()||Be,children:Be?"Sending...":"Send"})]})]})]}),(0,p.jsx)(D,{children:(0,p.jsx)(N,{variant:"secondary",onClick:Ne,children:"Close"})})]})})]})]})}}}]);