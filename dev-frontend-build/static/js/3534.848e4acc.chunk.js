"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{3534:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ee});var i=n(9950),r=n(4752),a=n(2853),o=n(1367),s=n(2488),l=n(7455),d=n(4185),c=n(4302),p=n(9061),x=n(3832),h=n(5665),g=n(8409),u=n(5030),m=n(4414);const y=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }
`,b=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,v=r.Ay.div`
  flex: 1;
  min-width: 0;
`,F=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,w=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,A=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,k=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,C=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,_=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,E=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,B=r.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,P=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,S=r.Ay.div`
  margin-bottom: 20px;
`,z=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=r.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,$=r.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,D=r.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,N=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,L=r.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`,O=(0,r.Ay)(R)`
  margin-bottom: 8px;
`,I=r.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,T=r.Ay.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${e=>e.selected?"#F0EFFF":"transparent"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${e=>e.selected?"#F0EFFF":"#F8FAFC"};
  }
`,M=r.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,U=r.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,Y=r.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,G=r.Ay.div`
  margin-bottom: 24px;
`,J=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,W=r.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,H=r.Ay.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7280;

  & > * {
    flex-shrink: 0;
  }
`,q=r.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,K=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Q=r.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,V=r.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,X=r.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,Z=r.Ay.button`
  padding: 8px 16px;
  background: transparent;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
  }
`,ee=(r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,()=>{var e;const{t:t}=(0,u.Bd)("admin"),{user:n}=(0,o.As)(),[r,ee]=(0,i.useState)([]),[te,ne]=(0,i.useState)(null),[ie,re]=(0,i.useState)({}),[ae,oe]=(0,i.useState)(""),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)("newest"),[he,ge]=(0,i.useState)(!1),[ue,me]=(0,i.useState)(!1),[ye,je]=(0,i.useState)(null),[fe,be]=(0,i.useState)(!1),[ve,Fe]=(0,i.useState)(!1),[we,Ae]=(0,i.useState)({title:"",content:"",priority:"normal"}),[ke,Ce]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),[_e,Ee]=(0,i.useState)(""),[Be,Pe]=(0,i.useState)([]),Se=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),ze=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Se(),cache:"no-store"});if(e.ok){const t=await e.json(),n=t.data||t,i=Array.isArray(n)?n:[];ee(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),re(t)}}}catch(t){}})(i)}}catch(e){}},[Se]),Re=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Se()});if(e.ok){const t=await e.json();ne(t.data||t)}}catch(e){}},[Se]);(0,i.useEffect)(()=>{ze(),Re()},[ze,Re]);const $e=r.length,De=r.filter(e=>{const t=new Date(e.createdAt),n=new Date;return t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear()}).length,Ne=r.filter(e=>"important"===e.priority).length,Le=r.filter(e=>"urgent"===e.priority).length,Oe=r.filter(e=>{const t=e.title.toLowerCase().includes(ae.toLowerCase())||e.content.toLowerCase().includes(ae.toLowerCase()),n="all"===se||e.priority===se,i="all"===de||(e.category||"general")===de;return t&&n&&i}).sort((e,t)=>{const n=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===pe?i-n:n-i}),Ie=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Te=e=>e.recipients?e.recipients.length:0,Me=e=>{Ce(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Ue=()=>{Ce({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),Ee(""),Pe([])},Ye=(null===te||void 0===te||null===(e=te.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(_e.toLowerCase())))||[];return(0,m.jsxs)(x.mc,{children:[(0,m.jsxs)(x.Y9,{children:[(0,m.jsx)(x.hE,{children:t("admin:noticesPage.notices")}),(0,m.jsx)(x.ex,{children:(0,m.jsx)(x.$n,{variant:"primary",onClick:()=>ge(!0),children:"New Notice"})})]}),(0,m.jsxs)(x.UC,{children:[(0,m.jsxs)(h.MD,{children:[(0,m.jsxs)(h.hI,{color:"#635BFF",children:[(0,m.jsx)(h.Os,{children:$e}),(0,m.jsx)(h.v0,{children:t("admin:noticesPage.totalSent")})]}),(0,m.jsxs)(h.hI,{color:"#10B981",children:[(0,m.jsx)(h.Os,{children:De}),(0,m.jsx)(h.v0,{children:t("admin:noticesPage.thisMonth")})]}),(0,m.jsxs)(h.hI,{color:"#F59E0B",children:[(0,m.jsx)(h.Os,{children:Ne}),(0,m.jsx)(h.v0,{children:t("admin:noticesPage.important")})]}),(0,m.jsxs)(h.hI,{color:"#EF4444",children:[(0,m.jsx)(h.Os,{children:Le}),(0,m.jsx)(h.v0,{children:t("admin:noticesPage.urgent")})]})]}),(0,m.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,m.jsx)("button",{onClick:()=>ce(e),style:{padding:"6px 16px",borderRadius:"20px",border:de===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:de===e?"#F0EFFF":"white",color:de===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:de===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,m.jsxs)(y,{children:[(0,m.jsxs)(s.Jt,{value:se,onChange:e=>le(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:t("admin:noticesPage.allPriorities")}),(0,m.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,m.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,m.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]}),(0,m.jsxs)(s.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,m.jsx)("option",{value:"newest",children:t("admin:noticesPage.newestFirst")}),(0,m.jsx)("option",{value:"oldest",children:t("admin:noticesPage.oldestFirst")})]}),(0,m.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:ae,onChange:e=>oe(e.target.value)})]}),0===Oe.length?(0,m.jsxs)(a.pp,{children:[(0,m.jsx)("h3",{children:t("admin:noticesPage.noNoticesFound")}),(0,m.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,m.jsx)(j,{children:Oe.map(e=>{var n,i;return(0,m.jsxs)(f,{onClick:()=>(e=>{je(e),me(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,m.jsxs)(b,{children:[(0,m.jsx)(v,{children:(0,m.jsx)(F,{children:e.title})}),(0,m.jsxs)(P,{children:["guide"===e.category&&(0,m.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:t("admin:noticesPage.guide")}),(0,m.jsx)(A,{priority:e.priority,children:e.priority})]})]}),(0,m.jsx)(w,{children:e.content}),(0,m.jsx)(k,{children:Ie(e)}),(0,m.jsxs)(C,{children:[(0,m.jsx)(_,{children:(0,m.jsx)(B,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,m.jsxs)(E,{children:[(0,m.jsxs)(B,{children:[Te(e)," recipient",1!==Te(e)?"s":""]}),(0,m.jsxs)(B,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(n=ie[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[ie[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),he&&(0,m.jsxs)(g.aF,{isOpen:!0,onClose:()=>{ge(!1),Ue()},title:"New Notice",maxWidth:"720px",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>{ge(!1),Ue()},children:t("admin:noticesPage.cancel")}),(0,m.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(ke.title.trim()&&ke.content.trim()){be(!0);try{const e={title:ke.title,content:ke.content,target_type:ke.target_type,priority:ke.priority,category:ke.category,attachments:Be.length>0?Be:void 0};"role"===ke.target_type&&ke.target_roles.length>0&&(e.target_roles=ke.target_roles),"restaurant"===ke.target_type&&ke.restaurant_ids.length>0&&(e.restaurant_ids=ke.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Se(),body:JSON.stringify(e)})).ok&&(ge(!1),Ue(),await ze())}catch(e){}finally{be(!1)}}},disabled:fe||!ke.title.trim()||!ke.content.trim(),children:fe?"Sending...":"Send Notice"})]}),children:[(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.targetType")}),(0,m.jsxs)($,{value:ke.target_type,onChange:e=>Ce(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,m.jsx)("option",{value:"all",children:t("admin:noticesPage.allUsers")}),(0,m.jsx)("option",{value:"role",children:t("admin:noticesPage.byRole")}),(0,m.jsx)("option",{value:"restaurant",children:t("admin:noticesPage.selectRestaurants")})]})]}),"role"===ke.target_type&&(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.selectRoles")}),(0,m.jsx)(N,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,m.jsxs)(L,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ke.target_roles.includes(e),onChange:()=>(e=>{Ce(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===ke.target_type&&(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.selectRestaurants")}),(0,m.jsx)(O,{type:"text",placeholder:"Search restaurants...",value:_e,onChange:e=>Ee(e.target.value)}),(0,m.jsx)(I,{children:0===Ye.length?(0,m.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Ye.map(e=>(0,m.jsxs)(T,{selected:ke.restaurant_ids.includes(e.id),onClick:()=>Me(e.id),children:[(0,m.jsx)(M,{type:"checkbox",checked:ke.restaurant_ids.includes(e.id),onChange:()=>Me(e.id),onClick:e=>e.stopPropagation()}),(0,m.jsx)(U,{children:e.name})]},e.id))}),ke.restaurant_ids.length>0&&(0,m.jsxs)(Y,{children:[ke.restaurant_ids.length," restaurant",1!==ke.restaurant_ids.length?"s":""," selected"]})]}),(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.title")}),(0,m.jsx)(R,{type:"text",placeholder:"Enter notice title",value:ke.title,onChange:e=>Ce(t=>({...t,title:e.target.value}))})]}),(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.content")}),(0,m.jsx)(D,{placeholder:"Enter notice content...",value:ke.content,onChange:e=>Ce(t=>({...t,content:e.target.value}))})]}),(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.attachments")}),(0,m.jsx)(l.A,{files:Be,onChange:Pe,maxFiles:5})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,m.jsxs)(S,{style:{flex:1},children:[(0,m.jsx)(z,{children:t("admin:noticesPage.category")}),(0,m.jsxs)($,{value:ke.category,onChange:e=>Ce(t=>({...t,category:e.target.value})),children:[(0,m.jsx)("option",{value:"general",children:t("admin:noticesPage.general")}),(0,m.jsx)("option",{value:"guide",children:t("admin:noticesPage.guide")})]})]}),(0,m.jsxs)(S,{style:{flex:1},children:[(0,m.jsx)(z,{children:t("admin:noticesPage.priority")}),(0,m.jsxs)($,{value:ke.priority,onChange:e=>Ce(t=>({...t,priority:e.target.value})),children:[(0,m.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,m.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,m.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]})]})]})]}),ue&&ye&&(0,m.jsx)(g.aF,{isOpen:!0,onClose:()=>{me(!1),je(null),Fe(!1)},title:ve?"Edit Notice":"Notice Details",size:"large",footer:ve?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>Fe(!1),children:t("admin:noticesPage.cancel")}),(0,m.jsx)(x.$n,{variant:"primary",onClick:async()=>{try{const e=await fetch(`/api/notices/${ye.id}`,{method:"PUT",headers:{...Se(),"Content-Type":"application/json"},body:JSON.stringify(we)});(await e.json()).success&&(Fe(!1),je({...ye,...we}),ze())}catch(e){console.error(e)}},children:t("admin:noticesPage.save")})]}):(0,m.jsxs)(m.Fragment,{children:[String(ye.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,m.jsx)(x.$n,{variant:"primary",onClick:()=>{Ae({title:ye.title,content:ye.content,priority:ye.priority}),Fe(!0)},children:t("admin:noticesPage.edit")}),(0,m.jsx)(Z,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Se()})).ok&&(me(!1),je(null),ze())}catch(t){}})(ye.id),children:t("admin:noticesPage.deleteNotice")}),(0,m.jsx)(x.$n,{variant:"secondary",onClick:()=>{me(!1),je(null)},children:t("admin:noticesPage.close")})]}),children:ve?(0,m.jsxs)(G,{children:[(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.title")}),(0,m.jsx)(R,{value:we.title,onChange:e=>Ae({...we,title:e.target.value})})]}),(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.content")}),(0,m.jsx)("textarea",{value:we.content,onChange:e=>Ae({...we,content:e.target.value}),style:{width:"100%",minHeight:"200px",padding:"12px",borderRadius:"8px",border:"1px solid #E6EBF1",fontSize:"14px",fontFamily:"inherit",resize:"vertical"}})]}),(0,m.jsxs)(S,{children:[(0,m.jsx)(z,{children:t("admin:noticesPage.priority")}),(0,m.jsxs)("select",{value:we.priority,onChange:e=>Ae({...we,priority:e.target.value}),style:{padding:"8px 12px",borderRadius:"6px",border:"1px solid #E6EBF1",fontSize:"14px"},children:[(0,m.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,m.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,m.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(G,{children:[(0,m.jsx)(W,{children:ye.title}),(0,m.jsxs)(H,{children:[(0,m.jsx)(A,{priority:ye.priority,children:ye.priority}),(0,m.jsx)(k,{children:Ie(ye)}),(0,m.jsx)("span",{children:(Ge=ye.createdAt,new Date(Ge).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,m.jsx)(q,{children:ye.content.split("\n").map((e,t)=>(0,m.jsxs)(i.Fragment,{children:[t>0&&(0,m.jsx)("br",{}),(0,p.c)(e)]},t))}),(null===ye||void 0===ye?void 0:ye.attachments)&&ye.attachments.length>0&&(0,m.jsx)(d.A,{attachments:ye.attachments})]}),(0,m.jsxs)(G,{children:[(0,m.jsxs)(J,{children:["Recipients (",Te(ye),")"]}),ye.recipients&&ye.recipients.length>0?(0,m.jsx)(K,{children:ye.recipients.map(e=>(0,m.jsxs)(Q,{isRead:!!e.read_at,children:[(0,m.jsx)(X,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,m.jsx)(V,{children:e.user.role})]},e.id))}):(0,m.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:t("admin:noticesPage.noRecipientsDataAvailable")})]}),(0,m.jsx)(c.A,{entityType:"notice",entityId:String(ye.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>re(e=>{const t={...e},n=String(ye.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})})]});var Ge})}}]);