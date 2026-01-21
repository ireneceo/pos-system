"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2045],{2045:(e,t,n)=>{n.d(t,{A:()=>ye});var i=n(9950),r=n(4492),s=n(4752),a=n(7492),l=n(2488),o=n(1367),c=n(9610),d=n(4021),u=n(6038),p=n(3705),x=n(7617),h=n(4414);const g=s.Ay.div`
  padding: 24px 0;
`,m=s.Ay.div`
  display: grid;
  gap: 12px;
`,y=s.Ay.div`
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
`,j=s.Ay.div`
  flex: 1;
`,v=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,_=s.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,f=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,k=s.Ay.div`
  display: flex;
  gap: 8px;
`,b=s.Ay.button`
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
`,C=s.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,F=s.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,S=s.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,A=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,E=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,B=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=s.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,$=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,D=s.Ay.button`
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
`,I=s.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,O=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,R=e=>{let{brandId:t,restaurantId:n,onCountChange:r,onCategoryChange:s}=e;const{user:l}=(0,o.As)(),d=n||(null===l||void 0===l?void 0:l.restaurant_id)||(null===l||void 0===l?void 0:l.restaurantId),[u,R]=(0,i.useState)([]),[T,P]=(0,i.useState)([]),[M,U]=(0,i.useState)(!0),[L,Q]=(0,i.useState)(!1),[N,Z]=(0,i.useState)(null),[q,W]=(0,i.useState)(!1),[J,G]=(0,i.useState)(null),[H,X]=(0,i.useState)({name:"",emoji:"",description:""}),K="Restaurant Admin"===(null===l||void 0===l?void 0:l.role),Y="Brand General"===(null===l||void 0===l?void 0:l.role)||"Brand Manager"===(null===l||void 0===l?void 0:l.role),V=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{(async()=>{U(!0);const e=V();try{if(Y&&t){const n=await fetch(`/api/brands/${t}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&(R(i.data),r(i.data.length))}else if(K&&d){const t=await fetch(`/api/restaurants/${d}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),s=await t.json();var n,i;if(s.success)R(s.data.own_categories||[]),P(s.data.brand_categories||[]),r(((null===(n=s.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(i=s.data.brand_categories)||void 0===i?void 0:i.length)||0))}}catch(s){console.error("Failed to fetch data:",s)}finally{U(!1)}})()},[t,d,Y,K,V,r]);const ee=async()=>{try{const i=V();if(Y&&t){const e=await fetch(`/api/brands/${t}/general-stock-categories`,{headers:{Authorization:`Bearer ${i}`}}),n=await e.json();n.success&&(R(n.data),r(n.data.length))}else if(K&&d){const t=await fetch(`/api/restaurants/${d}/general-stock-categories`,{headers:{Authorization:`Bearer ${i}`}}),s=await t.json();var e,n;if(s.success)R(s.data.own_categories||[]),P(s.data.brand_categories||[]),r(((null===(e=s.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=s.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(i){console.error("Failed to fetch categories:",i)}},te=e=>{e?(Z(e),X({name:e.name,emoji:e.emoji||"",description:e.description||""})):(Z(null),X({name:"",emoji:"",description:""})),Q(!0)},ne=()=>{Q(!1),Z(null),X({name:"",emoji:"",description:""})},ie=async e=>{if(e.preventDefault(),H.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const i=N?"PUT":"POST";if(Y&&t?n=N?`/api/brands/${t}/general-stock-categories/${N.id}`:`/api/brands/${t}/general-stock-categories`:K&&d&&(n=N?`/api/restaurants/${d}/general-stock-categories/${N.id}`:`/api/restaurants/${d}/general-stock-categories`),!n)return;const r=await fetch(n,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:H.name.trim(),emoji:H.emoji||null,description:H.description.trim()||null})}),a=await r.json();a.success?(ne(),ee(),null===s||void 0===s||s()):alert(a.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},re=async(e,n)=>{const i="up"===n?e-1:e+1;if(i<0||i>=u.length)return;const r=[...u];[r[e],r[i]]=[r[i],r[e]];const s=r.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(Y&&t?n=`/api/brands/${t}/general-stock-categories/reorder`:K&&d&&(n=`/api/restaurants/${d}/general-stock-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:s})}),ee()}catch(a){console.error("Failed to reorder:",a)}},se=function(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,h.jsxs)(y,{isActive:e.is_active,readOnly:i,children:[!i&&(0,h.jsx)(a.Xd,{onMoveUp:()=>re(t,"up"),onMoveDown:()=>re(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,h.jsx)(z,{children:e.emoji}),(0,h.jsxs)(j,{children:[(0,h.jsxs)(v,{children:[e.name,i&&(0,h.jsx)(E,{children:"Brand"})]}),(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:[e.stock_count||0," items"]}),!i&&(0,h.jsx)(B,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(f,{children:e.description})]}),!i&&(0,h.jsxs)(k,{children:[(0,h.jsx)(b,{onClick:()=>te(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(b,{onClick:()=>(e=>{G(e),W(!0)})(e),title:"Delete",children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return M?(0,h.jsx)(g,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,h.jsxs)(g,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:"General Stock Categories"}),(0,h.jsx)(p.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}),K&&T.length>0&&(0,h.jsxs)(I,{children:[(0,h.jsx)(O,{children:"Brand Categories (Read Only)"}),(0,h.jsx)(m,{children:T.map((e,t)=>se(e,t,T,!0))})]}),0===u.length?(0,h.jsxs)(C,{children:[(0,h.jsx)(F,{children:"No general stock categories yet"}),(0,h.jsx)(S,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,h.jsx)(p.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}):(0,h.jsx)(m,{children:u.map((e,t)=>{return se(e,t,u,(n=e,K&&"brand"===n.owner_type));var n})}),(0,h.jsx)(c.aF,{isOpen:L,onClose:ne,title:(N?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:ne,children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:ie,disabled:!H.name.trim(),children:N?"Update":"Create"})]}),children:(0,h.jsxs)("form",{onSubmit:ie,children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:H.name,onChange:e=>X({...H,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Icon"}),(0,h.jsx)($,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,h.jsx)(D,{selected:H.emoji===e,onClick:()=>X({...H,emoji:e}),type:"button",children:e},e))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:H.description,onChange:e=>X({...H,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,h.jsx)(x.A,{isOpen:q,onCancel:()=>{W(!1),G(null)},onConfirm:async()=>{if(J)try{const e=localStorage.getItem("auth_token");let n="";if(Y&&t?n=`/api/brands/${t}/general-stock-categories/${J.id}`:K&&d&&(n=`/api/restaurants/${d}/general-stock-categories/${J.id}`),!n)return;const i=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success?(W(!1),G(null),ee(),null===s||void 0===s||s()):alert(r.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:J?`Are you sure you want to delete "${J.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})};var T=n(3496),P=n(4669);const M=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,U=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,L=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,Q=s.Ay.div`
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
`,N=s.Ay.div`
  flex: 1;
`,Z=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,q=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,W=s.Ay.div`
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
`,J=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,G=s.Ay.div`
  display: flex;
  flex-direction: column;
`,H=s.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,X=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,K=s.Ay.div`
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
`,Y=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,V=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,ee=s.Ay.button`
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
`,te=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,ne=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,ie=(s.Ay.div``,s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),re=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,se=(0,s.Ay)(a.A0)`
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
`,ae=(0,s.Ay)(a.Hj)`
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
`,le=s.Ay.div`
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
`,oe=s.Ay.input`
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
`,ce=s.Ay.input`
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
`,de=s.Ay.button`
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
`,ue=s.Ay.div`
  position: relative;
  z-index: 10;
`,pe=s.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`,xe=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
`,he=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,ge=s.Ay.button`
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
`,me=s.Ay.button`
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
`,ye=e=>{var t,n;let{mode:s,restaurantId:p}=e;const{user:x}=(0,o.As)(),[g,m]=(0,r.ok)(),{defaultCurrency:y}=(0,d.i1)(),[j,v]=(0,i.useState)("RM"),_="restaurant"===s?p:void 0,f="brand"===s?null===x||void 0===x?void 0:x.brand_id:void 0,k=g.get("tab")||"dashboard",b=e=>{m({tab:e})},[C,F]=(0,i.useState)(0),[S,w]=(0,i.useState)(0),[A,E]=(0,i.useState)(!0),[B,z]=(0,i.useState)(null),[$,D]=(0,i.useState)([]),[I,O]=(0,i.useState)([]),[ye,ve]=(0,i.useState)([]),[_e,fe]=(0,i.useState)([]),[ke,be]=(0,i.useState)(""),[Ce,Fe]=(0,i.useState)("all"),[Se,we]=(0,i.useState)([]),[Ae,Ee]=(0,i.useState)(null),[Be,ze]=(0,i.useState)(!1),[$e,De]=(0,i.useState)(""),[Ie,Oe]=(0,i.useState)(""),[Re,Te]=(0,i.useState)("all"),[Pe,Me]=(0,i.useState)(!1),[Ue,Le]=(0,i.useState)(!1),[Qe,Ne]=(0,i.useState)(!1),[Ze,qe]=(0,i.useState)(!1),[We,Je]=(0,i.useState)(null),[Ge,He]=(0,i.useState)(""),[Xe,Ke]=(0,i.useState)(""),[Ye,Ve]=(0,i.useState)(""),[et,tt]=(0,i.useState)(""),[nt,it]=(0,i.useState)(""),[rt,st]=(0,i.useState)({}),[at,lt]=(0,i.useState)(!1),[ot,ct]=(0,i.useState)(!1),[dt,ut]=(0,i.useState)(!1),[pt,xt]=(0,i.useState)(null),[ht,gt]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[mt,yt]=(0,i.useState)(!1),[jt,vt]=(0,i.useState)(!1),[_t,ft]=(0,i.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[kt,bt]=(0,i.useState)(!1),[Ct,Ft]=(0,i.useState)([]),[St,wt]=(0,i.useState)([]),[At,Et]=(0,i.useState)(""),[Bt,zt]=(0,i.useState)(!1),[$t,Dt]=(0,i.useState)(!1),[It,Ot]=(0,i.useState)(null),[Rt,Tt]=(0,i.useState)(!1),[Pt,Mt]=(0,i.useState)(null),[Ut,Lt]=(0,i.useState)(!1),[Qt,Nt]=(0,i.useState)(null),[Zt,qt]=(0,i.useState)(""),Wt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Jt=Wt.filter(e=>e.label.toLowerCase().includes(At.toLowerCase())||e.value.toLowerCase().includes(At.toLowerCase())),[Gt,Ht]=(0,i.useState)(null),[Xt,Kt]=(0,i.useState)(""),[Yt,Vt]=(0,i.useState)("ingredient"),[en,tn]=(0,i.useState)({});(0,i.useEffect)(()=>{y&&v(y)},[y]);const nn=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),rn=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=nn();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[nn]),sn=(0,i.useCallback)(async()=>{if(("restaurant"!==s||_)&&("brand"!==s||f))try{if(E(!0),"restaurant"===s){const[e,t,n,i,r]=await Promise.all([rn(`/api/restaurants/${_}/inventory/summary`),rn(`/api/restaurants/${_}/inventory`),rn(`/api/restaurants/${_}/inventory/alerts?resolved=false`),rn(`/api/restaurants/${_}/inventory/reorder-suggestions`),rn(`/api/restaurants/${_}/inventory/expiring?days=14`)]);e.success&&z(e.data),t.success&&D(t.data),n.success&&O(n.data),i.success&&ve(i.data),r.success&&fe(r.data);try{const e=await rn(`/api/restaurants/${_}/inventory/general-stock`);e.success&&we(e.data||[])}catch{we([])}try{const e=await rn(`/api/restaurants/${_}/suppliers`);e.success&&Ft(e.data||[])}catch{Ft([])}try{const e=await rn(`/api/restaurants/${_}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];wt(t)}}catch{wt([])}}else{const e=await rn("/api/product-ingredients?track_stock=true");if(e.success){const t=(e.data||[]).map(e=>{var t;const n=parseFloat(e.current_stock)||0,i=parseFloat(e.min_stock)||0;let r="normal";return n<=0?r="out_of_stock":n<=i&&(r="low_stock"),{id:e.id,name:e.name,code:e.code,image_url:e.image_url,unit:e.unit,unit_cost:parseFloat(e.unit_cost)||0,category:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized",current_stock:n,min_stock:i,min_order:parseFloat(e.min_order)||0,last_actual_stock:parseFloat(e.last_actual_stock)||0,last_stock_take_at:e.last_stock_take_at,avg_daily_usage:parseFloat(e.avg_daily_usage)||0,lead_time_days:e.lead_time_days||1,safety_stock_percent:parseFloat(e.safety_stock_percent)||20,manual_daily_usage:e.manual_daily_usage?parseFloat(e.manual_daily_usage):null,prediction_confidence:e.prediction_confidence||"none",stock_status:r,supplier_id:e.supplier_id,supplier_name:e.supplier_name}});D(t);const n=t.filter(e=>"low_stock"===e.stock_status).length,i=t.filter(e=>"out_of_stock"===e.stock_status).length;z({total_items:t.length,low_stock_count:n,out_of_stock_count:i,monthly_loss:0,unresolved_alerts:n+i});const r=t.filter(e=>"normal"!==e.stock_status).map((e,t)=>({id:t,ingredient_id:e.id,alert_type:e.stock_status,current_stock:e.current_stock,min_stock:e.min_stock,ingredient:{id:e.id,name:e.name,unit:e.unit,unit_cost:e.unit_cost}}));O(r)}we([]),ve([]),fe([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{E(!1)}},[s,_,f,rn]);(0,i.useEffect)(()=>{sn()},[sn]),(0,i.useEffect)(()=>{if($.length>0){const e=$.some(e=>e.current_stock>0||e.last_stock_take_at);lt(!e)}},[$]);const an=(e,t,n)=>{st(i=>({...i,[e]:{...i[e],[t]:n}}))},ln=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},on=e=>{Je(e),He(""),Ke(""),Ve(""),tt(""),it(""),Me(!0)},cn=(e,t,n)=>{Ht(e),Kt(t.toString()),Vt(n)},dn=()=>{Ht(null),Kt("")},un=async e=>{const t=parseFloat(Xt);if(isNaN(t)||t<0)dn();else try{let n;if("restaurant"===s){const i="ingredient"===Yt?`/api/restaurants/${_}/inventory/adjust`:`/api/restaurants/${_}/inventory/general-stock/${e}/adjust`,r={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Yt&&(r.ingredient_id=e),n=await rn(i,{method:"POST",body:JSON.stringify(r)})}else n=await rn(`/api/product-ingredients/${e}`,{method:"PUT",body:JSON.stringify({current_stock:t})});n.success&&("ingredient"===Yt?D(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):we(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{dn()}},pn=(e,t)=>{"Enter"===e.key?un(t):"Escape"===e.key&&dn()},xn=e=>{Nt(e),qt(e.min_order?String(e.min_order):""),Lt(!0)},hn=$.filter(e=>{const t=e.name.toLowerCase().includes(ke.toLowerCase()),n="all"===Ce||e.stock_status===Ce;return t&&n}),gn=(("all"===Re||"ingredients"===Re)&&hn.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===Re||"general_stock"===Re)&&Se.filter(e=>{const t=e.name.toLowerCase().includes(ke.toLowerCase()),n="all"===Ce||e.stock_status===Ce;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return("restaurant"===s?!!_:!!f)?(0,h.jsxs)(a.mc,{children:[(0,h.jsx)(a.Y9,{children:(0,h.jsx)(a.hE,{children:"Inventory"})}),(0,h.jsxs)(a.UC,{children:[(0,h.jsxs)(a.j,{children:[(0,h.jsx)(a.oz,{active:"dashboard"===k,onClick:()=>b("dashboard"),children:"Dashboard"}),(0,h.jsx)(a.oz,{active:"list"===k,onClick:()=>b("list"),children:"Stock List"}),(0,h.jsx)(a.oz,{active:"history"===k,onClick:()=>b("history"),children:"History"}),(0,h.jsx)(a.oz,{active:"categories"===k,onClick:()=>b("categories"),children:"Categories"})]}),A?(0,h.jsx)(a.pp,{children:"Loading..."}):"dashboard"===k?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(a.MD,{children:[(0,h.jsxs)(a.hI,{color:"#059669",children:[(0,h.jsx)(a.Os,{children:(null===B||void 0===B?void 0:B.total_items)||0}),(0,h.jsx)(a.v0,{children:"Total Ingredients"}),(0,h.jsx)(a.d1,{children:"managed items"})]}),(0,h.jsxs)(a.hI,{color:"#D97706",children:[(0,h.jsx)(a.Os,{children:(null===B||void 0===B?void 0:B.low_stock_count)||0}),(0,h.jsx)(a.v0,{children:"Low Stock"}),(0,h.jsx)(a.d1,{children:"need attention"})]}),(0,h.jsxs)(a.hI,{color:"#DC2626",children:[(0,h.jsx)(a.Os,{children:(null===B||void 0===B?void 0:B.out_of_stock_count)||0}),(0,h.jsx)(a.v0,{children:"Out of Stock"}),(0,h.jsx)(a.d1,{children:"urgent"})]}),(0,h.jsxs)(a.hI,{color:"#7C3AED",children:[(0,h.jsx)(a.Os,{children:(0,u.vv)((null===B||void 0===B?void 0:B.monthly_loss)||0,j)}),(0,h.jsx)(a.v0,{children:"Monthly Loss"}),(0,h.jsx)(a.d1,{children:"this month"})]}),(0,h.jsxs)(a.hI,{color:"#EA580C",children:[(0,h.jsx)(a.Os,{children:_e.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,h.jsx)(a.v0,{children:"Expiring Soon"}),(0,h.jsx)(a.d1,{children:"within 3 days"})]})]}),I.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(U,{children:"Stock Alerts"}),(0,h.jsx)("div",{children:I.slice(0,5).map(e=>(0,h.jsxs)(Q,{type:e.alert_type,children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(Z,{children:e.ingredient.name}),(0,h.jsxs)(q,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,h.jsxs)(a.wr,{children:[(0,h.jsx)(a.$n,{variant:"primary",onClick:()=>{const t=$.find(t=>t.id===e.ingredient_id);t&&on(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(a.$n,{variant:"secondary",onClick:()=>(async e=>{if("brand"!==s)try{(await rn(`/api/restaurants/${_}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&sn()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),_e.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(U,{children:"Expiring Items"}),(0,h.jsx)("div",{children:_e.slice(0,5).map(e=>(0,h.jsxs)(K,{urgency:e.urgency,children:[(0,h.jsxs)(N,{children:[(0,h.jsxs)(Z,{children:[e.ingredient_name,e.batch_number&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,h.jsxs)(q,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsx)(Y,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,h.jsx)(a.$n,{variant:"danger",onClick:()=>{const t=$.find(t=>t.id===e.ingredient_id);t&&(Je(t),He(""),Ke(""),Le(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),ye.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(U,{children:"Reorder Suggestions"}),(0,h.jsx)(M,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,h.jsxs)(a.XI,{children:[(0,h.jsxs)(a.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Daily Usage"}),(0,h.jsx)("span",{children:"Suggested Qty"}),(0,h.jsx)("span",{children:"Est. Cost"}),(0,h.jsx)("span",{children:"Urgency"}),(0,h.jsx)("span",{children:"Order"})]}),ye.slice(0,10).map(e=>(0,h.jsxs)(a.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("div",{children:e.ingredient.name}),(0,h.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,h.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,h.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,h.jsx)("div",{children:(0,u.vv)(e.estimated_cost,j)}),(0,h.jsx)("div",{children:(0,h.jsx)(X,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(ce,{type:"number",min:"0",step:"1",value:en[e.ingredient.id]||e.suggested_qty,onChange:t=>tn(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,h.jsx)(de,{onClick:()=>{const t=$.find(t=>t.id===e.ingredient.id);t&&xn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(a.$n,{variant:"primary",onClick:()=>{0===$.length?window.location.href=`/restaurant/${_}/recipe-management?tab=ingredients`:b("list")},children:"+ Receive Stock"}),(0,h.jsx)(a.$n,{variant:"secondary",onClick:()=>{0===$.length?window.location.href=`/restaurant/${_}/recipe-management?tab=ingredients`:b("list")},children:"+ Record Waste"}),(0,h.jsx)(a.$n,{variant:"secondary",onClick:()=>b("history"),children:"View All Transactions"})]})]}):"list"===k?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.Qn,{children:["restaurant"===s&&(0,h.jsxs)(l.Jt,{value:Re,onChange:e=>Te(e.target.value),style:{minWidth:"140px"},children:[(0,h.jsx)("option",{value:"all",children:"All Items"}),(0,h.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,h.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,h.jsx)(l.DO,{type:"text",placeholder:"Search...",value:ke,onChange:e=>be(e.target.value)}),(0,h.jsxs)(l.Jt,{value:Ce,onChange:e=>Fe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,h.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),"restaurant"===s&&(0,h.jsx)(a.$n,{variant:"primary",onClick:()=>vt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),"restaurant"===s&&("all"===Re||"general_stock"===Re)&&Se.length>0&&(0,h.jsxs)(h.Fragment,{children:["all"===Re&&(0,h.jsxs)(U,{children:["General Stock (",Se.filter(e=>{const t=e.name.toLowerCase().includes(ke.toLowerCase()),n="all"===Ce||e.stock_status===Ce;return t&&n}).length,")"]}),(0,h.jsxs)(a.XI,{style:{marginBottom:"24px"},children:[(0,h.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,h.jsx)("span",{children:"Item"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min Stock"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Order"}),(0,h.jsx)("span",{children:"Actions"})]}),Se.filter(e=>{const t=e.name.toLowerCase().includes(ke.toLowerCase()),n="all"===Ce||e.stock_status===Ce;return t&&n}).map(e=>(0,h.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,h.jsxs)(a.Np,{children:[(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Item"}),(0,h.jsxs)(J,{children:[(0,h.jsx)(W,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,h.jsxs)(G,{children:[(0,h.jsx)(ie,{children:e.name}),e.code&&(0,h.jsx)(H,{children:e.code}),(0,h.jsx)(re,{children:e.category})]})]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Status"}),(0,h.jsx)(L,{status:e.stock_status,children:gn(e.stock_status)})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Current Stock"}),Gt===e.id&&"general_stock"===Yt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(oe,{type:"number",step:"0.01",value:Xt,onChange:e=>Kt(e.target.value),onKeyDown:t=>pn(t,e.id),onBlur:()=>un(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,h.jsxs)(le,{onClick:()=>cn(e.id,e.current_stock,"general_stock"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Min Stock"}),(0,h.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,j)})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(ce,{type:"number",min:"0",step:"1",value:en[`gs_${e.id}`]||"",onChange:t=>tn(n=>({...n,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,h.jsx)(de,{onClick:()=>{const t=en[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(xn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),qt(t))},children:"Order"})]}),(0,h.jsxs)(a.wr,{children:[(0,h.jsx)(a.$n,{variant:"primary",onClick:()=>{Ee(e),De(""),Oe(""),ze(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(me,{onClick:()=>{var t;Ot(e),ft({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),Dt(!0)},children:"Edit"}),(0,h.jsx)(ge,{onClick:()=>{Mt({type:"general_stock",id:e.id,name:e.name}),Tt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("brand"===s||"all"===Re||"ingredients"===Re)&&(0,h.jsxs)(h.Fragment,{children:["restaurant"===s&&"all"===Re&&(0,h.jsxs)(U,{children:["Ingredients (",hn.length,")"]}),0===hn.length?(0,h.jsxs)(a.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===$.length?"No ingredients found":"No matching ingredients"}),(0,h.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===$.length?"brand"===s?'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.':"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===$.length&&(0,h.jsxs)(a.$n,{variant:"primary",onClick:()=>window.location.href="brand"===s?"/brand/product-recipe?tab=ingredients":`/restaurant/${_}/recipe-management?tab=ingredients`,children:["Go to ","brand"===s?"Product Ingredients":"Ingredients"]})]}):(0,h.jsxs)(a.XI,{children:[(0,h.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min / Prediction"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Last Stock Take"}),(0,h.jsx)("span",{children:"Order"}),(0,h.jsx)("span",{children:"Actions"})]}),hn.map(e=>{return(0,h.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,h.jsxs)(a.Np,{children:[(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Ingredient"}),(0,h.jsxs)(J,{children:[(0,h.jsx)(W,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,h.jsxs)(G,{children:[(0,h.jsx)(ie,{children:e.name}),e.code&&(0,h.jsx)(H,{children:e.code}),(0,h.jsxs)(re,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Status"}),(0,h.jsx)(L,{status:e.stock_status,children:gn(e.stock_status)})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Current Stock"}),Gt===e.id&&"ingredient"===Yt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(oe,{type:"number",step:"0.01",value:Xt,onChange:e=>Kt(e.target.value),onKeyDown:t=>pn(t,e.id),onBlur:()=>un(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,h.jsxs)(le,{onClick:()=>cn(e.id,e.current_stock,"ingredient"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Min / Prediction"}),(0,h.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,h.jsx)(V,{level:e.prediction_confidence||"none",children:ln(e.prediction_confidence||"none")})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,j)})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Last Stock Take"}),(0,h.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(ce,{type:"number",min:"0",step:"1",value:en[e.id]||"",onChange:t=>tn(n=>({...n,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,h.jsx)(de,{onClick:()=>{const t=en[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(xn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),qt(t))},children:"Order"})]}),(0,h.jsxs)(a.wr,{children:[(0,h.jsx)(a.$n,{variant:"primary",onClick:()=>on(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(ee,{onClick:()=>(e=>{var t;xt(e),gt({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),ut(!0)})(e),children:"Settings"}),(0,h.jsx)(ge,{onClick:()=>{Mt({type:"ingredient",id:e.id,name:e.name}),Tt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):"categories"===k?"restaurant"===s?(0,h.jsx)(R,{brandId:null,restaurantId:_?Number(_):null,onCountChange:F,onCategoryChange:()=>w(e=>e+1)}):(0,h.jsx)(T.A,{onCountChange:F,onCategoryChange:()=>w(e=>e+1)}):"restaurant"===s&&_?(0,h.jsx)(je,{restaurantId:_,currency:j}):(0,h.jsx)(a.pp,{children:"Transaction history is not available in brand mode."})]}),(0,h.jsx)(c.aF,{isOpen:Pe,onClose:()=>Me(!1),title:"Receive Stock",size:"medium",children:We&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient"}),(0,h.jsx)(c.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${We.current_stock} ${We.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Quantity Received (",We.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ge,onChange:e=>He(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ye,onChange:e=>Ve(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Manufacture Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:et,onChange:e=>tt(e.target.value)})]})]}),(0,h.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,h.jsx)(c.lR,{children:"Expiry Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:nt,onChange:e=>it(e.target.value)}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Notes (Optional)"}),(0,h.jsx)(c.ZQ,{type:"text",value:Xe,onChange:e=>Ke(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(We&&Ge)try{let e;if("restaurant"===s)e=await rn(`/api/restaurants/${_}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Ge),notes:Xe,batch_number:Ye||null,manufacture_date:et||null,expiry_date:nt||null})});else{const t=We.current_stock+parseFloat(Ge);e=await rn(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:t})})}e.success&&(Me(!1),Je(null),He(""),Ke(""),Ve(""),tt(""),it(""),sn())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,h.jsx)(c.aF,{isOpen:Ue,onClose:()=>Le(!1),title:"Record Waste",size:"small",children:We&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient"}),(0,h.jsx)(c.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${We.current_stock} ${We.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Waste Quantity (",We.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ge,onChange:e=>He(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Reason (Optional)"}),(0,h.jsx)(c.ZQ,{type:"text",value:Xe,onChange:e=>Ke(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Le(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(We&&Ge)try{let e;if("restaurant"===s)e=await rn(`/api/restaurants/${_}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Ge),notes:Xe})});else{const t=Math.max(0,We.current_stock-parseFloat(Ge));e=await rn(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:t})})}e.success&&(Le(!1),Je(null),He(""),Ke(""),sn())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,h.jsxs)(c.aF,{isOpen:Qe,onClose:()=>Ne(!1),title:"Set Initial Stock",size:"large",children:[(0,h.jsx)(M,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,h.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries($.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,h.jsxs)(a.XI,{children:[(0,h.jsxs)(a.A0,{columns:"2fr 1fr 1fr",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Qty"}),(0,h.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,h.jsxs)(a.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,h.jsx)("div",{children:(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=rt[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>an(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,h.jsx)("div",{children:(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=rt[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>an(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Ne(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(rt).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{ct(!0);(await rn(`/api/restaurants/${_}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(Ne(!1),lt(!1),sn())}catch(t){console.error("Failed to save initial stock:",t)}finally{ct(!1)}},disabled:ot,children:ot?"Saving...":"Save Initial Stock"})]})]}),(0,h.jsx)(c.aF,{isOpen:Be,onClose:()=>ze(!1),title:`Receive Stock: ${(null===Ae||void 0===Ae?void 0:Ae.name)||""}`,size:"small",children:Ae&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Ae.current_stock," ",Ae.stock_unit]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Quantity to Add *"}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:$e,onChange:e=>De(e.target.value),placeholder:"Enter quantity"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Notes (Optional)"}),(0,h.jsx)(c.ZQ,{value:Ie,onChange:e=>Oe(e.target.value),placeholder:"Enter notes"})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>ze(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if($e&&!(parseFloat($e)<=0))try{(await rn(`/api/restaurants/${_}/inventory/general-stock/${Ae.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat($e),notes:Ie})})).success&&(ze(!1),sn())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!$e||parseFloat($e)<=0,children:"Receive"})]})]})}),(0,h.jsx)(c.aF,{isOpen:Ut,onClose:()=>Lt(!1),title:`Order: ${(null===Qt||void 0===Qt?void 0:Qt.name)||""}`,size:"small",children:Qt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Qt.current_stock," ",Qt.unit]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[Qt.min_stock," ",Qt.unit]})]})]}),Qt.min_order&&Qt.min_order>0&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",Qt.min_order," ",Qt.unit]}),Qt.supplier_name&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Qt.supplier_name]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Order Quantity (",Qt.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Zt,onChange:e=>qt(e.target.value),placeholder:Qt.min_order?`Min: ${Qt.min_order}`:"Enter quantity"})]}),Zt&&parseFloat(Zt)>0&&(0,h.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,u.vv)(parseFloat(Zt)*Qt.unit_cost,j)})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Lt(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:()=>{Qt&&Zt&&(alert(`Order sent: ${Zt} ${Qt.unit} of ${Qt.name}`),Lt(!1),Nt(null),qt(""))},disabled:!Zt||parseFloat(Zt)<=0,children:"Send Order"})]})]})}),(0,h.jsx)(c.aF,{isOpen:dt,onClose:()=>ut(!1),title:`Settings: ${(null===pt||void 0===pt?void 0:pt.name)||""}`,size:"small",children:pt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(V,{level:pt.prediction_confidence||"none",children:ln(pt.prediction_confidence||"none")}),(0,h.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(pt.avg_daily_usage))||0).toFixed(2)," ",pt.unit,"/day (calculated)"]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Minimum Stock Level (",pt.unit,")"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ht.min_stock,onChange:e=>gt({...ht,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Minimum Order (",pt.unit,")"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ht.min_order,onChange:e=>gt({...ht,min_order:e.target.value}),placeholder:"0"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Lead Time (days)"}),(0,h.jsx)(c.ZQ,{type:"number",min:"1",value:ht.lead_time_days,onChange:e=>gt({...ht,lead_time_days:e.target.value}),placeholder:"1"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:ht.safety_stock_percent,onChange:e=>gt({...ht,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Manual Daily Usage (",pt.unit,"/day)"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ht.manual_daily_usage,onChange:e=>gt({...ht,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>ut(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(pt)try{yt(!0);(await rn(`/api/restaurants/${_}/inventory/${pt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(ht.lead_time_days)||1,safety_stock_percent:parseFloat(ht.safety_stock_percent)||20,manual_daily_usage:ht.manual_daily_usage?parseFloat(ht.manual_daily_usage):null,min_stock:parseFloat(ht.min_stock)||0,min_order:parseFloat(ht.min_order)||0})})).success&&(ut(!1),sn())}catch(e){console.error("Failed to save settings:",e)}finally{yt(!1)}},disabled:mt,children:mt?"Saving...":"Save Settings"})]})]})}),(0,h.jsxs)(c.aF,{isOpen:jt,onClose:()=>{vt(!1),zt(!1)},title:"Add General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.name,onChange:e=>ft({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Code (SKU)"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.code,onChange:e=>ft({..._t,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,h.jsx)(P.A,{value:_t.image_url,onChange:e=>ft({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit *"}),(0,h.jsxs)(ue,{children:[(0,h.jsx)(pe,{type:"text",value:Bt?At:(null===(t=Wt.find(e=>e.value===_t.stock_unit))||void 0===t?void 0:t.label)||_t.stock_unit,onChange:e=>{Et(e.target.value),zt(!0)},onFocus:()=>{zt(!0),Et("")},onBlur:()=>setTimeout(()=>zt(!1),200),placeholder:"Search unit..."}),Bt&&(0,h.jsxs)(xe,{children:[Jt.map(e=>(0,h.jsx)(he,{selected:_t.stock_unit===e.value,onClick:()=>{ft({..._t,stock_unit:e.value}),zt(!1),Et("")},children:e.label},e.value)),0===Jt.length&&(0,h.jsxs)(he,{onClick:()=>{ft({..._t,stock_unit:At}),zt(!1)},children:['Use "',At,'"']})]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category"}),(0,h.jsxs)(l.Jt,{value:_t.category,onChange:e=>ft({..._t,category:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),St.length>0?St.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,h.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,h.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,h.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,h.jsx)("option",{value:"Other",children:"Other"})]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Supplier"}),(0,h.jsxs)(l.Jt,{value:_t.supplier_id,onChange:e=>ft({..._t,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),Ct.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit Cost"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>ft({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Initial Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>ft({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>ft({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Order"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>ft({..._t,min_order:e.target.value}),placeholder:"0"})]})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{vt(!1),zt(!1)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim())try{bt(!0);(await rn(`/api/restaurants/${_}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})})).success&&(vt(!1),ft({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),sn())}catch(e){console.error("Failed to add general stock:",e)}finally{bt(!1)}},disabled:kt||!_t.name.trim(),children:kt?"Adding...":"Add Item"})]})]}),(0,h.jsxs)(c.aF,{isOpen:$t,onClose:()=>{Dt(!1),Ot(null)},title:"Edit General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.name,onChange:e=>ft({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Code (SKU)"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.code,onChange:e=>ft({..._t,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,h.jsx)(P.A,{value:_t.image_url,onChange:e=>ft({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit *"}),(0,h.jsxs)(ue,{children:[(0,h.jsx)(pe,{type:"text",value:Bt?At:(null===(n=Wt.find(e=>e.value===_t.stock_unit))||void 0===n?void 0:n.label)||_t.stock_unit,onChange:e=>{Et(e.target.value),zt(!0)},onFocus:()=>{zt(!0),Et("")},onBlur:()=>setTimeout(()=>zt(!1),200),placeholder:"Search unit..."}),Bt&&(0,h.jsxs)(xe,{children:[Jt.map(e=>(0,h.jsx)(he,{selected:_t.stock_unit===e.value,onClick:()=>{ft({..._t,stock_unit:e.value}),zt(!1),Et("")},children:e.label},e.value)),0===Jt.length&&(0,h.jsxs)(he,{onClick:()=>{ft({..._t,stock_unit:At}),zt(!1)},children:['Use "',At,'"']})]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category"}),(0,h.jsxs)(l.Jt,{value:_t.category,onChange:e=>ft({..._t,category:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),St.length>0?St.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,h.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,h.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,h.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,h.jsx)("option",{value:"Other",children:"Other"})]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Supplier"}),(0,h.jsxs)(l.Jt,{value:_t.supplier_id,onChange:e=>ft({..._t,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),Ct.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit Cost"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>ft({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>ft({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>ft({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Order"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>ft({..._t,min_order:e.target.value}),placeholder:"0"})]})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{Dt(!1),Ot(null)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim()&&It)try{bt(!0);(await rn(`/api/restaurants/${_}/inventory/general-stock/${It.id}`,{method:"PUT",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})})).success&&(Dt(!1),Ot(null),ft({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),sn())}catch(e){console.error("Failed to update general stock:",e)}finally{bt(!1)}},disabled:kt||!_t.name.trim(),children:kt?"Saving...":"Save Changes"})]})]}),(0,h.jsx)(c.aF,{isOpen:Rt,onClose:()=>{Tt(!1),Mt(null)},title:"Unlink from Inventory",size:"small",children:Pt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Pt.name}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Pt.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,h.jsxs)(ne,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{Tt(!1),Mt(null)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Pt.type){(await rn(`/api/restaurants/${_}/ingredients/${Pt.id}`,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&D(e=>e.filter(e=>e.id!==Pt.id))}else{(await rn(`/api/restaurants/${_}/inventory/general-stock/${Pt.id}`,{method:"DELETE"})).success&&we(e=>e.filter(e=>e.id!==Pt.id))}Tt(!1),Mt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Pt.type?"Unlink":"Delete"})]})]})})]}):(0,h.jsx)(a.mc,{children:(0,h.jsx)(a.pp,{children:(0,h.jsx)("p",{children:"restaurant"===s?"Restaurant not found. Please log in with a restaurant account.":"Brand not found. Please log in with a brand account."})})})},je=e=>{let{restaurantId:t,currency:n}=e;const[r,s]=(0,i.useState)([]),[l,o]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&s(i.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const c=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},d=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return l?(0,h.jsx)(a.pp,{children:"Loading transactions..."}):0===r.length?(0,h.jsxs)(a.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,h.jsxs)(a.XI,{children:[(0,h.jsxs)(a.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,h.jsx)("span",{children:"Date"}),(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Type"}),(0,h.jsx)("span",{children:"Change"}),(0,h.jsx)("span",{children:"After"}),(0,h.jsx)("span",{children:"Notes"})]}),r.map(e=>{var t;return(0,h.jsx)(a.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,h.jsxs)(a.Np,{children:[(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Date"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Ingredient"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Type"}),(0,h.jsx)("span",{style:{color:d(e.transaction_type),fontWeight:600},children:c(e.transaction_type)})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Change"}),(0,h.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"After"}),(0,h.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,h.jsxs)(a.Uj,{children:[(0,h.jsx)(a.PM,{children:"Notes"}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})}},4669:(e,t,n)=>{n.d(t,{A:()=>j});var i=n(9950),r=n(4752),s=n(4414);const a=r.Ay.div`
  margin-bottom: 16px;
`,l=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,o=r.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,d=r.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,u=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,p=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=r.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,m=r.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,y=r.Ay.input`
  display: none;
`,j=e=>{let{value:t,onChange:n,label:r="Logo Upload",helpText:j="Upload an image for your logo",maxSize:v=2,previewSize:_=150,showRemoveButton:f=!0,changeButtonText:k="Change Image",removeButtonText:b="Remove Image",imageAltText:C="Uploaded"}=e;const[F,S]=(0,i.useState)(!1),w=(0,i.useRef)(null),A=(0,i.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);const t=new FileReader;t.onload=e=>{var t;const i=new Image;i.onload=()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return;const r=800;let s=i.width,a=i.height;(s>r||a>r)&&(s>a?(a=a/s*r,s=r):(s=s/a*r,a=r)),e.width=s,e.height=a,t.drawImage(i,0,0,s,a);const l=e.toDataURL("image/jpeg",.85);n(l)},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},B=e=>{const t=e.target.files;t&&t.length>0&&E(t[0])};return(0,s.jsxs)(a,{children:[r&&(0,s.jsx)(l,{children:r}),j&&(0,s.jsx)(o,{children:j}),(0,s.jsxs)(c,{children:[(0,s.jsx)(d,{ref:A,isDragging:F,hasImage:!!t,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),S(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===A.current&&S(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),S(!1);const t=e.dataTransfer.files;t&&t.length>0&&E(t[0])},onClick:()=>{var e;t||(null===(e=w.current)||void 0===e||e.click())},children:t?(0,s.jsx)("img",{src:t,alt:C}):(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{children:F?"Drop image here":"Drag & drop or click to upload"}),(0,s.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&(0,s.jsxs)(h,{children:[(0,s.jsxs)(g,{children:[k,(0,s.jsx)("input",{ref:w,type:"file",accept:"image/*",onChange:B})]}),f&&(0,s.jsx)(m,{onClick:()=>{n("")},children:b})]})]}),!t&&(0,s.jsx)(y,{ref:w,type:"file",accept:"image/*",onChange:B})]})}}}]);