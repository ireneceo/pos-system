"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var r=t(4752),i=t(4414);const a=r.Ay.div`
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
`,s=r.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:r,...o}=e;return(0,i.jsx)(a,{className:t,style:r,...o,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,i.jsx)(o,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,i.jsx)(s,{...t,children:n})}},5684:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ce});var r=t(9950),i=t(4752),a=t(3310),o=t(2674),s=t(2488),l=t(1367),d=t(6038),c=t(4414);const p={name:"",description:"",subscription_fee:"0",revenue_percentage:"0",rent_type:"none",rent_fixed:"0",rent_percentage:"0",billing_cycle:"monthly",auto_generate:!0,tax_rate:"6",currency:"MYR"},x=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,h=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  transition: all 0.2s;
  opacity: ${e=>!1===e.isActive?.6:1};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,u=i.Ay.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #F0F2F5;
`,g=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,f=i.Ay.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,m=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,y=i.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 0;
  line-height: 1.5;
`,v=i.Ay.div`
  padding: 20px 24px;
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`,b=i.Ay.div`
  background: #F8FAFC;
  padding: 12px;
  border-radius: 8px;
`,A=i.Ay.div`
  font-size: 11px;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
`,_=i.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,w=i.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 2px;
`,F=i.Ay.div`
  background: #FFF7ED;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #FED7AA;
`,C=i.Ay.div`
  font-size: 11px;
  color: #9A3412;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
  margin-bottom: 6px;
`,k=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 600;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;

  &:not(:last-child) {
    border-bottom: 1px solid #F0F2F5;
  }
`,z=i.Ay.span`
  color: #6B7C93;
`,S=i.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,B=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 10px 12px;
  background: #FFF7ED;
  border-radius: 8px;
  font-size: 13px;
  color: #C2410C;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #FFEDD5;
  }
`,$=i.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid #F0F2F5;
`,R=i.Ay.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #EA580C;\n    color: white;\n    border-color: #EA580C;\n    &:hover { background: #C2410C; }\n  ":"danger"===e.variant?"\n    background: white;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEF2F2; }\n  ":"\n    background: white;\n    color: #374151;\n    border-color: #D1D5DB;\n    &:hover { background: #F9FAFB; }\n  "}
`,D=i.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,T=i.Ay.div`
  background: white;
  border-radius: 16px;
  width: 95%;
  max-width: 640px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`,P=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`,M=i.Ay.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,N=i.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover { color: #0A2540; }
`,L=i.Ay.div`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
`,O=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,I=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,U=i.Ay.div`
  margin-bottom: 16px;
  ${e=>e.fullWidth&&"grid-column: 1 / -1;"}
`,W=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,Y=i.Ay.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }

  &::placeholder { color: #9CA3AF; }
`,J=i.Ay.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`,G=i.Ay.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #EA580C;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`,K=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,Q=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 20px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,X=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,H=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,q=i.Ay.div`
  font-size: 16px;
  color: #6B7C93;
  margin-bottom: 8px;
`,V=i.Ay.div`
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 20px;
`,Z=i.Ay.div`
  max-height: 400px;
  overflow-y: auto;
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${e=>e.selected?"#EA580C":"#E6EBF1"};
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.selected?"#FFF7ED":"white"};

  &:hover {
    border-color: #EA580C;
    background: ${e=>e.selected?"#FFF7ED":"#FFFBF5"};
  }
`,ne=i.Ay.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,te=i.Ay.div`
  flex: 1;
