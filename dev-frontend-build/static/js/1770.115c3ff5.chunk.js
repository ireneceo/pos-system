"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>oe});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(9061),p=r(8409),x=r(2597),h=r(2653),u=r(5030),g=r(9955),m=r(4414);const y=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,f=i.Ay.div`
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
`,b=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=i.Ay.div`
  display: flex;
  gap: 12px;
`,w=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        "}}}
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,A=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,k=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,C=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,E=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,B=i.Ay.input`
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
`,z=i.Ay.select`
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
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,R=i.Ay.div`
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
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,I=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,N=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,$=i.Ay.div`
  flex: 1;
`,D=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,T=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,L=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,G=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,O=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,M=i.Ay.div`
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
`,P=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6B7C93;
`,U=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,Y=i.Ay.div`
  margin-bottom: 20px;
`,W=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,J=i.Ay.input`
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
`,Z=i.Ay.select`
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
`,q=i.Ay.textarea`
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
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,te=i.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,re=i.Ay.span`
  color: #0A2540;
`,ne=i.Ay.button`
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
`,ie=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,ae=i.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,oe=()=>{var e,t;const{t:r}=(0,u.Bd)("owner"),{user:i}=(0,o.As)(),[oe,se]=(0,h.M)("received"),[le,de]=(0,n.useState)([]),[ce,pe]=(0,n.useState)([]),[xe,he]=(0,n.useState)(null),[ue,ge]=(0,n.useState)(""),[me,ye]=(0,n.useState)("all"),[fe,be]=(0,n.useState)("all"),[je,ve]=(0,n.useState)("all"),[we,Fe]=(0,n.useState)(!1),[Ae,ke]=(0,n.useState)(!1),[Ce,Ee]=(0,n.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[Be,ze]=(0,n.useState)(!1),[Se,Re]=(0,n.useState)(!1),[_e,Ie]=(0,n.useState)(null),[Ne,$e]=(0,n.useState)({}),[De,Te]=(0,n.useState)([]),Le=(0,g.c4)(),Ge={Authorization:`Bearer ${Le}`,"Content-Type":"application/json"},Oe=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Le}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),$e(e=>({...e,...t}))}}}catch(t){}},Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Le}`}});if(e.ok){const t=await e.json();t.success&&he(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Le]),Pe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Le}`}});if(e.ok){const t=await e.json();t.success&&(de(t.data),Oe(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Le]),Ue=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Le}`}});if(e.ok){const t=await e.json();t.success&&(pe(t.data),Oe(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Le]),Ye=(0,n.useCallback)(async()=>{Fe(!0),await Promise.all([Me(),Pe(),Ue()]),Fe(!1)},[Me,Pe,Ue]);(0,n.useEffect)(()=>{if(i){Ye();const e=setInterval(Ye,3e4);return()=>clearInterval(e)}},[i,Ye]);const We=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Le}`}})).ok&&(pe(t=>t.filter(t=>t.id!==e)),(null===_e||void 0===_e?void 0:_e.id)===e&&(Re(!1),Ie(null)))}catch(t){console.error("Error deleting notice:",t)}},Je=e=>new Date(e).toLocaleString("en-MY"),Ze=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:Je(e)},qe=("received"===oe?le:ce).filter(e=>{const t=e.title.toLowerCase().includes(ue.toLowerCase())||(e.author_name||"").toLowerCase().includes(ue.toLowerCase())||(e.content||"").toLowerCase().includes(ue.toLowerCase()),r="all"===me||e.priority===me,n="all"===fe||(e.category||"general")===fe,i="all"===je||"sent"===oe||e.author_role===je;return t&&r&&n&&i}),He=le.length,Ke=le.filter(e=>!e.read_at).length,Qe=ce.length,Ve=[...le,...ce].filter(e=>"urgent"===e.priority).length;return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(y,{children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(j,{children:"Notices"}),(0,m.jsx)(v,{children:(0,m.jsx)(w,{variant:"primary",onClick:()=>ke(!0),children:"New Notice"})})]}),(0,m.jsxs)(b,{children:[(0,m.jsxs)(F,{children:[(0,m.jsxs)(A,{borderColor:"#635BFF",children:[(0,m.jsx)(k,{children:He}),(0,m.jsx)(C,{children:"Received"})]}),(0,m.jsxs)(A,{borderColor:"#F59E0B",children:[(0,m.jsx)(k,{children:Ke}),(0,m.jsx)(C,{children:"Unread"})]}),(0,m.jsxs)(A,{borderColor:"#10B981",children:[(0,m.jsx)(k,{children:Qe}),(0,m.jsx)(C,{children:"Sent"})]}),(0,m.jsxs)(A,{borderColor:"#EF4444",children:[(0,m.jsx)(k,{children:Ve}),(0,m.jsx)(C,{children:"Urgent"})]})]}),(0,m.jsxs)(x.tU,{children:[(0,m.jsxs)(x.oz,{active:"received"===oe,onClick:()=>se("received"),children:["Received",(0,m.jsx)(x.Ex,{count:He,showZero:!0})]}),(0,m.jsxs)(x.oz,{active:"sent"===oe,onClick:()=>se("sent"),children:["Sent",(0,m.jsx)(x.Ex,{count:Qe,showZero:!0})]})]}),(0,m.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,m.jsx)("button",{onClick:()=>be(e),style:{padding:"6px 16px",borderRadius:"20px",border:fe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:fe===e?"#F0EFFF":"white",color:fe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:fe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,m.jsxs)(E,{children:[(0,m.jsx)(B,{type:"text",placeholder:"Search notices...",value:ue,onChange:e=>ge(e.target.value)}),"received"===oe&&(0,m.jsxs)(z,{value:je,onChange:e=>ve(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Senders"}),(0,m.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,m.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,m.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,m.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,m.jsxs)(z,{value:me,onChange:e=>ye(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Priority"}),(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,m.jsxs)(S,{children:[qe.map(e=>{var t,r;return(0,m.jsxs)(R,{unread:"received"===oe&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Le}`}});if(t.ok){const r=await t.json();r.success&&(Ie(r.data),Re(!0),"received"===oe&&de(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,m.jsxs)(_,{children:[(0,m.jsxs)(I,{children:["received"===oe&&!e.read_at&&(0,m.jsx)(N,{}),(0,m.jsxs)($,{children:[(0,m.jsx)(D,{children:e.title}),(0,m.jsxs)(T,{children:["received"===oe&&(0,m.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===oe&&e.author_role&&(0,m.jsx)("span",{children:e.author_role}),"sent"===oe&&e.recipients&&(0,m.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,m.jsx)("span",{children:Ze(e.createdAt)})]})]})]}),(0,m.jsxs)(L,{children:["guide"===e.category&&(0,m.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,m.jsx)(G,{priority:e.priority,children:e.priority})]})]}),(0,m.jsx)(O,{children:e.content}),(0,m.jsxs)(M,{children:[(0,m.jsx)("span",{children:Je(e.createdAt)}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,m.jsxs)(P,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Ne[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ne[String(e.id)].unread_count," new"]})]}),"sent"===oe&&(0,m.jsx)(ne,{onClick:t=>{t.stopPropagation(),We(e.id)},children:"Delete"})]})]})]},e.id)}),0===qe.length&&!we&&(0,m.jsxs)(a.pp,{children:[(0,m.jsx)("h3",{children:"received"===oe?"No received notices":"No sent notices"}),(0,m.jsx)("p",{children:"received"===oe?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),Ae&&(0,m.jsxs)(p.aF,{isOpen:!0,onClose:()=>ke(!1),title:"New Notice",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(w,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,m.jsx)(w,{variant:"primary",onClick:async()=>{if(!Ce.title.trim()||!Ce.content.trim())return;const e=Ce.allRestaurants?((null===xe||void 0===xe?void 0:xe.restaurants)||[]).map(e=>e.id):Ce.selectedRestaurantIds;if(0!==e.length){ze(!0);try{(await fetch("/api/notices",{method:"POST",headers:Ge,body:JSON.stringify({title:Ce.title,content:Ce.content,target_type:"restaurant",restaurant_ids:e,priority:Ce.priority,category:Ce.category,attachments:De.length>0?De:void 0})})).ok&&(Ee({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Te([]),ke(!1),await Ue(),se("sent"))}catch(t){console.error("Error sending notice:",t)}finally{ze(!1)}}},disabled:Be||!Ce.title.trim()||!Ce.content.trim()||!Ce.allRestaurants&&0===Ce.selectedRestaurantIds.length,children:Be?"Sending...":"Send Notice"})]}),children:[(0,m.jsxs)(Y,{children:[(0,m.jsx)(W,{children:"Title *"}),(0,m.jsx)(J,{type:"text",value:Ce.title,onChange:e=>Ee(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,m.jsxs)(Y,{children:[(0,m.jsx)(W,{children:"Content *"}),(0,m.jsx)(q,{value:Ce.content,onChange:e=>Ee(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,m.jsxs)(Y,{children:[(0,m.jsx)(W,{children:"Attachments"}),(0,m.jsx)(s.A,{files:De,onChange:Te,maxFiles:5})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,m.jsxs)(Y,{style:{flex:1},children:[(0,m.jsx)(W,{children:"Category"}),(0,m.jsxs)(Z,{value:Ce.category,onChange:e=>Ee(t=>({...t,category:e.target.value})),children:[(0,m.jsx)("option",{value:"general",children:"General"}),(0,m.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,m.jsxs)(Y,{style:{flex:1},children:[(0,m.jsx)(W,{children:"Priority"}),(0,m.jsxs)(Z,{value:Ce.priority,onChange:e=>Ee(t=>({...t,priority:e.target.value})),children:[(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,m.jsxs)(Y,{children:[(0,m.jsx)(W,{children:"Target Restaurants"}),(0,m.jsxs)(H,{children:[(0,m.jsx)("input",{type:"checkbox",checked:Ce.allRestaurants,onChange:e=>Ee(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!Ce.allRestaurants&&xe&&xe.restaurants.length>0&&(0,m.jsx)(K,{children:xe.restaurants.map(e=>(0,m.jsxs)(Q,{children:[(0,m.jsx)("input",{type:"checkbox",checked:Ce.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void Ee(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!Ce.allRestaurants&&Ce.selectedRestaurantIds.length>0&&(0,m.jsxs)(U,{style:{marginTop:"8px",display:"block"},children:[Ce.selectedRestaurantIds.length," restaurant",1!==Ce.selectedRestaurantIds.length?"s":""," selected"]})]})]}),Se&&_e&&(0,m.jsxs)(p.aF,{isOpen:!0,onClose:()=>{Re(!1),Ie(null)},title:_e.title,size:"large",footer:(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(w,{variant:"secondary",onClick:()=>{Re(!1),Ie(null)},children:"Close"})}),children:[(0,m.jsxs)(X,{children:[(0,m.jsxs)(ee,{children:[(0,m.jsx)(te,{children:"From:"}),(0,m.jsx)(re,{children:(null===(e=_e.author)||void 0===e?void 0:e.full_name)||_e.author_name})]}),(0,m.jsxs)(ee,{children:[(0,m.jsx)(te,{children:"Role:"}),(0,m.jsx)(re,{children:(null===(t=_e.author)||void 0===t?void 0:t.role)||_e.author_role})]}),(0,m.jsxs)(ee,{children:[(0,m.jsx)(te,{children:"Date:"}),(0,m.jsx)(re,{children:Je(_e.createdAt)})]}),(0,m.jsxs)(ee,{children:[(0,m.jsx)(te,{children:"Priority:"}),(0,m.jsx)(G,{priority:_e.priority,children:_e.priority})]})]}),_e.recipients&&_e.recipients.length>0&&(0,m.jsxs)(Y,{children:[(0,m.jsx)(W,{children:"Recipients"}),(0,m.jsx)(ie,{children:_e.recipients.map((e,t)=>{var r,n;return(0,m.jsx)(ae,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,m.jsx)(V,{children:_e.content.split("\n").map((e,t)=>(0,m.jsxs)(n.Fragment,{children:[t>0&&(0,m.jsx)("br",{}),(0,c.c)(e)]},t))}),(null===_e||void 0===_e?void 0:_e.attachments)&&_e.attachments.length>0&&(0,m.jsx)("div",{style:{marginTop:"16px"},children:(0,m.jsx)(l.A,{attachments:_e.attachments})}),_e.author_id===Number(null===i||void 0===i?void 0:i.id)&&(0,m.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,m.jsx)(w,{variant:"danger",onClick:()=>We(_e.id),children:"Delete Notice"})}),(0,m.jsx)(d.A,{entityType:"notice",entityId:String(_e.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>$e(e=>{const t={...e},r=String(_e.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}}}]);