"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4656],{1472:(e,t,i)=>{i.d(t,{A:()=>r});i(9950);var n=i(9610),o=i(4414);const r=e=>{let{isOpen:t,onClose:i,onConfirm:r,title:a,message:s,confirmText:d="Confirm",cancelText:l="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.yl,{variant:"secondary",onClick:i,children:l}),(0,o.jsx)(n.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:d})]});return(0,o.jsx)(n.aF,{isOpen:t,onClose:i,title:a,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},4656:(e,t,i)=>{i.r(t),i.d(t,{default:()=>P});var n=i(9950),o=i(4752),r=i(8930),a=i(1472),s=i(9610),d=i(6649),l=i(4414);const c=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=o.Ay.header`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,g=o.Ay.div`
  display: flex;
  gap: 12px;
`,u=o.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover {\n            background: #DC2626;\n          }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover {\n            background: #F9FAFB;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5246ED;\n          }\n        "}}}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,y=o.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,m=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,b=o.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,f=o.Ay.div`
  flex: 1;
`,j=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,v=o.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,k=o.Ay.div`
  display: flex;
  gap: 8px;
`,w=o.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`,C=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
`,F=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,A=o.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E5E7EB;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`,E=o.Ay.span`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`,B=o.Ay.div`
  margin-bottom: 20px;
`,z=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,M=o.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,$=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,D=o.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,S=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,T=o.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,I=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,O=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,P=()=>{const{categories:e,menuItems:t,addCategory:i,updateCategory:o,deleteCategory:P,reorderCategories:U}=(0,r.b)(),[L,H]=(0,n.useState)(!1),[W,N]=(0,n.useState)(!1),[V,X]=(0,n.useState)(null),[R,_]=(0,n.useState)(null),[q,G]=(0,n.useState)({name:"",emoji:"\ud83c\udf7d\ufe0f"}),J=e.map(e=>({...e,itemCount:t.filter(t=>t.category===e.id).length})).sort((e,t)=>e.order-t.order),K=e=>{e?(_(e),G({name:e.name,emoji:e.emoji})):(_(null),G({name:"",emoji:"\ud83c\udf7d\ufe0f"})),H(!0)},Q=()=>{H(!1),_(null),G({name:"",emoji:"\ud83c\udf7d\ufe0f"})};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(h,{children:"Categories"}),(0,l.jsx)(g,{children:(0,l.jsxs)(u,{onClick:()=>K(),children:[(0,l.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,l.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Category"]})})]}),(0,l.jsx)(p,{children:0===J.length?(0,l.jsxs)(S,{children:[(0,l.jsx)(T,{children:"\ud83d\udcc2"}),(0,l.jsx)(I,{children:"No categories yet"}),(0,l.jsx)(O,{children:"Create your first category to organize your menu items"}),(0,l.jsx)(u,{onClick:()=>K(),children:"Create Category"})]}):(0,l.jsx)(y,{children:J.map((i,n)=>(0,l.jsxs)(m,{children:[(0,l.jsx)(d.Xd,{onMoveUp:()=>(e=>{if(0===e)return;const t=[...J];[t[e-1],t[e]]=[t[e],t[e-1]];const i=t.map((e,t)=>({...e,order:t}));U(i)})(n),onMoveDown:()=>(e=>{if(e===J.length-1)return;const t=[...J];[t[e],t[e+1]]=[t[e+1],t[e]];const i=t.map((e,t)=>({...e,order:t}));U(i)})(n),disableUp:0===n,disableDown:n===J.length-1}),(0,l.jsx)(b,{children:i.emoji}),(0,l.jsxs)(f,{children:[(0,l.jsxs)(j,{children:[i.name,!1===i.isActive&&(0,l.jsx)(E,{active:!1,children:"Inactive"})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)("span",{children:[i.itemCount||0," items"]}),(0,l.jsxs)("span",{children:["Position ",n+1]})]})]}),(0,l.jsxs)(C,{title:!1!==i.isActive?"Click to hide from POS/Mobile":"Click to show on POS/Mobile",children:[(0,l.jsx)(F,{type:"checkbox",checked:!1!==i.isActive,onChange:()=>(async e=>{try{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant"),n=i>=0?t[i+1]:null,r=localStorage.getItem("auth_token"),a=await fetch(`/api/categories/id/${e.id}/toggle-active?restaurantId=${n}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(a.ok){const t=await a.json();t.success&&await o(e.id,{...e,isActive:t.data.isActive})}}catch(t){console.error("Failed to toggle category:",t)}})(i)}),(0,l.jsx)(A,{})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(w,{onClick:()=>K(i),children:(0,l.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,l.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,l.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,l.jsx)(w,{onClick:()=>(i=>{const n=e.find(e=>e.id===i);if(!n)return;const o=t.filter(e=>e.category===i).length;X({id:i,name:n.name,itemCount:o}),N(!0)})(i.id),children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,l.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},i.id))})}),(0,l.jsxs)(s.aF,{isOpen:L,onClose:Q,title:R?"Edit Category":"New Category",size:"medium",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.yl,{variant:"secondary",onClick:Q,children:"Cancel"}),(0,l.jsx)(s.yl,{variant:"primary",onClick:async()=>{if(q.name.trim())try{if(R)await o(R.id,{...q,id:R.id,order:R.order});else{const t={id:`cat-${Date.now()}`,...q,order:e.length};await i(t)}Q()}catch(t){console.error("Failed to save category:",t),alert("Failed to save category. Please try again.")}},disabled:!q.name.trim(),children:R?"Update":"Create"})]}),children:[(0,l.jsxs)(B,{children:[(0,l.jsx)(z,{children:"Category Name"}),(0,l.jsx)(M,{type:"text",value:q.name,onChange:e=>G({...q,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0})]}),(0,l.jsxs)(B,{children:[(0,l.jsx)(z,{children:"Icon"}),(0,l.jsx)($,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,l.jsx)(D,{selected:q.emoji===e,onClick:()=>G({...q,emoji:e}),type:"button",children:e},e))})]})]}),(0,l.jsx)(a.A,{isOpen:W,onClose:()=>{N(!1),X(null)},onConfirm:async()=>{if(V)try{await P(V.id),N(!1),X(null)}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category. Please try again.")}},title:"Delete Category",message:V?`Are you sure you want to delete "${V.name}"?${V.itemCount>0?`\n\nThis category contains ${V.itemCount} menu item${V.itemCount>1?"s":""}. They will be moved to 'Uncategorized'.`:""}`:"",confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})})}}}]);