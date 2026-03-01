"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2612],{2488:(e,r,n)=>{n.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>l});var t=n(8819),i=(n(9950),n(4752)),o=n(4414);const a=i.Ay.div`
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
`,s=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${t.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
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
`,d=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  &:disabled {
    background: ${t.w.colors.surfaceHover};
    color: ${t.w.colors.text.muted};
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
`,l=e=>{let{children:r,className:n,style:t,...i}=e;return(0,o.jsx)(a,{className:n,style:t,...i,children:r})},c=e=>{let{placeholder:r="Search...",...n}=e;return(0,o.jsx)(s,{placeholder:r,...n})},p=e=>{let{children:r,...n}=e;return(0,o.jsx)(d,{...n,children:r})}},2612:(e,r,n)=>{n.r(r),n.d(r,{default:()=>z});var t=n(8819),i=n(9950),o=n(4752),a=n(3705),s=n(2674),d=n(2488),l=n(1367),c=n(9610),p=n(4021),x=n(6038),u=n(4414);const h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${t.w.colors.border};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: ${t.w.colors.primary};
  }
`,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,w=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin-bottom: 4px;
`,y=o.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: ${t.w.colors.primary};
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.div`
  margin: 12px 0;
`,f=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${t.w.colors.surfaceMuted};

  &:last-child {
    border-bottom: none;
  }
`,b=o.Ay.span`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
`,j=o.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
`,$=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,_=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return`\n          background: ${t.w.colors.primary};\n          color: white;\n          &:hover { background: #4F46E5; }\n        `;case"danger":return`\n          background: ${t.w.colors.status.errorLightAlt};\n          color: ${t.w.colors.danger};\n          &:hover { background: ${t.w.colors.dangerBorder}; }\n        `;default:return`\n          background: ${t.w.colors.surfaceMuted};\n          color: ${t.w.colors.text.dark};\n          &:hover { background: ${t.w.colors.borderLight}; }\n        `}}}
`,k=o.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,C=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,A=(o.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
`,o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin-bottom: 8px;
`),S=o.Ay.p`
  font-size: 14px;
  color: ${t.w.colors.text.muted};
  margin-bottom: 24px;
`,z=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:r,supportedCurrencies:n}=(0,p.i1)(),[t,o]=(0,i.useState)(""),[z,E]=(0,i.useState)([]),[R,I]=(0,i.useState)(!0),[F,L]=(0,i.useState)(""),[M,D]=(0,i.useState)("all"),[Q,O]=(0,i.useState)(null),[U,N]=(0,i.useState)(!1),[B,T]=(0,i.useState)({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"});(0,i.useEffect)(()=>{r&&!t&&o(r)},[r,t]),(0,i.useEffect)(()=>{Z()},[e]);const Z=async()=>{try{I(!0);let r="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?e.brand_id&&(r=`/api/brands/${e.brand_id}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(r=`/api/restaurants/${e.restaurant_id}/ingredients`),!r)return void I(!1);const n=await fetch(r),t=await n.json();t.success&&E(t.data)}catch(r){console.error("Failed to fetch ingredients:",r)}finally{I(!1)}},G=e=>{var r;e?(O(e),T({code:e.code||"",name:e.name,category:e.category,unit:e.unit,unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:(null===(r=e.min_stock)||void 0===r?void 0:r.toString())||"0"})):(O(null),T({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}));N(!0)},q=()=>{N(!1),O(null),T({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"})},H=z.filter(e=>{const r=e.name.toLowerCase().includes(F.toLowerCase()),n="all"===M||e.category===M;return r&&n}),J=["all",...Array.from(new Set(z.map(e=>e.category)))],P=z.filter(e=>e.is_active).length,Y=z.length>0?z.reduce((e,r)=>e+Number(r.unit_cost),0)/z.length:0;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(s.mc,{children:[(0,u.jsxs)(s.Y9,{children:[(0,u.jsx)(s.hE,{children:"Ingredients"}),(0,u.jsx)(s.ex,{children:(0,u.jsx)(a.cc,{variant:"primary",onClick:()=>G(null),children:"New Ingredient"})})]}),(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Total Ingredients"}),(0,u.jsx)(s.Os,{children:z.length}),(0,u.jsxs)(s.d1,{children:[P," active"]})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Average Cost"}),(0,u.jsx)(s.Os,{children:(0,x.vv)(Y,t||"USD")}),(0,u.jsx)(s.d1,{children:"per unit"})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Categories"}),(0,u.jsx)(s.Os,{children:J.length-1}),(0,u.jsx)(s.d1,{children:"ingredient types"})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search ingredients...",value:F,onChange:e=>L(e.target.value)}),(0,u.jsx)(d.Jt,{value:M,onChange:e=>D(e.target.value),children:J.map(e=>(0,u.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,u.jsx)(d.Jt,{value:t,onChange:e=>o(e.target.value),style:{minWidth:"140px"},children:n.map(e=>(0,u.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,u.jsx)(s.UC,{children:R?(0,u.jsx)(C,{children:(0,u.jsx)(A,{children:"Loading..."})}):0===H.length?(0,u.jsxs)(C,{children:[(0,u.jsx)(A,{children:"No ingredients found"}),(0,u.jsx)(S,{children:F||"all"!==M?"Try adjusting your filters":"Create your first ingredient to get started"}),!F&&"all"===M&&(0,u.jsx)(a.cc,{variant:"primary",onClick:()=>G(null),children:"Create First Ingredient"})]}):(0,u.jsx)(h,{children:H.map(r=>(0,u.jsxs)(g,{isActive:r.is_active,children:[(0,u.jsx)(m,{children:(0,u.jsxs)("div",{children:[(0,u.jsx)(w,{children:r.name}),(0,u.jsx)(y,{children:r.category})]})}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{children:"Unit Cost"}),(0,u.jsx)(j,{children:(0,x.vv)(r.unit_cost,t||"USD")})]}),(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{children:"Unit"}),(0,u.jsx)(j,{children:r.unit})]}),r.supplier_name&&(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{children:"Supplier"}),(0,u.jsx)(j,{children:r.supplier_name})]}),r.code&&(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{children:"Code"}),(0,u.jsx)(j,{children:r.code})]})]}),(0,u.jsxs)($,{children:[(0,u.jsx)(_,{variant:"secondary",onClick:()=>G(r),children:"Edit"}),(0,u.jsx)(_,{variant:"danger",onClick:()=>(async r=>{if(window.confirm("\uc815\ub9d0 \uc774 \uc7ac\ub8cc\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))try{let n="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?n=`/api/brands/${null===e||void 0===e?void 0:e.brand_id}/ingredients/${r}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(n=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/ingredients/${r}`);const t=await fetch(n,{method:"DELETE"});(await t.json()).success&&(alert("\uc7ac\ub8cc\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),Z())}catch(n){console.error("Failed to delete ingredient:",n),alert("\uc7ac\ub8cc \uc0ad\uc81c \uc2e4\ud328")}})(r.id),children:"Delete"})]})]},r.id))})})]}),(0,u.jsx)(c.aF,{isOpen:U,onClose:q,title:Q?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,u.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),B.name&&B.category&&B.unit&&B.unit_cost)try{let r="";const n=Q?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=Q?`/api/brands/${e.brand_id}/ingredients/${Q.id}`:`/api/brands/${e.brand_id}/ingredients`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=Q?`/api/restaurants/${e.restaurant_id}/ingredients/${Q.id}`:`/api/restaurants/${e.restaurant_id}/ingredients`);const t=await fetch(r,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify({...B,unit_cost:parseFloat(B.unit_cost),min_stock:parseInt(B.min_stock)||0})}),i=await t.json();i.success?(alert(Q?"\uc7ac\ub8cc\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4":"\uc7ac\ub8cc\uac00 \uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),q(),Z()):alert(i.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(n){console.error("Failed to save ingredient:",n),alert("\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}else alert("\ubaa8\ub4e0 \ud544\uc218 \ud56d\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Ingredient Name *"}),(0,u.jsx)(c.ZQ,{type:"text",value:B.name,onChange:e=>T({...B,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Code"}),(0,u.jsx)(c.ZQ,{type:"text",value:B.code,onChange:e=>T({...B,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Category *"}),(0,u.jsx)(c.ZQ,{type:"text",value:B.category,onChange:e=>T({...B,category:e.target.value}),placeholder:"e.g., Grains",required:!0})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Supplier"}),(0,u.jsx)(c.ZQ,{type:"text",value:B.supplier_name,onChange:e=>T({...B,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Unit *"}),(0,u.jsx)(c.ZQ,{type:"text",value:B.unit,onChange:e=>T({...B,unit:e.target.value}),placeholder:"kg, g, L, ml",required:!0})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Unit Cost (",(0,x.Qn)(t||"USD"),") *"]}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",value:B.unit_cost,onChange:e=>T({...B,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Minimum Stock"}),(0,u.jsx)(c.ZQ,{type:"number",value:B.min_stock,onChange:e=>T({...B,min_stock:e.target.value}),placeholder:"0"})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(c.yl,{type:"button",variant:"secondary",onClick:q,children:"Cancel"}),(0,u.jsx)(c.yl,{type:"submit",variant:"primary",children:Q?"Update Ingredient":"Create Ingredient"})]})]})})]})}},3705:(e,r,n)=>{n.d(r,{cc:()=>o.$n});var t=n(8819),i=n(4752),o=n(8829);i.Ay.select`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${t.w.colors.surface};
  border-radius: ${t.w.borderRadius.md};
  border: 1px solid ${t.w.colors.borderLight};
  padding: ${t.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${t.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${t.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${t.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,r,n)=>{n.d(r,{i1:()=>a});var t=n(9950),i=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[r,n]=(0,t.useState)("RM"),[a,s]=(0,t.useState)(Object.keys(o.DL)),[d,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let i=t>=0?r[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(t)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:d,error:c}}}}]);