"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1770],{1770:(e,t,r)=>{r.r(t),r.d(t,{default:()=>V});var n=r(8819),i=r(9950),o=r(4752),a=r(1367),s=r(7455),l=r(4185),d=r(4302),c=r(2674),p=r(4414);const x=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=o.Ay.div`
  display: flex;
  gap: 12px;
`,y=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          &:disabled {\n            background: #9CA3AF;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n          }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover {\n            background: #FECACA;\n            transform: translateY(-1px);\n          }\n        ";default:return`\n          background: white;\n          color: #6B7280;\n          border: 1px solid ${n.w.colors.border};\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        `}}}
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,j=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,v=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,A=o.Ay.button`
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
`,k=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`,F=o.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,C=o.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
  }
`,E=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,B=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  ${e=>e.unread&&`\n    border-left: 4px solid ${n.w.colors.primary};\n  `}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,R=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,S=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,z=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,$=o.Ay.div`
  flex: 1;
`,_=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,I=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,N=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,D=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,L=o.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,T=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  flex-wrap: wrap;
  gap: 8px;
`,G=o.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${n.w.colors.text.secondary};
`,P=o.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,O=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  cursor: pointer;
  margin-bottom: 12px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
    cursor: pointer;
  }
`,Y=o.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,M=o.Ay.label`
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
`,U=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  margin-bottom: 24px;
`,J=o.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7C93;
`,W=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,Q=o.Ay.span`
  font-weight: 600;
  color: #6B7C93;
`,H=o.Ay.span`
  color: #0A2540;
