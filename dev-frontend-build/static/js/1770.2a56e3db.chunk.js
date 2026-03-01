"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ce});var n=r(9950),i=r(4752),o=r(2853),a=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(9061),p=r(2597),x=r(2653),h=r(4414);const u=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,m=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=i.Ay.div`
  display: flex;
  gap: 12px;
`,b=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,w=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,F=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,k=i.Ay.input`
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

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,C=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
  }
`,E=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,B=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,z=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,S=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,R=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,_=i.Ay.div`
  flex: 1;
`,I=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,N=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,$=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,D=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,T=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,L=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 8px;
`,G=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,P=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,M=i.Ay.div`
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
  padding: 40px 0;
  overflow-y: auto;
`,U=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,O=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=i.Ay.button`
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
`,J=i.Ay.div`
  padding: 24px;
`,Z=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,q=i.Ay.div`
  margin-bottom: 20px;
`,H=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,K=i.Ay.input`
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
`,Q=i.Ay.select`
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
`,V=i.Ay.textarea`
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
`,X=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  margin-bottom: 12px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
    cursor: pointer;
  }
`,ee=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,te=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
    cursor: pointer;
  }
`,re=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,ne=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,ie=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,oe=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,ae=i.Ay.span`
  color: #0A2540;
`,se=i.Ay.button`
  background: none;
  border: none;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
  }
`,le=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,de=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,ce=()=>{var e,t;const{user:r}=(0,a.As)(),[i,ce]=(0,x.M)("received"),[pe,xe]=(0,n.useState)([]),[he,ue]=(0,n.useState)([]),[ge,me]=(0,n.useState)(null),[fe,ye]=(0,n.useState)(""),[be,ve]=(0,n.useState)("all"),[je,we]=(0,n.useState)("all"),[Fe,Ae]=(0,n.useState)("all"),[ke,Ce]=(0,n.useState)(!1),[Ee,Be]=(0,n.useState)(!1),[ze,Se]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[Re,_e]=(0,n.useState)(!1),[Ie,Ne]=(0,n.useState)(!1),[$e,De]=(0,n.useState)(null),[Te,Le]=(0,n.useState)({}),[Ge,Pe]=(0,n.useState)([]),Me=localStorage.getItem("auth_token"),Ue={Authorization:`Bearer ${Me}`,"Content-Type":"application/json"},Oe=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Me}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Le(e=>({...e,...t}))}}}catch(t){}},Ye=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Me}`}});if(e.ok){const t=await e.json();t.success&&me(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Me]),We=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Me}`}});if(e.ok){const t=await e.json();t.success&&(xe(t.data),Oe(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Me]),Je=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Me}`}});if(e.ok){const t=await e.json();t.success&&(ue(t.data),Oe(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Me]),Ze=(0,n.useCallback)(async()=>{Ce(!0),await Promise.all([Ye(),We(),Je()]),Ce(!1)},[Ye,We,Je]);(0,n.useEffect)(()=>{if(r){Ze();const e=setInterval(Ze,3e4);return()=>clearInterval(e)}},[r,Ze]);const qe=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Me}`}})).ok&&(ue(t=>t.filter(t=>t.id!==e)),(null===$e||void 0===$e?void 0:$e.id)===e&&(Ne(!1),De(null)))}catch(t){console.error("Error deleting notice:",t)}},He=e=>new Date(e).toLocaleString("en-MY"),Ke=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:He(e)},Qe=("received"===i?pe:he).filter(e=>{const t=e.title.toLowerCase().includes(fe.toLowerCase())||(e.author_name||"").toLowerCase().includes(fe.toLowerCase())||(e.content||"").toLowerCase().includes(fe.toLowerCase()),r="all"===be||e.priority===be,n="all"===je||(e.category||"general")===je,o="all"===Fe||"sent"===i||e.author_role===Fe;return t&&r&&n&&o}),Ve=pe.length,Xe=pe.filter(e=>!e.read_at).length,et=he.length,tt=[...pe,...he].filter(e=>"urgent"===e.priority).length;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(f,{children:"Notices"}),(0,h.jsx)(y,{children:(0,h.jsx)(b,{variant:"primary",onClick:()=>Be(!0),children:"New Notice"})})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(v,{children:[(0,h.jsxs)(j,{borderColor:"#635BFF",children:[(0,h.jsx)(w,{children:Ve}),(0,h.jsx)(F,{children:"Received"})]}),(0,h.jsxs)(j,{borderColor:"#F59E0B",children:[(0,h.jsx)(w,{children:Xe}),(0,h.jsx)(F,{children:"Unread"})]}),(0,h.jsxs)(j,{borderColor:"#10B981",children:[(0,h.jsx)(w,{children:et}),(0,h.jsx)(F,{children:"Sent"})]}),(0,h.jsxs)(j,{borderColor:"#EF4444",children:[(0,h.jsx)(w,{children:tt}),(0,h.jsx)(F,{children:"Urgent"})]})]}),(0,h.jsxs)(p.tU,{children:[(0,h.jsxs)(p.oz,{active:"received"===i,onClick:()=>ce("received"),children:["Received (",Ve,")"]}),(0,h.jsxs)(p.oz,{active:"sent"===i,onClick:()=>ce("sent"),children:["Sent (",et,")"]})]}),(0,h.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,h.jsx)("button",{onClick:()=>we(e),style:{padding:"6px 16px",borderRadius:"20px",border:je===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:je===e?"#F0EFFF":"white",color:je===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:je===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,h.jsxs)(A,{children:[(0,h.jsx)(k,{type:"text",placeholder:"Search notices...",value:fe,onChange:e=>ye(e.target.value)}),"received"===i&&(0,h.jsxs)(C,{value:Fe,onChange:e=>Ae(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Senders"}),(0,h.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,h.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,h.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,h.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,h.jsxs)(C,{value:be,onChange:e=>ve(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Priority"}),(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"important",children:"Important"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,h.jsxs)(E,{children:[Qe.map(e=>{var t,r;return(0,h.jsxs)(B,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Me}`}});if(t.ok){const r=await t.json();r.success&&(De(r.data),Ne(!0),"received"===i&&xe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:["received"===i&&!e.read_at&&(0,h.jsx)(R,{}),(0,h.jsxs)(_,{children:[(0,h.jsx)(I,{children:e.title}),(0,h.jsxs)(N,{children:["received"===i&&(0,h.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===i&&e.author_role&&(0,h.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,h.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,h.jsx)("span",{children:Ke(e.createdAt)})]})]})]}),(0,h.jsxs)($,{children:["guide"===e.category&&(0,h.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,h.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)(T,{children:e.content}),(0,h.jsxs)(L,{children:[(0,h.jsx)("span",{children:He(e.createdAt)}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,h.jsxs)(G,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Te[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Te[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,h.jsx)(se,{onClick:t=>{t.stopPropagation(),qe(e.id)},children:"Delete"})]})]})]},e.id)}),0===Qe.length&&!ke&&(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,h.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Ee&&(0,h.jsx)(M,{onClick:()=>Be(!1),children:(0,h.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(Y,{children:"New Notice"}),(0,h.jsx)(W,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,h.jsxs)(J,{children:[(0,h.jsxs)(q,{children:[(0,h.jsx)(H,{children:"Title *"}),(0,h.jsx)(K,{type:"text",value:ze.title,onChange:e=>Se(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)(H,{children:"Content *"}),(0,h.jsx)(V,{value:ze.content,onChange:e=>Se(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)(H,{children:"Attachments"}),(0,h.jsx)(s.A,{files:Ge,onChange:Pe,maxFiles:5})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,h.jsxs)(q,{style:{flex:1},children:[(0,h.jsx)(H,{children:"Category"}),(0,h.jsxs)(Q,{value:ze.category,onChange:e=>Se(t=>({...t,category:e.target.value})),children:[(0,h.jsx)("option",{value:"general",children:"General"}),(0,h.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,h.jsxs)(q,{style:{flex:1},children:[(0,h.jsx)(H,{children:"Priority"}),(0,h.jsxs)(Q,{value:ze.priority,onChange:e=>Se(t=>({...t,priority:e.target.value})),children:[(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"important",children:"Important"}),(0,h.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)(H,{children:"Target Restaurants"}),(0,h.jsxs)(X,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ze.allRestaurants,onChange:e=>Se(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!ze.allRestaurants&&ge&&ge.restaurants.length>0&&(0,h.jsx)(ee,{children:ge.restaurants.map(e=>(0,h.jsxs)(te,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ze.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void Se(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!ze.allRestaurants&&ze.selectedRestaurantIds.length>0&&(0,h.jsxs)(P,{style:{marginTop:"8px",display:"block"},children:[ze.selectedRestaurantIds.length," restaurant",1!==ze.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(b,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,h.jsx)(b,{variant:"primary",onClick:async()=>{if(!ze.title.trim()||!ze.content.trim())return;const e=ze.allRestaurants?((null===ge||void 0===ge?void 0:ge.restaurants)||[]).map(e=>e.id):ze.selectedRestaurantIds;if(0!==e.length){_e(!0);try{(await fetch("/api/notices",{method:"POST",headers:Ue,body:JSON.stringify({title:ze.title,content:ze.content,target_type:"restaurant",restaurant_ids:e,priority:ze.priority,category:ze.category,attachments:Ge.length>0?Ge:void 0})})).ok&&(Se({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Pe([]),Be(!1),await Je(),ce("sent"))}catch(t){console.error("Error sending notice:",t)}finally{_e(!1)}}},disabled:Re||!ze.title.trim()||!ze.content.trim()||!ze.allRestaurants&&0===ze.selectedRestaurantIds.length,children:Re?"Sending...":"Send Notice"})]})]})}),Ie&&$e&&(0,h.jsx)(M,{onClick:()=>{Ne(!1),De(null)},children:(0,h.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(Y,{children:$e.title}),(0,h.jsx)(W,{onClick:()=>{Ne(!1),De(null)},children:"\xd7"})]}),(0,h.jsxs)(J,{children:[(0,h.jsxs)(ne,{children:[(0,h.jsxs)(ie,{children:[(0,h.jsx)(oe,{children:"From:"}),(0,h.jsx)(ae,{children:(null===(e=$e.author)||void 0===e?void 0:e.full_name)||$e.author_name})]}),(0,h.jsxs)(ie,{children:[(0,h.jsx)(oe,{children:"Role:"}),(0,h.jsx)(ae,{children:(null===(t=$e.author)||void 0===t?void 0:t.role)||$e.author_role})]}),(0,h.jsxs)(ie,{children:[(0,h.jsx)(oe,{children:"Date:"}),(0,h.jsx)(ae,{children:He($e.createdAt)})]}),(0,h.jsxs)(ie,{children:[(0,h.jsx)(oe,{children:"Priority:"}),(0,h.jsx)(D,{priority:$e.priority,children:$e.priority})]})]}),$e.recipients&&$e.recipients.length>0&&(0,h.jsxs)(q,{children:[(0,h.jsx)(H,{children:"Recipients"}),(0,h.jsx)(le,{children:$e.recipients.map((e,t)=>{var r,n;return(0,h.jsx)(de,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,h.jsx)(re,{children:$e.content.split("\n").map((e,t)=>(0,h.jsxs)(n.Fragment,{children:[t>0&&(0,h.jsx)("br",{}),(0,c.c)(e)]},t))}),(null===$e||void 0===$e?void 0:$e.attachments)&&$e.attachments.length>0&&(0,h.jsx)("div",{style:{marginTop:"16px"},children:(0,h.jsx)(l.A,{attachments:$e.attachments})}),$e.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,h.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,h.jsx)(b,{variant:"danger",onClick:()=>qe($e.id),children:"Delete Notice"})}),(0,h.jsx)(d.A,{entityType:"notice",entityId:String($e.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>Le(e=>{const t={...e},r=String($e.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(o,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:o}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:o,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var n=r(9950),i=r(4492);function o(e){const[t,r]=(0,i.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}}}]);