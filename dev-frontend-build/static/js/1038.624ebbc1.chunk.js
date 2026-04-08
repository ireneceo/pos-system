"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ne});var a=n(9950),r=n(4752),i=n(8409),o=n(2853),s=n(1367),d=n(4021),l=n(6038),c=n(7617),p=n(5030),x=n(4414);const u=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,m=r.Ay.div`
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
`,g=r.Ay.div`
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
`,h=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,y=r.Ay.button`
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
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=r.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,j=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,b=r.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,P=r.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #E6EBF1;
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
`,F=r.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,w=r.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,A=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,D=r.Ay.div`
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
`,C=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,B=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,E=r.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,S=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1400px) {
    display: none;
  }
`,z=r.Ay.div`
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
`,$=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,R=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,O=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,L=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.type){case"percentage":return"#DBEAFE";case"fixed_amount":return"#D1FAE5";case"bogo":return"#FEF3C7";case"free_shipping":return"#E0E7FF";case"happy_hour":return"#FCE7F3";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"percentage":return"#1E40AF";case"fixed_amount":return"#065F46";case"bogo":return"#92400E";case"free_shipping":return"#3730A3";case"happy_hour":return"#BE185D";default:return"#6B7280"}}};
`,T=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"scheduled":return"#FEF3C7";case"paused":default:return"#F3F4F6";case"expired":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"scheduled":return"#D97706";case"paused":default:return"#6B7280";case"expired":return"#DC2626"}}};
`,_=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,M=r.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,N=r.Ay.button`
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  color: #6B7280;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,V=r.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,W=r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,I=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,U=r.Ay.div`
  flex: 1;
  min-height: 12px;
`,Y=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,H=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,G=r.Ay.div`
  margin-bottom: 20px;
