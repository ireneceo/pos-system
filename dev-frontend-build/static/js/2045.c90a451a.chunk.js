"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2045],{2045:(e,t,r)=>{r.d(t,{A:()=>xe});var n=r(8819),i=r(9950),a=r(4492),s=r(4752),o=r(2674),l=r(2488),c=r(1367),d=r(9610),p=r(4021),u=r(6038),x=r(3705),h=r(7617),g=r(4414);const m=s.Ay.div`
  padding: 24px 0;
`,y=s.Ay.div`
  display: grid;
  gap: 12px;
`,j=s.Ay.div`
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
`,_=s.Ay.div`
  flex: 1;
`,v=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,f=s.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${n.w.colors.text.muted};
`,k=s.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.muted};
  margin-top: 4px;
`,b=s.Ay.div`
  display: flex;
  gap: 8px;
`,w=s.Ay.button`
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
    border-color: ${n.w.colors.primary};
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
    color: ${n.w.colors.text.muted};
    transition: color 0.15s;
  }
`,C=s.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,S=s.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,F=s.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,$=s.Ay.h3`
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
`,D=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,I=s.Ay.button`
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
`,O=s.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,T=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,R=e=>{let{isBrandGeneralMode:t,restaurantId:r,onCountChange:n,onCategoryChange:a}=e;const{user:s}=(0,c.As)(),l=r||(null===s||void 0===s?void 0:s.restaurant_id)||(null===s||void 0===s?void 0:s.restaurantId),[p,u]=(0,i.useState)([]),[R,M]=(0,i.useState)([]),[L,P]=(0,i.useState)(!0),[U,N]=(0,i.useState)(!1),[Q,Z]=(0,i.useState)(null),[W,q]=(0,i.useState)(!1),[J,G]=(0,i.useState)(null),[H,X]=(0,i.useState)({name:"",emoji:"",description:""}),Y="Restaurant Admin"===(null===s||void 0===s?void 0:s.role),K="Brand General"===(null===s||void 0===s?void 0:s.role)||"Brand Manager"===(null===s||void 0===s?void 0:s.role),V=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{(async()=>{P(!0);const e=V();try{if(t||K){const t=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success&&(u(r.data),n(r.data.length))}else if(Y&&l){const t=await fetch(`/api/restaurants/${l}/general-stock-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var r,i;if(a.success)u(a.data.own_categories||[]),M(a.data.brand_categories||[]),n(((null===(r=a.data.own_categories)||void 0===r?void 0:r.length)||0)+((null===(i=a.data.brand_categories)||void 0===i?void 0:i.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{P(!1)}})()},[t,l,K,Y,V,n]);const ee=async()=>{try{const i=V();if(t||K){const e=await fetch("/api/general-stock-categories",{headers:{Authorization:`Bearer ${i}`}}),t=await e.json();t.success&&(u(t.data),n(t.data.length))}else if(Y&&l){const t=await fetch(`/api/restaurants/${l}/general-stock-categories`,{headers:{Authorization:`Bearer ${i}`}}),a=await t.json();var e,r;if(a.success)u(a.data.own_categories||[]),M(a.data.brand_categories||[]),n(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(i){console.error("Failed to fetch categories:",i)}},te=e=>{e?(Z(e),X({name:e.name,emoji:e.emoji||"",description:e.description||""})):(Z(null),X({name:"",emoji:"",description:""})),N(!0)},re=()=>{N(!1),Z(null),X({name:"",emoji:"",description:""})},ne=async e=>{if(e.preventDefault(),H.name.trim())try{const e=localStorage.getItem("auth_token");let r="";const n=Q?"PUT":"POST";if(t||K?r=Q?`/api/general-stock-categories/${Q.id}`:"/api/general-stock-categories":Y&&l&&(r=Q?`/api/restaurants/${l}/general-stock-categories/${Q.id}`:`/api/restaurants/${l}/general-stock-categories`),!r)return;const i=await fetch(r,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:H.name.trim(),emoji:H.emoji||null,description:H.description.trim()||null})}),s=await i.json();s.success?(re(),ee(),null===a||void 0===a||a()):alert(s.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},ie=async(e,r)=>{const n="up"===r?e-1:e+1;if(n<0||n>=p.length)return;const i=[...p];[i[e],i[n]]=[i[n],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let r="";if(t||K?r="/api/general-stock-categories/reorder":Y&&l&&(r=`/api/restaurants/${l}/general-stock-categories/reorder`),!r)return;await fetch(r,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),ee()}catch(s){console.error("Failed to reorder:",s)}},ae=function(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,g.jsxs)(j,{isActive:e.is_active,readOnly:n,children:[!n&&(0,g.jsx)(o.Xd,{onMoveUp:()=>ie(t,"up"),onMoveDown:()=>ie(t,"down"),disableUp:0===t,disableDown:t===r.length-1}),e.emoji&&(0,g.jsx)(z,{children:e.emoji}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(v,{children:[e.name,n&&(0,g.jsx)(E,{children:"Brand"})]}),(0,g.jsxs)(f,{children:[(0,g.jsxs)("span",{children:[e.stock_count||0," items"]}),!n&&(0,g.jsx)(B,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,g.jsx)(k,{children:e.description})]}),!n&&(0,g.jsxs)(b,{children:[(0,g.jsx)(w,{onClick:()=>te(e),title:"Edit",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,g.jsx)(w,{onClick:()=>(e=>{G(e),q(!0)})(e),title:"Delete",children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,g.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return L?(0,g.jsx)(m,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,g.jsxs)(m,{children:[(0,g.jsxs)(A,{children:[(0,g.jsx)($,{children:"General Stock Categories"}),(0,g.jsx)(x.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}),Y&&R.length>0&&(0,g.jsxs)(O,{children:[(0,g.jsx)(T,{children:"Brand Categories (Read Only)"}),(0,g.jsx)(y,{children:R.map((e,t)=>ae(e,t,R,!0))})]}),0===p.length?(0,g.jsxs)(C,{children:[(0,g.jsx)(S,{children:"No general stock categories yet"}),(0,g.jsx)(F,{children:"Create categories to organize your general stock items (packaging, cleaning supplies, etc.)"}),(0,g.jsx)(x.cc,{variant:"primary",onClick:()=>te(),children:"Add Category"})]}):(0,g.jsx)(y,{children:p.map((e,t)=>{return ae(e,t,p,(r=e,Y&&"brand"===r.owner_type));var r})}),(0,g.jsx)(d.aF,{isOpen:U,onClose:re,title:(Q?"Edit":"New")+" General Stock Category",size:"medium",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:re,children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:ne,disabled:!H.name.trim(),children:Q?"Update":"Create"})]}),children:(0,g.jsxs)("form",{onSubmit:ne,children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Category Name *"}),(0,g.jsx)(d.ZQ,{type:"text",value:H.name,onChange:e=>X({...H,name:e.target.value}),placeholder:"e.g., Packaging, Cleaning Supplies",autoFocus:!0,required:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Icon"}),(0,g.jsx)(D,{children:["\ud83e\udd69","\ud83c\udf56","\ud83c\udf57","\ud83e\udd53","\ud83c\udf54","\ud83c\udf2d","\ud83e\udd6a","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uddc6","\ud83e\udd5a","\ud83c\udf73","\ud83e\udd58","\ud83c\udf72","\ud83e\udd63","\ud83e\udd57","\ud83c\udf5d","\ud83c\udf5c","\ud83c\udf5b","\ud83c\udf5a","\ud83c\udf59","\ud83c\udf58","\ud83c\udf62","\ud83c\udf61","\ud83c\udf67","\ud83c\udf68","\ud83c\udf66","\ud83e\udd67","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf82","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6c","\ud83c\udf6b","\ud83c\udf7f","\ud83c\udf69","\ud83c\udf6a","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\uddc0","\ud83e\udd5e","\ud83e\uddc7","\ud83e\udd6f","\ud83e\udd54","\ud83c\udf60","\ud83e\udd55","\ud83c\udf3d","\ud83e\udd66","\ud83e\udd6c","\ud83e\udd52","\ud83c\udf46","\ud83c\udf45","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd51","\ud83e\uded1","\ud83c\udf36\ufe0f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5e","\ud83e\uded8","\ud83e\udd5b","\ud83e\uddc8","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83d\udce6","\ud83e\uddf9","\ud83e\uddf4","\ud83e\uddfb","\ud83e\uddfd","\ud83e\uddfc","\ud83d\uded2","\ud83d\udccb","\ud83d\udd27","\u2699\ufe0f","\ud83e\udea3","\ud83e\udea0","\ud83e\uddf0","\ud83d\udd29","\ud83d\udd0c","\ud83d\udca1","\ud83d\udd0b","\ud83d\udcdd","\u2702\ufe0f","\ud83d\udcce","\ud83d\uddc3\ufe0f","\ud83d\udcc1","\ud83d\uddc2\ufe0f","\ud83d\udcca","\ud83e\uddea","\ud83d\udc8a","\ud83e\ude79","\ud83e\uddef","\ud83e\udea4","\ud83e\uddf2"].map(e=>(0,g.jsx)(I,{selected:H.emoji===e,onClick:()=>X({...H,emoji:e}),type:"button",children:e},e))})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Description"}),(0,g.jsx)(d.Lz,{value:H.description,onChange:e=>X({...H,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,g.jsx)(h.A,{isOpen:W,onCancel:()=>{q(!1),G(null)},onConfirm:async()=>{if(J)try{const e=localStorage.getItem("auth_token");let r="";if(t||K?r=`/api/general-stock-categories/${J.id}`:Y&&l&&(r=`/api/restaurants/${l}/general-stock-categories/${J.id}`),!r)return;const n=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success?(q(!1),G(null),ee(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:J?`Are you sure you want to delete "${J.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})};var M=r(4877);const L=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,P=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,U=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,N=s.Ay.div`
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
`,Q=s.Ay.div`
  flex: 1;
`,Z=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,W=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,q=s.Ay.div`
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
`,Y=s.Ay.div`
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
`,K=s.Ay.span`
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
  background: ${n.w.colors.surfaceMuted};
  border: 1px solid ${n.w.colors.borderLight};
  padding: 6px 12px;
  cursor: pointer;
  color: ${n.w.colors.text.muted};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: ${n.w.colors.borderLight};
    color: ${n.w.colors.secondary};
    border-color: #D1D5DB;
  }
`,te=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,re=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,ne=(s.Ay.div``,s.Ay.div`
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
`),ie=s.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.muted};
`,ae=(0,s.Ay)(o.A0)`
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
`,se=(0,s.Ay)(o.Hj)`
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
`,oe=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: ${n.w.colors.surfaceMuted};
  }
`,le=s.Ay.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid ${n.w.colors.primary};
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
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
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
`,pe=(s.Ay.div`
  position: relative;
`,s.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`,s.Ay.div`
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
`,s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: ${n.w.colors.surfaceMuted};
  }
`,s.Ay.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid ${n.w.colors.status.errorLightAlt};
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
`),ue=s.Ay.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid ${n.w.colors.borderLight};
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
`,xe=e=>{let{mode:t,restaurantId:r}=e;const{user:n}=(0,c.As)(),[s,x]=(0,a.ok)(),{defaultCurrency:h}=(0,p.i1)(),[m,y]=(0,i.useState)("RM"),j="restaurant"===t?r:void 0,_="brand"===t,v=s.get("tab")||"dashboard",f=e=>{x({tab:e})},[k,b]=(0,i.useState)(0),[w,C]=(0,i.useState)(0),[S,F]=(0,i.useState)(!0),[A,$]=(0,i.useState)(null),[E,B]=(0,i.useState)([]),[z,D]=(0,i.useState)([]),[I,O]=(0,i.useState)([]),[T,xe]=(0,i.useState)([]),[ge,me]=(0,i.useState)(""),[ye,je]=(0,i.useState)("all"),[_e,ve]=(0,i.useState)([]),[fe,ke]=(0,i.useState)(null),[be,we]=(0,i.useState)(!1),[Ce,Se]=(0,i.useState)(""),[Fe,Ae]=(0,i.useState)(""),[$e,Ee]=(0,i.useState)(""),[Be,ze]=(0,i.useState)(""),[De,Ie]=(0,i.useState)(""),[Oe,Te]=(0,i.useState)("all"),[Re,Me]=(0,i.useState)(!1),[Le,Pe]=(0,i.useState)(!1),[Ue,Ne]=(0,i.useState)(!1),[Qe,Ze]=(0,i.useState)(!1),[We,qe]=(0,i.useState)(null),[Je,Ge]=(0,i.useState)(""),[He,Xe]=(0,i.useState)(""),[Ye,Ke]=(0,i.useState)(""),[Ve,et]=(0,i.useState)(""),[tt,rt]=(0,i.useState)(""),[nt,it]=(0,i.useState)({}),[at,st]=(0,i.useState)(!1),[ot,lt]=(0,i.useState)(!1),[ct,dt]=(0,i.useState)(!1),[pt,ut]=(0,i.useState)(null),[xt,ht]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[gt,mt]=(0,i.useState)(!1),[yt,jt]=(0,i.useState)(!1),[_t,vt]=(0,i.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[ft,kt]=(0,i.useState)(!1),[bt,wt]=(0,i.useState)([]),[Ct,St]=(0,i.useState)([]),[Ft,At]=(0,i.useState)(""),[$t,Et]=(0,i.useState)(!1),[Bt,zt]=(0,i.useState)(!1),[Dt,It]=(0,i.useState)(null),[Ot,Tt]=(0,i.useState)(!1),[Rt,Mt]=(0,i.useState)(null),[Lt,Pt]=(0,i.useState)(!1),[Ut,Nt]=(0,i.useState)(null),[Qt,Zt]=(0,i.useState)(""),Wt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],[qt,Jt]=(Wt.filter(e=>e.label.toLowerCase().includes(Ft.toLowerCase())||e.value.toLowerCase().includes(Ft.toLowerCase())),(0,i.useState)(null)),[Gt,Ht]=(0,i.useState)(""),[Xt,Yt]=(0,i.useState)("ingredient"),Kt=(e,t)=>e<=0?"out_of_stock":e<=t?"low_stock":"normal",[Vt,er]=(0,i.useState)({});(0,i.useEffect)(()=>{h&&y(h)},[h]);const tr=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),rr=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=tr();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`,...t.headers}})).json()},[tr]),nr=(0,i.useCallback)(async()=>{if("restaurant"!==t||j)try{if(F(!0),"restaurant"===t){const[e,t,r,n,i]=await Promise.all([rr(`/api/restaurants/${j}/inventory/summary`),rr(`/api/restaurants/${j}/inventory`),rr(`/api/restaurants/${j}/inventory/alerts?resolved=false`),rr(`/api/restaurants/${j}/inventory/reorder-suggestions`),rr(`/api/restaurants/${j}/inventory/expiring?days=14`)]);e.success&&$(e.data),t.success&&B(t.data),r.success&&D(r.data),n.success&&O(n.data),i.success&&xe(i.data);try{const e=await rr(`/api/restaurants/${j}/inventory/general-stock`);e.success&&ve(e.data||[])}catch{ve([])}try{const e=await rr(`/api/restaurants/${j}/suppliers`);e.success&&wt(e.data||[])}catch{wt([])}try{const e=await rr(`/api/restaurants/${j}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];St(t)}}catch{St([])}}else{const e=await rr("/api/product-ingredients?track_stock=true");if(e.success){const t=(e.data||[]).map(e=>{var t;const r=parseFloat(e.current_stock)||0,n=parseFloat(e.min_stock)||0;let i="normal";return r<=0?i="out_of_stock":r<=n&&(i="low_stock"),{id:e.id,name:e.name,code:e.code,image_url:e.image_url,unit:e.unit,unit_cost:parseFloat(e.unit_cost)||0,category:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized",current_stock:r,min_stock:n,min_order:parseFloat(e.min_order)||0,last_actual_stock:parseFloat(e.last_actual_stock)||0,last_stock_take_at:e.last_stock_take_at,avg_daily_usage:parseFloat(e.avg_daily_usage)||0,lead_time_days:e.lead_time_days||1,safety_stock_percent:parseFloat(e.safety_stock_percent)||20,manual_daily_usage:e.manual_daily_usage?parseFloat(e.manual_daily_usage):null,prediction_confidence:e.prediction_confidence||"none",stock_status:i,supplier_id:e.supplier_id,supplier_name:e.supplier_name}});B(t);const r=t.filter(e=>"low_stock"===e.stock_status).length,n=t.filter(e=>"out_of_stock"===e.stock_status).length;$({total_items:t.length,low_stock_count:r,out_of_stock_count:n,monthly_loss:0,unresolved_alerts:r+n});const i=t.filter(e=>"normal"!==e.stock_status).map((e,t)=>({id:t,ingredient_id:e.id,alert_type:e.stock_status,current_stock:e.current_stock,min_stock:e.min_stock,ingredient:{id:e.id,name:e.name,unit:e.unit,unit_cost:e.unit_cost}}));D(i)}try{const e=await rr("/api/general-stock");e.success&&ve(e.data||[])}catch{ve([])}try{const e=await rr("/api/general-stock-categories");e.success&&St(e.data||[])}catch{St([])}try{const e=await rr("/api/suppliers");e.success&&wt(e.data||[])}catch{wt([])}O([]),xe([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{F(!1)}},[t,j,rr]);(0,i.useEffect)(()=>{nr()},[nr]),(0,i.useEffect)(()=>{if(E.length>0){const e=E.some(e=>e.current_stock>0||e.last_stock_take_at);st(!e)}},[E]);const ir=(e,t,r)=>{it(n=>({...n,[e]:{...n[e],[t]:r}}))},ar=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},sr=e=>{qe(e),Ge(""),Xe(""),Ke(""),et(""),rt(""),Me(!0)},or=(e,t,r)=>{Jt(e),Ht(t.toString()),Yt(r)},lr=()=>{Jt(null),Ht("")},cr=async e=>{const r=parseFloat(Gt);if(isNaN(r)||r<0)lr();else try{let n;if("restaurant"===t){const t="ingredient"===Xt?`/api/restaurants/${j}/inventory/adjust`:`/api/restaurants/${j}/inventory/general-stock/${e}/adjust`,i={new_quantity:r,reason:"Stock adjustment"};"ingredient"===Xt&&(i.ingredient_id=e),n=await rr(t,{method:"POST",body:JSON.stringify(i)})}else n=_&&"general_stock"===Xt?await rr(`/api/general-stock/${e}/adjust`,{method:"POST",body:JSON.stringify({new_quantity:r,reason:"Stock adjustment"})}):await rr(`/api/product-ingredients/${e}`,{method:"PUT",body:JSON.stringify({current_stock:r})});if(n.success){const t=(new Date).toISOString();"ingredient"===Xt?B(n=>n.map(n=>{if(n.id===e){const e=Kt(r,n.min_stock);return{...n,current_stock:r,stock_status:e,last_stock_take_at:t}}return n})):ve(n=>n.map(n=>{if(n.id===e){const e=Kt(r,n.min_stock);return{...n,current_stock:r,stock_status:e,last_stock_take_at:t}}return n}))}}catch(n){console.error("Failed to adjust stock:",n)}finally{lr()}},dr=(e,t)=>{"Enter"===e.key?cr(t):"Escape"===e.key&&lr()},pr=e=>{Nt(e),Zt(e.min_order?String(e.min_order):""),Pt(!0)},ur=E.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),r="all"===ye||e.stock_status===ye;return t&&r}),xr=(("all"===Oe||"ingredients"===Oe)&&ur.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===Oe||"general_stock"===Oe)&&_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),r="all"===ye||e.stock_status===ye;return t&&r}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{if(!e)return"-";try{const t=new Date(e);return isNaN(t.getTime())?"-":t.toLocaleDateString()}catch{return"-"}}),hr=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)},gr=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return"restaurant"!==t||!!j?(0,g.jsxs)(o.mc,{children:[(0,g.jsx)(o.Y9,{children:(0,g.jsx)(o.hE,{children:"Inventory"})}),(0,g.jsxs)(o.UC,{children:[(0,g.jsxs)(o.j,{children:[(0,g.jsx)(o.oz,{active:"dashboard"===v,onClick:()=>f("dashboard"),children:"Dashboard"}),(0,g.jsx)(o.oz,{active:"list"===v,onClick:()=>f("list"),children:"Stock List"}),(0,g.jsx)(o.oz,{active:"history"===v,onClick:()=>f("history"),children:"History"}),(0,g.jsx)(o.oz,{active:"categories"===v,onClick:()=>f("categories"),children:"Categories"})]}),S?(0,g.jsx)(o.pp,{children:"Loading..."}):"dashboard"===v?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(o.MD,{children:[(0,g.jsxs)(o.hI,{color:"#059669",children:[(0,g.jsx)(o.Os,{children:(null===A||void 0===A?void 0:A.total_items)||0}),(0,g.jsx)(o.v0,{children:"Total Ingredients"}),(0,g.jsx)(o.d1,{children:"managed items"})]}),(0,g.jsxs)(o.hI,{color:"#D97706",children:[(0,g.jsx)(o.Os,{children:(null===A||void 0===A?void 0:A.low_stock_count)||0}),(0,g.jsx)(o.v0,{children:"Low Stock"}),(0,g.jsx)(o.d1,{children:"need attention"})]}),(0,g.jsxs)(o.hI,{color:"#DC2626",children:[(0,g.jsx)(o.Os,{children:(null===A||void 0===A?void 0:A.out_of_stock_count)||0}),(0,g.jsx)(o.v0,{children:"Out of Stock"}),(0,g.jsx)(o.d1,{children:"urgent"})]}),(0,g.jsxs)(o.hI,{color:"#7C3AED",children:[(0,g.jsx)(o.Os,{children:(0,u.vv)((null===A||void 0===A?void 0:A.monthly_loss)||0,m)}),(0,g.jsx)(o.v0,{children:"Monthly Loss"}),(0,g.jsx)(o.d1,{children:"this month"})]}),(0,g.jsxs)(o.hI,{color:"#EA580C",children:[(0,g.jsx)(o.Os,{children:T.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,g.jsx)(o.v0,{children:"Expiring Soon"}),(0,g.jsx)(o.d1,{children:"within 3 days"})]})]}),z.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Stock Alerts"}),(0,g.jsx)("div",{children:z.slice(0,5).map(e=>(0,g.jsxs)(N,{type:e.alert_type,children:[(0,g.jsxs)(Q,{children:[(0,g.jsx)(Z,{children:e.ingredient.name}),(0,g.jsxs)(W,{children:["Current: ",hr(e.current_stock)," ",e.ingredient.unit," / Min: ",hr(e.min_stock)," ",e.ingredient.unit]})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&sr(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>(async e=>{if("brand"!==t)try{(await rr(`/api/restaurants/${j}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&D(t=>t.filter(t=>t.id!==e))}catch(r){console.error("Failed to resolve alert:",r)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),T.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Expiring Items"}),(0,g.jsx)("div",{children:T.slice(0,5).map(e=>(0,g.jsxs)(Y,{urgency:e.urgency,children:[(0,g.jsxs)(Q,{children:[(0,g.jsxs)(Z,{children:[e.ingredient_name,e.batch_number&&(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,g.jsxs)(W,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,g.jsx)(K,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,g.jsx)(o.$n,{variant:"danger",onClick:()=>{const t=E.find(t=>t.id===e.ingredient_id);t&&(qe(t),Ge(""),Xe(""),Pe(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),I.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(P,{children:"Reorder Suggestions"}),(0,g.jsx)(L,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Daily Usage"}),(0,g.jsx)("span",{children:"Suggested Qty"}),(0,g.jsx)("span",{children:"Est. Cost"}),(0,g.jsx)("span",{children:"Urgency"}),(0,g.jsx)("span",{children:"Order"})]}),I.slice(0,10).map(e=>(0,g.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("div",{children:e.ingredient.name}),(0,g.jsxs)("div",{children:[hr(e.current_stock)," ",e.ingredient.unit]}),(0,g.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,g.jsxs)("div",{style:{fontWeight:600},children:[hr(e.suggested_qty)," ",e.ingredient.unit]}),(0,g.jsx)("div",{children:(0,u.vv)(e.estimated_cost,m)}),(0,g.jsx)("div",{children:(0,g.jsx)(X,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(ce,{type:"number",min:"0",step:"1",value:Vt[e.ingredient.id]||e.suggested_qty,onChange:t=>er(r=>({...r,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,g.jsx)(de,{onClick:()=>{const t=E.find(t=>t.id===e.ingredient.id);t&&pr({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,g.jsxs)(te,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${j}/recipe-management?tab=ingredients`:f("list")},children:"+ Receive Stock"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>{0===E.length?window.location.href=`/restaurant/${j}/recipe-management?tab=ingredients`:f("list")},children:"+ Record Waste"}),(0,g.jsx)(o.$n,{variant:"secondary",onClick:()=>f("history"),children:"View All Transactions"})]})]}):"list"===v?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(l.Qn,{children:[(0,g.jsxs)(l.Jt,{value:Oe,onChange:e=>Te(e.target.value),style:{minWidth:"140px"},children:[(0,g.jsx)("option",{value:"all",children:"All Items"}),(0,g.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,g.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,g.jsx)(l.DO,{type:"text",placeholder:"Search...",value:ge,onChange:e=>me(e.target.value)}),(0,g.jsxs)(l.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,g.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>jt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===Oe||"general_stock"===Oe)&&_e.length>0&&(0,g.jsxs)(g.Fragment,{children:["all"===Oe&&(0,g.jsxs)(P,{children:["General Stock (",_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),r="all"===ye||e.stock_status===ye;return t&&r}).length,")"]}),(0,g.jsxs)(o.XI,{style:{marginBottom:"24px"},children:[(0,g.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsx)("span",{children:"Item"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min Stock"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Last Stock Take"}),(0,g.jsx)("span",{children:"Order"}),(0,g.jsx)("span",{children:"Actions"})]}),_e.filter(e=>{const t=e.name.toLowerCase().includes(ge.toLowerCase()),r="all"===ye||e.stock_status===ye;return t&&r}).map(e=>(0,g.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Item"}),(0,g.jsxs)(J,{children:[(0,g.jsx)(q,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(ne,{children:e.name}),e.code&&(0,g.jsx)(H,{children:e.code}),(0,g.jsx)(ie,{children:e.category})]})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Status"}),(0,g.jsx)(U,{status:e.stock_status,children:gr(e.stock_status)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Current Stock"}),qt===e.id&&"general_stock"===Xt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(le,{type:"number",step:"0.01",value:Gt,onChange:e=>Ht(e.target.value),onKeyDown:t=>dr(t,e.id),onBlur:()=>cr(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,g.jsxs)(oe,{onClick:()=>or(e.id,e.current_stock,"general_stock"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:hr(e.current_stock)}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Min Stock"}),(0,g.jsxs)("div",{style:{color:"#6B7280"},children:[hr(e.min_stock)," ",e.stock_unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,m)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Last Stock Take"}),(0,g.jsx)("div",{style:{color:"#6B7280"},children:xr(e.last_stock_take_at)})]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(ce,{type:"number",min:"0",step:"1",value:Vt[`gs_${e.id}`]||"",onChange:t=>er(r=>({...r,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,g.jsx)(de,{onClick:()=>{const t=Vt[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(pr({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),Zt(t))},children:"Order"})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>{ke(e),Se(""),Ae(""),Ee(""),ze(""),Ie(""),we(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(ue,{onClick:()=>{var t;It(e),vt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),zt(!0)},children:"Edit"}),(0,g.jsx)(pe,{onClick:()=>{Mt({type:"general_stock",id:e.id,name:e.name}),Tt(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===Oe||"ingredients"===Oe)&&(0,g.jsxs)(g.Fragment,{children:["all"===Oe&&(0,g.jsxs)(P,{children:["Ingredients (",ur.length,")"]}),0===ur.length?(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===E.length?"No ingredients found":"No matching ingredients"}),(0,g.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===E.length?"brand"===t?'Add ingredients with "Track in Inventory" enabled in the Product Ingredients page first.':"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===E.length&&(0,g.jsxs)(o.$n,{variant:"primary",onClick:()=>window.location.href="brand"===t?"/brand/product-recipe?tab=ingredients":`/restaurant/${j}/recipe-management?tab=ingredients`,children:["Go to ","brand"===t?"Product Ingredients":"Ingredients"]})]}):(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(ae,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min / Prediction"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Last Stock Take"}),(0,g.jsx)("span",{children:"Order"}),(0,g.jsx)("span",{children:"Actions"})]}),ur.map(e=>(0,g.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Ingredient"}),(0,g.jsxs)(J,{children:[(0,g.jsx)(q,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,g.jsxs)(G,{children:[(0,g.jsx)(ne,{children:e.name}),e.code&&(0,g.jsx)(H,{children:e.code}),(0,g.jsxs)(ie,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Status"}),(0,g.jsx)(U,{status:e.stock_status,children:gr(e.stock_status)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Current Stock"}),qt===e.id&&"ingredient"===Xt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(le,{type:"number",step:"0.01",value:Gt,onChange:e=>Ht(e.target.value),onKeyDown:t=>dr(t,e.id),onBlur:()=>cr(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,g.jsxs)(oe,{onClick:()=>or(e.id,e.current_stock,"ingredient"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:hr(e.current_stock)}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Min / Prediction"}),(0,g.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",hr(e.min_stock)," ",e.unit]}),(0,g.jsx)(V,{level:e.prediction_confidence||"none",children:ar(e.prediction_confidence||"none")})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,u.vv)(e.unit_cost,m)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Last Stock Take"}),(0,g.jsx)("div",{style:{color:"#6B7280"},children:xr(e.last_stock_take_at)})]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(ce,{type:"number",min:"0",step:"1",value:Vt[e.id]||"",onChange:t=>er(r=>({...r,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,g.jsx)(de,{onClick:()=>{const t=Vt[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(pr({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),Zt(t))},children:"Order"})]}),(0,g.jsxs)(o.wr,{children:[(0,g.jsx)(o.$n,{variant:"primary",onClick:()=>sr(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(ee,{onClick:()=>(e=>{var t;ut(e),ht({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),dt(!0)})(e),children:"Settings"}),(0,g.jsx)(pe,{onClick:()=>{Mt({type:"ingredient",id:e.id,name:e.name}),Tt(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id))]})]})]}):"categories"===v?(0,g.jsx)(R,{isBrandGeneralMode:_,restaurantId:"restaurant"===t&&j?Number(j):null,onCountChange:b,onCategoryChange:()=>C(e=>e+1)}):(0,g.jsx)(he,{restaurantId:"restaurant"===t?j:void 0,isBrandGeneralMode:_,currency:m})]}),(0,g.jsx)(d.aF,{isOpen:Re,onClose:()=>Me(!1),title:"Receive Stock",size:"medium",children:We&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Ingredient"}),(0,g.jsx)(d.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"text",value:`${hr(We.current_stock)} ${We.unit}`,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Quantity Received (",We.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",value:Je,onChange:e=>Ge(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,g.jsx)(d.ZQ,{type:"text",value:Ye,onChange:e=>Ke(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Manufacture Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:Ve,onChange:e=>et(e.target.value)})]})]}),(0,g.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,g.jsx)(d.lR,{children:"Expiry Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:tt,onChange:e=>rt(e.target.value)}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Notes (Optional)"}),(0,g.jsx)(d.ZQ,{type:"text",value:He,onChange:e=>Xe(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(We&&Je)try{let n;if("restaurant"===t)n=await rr(`/api/restaurants/${j}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Je),notes:He,batch_number:Ye||null,manufacture_date:Ve||null,expiry_date:tt||null})});else{const e=We.current_stock+parseFloat(Je);n=await rr(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(n.success){var e,r;const t=null!==(e=null===(r=n.data)||void 0===r?void 0:r.current_stock)&&void 0!==e?e:We.current_stock+parseFloat(Je),i=Kt(t,We.min_stock),a=(new Date).toISOString();B(e=>e.map(e=>e.id===We.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Me(!1),qe(null),Ge(""),Xe(""),Ke(""),et(""),rt("")}}catch(n){console.error("Failed to receive stock:",n)}},children:"Confirm Receive"})]})]})}),(0,g.jsx)(d.aF,{isOpen:Le,onClose:()=>Pe(!1),title:"Record Waste",size:"small",children:We&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Ingredient"}),(0,g.jsx)(d.ZQ,{type:"text",value:We.name,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"text",value:`${hr(We.current_stock)} ${We.unit}`,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Waste Quantity (",We.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",value:Je,onChange:e=>Ge(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Reason (Optional)"}),(0,g.jsx)(d.ZQ,{type:"text",value:He,onChange:e=>Xe(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Pe(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(We&&Je)try{let n;if("restaurant"===t)n=await rr(`/api/restaurants/${j}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:We.id,quantity:parseFloat(Je),notes:He})});else{const e=Math.max(0,We.current_stock-parseFloat(Je));n=await rr(`/api/product-ingredients/${We.id}`,{method:"PUT",body:JSON.stringify({current_stock:e})})}if(n.success){var e,r;const t=null!==(e=null===(r=n.data)||void 0===r?void 0:r.current_stock)&&void 0!==e?e:Math.max(0,We.current_stock-parseFloat(Je)),i=Kt(t,We.min_stock),a=(new Date).toISOString();B(e=>e.map(e=>e.id===We.id?{...e,current_stock:t,stock_status:i,last_stock_take_at:a}:e)),Pe(!1),qe(null),Ge(""),Xe("")}}catch(n){console.error("Failed to record waste:",n)}},children:"Confirm Waste"})]})]})}),(0,g.jsxs)(d.aF,{isOpen:Ue,onClose:()=>Ne(!1),title:"Set Initial Stock",size:"large",children:[(0,g.jsx)(L,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,g.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(E.reduce((e,t)=>{const r=t.category||"Other";return e[r]||(e[r]=[]),e[r].push(t),e},{})).map(e=>{let[t,r]=e;return(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"2fr 1fr 1fr",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Qty"}),(0,g.jsx)("span",{children:"Min Stock"})]}),r.map(e=>{var t,r;return(0,g.jsxs)(o.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,g.jsx)("div",{children:(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=nt[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>ir(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,g.jsx)("div",{children:(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(r=nt[e.id])||void 0===r?void 0:r.min_stock)||"",onChange:t=>ir(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Ne(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(nt).filter(e=>{let[t,r]=e;return parseFloat(r.quantity)>0}).map(e=>{let[t,r]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(r.quantity),min_stock:parseFloat(r.min_stock)||0}});if(0!==e.length)try{lt(!0);if((await rr(`/api/restaurants/${j}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success){const e=(new Date).toISOString();B(t=>t.map(t=>{const r=nt[t.id];if(r&&parseFloat(r.quantity)>0){const n=parseFloat(r.quantity),i=parseFloat(r.min_stock)||0,a=Kt(n,i);return{...t,current_stock:n,min_stock:i,stock_status:a,last_stock_take_at:e}}return t})),Ne(!1),st(!1)}}catch(t){console.error("Failed to save initial stock:",t)}finally{lt(!1)}},disabled:ot,children:ot?"Saving...":"Save Initial Stock"})]})]}),(0,g.jsx)(d.aF,{isOpen:be,onClose:()=>we(!1),title:"Receive Stock",size:"medium",children:fe&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Item"}),(0,g.jsx)(d.ZQ,{type:"text",value:fe.name,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"text",value:`${hr(fe.current_stock)} ${fe.stock_unit}`,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Quantity Received (",fe.stock_unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:Ce,onChange:e=>Se(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,g.jsx)(d.ZQ,{type:"text",value:$e,onChange:e=>Ee(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Manufacture Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:Be,onChange:e=>ze(e.target.value)})]})]}),(0,g.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,g.jsx)(d.lR,{children:"Expiry Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:De,onChange:e=>Ie(e.target.value)}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Notes (Optional)"}),(0,g.jsx)(d.ZQ,{type:"text",value:Fe,onChange:e=>Ae(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Ce&&!(parseFloat(Ce)<=0))try{const r=_?`/api/general-stock/${fe.id}/receive`:`/api/restaurants/${j}/inventory/general-stock/${fe.id}/receive`,n=await rr(r,{method:"POST",body:JSON.stringify({quantity:parseFloat(Ce),notes:Fe,batch_number:$e||null,manufacture_date:Be||null,expiry_date:De||null})});if(n.success){var e,t;const r=null!==(e=null===(t=n.data)||void 0===t?void 0:t.current_stock)&&void 0!==e?e:parseFloat(String(fe.current_stock))+parseFloat(Ce),i=Kt(r,fe.min_stock),a=(new Date).toISOString();ve(e=>e.map(e=>e.id===fe.id?{...e,current_stock:r,stock_status:i,last_stock_take_at:a}:e)),we(!1),Se(""),Ae(""),Ee(""),ze(""),Ie("")}}catch(r){console.error("Failed to receive general stock:",r)}},disabled:!Ce||parseFloat(Ce)<=0,children:"Confirm Receive"})]})]})}),(0,g.jsx)(d.aF,{isOpen:Lt,onClose:()=>Pt(!1),title:`Order: ${(null===Ut||void 0===Ut?void 0:Ut.name)||""}`,size:"small",children:Ut&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[hr(Ut.current_stock)," ",Ut.unit]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[hr(Ut.min_stock)," ",Ut.unit]})]})]}),Ut.min_order&&Ut.min_order>0&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",hr(Ut.min_order)," ",Ut.unit]}),Ut.supplier_name&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Ut.supplier_name]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Order Quantity (",Ut.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:Qt,onChange:e=>Zt(e.target.value),placeholder:Ut.min_order?`Min: ${Ut.min_order}`:"Enter quantity"})]}),Qt&&parseFloat(Qt)>0&&(0,g.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,u.vv)(parseFloat(Qt)*Ut.unit_cost,m)})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Pt(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:()=>{Ut&&Qt&&(alert(`Order sent: ${Qt} ${Ut.unit} of ${Ut.name}`),Pt(!1),Nt(null),Zt(""))},disabled:!Qt||parseFloat(Qt)<=0,children:"Send Order"})]})]})}),(0,g.jsx)(d.aF,{isOpen:ct,onClose:()=>dt(!1),title:`Settings: ${(null===pt||void 0===pt?void 0:pt.name)||""}`,size:"small",children:pt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)(V,{level:pt.prediction_confidence||"none",children:ar(pt.prediction_confidence||"none")}),(0,g.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(pt.avg_daily_usage))||0).toFixed(2)," ",pt.unit,"/day (calculated)"]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Minimum Stock Level (",pt.unit,")"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:xt.min_stock,onChange:e=>ht({...xt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Minimum Order (",pt.unit,")"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:xt.min_order,onChange:e=>ht({...xt,min_order:e.target.value}),placeholder:"0"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Lead Time (days)"}),(0,g.jsx)(d.ZQ,{type:"number",min:"1",value:xt.lead_time_days,onChange:e=>ht({...xt,lead_time_days:e.target.value}),placeholder:"1"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Safety Stock (%)"}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",max:"100",value:xt.safety_stock_percent,onChange:e=>ht({...xt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Manual Daily Usage (",pt.unit,"/day)"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:xt.manual_daily_usage,onChange:e=>ht({...xt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>dt(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(pt)try{mt(!0);if((await rr(`/api/restaurants/${j}/inventory/${pt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(xt.lead_time_days)||1,safety_stock_percent:parseFloat(xt.safety_stock_percent)||20,manual_daily_usage:xt.manual_daily_usage?parseFloat(xt.manual_daily_usage):null,min_stock:parseFloat(xt.min_stock)||0,min_order:parseFloat(xt.min_order)||0})})).success){const e=parseFloat(xt.min_stock)||0;B(t=>t.map(t=>{if(t.id===pt.id){const r=Kt(t.current_stock,e);return{...t,lead_time_days:parseInt(xt.lead_time_days)||1,safety_stock_percent:parseFloat(xt.safety_stock_percent)||20,manual_daily_usage:xt.manual_daily_usage?parseFloat(xt.manual_daily_usage):null,min_stock:e,stock_status:r}}return t})),dt(!1)}}catch(e){console.error("Failed to save settings:",e)}finally{mt(!1)}},disabled:gt,children:gt?"Saving...":"Save Settings"})]})]})}),(0,g.jsxs)(d.aF,{isOpen:yt,onClose:()=>{jt(!1),Et(!1)},title:"Add General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Item Name *"}),(0,g.jsx)(d.ZQ,{type:"text",value:_t.name,onChange:e=>vt({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Code (SKU)"}),(0,g.jsx)(d.ZQ,{type:"text",value:_t.code,onChange:e=>vt({..._t,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,g.jsx)(M.A,{value:_t.image_url,onChange:e=>vt({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit *"}),(0,g.jsx)(l.Jt,{value:_t.stock_unit,onChange:e=>vt({..._t,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Wt.map(e=>(0,g.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Category"}),(0,g.jsxs)(l.Jt,{value:_t.category,onChange:e=>vt({..._t,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),Ct.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Supplier"}),(0,g.jsxs)(l.Jt,{value:_t.supplier_id,onChange:e=>vt({..._t,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),bt.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit Cost"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>vt({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Initial Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>vt({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>vt({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Order"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>vt({..._t,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,g.jsxs)(re,{style:{marginTop:"24px"},children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{jt(!1),Et(!1)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim())try{kt(!0);const e=_?"/api/general-stock":`/api/restaurants/${j}/inventory/general-stock`,t=await rr(e,{method:"POST",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})});if(t.success&&t.data){const e={...t.data,stock_unit:t.data.stock_unit||t.data.unit||_t.stock_unit,stock_status:Kt(parseFloat(_t.current_stock)||0,parseFloat(_t.min_stock)||0),last_stock_take_at:(new Date).toISOString()};ve(t=>[...t,e]),jt(!1),vt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to add general stock:",e)}finally{kt(!1)}},disabled:ft||!_t.name.trim(),children:ft?"Adding...":"Add Item"})]})]}),(0,g.jsxs)(d.aF,{isOpen:Bt,onClose:()=>{zt(!1),It(null)},title:"Edit General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Item Name *"}),(0,g.jsx)(d.ZQ,{type:"text",value:_t.name,onChange:e=>vt({..._t,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Code (SKU)"}),(0,g.jsx)(d.ZQ,{type:"text",value:_t.code,onChange:e=>vt({..._t,code:e.target.value}),placeholder:"Auto-generate"})]})]}),(0,g.jsx)(M.A,{value:_t.image_url,onChange:e=>vt({..._t,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit *"}),(0,g.jsx)(l.Jt,{value:_t.stock_unit,onChange:e=>vt({..._t,stock_unit:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:Wt.map(e=>(0,g.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Category"}),(0,g.jsxs)(l.Jt,{value:_t.category,onChange:e=>vt({..._t,category:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),Ct.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id))]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Supplier"}),(0,g.jsxs)(l.Jt,{value:_t.supplier_id,onChange:e=>vt({..._t,supplier_id:e.target.value}),style:{width:"100%",maxWidth:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),bt.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit Cost"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.unit_cost,onChange:e=>vt({..._t,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.current_stock,onChange:e=>vt({..._t,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_stock,onChange:e=>vt({..._t,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Order"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:_t.min_order,onChange:e=>vt({..._t,min_order:e.target.value}),placeholder:"0"})]})]})]}),(0,g.jsxs)(re,{style:{marginTop:"24px"},children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{zt(!1),It(null)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(_t.name.trim()&&Dt)try{kt(!0);const e=_?`/api/general-stock/${Dt.id}`:`/api/restaurants/${j}/inventory/general-stock/${Dt.id}`;if((await rr(e,{method:"PUT",body:JSON.stringify({name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:parseFloat(_t.current_stock)||0,min_stock:parseFloat(_t.min_stock)||0,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null})})).success&&Dt){const e=parseFloat(_t.current_stock)||0,t=parseFloat(_t.min_stock)||0;ve(r=>r.map(r=>r.id===Dt.id?{...r,name:_t.name,code:_t.code||null,image_url:_t.image_url||null,stock_unit:_t.stock_unit,unit_cost:parseFloat(_t.unit_cost)||0,category:_t.category||"Other",current_stock:e,min_stock:t,min_order:parseFloat(_t.min_order)||0,supplier_id:_t.supplier_id?parseInt(_t.supplier_id):null,stock_status:Kt(e,t)}:r)),zt(!1),It(null),vt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""})}}catch(e){console.error("Failed to update general stock:",e)}finally{kt(!1)}},disabled:ft||!_t.name.trim(),children:ft?"Saving...":"Save Changes"})]})]}),(0,g.jsx)(d.aF,{isOpen:Ot,onClose:()=>{Tt(!1),Mt(null)},title:"Unlink from Inventory",size:"small",children:Rt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Rt.name}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Rt.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,g.jsxs)(re,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{Tt(!1),Mt(null)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Rt.type){const e="brand"===t?`/api/product-ingredients/${Rt.id}`:`/api/restaurants/${j}/ingredients/${Rt.id}`;(await rr(e,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&B(e=>e.filter(e=>e.id!==Rt.id))}else{const e=_?`/api/general-stock/${Rt.id}`:`/api/restaurants/${j}/inventory/general-stock/${Rt.id}`;(await rr(e,{method:"DELETE"})).success&&ve(e=>e.filter(e=>e.id!==Rt.id))}Tt(!1),Mt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Rt.type?"Unlink":"Delete"})]})]})})]}):(0,g.jsx)(o.mc,{children:(0,g.jsx)(o.pp,{children:(0,g.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})},he=e=>{let{restaurantId:t,isBrandGeneralMode:r,currency:n}=e;const[a,s]=(0,i.useState)([]),[l,c]=(0,i.useState)(!0),d=e=>{const t="string"===typeof e?parseFloat(e):null!==e&&void 0!==e?e:0;return isNaN(t)?"0.00":t.toFixed(2)};(0,i.useEffect)(()=>{(t||r)&&(async()=>{try{const e=localStorage.getItem("auth_token"),n=r?"/api/general-stock/transactions?limit=50":`/api/restaurants/${t}/inventory/transactions?limit=50`,i=await fetch(n,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();a.success&&s(a.data||[])}catch(e){console.error("Failed to fetch transactions:",e)}finally{c(!1)}})()},[t,r]);const p=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},u=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return l?(0,g.jsx)(o.pp,{children:"Loading transactions..."}):0===a.length?(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,g.jsxs)(o.XI,{children:[(0,g.jsxs)(o.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,g.jsx)("span",{children:"Date"}),(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Type"}),(0,g.jsx)("span",{children:"Change"}),(0,g.jsx)("span",{children:"After"}),(0,g.jsx)("span",{children:"Notes"})]}),a.map(e=>{var t;return(0,g.jsx)(o.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,g.jsxs)(o.Np,{children:[(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Date"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Ingredient"}),(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Type"}),(0,g.jsx)("span",{style:{color:u(e.transaction_type),fontWeight:600},children:p(e.transaction_type)})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Change"}),(0,g.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",d(e.quantity_change)," ",e.unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"After"}),(0,g.jsxs)("div",{style:{color:"#0A2540"},children:[d(e.stock_after)," ",e.unit]})]}),(0,g.jsxs)(o.Uj,{children:[(0,g.jsx)(o.PM,{children:"Notes"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})}},2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>p,Qn:()=>c});var n=r(8819),i=(r(9950),r(4752)),a=r(4414);const s=i.Ay.div`
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
`,o=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
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
`,l=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
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
`,c=e=>{let{children:t,className:r,style:n,...i}=e;return(0,a.jsx)(s,{className:r,style:n,...i,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(o,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,a.jsx)(l,{...r,children:t})}},3705:(e,t,r)=>{r.d(t,{cc:()=>a.$n});var n=r(8819),i=r(4752),a=r(8829);i.Ay.select`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${n.w.colors.surface};
  border-radius: ${n.w.borderRadius.md};
  border: 1px solid ${n.w.colors.borderLight};
  padding: ${n.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${n.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${n.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${n.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,t,r)=>{r.d(t,{i1:()=>s});var n=r(9950),i=r(1367),a=r(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,n.useState)("RM"),[s,o]=(0,n.useState)(Object.keys(a.DL)),[l,c]=(0,n.useState)(!0),[d,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let i=n>=0?t[n+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(n)}else r("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),r("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:d}}},4877:(e,t,r)=>{r.d(t,{A:()=>f});var n=r(8819),i=r(9950),a=r(4752),s=r(4414);const o=a.Ay.div`
  margin-bottom: 16px;
`,l=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,c=a.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=a.Ay.div`
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
`,u=a.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=a.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,h=a.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=a.Ay.label`
  padding: 8px 16px;
  border: 1px solid ${n.w.colors.primary};
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
`,y=a.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${n.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.danger};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,j=a.Ay.input`
  display: none;
`,_=a.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,v=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:t,onChange:r,label:n="Logo Upload",helpText:a="Upload an image for your logo",maxSize:f=2,previewSize:k=150,showRemoveButton:b=!0,changeButtonText:w="Change Image",removeButtonText:C="Remove Image",imageAltText:S="Uploaded"}=e;const[F,A]=(0,i.useState)(!1),[$,E]=(0,i.useState)(!1),B=(0,i.useRef)(null),z=(0,i.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);E(!0);const t=new FileReader;t.onload=async e=>{var t;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void E(!1);const i=1200;let a=n.width,s=n.height;(a>i||s>i)&&(a>s?(s=s/a*i,a=i):(a=a/s*i,s=i)),e.width=a,e.height=s,t.drawImage(n,0,0,a,s);const o=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${v()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}})(o);E(!1),l?r(l):alert("Failed to upload image. Please try again.")},n.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},I=e=>{if($)return;const t=e.target.files;t&&t.length>0&&D(t[0]),e.target.value=""};return(0,s.jsxs)(o,{children:[n&&(0,s.jsx)(l,{children:n}),a&&(0,s.jsx)(c,{children:a}),(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{ref:z,isDragging:F,hasImage:!!t,isUploading:$,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),$||A(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&A(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),A(!1),$)return;const t=e.dataTransfer.files;t&&t.length>0&&D(t[0])},onClick:()=>{var e;t||$||(null===(e=B.current)||void 0===e||e.click())},children:$?(0,s.jsxs)(u,{children:[(0,s.jsx)(_,{}),(0,s.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,s.jsx)("img",{src:(O=t,O?O.startsWith("http")?O:O.startsWith("/uploads/")?`${v()}${O}`:O:""),alt:S}):(0,s.jsxs)(u,{children:[(0,s.jsx)(x,{children:F?"Drop image here":"Drag & drop or click to upload"}),(0,s.jsxs)(h,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),t&&!$&&(0,s.jsxs)(g,{children:[(0,s.jsxs)(m,{disabled:$,children:[w,(0,s.jsx)("input",{ref:B,type:"file",accept:"image/*",onChange:I,disabled:$})]}),b&&(0,s.jsx)(y,{onClick:()=>{r("")},disabled:$,children:C})]})]}),!t&&!$&&(0,s.jsx)(j,{ref:B,type:"file",accept:"image/*",onChange:I})]});var O}},7617:(e,t,r)=>{r.d(t,{A:()=>x});var n=r(8819),i=(r(9950),r(4752)),a=r(9610),s=r(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,l=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${n.w.colors.border};
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
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=i.Ay.button`
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
`,x=e=>{let{isOpen:t,title:r,message:n,onConfirm:i,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,s.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(c,{children:r}),(0,s.jsx)(d,{children:n})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{variant:"secondary",onClick:x,children:g}),(0,s.jsx)(u,{variant:"primary",type:m,onClick:i,children:h})]})]})}):null}}}]);