"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>de});var n=r(9950),i=r(4752),o=r(1367),a=r(7455),s=r(4185),l=r(4302),d=r(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
`,g=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,j=i.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

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
`,w=i.Ay.div`
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
`,F=i.Ay.select`
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
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,C=i.Ay.div`
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
`,E=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,z=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,S=i.Ay.div`
  flex: 1;
`,R=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,_=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,I=i.Ay.div`
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
`,N=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,D=i.Ay.div`
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
`,T=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,L=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,G=i.Ay.div`
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
`,P=i.Ay.div`
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
`,M=i.Ay.button`
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
`,U=i.Ay.div`
  padding: 24px;
`,W=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=i.Ay.div`
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
`,Z=i.Ay.label`
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
`,ee=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,te=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,re=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,ne=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,ie=i.Ay.span`
  color: #0A2540;
`,oe=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }
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
`,de=()=>{var e,t;const{user:r}=(0,o.As)(),[i,de]=(0,n.useState)("received"),[ce,pe]=(0,n.useState)([]),[xe,he]=(0,n.useState)([]),[ue,ge]=(0,n.useState)(null),[me,ye]=(0,n.useState)(""),[fe,be]=(0,n.useState)("all"),[ve,je]=(0,n.useState)("all"),[we,Ae]=(0,n.useState)("all"),[Fe,ke]=(0,n.useState)(!1),[Ce,Be]=(0,n.useState)(!1),[Ee,ze]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[Se,Re]=(0,n.useState)(!1),[_e,Ie]=(0,n.useState)(!1),[$e,Ne]=(0,n.useState)(null),[De,Te]=(0,n.useState)({}),[Le,Ge]=(0,n.useState)([]),Pe=localStorage.getItem("auth_token"),Oe={Authorization:`Bearer ${Pe}`,"Content-Type":"application/json"},Ye=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Pe}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Te(e=>({...e,...t}))}}}catch(t){}},Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&ge(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Pe]),Ue=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&(pe(t.data),Ye(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Pe]),We=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Pe}`}});if(e.ok){const t=await e.json();t.success&&(he(t.data),Ye(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Pe]),Je=(0,n.useCallback)(async()=>{ke(!0),await Promise.all([Me(),Ue(),We()]),ke(!1)},[Me,Ue,We]);(0,n.useEffect)(()=>{if(r){Je();const e=setInterval(Je,3e4);return()=>clearInterval(e)}},[r,Je]);const qe=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Pe}`}})).ok&&(he(t=>t.filter(t=>t.id!==e)),(null===$e||void 0===$e?void 0:$e.id)===e&&(Ie(!1),Ne(null)))}catch(t){console.error("Error deleting notice:",t)}},He=e=>new Date(e).toLocaleString("en-MY"),Ke=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:He(e)},Qe=("received"===i?ce:xe).filter(e=>{const t=e.title.toLowerCase().includes(me.toLowerCase())||(e.author_name||"").toLowerCase().includes(me.toLowerCase())||(e.content||"").toLowerCase().includes(me.toLowerCase()),r="all"===fe||e.priority===fe,n="all"===ve||(e.category||"general")===ve,o="all"===we||"sent"===i||e.author_role===we;return t&&r&&n&&o}),Ve=ce.length,Xe=ce.filter(e=>!e.read_at).length,Ze=xe.length,et=[...ce,...xe].filter(e=>"urgent"===e.priority).length;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Notices"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:Je,children:"Refresh"}),(0,d.jsx)(g,{variant:"primary",onClick:()=>Be(!0),children:"New Notice"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{borderColor:"#635BFF",children:[(0,d.jsx)(f,{children:Ve}),(0,d.jsx)(b,{children:"Received"})]}),(0,d.jsxs)(y,{borderColor:"#F59E0B",children:[(0,d.jsx)(f,{children:Xe}),(0,d.jsx)(b,{children:"Unread"})]}),(0,d.jsxs)(y,{borderColor:"#10B981",children:[(0,d.jsx)(f,{children:Ze}),(0,d.jsx)(b,{children:"Sent"})]}),(0,d.jsxs)(y,{borderColor:"#EF4444",children:[(0,d.jsx)(f,{children:et}),(0,d.jsx)(b,{children:"Urgent"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{active:"received"===i,onClick:()=>de("received"),children:["Received (",Ve,")"]}),(0,d.jsxs)(j,{active:"sent"===i,onClick:()=>de("sent"),children:["Sent (",Ze,")"]})]}),(0,d.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,d.jsx)("button",{onClick:()=>je(e),style:{padding:"6px 16px",borderRadius:"20px",border:ve===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ve===e?"#F0EFFF":"white",color:ve===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ve===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{type:"text",placeholder:"Search notices...",value:me,onChange:e=>ye(e.target.value)}),"received"===i&&(0,d.jsxs)(F,{value:we,onChange:e=>Ae(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Senders"}),(0,d.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,d.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,d.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,d.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,d.jsxs)(F,{value:fe,onChange:e=>be(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(k,{children:[Qe.map(e=>{var t,r;return(0,d.jsxs)(C,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Pe}`}});if(t.ok){const r=await t.json();r.success&&(Ne(r.data),Ie(!0),"received"===i&&pe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,d.jsxs)(B,{children:[(0,d.jsxs)(E,{children:["received"===i&&!e.read_at&&(0,d.jsx)(z,{}),(0,d.jsxs)(S,{children:[(0,d.jsx)(R,{children:e.title}),(0,d.jsxs)(_,{children:["received"===i&&(0,d.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===i&&e.author_role&&(0,d.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,d.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,d.jsx)("span",{children:Ke(e.createdAt)})]})]})]}),(0,d.jsxs)(I,{children:["guide"===e.category&&(0,d.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,d.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(N,{children:e.content}),(0,d.jsxs)(D,{children:[(0,d.jsx)("span",{children:He(e.createdAt)}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,d.jsxs)(T,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=De[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[De[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,d.jsx)(ae,{onClick:t=>{t.stopPropagation(),qe(e.id)},children:"Delete"})]})]})]},e.id)}),0===Qe.length&&!Fe&&(0,d.jsxs)(oe,{children:[(0,d.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,d.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Ce&&(0,d.jsx)(G,{onClick:()=>Be(!1),children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(Y,{children:"New Notice"}),(0,d.jsx)(M,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(q,{children:"Title *"}),(0,d.jsx)(H,{type:"text",value:Ee.title,onChange:e=>ze(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(q,{children:"Content *"}),(0,d.jsx)(Q,{value:Ee.content,onChange:e=>ze(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(q,{children:"Attachments"}),(0,d.jsx)(a.A,{files:Le,onChange:Ge,maxFiles:5})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,d.jsxs)(J,{style:{flex:1},children:[(0,d.jsx)(q,{children:"Category"}),(0,d.jsxs)(K,{value:Ee.category,onChange:e=>ze(t=>({...t,category:e.target.value})),children:[(0,d.jsx)("option",{value:"general",children:"General"}),(0,d.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,d.jsxs)(J,{style:{flex:1},children:[(0,d.jsx)(q,{children:"Priority"}),(0,d.jsxs)(K,{value:Ee.priority,onChange:e=>ze(t=>({...t,priority:e.target.value})),children:[(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(q,{children:"Target Restaurants"}),(0,d.jsxs)(V,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Ee.allRestaurants,onChange:e=>ze(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Ee.allRestaurants&&ue&&ue.restaurants.length>0&&(0,d.jsx)(X,{children:ue.restaurants.map(e=>(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Ee.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void ze(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Ee.allRestaurants&&Ee.selectedRestaurantIds.length>0&&(0,d.jsxs)(L,{style:{marginTop:"8px",display:"block"},children:[Ee.selectedRestaurantIds.length," restaurant",1!==Ee.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(!Ee.title.trim()||!Ee.content.trim())return;const e=Ee.allRestaurants?((null===ue||void 0===ue?void 0:ue.restaurants)||[]).map(e=>e.id):Ee.selectedRestaurantIds;if(0!==e.length){Re(!0);try{(await fetch("/api/notices",{method:"POST",headers:Oe,body:JSON.stringify({title:Ee.title,content:Ee.content,target_type:"restaurant",restaurant_ids:e,priority:Ee.priority,category:Ee.category,attachments:Le.length>0?Le:void 0})})).ok&&(ze({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Ge([]),Be(!1),await We(),de("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Re(!1)}}},disabled:Se||!Ee.title.trim()||!Ee.content.trim()||!Ee.allRestaurants&&0===Ee.selectedRestaurantIds.length,children:Se?"Sending...":"Send Notice"})]})]})}),_e&&$e&&(0,d.jsx)(G,{onClick:()=>{Ie(!1),Ne(null)},children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(Y,{children:$e.title}),(0,d.jsx)(M,{onClick:()=>{Ie(!1),Ne(null)},children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(te,{children:[(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"From:"}),(0,d.jsx)(ie,{children:(null===(e=$e.author)||void 0===e?void 0:e.full_name)||$e.author_name})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Role:"}),(0,d.jsx)(ie,{children:(null===(t=$e.author)||void 0===t?void 0:t.role)||$e.author_role})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Date:"}),(0,d.jsx)(ie,{children:He($e.createdAt)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Priority:"}),(0,d.jsx)($,{priority:$e.priority,children:$e.priority})]})]}),$e.recipients&&$e.recipients.length>0&&(0,d.jsxs)(J,{children:[(0,d.jsx)(q,{children:"Recipients"}),(0,d.jsx)(se,{children:$e.recipients.map((e,t)=>{var r,n;return(0,d.jsx)(le,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,d.jsx)(ee,{children:$e.content}),(null===$e||void 0===$e?void 0:$e.attachments)&&$e.attachments.length>0&&(0,d.jsx)("div",{style:{marginTop:"16px"},children:(0,d.jsx)(s.A,{attachments:$e.attachments})}),$e.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,d.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,d.jsx)(g,{variant:"danger",onClick:()=>qe($e.id),children:"Delete Notice"})}),(0,d.jsx)(l.A,{entityType:"notice",entityId:String($e.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>Te(e=>{const t={...e},r=String($e.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}}}]);