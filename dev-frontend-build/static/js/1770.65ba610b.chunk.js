"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ye});var n=r(9950),i=r(4752),o=r(1367),a=r(4414);const s=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,d=i.Ay.div`
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
`,l=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=i.Ay.div`
  display: flex;
  gap: 12px;
`,x=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,h=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,y=i.Ay.button`
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
`,b=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,v=i.Ay.input`
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
`,j=i.Ay.select`
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
`,w=i.Ay.div`
  display: grid;
  gap: 20px;
`,A=i.Ay.div`
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
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,k=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,C=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,E=i.Ay.div`
  flex: 1;
`,B=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,z=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,S=i.Ay.div`
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
`,$=i.Ay.div`
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
`,_=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,N=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,D=i.Ay.div`
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
`,T=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,P=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=i.Ay.h2`
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
`,Y=i.Ay.div`
  padding: 24px;
`,U=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,M=i.Ay.div`
  margin-bottom: 20px;
`,J=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=i.Ay.input`
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
`,K=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,Q=i.Ay.label`
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
`,V=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,X=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,Z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,ee=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,te=i.Ay.span`
  color: #0A2540;
`,re=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 24px;
`,ne=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,ie=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,oe=i.Ay.div`
  display: flex;
  gap: 12px;
`,ae=i.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
`,se=i.Ay.div`
  flex: 1;
`,de=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;

  span {
    font-weight: 400;
    color: #9CA3AF;
    margin-left: 8px;
    font-size: 12px;
  }
