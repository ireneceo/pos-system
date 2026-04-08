"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2653:(e,t,n)=>{n.d(t,{M:()=>i});var o=n(9950),r=n(4492);function i(e){const[t,n]=(0,r.ok)(),i=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,o.useState)(i());return[a,(0,o.useCallback)(e=>{s(e),n({tab:e})},[n])]}},5637:(e,t,n)=>{n.r(t),n.d(t,{default:()=>X});var o=n(9950),r=n(4752),i=n(2853),a=n(1367),s=n(3832),l=n(5665),c=n(2597),d=n(2488),p=n(2653),u=n(7455),x=n(4185),h=n(4302),g=n(9061),m=n(8409),v=n(5030),f=n(4414);const y=r.Ay.div`
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
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

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
  position: relative;

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,w=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,F=r.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,_=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,A=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=r.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,k=r.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,E=r.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,S=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,B=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,P=r.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,z=r.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,$=r.Ay.div`
  margin-bottom: 20px;
`,O=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,D=r.Ay.input`
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
`,N=r.Ay.select`
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
`,I=r.Ay.textarea`
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
`,M=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=r.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,R=r.Ay.label`
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
`,T=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,U=r.Ay.button`
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
`,Y=r.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,G=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,J=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,W=r.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,Z=r.Ay.div`
  margin-bottom: 24px;
`,q=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,H=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,K=r.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,Q=r.Ay.button`
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
`,V=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,X=()=>{var e,t,n;const{t:r}=(0,v.Bd)("common"),{user:X}=(0,a.As)(),[ee,te]=(0,o.useState)([]),[ne,oe]=(0,o.useState)([]),[re,ie]=(0,o.useState)(null),[ae,se]=(0,o.useState)(!0),[le,ce]=(0,p.M)("received"),[de,pe]=(0,o.useState)(""),[ue,xe]=(0,o.useState)(""),[he,ge]=(0,o.useState)("all"),[me,ve]=(0,o.useState)("all"),[fe,ye]=(0,o.useState)(!1),[je,be]=(0,o.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[we,Fe]=(0,o.useState)(!1),[_e,Ae]=(0,o.useState)(null),[Ce,ke]=(0,o.useState)(!1),[Ee,Se]=(0,o.useState)({}),[Be,Pe]=(0,o.useState)([]),ze={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},$e=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(o.ok){const e=await o.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Se(e=>({...e,...t}))}}}catch(t){}},Oe=(0,o.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ze});if(e.ok){const t=await e.json();t.success&&ie(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),De=(0,o.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:ze});if(e.ok){const t=await e.json();t.success&&(te(t.data),$e(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Ne=(0,o.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ze});if(e.ok){const t=await e.json();t.success&&(oe(t.data),$e(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Ie=(0,o.useCallback)(async()=>{se(!0),await Promise.all([Oe(),De(),Ne()]),se(!1)},[Oe,De,Ne]);(0,o.useEffect)(()=>{X&&Ie()},[X,Ie]);const Me=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var n;const o=!de||e.title.toLowerCase().includes(de.toLowerCase())||(null===(n=e.author_name)||void 0===n?void 0:n.toLowerCase().includes(de.toLowerCase())),r=!ue||e.priority===ue,i="all"===he||(e.category||"general")===he,a="all"===me||t||e.author_role===me;return o&&r&&i&&a})},Le=Me(ee,!1),Re=Me(ne,!0),Te="received"===le?Le:Re,Ue={total:ee.length,unread:ee.filter(e=>!e.read_at).length,important:ee.filter(e=>"important"===e.priority).length,urgent:ee.filter(e=>"urgent"===e.priority).length},Ye=(new Date).getMonth(),Ge=(new Date).getFullYear(),Je={total:ne.length,thisMonth:ne.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Ye&&t.getFullYear()===Ge}).length,important:ne.filter(e=>"important"===e.priority).length,urgent:ne.filter(e=>"urgent"===e.priority).length},We=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),o=Math.floor(n/6e4),r=Math.floor(n/36e5),i=Math.floor(n/864e5);return o<1?"Just now":o<60?`${o}m ago`:r<24?`${r}h ago`:i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Ze=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return ae?(0,f.jsxs)(s.mc,{children:[(0,f.jsx)(s.Y9,{children:(0,f.jsx)(s.hE,{children:r("common:noticesPage.notices")})}),(0,f.jsx)(s.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,f.jsxs)(s.mc,{children:[(0,f.jsxs)(s.Y9,{children:[(0,f.jsx)(s.hE,{children:r("common:noticesPage.notices")}),(0,f.jsx)(s.ex,{children:(null===re||void 0===re?void 0:re.canSend)&&(0,f.jsx)(s.$n,{variant:"primary",onClick:()=>{var e,t,n,o,r;be({title:"",content:"",target_type:(null===re||void 0===re||null===(e=re.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===re||void 0===re||null===(n=re.foodcourts)||void 0===n||null===(o=n[0])||void 0===o||null===(r=o.id)||void 0===r?void 0:r.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),ye(!0)},children:r("common:noticesPage.newNotice")})})]}),(0,f.jsxs)(s.UC,{children:[(0,f.jsxs)(c.tU,{children:[(0,f.jsxs)(c.oz,{active:"received"===le,onClick:()=>ce("received"),children:["Received",(0,f.jsx)(c.Ex,{count:ee.length,showZero:!0})]}),(0,f.jsxs)(c.oz,{active:"sent"===le,onClick:()=>ce("sent"),children:["Sent",(0,f.jsx)(c.Ex,{count:ne.length,showZero:!0})]})]}),"received"===le?(0,f.jsxs)(l.MD,{children:[(0,f.jsxs)(l.hI,{color:"#635BFF",children:[(0,f.jsx)(l.Os,{children:Ue.total}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.totalReceived")})]}),(0,f.jsxs)(l.hI,{color:"#3B82F6",children:[(0,f.jsx)(l.Os,{children:Ue.unread}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.unread")})]}),(0,f.jsxs)(l.hI,{color:"#F59E0B",children:[(0,f.jsx)(l.Os,{children:Ue.important}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.important")})]}),(0,f.jsxs)(l.hI,{color:"#EF4444",children:[(0,f.jsx)(l.Os,{children:Ue.urgent}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.urgent")})]})]}):(0,f.jsxs)(l.MD,{children:[(0,f.jsxs)(l.hI,{color:"#635BFF",children:[(0,f.jsx)(l.Os,{children:Je.total}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.totalSent")})]}),(0,f.jsxs)(l.hI,{color:"#3B82F6",children:[(0,f.jsx)(l.Os,{children:Je.thisMonth}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.thisMonth")})]}),(0,f.jsxs)(l.hI,{color:"#F59E0B",children:[(0,f.jsx)(l.Os,{children:Je.important}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.important")})]}),(0,f.jsxs)(l.hI,{color:"#EF4444",children:[(0,f.jsx)(l.Os,{children:Je.urgent}),(0,f.jsx)(l.v0,{children:r("common:noticesPage.urgent")})]})]}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,f.jsx)("button",{onClick:()=>ge(e),style:{padding:"6px 16px",borderRadius:"20px",border:he===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:he===e?"#F0EFFF":"white",color:he===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:he===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,f.jsxs)(y,{children:[(0,f.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:de,onChange:e=>pe(e.target.value)}),"received"===le&&(0,f.jsxs)(d.Jt,{value:me,onChange:e=>ve(e.target.value),children:[(0,f.jsx)("option",{value:"all",children:r("common:noticesPage.allSenders")}),(0,f.jsx)("option",{value:"System Admin",children:r("common:noticesPage.systemAdmin")}),(0,f.jsx)("option",{value:"Brand General",children:r("common:noticesPage.brandGeneral")}),(0,f.jsx)("option",{value:"Foodcourt General",children:r("common:noticesPage.foodcourtGeneral")}),(0,f.jsx)("option",{value:"Restaurant Owner",children:r("common:noticesPage.restaurantOwner")})]}),(0,f.jsxs)(d.Jt,{value:ue,onChange:e=>xe(e.target.value),children:[(0,f.jsx)("option",{value:"",children:r("common:noticesPage.allPriorities")}),(0,f.jsx)("option",{value:"normal",children:r("common:noticesPage.normal")}),(0,f.jsx)("option",{value:"important",children:r("common:noticesPage.important")}),(0,f.jsx)("option",{value:"urgent",children:r("common:noticesPage.urgent")})]})]}),(0,f.jsxs)(j,{children:[Te.map(e=>{var t,n,o;const i="received"===le&&!e.read_at;return(0,f.jsxs)(b,{unread:i,onClick:()=>(async e=>{Ae(e),ke(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:ze});if(t.ok){const e=await t.json();e.success&&Ae(e.data)}De(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,f.jsxs)(w,{children:[(0,f.jsxs)(F,{children:[i&&(0,f.jsx)(_,{}),(0,f.jsxs)("div",{children:[(0,f.jsx)(A,{children:e.title}),(0,f.jsxs)(C,{children:[(0,f.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,f.jsx)("span",{children:e.author_role||(null===(n=e.author)||void 0===n?void 0:n.role)||""}),"sent"===le&&(0,f.jsxs)(z,{children:["To: ",Ze(e)]})]})]})]}),(0,f.jsxs)(k,{children:["guide"===e.category&&(0,f.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:r("common:noticesPage.guide")}),(0,f.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,f.jsx)(S,{children:e.content}),(0,f.jsxs)(B,{children:[(0,f.jsx)("span",{children:We(e.createdAt)}),e.commentCount>0&&(0,f.jsxs)(P,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(o=Ee[String(e.id)])||void 0===o?void 0:o.unread_count)>0&&(0,f.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ee[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Te.length&&(0,f.jsxs)(i.pp,{children:[(0,f.jsx)("h3",{children:r("common:noticesPage.noNoticesFound")}),(0,f.jsx)("p",{children:"received"===le?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),fe&&(0,f.jsxs)(m.aF,{isOpen:!0,onClose:()=>ye(!1),title:"New Notice",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s.$n,{variant:"secondary",onClick:()=>ye(!1),children:r("common:noticesPage.cancel")}),(0,f.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(je.title.trim()&&je.content.trim()){Fe(!0);try{const e={title:je.title,content:je.content,target_type:je.target_type,priority:je.priority,category:je.category,attachments:Be.length>0?Be:void 0};"foodcourt"===je.target_type?e.foodcourt_id=parseInt(je.foodcourt_id):"restaurant"===je.target_type&&(e.restaurant_ids=je.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ze,body:JSON.stringify(e)})).ok?(ye(!1),Pe([]),ce("sent"),await Promise.all([Ne(),De()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}Fe(!1)}},disabled:we||!je.title.trim()||!je.content.trim()||"select_restaurants"===je.target_type&&0===je.restaurant_ids.length||"restaurant"===je.target_type&&0===je.restaurant_ids.length,children:we?"Sending...":"Send Notice"})]}),children:[(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:"Title *"}),(0,f.jsx)(D,{type:"text",value:je.title,onChange:e=>be({...je,title:e.target.value}),placeholder:"Notice title"})]}),(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:"Content *"}),(0,f.jsx)(I,{value:je.content,onChange:e=>be({...je,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:r("common:noticesPage.attachments")}),(0,f.jsx)(u.A,{files:Be,onChange:Pe,maxFiles:5})]}),(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:"Target *"}),(0,f.jsx)(N,{value:je.target_type,onChange:e=>{var t,n,o;return be({...je,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===re||void 0===re||null===(t=re.foodcourts)||void 0===t||null===(n=t[0])||void 0===n||null===(o=n.id)||void 0===o?void 0:o.toString())||"",restaurant_ids:[]})},children:null===re||void 0===re||null===(e=re.targetOptions)||void 0===e?void 0:e.map(e=>(0,f.jsx)("option",{value:e.value,children:e.label},e.value))})]}),"foodcourt"===je.target_type&&(null===re||void 0===re?void 0:re.foodcourts)&&re.foodcourts.length>0&&(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:r("common:noticesPage.selectFoodcourt")}),(0,f.jsx)(N,{value:je.foodcourt_id,onChange:e=>be({...je,foodcourt_id:e.target.value}),children:re.foodcourts.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})]}),("select_restaurants"===je.target_type||"restaurant"===je.target_type)&&(null===re||void 0===re?void 0:re.restaurants)&&(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:r("common:noticesPage.selectRestaurants")}),(0,f.jsxs)(T,{children:[(0,f.jsxs)(Y,{children:[je.restaurant_ids.length," of ",re.restaurants.length," selected"]}),(0,f.jsx)(U,{onClick:()=>{if(!re)return;const e=re.restaurants.map(e=>e.id),t=e.every(e=>je.restaurant_ids.includes(e));be(n=>({...n,restaurant_ids:t?[]:e}))},children:je.restaurant_ids.length===re.restaurants.length?"Deselect All":"Select All"})]}),(0,f.jsxs)(L,{children:[re.restaurants.map(e=>(0,f.jsxs)(R,{children:[(0,f.jsx)("input",{type:"checkbox",checked:je.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void be(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===re.restaurants.length&&(0,f.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]}),(0,f.jsxs)(M,{children:[(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:r("common:noticesPage.category")}),(0,f.jsxs)(N,{value:je.category,onChange:e=>be({...je,category:e.target.value}),children:[(0,f.jsx)("option",{value:"general",children:r("common:noticesPage.general")}),(0,f.jsx)("option",{value:"guide",children:r("common:noticesPage.guide")})]})]}),(0,f.jsxs)($,{children:[(0,f.jsx)(O,{children:r("common:noticesPage.priority")}),(0,f.jsxs)(N,{value:je.priority,onChange:e=>be({...je,priority:e.target.value}),children:[(0,f.jsx)("option",{value:"normal",children:r("common:noticesPage.normal")}),(0,f.jsx)("option",{value:"important",children:r("common:noticesPage.important")}),(0,f.jsx)("option",{value:"urgent",children:r("common:noticesPage.urgent")})]})]})]})]}),Ce&&_e&&(0,f.jsxs)(m.aF,{isOpen:!0,onClose:()=>{ke(!1),Ae(null)},title:_e.title,size:"large",footer:String(_e.author_id)===String(null===X||void 0===X?void 0:X.id)?(0,f.jsx)(V,{children:(0,f.jsx)(Q,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ze})).ok&&(ke(!1),Ae(null),await Promise.all([Ne(),De()]))}catch(t){console.error("Error deleting notice:",t)}})(_e.id),children:r("common:noticesPage.deleteNotice")})}):void 0,children:[(0,f.jsxs)(J,{children:[(0,f.jsxs)(W,{children:["From: ",(0,f.jsx)("strong",{style:{marginLeft:"4px"},children:_e.author_name||(null===(t=_e.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,f.jsx)(W,{children:_e.author_role||(null===(n=_e.author)||void 0===n?void 0:n.role)||""}),(0,f.jsx)(W,{children:(qe=_e.createdAt,new Date(qe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,f.jsx)(E,{priority:_e.priority,children:_e.priority})]}),(0,f.jsx)(G,{children:_e.content.split("\n").map((e,t)=>(0,f.jsxs)(o.Fragment,{children:[t>0&&(0,f.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===_e||void 0===_e?void 0:_e.attachments)&&_e.attachments.length>0&&(0,f.jsx)("div",{style:{marginTop:"16px"},children:(0,f.jsx)(x.A,{attachments:_e.attachments})}),String(_e.author_id)===String(null===X||void 0===X?void 0:X.id)&&_e.recipients&&_e.recipients.length>0&&(0,f.jsxs)(Z,{children:[(0,f.jsx)(q,{children:r("common:noticesPage.recipients")}),(0,f.jsx)(H,{children:_e.recipients.map((e,t)=>{var n,o;return(0,f.jsx)(K,{children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||(null===(o=e.user)||void 0===o?void 0:o.name)||`Recipient ${t+1}`},t)})})]}),(0,f.jsx)(h.A,{entityType:"notice",entityId:String(_e.id),currentUserId:null===X||void 0===X?void 0:X.id,onMarkRead:()=>Se(e=>{const t={...e},n=String(_e.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})]});var qe}}}]);