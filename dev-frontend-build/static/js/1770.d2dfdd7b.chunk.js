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
`,g=i.Ay.div`
  display: flex;
  gap: 12px;
`,u=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=i.Ay.div`
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
`,C=i.Ay.div`
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
`,S=i.Ay.div`
  flex: 1;
`,$=i.Ay.div`
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
`,D=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,R=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,I=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,N=i.Ay.div`
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
`,O=i.Ay.div`
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
`,J=i.Ay.button`
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
`,Y=i.Ay.div`
  padding: 24px;
`,W=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=i.Ay.div`
  margin-bottom: 20px;
`,X=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Z=i.Ay.input`
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
`,q=i.Ay.select`
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
`,G=i.Ay.textarea`
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
`,H=i.Ay.label`
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
`,Q=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,V=i.Ay.label`
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
`,de=()=>{var e,t;const{user:r}=(0,o.As)(),[i,de]=(0,n.useState)("received"),[ce,pe]=(0,n.useState)([]),[xe,he]=(0,n.useState)([]),[ge,ue]=(0,n.useState)(null),[fe,me]=(0,n.useState)(""),[ye,be]=(0,n.useState)("all"),[ve,je]=(0,n.useState)(!1),[we,Ae]=(0,n.useState)(!1),[Fe,ke]=(0,n.useState)({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),[Ee,Ce]=(0,n.useState)(!1),[Be,ze]=(0,n.useState)(!1),[Se,$e]=(0,n.useState)(null),[_e,De]=(0,n.useState)({}),[Re,Ie]=(0,n.useState)([]),Ne=localStorage.getItem("auth_token"),Te={Authorization:`Bearer ${Ne}`,"Content-Type":"application/json"},Le=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Ne}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),De(e=>({...e,...t}))}}}catch(t){}},Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Ne}`}});if(e.ok){const t=await e.json();t.success&&ue(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Ne]),Pe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Ne}`}});if(e.ok){const t=await e.json();t.success&&(pe(t.data),Le(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Ne]),Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Ne}`}});if(e.ok){const t=await e.json();t.success&&(he(t.data),Le(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Ne]),Ue=(0,n.useCallback)(async()=>{je(!0),await Promise.all([Oe(),Pe(),Me()]),je(!1)},[Oe,Pe,Me]);(0,n.useEffect)(()=>{if(r){Ue();const e=setInterval(Ue,3e4);return()=>clearInterval(e)}},[r,Ue]);const Je=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Ne}`}})).ok&&(he(t=>t.filter(t=>t.id!==e)),(null===Se||void 0===Se?void 0:Se.id)===e&&(ze(!1),$e(null)))}catch(t){console.error("Error deleting notice:",t)}},Ye=e=>new Date(e).toLocaleString("en-MY"),We=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:Ye(e)},Ke=("received"===i?ce:xe).filter(e=>{const t=e.title.toLowerCase().includes(fe.toLowerCase())||(e.author_name||"").toLowerCase().includes(fe.toLowerCase())||(e.content||"").toLowerCase().includes(fe.toLowerCase()),r="all"===ye||e.priority===ye;return t&&r}),Xe=ce.length,Ze=ce.filter(e=>!e.read_at).length,qe=xe.length,Ge=[...ce,...xe].filter(e=>"urgent"===e.priority).length;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Notices"}),(0,d.jsxs)(g,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:Ue,children:"Refresh"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>Ae(!0),children:"New Notice"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{borderColor:"#635BFF",children:[(0,d.jsx)(y,{children:Xe}),(0,d.jsx)(b,{children:"Received"})]}),(0,d.jsxs)(m,{borderColor:"#F59E0B",children:[(0,d.jsx)(y,{children:Ze}),(0,d.jsx)(b,{children:"Unread"})]}),(0,d.jsxs)(m,{borderColor:"#10B981",children:[(0,d.jsx)(y,{children:qe}),(0,d.jsx)(b,{children:"Sent"})]}),(0,d.jsxs)(m,{borderColor:"#EF4444",children:[(0,d.jsx)(y,{children:Ge}),(0,d.jsx)(b,{children:"Urgent"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{active:"received"===i,onClick:()=>de("received"),children:["Received (",Xe,")"]}),(0,d.jsxs)(j,{active:"sent"===i,onClick:()=>de("sent"),children:["Sent (",qe,")"]})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{type:"text",placeholder:"Search notices...",value:fe,onChange:e=>me(e.target.value)}),(0,d.jsxs)(F,{value:ye,onChange:e=>be(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(k,{children:[Ke.map(e=>{var t,r;return(0,d.jsxs)(E,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Ne}`}});if(t.ok){const r=await t.json();r.success&&($e(r.data),ze(!0),"received"===i&&pe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(B,{children:["received"===i&&!e.read_at&&(0,d.jsx)(z,{}),(0,d.jsxs)(S,{children:[(0,d.jsx)($,{children:e.title}),(0,d.jsxs)(_,{children:["received"===i&&(0,d.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name]}),"received"===i&&e.author_role&&(0,d.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,d.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,d.jsx)("span",{children:We(e.createdAt)})]})]})]}),(0,d.jsx)(D,{children:(0,d.jsx)(R,{priority:e.priority,children:e.priority})})]}),(0,d.jsx)(I,{children:e.content}),(0,d.jsxs)(N,{children:[(0,d.jsx)("span",{children:Ye(e.createdAt)}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,d.jsxs)(T,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=_e[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[_e[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,d.jsx)(ae,{onClick:t=>{t.stopPropagation(),Je(e.id)},children:"Delete"})]})]})]},e.id)}),0===Ke.length&&!ve&&(0,d.jsxs)(oe,{children:[(0,d.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,d.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),we&&(0,d.jsx)(O,{onClick:()=>Ae(!1),children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(U,{children:"New Notice"}),(0,d.jsx)(J,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Title *"}),(0,d.jsx)(Z,{type:"text",value:Fe.title,onChange:e=>ke(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Content *"}),(0,d.jsx)(G,{value:Fe.content,onChange:e=>ke(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Attachments"}),(0,d.jsx)(a.A,{files:Re,onChange:Ie,maxFiles:5})]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Priority"}),(0,d.jsxs)(q,{value:Fe.priority,onChange:e=>ke(t=>({...t,priority:e.target.value})),children:[(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Target Restaurants"}),(0,d.jsxs)(H,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Fe.allRestaurants,onChange:e=>ke(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Fe.allRestaurants&&ge&&ge.restaurants.length>0&&(0,d.jsx)(Q,{children:ge.restaurants.map(e=>(0,d.jsxs)(V,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Fe.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void ke(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Fe.allRestaurants&&Fe.selectedRestaurantIds.length>0&&(0,d.jsxs)(L,{style:{marginTop:"8px",display:"block"},children:[Fe.selectedRestaurantIds.length," restaurant",1!==Fe.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:async()=>{if(!Fe.title.trim()||!Fe.content.trim())return;const e=Fe.allRestaurants?((null===ge||void 0===ge?void 0:ge.restaurants)||[]).map(e=>e.id):Fe.selectedRestaurantIds;if(0!==e.length){Ce(!0);try{(await fetch("/api/notices",{method:"POST",headers:Te,body:JSON.stringify({title:Fe.title,content:Fe.content,target_type:"restaurant",restaurant_ids:e,priority:Fe.priority,attachments:Re.length>0?Re:void 0})})).ok&&(ke({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),Ie([]),Ae(!1),await Me(),de("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Ce(!1)}}},disabled:Ee||!Fe.title.trim()||!Fe.content.trim()||!Fe.allRestaurants&&0===Fe.selectedRestaurantIds.length,children:Ee?"Sending...":"Send Notice"})]})]})}),Be&&Se&&(0,d.jsx)(O,{onClick:()=>{ze(!1),$e(null)},children:(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(U,{children:Se.title}),(0,d.jsx)(J,{onClick:()=>{ze(!1),$e(null)},children:"\xd7"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(te,{children:[(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"From:"}),(0,d.jsx)(ie,{children:(null===(e=Se.author)||void 0===e?void 0:e.name)||Se.author_name})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Role:"}),(0,d.jsx)(ie,{children:(null===(t=Se.author)||void 0===t?void 0:t.role)||Se.author_role})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Date:"}),(0,d.jsx)(ie,{children:Ye(Se.createdAt)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ne,{children:"Priority:"}),(0,d.jsx)(R,{priority:Se.priority,children:Se.priority})]})]}),Se.recipients&&Se.recipients.length>0&&(0,d.jsxs)(K,{children:[(0,d.jsx)(X,{children:"Recipients"}),(0,d.jsx)(se,{children:Se.recipients.map((e,t)=>{var r,n;return(0,d.jsx)(le,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,d.jsx)(ee,{children:Se.content}),(null===Se||void 0===Se?void 0:Se.attachments)&&Se.attachments.length>0&&(0,d.jsx)("div",{style:{marginTop:"16px"},children:(0,d.jsx)(s.A,{attachments:Se.attachments})}),Se.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,d.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,d.jsx)(u,{variant:"danger",onClick:()=>Je(Se.id),children:"Delete Notice"})}),(0,d.jsx)(l.A,{entityType:"notice",entityId:String(Se.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>De(e=>{const t={...e},r=String(Se.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}},4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=n.Ay.a`
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
`,d=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=n.Ay.span`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,i.jsx)(x,{children:r.map((e,t)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,i.jsx)(s,{children:n.map((e,t)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>$});var n=r(9950),i=r(4752),o=r(4185),a=r(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  flex: 1;
  min-width: 0;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,g=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=i.Ay.textarea`
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
`,w=i.Ay.div`
  display: flex;
  gap: 4px;
`,A=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=i.Ay.button`
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
`,k=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=i.Ay.input`
  display: none;
`,$=e=>{let{entityType:t,entityId:r,currentUserId:i,onMarkRead:$}=e;const[_,D]=(0,n.useState)([]),[R,I]=(0,n.useState)(""),[N,T]=(0,n.useState)([]),[L,O]=(0,n.useState)(!1),[P,M]=(0,n.useState)(!1),U=(0,n.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&D(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),$&&$()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const Y=async()=>{const e=R.trim(),n=N.length>0;if((e||n)&&!P){M(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:R.trim(),attachments:n?N:void 0})})).ok&&(I(""),T([]),J())}catch(i){console.error("Error adding comment:",i)}finally{M(!1)}}},W=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",_.length,")"]}),_.length>0?(0,a.jsx)(d,{children:_.map(e=>{var t,r,n;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(f,{children:W(e.createdAt)}),i&&e.author_id===i&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&J()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(m,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(v,{children:[(0,a.jsx)(j,{value:R,onChange:e=>I(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Y())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(A,{onClick:()=>{var e;return null===(e=U.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:Y,disabled:!R.trim()&&0===N.length||P,children:"Send"})]})]}),(N.length>0||L)&&(0,a.jsxs)(E,{children:[L&&(0,a.jsx)(z,{children:"Uploading..."}),N.map((e,t)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=N[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),T(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:U,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-N.length,n=Array.from(t).slice(0,r);if(0!==n.length){O(!0);try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await r.json();i.success&&i.data&&T(e=>[...e,...i.data])}catch(i){console.error("File upload error:",i)}finally{O(!1)}}}})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>v});var n=r(9950),i=r(4752),o=r(4414);const a=i.Ay.div`
  margin-top: 8px;
`,s=i.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    border-color: ${e=>e.disabled?"#CBD5E1":"#635BFF"};
  }
`,l=i.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=i.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=i.Ay.input`
  display: none;
`,p=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=i.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,g=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,f=i.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,b=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const v=e=>{let{files:t,onChange:r,maxFiles:i=5,maxSizeMB:v=10,disabled:j=!1,compact:w=!1}=e;const[A,F]=(0,n.useState)(!1),[k,E]=(0,n.useState)(!1),C=(0,n.useRef)(null),B=!j&&!k&&t.length<i,z=async e=>{const n=i-t.length,o=Array.from(e).slice(0,n);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const n=localStorage.getItem("auth_token"),i=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await i.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:A,disabled:!B,onClick:()=>{var e;return B&&(null===(e=C.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:w?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",i,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",v,"MB each, ",i-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:C,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,n)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(f,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]}),!j&&(0,o.jsx)(m,{onClick:()=>(async e=>{const n=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:n.url})})}catch(i){}r(t.filter((t,r)=>r!==e))})(n),title:"Remove",children:"\u2715"})]},e.url);var i,a})]})]})}}}]);