"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ie});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(9061),p=r(8409),x=r(2597),h=r(2653),u=r(4414);const g=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=i.Ay.div`
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
`,f=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=i.Ay.h1`
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
`,v=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,F=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,C=i.Ay.input`
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
`,E=i.Ay.select`
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
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,z=i.Ay.div`
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
`,S=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,R=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,_=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,I=i.Ay.div`
  flex: 1;
`,N=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,$=i.Ay.div`
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
`,T=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,L=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,G=i.Ay.div`
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
`,O=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,M=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,U=i.Ay.div`
  margin-bottom: 20px;
`,P=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Y=i.Ay.input`
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
`,W=i.Ay.select`
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
`,Z=i.Ay.textarea`
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
`,J=i.Ay.label`
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
`,q=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,H=i.Ay.label`
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
`,K=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,Q=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,V=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,X=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,ee=i.Ay.span`
  color: #0A2540;
`,te=i.Ay.button`
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
`,re=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,ne=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,ie=()=>{var e,t;const{user:r}=(0,o.As)(),[i,ie]=(0,h.M)("received"),[ae,oe]=(0,n.useState)([]),[se,le]=(0,n.useState)([]),[de,ce]=(0,n.useState)(null),[pe,xe]=(0,n.useState)(""),[he,ue]=(0,n.useState)("all"),[ge,me]=(0,n.useState)("all"),[fe,be]=(0,n.useState)("all"),[ye,ve]=(0,n.useState)(!1),[je,we]=(0,n.useState)(!1),[Fe,Ae]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[ke,Ce]=(0,n.useState)(!1),[Ee,Be]=(0,n.useState)(!1),[ze,Se]=(0,n.useState)(null),[Re,_e]=(0,n.useState)({}),[Ie,Ne]=(0,n.useState)([]),$e=localStorage.getItem("auth_token"),De={Authorization:`Bearer ${$e}`,"Content-Type":"application/json"},Te=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${$e}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),_e(e=>({...e,...t}))}}}catch(t){}},Le=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${$e}`}});if(e.ok){const t=await e.json();t.success&&ce(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[$e]),Ge=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${$e}`}});if(e.ok){const t=await e.json();t.success&&(oe(t.data),Te(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[$e]),Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${$e}`}});if(e.ok){const t=await e.json();t.success&&(le(t.data),Te(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[$e]),Me=(0,n.useCallback)(async()=>{ve(!0),await Promise.all([Le(),Ge(),Oe()]),ve(!1)},[Le,Ge,Oe]);(0,n.useEffect)(()=>{if(r){Me();const e=setInterval(Me,3e4);return()=>clearInterval(e)}},[r,Me]);const Ue=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${$e}`}})).ok&&(le(t=>t.filter(t=>t.id!==e)),(null===ze||void 0===ze?void 0:ze.id)===e&&(Be(!1),Se(null)))}catch(t){console.error("Error deleting notice:",t)}},Pe=e=>new Date(e).toLocaleString("en-MY"),Ye=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:Pe(e)},We=("received"===i?ae:se).filter(e=>{const t=e.title.toLowerCase().includes(pe.toLowerCase())||(e.author_name||"").toLowerCase().includes(pe.toLowerCase())||(e.content||"").toLowerCase().includes(pe.toLowerCase()),r="all"===he||e.priority===he,n="all"===ge||(e.category||"general")===ge,a="all"===fe||"sent"===i||e.author_role===fe;return t&&r&&n&&a}),Ze=ae.length,Je=ae.filter(e=>!e.read_at).length,qe=se.length,He=[...ae,...se].filter(e=>"urgent"===e.priority).length;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)(m,{children:[(0,u.jsx)(b,{children:"Notices"}),(0,u.jsx)(y,{children:(0,u.jsx)(v,{variant:"primary",onClick:()=>we(!0),children:"New Notice"})})]}),(0,u.jsxs)(f,{children:[(0,u.jsxs)(j,{children:[(0,u.jsxs)(w,{borderColor:"#635BFF",children:[(0,u.jsx)(F,{children:Ze}),(0,u.jsx)(A,{children:"Received"})]}),(0,u.jsxs)(w,{borderColor:"#F59E0B",children:[(0,u.jsx)(F,{children:Je}),(0,u.jsx)(A,{children:"Unread"})]}),(0,u.jsxs)(w,{borderColor:"#10B981",children:[(0,u.jsx)(F,{children:qe}),(0,u.jsx)(A,{children:"Sent"})]}),(0,u.jsxs)(w,{borderColor:"#EF4444",children:[(0,u.jsx)(F,{children:He}),(0,u.jsx)(A,{children:"Urgent"})]})]}),(0,u.jsxs)(x.tU,{children:[(0,u.jsxs)(x.oz,{active:"received"===i,onClick:()=>ie("received"),children:["Received",(0,u.jsx)(x.Ex,{count:Ze,showZero:!0})]}),(0,u.jsxs)(x.oz,{active:"sent"===i,onClick:()=>ie("sent"),children:["Sent",(0,u.jsx)(x.Ex,{count:qe,showZero:!0})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>me(e),style:{padding:"6px 16px",borderRadius:"20px",border:ge===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ge===e?"#F0EFFF":"white",color:ge===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ge===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(k,{children:[(0,u.jsx)(C,{type:"text",placeholder:"Search notices...",value:pe,onChange:e=>xe(e.target.value)}),"received"===i&&(0,u.jsxs)(E,{value:fe,onChange:e=>be(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(E,{value:he,onChange:e=>ue(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priority"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(B,{children:[We.map(e=>{var t,r;return(0,u.jsxs)(z,{unread:"received"===i&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${$e}`}});if(t.ok){const r=await t.json();r.success&&(Se(r.data),Be(!0),"received"===i&&oe(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,u.jsxs)(S,{children:[(0,u.jsxs)(R,{children:["received"===i&&!e.read_at&&(0,u.jsx)(_,{}),(0,u.jsxs)(I,{children:[(0,u.jsx)(N,{children:e.title}),(0,u.jsxs)($,{children:["received"===i&&(0,u.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===i&&e.author_role&&(0,u.jsx)("span",{children:e.author_role}),"sent"===i&&e.recipients&&(0,u.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,u.jsx)("span",{children:Ye(e.createdAt)})]})]})]}),(0,u.jsxs)(D,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(L,{children:e.content}),(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:Pe(e.createdAt)}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,u.jsxs)(O,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Re[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Re[String(e.id)].unread_count," new"]})]}),"sent"===i&&(0,u.jsx)(te,{onClick:t=>{t.stopPropagation(),Ue(e.id)},children:"Delete"})]})]})]},e.id)}),0===We.length&&!ye&&(0,u.jsxs)(a.pp,{children:[(0,u.jsx)("h3",{children:"received"===i?"No received notices":"No sent notices"}),(0,u.jsx)("p",{children:"received"===i?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),je&&(0,u.jsxs)(p.aF,{isOpen:!0,onClose:()=>we(!1),title:"New Notice",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(v,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,u.jsx)(v,{variant:"primary",onClick:async()=>{if(!Fe.title.trim()||!Fe.content.trim())return;const e=Fe.allRestaurants?((null===de||void 0===de?void 0:de.restaurants)||[]).map(e=>e.id):Fe.selectedRestaurantIds;if(0!==e.length){Ce(!0);try{(await fetch("/api/notices",{method:"POST",headers:De,body:JSON.stringify({title:Fe.title,content:Fe.content,target_type:"restaurant",restaurant_ids:e,priority:Fe.priority,category:Fe.category,attachments:Ie.length>0?Ie:void 0})})).ok&&(Ae({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Ne([]),we(!1),await Oe(),ie("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Ce(!1)}}},disabled:ke||!Fe.title.trim()||!Fe.content.trim()||!Fe.allRestaurants&&0===Fe.selectedRestaurantIds.length,children:ke?"Sending...":"Send Notice"})]}),children:[(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Title *"}),(0,u.jsx)(Y,{type:"text",value:Fe.title,onChange:e=>Ae(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Content *"}),(0,u.jsx)(Z,{value:Fe.content,onChange:e=>Ae(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Attachments"}),(0,u.jsx)(s.A,{files:Ie,onChange:Ne,maxFiles:5})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,u.jsxs)(U,{style:{flex:1},children:[(0,u.jsx)(P,{children:"Category"}),(0,u.jsxs)(W,{value:Fe.category,onChange:e=>Ae(t=>({...t,category:e.target.value})),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,u.jsxs)(U,{style:{flex:1},children:[(0,u.jsx)(P,{children:"Priority"}),(0,u.jsxs)(W,{value:Fe.priority,onChange:e=>Ae(t=>({...t,priority:e.target.value})),children:[(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Target Restaurants"}),(0,u.jsxs)(J,{children:[(0,u.jsx)("input",{type:"checkbox",checked:Fe.allRestaurants,onChange:e=>Ae(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Fe.allRestaurants&&de&&de.restaurants.length>0&&(0,u.jsx)(q,{children:de.restaurants.map(e=>(0,u.jsxs)(H,{children:[(0,u.jsx)("input",{type:"checkbox",checked:Fe.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void Ae(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Fe.allRestaurants&&Fe.selectedRestaurantIds.length>0&&(0,u.jsxs)(M,{style:{marginTop:"8px",display:"block"},children:[Fe.selectedRestaurantIds.length," restaurant",1!==Fe.selectedRestaurantIds.length?"s":""," selected"]})]})]}),Ee&&ze&&(0,u.jsxs)(p.aF,{isOpen:!0,onClose:()=>{Be(!1),Se(null)},title:ze.title,size:"large",children:[(0,u.jsxs)(Q,{children:[(0,u.jsxs)(V,{children:[(0,u.jsx)(X,{children:"From:"}),(0,u.jsx)(ee,{children:(null===(e=ze.author)||void 0===e?void 0:e.full_name)||ze.author_name})]}),(0,u.jsxs)(V,{children:[(0,u.jsx)(X,{children:"Role:"}),(0,u.jsx)(ee,{children:(null===(t=ze.author)||void 0===t?void 0:t.role)||ze.author_role})]}),(0,u.jsxs)(V,{children:[(0,u.jsx)(X,{children:"Date:"}),(0,u.jsx)(ee,{children:Pe(ze.createdAt)})]}),(0,u.jsxs)(V,{children:[(0,u.jsx)(X,{children:"Priority:"}),(0,u.jsx)(T,{priority:ze.priority,children:ze.priority})]})]}),ze.recipients&&ze.recipients.length>0&&(0,u.jsxs)(U,{children:[(0,u.jsx)(P,{children:"Recipients"}),(0,u.jsx)(re,{children:ze.recipients.map((e,t)=>{var r,n;return(0,u.jsx)(ne,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,u.jsx)(K,{children:ze.content.split("\n").map((e,t)=>(0,u.jsxs)(n.Fragment,{children:[t>0&&(0,u.jsx)("br",{}),(0,c.c)(e)]},t))}),(null===ze||void 0===ze?void 0:ze.attachments)&&ze.attachments.length>0&&(0,u.jsx)("div",{style:{marginTop:"16px"},children:(0,u.jsx)(l.A,{attachments:ze.attachments})}),ze.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,u.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,u.jsx)(v,{variant:"danger",onClick:()=>Ue(ze.id),children:"Delete Notice"})}),(0,u.jsx)(d.A,{entityType:"notice",entityId:String(ze.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>_e(e=>{const t={...e},r=String(ze.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,o=n.Ay.button`
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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(o,{active:t,onClick:r,className:a,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}}}]);