`,le=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,ce=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,pe=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,xe=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,he=i.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A51E6;
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`,ue=i.Ay.div`
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
`,ge=i.Ay.button`
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
`,fe=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,me=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,ye=()=>{var e,t;const{user:r}=(0,o.As)(),[i,ye]=(0,n.useState)("received"),[be,ve]=(0,n.useState)([]),[je,we]=(0,n.useState)([]),[Ae,Fe]=(0,n.useState)(null),[ke,Ce]=(0,n.useState)(""),[Ee,Be]=(0,n.useState)("all"),[ze,Se]=(0,n.useState)(!1),[Re,Ie]=(0,n.useState)(!1),[$e,_e]=(0,n.useState)({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),[Ne,De]=(0,n.useState)(!1),[Te,Pe]=(0,n.useState)(!1),[Le,Oe]=(0,n.useState)(null),[Ye,Ue]=(0,n.useState)([]),[Me,Je]=(0,n.useState)(""),[We,qe]=(0,n.useState)(!1),Ge=localStorage.getItem("auth_token"),He={Authorization:`Bearer ${Ge}`,"Content-Type":"application/json"},Ke=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Ge}`}});if(e.ok){const t=await e.json();t.success&&Fe(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Ge]),Qe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Ge}`}});if(e.ok){const t=await e.json();t.success&&ve(t.data)}}catch(e){console.error("Error fetching received notices:",e)}},[Ge]),Ve=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Ge}`}});if(e.ok){const t=await e.json();t.success&&we(t.data)}}catch(e){console.error("Error fetching sent notices:",e)}},[Ge]),Xe=(0,n.useCallback)(async()=>{Se(!0),await Promise.all([Ke(),Qe(),Ve()]),Se(!1)},[Ke,Qe,Ve]);(0,n.useEffect)(()=>{if(r){Xe();const e=setInterval(Xe,3e4);return()=>clearInterval(e)}},[r,Xe]);const Ze=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Ge}`}})).ok&&(we(t=>t.filter(t=>t.id!==e)),(null===Le||void 0===Le?void 0:Le.id)===e&&(Pe(!1),Oe(null)))}catch(t){console.error("Error deleting notice:",t)}},et=e=>new Date(e).toLocaleString("en-MY"),tt=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:et(e)},rt=("received"===i?be:je).filter(e=>{const t=e.title.toLowerCase().includes(ke.toLowerCase())||(e.author_name||"").toLowerCase().includes(ke.toLowerCase())||(e.content||"").toLowerCase().includes(ke.toLowerCase()),r="all"===Ee||e.priority===Ee;return t&&r}),nt=be.length,it=be.filter(e=>!e.read_at).length,ot=je.length,at=[...be,...je].filter(e=>"urgent"===e.priority).length;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(s,{children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(c,{children:"Notices"}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:Xe,children:"Refresh"}),(0,a.jsx)(x,{variant:"primary",onClick:()=>Ie(!0),children:"New Notice"})]})]}),(0,a.jsxs)(l,{children:[(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{borderColor:"#635BFF",children:[(0,a.jsx)(g,{children:nt}),(0,a.jsx)(f,{children:"Received"})]}),(0,a.jsxs)(u,{borderColor:"#F59E0B",children:[(0,a.jsx)(g,{children:it}),(0,a.jsx)(f,{children:"Unread"})]}),(0,a.jsxs)(u,{borderColor:"#10B981",children:[(0,a.jsx)(g,{children:ot}),(0,a.jsx)(f,{children:"Sent"})]}),(0,a.jsxs)(u,{borderColor:"#EF4444",children:[(0,a.jsx)(g,{children:at}),(0,a.jsx)(f,{children:"Urgent"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(y,{active:"received"===i,onClick:()=>ye("received"),children:["Received (",nt,")"]}),(0,a.jsxs)(y,{active:"sent"===i,onClick:()=>ye("sent"),children:["Sent (",ot,")"]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{type:"text",placeholder:"Search notices...",value:ke,onChange:e=>Ce(e.target.value)}),(0,a.jsxs)(j,{value:Ee,onChange:e=>Be(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"normal",children:"Normal"}),(0,a.jsx)("option",{value:"important",children:"Important"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(w,{children:[rt.map(e=>{var t;return(0,a.jsxs)(A,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Ge}`}});if(t.ok){const r=await t.json();r.success&&(Oe(r.data),Ue(r.data.comments||[]),Pe(!0),"received"===i&&ve(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,a.jsxs)(F,{children:[(0,a.jsxs)(k,{children:["received"===i&&!e.read_at&&(0,a.jsx)(C,{}),(0,a.jsxs)(E,{children:[(0,a.jsx)(B,{children:e.title}),(0,a.jsxs)(z,{children:["received"===i&&(0,a.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name]}),"received"===i&&e.author_role&&(0,a.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,a.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,a.jsx)("span",{children:tt(e.createdAt)})]})]})]}),(0,a.jsx)(S,{children:(0,a.jsx)(R,{priority:e.priority,children:e.priority})})]}),(0,a.jsx)(I,{children:e.content}),(0,a.jsxs)($,{children:[(0,a.jsx)("span",{children:et(e.createdAt)}),(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,a.jsxs)(_,{children:[e.commentCount," comment",1!==e.commentCount?"s":""]}),"sent"===i&&(0,a.jsx)(ge,{onClick:t=>{t.stopPropagation(),Ze(e.id)},children:"Delete"})]})]})]},e.id)}),0===rt.length&&!ze&&(0,a.jsxs)(ue,{children:[(0,a.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,a.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Re&&(0,a.jsx)(D,{onClick:()=>Ie(!1),children:(0,a.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(P,{children:[(0,a.jsx)(L,{children:"New Notice"}),(0,a.jsx)(O,{onClick:()=>Ie(!1),children:"\xd7"})]}),(0,a.jsxs)(Y,{children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(J,{children:"Title *"}),(0,a.jsx)(W,{type:"text",value:$e.title,onChange:e=>_e(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,a.jsxs)(M,{children:[(0,a.jsx)(J,{children:"Content *"}),(0,a.jsx)(G,{value:$e.content,onChange:e=>_e(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,a.jsxs)(M,{children:[(0,a.jsx)(J,{children:"Priority"}),(0,a.jsxs)(q,{value:$e.priority,onChange:e=>_e(t=>({...t,priority:e.target.value})),children:[(0,a.jsx)("option",{value:"normal",children:"Normal"}),(0,a.jsx)("option",{value:"important",children:"Important"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(M,{children:[(0,a.jsx)(J,{children:"Target Restaurants"}),(0,a.jsxs)(H,{children:[(0,a.jsx)("input",{type:"checkbox",checked:$e.allRestaurants,onChange:e=>_e(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!$e.allRestaurants&&Ae&&Ae.restaurants.length>0&&(0,a.jsx)(K,{children:Ae.restaurants.map(e=>(0,a.jsxs)(Q,{children:[(0,a.jsx)("input",{type:"checkbox",checked:$e.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void _e(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!$e.allRestaurants&&$e.selectedRestaurantIds.length>0&&(0,a.jsxs)(N,{style:{marginTop:"8px",display:"block"},children:[$e.selectedRestaurantIds.length," restaurant",1!==$e.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:()=>Ie(!1),children:"Cancel"}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(!$e.title.trim()||!$e.content.trim())return;const e=$e.allRestaurants?((null===Ae||void 0===Ae?void 0:Ae.restaurants)||[]).map(e=>e.id):$e.selectedRestaurantIds;if(0!==e.length){De(!0);try{(await fetch("/api/notices",{method:"POST",headers:He,body:JSON.stringify({title:$e.title,content:$e.content,target_type:"restaurant",restaurant_ids:e,priority:$e.priority})})).ok&&(_e({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),Ie(!1),await Ve(),ye("sent"))}catch(t){console.error("Error sending notice:",t)}finally{De(!1)}}},disabled:Ne||!$e.title.trim()||!$e.content.trim()||!$e.allRestaurants&&0===$e.selectedRestaurantIds.length,children:Ne?"Sending...":"Send Notice"})]})]})}),Te&&Le&&(0,a.jsx)(D,{onClick:()=>{Pe(!1),Oe(null)},children:(0,a.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(P,{children:[(0,a.jsx)(L,{children:Le.title}),(0,a.jsx)(O,{onClick:()=>{Pe(!1),Oe(null)},children:"\xd7"})]}),(0,a.jsxs)(Y,{children:[(0,a.jsxs)(X,{children:[(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"From:"}),(0,a.jsx)(te,{children:(null===(e=Le.author)||void 0===e?void 0:e.name)||Le.author_name})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Role:"}),(0,a.jsx)(te,{children:(null===(t=Le.author)||void 0===t?void 0:t.role)||Le.author_role})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Date:"}),(0,a.jsx)(te,{children:et(Le.createdAt)})]}),(0,a.jsxs)(Z,{children:[(0,a.jsx)(ee,{children:"Priority:"}),(0,a.jsx)(R,{priority:Le.priority,children:Le.priority})]})]}),Le.recipients&&Le.recipients.length>0&&(0,a.jsxs)(M,{children:[(0,a.jsx)(J,{children:"Recipients"}),(0,a.jsx)(fe,{children:Le.recipients.map((e,t)=>{var r,n;return(0,a.jsx)(me,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,a.jsx)(V,{children:Le.content}),Le.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,a.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,a.jsx)(x,{variant:"danger",onClick:()=>Ze(Le.id),children:"Delete Notice"})}),(0,a.jsxs)(re,{children:[(0,a.jsxs)(ne,{children:["Comments (",Ye.length,")"]}),Ye.length>0&&(0,a.jsx)(ie,{children:Ye.map(e=>{var t,r,n,i;return(0,a.jsxs)(oe,{children:[(0,a.jsx)(ae,{children:(i=(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name,i.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,a.jsxs)(se,{children:[(0,a.jsxs)(de,{children:[(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name,(0,a.jsx)("span",{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role})]}),(0,a.jsx)(le,{children:e.content}),(0,a.jsx)(ce,{children:tt(e.createdAt)})]})]},e.id)})}),(0,a.jsxs)(pe,{children:[(0,a.jsx)(xe,{placeholder:"Write a comment...",value:Me,onChange:e=>Je(e.target.value)}),(0,a.jsx)(he,{onClick:async()=>{if(Me.trim()&&Le){qe(!0);try{const e=await fetch("/api/comments",{method:"POST",headers:He,body:JSON.stringify({entity_type:"notice",entity_id:String(Le.id),content:Me})});if(e.ok){const t=await e.json();if(t.success){Ue(e=>[...e,t.data]),Je("");("received"===i?ve:we)(e=>e.map(e=>e.id===Le.id?{...e,commentCount:e.commentCount+1}:e))}}}catch(e){console.error("Error creating comment:",e)}finally{qe(!1)}}},disabled:!Me.trim()||We,children:We?"Sending...":"Send"})]})]})]})]})})]})}}}]);