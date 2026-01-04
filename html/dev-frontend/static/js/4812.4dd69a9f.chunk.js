"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4812],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var a=t(4752),n=t(4414);const o=a.Ay.div`
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
`,i=a.Ay.input`
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
`,s=a.Ay.select`
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
`,d=e=>{let{children:r,className:t,style:a,...i}=e;return(0,n.jsx)(o,{className:t,style:a,...i,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(i,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(s,{...t,children:r})}},3705:(e,r,t)=>{t.d(r,{cc:()=>n});var a=t(4752);const n=a.Ay.button`
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
`;a.Ay.select`
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
`,a.Ay.input`
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
`,a.Ay.div`
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
`},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var a=t(9950),n=t(1367),o=t(6038);const i=()=>{const{user:e}=(0,n.As)(),[r,t]=(0,a.useState)("RM"),[i,s]=(0,a.useState)(Object.keys(o.DL)),[d,l]=(0,a.useState)(!0),[c,p]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),a=r.indexOf("restaurant");let n=a>=0?r[a+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),a=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(a)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),p("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:d,error:c}}},5631:(e,r,t)=>{t.d(r,{A:()=>_});var a=t(9950),n=t(4752),o=t(3705),i=t(1367),s=t(9610),d=t(7492),l=t(7617),c=t(4414);const p=n.Ay.div`
  padding: 24px 0;
`,x=n.Ay.div`
  display: grid;
  gap: 12px;
`,h=n.Ay.div`
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
`,g=n.Ay.div`
  flex: 1;
`,u=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,m=n.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,b=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,y=n.Ay.div`
  display: flex;
  gap: 8px;
