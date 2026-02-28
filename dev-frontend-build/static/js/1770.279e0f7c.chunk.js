"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>le});var n=r(9950),i=r(4752),o=r(1367),a=r(7455),s=r(4185),d=r(4302),l=r(4414);const c=i.Ay.div`
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
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,y=i.Ay.div`
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
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,B=i.Ay.div`
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
`,R=i.Ay.div`
  flex: 1;
`,S=i.Ay.div`
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
`,Y=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,M=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=i.Ay.button`
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
`,W=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,q=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
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
`,de=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,le=()=>{var e,t;const{user:r}=(0,o.As)(),[i,le]=(0,n.useState)("received"),[ce,pe]=(0,n.useState)([]),[xe,he]=(0,n.useState)([]),[ue,ge]=(0,n.useState)(null),[me,fe]=(0,n.useState)(""),[ye,be]=(0,n.useState)("all"),[ve,je]=(0,n.useState)(!1),[we,Ae]=(0,n.useState)(!1),[Fe,ke]=(0,n.useState)({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),[Ce,Ee]=(0,n.useState)(!1),[Be,ze]=(0,n.useState)(!1),[Re,Se]=(0,n.useState)(null),[_e,Ie]=(0,n.useState)({}),[$e,Ne]=(0,n.useState)([]),De=localStorage.getItem("auth_token"),Te={Authorization:`Bearer ${De}`,"Content-Type":"application/json"},Le=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${De}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ie(e=>({...e,...t}))}}}catch(t){}},Pe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${De}`}});if(e.ok){const t=await e.json();t.success&&ge(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[De]),Ye=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${De}`}});if(e.ok){const t=await e.json();t.success&&(pe(t.data),Le(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[De]),Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${De}`}});if(e.ok){const t=await e.json();t.success&&(he(t.data),Le(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[De]),Ue=(0,n.useCallback)(async()=>{je(!0),await Promise.all([Pe(),Ye(),Me()]),je(!1)},[Pe,Ye,Me]);(0,n.useEffect)(()=>{if(r){Ue();const e=setInterval(Ue,3e4);return()=>clearInterval(e)}},[r,Ue]);const Oe=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${De}`}})).ok&&(he(t=>t.filter(t=>t.id!==e)),(null===Re||void 0===Re?void 0:Re.id)===e&&(ze(!1),Se(null)))}catch(t){console.error("Error deleting notice:",t)}},Je=e=>new Date(e).toLocaleString("en-MY"),We=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:Je(e)},qe=("received"===i?ce:xe).filter(e=>{const t=e.title.toLowerCase().includes(me.toLowerCase())||(e.author_name||"").toLowerCase().includes(me.toLowerCase())||(e.content||"").toLowerCase().includes(me.toLowerCase()),r="all"===ye||e.priority===ye;return t&&r}),Ge=ce.length,He=ce.filter(e=>!e.read_at).length,Ke=xe.length,Qe=[...ce,...xe].filter(e=>"urgent"===e.priority).length;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Notices"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:Ue,children:"Refresh"}),(0,l.jsx)(g,{variant:"primary",onClick:()=>Ae(!0),children:"New Notice"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)(f,{borderColor:"#635BFF",children:[(0,l.jsx)(y,{children:Ge}),(0,l.jsx)(b,{children:"Received"})]}),(0,l.jsxs)(f,{borderColor:"#F59E0B",children:[(0,l.jsx)(y,{children:He}),(0,l.jsx)(b,{children:"Unread"})]}),(0,l.jsxs)(f,{borderColor:"#10B981",children:[(0,l.jsx)(y,{children:Ke}),(0,l.jsx)(b,{children:"Sent"})]}),(0,l.jsxs)(f,{borderColor:"#EF4444",children:[(0,l.jsx)(y,{children:Qe}),(0,l.jsx)(b,{children:"Urgent"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(j,{active:"received"===i,onClick:()=>le("received"),children:["Received (",Ge,")"]}),(0,l.jsxs)(j,{active:"sent"===i,onClick:()=>le("sent"),children:["Sent (",Ke,")"]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(A,{type:"text",placeholder:"Search notices...",value:me,onChange:e=>fe(e.target.value)}),(0,l.jsxs)(F,{value:ye,onChange:e=>be(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(k,{children:[qe.map(e=>{var t,r;return(0,l.jsxs)(C,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${De}`}});if(t.ok){const r=await t.json();r.success&&(Se(r.data),ze(!0),"received"===i&&pe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,l.jsxs)(E,{children:[(0,l.jsxs)(B,{children:["received"===i&&!e.read_at&&(0,l.jsx)(z,{}),(0,l.jsxs)(R,{children:[(0,l.jsx)(S,{children:e.title}),(0,l.jsxs)(_,{children:["received"===i&&(0,l.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name]}),"received"===i&&e.author_role&&(0,l.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,l.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,l.jsx)("span",{children:We(e.createdAt)})]})]})]}),(0,l.jsx)(I,{children:(0,l.jsx)($,{priority:e.priority,children:e.priority})})]}),(0,l.jsx)(N,{children:e.content}),(0,l.jsxs)(D,{children:[(0,l.jsx)("span",{children:Je(e.createdAt)}),(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,l.jsxs)(T,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=_e[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[_e[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,l.jsx)(ae,{onClick:t=>{t.stopPropagation(),Oe(e.id)},children:"Delete"})]})]})]},e.id)}),0===qe.length&&!ve&&(0,l.jsxs)(oe,{children:[(0,l.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,l.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),we&&(0,l.jsx)(P,{onClick:()=>Ae(!1),children:(0,l.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(M,{children:[(0,l.jsx)(U,{children:"New Notice"}),(0,l.jsx)(O,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,l.jsxs)(J,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Title *"}),(0,l.jsx)(H,{type:"text",value:Fe.title,onChange:e=>ke(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Content *"}),(0,l.jsx)(Q,{value:Fe.content,onChange:e=>ke(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Attachments"}),(0,l.jsx)(a.A,{files:$e,onChange:Ne,maxFiles:5})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Priority"}),(0,l.jsxs)(K,{value:Fe.priority,onChange:e=>ke(t=>({...t,priority:e.target.value})),children:[(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Target Restaurants"}),(0,l.jsxs)(V,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Fe.allRestaurants,onChange:e=>ke(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Fe.allRestaurants&&ue&&ue.restaurants.length>0&&(0,l.jsx)(X,{children:ue.restaurants.map(e=>(0,l.jsxs)(Z,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Fe.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void ke(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Fe.allRestaurants&&Fe.selectedRestaurantIds.length>0&&(0,l.jsxs)(L,{style:{marginTop:"8px",display:"block"},children:[Fe.selectedRestaurantIds.length," restaurant",1!==Fe.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,l.jsx)(g,{variant:"primary",onClick:async()=>{if(!Fe.title.trim()||!Fe.content.trim())return;const e=Fe.allRestaurants?((null===ue||void 0===ue?void 0:ue.restaurants)||[]).map(e=>e.id):Fe.selectedRestaurantIds;if(0!==e.length){Ee(!0);try{(await fetch("/api/notices",{method:"POST",headers:Te,body:JSON.stringify({title:Fe.title,content:Fe.content,target_type:"restaurant",restaurant_ids:e,priority:Fe.priority,attachments:$e.length>0?$e:void 0})})).ok&&(ke({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),Ne([]),Ae(!1),await Me(),le("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Ee(!1)}}},disabled:Ce||!Fe.title.trim()||!Fe.content.trim()||!Fe.allRestaurants&&0===Fe.selectedRestaurantIds.length,children:Ce?"Sending...":"Send Notice"})]})]})}),Be&&Re&&(0,l.jsx)(P,{onClick:()=>{ze(!1),Se(null)},children:(0,l.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(M,{children:[(0,l.jsx)(U,{children:Re.title}),(0,l.jsx)(O,{onClick:()=>{ze(!1),Se(null)},children:"\xd7"})]}),(0,l.jsxs)(J,{children:[(0,l.jsxs)(te,{children:[(0,l.jsxs)(re,{children:[(0,l.jsx)(ne,{children:"From:"}),(0,l.jsx)(ie,{children:(null===(e=Re.author)||void 0===e?void 0:e.name)||Re.author_name})]}),(0,l.jsxs)(re,{children:[(0,l.jsx)(ne,{children:"Role:"}),(0,l.jsx)(ie,{children:(null===(t=Re.author)||void 0===t?void 0:t.role)||Re.author_role})]}),(0,l.jsxs)(re,{children:[(0,l.jsx)(ne,{children:"Date:"}),(0,l.jsx)(ie,{children:Je(Re.createdAt)})]}),(0,l.jsxs)(re,{children:[(0,l.jsx)(ne,{children:"Priority:"}),(0,l.jsx)($,{priority:Re.priority,children:Re.priority})]})]}),Re.recipients&&Re.recipients.length>0&&(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Recipients"}),(0,l.jsx)(se,{children:Re.recipients.map((e,t)=>{var r,n;return(0,l.jsx)(de,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,l.jsx)(ee,{children:Re.content}),(null===Re||void 0===Re?void 0:Re.attachments)&&Re.attachments.length>0&&(0,l.jsx)("div",{style:{marginTop:"16px"},children:(0,l.jsx)(s.A,{attachments:Re.attachments})}),Re.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,l.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,l.jsx)(g,{variant:"danger",onClick:()=>Oe(Re.id),children:"Delete Notice"})}),(0,l.jsx)(d.A,{entityType:"notice",entityId:String(Re.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>Ie(e=>{const t={...e},r=String(Re.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}}}]);