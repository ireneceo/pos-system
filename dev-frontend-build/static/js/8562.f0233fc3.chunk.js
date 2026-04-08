"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8562],{2653:(e,t,n)=>{n.d(t,{M:()=>a});var r=n(9950),i=n(4492);function a(e){const[t,n]=(0,i.ok)(),a=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,r.useState)(a());return[o,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var r=n(9950),i=n(1367),a=n(6038);const o=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(a.DL)),[s,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";n(r)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:s,error:l}}},7617:(e,t,n)=>{n.d(t,{A:()=>g});n(9950);var r=n(7119),i=n(4752),a=n(9610),o=n(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
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
`,g=e=>{let{isOpen:t,title:n,message:i,onConfirm:g,onCancel:x,confirmText:h="Confirm",cancelText:y="Cancel",type:m="warning"}=e;return t?r.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:n}),(0,o.jsx)(c,{children:i})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:x,children:y}),(0,o.jsx)(u,{variant:"primary",type:m,onClick:g,children:h})]})]})}),document.body):null}},8562:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_e});var r=n(9950),i=n(4752),a=n(4492),o=n(8409),s=n(2597),d=n(2653),l=n(1367),c=n(2853),p=n(3705),u=n(2488),g=n(9610),x=n(7617),h=n(9194),y=n(4021),m=n(6038),v=n(5030),b=n(4414);const f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,k=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=i.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,C=i.Ay.div`
  margin-top: 8px;
  padding: 10px 12px;
  background: #F0F7FF;
  border-radius: 8px;
  border: 1px solid #DBEAFE;
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`,B=i.Ay.span`
  font-size: 12px;
  color: ${e=>"brand"===e.type?"#6B7280":"my"===e.type?"#2563EB":"#059669"};
  font-weight: ${e=>"applied"===e.type?600:400};
`,E=i.Ay.span`
  font-size: 13px;
  font-weight: ${e=>"applied"===e.type?700:"my"===e.type?600:400};
  color: ${e=>"brand"===e.type?"#9CA3AF":"my"===e.type?"#2563EB":"#059669"};
  text-decoration: none;
`,S=i.Ay.button`
  padding: 4px 10px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  color: #2563EB;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #DBEAFE;
  }
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,z=i.Ay.input`
  width: 100px;
  padding: 4px 8px;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`,I=i.Ay.button`
  padding: 4px 8px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #1D4ED8;
  }
`,R=i.Ay.button`
  padding: 4px 8px;
  background: #F3F4F6;
  color: #6B7280;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #E5E7EB;
  }
`,D=i.Ay.button`
  padding: 2px 6px;
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #EF4444;
  }
`,T=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,N=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,M=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
`,O=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`,P=i.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 22px;
  pointer-events: none;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${O}:checked + & {
    background-color: #635BFF;
  }

  ${O}:checked + &:before {
    transform: translateX(22px);
  }
`,U=i.Ay.div`
  margin: 12px 0;
  flex: 1;
`,q=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,W=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,L=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Y=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,G=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }
`,Q=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Z=i.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,J=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,V=i.Ay.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,X=i.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,H=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,K=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,ee=(i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,e=>{var t,n,i,a;let{brandId:o,restaurantId:s,onCountChange:d,categoryRefreshKey:ee}=e;const{t:te}=(0,v.Bd)("recipes"),{user:ne}=(0,l.As)(),{defaultCurrency:re}=(0,y.i1)(),[ie,ae]=(0,r.useState)("RM"),oe=s||(null===ne||void 0===ne?void 0:ne.restaurant_id)||(null===ne||void 0===ne?void 0:ne.restaurantId);(0,r.useEffect)(()=>{re&&ae(re)},[re]);const[se,de]=(0,r.useState)([]),[le,ce]=(0,r.useState)([]),[pe,ue]=(0,r.useState)(!0),[ge,xe]=(0,r.useState)(""),[he,ye]=(0,r.useState)("all"),[me,ve]=(0,r.useState)(()=>"image"===localStorage.getItem("ingredientsViewMode")?"image":"compact"),[be,fe]=(0,r.useState)(null),[je,Fe]=(0,r.useState)(!1),[ke,_e]=(0,r.useState)({recipes:[],products:[]}),[Ae,Ce]=(0,r.useState)(null),[we,Be]=(0,r.useState)(!1),[Ee,Se]=(0,r.useState)({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}),[$e,ze]=(0,r.useState)([]),[Ie,Re]=(0,r.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[De,Te]=(0,r.useState)(null),[Ne,Me]=(0,r.useState)(""),[Oe,Pe]=(0,r.useState)(""),[Ue,qe]=(0,r.useState)(!1),We="Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role),Le=e=>We&&"brand"===e.owner_type,Ye=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,r.useEffect)(()=>{(async()=>{if(!o&&!oe)return;ue(!0);const e=Ye(),t="Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role);try{var n,r,i;const s=[];let d="",l="",c="";t&&o?(d=`/api/brands/${o}/ingredients`,l=`/api/brands/${o}/ingredient-categories`,c=`/api/brands/${o}/suppliers`):We&&oe&&(d=`/api/restaurants/${oe}/ingredients`,l=`/api/restaurants/${oe}/ingredient-categories`,c=`/api/restaurants/${oe}/all-suppliers`),d&&(s.push(fetch(d,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(l,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),We&&oe&&s.push(fetch(`/api/restaurants/${oe}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const p=await Promise.all(s);if(null!==(n=p[0])&&void 0!==n&&n.success){var a;let e=Array.isArray(p[0].data)?p[0].data:[];We&&null!==(a=p[3])&&void 0!==a&&a.success&&Array.isArray(p[3].data)&&(e=[...p[3].data,...e]),de(e)}if(null!==(r=p[1])&&void 0!==r&&r.success)if(Array.isArray(p[1].data))ce(p[1].data.filter(e=>e.is_active));else{const e=[...p[1].data.own_categories||[],...p[1].data.brand_categories||[]].filter(e=>e.is_active);ce(e)}if(null!==(i=p[2])&&void 0!==i&&i.success)if(Array.isArray(p[2].data))ze(p[2].data.filter(e=>e.is_active));else{const e=[...p[2].data.brand_suppliers||[],...p[2].data.own_suppliers||[]].filter(e=>e.is_active);ze(e)}}catch(s){console.error("Failed to fetch data:",s)}finally{ue(!1)}})()},[o,oe,null===ne||void 0===ne?void 0:ne.role,Ye,We]),(0,r.useEffect)(()=>{ee&&(o||oe)&&Ge()},[ee]);const Ge=async()=>{try{let e="";if("Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role)?o&&(e=`/api/brands/${o}/ingredient-categories`):"Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role)&&oe&&(e=`/api/restaurants/${oe}/ingredient-categories`),!e)return;const t=Ye(),n=await fetch(e,{headers:{Authorization:`Bearer ${t}`}}),r=await n.json();if(r.success)if(Array.isArray(r.data))ce(r.data.filter(e=>e.is_active));else{const e=[...r.data.own_categories||[],...r.data.brand_categories||[]].filter(e=>e.is_active);ce(e)}}catch(e){console.error("Failed to fetch ingredient categories:",e)}},Qe=async e=>{if(oe&&Ne){qe(!0);try{const t=Ye(),n=await fetch(`/api/restaurants/${oe}/ingredient-costs/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({unit_cost:parseFloat(Ne),notes:Oe||null})});(await n.json()).success&&(de(t=>t.map(t=>t.id===e?{...t,restaurant_cost:parseFloat(Ne),effective_cost:parseFloat(Ne),cost_notes:Oe||null}:t)),Te(null))}catch(t){console.error("Failed to save my cost:",t)}finally{qe(!1)}}},Ze=e=>{var t,n,r;e?(Ce(e),Se({code:e.code||"",name:e.name,image_url:e.image_url||"",ingredient_category_id:(null===(t=e.ingredient_category_id)||void 0===t?void 0:t.toString())||"",unit:e.unit,base_quantity:(null===(n=e.base_quantity)||void 0===n?void 0:n.toString())||"1",unit_cost:e.unit_cost.toString(),supplier_id:e.supplier_id||"",min_stock:(null===(r=e.min_stock)||void 0===r?void 0:r.toString())||"0",track_stock:e.track_stock||!1})):(Ce(null),Se({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}));Be(!0)},Je=()=>{Be(!1),Ce(null),Se({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0})},Ve=se.filter(e=>{var t;const n=e.name.toLowerCase().includes(ge.toLowerCase()),r="all"===he||(null===(t=e.ingredient_category_id)||void 0===t?void 0:t.toString())===he;return n&&r}),Xe=[{id:"all",name:"All Categories"},...le.map(e=>({id:e.id.toString(),name:e.name}))];return(0,r.useEffect)(()=>{d(se.length)},[se.length,d]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,b.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,b.jsx)(u.DO,{type:"text",placeholder:"Search ingredients...",value:ge,onChange:e=>xe(e.target.value)}),(0,b.jsx)(u.Jt,{value:he,onChange:e=>ye(e.target.value),children:Xe.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,b.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,b.jsx)("button",{onClick:()=>{ve("compact"),localStorage.setItem("ingredientsViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===me?"white":"transparent",color:"compact"===me?"#0A2540":"#6B7C93",boxShadow:"compact"===me?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,b.jsx)("button",{onClick:()=>{ve("image"),localStorage.setItem("ingredientsViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===me?"white":"transparent",color:"image"===me?"#0A2540":"#6B7C93",boxShadow:"image"===me?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>Ze(null),children:"New Ingredient"})]})]}),pe?(0,b.jsx)(c.pp,{children:(0,b.jsx)(H,{children:"Loading..."})}):0===Ve.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(H,{children:"No ingredients found"}),(0,b.jsx)(K,{children:ge||"all"!==he?"Try adjusting your filters":"Create your first ingredient to get started"}),!ge&&"all"===he&&(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>Ze(null),children:"Create First Ingredient"})]}):(0,b.jsx)(f,{children:Ve.map(e=>{var t,n,r,i,a;return(0,b.jsxs)(j,{isActive:e.is_active,onClick:()=>{fe(e),Fe(!0),_e({recipes:[],products:[]});const t=localStorage.getItem("auth_token");fetch(`/api/restaurants/${oe}/ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{e.success&&_e(e.data)}).catch(()=>{})},children:["image"===me&&e.image_url&&(0,b.jsx)(Z,{children:(0,b.jsx)(J,{src:e.image_url,alt:e.name})}),(0,b.jsx)(F,{children:(0,b.jsxs)("div",{children:[(0,b.jsx)(k,{children:e.name}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap"},children:[We&&"brand"===e.owner_type&&(0,b.jsx)(A,{children:"Brand"}),(0,b.jsxs)(_,{children:[null===(t=e.ingredientCategory)||void 0===t?void 0:t.emoji," ",(null===(n=e.ingredientCategory)||void 0===n?void 0:n.name)||"Uncategorized"]})]})]})}),(0,b.jsxs)(U,{children:[We&&"brand"===e.owner_type?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(C,{children:[(0,b.jsxs)(w,{children:[(0,b.jsx)(B,{type:"brand",children:"Brand Cost"}),(0,b.jsxs)(E,{type:"brand",children:[(0,m.vv)(Number(e.unit_cost),ie),"/",e.unit]})]}),De===e.id?(0,b.jsx)("div",{style:{marginTop:6},children:(0,b.jsxs)(w,{children:[(0,b.jsx)(B,{type:"my",children:"My Cost"}),(0,b.jsxs)($,{children:[(0,b.jsx)(z,{type:"number",step:"0.01",min:"0",value:Ne,onChange:e=>Me(e.target.value),autoFocus:!0,onKeyDown:t=>{"Enter"===t.key&&Qe(e.id),"Escape"===t.key&&Te(null)}}),(0,b.jsx)(I,{onClick:()=>Qe(e.id),disabled:Ue,children:Ue?"...":"Save"}),(0,b.jsx)(R,{onClick:()=>Te(null),children:"\u2715"})]})]})}):null!==e.restaurant_cost&&void 0!==e.restaurant_cost?(0,b.jsxs)(w,{style:{marginTop:4},children:[(0,b.jsxs)(B,{type:"my",children:["My Cost",(0,b.jsx)(S,{style:{marginLeft:6,padding:"2px 6px",fontSize:"10px"},onClick:t=>{t.stopPropagation(),Te(e.id),Me(String(e.restaurant_cost)),Pe(e.cost_notes||"")},children:"Edit"}),(0,b.jsx)(D,{onClick:t=>{t.stopPropagation(),(async e=>{if(oe)try{const t=Ye(),n=await fetch(`/api/restaurants/${oe}/ingredient-costs/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});(await n.json()).success&&de(t=>t.map(t=>t.id===e.id?{...t,restaurant_cost:null,effective_cost:t.unit_cost,cost_notes:null}:t))}catch(t){console.error("Failed to reset my cost:",t)}})(e)},children:"Reset"})]}),(0,b.jsxs)(E,{type:"my",children:[(0,m.vv)(Number(e.restaurant_cost),ie),"/",e.unit]})]}):(0,b.jsxs)(w,{style:{marginTop:4},children:[(0,b.jsx)(B,{type:"my",children:"My Cost"}),(0,b.jsx)(S,{onClick:t=>{t.stopPropagation(),Te(e.id),Me(""),Pe("")},children:"Set Cost"})]}),(0,b.jsxs)(w,{style:{marginTop:6,borderTop:"1px solid #DBEAFE",paddingTop:6},children:[(0,b.jsx)(B,{type:"applied",children:"Applied"}),(0,b.jsxs)(E,{type:"applied",children:[(0,m.vv)(Number(null!==(r=e.effective_cost)&&void 0!==r?r:e.unit_cost),ie),"/",e.unit," ",null!==e.restaurant_cost&&void 0!==e.restaurant_cost?"\u2713":""]})]})]}),e.cost_notes&&(0,b.jsx)(q,{children:(0,b.jsx)(W,{style:{fontSize:"11px",color:"#9CA3AF",fontStyle:"italic"},children:e.cost_notes})})]}):(0,b.jsxs)(q,{children:[(0,b.jsx)(W,{children:"Unit Cost"}),(0,b.jsx)(L,{children:(0,m.vv)(Number(e.unit_cost),ie)})]}),(0,b.jsxs)(q,{children:[(0,b.jsx)(W,{children:"Base Qty / Unit"}),(0,b.jsxs)(L,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),((null===(i=e.supplier)||void 0===i?void 0:i.name)||e.supplier_name)&&(0,b.jsxs)(q,{children:[(0,b.jsx)(W,{children:"Supplier"}),(0,b.jsx)(L,{children:(null===(a=e.supplier)||void 0===a?void 0:a.name)||e.supplier_name})]}),e.code&&(0,b.jsxs)(q,{children:[(0,b.jsx)(W,{children:"Code"}),(0,b.jsx)(L,{children:e.code})]})]}),We&&(0,b.jsxs)(T,{children:[(0,b.jsx)(N,{children:"Track in Inventory"}),(0,b.jsxs)(M,{children:[(0,b.jsx)(O,{type:"checkbox",checked:e.track_stock||!1,onChange:t=>{t.stopPropagation(),(async(e,t)=>{try{let n="";"Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role)?n=`/api/brands/${o}/ingredients/${e.id}`:"Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role)&&(n=`/api/restaurants/${oe}/ingredients/${e.id}`);const r=localStorage.getItem("auth_token"),i=await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({code:e.code,name:e.name,image_url:e.image_url,ingredient_category_id:e.ingredient_category_id,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_id:e.supplier_id,supplier_name:e.supplier_name,min_stock:e.min_stock,is_active:e.is_active,track_stock:t})}),a=await i.json();a.success?de(n=>n.map(n=>n.id===e.id?{...n,track_stock:t}:n)):alert(a.error||"Failed to update track stock")}catch(n){console.error("Failed to toggle track stock:",n)}})(e,t.target.checked)}}),(0,b.jsx)(P,{})]})]}),!Le(e)&&(0,b.jsxs)(Y,{children:[(0,b.jsx)(G,{variant:"secondary",onClick:t=>{t.stopPropagation(),Ze(e)},children:"Edit"}),(0,b.jsx)(G,{variant:"danger",onClick:t=>{t.stopPropagation(),(e=>{Re({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e)},children:"Delete"})]})]},e.id)})}),(0,b.jsx)(g.aF,{isOpen:we,onClose:Je,title:Ae?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,b.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Ee.name&&Ee.ingredient_category_id&&Ee.unit&&Ee.unit_cost)try{var t;let e="";const n=Ae?"PUT":"POST";"Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role)?e=Ae?`/api/brands/${o}/ingredients/${Ae.id}`:`/api/brands/${o}/ingredients`:"Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role)&&(e=Ae?`/api/restaurants/${oe}/ingredients/${Ae.id}`:`/api/restaurants/${oe}/ingredients`);const r=localStorage.getItem("auth_token"),i=await fetch(e,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({code:Ee.code,name:Ee.name,image_url:Ee.image_url||null,ingredient_category_id:Ee.ingredient_category_id?parseInt(Ee.ingredient_category_id):null,unit:Ee.unit,supplier_id:Ee.supplier_id?Number(Ee.supplier_id):null,supplier_name:Ee.supplier_id&&(null===(t=$e.find(e=>e.id===Number(Ee.supplier_id)))||void 0===t?void 0:t.name)||"",base_quantity:parseFloat(Ee.base_quantity)||1,unit_cost:parseFloat(Ee.unit_cost),min_stock:parseInt(Ee.min_stock)||0,track_stock:Ee.track_stock})}),a=await i.json();a.success?(Je(),(async()=>{try{const e=Ye();if("Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role)){if(o){const t=await fetch(`/api/brands/${o}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&de(n.data)}}else if("Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role)&&oe){const[t,n]=await Promise.all([fetch(`/api/restaurants/${oe}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${oe}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let r=[];n.success&&Array.isArray(n.data)&&(r=[...n.data]),t.success&&Array.isArray(t.data)&&(r=[...r,...t.data]),de(r)}}catch(e){console.error("Failed to fetch ingredients:",e)}})()):alert(a.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(n){console.error("Failed to save ingredient:",n)}else alert("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Image"}),(0,b.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{Se({...Ee,image_url:e.result})},e.readAsDataURL(n)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,b.jsx)(V,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:Ee.image_url?(0,b.jsx)("img",{src:Ee.image_url,alt:"Ingredient"}):(0,b.jsx)(X,{children:"Click to upload image"})})]}),(0,b.jsxs)(g.fh,{children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Ingredient Name *"}),(0,b.jsx)(g.ZQ,{type:"text",value:Ee.name,onChange:e=>Se({...Ee,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Code"}),(0,b.jsx)(g.ZQ,{type:"text",value:Ee.code,onChange:e=>Se({...Ee,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,b.jsxs)(g.fh,{children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Category *"}),(0,b.jsxs)(g.FX,{value:Ee.ingredient_category_id,onChange:e=>Se({...Ee,ingredient_category_id:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select category..."}),le.map(e=>(0,b.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Supplier"}),(0,b.jsx)(h.A,{options:$e.map(e=>({value:e.id,label:e.name,subLabel:"brand"===e.owner_type?"Brand":void 0})),value:Ee.supplier_id||null,onChange:e=>Se({...Ee,supplier_id:e||""}),placeholder:"Select supplier...",noOptionsMessage:"No suppliers found"})]})]}),(0,b.jsxs)(g.fh,{children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Base Quantity *"}),(0,b.jsx)(g.ZQ,{type:"number",step:"0.01",min:"0.01",value:Ee.base_quantity,onChange:e=>Se({...Ee,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Unit *"}),(0,b.jsxs)(g.FX,{value:Ee.unit,onChange:e=>Se({...Ee,unit:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select unit..."}),(0,b.jsx)("option",{value:"kg",children:"kg"}),(0,b.jsx)("option",{value:"g",children:"g"}),(0,b.jsx)("option",{value:"L",children:"L"}),(0,b.jsx)("option",{value:"ml",children:"ml"}),(0,b.jsx)("option",{value:"piece",children:"piece"}),(0,b.jsx)("option",{value:"pack",children:"pack"}),(0,b.jsx)("option",{value:"can",children:"can"}),(0,b.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,b.jsxs)(g.fh,{children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsxs)(g.lR,{children:["Unit Cost (",ie,") *"]}),(0,b.jsx)(g.ZQ,{type:"number",step:"0.01",value:Ee.unit_cost,onChange:e=>Se({...Ee,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Minimum Stock"}),(0,b.jsx)(g.ZQ,{type:"number",value:Ee.min_stock,onChange:e=>Se({...Ee,min_stock:e.target.value}),placeholder:"0"})]})]}),(0,b.jsxs)(Q,{children:[(0,b.jsx)(g.yl,{type:"button",variant:"secondary",onClick:Je,children:"Cancel"}),(0,b.jsx)(g.yl,{type:"submit",variant:"primary",children:Ae?"Update Ingredient":"Create Ingredient"})]})]})}),(0,b.jsx)(x.A,{isOpen:Ie.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${Ie.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(Ie.ingredientId)try{let e="";"Brand General"===(null===ne||void 0===ne?void 0:ne.role)||"Brand Manager"===(null===ne||void 0===ne?void 0:ne.role)?e=`/api/brands/${o}/ingredients/${Ie.ingredientId}`:"Restaurant Admin"===(null===ne||void 0===ne?void 0:ne.role)&&(e=`/api/restaurants/${oe}/ingredients/${Ie.ingredientId}`);const t=Ye(),n=await fetch(e,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),r=await n.json();r.success?de(e=>e.filter(e=>e.id!==Ie.ingredientId)):console.error("Delete failed:",r.error)}catch(e){console.error("Failed to delete ingredient:",e)}finally{Re({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{Re({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),je&&be&&(0,b.jsxs)(g.aF,{isOpen:je,onClose:()=>Fe(!1),title:be.name,size:"medium",children:[be.image_url&&(0,b.jsx)("div",{style:{width:"100%",aspectRatio:"300/180",borderRadius:"8px",overflow:"hidden",marginBottom:"16px",background:"#F6F9FC"},children:(0,b.jsx)("img",{src:be.image_url,alt:be.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px",flexWrap:"wrap"},children:[We&&"brand"===be.owner_type&&(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:600,color:"#92400E",background:"#FEF3C7",padding:"3px 8px",borderRadius:"4px"},children:"Brand"}),(0,b.jsxs)("span",{style:{fontSize:"11px",fontWeight:600,color:"#635BFF",background:"#F0F4FF",padding:"3px 8px",borderRadius:"4px"},children:[null===(t=be.ingredientCategory)||void 0===t?void 0:t.emoji," ",(null===(n=be.ingredientCategory)||void 0===n?void 0:n.name)||"Uncategorized"]}),be.track_stock&&(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#059669",background:"#ECFDF5",padding:"3px 8px",borderRadius:"4px"},children:"Tracking"}),be.code&&(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#6B7280",background:"#F3F4F6",padding:"3px 8px",borderRadius:"4px"},children:be.code})]}),(0,b.jsx)("div",{style:{marginBottom:"16px"},children:We&&"brand"===be.owner_type&&null!=be.restaurant_cost?(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:["Brand Cost: ",(0,b.jsxs)("span",{style:{textDecoration:"line-through"},children:[(0,m.vv)(Number(be.unit_cost),ie),"/",be.unit]})]}),(0,b.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#2563EB"},children:["My Cost: ",(0,m.vv)(Number(be.restaurant_cost),ie),"/",be.unit]})]}):(0,b.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540"},children:["Unit Cost: ",(0,m.vv)(Number(be.unit_cost),ie)," / ",be.unit]})}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"},children:[(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Base Qty"}),(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[Number(be.base_quantity||1)," ",be.unit]})]}),(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Current Stock"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:be.track_stock&&Number(be.current_stock||0)<=Number(be.min_stock||0)?"#EF4444":"#0A2540"},children:be.track_stock?`${Number(be.current_stock||0).toFixed(1)} ${be.unit}`:"-"})]}),(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Min Stock"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:be.track_stock?`${Number(be.min_stock||0)} ${be.unit}`:"-"})]})]}),((null===(i=be.supplier)||void 0===i?void 0:i.name)||be.supplier_name)&&(0,b.jsxs)("div",{style:{marginBottom:"16px",fontSize:"13px",color:"#6B7280"},children:["Supplier: ",(0,b.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:(null===(a=be.supplier)||void 0===a?void 0:a.name)||be.supplier_name})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,b.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===ke.recipes.length&&0===ke.products.length?(0,b.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or menu yet."}):(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[ke.recipes.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),ke.products.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Menu"}),e.name]},"p"+e.id))]})]}),Le(be)&&(0,b.jsx)("div",{style:{padding:"10px 12px",background:"#FEF3C7",borderRadius:"6px",fontSize:"12px",color:"#92400E",textAlign:"center"},children:"Managed by Brand. You can set My Cost from the ingredient list."})]})]})}),te=i.Ay.div`
  padding: 24px 0;
`,ne=i.Ay.div`
  display: grid;
  gap: 12px;
`,re=i.Ay.div`
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
`,ie=i.Ay.div`
  flex: 1;
`,ae=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,oe=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,se=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,de=i.Ay.div`
  display: flex;
  gap: 8px;
`,le=i.Ay.button`
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
`,ce=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,pe=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ue=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ge=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,xe=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,he=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ye=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,me=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ve=i.Ay.button`
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
`,be=i.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,fe=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,je=e=>{let{brandId:t,restaurantId:n,onCountChange:i,onCategoryChange:a}=e;const{t:s}=(0,v.Bd)("recipes"),{user:d}=(0,l.As)(),u=n||(null===d||void 0===d?void 0:d.restaurant_id)||(null===d||void 0===d?void 0:d.restaurantId),[h,y]=(0,r.useState)([]),[m,f]=(0,r.useState)([]),[j,F]=(0,r.useState)(!0),[k,_]=(0,r.useState)(!1),[A,C]=(0,r.useState)(null),[w,B]=(0,r.useState)(!1),[E,S]=(0,r.useState)(null),[$,z]=(0,r.useState)({name:"",emoji:"",description:""}),I="Restaurant Admin"===(null===d||void 0===d?void 0:d.role),R="Brand General"===(null===d||void 0===d?void 0:d.role)||"Brand Manager"===(null===d||void 0===d?void 0:d.role),D=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,r.useEffect)(()=>{(async()=>{F(!0);const e=D();try{if(R&&t){const n=await fetch(`/api/brands/${t}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&(y(r.data),i(r.data.length))}else if(I&&u){const t=await fetch(`/api/restaurants/${u}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,r;if(a.success)y(a.data.own_categories||[]),f(a.data.brand_categories||[]),i(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{F(!1)}})()},[t,u,R,I,D,i]);const T=async()=>{try{const r=D();if(R&&t){const e=await fetch(`/api/brands/${t}/ingredient-categories`,{headers:{Authorization:`Bearer ${r}`}}),n=await e.json();n.success&&(y(n.data),i(n.data.length))}else if(I&&u){const t=await fetch(`/api/restaurants/${u}/ingredient-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await t.json();var e,n;if(a.success)y(a.data.own_categories||[]),f(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},N=e=>{e?(C(e),z({name:e.name,emoji:e.emoji||"",description:e.description||""})):(C(null),z({name:"",emoji:"",description:""})),_(!0)},M=()=>{_(!1),C(null),z({name:"",emoji:"",description:""})},O=async e=>{if(e.preventDefault(),$.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const r=A?"PUT":"POST";if(R&&t?n=A?`/api/brands/${t}/ingredient-categories/${A.id}`:`/api/brands/${t}/ingredient-categories`:I&&u&&(n=A?`/api/restaurants/${u}/ingredient-categories/${A.id}`:`/api/restaurants/${u}/ingredient-categories`),!n)return;const i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:$.name.trim(),emoji:$.emoji||null,description:$.description.trim()||null})}),o=await i.json();o.success?(M(),T(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},P=async(e,n)=>{const r="up"===n?e-1:e+1;if(r<0||r>=h.length)return;const i=[...h];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(R&&t?n=`/api/brands/${t}/ingredient-categories/reorder`:I&&u&&(n=`/api/restaurants/${u}/ingredient-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),T()}catch(o){console.error("Failed to reorder:",o)}},U=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,b.jsxs)(re,{isActive:e.is_active,readOnly:r,children:[!r&&(0,b.jsx)(o.Xd,{onMoveUp:()=>P(t,"up"),onMoveDown:()=>P(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,b.jsx)(ye,{children:e.emoji}),(0,b.jsxs)(ie,{children:[(0,b.jsxs)(ae,{children:[e.name,r&&(0,b.jsx)(xe,{children:s("recipes:ingredientCategoriesTab.brand")})]}),(0,b.jsxs)(oe,{children:[(0,b.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),!r&&(0,b.jsx)(he,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,b.jsx)(se,{children:e.description})]}),!r&&(0,b.jsxs)(de,{children:[(0,b.jsx)(le,{onClick:()=>N(e),title:"Edit",children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,b.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,b.jsx)(le,{onClick:()=>(e=>{S(e),B(!0)})(e),title:"Delete",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return j?(0,b.jsx)(te,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:s("recipes:ingredientCategoriesTab.loading")})}):(0,b.jsxs)(te,{children:[(0,b.jsxs)(ue,{children:[(0,b.jsx)(ge,{children:s("recipes:ingredientCategoriesTab.ingredientCategories")}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>N(),children:"Add Category"})]}),I&&m.length>0&&(0,b.jsxs)(be,{children:[(0,b.jsx)(fe,{children:"Brand Categories (Read Only)"}),(0,b.jsx)(ne,{children:m.map((e,t)=>U(e,t,m,!0))})]}),0===h.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(ce,{children:s("recipes:ingredientCategoriesTab.noIngredientCategoriesYet")}),(0,b.jsx)(pe,{children:"Create categories to organize your ingredients"}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>N(),children:"Add Category"})]}):(0,b.jsx)(ne,{children:h.map((e,t)=>{return U(e,t,h,(n=e,I&&"brand"===n.owner_type));var n})}),(0,b.jsx)(g.aF,{isOpen:k,onClose:M,title:(A?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(g.yl,{variant:"secondary",onClick:M,children:s("recipes:ingredientCategoriesTab.cancel")}),(0,b.jsx)(g.yl,{variant:"primary",onClick:O,disabled:!$.name.trim(),children:A?"Update":"Create"})]}),children:(0,b.jsxs)("form",{onSubmit:O,children:[(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:"Category Name *"}),(0,b.jsx)(g.ZQ,{type:"text",value:$.name,onChange:e=>z({...$,name:e.target.value}),placeholder:"e.g., Vegetables",autoFocus:!0,required:!0})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:s("recipes:ingredientCategoriesTab.icon")}),(0,b.jsx)(me,{children:["\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83c\udf3d","\ud83e\udd66","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83e\udd53","\ud83c\udf64","\ud83e\udd90","\ud83e\udd91","\ud83d\udc1f","\ud83e\udd9e","\ud83e\udd80","\ud83e\udd5b","\ud83e\uddc0","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf76","\ud83e\uddc2","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83c\udf3e","\ud83c\udf5a","\ud83c\udf5e","\ud83e\udd56","\ud83e\udd50","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf4e","\ud83c\udf50","\ud83c\udf4c","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83c\udf51","\ud83e\udd6d","\ud83e\uddca","\ud83d\udca7","\ud83e\uded9","\ud83c\udf7e","\ud83e\udd6b","\ud83e\uddf4","\ud83c\udf75","\u2615","\ud83e\uddc3","\ud83e\udd64"].map(e=>(0,b.jsx)(ve,{selected:$.emoji===e,onClick:()=>z({...$,emoji:e}),type:"button",children:e},e))})]}),(0,b.jsxs)(g.gE,{children:[(0,b.jsx)(g.lR,{children:s("recipes:ingredientCategoriesTab.description")}),(0,b.jsx)(g.Lz,{value:$.description,onChange:e=>z({...$,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,b.jsx)(x.A,{isOpen:w,onCancel:()=>{B(!1),S(null)},onConfirm:async()=>{if(E)try{const e=localStorage.getItem("auth_token");let n="";if(R&&t?n=`/api/brands/${t}/ingredient-categories/${E.id}`:I&&u&&(n=`/api/restaurants/${u}/ingredient-categories/${E.id}`),!n)return;const r=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(B(!1),S(null),T(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:E?`Are you sure you want to delete "${E.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Fe=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,ke=i.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  min-width: 200px;

  &:hover {
    border-color: #CBD5E1;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,_e=()=>{const{t:e}=(0,v.Bd)("recipes"),{user:t}=(0,l.As)(),{restaurantId:n}=(0,a.g)(),[i,c]=(0,a.ok)(),[p,u]=(0,d.M)("ingredients"),[g,x]=(0,r.useState)(0),[h,y]=(0,r.useState)(0),[m,f]=(0,r.useState)([]),[j,F]=(0,r.useState)(!0),[k,_]=(0,r.useState)(0),A=i.get("brandId"),C=A?Number(A):m.length>0?m[0].id:null;(0,r.useEffect)(()=>{t&&"Brand General"===t.role?w():F(!1)},[t]);const w=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();f(e),e.length>0&&!A&&c({tab:p,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{F(!1)}},B=e=>{u(e),C&&c(t=>(t.set("tab",e),t.set("brandId",String(C)),t))};return j?(0,b.jsxs)(o.mc,{children:[(0,b.jsx)(o.Y9,{children:(0,b.jsx)(o.hE,{children:e("recipes:ingredientsPage.ingredients")})}),(0,b.jsx)(o.UC,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:e("recipes:ingredientsPage.loading")})})]}):(0,b.jsxs)(o.mc,{children:[(0,b.jsxs)(o.Y9,{children:[(0,b.jsx)(o.hE,{children:e("recipes:ingredientsPage.ingredients")}),"Brand General"===(null===t||void 0===t?void 0:t.role)&&m.length>0&&(0,b.jsx)(Fe,{children:(0,b.jsx)(ke,{value:C||"",onChange:e=>{return t=Number(e.target.value),void c({tab:p,brandId:String(t)});var t},children:m.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,b.jsxs)(o.UC,{children:[(0,b.jsxs)(s.tU,{children:[(0,b.jsxs)(s.oz,{active:"ingredients"===p,onClick:()=>B("ingredients"),children:["Ingredients ",(0,b.jsx)(s.Ex,{count:g,showZero:!0})]}),(0,b.jsxs)(s.oz,{active:"ingredient-categories"===p,onClick:()=>B("ingredient-categories"),children:["Categories ",(0,b.jsx)(s.Ex,{count:h,showZero:!0})]})]}),(C||"Brand General"!==(null===t||void 0===t?void 0:t.role))&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{style:{display:"ingredients"===p?"block":"none"},children:(0,b.jsx)(ee,{brandId:C,restaurantId:n?Number(n):null,onCountChange:x,categoryRefreshKey:k})}),(0,b.jsx)("div",{style:{display:"ingredient-categories"===p?"block":"none"},children:(0,b.jsx)(je,{brandId:C,restaurantId:n?Number(n):null,onCountChange:y,onCategoryChange:()=>_(e=>e+1)})})]})]})]})}}}]);