`,re=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ie=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,ae=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: #FFEDD5;
  color: #C2410C;
`,oe=i.Ay.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,se=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 8px;
`,le=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #374151;
  padding: 4px 0;
`,de=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid #BBF7D0;
`,ce=()=>{var e,n;const{user:t}=(0,l.As)(),[i,ce]=(0,r.useState)([]),[pe,xe]=(0,r.useState)([]),[he,ue]=(0,r.useState)(!0),[ge,fe]=(0,r.useState)(""),[me,ye]=(0,r.useState)("all"),[ve,je]=(0,r.useState)(null),[be,Ae]=(0,r.useState)(!1),[_e,we]=(0,r.useState)(!1),[Fe,Ce]=(0,r.useState)(!1),[ke,Ee]=(0,r.useState)(null),[ze,Se]=(0,r.useState)(null),[Be,$e]=(0,r.useState)(null),[Re,De]=(0,r.useState)({...p}),[Te,Pe]=(0,r.useState)(!1),[Me,Ne]=(0,r.useState)([]),Le=localStorage.getItem("auth_token");(0,r.useEffect)(()=>{null!==t&&void 0!==t&&t.foodcourt_id&&je(Number(t.foodcourt_id))},[t]);const Oe=(0,r.useCallback)(async()=>{if(ve){ue(!0);try{const e=await fetch(`/api/foodcourts/${ve}/plans`,{headers:{Authorization:`Bearer ${Le}`}});if(e.ok){const n=await e.json();ce(n.data||[])}}catch(e){console.error("Error fetching plans:",e)}finally{ue(!1)}}},[ve,Le]),Ie=(0,r.useCallback)(async()=>{if(ve)try{const e=await fetch(`/api/foodcourts/${ve}/restaurants`,{headers:{Authorization:`Bearer ${Le}`}});if(e.ok){const n=await e.json();xe(n.data||[])}}catch(e){console.error("Error fetching restaurants:",e)}},[ve,Le]);(0,r.useEffect)(()=>{ve&&(Oe(),Ie())},[ve,Oe,Ie]);const Ue=i.filter(e=>{const n=e.name.toLowerCase().includes(ge.toLowerCase())||(e.description||"").toLowerCase().includes(ge.toLowerCase()),t="all"===me||("active"===me?e.is_active:!e.is_active);return n&&t}),We=i.length,Ye=i.filter(e=>e.is_active).length,Je=i.reduce((e,n)=>{var t,r;return e+((null===(t=n.planRestaurants)||void 0===t||null===(r=t.filter(e=>e.is_active))||void 0===r?void 0:r.length)||0)},0),Ge=()=>{Ee(null),De({...p}),Ae(!0)},Ke=e=>{Ne(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])},Qe=e=>{switch(e.rent_type){case"fixed":return`${(0,d.vv)(parseFloat(e.rent_fixed),e.currency)} / month`;case"percentage":return`${e.rent_percentage}% of revenue`;case"combined":return`MAX(${(0,d.vv)(parseFloat(e.rent_fixed),e.currency)}, ${e.rent_percentage}%)`;default:return"None"}};return t?(0,c.jsxs)(a.A,{children:[(0,c.jsxs)(o.mc,{children:[(0,c.jsxs)(o.Y9,{children:[(0,c.jsx)(o.hE,{children:"Foodcourt Plans"}),(0,c.jsxs)(o.ex,{children:[(0,c.jsx)(o.$n,{variant:"secondary",onClick:()=>{if(0===i.length)return;const e=(ge||"all"!==me?Ue:i).map(e=>{var n,t;return[`"${e.name}"`,`"${(e.description||"").replace(/"/g,'""')}"`,parseFloat(e.subscription_fee||"0").toFixed(2),e.revenue_percentage||"0",e.rent_type||"none",parseFloat(e.rent_fixed||"0").toFixed(2),e.rent_percentage||"0",e.billing_cycle||"monthly",e.currency||"MYR",e.tax_rate||"0",e.auto_generate?"Yes":"No",e.is_active?"Active":"Inactive",(null===(n=e.planRestaurants)||void 0===n||null===(t=n.filter(e=>e.is_active))||void 0===t?void 0:t.length)||0]}),n=[["Plan Name","Description","Management Fee","Revenue %","Rent Type","Rent Fixed","Rent %","Billing Cycle","Currency","Tax Rate","Auto Generate","Status","Tenants"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob([n],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=`foodcourt-plans-${(new Date).toISOString().split("T")[0]}.csv`,r.click(),URL.revokeObjectURL(r.href)},children:"Export"}),(0,c.jsx)(o.$n,{onClick:Ge,children:"+ New Plan"})]})]}),(0,c.jsxs)(o.UC,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#059669",children:[(0,c.jsx)(o.Os,{children:We}),(0,c.jsx)(o.v0,{children:"Total Plans"}),(0,c.jsxs)(o.d1,{children:[Ye," active"]})]}),(0,c.jsxs)(o.hI,{color:"#2563EB",children:[(0,c.jsx)(o.Os,{children:Ye}),(0,c.jsx)(o.v0,{children:"Active Plans"}),(0,c.jsxs)(o.d1,{children:[We>0?Math.round(Ye/We*100):0,"% available"]})]}),(0,c.jsxs)(o.hI,{color:"#7C3AED",children:[(0,c.jsx)(o.Os,{children:Je}),(0,c.jsx)(o.v0,{children:"Assigned Tenants"}),(0,c.jsx)(o.d1,{children:"With plan assigned"})]}),(0,c.jsxs)(o.hI,{color:"#D97706",children:[(0,c.jsx)(o.Os,{children:pe.length}),(0,c.jsx)(o.v0,{children:"Foodcourt Tenants"}),(0,c.jsx)(o.d1,{children:"Total in foodcourt"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{placeholder:"Search plans...",value:ge,onChange:e=>fe(e.target.value)}),(0,c.jsxs)(s.Jt,{value:me,onChange:e=>ye(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),he?(0,c.jsx)(X,{children:(0,c.jsx)(q,{children:"Loading plans..."})}):0===Ue.length?(0,c.jsxs)(X,{children:[(0,c.jsx)(H,{children:"\ud83d\udccb"}),(0,c.jsx)(q,{children:ge||"all"!==me?"No plans match your filters":"No foodcourt plans yet"}),(0,c.jsx)(V,{children:"Create your first plan to start managing tenant fees, rent and revenue sharing"}),!ge&&"all"===me&&(0,c.jsx)(o.$n,{onClick:Ge,children:"+ Create First Plan"})]}):(0,c.jsx)(x,{children:Ue.map(e=>{const n=(e.planRestaurants||[]).filter(e=>e.is_active);return(0,c.jsxs)(h,{isActive:e.is_active,children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)(g,{children:[(0,c.jsx)(f,{children:e.name}),(0,c.jsx)(m,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,c.jsx)(y,{children:e.description})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(A,{children:"Management Fee"}),(0,c.jsx)(_,{children:(0,d.vv)(parseFloat(e.subscription_fee),e.currency)}),(0,c.jsxs)(w,{children:["/ ",e.billing_cycle]})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(A,{children:"Revenue Share"}),(0,c.jsx)(_,{children:parseFloat(e.revenue_percentage)>0?`${e.revenue_percentage}%`:"-"}),(0,c.jsx)(w,{children:parseFloat(e.revenue_percentage)>0?"of monthly revenue":"Not applied"})]})]}),"none"!==e.rent_type&&(0,c.jsxs)(F,{children:[(0,c.jsx)(C,{children:"Rent / Lease"}),(0,c.jsx)(k,{children:Qe(e)})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(z,{children:"Billing Cycle"}),(0,c.jsx)(S,{style:{textTransform:"capitalize"},children:e.billing_cycle})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(z,{children:"Auto Invoice"}),(0,c.jsx)(S,{children:e.auto_generate?"Enabled":"Disabled"})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(z,{children:"Tax Rate"}),(0,c.jsxs)(S,{children:[e.tax_rate,"%"]})]}),(0,c.jsxs)(B,{onClick:()=>(e=>{$e(e);const n=(e.planRestaurants||[]).filter(e=>e.is_active).map(e=>e.restaurant_id);Ne(n),Ce(!0)})(e),children:[(0,c.jsxs)("span",{children:[n.length," tenant(s) assigned"]}),(0,c.jsx)("span",{style:{marginLeft:"auto",fontSize:"12px"},children:"Manage \u2192"})]})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(R,{variant:"primary",onClick:()=>(e=>{Ee(e),De({name:e.name,description:e.description||"",subscription_fee:e.subscription_fee||"0",revenue_percentage:e.revenue_percentage||"0",rent_type:e.rent_type||"none",rent_fixed:e.rent_fixed||"0",rent_percentage:e.rent_percentage||"0",billing_cycle:e.billing_cycle||"monthly",auto_generate:e.auto_generate,tax_rate:e.tax_rate||"6",currency:e.currency||"MYR"}),Ae(!0)})(e),children:"Edit"}),(0,c.jsx)(R,{variant:"secondary",onClick:()=>(async e=>{if(ve)try{await fetch(`/api/foodcourts/${ve}/plans/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Le}`},body:JSON.stringify({is_active:!e.is_active})}),Oe()}catch(n){console.error("Error toggling plan:",n)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,c.jsx)(R,{variant:"danger",onClick:()=>{Se(e),we(!0)},children:"Delete"})]})]},e.id)})})]})]}),be&&(0,c.jsx)(D,{onClick:()=>Ae(!1),children:(0,c.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(P,{children:[(0,c.jsx)(M,{children:ke?"Edit Plan":"Create New Plan"}),(0,c.jsx)(N,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(I,{children:[(0,c.jsxs)(U,{fullWidth:!0,children:[(0,c.jsx)(W,{children:"Plan Name *"}),(0,c.jsx)(Y,{placeholder:"e.g., Standard Tenant Plan",value:Re.name,onChange:e=>De({...Re,name:e.target.value})})]}),(0,c.jsxs)(U,{fullWidth:!0,children:[(0,c.jsx)(W,{children:"Description"}),(0,c.jsx)(J,{placeholder:"Brief description of this plan...",value:Re.description,onChange:e=>De({...Re,description:e.target.value})})]}),(0,c.jsx)(Q,{style:{gridColumn:"1 / -1",marginTop:"8px"},children:"Fee Structure"}),(0,c.jsxs)(U,{children:[(0,c.jsxs)(W,{children:["Management Fee (",Re.currency,")"]}),(0,c.jsx)(Y,{type:"number",min:"0",step:"0.01",placeholder:"0.00",value:Re.subscription_fee,onChange:e=>De({...Re,subscription_fee:e.target.value})})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"Revenue Share (%)"}),(0,c.jsx)(Y,{type:"number",min:"0",max:"100",step:"0.01",placeholder:"0.00",value:Re.revenue_percentage,onChange:e=>De({...Re,revenue_percentage:e.target.value})})]}),(0,c.jsx)(Q,{style:{gridColumn:"1 / -1"},children:"Rent / Lease"}),(0,c.jsxs)(U,{fullWidth:!0,children:[(0,c.jsx)(W,{children:"Rent Type"}),(0,c.jsxs)(G,{value:Re.rent_type,onChange:e=>De({...Re,rent_type:e.target.value}),children:[(0,c.jsx)("option",{value:"none",children:"No Rent"}),(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount"}),(0,c.jsx)("option",{value:"percentage",children:"Revenue Percentage"}),(0,c.jsx)("option",{value:"combined",children:"Combined (MAX of fixed, percentage)"})]})]}),("fixed"===Re.rent_type||"combined"===Re.rent_type)&&(0,c.jsxs)(U,{children:[(0,c.jsxs)(W,{children:["Fixed Rent (",Re.currency,")"]}),(0,c.jsx)(Y,{type:"number",min:"0",step:"0.01",placeholder:"0.00",value:Re.rent_fixed,onChange:e=>De({...Re,rent_fixed:e.target.value})})]}),("percentage"===Re.rent_type||"combined"===Re.rent_type)&&(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"Rent Percentage (%)"}),(0,c.jsx)(Y,{type:"number",min:"0",max:"100",step:"0.01",placeholder:"0.00",value:Re.rent_percentage,onChange:e=>De({...Re,rent_percentage:e.target.value})})]}),(0,c.jsx)(Q,{style:{gridColumn:"1 / -1"},children:"Billing Settings"}),(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"Billing Cycle"}),(0,c.jsxs)(G,{value:Re.billing_cycle,onChange:e=>De({...Re,billing_cycle:e.target.value}),children:[(0,c.jsx)("option",{value:"monthly",children:"Monthly"}),(0,c.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"Tax Rate (%)"}),(0,c.jsx)(Y,{type:"number",min:"0",max:"100",step:"0.01",value:Re.tax_rate,onChange:e=>De({...Re,tax_rate:e.target.value})})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"Currency"}),(0,c.jsxs)(G,{value:Re.currency,onChange:e=>De({...Re,currency:e.target.value}),children:[(0,c.jsx)("option",{value:"MYR",children:"MYR (RM)"}),(0,c.jsx)("option",{value:"USD",children:"USD ($)"}),(0,c.jsx)("option",{value:"KRW",children:"KRW (Won)"}),(0,c.jsx)("option",{value:"SGD",children:"SGD (S$)"})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(W,{children:"\xa0"}),(0,c.jsxs)(K,{children:[(0,c.jsx)("input",{type:"checkbox",checked:Re.auto_generate,onChange:e=>De({...Re,auto_generate:e.target.checked}),style:{width:"16px",height:"16px"}}),"Auto-generate invoices"]})]})]}),(0,c.jsxs)(oe,{children:[(0,c.jsx)(se,{children:"Estimated Monthly Charge (per tenant, RM 50,000 revenue)"}),(()=>{const e=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e4;const t=parseFloat(e.subscription_fee)||0,r=n*((parseFloat(e.revenue_percentage)||0)/100);let i=0;const a=parseFloat(e.rent_fixed)||0,o=parseFloat(e.rent_percentage)||0;switch(e.rent_type){case"fixed":i=a;break;case"percentage":i=n*(o/100);break;case"combined":i=Math.max(a,n*(o/100))}const s=t+r+i,l=s*((parseFloat(e.tax_rate)||0)/100);return{fee:t,royalty:r,rent:i,subtotal:s,tax:l,total:s+l}}(Re,5e4);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(le,{children:[(0,c.jsx)("span",{children:"Management Fee"}),(0,c.jsx)("span",{children:(0,d.vv)(e.fee,Re.currency)})]}),e.royalty>0&&(0,c.jsxs)(le,{children:[(0,c.jsxs)("span",{children:["Revenue Share (",Re.revenue_percentage,"%)"]}),(0,c.jsx)("span",{children:(0,d.vv)(e.royalty,Re.currency)})]}),e.rent>0&&(0,c.jsxs)(le,{children:[(0,c.jsxs)("span",{children:["Rent (",Re.rent_type,")"]}),(0,c.jsx)("span",{children:(0,d.vv)(e.rent,Re.currency)})]}),(0,c.jsxs)(le,{children:[(0,c.jsxs)("span",{children:["Tax (",Re.tax_rate,"%)"]}),(0,c.jsx)("span",{children:(0,d.vv)(e.tax,Re.currency)})]}),(0,c.jsxs)(de,{children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,d.vv)(e.total,Re.currency)})]})]})})()]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,c.jsx)(R,{variant:"primary",onClick:async()=>{if(ve&&Re.name.trim()){Pe(!0);try{const e=ke?`/api/foodcourts/${ve}/plans/${ke.id}`:`/api/foodcourts/${ve}/plans`,n=ke?"PUT":"POST";(await fetch(e,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${Le}`},body:JSON.stringify({name:Re.name,description:Re.description||null,subscription_fee:parseFloat(Re.subscription_fee)||0,revenue_percentage:parseFloat(Re.revenue_percentage)||0,rent_type:Re.rent_type,rent_fixed:parseFloat(Re.rent_fixed)||0,rent_percentage:parseFloat(Re.rent_percentage)||0,billing_cycle:Re.billing_cycle,auto_generate:Re.auto_generate,tax_rate:parseFloat(Re.tax_rate)||0,currency:Re.currency})})).ok&&(Ae(!1),Oe())}catch(e){console.error("Error saving plan:",e)}finally{Pe(!1)}}},disabled:Te||!Re.name.trim(),children:Te?"Saving...":ke?"Update Plan":"Create Plan"})]})]})}),_e&&ze&&(0,c.jsx)(D,{onClick:()=>we(!1),children:(0,c.jsxs)(T,{onClick:e=>e.stopPropagation(),style:{maxWidth:"420px"},children:[(0,c.jsxs)(P,{children:[(0,c.jsx)(M,{children:"Delete Plan"}),(0,c.jsx)(N,{onClick:()=>we(!1),children:"\xd7"})]}),(0,c.jsx)(L,{children:(0,c.jsxs)("p",{style:{color:"#374151",fontSize:"14px",lineHeight:1.6},children:["Are you sure you want to delete ",(0,c.jsx)("strong",{children:ze.name}),"?",((null===(e=ze.planRestaurants)||void 0===e||null===(n=e.filter(e=>e.is_active))||void 0===n?void 0:n.length)||0)>0&&" This plan has active tenant assignments. Please unassign all tenants first."]})}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,c.jsx)(R,{variant:"danger",onClick:async()=>{if(ve&&ze)try{const e=await fetch(`/api/foodcourts/${ve}/plans/${ze.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${Le}`}});if(e.ok)we(!1),Se(null),Oe();else{const n=await e.json();alert(n.message||"Failed to delete plan")}}catch(e){console.error("Error deleting plan:",e)}},children:"Delete Plan"})]})]})}),Fe&&Be&&(0,c.jsx)(D,{onClick:()=>Ce(!1),children:(0,c.jsxs)(T,{onClick:e=>e.stopPropagation(),style:{maxWidth:"560px"},children:[(0,c.jsxs)(P,{children:[(0,c.jsxs)(M,{children:["Manage Tenants - ",Be.name]}),(0,c.jsx)(N,{onClick:()=>Ce(!1),children:"\xd7"})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)("p",{style:{fontSize:"13px",color:"#6B7C93",marginBottom:"16px"},children:["Select tenants to assign to this plan. ",Me.length," selected."]}),(0,c.jsx)(Z,{children:0===pe.length?(0,c.jsx)(X,{style:{padding:"30px"},children:(0,c.jsx)(q,{children:"No tenants in this foodcourt"})}):pe.map(e=>{const n=Me.includes(e.id),t=i.find(n=>{var t;return n.id!==Be.id&&(null===(t=n.planRestaurants)||void 0===t?void 0:t.some(n=>n.restaurant_id===e.id&&n.is_active))});return(0,c.jsxs)(ee,{selected:n,onClick:()=>Ke(e.id),children:[(0,c.jsx)(ne,{type:"checkbox",checked:n,onChange:()=>Ke(e.id)}),(0,c.jsxs)(te,{children:[(0,c.jsx)(re,{children:e.name}),(0,c.jsxs)(ie,{children:[e.status," ",e.address&&`| ${e.address}`]})]}),t&&(0,c.jsx)(ae,{children:t.name})]},e.id)})})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{variant:"secondary",onClick:()=>Ce(!1),children:"Cancel"}),(0,c.jsx)(R,{variant:"primary",onClick:async()=>{if(ve&&Be){Pe(!0);try{const e=(Be.planRestaurants||[]).filter(e=>e.is_active).map(e=>e.restaurant_id),n=Me.filter(n=>!e.includes(n)),t=e.filter(e=>!Me.includes(e));n.length>0&&await fetch(`/api/foodcourts/${ve}/plans/${Be.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Le}`},body:JSON.stringify({restaurant_ids:n})});for(const r of t)await fetch(`/api/foodcourts/${ve}/plans/${Be.id}/restaurants/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${Le}`}});Ce(!1),$e(null),Oe()}catch(e){console.error("Error saving restaurant assignments:",e)}finally{Pe(!1)}}},disabled:Te,children:Te?"Saving...":"Save Assignments"})]})]})})]}):null}}}]);