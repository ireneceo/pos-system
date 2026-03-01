"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>X});var r=n(8819),i=n(9950),s=n(4752),o=n(1367),a=n(4021),l=n(6038),d=n(2674),c=n(4414);const p=s.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=s.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,x=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,h=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,g=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${e=>"primary"===e.variant?`\n    background: ${r.w.colors.primary};\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  `:`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${r.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,j=s.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,v=s.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,y=s.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,f=s.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`,b=s.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,w=s.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,D=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,A=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,C=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,F=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,S=s.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,$=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${r.w.colors.border};
  overflow: hidden;
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  background: ${r.w.colors.surfaceHover};
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: ${r.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1400px) {
    display: none;
  }
`,E=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`,B=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,z=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,L=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.type){case"percentage":return"#DBEAFE";case"fixed_amount":return"#D1FAE5";case"bogo":return"#FEF3C7";case"free_shipping":return"#E0E7FF";case"happy_hour":return"#FCE7F3";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"percentage":return"#1E40AF";case"fixed_amount":return"#065F46";case"bogo":return"#92400E";case"free_shipping":return"#3730A3";case"happy_hour":return"#BE185D";default:return"#6B7280"}}};
`,O=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"scheduled":return"#FEF3C7";case"paused":default:return"#F3F4F6";case"expired":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"scheduled":return"#D97706";case"paused":default:return"#6B7280";case"expired":return"#DC2626"}}};
`,P=s.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: ${r.w.colors.text.dark};
`,T=s.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,_=s.Ay.button`
  padding: 4px 8px;
  background: transparent;
  border: 1px solid ${r.w.colors.border};
  border-radius: 4px;
  color: ${r.w.colors.text.muted};
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${r.w.colors.primary};
    color: ${r.w.colors.primary};
    background: #F4F3FF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
