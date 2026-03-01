"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>de});var n=r(9950),i=r(4752),o=r(2853),a=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(2597),p=r(2653),x=r(4414);const h=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=i.Ay.div`
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
`,g=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=i.Ay.div`
  display: flex;
  gap: 12px;
`,y=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,b=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,A=i.Ay.input`
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
`,k=i.Ay.select`
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
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,E=i.Ay.div`
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
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,z=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,S=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,R=i.Ay.div`
  flex: 1;
`,_=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,I=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,N=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,$=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,D=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,T=i.Ay.div`
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
`,L=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,G=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,P=i.Ay.div`
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
`,M=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,U=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,Y=i.Ay.button`
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
`,W=i.Ay.div`
  padding: 24px;
`,J=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Z=i.Ay.div`
  margin-bottom: 20px;
`,q=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=i.Ay.input`
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
`,K=i.Ay.select`
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
`,Q=i.Ay.textarea`
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
`,V=i.Ay.label`
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
`,X=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,ee=i.Ay.label`
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
`,te=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,re=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,ne=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,ie=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,oe=i.Ay.span`
  color: #0A2540;
`,ae=i.Ay.button`
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
`,se=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,le=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,de=()=>{var e,t;const{user:r}=(0,a.As)(),[i,de]=(0,p.M)("received"),[ce,pe]=(0,n.useState)([]),[xe,he]=(0,n.useState)([]),[ue,ge]=(0,n.useState)(null),[me,fe]=(0,n.useState)(""),[ye,be]=(0,n.useState)("all"),[ve,je]=(0,n.useState)("all"),[we,Fe]=(0,n.useState)("all"),[Ae,ke]=(0,n.useState)(!1),[Ce,Ee]=(0,n.useState)(!1),[Be,ze]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[Se,Re]=(0,n.useState)(!1),[_e,Ie]=(0,n.useState)(!1),[Ne,$e]=(0,n.useState)(null),[De,Te]=(0,n.useState)({}),[Le,Ge]=(0,n.useState)([]),Pe=localStorage.getItem("auth_token"),Me={Authorization:`Bearer ${Pe}`,"Content-Type":"application/json"},Ue=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Pe}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Te(e=>({...e,...t}))}}}catch(t){}},Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&ge(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Pe]),Ye=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&(pe(t.data),Ue(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Pe]),We=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&(he(t.data),Ue(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Pe]),Je=(0,n.useCallback)(async()=>{ke(!0),await Promise.all([Oe(),Ye(),We()]),ke(!1)},[Oe,Ye,We]);(0,n.useEffect)(()=>{if(r){Je();const e=setInterval(Je,3e4);return()=>clearInterval(e)}},[r,Je]);const Ze=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Pe}`}})).ok&&(he(t=>t.filter(t=>t.id!==e)),(null===Ne||void 0===Ne?void 0:Ne.id)===e&&(Ie(!1),$e(null)))}catch(t){console.error("Error deleting notice:",t)}},qe=e=>new Date(e).toLocaleString("en-MY"),He=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:qe(e)},Ke=("received"===i?ce:xe).filter(e=>{const t=e.title.toLowerCase().includes(me.toLowerCase())||(e.author_name||"").toLowerCase().includes(me.toLowerCase())||(e.content||"").toLowerCase().includes(me.toLowerCase()),r="all"===ye||e.priority===ye,n="all"===ve||(e.category||"general")===ve,o="all"===we||"sent"===i||e.author_role===we;return t&&r&&n&&o}),Qe=ce.length,Ve=ce.filter(e=>!e.read_at).length,Xe=xe.length,et=[...ce,...xe].filter(e=>"urgent"===e.priority).length;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(m,{children:"Notices"}),(0,x.jsx)(f,{children:(0,x.jsx)(y,{variant:"primary",onClick:()=>Ee(!0),children:"New Notice"})})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(b,{children:[(0,x.jsxs)(v,{borderColor:"#635BFF",children:[(0,x.jsx)(j,{children:Qe}),(0,x.jsx)(w,{children:"Received"})]}),(0,x.jsxs)(v,{borderColor:"#F59E0B",children:[(0,x.jsx)(j,{children:Ve}),(0,x.jsx)(w,{children:"Unread"})]}),(0,x.jsxs)(v,{borderColor:"#10B981",children:[(0,x.jsx)(j,{children:Xe}),(0,x.jsx)(w,{children:"Sent"})]}),(0,x.jsxs)(v,{borderColor:"#EF4444",children:[(0,x.jsx)(j,{children:et}),(0,x.jsx)(w,{children:"Urgent"})]})]}),(0,x.jsxs)(c.tU,{children:[(0,x.jsxs)(c.oz,{active:"received"===i,onClick:()=>de("received"),children:["Received (",Qe,")"]}),(0,x.jsxs)(c.oz,{active:"sent"===i,onClick:()=>de("sent"),children:["Sent (",Xe,")"]})]}),(0,x.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,x.jsx)("button",{onClick:()=>je(e),style:{padding:"6px 16px",borderRadius:"20px",border:ve===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ve===e?"#F0EFFF":"white",color:ve===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ve===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,x.jsxs)(F,{children:[(0,x.jsx)(A,{type:"text",placeholder:"Search notices...",value:me,onChange:e=>fe(e.target.value)}),"received"===i&&(0,x.jsxs)(k,{value:we,onChange:e=>Fe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Senders"}),(0,x.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,x.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,x.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,x.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,x.jsxs)(k,{value:ye,onChange:e=>be(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priority"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(C,{children:[Ke.map(e=>{var t,r;return(0,x.jsxs)(E,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Pe}`}});if(t.ok){const r=await t.json();r.success&&($e(r.data),Ie(!0),"received"===i&&pe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,x.jsxs)(B,{children:[(0,x.jsxs)(z,{children:["received"===i&&!e.read_at&&(0,x.jsx)(S,{}),(0,x.jsxs)(R,{children:[(0,x.jsx)(_,{children:e.title}),(0,x.jsxs)(I,{children:["received"===i&&(0,x.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===i&&e.author_role&&(0,x.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,x.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,x.jsx)("span",{children:He(e.createdAt)})]})]})]}),(0,x.jsxs)(N,{children:["guide"===e.category&&(0,x.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,x.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(D,{children:e.content}),(0,x.jsxs)(T,{children:[(0,x.jsx)("span",{children:qe(e.createdAt)}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,x.jsxs)(L,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=De[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[De[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,x.jsx)(ae,{onClick:t=>{t.stopPropagation(),Ze(e.id)},children:"Delete"})]})]})]},e.id)}),0===Ke.length&&!Ae&&(0,x.jsxs)(o.pp,{children:[(0,x.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,x.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Ce&&(0,x.jsx)(P,{onClick:()=>Ee(!1),children:(0,x.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(O,{children:"New Notice"}),(0,x.jsx)(Y,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Title *"}),(0,x.jsx)(H,{type:"text",value:Be.title,onChange:e=>ze(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Content *"}),(0,x.jsx)(Q,{value:Be.content,onChange:e=>ze(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Attachments"}),(0,x.jsx)(s.A,{files:Le,onChange:Ge,maxFiles:5})]}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,x.jsxs)(Z,{style:{flex:1},children:[(0,x.jsx)(q,{children:"Category"}),(0,x.jsxs)(K,{value:Be.category,onChange:e=>ze(t=>({...t,category:e.target.value})),children:[(0,x.jsx)("option",{value:"general",children:"General"}),(0,x.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,x.jsxs)(Z,{style:{flex:1},children:[(0,x.jsx)(q,{children:"Priority"}),(0,x.jsxs)(K,{value:Be.priority,onChange:e=>ze(t=>({...t,priority:e.target.value})),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Target Restaurants"}),(0,x.jsxs)(V,{children:[(0,x.jsx)("input",{type:"checkbox",checked:Be.allRestaurants,onChange:e=>ze(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Be.allRestaurants&&ue&&ue.restaurants.length>0&&(0,x.jsx)(X,{children:ue.restaurants.map(e=>(0,x.jsxs)(ee,{children:[(0,x.jsx)("input",{type:"checkbox",checked:Be.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void ze(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Be.allRestaurants&&Be.selectedRestaurantIds.length>0&&(0,x.jsxs)(G,{style:{marginTop:"8px",display:"block"},children:[Be.selectedRestaurantIds.length," restaurant",1!==Be.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,x.jsxs)(J,{children:[(0,x.jsx)(y,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,x.jsx)(y,{variant:"primary",onClick:async()=>{if(!Be.title.trim()||!Be.content.trim())return;const e=Be.allRestaurants?((null===ue||void 0===ue?void 0:ue.restaurants)||[]).map(e=>e.id):Be.selectedRestaurantIds;if(0!==e.length){Re(!0);try{(await fetch("/api/notices",{method:"POST",headers:Me,body:JSON.stringify({title:Be.title,content:Be.content,target_type:"restaurant",restaurant_ids:e,priority:Be.priority,category:Be.category,attachments:Le.length>0?Le:void 0})})).ok&&(ze({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Ge([]),Ee(!1),await We(),de("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Re(!1)}}},disabled:Se||!Be.title.trim()||!Be.content.trim()||!Be.allRestaurants&&0===Be.selectedRestaurantIds.length,children:Se?"Sending...":"Send Notice"})]})]})}),_e&&Ne&&(0,x.jsx)(P,{onClick:()=>{Ie(!1),$e(null)},children:(0,x.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(O,{children:Ne.title}),(0,x.jsx)(Y,{onClick:()=>{Ie(!1),$e(null)},children:"\xd7"})]}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(re,{children:[(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{children:"From:"}),(0,x.jsx)(oe,{children:(null===(e=Ne.author)||void 0===e?void 0:e.full_name)||Ne.author_name})]}),(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{children:"Role:"}),(0,x.jsx)(oe,{children:(null===(t=Ne.author)||void 0===t?void 0:t.role)||Ne.author_role})]}),(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{children:"Date:"}),(0,x.jsx)(oe,{children:qe(Ne.createdAt)})]}),(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{children:"Priority:"}),(0,x.jsx)($,{priority:Ne.priority,children:Ne.priority})]})]}),Ne.recipients&&Ne.recipients.length>0&&(0,x.jsxs)(Z,{children:[(0,x.jsx)(q,{children:"Recipients"}),(0,x.jsx)(se,{children:Ne.recipients.map((e,t)=>{var r,n;return(0,x.jsx)(le,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,x.jsx)(te,{children:Ne.content}),(null===Ne||void 0===Ne?void 0:Ne.attachments)&&Ne.attachments.length>0&&(0,x.jsx)("div",{style:{marginTop:"16px"},children:(0,x.jsx)(l.A,{attachments:Ne.attachments})}),Ne.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,x.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,x.jsx)(y,{variant:"danger",onClick:()=>Ze(Ne.id),children:"Delete Notice"})}),(0,x.jsx)(d.A,{entityType:"notice",entityId:String(Ne.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>Te(e=>{const t={...e},r=String(Ne.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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