`,q=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,J=r.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,K=r.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Q=r.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,X=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`,Z=r.Ay.label`
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
`,ee=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,te=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,ne=()=>{const{t:e}=(0,p.Bd)("admin"),{user:t}=(0,s.As)(),[n,r]=(0,a.useState)("all"),[ne,ae]=(0,a.useState)(""),[re,ie]=(0,a.useState)("all"),[oe,se]=(0,a.useState)("all"),[de,le]=(0,a.useState)("name"),[ce,pe]=(0,a.useState)([]),[xe,ue]=(0,a.useState)([]),[me,ge]=(0,a.useState)(null),[he,ve]=(0,a.useState)(!1),[ye,fe]=(0,a.useState)(!1),[je,be]=(0,a.useState)(null),{defaultCurrency:Pe}=(0,d.i1)(),[Fe,we]=(0,a.useState)("RM");(0,a.useEffect)(()=>{Pe&&we(Pe)},[Pe]);const[Ae,De]=(0,a.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[Ce]=(0,a.useState)([]),[Be,Ee]=(0,a.useState)(!1),[Se,ke]=(0,a.useState)("");(0,a.useEffect)(()=>{pe([])},[]),(0,a.useEffect)(()=>{let e=ce;if("all"!==n&&(e=e.filter(e=>e.restaurants.includes(n))),ne){const t=ne.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==re&&(e=e.filter(e=>e.type===re)),"all"!==oe&&(e=e.filter(e=>e.status===oe)),e.sort((e,t)=>{switch(de){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),ue(e)},[ce,n,ne,re,oe,de]);const ze={totalPromotions:ce.length,activePromotions:ce.filter(e=>"active"===e.status).length,usedThisMonth:ce.reduce((e,t)=>{const n=new Date,a=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=a?e+t.usageCount:e},0),totalRevenue:ce.reduce((e,t)=>e+t.generatedRevenue,0)},$e=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},Re=e=>{ge(e),ve(!0)},Oe=()=>{be(null),De({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),fe(!0)},Le=e=>{var t,n,a;be(e),De({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(a=e.maxDiscount)||void 0===a?void 0:a.toString())||"",description:e.description}),fe(!0)},Te=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};pe([...ce,t])},_e=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(m,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(h,{children:e("admin:managerPromotionsPage.promotions")}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(y,{variant:"secondary",onClick:()=>{var e;const a={exportDate:(new Date).toISOString(),restaurant:"all"===n?"All Restaurants":null===(e=Ce.find(e=>e.id===n))||void 0===e?void 0:e.name,totalPromotions:ze.totalPromotions,manager:null===t||void 0===t?void 0:t.name,promotions:xe.map(e=>({name:e.name,type:$e(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},r=`Promotion Export - ${a.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${a.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+a.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),i=new Blob([r],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(i),o.download=`promotions-export-${n}-${(new Date).toISOString().split("T")[0]}.csv`,o.click()},children:[(0,x.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,x.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,x.jsx)(y,{variant:"primary",onClick:Oe,children:"Add Promotion"})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsxs)(j,{value:n,onChange:e=>r(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:managerPromotionsPage.allRestaurants")}),Ce.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(F,{children:"\ud83d\udd0d"}),(0,x.jsx)(P,{type:"text",placeholder:"Search promotions by name, description...",value:ne,onChange:e=>ae(e.target.value)})]}),(0,x.jsxs)(j,{value:re,onChange:e=>ie(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:managerPromotionsPage.allTypes")}),(0,x.jsx)("option",{value:"percentage",children:e("admin:managerPromotionsPage.percentage")}),(0,x.jsx)("option",{value:"fixed_amount",children:e("admin:managerPromotionsPage.fixedAmount")}),(0,x.jsx)("option",{value:"bogo",children:e("admin:managerPromotionsPage.bogo")}),(0,x.jsx)("option",{value:"free_shipping",children:e("admin:managerPromotionsPage.freeDelivery")}),(0,x.jsx)("option",{value:"happy_hour",children:e("admin:managerPromotionsPage.timeDiscount")})]}),(0,x.jsxs)(j,{value:oe,onChange:e=>se(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("admin:managerPromotionsPage.allStatus")}),(0,x.jsx)("option",{value:"active",children:e("admin:managerPromotionsPage.active")}),(0,x.jsx)("option",{value:"scheduled",children:e("admin:managerPromotionsPage.scheduled")}),(0,x.jsx)("option",{value:"paused",children:e("admin:managerPromotionsPage.paused")}),(0,x.jsx)("option",{value:"expired",children:e("admin:managerPromotionsPage.expired")})]}),(0,x.jsxs)(j,{value:de,onChange:e=>le(e.target.value),children:[(0,x.jsx)("option",{value:"name",children:e("admin:managerPromotionsPage.sortByName")}),(0,x.jsx)("option",{value:"startDate",children:e("admin:managerPromotionsPage.sortByStartDate")}),(0,x.jsx)("option",{value:"usageCount",children:e("admin:managerPromotionsPage.sortByUsage")}),(0,x.jsx)("option",{value:"revenue",children:e("admin:managerPromotionsPage.sortByRevenue")})]})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsxs)(A,{children:[(0,x.jsxs)(D,{color:"#059669",children:[(0,x.jsx)(C,{children:e("admin:managerPromotionsPage.totalPromotions")}),(0,x.jsx)(B,{children:ze.totalPromotions}),(0,x.jsx)(E,{positive:!0,children:e("admin:managerPromotionsPage.allRestaurantsCombined")})]}),(0,x.jsxs)(D,{color:"#2563EB",children:[(0,x.jsx)(C,{children:e("admin:managerPromotionsPage.activePromotions")}),(0,x.jsx)(B,{children:ze.activePromotions}),(0,x.jsx)(E,{positive:!0,children:e("admin:managerPromotionsPage.currentlyRunning")})]}),(0,x.jsxs)(D,{color:"#7C3AED",children:[(0,x.jsx)(C,{children:e("admin:managerPromotionsPage.usedThisMonth")}),(0,x.jsx)(B,{children:ze.usedThisMonth}),(0,x.jsx)(E,{positive:!0,children:e("admin:managerPromotionsPage.promotionActivations")})]}),(0,x.jsxs)(D,{color:"#D97706",children:[(0,x.jsx)(C,{children:e("admin:managerPromotionsPage.generatedRevenue")}),(0,x.jsx)(B,{children:(0,l.vv)(ze.totalRevenue,Fe)}),(0,x.jsx)(E,{positive:!0,children:e("admin:managerPromotionsPage.fromAllPromotions")})]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(k,{children:[(0,x.jsx)("span",{children:e("admin:managerPromotionsPage.promotion")}),(0,x.jsx)("span",{style:{textAlign:"center"},children:e("admin:managerPromotionsPage.type")}),(0,x.jsx)("span",{children:e("admin:managerPromotionsPage.restaurants")}),(0,x.jsx)("span",{style:{textAlign:"center"},children:e("admin:managerPromotionsPage.dates")}),(0,x.jsx)("span",{style:{textAlign:"right"},children:e("admin:managerPromotionsPage.usage")}),(0,x.jsx)("span",{style:{textAlign:"right"},children:e("admin:managerPromotionsPage.revenue")}),(0,x.jsx)("span",{style:{textAlign:"center"},children:e("admin:managerPromotionsPage.status")}),(0,x.jsx)("span",{children:e("admin:managerPromotionsPage.actions")})]}),0===xe.length?(0,x.jsxs)(o.pp,{children:[(0,x.jsx)(ee,{children:"\ud83c\udfaf"}),(0,x.jsx)(te,{children:ne||"all"!==re||"all"!==oe||"all"!==n?"No promotions found with the current filters":"No promotions created yet"}),(0,x.jsx)(y,{variant:"primary",onClick:Oe,children:"Create First Promotion"})]}):(0,x.jsxs)(x.Fragment,{children:[xe.map(t=>(0,x.jsxs)(z,{onClick:()=>Re(t),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:t.name}),(0,x.jsx)(O,{children:t.discountText})]}),(0,x.jsx)("div",{style:{textAlign:"center"},children:(0,x.jsx)(L,{type:t.type,children:$e(t.type)})}),(0,x.jsx)(_,{children:(0,x.jsx)("div",{style:{fontSize:"12px"},children:t.restaurantNames.length>2?`${t.restaurantNames.slice(0,2).join(", ")} +${t.restaurantNames.length-2}`:t.restaurantNames.join(", ")})}),(0,x.jsxs)(_,{style:{textAlign:"center"},children:[(0,x.jsx)("div",{children:_e(t.startDate)}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",_e(t.endDate)]})]}),(0,x.jsxs)(_,{style:{textAlign:"right"},children:[t.usageCount," / ",t.usageLimit||"\u221e"]}),(0,x.jsx)(_,{style:{color:"#059669",fontWeight:"600",textAlign:"right"},children:(0,l.vv)(t.generatedRevenue,Fe)}),(0,x.jsx)("div",{style:{textAlign:"center"},children:(0,x.jsx)(T,{status:t.status,children:t.status})}),(0,x.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(N,{onClick:()=>Le(t),children:e("admin:managerPromotionsPage.edit")}),(0,x.jsx)(N,{onClick:()=>Te(t),children:e("admin:managerPromotionsPage.copy")}),(0,x.jsx)(N,{onClick:()=>{return e=t.id,void pe(ce.map(t=>t.id===e?{...t,status:"active"===t.status?"paused":"active"}:t));var e},children:"active"===t.status?"Pause":"Activate"})]})]},t.id)),(0,x.jsx)(V,{children:xe.map(e=>(0,x.jsxs)(W,{onClick:()=>Re(e),children:[(0,x.jsxs)(I,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:e.name}),(0,x.jsx)(O,{children:e.discountText})]}),(0,x.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,x.jsx)(L,{type:e.type,children:$e(e.type)}),(0,x.jsx)(T,{status:e.status,children:e.status})]})]}),(0,x.jsx)(U,{}),(0,x.jsxs)(Y,{children:[(0,x.jsxs)("span",{children:[e.usageCount," used"]}),(0,x.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,l.vv)(e.generatedRevenue,Fe)}),(0,x.jsx)("span",{children:_e(e.endDate)})]})]},e.id))})]})]})]}),he&&(0,x.jsx)(i.aF,{isOpen:!0,onClose:()=>ve(!1),title:"Promotion Details",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(y,{variant:"secondary",onClick:()=>ve(!1),children:e("admin:managerPromotionsPage.close")}),me&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(y,{variant:"secondary",onClick:()=>{ve(!1),Le(me)},children:e("admin:managerPromotionsPage.editPromotion")}),(0,x.jsx)(y,{variant:"primary",onClick:()=>{ve(!1),Te(me)},children:e("admin:managerPromotionsPage.duplicate")})]})]}),children:me&&(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,x.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:me.name}),(0,x.jsx)(L,{type:me.type,children:$e(me.type)}),(0,x.jsx)(T,{status:me.status,children:me.status})]}),(0,x.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:me.description})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:e("admin:managerPromotionsPage.discountDetails")}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Discount:"})," ",me.discountText]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Min Order:"})," ",me.minOrderAmount?(0,l.vv)(me.minOrderAmount,Fe):"No minimum"]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Max Discount:"})," ",me.maxDiscount?(0,l.vv)(me.maxDiscount,Fe):"No limit"]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:e("admin:managerPromotionsPage.usagePerformance")}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Usage:"})," ",me.usageCount," / ",me.usageLimit||"\u221e"]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Revenue:"})," ",(0,l.vv)(me.generatedRevenue,Fe)]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"Created:"})," ",_e(me.createdDate)]})]})]})]}),(0,x.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:e("admin:managerPromotionsPage.validPeriod")}),(0,x.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,x.jsx)("strong",{children:"From:"})," ",_e(me.startDate)," ",(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"To:"})," ",_e(me.endDate)]})]}),(0,x.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:e("admin:managerPromotionsPage.appliedRestaurants")}),(0,x.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:me.restaurantNames.map((e,t)=>(0,x.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),me.conditions.length>0&&(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:e("admin:managerPromotionsPage.termsConditions")}),(0,x.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:me.conditions.map((e,t)=>(0,x.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]})}),ye&&(0,x.jsx)(i.aF,{isOpen:!0,onClose:()=>fe(!1),title:je?"Edit Promotion":"Create New Promotion",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(y,{variant:"secondary",onClick:()=>fe(!1),children:e("admin:managerPromotionsPage.cancel")}),(0,x.jsx)(y,{variant:"primary",onClick:()=>{const e="percentage"===Ae.type?`${Ae.discountValue}% off`:"fixed_amount"===Ae.type?`${(0,l.vv)(Ae.discountValue,Fe)} off`:"bogo"===Ae.type?`BOGO ${Ae.discountValue}% off`:"free_shipping"===Ae.type?"Free delivery":`${Ae.discountValue}% off (Happy Hour)`,t=Ce.filter(e=>Ae.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===je||void 0===je?void 0:je.id)||`promo-${Date.now()}`,name:Ae.name,type:Ae.type,discountValue:parseFloat(Ae.discountValue),discountText:e,restaurants:Ae.restaurants,restaurantNames:t,startDate:Ae.startDate,endDate:Ae.endDate,usageCount:(null===je||void 0===je?void 0:je.usageCount)||0,usageLimit:Ae.usageLimit?parseInt(Ae.usageLimit):null,minOrderAmount:Ae.minOrderAmount?parseFloat(Ae.minOrderAmount):null,maxDiscount:Ae.maxDiscount?parseFloat(Ae.maxDiscount):null,status:"active",createdDate:(null===je||void 0===je?void 0:je.createdDate)||(new Date).toISOString().split("T")[0],description:Ae.description,conditions:[],generatedRevenue:(null===je||void 0===je?void 0:je.generatedRevenue)||0};pe(je?ce.map(e=>e.id===je.id?n:e):[...ce,n]),fe(!1)},children:je?"Update Promotion":"Create Promotion"})]}),children:(0,x.jsxs)("div",{children:[(0,x.jsxs)(H,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"Promotion Name *"}),(0,x.jsx)(J,{type:"text",value:Ae.name,onChange:e=>De({...Ae,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"Promotion Type *"}),(0,x.jsxs)(K,{value:Ae.type,onChange:e=>De({...Ae,type:e.target.value}),children:[(0,x.jsx)("option",{value:"percentage",children:e("admin:managerPromotionsPage.percentageDiscount")}),(0,x.jsx)("option",{value:"fixed_amount",children:e("admin:managerPromotionsPage.fixedAmountDiscount")}),(0,x.jsx)("option",{value:"bogo",children:e("admin:managerPromotionsPage.buyOneGetOne")}),(0,x.jsx)("option",{value:"free_shipping",children:e("admin:managerPromotionsPage.freeDelivery")}),(0,x.jsx)("option",{value:"happy_hour",children:e("admin:managerPromotionsPage.happyHourTimebased")})]})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"Discount Value *"}),(0,x.jsx)(J,{type:"number",value:Ae.discountValue,onChange:e=>De({...Ae,discountValue:e.target.value}),placeholder:"percentage"===Ae.type?"15":"10",step:"percentage"===Ae.type?"1":"0.01"})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:e("admin:managerPromotionsPage.minimumOrderAmount")}),(0,x.jsx)(J,{type:"number",value:Ae.minOrderAmount,onChange:e=>De({...Ae,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"Start Date *"}),(0,x.jsx)(J,{type:"date",value:Ae.startDate,onChange:e=>De({...Ae,startDate:e.target.value})})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"End Date *"}),(0,x.jsx)(J,{type:"date",value:Ae.endDate,onChange:e=>De({...Ae,endDate:e.target.value})})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:e("admin:managerPromotionsPage.usageLimitOptional")}),(0,x.jsx)(J,{type:"number",value:Ae.usageLimit,onChange:e=>De({...Ae,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:e("admin:managerPromotionsPage.maximumDiscountAmount")}),(0,x.jsx)(J,{type:"number",value:Ae.maxDiscount,onChange:e=>De({...Ae,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:"Apply to Restaurants *"}),(0,x.jsx)(X,{children:Ce.map(e=>(0,x.jsxs)(Z,{children:[(0,x.jsx)("input",{type:"checkbox",checked:Ae.restaurants.includes(e.id),onChange:t=>{t.target.checked?De({...Ae,restaurants:[...Ae.restaurants,e.id]}):De({...Ae,restaurants:Ae.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(q,{children:e("admin:managerPromotionsPage.description")}),(0,x.jsx)(Q,{value:Ae.description,onChange:e=>De({...Ae,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]})})]}),(0,x.jsx)(c.A,{isOpen:Be,title:"Delete Promotion",message:"Are you sure you want to delete this promotion? This action cannot be undone.",onConfirm:()=>{Ee(!1),pe(ce.filter(e=>e.id!==Se)),ke("")},onCancel:()=>{Ee(!1),ke("")},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var a=n(9950),r=n(1367),i=n(6038);const o=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,a.useState)("RM"),[o]=(0,a.useState)(Object.keys(i.DL)),[s,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),a=t.indexOf("restaurant");let r=a>=0?t[a+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";n(a)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:s,error:l}}},7617:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var a=n(7119),r=n(4752),i=n(9610),o=n(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=r.Ay.div`
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
  white-space: pre-line;
  text-align: left;
`,p=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=r.Ay.button`
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
`,u=e=>{let{isOpen:t,title:n,message:r,onConfirm:u,onCancel:m,confirmText:g="Confirm",cancelText:h="Cancel",type:v="warning"}=e;return t?a.createPortal((0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&m()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:n}),(0,o.jsx)(c,{children:r})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{variant:"secondary",onClick:m,children:h}),(0,o.jsx)(x,{variant:"primary",type:v,onClick:u,children:g})]})]})}),document.body):null}}}]);