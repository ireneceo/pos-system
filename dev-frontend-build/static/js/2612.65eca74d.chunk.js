"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2612],{2488:(e,n,r)=>{r.d(n,{DO:()=>l,Jt:()=>c,Qn:()=>s});r(9950);var t=r(4752),i=r(4414);const a=t.Ay.div`
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
`,o=t.Ay.input`
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
`,d=t.Ay.select`
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
`,s=e=>{let{children:n,className:r,style:t,...o}=e;return(0,i.jsx)(a,{className:r,style:t,...o,children:n})},l=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(o,{placeholder:n,...r})},c=e=>{let{children:n,...r}=e;return(0,i.jsx)(d,{...r,children:n})}},2612:(e,n,r)=>{r.r(n),r.d(n,{default:()=>E});var t=r(9950),i=r(4752),a=r(3705),o=r(7960),d=r(2488),s=r(1367),l=r(9610),c=r(4021),p=r(6038),x=r(4414);const u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,h=i.Ay.div`
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
`,g=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,m=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  margin: 12px 0;
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,f=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,j=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,C=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #4F46E5; }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover { background: #FCA5A5; }\n        ";default:return"\n          background: #F3F4F6;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,F=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,A=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,k=(i.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
`,i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`),_=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,E=()=>{const{user:e}=(0,s.As)(),{defaultCurrency:n,supportedCurrencies:r}=(0,c.i1)(),[i,E]=(0,t.useState)(""),[B,S]=(0,t.useState)([]),[$,z]=(0,t.useState)(!0),[D,I]=(0,t.useState)(""),[R,Q]=(0,t.useState)("all"),[M,O]=(0,t.useState)(null),[U,N]=(0,t.useState)(!1),[T,Z]=(0,t.useState)({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"});(0,t.useEffect)(()=>{n&&!i&&E(n)},[n,i]),(0,t.useEffect)(()=>{L()},[e]);const L=async()=>{try{z(!0);let n="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?e.brand_id&&(n=`/api/brands/${e.brand_id}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(n=`/api/restaurants/${e.restaurant_id}/ingredients`),!n)return void z(!1);const r=await fetch(n),t=await r.json();t.success&&S(t.data)}catch(n){console.error("Failed to fetch ingredients:",n)}finally{z(!1)}},G=e=>{var n;e?(O(e),Z({code:e.code||"",name:e.name,category:e.category,unit:e.unit,unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:(null===(n=e.min_stock)||void 0===n?void 0:n.toString())||"0"})):(O(null),Z({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}));N(!0)},q=()=>{N(!1),O(null),Z({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"})},J=B.filter(e=>{const n=e.name.toLowerCase().includes(D.toLowerCase()),r="all"===R||e.category===R;return n&&r}),Y=["all",...Array.from(new Set(B.map(e=>e.category)))],P=B.filter(e=>e.is_active).length,W=B.length>0?B.reduce((e,n)=>e+Number(n.unit_cost),0)/B.length:0;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"Ingredients"}),(0,x.jsx)(o.ex,{children:(0,x.jsx)(a.cc,{variant:"primary",onClick:()=>G(null),children:"New Ingredient"})})]}),(0,x.jsxs)(o.MD,{children:[(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Total Ingredients"}),(0,x.jsx)(o.Os,{children:B.length}),(0,x.jsxs)(o.d1,{children:[P," active"]})]}),(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Average Cost"}),(0,x.jsx)(o.Os,{children:(0,p.vv)(W,i||"USD")}),(0,x.jsx)(o.d1,{children:"per unit"})]}),(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Categories"}),(0,x.jsx)(o.Os,{children:Y.length-1}),(0,x.jsx)(o.d1,{children:"ingredient types"})]})]}),(0,x.jsxs)(d.Qn,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search ingredients...",value:D,onChange:e=>I(e.target.value)}),(0,x.jsx)(d.Jt,{value:R,onChange:e=>Q(e.target.value),children:Y.map(e=>(0,x.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,x.jsx)(d.Jt,{value:i,onChange:e=>E(e.target.value),style:{minWidth:"140px"},children:r.map(e=>(0,x.jsxs)("option",{value:e,children:[(0,p.Qn)(e)," ",e]},e))})]}),(0,x.jsx)(o.UC,{children:$?(0,x.jsx)(A,{children:(0,x.jsx)(k,{children:"Loading..."})}):0===J.length?(0,x.jsxs)(A,{children:[(0,x.jsx)(k,{children:"No ingredients found"}),(0,x.jsx)(_,{children:D||"all"!==R?"Try adjusting your filters":"Create your first ingredient to get started"}),!D&&"all"===R&&(0,x.jsx)(a.cc,{variant:"primary",onClick:()=>G(null),children:"Create First Ingredient"})]}):(0,x.jsx)(u,{children:J.map(n=>(0,x.jsxs)(h,{isActive:n.is_active,children:[(0,x.jsx)(g,{children:(0,x.jsxs)("div",{children:[(0,x.jsx)(m,{children:n.name}),(0,x.jsx)(b,{children:n.category})]})}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(y,{children:[(0,x.jsx)(f,{children:"Unit Cost"}),(0,x.jsx)(j,{children:(0,p.vv)(n.unit_cost,i||"USD")})]}),(0,x.jsxs)(y,{children:[(0,x.jsx)(f,{children:"Unit"}),(0,x.jsx)(j,{children:n.unit})]}),n.supplier_name&&(0,x.jsxs)(y,{children:[(0,x.jsx)(f,{children:"Supplier"}),(0,x.jsx)(j,{children:n.supplier_name})]}),n.code&&(0,x.jsxs)(y,{children:[(0,x.jsx)(f,{children:"Code"}),(0,x.jsx)(j,{children:n.code})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(C,{variant:"secondary",onClick:()=>G(n),children:"Edit"}),(0,x.jsx)(C,{variant:"danger",onClick:()=>(async n=>{if(window.confirm("\uc815\ub9d0 \uc774 \uc7ac\ub8cc\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))try{let r="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=`/api/brands/${null===e||void 0===e?void 0:e.brand_id}/ingredients/${n}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/ingredients/${n}`);const t=await fetch(r,{method:"DELETE"});(await t.json()).success&&(alert("\uc7ac\ub8cc\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),L())}catch(r){console.error("Failed to delete ingredient:",r),alert("\uc7ac\ub8cc \uc0ad\uc81c \uc2e4\ud328")}})(n.id),children:"Delete"})]})]},n.id))})})]}),(0,x.jsx)(l.aF,{isOpen:U,onClose:q,title:M?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,x.jsxs)("form",{onSubmit:async n=>{if(n.preventDefault(),T.name&&T.category&&T.unit&&T.unit_cost)try{let n="";const r=M?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?n=M?`/api/brands/${e.brand_id}/ingredients/${M.id}`:`/api/brands/${e.brand_id}/ingredients`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(n=M?`/api/restaurants/${e.restaurant_id}/ingredients/${M.id}`:`/api/restaurants/${e.restaurant_id}/ingredients`);const t=await fetch(n,{method:r,headers:{"Content-Type":"application/json"},body:JSON.stringify({...T,unit_cost:parseFloat(T.unit_cost),min_stock:parseInt(T.min_stock)||0})}),i=await t.json();i.success?(alert(M?"\uc7ac\ub8cc\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4":"\uc7ac\ub8cc\uac00 \uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),q(),L()):alert(i.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(r){console.error("Failed to save ingredient:",r),alert("\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}else alert("\ubaa8\ub4e0 \ud544\uc218 \ud56d\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Ingredient Name *"}),(0,x.jsx)(l.ZQ,{type:"text",value:T.name,onChange:e=>Z({...T,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Code"}),(0,x.jsx)(l.ZQ,{type:"text",value:T.code,onChange:e=>Z({...T,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Category *"}),(0,x.jsx)(l.ZQ,{type:"text",value:T.category,onChange:e=>Z({...T,category:e.target.value}),placeholder:"e.g., Grains",required:!0})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Supplier"}),(0,x.jsx)(l.ZQ,{type:"text",value:T.supplier_name,onChange:e=>Z({...T,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Unit *"}),(0,x.jsx)(l.ZQ,{type:"text",value:T.unit,onChange:e=>Z({...T,unit:e.target.value}),placeholder:"kg, g, L, ml",required:!0})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsxs)(l.lR,{children:["Unit Cost (",(0,p.Qn)(i||"USD"),") *"]}),(0,x.jsx)(l.ZQ,{type:"number",step:"0.01",value:T.unit_cost,onChange:e=>Z({...T,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Minimum Stock"}),(0,x.jsx)(l.ZQ,{type:"number",value:T.min_stock,onChange:e=>Z({...T,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(l.yl,{type:"button",variant:"secondary",onClick:q,children:"Cancel"}),(0,x.jsx)(l.yl,{type:"submit",variant:"primary",children:M?"Update Ingredient":"Create Ingredient"})]})]})})]})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
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
`;t.Ay.select`
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
`,t.Ay.input`
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
`,t.Ay.div`
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
`},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),i=r(1367),a=r(6038);const o=()=>{const{user:e}=(0,i.As)(),[n,r]=(0,t.useState)("RM"),[o,d]=(0,t.useState)(Object.keys(a.DL)),[s,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=t>=0?n[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(t)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:s,error:c}}}}]);