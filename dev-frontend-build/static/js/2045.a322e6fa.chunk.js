"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2045],{2045:(e,t,n)=>{n.d(t,{A:()=>he});var r=n(9950),i=n(4492),a=n(4752),s=n(8409),o=n(2488),l=n(1367),c=n(9610),d=n(4021),u=n(6038),p=n(2853),x=n(3705),h=n(7617),g=n(5030),m=n(9955),y=n(4414);const j=a.Ay.div`
  padding: 24px 0;
`,_=a.Ay.div`
  display: grid;
  gap: 12px;
`,v=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  ${e=>e.readOnly&&"\n    background: #F9FAFB;\n    border: 1px dashed #D1D5DB;\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,k=a.Ay.div`
  flex: 1;
`,f=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,b=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,C=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,S=a.Ay.div`
  display: flex;
  gap: 8px;
`,F=a.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,w=a.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,A=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,E=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,B=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,$=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,z=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,O=a.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,T=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,D=a.Ay.button`
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
`,R=a.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,I=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,M=e=>{let{isBrandGeneralMode:t,restaurantId:n,onCountChange:i,onCategoryChange:a}=e;const{t:o}=(0,g.Bd)("recipes"),{user:d}=(0,l.As)(),u=n||(null===d||void 0===d?void 0:d.restaurant_id)||(null===d||void 0===d?void 0:d.restaurantId),[M,N]=(0,r.useState)([]),[P,U]=(0,r.useState)([]),[Q,L]=(0,r.useState)(!0),[Z,W]=(0,r.useState)(!1),[q,J]=(0,r.useState)(null),[G,Y]=(0,r.useState)(!1),[H,X]=(0,r.useState)(null),[K,V]=(0,r.useState)({name:"",emoji:"",description:""}),ee="Restaurant Admin"===(null===d||void 0===d?void 0:d.role),te="Brand General"===(null===d||void 0===d?void 0:d.role)||"Brand Manager"===(null===d||void 0===d?void 0:d.role),ne=(0,r.useCallback)(()=>(0,m.c4)(),[]);(0,r.useEffect)(()=>{(async()=>{L(!0);const e=ne();try{if(t||te){const t=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(N(n.data),i(n.data.length))}else if(ee&&u){const t=await fetch(`/api/restaurants/${u}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,r;if(a.success)N(a.data.own_categories||[]),U(a.data.brand_categories||[]),i(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{L(!1)}})()},[t,u,te,ee,ne,i]);const re=async()=>{try{const r=ne();if(t||te){const e=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${r}`}}),t=await e.json();t.success&&(N(t.data),i(t.data.length))}else if(ee&&u){const t=await fetch(`/api/restaurants/${u}/general-stock-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await t.json();var e,n;if(a.success)N(a.data.own_categories||[]),U(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},ie=e=>{e?(J(e),V({name:e.name,emoji:e.emoji||"",description:e.description||""})):(J(null),V({name:"",emoji:"",description:""})),W(!0)},ae=()=>{W(!1),J(null),V({name:"",emoji:"",description:""})},se=async e=>{if(e.preventDefault(),K.name.trim())try{const e=(0,m.c4)();let n="";const r=q?"PUT":"POST";if(t||te?n=q?`/api/general-stock-categories/${q.id}`:"/api/general-stock-categories":ee&&u&&(n=q?`/api/restaurants/${u}/general-stock-categories/${q.id}`:`/api/restaurants/${u}/general-stock-categories`),!n)return;const i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:K.name.trim(),emoji:K.emoji||null,description:K.description.trim()||null})}),s=await i.json();s.success?(ae(),re(),null===a||void 0===a||a()):alert(s.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},oe=async(e,n)=>{const r="up"===n?e-1:e+1;if(r<0||r>=M.length)return;const i=[...M];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=(0,m.c4)();let n="";if(t||te?n="/api/general-stock-categories/reorder":ee&&u&&(n=`/api/restaurants/${u}/general-stock-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),re()}catch(s){console.error("Failed to reorder:",s)}},le=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,y.jsxs)(v,{isActive:e.is_active,readOnly:r,children:[!r&&(0,y.jsx)(s.Xd,{onMoveUp:()=>oe(t,"up"),onMoveDown:()=>oe(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,y.jsx)(O,{children:e.emoji}),(0,y.jsxs)(k,{children:[(0,y.jsxs)(f,{children:[e.name,r&&(0,y.jsx)($,{children:o("recipes:generalStockCategoriesTab.brand")})]}),(0,y.jsxs)(b,{children:[(0,y.jsxs)("span",{children:[e.stock_count||0," items"]}),!r&&(0,y.jsx)(z,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,y.jsx)(C,{children:e.description})]}),!r&&(0,y.jsxs)(S,{children:[(0,y.jsx)(F,{onClick:()=>ie(e),title:"Edit",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,y.jsx)(F,{onClick:()=>(e=>{X(e),Y(!0)})(e),title:"Delete",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,y.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return Q?(0,y.jsx)(j,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:o("recipes:generalStockCategoriesTab.loading")})}):(0,y.jsxs)(j,{children:[(0,y.jsxs)(E,{children:[(0,y.jsx)(B,{children:o("recipes:generalStockCategoriesTab.generalStockCategories")}),(0,y.jsx)(x.cc,{variant:"primary",onClick:()=>ie(),children:"Add Category"})]}),ee&&P.length>0&&(0,y.jsxs)(R,{children:[(0,y.jsx)(I,{children:"Brand Categories (Read Only)"}),(0,y.jsx)(_,{children:P.map((e,t)=>le(e,t,P,!0))})]}),0===M.length?(0,y.jsxs)(p.pp,{children:[(0,y.jsx)(w,{children:o("recipes:generalStockCategoriesTab.noGeneralStockCategoriesYet")}),(0,y.jsx)(A,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,y.jsx)(x.cc,{variant:"primary",onClick:()=>ie(),children:"Add Category"})]}):(0,y.jsx)(_,{children:M.map((e,t)=>{return le(e,t,M,(n=e,ee&&"brand"===n.owner_type));var n})}),(0,y.jsx)(c.aF,{isOpen:Z,onClose:ae,title:(q?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:ae,children:o("recipes:generalStockCategoriesTab.cancel")}),(0,y.jsx)(c.yl,{variant:"primary",onClick:se,disabled:!K.name.trim(),children:q?"Update":"Create"})]}),children:(0,y.jsxs)("form",{onSubmit:se,children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:K.name,onChange:e=>V({...K,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:o("recipes:generalStockCategoriesTab.icon")}),(0,y.jsx)(T,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,y.jsx)(D,{selected:K.emoji===e,onClick:()=>V({...K,emoji:e}),type:"button",children:e},e))})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:o("recipes:generalStockCategoriesTab.description")}),(0,y.jsx)(c.Lz,{value:K.description,onChange:e=>V({...K,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,y.jsx)(h.A,{isOpen:G,onCancel:()=>{Y(!1),X(null)},onConfirm:async()=>{if(H)try{const e=(0,m.c4)();let n="";if(t||te?n=`/api/general-stock-categories/${H.id}`:ee&&u&&(n=`/api/restaurants/${u}/general-stock-categories/${H.id}`),!n)return;const r=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(Y(!1),X(null),re(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:H?`Are you sure you want to delete "${H.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})};var N=n(4877);const P=a.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,U=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,Q=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,L=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>"out_of_stock"===e.type?"#FEF2F2":"#FFFBEB"};
  border: 1px solid ${e=>"out_of_stock"===e.type?"#FECACA":"#FED7AA"};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,Z=a.Ay.div`
  flex: 1;
`,W=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,q=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,J=a.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,G=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Y=a.Ay.div`
  display: flex;
  flex-direction: column;
`,H=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,X=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #EF4444; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,K=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>{switch(e.urgency){case"expired":case"critical":return"#FEF2F2";case"warning":return"#FFFBEB";default:return"#F0F9FF"}}};
  border: 1px solid ${e=>{switch(e.urgency){case"expired":case"critical":return"#FECACA";case"warning":return"#FED7AA";default:return"#BAE6FD"}}};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,V=a.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #EF4444; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,ee=a.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,te=a.Ay.button`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,ne=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,re=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,ie=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ae=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,se=(0,a.Ay)(s.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(4) {
      display: none;
    }
  }
`,oe=(0,a.Ay)(s.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(4) {
      display: none;
    }
  }
`,le=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,ce=a.Ay.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #635BFF;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
  }
`,de=a.Ay.input`
  width: 70px;
  padding: 4px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,ue=a.Ay.button`
  padding: 6px 12px;
  background: #F0FDF4;
  color: #16A34A;
  border: 1px solid #16A34A;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #DCFCE7;
  }
`,pe=a.Ay.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #FEE2E2;
  background: #FEF2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #DC2626;

  &:hover {
    background: #FEE2E2;
    border-color: #FECACA;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`,xe=a.Ay.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,he=e=>{let{mode:t,restaurantId:n}=e;const{t:a}=(0,g.Bd)("common");(0,l.As)();const[p,x]=(0,i.ok)(),{defaultCurrency:h}=(0,d.i1)(),[j,_]=(0,r.useState)("RM"),v="restaurant"===t?n:void 0,k="brand"===t,f=p.get("tab")||"dashboard",b=e=>{x({tab:e})},[,C]=(0,r.useState)(0),[,S]=(0,r.useState)(0),[F,w]=(0,r.useState)(!0),[A,E]=(0,r.useState)(null),[B,$]=(0,r.useState)([]),[z,O]=(0,r.useState)([]),[T,D]=(0,r.useState)([]),[R,I]=(0,r.useState)([]),[he,me]=(0,r.useState)(""),[ye,je]=(0,r.useState)("all"),[_e,ve]=(0,r.useState)([]),[ke,fe]=(0,r.useState)(null),[be,Ce]=(0,r.useState)(!1),[Se,Fe]=(0,r.useState)(""),[we,Ae]=(0,r.useState)(""),[Ee,Be]=(0,r.useState)(""),[$e,ze]=(0,r.useState)(""),[Oe,Te]=(0,r.useState)(""),[De,Re]=(0,r.useState)("all"),[Ie,Me]=(0,r.useState)(!1),[Ne,Pe]=(0,r.useState)(!1),[Ue,Qe]=(0,r.useState)(!1),[Le,Ze]=(0,r.useState)(null),[We,qe]=(0,r.useState)(""),[Je,Ge]=(0,r.useState)(""),[Ye,He]=(0,r.useState)(""),[Xe,Ke]=(0,r.useState)(""),[Ve,et]=(0,r.useState)(""),[tt,nt]=(0,r.useState)({}),[,rt]=(0,r.useState)(!1),[it,at]=(0,r.useState)(!1),[st,ot]=(0,r.useState)(!1),[lt,ct]=(0,r.useState)(null),[dt,ut]=(0,r.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[pt,xt]=(0,r.useState)(!1),[ht,gt]=(0,r.useState)(!1),[mt,yt]=(0,r.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[jt,_t]=(0,r.useState)(!1),[vt,kt]=(0,r.useState)([]),[ft,bt]=(0,r.useState)([]),[,Ct]=(0,r.useState)(!1),[St,Ft]=(0,r.useState)(!1),[wt,At]=(0,r.useState)(null),[Et,Bt]=(0,r.useState)(!1),[$t,zt]=(0,r.useState)(null),[Ot,Tt]=(0,r.useState)(!1),[Dt,Rt]=(0,r.useState)(null),[It,Mt]=(0,r.useState)(""),Nt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],[Pt,Ut]=(0,r.useState)(null),[Qt,Lt]=(0,r.useState)(""),[Zt,Wt]=(0,r.useState)("ingredient"),qt=(e,t)=>e<=0?"out_of_stock":e<=t?"low_stock":"normal",[Jt,Gt]=(0,r.useState)({});(0,r.useEffect)(()=>{h&&_(h)},[h]);const Yt=(0,r.useCallback)(()=>(0,m.c4)(),[]),Ht=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Yt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Yt]),Xt=(0,r.useCallback)(async()=>{if("restaurant"!==t||v)try{if(w(!0),"restaurant"===t){const[e,t,n,r,i]=await Promise.all([Ht(`/api/restaurants/${v}/inventory/summary`),Ht(`/api/restaurants/${v}/inventory`),Ht(`/api/restaurants/${v}/inventory/alerts?resolved=false`),Ht(`/api/restaurants/${v}/inventory/reorder-suggestions`),Ht(`/api/restaurants/${v}/inventory/expiring?days=14`)]);e.success&&E(e.data),t.success&&$(t.data),n.success&&O(n.data),r.success&&D(r.data),i.success&&I(i.data);try{const e=await Ht(`/api/restaurants/${v}/inventory/general-stock`);e.success&&ve(e.data||[])}catch{ve([])}try{const e=await Ht(`/api/restaurants/${v}/suppliers`);e.success&&kt(e.data||[])}catch{kt([])}try{const e=await Ht(`/api/restaurants/${v}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];bt(t)}}catch{bt([])}}else{const e=await Ht("/api/product-ingredients?track_stock=true");if(e.success){const t=(e.data||[]).map(e=>{var t;const n=parseFloat(e.current_stock)||0,r=parseFloat(e.min_stock)||0;let i="normal";return n<=0?i="out_of_stock":n<=r&&(i="low_stock"),{id:e.id,name:e.name,code:e.code,image_url:e.image_url,unit:e.unit,unit_cost:parseFloat(e.unit_cost)||0,category:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized",current_stock:n,min_stock:r,min_order:parseFloat(e.min_order)||0,last_actual_stock:parseFloat(e.last_actual_stock)||0,last_stock_take_at:e.last_stock_take_at,avg_daily_usage:parseFloat(e.avg_daily_usage)||0,lead_time_days:e.lead_time_days||1,safety_stock_percent:parseFloat(e.safety_stock_percent)||20,manual_daily_usage:e.manual_daily_usage?parseFloat(e.manual_daily_usage):null,prediction_confidence:e.prediction_confidence||"none",stock_status:i,supplier_id:e.supplier_id,supplier_name:e.supplier_name}});$(t);const n=t.filter(e=>"low_stock"===e.stock_status).length,r=t.filter(e=>"out_of_stock"===e.stock_status).length;E({total_items:t.length,low_stock_count:n,out_of_stock_count:r,monthly_loss:0,unresolved_alerts:n+r});const i=t.filter(e=>"normal"!==e.stock_status).map((e,t)=>({id:t,ingredient_id:e.id,alert_type:e.stock_status,current_stock:e.current_stock,min_stock:e.min_stock,ingredient:{id:e.id,name:e.name,unit:e.unit,unit_cost:e.unit_cost}}));O(i)}try{const e=await Ht("/api/general-stock");e.success&&ve(e.data||[])}catch{ve([])}try{const e=await Ht("/api/general-stock-categories");e.success&&bt(e.data||[])}catch{bt([])}try{const e=await Ht("/api/suppliers");e.success&&kt(e.data||[])}catch{kt([])}D([]),I([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{w(!1)}},[t,v,Ht]);(0,r.useEffect)(()=>{Xt()},[Xt]),(0,r.useEffect)(()=>{if(B.length>0){const e=B.some(e=>e.current_stock>0||e.last_stock_take_at);rt(!e)}},[B]);const Kt=(e,t,n)=>{nt(r=>({...r,[e]:{...r[e],[t]:n}}))},Vt=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},en=e=>{Ze(e),qe(""),Ge(""),He(""),Ke(""),et(""),Me(!0)},tn=e=>{Ze(e),qe(""),Ge(""),Pe(!0)},nn=(e,t,n)=>{Ut(e),Lt(t.toString()),Wt(n)},rn=()=>{Ut(null),Lt("")},an=async e=>{const n=parseFloat(Qt);if(isNaN(n)||n<0)rn();else try{let r;if("restaurant"===t){const t="ingredient"===Zt?`/api/restaurants/${v}/inventory/adjust`:`/api/restaurants/${v}/inventory/general-stock/${e}/adjust`,i={new_quantity:n,reason:"Stock adjustment"};"ingredient"===Zt&&(i.ingredient_id=e),r=await Ht(t,{method:"POST",body:JSON.stringify(i)})}else r=k&&"general_stock"===Zt?await Ht(`/api/general-stock/${e}/adjust`,{method:"POST",body:JSON.stringify({new_quantity:n,reason:"Stock adjustment"})}):await Ht(`/api/product-ingredients/${e}`,{method:"PUT",body:JSON.stringify({current_stock:n})});if(r.success){const t=(new Date).toISOString();"ingredient"===Zt?$(r=>r.map(r=>{if(r.id===e){const e=qt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r})):ve(r=>r.map(r=>{if(r.id===e){const e=qt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r}))}}catch(r){console.error("Failed to adjust stock:",r)}finally{rn()}},sn=(e,t)=>{"Enter"===e.key?an(t):"Escape"===e.key&&rn()},on=e=>{Rt(e),Mt(e.min_order?String(e.min_order):""),Tt(!0)},ln=B.filter(e=>{const t=e.name.toLowerCase().includes(he.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}),cn=e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString()}catch{return"-"}},dn=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)},un=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return"restaurant"!==t||!!v?(0,y.jsxs)(s.mc,{children:[(0,y.jsx)(s.Y9,{children:(0,y.jsx)(s.hE,{children:"Inventory"})}),(0,y.jsxs)(s.UC,{children:[(0,y.jsxs)(s.j,{children:[(0,y.jsx)(s.oz,{active:"dashboard"===f,onClick:()=>b("dashboard"),children:"Dashboard"}),(0,y.jsx)(s.oz,{active:"list"===f,onClick:()=>b("list"),children:"Stock List"}),(0,y.jsx)(s.oz,{active:"history"===f,onClick:()=>b("history"),children:"History"}),(0,y.jsx)(s.oz,{active:"categories"===f,onClick:()=>b("categories"),children:"Categories"})]}),F?(0,y.jsx)(s.pp,{children:"Loading..."}):"dashboard"===f?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(s.MD,{children:[(0,y.jsxs)(s.hI,{color:"#059669",children:[(0,y.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.total_items)||0}),(0,y.jsx)(s.v0,{children:"Total Ingredients"}),(0,y.jsx)(s.d1,{children:"managed items"})]}),(0,y.jsxs)(s.hI,{color:"#D97706",children:[(0,y.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.low_stock_count)||0}),(0,y.jsx)(s.v0,{children:"Low Stock"}),(0,y.jsx)(s.d1,{children:"need attention"})]}),(0,y.jsxs)(s.hI,{color:"#DC2626",children:[(0,y.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.out_of_stock_count)||0}),(0,y.jsx)(s.v0,{children:"Out of Stock"}),(0,y.jsx)(s.d1,{children:"urgent"})]}),(0,y.jsxs)(s.hI,{color:"#7C3AED",children:[(0,y.jsx)(s.Os,{children:(0,u.vv)((null===A||void 0===A?void 0:A.monthly_loss)||0,j)}),(0,y.jsx)(s.v0,{children:"Monthly Loss"}),(0,y.jsx)(s.d1,{children:"this month"})]}),(0,y.jsxs)(s.hI,{color:"#EA580C",children:[(0,y.jsx)(s.Os,{children:R.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,y.jsx)(s.v0,{children:"Expiring Soon"}),(0,y.jsx)(s.d1,{children:"within 3 days"})]})]}),z.length>0&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(U,{children:"Stock Alerts"}),(0,y.jsx)("div",{children:z.slice(0,5).map(e=>(0,y.jsxs)(L,{type:e.alert_type,children:[(0,y.jsxs)(Z,{children:[(0,y.jsx)(W,{children:e.ingredient.name}),(0,y.jsxs)(q,{children:["Current: ",dn(e.current_stock)," ",e.ingredient.unit," / Min: ",dn(e.min_stock)," ",e.ingredient.unit]})]}),(0,y.jsxs)(s.wr,{children:[(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>{const t=B.find(t=>t.id===e.ingredient_id);t&&en(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,y.jsx)(s.$n,{variant:"secondary",onClick:()=>(async e=>{if("brand"!==t)try{(await Ht(`/api/restaurants/${v}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&O(t=>t.filter(t=>t.id!==e))}catch(n){console.error("Failed to resolve alert:",n)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),R.length>0&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(U,{children:"Expiring Items"}),(0,y.jsx)("div",{children:R.slice(0,5).map(e=>(0,y.jsxs)(K,{urgency:e.urgency,children:[(0,y.jsxs)(Z,{children:[(0,y.jsxs)(W,{children:[e.ingredient_name,e.batch_number&&(0,y.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,y.jsxs)(q,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,y.jsx)(V,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,y.jsx)(s.$n,{variant:"danger",onClick:()=>{const t=B.find(t=>t.id===e.ingredient_id);t&&tn(t)},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),T.length>0&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(U,{children:"Reorder Suggestions"}),(0,y.jsx)(P,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,y.jsxs)(s.XI,{children:[(0,y.jsxs)(s.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,y.jsx)("span",{children:"Ingredient"}),(0,y.jsx)("span",{children:"Current Stock"}),(0,y.jsx)("span",{children:"Daily Usage"}),(0,y.jsx)("span",{children:"Suggested Qty"}),(0,y.jsx)("span",{className:"col-cost",children:"Est. Cost"}),(0,y.jsx)("span",{children:"Urgency"}),(0,y.jsx)("span",{children:"Order"})]}),T.slice(0,10).map(e=>(0,y.jsxs)(s.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,y.jsx)("div",{children:e.ingredient.name}),(0,y.jsxs)("div",{children:[dn(e.current_stock)," ",e.ingredient.unit]}),(0,y.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,y.jsxs)("div",{style:{fontWeight:600},children:[dn(e.suggested_qty)," ",e.ingredient.unit]}),(0,y.jsx)("div",{className:"col-cost",children:(0,u.vv)(e.estimated_cost,j)}),(0,y.jsx)("div",{children:(0,y.jsx)(X,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,y.jsx)(de,{type:"number",min:"0",step:"1",value:Jt[e.ingredient.id]||e.suggested_qty,onChange:t=>Gt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,y.jsx)(ue,{onClick:()=>{const t=B.find(t=>t.id===e.ingredient.id);t&&on({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,y.jsxs)(ne,{children:[(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>{0===B.length?window.location.href=`/restaurant/${v}/recipe-management?tab=ingredients`:b("list")},children:"+ Receive Stock"}),(0,y.jsx)(s.$n,{variant:"secondary",onClick:()=>{0===B.length?window.location.href=`/restaurant/${v}/recipe-management?tab=ingredients`:b("list")},children:"+ Record Waste"}),(0,y.jsx)(s.$n,{variant:"secondary",onClick:()=>b("history"),children:"View All Transactions"})]})]}):"list"===f?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(o.Qn,{children:[(0,y.jsxs)(o.Jt,{value:De,onChange:e=>Re(e.target.value),style:{minWidth:"140px"},children:[(0,y.jsx)("option",{value:"all",children:"All Items"}),(0,y.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,y.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,y.jsx)(o.DO,{type:"text",placeholder:"Search...",value:he,onChange:e=>me(e.target.value)}),(0,y.jsxs)(o.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:"All Status"}),(0,y.jsx)("option",{value:"normal",children:"Normal"}),(0,y.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,y.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>gt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===De||"general_stock"===De)&&_e.length>0&&(0,y.jsxs)(y.Fragment,{children:["all"===De&&(0,y.jsxs)(U,{children:["General Stock (",_e.filter(e=>{const t=e.name.toLowerCase().includes(he.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}).length,")"]}),(0,y.jsxs)(s.XI,{style:{marginBottom:"24px"},children:[(0,y.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,y.jsx)("span",{className:"col-info",children:"Item"}),(0,y.jsx)("span",{children:"Status"}),(0,y.jsx)("span",{children:"Current Stock"}),(0,y.jsx)("span",{children:"Min Stock"}),(0,y.jsx)("span",{className:"col-cost",children:"Unit Cost"}),(0,y.jsx)("span",{children:"Supplier"}),(0,y.jsx)("span",{children:"Last Stock Take"}),(0,y.jsx)("span",{children:"Order"}),(0,y.jsx)("span",{className:"col-action",children:"Actions"})]}),_e.filter(e=>{const t=e.name.toLowerCase().includes(he.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}).map(e=>(0,y.jsxs)(oe,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,y.jsxs)(s.Np,{children:[(0,y.jsxs)(s.Uj,{className:"col-info",children:[(0,y.jsx)(s.PM,{children:"Item"}),(0,y.jsxs)(G,{children:[(0,y.jsx)(J,{children:e.image_url?(0,y.jsx)("img",{src:e.image_url,alt:e.name}):(0,y.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,y.jsxs)(Y,{children:[(0,y.jsx)(ie,{children:e.name}),e.code&&(0,y.jsx)(H,{children:e.code}),(0,y.jsx)(ae,{children:e.category})]})]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Status"}),(0,y.jsx)(Q,{status:e.stock_status,children:un(e.stock_status)})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Current Stock"}),Pt===e.id&&"general_stock"===Zt?(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,y.jsx)(ce,{type:"number",step:"0.01",value:Qt,onChange:e=>Lt(e.target.value),onKeyDown:t=>sn(t,e.id),onBlur:()=>an(e.id),autoFocus:!0}),(0,y.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,y.jsxs)(le,{onClick:()=>nn(e.id,e.current_stock,"general_stock"),children:[(0,y.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:dn(e.current_stock)}),(0,y.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Min Stock"}),(0,y.jsxs)("div",{style:{color:"#6B7280"},children:[dn(e.min_stock)," ",e.stock_unit]})]}),(0,y.jsxs)(s.Uj,{className:"col-cost",children:[(0,y.jsx)(s.PM,{children:"Unit Cost"}),(0,y.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,j)})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Supplier"}),(0,y.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Last Stock Take"}),(0,y.jsx)("div",{style:{color:"#6B7280"},children:cn(e.last_stock_take_at)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,y.jsx)(de,{type:"number",min:"0",step:"1",value:Jt[`gs_${e.id}`]||"",onChange:t=>Gt(n=>({...n,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,y.jsx)(ue,{onClick:()=>{const t=Jt[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(on({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),Mt(t))},children:"Order"})]}),(0,y.jsxs)(s.wr,{children:[(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>{fe(e),Fe(""),Ae(""),Be(""),ze(""),Te(""),Ce(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,y.jsx)(xe,{onClick:()=>{var t;At(e),yt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),Ft(!0)},children:"Edit"}),(0,y.jsx)(pe,{onClick:()=>{zt({type:"general_stock",id:e.id,name:e.name}),Bt(!0)},children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,y.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===De||"ingredients"===De)&&(0,y.jsxs)(y.Fragment,{children:["all"===De&&(0,y.jsxs)(U,{children:["Ingredients (",ln.length,")"]}),0===ln.length?(0,y.jsxs)(s.pp,{children:[(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===B.length?"No ingredients found":"No matching ingredients"}),(0,y.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===B.length?"brand"===t?'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.':"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===B.length&&(0,y.jsxs)(s.$n,{variant:"primary",onClick:()=>window.location.href="brand"===t?"/brand/product-recipe?tab=ingredients":`/restaurant/${v}/recipe-management?tab=ingredients`,children:["Go to ","brand"===t?"Product Ingredients":"Ingredients"]})]}):(0,y.jsxs)(s.XI,{children:[(0,y.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,y.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,y.jsx)("span",{children:"Status"}),(0,y.jsx)("span",{children:"Current Stock"}),(0,y.jsx)("span",{children:"Min / Prediction"}),(0,y.jsx)("span",{className:"col-cost",children:"Unit Cost"}),(0,y.jsx)("span",{children:"Supplier"}),(0,y.jsx)("span",{children:"Last Stock Take"}),(0,y.jsx)("span",{children:"Order"}),(0,y.jsx)("span",{className:"col-action",children:"Actions"})]}),ln.map(e=>(0,y.jsxs)(oe,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,y.jsxs)(s.Np,{children:[(0,y.jsxs)(s.Uj,{className:"col-info",children:[(0,y.jsx)(s.PM,{children:"Ingredient"}),(0,y.jsxs)(G,{children:[(0,y.jsx)(J,{children:e.image_url?(0,y.jsx)("img",{src:e.image_url,alt:e.name}):(0,y.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,y.jsxs)(Y,{children:[(0,y.jsx)(ie,{children:e.name}),e.code&&(0,y.jsx)(H,{children:e.code}),(0,y.jsxs)(ae,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Status"}),(0,y.jsx)(Q,{status:e.stock_status,children:un(e.stock_status)})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Current Stock"}),Pt===e.id&&"ingredient"===Zt?(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,y.jsx)(ce,{type:"number",step:"0.01",value:Qt,onChange:e=>Lt(e.target.value),onKeyDown:t=>sn(t,e.id),onBlur:()=>an(e.id),autoFocus:!0}),(0,y.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,y.jsxs)(le,{onClick:()=>nn(e.id,e.current_stock,"ingredient"),children:[(0,y.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:dn(e.current_stock)}),(0,y.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Min / Prediction"}),(0,y.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",dn(e.min_stock)," ",e.unit]}),(0,y.jsx)(ee,{level:e.prediction_confidence||"none",children:Vt(e.prediction_confidence||"none")})]}),(0,y.jsxs)(s.Uj,{className:"col-cost",children:[(0,y.jsx)(s.PM,{children:"Unit Cost"}),(0,y.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,j)})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Supplier"}),(0,y.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Last Stock Take"}),(0,y.jsx)("div",{style:{color:"#6B7280"},children:cn(e.last_stock_take_at)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,y.jsx)(de,{type:"number",min:"0",step:"1",value:Jt[e.id]||"",onChange:t=>Gt(n=>({...n,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,y.jsx)(ue,{onClick:()=>{const t=Jt[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(on({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),Mt(t))},children:"Order"})]}),(0,y.jsxs)(s.wr,{children:[(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>en(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,y.jsx)(s.$n,{variant:"danger",onClick:()=>tn(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Waste"}),(0,y.jsx)(te,{onClick:()=>(e=>{var t;ct(e),ut({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),ot(!0)})(e),children:"Settings"}),(0,y.jsx)(pe,{onClick:()=>{zt({type:"ingredient",id:e.id,name:e.name}),Bt(!0)},children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,y.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id))]})]})]}):"categories"===f?(0,y.jsx)(M,{isBrandGeneralMode:k,restaurantId:"restaurant"===t&&v?Number(v):null,onCountChange:C,onCategoryChange:()=>S(e=>e+1)}):(0,y.jsx)(ge,{restaurantId:"restaurant"===t?v:void 0,isBrandGeneralMode:k,currency:j})]}),(0,y.jsx)(c.aF,{isOpen:Ie,onClose:()=>Me(!1),title:"Receive Stock",size:"medium",children:Le&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(P,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Ingredient"}),(0,y.jsx)(c.ZQ,{type:"text",value:Le.name,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Current Stock"}),(0,y.jsx)(c.ZQ,{type:"text",value:`${dn(Le.current_stock)} ${Le.unit}`,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Quantity Received (",Le.unit,") *"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",value:We,onChange:e=>qe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,y.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,y.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,y.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,y.jsx)(c.ZQ,{type:"text",value:Ye,onChange:e=>He(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,y.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,y.jsx)(c.lR,{children:"Manufacture Date"}),(0,y.jsx)(c.ZQ,{type:"date",value:Xe,onChange:e=>Ke(e.target.value)})]})]}),(0,y.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,y.jsx)(c.lR,{children:"Expiry Date"}),(0,y.jsx)(c.ZQ,{type:"date",value:Ve,onChange:e=>et(e.target.value)}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Notes (Optional)"}),(0,y.jsx)(c.ZQ,{type:"text",value:Je,onChange:e=>Ge(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Le&&We)try{let r;if("restaurant"===t)r=await Ht(`/api/restaurants/${v}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Le.id,quantity:parseFloat(We),notes:Je,batch_number:Ye||null,manufacture_date:Xe||null,expiry_date:Ve||null})});else{const e=Le.current_stock+parseFloat(We);r=await Ht(`/api/product-ingredients/${Le.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:Le.current_stock+parseFloat(We),i=qt(t,Le.min_stock),a=(new Date).toISOString();$(e=>e.map(e=>e.id===Le.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),O(e=>e.filter(e=>e.ingredient_id!==Le.id)),Me(!1),Ze(null),qe(""),Ge(""),He(""),Ke(""),et("")}}catch(r){console.error("Failed to receive stock:",r)}},children:"Confirm Receive"})]})]})}),(0,y.jsx)(c.aF,{isOpen:Ne,onClose:()=>Pe(!1),title:"Record Waste",size:"small",children:Le&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(P,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Ingredient"}),(0,y.jsx)(c.ZQ,{type:"text",value:Le.name,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Current Stock"}),(0,y.jsx)(c.ZQ,{type:"text",value:`${dn(Le.current_stock)} ${Le.unit}`,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Waste Quantity (",Le.unit,") *"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",value:We,onChange:e=>qe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Reason (Optional)"}),(0,y.jsx)(c.ZQ,{type:"text",value:Je,onChange:e=>Ge(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>Pe(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Le&&We)try{let r;if("restaurant"===t)r=await Ht(`/api/restaurants/${v}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Le.id,quantity:parseFloat(We),notes:Je})});else{const e=Math.max(0,Le.current_stock-parseFloat(We));r=await Ht(`/api/product-ingredients/${Le.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:Math.max(0,Le.current_stock-parseFloat(We)),i=qt(t,Le.min_stock),a=(new Date).toISOString();$(e=>e.map(e=>e.id===Le.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Pe(!1),Ze(null),qe(""),Ge("")}}catch(r){console.error("Failed to record waste:",r)}},children:"Confirm Waste"})]})]})}),(0,y.jsxs)(c.aF,{isOpen:Ue,onClose:()=>Qe(!1),title:"Set Initial Stock",size:"large",children:[(0,y.jsx)(P,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,y.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(B.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,y.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,y.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,y.jsxs)(s.XI,{children:[(0,y.jsxs)(s.A0,{columns:"2fr 1fr 1fr",children:[(0,y.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,y.jsx)("span",{children:"Current Qty"}),(0,y.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,y.jsxs)(s.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,y.jsx)("div",{children:(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=tt[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>Kt(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,y.jsx)("div",{children:(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=tt[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>Kt(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>Qe(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(tt).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{at(!0);if((await Ht(`/api/restaurants/${v}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success){const e=(new Date).toISOString();$(t=>t.map(t=>{const n=tt[t.id];if(n&&parseFloat(n.quantity)>0){const r=parseFloat(n.quantity),i=parseFloat(n.min_stock)||0,a=qt(r,i);return{...t,current_stock:r,min_stock:i,stock_status:a,last_stock_take_at:e}}return t})),Qe(!1),rt(!1)}}catch(t){console.error("Failed to save initial stock:",t)}finally{at(!1)}},disabled:it,children:it?"Saving...":"Save Initial Stock"})]})]}),(0,y.jsx)(c.aF,{isOpen:be,onClose:()=>Ce(!1),title:"Receive Stock",size:"medium",children:ke&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(P,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Item"}),(0,y.jsx)(c.ZQ,{type:"text",value:ke.name,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Current Stock"}),(0,y.jsx)(c.ZQ,{type:"text",value:`${dn(ke.current_stock)} ${ke.stock_unit}`,disabled:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Quantity Received (",ke.stock_unit,") *"]}),(0,y.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Se,onChange:e=>Fe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,y.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,y.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,y.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,y.jsx)(c.ZQ,{type:"text",value:Ee,onChange:e=>Be(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,y.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,y.jsx)(c.lR,{children:"Manufacture Date"}),(0,y.jsx)(c.ZQ,{type:"date",value:$e,onChange:e=>ze(e.target.value)})]})]}),(0,y.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,y.jsx)(c.lR,{children:"Expiry Date"}),(0,y.jsx)(c.ZQ,{type:"date",value:Oe,onChange:e=>Te(e.target.value)}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Notes (Optional)"}),(0,y.jsx)(c.ZQ,{type:"text",value:we,onChange:e=>Ae(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>Ce(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Se&&!(parseFloat(Se)<=0))try{const n=k?`/api/general-stock/${ke.id}/receive`:`/api/restaurants/${v}/inventory/general-stock/${ke.id}/receive`,r=await Ht(n,{method:"POST",body:JSON.stringify({quantity:parseFloat(Se),notes:we,batch_number:Ee||null,manufacture_date:$e||null,expiry_date:Oe||null})});if(r.success){var e,t;const n=null!==(e=null===(t=r.data)||void 0===t?void 0:t.current_stock)&&void 0!==e?e:parseFloat(String(ke.current_stock))+parseFloat(Se),i=qt(n,ke.min_stock),a=(new Date).toISOString();ve(e=>e.map(e=>e.id===ke.id?{...e,current_stock:n,stock_status:i,last_stock_take_at:a}:e)),Ce(!1),Fe(""),Ae(""),Be(""),ze(""),Te("")}}catch(n){console.error("Failed to receive general stock:",n)}},disabled:!Se||parseFloat(Se)<=0,children:"Confirm Receive"})]})]})}),(0,y.jsx)(c.aF,{isOpen:Ot,onClose:()=>Tt(!1),title:`Order: ${(null===Dt||void 0===Dt?void 0:Dt.name)||""}`,size:"small",children:Dt&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,y.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[dn(Dt.current_stock)," ",Dt.unit]})]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,y.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[dn(Dt.min_stock)," ",Dt.unit]})]})]}),Dt.min_order&&Dt.min_order>0&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",dn(Dt.min_order)," ",Dt.unit]}),Dt.supplier_name&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Dt.supplier_name]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Order Quantity (",Dt.unit,") *"]}),(0,y.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:It,onChange:e=>Mt(e.target.value),placeholder:Dt.min_order?`Min: ${Dt.min_order}`:"Enter quantity"})]}),It&&parseFloat(It)>0&&(0,y.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,u.vv)(parseFloat(It)*Dt.unit_cost,j)})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>Tt(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:()=>{Dt&&It&&(alert(`Order sent: ${It} ${Dt.unit} of ${Dt.name}`),Tt(!1),Rt(null),Mt(""))},disabled:!It||parseFloat(It)<=0,children:"Send Order"})]})]})}),(0,y.jsx)(c.aF,{isOpen:st,onClose:()=>ot(!1),title:`Settings: ${(null===lt||void 0===lt?void 0:lt.name)||""}`,size:"small",children:lt&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(P,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,y.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,y.jsx)(ee,{level:lt.prediction_confidence||"none",children:Vt(lt.prediction_confidence||"none")}),(0,y.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(lt.avg_daily_usage))||0).toFixed(2)," ",lt.unit,"/day (calculated)"]})]})]}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Minimum Stock Level (",lt.unit,")"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_stock,onChange:e=>ut({...dt,min_stock:e.target.value}),placeholder:"0"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Minimum Order (",lt.unit,")"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_order,onChange:e=>ut({...dt,min_order:e.target.value}),placeholder:"0"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Lead Time (days)"}),(0,y.jsx)(c.ZQ,{type:"number",min:"1",value:dt.lead_time_days,onChange:e=>ut({...dt,lead_time_days:e.target.value}),placeholder:"1"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,y.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:dt.safety_stock_percent,onChange:e=>ut({...dt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Manual Daily Usage (",lt.unit,"/day)"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.manual_daily_usage,onChange:e=>ut({...dt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>ot(!1),children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(lt)try{xt(!0);if((await Ht(`/api/restaurants/${v}/inventory/${lt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(dt.lead_time_days)||1,safety_stock_percent:parseFloat(dt.safety_stock_percent)||20,manual_daily_usage:dt.manual_daily_usage?parseFloat(dt.manual_daily_usage):null,min_stock:parseFloat(dt.min_stock)||0,min_order:parseFloat(dt.min_order)||0})})).success){const e=parseFloat(dt.min_stock)||0;$(t=>t.map(t=>{if(t.id===lt.id){const n=qt(t.current_stock,e);return{...t,lead_time_days:parseInt(dt.lead_time_days)||1,safety_stock_percent:parseFloat(dt.safety_stock_percent)||20,manual_daily_usage:dt.manual_daily_usage?parseFloat(dt.manual_daily_usage):null,min_stock:e,stock_status:n}}return t})),ot(!1)}}catch(e){console.error("Failed to save settings:",e)}finally{xt(!1)}},disabled:pt,children:pt?"Saving...":"Save Settings"})]})]})}),(0,y.jsxs)(c.aF,{isOpen:ht,onClose:()=>{gt(!1),Ct(!1)},title:"Add General Stock",size:"medium",children:[(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Item Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:mt.name,onChange:e=>yt({...mt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Code (SKU)"}),(0,y.jsx)(c.ZQ,{type:"text",value:mt.code,onChange:e=>yt({...mt,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,y.jsx)(N.A,{value:mt.image_url,onChange:e=>yt({...mt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Unit *"}),(0,y.jsx)(o.Jt,{value:mt.stock_unit,onChange:e=>yt({...mt,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Nt.map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category"}),(0,y.jsxs)(o.Jt,{value:mt.category,onChange:e=>yt({...mt,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,y.jsx)("option",{value:"",children:"Select Category"}),ft.map(e=>(0,y.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Supplier"}),(0,y.jsxs)(o.Jt,{value:mt.supplier_id,onChange:e=>yt({...mt,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,y.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Unit Cost"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.unit_cost,onChange:e=>yt({...mt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Initial Stock"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.current_stock,onChange:e=>yt({...mt,current_stock:e.target.value}),placeholder:"0"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Min Stock"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_stock,onChange:e=>yt({...mt,min_stock:e.target.value}),placeholder:"0"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Min Order"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_order,onChange:e=>yt({...mt,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,y.jsxs)(re,{style:{marginTop:"24px"},children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>{gt(!1),Ct(!1)},children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(mt.name.trim())try{_t(!0);const e=k?"/api/general-stock":`/api/restaurants/${v}/inventory/general-stock`,t=await Ht(e,{method:"POST",body:JSON.stringify({name:mt.name,code:mt.code||null,image_url:mt.image_url||null,stock_unit:mt.stock_unit,unit_cost:parseFloat(mt.unit_cost)||0,category:mt.category||"Other",current_stock:parseFloat(mt.current_stock)||0,min_stock:parseFloat(mt.min_stock)||0,min_order:parseFloat(mt.min_order)||0,supplier_id:mt.supplier_id?parseInt(mt.supplier_id):null})});if(t.success&&t.data){const e={...t.data,stock_unit:t.data.stock_unit||t.data.unit||mt.stock_unit,stock_status:qt(parseFloat(mt.current_stock)||0,parseFloat(mt.min_stock)||0),last_stock_take_at:(new Date).toISOString()};ve(t=>[...t,e]),gt(!1),yt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to add general stock:",e)}finally{_t(!1)}},disabled:jt||!mt.name.trim(),children:jt?"Adding...":"Add Item"})]})]}),(0,y.jsxs)(c.aF,{isOpen:St,onClose:()=>{Ft(!1),At(null)},title:"Edit General Stock",size:"medium",children:[(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Item Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:mt.name,onChange:e=>yt({...mt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Code (SKU)"}),(0,y.jsx)(c.ZQ,{type:"text",value:mt.code,onChange:e=>yt({...mt,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,y.jsx)(N.A,{value:mt.image_url,onChange:e=>yt({...mt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Unit *"}),(0,y.jsx)(o.Jt,{value:mt.stock_unit,onChange:e=>yt({...mt,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Nt.map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category"}),(0,y.jsxs)(o.Jt,{value:mt.category,onChange:e=>yt({...mt,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,y.jsx)("option",{value:"",children:"Select Category"}),ft.map(e=>(0,y.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Supplier"}),(0,y.jsxs)(o.Jt,{value:mt.supplier_id,onChange:e=>yt({...mt,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,y.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Unit Cost"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.unit_cost,onChange:e=>yt({...mt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Current Stock"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.current_stock,onChange:e=>yt({...mt,current_stock:e.target.value}),placeholder:"0"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Min Stock"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_stock,onChange:e=>yt({...mt,min_stock:e.target.value}),placeholder:"0"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Min Order"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_order,onChange:e=>yt({...mt,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,y.jsxs)(re,{style:{marginTop:"24px"},children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>{Ft(!1),At(null)},children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(mt.name.trim()&&wt)try{_t(!0);const e=k?`/api/general-stock/${wt.id}`:`/api/restaurants/${v}/inventory/general-stock/${wt.id}`;if((await Ht(e,{method:"PUT",body:JSON.stringify({name:mt.name,code:mt.code||null,image_url:mt.image_url||null,stock_unit:mt.stock_unit,unit_cost:parseFloat(mt.unit_cost)||0,category:mt.category||"Other",current_stock:parseFloat(mt.current_stock)||0,min_stock:parseFloat(mt.min_stock)||0,min_order:parseFloat(mt.min_order)||0,supplier_id:mt.supplier_id?parseInt(mt.supplier_id):null})})).success&&wt){const e=parseFloat(mt.current_stock)||0,t=parseFloat(mt.min_stock)||0;ve(n=>n.map(n=>n.id===wt.id?{...n,name:mt.name,code:mt.code||null,image_url:mt.image_url||null,stock_unit:mt.stock_unit,unit_cost:parseFloat(mt.unit_cost)||0,category:mt.category||"Other",current_stock:e,min_stock:t,min_order:parseFloat(mt.min_order)||0,supplier_id:mt.supplier_id?parseInt(mt.supplier_id):null,stock_status:qt(e,t)}:n)),Ft(!1),At(null),yt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to update general stock:",e)}finally{_t(!1)}},disabled:jt||!mt.name.trim(),children:jt?"Saving...":"Save Changes"})]})]}),(0,y.jsx)(c.aF,{isOpen:Et,onClose:()=>{Bt(!1),zt(null)},title:"Unlink from Inventory",size:"small",children:$t&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:$t.name}),(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===$t.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,y.jsxs)(re,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>{Bt(!1),zt(null)},children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===$t.type){const e="brand"===t?`/api/product-ingredients/${$t.id}`:`/api/restaurants/${v}/ingredients/${$t.id}`;(await Ht(e,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&$(e=>e.filter(e=>e.id!==$t.id))}else{const e=k?`/api/general-stock/${$t.id}`:`/api/restaurants/${v}/inventory/general-stock/${$t.id}`;(await Ht(e,{method:"DELETE"})).success&&ve(e=>e.filter(e=>e.id!==$t.id))}Bt(!1),zt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#EF4444"},children:"ingredient"===$t.type?"Unlink":"Delete"})]})]})})]}):(0,y.jsx)(s.mc,{children:(0,y.jsx)(s.pp,{children:(0,y.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})},ge=e=>{let{restaurantId:t,isBrandGeneralMode:n,currency:i}=e;const[a,o]=(0,r.useState)([]),[l,c]=(0,r.useState)(!0),d=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)};(0,r.useEffect)(()=>{(t||n)&&(async()=>{try{const e=(0,m.c4)(),r=n?"/api/general-stock/transactions?limit=50":`/api/restaurants/${t}/inventory/transactions?limit=50`,i=await fetch(r,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();a.success&&o(a.data||[])}catch(e){console.error("Failed to fetch transactions:",e)}finally{c(!1)}})()},[t,n]);const u=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},p=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return l?(0,y.jsx)(s.pp,{children:"Loading transactions..."}):0===a.length?(0,y.jsxs)(s.pp,{children:[(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,y.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,y.jsxs)(s.XI,{children:[(0,y.jsxs)(s.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,y.jsx)("span",{children:"Date"}),(0,y.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,y.jsx)("span",{children:"Type"}),(0,y.jsx)("span",{children:"Change"}),(0,y.jsx)("span",{children:"After"}),(0,y.jsx)("span",{className:"col-info",children:"Notes"})]}),a.map(e=>{var t;return(0,y.jsx)(s.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,y.jsxs)(s.Np,{children:[(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Date"}),(0,y.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Ingredient"}),(0,y.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Type"}),(0,y.jsx)("span",{style:{color:p(e.transaction_type),fontWeight:600},children:u(e.transaction_type)})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Change"}),(0,y.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",d(e.quantity_change)," ",e.unit]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"After"}),(0,y.jsxs)("div",{style:{color:"#0A2540"},children:[d(e.stock_after)," ",e.unit]})]}),(0,y.jsxs)(s.Uj,{children:[(0,y.jsx)(s.PM,{children:"Notes"}),(0,y.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;r.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,r.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var r=n(9950),i=n(1367),a=n(6038),s=n(9955);const o=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(a.DL)),[l,c]=(0,r.useState)(!0),[d,u]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void c(!1);try{const e=(0,s.c4)(),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";n(r)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),u("Failed to load currency settings"),n("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:d}}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var r=n(7119),i=n(4752),a=n(9610),s=n(4414);const o=i.Ay.div`
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
`,u=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:t,title:n,message:i,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,s.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(c,{children:n}),(0,s.jsx)(d,{children:i})]}),(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(p,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}}}]);