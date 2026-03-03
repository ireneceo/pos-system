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
`,s=e=>{let{children:n,className:r,style:t,...o}=e;return(0,i.jsx)(a,{className:r,style:t,...o,children:n})},l=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(o,{placeholder:n,...r})},c=e=>{let{children:n,...r}=e;return(0,i.jsx)(d,{...r,children:n})}},2612:(e,n,r)=>{r.r(n),r.d(n,{default:()=>B});var t=r(9950),i=r(4752),a=r(2853),o=r(3705),d=r(8409),s=r(2488),l=r(1367),c=r(9610),p=r(4021),x=r(6038),u=r(7617),h=r(4414);const g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,m=i.Ay.div`
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
`,b=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,y=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  margin: 12px 0;
`,j=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,w=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,C=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,A=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #4F46E5; }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover { background: #FCA5A5; }\n        ";default:return"\n          background: #F3F4F6;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,k=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,E=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,_=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,B=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:n,supportedCurrencies:r}=(0,p.i1)(),[i,B]=(0,t.useState)(""),[S,z]=(0,t.useState)([]),[$,D]=(0,t.useState)(!0),[I,R]=(0,t.useState)(""),[T,O]=(0,t.useState)("all"),[Q,M]=(0,t.useState)(null),[U,N]=(0,t.useState)(!1),[Z,L]=(0,t.useState)({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}),[q,G]=(0,t.useState)(!1),[Y,J]=(0,t.useState)(null),[P,H]=(0,t.useState)(null),[W,K]=(0,t.useState)(null);(0,t.useEffect)(()=>{n&&!i&&B(n)},[n,i]),(0,t.useEffect)(()=>{V()},[e]);const V=async()=>{try{D(!0);let n="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?e.brand_id&&(n=`/api/brands/${e.brand_id}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(n=`/api/restaurants/${e.restaurant_id}/ingredients`),!n)return void D(!1);const r=await fetch(n),t=await r.json();t.success&&z(t.data)}catch(n){console.error("Failed to fetch ingredients:",n)}finally{D(!1)}},X=e=>{var n;(K(null),e)?(M(e),L({code:e.code||"",name:e.name,category:e.category,unit:e.unit,unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:(null===(n=e.min_stock)||void 0===n?void 0:n.toString())||"0"})):(M(null),L({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}));N(!0)},ee=()=>{N(!1),M(null),L({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"})},ne=S.filter(e=>{const n=e.name.toLowerCase().includes(I.toLowerCase()),r="all"===T||e.category===T;return n&&r}),re=["all",...Array.from(new Set(S.map(e=>e.category)))],te=S.filter(e=>e.is_active).length,ie=S.length>0?S.reduce((e,n)=>e+Number(n.unit_cost),0)/S.length:0;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.mc,{children:[(0,h.jsxs)(d.Y9,{children:[(0,h.jsx)(d.hE,{children:"Ingredients"}),(0,h.jsx)(d.ex,{children:(0,h.jsx)(o.cc,{variant:"primary",onClick:()=>X(null),children:"New Ingredient"})})]}),(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.v0,{children:"Total Ingredients"}),(0,h.jsx)(d.Os,{children:S.length}),(0,h.jsxs)(d.d1,{children:[te," active"]})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.v0,{children:"Average Cost"}),(0,h.jsx)(d.Os,{children:(0,x.vv)(ie,i||"USD")}),(0,h.jsx)(d.d1,{children:"per unit"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.v0,{children:"Categories"}),(0,h.jsx)(d.Os,{children:re.length-1}),(0,h.jsx)(d.d1,{children:"ingredient types"})]})]}),(0,h.jsxs)(s.Qn,{children:[(0,h.jsx)(s.DO,{type:"text",placeholder:"Search ingredients...",value:I,onChange:e=>R(e.target.value)}),(0,h.jsx)(s.Jt,{value:T,onChange:e=>O(e.target.value),children:re.map(e=>(0,h.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,h.jsx)(s.Jt,{value:i,onChange:e=>B(e.target.value),style:{minWidth:"140px"},children:r.map(e=>(0,h.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,h.jsxs)(d.UC,{children:[P&&(0,h.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[P,(0,h.jsx)("button",{onClick:()=>H(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),$?(0,h.jsx)(a.pp,{children:(0,h.jsx)(E,{children:"Loading..."})}):0===ne.length?(0,h.jsxs)(a.pp,{children:[(0,h.jsx)(E,{children:"No ingredients found"}),(0,h.jsx)(_,{children:I||"all"!==T?"Try adjusting your filters":"Create your first ingredient to get started"}),!I&&"all"===T&&(0,h.jsx)(o.cc,{variant:"primary",onClick:()=>X(null),children:"Create First Ingredient"})]}):(0,h.jsx)(g,{children:ne.map(e=>(0,h.jsxs)(m,{isActive:e.is_active,children:[(0,h.jsx)(b,{children:(0,h.jsxs)("div",{children:[(0,h.jsx)(y,{children:e.name}),(0,h.jsx)(v,{children:e.category})]})}),(0,h.jsxs)(f,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Unit Cost"}),(0,h.jsx)(C,{children:(0,x.vv)(e.unit_cost,i||"USD")})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Unit"}),(0,h.jsx)(C,{children:e.unit})]}),e.supplier_name&&(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Supplier"}),(0,h.jsx)(C,{children:e.supplier_name})]}),e.code&&(0,h.jsxs)(j,{children:[(0,h.jsx)(w,{children:"Code"}),(0,h.jsx)(C,{children:e.code})]})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{variant:"secondary",onClick:()=>X(e),children:"Edit"}),(0,h.jsx)(A,{variant:"danger",onClick:()=>{return n=e.id,H(null),J(n),void G(!0);var n},children:"Delete"})]})]},e.id))})]})]}),(0,h.jsx)(c.aF,{isOpen:U,onClose:ee,title:Q?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,h.jsxs)("form",{onSubmit:async n=>{if(n.preventDefault(),K(null),Z.name&&Z.category&&Z.unit&&Z.unit_cost)try{let n="";const r=Q?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?n=Q?`/api/brands/${e.brand_id}/ingredients/${Q.id}`:`/api/brands/${e.brand_id}/ingredients`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(n=Q?`/api/restaurants/${e.restaurant_id}/ingredients/${Q.id}`:`/api/restaurants/${e.restaurant_id}/ingredients`);const t=await fetch(n,{method:r,headers:{"Content-Type":"application/json"},body:JSON.stringify({...Z,unit_cost:parseFloat(Z.unit_cost),min_stock:parseInt(Z.min_stock)||0})}),i=await t.json();i.success?(ee(),V()):K(i.error||"Failed to save ingredient")}catch(r){console.error("Failed to save ingredient:",r),K("Failed to save ingredient")}else K("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Z.name,onChange:e=>L({...Z,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Code"}),(0,h.jsx)(c.ZQ,{type:"text",value:Z.code,onChange:e=>L({...Z,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Z.category,onChange:e=>L({...Z,category:e.target.value}),placeholder:"e.g., Grains",required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Supplier"}),(0,h.jsx)(c.ZQ,{type:"text",value:Z.supplier_name,onChange:e=>L({...Z,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Z.unit,onChange:e=>L({...Z,unit:e.target.value}),placeholder:"kg, g, L, ml",required:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Unit Cost (",(0,x.Qn)(i||"USD"),") *"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:Z.unit_cost,onChange:e=>L({...Z,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Minimum Stock"}),(0,h.jsx)(c.ZQ,{type:"number",value:Z.min_stock,onChange:e=>L({...Z,min_stock:e.target.value}),placeholder:"0"})]}),W&&(0,h.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:W}),(0,h.jsxs)(k,{children:[(0,h.jsx)(c.yl,{type:"button",variant:"secondary",onClick:ee,children:"Cancel"}),(0,h.jsx)(c.yl,{type:"submit",variant:"primary",children:Q?"Update Ingredient":"Create Ingredient"})]})]})}),(0,h.jsx)(u.A,{isOpen:q,title:"Delete Ingredient",message:"Are you sure you want to delete this ingredient?",onConfirm:async()=>{if(Y){G(!1);try{let n="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?n=`/api/brands/${null===e||void 0===e?void 0:e.brand_id}/ingredients/${Y}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(n=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/ingredients/${Y}`);const r=await fetch(n,{method:"DELETE"});(await r.json()).success&&V()}catch(n){console.error("Failed to delete ingredient:",n),H("Failed to delete ingredient")}finally{J(null)}}},onCancel:()=>{G(!1),J(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
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
`},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),i=r(1367),a=r(6038);const o=()=>{const{user:e}=(0,i.As)(),[n,r]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(a.DL)),[d,s]=(0,t.useState)(!0),[l,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=t>=0?n[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void s(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(t)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("RM")}finally{s(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:d,error:l}}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var t=r(4752),i=r(9610),a=r(4414);const o=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:t,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(s,{children:r}),(0,a.jsx)(l,{children:t})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}}}]);