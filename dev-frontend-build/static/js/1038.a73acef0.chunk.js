"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>re});var i=n(9950),r=n(4752),a=n(3310),s=n(1367),o=n(4414);const d=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,l=r.Ay.div`
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
`,p=r.Ay.div`
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
`,c=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,u=r.Ay.button`
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
`,h=r.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,m=r.Ay.select`
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
`,g=r.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,j=r.Ay.input`
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
`,f=r.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,v=r.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=r.Ay.div`
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
`,F=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,D=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,A=r.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,w=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,C=r.Ay.div`
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
`,E=r.Ay.div`
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
`,B=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,S=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,k=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.type){case"percentage":return"#DBEAFE";case"fixed_amount":return"#D1FAE5";case"bogo":return"#FEF3C7";case"free_shipping":return"#E0E7FF";case"happy_hour":return"#FCE7F3";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"percentage":return"#1E40AF";case"fixed_amount":return"#065F46";case"bogo":return"#92400E";case"free_shipping":return"#3730A3";case"happy_hour":return"#BE185D";default:return"#6B7280"}}};
`,$=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"scheduled":return"#FEF3C7";case"paused":default:return"#F3F4F6";case"expired":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"scheduled":return"#D97706";case"paused":default:return"#6B7280";case"expired":return"#DC2626"}}};
`,R=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,L=r.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,O=r.Ay.button`
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
`,P=r.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,T=r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,M=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,_=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,N=r.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,U=r.Ay.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,V=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,W=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`,I=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`,H=r.Ay.div`
  padding: 24px;