`,X=o.Ay.div`
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
`,Z=o.Ay.button`
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
`,q=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,K=o.Ay.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`,V=()=>{var e,t;const{user:r}=(0,a.As)(),[n,o]=(0,i.useState)("received"),[V,ee]=(0,i.useState)([]),[te,re]=(0,i.useState)([]),[ne,ie]=(0,i.useState)(null),[oe,ae]=(0,i.useState)(""),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)("all"),[he,ue]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(!1),[ye,fe]=(0,i.useState)({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),[je,ve]=(0,i.useState)(!1),[be,we]=(0,i.useState)(!1),[Ae,ke]=(0,i.useState)(null),[Fe,Ce]=(0,i.useState)({}),[Ee,Be]=(0,i.useState)([]),Re=localStorage.getItem("auth_token"),Se={Authorization:`Bearer ${Re}`,"Content-Type":"application/json"},ze=async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${Re}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ce(e=>({...e,...t}))}}}catch(t){}},$e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:{Authorization:`Bearer ${Re}`}});if(e.ok){const t=await e.json();t.success&&ie(t.data)}}catch(e){console.error("Error fetching notice metadata:",e)}},[Re]),_e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${Re}`}});if(e.ok){const t=await e.json();t.success&&(ee(t.data),ze(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[Re]),Ie=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:{Authorization:`Bearer ${Re}`}});if(e.ok){const t=await e.json();t.success&&(re(t.data),ze(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[Re]),Ne=(0,i.useCallback)(async()=>{ue(!0),await Promise.all([$e(),_e(),Ie()]),ue(!1)},[$e,_e,Ie]);(0,i.useEffect)(()=>{if(r){Ne();const e=setInterval(Ne,3e4);return()=>clearInterval(e)}},[r,Ne]);const De=async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${Re}`}})).ok&&(re(t=>t.filter(t=>t.id!==e)),(null===Ae||void 0===Ae?void 0:Ae.id)===e&&(we(!1),ke(null)))}catch(t){console.error("Error deleting notice:",t)}},Le=e=>new Date(e).toLocaleString("en-MY"),Te=e=>{const t=(new Date).getTime()-new Date(e).getTime(),r=Math.floor(t/6e4),n=Math.floor(t/36e5),i=Math.floor(t/864e5);return r<1?"Just now":r<60?`${r}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:Le(e)},Ge=("received"===n?V:te).filter(e=>{const t=e.title.toLowerCase().includes(oe.toLowerCase())||(e.author_name||"").toLowerCase().includes(oe.toLowerCase())||(e.content||"").toLowerCase().includes(oe.toLowerCase()),r="all"===se||e.priority===se,i="all"===de||(e.category||"general")===de,o="all"===pe||"sent"===n||e.author_role===pe;return t&&r&&i&&o}),Pe=V.length,Oe=V.filter(e=>!e.read_at).length,Ye=te.length,Me=[...V,...te].filter(e=>"urgent"===e.priority).length;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"Notices"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:Ne,children:"Refresh"}),(0,p.jsx)(y,{variant:"primary",onClick:()=>me(!0),children:"New Notice"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{borderColor:"#635BFF",children:[(0,p.jsx)(v,{children:Pe}),(0,p.jsx)(b,{children:"Received"})]}),(0,p.jsxs)(j,{borderColor:"#F59E0B",children:[(0,p.jsx)(v,{children:Oe}),(0,p.jsx)(b,{children:"Unread"})]}),(0,p.jsxs)(j,{borderColor:"#10B981",children:[(0,p.jsx)(v,{children:Ye}),(0,p.jsx)(b,{children:"Sent"})]}),(0,p.jsxs)(j,{borderColor:"#EF4444",children:[(0,p.jsx)(v,{children:Me}),(0,p.jsx)(b,{children:"Urgent"})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{active:"received"===n,onClick:()=>o("received"),children:["Received (",Pe,")"]}),(0,p.jsxs)(A,{active:"sent"===n,onClick:()=>o("sent"),children:["Sent (",Ye,")"]})]}),(0,p.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,p.jsx)("button",{onClick:()=>ce(e),style:{padding:"6px 16px",borderRadius:"20px",border:de===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:de===e?"#F0EFFF":"white",color:de===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:de===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{type:"text",placeholder:"Search notices...",value:oe,onChange:e=>ae(e.target.value)}),"received"===n&&(0,p.jsxs)(C,{value:pe,onChange:e=>xe(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Senders"}),(0,p.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,p.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,p.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,p.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,p.jsxs)(C,{value:se,onChange:e=>le(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(E,{children:[Ge.map(e=>{var t,r;return(0,p.jsxs)(B,{unread:"received"===n&&!e.read_at,onClick:()=>(async e=>{try{const t=await fetch(`/api/notices/${e.id}`,{headers:{Authorization:`Bearer ${Re}`}});if(t.ok){const r=await t.json();r.success&&(ke(r.data),we(!0),"received"===n&&ee(t=>t.map(t=>t.id===e.id?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,p.jsxs)(R,{children:[(0,p.jsxs)(S,{children:["received"===n&&!e.read_at&&(0,p.jsx)(z,{}),(0,p.jsxs)($,{children:[(0,p.jsx)(_,{children:e.title}),(0,p.jsxs)(I,{children:["received"===n&&(0,p.jsxs)("span",{children:["From: ",(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name]}),"received"===n&&e.author_role&&(0,p.jsx)("span",{children:e.author_role}),"sent"===n&&e.recipients&&(0,p.jsxs)("span",{children:["To: ",e.recipients.length," recipient",1!==e.recipients.length?"s":""]}),(0,p.jsx)("span",{children:Te(e.createdAt)})]})]})]}),(0,p.jsxs)(N,{children:["guide"===e.category&&(0,p.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,p.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(L,{children:e.content}),(0,p.jsxs)(T,{children:[(0,p.jsx)("span",{children:Le(e.createdAt)}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.commentCount>0&&(0,p.jsxs)(G,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Fe[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Fe[String(e.id)].unread_count," new"]})]}),"sent"===n&&(0,p.jsx)(Z,{onClick:t=>{t.stopPropagation(),De(e.id)},children:"Delete"})]})]})]},e.id)}),0===Ge.length&&!he&&(0,p.jsxs)(X,{children:[(0,p.jsx)("h3",{children:"received"===n?"No received notices":"No sent notices"}),(0,p.jsx)("p",{children:"received"===n?"You have no notices at this time. New notices will appear here.":'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'})]})]})]})]}),ge&&(0,p.jsx)(c.mH,{onClick:()=>me(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"New Notice"}),(0,p.jsx)(c.Jn,{onClick:()=>me(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Title *"}),(0,p.jsx)(c.ZQ,{type:"text",value:ye.title,onChange:e=>fe(t=>({...t,title:e.target.value})),placeholder:"Notice title"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Content *"}),(0,p.jsx)(c.Lz,{value:ye.content,onChange:e=>fe(t=>({...t,content:e.target.value})),placeholder:"Write your notice content here..."})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Attachments"}),(0,p.jsx)(s.A,{files:Ee,onChange:Be,maxFiles:5})]}),(0,p.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,p.jsxs)(c.gE,{style:{flex:1},children:[(0,p.jsx)(c.lR,{children:"Category"}),(0,p.jsxs)(c.FX,{value:ye.category,onChange:e=>fe(t=>({...t,category:e.target.value})),children:[(0,p.jsx)("option",{value:"general",children:"General"}),(0,p.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,p.jsxs)(c.gE,{style:{flex:1},children:[(0,p.jsx)(c.lR,{children:"Priority"}),(0,p.jsxs)(c.FX,{value:ye.priority,onChange:e=>fe(t=>({...t,priority:e.target.value})),children:[(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Target Restaurants"}),(0,p.jsxs)(O,{children:[(0,p.jsx)("input",{type:"checkbox",checked:ye.allRestaurants,onChange:e=>fe(t=>({...t,allRestaurants:e.target.checked,selectedRestaurantIds:e.target.checked?[]:t.selectedRestaurantIds}))}),"All Owned Restaurants"]}),!ye.allRestaurants&&ne&&ne.restaurants.length>0&&(0,p.jsx)(Y,{children:ne.restaurants.map(e=>(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",checked:ye.selectedRestaurantIds.includes(e.id),onChange:()=>{return t=e.id,void fe(e=>{const r=e.selectedRestaurantIds.includes(t)?e.selectedRestaurantIds.filter(e=>e!==t):[...e.selectedRestaurantIds,t];return{...e,selectedRestaurantIds:r}});var t}}),e.name]},e.id))}),!ye.allRestaurants&&ye.selectedRestaurantIds.length>0&&(0,p.jsxs)(P,{style:{marginTop:"8px",display:"block"},children:[ye.selectedRestaurantIds.length," restaurant",1!==ye.selectedRestaurantIds.length?"s":""," selected"]})]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,p.jsx)(y,{variant:"primary",onClick:async()=>{if(!ye.title.trim()||!ye.content.trim())return;const e=ye.allRestaurants?((null===ne||void 0===ne?void 0:ne.restaurants)||[]).map(e=>e.id):ye.selectedRestaurantIds;if(0!==e.length){ve(!0);try{(await fetch("/api/notices",{method:"POST",headers:Se,body:JSON.stringify({title:ye.title,content:ye.content,target_type:"restaurant",restaurant_ids:e,priority:ye.priority,category:ye.category,attachments:Ee.length>0?Ee:void 0})})).ok&&(fe({title:"",content:"",priority:"normal",category:"general",allRestaurants:!0,selectedRestaurantIds:[]}),Be([]),me(!1),await Ie(),o("sent"))}catch(t){console.error("Error sending notice:",t)}finally{ve(!1)}}},disabled:je||!ye.title.trim()||!ye.content.trim()||!ye.allRestaurants&&0===ye.selectedRestaurantIds.length,children:je?"Sending...":"Send Notice"})]})]})}),be&&Ae&&(0,p.jsx)(c.mH,{onClick:()=>{we(!1),ke(null)},children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:Ae.title}),(0,p.jsx)(c.Jn,{onClick:()=>{we(!1),ke(null)},children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(J,{children:[(0,p.jsxs)(W,{children:[(0,p.jsx)(Q,{children:"From:"}),(0,p.jsx)(H,{children:(null===(e=Ae.author)||void 0===e?void 0:e.full_name)||Ae.author_name})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Q,{children:"Role:"}),(0,p.jsx)(H,{children:(null===(t=Ae.author)||void 0===t?void 0:t.role)||Ae.author_role})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Q,{children:"Date:"}),(0,p.jsx)(H,{children:Le(Ae.createdAt)})]}),(0,p.jsxs)(W,{children:[(0,p.jsx)(Q,{children:"Priority:"}),(0,p.jsx)(D,{priority:Ae.priority,children:Ae.priority})]})]}),Ae.recipients&&Ae.recipients.length>0&&(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Recipients"}),(0,p.jsx)(q,{children:Ae.recipients.map((e,t)=>{var r,n;return(0,p.jsx)(K,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient #${t+1}`},t)})})]}),(0,p.jsx)(U,{children:Ae.content}),(null===Ae||void 0===Ae?void 0:Ae.attachments)&&Ae.attachments.length>0&&(0,p.jsx)("div",{style:{marginTop:"16px"},children:(0,p.jsx)(l.A,{attachments:Ae.attachments})}),Ae.author_id===Number(null===r||void 0===r?void 0:r.id)&&(0,p.jsx)("div",{style:{marginBottom:"16px",textAlign:"right"},children:(0,p.jsx)(y,{variant:"danger",onClick:()=>De(Ae.id),children:"Delete Notice"})}),(0,p.jsx)(d.A,{entityType:"notice",entityId:String(Ae.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>Ce(e=>{const t={...e},r=String(Ae.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})}}}]);