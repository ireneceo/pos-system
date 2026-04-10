"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2653:(e,t,n)=>{n.d(t,{M:()=>i});var r=n(9950),o=n(4492);function i(e){const[t,n]=(0,o.ok)(),i=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(i());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},5637:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ee});var r=n(9950),o=n(4752),i=n(2853),a=n(1367),s=n(3832),l=n(5665),c=n(2597),d=n(2488),p=n(2653),u=n(7455),x=n(4185),h=n(4302),g=n(9061),m=n(8409),v=n(5030),f=n(9955),y=n(4414);const j=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,_=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,A=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,C=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,E=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,S=o.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,B=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,P=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,z=o.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,$=o.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,O=o.Ay.div`
  margin-bottom: 20px;
`,D=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,N=o.Ay.input`
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
`,M=o.Ay.select`
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
`,I=o.Ay.textarea`
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
`,L=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=o.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,T=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  transition: background 0.1s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,U=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Y=o.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`,G=o.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,J=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,W=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,Z=o.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,q=o.Ay.div`
  margin-bottom: 24px;
`,H=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,K=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Q=o.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,V=o.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,X=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ee=()=>{var e,t,n;const{t:o}=(0,v.Bd)("common"),{user:ee}=(0,a.As)(),[te,ne]=(0,r.useState)([]),[re,oe]=(0,r.useState)([]),[ie,ae]=(0,r.useState)(null),[se,le]=(0,r.useState)(!0),[ce,de]=(0,p.M)("received"),[pe,ue]=(0,r.useState)(""),[xe,he]=(0,r.useState)(""),[ge,me]=(0,r.useState)("all"),[ve,fe]=(0,r.useState)("all"),[ye,je]=(0,r.useState)(!1),[be,we]=(0,r.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[Fe,_e]=(0,r.useState)(!1),[Ae,Ce]=(0,r.useState)(null),[ke,Ee]=(0,r.useState)(!1),[Se,Be]=(0,r.useState)({}),[Pe,ze]=(0,r.useState)([]),$e={Authorization:`Bearer ${(0,f.c4)()}`,"Content-Type":"application/json"},Oe=async e=>{if(0!==e.length)try{const t=(0,f.c4)(),n=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Be(e=>({...e,...t}))}}}catch(t){}},De=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:$e});if(e.ok){const t=await e.json();t.success&&ae(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Ne=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:$e});if(e.ok){const t=await e.json();t.success&&(ne(t.data),Oe(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Me=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:$e});if(e.ok){const t=await e.json();t.success&&(oe(t.data),Oe(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Ie=(0,r.useCallback)(async()=>{le(!0),await Promise.all([De(),Ne(),Me()]),le(!1)},[De,Ne,Me]);(0,r.useEffect)(()=>{ee&&Ie()},[ee,Ie]);const Le=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var n;const r=!pe||e.title.toLowerCase().includes(pe.toLowerCase())||(null===(n=e.author_name)||void 0===n?void 0:n.toLowerCase().includes(pe.toLowerCase())),o=!xe||e.priority===xe,i="all"===ge||(e.category||"general")===ge,a="all"===ve||t||e.author_role===ve;return r&&o&&i&&a})},Re=Le(te,!1),Te=Le(re,!0),Ue="received"===ce?Re:Te,Ye={total:te.length,unread:te.filter(e=>!e.read_at).length,important:te.filter(e=>"important"===e.priority).length,urgent:te.filter(e=>"urgent"===e.priority).length},Ge=(new Date).getMonth(),Je=(new Date).getFullYear(),We={total:re.length,thisMonth:re.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Ge&&t.getFullYear()===Je}).length,important:re.filter(e=>"important"===e.priority).length,urgent:re.filter(e=>"urgent"===e.priority).length},Ze=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),r=Math.floor(n/6e4),o=Math.floor(n/36e5),i=Math.floor(n/864e5);return r<1?"Just now":r<60?`${r}m ago`:o<24?`${o}h ago`:i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},qe=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return se?(0,y.jsxs)(s.mc,{children:[(0,y.jsx)(s.Y9,{children:(0,y.jsx)(s.hE,{children:o("common:noticesPage.notices")})}),(0,y.jsx)(s.UC,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,y.jsxs)(s.mc,{children:[(0,y.jsxs)(s.Y9,{children:[(0,y.jsx)(s.hE,{children:o("common:noticesPage.notices")}),(0,y.jsx)(s.ex,{children:(null===ie||void 0===ie?void 0:ie.canSend)&&(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>{var e,t,n,r,o;we({title:"",content:"",target_type:(null===ie||void 0===ie||null===(e=ie.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===ie||void 0===ie||null===(n=ie.foodcourts)||void 0===n||null===(r=n[0])||void 0===r||null===(o=r.id)||void 0===o?void 0:o.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),je(!0)},children:o("common:noticesPage.newNotice")})})]}),(0,y.jsxs)(s.UC,{children:[(0,y.jsxs)(c.tU,{children:[(0,y.jsxs)(c.oz,{active:"received"===ce,onClick:()=>de("received"),children:["Received",(0,y.jsx)(c.Ex,{count:te.length,showZero:!0})]}),(0,y.jsxs)(c.oz,{active:"sent"===ce,onClick:()=>de("sent"),children:["Sent",(0,y.jsx)(c.Ex,{count:re.length,showZero:!0})]})]}),"received"===ce?(0,y.jsxs)(l.MD,{children:[(0,y.jsxs)(l.hI,{color:"#635BFF",children:[(0,y.jsx)(l.Os,{children:Ye.total}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.totalReceived")})]}),(0,y.jsxs)(l.hI,{color:"#3B82F6",children:[(0,y.jsx)(l.Os,{children:Ye.unread}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.unread")})]}),(0,y.jsxs)(l.hI,{color:"#F59E0B",children:[(0,y.jsx)(l.Os,{children:Ye.important}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.important")})]}),(0,y.jsxs)(l.hI,{color:"#EF4444",children:[(0,y.jsx)(l.Os,{children:Ye.urgent}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.urgent")})]})]}):(0,y.jsxs)(l.MD,{children:[(0,y.jsxs)(l.hI,{color:"#635BFF",children:[(0,y.jsx)(l.Os,{children:We.total}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.totalSent")})]}),(0,y.jsxs)(l.hI,{color:"#3B82F6",children:[(0,y.jsx)(l.Os,{children:We.thisMonth}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.thisMonth")})]}),(0,y.jsxs)(l.hI,{color:"#F59E0B",children:[(0,y.jsx)(l.Os,{children:We.important}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.important")})]}),(0,y.jsxs)(l.hI,{color:"#EF4444",children:[(0,y.jsx)(l.Os,{children:We.urgent}),(0,y.jsx)(l.v0,{children:o("common:noticesPage.urgent")})]})]}),(0,y.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,y.jsx)("button",{onClick:()=>me(e),style:{padding:"6px 16px",borderRadius:"20px",border:ge===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ge===e?"#F0EFFF":"white",color:ge===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ge===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,y.jsxs)(j,{children:[(0,y.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:pe,onChange:e=>ue(e.target.value)}),"received"===ce&&(0,y.jsxs)(d.Jt,{value:ve,onChange:e=>fe(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:o("common:noticesPage.allSenders")}),(0,y.jsx)("option",{value:"System Admin",children:o("common:noticesPage.systemAdmin")}),(0,y.jsx)("option",{value:"Brand General",children:o("common:noticesPage.brandGeneral")}),(0,y.jsx)("option",{value:"Foodcourt General",children:o("common:noticesPage.foodcourtGeneral")}),(0,y.jsx)("option",{value:"Restaurant Owner",children:o("common:noticesPage.restaurantOwner")})]}),(0,y.jsxs)(d.Jt,{value:xe,onChange:e=>he(e.target.value),children:[(0,y.jsx)("option",{value:"",children:o("common:noticesPage.allPriorities")}),(0,y.jsx)("option",{value:"normal",children:o("common:noticesPage.normal")}),(0,y.jsx)("option",{value:"important",children:o("common:noticesPage.important")}),(0,y.jsx)("option",{value:"urgent",children:o("common:noticesPage.urgent")})]})]}),(0,y.jsxs)(b,{children:[Ue.map(e=>{var t,n,r;const i="received"===ce&&!e.read_at;return(0,y.jsxs)(w,{unread:i,onClick:()=>(async e=>{Ce(e),Ee(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:$e});if(t.ok){const e=await t.json();e.success&&Ce(e.data)}Ne(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,y.jsxs)(F,{children:[(0,y.jsxs)(_,{children:[i&&(0,y.jsx)(A,{}),(0,y.jsxs)("div",{children:[(0,y.jsx)(C,{children:e.title}),(0,y.jsxs)(k,{children:[(0,y.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,y.jsx)("span",{children:e.author_role||(null===(n=e.author)||void 0===n?void 0:n.role)||""}),"sent"===ce&&(0,y.jsxs)($,{children:["To: ",qe(e)]})]})]})]}),(0,y.jsxs)(E,{children:["guide"===e.category&&(0,y.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:o("common:noticesPage.guide")}),(0,y.jsx)(S,{priority:e.priority,children:e.priority})]})]}),(0,y.jsx)(B,{children:e.content}),(0,y.jsxs)(P,{children:[(0,y.jsx)("span",{children:Ze(e.createdAt)}),e.commentCount>0&&(0,y.jsxs)(z,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(r=Se[String(e.id)])||void 0===r?void 0:r.unread_count)>0&&(0,y.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Se[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Ue.length&&(0,y.jsxs)(i.pp,{children:[(0,y.jsx)("h3",{children:o("common:noticesPage.noNoticesFound")}),(0,y.jsx)("p",{children:"received"===ce?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),ye&&(0,y.jsxs)(m.aF,{isOpen:!0,onClose:()=>je(!1),title:"New Notice",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s.$n,{variant:"secondary",onClick:()=>je(!1),children:o("common:noticesPage.cancel")}),(0,y.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(be.title.trim()&&be.content.trim()){_e(!0);try{const e={title:be.title,content:be.content,target_type:be.target_type,priority:be.priority,category:be.category,attachments:Pe.length>0?Pe:void 0};"foodcourt"===be.target_type?e.foodcourt_id=parseInt(be.foodcourt_id):"restaurant"===be.target_type&&(e.restaurant_ids=be.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:$e,body:JSON.stringify(e)})).ok?(je(!1),ze([]),de("sent"),await Promise.all([Me(),Ne()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}_e(!1)}},disabled:Fe||!be.title.trim()||!be.content.trim()||"select_restaurants"===be.target_type&&0===be.restaurant_ids.length||"restaurant"===be.target_type&&0===be.restaurant_ids.length,children:Fe?"Sending...":"Send Notice"})]}),children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:"Title *"}),(0,y.jsx)(N,{type:"text",value:be.title,onChange:e=>we({...be,title:e.target.value}),placeholder:"Notice title"})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:"Content *"}),(0,y.jsx)(I,{value:be.content,onChange:e=>we({...be,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:o("common:noticesPage.attachments")}),(0,y.jsx)(u.A,{files:Pe,onChange:ze,maxFiles:5})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:"Target *"}),(0,y.jsx)(M,{value:be.target_type,onChange:e=>{var t,n,r;return we({...be,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===ie||void 0===ie||null===(t=ie.foodcourts)||void 0===t||null===(n=t[0])||void 0===n||null===(r=n.id)||void 0===r?void 0:r.toString())||"",restaurant_ids:[]})},children:null===ie||void 0===ie||null===(e=ie.targetOptions)||void 0===e?void 0:e.map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value))})]}),"foodcourt"===be.target_type&&(null===ie||void 0===ie?void 0:ie.foodcourts)&&ie.foodcourts.length>0&&(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:o("common:noticesPage.selectFoodcourt")}),(0,y.jsx)(M,{value:be.foodcourt_id,onChange:e=>we({...be,foodcourt_id:e.target.value}),children:ie.foodcourts.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))})]}),("select_restaurants"===be.target_type||"restaurant"===be.target_type)&&(null===ie||void 0===ie?void 0:ie.restaurants)&&(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:o("common:noticesPage.selectRestaurants")}),(0,y.jsxs)(U,{children:[(0,y.jsxs)(G,{children:[be.restaurant_ids.length," of ",ie.restaurants.length," selected"]}),(0,y.jsx)(Y,{onClick:()=>{if(!ie)return;const e=ie.restaurants.map(e=>e.id),t=e.every(e=>be.restaurant_ids.includes(e));we(n=>({...n,restaurant_ids:t?[]:e}))},children:be.restaurant_ids.length===ie.restaurants.length?"Deselect All":"Select All"})]}),(0,y.jsxs)(R,{children:[ie.restaurants.map(e=>(0,y.jsxs)(T,{children:[(0,y.jsx)("input",{type:"checkbox",checked:be.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void we(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===ie.restaurants.length&&(0,y.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]}),(0,y.jsxs)(L,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:o("common:noticesPage.category")}),(0,y.jsxs)(M,{value:be.category,onChange:e=>we({...be,category:e.target.value}),children:[(0,y.jsx)("option",{value:"general",children:o("common:noticesPage.general")}),(0,y.jsx)("option",{value:"guide",children:o("common:noticesPage.guide")})]})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)(D,{children:o("common:noticesPage.priority")}),(0,y.jsxs)(M,{value:be.priority,onChange:e=>we({...be,priority:e.target.value}),children:[(0,y.jsx)("option",{value:"normal",children:o("common:noticesPage.normal")}),(0,y.jsx)("option",{value:"important",children:o("common:noticesPage.important")}),(0,y.jsx)("option",{value:"urgent",children:o("common:noticesPage.urgent")})]})]})]})]}),ke&&Ae&&(0,y.jsxs)(m.aF,{isOpen:!0,onClose:()=>{Ee(!1),Ce(null)},title:Ae.title,size:"large",footer:String(Ae.author_id)===String(null===ee||void 0===ee?void 0:ee.id)?(0,y.jsx)(X,{children:(0,y.jsx)(V,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:$e})).ok&&(Ee(!1),Ce(null),await Promise.all([Me(),Ne()]))}catch(t){console.error("Error deleting notice:",t)}})(Ae.id),children:o("common:noticesPage.deleteNotice")})}):void 0,children:[(0,y.jsxs)(W,{children:[(0,y.jsxs)(Z,{children:["From: ",(0,y.jsx)("strong",{style:{marginLeft:"4px"},children:Ae.author_name||(null===(t=Ae.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,y.jsx)(Z,{children:Ae.author_role||(null===(n=Ae.author)||void 0===n?void 0:n.role)||""}),(0,y.jsx)(Z,{children:(He=Ae.createdAt,new Date(He).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,y.jsx)(S,{priority:Ae.priority,children:Ae.priority})]}),(0,y.jsx)(J,{children:Ae.content.split("\n").map((e,t)=>(0,y.jsxs)(r.Fragment,{children:[t>0&&(0,y.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===Ae||void 0===Ae?void 0:Ae.attachments)&&Ae.attachments.length>0&&(0,y.jsx)("div",{style:{marginTop:"16px"},children:(0,y.jsx)(x.A,{attachments:Ae.attachments})}),String(Ae.author_id)===String(null===ee||void 0===ee?void 0:ee.id)&&Ae.recipients&&Ae.recipients.length>0&&(0,y.jsxs)(q,{children:[(0,y.jsx)(H,{children:o("common:noticesPage.recipients")}),(0,y.jsx)(K,{children:Ae.recipients.map((e,t)=>{var n,r;return(0,y.jsx)(Q,{children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||(null===(r=e.user)||void 0===r?void 0:r.name)||`Recipient ${t+1}`},t)})})]}),(0,y.jsx)(h.A,{entityType:"notice",entityId:String(Ae.id),currentUserId:null===ee||void 0===ee?void 0:ee.id,onMarkRead:()=>Be(e=>{const t={...e},n=String(Ae.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})]});var He}}}]);