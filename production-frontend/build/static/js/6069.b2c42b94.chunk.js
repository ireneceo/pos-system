"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6069],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var r=n(4752),i=n(4414);const a=r.Ay.div`
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
`,s=r.Ay.input`
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
`,o=r.Ay.select`
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
`,l=e=>{let{children:t,className:n,style:r,...s}=e;return(0,i.jsx)(a,{className:n,style:r,...s,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(s,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,i.jsx)(o,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(a.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:c}}},6069:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ye});var r=n(9950),i=n(4492),a=n(4752),s=n(3310),o=n(7492),l=n(2488),d=n(1367),c=n(9610),p=n(4021),u=n(6038),x=n(3705),h=n(7617),g=n(4414);const m=a.Ay.div`
  padding: 24px 0;
`,y=a.Ay.div`
  display: grid;
  gap: 12px;
`,j=a.Ay.div`
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
`,f=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,_=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,k=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,b=a.Ay.div`
  display: flex;
  gap: 8px;
`,C=a.Ay.button`
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
`,w=a.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,F=a.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,S=a.Ay.p`
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
`,z=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,$=a.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,R=a.Ay.div`
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
`,O=a.Ay.div`
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
`,T=e=>{let{brandId:t,restaurantId:n,onCountChange:i,onCategoryChange:a}=e;const{user:s}=(0,d.As)(),l=n||(null===s||void 0===s?void 0:s.restaurant_id)||(null===s||void 0===s?void 0:s.restaurantId),[p,u]=(0,r.useState)([]),[T,M]=(0,r.useState)([]),[P,L]=(0,r.useState)(!0),[U,Q]=(0,r.useState)(!1),[Z,N]=(0,r.useState)(null),[q,W]=(0,r.useState)(!1),[J,G]=(0,r.useState)(null),[H,Y]=(0,r.useState)({name:"",emoji:"",description:""}),X="Restaurant Admin"===(null===s||void 0===s?void 0:s.role),K="Brand General"===(null===s||void 0===s?void 0:s.role)||"Brand Manager"===(null===s||void 0===s?void 0:s.role),V=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,r.useEffect)(()=>{(async()=>{L(!0);const e=V();try{if(K&&t){const n=await fetch(`/api/brands/${t}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&(u(r.data),i(r.data.length))}else if(X&&l){const t=await fetch(`/api/restaurants/${l}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,r;if(a.success)u(a.data.own_categories||[]),M(a.data.brand_categories||[]),i(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{L(!1)}})()},[t,l,K,X,V,i]);const ee=async()=>{try{const r=V();if(K&&t){const e=await fetch(`/api/brands/${t}/general-stock-categories`,{headers:{Authorization:`Bearer ${r}`}}),n=await e.json();n.success&&(u(n.data),i(n.data.length))}else if(X&&l){const t=await fetch(`/api/restaurants/${l}/general-stock-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await t.json();var e,n;if(a.success)u(a.data.own_categories||[]),M(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},te=e=>{e?(N(e),Y({name:e.name,emoji:e.emoji||"",description:e.description||""})):(N(null),Y({name:"",emoji:"",description:""})),Q(!0)},ne=()=>{Q(!1),N(null),Y({name:"",emoji:"",description:""})},re=async e=>{if(e.preventDefault(),H.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const r=Z?"PUT":"POST";if(K&&t?n=Z?`/api/brands/${t}/general-stock-categories/${Z.id}`:`/api/brands/${t}/general-stock-categories`:X&&l&&(n=Z?`/api/restaurants/${l}/general-stock-categories/${Z.id}`:`/api/restaurants/${l}/general-stock-categories`),!n)return;const i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:H.name.trim(),emoji:H.emoji||null,description:H.description.trim()||null})}),s=await i.json();s.success?(ne(),ee(),null===a||void 0===a||a()):alert(s.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},ie=async(e,n)=>{const r="up"===n?e-1:e+1;if(r<0||r>=p.length)return;const i=[...p];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(K&&t?n=`/api/brands/${t}/general-stock-categories/reorder`:X&&l&&(n=`/api/restaurants/${l}/general-stock-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),ee()}catch(s){console.error("Failed to reorder:",s)}},ae=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,g.jsxs)(j,{isActive:e.is_active,readOnly:r,children:[!r&&(0,g.jsx)(o.Xd,{onMoveUp:()=>ie(t,"up"),onMoveDown:()=>ie(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,g.jsx)($,{children:e.emoji}),(0,g.jsxs)(v,{children:[(0,g.jsxs)(f,{children:[e.name,r&&(0,g.jsx)(B,{children:"Brand"})]}),(0,g.jsxs)(_,{children:[(0,g.jsxs)("span",{children:[e.stock_count||0," items"]}),!r&&(0,g.jsx)(z,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,g.jsx)(k,{children:e.description})]}),!r&&(0,g.jsxs)(b,{children:[(0,g.jsx)(C,{onClick:()=>te(e),title:"Edit",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,g.jsx)(C,{onClick:()=>(e=>{G(e),W(!0)})(e),title:"Delete",children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,g.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return P?(0,g.jsx)(m,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,g.jsxs)(m,{children:[(0,g.jsxs)(A,{children:[(0,g.jsx)(E,{children:"General Stock Categories"}),(0,g.jsx)(x.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}),X&&T.length>0&&(0,g.jsxs)(O,{children:[(0,g.jsx)(I,{children:"Brand Categories (Read Only)"}),(0,g.jsx)(y,{children:T.map((e,t)=>ae(e,t,T,!0))})]}),0===p.length?(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:"No general stock categories yet"}),(0,g.jsx)(S,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,g.jsx)(x.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}):(0,g.jsx)(y,{children:p.map((e,t)=>{return ae(e,t,p,(n=e,X&&"brand"===n.owner_type));var n})}),(0,g.jsx)(c.aF,{isOpen:U,onClose:ne,title:(Z?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:ne,children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:re,disabled:!H.name.trim(),children:Z?"Update":"Create"})]}),children:(0,g.jsxs)("form",{onSubmit:re,children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Category Name *"}),(0,g.jsx)(c.ZQ,{type:"text",value:H.name,onChange:e=>Y({...H,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Icon"}),(0,g.jsx)(R,{children:["\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2","\ud83c\udf81","\ud83d\udecd\ufe0f","\ud83d\udc55","\ud83d\udc54","\ud83e\udde4","\ud83e\udde2","\ud83d\udc5f","\ud83e\udea5","\ud83e\uddf3","\ud83c\udf92"].map(e=>(0,g.jsx)(D,{selected:H.emoji===e,onClick:()=>Y({...H,emoji:e}),type:"button",children:e},e))})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Description"}),(0,g.jsx)(c.Lz,{value:H.description,onChange:e=>Y({...H,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,g.jsx)(h.A,{isOpen:q,onCancel:()=>{W(!1),G(null)},onConfirm:async()=>{if(J)try{const e=localStorage.getItem("auth_token");let n="";if(K&&t?n=`/api/brands/${t}/general-stock-categories/${J.id}`:X&&l&&(n=`/api/restaurants/${l}/general-stock-categories/${J.id}`),!n)return;const r=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(W(!1),G(null),ee(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:J?`Are you sure you want to delete "${J.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},M=a.Ay.div`
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
`,L=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,U=a.Ay.div`
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
`,Q=a.Ay.div`
  flex: 1;
`,Z=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,N=a.Ay.div`
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
`,W=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,J=a.Ay.div`
  display: flex;
  flex-direction: column;
`,G=a.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,H=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,Y=a.Ay.div`
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
`,X=a.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,K=a.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,V=a.Ay.button`
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
`,ee=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,te=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,ne=(a.Ay.div``,a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),re=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,ie=(0,a.Ay)(o.A0)`
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
`,ae=(0,a.Ay)(o.Hj)`
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
`,se=a.Ay.div`
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
`,oe=a.Ay.input`
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
`,le=a.Ay.input`
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
`,ce=a.Ay.div`
  position: relative;
`,pe=a.Ay.input`
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
`,ue=a.Ay.div`
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
  z-index: 100;
  margin-top: 4px;
`,xe=a.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,he=a.Ay.button`
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
`,ge=a.Ay.button`
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
`,me=e=>{let{restaurantId:t,currency:n}=e;const[i,a]=(0,r.useState)([]),[s,l]=(0,r.useState)(!0);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&a(r.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{l(!1)}})()},[t]);const d=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},c=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return s?(0,g.jsx)(o.pp,{children:"Loading transactions..."}):0===i.length?(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,g.jsx)("span",{children:"Date"}),(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Type"}),(0,g.jsx)("span",{children:"Change"}),(0,g.jsx)("span",{children:"After"}),(0,g.jsx)("span",{children:"Notes"})]}),i.map(e=>{var t;return(0,g.jsx)(o.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Date"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Ingredient"}),(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Type"}),(0,g.jsx)("span",{style:{color:c(e.transaction_type),fontWeight:600},children:d(e.transaction_type)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Change"}),(0,g.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"After"}),(0,g.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Notes"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},ye=()=>{var e,t;const{user:n}=(0,d.As)(),{restaurantId:a}=(0,i.g)(),[x,h]=(0,i.ok)(),{defaultCurrency:m}=(0,p.i1)(),[y,j]=(0,r.useState)("RM"),v=x.get("tab")||"dashboard",f=e=>{h({tab:e})},[_,k]=(0,r.useState)(0),[b,C]=(0,r.useState)(0),[w,F]=(0,r.useState)(!0),[S,A]=(0,r.useState)(null),[E,B]=(0,r.useState)([]),[z,$]=(0,r.useState)([]),[R,D]=(0,r.useState)([]),[O,I]=(0,r.useState)([]),[ye,je]=(0,r.useState)(""),[ve,fe]=(0,r.useState)("all"),[_e,ke]=(0,r.useState)([]),[be,Ce]=(0,r.useState)(null),[we,Fe]=(0,r.useState)(!1),[Se,Ae]=(0,r.useState)(""),[Ee,Be]=(0,r.useState)(""),[ze,$e]=(0,r.useState)("all"),[Re,De]=(0,r.useState)(!1),[Oe,Ie]=(0,r.useState)(!1),[Te,Me]=(0,r.useState)(!1),[Pe,Le]=(0,r.useState)(!1),[Ue,Qe]=(0,r.useState)(null),[Ze,Ne]=(0,r.useState)(""),[qe,We]=(0,r.useState)(""),[Je,Ge]=(0,r.useState)(""),[He,Ye]=(0,r.useState)(""),[Xe,Ke]=(0,r.useState)(""),[Ve,et]=(0,r.useState)({}),[tt,nt]=(0,r.useState)(!1),[rt,it]=(0,r.useState)(!1),[at,st]=(0,r.useState)(!1),[ot,lt]=(0,r.useState)(null),[dt,ct]=(0,r.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[pt,ut]=(0,r.useState)(!1),[xt,ht]=(0,r.useState)(!1),[gt,mt]=(0,r.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[yt,jt]=(0,r.useState)(!1),[vt,ft]=(0,r.useState)([]),[_t,kt]=(0,r.useState)([]),[bt,Ct]=(0,r.useState)(""),[wt,Ft]=(0,r.useState)(!1),[St,At]=(0,r.useState)(!1),[Et,Bt]=(0,r.useState)(null),[zt,$t]=(0,r.useState)(!1),[Rt,Dt]=(0,r.useState)(null),[Ot,It]=(0,r.useState)(!1),[Tt,Mt]=(0,r.useState)(null),[Pt,Lt]=(0,r.useState)(""),Ut=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Qt=Ut.filter(e=>e.label.toLowerCase().includes(bt.toLowerCase())||e.value.toLowerCase().includes(bt.toLowerCase())),[Zt,Nt]=(0,r.useState)(null),[qt,Wt]=(0,r.useState)(""),[Jt,Gt]=(0,r.useState)("ingredient"),[Ht,Yt]=(0,r.useState)({}),Xt=a?parseInt(a,10):null===n||void 0===n?void 0:n.restaurant_id;(0,r.useEffect)(()=>{m&&j(m)},[m]);const Kt=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),Vt=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Kt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Kt]),en=(0,r.useCallback)(async()=>{if(Xt)try{F(!0);const[e,t,n,r,i]=await Promise.all([Vt(`/api/restaurants/${Xt}/inventory/summary`),Vt(`/api/restaurants/${Xt}/inventory`),Vt(`/api/restaurants/${Xt}/inventory/alerts?resolved=false`),Vt(`/api/restaurants/${Xt}/inventory/reorder-suggestions`),Vt(`/api/restaurants/${Xt}/inventory/expiring?days=14`)]);e.success&&A(e.data),t.success&&B(t.data),n.success&&$(n.data),r.success&&D(r.data),i.success&&I(i.data);try{const e=await Vt(`/api/restaurants/${Xt}/inventory/general-stock`);e.success&&ke(e.data||[])}catch{ke([])}try{const e=await Vt(`/api/restaurants/${Xt}/suppliers`);e.success&&ft(e.data||[])}catch{ft([])}try{const e=await Vt(`/api/restaurants/${Xt}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];kt(t)}}catch{kt([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{F(!1)}},[Xt,Vt]);(0,r.useEffect)(()=>{en()},[en]),(0,r.useEffect)(()=>{if(E.length>0){const e=E.some(e=>e.current_stock>0||e.last_stock_take_at);nt(!e)}},[E]);const tn=(e,t,n)=>{et(r=>({...r,[e]:{...r[e],[t]:n}}))},nn=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},rn=e=>{Qe(e),Ne(""),We(""),Ge(""),Ye(""),Ke(""),De(!0)},an=(e,t,n)=>{Nt(e),Wt(t.toString()),Gt(n)},sn=()=>{Nt(null),Wt("")},on=async e=>{const t=parseFloat(qt);if(isNaN(t)||t<0)sn();else try{const n="ingredient"===Jt?`/api/restaurants/${Xt}/inventory/adjust`:`/api/restaurants/${Xt}/inventory/general-stock/${e}/adjust`,r={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Jt&&(r.ingredient_id=e);(await Vt(n,{method:"POST",body:JSON.stringify(r)})).success&&("ingredient"===Jt?B(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):ke(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{sn()}},ln=(e,t)=>{"Enter"===e.key?on(t):"Escape"===e.key&&sn()},dn=e=>{Mt(e),Lt(e.min_order?String(e.min_order):""),It(!0)},cn=E.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}),pn=(("all"===ze||"ingredients"===ze)&&cn.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===ze||"general_stock"===ze)&&_e.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return Xt?(0,g.jsxs)(s.A,{children:[(0,g.jsxs)(o.mc,{children:[(0,g.jsx)(o.Y9,{children:(0,g.jsx)(o.hE,{children:"Inventory"})}),(0,g.jsxs)(o.UC,{children:[(0,g.jsxs)(o.j,{children:[(0,g.jsx)(o.oz,{active:"dashboard"===v,onClick:()=>f("dashboard"),children:"Dashboard"}),(0,g.jsx)(o.oz,{active:"list"===v,onClick:()=>f("list"),children:"Stock List"}),(0,g.jsx)(o.oz,{active:"history"===v,onClick:()=>f("history"),children:"History"}),(0,g.jsx)(o.oz,{active:"categories"===v,onClick:()=>f("categories"),children:"Categories"})]}),w?(0,g.jsx)(o.pp,{children:"Loading..."}):"dashboard"===v?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(o.MD,{children:[(0,g.jsxs)(o.hI,{color:"#059669",children:[(0,g.jsx)(o.Os,{children:(null===S||void 0===S?void 0:S.total_items)||0}),(0,g.jsx)(o.v0,{children:"Total Ingredients"}),(0,g.jsx)(o.d1,{children:"managed items"})]}),(0,g.jsxs)(o.hI,{color:"#D97706",children:[(0,g.jsx)(o.Os,{children:(null===S||void 0===S?void 0:S.low_stock_count)||0}),(0,g.jsx)(o.v0,{children:"Low Stock"}),(0,g.jsx)(o.d1,{children:"need attention"})]}),(0,g.jsxs)(o.hI,{color:"#DC2626",children:[(0,g.jsx)(o.Os,{children:(null===S||void 0===S?void 0:S.out_of_stock_count)||0}),(0,g.jsx)(o.v0,{children:"Out of Stock"}),(0,g.jsx)(o.d1,{children:"urgent"})]}),(0,g.jsxs)(o.hI,{color:"#7C3AED",children:[(0,g.jsx)(o.Os,{children:(0,u.vv)((null===S||void 0===S?void 0:S.monthly_loss)||0,y)}),(0,g.jsx)(o.v0,{children:"Monthly Loss"}),(0,g.jsx)(o.d1,{children:"this month"})]}),(0,g.jsxs)(o.hI,{color:"#EA580C",children:[(0,g.jsx)(o.Os,{children:O.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,g.jsx)(o.v0,{children:"Expiring Soon"}),(0,g.jsx)(o.d1,{children:"within 3 days"})]})]}),z.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Stock Alerts"}),(0,g.jsx)("div",{children:z.slice(0,5).map(e=>(0,g.jsxs)(U,{type:e.alert_type,children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(Z,{children:e.ingredient.name}),(0,g.jsxs)(N,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&rn(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await Vt(`/api/restaurants/${Xt}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&en()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),O.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Expiring Items"}),(0,g.jsx)("div",{children:O.slice(0,5).map(e=>(0,g.jsxs)(Y,{urgency:e.urgency,children:[(0,g.jsxs)(Q,{children:[(0,g.jsxs)(Z,{children:[e.ingredient_name,e.batch_number&&(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,g.jsxs)(N,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,g.jsx)(X,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,g.jsx)(o.$n,{variant:"danger",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&(Qe(t),Ne(""),We(""),Ie(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),R.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Reorder Suggestions"}),(0,g.jsx)(M,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Daily Usage"}),(0,g.jsx)("span",{children:"Suggested Qty"}),(0,g.jsx)("span",{children:"Est. Cost"}),(0,g.jsx)("span",{children:"Urgency"}),(0,g.jsx)("span",{children:"Order"})]}),R.slice(0,10).map(e=>(0,g.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("div",{children:e.ingredient.name}),(0,g.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,g.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,g.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,g.jsx)("div",{children:(0,u.vv)(e.estimated_cost,y)}),(0,g.jsx)("div",{children:(0,g.jsx)(H,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(le,{type:"number",min:"0",step:"1",value:Ht[e.ingredient.id]||e.suggested_qty,onChange:t=>Yt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,g.jsx)(de,{onClick:()=>{const t=E.find(t=>t.id===e.ingredient.id);t&&dn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,g.jsxs)(ee,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${Xt}/recipe-management?tab=ingredients`:f("list")},children:"+ Receive Stock"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${Xt}/recipe-management?tab=ingredients`:f("list")},children:"+ Record Waste"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>f("history"),children:"View All Transactions"})]})]}):"list"===v?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(l.Qn,{children:[(0,g.jsxs)(l.Jt,{value:ze,onChange:e=>$e(e.target.value),style:{minWidth:"140px"},children:[(0,g.jsx)("option",{value:"all",children:"All Items"}),(0,g.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,g.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,g.jsx)(l.DO,{type:"text",placeholder:"Search...",value:ye,onChange:e=>je(e.target.value)}),(0,g.jsxs)(l.Jt,{value:ve,onChange:e=>fe(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,g.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>ht(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===ze||"general_stock"===ze)&&_e.length>0&&(0,g.jsxs)(g.Fragment,{children:["all"===ze&&(0,g.jsxs)(P,{children:["General Stock (",_e.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).length,")"]}),(0,g.jsxs)(o.XI,{style:{marginBottom:"24px"},children:[(0,g.jsxs)(ie,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,g.jsx)("span",{children:"Item"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min Stock"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Actions"})]}),_e.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).map(e=>(0,g.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Item"}),(0,g.jsxs)(W,{children:[(0,g.jsx)(q,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,g.jsxs)(J,{children:[(0,g.jsx)(ne,{children:e.name}),e.code&&(0,g.jsx)(G,{children:e.code}),(0,g.jsx)(re,{children:e.category})]})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Status"}),(0,g.jsx)(L,{status:e.stock_status,children:pn(e.stock_status)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Current Stock"}),Zt===e.id&&"general_stock"===Jt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(oe,{type:"number",step:"0.01",value:qt,onChange:e=>Wt(e.target.value),onKeyDown:t=>ln(t,e.id),onBlur:()=>on(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,g.jsxs)(se,{onClick:()=>an(e.id,e.current_stock,"general_stock"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Min Stock"}),(0,g.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,y)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{Ce(e),Ae(""),Be(""),Fe(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(de,{onClick:()=>dn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),children:"Order"}),(0,g.jsx)(ge,{onClick:()=>{var t;Bt(e),mt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),At(!0)},children:"Edit"}),(0,g.jsx)(he,{onClick:()=>{Dt({type:"general_stock",id:e.id,name:e.name}),$t(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===ze||"ingredients"===ze)&&(0,g.jsxs)(g.Fragment,{children:["all"===ze&&(0,g.jsxs)(P,{children:["Ingredients (",cn.length,")"]}),0===cn.length?(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===E.length?"No ingredients found":"No matching ingredients"}),(0,g.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===E.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===E.length&&(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Xt}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(ie,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min / Prediction"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Last Stock Take"}),(0,g.jsx)("span",{children:"Actions"})]}),cn.map(e=>{return(0,g.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Ingredient"}),(0,g.jsxs)(W,{children:[(0,g.jsx)(q,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,g.jsxs)(J,{children:[(0,g.jsx)(ne,{children:e.name}),e.code&&(0,g.jsx)(G,{children:e.code}),(0,g.jsxs)(re,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Status"}),(0,g.jsx)(L,{status:e.stock_status,children:pn(e.stock_status)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Current Stock"}),Zt===e.id&&"ingredient"===Jt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(oe,{type:"number",step:"0.01",value:qt,onChange:e=>Wt(e.target.value),onKeyDown:t=>ln(t,e.id),onBlur:()=>on(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,g.jsxs)(se,{onClick:()=>an(e.id,e.current_stock,"ingredient"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Min / Prediction"}),(0,g.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,g.jsx)(K,{level:e.prediction_confidence||"none",children:nn(e.prediction_confidence||"none")})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,y)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Last Stock Take"}),(0,g.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>rn(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(de,{onClick:()=>dn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),children:"Order"}),(0,g.jsx)(V,{onClick:()=>(e=>{var t;lt(e),ct({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),st(!0)})(e),children:"Settings"}),(0,g.jsx)(he,{onClick:()=>{Dt({type:"ingredient",id:e.id,name:e.name}),$t(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):"categories"===v?(0,g.jsx)(T,{brandId:null,restaurantId:Xt?Number(Xt):null,onCountChange:k,onCategoryChange:()=>C(e=>e+1)}):(0,g.jsx)(me,{restaurantId:Xt,currency:y})]})]}),(0,g.jsx)(c.aF,{isOpen:Re,onClose:()=>De(!1),title:"Receive Stock",size:"medium",children:Ue&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Ingredient"}),(0,g.jsx)(c.ZQ,{type:"text",value:Ue.name,disabled:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Current Stock"}),(0,g.jsx)(c.ZQ,{type:"text",value:`${Ue.current_stock} ${Ue.unit}`,disabled:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Quantity Received (",Ue.unit,") *"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>Ne(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,g.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,g.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,g.jsx)(c.ZQ,{type:"text",value:Je,onChange:e=>Ge(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,g.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,g.jsx)(c.lR,{children:"Manufacture Date"}),(0,g.jsx)(c.ZQ,{type:"date",value:He,onChange:e=>Ye(e.target.value)})]})]}),(0,g.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,g.jsx)(c.lR,{children:"Expiry Date"}),(0,g.jsx)(c.ZQ,{type:"date",value:Xe,onChange:e=>Ke(e.target.value)}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Notes (Optional)"}),(0,g.jsx)(c.ZQ,{type:"text",value:qe,onChange:e=>We(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Ue&&Ze)try{(await Vt(`/api/restaurants/${Xt}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Ue.id,quantity:parseFloat(Ze),notes:qe,batch_number:Je||null,manufacture_date:He||null,expiry_date:Xe||null})})).success&&(De(!1),Qe(null),Ne(""),We(""),Ge(""),Ye(""),Ke(""),en())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,g.jsx)(c.aF,{isOpen:Oe,onClose:()=>Ie(!1),title:"Record Waste",size:"small",children:Ue&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Ingredient"}),(0,g.jsx)(c.ZQ,{type:"text",value:Ue.name,disabled:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Current Stock"}),(0,g.jsx)(c.ZQ,{type:"text",value:`${Ue.current_stock} ${Ue.unit}`,disabled:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Waste Quantity (",Ue.unit,") *"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>Ne(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Reason (Optional)"}),(0,g.jsx)(c.ZQ,{type:"text",value:qe,onChange:e=>We(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>Ie(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Ue&&Ze)try{(await Vt(`/api/restaurants/${Xt}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Ue.id,quantity:parseFloat(Ze),notes:qe})})).success&&(Ie(!1),Qe(null),Ne(""),We(""),en())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,g.jsxs)(c.aF,{isOpen:Te,onClose:()=>Me(!1),title:"Set Initial Stock",size:"large",children:[(0,g.jsx)(M,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,g.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(E.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"2fr 1fr 1fr",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Qty"}),(0,g.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,g.jsxs)(o.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,g.jsx)("div",{children:(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=Ve[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>tn(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,g.jsx)("div",{children:(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=Ve[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>tn(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(Ve).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{it(!0);(await Vt(`/api/restaurants/${Xt}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(Me(!1),nt(!1),en())}catch(t){console.error("Failed to save initial stock:",t)}finally{it(!1)}},disabled:rt,children:rt?"Saving...":"Save Initial Stock"})]})]}),(0,g.jsx)(c.aF,{isOpen:we,onClose:()=>Fe(!1),title:`Receive Stock: ${(null===be||void 0===be?void 0:be.name)||""}`,size:"small",children:be&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[be.current_stock," ",be.stock_unit]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Quantity to Add *"}),(0,g.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Se,onChange:e=>Ae(e.target.value),placeholder:"Enter quantity"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Notes (Optional)"}),(0,g.jsx)(c.ZQ,{value:Ee,onChange:e=>Be(e.target.value),placeholder:"Enter notes"})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Se&&!(parseFloat(Se)<=0))try{(await Vt(`/api/restaurants/${Xt}/inventory/general-stock/${be.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(Se),notes:Ee})})).success&&(Fe(!1),en())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!Se||parseFloat(Se)<=0,children:"Receive"})]})]})}),(0,g.jsx)(c.aF,{isOpen:Ot,onClose:()=>It(!1),title:`Order: ${(null===Tt||void 0===Tt?void 0:Tt.name)||""}`,size:"small",children:Tt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Tt.current_stock," ",Tt.unit]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[Tt.min_stock," ",Tt.unit]})]})]}),Tt.min_order&&Tt.min_order>0&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",Tt.min_order," ",Tt.unit]}),Tt.supplier_name&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Tt.supplier_name]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Order Quantity (",Tt.unit,") *"]}),(0,g.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Pt,onChange:e=>Lt(e.target.value),placeholder:Tt.min_order?`Min: ${Tt.min_order}`:"Enter quantity"})]}),Pt&&parseFloat(Pt)>0&&(0,g.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,u.vv)(parseFloat(Pt)*Tt.unit_cost,y)})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>It(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:()=>{Tt&&Pt&&(alert(`Order sent: ${Pt} ${Tt.unit} of ${Tt.name}`),It(!1),Mt(null),Lt(""))},disabled:!Pt||parseFloat(Pt)<=0,children:"Send Order"})]})]})}),(0,g.jsx)(c.aF,{isOpen:at,onClose:()=>st(!1),title:`Settings: ${(null===ot||void 0===ot?void 0:ot.name)||""}`,size:"small",children:ot&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)(K,{level:ot.prediction_confidence||"none",children:nn(ot.prediction_confidence||"none")}),(0,g.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(ot.avg_daily_usage))||0).toFixed(2)," ",ot.unit,"/day (calculated)"]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Minimum Stock Level (",ot.unit,")"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_stock,onChange:e=>ct({...dt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Minimum Order (",ot.unit,")"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_order,onChange:e=>ct({...dt,min_order:e.target.value}),placeholder:"0"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Lead Time (days)"}),(0,g.jsx)(c.ZQ,{type:"number",min:"1",value:dt.lead_time_days,onChange:e=>ct({...dt,lead_time_days:e.target.value}),placeholder:"1"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,g.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:dt.safety_stock_percent,onChange:e=>ct({...dt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Manual Daily Usage (",ot.unit,"/day)"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:dt.manual_daily_usage,onChange:e=>ct({...dt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>st(!1),children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(ot)try{ut(!0);(await Vt(`/api/restaurants/${Xt}/inventory/${ot.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(dt.lead_time_days)||1,safety_stock_percent:parseFloat(dt.safety_stock_percent)||20,manual_daily_usage:dt.manual_daily_usage?parseFloat(dt.manual_daily_usage):null,min_stock:parseFloat(dt.min_stock)||0,min_order:parseFloat(dt.min_order)||0})})).success&&(st(!1),en())}catch(e){console.error("Failed to save settings:",e)}finally{ut(!1)}},disabled:pt,children:pt?"Saving...":"Save Settings"})]})]})}),(0,g.jsxs)(c.aF,{isOpen:xt,onClose:()=>{ht(!1),Ft(!1)},title:"Add General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Item Name *"}),(0,g.jsx)(c.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Code (SKU)"}),(0,g.jsx)(c.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Image (Optional)"}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[gt.image_url&&(0,g.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,g.jsx)("img",{src:gt.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,g.jsx)(c.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{mt({...gt,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),gt.image_url&&(0,g.jsx)("button",{type:"button",onClick:()=>mt({...gt,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit *"}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{type:"text",value:wt?bt:(null===(e=Ut.find(e=>e.value===gt.stock_unit))||void 0===e?void 0:e.label)||gt.stock_unit,onChange:e=>{Ct(e.target.value),Ft(!0)},onFocus:()=>{Ft(!0),Ct("")},onBlur:()=>setTimeout(()=>Ft(!1),200),placeholder:"Search unit..."}),wt&&(0,g.jsxs)(ue,{children:[Qt.map(e=>(0,g.jsx)(xe,{selected:gt.stock_unit===e.value,onClick:()=>{mt({...gt,stock_unit:e.value}),Ft(!1),Ct("")},children:e.label},e.value)),0===Qt.length&&(0,g.jsxs)(xe,{onClick:()=>{mt({...gt,stock_unit:bt}),Ft(!1)},children:['Use "',bt,'"']})]})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Category"}),(0,g.jsxs)(l.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),_t.length>0?_t.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,g.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,g.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,g.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,g.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Supplier"}),(0,g.jsxs)(l.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit Cost"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Initial Stock"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Min Stock"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Min Order"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>{ht(!1),Ft(!1)},children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim())try{jt(!0);(await Vt(`/api/restaurants/${Xt}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})})).success&&(ht(!1),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),en())}catch(e){console.error("Failed to add general stock:",e)}finally{jt(!1)}},disabled:yt||!gt.name.trim(),children:yt?"Adding...":"Add Item"})]})]}),(0,g.jsxs)(c.aF,{isOpen:St,onClose:()=>{At(!1),Bt(null)},title:"Edit General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Item Name *"}),(0,g.jsx)(c.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Code (SKU)"}),(0,g.jsx)(c.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Image (Optional)"}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[gt.image_url&&(0,g.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,g.jsx)("img",{src:gt.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,g.jsx)(c.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{mt({...gt,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),gt.image_url&&(0,g.jsx)("button",{type:"button",onClick:()=>mt({...gt,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit *"}),(0,g.jsxs)(ce,{children:[(0,g.jsx)(pe,{type:"text",value:wt?bt:(null===(t=Ut.find(e=>e.value===gt.stock_unit))||void 0===t?void 0:t.label)||gt.stock_unit,onChange:e=>{Ct(e.target.value),Ft(!0)},onFocus:()=>{Ft(!0),Ct("")},onBlur:()=>setTimeout(()=>Ft(!1),200),placeholder:"Search unit..."}),wt&&(0,g.jsxs)(ue,{children:[Qt.map(e=>(0,g.jsx)(xe,{selected:gt.stock_unit===e.value,onClick:()=>{mt({...gt,stock_unit:e.value}),Ft(!1),Ct("")},children:e.label},e.value)),0===Qt.length&&(0,g.jsxs)(xe,{onClick:()=>{mt({...gt,stock_unit:bt}),Ft(!1)},children:['Use "',bt,'"']})]})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Category"}),(0,g.jsxs)(l.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),_t.length>0?_t.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,g.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,g.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,g.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,g.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Supplier"}),(0,g.jsxs)(l.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit Cost"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Current Stock"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Min Stock"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Min Order"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>{At(!1),Bt(null)},children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim()&&Et)try{jt(!0);(await Vt(`/api/restaurants/${Xt}/inventory/general-stock/${Et.id}`,{method:"PUT",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})})).success&&(At(!1),Bt(null),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),en())}catch(e){console.error("Failed to update general stock:",e)}finally{jt(!1)}},disabled:yt||!gt.name.trim(),children:yt?"Saving...":"Save Changes"})]})]}),(0,g.jsx)(c.aF,{isOpen:zt,onClose:()=>{$t(!1),Dt(null)},title:"Unlink from Inventory",size:"small",children:Rt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,g.jsx)("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"ingredient"===Rt.type?"\ud83e\udd6c":"\ud83d\udce6"}),(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Rt.name}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Rt.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(c.yl,{variant:"secondary",onClick:()=>{$t(!1),Dt(null)},children:"Cancel"}),(0,g.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Rt.type){(await Vt(`/api/restaurants/${Xt}/inventory/adjust`,{method:"POST",body:JSON.stringify({ingredient_id:Rt.id,new_quantity:0,reason:"Unlinked from inventory"})})).success&&B(e=>e.filter(e=>e.id!==Rt.id))}else{(await Vt(`/api/restaurants/${Xt}/inventory/general-stock/${Rt.id}`,{method:"DELETE"})).success&&ke(e=>e.filter(e=>e.id!==Rt.id))}$t(!1),Dt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Rt.type?"Unlink":"Delete"})]})]})})]}):(0,g.jsx)(s.A,{children:(0,g.jsx)(o.mc,{children:(0,g.jsx)(o.pp,{children:(0,g.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},7617:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var r=n(4752),i=n(9610),a=n(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,o=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=r.Ay.button`
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
`,u=e=>{let{isOpen:t,title:n,message:r,onConfirm:u,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(d,{children:r})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:x,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:u,children:h})]})]})}):null}}}]);