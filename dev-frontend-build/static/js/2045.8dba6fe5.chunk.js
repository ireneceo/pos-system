"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2045],{2045:(e,t,n)=>{n.d(t,{A:()=>ue});var r=n(9950),i=n(4492),a=n(4752),s=n(7960),o=n(2488),l=n(1367),c=n(9610),d=n(4021),p=n(6038),u=n(3705),x=n(7617),h=n(4414);const g=a.Ay.div`
  padding: 24px 0;
`,m=a.Ay.div`
  display: grid;
  gap: 12px;
`,y=a.Ay.div`
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
`,j=a.Ay.div`
  flex: 1;
`,_=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,v=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,k=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,f=a.Ay.div`
  display: flex;
  gap: 8px;
`,b=a.Ay.button`
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
`,C=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,S=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,A=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,E=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,B=a.Ay.span`
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
`,z=a.Ay.div`
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
`,I=a.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,O=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,T=e=>{let{isBrandGeneralMode:t,restaurantId:n,onCountChange:i,onCategoryChange:a}=e;const{user:o}=(0,l.As)(),d=n||(null===o||void 0===o?void 0:o.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId),[p,T]=(0,r.useState)([]),[R,M]=(0,r.useState)([]),[P,U]=(0,r.useState)(!0),[L,N]=(0,r.useState)(!1),[Q,Z]=(0,r.useState)(null),[W,q]=(0,r.useState)(!1),[J,G]=(0,r.useState)(null),[H,Y]=(0,r.useState)({name:"",emoji:"",description:""}),X="Restaurant Admin"===(null===o||void 0===o?void 0:o.role),K="Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role),V=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,r.useEffect)(()=>{(async()=>{U(!0);const e=V();try{if(t||K){const t=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(T(n.data),i(n.data.length))}else if(X&&d){const t=await fetch(`/api/restaurants/${d}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,r;if(a.success)T(a.data.own_categories||[]),M(a.data.brand_categories||[]),i(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{U(!1)}})()},[t,d,K,X,V,i]);const ee=async()=>{try{const r=V();if(t||K){const e=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${r}`}}),t=await e.json();t.success&&(T(t.data),i(t.data.length))}else if(X&&d){const t=await fetch(`/api/restaurants/${d}/general-stock-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await t.json();var e,n;if(a.success)T(a.data.own_categories||[]),M(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},te=e=>{e?(Z(e),Y({name:e.name,emoji:e.emoji||"",description:e.description||""})):(Z(null),Y({name:"",emoji:"",description:""})),N(!0)},ne=()=>{N(!1),Z(null),Y({name:"",emoji:"",description:""})},re=async e=>{if(e.preventDefault(),H.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const r=Q?"PUT":"POST";if(t||K?n=Q?`/api/general-stock-categories/${Q.id}`:"/api/general-stock-categories":X&&d&&(n=Q?`/api/restaurants/${d}/general-stock-categories/${Q.id}`:`/api/restaurants/${d}/general-stock-categories`),!n)return;const i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:H.name.trim(),emoji:H.emoji||null,description:H.description.trim()||null})}),s=await i.json();s.success?(ne(),ee(),null===a||void 0===a||a()):alert(s.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},ie=async(e,n)=>{const r="up"===n?e-1:e+1;if(r<0||r>=p.length)return;const i=[...p];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(t||K?n="/api/general-stock-categories/reorder":X&&d&&(n=`/api/restaurants/${d}/general-stock-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),ee()}catch(s){console.error("Failed to reorder:",s)}},ae=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,h.jsxs)(y,{isActive:e.is_active,readOnly:r,children:[!r&&(0,h.jsx)(s.Xd,{onMoveUp:()=>ie(t,"up"),onMoveDown:()=>ie(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,h.jsx)($,{children:e.emoji}),(0,h.jsxs)(j,{children:[(0,h.jsxs)(_,{children:[e.name,r&&(0,h.jsx)(E,{children:"Brand"})]}),(0,h.jsxs)(v,{children:[(0,h.jsxs)("span",{children:[e.stock_count||0," items"]}),!r&&(0,h.jsx)(B,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(k,{children:e.description})]}),!r&&(0,h.jsxs)(f,{children:[(0,h.jsx)(b,{onClick:()=>te(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(b,{onClick:()=>(e=>{G(e),q(!0)})(e),title:"Delete",children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return P?(0,h.jsx)(g,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,h.jsxs)(g,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(A,{children:"General Stock Categories"}),(0,h.jsx)(u.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}),X&&R.length>0&&(0,h.jsxs)(I,{children:[(0,h.jsx)(O,{children:"Brand Categories (Read Only)"}),(0,h.jsx)(m,{children:R.map((e,t)=>ae(e,t,R,!0))})]}),0===p.length?(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"No general stock categories yet"}),(0,h.jsx)(C,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,h.jsx)(u.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}):(0,h.jsx)(m,{children:p.map((e,t)=>{return ae(e,t,p,(n=e,X&&"brand"===n.owner_type));var n})}),(0,h.jsx)(c.aF,{isOpen:L,onClose:ne,title:(Q?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:ne,children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:re,disabled:!H.name.trim(),children:Q?"Update":"Create"})]}),children:(0,h.jsxs)("form",{onSubmit:re,children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:H.name,onChange:e=>Y({...H,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Icon"}),(0,h.jsx)(z,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,h.jsx)(D,{selected:H.emoji===e,onClick:()=>Y({...H,emoji:e}),type:"button",children:e},e))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:H.description,onChange:e=>Y({...H,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,h.jsx)(x.A,{isOpen:W,onCancel:()=>{q(!1),G(null)},onConfirm:async()=>{if(J)try{const e=localStorage.getItem("auth_token");let n="";if(t||K?n=`/api/general-stock-categories/${J.id}`:X&&d&&(n=`/api/restaurants/${d}/general-stock-categories/${J.id}`),!n)return;const r=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(q(!1),G(null),ee(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:J?`Are you sure you want to delete "${J.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})};var R=n(4877);const M=a.Ay.div`
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
`,N=a.Ay.div`
  flex: 1;
`,Q=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,Z=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,W=a.Ay.div`
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
`,q=a.Ay.div`
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
`,ie=(0,a.Ay)(s.A0)`
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
`,ae=(0,a.Ay)(s.Hj)`
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
`,ce=a.Ay.button`
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
`,de=(a.Ay.div`
  position: relative;
`,a.Ay.input`
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
`,a.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
`,a.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,a.Ay.button`
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
`),pe=a.Ay.button`
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
`,ue=e=>{let{mode:t,restaurantId:n}=e;const{user:a}=(0,l.As)(),[u,x]=(0,i.ok)(),{defaultCurrency:g}=(0,d.i1)(),[m,y]=(0,r.useState)("RM"),j="restaurant"===t?n:void 0,_="brand"===t,v=u.get("tab")||"dashboard",k=e=>{x({tab:e})},[f,b]=(0,r.useState)(0),[w,F]=(0,r.useState)(0),[C,S]=(0,r.useState)(!0),[A,E]=(0,r.useState)(null),[B,$]=(0,r.useState)([]),[z,D]=(0,r.useState)([]),[I,O]=(0,r.useState)([]),[ue,he]=(0,r.useState)([]),[ge,me]=(0,r.useState)(""),[ye,je]=(0,r.useState)("all"),[_e,ve]=(0,r.useState)([]),[ke,fe]=(0,r.useState)(null),[be,we]=(0,r.useState)(!1),[Fe,Ce]=(0,r.useState)(""),[Se,Ae]=(0,r.useState)(""),[Ee,Be]=(0,r.useState)(""),[$e,ze]=(0,r.useState)(""),[De,Ie]=(0,r.useState)(""),[Oe,Te]=(0,r.useState)("all"),[Re,Me]=(0,r.useState)(!1),[Pe,Ue]=(0,r.useState)(!1),[Le,Ne]=(0,r.useState)(!1),[Qe,Ze]=(0,r.useState)(!1),[We,qe]=(0,r.useState)(null),[Je,Ge]=(0,r.useState)(""),[He,Ye]=(0,r.useState)(""),[Xe,Ke]=(0,r.useState)(""),[Ve,et]=(0,r.useState)(""),[tt,nt]=(0,r.useState)(""),[rt,it]=(0,r.useState)({}),[at,st]=(0,r.useState)(!1),[ot,lt]=(0,r.useState)(!1),[ct,dt]=(0,r.useState)(!1),[pt,ut]=(0,r.useState)(null),[xt,ht]=(0,r.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[gt,mt]=(0,r.useState)(!1),[yt,jt]=(0,r.useState)(!1),[_t,vt]=(0,r.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[kt,ft]=(0,r.useState)(!1),[bt,wt]=(0,r.useState)([]),[Ft,Ct]=(0,r.useState)([]),[St,At]=(0,r.useState)(""),[Et,Bt]=(0,r.useState)(!1),[$t,zt]=(0,r.useState)(!1),[Dt,It]=(0,r.useState)(null),[Ot,Tt]=(0,r.useState)(!1),[Rt,Mt]=(0,r.useState)(null),[Pt,Ut]=(0,r.useState)(!1),[Lt,Nt]=(0,r.useState)(null),[Qt,Zt]=(0,r.useState)(""),Wt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],[qt,Jt]=(Wt.filter(e=>e.label.toLowerCase().includes(St.toLowerCase())||e.value.toLowerCase().includes(St.toLowerCase())),(0,r.useState)(null)),[Gt,Ht]=(0,r.useState)(""),[Yt,Xt]=(0,r.useState)("ingredient"),Kt=(e,t)=>e<=0?"out_of_stock":e<=t?"low_stock":"normal",[Vt,en]=(0,r.useState)({});(0,r.useEffect)(()=>{g&&y(g)},[g]);const tn=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),nn=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=tn();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[tn]),rn=(0,r.useCallback)(async()=>{if("restaurant"!==t||j)try{if(S(!0),"restaurant"===t){const[e,t,n,r,i]=await Promise.all([nn(`/api/restaurants/${j}/inventory/summary`),nn(`/api/restaurants/${j}/inventory`),nn(`/api/restaurants/${j}/inventory/alerts?resolved=false`),nn(`/api/restaurants/${j}/inventory/reorder-suggestions`),nn(`/api/restaurants/${j}/inventory/expiring?days=14`)]);e.success&&E(e.data),t.success&&$(t.data),n.success&&D(n.data),r.success&&O(r.data),i.success&&he(i.data);try{const e=await nn(`/api/restaurants/${j}/inventory/general-stock`);e.success&&ve(e.data||[])}catch{ve([])}try{const e=await nn(`/api/restaurants/${j}/suppliers`);e.success&&wt(e.data||[])}catch{wt([])}try{const e=await nn(`/api/restaurants/${j}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];Ct(t)}}catch{Ct([])}}else{const e=await nn("/api/product-ingredients?track_stock=true");if(e.success){const t=(e.data||[]).map(e=>{var t;const n=parseFloat(e.current_stock)||0,r=parseFloat(e.min_stock)||0;let i="normal";return n<=0?i="out_of_stock":n<=r&&(i="low_stock"),{id:e.id,name:e.name,code:e.code,image_url:e.image_url,unit:e.unit,unit_cost:parseFloat(e.unit_cost)||0,category:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized",current_stock:n,min_stock:r,min_order:parseFloat(e.min_order)||0,last_actual_stock:parseFloat(e.last_actual_stock)||0,last_stock_take_at:e.last_stock_take_at,avg_daily_usage:parseFloat(e.avg_daily_usage)||0,lead_time_days:e.lead_time_days||1,safety_stock_percent:parseFloat(e.safety_stock_percent)||20,manual_daily_usage:e.manual_daily_usage?parseFloat(e.manual_daily_usage):null,prediction_confidence:e.prediction_confidence||"none",stock_status:i,supplier_id:e.supplier_id,supplier_name:e.supplier_name}});$(t);const n=t.filter(e=>"low_stock"===e.stock_status).length,r=t.filter(e=>"out_of_stock"===e.stock_status).length;E({total_items:t.length,low_stock_count:n,out_of_stock_count:r,monthly_loss:0,unresolved_alerts:n+r});const i=t.filter(e=>"normal"!==e.stock_status).map((e,t)=>({id:t,ingredient_id:e.id,alert_type:e.stock_status,current_stock:e.current_stock,min_stock:e.min_stock,ingredient:{id:e.id,name:e.name,unit:e.unit,unit_cost:e.unit_cost}}));D(i)}try{const e=await nn("/api/general-stock");e.success&&ve(e.data||[])}catch{ve([])}try{const e=await nn("/api/general-stock-categories");e.success&&Ct(e.data||[])}catch{Ct([])}try{const e=await nn("/api/suppliers");e.success&&wt(e.data||[])}catch{wt([])}O([]),he([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{S(!1)}},[t,j,nn]);(0,r.useEffect)(()=>{rn()},[rn]),(0,r.useEffect)(()=>{if(B.length>0){const e=B.some(e=>e.current_stock>0||e.last_stock_take_at);st(!e)}},[B]);const an=(e,t,n)=>{it(r=>({...r,[e]:{...r[e],[t]:n}}))},sn=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},on=e=>{qe(e),Ge(""),Ye(""),Ke(""),et(""),nt(""),Me(!0)},ln=(e,t,n)=>{Jt(e),Ht(t.toString()),Xt(n)},cn=()=>{Jt(null),Ht("")},dn=async e=>{const n=parseFloat(Gt);if(isNaN(n)||n<0)cn();else try{let r;if("restaurant"===t){const t="ingredient"===Yt?`/api/restaurants/${j}/inventory/adjust`:`/api/restaurants/${j}/inventory/general-stock/${e}/adjust`,i={new_quantity:n,reason:"Stock adjustment"};"ingredient"===Yt&&(i.ingredient_id=e),r=await nn(t,{method:"POST",body:JSON.stringify(i)})}else r=_&&"general_stock"===Yt?await nn(`/api/general-stock/${e}/adjust`,{method:"POST",body:JSON.stringify({new_quantity:n,reason:"Stock adjustment"})}):await nn(`/api/product-ingredients/${e}`,{method:"PUT",body:JSON.stringify({current_stock:n})});if(r.success){const t=(new Date).toISOString();"ingredient"===Yt?$(r=>r.map(r=>{if(r.id===e){const e=Kt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r})):ve(r=>r.map(r=>{if(r.id===e){const e=Kt(n,r.min_stock);return{...r,current_stock:n,stock_status:e,last_stock_take_at:t}}return r}))}}catch(r){console.error("Failed to adjust stock:",r)}finally{cn()}},pn=(e,t)=>{"Enter"===e.key?dn(t):"Escape"===e.key&&cn()},un=e=>{Nt(e),Zt(e.min_order?String(e.min_order):""),Ut(!0)},xn=B.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}),hn=(("all"===Oe||"ingredients"===Oe)&&xn.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===Oe||"general_stock"===Oe)&&_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString()}catch{return"-"}}),gn=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)},mn=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return"restaurant"!==t||!!j?(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Inventory"})}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(s.j,{children:[(0,h.jsx)(s.oz,{active:"dashboard"===v,onClick:()=>k("dashboard"),children:"Dashboard"}),(0,h.jsx)(s.oz,{active:"list"===v,onClick:()=>k("list"),children:"Stock List"}),(0,h.jsx)(s.oz,{active:"history"===v,onClick:()=>k("history"),children:"History"}),(0,h.jsx)(s.oz,{active:"categories"===v,onClick:()=>k("categories"),children:"Categories"})]}),C?(0,h.jsx)(s.pp,{children:"Loading..."}):"dashboard"===v?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{color:"#059669",children:[(0,h.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.total_items)||0}),(0,h.jsx)(s.v0,{children:"Total Ingredients"}),(0,h.jsx)(s.d1,{children:"managed items"})]}),(0,h.jsxs)(s.hI,{color:"#D97706",children:[(0,h.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.low_stock_count)||0}),(0,h.jsx)(s.v0,{children:"Low Stock"}),(0,h.jsx)(s.d1,{children:"need attention"})]}),(0,h.jsxs)(s.hI,{color:"#DC2626",children:[(0,h.jsx)(s.Os,{children:(null===A||void 0===A?void 0:A.out_of_stock_count)||0}),(0,h.jsx)(s.v0,{children:"Out of Stock"}),(0,h.jsx)(s.d1,{children:"urgent"})]}),(0,h.jsxs)(s.hI,{color:"#7C3AED",children:[(0,h.jsx)(s.Os,{children:(0,p.vv)((null===A||void 0===A?void 0:A.monthly_loss)||0,m)}),(0,h.jsx)(s.v0,{children:"Monthly Loss"}),(0,h.jsx)(s.d1,{children:"this month"})]}),(0,h.jsxs)(s.hI,{color:"#EA580C",children:[(0,h.jsx)(s.Os,{children:ue.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,h.jsx)(s.v0,{children:"Expiring Soon"}),(0,h.jsx)(s.d1,{children:"within 3 days"})]})]}),z.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(P,{children:"Stock Alerts"}),(0,h.jsx)("div",{children:z.slice(0,5).map(e=>(0,h.jsxs)(L,{type:e.alert_type,children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(Q,{children:e.ingredient.name}),(0,h.jsxs)(Z,{children:["Current: ",gn(e.current_stock)," ",e.ingredient.unit," / Min: ",gn(e.min_stock)," ",e.ingredient.unit]})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{const t=B.find(t=>t.id===e.ingredient_id);t&&on(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>(async e=>{if("brand"!==t)try{(await nn(`/api/restaurants/${j}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&D(t=>t.filter(t=>t.id!==e))}catch(n){console.error("Failed to resolve alert:",n)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),ue.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(P,{children:"Expiring Items"}),(0,h.jsx)("div",{children:ue.slice(0,5).map(e=>(0,h.jsxs)(Y,{urgency:e.urgency,children:[(0,h.jsxs)(N,{children:[(0,h.jsxs)(Q,{children:[e.ingredient_name,e.batch_number&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,h.jsxs)(Z,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsx)(X,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,h.jsx)(s.$n,{variant:"danger",onClick:()=>{const t=B.find(t=>t.id===e.ingredient_id);t&&(qe(t),Ge(""),Ye(""),Ue(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),I.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(P,{children:"Reorder Suggestions"}),(0,h.jsx)(M,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(s.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Daily Usage"}),(0,h.jsx)("span",{children:"Suggested Qty"}),(0,h.jsx)("span",{children:"Est. Cost"}),(0,h.jsx)("span",{children:"Urgency"}),(0,h.jsx)("span",{children:"Order"})]}),I.slice(0,10).map(e=>(0,h.jsxs)(s.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("div",{children:e.ingredient.name}),(0,h.jsxs)("div",{children:[gn(e.current_stock)," ",e.ingredient.unit]}),(0,h.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,h.jsxs)("div",{style:{fontWeight:600},children:[gn(e.suggested_qty)," ",e.ingredient.unit]}),(0,h.jsx)("div",{children:(0,p.vv)(e.estimated_cost,m)}),(0,h.jsx)("div",{children:(0,h.jsx)(H,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(le,{type:"number",min:"0",step:"1",value:Vt[e.ingredient.id]||e.suggested_qty,onChange:t=>en(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,h.jsx)(ce,{onClick:()=>{const t=B.find(t=>t.id===e.ingredient.id);t&&un({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,h.jsxs)(ee,{children:[(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{0===B.length?window.location.href=`/restaurant/${j}/recipe-management?tab=ingredients`:k("list")},children:"+ Receive Stock"}),(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>{0===B.length?window.location.href=`/restaurant/${j}/recipe-management?tab=ingredients`:k("list")},children:"+ Record Waste"}),(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>k("history"),children:"View All Transactions"})]})]}):"list"===v?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.Qn,{children:[(0,h.jsxs)(o.Jt,{value:Oe,onChange:e=>Te(e.target.value),style:{minWidth:"140px"},children:[(0,h.jsx)("option",{value:"all",children:"All Items"}),(0,h.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,h.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,h.jsx)(o.DO,{type:"text",placeholder:"Search...",value:ge,onChange:e=>me(e.target.value)}),(0,h.jsxs)(o.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,h.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>jt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===Oe||"general_stock"===Oe)&&_e.length>0&&(0,h.jsxs)(h.Fragment,{children:["all"===Oe&&(0,h.jsxs)(P,{children:["General Stock (",_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}).length,")"]}),(0,h.jsxs)(s.XI,{style:{marginBottom:"24px"},children:[(0,h.jsxs)(ie,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,h.jsx)("span",{children:"Item"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min Stock"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Last Stock Take"}),(0,h.jsx)("span",{children:"Order"}),(0,h.jsx)("span",{children:"Actions"})]}),_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),n="all"===ye||e.stock_status===ye;return t&&n}).map(e=>(0,h.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Item"}),(0,h.jsxs)(q,{children:[(0,h.jsx)(W,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,h.jsxs)(J,{children:[(0,h.jsx)(ne,{children:e.name}),e.code&&(0,h.jsx)(G,{children:e.code}),(0,h.jsx)(re,{children:e.category})]})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Status"}),(0,h.jsx)(U,{status:e.stock_status,children:mn(e.stock_status)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Current Stock"}),qt===e.id&&"general_stock"===Yt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(oe,{type:"number",step:"0.01",value:Gt,onChange:e=>Ht(e.target.value),onKeyDown:t=>pn(t,e.id),onBlur:()=>dn(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,h.jsxs)(se,{onClick:()=>ln(e.id,e.current_stock,"general_stock"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:gn(e.current_stock)}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Min Stock"}),(0,h.jsxs)("div",{style:{color:"#6B7280"},children:[gn(e.min_stock)," ",e.stock_unit]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,m)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Last Stock Take"}),(0,h.jsx)("div",{style:{color:"#6B7280"},children:hn(e.last_stock_take_at)})]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(le,{type:"number",min:"0",step:"1",value:Vt[`gs_${e.id}`]||"",onChange:t=>en(n=>({...n,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,h.jsx)(ce,{onClick:()=>{const t=Vt[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(un({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),Zt(t))},children:"Order"})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{fe(e),Ce(""),Ae(""),Be(""),ze(""),Ie(""),we(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(pe,{onClick:()=>{var t;It(e),vt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),zt(!0)},children:"Edit"}),(0,h.jsx)(de,{onClick:()=>{Mt({type:"general_stock",id:e.id,name:e.name}),Tt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===Oe||"ingredients"===Oe)&&(0,h.jsxs)(h.Fragment,{children:["all"===Oe&&(0,h.jsxs)(P,{children:["Ingredients (",xn.length,")"]}),0===xn.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===B.length?"No ingredients found":"No matching ingredients"}),(0,h.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===B.length?"brand"===t?'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.':"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===B.length&&(0,h.jsxs)(s.$n,{variant:"primary",onClick:()=>window.location.href="brand"===t?"/brand/product-recipe?tab=ingredients":`/restaurant/${j}/recipe-management?tab=ingredients`,children:["Go to ","brand"===t?"Product Ingredients":"Ingredients"]})]}):(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(ie,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min / Prediction"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Last Stock Take"}),(0,h.jsx)("span",{children:"Order"}),(0,h.jsx)("span",{children:"Actions"})]}),xn.map(e=>(0,h.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 160px",children:[(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Ingredient"}),(0,h.jsxs)(q,{children:[(0,h.jsx)(W,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,h.jsxs)(J,{children:[(0,h.jsx)(ne,{children:e.name}),e.code&&(0,h.jsx)(G,{children:e.code}),(0,h.jsxs)(re,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Status"}),(0,h.jsx)(U,{status:e.stock_status,children:mn(e.stock_status)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Current Stock"}),qt===e.id&&"ingredient"===Yt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(oe,{type:"number",step:"0.01",value:Gt,onChange:e=>Ht(e.target.value),onKeyDown:t=>pn(t,e.id),onBlur:()=>dn(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,h.jsxs)(se,{onClick:()=>ln(e.id,e.current_stock,"ingredient"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:gn(e.current_stock)}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Min / Prediction"}),(0,h.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",gn(e.min_stock)," ",e.unit]}),(0,h.jsx)(K,{level:e.prediction_confidence||"none",children:sn(e.prediction_confidence||"none")})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,m)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Last Stock Take"}),(0,h.jsx)("div",{style:{color:"#6B7280"},children:hn(e.last_stock_take_at)})]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(le,{type:"number",min:"0",step:"1",value:Vt[e.id]||"",onChange:t=>en(n=>({...n,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,h.jsx)(ce,{onClick:()=>{const t=Vt[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(un({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),Zt(t))},children:"Order"})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>on(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(V,{onClick:()=>(e=>{var t;ut(e),ht({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),dt(!0)})(e),children:"Settings"}),(0,h.jsx)(de,{onClick:()=>{Mt({type:"ingredient",id:e.id,name:e.name}),Tt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id))]})]})]}):"categories"===v?(0,h.jsx)(T,{isBrandGeneralMode:_,restaurantId:"restaurant"===t&&j?Number(j):null,onCountChange:b,onCategoryChange:()=>F(e=>e+1)}):(0,h.jsx)(xe,{restaurantId:"restaurant"===t?j:void 0,isBrandGeneralMode:_,currency:m})]}),(0,h.jsx)(c.aF,{isOpen:Re,onClose:()=>Me(!1),title:"Receive Stock",size:"medium",children:We&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient"}),(0,h.jsx)(c.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${gn(We.current_stock)} ${We.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Quantity Received (",We.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:Je,onChange:e=>Ge(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,h.jsx)(c.ZQ,{type:"text",value:Xe,onChange:e=>Ke(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Manufacture Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:Ve,onChange:e=>et(e.target.value)})]})]}),(0,h.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,h.jsx)(c.lR,{children:"Expiry Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:tt,onChange:e=>nt(e.target.value)}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Notes (Optional)"}),(0,h.jsx)(c.ZQ,{type:"text",value:He,onChange:e=>Ye(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(We&&Je)try{let r;if("restaurant"===t)r=await nn(`/api/restaurants/${j}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Je),notes:He,batch_number:Xe||null,manufacture_date:Ve||null,expiry_date:tt||null})});else{const e=We.current_stock+parseFloat(Je);r=await nn(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:We.current_stock+parseFloat(Je),i=Kt(t,We.min_stock),a=(new Date).toISOString();$(e=>e.map(e=>e.id===We.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Me(!1),qe(null),Ge(""),Ye(""),Ke(""),et(""),nt("")}}catch(r){console.error("Failed to receive stock:",r)}},children:"Confirm Receive"})]})]})}),(0,h.jsx)(c.aF,{isOpen:Pe,onClose:()=>Ue(!1),title:"Record Waste",size:"small",children:We&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient"}),(0,h.jsx)(c.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${gn(We.current_stock)} ${We.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Waste Quantity (",We.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:Je,onChange:e=>Ge(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Reason (Optional)"}),(0,h.jsx)(c.ZQ,{type:"text",value:He,onChange:e=>Ye(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Ue(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(We&&Je)try{let r;if("restaurant"===t)r=await nn(`/api/restaurants/${j}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Je),notes:He})});else{const e=Math.max(0,We.current_stock-parseFloat(Je));r=await nn(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(r.success){var e,n;const t=null!==(e=null===(n=r.data)||void 0===n?void 0:n.current_stock)&&void 0!==e?e:Math.max(0,We.current_stock-parseFloat(Je)),i=Kt(t,We.min_stock),a=(new Date).toISOString();$(e=>e.map(e=>e.id===We.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Ue(!1),qe(null),Ge(""),Ye("")}}catch(r){console.error("Failed to record waste:",r)}},children:"Confirm Waste"})]})]})}),(0,h.jsxs)(c.aF,{isOpen:Le,onClose:()=>Ne(!1),title:"Set Initial Stock",size:"large",children:[(0,h.jsx)(M,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,h.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(B.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(s.A0,{columns:"2fr 1fr 1fr",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Qty"}),(0,h.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,h.jsxs)(s.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,h.jsx)("div",{children:(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=rt[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>an(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,h.jsx)("div",{children:(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=rt[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>an(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Ne(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(rt).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{lt(!0);if((await nn(`/api/restaurants/${j}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success){const e=(new Date).toISOString();$(t=>t.map(t=>{const n=rt[t.id];if(n&&parseFloat(n.quantity)>0){const r=parseFloat(n.quantity),i=parseFloat(n.min_stock)||0,a=Kt(r,i);return{...t,current_stock:r,min_stock:i,stock_status:a,last_stock_take_at:e}}return t})),Ne(!1),st(!1)}}catch(t){console.error("Failed to save initial stock:",t)}finally{lt(!1)}},disabled:ot,children:ot?"Saving...":"Save Initial Stock"})]})]}),(0,h.jsx)(c.aF,{isOpen:be,onClose:()=>we(!1),title:"Receive Stock",size:"medium",children:ke&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item"}),(0,h.jsx)(c.ZQ,{type:"text",value:ke.name,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${gn(ke.current_stock)} ${ke.stock_unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Quantity Received (",ke.stock_unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Fe,onChange:e=>Ce(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ee,onChange:e=>Be(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,h.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,h.jsx)(c.lR,{children:"Manufacture Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:$e,onChange:e=>ze(e.target.value)})]})]}),(0,h.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,h.jsx)(c.lR,{children:"Expiry Date"}),(0,h.jsx)(c.ZQ,{type:"date",value:De,onChange:e=>Ie(e.target.value)}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Notes (Optional)"}),(0,h.jsx)(c.ZQ,{type:"text",value:Se,onChange:e=>Ae(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Fe&&!(parseFloat(Fe)<=0))try{const n=_?`/api/general-stock/${ke.id}/receive`:`/api/restaurants/${j}/inventory/general-stock/${ke.id}/receive`,r=await nn(n,{method:"POST",body:JSON.stringify({quantity:parseFloat(Fe),notes:Se,batch_number:Ee||null,manufacture_date:$e||null,expiry_date:De||null})});if(r.success){var e,t;const n=null!==(e=null===(t=r.data)||void 0===t?void 0:t.current_stock)&&void 0!==e?e:parseFloat(String(ke.current_stock))+parseFloat(Fe),i=Kt(n,ke.min_stock),a=(new Date).toISOString();ve(e=>e.map(e=>e.id===ke.id?{...e,current_stock:n,stock_status:i,last_stock_take_at:a}:e)),we(!1),Ce(""),Ae(""),Be(""),ze(""),Ie("")}}catch(n){console.error("Failed to receive general stock:",n)}},disabled:!Fe||parseFloat(Fe)<=0,children:"Confirm Receive"})]})]})}),(0,h.jsx)(c.aF,{isOpen:Pt,onClose:()=>Ut(!1),title:`Order: ${(null===Lt||void 0===Lt?void 0:Lt.name)||""}`,size:"small",children:Lt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[gn(Lt.current_stock)," ",Lt.unit]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[gn(Lt.min_stock)," ",Lt.unit]})]})]}),Lt.min_order&&Lt.min_order>0&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",gn(Lt.min_order)," ",Lt.unit]}),Lt.supplier_name&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Lt.supplier_name]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Order Quantity (",Lt.unit,") *"]}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Qt,onChange:e=>Zt(e.target.value),placeholder:Lt.min_order?`Min: ${Lt.min_order}`:"Enter quantity"})]}),Qt&&parseFloat(Qt)>0&&(0,h.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,p.vv)(parseFloat(Qt)*Lt.unit_cost,m)})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Ut(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:()=>{Lt&&Qt&&(alert(`Order sent: ${Qt} ${Lt.unit} of ${Lt.name}`),Ut(!1),Nt(null),Zt(""))},disabled:!Qt||parseFloat(Qt)<=0,children:"Send Order"})]})]})}),(0,h.jsx)(c.aF,{isOpen:ct,onClose:()=>dt(!1),title:`Settings: ${(null===pt||void 0===pt?void 0:pt.name)||""}`,size:"small",children:pt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(M,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(K,{level:pt.prediction_confidence||"none",children:sn(pt.prediction_confidence||"none")}),(0,h.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(pt.avg_daily_usage))||0).toFixed(2)," ",pt.unit,"/day (calculated)"]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Minimum Stock Level (",pt.unit,")"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:xt.min_stock,onChange:e=>ht({...xt,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Minimum Order (",pt.unit,")"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:xt.min_order,onChange:e=>ht({...xt,min_order:e.target.value}),placeholder:"0"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Lead Time (days)"}),(0,h.jsx)(c.ZQ,{type:"number",min:"1",value:xt.lead_time_days,onChange:e=>ht({...xt,lead_time_days:e.target.value}),placeholder:"1"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,h.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:xt.safety_stock_percent,onChange:e=>ht({...xt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Manual Daily Usage (",pt.unit,"/day)"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:xt.manual_daily_usage,onChange:e=>ht({...xt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>dt(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(pt)try{mt(!0);if((await nn(`/api/restaurants/${j}/inventory/${pt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(xt.lead_time_days)||1,safety_stock_percent:parseFloat(xt.safety_stock_percent)||20,manual_daily_usage:xt.manual_daily_usage?parseFloat(xt.manual_daily_usage):null,min_stock:parseFloat(xt.min_stock)||0,min_order:parseFloat(xt.min_order)||0})})).success){const e=parseFloat(xt.min_stock)||0;$(t=>t.map(t=>{if(t.id===pt.id){const n=Kt(t.current_stock,e);return{...t,lead_time_days:parseInt(xt.lead_time_days)||1,safety_stock_percent:parseFloat(xt.safety_stock_percent)||20,manual_daily_usage:xt.manual_daily_usage?parseFloat(xt.manual_daily_usage):null,min_stock:e,stock_status:n}}return t})),dt(!1)}}catch(e){console.error("Failed to save settings:",e)}finally{mt(!1)}},disabled:gt,children:gt?"Saving...":"Save Settings"})]})]})}),(0,h.jsxs)(c.aF,{isOpen:yt,onClose:()=>{jt(!1),Bt(!1)},title:"Add General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.name,onChange:e=>vt({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Code (SKU)"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.code,onChange:e=>vt({..._t,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,h.jsx)(R.A,{value:_t.image_url,onChange:e=>vt({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit *"}),(0,h.jsx)(o.Jt,{value:_t.stock_unit,onChange:e=>vt({..._t,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Wt.map(e=>(0,h.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category"}),(0,h.jsxs)(o.Jt,{value:_t.category,onChange:e=>vt({..._t,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),Ft.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Supplier"}),(0,h.jsxs)(o.Jt,{value:_t.supplier_id,onChange:e=>vt({..._t,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),bt.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit Cost"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>vt({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Initial Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>vt({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>vt({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Order"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>vt({..._t,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,h.jsxs)(te,{style:{marginTop:"24px"},children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{jt(!1),Bt(!1)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim())try{ft(!0);const e=_?"/api/general-stock":`/api/restaurants/${j}/inventory/general-stock`,t=await nn(e,{method:"POST",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})});if(t.success&&t.data){const e={...t.data,stock_unit:t.data.stock_unit||t.data.unit||_t.stock_unit,stock_status:Kt(parseFloat(_t.current_stock)||0,parseFloat(_t.min_stock)||0),last_stock_take_at:(new Date).toISOString()};ve(t=>[...t,e]),jt(!1),vt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to add general stock:",e)}finally{ft(!1)}},disabled:kt||!_t.name.trim(),children:kt?"Adding...":"Add Item"})]})]}),(0,h.jsxs)(c.aF,{isOpen:$t,onClose:()=>{zt(!1),It(null)},title:"Edit General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.name,onChange:e=>vt({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Code (SKU)"}),(0,h.jsx)(c.ZQ,{type:"text",value:_t.code,onChange:e=>vt({..._t,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,h.jsx)(R.A,{value:_t.image_url,onChange:e=>vt({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit *"}),(0,h.jsx)(o.Jt,{value:_t.stock_unit,onChange:e=>vt({..._t,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Wt.map(e=>(0,h.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category"}),(0,h.jsxs)(o.Jt,{value:_t.category,onChange:e=>vt({..._t,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),Ft.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Supplier"}),(0,h.jsxs)(o.Jt,{value:_t.supplier_id,onChange:e=>vt({..._t,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),bt.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit Cost"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>vt({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>vt({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Stock"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>vt({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Min Order"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>vt({..._t,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,h.jsxs)(te,{style:{marginTop:"24px"},children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{zt(!1),It(null)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim()&&Dt)try{ft(!0);const e=_?`/api/general-stock/${Dt.id}`:`/api/restaurants/${j}/inventory/general-stock/${Dt.id}`;if((await nn(e,{method:"PUT",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})})).success&&Dt){const e=parseFloat(_t.current_stock)||0,t=parseFloat(_t.min_stock)||0;ve(n=>n.map(n=>n.id===Dt.id?{...n,name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:e,min_stock:t,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null,stock_status:Kt(e,t)}:n)),zt(!1),It(null),vt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to update general stock:",e)}finally{ft(!1)}},disabled:kt||!_t.name.trim(),children:kt?"Saving...":"Save Changes"})]})]}),(0,h.jsx)(c.aF,{isOpen:Ot,onClose:()=>{Tt(!1),Mt(null)},title:"Unlink from Inventory",size:"small",children:Rt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Rt.name}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Rt.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,h.jsxs)(te,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>{Tt(!1),Mt(null)},children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Rt.type){const e="brand"===t?`/api/product-ingredients/${Rt.id}`:`/api/restaurants/${j}/ingredients/${Rt.id}`;(await nn(e,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&$(e=>e.filter(e=>e.id!==Rt.id))}else{const e=_?`/api/general-stock/${Rt.id}`:`/api/restaurants/${j}/inventory/general-stock/${Rt.id}`;(await nn(e,{method:"DELETE"})).success&&ve(e=>e.filter(e=>e.id!==Rt.id))}Tt(!1),Mt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Rt.type?"Unlink":"Delete"})]})]})})]}):(0,h.jsx)(s.mc,{children:(0,h.jsx)(s.pp,{children:(0,h.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})},xe=e=>{let{restaurantId:t,isBrandGeneralMode:n,currency:i}=e;const[a,o]=(0,r.useState)([]),[l,c]=(0,r.useState)(!0),d=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)};(0,r.useEffect)(()=>{(t||n)&&(async()=>{try{const e=localStorage.getItem("auth_token"),r=n?"/api/general-stock/transactions?limit=50":`/api/restaurants/${t}/inventory/transactions?limit=50`,i=await fetch(r,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();a.success&&o(a.data||[])}catch(e){console.error("Failed to fetch transactions:",e)}finally{c(!1)}})()},[t,n]);const p=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},u=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return l?(0,h.jsx)(s.pp,{children:"Loading transactions..."}):0===a.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(s.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,h.jsx)("span",{children:"Date"}),(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Type"}),(0,h.jsx)("span",{children:"Change"}),(0,h.jsx)("span",{children:"After"}),(0,h.jsx)("span",{children:"Notes"})]}),a.map(e=>{var t;return(0,h.jsx)(s.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Date"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Ingredient"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Type"}),(0,h.jsx)("span",{style:{color:u(e.transaction_type),fontWeight:600},children:p(e.transaction_type)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Change"}),(0,h.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",d(e.quantity_change)," ",e.unit]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"After"}),(0,h.jsxs)("div",{style:{color:"#0A2540"},children:[d(e.stock_after)," ",e.unit]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Notes"}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})}},2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>d,Qn:()=>l});n(9950);var r=n(4752),i=n(4414);const a=r.Ay.div`
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
`,l=e=>{let{children:t,className:n,style:r,...s}=e;return(0,i.jsx)(a,{className:n,style:r,...s,children:t})},c=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(s,{placeholder:t,...n})},d=e=>{let{children:t,...n}=e;return(0,i.jsx)(o,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(a.DL)),[l,c]=(0,r.useState)(!0),[d,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:d}}},4877:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),i=n(4752),a=n(4414);const s=i.Ay.div`
  margin-bottom: 16px;
`,o=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,d=i.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=i.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=i.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=i.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=i.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
  }

  input {
    display: none;
  }
`,m=i.Ay.button`
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
`,y=i.Ay.input`
  display: none;
`,j=i.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,_=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:n,label:i="Logo Upload",helpText:v="Upload an image for your logo",maxSize:k=2,previewSize:f=150,showRemoveButton:b=!0,changeButtonText:w="Change Image",removeButtonText:F="Remove Image",imageAltText:C="Uploaded"}=e;const[S,A]=(0,r.useState)(!1),[E,B]=(0,r.useState)(!1),$=(0,r.useRef)(null),z=(0,r.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*k*1024)return void alert(`Image size should be less than ${k}MB`);B(!0);const t=new FileReader;t.onload=async e=>{var t;const r=new Image;r.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void B(!1);const i=1200;let a=r.width,s=r.height;(a>i||s>i)&&(a>s?(s=s/a*i,a=i):(a=a/s*i,s=i)),e.width=a,e.height=s,t.drawImage(r,0,0,a,s);const o=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`${_()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),r=await n.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(t){return console.error("Image upload error:",t),null}})(o);B(!1),l?n(l):alert("Failed to upload image. Please try again.")},r.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},I=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&D(t[0]),e.target.value=""};return(0,a.jsxs)(s,{children:[i&&(0,a.jsx)(o,{children:i}),v&&(0,a.jsx)(l,{children:v}),(0,a.jsxs)(c,{children:[(0,a.jsx)(d,{ref:z,isDragging:S,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||A(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&A(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),A(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&D(t[0])},onClick:()=>{var e;t||E||(null===(e=$.current)||void 0===e||e.click())},children:E?(0,a.jsxs)(p,{children:[(0,a.jsx)(j,{}),(0,a.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,a.jsx)("img",{src:(O=t,O?O.startsWith("http")?O:O.startsWith("/uploads/")?`${_()}${O}`:O:""),alt:C}):(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(x,{children:["PNG, JPG, GIF up to ",k,"MB"]})]})}),t&&!E&&(0,a.jsxs)(h,{children:[(0,a.jsxs)(g,{disabled:E,children:[w,(0,a.jsx)("input",{ref:$,type:"file",accept:"image/*",onChange:I,disabled:E})]}),b&&(0,a.jsx)(m,{onClick:()=>{n("")},disabled:E,children:F})]})]}),!t&&!E&&(0,a.jsx)(y,{ref:$,type:"file",accept:"image/*",onChange:I})]});var O}},7617:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var r=n(4752),i=n(9610),a=n(4414);const s=r.Ay.div`
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
`,c=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,d=r.Ay.div`
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
`,u=e=>{let{isOpen:t,title:n,message:r,onConfirm:u,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(c,{children:r})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:x,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:u,children:h})]})]})}):null}}}]);