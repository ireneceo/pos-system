"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2653:(e,t,n)=>{n.d(t,{M:()=>o});var r=n(9950),i=n(4492);function o(e){const[t,n]=(0,i.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},4636:(e,t,n)=>{n.r(t),n.d(t,{default:()=>X});var r=n(9950),i=n(4752),o=n(2853),a=n(1367),s=n(3832),l=n(5665),c=n(2597),d=n(2488),p=n(2653),x=n(7455),h=n(4185),g=n(4302),u=n(9061),m=n(7617),y=n(8409),j=n(5030),v=n(9955),f=n(4414);const b=i.Ay.div`
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
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,F=i.Ay.div`
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
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,C=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,_=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,k=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,B=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,P=i.Ay.span`
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
`,z=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,O=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,D=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,N=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,T=i.Ay.div`
  margin-bottom: 20px;
`,I=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,L=i.Ay.input`
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
`,R=i.Ay.textarea`
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
`,M=i.Ay.select`
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
`,U=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Y=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,G=i.Ay.label`
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
`,W=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,J=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,Z=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,H=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,q=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,K=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,Q=i.Ay.button`
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
`,V=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,X=()=>{var e,t,n;const{t:i}=(0,j.Bd)("common"),{user:X}=(0,a.As)(),[ee,te]=(0,p.M)("received"),[ne,re]=(0,r.useState)([]),[ie,oe]=(0,r.useState)([]),[ae,se]=(0,r.useState)(null),[le,ce]=(0,r.useState)(""),[de,pe]=(0,r.useState)(""),[xe,he]=(0,r.useState)("all"),[ge,ue]=(0,r.useState)("all"),[me,ye]=(0,r.useState)(!1),[je,ve]=(0,r.useState)(!1),[fe,be]=(0,r.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[we,Fe]=(0,r.useState)(!1),[Ae,Ce]=(0,r.useState)([]),[_e,ke]=(0,r.useState)(!1),[Ee,Be]=(0,r.useState)(null),[Pe,Se]=(0,r.useState)({}),[ze,$e]=(0,r.useState)(!1),[Oe,De]=(0,r.useState)(null),Ne=(0,r.useCallback)(()=>({Authorization:`Bearer ${(0,v.c4)()}`,"Content-Type":"application/json"}),[]),Te=async e=>{if(0!==e.length)try{const t=(0,v.c4)(),n=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${n}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Se(e=>({...e,...t}))}}}catch(t){}},Ie=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Ne()});if(e.ok){const t=await e.json();se(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[Ne]),Le=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Ne()});if(e.ok){const t=await e.json(),n=t.data||t,r=Array.isArray(n)?n:[];re(r),Te(r)}}catch(e){console.error("Error fetching received notices:",e)}},[Ne]),Re=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Ne()});if(e.ok){const t=await e.json(),n=t.data||t,r=Array.isArray(n)?n:[];oe(r),Te(r)}}catch(e){console.error("Error fetching sent notices:",e)}},[Ne]),Me=(0,r.useCallback)(async()=>{ye(!0),await Promise.all([Ie(),Le(),Re()]),ye(!1)},[Ie,Le,Re]);(0,r.useEffect)(()=>{X&&Me()},[X,Me]);const Ue=async e=>{Be(e),ke(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:Ne()});if(t.ok){const e=await t.json(),n=e.data||e;Be(n),Le(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Ye=("received"===ee?ne:ie).filter(e=>{const t=!le||e.title.toLowerCase().includes(le.toLowerCase())||e.content.toLowerCase().includes(le.toLowerCase()),n=!de||e.priority===de,r="all"===xe||(e.category||"general")===xe,i="all"===ge||"sent"===ee||e.author_role===ge;return t&&n&&r&&i}),Ge=ne.length,We=ne.filter(e=>!e.read_at).length,Je=ne.filter(e=>"important"===e.priority).length,Ze=ne.filter(e=>"urgent"===e.priority).length,He=ie.length,qe=ie.filter(e=>{const t=new Date,n=new Date(e.createdAt);return n.getMonth()===t.getMonth()&&n.getFullYear()===t.getFullYear()}).length,Ke=ie.filter(e=>"important"===e.priority).length,Qe=ie.filter(e=>"urgent"===e.priority).length,Ve=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const n=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${n} restaurant${1!==n?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Xe=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,et=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,f.jsxs)(s.mc,{children:[(0,f.jsxs)(s.Y9,{children:[(0,f.jsx)(s.hE,{children:i("common:noticesPage.notices")}),(0,f.jsx)(s.ex,{children:(0,f.jsx)(s.$n,{variant:"primary",onClick:()=>{be({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:""}),Ce([]),ve(!0)},children:"New Notice"})})]}),(0,f.jsxs)(s.UC,{children:[(0,f.jsxs)(c.tU,{children:[(0,f.jsxs)(c.oz,{active:"received"===ee,onClick:()=>te("received"),children:["Received",(0,f.jsx)(c.Ex,{count:Ge,showZero:!0})]}),(0,f.jsxs)(c.oz,{active:"sent"===ee,onClick:()=>te("sent"),children:["Sent",(0,f.jsx)(c.Ex,{count:He,showZero:!0})]})]}),"received"===ee?(0,f.jsxs)(l.MD,{children:[(0,f.jsxs)(l.hI,{color:"#635BFF",children:[(0,f.jsx)(l.Os,{children:Ge}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.totalReceived")})]}),(0,f.jsxs)(l.hI,{color:"#F59E0B",children:[(0,f.jsx)(l.Os,{children:We}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.unread")})]}),(0,f.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,f.jsx)(l.Os,{children:Je}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.important")})]}),(0,f.jsxs)(l.hI,{color:"#EF4444",children:[(0,f.jsx)(l.Os,{children:Ze}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.urgent")})]})]}):(0,f.jsxs)(l.MD,{children:[(0,f.jsxs)(l.hI,{color:"#635BFF",children:[(0,f.jsx)(l.Os,{children:He}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.totalSent")})]}),(0,f.jsxs)(l.hI,{color:"#10B981",children:[(0,f.jsx)(l.Os,{children:qe}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.thisMonth")})]}),(0,f.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,f.jsx)(l.Os,{children:Ke}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.important")})]}),(0,f.jsxs)(l.hI,{color:"#EF4444",children:[(0,f.jsx)(l.Os,{children:Qe}),(0,f.jsx)(l.v0,{children:i("common:noticesPage.urgent")})]})]}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,f.jsx)("button",{onClick:()=>he(e),style:{padding:"6px 16px",borderRadius:"20px",border:xe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:xe===e?"#F0EFFF":"white",color:xe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:xe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,f.jsxs)(b,{children:[(0,f.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:le,onChange:e=>ce(e.target.value)}),"received"===ee&&(0,f.jsxs)(d.Jt,{value:ge,onChange:e=>ue(e.target.value),children:[(0,f.jsx)("option",{value:"all",children:i("common:noticesPage.allSenders")}),(0,f.jsx)("option",{value:"System Admin",children:i("common:noticesPage.systemAdmin")}),(0,f.jsx)("option",{value:"Brand General",children:i("common:noticesPage.brandGeneral")}),(0,f.jsx)("option",{value:"Foodcourt General",children:i("common:noticesPage.foodcourtGeneral")}),(0,f.jsx)("option",{value:"Restaurant Owner",children:i("common:noticesPage.restaurantOwner")})]}),(0,f.jsxs)(d.Jt,{value:de,onChange:e=>pe(e.target.value),children:[(0,f.jsx)("option",{value:"",children:i("common:noticesPage.allPriorities")}),(0,f.jsx)("option",{value:"normal",children:i("common:noticesPage.normal")}),(0,f.jsx)("option",{value:"important",children:i("common:noticesPage.important")}),(0,f.jsx)("option",{value:"urgent",children:i("common:noticesPage.urgent")})]})]}),(0,f.jsxs)(w,{children:[me&&0===Ye.length&&(0,f.jsx)(o.pp,{children:(0,f.jsx)("p",{children:i("common:noticesPage.loadingNotices")})}),!me&&0===Ye.length&&(0,f.jsxs)(o.pp,{children:[(0,f.jsx)("h3",{children:i("common:noticesPage.noNoticesFound")}),(0,f.jsx)("p",{children:"received"===ee?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Ye.map(e=>{var t,n;return(0,f.jsxs)(F,{unread:"received"===ee&&!e.read_at,onClick:()=>Ue(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,f.jsxs)(A,{children:[(0,f.jsxs)(C,{children:["received"===ee&&!e.read_at&&(0,f.jsx)(_,{}),(0,f.jsx)(k,{children:e.title})]}),(0,f.jsxs)(E,{children:["guide"===e.category&&(0,f.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:i("common:noticesPage.guide")}),(0,f.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,f.jsx)(S,{children:e.content}),(0,f.jsxs)(z,{children:[(0,f.jsx)($,{children:"received"===ee?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(D,{children:[e.author_name||"Unknown",(0,f.jsx)(P,{children:e.author_role||"Admin"})]})}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(D,{children:["To: ",Ve(e)]}),(0,f.jsxs)(D,{children:[Xe(e),"/",et(e)," read"]})]})}),(0,f.jsxs)(O,{children:[e.commentCount>0&&(0,f.jsxs)(N,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Pe[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,f.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Pe[String(e.id)].unread_count," new"]})]}),(0,f.jsx)(D,{children:(n=e.createdAt,new Date(n).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),je&&(0,f.jsxs)(y.aF,{isOpen:!0,onClose:()=>ve(!1),title:"New Notice",maxWidth:"720px",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s.$n,{variant:"secondary",onClick:()=>ve(!1),children:i("common:noticesPage.cancel")}),(0,f.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(fe.title.trim()&&fe.content.trim()&&fe.target_type){Fe(!0);try{const e={title:fe.title.trim(),content:fe.content.trim(),target_type:fe.target_type,priority:fe.priority,category:fe.category,attachments:Ae.length>0?Ae:void 0};"brand"===fe.target_type&&fe.brand_id&&(e.brand_id=Number(fe.brand_id)),"select_restaurants"===fe.target_type&&fe.restaurant_ids.length>0&&(e.restaurant_ids=fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Ne(),body:JSON.stringify(e)})).ok&&(ve(!1),Ce([]),te("sent"),Re())}catch(e){console.error("Error creating notice:",e)}finally{Fe(!1)}}},disabled:we||!fe.title.trim()||!fe.content.trim()||!fe.target_type||"brand"===fe.target_type&&!fe.brand_id||"select_restaurants"===fe.target_type&&0===fe.restaurant_ids.length,children:we?"Sending...":"Send Notice"})]}),children:[(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:"Title *"}),(0,f.jsx)(L,{type:"text",placeholder:"Enter notice title",value:fe.title,onChange:e=>be({...fe,title:e.target.value})})]}),(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:"Content *"}),(0,f.jsx)(R,{placeholder:"Enter notice content...",value:fe.content,onChange:e=>be({...fe,content:e.target.value})})]}),(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:i("common:noticesPage.attachments")}),(0,f.jsx)(x.A,{files:Ae,onChange:Ce,maxFiles:5})]}),(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:"Target Type *"}),(0,f.jsxs)(M,{value:fe.target_type,onChange:e=>be({...fe,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,f.jsx)("option",{value:"",children:i("common:noticesPage.selectTarget")}),(null===ae||void 0===ae||null===(e=ae.targetOptions)||void 0===e?void 0:e.map(e=>(0,f.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("option",{value:"brand",children:i("common:noticesPage.byBrand")}),(0,f.jsx)("option",{value:"select_restaurants",children:i("common:noticesPage.selectRestaurants")})]})]})]}),"brand"===fe.target_type&&(null===ae||void 0===ae?void 0:ae.brands)&&(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:"Select Brand *"}),(0,f.jsxs)(M,{value:fe.brand_id,onChange:e=>be({...fe,brand_id:e.target.value}),children:[(0,f.jsx)("option",{value:"",children:i("common:noticesPage.chooseABrand")}),ae.brands.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===fe.target_type&&(null===ae||void 0===ae?void 0:ae.restaurants)&&(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:"Select Restaurants *"}),(0,f.jsxs)(Y,{children:[ae.restaurants.map(e=>(0,f.jsxs)(G,{children:[(0,f.jsx)("input",{type:"checkbox",checked:fe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void be(e=>{const n=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:n}});var t}}),e.name]},e.id)),0===ae.restaurants.length&&(0,f.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,f.jsxs)(W,{children:[fe.restaurant_ids.length," restaurant",1!==fe.restaurant_ids.length?"s":""," selected"]})]}),(0,f.jsxs)(U,{children:[(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:i("common:noticesPage.category")}),(0,f.jsxs)(M,{value:fe.category,onChange:e=>be({...fe,category:e.target.value}),children:[(0,f.jsx)("option",{value:"general",children:i("common:noticesPage.general")}),(0,f.jsx)("option",{value:"guide",children:i("common:noticesPage.guide")})]})]}),(0,f.jsxs)(T,{children:[(0,f.jsx)(I,{children:i("common:noticesPage.priority")}),(0,f.jsxs)(M,{value:fe.priority,onChange:e=>be({...fe,priority:e.target.value}),children:[(0,f.jsx)("option",{value:"normal",children:i("common:noticesPage.normal")}),(0,f.jsx)("option",{value:"important",children:i("common:noticesPage.important")}),(0,f.jsx)("option",{value:"urgent",children:i("common:noticesPage.urgent")})]})]})]})]}),_e&&Ee&&(0,f.jsxs)(y.aF,{isOpen:!0,onClose:()=>{ke(!1),Be(null)},title:Ee.title,size:"large",headerActions:(0,f.jsxs)(V,{children:[(0,f.jsx)(B,{priority:Ee.priority,children:Ee.priority}),(nt=Ee,String(nt.author_id)===String(null===X||void 0===X?void 0:X.id)&&(0,f.jsx)(Q,{onClick:()=>{return e=Ee.id,De(e),void $e(!0);var e},children:i("common:noticesPage.delete")}))]}),footer:(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(s.$n,{variant:"secondary",onClick:()=>{ke(!1),Be(null)},children:i("common:noticesPage.close")})}),children:[(0,f.jsxs)(Z,{children:[(0,f.jsxs)(H,{children:[(0,f.jsx)(q,{children:i("common:noticesPage.from")}),(0,f.jsxs)(K,{children:[Ee.author_name||(null===(t=Ee.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",Ee.author_role||(null===(n=Ee.author)||void 0===n?void 0:n.role)||"N/A",")"]})]}),(0,f.jsxs)(H,{children:[(0,f.jsx)(q,{children:i("common:noticesPage.to")}),(0,f.jsx)(K,{children:Ve(Ee)})]}),(0,f.jsxs)(H,{children:[(0,f.jsx)(q,{children:i("common:noticesPage.date")}),(0,f.jsx)(K,{children:(tt=Ee.createdAt,new Date(tt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),Ee.recipients&&Ee.recipients.length>0&&(0,f.jsxs)(H,{children:[(0,f.jsx)(q,{children:i("common:noticesPage.readStatus")}),(0,f.jsxs)(K,{children:[Xe(Ee),"/",et(Ee)," read"]})]})]}),(0,f.jsx)(J,{children:Ee.content.split("\n").map((e,t)=>(0,f.jsxs)(r.Fragment,{children:[t>0&&(0,f.jsx)("br",{}),(0,u.c)(e)]},t))}),(null===Ee||void 0===Ee?void 0:Ee.attachments)&&Ee.attachments.length>0&&(0,f.jsx)(h.A,{attachments:Ee.attachments}),(0,f.jsx)(g.A,{entityType:"notice",entityId:String(Ee.id),currentUserId:null===X||void 0===X?void 0:X.id,onMarkRead:()=>Se(e=>{const t={...e},n=String(Ee.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]}),(0,f.jsx)(m.A,{isOpen:ze,title:"Delete Notice",message:"Are you sure you want to delete this notice?",onConfirm:async()=>{if(Oe){$e(!1);try{(await fetch(`/api/notices/${Oe}`,{method:"DELETE",headers:Ne()})).ok&&(ke(!1),Be(null),Re(),Le())}catch(e){console.error("Error deleting notice:",e)}finally{De(null)}}},onCancel:()=>{$e(!1),De(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]});var tt,nt}},7617:(e,t,n)=>{n.d(t,{A:()=>h});n(9950);var r=n(7119),i=n(4752),o=n(9610),a=n(4414);const s=i.Ay.div`
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