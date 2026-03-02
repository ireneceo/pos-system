"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2255:(e,t,r)=>{r.r(t),r.d(t,{default:()=>re});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(3832),d=r(5665),l=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(9061),m=r(4414);const y=i.Ay.div`
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
`,j=i.Ay.div`
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
`,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,v=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,w=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,F=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,k=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,C=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,_=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,B=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,S=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,z=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,N=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,$=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1100;
  overflow-y: auto;
  padding: 40px 0;
`,D=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,I=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=i.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,T=i.Ay.div`
  padding: 24px;
`,R=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=i.Ay.input`
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
`,P=i.Ay.textarea`
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
`,W=i.Ay.select`
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
`,Y=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,J=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,Q=i.Ay.label`
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
`,Z=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,H=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,K=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,V=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,X=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,ee=i.Ay.button`
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
`,te=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,re=()=>{var e,t,r;const{user:i}=(0,o.As)(),[re,ne]=(0,p.M)("received"),[ie,ae]=(0,n.useState)([]),[oe,se]=(0,n.useState)([]),[de,le]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(""),[xe,he]=(0,n.useState)(""),[ue,ge]=(0,n.useState)("all"),[me,ye]=(0,n.useState)("all"),[be,je]=(0,n.useState)(!1),[fe,ve]=(0,n.useState)(!1),[we,Fe]=(0,n.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[Ae,ke]=(0,n.useState)(!1),[Ce,_e]=(0,n.useState)([]),[Ee,Be]=(0,n.useState)(!1),[Se,ze]=(0,n.useState)(null),[Ne,$e]=(0,n.useState)({}),De=(0,n.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Ie=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),$e(e=>({...e,...t}))}}}catch(t){}},Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:De()});if(e.ok){const t=await e.json();le(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[De]),Ue=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:De()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];ae(n),Ie(n)}}catch(e){console.error("Error fetching received notices:",e)}},[De]),Te=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:De()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];se(n),Ie(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[De]),Re=(0,n.useCallback)(async()=>{je(!0),await Promise.all([Oe(),Ue(),Te()]),je(!1)},[Oe,Ue,Te]);(0,n.useEffect)(()=>{i&&Re()},[i,Re]);const Le=async e=>{ze(e),Be(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:De()});if(t.ok){const e=await t.json(),r=e.data||e;ze(r),Ue(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Ge=("received"===re?ie:oe).filter(e=>{const t=!ce||e.title.toLowerCase().includes(ce.toLowerCase())||e.content.toLowerCase().includes(ce.toLowerCase()),r=!xe||e.priority===xe,n="all"===ue||(e.category||"general")===ue,i="all"===me||"sent"===re||e.author_role===me;return t&&r&&n&&i}),Me=ie.length,Pe=ie.filter(e=>!e.read_at).length,We=ie.filter(e=>"important"===e.priority).length,Ye=ie.filter(e=>"urgent"===e.priority).length,Je=oe.length,Qe=oe.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Ze=oe.filter(e=>"important"===e.priority).length,qe=oe.filter(e=>"urgent"===e.priority).length,He=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Ke=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Ve=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,m.jsxs)(s.mc,{children:[(0,m.jsxs)(s.Y9,{children:[(0,m.jsx)(s.hE,{children:"Notices"}),(0,m.jsx)(s.ex,{children:(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{Fe({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),_e([]),ve(!0)},children:"New Notice"})})]}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(l.tU,{children:[(0,m.jsxs)(l.oz,{active:"received"===re,onClick:()=>ne("received"),children:["Received (",Me,")"]}),(0,m.jsxs)(l.oz,{active:"sent"===re,onClick:()=>ne("sent"),children:["Sent (",Je,")"]})]}),"received"===re?(0,m.jsxs)(d.MD,{children:[(0,m.jsxs)(d.hI,{color:"#635BFF",children:[(0,m.jsx)(d.Os,{children:Me}),(0,m.jsx)(d.v0,{children:"Total Received"})]}),(0,m.jsxs)(d.hI,{color:"#F59E0B",children:[(0,m.jsx)(d.Os,{children:Pe}),(0,m.jsx)(d.v0,{children:"Unread"})]}),(0,m.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,m.jsx)(d.Os,{children:We}),(0,m.jsx)(d.v0,{children:"Important"})]}),(0,m.jsxs)(d.hI,{color:"#EF4444",children:[(0,m.jsx)(d.Os,{children:Ye}),(0,m.jsx)(d.v0,{children:"Urgent"})]})]}):(0,m.jsxs)(d.MD,{children:[(0,m.jsxs)(d.hI,{color:"#635BFF",children:[(0,m.jsx)(d.Os,{children:Je}),(0,m.jsx)(d.v0,{children:"Total Sent"})]}),(0,m.jsxs)(d.hI,{color:"#10B981",children:[(0,m.jsx)(d.Os,{children:Qe}),(0,m.jsx)(d.v0,{children:"This Month"})]}),(0,m.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,m.jsx)(d.Os,{children:Ze}),(0,m.jsx)(d.v0,{children:"Important"})]}),(0,m.jsxs)(d.hI,{color:"#EF4444",children:[(0,m.jsx)(d.Os,{children:qe}),(0,m.jsx)(d.v0,{children:"Urgent"})]})]}),(0,m.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,m.jsx)("button",{onClick:()=>ge(e),style:{padding:"6px 16px",borderRadius:"20px",border:ue===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ue===e?"#F0EFFF":"white",color:ue===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ue===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,m.jsxs)(y,{children:[(0,m.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:ce,onChange:e=>pe(e.target.value)}),"received"===re&&(0,m.jsxs)(c.Jt,{value:me,onChange:e=>ye(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Senders"}),(0,m.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,m.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,m.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,m.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,m.jsxs)(c.Jt,{value:xe,onChange:e=>he(e.target.value),children:[(0,m.jsx)("option",{value:"",children:"All Priorities"}),(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,m.jsxs)(b,{children:[be&&0===Ge.length&&(0,m.jsx)(a.pp,{children:(0,m.jsx)("p",{children:"Loading notices..."})}),!be&&0===Ge.length&&(0,m.jsxs)(a.pp,{children:[(0,m.jsx)("h3",{children:"No notices found"}),(0,m.jsx)("p",{children:"received"===re?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Ge.map(e=>{var t,r;return(0,m.jsxs)(j,{unread:"received"===re&&!e.read_at,onClick:()=>Le(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,m.jsxs)(f,{children:[(0,m.jsxs)(v,{children:["received"===re&&!e.read_at&&(0,m.jsx)(w,{}),(0,m.jsx)(F,{children:e.title})]}),(0,m.jsxs)(A,{children:["guide"===e.category&&(0,m.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,m.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,m.jsx)(_,{children:e.content}),(0,m.jsxs)(E,{children:[(0,m.jsx)(B,{children:"received"===re?(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(z,{children:[e.author_name||"Unknown",(0,m.jsx)(C,{children:e.author_role||"Admin"})]})}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(z,{children:["To: ",He(e)]}),(0,m.jsxs)(z,{children:[Ke(e),"/",Ve(e)," read"]})]})}),(0,m.jsxs)(S,{children:[e.commentCount>0&&(0,m.jsxs)(N,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Ne[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ne[String(e.id)].unread_count," new"]})]}),(0,m.jsx)(z,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),fe&&(0,m.jsx)($,{onClick:()=>ve(!1),children:(0,m.jsxs)(D,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(I,{children:[(0,m.jsx)(O,{children:"New Notice"}),(0,m.jsx)(U,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,m.jsxs)(T,{children:[(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Title *"}),(0,m.jsx)(M,{type:"text",placeholder:"Enter notice title",value:we.title,onChange:e=>Fe({...we,title:e.target.value})})]}),(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Content *"}),(0,m.jsx)(P,{placeholder:"Enter notice content...",value:we.content,onChange:e=>Fe({...we,content:e.target.value})})]}),(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Attachments"}),(0,m.jsx)(x.A,{files:Ce,onChange:_e,maxFiles:5})]}),(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Target Type *"}),(0,m.jsxs)(W,{value:we.target_type,onChange:e=>Fe({...we,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,m.jsx)("option",{value:"",children:"Select target..."}),(null===de||void 0===de||null===(e=de.targetOptions)||void 0===e?void 0:e.map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("option",{value:"brand",children:"By Brand"}),(0,m.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),"brand"===we.target_type&&(null===de||void 0===de?void 0:de.brands)&&(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Select Brand *"}),(0,m.jsxs)(W,{value:we.brand_id,onChange:e=>Fe({...we,brand_id:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"Choose a brand..."}),de.brands.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===we.target_type&&(null===de||void 0===de?void 0:de.restaurants)&&(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Select Restaurants *"}),(0,m.jsxs)(J,{children:[de.restaurants.map(e=>(0,m.jsxs)(Q,{children:[(0,m.jsx)("input",{type:"checkbox",checked:we.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void Fe(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===de.restaurants.length&&(0,m.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,m.jsxs)(Z,{children:[we.restaurant_ids.length," restaurant",1!==we.restaurant_ids.length?"s":""," selected"]})]}),(0,m.jsxs)(Y,{children:[(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Category"}),(0,m.jsxs)(W,{value:we.category,onChange:e=>Fe({...we,category:e.target.value}),children:[(0,m.jsx)("option",{value:"general",children:"General"}),(0,m.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,m.jsxs)(L,{children:[(0,m.jsx)(G,{children:"Priority"}),(0,m.jsxs)(W,{value:we.priority,onChange:e=>Fe({...we,priority:e.target.value}),children:[(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(we.title.trim()&&we.content.trim()&&we.target_type){ke(!0);try{const e={title:we.title.trim(),content:we.content.trim(),target_type:we.target_type,priority:we.priority,category:we.category,attachments:Ce.length>0?Ce:void 0};"brand"===we.target_type&&we.brand_id&&(e.brand_id=Number(we.brand_id)),"select_restaurants"===we.target_type&&we.restaurant_ids.length>0&&(e.restaurant_ids=we.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:De(),body:JSON.stringify(e)})).ok&&(ve(!1),_e([]),ne("sent"),Te())}catch(e){console.error("Error creating notice:",e)}finally{ke(!1)}}},disabled:Ae||!we.title.trim()||!we.content.trim()||!we.target_type||"brand"===we.target_type&&!we.brand_id||"select_restaurants"===we.target_type&&0===we.restaurant_ids.length,children:Ae?"Sending...":"Send Notice"})]})]})}),Ee&&Se&&(0,m.jsx)($,{onClick:()=>{Be(!1),ze(null)},children:(0,m.jsxs)(D,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(I,{children:[(0,m.jsx)(O,{children:Se.title}),(0,m.jsxs)(te,{children:[(0,m.jsx)(k,{priority:Se.priority,children:Se.priority}),(et=Se,String(et.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,m.jsx)(ee,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:De()})).ok&&(Be(!1),ze(null),Te(),Ue())}catch(t){console.error("Error deleting notice:",t)}})(Se.id),children:"Delete"})),(0,m.jsx)(U,{onClick:()=>{Be(!1),ze(null)},children:"\xd7"})]})]}),(0,m.jsxs)(T,{children:[(0,m.jsxs)(H,{children:[(0,m.jsxs)(K,{children:[(0,m.jsx)(V,{children:"From"}),(0,m.jsxs)(X,{children:[Se.author_name||(null===(t=Se.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",Se.author_role||(null===(r=Se.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,m.jsxs)(K,{children:[(0,m.jsx)(V,{children:"To"}),(0,m.jsx)(X,{children:He(Se)})]}),(0,m.jsxs)(K,{children:[(0,m.jsx)(V,{children:"Date"}),(0,m.jsx)(X,{children:(Xe=Se.createdAt,new Date(Xe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),Se.recipients&&Se.recipients.length>0&&(0,m.jsxs)(K,{children:[(0,m.jsx)(V,{children:"Read Status"}),(0,m.jsxs)(X,{children:[Ke(Se),"/",Ve(Se)," read"]})]})]}),(0,m.jsx)(q,{children:Se.content.split("\n").map((e,t)=>(0,m.jsxs)(n.Fragment,{children:[t>0&&(0,m.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===Se||void 0===Se?void 0:Se.attachments)&&Se.attachments.length>0&&(0,m.jsx)(h.A,{attachments:Se.attachments}),(0,m.jsx)(u.A,{entityType:"notice",entityId:String(Se.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>$e(e=>{const t={...e},r=String(Se.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]});var Xe,et}},2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,o=n.Ay.input`
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

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:r,style:n,...o}=e;return(0,i.jsx)(a,{className:r,style:n,...o,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(o,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(o,{active:t,onClick:r,className:a,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}}}]);