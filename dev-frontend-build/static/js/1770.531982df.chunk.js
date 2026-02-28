"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ve});var i=r(9950),n=r(4752),o=r(1367),a=r(7455),s=r(4185),l=r(4414);const d=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=n.Ay.div`
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
`,p=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=n.Ay.div`
  display: flex;
  gap: 12px;
`,u=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,v=n.Ay.button`
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
`,j=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,w=n.Ay.input`
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
`,A=n.Ay.select`
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
`,F=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,k=n.Ay.div`
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
`,C=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,B=n.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,E=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,z=n.Ay.div`
  flex: 1;
`,S=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,$=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,_=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,R=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,D=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,N=n.Ay.div`
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
`,I=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,T=n.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,P=n.Ay.div`
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
`,L=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,O=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,M=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=n.Ay.button`
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
`,W=n.Ay.div`
  padding: 24px;
`,Y=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,J=n.Ay.div`
  margin-bottom: 20px;
`,K=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,X=n.Ay.input`
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
`,Z=n.Ay.select`
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
`,q=n.Ay.textarea`
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
`,G=n.Ay.label`
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
`,H=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,Q=n.Ay.label`
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
`,V=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,ee=n.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,te=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,re=n.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,ie=n.Ay.span`
  color: #0A2540;
`,ne=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 24px;
`,oe=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,ae=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,se=n.Ay.div`
  display: flex;
  gap: 12px;
`,le=n.Ay.div`
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
`,de=n.Ay.div`
  flex: 1;
`,ce=n.Ay.div`
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
`,pe=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,xe=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,he=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,ue=n.Ay.textarea`
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
`,ge=n.Ay.button`
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
`,fe=n.Ay.div`
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
`,me=n.Ay.button`
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
`,ye=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,be=n.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,ve=()=>{var e,t;const{user:r}=(0,o.As)(),[n,ve]=(0,i.useState)("received"),[je,we]=(0,i.useState)([]),[Ae,Fe]=(0,i.useState)([]),[ke,Ce]=(0,i.useState)(null),[Be,Ee]=(0,i.useState)(""),[ze,Se]=(0,i.useState)("all"),[$e,_e]=(0,i.useState)(!1),[Re,De]=(0,i.useState)(!1),[Ne,Ie]=(0,i.useState)({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),[Te,Pe]=(0,i.useState)(!1),[Le,Oe]=(0,i.useState)(!1),[Me,Ue]=(0,i.useState)(null),[We,Ye]=(0,i.useState)([]),[Je,Ke]=(0,i.useState)(""),[Xe,Ze]=(0,i.useState)(!1),[qe,Ge]=(0,i.useState)({}),[He,Qe]=(0,i.useState)([]),Ve=localStorage.getItem("auth_token"),et={Authorization:`Bearer ${Ve}`,"Content-Type":"application/json"},tt=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Ve}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ge(e=>({...e,...t}))}}}catch(t){}},rt=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Ve}`}});if(e.ok){const t=await e.json();t.success&&Ce(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Ve]),it=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Ve}`}});if(e.ok){const t=await e.json();t.success&&(we(t.data),tt(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Ve]),nt=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Ve}`}});if(e.ok){const t=await e.json();t.success&&(Fe(t.data),tt(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Ve]),ot=(0,i.useCallback)(async()=>{_e(!0),await Promise.all([rt(),it(),nt()]),_e(!1)},[rt,it,nt]);(0,i.useEffect)(()=>{if(r){ot();const e=setInterval(ot,3e4);return()=>clearInterval(e)}},[r,ot]);const at=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Ve}`}})).ok&&(Fe(t=>t.filter(t=>t.id!==e)),(null===Me||void 0===Me?void 0:Me.id)===e&&(Oe(!1),Ue(null)))}catch(t){console.error("Error deleting notice:",t)}},st=e=>new Date(e).toLocaleString("en-MY"),lt=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),i=Math.floor(t/36e5),n=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:i<24?`${i}h ago`:n<7?`${n}d ago`:st(e)},dt=("received"===n?je:Ae).filter(e=>{const t=e.title.toLowerCase().includes(Be.toLowerCase())||(e.author_name||"").toLowerCase().includes(Be.toLowerCase())||(e.content||"").toLowerCase().includes(Be.toLowerCase()),r="all"===ze||e.priority===ze;return t&&r}),ct=je.length,pt=je.filter(e=>!e.read_at).length,xt=Ae.length,ht=[...je,...Ae].filter(e=>"urgent"===e.priority).length;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(x,{children:"Notices"}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:ot,children:"Refresh"}),(0,l.jsx)(u,{variant:"primary",onClick:()=>De(!0),children:"New Notice"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(f,{borderColor:"#635BFF",children:[(0,l.jsx)(m,{children:ct}),(0,l.jsx)(y,{children:"Received"})]}),(0,l.jsxs)(f,{borderColor:"#F59E0B",children:[(0,l.jsx)(m,{children:pt}),(0,l.jsx)(y,{children:"Unread"})]}),(0,l.jsxs)(f,{borderColor:"#10B981",children:[(0,l.jsx)(m,{children:xt}),(0,l.jsx)(y,{children:"Sent"})]}),(0,l.jsxs)(f,{borderColor:"#EF4444",children:[(0,l.jsx)(m,{children:ht}),(0,l.jsx)(y,{children:"Urgent"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{active:"received"===n,onClick:()=>ve("received"),children:["Received (",ct,")"]}),(0,l.jsxs)(v,{active:"sent"===n,onClick:()=>ve("sent"),children:["Sent (",xt,")"]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{type:"text",placeholder:"Search notices...",value:Be,onChange:e=>Ee(e.target.value)}),(0,l.jsxs)(A,{value:ze,onChange:e=>Se(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(F,{children:[dt.map(e=>{var t,r;return(0,l.jsxs)(k,{unread:"received"===n&&!e.read_at,onClick:()=>(async e=>{fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Ve}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),Ge(t=>{const r={...t};return r[String(e.id)]&&(r[String(e.id)]={...r[String(e.id)],unread_count:0}),r});try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Ve}`}});if(t.ok){const r=await t.json();r.success&&(Ue(r.data),Ye(r.data.comments||[]),Oe(!0),"received"===n&&we(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,l.jsxs)(C,{children:[(0,l.jsxs)(B,{children:["received"===n&&!e.read_at&&(0,l.jsx)(E,{}),(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:e.title}),(0,l.jsxs)($,{children:["received"===n&&(0,l.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name]}),"received"===n&&e.author_role&&(0,l.jsx)("span",{children:e.author_role}),"sent"===n&&e.recipients&&(0,l.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,l.jsx)("span",{children:lt(e.createdAt)})]})]})]}),(0,l.jsx)(_,{children:(0,l.jsx)(R,{priority:e.priority,children:e.priority})})]}),(0,l.jsx)(D,{children:e.content}),(0,l.jsxs)(N,{children:[(0,l.jsx)("span",{children:st(e.createdAt)}),(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,l.jsxs)(I,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=qe[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[qe[String(e.id)].unread_count," new"]})]}),"sent"===n&&(0,l.jsx)(me,{onClick:t=>{t.stopPropagation(),at(e.id)},children:"Delete"})]})]})]},e.id)}),0===dt.length&&!$e&&(0,l.jsxs)(fe,{children:[(0,l.jsx)("h3",{children:"received"===n?"No received notices":"No sent notices"}),(0,l.jsx)("p",{children:"received"===n?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Re&&(0,l.jsx)(P,{onClick:()=>De(!1),children:(0,l.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(M,{children:"New Notice"}),(0,l.jsx)(U,{onClick:()=>De(!1),children:"\xd7"})]}),(0,l.jsxs)(W,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Title *"}),(0,l.jsx)(X,{type:"text",value:Ne.title,onChange:e=>Ie(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Content *"}),(0,l.jsx)(q,{value:Ne.content,onChange:e=>Ie(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Attachments"}),(0,l.jsx)(a.A,{files:He,onChange:Qe,maxFiles:5})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Priority"}),(0,l.jsxs)(Z,{value:Ne.priority,onChange:e=>Ie(t=>({...t,priority:e.target.value})),children:[(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Target Restaurants"}),(0,l.jsxs)(G,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Ne.allRestaurants,onChange:e=>Ie(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Ne.allRestaurants&&ke&&ke.restaurants.length>0&&(0,l.jsx)(H,{children:ke.restaurants.map(e=>(0,l.jsxs)(Q,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Ne.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void Ie(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Ne.allRestaurants&&Ne.selectedRestaurantIds.length>0&&(0,l.jsxs)(T,{style:{marginTop:"8px",display:"block"},children:[Ne.selectedRestaurantIds.length," restaurant",1!==Ne.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,l.jsxs)(Y,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,l.jsx)(u,{variant:"primary",onClick:async()=>{if(!Ne.title.trim()||!Ne.content.trim())return;const e=Ne.allRestaurants?((null===ke||void 0===ke?void 0:ke.restaurants)||[]).map(e=>e.id):Ne.selectedRestaurantIds;if(0!==e.length){Pe(!0);try{(await fetch("/api/notices",{method:"POST",headers:et,body:JSON.stringify({title:Ne.title,content:Ne.content,target_type:"restaurant",restaurant_ids:e,priority:Ne.priority,attachments:He.length>0?He:void 0})})).ok&&(Ie({title:"",content:"",priority:"normal",allRestaurants:!0,selectedRestaurantIds:[]}),Qe([]),De(!1),await nt(),ve("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Pe(!1)}}},disabled:Te||!Ne.title.trim()||!Ne.content.trim()||!Ne.allRestaurants&&0===Ne.selectedRestaurantIds.length,children:Te?"Sending...":"Send Notice"})]})]})}),Le&&Me&&(0,l.jsx)(P,{onClick:()=>{Oe(!1),Ue(null)},children:(0,l.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(M,{children:Me.title}),(0,l.jsx)(U,{onClick:()=>{Oe(!1),Ue(null)},children:"\xd7"})]}),(0,l.jsxs)(W,{children:[(0,l.jsxs)(ee,{children:[(0,l.jsxs)(te,{children:[(0,l.jsx)(re,{children:"From:"}),(0,l.jsx)(ie,{children:(null===(e=Me.author)||void 0===e?void 0:e.name)||Me.author_name})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(re,{children:"Role:"}),(0,l.jsx)(ie,{children:(null===(t=Me.author)||void 0===t?void 0:t.role)||Me.author_role})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(re,{children:"Date:"}),(0,l.jsx)(ie,{children:st(Me.createdAt)})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(re,{children:"Priority:"}),(0,l.jsx)(R,{priority:Me.priority,children:Me.priority})]})]}),Me.recipients&&Me.recipients.length>0&&(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Recipients"}),(0,l.jsx)(ye,{children:Me.recipients.map((e,t)=>{var r,i;return(0,l.jsx)(be,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(i=e.user)||void 0===i?void 0:i.name)||`Recipient #${t+1}`},t)})})]}),(0,l.jsx)(V,{children:Me.content}),(null===Me||void 0===Me?void 0:Me.attachments)&&Me.attachments.length>0&&(0,l.jsx)("div",{style:{marginTop:"16px"},children:(0,l.jsx)(s.A,{attachments:Me.attachments})}),Me.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,l.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,l.jsx)(u,{variant:"danger",onClick:()=>at(Me.id),children:"Delete Notice"})}),(0,l.jsxs)(ne,{children:[(0,l.jsxs)(oe,{children:["Comments (",We.length,")"]}),We.length>0&&(0,l.jsx)(ae,{children:We.map(e=>{var t,r,i,n;return(0,l.jsxs)(se,{children:[(0,l.jsx)(le,{children:(n=(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name,n.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,l.jsxs)(de,{children:[(0,l.jsxs)(ce,{children:[(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name,(0,l.jsx)("span",{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role})]}),(0,l.jsx)(pe,{children:e.content}),(0,l.jsx)(xe,{children:lt(e.createdAt)})]})]},e.id)})}),(0,l.jsxs)(he,{children:[(0,l.jsx)(ue,{placeholder:"Write a comment...",value:Je,onChange:e=>Ke(e.target.value)}),(0,l.jsx)(ge,{onClick:async()=>{if(Je.trim()&&Me){Ze(!0);try{const e=await fetch("/api/comments",{method:"POST",headers:et,body:JSON.stringify({entity_type:"notice",entity_id:String(Me.id),content:Je})});if(e.ok){const t=await e.json();if(t.success){Ye(e=>[...e,t.data]),Ke("");("received"===n?we:Fe)(e=>e.map(e=>e.id===Me.id?{...e,commentCount:e.commentCount+1}:e))}}}catch(e){console.error("Error creating comment:",e)}finally{Ze(!1)}}},disabled:!Je.trim()||Xe,children:Xe?"Sending...":"Send"})]})]})]})]})})]})}},4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
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
`,l=i.Ay.a`
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
`,d=i.Ay.span`
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
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>v});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
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
`,l=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,f=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,b=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const v=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:v=10,disabled:j=!1,compact:w=!1}=e;const[A,F]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),B=(0,i.useRef)(null),E=!j&&!k&&t.length<n,z=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[E&&(0,o.jsx)(s,{isDragging:A,disabled:!E,onClick:()=>{var e;return E&&(null===(e=B.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),E&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),E&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:w?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",v,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:B,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(f,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!j&&(0,o.jsx)(m,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);