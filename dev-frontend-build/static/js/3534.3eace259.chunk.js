"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{3534:(e,t,n)=>{n.r(t),n.d(t,{default:()=>te});var i=n(9950),r=n(4752),a=n(2853),o=n(1367),s=n(2488),l=n(7455),d=n(4185),c=n(4302),p=n(9061),x=n(3832),h=n(5665),g=n(8409),u=n(5030),m=n(9955),y=n(4414);const j=r.Ay.div`
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
`,f=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=r.Ay.div`
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
`,v=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,F=r.Ay.div`
  flex: 1;
  min-width: 0;
`,w=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,A=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,k=r.Ay.span`
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
`,C=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,E=r.Ay.div`
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
`,B=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,P=r.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,S=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,z=r.Ay.div`
  margin-bottom: 20px;
`,R=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,$=r.Ay.input`
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
`,D=r.Ay.select`
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
`,N=r.Ay.textarea`
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
`,L=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,O=r.Ay.label`
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
`,T=(0,r.Ay)($)`
  margin-bottom: 8px;
`,I=r.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,M=r.Ay.div`
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
`,U=r.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,Y=r.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,G=r.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,J=r.Ay.div`
  margin-bottom: 24px;
`,W=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,H=r.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,q=r.Ay.div`
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
`,K=r.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,Q=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,V=r.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,X=r.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,Z=r.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,ee=r.Ay.button`
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
`,te=(r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,()=>{var e;const{t:t}=(0,u.Bd)("admin"),{user:n}=(0,o.As)(),[r,te]=(0,i.useState)([]),[ne,ie]=(0,i.useState)(null),[re,ae]=(0,i.useState)({}),[oe,se]=(0,i.useState)(""),[le,de]=(0,i.useState)("all"),[ce,pe]=(0,i.useState)("all"),[xe,he]=(0,i.useState)("newest"),[ge,ue]=(0,i.useState)(!1),[me,ye]=(0,i.useState)(!1),[je,fe]=(0,i.useState)(null),[be,ve]=(0,i.useState)(!1),[Fe,we]=(0,i.useState)(!1),[Ae,ke]=(0,i.useState)({title:"",content:"",priority:"normal"}),[Ce,Ee]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),[_e,Be]=(0,i.useState)(""),[Pe,Se]=(0,i.useState)([]),ze=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${(0,m.c4)()}`}),[]),Re=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ze(),cache:"no-store"});if(e.ok){const t=await e.json(),n=t.data||t,i=Array.isArray(n)?n:[];te(i),(async e=>{if(0!==e.length)try{const t=(0,m.c4)(),n=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(t)}}}catch(t){}})(i)}}catch(e){}},[ze]),$e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ze()});if(e.ok){const t=await e.json();ie(t.data||t)}}catch(e){}},[ze]);(0,i.useEffect)(()=>{Re(),$e()},[Re,$e]);const De=r.length,Ne=r.filter(e=>{const t=new Date(e.createdAt),n=new Date;return t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear()}).length,Le=r.filter(e=>"important"===e.priority).length,Oe=r.filter(e=>"urgent"===e.priority).length,Te=r.filter(e=>{const t=e.title.toLowerCase().includes(oe.toLowerCase())||e.content.toLowerCase().includes(oe.toLowerCase()),n="all"===le||e.priority===le,i="all"===ce||(e.category||"general")===ce;return t&&n&&i}).sort((e,t)=>{const n=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===xe?i-n:n-i}),Ie=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Me=e=>e.recipients?e.recipients.length:0,Ue=e=>{Ee(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Ye=()=>{Ee({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),Be(""),Se([])},Ge=(null===ne||void 0===ne||null===(e=ne.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(_e.toLowerCase())))||[];return(0,y.jsxs)(x.mc,{children:[(0,y.jsxs)(x.Y9,{children:[(0,y.jsx)(x.hE,{children:t("admin:noticesPage.notices")}),(0,y.jsx)(x.ex,{children:(0,y.jsx)(x.$n,{variant:"primary",onClick:()=>ue(!0),children:"New Notice"})})]}),(0,y.jsxs)(x.UC,{children:[(0,y.jsxs)(h.MD,{children:[(0,y.jsxs)(h.hI,{color:"#635BFF",children:[(0,y.jsx)(h.Os,{children:De}),(0,y.jsx)(h.v0,{children:t("admin:noticesPage.totalSent")})]}),(0,y.jsxs)(h.hI,{color:"#10B981",children:[(0,y.jsx)(h.Os,{children:Ne}),(0,y.jsx)(h.v0,{children:t("admin:noticesPage.thisMonth")})]}),(0,y.jsxs)(h.hI,{color:"#F59E0B",children:[(0,y.jsx)(h.Os,{children:Le}),(0,y.jsx)(h.v0,{children:t("admin:noticesPage.important")})]}),(0,y.jsxs)(h.hI,{color:"#EF4444",children:[(0,y.jsx)(h.Os,{children:Oe}),(0,y.jsx)(h.v0,{children:t("admin:noticesPage.urgent")})]})]}),(0,y.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,y.jsx)("button",{onClick:()=>pe(e),style:{padding:"6px 16px",borderRadius:"20px",border:ce===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ce===e?"#F0EFFF":"white",color:ce===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ce===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,y.jsxs)(j,{children:[(0,y.jsxs)(s.Jt,{value:le,onChange:e=>de(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:t("admin:noticesPage.allPriorities")}),(0,y.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,y.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,y.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]}),(0,y.jsxs)(s.Jt,{value:xe,onChange:e=>he(e.target.value),children:[(0,y.jsx)("option",{value:"newest",children:t("admin:noticesPage.newestFirst")}),(0,y.jsx)("option",{value:"oldest",children:t("admin:noticesPage.oldestFirst")})]}),(0,y.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:oe,onChange:e=>se(e.target.value)})]}),0===Te.length?(0,y.jsxs)(a.pp,{children:[(0,y.jsx)("h3",{children:t("admin:noticesPage.noNoticesFound")}),(0,y.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,y.jsx)(f,{children:Te.map(e=>{var n,i;return(0,y.jsxs)(b,{onClick:()=>(e=>{fe(e),ye(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,y.jsxs)(v,{children:[(0,y.jsx)(F,{children:(0,y.jsx)(w,{children:e.title})}),(0,y.jsxs)(S,{children:["guide"===e.category&&(0,y.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:t("admin:noticesPage.guide")}),(0,y.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,y.jsx)(A,{children:e.content}),(0,y.jsx)(C,{children:Ie(e)}),(0,y.jsxs)(E,{children:[(0,y.jsx)(_,{children:(0,y.jsx)(P,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,y.jsxs)(B,{children:[(0,y.jsxs)(P,{children:[Me(e)," recipient",1!==Me(e)?"s":""]}),(0,y.jsxs)(P,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(n=re[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,y.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[re[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),ge&&(0,y.jsxs)(g.aF,{isOpen:!0,onClose:()=>{ue(!1),Ye()},title:"New Notice",maxWidth:"720px",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(x.$n,{variant:"secondary",onClick:()=>{ue(!1),Ye()},children:t("admin:noticesPage.cancel")}),(0,y.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(Ce.title.trim()&&Ce.content.trim()){ve(!0);try{const e={title:Ce.title,content:Ce.content,target_type:Ce.target_type,priority:Ce.priority,category:Ce.category,attachments:Pe.length>0?Pe:void 0};"role"===Ce.target_type&&Ce.target_roles.length>0&&(e.target_roles=Ce.target_roles),"restaurant"===Ce.target_type&&Ce.restaurant_ids.length>0&&(e.restaurant_ids=Ce.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ze(),body:JSON.stringify(e)})).ok&&(ue(!1),Ye(),await Re())}catch(e){}finally{ve(!1)}}},disabled:be||!Ce.title.trim()||!Ce.content.trim(),children:be?"Sending...":"Send Notice"})]}),children:[(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.targetType")}),(0,y.jsxs)(D,{value:Ce.target_type,onChange:e=>Ee(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,y.jsx)("option",{value:"all",children:t("admin:noticesPage.allUsers")}),(0,y.jsx)("option",{value:"role",children:t("admin:noticesPage.byRole")}),(0,y.jsx)("option",{value:"restaurant",children:t("admin:noticesPage.selectRestaurants")})]})]}),"role"===Ce.target_type&&(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.selectRoles")}),(0,y.jsx)(L,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,y.jsxs)(O,{children:[(0,y.jsx)("input",{type:"checkbox",checked:Ce.target_roles.includes(e),onChange:()=>(e=>{Ee(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Ce.target_type&&(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.selectRestaurants")}),(0,y.jsx)(T,{type:"text",placeholder:"Search restaurants...",value:_e,onChange:e=>Be(e.target.value)}),(0,y.jsx)(I,{children:0===Ge.length?(0,y.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Ge.map(e=>(0,y.jsxs)(M,{selected:Ce.restaurant_ids.includes(e.id),onClick:()=>Ue(e.id),children:[(0,y.jsx)(U,{type:"checkbox",checked:Ce.restaurant_ids.includes(e.id),onChange:()=>Ue(e.id),onClick:e=>e.stopPropagation()}),(0,y.jsx)(Y,{children:e.name})]},e.id))}),Ce.restaurant_ids.length>0&&(0,y.jsxs)(G,{children:[Ce.restaurant_ids.length," restaurant",1!==Ce.restaurant_ids.length?"s":""," selected"]})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.title")}),(0,y.jsx)($,{type:"text",placeholder:"Enter notice title",value:Ce.title,onChange:e=>Ee(t=>({...t,title:e.target.value}))})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.content")}),(0,y.jsx)(N,{placeholder:"Enter notice content...",value:Ce.content,onChange:e=>Ee(t=>({...t,content:e.target.value}))})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.attachments")}),(0,y.jsx)(l.A,{files:Pe,onChange:Se,maxFiles:5})]}),(0,y.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,y.jsxs)(z,{style:{flex:1},children:[(0,y.jsx)(R,{children:t("admin:noticesPage.category")}),(0,y.jsxs)(D,{value:Ce.category,onChange:e=>Ee(t=>({...t,category:e.target.value})),children:[(0,y.jsx)("option",{value:"general",children:t("admin:noticesPage.general")}),(0,y.jsx)("option",{value:"guide",children:t("admin:noticesPage.guide")})]})]}),(0,y.jsxs)(z,{style:{flex:1},children:[(0,y.jsx)(R,{children:t("admin:noticesPage.priority")}),(0,y.jsxs)(D,{value:Ce.priority,onChange:e=>Ee(t=>({...t,priority:e.target.value})),children:[(0,y.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,y.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,y.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]})]})]})]}),me&&je&&(0,y.jsx)(g.aF,{isOpen:!0,onClose:()=>{ye(!1),fe(null),we(!1)},title:Fe?"Edit Notice":"Notice Details",size:"large",footer:Fe?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(x.$n,{variant:"secondary",onClick:()=>we(!1),children:t("admin:noticesPage.cancel")}),(0,y.jsx)(x.$n,{variant:"primary",onClick:async()=>{try{const e=await fetch(`/api/notices/${je.id}`,{method:"PUT",headers:{...ze(),"Content-Type":"application/json"},body:JSON.stringify(Ae)});(await e.json()).success&&(we(!1),fe({...je,...Ae}),Re())}catch(e){console.error(e)}},children:t("admin:noticesPage.save")})]}):(0,y.jsxs)(y.Fragment,{children:[String(je.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,y.jsx)(x.$n,{variant:"primary",onClick:()=>{ke({title:je.title,content:je.content,priority:je.priority}),we(!0)},children:t("admin:noticesPage.edit")}),(0,y.jsx)(ee,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ze()})).ok&&(ye(!1),fe(null),Re())}catch(t){}})(je.id),children:t("admin:noticesPage.deleteNotice")}),(0,y.jsx)(x.$n,{variant:"secondary",onClick:()=>{ye(!1),fe(null)},children:t("admin:noticesPage.close")})]}),children:Fe?(0,y.jsxs)(J,{children:[(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.title")}),(0,y.jsx)($,{value:Ae.title,onChange:e=>ke({...Ae,title:e.target.value})})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.content")}),(0,y.jsx)("textarea",{value:Ae.content,onChange:e=>ke({...Ae,content:e.target.value}),style:{width:"100%",minHeight:"200px",padding:"12px",borderRadius:"8px",border:"1px solid #E6EBF1",fontSize:"14px",fontFamily:"inherit",resize:"vertical"}})]}),(0,y.jsxs)(z,{children:[(0,y.jsx)(R,{children:t("admin:noticesPage.priority")}),(0,y.jsxs)("select",{value:Ae.priority,onChange:e=>ke({...Ae,priority:e.target.value}),style:{padding:"8px 12px",borderRadius:"6px",border:"1px solid #E6EBF1",fontSize:"14px"},children:[(0,y.jsx)("option",{value:"normal",children:t("admin:noticesPage.normal")}),(0,y.jsx)("option",{value:"important",children:t("admin:noticesPage.important")}),(0,y.jsx)("option",{value:"urgent",children:t("admin:noticesPage.urgent")})]})]})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(J,{children:[(0,y.jsx)(H,{children:je.title}),(0,y.jsxs)(q,{children:[(0,y.jsx)(k,{priority:je.priority,children:je.priority}),(0,y.jsx)(C,{children:Ie(je)}),(0,y.jsx)("span",{children:(Je=je.createdAt,new Date(Je).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,y.jsx)(K,{children:je.content.split("\n").map((e,t)=>(0,y.jsxs)(i.Fragment,{children:[t>0&&(0,y.jsx)("br",{}),(0,p.c)(e)]},t))}),(null===je||void 0===je?void 0:je.attachments)&&je.attachments.length>0&&(0,y.jsx)(d.A,{attachments:je.attachments})]}),(0,y.jsxs)(J,{children:[(0,y.jsxs)(W,{children:["Recipients (",Me(je),")"]}),je.recipients&&je.recipients.length>0?(0,y.jsx)(Q,{children:je.recipients.map(e=>(0,y.jsxs)(V,{isRead:!!e.read_at,children:[(0,y.jsx)(Z,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,y.jsx)(X,{children:e.user.role})]},e.id))}):(0,y.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:t("admin:noticesPage.noRecipientsDataAvailable")})]}),(0,y.jsx)(c.A,{entityType:"notice",entityId:String(je.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>ae(e=>{const t={...e},n=String(je.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})})]});var Je})}}]);