`,G=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Y=r.Ay.div`
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
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,te=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,ne=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,ie=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,re=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,i.useState)("all"),[r,re]=(0,i.useState)(""),[ae,se]=(0,i.useState)("all"),[oe,de]=(0,i.useState)("all"),[le,pe]=(0,i.useState)("name"),[ce,xe]=(0,i.useState)([]),[ue,he]=(0,i.useState)([]),[me,ge]=(0,i.useState)(null),[je,fe]=(0,i.useState)(!1),[ve,ye]=(0,i.useState)(!1),[be,Fe]=(0,i.useState)(null),[De,Ae]=(0,i.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[we]=(0,i.useState)([]);(0,i.useEffect)(()=>{xe([])},[]),(0,i.useEffect)(()=>{let e=ce;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),r){const t=r.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==ae&&(e=e.filter(e=>e.type===ae)),"all"!==oe&&(e=e.filter(e=>e.status===oe)),e.sort((e,t)=>{switch(le){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),he(e)},[ce,t,r,ae,oe,le]);const Ce={totalPromotions:ce.length,activePromotions:ce.filter(e=>"active"===e.status).length,usedThisMonth:ce.reduce((e,t)=>{const n=new Date,i=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=i?e+t.usageCount:e},0),totalRevenue:ce.reduce((e,t)=>e+t.generatedRevenue,0)},Ee=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},Be=e=>{ge(e),fe(!0)},Se=()=>{Fe(null),Ae({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),ye(!0)},ke=e=>{var t,n,i;Fe(e),Ae({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(i=e.maxDiscount)||void 0===i?void 0:i.toString())||"",description:e.description}),ye(!0)},ze=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};xe([...ce,t])},$e=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,o.jsx)(a.A,{children:(0,o.jsxs)(d,{children:[(0,o.jsxs)(l,{children:[(0,o.jsxs)(p,{children:[(0,o.jsx)(c,{children:"Promotions"}),(0,o.jsxs)(x,{children:[(0,o.jsxs)(u,{variant:"secondary",onClick:()=>{var n;const i={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=we.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:Ce.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:ue.map(e=>({name:e.name,type:Ee(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},r=`Promotion Export - ${i.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${i.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+i.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),a=new Blob([r],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,s.click()},children:[(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,o.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,o.jsx)(u,{variant:"primary",onClick:Se,children:"+ Add Promotion"})]})]}),(0,o.jsxs)(h,{children:[(0,o.jsxs)(m,{value:t,onChange:e=>n(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Restaurants"}),we.map(e=>(0,o.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,o.jsxs)(g,{children:[(0,o.jsx)(f,{children:"\ud83d\udd0d"}),(0,o.jsx)(j,{type:"text",placeholder:"Search promotions by name, description...",value:r,onChange:e=>re(e.target.value)})]}),(0,o.jsxs)(m,{value:ae,onChange:e=>se(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Types"}),(0,o.jsx)("option",{value:"percentage",children:"Percentage"}),(0,o.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,o.jsx)("option",{value:"bogo",children:"BOGO"}),(0,o.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,o.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,o.jsxs)(m,{value:oe,onChange:e=>de(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"active",children:"Active"}),(0,o.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,o.jsx)("option",{value:"paused",children:"Paused"}),(0,o.jsx)("option",{value:"expired",children:"Expired"})]}),(0,o.jsxs)(m,{value:le,onChange:e=>pe(e.target.value),children:[(0,o.jsx)("option",{value:"name",children:"Sort by Name"}),(0,o.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,o.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,o.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,o.jsxs)(v,{children:[(0,o.jsxs)(y,{children:[(0,o.jsxs)(b,{color:"#059669",children:[(0,o.jsx)(F,{children:"Total Promotions"}),(0,o.jsx)(D,{children:Ce.totalPromotions}),(0,o.jsx)(A,{positive:!0,children:"All restaurants combined"})]}),(0,o.jsxs)(b,{color:"#2563EB",children:[(0,o.jsx)(F,{children:"Active Promotions"}),(0,o.jsx)(D,{children:Ce.activePromotions}),(0,o.jsx)(A,{positive:!0,children:"Currently running"})]}),(0,o.jsxs)(b,{color:"#7C3AED",children:[(0,o.jsx)(F,{children:"Used This Month"}),(0,o.jsx)(D,{children:Ce.usedThisMonth}),(0,o.jsx)(A,{positive:!0,children:"Promotion activations"})]}),(0,o.jsxs)(b,{color:"#D97706",children:[(0,o.jsx)(F,{children:"Generated Revenue"}),(0,o.jsxs)(D,{children:["RM ",Ce.totalRevenue.toLocaleString()]}),(0,o.jsx)(A,{positive:!0,children:"From all promotions"})]})]}),(0,o.jsxs)(w,{children:[(0,o.jsxs)(C,{children:[(0,o.jsx)("span",{children:"Promotion"}),(0,o.jsx)("span",{children:"Type"}),(0,o.jsx)("span",{children:"Restaurants"}),(0,o.jsx)("span",{children:"Dates"}),(0,o.jsx)("span",{children:"Usage"}),(0,o.jsx)("span",{children:"Revenue"}),(0,o.jsx)("span",{children:"Status"}),(0,o.jsx)("span",{children:"Actions"})]}),0===ue.length?(0,o.jsxs)(te,{children:[(0,o.jsx)(ne,{children:"\ud83c\udfaf"}),(0,o.jsx)(ie,{children:r||"all"!==ae||"all"!==oe||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,o.jsx)(u,{variant:"primary",onClick:Se,children:"Create First Promotion"})]}):(0,o.jsxs)(o.Fragment,{children:[ue.map(e=>(0,o.jsxs)(E,{onClick:()=>Be(e),children:[(0,o.jsxs)(B,{children:[(0,o.jsx)(S,{children:e.name}),(0,o.jsx)(k,{children:e.discountText})]}),(0,o.jsx)(z,{type:e.type,children:Ee(e.type)}),(0,o.jsx)(R,{children:(0,o.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,o.jsxs)(R,{children:[(0,o.jsx)("div",{children:$e(e.startDate)}),(0,o.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",$e(e.endDate)]})]}),(0,o.jsxs)(R,{children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,o.jsxs)(R,{style:{color:"#059669",fontWeight:"600"},children:["RM ",e.generatedRevenue.toLocaleString()]}),(0,o.jsx)($,{status:e.status,children:e.status}),(0,o.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,o.jsx)(O,{onClick:()=>ke(e),children:"Edit"}),(0,o.jsx)(O,{onClick:()=>ze(e),children:"Copy"}),(0,o.jsx)(O,{onClick:()=>{return t=e.id,void xe(ce.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,o.jsx)(P,{children:ue.map(e=>(0,o.jsxs)(T,{onClick:()=>Be(e),children:[(0,o.jsxs)(M,{children:[(0,o.jsxs)(B,{children:[(0,o.jsx)(S,{children:e.name}),(0,o.jsx)(k,{children:e.discountText})]}),(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,o.jsx)(z,{type:e.type,children:Ee(e.type)}),(0,o.jsx)($,{status:e.status,children:e.status})]})]}),(0,o.jsxs)(_,{children:[(0,o.jsxs)("span",{children:[e.usageCount," used"]}),(0,o.jsxs)("span",{style:{color:"#059669",fontWeight:"600"},children:["RM ",e.generatedRevenue.toLocaleString()]}),(0,o.jsx)("span",{children:$e(e.endDate)})]})]},e.id))})]})]})]}),(0,o.jsx)(N,{isOpen:je,children:(0,o.jsxs)(U,{children:[(0,o.jsxs)(V,{children:[(0,o.jsx)(W,{children:"Promotion Details"}),(0,o.jsx)(I,{onClick:()=>fe(!1),children:"\xd7"})]}),me&&(0,o.jsxs)(H,{children:[(0,o.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,o.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:me.name}),(0,o.jsx)(z,{type:me.type,children:Ee(me.type)}),(0,o.jsx)($,{status:me.status,children:me.status})]}),(0,o.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:me.description})]}),(0,o.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,o.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Discount:"})," ",me.discountText]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Min Order:"})," ",me.minOrderAmount?`RM ${me.minOrderAmount}`:"No minimum"]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Max Discount:"})," ",me.maxDiscount?`RM ${me.maxDiscount}`:"No limit"]})]})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,o.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Usage:"})," ",me.usageCount," / ",me.usageLimit||"\u221e"]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Revenue:"})," RM ",me.generatedRevenue.toLocaleString()]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Created:"})," ",$e(me.createdDate)]})]})]})]}),(0,o.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,o.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,o.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,o.jsx)("strong",{children:"From:"})," ",$e(me.startDate)," ",(0,o.jsx)("br",{}),(0,o.jsx)("strong",{children:"To:"})," ",$e(me.endDate)]})]}),(0,o.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,o.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,o.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:me.restaurantNames.map((e,t)=>(0,o.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),me.conditions.length>0&&(0,o.jsxs)("div",{children:[(0,o.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,o.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:me.conditions.map((e,t)=>(0,o.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>fe(!1),children:"Close"}),me&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>{fe(!1),ke(me)},children:"Edit Promotion"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{fe(!1),ze(me)},children:"Duplicate"})]})]})]})}),(0,o.jsx)(N,{isOpen:ve,children:(0,o.jsxs)(U,{style:{maxWidth:"800px"},children:[(0,o.jsxs)(V,{children:[(0,o.jsx)(W,{children:be?"Edit Promotion":"Create New Promotion"}),(0,o.jsx)(I,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,o.jsxs)(H,{children:[(0,o.jsxs)(G,{children:[(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Promotion Name *"}),(0,o.jsx)(J,{type:"text",value:De.name,onChange:e=>Ae({...De,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Promotion Type *"}),(0,o.jsxs)(K,{value:De.type,onChange:e=>Ae({...De,type:e.target.value}),children:[(0,o.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,o.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,o.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,o.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,o.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,o.jsxs)(G,{children:[(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Discount Value *"}),(0,o.jsx)(J,{type:"number",value:De.discountValue,onChange:e=>Ae({...De,discountValue:e.target.value}),placeholder:"percentage"===De.type?"15":"10",step:"percentage"===De.type?"1":"0.01"})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Minimum Order Amount"}),(0,o.jsx)(J,{type:"number",value:De.minOrderAmount,onChange:e=>Ae({...De,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,o.jsxs)(G,{children:[(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Start Date *"}),(0,o.jsx)(J,{type:"date",value:De.startDate,onChange:e=>Ae({...De,startDate:e.target.value})})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"End Date *"}),(0,o.jsx)(J,{type:"date",value:De.endDate,onChange:e=>Ae({...De,endDate:e.target.value})})]})]}),(0,o.jsxs)(G,{children:[(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Usage Limit (Optional)"}),(0,o.jsx)(J,{type:"number",value:De.usageLimit,onChange:e=>Ae({...De,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Maximum Discount Amount"}),(0,o.jsx)(J,{type:"number",value:De.maxDiscount,onChange:e=>Ae({...De,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Apply to Restaurants *"}),(0,o.jsx)(X,{children:we.map(e=>(0,o.jsxs)(Z,{children:[(0,o.jsx)("input",{type:"checkbox",checked:De.restaurants.includes(e.id),onChange:t=>{t.target.checked?Ae({...De,restaurants:[...De.restaurants,e.id]}):Ae({...De,restaurants:De.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,o.jsxs)(Y,{children:[(0,o.jsx)(q,{children:"Description"}),(0,o.jsx)(Q,{value:De.description,onChange:e=>Ae({...De,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{const e="percentage"===De.type?`${De.discountValue}% off`:"fixed_amount"===De.type?`RM ${De.discountValue} off`:"bogo"===De.type?`BOGO ${De.discountValue}% off`:"free_shipping"===De.type?"Free delivery":`${De.discountValue}% off (Happy Hour)`,t=we.filter(e=>De.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===be||void 0===be?void 0:be.id)||`promo-${Date.now()}`,name:De.name,type:De.type,discountValue:parseFloat(De.discountValue),discountText:e,restaurants:De.restaurants,restaurantNames:t,startDate:De.startDate,endDate:De.endDate,usageCount:(null===be||void 0===be?void 0:be.usageCount)||0,usageLimit:De.usageLimit?parseInt(De.usageLimit):null,minOrderAmount:De.minOrderAmount?parseFloat(De.minOrderAmount):null,maxDiscount:De.maxDiscount?parseFloat(De.maxDiscount):null,status:"active",createdDate:(null===be||void 0===be?void 0:be.createdDate)||(new Date).toISOString().split("T")[0],description:De.description,conditions:[],generatedRevenue:(null===be||void 0===be?void 0:be.generatedRevenue)||0};xe(be?ce.map(e=>e.id===be.id?n:e):[...ce,n]),ye(!1)},children:be?"Update Promotion":"Create Promotion"})]})]})})]})})}}}]);