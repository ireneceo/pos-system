"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2045],{2045:(e,t,n)=>{n.d(t,{A:()=>xe});var r=n(9950),i=n(4492),a=n(4752),s=n(8409),o=n(2488),l=n(1367),c=n(9610),d=n(4021),u=n(6038),p=n(2853),x=n(3705),h=n(7617),g=n(5030),m=n(4414);const y=a.Ay.div`
  padding: 24px 0;
`,j=a.Ay.div`
  display: grid;
  gap: 12px;
`,_=a.Ay.div`
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
`,v=a.Ay.div`
  flex: 1;
`,k=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,f=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,b=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,C=a.Ay.div`
  display: flex;
  gap: 8px;
`,S=a.Ay.button`
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
`,F=a.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,w=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,E=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,B=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,$=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=a.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,T=a.Ay.button`
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
`,D=a.Ay.div`
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
`,R=e=>{let{isBrandGeneralMode:t,restaurantId:n,onCountChange:i,onCategoryChange:a}=e;const{t:o}=(0,g.Bd)("recipes"),{user:d}=(0,l.As)(),u=n||(null===d||void 0===d?void 0:d.restaurant_id)||(null===d||void 0===d?void 0:d.restaurantId),[R,M]=(0,r.useState)([]),[N,P]=(0,r.useState)([]),[U,Q]=(0,r.useState)(!0),[L,Z]=(0,r.useState)(!1),[W,q]=(0,r.useState)(null),[J,G]=(0,r.useState)(!1),[Y,H]=(0,r.useState)(null),[X,K]=(0,r.useState)({name:"",emoji:"",description:""}),V="Restaurant Admin"===(null===d||void 0===d?void 0:d.role),ee="Brand General"===(null===d||void 0===d?void 0:d.role)||"Brand Manager"===(null===d||void 0===d?void 0:d.role),te=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,r.useEffect)(()=>{(async()=>{Q(!0);const e=te();try{if(t||ee){const t=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(M(n.data),i(n.data.length))}else if(V&&u){const t=await fetch(`/api/restaurants/${u}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,r;if(a.success)M(a.data.own_categories||[]),P(a.data.brand_categories||[]),i(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{Q(!1)}})()},[t,u,ee,V,te,i]);const ne=async()=>{try{const r=te();if(t||ee){const e=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${r}`}}),t=await e.json();t.success&&(M(t.data),i(t.data.length))}else if(V&&u){const t=await fetch(`/api/restaurants/${u}/general-stock-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await t.json();var e,n;if(a.success)M(a.data.own_categories||[]),P(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},re=e=>{e?(q(e),K({name:e.name,emoji:e.emoji||"",description:e.description||""})):(q(null),K({name:"",emoji:"",description:""})),Z(!0)},ie=()=>{Z(!1),q(null),K({name:"",emoji:"",description:""})},ae=async e=>{if(e.preventDefault(),X.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const r=W?"PUT":"POST";if(t||ee?n=W?`/api/general-stock-categories/${W.id}`:"/api/general-stock-categories":V&&u&&(n=W?`/api/restaurants/${u}/general-stock-categories/${W.id}`:`/api/restaurants/${u}/general-stock-categories`),!n)return;const i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:X.name.trim(),emoji:X.emoji||null,description:X.description.trim()||null})}),s=await i.json();s.success?(ie(),ne(),null===a||void 0===a||a()):alert(s.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},se=async(e,n)=>{const r="up"===n?e-1:e+1;if(r<0||r>=R.length)return;const i=[...R];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(t||ee?n="/api/general-stock-categories/reorder":V&&u&&(n=`/api/restaurants/${u}/general-stock-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),ne()}catch(s){console.error("Failed to reorder:",s)}},oe=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,m.jsxs)(_,{isActive:e.is_active,readOnly:r,children:[!r&&(0,m.jsx)(s.Xd,{onMoveUp:()=>se(t,"up"),onMoveDown:()=>se(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,m.jsx)(z,{children:e.emoji}),(0,m.jsxs)(v,{children:[(0,m.jsxs)(k,{children:[e.name,r&&(0,m.jsx)(B,{children:o("recipes:generalStockCategoriesTab.brand")})]}),(0,m.jsxs)(f,{children:[(0,m.jsxs)("span",{children:[e.stock_count||0," items"]}),!r&&(0,m.jsx)($,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,m.jsx)(b,{children:e.description})]}),!r&&(0,m.jsxs)(C,{children:[(0,m.jsx)(S,{onClick:()=>re(e),title:"Edit",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(S,{onClick:()=>(e=>{H(e),G(!0)})(e),title:"Delete",children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return U?(0,m.jsx)(y,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:o("recipes:generalStockCategoriesTab.loading")})}):(0,m.jsxs)(y,{children:[(0,m.jsxs)(A,{children:[(0,m.jsx)(E,{children:o("recipes:generalStockCategoriesTab.generalStockCategories")}),(0,m.jsx)(x.cc,{variant:"primary",onClick:()=>re(),children:"Add Category"})]}),V&&N.length>0&&(0,m.jsxs)(D,{children:[(0,m.jsx)(I,{children:"Brand Categories (Read Only)"}),(0,m.jsx)(j,{children:N.map((e,t)=>oe(e,t,N,!0))})]}),0===R.length?(0,m.jsxs)(p.pp,{children:[(0,m.jsx)(F,{children:o("recipes:generalStockCategoriesTab.noGeneralStockCategoriesYet")}),(0,m.jsx)(w,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,m.jsx)(x.cc,{variant:"primary",onClick:()=>re(),children:"Add Category"})]}):(0,m.jsx)(j,{children:R.map((e,t)=>{return oe(e,t,R,(n=e,V&&"brand"===n.owner_type));var n})}),(0,m.jsx)(c.aF,{isOpen:L,onClose:ie,title:(W?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:ie,children:o("recipes:generalStockCategoriesTab.cancel")}),(0,m.jsx)(c.yl,{variant:"primary",onClick:ae,disabled:!X.name.trim(),children:W?"Update":"Create"})]}),children:(0,m.jsxs)("form",{onSubmit:ae,children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:X.name,onChange:e=>K({...X,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:o("recipes:generalStockCategoriesTab.icon")}),(0,m.jsx)(O,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,m.jsx)(T,{selected:X.emoji===e,onClick:()=>K({...X,emoji:e}),type:"button",children:e},e))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:o("recipes:generalStockCategoriesTab.description")}),(0,m.jsx)(c.Lz,{value:X.description,onChange:e=>K({...X,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,m.jsx)(h.A,{isOpen:J,onCancel:()=>{G(!1),H(null)},onConfirm:async()=>{if(Y)try{const e=localStorage.getItem("auth_token");let n="";if(t||ee?n=`/api/general-stock-categories/${Y.id}`:V&&u&&(n=`/api/restaurants/${u}/general-stock-categories/${Y.id}`),!n)return;const r=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(G(!1),H(null),ne(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:Y?`Are you sure you want to delete "${Y.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})};var M=n(4877);const N=a.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,P=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,U=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,Q=a.Ay.div`
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
`,L=a.Ay.div`
  flex: 1;
`,Z=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,W=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,q=a.Ay.div`
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
`,J=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,G=a.Ay.div`
  display: flex;
  flex-direction: column;
`,Y=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,H=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #EF4444; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,X=a.Ay.div`
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
`,K=a.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #EF4444; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,V=a.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,ee=a.Ay.button`
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
`,te=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,ne=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,re=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ie=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,ae=(0,a.Ay)(s.A0)`
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
`,se=(0,a.Ay)(s.Hj)`
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
`,oe=a.Ay.div`
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
`,le=a.Ay.input`
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
`,ce=a.Ay.input`
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
`,de=a.Ay.button`
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
`,ue=a.Ay.button`
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
`,pe=a.Ay.button`
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
`,xe=e=>{let{mode:t,restaurantId:n}=e;const{t:a}=(0,g.Bd)("common");(0,l.As)();const[p,x]=(0,i.ok)(),{defaultCurrency:h}=(0,d.i1)(),[y,j]=(0,r.useState)("RM"),_="restaurant"===t?n:void 0,v="brand"===t,k=p.get("tab")||"dashboard",f=e=>{x({tab:e})},[,b]=(0,r.useState)(0),[,C]=(0,r.useState)(0),[S,F]=(0,r.useState)(!0),[w,A]=(0,r.useState)(null),[E,B]=(0,r.useState)([]),[$,z]=(0,r.useState)([]),[O,T]=(0,r.useState)([]),[D,I]=(0,r.useState)([]),[xe,ge]=(0,r.useState)(""),[me,ye]=(0,r.useState)("all"),[je,_e]=(0,r.useState)([]),[ve,ke]=(0,r.useState)(null),[fe,be]=(0,r.useState)(!1),[Ce,Se]=(0,r.useState)(""),[Fe,we]=(0,r.useState)(""),[Ae,Ee]=(0,r.useState)(""),[Be,$e]=(0,r.useState)(""),[ze,Oe]=(0,r.useState)(""),[Te,De]=(0,r.useState)("all"),[Ie,Re]=(0,r.useState)(!1),[Me,Ne]=(0,r.useState)(!1),[Pe,Ue]=(0,r.useState)(!1),[Qe,Le]=(0,r.useState)(null),[Ze,We]=(0,r.useState)(""),[qe,Je]=(0,r.useState)(""),[Ge,Ye]=(0,r.useState)(""),[He,Xe]=(0,r.useState)(""),[Ke,Ve]=(0,r.useState)(""),[et,tt]=(0,r.useState)({}),[,nt]=(0,r.useState)(!1),[rt,it]=(0,r.useState)(!1),[at,st]=(0,r.useState)(!1),[ot,lt]=(0,r.useState)(null),[ct,dt]=(0,r.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[ut,pt]=(0,r.useState)(!1),[xt,ht]=(0,r.useState)(!1),[gt,mt]=(0,r.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[yt,jt]=(0,r.useState)(!1),[_t,vt]=(0,r.useState)([]),[kt,ft]=(0,r.useState)([]),[,bt]=(0,r.useState)(!1),[Ct,St]=(0,r.useState)(!1),[Ft,wt]=(0,r.useState)(null),[At,Et]=(0,r.useState)(!1),[Bt,$t]=(0,r.useState)(null),[zt,Ot]=(0,r.useState)(!1),[Tt,Dt]=(0,r.useState)(null),[It,Rt]=(0,r.useState)(""),Mt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],[Nt,Pt]=(0,r.useState)(null),[Ut,Qt]=(0,r.useState)(""),[Lt,Zt]=(0,r.useState)("ingredient"),Wt=(e,t)=>e<=0?"out_of_stock":e<=t?"low_stock":"normal",[qt,Jt]=(0,r.useState)({});(0,r.useEffect)(()=>{h&&j(h)},[h]);const Gt=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),Yt=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Gt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Gt]),Ht=(0,r.useCallback)(async()=>{if("restaurant"!==t||_)try{if(F(!0),"restaurant"===t){const[e,t,n,r,i]=await Promise.all([Yt(`/api/restaurants/${_}/inventory/summary`),Yt(`/api/restaurants/${_}/inventory`),Yt(`/api/restaurants/${_}/inventory/alerts?resolved=false`),Yt(`/api/restaurants/${_}/inventory/reorder-suggestions`),Yt(`/api/restaurants/${_}/inventory/expiring?days=14`)]);e.success&&A(e.data),t.success&&B(t.data),n.success&&z(n.data),r.success&&T(r.data),i.success&&I(i.data);try{const e=await Yt(`/api/restaurants/${_}/inventory/general-stock`);e.success&&_e(e.data||[])}catch{_e([])}try{const e=await Yt(`/api/restaurants/${_}/suppliers`);e.success&&vt(e.data||[])}catch{vt([])}try{const e=await Yt(`/api/restaurants/${_}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];ft(t)}}catch{ft([])}}else{const e=await Yt("/api/product-ingredients?track_stock=true");if(e.success){const t=(e.data||[]).map(e=>{var t;const n=parseFloat(e.current_stock)||0,r=parseFloat(e.min_stock)||0;let i="normal";return n<=0?i="out_of_stock":n<=r&&(i="low_stock"),{id:e.id,name:e.name,code:e.code,image_url:e.image_url,unit:e.unit,unit_cost:parseFloat(e.unit_cost)||0,category:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized",current_stock:n,min_stock:r,min_order:parseFloat(e.min_order)||0,last_actual_stock:parseFloat(e.last_actual_stock)||0,last_stock_take_at:e.last_stock_take_at,avg_daily_usage:parseFloat(e.avg_daily_usage)||0,lead_time_days:e.lead_time_days||1,safety_stock_percent:parseFloat(e.safety_stock_percent)||20,manual_daily_usage:e.manual_daily_usage?parseFloat(e.manual_daily_usage):null,prediction_confidence:e.prediction_confidence||"none",stock_status:i,supplier_id:e.supplier_id,supplier_name:e.supplier_name}});B(t);const n=t.filter(e=>"low_stock"===e.stock_status).length,r=t.filter(e=>"out_of_stock"===e.stock_status).length;A({total_items:t.length,low_stock_count:n,out_of_stock_count:r,monthly_loss:0,unresolved_alerts:n+r});const i=t.filter(e=>"normal"!==e.stock_status).map((e,t)=>({id:t,ingredient_id:e.id,alert_type:e.stock_status,current_stock:e.current_stock,min_stock:e.min_stock,ingredient:{id:e.id,name:e.name,unit:e.unit,unit_cost:e.unit_cost}}));z(i)}try{const e=await Yt("/api/general-stock");e.success&&_e(e.data||[])}catch{_e([])}try{const e=await Yt("/api/general-stock-categories");e.success&&ft(e.data||[])}catch{ft([])}try{const e=await Yt("/api/suppliers");e.success&&vt(e.data||[])}catch{vt([])}T([]),I([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{F(!1)}},[t,_,Yt]);(0,r.useEffect)(()=>{Ht()},[Ht]),(0,r.useEffect)(()=>{if(E.length>0){const e=E.some(e=>e.current_stock>0||e.last_stock_take_at);nt(!e)}},[E]);const Xt=(e,t,n)=>{tt(r=>({...r,[e]:{...r[e],[t]:n}}))},Kt=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},Vt=e=>{Le(e),We(""),Je(""),Ye(""),Xe(""),Ve(""),Re(!0)},en=e=>{Le(e),We(""),Je(""),Ne(!0)},tn=(e,t,n)=>{Pt(e),Qt(t.toString()),Zt(n)},nn=()=>{Pt(null),Qt("")},rn=async e=>{const n=parseFloat(Ut);if(isNaN(n)||n<0)nn();else try{let r;if("restaurant"===t){const t="ingredient"===Lt?`/api/restaurants/${_}/inventory/adjust`:`/api/restaurants/${_}/inventory/general-stock/${e}/adjust`,i={new_quantity:n,reason:"Stock adjustment"};"ingredient"===Lt&&(i.ingredient_id=e),r=await Yt(t,{method:"POST",body:JSON.stringify(i)})}else r=v&&"general_stock"===Lt?await Yt(`/api/general-stock/${e}/adjust`,{method:"POST",body:JSON.stringify({new_quantity:n,reason:"Stock adjustment"})}):await Yt(`/api/product-ingredients/${e}`,{method:"PUT",body:JSON.stringify({current_stock:n})});if(r.success){const t=(new Date).toISOString();"ingredient"===Lt?B(r=>r.map(r=>{if(r.id===e){const e=Wt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r})):_e(r=>r.map(r=>{if(r.id===e){const e=Wt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r}))}}catch(r){console.error("Failed to adjust stock:",r)}finally{nn()}},an=(e,t)=>{"Enter"===e.key?rn(t):"Escape"===e.key&&nn()},sn=e=>{Dt(e),Rt(e.min_order?String(e.min_order):""),Ot(!0)},on=E.filter(e=>{const t=e.name.toLowerCase().includes(xe.toLowerCase()),n="all"===me||e.stock_status===me;return t&&n}),ln=e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString()}catch{return"-"}},cn=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)},dn=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return"restaurant"!==t||!!_?(0,m.jsxs)(s.mc,{children:[(0,m.jsx)(s.Y9,{children:(0,m.jsx)(s.hE,{children:"Inventory"})}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(s.j,{children:[(0,m.jsx)(s.oz,{active:"dashboard"===k,onClick:()=>f("dashboard"),children:"Dashboard"}),(0,m.jsx)(s.oz,{active:"list"===k,onClick:()=>f("list"),children:"Stock List"}),(0,m.jsx)(s.oz,{active:"history"===k,onClick:()=>f("history"),children:"History"}),(0,m.jsx)(s.oz,{active:"categories"===k,onClick:()=>f("categories"),children:"Categories"})]}),S?(0,m.jsx)(s.pp,{children:"Loading..."}):"dashboard"===k?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(s.MD,{children:[(0,m.jsxs)(s.hI,{color:"#059669",children:[(0,m.jsx)(s.Os,{children:(null===w||void 0===w?void 0:w.total_items)||0}),(0,m.jsx)(s.v0,{children:"Total Ingredients"}),(0,m.jsx)(s.d1,{children:"managed items"})]}),(0,m.jsxs)(s.hI,{color:"#D97706",children:[(0,m.jsx)(s.Os,{children:(null===w||void 0===w?void 0:w.low_stock_count)||0}),(0,m.jsx)(s.v0,{children:"Low Stock"}),(0,m.jsx)(s.d1,{children:"need attention"})]}),(0,m.jsxs)(s.hI,{color:"#DC2626",children:[(0,m.jsx)(s.Os,{children:(null===w||void 0===w?void 0:w.out_of_stock_count)||0}),(0,m.jsx)(s.v0,{children:"Out of Stock"}),(0,m.jsx)(s.d1,{children:"urgent"})]}),(0,m.jsxs)(s.hI,{color:"#7C3AED",children:[(0,m.jsx)(s.Os,{children:(0,u.vv)((null===w||void 0===w?void 0:w.monthly_loss)||0,y)}),(0,m.jsx)(s.v0,{children:"Monthly Loss"}),(0,m.jsx)(s.d1,{children:"this month"})]}),(0,m.jsxs)(s.hI,{color:"#EA580C",children:[(0,m.jsx)(s.Os,{children:D.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,m.jsx)(s.v0,{children:"Expiring Soon"}),(0,m.jsx)(s.d1,{children:"within 3 days"})]})]}),$.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(P,{children:"Stock Alerts"}),(0,m.jsx)("div",{children:$.slice(0,5).map(e=>(0,m.jsxs)(Q,{type:e.alert_type,children:[(0,m.jsxs)(L,{children:[(0,m.jsx)(Z,{children:e.ingredient.name}),(0,m.jsxs)(W,{children:["Current: ",cn(e.current_stock)," ",e.ingredient.unit," / Min: ",cn(e.min_stock)," ",e.ingredient.unit]})]}),(0,m.jsxs)(s.wr,{children:[(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&Vt(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>(async e=>{if("brand"!==t)try{(await Yt(`/api/restaurants/${_}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&z(t=>t.filter(t=>t.id!==e))}catch(n){console.error("Failed to resolve alert:",n)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),D.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(P,{children:"Expiring Items"}),(0,m.jsx)("div",{children:D.slice(0,5).map(e=>(0,m.jsxs)(X,{urgency:e.urgency,children:[(0,m.jsxs)(L,{children:[(0,m.jsxs)(Z,{children:[e.ingredient_name,e.batch_number&&(0,m.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,m.jsxs)(W,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,m.jsx)(K,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,m.jsx)(s.$n,{variant:"danger",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&en(t)},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),O.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(P,{children:"Reorder Suggestions"}),(0,m.jsx)(N,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,m.jsxs)(s.XI,{children:[(0,m.jsxs)(s.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,m.jsx)("span",{children:"Ingredient"}),(0,m.jsx)("span",{children:"Current Stock"}),(0,m.jsx)("span",{children:"Daily Usage"}),(0,m.jsx)("span",{children:"Suggested Qty"}),(0,m.jsx)("span",{className:"col-cost",children:"Est. Cost"}),(0,m.jsx)("span",{children:"Urgency"}),(0,m.jsx)("span",{children:"Order"})]}),O.slice(0,10).map(e=>(0,m.jsxs)(s.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,m.jsx)("div",{children:e.ingredient.name}),(0,m.jsxs)("div",{children:[cn(e.current_stock)," ",e.ingredient.unit]}),(0,m.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,m.jsxs)("div",{style:{fontWeight:600},children:[cn(e.suggested_qty)," ",e.ingredient.unit]}),(0,m.jsx)("div",{className:"col-cost",children:(0,u.vv)(e.estimated_cost,y)}),(0,m.jsx)("div",{children:(0,m.jsx)(H,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,m.jsx)(ce,{type:"number",min:"0",step:"1",value:qt[e.ingredient.id]||e.suggested_qty,onChange:t=>Jt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,m.jsx)(de,{onClick:()=>{const t=E.find(t=>t.id===e.ingredient.id);t&&sn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,m.jsxs)(te,{children:[(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${_}/recipe-management?tab=ingredients`:f("list")},children:"+ Receive Stock"}),(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${_}/recipe-management?tab=ingredients`:f("list")},children:"+ Record Waste"}),(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>f("history"),children:"View All Transactions"})]})]}):"list"===k?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(o.Qn,{children:[(0,m.jsxs)(o.Jt,{value:Te,onChange:e=>De(e.target.value),style:{minWidth:"140px"},children:[(0,m.jsx)("option",{value:"all",children:"All Items"}),(0,m.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,m.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,m.jsx)(o.DO,{type:"text",placeholder:"Search...",value:xe,onChange:e=>ge(e.target.value)}),(0,m.jsxs)(o.Jt,{value:me,onChange:e=>ye(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Status"}),(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,m.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>ht(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===Te||"general_stock"===Te)&&je.length>0&&(0,m.jsxs)(m.Fragment,{children:["all"===Te&&(0,m.jsxs)(P,{children:["General Stock (",je.filter(e=>{const t=e.name.toLowerCase().includes(xe.toLowerCase()),n="all"===me||e.stock_status===me;return t&&n}).length,")"]}),(0,m.jsxs)(s.XI,{style:{marginBottom:"24px"},children:[(0,m.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,m.jsx)("span",{className:"col-info",children:"Item"}),(0,m.jsx)("span",{children:"Status"}),(0,m.jsx)("span",{children:"Current Stock"}),(0,m.jsx)("span",{children:"Min Stock"}),(0,m.jsx)("span",{className:"col-cost",children:"Unit Cost"}),(0,m.jsx)("span",{children:"Supplier"}),(0,m.jsx)("span",{children:"Last Stock Take"}),(0,m.jsx)("span",{children:"Order"}),(0,m.jsx)("span",{className:"col-action",children:"Actions"})]}),je.filter(e=>{const t=e.name.toLowerCase().includes(xe.toLowerCase()),n="all"===me||e.stock_status===me;return t&&n}).map(e=>(0,m.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,m.jsxs)(s.Np,{children:[(0,m.jsxs)(s.Uj,{className:"col-info",children:[(0,m.jsx)(s.PM,{children:"Item"}),(0,m.jsxs)(J,{children:[(0,m.jsx)(q,{children:e.image_url?(0,m.jsx)("img",{src:e.image_url,alt:e.name}):(0,m.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,m.jsxs)(G,{children:[(0,m.jsx)(re,{children:e.name}),e.code&&(0,m.jsx)(Y,{children:e.code}),(0,m.jsx)(ie,{children:e.category})]})]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Status"}),(0,m.jsx)(U,{status:e.stock_status,children:dn(e.stock_status)})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Current Stock"}),Nt===e.id&&"general_stock"===Lt?(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,m.jsx)(le,{type:"number",step:"0.01",value:Ut,onChange:e=>Qt(e.target.value),onKeyDown:t=>an(t,e.id),onBlur:()=>rn(e.id),autoFocus:!0}),(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,m.jsxs)(oe,{onClick:()=>tn(e.id,e.current_stock,"general_stock"),children:[(0,m.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:cn(e.current_stock)}),(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Min Stock"}),(0,m.jsxs)("div",{style:{color:"#6B7280"},children:[cn(e.min_stock)," ",e.stock_unit]})]}),(0,m.jsxs)(s.Uj,{className:"col-cost",children:[(0,m.jsx)(s.PM,{children:"Unit Cost"}),(0,m.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,y)})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Supplier"}),(0,m.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Last Stock Take"}),(0,m.jsx)("div",{style:{color:"#6B7280"},children:ln(e.last_stock_take_at)})]})]}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,m.jsx)(ce,{type:"number",min:"0",step:"1",value:qt[`gs_${e.id}`]||"",onChange:t=>Jt(n=>({...n,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,m.jsx)(de,{onClick:()=>{const t=qt[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(sn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),Rt(t))},children:"Order"})]}),(0,m.jsxs)(s.wr,{children:[(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{ke(e),Se(""),we(""),Ee(""),$e(""),Oe(""),be(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,m.jsx)(pe,{onClick:()=>{var t;wt(e),mt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),St(!0)},children:"Edit"}),(0,m.jsx)(ue,{onClick:()=>{$t({type:"general_stock",id:e.id,name:e.name}),Et(!0)},children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===Te||"ingredients"===Te)&&(0,m.jsxs)(m.Fragment,{children:["all"===Te&&(0,m.jsxs)(P,{children:["Ingredients (",on.length,")"]}),0===on.length?(0,m.jsxs)(s.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===E.length?"No ingredients found":"No matching ingredients"}),(0,m.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===E.length?"brand"===t?'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.':"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===E.length&&(0,m.jsxs)(s.$n,{variant:"primary",onClick:()=>window.location.href="brand"===t?"/brand/product-recipe?tab=ingredients":`/restaurant/${_}/recipe-management?tab=ingredients`,children:["Go to ","brand"===t?"Product Ingredients":"Ingredients"]})]}):(0,m.jsxs)(s.XI,{children:[(0,m.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,m.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,m.jsx)("span",{children:"Status"}),(0,m.jsx)("span",{children:"Current Stock"}),(0,m.jsx)("span",{children:"Min / Prediction"}),(0,m.jsx)("span",{className:"col-cost",children:"Unit Cost"}),(0,m.jsx)("span",{children:"Supplier"}),(0,m.jsx)("span",{children:"Last Stock Take"}),(0,m.jsx)("span",{children:"Order"}),(0,m.jsx)("span",{className:"col-action",children:"Actions"})]}),on.map(e=>(0,m.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,m.jsxs)(s.Np,{children:[(0,m.jsxs)(s.Uj,{className:"col-info",children:[(0,m.jsx)(s.PM,{children:"Ingredient"}),(0,m.jsxs)(J,{children:[(0,m.jsx)(q,{children:e.image_url?(0,m.jsx)("img",{src:e.image_url,alt:e.name}):(0,m.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,m.jsxs)(G,{children:[(0,m.jsx)(re,{children:e.name}),e.code&&(0,m.jsx)(Y,{children:e.code}),(0,m.jsxs)(ie,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Status"}),(0,m.jsx)(U,{status:e.stock_status,children:dn(e.stock_status)})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Current Stock"}),Nt===e.id&&"ingredient"===Lt?(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,m.jsx)(le,{type:"number",step:"0.01",value:Ut,onChange:e=>Qt(e.target.value),onKeyDown:t=>an(t,e.id),onBlur:()=>rn(e.id),autoFocus:!0}),(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,m.jsxs)(oe,{onClick:()=>tn(e.id,e.current_stock,"ingredient"),children:[(0,m.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:cn(e.current_stock)}),(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Min / Prediction"}),(0,m.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",cn(e.min_stock)," ",e.unit]}),(0,m.jsx)(V,{level:e.prediction_confidence||"none",children:Kt(e.prediction_confidence||"none")})]}),(0,m.jsxs)(s.Uj,{className:"col-cost",children:[(0,m.jsx)(s.PM,{children:"Unit Cost"}),(0,m.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,y)})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Supplier"}),(0,m.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Last Stock Take"}),(0,m.jsx)("div",{style:{color:"#6B7280"},children:ln(e.last_stock_take_at)})]})]}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,m.jsx)(ce,{type:"number",min:"0",step:"1",value:qt[e.id]||"",onChange:t=>Jt(n=>({...n,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,m.jsx)(de,{onClick:()=>{const t=qt[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(sn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),Rt(t))},children:"Order"})]}),(0,m.jsxs)(s.wr,{children:[(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>Vt(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,m.jsx)(s.$n,{variant:"danger",onClick:()=>en(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Waste"}),(0,m.jsx)(ee,{onClick:()=>(e=>{var t;lt(e),dt({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),st(!0)})(e),children:"Settings"}),(0,m.jsx)(ue,{onClick:()=>{$t({type:"ingredient",id:e.id,name:e.name}),Et(!0)},children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id))]})]})]}):"categories"===k?(0,m.jsx)(R,{isBrandGeneralMode:v,restaurantId:"restaurant"===t&&_?Number(_):null,onCountChange:b,onCategoryChange:()=>C(e=>e+1)}):(0,m.jsx)(he,{restaurantId:"restaurant"===t?_:void 0,isBrandGeneralMode:v,currency:y})]}),(0,m.jsx)(c.aF,{isOpen:Ie,onClose:()=>Re(!1),title:"Receive Stock",size:"medium",children:Qe&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(N,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Ingredient"}),(0,m.jsx)(c.ZQ,{type:"text",value:Qe.name,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Current Stock"}),(0,m.jsx)(c.ZQ,{type:"text",value:`${cn(Qe.current_stock)} ${Qe.unit}`,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Quantity Received (",Qe.unit,") *"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>We(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,m.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,m.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,m.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,m.jsx)(c.ZQ,{type:"text",value:Ge,onChange:e=>Ye(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,m.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,m.jsx)(c.lR,{children:"Manufacture Date"}),(0,m.jsx)(c.ZQ,{type:"date",value:He,onChange:e=>Xe(e.target.value)})]})]}),(0,m.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,m.jsx)(c.lR,{children:"Expiry Date"}),(0,m.jsx)(c.ZQ,{type:"date",value:Ke,onChange:e=>Ve(e.target.value)}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Notes (Optional)"}),(0,m.jsx)(c.ZQ,{type:"text",value:qe,onChange:e=>Je(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>Re(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Qe&&Ze)try{let r;if("restaurant"===t)r=await Yt(`/api/restaurants/${_}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Qe.id,quantity:parseFloat(Ze),notes:qe,batch_number:Ge||null,manufacture_date:He||null,expiry_date:Ke||null})});else{const e=Qe.current_stock+parseFloat(Ze);r=await Yt(`/api/product-ingredients/${Qe.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:Qe.current_stock+parseFloat(Ze),i=Wt(t,Qe.min_stock),a=(new Date).toISOString();B(e=>e.map(e=>e.id===Qe.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),z(e=>e.filter(e=>e.ingredient_id!==Qe.id)),Re(!1),Le(null),We(""),Je(""),Ye(""),Xe(""),Ve("")}}catch(r){console.error("Failed to receive stock:",r)}},children:"Confirm Receive"})]})]})}),(0,m.jsx)(c.aF,{isOpen:Me,onClose:()=>Ne(!1),title:"Record Waste",size:"small",children:Qe&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(N,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Ingredient"}),(0,m.jsx)(c.ZQ,{type:"text",value:Qe.name,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Current Stock"}),(0,m.jsx)(c.ZQ,{type:"text",value:`${cn(Qe.current_stock)} ${Qe.unit}`,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Waste Quantity (",Qe.unit,") *"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>We(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Reason (Optional)"}),(0,m.jsx)(c.ZQ,{type:"text",value:qe,onChange:e=>Je(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>Ne(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Qe&&Ze)try{let r;if("restaurant"===t)r=await Yt(`/api/restaurants/${_}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Qe.id,quantity:parseFloat(Ze),notes:qe})});else{const e=Math.max(0,Qe.current_stock-parseFloat(Ze));r=await Yt(`/api/product-ingredients/${Qe.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:Math.max(0,Qe.current_stock-parseFloat(Ze)),i=Wt(t,Qe.min_stock),a=(new Date).toISOString();B(e=>e.map(e=>e.id===Qe.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Ne(!1),Le(null),We(""),Je("")}}catch(r){console.error("Failed to record waste:",r)}},children:"Confirm Waste"})]})]})}),(0,m.jsxs)(c.aF,{isOpen:Pe,onClose:()=>Ue(!1),title:"Set Initial Stock",size:"large",children:[(0,m.jsx)(N,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,m.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(E.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,m.jsxs)(s.XI,{children:[(0,m.jsxs)(s.A0,{columns:"2fr 1fr 1fr",children:[(0,m.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,m.jsx)("span",{children:"Current Qty"}),(0,m.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,m.jsxs)(s.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,m.jsx)("div",{children:(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=et[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>Xt(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,m.jsx)("div",{children:(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=et[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>Xt(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>Ue(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(et).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{it(!0);if((await Yt(`/api/restaurants/${_}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success){const e=(new Date).toISOString();B(t=>t.map(t=>{const n=et[t.id];if(n&&parseFloat(n.quantity)>0){const r=parseFloat(n.quantity),i=parseFloat(n.min_stock)||0,a=Wt(r,i);return{...t,current_stock:r,min_stock:i,stock_status:a,last_stock_take_at:e}}return t})),Ue(!1),nt(!1)}}catch(t){console.error("Failed to save initial stock:",t)}finally{it(!1)}},disabled:rt,children:rt?"Saving...":"Save Initial Stock"})]})]}),(0,m.jsx)(c.aF,{isOpen:fe,onClose:()=>be(!1),title:"Receive Stock",size:"medium",children:ve&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(N,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Item"}),(0,m.jsx)(c.ZQ,{type:"text",value:ve.name,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Current Stock"}),(0,m.jsx)(c.ZQ,{type:"text",value:`${cn(ve.current_stock)} ${ve.stock_unit}`,disabled:!0})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Quantity Received (",ve.stock_unit,") *"]}),(0,m.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Ce,onChange:e=>Se(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,m.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,m.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,m.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,m.jsx)(c.ZQ,{type:"text",value:Ae,onChange:e=>Ee(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,m.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,m.jsx)(c.lR,{children:"Manufacture Date"}),(0,m.jsx)(c.ZQ,{type:"date",value:Be,onChange:e=>$e(e.target.value)})]})]}),(0,m.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,m.jsx)(c.lR,{children:"Expiry Date"}),(0,m.jsx)(c.ZQ,{type:"date",value:ze,onChange:e=>Oe(e.target.value)}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Notes (Optional)"}),(0,m.jsx)(c.ZQ,{type:"text",value:Fe,onChange:e=>we(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Ce&&!(parseFloat(Ce)<=0))try{const n=v?`/api/general-stock/${ve.id}/receive`:`/api/restaurants/${_}/inventory/general-stock/${ve.id}/receive`,r=await Yt(n,{method:"POST",body:JSON.stringify({quantity:parseFloat(Ce),notes:Fe,batch_number:Ae||null,manufacture_date:Be||null,expiry_date:ze||null})});if(r.success){var e,t;const n=null!==(e=null===(t=r.data)||void 0===t?void 0:t.current_stock)&&void 0!==e?e:parseFloat(String(ve.current_stock))+parseFloat(Ce),i=Wt(n,ve.min_stock),a=(new Date).toISOString();_e(e=>e.map(e=>e.id===ve.id?{...e,current_stock:n,stock_status:i,last_stock_take_at:a}:e)),be(!1),Se(""),we(""),Ee(""),$e(""),Oe("")}}catch(n){console.error("Failed to receive general stock:",n)}},disabled:!Ce||parseFloat(Ce)<=0,children:"Confirm Receive"})]})]})}),(0,m.jsx)(c.aF,{isOpen:zt,onClose:()=>Ot(!1),title:`Order: ${(null===Tt||void 0===Tt?void 0:Tt.name)||""}`,size:"small",children:Tt&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,m.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[cn(Tt.current_stock)," ",Tt.unit]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,m.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[cn(Tt.min_stock)," ",Tt.unit]})]})]}),Tt.min_order&&Tt.min_order>0&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",cn(Tt.min_order)," ",Tt.unit]}),Tt.supplier_name&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Tt.supplier_name]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Order Quantity (",Tt.unit,") *"]}),(0,m.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:It,onChange:e=>Rt(e.target.value),placeholder:Tt.min_order?`Min: ${Tt.min_order}`:"Enter quantity"})]}),It&&parseFloat(It)>0&&(0,m.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,u.vv)(parseFloat(It)*Tt.unit_cost,y)})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>Ot(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:()=>{Tt&&It&&(alert(`Order sent: ${It} ${Tt.unit} of ${Tt.name}`),Ot(!1),Dt(null),Rt(""))},disabled:!It||parseFloat(It)<=0,children:"Send Order"})]})]})}),(0,m.jsx)(c.aF,{isOpen:at,onClose:()=>st(!1),title:`Settings: ${(null===ot||void 0===ot?void 0:ot.name)||""}`,size:"small",children:ot&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(N,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,m.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,m.jsx)(V,{level:ot.prediction_confidence||"none",children:Kt(ot.prediction_confidence||"none")}),(0,m.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(ot.avg_daily_usage))||0).toFixed(2)," ",ot.unit,"/day (calculated)"]})]})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Minimum Stock Level (",ot.unit,")"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_stock,onChange:e=>dt({...ct,min_stock:e.target.value}),placeholder:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Minimum Order (",ot.unit,")"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_order,onChange:e=>dt({...ct,min_order:e.target.value}),placeholder:"0"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Lead Time (days)"}),(0,m.jsx)(c.ZQ,{type:"number",min:"1",value:ct.lead_time_days,onChange:e=>dt({...ct,lead_time_days:e.target.value}),placeholder:"1"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,m.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:ct.safety_stock_percent,onChange:e=>dt({...ct,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Manual Daily Usage (",ot.unit,"/day)"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.manual_daily_usage,onChange:e=>dt({...ct,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>st(!1),children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(ot)try{pt(!0);if((await Yt(`/api/restaurants/${_}/inventory/${ot.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(ct.lead_time_days)||1,safety_stock_percent:parseFloat(ct.safety_stock_percent)||20,manual_daily_usage:ct.manual_daily_usage?parseFloat(ct.manual_daily_usage):null,min_stock:parseFloat(ct.min_stock)||0,min_order:parseFloat(ct.min_order)||0})})).success){const e=parseFloat(ct.min_stock)||0;B(t=>t.map(t=>{if(t.id===ot.id){const n=Wt(t.current_stock,e);return{...t,lead_time_days:parseInt(ct.lead_time_days)||1,safety_stock_percent:parseFloat(ct.safety_stock_percent)||20,manual_daily_usage:ct.manual_daily_usage?parseFloat(ct.manual_daily_usage):null,min_stock:e,stock_status:n}}return t})),st(!1)}}catch(e){console.error("Failed to save settings:",e)}finally{pt(!1)}},disabled:ut,children:ut?"Saving...":"Save Settings"})]})]})}),(0,m.jsxs)(c.aF,{isOpen:xt,onClose:()=>{ht(!1),bt(!1)},title:"Add General Stock",size:"medium",children:[(0,m.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Item Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Code (SKU)"}),(0,m.jsx)(c.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,m.jsx)(M.A,{value:gt.image_url,onChange:e=>mt({...gt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Unit *"}),(0,m.jsx)(o.Jt,{value:gt.stock_unit,onChange:e=>mt({...gt,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Mt.map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category"}),(0,m.jsxs)(o.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,m.jsx)("option",{value:"",children:"Select Category"}),kt.map(e=>(0,m.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Supplier"}),(0,m.jsxs)(o.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,m.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),_t.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Unit Cost"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Initial Stock"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Min Stock"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Min Order"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,m.jsxs)(ne,{style:{marginTop:"24px"},children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>{ht(!1),bt(!1)},children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim())try{jt(!0);const e=v?"/api/general-stock":`/api/restaurants/${_}/inventory/general-stock`,t=await Yt(e,{method:"POST",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})});if(t.success&&t.data){const e={...t.data,stock_unit:t.data.stock_unit||t.data.unit||gt.stock_unit,stock_status:Wt(parseFloat(gt.current_stock)||0,parseFloat(gt.min_stock)||0),last_stock_take_at:(new Date).toISOString()};_e(t=>[...t,e]),ht(!1),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to add general stock:",e)}finally{jt(!1)}},disabled:yt||!gt.name.trim(),children:yt?"Adding...":"Add Item"})]})]}),(0,m.jsxs)(c.aF,{isOpen:Ct,onClose:()=>{St(!1),wt(null)},title:"Edit General Stock",size:"medium",children:[(0,m.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Item Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Code (SKU)"}),(0,m.jsx)(c.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,m.jsx)(M.A,{value:gt.image_url,onChange:e=>mt({...gt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Unit *"}),(0,m.jsx)(o.Jt,{value:gt.stock_unit,onChange:e=>mt({...gt,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Mt.map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category"}),(0,m.jsxs)(o.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,m.jsx)("option",{value:"",children:"Select Category"}),kt.map(e=>(0,m.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Supplier"}),(0,m.jsxs)(o.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,m.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),_t.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Unit Cost"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Current Stock"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Min Stock"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Min Order"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,m.jsxs)(ne,{style:{marginTop:"24px"},children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>{St(!1),wt(null)},children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim()&&Ft)try{jt(!0);const e=v?`/api/general-stock/${Ft.id}`:`/api/restaurants/${_}/inventory/general-stock/${Ft.id}`;if((await Yt(e,{method:"PUT",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})})).success&&Ft){const e=parseFloat(gt.current_stock)||0,t=parseFloat(gt.min_stock)||0;_e(n=>n.map(n=>n.id===Ft.id?{...n,name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:e,min_stock:t,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null,stock_status:Wt(e,t)}:n)),St(!1),wt(null),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to update general stock:",e)}finally{jt(!1)}},disabled:yt||!gt.name.trim(),children:yt?"Saving...":"Save Changes"})]})]}),(0,m.jsx)(c.aF,{isOpen:At,onClose:()=>{Et(!1),$t(null)},title:"Unlink from Inventory",size:"small",children:Bt&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Bt.name}),(0,m.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Bt.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,m.jsxs)(ne,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>{Et(!1),$t(null)},children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Bt.type){const e="brand"===t?`/api/product-ingredients/${Bt.id}`:`/api/restaurants/${_}/ingredients/${Bt.id}`;(await Yt(e,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&B(e=>e.filter(e=>e.id!==Bt.id))}else{const e=v?`/api/general-stock/${Bt.id}`:`/api/restaurants/${_}/inventory/general-stock/${Bt.id}`;(await Yt(e,{method:"DELETE"})).success&&_e(e=>e.filter(e=>e.id!==Bt.id))}Et(!1),$t(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#EF4444"},children:"ingredient"===Bt.type?"Unlink":"Delete"})]})]})})]}):(0,m.jsx)(s.mc,{children:(0,m.jsx)(s.pp,{children:(0,m.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})},he=e=>{let{restaurantId:t,isBrandGeneralMode:n,currency:i}=e;const[a,o]=(0,r.useState)([]),[l,c]=(0,r.useState)(!0),d=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)};(0,r.useEffect)(()=>{(t||n)&&(async()=>{try{const e=localStorage.getItem("auth_token"),r=n?"/api/general-stock/transactions?limit=50":`/api/restaurants/${t}/inventory/transactions?limit=50`,i=await fetch(r,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();a.success&&o(a.data||[])}catch(e){console.error("Failed to fetch transactions:",e)}finally{c(!1)}})()},[t,n]);const u=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},p=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return l?(0,m.jsx)(s.pp,{children:"Loading transactions..."}):0===a.length?(0,m.jsxs)(s.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,m.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,m.jsxs)(s.XI,{children:[(0,m.jsxs)(s.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,m.jsx)("span",{children:"Date"}),(0,m.jsx)("span",{className:"col-info",children:"Ingredient"}),(0,m.jsx)("span",{children:"Type"}),(0,m.jsx)("span",{children:"Change"}),(0,m.jsx)("span",{children:"After"}),(0,m.jsx)("span",{className:"col-info",children:"Notes"})]}),a.map(e=>{var t;return(0,m.jsx)(s.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,m.jsxs)(s.Np,{children:[(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Date"}),(0,m.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Ingredient"}),(0,m.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Type"}),(0,m.jsx)("span",{style:{color:p(e.transaction_type),fontWeight:600},children:u(e.transaction_type)})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Change"}),(0,m.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",d(e.quantity_change)," ",e.unit]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"After"}),(0,m.jsxs)("div",{style:{color:"#0A2540"},children:[d(e.stock_after)," ",e.unit]})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Notes"}),(0,m.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(a.DL)),[o,l]=(0,r.useState)(!0),[c,d]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";n(r)}else n("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),d("Failed to load currency settings"),n("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:o,error:c}}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var r=n(7119),i=n(4752),a=n(9610),s=n(4414);const o=i.Ay.div`
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