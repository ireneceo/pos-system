"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8348],{2435:(e,a,n)=>{n.d(a,{FS:()=>r});const r=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,a,n)=>{n.d(a,{cc:()=>t});var r=n(4752);const t=r.Ay.button`
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
`},8348:(e,a,n)=>{n.r(a),n.d(a,{default:()=>Z});var r=n(9950),t=n(4492),o=n(4752),s=n(2853),i=n(3705),l=n(1367),d=n(8409),c=n(2435),p=n(8666),u=n(5030),x=n(4414);const h=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=o.Ay.div`
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
`,m=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,w=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=o.Ay.div`
  display: flex;
  gap: 12px;
`,j=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,f=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,F=o.Ay.div`
  flex: 1;
`,C=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,E=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,R=o.Ay.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  white-space: nowrap;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#5B21B6";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,B=o.Ay.div`
  text-align: center;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,P=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,z=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,I=o.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,N=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,D=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,_=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,O=o.Ay.input`
  flex: 0 1 250px;
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

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,$=o.Ay.select`
  flex: 0 0 150px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,T=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,L=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,U=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,M=o.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
  }
`,Y=o.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,W=o.Ay.textarea`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,K=o.Ay.div`
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
`,H=o.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=o.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
`,G=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,V=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,q=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Z=()=>{const{t:e}=(0,u.Bd)("owner"),{user:a}=(0,l.As)(),n=(0,t.Zp)(),[o,Z]=(0,r.useState)([]),[Q,X]=(0,r.useState)(!1),[ee,ae]=(0,r.useState)(""),[ne,re]=(0,r.useState)("all"),[te,oe]=(0,r.useState)({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),[se,ie]=(0,r.useState)(null),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)("create"),[ue,xe]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[he,ge]=(0,r.useState)(null),[me,we]=(0,r.useState)([]),[ye,je]=(0,r.useState)(""),[be,fe]=(0,r.useState)(!1),[ve,Fe]=(0,r.useState)(!1),[Ce,Ae]=(0,r.useState)(null),[Ee,Re]=(0,r.useState)("");(0,r.useEffect)(()=>{a&&ke()},[a]);const ke=async()=>{try{const e=localStorage.getItem("auth_token"),a=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();if(e.success){const a=e.data.map(e=>{var a,n;return{id:e.id.toString(),name:e.name,location:e.address||"No address provided",address:e.address||"",phone:e.phone||"",email:e.email||"",cuisine:e.cuisine||e.cuisine_type||"Various",status:e.status||"inactive",plan:(e.plan_type||"Basic Plan").toLowerCase().replace(" plan",""),todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastOrder:"No orders yet",monthlyFee:parseFloat(e.plan_amount)||29,nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],adminName:(null===(a=e.admin)||void 0===a?void 0:a.full_name)||e.admin_name||"",adminEmail:(null===(n=e.admin)||void 0===n?void 0:n.email)||"",payment_model:e.payment_model||"restaurant"}});Z(a)}}}catch(e){console.error("Error fetching restaurants:",e)}},Be=o.filter(e=>{const a=e.name.toLowerCase().includes(ee.toLowerCase())||e.location.toLowerCase().includes(ee.toLowerCase())||e.cuisine.toLowerCase().includes(ee.toLowerCase()),n="all"===ne||e.status===ne;return a&&n}),Se=o.length,Pe=o.filter(e=>"active"===e.status).length,ze=o.reduce((e,a)=>e+a.todaySales,0),Ie=o.reduce((e,a)=>e+a.todayOrders,0),Ne=o.reduce((e,a)=>e+a.staffCount,0),De=e=>{const a=[];for(let n=1;n<=5;n++)a.push((0,x.jsx)(I,{filled:n<=e,children:"\u2605"},n));return a},_e=async e=>{je(e),fe(!0);try{const a=localStorage.getItem("auth_token"),n=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(n.ok){const e=await n.json();we(e.data||[])}}catch(a){console.error("Error searching admin candidates:",a)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(w,{children:e("owner:ownerRestaurantsPage.restaurants")}),(0,x.jsxs)(y,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalRestaurants:o.length,owner:null===a||void 0===a?void 0:a.name,restaurants:o.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},n=JSON.stringify(e,null,2),r=new Blob([n],{type:"application/json"}),t=URL.createObjectURL(r),s=document.createElement("a");s.href=t,s.download=`owner-restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t)},children:e("owner:ownerRestaurantsPage.exportData")}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{oe({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),pe("create"),xe({fullName:"",email:"",username:"",password:"",phone:""}),ge(null),we([]),je(""),Re(""),X(!0)},children:e("owner:ownerRestaurantsPage.addRestaurant")})]})]}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{color:"#059669",children:[(0,x.jsx)(d.Os,{children:Se}),(0,x.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.totalRestaurants")}),(0,x.jsx)(d.E_,{trend:"up",children:e("owner:ownerRestaurantsPage.ownedRestaurants")})]}),(0,x.jsxs)(d.hI,{color:"#2563EB",children:[(0,x.jsx)(d.Os,{children:Pe}),(0,x.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.activeRestaurants")}),(0,x.jsxs)(d.E_,{trend:"up",children:[Se>0?Math.round(Pe/Se*100):0,"% operational"]})]}),(0,x.jsxs)(d.hI,{color:"#7C3AED",children:[(0,x.jsxs)(d.Os,{children:["RM ",ze.toFixed(2)]}),(0,x.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.todaysTotalSales")}),(0,x.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.acrossAllRestaurants")})]}),(0,x.jsxs)(d.hI,{color:"#DC2626",children:[(0,x.jsx)(d.Os,{children:Ie}),(0,x.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.todaysOrders")}),(0,x.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.acrossAllRestaurants")})]}),(0,x.jsxs)(d.hI,{color:"#D97706",children:[(0,x.jsx)(d.Os,{children:Ne}),(0,x.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.totalStaff")}),(0,x.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.allRestaurants")})]})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)(O,{placeholder:"Search restaurants...",value:ee,onChange:e=>ae(e.target.value)}),(0,x.jsxs)($,{value:ne,onChange:e=>re(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("owner:ownerRestaurantsPage.allStatus")}),(0,x.jsx)("option",{value:"active",children:e("owner:ownerRestaurantsPage.active")}),(0,x.jsx)("option",{value:"trial",children:e("owner:ownerRestaurantsPage.trial")}),(0,x.jsx)("option",{value:"inactive",children:e("owner:ownerRestaurantsPage.inactive")}),(0,x.jsx)("option",{value:"expired",children:e("owner:ownerRestaurantsPage.expired")}),(0,x.jsx)("option",{value:"suspended",children:e("owner:ownerRestaurantsPage.suspended")}),(0,x.jsx)("option",{value:"cancelled",children:e("owner:ownerRestaurantsPage.cancelled")})]})]}),0===Be.length?(0,x.jsx)(s.pp,{children:0===o.length?'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.':"No restaurants match the current filter."}):(0,x.jsx)(b,{children:Be.map(a=>(0,x.jsxs)(f,{onClick:()=>{return e=a.id,r=a.name,void n(`/pos/owner/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`);var e,r},children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(C,{children:[a.name," ",a.currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a.currency})]}),a.adminName&&(0,x.jsxs)(A,{style:{fontWeight:"600",color:"#635BFF"},children:["Admin: ",a.adminName]}),(0,x.jsxs)(A,{children:[a.location," ","Various"!==a.cuisine?`\xb7 ${a.cuisine}`:""]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(E,{status:a.status,children:a.status}),(0,x.jsx)(R,{plan:a.plan,children:a.plan})]})]}),(0,x.jsxs)(z,{children:[De(a.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \xb7 Last order: ",a.lastOrder]})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(B,{children:[(0,x.jsxs)(S,{children:["RM ",a.todaySales.toFixed(2)]}),(0,x.jsx)(P,{children:e("owner:ownerRestaurantsPage.todaysSales")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(S,{children:a.todayOrders}),(0,x.jsx)(P,{children:e("owner:ownerRestaurantsPage.orders")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(S,{children:a.staffCount}),(0,x.jsx)(P,{children:e("owner:ownerRestaurantsPage.staff")})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(D,{onClick:e=>((e,a)=>{e.stopPropagation(),Re(""),ie(a),oe({name:a.name,email:a.email,phone:a.phone,address:a.address,city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:a.cuisine}),de(!0)})(e,a),children:e("owner:ownerRestaurantsPage.edit")}),(0,x.jsx)(D,{onClick:e=>((e,a)=>{e.stopPropagation(),n(`/pos/owner/reports?tab=sales&restaurantId=${a.id}&restaurantName=${encodeURIComponent(a.name)}`)})(e,a),children:e("owner:ownerRestaurantsPage.viewReports")}),(0,x.jsx)(D,{onClick:e=>((e,a)=>{e.stopPropagation(),Ae(a),Fe(!0)})(e,a),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:e("owner:ownerRestaurantsPage.remove")})]})]},a.id))})]})]}),Q&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>X(!1),title:"Add New Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[Ee&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Ee," "]})," ",(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{X(!1),Re("")},children:e("owner:ownerRestaurantsPage.cancel")}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{e.preventDefault(),Re("");try{if("create"===ce){if(!ue.fullName||!ue.email||!ue.username||!ue.password)return void Re("Please fill in all required Restaurant Admin fields.");if(ue.password.length<8)return void Re("Admin password must be at least 8 characters.");if(!/[a-z]/.test(ue.password)||!/[A-Z]/.test(ue.password)||!/[0-9]/.test(ue.password))return void Re("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===ce&&!he)return void Re("Please select an existing user as Restaurant Admin.");const e={name:te.name,address:te.address,city:te.city,state:te.state,postal_code:te.postalCode,country:te.country,phone:te.phone,email:te.email,cuisine:te.cuisine,business_registration:te.businessRegistration||void 0,tax_id:te.taxId||void 0,managerIds:[parseInt(((null===a||void 0===a?void 0:a.id)||"0").toString())],adminAction:ce,status:"active"};"create"===ce?(e.adminEmail=ue.email,e.adminPassword=ue.password,e.adminUsername=ue.username,e.adminFullName=ue.fullName,e.adminPhone=ue.phone||void 0):"assign"===ce&&(e.adminUserId=parseInt(he.id.toString()));const o=localStorage.getItem("auth_token"),s=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(e)});if(s.ok){var n;const e=await s.json(),a=e.id||(null===(n=e.data)||void 0===n?void 0:n.id);a&&await fetch(`/api/owner/restaurants/${a}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),X(!1),await ke()}else{var r;const e=await s.json().catch(()=>({error:"Unknown error"}));let a="Please try again.";if("string"===typeof e.error)a=e.error;else if(null!==(r=e.error)&&void 0!==r&&r.message){var t;a=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(a+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(a=e.message);Re(`Failed to create restaurant: ${a}`)}}catch(o){console.error("Error creating restaurant:",o),Re("Error creating restaurant. Please try again.")}},children:e("owner:ownerRestaurantsPage.addRestaurant")})]}),children:(0,x.jsxs)(T,{children:[(0,x.jsxs)(L,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(U,{children:"Restaurant Name *"}),(0,x.jsx)(M,{type:"text",placeholder:"Enter restaurant name",value:te.name,onChange:e=>oe({...te,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===ce?"#F0EFFF":"#F9FAFB",border:"create"===ce?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"create"===ce,onChange:()=>{pe("create"),ge(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("owner:ownerRestaurantsPage.createNewAccount")})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===ce?"#F0EFFF":"#F9FAFB",border:"assign"===ce?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"assign"===ce,onChange:()=>{pe("assign"),xe({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("owner:ownerRestaurantsPage.selectExistingUser")})]})]})]}),"create"===ce?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Admin Full Name *"}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Kim Owner",value:ue.fullName,onChange:e=>xe({...ue,fullName:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Admin Email *"}),(0,x.jsx)(M,{type:"email",placeholder:"admin@restaurant.com",value:ue.email,onChange:e=>xe({...ue,email:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Admin Username *"}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., kim_owner",value:ue.username,onChange:e=>xe({...ue,username:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Admin Password *"}),(0,x.jsx)(M,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:ue.password,onChange:e=>xe({...ue,password:e.target.value})})]}),(0,x.jsxs)(L,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.adminPhone")}),(0,x.jsx)(p.A,{value:ue.phone,onChange:e=>xe({...ue,phone:e}),defaultCountry:te.country})]})]}):(0,x.jsxs)(L,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.searchAndSelectAnExistingUser")}),(0,x.jsxs)(K,{children:[(0,x.jsx)(H,{type:"text",placeholder:"Type to search by name, email, or username...",value:ye,onChange:e=>_e(e.target.value),onFocus:()=>_e(ye),onBlur:()=>setTimeout(()=>fe(!1),200)}),(0,x.jsx)(J,{show:be,children:0===me.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:ye.length>0?"No available users found":"Type to search users..."}):me.map(e=>(0,x.jsxs)(G,{onClick:()=>(e=>{ge(e),je(e.full_name||e.username),fe(!1)})(e),children:[(0,x.jsx)(V,{children:e.full_name||e.username}),(0,x.jsxs)(q,{children:[e.email," \xb7 ",e.role]})]},e.id))})]}),he&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:he.full_name||he.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[he.email," \xb7 ",he.role]})]}),(0,x.jsx)("button",{onClick:()=>{ge(null),je("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Email Address *"}),(0,x.jsx)(M,{type:"email",placeholder:"restaurant@example.com",value:te.email,onChange:e=>oe({...te,email:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Country *"}),(0,x.jsx)(Y,{value:te.country,onChange:e=>oe({...te,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:te.phone,onChange:e=>oe({...te,phone:e}),defaultCountry:te.country})]}),(0,x.jsxs)(L,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(U,{children:"Address *"}),(0,x.jsx)(W,{placeholder:"Enter street address",value:te.address,onChange:e=>oe({...te,address:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.city")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Kuala Lumpur",value:te.city,onChange:e=>oe({...te,city:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.stateProvince")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:te.state,onChange:e=>oe({...te,state:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.postalCode")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., 50000",value:te.postalCode,onChange:e=>oe({...te,postalCode:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.cuisineType")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:te.cuisine,onChange:e=>oe({...te,cuisine:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.businessRegistrationNo")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., 202401012345",value:te.businessRegistration,onChange:e=>oe({...te,businessRegistration:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.taxIdGstNo")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., MY1234567890",value:te.taxId,onChange:e=>oe({...te,taxId:e.target.value})})]})]})}),le&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>de(!1),title:"Edit Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[Ee&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Ee," "]})," ",(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{de(!1),Re("")},children:e("owner:ownerRestaurantsPage.cancel")}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Re(""),se)try{const e=localStorage.getItem("auth_token"),a={name:te.name,email:te.email,phone:te.phone,address:te.address,city:te.city,state:te.state,postal_code:te.postalCode,country:te.country,business_registration:te.businessRegistration||void 0,tax_id:te.taxId||void 0,cuisine:te.cuisine};(await fetch(`/api/restaurants/${se.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(a)})).ok?(de(!1),ie(null),await ke()):Re("Failed to update restaurant. Please try again.")}catch(a){console.error("Error updating restaurant:",a),Re("Error updating restaurant. Please try again.")}},children:e("owner:ownerRestaurantsPage.updateRestaurant")})]}),children:(0,x.jsxs)(T,{children:[(0,x.jsxs)(L,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(U,{children:"Restaurant Name *"}),(0,x.jsx)(M,{type:"text",placeholder:"Enter restaurant name",value:te.name,onChange:e=>oe({...te,name:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Email Address *"}),(0,x.jsx)(M,{type:"email",placeholder:"restaurant@example.com",value:te.email,onChange:e=>oe({...te,email:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Country *"}),(0,x.jsx)(Y,{value:te.country,onChange:e=>oe({...te,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:te.phone,onChange:e=>oe({...te,phone:e}),defaultCountry:te.country})]}),(0,x.jsxs)(L,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(U,{children:"Address *"}),(0,x.jsx)(W,{placeholder:"Enter street address",value:te.address,onChange:e=>oe({...te,address:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.city")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Kuala Lumpur",value:te.city,onChange:e=>oe({...te,city:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.stateProvince")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:te.state,onChange:e=>oe({...te,state:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.postalCode")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., 50000",value:te.postalCode,onChange:e=>oe({...te,postalCode:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.cuisineType")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:te.cuisine,onChange:e=>oe({...te,cuisine:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.businessRegistrationNo")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., 202401012345",value:te.businessRegistration,onChange:e=>oe({...te,businessRegistration:e.target.value})})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:e("owner:ownerRestaurantsPage.taxIdGstNo")}),(0,x.jsx)(M,{type:"text",placeholder:"e.g., MY1234567890",value:te.taxId,onChange:e=>oe({...te,taxId:e.target.value})})]})]})}),ve&&Ce&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>Fe(!1),title:"Remove Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>Fe(!1),children:e("owner:ownerRestaurantsPage.cancel")}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Ce)try{const e=localStorage.getItem("auth_token");await fetch(`/api/owner/restaurants/${Ce.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Z(o.filter(e=>e.id!==Ce.id)),Fe(!1),Ae(null)}catch(e){console.error("Error removing restaurant:",e)}},style:{background:"#EF4444"},children:" Remove Restaurant "})]}),children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to remove this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:Ce.name})," will be unlinked from your account.",(0,x.jsx)("br",{}),"The restaurant itself will not be deleted."]})]})})]})}}}]);