`,f=n.Ay.button`
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
`,w=n.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,v=n.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,j=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,F=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,A=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,C=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,B=n.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,E=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,$=n.Ay.button`
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
`,z=n.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,S=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,_=e=>{let{brandId:r,restaurantId:t,onCountChange:n,onCategoryChange:_}=e;const{user:D}=(0,i.As)(),M=t||(null===D||void 0===D?void 0:D.restaurant_id)||(null===D||void 0===D?void 0:D.restaurantId),[T,O]=(0,a.useState)([]),[I,R]=(0,a.useState)([]),[L,N]=(0,a.useState)(!0),[P,U]=(0,a.useState)(!1),[Y,G]=(0,a.useState)(null),[H,J]=(0,a.useState)(!1),[W,Q]=(0,a.useState)(null),[V,q]=(0,a.useState)({name:"",emoji:"",description:""}),X="Restaurant Admin"===(null===D||void 0===D?void 0:D.role),Z="Brand General"===(null===D||void 0===D?void 0:D.role)||"Brand Manager"===(null===D||void 0===D?void 0:D.role),K=(0,a.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,a.useEffect)(()=>{(async()=>{N(!0);const e=K();try{if(Z&&r){const t=await fetch(`/api/brands/${r}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();a.success&&(O(a.data),n(a.data.length))}else if(X&&M){const r=await fetch(`/api/restaurants/${M}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),o=await r.json();var t,a;if(o.success)O(o.data.own_categories||[]),R(o.data.brand_categories||[]),n(((null===(t=o.data.own_categories)||void 0===t?void 0:t.length)||0)+((null===(a=o.data.brand_categories)||void 0===a?void 0:a.length)||0))}}catch(o){console.error("Failed to fetch data:",o)}finally{N(!1)}})()},[r,M,Z,X,K,n]);const ee=async()=>{try{const a=K();if(Z&&r){const e=await fetch(`/api/brands/${r}/general-stock-categories`,{headers:{Authorization:`Bearer ${a}`}}),t=await e.json();t.success&&(O(t.data),n(t.data.length))}else if(X&&M){const r=await fetch(`/api/restaurants/${M}/general-stock-categories`,{headers:{Authorization:`Bearer ${a}`}}),o=await r.json();var e,t;if(o.success)O(o.data.own_categories||[]),R(o.data.brand_categories||[]),n(((null===(e=o.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(t=o.data.brand_categories)||void 0===t?void 0:t.length)||0))}}catch(a){console.error("Failed to fetch categories:",a)}},re=e=>{e?(G(e),q({name:e.name,emoji:e.emoji||"",description:e.description||""})):(G(null),q({name:"",emoji:"",description:""})),U(!0)},te=()=>{U(!1),G(null),q({name:"",emoji:"",description:""})},ae=async e=>{if(e.preventDefault(),V.name.trim())try{const e=localStorage.getItem("auth_token");let t="";const a=Y?"PUT":"POST";if(Z&&r?t=Y?`/api/brands/${r}/general-stock-categories/${Y.id}`:`/api/brands/${r}/general-stock-categories`:X&&M&&(t=Y?`/api/restaurants/${M}/general-stock-categories/${Y.id}`:`/api/restaurants/${M}/general-stock-categories`),!t)return;const n=await fetch(t,{method:a,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:V.name.trim(),emoji:V.emoji||null,description:V.description.trim()||null})}),o=await n.json();o.success?(te(),ee(),null===_||void 0===_||_()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},ne=async(e,t)=>{const a="up"===t?e-1:e+1;if(a<0||a>=T.length)return;const n=[...T];[n[e],n[a]]=[n[a],n[e]];const o=n.map((e,r)=>({id:e.id,display_order:r}));try{const e=localStorage.getItem("auth_token");let t="";if(Z&&r?t=`/api/brands/${r}/general-stock-categories/reorder`:X&&M&&(t=`/api/restaurants/${M}/general-stock-categories/reorder`),!t)return;await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:o})}),ee()}catch(i){console.error("Failed to reorder:",i)}},oe=function(e,r,t){let a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,c.jsxs)(h,{isActive:e.is_active,readOnly:a,children:[!a&&(0,c.jsx)(d.Xd,{onMoveUp:()=>ne(r,"up"),onMoveDown:()=>ne(r,"down"),disableUp:0===r,disableDown:r===t.length-1}),e.emoji&&(0,c.jsx)(B,{children:e.emoji}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(u,{children:[e.name,a&&(0,c.jsx)(A,{children:"Brand"})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)("span",{children:[e.stock_count||0," items"]}),!a&&(0,c.jsx)(C,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,c.jsx)(b,{children:e.description})]}),!a&&(0,c.jsxs)(y,{children:[(0,c.jsx)(f,{onClick:()=>re(e),title:"Edit",children:(0,c.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,c.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,c.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,c.jsx)(f,{onClick:()=>(e=>{Q(e),J(!0)})(e),title:"Delete",children:(0,c.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,c.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return L?(0,c.jsx)(p,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,c.jsxs)(p,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(F,{children:"General Stock Categories"}),(0,c.jsx)(o.cc,{variant:"primary",onClick:()=>re(),children:"Add Category"})]}),X&&I.length>0&&(0,c.jsxs)(z,{children:[(0,c.jsx)(S,{children:"Brand Categories (Read Only)"}),(0,c.jsx)(x,{children:I.map((e,r)=>oe(e,r,I,!0))})]}),0===T.length?(0,c.jsxs)(w,{children:[(0,c.jsx)(v,{children:"No general stock categories yet"}),(0,c.jsx)(j,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,c.jsx)(o.cc,{variant:"primary",onClick:()=>re(),children:"Add Category"})]}):(0,c.jsx)(x,{children:T.map((e,r)=>{return oe(e,r,T,(t=e,X&&"brand"===t.owner_type));var t})}),(0,c.jsx)(s.aF,{isOpen:P,onClose:te,title:(Y?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.yl,{variant:"secondary",onClick:te,children:"Cancel"}),(0,c.jsx)(s.yl,{variant:"primary",onClick:ae,disabled:!V.name.trim(),children:Y?"Update":"Create"})]}),children:(0,c.jsxs)("form",{onSubmit:ae,children:[(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"Category Name *"}),(0,c.jsx)(s.ZQ,{type:"text",value:V.name,onChange:e=>q({...V,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"Icon"}),(0,c.jsx)(E,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,c.jsx)($,{selected:V.emoji===e,onClick:()=>q({...V,emoji:e}),type:"button",children:e},e))})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"Description"}),(0,c.jsx)(s.Lz,{value:V.description,onChange:e=>q({...V,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,c.jsx)(l.A,{isOpen:H,onCancel:()=>{J(!1),Q(null)},onConfirm:async()=>{if(W)try{const e=localStorage.getItem("auth_token");let t="";if(Z&&r?t=`/api/brands/${r}/general-stock-categories/${W.id}`:X&&M&&(t=`/api/restaurants/${M}/general-stock-categories/${W.id}`),!t)return;const a=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await a.json();n.success?(J(!1),Q(null),ee(),null===_||void 0===_||_()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:W?`Are you sure you want to delete "${W.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,r,t)=>{t.d(r,{A:()=>x});t(9950);var a=t(4752),n=t(9610),o=t(4414);const i=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=a.Ay.button`
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
`,x=e=>{let{isOpen:r,title:t,message:a,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:u="Cancel",type:m="warning"}=e;return r?(0,o.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,o.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(l,{children:a})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:h,children:u}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:g})]})]})}):null}}}]);