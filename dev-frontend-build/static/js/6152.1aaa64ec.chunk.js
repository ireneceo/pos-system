"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6152],{2488:(e,i,n)=>{n.d(i,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var r=n(4752),t=n(4414);const a=r.Ay.div`
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
`,o=r.Ay.input`
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
`,s=r.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,d=r.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=r.Ay.select`
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
`,c=e=>{let{children:i,className:n,style:r,...o}=e;return(0,t.jsx)(a,{className:n,style:r,...o,children:i})},p=e=>{let{placeholder:i="Search...",value:n,onChange:r,style:a,...l}=e;return(0,t.jsxs)(s,{style:a,children:[(0,t.jsx)(o,{placeholder:i,value:n,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,t.jsx)(d,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:i,...n}=e;return(0,t.jsx)(l,{...n,children:i})}},3705:(e,i,n)=>{n.d(i,{cc:()=>t});var r=n(4752);const t=r.Ay.button`
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
`},4021:(e,i,n)=>{n.d(i,{i1:()=>o});var r=n(9950),t=n(1367),a=n(6038);const o=()=>{const{user:e}=(0,t.As)(),[i,n]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(a.DL)),[s,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),r=i.indexOf("restaurant");let t=r>=0?i[r+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";n(r)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:o,loading:s,error:l}}},6152:(e,i,n)=>{n.r(i),n.d(i,{default:()=>W});var r=n(9950),t=n(4752),a=n(2853),o=n(3705),s=n(8409),d=n(2488),l=n(1367),c=n(9610),p=n(4021),x=n(6038),u=n(7617),g=n(4414);const h=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,m=t.Ay.div`
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
`,v=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,y=t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,b=t.Ay.div`
  flex: 1;
  min-width: 0;
`,f=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,j=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,C=t.Ay.div``,k=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,A=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,_=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,E=t.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,B=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,S=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,R=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,z=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,I=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,$=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #FFFBEB;
  border-radius: 6px;
  border-left: 3px solid #F59E0B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,D=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,M=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F8FAFC;\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        "}}}
`,T=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Y=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,O=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,q=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Q=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,N=t.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;

  &:hover {
    background: #FCA5A5;
  }
`,P=t.Ay.button`
  background: #F0F4FF;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;

  &:hover {
    background: #E0E7FF;
  }