`,M=s.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,V=s.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,N=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,U=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,W=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${r.w.colors.text.dark};
  margin-bottom: 8px;
`,H=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,I=s.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,G=s.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`,J=s.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
`,Q=s.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,q=s.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,K=s.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,X=()=>{const{user:e}=(0,o.As)(),[t,n]=(0,i.useState)("all"),[r,s]=(0,i.useState)(""),[X,Z]=(0,i.useState)("all"),[ee,te]=(0,i.useState)("all"),[ne,re]=(0,i.useState)("name"),[ie,se]=(0,i.useState)([]),[oe,ae]=(0,i.useState)([]),[le,de]=(0,i.useState)(null),[ce,pe]=(0,i.useState)(!1),[ue,xe]=(0,i.useState)(!1),[he,me]=(0,i.useState)(null),{defaultCurrency:ge}=(0,a.i1)(),[je,ve]=(0,i.useState)("RM");(0,i.useEffect)(()=>{ge&&ve(ge)},[ge]);const[ye,fe]=(0,i.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[be]=(0,i.useState)([]);(0,i.useEffect)(()=>{se([])},[]),(0,i.useEffect)(()=>{let e=ie;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),r){const t=r.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==X&&(e=e.filter(e=>e.type===X)),"all"!==ee&&(e=e.filter(e=>e.status===ee)),e.sort((e,t)=>{switch(ne){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),ae(e)},[ie,t,r,X,ee,ne]);const we={totalPromotions:ie.length,activePromotions:ie.filter(e=>"active"===e.status).length,usedThisMonth:ie.reduce((e,t)=>{const n=new Date,r=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=r?e+t.usageCount:e},0),totalRevenue:ie.reduce((e,t)=>e+t.generatedRevenue,0)},De=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},Ae=e=>{de(e),pe(!0)},Ce=()=>{me(null),fe({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),xe(!0)},Fe=e=>{var t,n,r;me(e),fe({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(r=e.maxDiscount)||void 0===r?void 0:r.toString())||"",description:e.description}),xe(!0)},Se=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};se([...ie,t])},$e=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Promotions"}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(g,{variant:"secondary",onClick:()=>{var n;const r={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=be.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:we.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:oe.map(e=>({name:e.name,type:De(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},i=`Promotion Export - ${r.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${r.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+r.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),s=new Blob([i],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(s),o.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,o.click()},children:[(0,c.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,c.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,c.jsx)(g,{variant:"primary",onClick:Ce,children:"Add Promotion"})]})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{value:t,onChange:e=>n(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Restaurants"}),be.map(e=>(0,c.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"\ud83d\udd0d"}),(0,c.jsx)(f,{type:"text",placeholder:"Search promotions by name, description...",value:r,onChange:e=>s(e.target.value)})]}),(0,c.jsxs)(v,{value:X,onChange:e=>Z(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Types"}),(0,c.jsx)("option",{value:"percentage",children:"Percentage"}),(0,c.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,c.jsx)("option",{value:"bogo",children:"BOGO"}),(0,c.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,c.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,c.jsxs)(v,{value:ee,onChange:e=>te(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,c.jsx)("option",{value:"paused",children:"Paused"}),(0,c.jsx)("option",{value:"expired",children:"Expired"})]}),(0,c.jsxs)(v,{value:ne,onChange:e=>re(e.target.value),children:[(0,c.jsx)("option",{value:"name",children:"Sort by Name"}),(0,c.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,c.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,c.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(A,{color:"#059669",children:[(0,c.jsx)(C,{children:"Total Promotions"}),(0,c.jsx)(F,{children:we.totalPromotions}),(0,c.jsx)(S,{positive:!0,children:"All restaurants combined"})]}),(0,c.jsxs)(A,{color:"#2563EB",children:[(0,c.jsx)(C,{children:"Active Promotions"}),(0,c.jsx)(F,{children:we.activePromotions}),(0,c.jsx)(S,{positive:!0,children:"Currently running"})]}),(0,c.jsxs)(A,{color:"#7C3AED",children:[(0,c.jsx)(C,{children:"Used This Month"}),(0,c.jsx)(F,{children:we.usedThisMonth}),(0,c.jsx)(S,{positive:!0,children:"Promotion activations"})]}),(0,c.jsxs)(A,{color:"#D97706",children:[(0,c.jsx)(C,{children:"Generated Revenue"}),(0,c.jsx)(F,{children:(0,l.vv)(we.totalRevenue,je)}),(0,c.jsx)(S,{positive:!0,children:"From all promotions"})]})]}),(0,c.jsxs)($,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{children:"Promotion"}),(0,c.jsx)("span",{children:"Type"}),(0,c.jsx)("span",{children:"Restaurants"}),(0,c.jsx)("span",{children:"Dates"}),(0,c.jsx)("span",{children:"Usage"}),(0,c.jsx)("span",{children:"Revenue"}),(0,c.jsx)("span",{children:"Status"}),(0,c.jsx)("span",{children:"Actions"})]}),0===oe.length?(0,c.jsxs)(Q,{children:[(0,c.jsx)(q,{children:"\ud83c\udfaf"}),(0,c.jsx)(K,{children:r||"all"!==X||"all"!==ee||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,c.jsx)(g,{variant:"primary",onClick:Ce,children:"Create First Promotion"})]}):(0,c.jsxs)(c.Fragment,{children:[oe.map(e=>(0,c.jsxs)(E,{onClick:()=>Ae(e),children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{children:e.name}),(0,c.jsx)(L,{children:e.discountText})]}),(0,c.jsx)(R,{type:e.type,children:De(e.type)}),(0,c.jsx)(P,{children:(0,c.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,c.jsxs)(P,{children:[(0,c.jsx)("div",{children:$e(e.startDate)}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",$e(e.endDate)]})]}),(0,c.jsxs)(P,{children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,c.jsx)(P,{style:{color:"#059669",fontWeight:"600"},children:(0,l.vv)(e.generatedRevenue,je)}),(0,c.jsx)(O,{status:e.status,children:e.status}),(0,c.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,c.jsx)(_,{onClick:()=>Fe(e),children:"Edit"}),(0,c.jsx)(_,{onClick:()=>Se(e),children:"Copy"}),(0,c.jsx)(_,{onClick:()=>{return t=e.id,void se(ie.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,c.jsx)(M,{children:oe.map(e=>(0,c.jsxs)(V,{onClick:()=>Ae(e),children:[(0,c.jsxs)(N,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{children:e.name}),(0,c.jsx)(L,{children:e.discountText})]}),(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,c.jsx)(R,{type:e.type,children:De(e.type)}),(0,c.jsx)(O,{status:e.status,children:e.status})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsxs)("span",{children:[e.usageCount," used"]}),(0,c.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,l.vv)(e.generatedRevenue,je)}),(0,c.jsx)("span",{children:$e(e.endDate)})]})]},e.id))})]})]})]}),(0,c.jsx)(d.mH,{isOpen:ce,children:(0,c.jsxs)(d.$m,{children:[(0,c.jsxs)(d.rQ,{children:[(0,c.jsx)(d.wt,{children:"Promotion Details"}),(0,c.jsx)(d.Jn,{onClick:()=>pe(!1),children:"\xd7"})]}),le&&(0,c.jsxs)(d.cw,{children:[(0,c.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,c.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:le.name}),(0,c.jsx)(R,{type:le.type,children:De(le.type)}),(0,c.jsx)(O,{status:le.status,children:le.status})]}),(0,c.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:le.description})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Discount:"})," ",le.discountText]}),(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Min Order:"})," ",le.minOrderAmount?(0,l.vv)(le.minOrderAmount,je):"No minimum"]}),(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Max Discount:"})," ",le.maxDiscount?(0,l.vv)(le.maxDiscount,je):"No limit"]})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Usage:"})," ",le.usageCount," / ",le.usageLimit||"\u221e"]}),(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Revenue:"})," ",(0,l.vv)(le.generatedRevenue,je)]}),(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Created:"})," ",$e(le.createdDate)]})]})]})]}),(0,c.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,c.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,c.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,c.jsx)("strong",{children:"From:"})," ",$e(le.startDate)," ",(0,c.jsx)("br",{}),(0,c.jsx)("strong",{children:"To:"})," ",$e(le.endDate)]})]}),(0,c.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,c.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,c.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:le.restaurantNames.map((e,t)=>(0,c.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),le.conditions.length>0&&(0,c.jsxs)("div",{children:[(0,c.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,c.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:le.conditions.map((e,t)=>(0,c.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]}),(0,c.jsxs)(d.jl,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>pe(!1),children:"Close"}),le&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{pe(!1),Fe(le)},children:"Edit Promotion"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{pe(!1),Se(le)},children:"Duplicate"})]})]})]})}),(0,c.jsx)(d.mH,{isOpen:ue,children:(0,c.jsxs)(d.$m,{style:{maxWidth:"800px"},children:[(0,c.jsxs)(d.rQ,{children:[(0,c.jsx)(d.wt,{children:he?"Edit Promotion":"Create New Promotion"}),(0,c.jsx)(d.Jn,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,c.jsxs)(d.cw,{children:[(0,c.jsxs)(d.fh,{children:[(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Promotion Name *"}),(0,c.jsx)(H,{type:"text",value:ye.name,onChange:e=>fe({...ye,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Promotion Type *"}),(0,c.jsxs)(I,{value:ye.type,onChange:e=>fe({...ye,type:e.target.value}),children:[(0,c.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,c.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,c.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,c.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,c.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,c.jsxs)(d.fh,{children:[(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Discount Value *"}),(0,c.jsx)(H,{type:"number",value:ye.discountValue,onChange:e=>fe({...ye,discountValue:e.target.value}),placeholder:"percentage"===ye.type?"15":"10",step:"percentage"===ye.type?"1":"0.01"})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Minimum Order Amount"}),(0,c.jsx)(H,{type:"number",value:ye.minOrderAmount,onChange:e=>fe({...ye,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,c.jsxs)(d.fh,{children:[(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Start Date *"}),(0,c.jsx)(H,{type:"date",value:ye.startDate,onChange:e=>fe({...ye,startDate:e.target.value})})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"End Date *"}),(0,c.jsx)(H,{type:"date",value:ye.endDate,onChange:e=>fe({...ye,endDate:e.target.value})})]})]}),(0,c.jsxs)(d.fh,{children:[(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Usage Limit (Optional)"}),(0,c.jsx)(H,{type:"number",value:ye.usageLimit,onChange:e=>fe({...ye,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Maximum Discount Amount"}),(0,c.jsx)(H,{type:"number",value:ye.maxDiscount,onChange:e=>fe({...ye,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Apply to Restaurants *"}),(0,c.jsx)(Y,{children:be.map(e=>(0,c.jsxs)(J,{children:[(0,c.jsx)("input",{type:"checkbox",checked:ye.restaurants.includes(e.id),onChange:t=>{t.target.checked?fe({...ye,restaurants:[...ye.restaurants,e.id]}):fe({...ye,restaurants:ye.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(W,{children:"Description"}),(0,c.jsx)(G,{value:ye.description,onChange:e=>fe({...ye,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]}),(0,c.jsxs)(d.jl,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{const e="percentage"===ye.type?`${ye.discountValue}% off`:"fixed_amount"===ye.type?`${(0,l.vv)(ye.discountValue,je)} off`:"bogo"===ye.type?`BOGO ${ye.discountValue}% off`:"free_shipping"===ye.type?"Free delivery":`${ye.discountValue}% off (Happy Hour)`,t=be.filter(e=>ye.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===he||void 0===he?void 0:he.id)||`promo-${Date.now()}`,name:ye.name,type:ye.type,discountValue:parseFloat(ye.discountValue),discountText:e,restaurants:ye.restaurants,restaurantNames:t,startDate:ye.startDate,endDate:ye.endDate,usageCount:(null===he||void 0===he?void 0:he.usageCount)||0,usageLimit:ye.usageLimit?parseInt(ye.usageLimit):null,minOrderAmount:ye.minOrderAmount?parseFloat(ye.minOrderAmount):null,maxDiscount:ye.maxDiscount?parseFloat(ye.maxDiscount):null,status:"active",createdDate:(null===he||void 0===he?void 0:he.createdDate)||(new Date).toISOString().split("T")[0],description:ye.description,conditions:[],generatedRevenue:(null===he||void 0===he?void 0:he.generatedRevenue)||0};se(he?ie.map(e=>e.id===he.id?n:e):[...ie,n]),xe(!1)},disabled:!ye.name.trim()||!ye.discountValue,children:he?"Update Promotion":"Create Promotion"})]})]})})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var r=n(9950),i=n(1367),s=n(6038);const o=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[o,a]=(0,r.useState)(Object.keys(s.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(r)}else n("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:c}}}}]);