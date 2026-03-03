"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6152],{2488:(e,r,n)=>{n.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});n(9950);var i=n(4752),t=n(4414);const a=i.Ay.div`
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
`,s=i.Ay.select`
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
`,d=e=>{let{children:r,className:n,style:i,...o}=e;return(0,t.jsx)(a,{className:n,style:i,...o,children:r})},l=e=>{let{placeholder:r="Search...",...n}=e;return(0,t.jsx)(o,{placeholder:r,...n})},c=e=>{let{children:r,...n}=e;return(0,t.jsx)(s,{...n,children:r})}},3705:(e,r,n)=>{n.d(r,{cc:()=>t});var i=n(4752);const t=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`},4021:(e,r,n)=>{n.d(r,{i1:()=>o});var i=n(9950),t=n(1367),a=n(6038);const o=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,i.useState)("RM"),[o,s]=(0,i.useState)(Object.keys(a.DL)),[d,l]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),i=r.indexOf("restaurant");let t=i>=0?r[i+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),i=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(i)}else n("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:c}}},6152:(e,r,n)=>{n.r(r),n.d(r,{default:()=>G});var i=n(9950),t=n(4752),a=n(2853),o=n(3705),s=n(8409),d=n(2488),l=n(1367),c=n(9610),p=n(4021),x=n(6038),u=n(7617),g=n(4414);const h=t.Ay.div`
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
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,E=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,B=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,S=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,R=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,z=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,D=t.Ay.div`
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
`,I=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,$=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F8FAFC;\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        "}}}
`,T=(t.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
`,t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`),O=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,q=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,M=t.Ay.div`
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
`,U=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,Z=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,Y=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,G=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:r,supportedCurrencies:n}=(0,p.i1)(),[t,G]=(0,i.useState)(""),[J,H]=(0,i.useState)([]),[W,V]=(0,i.useState)([]),[X,K]=(0,i.useState)(!0),[ee,re]=(0,i.useState)(""),[ne,ie]=(0,i.useState)("all"),[te,ae]=(0,i.useState)(null),[oe,se]=(0,i.useState)(!1),[de,le]=(0,i.useState)(!0),[ce,pe]=(0,i.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[xe,ue]=(0,i.useState)([]),[ge,he]=(0,i.useState)(!1),[me,ve]=(0,i.useState)(null),[ye,be]=(0,i.useState)(!1),[fe,je]=(0,i.useState)(null),[we,Fe]=(0,i.useState)(null),[Ce,ke]=(0,i.useState)(!1),[Ae,_e]=(0,i.useState)(null),[Ee,Be]=(0,i.useState)(null);(0,i.useEffect)(()=>{r&&!t&&G(r)},[r,t]),(0,i.useEffect)(()=>{(async()=>{if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role))try{const r=await fetch("/api/brands"),n=await r.json();if(n.success&&n.data.length>0){const r=n.data.find(r=>r.owner_id===e.id);r&&ve(r.id)}}catch(r){console.error("Failed to fetch user brand:",r)}})()},[e]),(0,i.useEffect)(()=>{"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(Re(),Se()):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(Re(),Se())},[e,me]);const Se=async()=>{try{let r="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(r=`/api/brands/${me}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(r=`/api/restaurants/${e.restaurant_id}/ingredients`),!r)return;const n=await fetch(r),i=await n.json();i.success&&V(i.data)}catch(r){console.error("Failed to fetch ingredients:",r)}},Re=async()=>{try{K(!0);let a="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(a=`/api/brands/${me}/recipes`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(a=`/api/restaurants/${e.restaurant_id}/recipes`),!a)return void K(!1);const o=await fetch(a),s=await o.json();var r,n,i,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(r=s.data[0])||void 0===r?void 0:r.prep_time),console.log("cook_time:",null===(n=s.data[0])||void 0===n?void 0:n.cook_time),console.log("instructions:",null===(i=s.data[0])||void 0===i?void 0:i.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),H(s.data),le(!0);else H([...s.data.brand_recipes,...s.data.own_recipes]),le("brand"!==s.data.recipe_manager_type)}catch(a){console.error("Failed to fetch recipes:",a)}finally{K(!1)}},ze=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n,i,t,a;(Te(null),he(r),e)?(ae(e),pe({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(t=e.suggested_price)||void 0===t?void 0:t.toString())||""}),ue((null===(a=e.recipeIngredients)||void 0===a?void 0:a.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(ae(null),pe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ue([]));se(!0)},De=()=>{se(!1),ae(null),he(!1),pe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ue([])},Ie=r=>{null!==e&&void 0!==e&&e.restaurant_id?(Be(null),_e(r),ke(!0)):Be("Restaurant ID is required to register menu")},[$e,Te]=(0,i.useState)(null),Oe=(e,r,n)=>{const i=[...xe];i[e]={...i[e],[r]:n},ue(i)},qe=J.filter(e=>{const r=e.name.toLowerCase().includes(ee.toLowerCase()),n="all"===ne||e.category===ne;return r&&n}),Me=["all",...Array.from(new Set(J.map(e=>e.category)))],Qe=J.filter(e=>e.is_active).length,Ne=J.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Pe=J.length>0?Ne/J.length:0;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(s.mc,{children:[(0,g.jsxs)(s.Y9,{children:[(0,g.jsx)(s.hE,{children:"Recipes"}),(0,g.jsx)(s.ex,{children:de&&(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>ze(null),children:"New Recipe"})})]}),(0,g.jsxs)(s.MD,{children:[(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Total Recipes"}),(0,g.jsx)(s.Os,{children:J.length}),(0,g.jsxs)(s.d1,{children:[Qe," active"]})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Average Cost"}),(0,g.jsx)(s.Os,{children:(0,x.vv)(Pe,t||"USD")}),(0,g.jsx)(s.d1,{children:"per recipe"})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Total Value"}),(0,g.jsx)(s.Os,{children:(0,x.vv)(Ne,t||"USD")}),(0,g.jsx)(s.d1,{children:"all recipes"})]})]}),(0,g.jsxs)(d.Qn,{children:[(0,g.jsx)(d.DO,{type:"text",placeholder:"Search recipes...",value:ee,onChange:e=>re(e.target.value)}),(0,g.jsx)(d.Jt,{value:ne,onChange:e=>ie(e.target.value),children:Me.map(e=>(0,g.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,g.jsx)(d.Jt,{value:t,onChange:e=>G(e.target.value),style:{minWidth:"140px"},children:n.map(e=>(0,g.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,g.jsxs)(s.UC,{children:[we&&(0,g.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[we,(0,g.jsx)("button",{onClick:()=>Fe(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),Ee&&(0,g.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Ee,(0,g.jsx)("button",{onClick:()=>Be(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),X?(0,g.jsx)(a.pp,{children:(0,g.jsx)(T,{children:"Loading..."})}):0===qe.length?(0,g.jsxs)(a.pp,{children:[(0,g.jsx)(T,{children:"No recipes found"}),(0,g.jsx)(O,{children:ee||"all"!==ne?"Try adjusting your filters":de?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!ee&&"all"===ne&&de&&(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>ze(null),children:"Create First Recipe"})]}):(0,g.jsx)(h,{children:qe.map(r=>{var n;return(0,g.jsxs)(m,{isActive:r.is_active,onClick:()=>ze(r,!0),children:[(0,g.jsxs)(v,{children:[r.emoji&&(0,g.jsx)(y,{children:r.emoji}),(0,g.jsxs)(b,{children:[(0,g.jsx)(f,{children:r.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,g.jsx)(j,{children:r.category}),r.from_brand&&(0,g.jsx)(j,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),r.description&&(0,g.jsx)(w,{children:r.description}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(C,{children:[(0,g.jsx)(k,{children:"Cost"}),(0,g.jsx)(A,{children:(0,x.vv)(r.total_ingredient_cost||0,t||"USD")})]}),(0,g.jsxs)(C,{children:[(0,g.jsx)(k,{children:"Suggested"}),(0,g.jsx)(A,{children:(0,x.vv)(r.suggested_price||0,t||"USD")})]})]}),(r.prep_time||r.cook_time)&&(0,g.jsxs)(R,{children:[r.prep_time&&(0,g.jsxs)(z,{children:[(0,g.jsx)("span",{children:"Prep:"}),(0,g.jsxs)("strong",{children:[r.prep_time," min"]})]}),r.cook_time&&(0,g.jsxs)(z,{children:[(0,g.jsx)("span",{children:"Cook:"}),(0,g.jsxs)("strong",{children:[r.cook_time," min"]})]}),r.prep_time&&r.cook_time&&(0,g.jsxs)(z,{children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsxs)("strong",{children:[r.prep_time+r.cook_time," min"]})]})]}),r.instructions&&(0,g.jsx)(D,{children:r.instructions}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(E,{children:[(null===(n=r.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),r.recipeIngredients&&r.recipeIngredients.length>0&&(0,g.jsxs)(B,{children:[r.recipeIngredients.slice(0,5).map((e,r)=>{var n;return(0,g.jsx)(S,{children:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||`Ingredient #${e.ingredient_id}`},r)}),r.recipeIngredients.length>5&&(0,g.jsxs)(S,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",r.recipeIngredients.length-5," more"]})]})]}),(0,g.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[!1!==r.editable&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)($,{variant:"primary",onClick:()=>ze(r,!1),children:"Edit"}),(0,g.jsx)($,{variant:"danger",onClick:()=>{return e=r.id,Fe(null),je(e),void be(!0);var e},children:"Delete"})]}),(null===e||void 0===e?void 0:e.restaurant_id)&&(0,g.jsx)($,{variant:"primary",onClick:()=>Ie(r),style:{background:"#10B981"},children:"+ Menu"})]})]},r.id)})})]})]}),(0,g.jsx)(c.aF,{isOpen:oe,onClose:De,title:ge?"Recipe Details":te?"Edit Recipe":"New Recipe",size:"large",children:(0,g.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),Te(null),ce.name&&ce.category)try{let r="";const n=te?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=te?`/api/brands/${me}/recipes/${te.id}`:`/api/brands/${me}/recipes`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=te?`/api/restaurants/${e.restaurant_id}/recipes/${te.id}`:`/api/restaurants/${e.restaurant_id}/recipes`);const i=await fetch(r,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:ce.name,description:ce.description,category:ce.category,emoji:ce.emoji,image:ce.image,prep_time:ce.prep_time?parseInt(ce.prep_time):null,cook_time:ce.cook_time?parseInt(ce.cook_time):null,instructions:ce.instructions||null,suggested_price:parseFloat(ce.suggested_price)||0,ingredients:xe.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await i.json();t.success?(De(),Re()):Te(t.error||"Failed to save recipe")}catch(n){console.error("Failed to save recipe:",n),Te("Failed to save recipe")}else Te("Recipe name and category are required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Recipe Name ",!ge&&"*"]}),(0,g.jsx)(c.ZQ,{type:"text",value:ce.name,onChange:e=>pe({...ce,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ge,disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Category ",!ge&&"*"]}),(0,g.jsx)(c.ZQ,{type:"text",value:ce.category,onChange:e=>pe({...ce,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ge,disabled:ge})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Emoji"}),(0,g.jsx)(c.ZQ,{type:"text",value:ce.emoji,onChange:e=>pe({...ce,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Suggested Price (",(0,x.Qn)(t||"USD"),")"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:ce.suggested_price,onChange:e=>pe({...ce,suggested_price:e.target.value}),placeholder:"0.00",disabled:ge})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,g.jsx)(c.ZQ,{type:"number",value:ce.prep_time,onChange:e=>pe({...ce,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,g.jsx)(c.ZQ,{type:"number",value:ce.cook_time,onChange:e=>pe({...ce,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ge})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Description"}),(0,g.jsx)(c.Lz,{value:ce.description,onChange:e=>pe({...ce,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Cooking Instructions"}),(0,g.jsx)(c.Lz,{value:ce.instructions,onChange:e=>pe({...ce,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ge,style:{minHeight:"100px"}})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(q,{children:"Ingredients"}),(0,g.jsx)(M,{children:xe.map((e,r)=>(0,g.jsxs)(Q,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Ingredient"}),(0,g.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>Oe(r,"ingredient_id",parseInt(e.target.value)),required:!ge,disabled:ge,children:[(0,g.jsx)("option",{value:0,children:"Select ingredient..."}),W.map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(e.unit_cost,t||"USD"),"/",e.unit,")"]},e.id))]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Quantity"}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Oe(r,"quantity",e.target.value),placeholder:"0",required:!ge,disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit"}),(0,g.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>Oe(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ge,disabled:ge})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Notes"}),(0,g.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>Oe(r,"notes",e.target.value),placeholder:"Optional",disabled:ge})]}),!ge&&(0,g.jsx)(N,{type:"button",onClick:()=>(e=>{ue(xe.filter((r,n)=>n!==e))})(r),children:"\xd7"})]},r))}),!ge&&(0,g.jsx)(P,{type:"button",onClick:()=>{ue([...xe,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),xe.length>0&&(0,g.jsxs)(U,{children:[(0,g.jsx)(L,{children:"Total Ingredient Cost"}),(0,g.jsx)(Z,{children:(0,x.vv)(xe.reduce((e,r)=>{const n=W.find(e=>e.id===r.ingredient_id);return n&&r.quantity?e+parseFloat(r.quantity)*parseFloat(n.unit_cost.toString()):e},0),t||"USD")})]})]}),$e&&(0,g.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:$e}),(0,g.jsxs)(Y,{children:[(0,g.jsx)(c.yl,{type:"button",variant:"secondary",onClick:De,children:ge?"Close":"Cancel"}),!ge&&(0,g.jsx)(c.yl,{type:"submit",variant:"primary",children:te?"Update Recipe":"Create Recipe"}),ge&&(null===e||void 0===e?void 0:e.restaurant_id)&&te&&(0,g.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{De(),Ie(te)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})}),(0,g.jsx)(u.A,{isOpen:ye,title:"Delete Recipe",message:"Are you sure you want to delete this recipe?",onConfirm:async()=>{if(fe){be(!1);try{let r="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=`/api/brands/${me}/recipes/${fe}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/recipes/${fe}`);const n=await fetch(r,{method:"DELETE"});(await n.json()).success&&Re()}catch(r){console.error("Failed to delete recipe:",r),Fe("Failed to delete recipe")}finally{je(null)}}},onCancel:()=>{be(!1),je(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,g.jsx)(u.A,{isOpen:Ce,title:"Register as Menu Item",message:`Register "${null===Ae||void 0===Ae?void 0:Ae.name}" as a menu item?`,onConfirm:async()=>{if(Ae&&null!==e&&void 0!==e&&e.restaurant_id){ke(!1);try{const r=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Ae.name,description:Ae.description||"",price:Ae.suggested_price||0,category:Ae.category,emoji:Ae.emoji||"",restaurant_id:e.restaurant_id,recipe_id:Ae.id})}),n=await r.json();n.success||Be(n.error||"Failed to register menu item")}catch(r){console.error("Failed to register menu:",r),Be("Failed to register menu item")}finally{_e(null)}}},onCancel:()=>{ke(!1),_e(null)},confirmText:"Register",cancelText:"Cancel",type:"info"})]})}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var i=n(4752),t=n(9610),a=n(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
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
`,x=e=>{let{isOpen:r,title:n,message:i,onConfirm:x,onCancel:u,confirmText:g="Confirm",cancelText:h="Cancel",type:m="warning"}=e;return r?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:n}),(0,a.jsx)(l,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:h}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:g})]})]})}):null}}}]);