`,L=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Z=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,G=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,J=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,W=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:i,supportedCurrencies:n}=(0,p.i1)(),[t,W]=(0,r.useState)(""),[U,H]=(0,r.useState)([]),[V,X]=(0,r.useState)([]),[K,ee]=(0,r.useState)(!0),[ie,ne]=(0,r.useState)(""),[re,te]=(0,r.useState)("all"),[ae,oe]=(0,r.useState)(null),[se,de]=(0,r.useState)(!1),[le,ce]=(0,r.useState)(!0),[pe,xe]=(0,r.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[ue,ge]=(0,r.useState)([]),[he,me]=(0,r.useState)(!1),[ve,ye]=(0,r.useState)(null),[be,fe]=(0,r.useState)(!1),[je,we]=(0,r.useState)(null),[Fe,Ce]=(0,r.useState)(null),[ke,Ae]=(0,r.useState)(!1),[_e,Ee]=(0,r.useState)(null),[Be,Se]=(0,r.useState)(null);(0,r.useEffect)(()=>{i&&!t&&W(i)},[i,t]),(0,r.useEffect)(()=>{(async()=>{if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role))try{const i=await fetch("/api/brands"),n=await i.json();if(n.success&&n.data.length>0){const i=n.data.find(i=>i.owner_id===e.id);i&&ye(i.id)}}catch(i){console.error("Failed to fetch user brand:",i)}})()},[e]),(0,r.useEffect)(()=>{"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?ve&&(ze(),Re()):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(ze(),Re())},[e,ve]);const Re=async()=>{try{let i="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?ve&&(i=`/api/brands/${ve}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(i=`/api/restaurants/${e.restaurant_id}/ingredients`),!i)return;const n=await fetch(i),r=await n.json();r.success&&X(r.data)}catch(i){console.error("Failed to fetch ingredients:",i)}},ze=async()=>{try{ee(!0);let a="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?ve&&(a=`/api/brands/${ve}/recipes`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(a=`/api/restaurants/${e.restaurant_id}/recipes`),!a)return void ee(!1);const o=await fetch(a),s=await o.json();var i,n,r,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(i=s.data[0])||void 0===i?void 0:i.prep_time),console.log("cook_time:",null===(n=s.data[0])||void 0===n?void 0:n.cook_time),console.log("instructions:",null===(r=s.data[0])||void 0===r?void 0:r.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),H(s.data),ce(!0);else H([...s.data.brand_recipes,...s.data.own_recipes]),ce("brand"!==s.data.recipe_manager_type)}catch(a){console.error("Failed to fetch recipes:",a)}finally{ee(!1)}},Ie=function(e){let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n,r,t,a;(Te(null),me(i),e)?(oe(e),xe({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions:e.instructions||"",suggested_price:(null===(t=e.suggested_price)||void 0===t?void 0:t.toString())||""}),ge((null===(a=e.recipeIngredients)||void 0===a?void 0:a.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(oe(null),xe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ge([]));de(!0)},$e=()=>{de(!1),oe(null),me(!1),xe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ge([])},De=i=>{null!==e&&void 0!==e&&e.restaurant_id?(Se(null),Ee(i),Ae(!0)):Se("Restaurant ID is required to register menu")},[Me,Te]=(0,r.useState)(null),Ye=(e,i,n)=>{const r=[...ue];r[e]={...r[e],[i]:n},ge(r)},Oe=U.filter(e=>{const i=e.name.toLowerCase().includes(ie.toLowerCase()),n="all"===re||e.category===re;return i&&n}),qe=["all",...Array.from(new Set(U.map(e=>e.category)))],Qe=U.filter(e=>e.is_active).length,Ne=U.reduce((e,i)=>e+Number(i.total_ingredient_cost||0),0),Pe=U.length>0?Ne/U.length:0;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(s.mc,{children:[(0,g.jsxs)(s.Y9,{children:[(0,g.jsx)(s.hE,{children:"Recipes"}),(0,g.jsx)(s.ex,{children:le&&(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>Ie(null),children:"New Recipe"})})]}),(0,g.jsxs)(s.MD,{children:[(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Total Recipes"}),(0,g.jsx)(s.Os,{children:U.length}),(0,g.jsxs)(s.d1,{children:[Qe," active"]})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Average Cost"}),(0,g.jsx)(s.Os,{children:(0,x.vv)(Pe,t||"MYR")}),(0,g.jsx)(s.d1,{children:"per recipe"})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Total Value"}),(0,g.jsx)(s.Os,{children:(0,x.vv)(Ne,t||"MYR")}),(0,g.jsx)(s.d1,{children:"all recipes"})]})]}),(0,g.jsxs)(d.Qn,{children:[(0,g.jsx)(d.DO,{type:"text",placeholder:"Search recipes...",value:ie,onChange:e=>ne(e.target.value)}),(0,g.jsx)(d.Jt,{value:re,onChange:e=>te(e.target.value),children:qe.map(e=>(0,g.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,g.jsx)(d.Jt,{value:t,onChange:e=>W(e.target.value),style:{minWidth:"140px"},children:n.map(e=>(0,g.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,g.jsxs)(s.UC,{children:[Fe&&(0,g.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Fe,(0,g.jsx)("button",{onClick:()=>Ce(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),Be&&(0,g.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Be,(0,g.jsx)("button",{onClick:()=>Se(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),K?(0,g.jsx)(a.pp,{children:(0,g.jsx)(T,{children:"Loading..."})}):0===Oe.length?(0,g.jsxs)(a.pp,{children:[(0,g.jsx)(T,{children:"No recipes found"}),(0,g.jsx)(Y,{children:ie||"all"!==re?"Try adjusting your filters":le?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!ie&&"all"===re&&le&&(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>Ie(null),children:"Create First Recipe"})]}):(0,g.jsx)(h,{children:Oe.map(i=>{var n;return(0,g.jsxs)(m,{isActive:i.is_active,onClick:()=>Ie(i,!0),children:[(0,g.jsxs)(v,{children:[i.emoji&&(0,g.jsx)(y,{children:i.emoji}),(0,g.jsxs)(b,{children:[(0,g.jsx)(f,{children:i.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,g.jsx)(j,{children:i.category}),i.from_brand&&(0,g.jsx)(j,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),i.description&&(0,g.jsx)(w,{children:i.description}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(C,{children:[(0,g.jsx)(k,{children:"Cost"}),(0,g.jsx)(A,{children:(0,x.vv)(i.total_ingredient_cost||0,t||"MYR")})]}),(0,g.jsxs)(C,{children:[(0,g.jsx)(k,{children:"Suggested"}),(0,g.jsx)(A,{children:(0,x.vv)(i.suggested_price||0,t||"MYR")})]})]}),(i.prep_time||i.cook_time)&&(0,g.jsxs)(z,{children:[i.prep_time&&(0,g.jsxs)(I,{children:[(0,g.jsx)("span",{children:"Prep:"}),(0,g.jsxs)("strong",{children:[i.prep_time," min"]})]}),i.cook_time&&(0,g.jsxs)(I,{children:[(0,g.jsx)("span",{children:"Cook:"}),(0,g.jsxs)("strong",{children:[i.cook_time," min"]})]}),i.prep_time&&i.cook_time&&(0,g.jsxs)(I,{children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsxs)("strong",{children:[i.prep_time+i.cook_time," min"]})]})]}),i.instructions&&(0,g.jsx)($,{children:i.instructions}),(0,g.jsx)(_,{}),(0,g.jsxs)(E,{children:[(0,g.jsxs)(B,{children:[(null===(n=i.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),i.recipeIngredients&&i.recipeIngredients.length>0&&(0,g.jsxs)(S,{children:[i.recipeIngredients.slice(0,5).map((e,i)=>{var n;return(0,g.jsx)(R,{children:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||`Ingredient #${e.ingredient_id}`},i)}),i.recipeIngredients.length>5&&(0,g.jsxs)(R,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",i.recipeIngredients.length-5," more"]})]})]}),(0,g.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[!1!==i.editable&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{variant:"primary",onClick:()=>Ie(i,!1),children:"Edit"}),(0,g.jsx)(M,{variant:"danger",onClick:()=>{return e=i.id,Ce(null),we(e),void fe(!0);var e},children:"Delete"})]}),(null===e||void 0===e?void 0:e.restaurant_id)&&(0,g.jsx)(M,{variant:"primary",onClick:()=>De(i),style:{background:"#10B981"},children:"+ Menu"})]})]},i.id)})})]})]}),(0,g.jsx)(c.aF,{isOpen:se,onClose:$e,title:he?"Recipe Details":ae?"Edit Recipe":"New Recipe",size:"large",children:(0,g.jsxs)("form",{onSubmit:async i=>{if(i.preventDefault(),Te(null),pe.name&&pe.category)try{let i="";const n=ae?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?i=ae?`/api/brands/${ve}/recipes/${ae.id}`:`/api/brands/${ve}/recipes`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(i=ae?`/api/restaurants/${e.restaurant_id}/recipes/${ae.id}`:`/api/restaurants/${e.restaurant_id}/recipes`);const r=await fetch(i,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:pe.name,description:pe.description,category:pe.category,emoji:pe.emoji,image:pe.image,prep_time:pe.prep_time?parseInt(pe.prep_time):null,cook_time:pe.cook_time?parseInt(pe.cook_time):null,instructions:pe.instructions||null,suggested_price:parseFloat(pe.suggested_price)||0,ingredients:ue.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await r.json();t.success?($e(),ze()):Te(t.error||"Failed to save recipe")}catch(n){console.error("Failed to save recipe:",n),Te("Failed to save recipe")}else Te("Recipe name and category are required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Recipe Name ",!he&&"*"]}),(0,g.jsx)(c.ZQ,{type:"text",value:pe.name,onChange:e=>xe({...pe,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!he,disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Category ",!he&&"*"]}),(0,g.jsx)(c.ZQ,{type:"text",value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),placeholder:"e.g., Main Dish",required:!he,disabled:he})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Emoji"}),(0,g.jsx)(c.ZQ,{type:"text",value:pe.emoji,onChange:e=>xe({...pe,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Suggested Price (",(0,x.Qn)(t||"MYR"),")"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:pe.suggested_price,onChange:e=>xe({...pe,suggested_price:e.target.value}),placeholder:"0.00",disabled:he})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,g.jsx)(c.ZQ,{type:"number",value:pe.prep_time,onChange:e=>xe({...pe,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,g.jsx)(c.ZQ,{type:"number",value:pe.cook_time,onChange:e=>xe({...pe,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:he})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Description"}),(0,g.jsx)(c.Lz,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Cooking Instructions"}),(0,g.jsx)(c.Lz,{value:pe.instructions,onChange:e=>xe({...pe,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:he,style:{minHeight:"100px"}})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(O,{children:"Ingredients"}),(0,g.jsx)(q,{children:ue.map((e,i)=>(0,g.jsxs)(Q,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Ingredient"}),(0,g.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>Ye(i,"ingredient_id",parseInt(e.target.value)),required:!he,disabled:he,children:[(0,g.jsx)("option",{value:0,children:"Select ingredient..."}),V.map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(e.unit_cost,t||"MYR"),"/",e.unit,")"]},e.id))]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Quantity"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Ye(i,"quantity",e.target.value),placeholder:"0",required:!he,disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit"}),(0,g.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>Ye(i,"unit",e.target.value),placeholder:"kg/g/ml",required:!he,disabled:he})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Notes"}),(0,g.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>Ye(i,"notes",e.target.value),placeholder:"Optional",disabled:he})]}),!he&&(0,g.jsx)(N,{type:"button",onClick:()=>(e=>{ge(ue.filter((i,n)=>n!==e))})(i),children:"\xd7"})]},i))}),!he&&(0,g.jsx)(P,{type:"button",onClick:()=>{ge([...ue,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),ue.length>0&&(0,g.jsxs)(L,{children:[(0,g.jsx)(Z,{children:"Total Ingredient Cost"}),(0,g.jsx)(G,{children:(0,x.vv)(ue.reduce((e,i)=>{const n=V.find(e=>e.id===i.ingredient_id);return n&&i.quantity?e+parseFloat(i.quantity)*parseFloat(n.unit_cost.toString()):e},0),t||"MYR")})]})]}),Me&&(0,g.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:Me}),(0,g.jsxs)(J,{children:[(0,g.jsx)(c.yl,{type:"button",variant:"secondary",onClick:$e,children:he?"Close":"Cancel"}),!he&&(0,g.jsx)(c.yl,{type:"submit",variant:"primary",children:ae?"Update Recipe":"Create Recipe"}),he&&(null===e||void 0===e?void 0:e.restaurant_id)&&ae&&(0,g.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{$e(),De(ae)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})}),(0,g.jsx)(u.A,{isOpen:be,title:"Delete Recipe",message:"Are you sure you want to delete this recipe?",onConfirm:async()=>{if(je){fe(!1);try{let i="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?i=`/api/brands/${ve}/recipes/${je}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(i=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/recipes/${je}`);const n=localStorage.getItem("auth_token"),r=await fetch(i,{method:"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}});(await r.json()).success&&ze()}catch(i){console.error("Failed to delete recipe:",i),Ce("Failed to delete recipe")}finally{we(null)}}},onCancel:()=>{fe(!1),we(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,g.jsx)(u.A,{isOpen:ke,title:"Register as Menu Item",message:`Register "${null===_e||void 0===_e?void 0:_e.name}" as a menu item?`,onConfirm:async()=>{if(_e&&null!==e&&void 0!==e&&e.restaurant_id){Ae(!1);try{const i=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:_e.name,description:_e.description||"",price:_e.suggested_price||0,category:_e.category,emoji:_e.emoji||"",restaurant_id:e.restaurant_id,recipe_id:_e.id})}),n=await i.json();n.success||Se(n.error||"Failed to register menu item")}catch(i){console.error("Failed to register menu:",i),Se("Failed to register menu item")}finally{Ee(null)}}},onCancel:()=>{Ae(!1),Ee(null)},confirmText:"Register",cancelText:"Cancel",type:"info"})]})}},7617:(e,i,n)=>{n.d(i,{A:()=>u});n(9950);var r=n(7119),t=n(4752),a=n(9610),o=n(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=t.Ay.button`
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
`,u=e=>{let{isOpen:i,title:n,message:t,onConfirm:u,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:v="warning"}=e;return i?r.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:n}),(0,o.jsx)(c,{children:t})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{variant:"secondary",onClick:g,children:m}),(0,o.jsx)(x,{variant:"primary",type:v,onClick:u,children:h})]})]})}),document.body):null}}}]);