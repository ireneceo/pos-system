"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4656],{1472:(e,n,r)=>{r.d(n,{A:()=>o});r(9950);var t=r(9610),i=r(4414);const o=e=>{let{isOpen:n,onClose:r,onConfirm:o,title:a,message:s,confirmText:d="Confirm",cancelText:l="Cancel",variant:c="info"}=e;const x=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.yl,{variant:"secondary",onClick:r,children:l}),(0,i.jsx)(t.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:d})]});return(0,i.jsx)(t.aF,{isOpen:n,onClose:r,title:a,footer:x,children:(0,i.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,i.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,i.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},4656:(e,n,r)=>{r.r(n),r.d(n,{default:()=>T});var t=r(9950),i=r(4752),o=r(3310),a=r(8930),s=r(1472),d=r(9610),l=r(2674),c=r(4414);const x=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=i.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=i.Ay.header`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
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
`,y=i.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,f=i.Ay.div`
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
`,b=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,j=i.Ay.div`
  flex: 1;
`,v=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,C=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
`,k=i.Ay.button`
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
`,F=i.Ay.div`
  margin-bottom: 20px;
`,A=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,B=i.Ay.input`
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
`,E=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,z=i.Ay.button`
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
`,M=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,D=i.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,S=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,$=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,T=()=>{const{categories:e,menuItems:n,addCategory:r,updateCategory:i,deleteCategory:T,reorderCategories:L}=(0,a.b)(),[U,H]=(0,t.useState)(!1),[I,O]=(0,t.useState)(!1),[W,N]=(0,t.useState)(null),[P,V]=(0,t.useState)(null),[R,X]=(0,t.useState)({name:"",emoji:"\ud83c\udf7d\ufe0f"}),q=e.map(e=>({...e,itemCount:n.filter(n=>n.category===e.id).length})).sort((e,n)=>e.order-n.order),G=e=>{e?(V(e),X({name:e.name,emoji:e.emoji})):(V(null),X({name:"",emoji:"\ud83c\udf7d\ufe0f"})),H(!0)},J=()=>{H(!1),V(null),X({name:"",emoji:"\ud83c\udf7d\ufe0f"})};return(0,c.jsx)(o.A,{children:(0,c.jsxs)(x,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(g,{children:"Categories"}),(0,c.jsx)(u,{children:(0,c.jsxs)(m,{onClick:()=>G(),children:[(0,c.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,c.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Category"]})})]}),(0,c.jsx)(p,{children:0===q.length?(0,c.jsxs)(M,{children:[(0,c.jsx)(D,{children:"\ud83d\udcc2"}),(0,c.jsx)(S,{children:"No categories yet"}),(0,c.jsx)($,{children:"Create your first category to organize your menu items"}),(0,c.jsx)(m,{onClick:()=>G(),children:"Create Category"})]}):(0,c.jsx)(y,{children:q.map((r,t)=>(0,c.jsxs)(f,{children:[(0,c.jsx)(l.Xd,{onMoveUp:()=>(e=>{if(0===e)return;const n=[...q];[n[e-1],n[e]]=[n[e],n[e-1]];const r=n.map((e,n)=>({...e,order:n}));L(r)})(t),onMoveDown:()=>(e=>{if(e===q.length-1)return;const n=[...q];[n[e],n[e+1]]=[n[e+1],n[e]];const r=n.map((e,n)=>({...e,order:n}));L(r)})(t),disableUp:0===t,disableDown:t===q.length-1}),(0,c.jsx)(b,{children:r.emoji}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:r.name}),(0,c.jsxs)(C,{children:[(0,c.jsxs)("span",{children:[r.itemCount||0," items"]}),(0,c.jsxs)("span",{children:["Position ",t+1]})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(k,{onClick:()=>G(r),children:(0,c.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,c.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,c.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,c.jsx)(k,{onClick:()=>(r=>{const t=e.find(e=>e.id===r);if(!t)return;const i=n.filter(e=>e.category===r).length;N({id:r,name:t.name,itemCount:i}),O(!0)})(r.id),children:(0,c.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,c.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},r.id))})}),(0,c.jsxs)(d.aF,{isOpen:U,onClose:J,title:P?"Edit Category":"New Category",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d.yl,{variant:"secondary",onClick:J,children:"Cancel"}),(0,c.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(R.name.trim())try{if(P)await i(P.id,{...R,id:P.id,order:P.order});else{const n={id:`cat-${Date.now()}`,...R,order:e.length};await r(n)}J()}catch(n){console.error("Failed to save category:",n),alert("Failed to save category. Please try again.")}},disabled:!R.name.trim(),children:P?"Update":"Create"})]}),children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:"Category Name"}),(0,c.jsx)(B,{type:"text",value:R.name,onChange:e=>X({...R,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0})]}),(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:"Icon"}),(0,c.jsx)(E,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,c.jsx)(z,{selected:R.emoji===e,onClick:()=>X({...R,emoji:e}),type:"button",children:e},e))})]})]}),(0,c.jsx)(s.A,{isOpen:I,onClose:()=>{O(!1),N(null)},onConfirm:async()=>{if(W)try{await T(W.id),O(!1),N(null)}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category. Please try again.")}},title:"Delete Category",message:W?`Are you sure you want to delete "${W.name}"?${W.itemCount>0?`\n\nThis category contains ${W.itemCount} menu item${W.itemCount>1?"s":""}. They will be moved to 'Uncategorized'.`:""}`:"",confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})})}}}]);