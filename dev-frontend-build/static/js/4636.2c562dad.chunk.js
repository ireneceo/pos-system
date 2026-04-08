"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2653:(e,t,n)=>{n.d(t,{M:()=>o});var r=n(9950),i=n(4492);function o(e){const[t,n]=(0,i.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},4636:(e,t,n)=>{n.r(t),n.d(t,{default:()=>V});var r=n(9950),i=n(4752),o=n(2853),a=n(1367),s=n(3832),l=n(5665),c=n(2597),d=n(2488),p=n(2653),x=n(7455),h=n(4185),g=n(4302),u=n(9061),m=n(7617),y=n(8409),j=n(5030),v=n(4414);const f=i.Ay.div`
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
`,b=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

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
`,A=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,C=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,_=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,E=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,B=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,S=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,P=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,O=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,D=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,N=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,I=i.Ay.input`
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
`,L=i.Ay.textarea`
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
`,R=i.Ay.select`
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
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,U=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,Y=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,G=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,W=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,J=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,Z=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,H=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,q=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,K=i.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,Q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,V=()=>{var e,t,n;const{t:i}=(0,j.Bd)("common"),{user:V}=(0,a.As)(),[X,ee]=(0,p.M)("received"),[te,ne]=(0,r.useState)([]),[re,ie]=(0,r.useState)([]),[oe,ae]=(0,r.useState)(null),[se,le]=(0,r.useState)(""),[ce,de]=(0,r.useState)(""),[pe,xe]=(0,r.useState)("all"),[he,ge]=(0,r.useState)("all"),[ue,me]=(0,r.useState)(!1),[ye,je]=(0,r.useState)(!1),[ve,fe]=(0,r.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[be,we]=(0,r.useState)(!1),[Fe,Ae]=(0,r.useState)([]),[Ce,_e]=(0,r.useState)(!1),[ke,Ee]=(0,r.useState)(null),[Be,Se]=(0,r.useState)({}),[Pe,ze]=(0,r.useState)(!1),[$e,Oe]=(0,r.useState)(null),De=(0,r.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Ne=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Se(e=>({...e,...t}))}}}catch(t){}},Te=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:De()});if(e.ok){const t=await e.json();ae(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[De]),Ie=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:De()});if(e.ok){const t=await e.json(),n=t.data||t,r=Array.isArray(n)?n:[];ne(r),Ne(r)}}catch(e){console.error("Error fetching received notices:",e)}},[De]),Le=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:De()});if(e.ok){const t=await e.json(),n=t.data||t,r=Array.isArray(n)?n:[];ie(r),Ne(r)}}catch(e){console.error("Error fetching sent notices:",e)}},[De]),Re=(0,r.useCallback)(async()=>{me(!0),await Promise.all([Te(),Ie(),Le()]),me(!1)},[Te,Ie,Le]);(0,r.useEffect)(()=>{V&&Re()},[V,Re]);const Me=async e=>{Ee(e),_e(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:De()});if(t.ok){const e=await t.json(),n=e.data||e;Ee(n),Ie(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Ue=("received"===X?te:re).filter(e=>{const t=!se||e.title.toLowerCase().includes(se.toLowerCase())||e.content.toLowerCase().includes(se.toLowerCase()),n=!ce||e.priority===ce,r="all"===pe||(e.category||"general")===pe,i="all"===he||"sent"===X||e.author_role===he;return t&&n&&r&&i}),Ye=te.length,Ge=te.filter(e=>!e.read_at).length,We=te.filter(e=>"important"===e.priority).length,Je=te.filter(e=>"urgent"===e.priority).length,Ze=re.length,He=re.filter(e=>{const t=new Date,n=new Date(e.createdAt);return n.getMonth()===t.getMonth()&&n.getFullYear()===t.getFullYear()}).length,qe=re.filter(e=>"important"===e.priority).length,Ke=re.filter(e=>"urgent"===e.priority).length,Qe=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const n=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${n} restaurant${1!==n?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Ve=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Xe=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,v.jsxs)(s.mc,{children:[(0,v.jsxs)(s.Y9,{children:[(0,v.jsx)(s.hE,{children:i("common:noticesPage.notices")}),(0,v.jsx)(s.ex,{children:(0,v.jsx)(s.$n,{variant:"primary",onClick:()=>{fe({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:""}),Ae([]),je(!0)},children:"New Notice"})})]}),(0,v.jsxs)(s.UC,{children:[(0,v.jsxs)(c.tU,{children:[(0,v.jsxs)(c.oz,{active:"received"===X,onClick:()=>ee("received"),children:["Received",(0,v.jsx)(c.Ex,{count:Ye,showZero:!0})]}),(0,v.jsxs)(c.oz,{active:"sent"===X,onClick:()=>ee("sent"),children:["Sent",(0,v.jsx)(c.Ex,{count:Ze,showZero:!0})]})]}),"received"===X?(0,v.jsxs)(l.MD,{children:[(0,v.jsxs)(l.hI,{color:"#635BFF",children:[(0,v.jsx)(l.Os,{children:Ye}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.totalReceived")})]}),(0,v.jsxs)(l.hI,{color:"#F59E0B",children:[(0,v.jsx)(l.Os,{children:Ge}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.unread")})]}),(0,v.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,v.jsx)(l.Os,{children:We}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.important")})]}),(0,v.jsxs)(l.hI,{color:"#EF4444",children:[(0,v.jsx)(l.Os,{children:Je}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.urgent")})]})]}):(0,v.jsxs)(l.MD,{children:[(0,v.jsxs)(l.hI,{color:"#635BFF",children:[(0,v.jsx)(l.Os,{children:Ze}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.totalSent")})]}),(0,v.jsxs)(l.hI,{color:"#10B981",children:[(0,v.jsx)(l.Os,{children:He}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.thisMonth")})]}),(0,v.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,v.jsx)(l.Os,{children:qe}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.important")})]}),(0,v.jsxs)(l.hI,{color:"#EF4444",children:[(0,v.jsx)(l.Os,{children:Ke}),(0,v.jsx)(l.v0,{children:i("common:noticesPage.urgent")})]})]}),(0,v.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,v.jsx)("button",{onClick:()=>xe(e),style:{padding:"6px 16px",borderRadius:"20px",border:pe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:pe===e?"#F0EFFF":"white",color:pe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:pe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,v.jsxs)(f,{children:[(0,v.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:se,onChange:e=>le(e.target.value)}),"received"===X&&(0,v.jsxs)(d.Jt,{value:he,onChange:e=>ge(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:i("common:noticesPage.allSenders")}),(0,v.jsx)("option",{value:"System Admin",children:i("common:noticesPage.systemAdmin")}),(0,v.jsx)("option",{value:"Brand General",children:i("common:noticesPage.brandGeneral")}),(0,v.jsx)("option",{value:"Foodcourt General",children:i("common:noticesPage.foodcourtGeneral")}),(0,v.jsx)("option",{value:"Restaurant Owner",children:i("common:noticesPage.restaurantOwner")})]}),(0,v.jsxs)(d.Jt,{value:ce,onChange:e=>de(e.target.value),children:[(0,v.jsx)("option",{value:"",children:i("common:noticesPage.allPriorities")}),(0,v.jsx)("option",{value:"normal",children:i("common:noticesPage.normal")}),(0,v.jsx)("option",{value:"important",children:i("common:noticesPage.important")}),(0,v.jsx)("option",{value:"urgent",children:i("common:noticesPage.urgent")})]})]}),(0,v.jsxs)(b,{children:[ue&&0===Ue.length&&(0,v.jsx)(o.pp,{children:(0,v.jsx)("p",{children:i("common:noticesPage.loadingNotices")})}),!ue&&0===Ue.length&&(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h3",{children:i("common:noticesPage.noNoticesFound")}),(0,v.jsx)("p",{children:"received"===X?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Ue.map(e=>{var t,n;return(0,v.jsxs)(w,{unread:"received"===X&&!e.read_at,onClick:()=>Me(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,v.jsxs)(F,{children:[(0,v.jsxs)(A,{children:["received"===X&&!e.read_at&&(0,v.jsx)(C,{}),(0,v.jsx)(_,{children:e.title})]}),(0,v.jsxs)(k,{children:["guide"===e.category&&(0,v.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:i("common:noticesPage.guide")}),(0,v.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,v.jsx)(S,{children:e.content}),(0,v.jsxs)(P,{children:[(0,v.jsx)(z,{children:"received"===X?(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(O,{children:[e.author_name||"Unknown",(0,v.jsx)(B,{children:e.author_role||"Admin"})]})}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(O,{children:["To: ",Qe(e)]}),(0,v.jsxs)(O,{children:[Ve(e),"/",Xe(e)," read"]})]})}),(0,v.jsxs)($,{children:[e.commentCount>0&&(0,v.jsxs)(D,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Be[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,v.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Be[String(e.id)].unread_count," new"]})]}),(0,v.jsx)(O,{children:(n=e.createdAt,new Date(n).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ye&&(0,v.jsxs)(y.aF,{isOpen:!0,onClose:()=>je(!1),title:"New Notice",maxWidth:"720px",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s.$n,{variant:"secondary",onClick:()=>je(!1),children:i("common:noticesPage.cancel")}),(0,v.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(ve.title.trim()&&ve.content.trim()&&ve.target_type){we(!0);try{const e={title:ve.title.trim(),content:ve.content.trim(),target_type:ve.target_type,priority:ve.priority,category:ve.category,attachments:Fe.length>0?Fe:void 0};"brand"===ve.target_type&&ve.brand_id&&(e.brand_id=Number(ve.brand_id)),"select_restaurants"===ve.target_type&&ve.restaurant_ids.length>0&&(e.restaurant_ids=ve.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:De(),body:JSON.stringify(e)})).ok&&(je(!1),Ae([]),ee("sent"),Le())}catch(e){console.error("Error creating notice:",e)}finally{we(!1)}}},disabled:be||!ve.title.trim()||!ve.content.trim()||!ve.target_type||"brand"===ve.target_type&&!ve.brand_id||"select_restaurants"===ve.target_type&&0===ve.restaurant_ids.length,children:be?"Sending...":"Send Notice"})]}),children:[(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:"Title *"}),(0,v.jsx)(I,{type:"text",placeholder:"Enter notice title",value:ve.title,onChange:e=>fe({...ve,title:e.target.value})})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:"Content *"}),(0,v.jsx)(L,{placeholder:"Enter notice content...",value:ve.content,onChange:e=>fe({...ve,content:e.target.value})})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:i("common:noticesPage.attachments")}),(0,v.jsx)(x.A,{files:Fe,onChange:Ae,maxFiles:5})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:"Target Type *"}),(0,v.jsxs)(R,{value:ve.target_type,onChange:e=>fe({...ve,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,v.jsx)("option",{value:"",children:i("common:noticesPage.selectTarget")}),(null===oe||void 0===oe||null===(e=oe.targetOptions)||void 0===e?void 0:e.map(e=>(0,v.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"brand",children:i("common:noticesPage.byBrand")}),(0,v.jsx)("option",{value:"select_restaurants",children:i("common:noticesPage.selectRestaurants")})]})]})]}),"brand"===ve.target_type&&(null===oe||void 0===oe?void 0:oe.brands)&&(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:"Select Brand *"}),(0,v.jsxs)(R,{value:ve.brand_id,onChange:e=>fe({...ve,brand_id:e.target.value}),children:[(0,v.jsx)("option",{value:"",children:i("common:noticesPage.chooseABrand")}),oe.brands.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===ve.target_type&&(null===oe||void 0===oe?void 0:oe.restaurants)&&(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:"Select Restaurants *"}),(0,v.jsxs)(U,{children:[oe.restaurants.map(e=>(0,v.jsxs)(Y,{children:[(0,v.jsx)("input",{type:"checkbox",checked:ve.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void fe(e=>{const n=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:n}});var t}}),e.name]},e.id)),0===oe.restaurants.length&&(0,v.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,v.jsxs)(G,{children:[ve.restaurant_ids.length," restaurant",1!==ve.restaurant_ids.length?"s":""," selected"]})]}),(0,v.jsxs)(M,{children:[(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:i("common:noticesPage.category")}),(0,v.jsxs)(R,{value:ve.category,onChange:e=>fe({...ve,category:e.target.value}),children:[(0,v.jsx)("option",{value:"general",children:i("common:noticesPage.general")}),(0,v.jsx)("option",{value:"guide",children:i("common:noticesPage.guide")})]})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)(T,{children:i("common:noticesPage.priority")}),(0,v.jsxs)(R,{value:ve.priority,onChange:e=>fe({...ve,priority:e.target.value}),children:[(0,v.jsx)("option",{value:"normal",children:i("common:noticesPage.normal")}),(0,v.jsx)("option",{value:"important",children:i("common:noticesPage.important")}),(0,v.jsx)("option",{value:"urgent",children:i("common:noticesPage.urgent")})]})]})]})]}),Ce&&ke&&(0,v.jsxs)(y.aF,{isOpen:!0,onClose:()=>{_e(!1),Ee(null)},title:ke.title,size:"large",headerActions:(0,v.jsxs)(Q,{children:[(0,v.jsx)(E,{priority:ke.priority,children:ke.priority}),(tt=ke,String(tt.author_id)===String(null===V||void 0===V?void 0:V.id)&&(0,v.jsx)(K,{onClick:()=>{return e=ke.id,Oe(e),void ze(!0);var e},children:i("common:noticesPage.delete")}))]}),footer:(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(s.$n,{variant:"secondary",onClick:()=>{_e(!1),Ee(null)},children:i("common:noticesPage.close")})}),children:[(0,v.jsxs)(J,{children:[(0,v.jsxs)(Z,{children:[(0,v.jsx)(H,{children:i("common:noticesPage.from")}),(0,v.jsxs)(q,{children:[ke.author_name||(null===(t=ke.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",ke.author_role||(null===(n=ke.author)||void 0===n?void 0:n.role)||"N/A",")"]})]}),(0,v.jsxs)(Z,{children:[(0,v.jsx)(H,{children:i("common:noticesPage.to")}),(0,v.jsx)(q,{children:Qe(ke)})]}),(0,v.jsxs)(Z,{children:[(0,v.jsx)(H,{children:i("common:noticesPage.date")}),(0,v.jsx)(q,{children:(et=ke.createdAt,new Date(et).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),ke.recipients&&ke.recipients.length>0&&(0,v.jsxs)(Z,{children:[(0,v.jsx)(H,{children:i("common:noticesPage.readStatus")}),(0,v.jsxs)(q,{children:[Ve(ke),"/",Xe(ke)," read"]})]})]}),(0,v.jsx)(W,{children:ke.content.split("\n").map((e,t)=>(0,v.jsxs)(r.Fragment,{children:[t>0&&(0,v.jsx)("br",{}),(0,u.c)(e)]},t))}),(null===ke||void 0===ke?void 0:ke.attachments)&&ke.attachments.length>0&&(0,v.jsx)(h.A,{attachments:ke.attachments}),(0,v.jsx)(g.A,{entityType:"notice",entityId:String(ke.id),currentUserId:null===V||void 0===V?void 0:V.id,onMarkRead:()=>Se(e=>{const t={...e},n=String(ke.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]}),(0,v.jsx)(m.A,{isOpen:Pe,title:"Delete Notice",message:"Are you sure you want to delete this notice?",onConfirm:async()=>{if($e){ze(!1);try{(await fetch(`/api/notices/${$e}`,{method:"DELETE",headers:De()})).ok&&(_e(!1),Ee(null),Le(),Ie())}catch(e){console.error("Error deleting notice:",e)}finally{Oe(null)}}},onCancel:()=>{ze(!1),Oe(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]});var et,tt}},7617:(e,t,n)=>{n.d(t,{A:()=>h});n(9950);var r=n(7119),i=n(4752),o=n(9610),a=n(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,c=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,h=e=>{let{isOpen:t,title:n,message:i,onConfirm:h,onCancel:g,confirmText:u="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:n}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(x,{variant:"primary",type:y,onClick:h,children:u})]})]})}),document.body):null}}}]);