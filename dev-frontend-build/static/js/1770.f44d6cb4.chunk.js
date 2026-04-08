"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ae});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(9061),p=r(8409),x=r(2597),h=r(2653),u=r(5030),g=r(4414);const m=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,y=i.Ay.div`
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
`,j=i.Ay.div`
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
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,F=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,A=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,k=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,E=i.Ay.input`
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
`,B=i.Ay.select`
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
`,z=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,S=i.Ay.div`
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
`,R=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,_=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,I=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,N=i.Ay.div`
  flex: 1;
`,$=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,D=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,T=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,L=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,G=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,O=i.Ay.div`
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
`,M=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,P=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,U=i.Ay.div`
  margin-bottom: 20px;
`,Y=i.Ay.label`
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
`,J=i.Ay.select`
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
`,q=i.Ay.label`
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
`,H=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,K=i.Ay.label`
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
`,Q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,V=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,X=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,ee=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,te=i.Ay.span`
  color: #0A2540;
`,re=i.Ay.button`
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
`,ne=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,ie=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,ae=()=>{var e,t;const{t:r}=(0,u.Bd)("owner"),{user:i}=(0,o.As)(),[ae,oe]=(0,h.M)("received"),[se,le]=(0,n.useState)([]),[de,ce]=(0,n.useState)([]),[pe,xe]=(0,n.useState)(null),[he,ue]=(0,n.useState)(""),[ge,me]=(0,n.useState)("all"),[ye,fe]=(0,n.useState)("all"),[be,je]=(0,n.useState)("all"),[ve,we]=(0,n.useState)(!1),[Fe,Ae]=(0,n.useState)(!1),[ke,Ce]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[Ee,Be]=(0,n.useState)(!1),[ze,Se]=(0,n.useState)(!1),[Re,_e]=(0,n.useState)(null),[Ie,Ne]=(0,n.useState)({}),[$e,De]=(0,n.useState)([]),Te=localStorage.getItem("auth_token"),Le={Authorization:`Bearer ${Te}`,"Content-Type":"application/json"},Ge=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Te}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ne(e=>({...e,...t}))}}}catch(t){}},Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Te}`}});if(e.ok){const t=await e.json();t.success&&xe(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Te]),Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Te}`}});if(e.ok){const t=await e.json();t.success&&(le(t.data),Ge(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Te]),Pe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Te}`}});if(e.ok){const t=await e.json();t.success&&(ce(t.data),Ge(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Te]),Ue=(0,n.useCallback)(async()=>{we(!0),await Promise.all([Oe(),Me(),Pe()]),we(!1)},[Oe,Me,Pe]);(0,n.useEffect)(()=>{if(i){Ue();const e=setInterval(Ue,3e4);return()=>clearInterval(e)}},[i,Ue]);const Ye=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Te}`}})).ok&&(ce(t=>t.filter(t=>t.id!==e)),(null===Re||void 0===Re?void 0:Re.id)===e&&(Se(!1),_e(null)))}catch(t){console.error("Error deleting notice:",t)}},We=e=>new Date(e).toLocaleString("en-MY"),Je=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:We(e)},Ze=("received"===ae?se:de).filter(e=>{const t=e.title.toLowerCase().includes(he.toLowerCase())||(e.author_name||"").toLowerCase().includes(he.toLowerCase())||(e.content||"").toLowerCase().includes(he.toLowerCase()),r="all"===ge||e.priority===ge,n="all"===ye||(e.category||"general")===ye,i="all"===be||"sent"===ae||e.author_role===be;return t&&r&&n&&i}),qe=se.length,He=se.filter(e=>!e.read_at).length,Ke=de.length,Qe=[...se,...de].filter(e=>"urgent"===e.priority).length;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(b,{children:"Notices"}),(0,g.jsx)(j,{children:(0,g.jsx)(v,{variant:"primary",onClick:()=>Ae(!0),children:"New Notice"})})]}),(0,g.jsxs)(f,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{borderColor:"#635BFF",children:[(0,g.jsx)(A,{children:qe}),(0,g.jsx)(k,{children:"Received"})]}),(0,g.jsxs)(F,{borderColor:"#F59E0B",children:[(0,g.jsx)(A,{children:He}),(0,g.jsx)(k,{children:"Unread"})]}),(0,g.jsxs)(F,{borderColor:"#10B981",children:[(0,g.jsx)(A,{children:Ke}),(0,g.jsx)(k,{children:"Sent"})]}),(0,g.jsxs)(F,{borderColor:"#EF4444",children:[(0,g.jsx)(A,{children:Qe}),(0,g.jsx)(k,{children:"Urgent"})]})]}),(0,g.jsxs)(x.tU,{children:[(0,g.jsxs)(x.oz,{active:"received"===ae,onClick:()=>oe("received"),children:["Received",(0,g.jsx)(x.Ex,{count:qe,showZero:!0})]}),(0,g.jsxs)(x.oz,{active:"sent"===ae,onClick:()=>oe("sent"),children:["Sent",(0,g.jsx)(x.Ex,{count:Ke,showZero:!0})]})]}),(0,g.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,g.jsx)("button",{onClick:()=>fe(e),style:{padding:"6px 16px",borderRadius:"20px",border:ye===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ye===e?"#F0EFFF":"white",color:ye===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ye===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,g.jsxs)(C,{children:[(0,g.jsx)(E,{type:"text",placeholder:"Search notices...",value:he,onChange:e=>ue(e.target.value)}),"received"===ae&&(0,g.jsxs)(B,{value:be,onChange:e=>je(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Senders"}),(0,g.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,g.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,g.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,g.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,g.jsxs)(B,{value:ge,onChange:e=>me(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Priority"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,g.jsxs)(z,{children:[Ze.map(e=>{var t,r;return(0,g.jsxs)(S,{unread:"received"===ae&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Te}`}});if(t.ok){const r=await t.json();r.success&&(_e(r.data),Se(!0),"received"===ae&&le(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,g.jsxs)(R,{children:[(0,g.jsxs)(_,{children:["received"===ae&&!e.read_at&&(0,g.jsx)(I,{}),(0,g.jsxs)(N,{children:[(0,g.jsx)($,{children:e.title}),(0,g.jsxs)(D,{children:["received"===ae&&(0,g.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===ae&&e.author_role&&(0,g.jsx)("span",{children:e.author_role}),"sent"===ae&&e.recipients&&(0,g.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,g.jsx)("span",{children:Je(e.createdAt)})]})]})]}),(0,g.jsxs)(T,{children:["guide"===e.category&&(0,g.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,g.jsx)(L,{priority:e.priority,children:e.priority})]})]}),(0,g.jsx)(G,{children:e.content}),(0,g.jsxs)(O,{children:[(0,g.jsx)("span",{children:We(e.createdAt)}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,g.jsxs)(M,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Ie[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ie[String(e.id)].unread_count," new"]})]}),"sent"===ae&&(0,g.jsx)(re,{onClick:t=>{t.stopPropagation(),Ye(e.id)},children:"Delete"})]})]})]},e.id)}),0===Ze.length&&!ve&&(0,g.jsxs)(a.pp,{children:[(0,g.jsx)("h3",{children:"received"===ae?"No received notices":"No sent notices"}),(0,g.jsx)("p",{children:"received"===ae?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Fe&&(0,g.jsxs)(p.aF,{isOpen:!0,onClose:()=>Ae(!1),title:"New Notice",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,g.jsx)(v,{variant:"primary",onClick:async()=>{if(!ke.title.trim()||!ke.content.trim())return;const e=ke.allRestaurants?((null===pe||void 0===pe?void 0:pe.restaurants)||[]).map(e=>e.id):ke.selectedRestaurantIds;if(0!==e.length){Be(!0);try{(await fetch("/api/notices",{method:"POST",headers:Le,body:JSON.stringify({title:ke.title,content:ke.content,target_type:"restaurant",restaurant_ids:e,priority:ke.priority,category:ke.category,attachments:$e.length>0?$e:void 0})})).ok&&(Ce({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),De([]),Ae(!1),await Pe(),oe("sent"))}catch(t){console.error("Error sending notice:",t)}finally{Be(!1)}}},disabled:Ee||!ke.title.trim()||!ke.content.trim()||!ke.allRestaurants&&0===ke.selectedRestaurantIds.length,children:Ee?"Sending...":"Send Notice"})]}),children:[(0,g.jsxs)(U,{children:[(0,g.jsx)(Y,{children:"Title *"}),(0,g.jsx)(W,{type:"text",value:ke.title,onChange:e=>Ce(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(Y,{children:"Content *"}),(0,g.jsx)(Z,{value:ke.content,onChange:e=>Ce(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(Y,{children:"Attachments"}),(0,g.jsx)(s.A,{files:$e,onChange:De,maxFiles:5})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,g.jsxs)(U,{style:{flex:1},children:[(0,g.jsx)(Y,{children:"Category"}),(0,g.jsxs)(J,{value:ke.category,onChange:e=>Ce(t=>({...t,category:e.target.value})),children:[(0,g.jsx)("option",{value:"general",children:"General"}),(0,g.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,g.jsxs)(U,{style:{flex:1},children:[(0,g.jsx)(Y,{children:"Priority"}),(0,g.jsxs)(J,{value:ke.priority,onChange:e=>Ce(t=>({...t,priority:e.target.value})),children:[(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(Y,{children:"Target Restaurants"}),(0,g.jsxs)(q,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ke.allRestaurants,onChange:e=>Ce(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!ke.allRestaurants&&pe&&pe.restaurants.length>0&&(0,g.jsx)(H,{children:pe.restaurants.map(e=>(0,g.jsxs)(K,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ke.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void Ce(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!ke.allRestaurants&&ke.selectedRestaurantIds.length>0&&(0,g.jsxs)(P,{style:{marginTop:"8px",display:"block"},children:[ke.selectedRestaurantIds.length," restaurant",1!==ke.selectedRestaurantIds.length?"s":""," selected"]})]})]}),ze&&Re&&(0,g.jsxs)(p.aF,{isOpen:!0,onClose:()=>{Se(!1),_e(null)},title:Re.title,size:"large",footer:(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(v,{variant:"secondary",onClick:()=>{Se(!1),_e(null)},children:"Close"})}),children:[(0,g.jsxs)(V,{children:[(0,g.jsxs)(X,{children:[(0,g.jsx)(ee,{children:"From:"}),(0,g.jsx)(te,{children:(null===(e=Re.author)||void 0===e?void 0:e.full_name)||Re.author_name})]}),(0,g.jsxs)(X,{children:[(0,g.jsx)(ee,{children:"Role:"}),(0,g.jsx)(te,{children:(null===(t=Re.author)||void 0===t?void 0:t.role)||Re.author_role})]}),(0,g.jsxs)(X,{children:[(0,g.jsx)(ee,{children:"Date:"}),(0,g.jsx)(te,{children:We(Re.createdAt)})]}),(0,g.jsxs)(X,{children:[(0,g.jsx)(ee,{children:"Priority:"}),(0,g.jsx)(L,{priority:Re.priority,children:Re.priority})]})]}),Re.recipients&&Re.recipients.length>0&&(0,g.jsxs)(U,{children:[(0,g.jsx)(Y,{children:"Recipients"}),(0,g.jsx)(ne,{children:Re.recipients.map((e,t)=>{var r,n;return(0,g.jsx)(ie,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,g.jsx)(Q,{children:Re.content.split("\n").map((e,t)=>(0,g.jsxs)(n.Fragment,{children:[t>0&&(0,g.jsx)("br",{}),(0,c.c)(e)]},t))}),(null===Re||void 0===Re?void 0:Re.attachments)&&Re.attachments.length>0&&(0,g.jsx)("div",{style:{marginTop:"16px"},children:(0,g.jsx)(l.A,{attachments:Re.attachments})}),Re.author_id===Number(null===i||void 0===i?void 0:i.id)&&(0,g.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,g.jsx)(v,{variant:"danger",onClick:()=>Ye(Re.id),children:"Delete Notice"})}),(0,g.jsx)(d.A,{entityType:"notice",entityId:String(Re.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>Ne(e=>{const t={...e},r=String(Re.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}}}]);