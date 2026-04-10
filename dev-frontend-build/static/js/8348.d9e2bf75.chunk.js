"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8348],{2435:(e,n,a)=>{a.d(n,{FS:()=>r});const r=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>t});var r=a(4752);const t=r.Ay.button`
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
`},8348:(e,n,a)=>{a.r(n),a.d(n,{default:()=>Q});var r=a(9950),t=a(4492),s=a(4752),o=a(2853),i=a(3705),l=a(1367),d=a(8409),c=a(2435),p=a(8666),u=a(5030),x=a(9955),h=a(4414);const g=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=s.Ay.div`
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
`,w=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=s.Ay.div`
  display: flex;
  gap: 12px;
`,b=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,v=s.Ay.div`
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
`,F=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,C=s.Ay.div`
  flex: 1;
`,A=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,R=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,B=s.Ay.span`
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
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,P=s.Ay.div`
  text-align: center;
`,S=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,z=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,I=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,N=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,D=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,O=s.Ay.button`
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
`,$=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,_=s.Ay.input`
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
`,T=s.Ay.select`
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
`,L=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,U=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,M=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,Y=s.Ay.input`
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
`,W=s.Ay.select`
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
`,K=s.Ay.textarea`
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
`,H=s.Ay.div`
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
`,J=s.Ay.input`
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
`,G=s.Ay.div`
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
`,V=s.Ay.div`
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
`,q=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,Z=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=()=>{const{t:e}=(0,u.Bd)("owner"),{user:n}=(0,l.As)(),a=(0,t.Zp)(),[s,Q]=(0,r.useState)([]),[X,ee]=(0,r.useState)(!1),[ne,ae]=(0,r.useState)(""),[re,te]=(0,r.useState)("all"),[se,oe]=(0,r.useState)({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),[ie,le]=(0,r.useState)(null),[de,ce]=(0,r.useState)(!1),[pe,ue]=(0,r.useState)("create"),[xe,he]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[ge,me]=(0,r.useState)(null),[we,ye]=(0,r.useState)([]),[je,be]=(0,r.useState)(""),[fe,ve]=(0,r.useState)(!1),[Fe,Ce]=(0,r.useState)(!1),[Ae,Ee]=(0,r.useState)(null),[Re,Be]=(0,r.useState)("");(0,r.useEffect)(()=>{n&&ke()},[n]);const ke=async()=>{try{const e=(0,x.c4)(),n=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.success){const n=e.data.map(e=>{var n,a;return{id:e.id.toString(),name:e.name,location:e.address||"No address provided",address:e.address||"",phone:e.phone||"",email:e.email||"",cuisine:e.cuisine||e.cuisine_type||"Various",status:e.status||"inactive",plan:(e.plan_type||"Basic Plan").toLowerCase().replace(" plan",""),todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastOrder:"No orders yet",monthlyFee:parseFloat(e.plan_amount)||29,nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],adminName:(null===(n=e.admin)||void 0===n?void 0:n.full_name)||e.admin_name||"",adminEmail:(null===(a=e.admin)||void 0===a?void 0:a.email)||"",payment_model:e.payment_model||"restaurant"}});Q(n)}}}catch(e){console.error("Error fetching restaurants:",e)}},Pe=s.filter(e=>{const n=e.name.toLowerCase().includes(ne.toLowerCase())||e.location.toLowerCase().includes(ne.toLowerCase())||e.cuisine.toLowerCase().includes(ne.toLowerCase()),a="all"===re||e.status===re;return n&&a}),Se=s.length,ze=s.filter(e=>"active"===e.status).length,Ie=s.reduce((e,n)=>e+n.todaySales,0),Ne=s.reduce((e,n)=>e+n.todayOrders,0),De=s.reduce((e,n)=>e+n.staffCount,0),Oe=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,h.jsx)(N,{filled:a<=e,children:"\u2605"},a));return n},$e=async e=>{be(e),ve(!0);try{const n=(0,x.c4)(),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();ye(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(y,{children:e("owner:ownerRestaurantsPage.restaurants")}),(0,h.jsxs)(j,{children:[(0,h.jsx)(b,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalRestaurants:s.length,owner:null===n||void 0===n?void 0:n.name,restaurants:s.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(e,null,2),r=new Blob([a],{type:"application/json"}),t=URL.createObjectURL(r),o=document.createElement("a");o.href=t,o.download=`owner-restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t)},children:e("owner:ownerRestaurantsPage.exportData")}),(0,h.jsx)(b,{variant:"primary",onClick:()=>{oe({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),ue("create"),he({fullName:"",email:"",username:"",password:"",phone:""}),me(null),ye([]),be(""),Be(""),ee(!0)},children:e("owner:ownerRestaurantsPage.addRestaurant")})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{color:"#059669",children:[(0,h.jsx)(d.Os,{children:Se}),(0,h.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.totalRestaurants")}),(0,h.jsx)(d.E_,{trend:"up",children:e("owner:ownerRestaurantsPage.ownedRestaurants")})]}),(0,h.jsxs)(d.hI,{color:"#2563EB",children:[(0,h.jsx)(d.Os,{children:ze}),(0,h.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.activeRestaurants")}),(0,h.jsxs)(d.E_,{trend:"up",children:[Se>0?Math.round(ze/Se*100):0,"% operational"]})]}),(0,h.jsxs)(d.hI,{color:"#7C3AED",children:[(0,h.jsxs)(d.Os,{children:["RM ",Ie.toFixed(2)]}),(0,h.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.todaysTotalSales")}),(0,h.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.acrossAllRestaurants")})]}),(0,h.jsxs)(d.hI,{color:"#DC2626",children:[(0,h.jsx)(d.Os,{children:Ne}),(0,h.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.todaysOrders")}),(0,h.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.acrossAllRestaurants")})]}),(0,h.jsxs)(d.hI,{color:"#D97706",children:[(0,h.jsx)(d.Os,{children:De}),(0,h.jsx)(d.v0,{children:e("owner:ownerRestaurantsPage.totalStaff")}),(0,h.jsx)(d.E_,{trend:"neutral",children:e("owner:ownerRestaurantsPage.allRestaurants")})]})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(_,{placeholder:"Search restaurants...",value:ne,onChange:e=>ae(e.target.value)}),(0,h.jsxs)(T,{value:re,onChange:e=>te(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("owner:ownerRestaurantsPage.allStatus")}),(0,h.jsx)("option",{value:"active",children:e("owner:ownerRestaurantsPage.active")}),(0,h.jsx)("option",{value:"trial",children:e("owner:ownerRestaurantsPage.trial")}),(0,h.jsx)("option",{value:"inactive",children:e("owner:ownerRestaurantsPage.inactive")}),(0,h.jsx)("option",{value:"expired",children:e("owner:ownerRestaurantsPage.expired")}),(0,h.jsx)("option",{value:"suspended",children:e("owner:ownerRestaurantsPage.suspended")}),(0,h.jsx)("option",{value:"cancelled",children:e("owner:ownerRestaurantsPage.cancelled")})]})]}),0===Pe.length?(0,h.jsx)(o.pp,{children:0===s.length?'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.':"No restaurants match the current filter."}):(0,h.jsx)(f,{children:Pe.map(n=>(0,h.jsxs)(v,{onClick:()=>{return e=n.id,r=n.name,void a(`/pos/owner/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`);var e,r},children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(A,{children:[n.name," ",n.currency&&(0,h.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.currency})]}),n.adminName&&(0,h.jsxs)(E,{style:{fontWeight:"600",color:"#635BFF"},children:["Admin: ",n.adminName]}),(0,h.jsxs)(E,{children:[n.location," ","Various"!==n.cuisine?`\xb7 ${n.cuisine}`:""]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(R,{status:n.status,children:n.status}),(0,h.jsx)(B,{plan:n.plan,children:n.plan})]})]}),(0,h.jsxs)(I,{children:[Oe(n.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \xb7 Last order: ",n.lastOrder]})]}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(P,{children:[(0,h.jsxs)(S,{children:["RM ",n.todaySales.toFixed(2)]}),(0,h.jsx)(z,{children:e("owner:ownerRestaurantsPage.todaysSales")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(S,{children:n.todayOrders}),(0,h.jsx)(z,{children:e("owner:ownerRestaurantsPage.orders")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(S,{children:n.staffCount}),(0,h.jsx)(z,{children:e("owner:ownerRestaurantsPage.staff")})]})]}),(0,h.jsxs)(D,{children:[(0,h.jsx)(O,{onClick:e=>((e,n)=>{e.stopPropagation(),Be(""),le(n),oe({name:n.name,email:n.email,phone:n.phone,address:n.address,city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:n.cuisine}),ce(!0)})(e,n),children:e("owner:ownerRestaurantsPage.edit")}),(0,h.jsx)(O,{onClick:e=>((e,n)=>{e.stopPropagation(),a(`/pos/owner/reports?tab=sales&restaurantId=${n.id}&restaurantName=${encodeURIComponent(n.name)}`)})(e,n),children:e("owner:ownerRestaurantsPage.viewReports")}),(0,h.jsx)(O,{onClick:e=>((e,n)=>{e.stopPropagation(),Ee(n),Ce(!0)})(e,n),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:e("owner:ownerRestaurantsPage.remove")})]})]},n.id))})]})]}),X&&(0,h.jsx)(d.aF,{isOpen:!0,onClose:()=>ee(!1),title:"Add New Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[Re&&(0,h.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Re," "]})," ",(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{ee(!1),Be("")},children:e("owner:ownerRestaurantsPage.cancel")}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async e=>{e.preventDefault(),Be("");try{if("create"===pe){if(!xe.fullName||!xe.email||!xe.username||!xe.password)return void Be("Please fill in all required Restaurant Admin fields.");if(xe.password.length<8)return void Be("Admin password must be at least 8 characters.");if(!/[a-z]/.test(xe.password)||!/[A-Z]/.test(xe.password)||!/[0-9]/.test(xe.password))return void Be("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===pe&&!ge)return void Be("Please select an existing user as Restaurant Admin.");const e={name:se.name,address:se.address,city:se.city,state:se.state,postal_code:se.postalCode,country:se.country,phone:se.phone,email:se.email,cuisine:se.cuisine,business_registration:se.businessRegistration||void 0,tax_id:se.taxId||void 0,managerIds:[parseInt(((null===n||void 0===n?void 0:n.id)||"0").toString())],adminAction:pe,status:"active"};"create"===pe?(e.adminEmail=xe.email,e.adminPassword=xe.password,e.adminUsername=xe.username,e.adminFullName=xe.fullName,e.adminPhone=xe.phone||void 0):"assign"===pe&&(e.adminUserId=parseInt(ge.id.toString()));const s=(0,x.c4)(),o=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(e)});if(o.ok){var a;const e=await o.json(),n=e.id||(null===(a=e.data)||void 0===a?void 0:a.id);n&&await fetch(`/api/owner/restaurants/${n}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}}),ee(!1),await ke()}else{var r;const e=await o.json().catch(()=>({error:"Unknown error"}));let n="Please try again.";if("string"===typeof e.error)n=e.error;else if(null!==(r=e.error)&&void 0!==r&&r.message){var t;n=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(n+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(n=e.message);Be(`Failed to create restaurant: ${n}`)}}catch(s){console.error("Error creating restaurant:",s),Be("Error creating restaurant. Please try again.")}},children:e("owner:ownerRestaurantsPage.addRestaurant")})]}),children:(0,h.jsxs)(L,{children:[(0,h.jsxs)(U,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(M,{children:"Restaurant Name *"}),(0,h.jsx)(Y,{type:"text",placeholder:"Enter restaurant name",value:se.name,onChange:e=>oe({...se,name:e.target.value})})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===pe?"#F0EFFF":"#F9FAFB",border:"create"===pe?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"create"===pe,onChange:()=>{ue("create"),me(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("owner:ownerRestaurantsPage.createNewAccount")})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===pe?"#F0EFFF":"#F9FAFB",border:"assign"===pe?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"assign"===pe,onChange:()=>{ue("assign"),he({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("owner:ownerRestaurantsPage.selectExistingUser")})]})]})]}),"create"===pe?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Admin Full Name *"}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Kim Owner",value:xe.fullName,onChange:e=>he({...xe,fullName:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Admin Email *"}),(0,h.jsx)(Y,{type:"email",placeholder:"admin@restaurant.com",value:xe.email,onChange:e=>he({...xe,email:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Admin Username *"}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., kim_owner",value:xe.username,onChange:e=>he({...xe,username:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Admin Password *"}),(0,h.jsx)(Y,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:xe.password,onChange:e=>he({...xe,password:e.target.value})})]}),(0,h.jsxs)(U,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.adminPhone")}),(0,h.jsx)(p.A,{value:xe.phone,onChange:e=>he({...xe,phone:e}),defaultCountry:se.country})]})]}):(0,h.jsxs)(U,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.searchAndSelectAnExistingUser")}),(0,h.jsxs)(H,{children:[(0,h.jsx)(J,{type:"text",placeholder:"Type to search by name, email, or username...",value:je,onChange:e=>$e(e.target.value),onFocus:()=>$e(je),onBlur:()=>setTimeout(()=>ve(!1),200)}),(0,h.jsx)(G,{show:fe,children:0===we.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:je.length>0?"No available users found":"Type to search users..."}):we.map(e=>(0,h.jsxs)(V,{onClick:()=>(e=>{me(e),be(e.full_name||e.username),ve(!1)})(e),children:[(0,h.jsx)(q,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.email," \xb7 ",e.role]})]},e.id))})]}),ge&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:ge.full_name||ge.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[ge.email," \xb7 ",ge.role]})]}),(0,h.jsx)("button",{onClick:()=>{me(null),be("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Email Address *"}),(0,h.jsx)(Y,{type:"email",placeholder:"restaurant@example.com",value:se.email,onChange:e=>oe({...se,email:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Country *"}),(0,h.jsx)(W,{value:se.country,onChange:e=>oe({...se,country:e.target.value}),children:c.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:se.phone,onChange:e=>oe({...se,phone:e}),defaultCountry:se.country})]}),(0,h.jsxs)(U,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(M,{children:"Address *"}),(0,h.jsx)(K,{placeholder:"Enter street address",value:se.address,onChange:e=>oe({...se,address:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.city")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Kuala Lumpur",value:se.city,onChange:e=>oe({...se,city:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.stateProvince")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:se.state,onChange:e=>oe({...se,state:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.postalCode")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., 50000",value:se.postalCode,onChange:e=>oe({...se,postalCode:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.cuisineType")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:se.cuisine,onChange:e=>oe({...se,cuisine:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.businessRegistrationNo")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., 202401012345",value:se.businessRegistration,onChange:e=>oe({...se,businessRegistration:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.taxIdGstNo")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., MY1234567890",value:se.taxId,onChange:e=>oe({...se,taxId:e.target.value})})]})]})}),de&&(0,h.jsx)(d.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Edit Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[Re&&(0,h.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Re," "]})," ",(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{ce(!1),Be("")},children:e("owner:ownerRestaurantsPage.cancel")}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Be(""),ie)try{const e=(0,x.c4)(),n={name:se.name,email:se.email,phone:se.phone,address:se.address,city:se.city,state:se.state,postal_code:se.postalCode,country:se.country,business_registration:se.businessRegistration||void 0,tax_id:se.taxId||void 0,cuisine:se.cuisine};(await fetch(`/api/restaurants/${ie.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)})).ok?(ce(!1),le(null),await ke()):Be("Failed to update restaurant. Please try again.")}catch(n){console.error("Error updating restaurant:",n),Be("Error updating restaurant. Please try again.")}},children:e("owner:ownerRestaurantsPage.updateRestaurant")})]}),children:(0,h.jsxs)(L,{children:[(0,h.jsxs)(U,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(M,{children:"Restaurant Name *"}),(0,h.jsx)(Y,{type:"text",placeholder:"Enter restaurant name",value:se.name,onChange:e=>oe({...se,name:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Email Address *"}),(0,h.jsx)(Y,{type:"email",placeholder:"restaurant@example.com",value:se.email,onChange:e=>oe({...se,email:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Country *"}),(0,h.jsx)(W,{value:se.country,onChange:e=>oe({...se,country:e.target.value}),children:c.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:se.phone,onChange:e=>oe({...se,phone:e}),defaultCountry:se.country})]}),(0,h.jsxs)(U,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(M,{children:"Address *"}),(0,h.jsx)(K,{placeholder:"Enter street address",value:se.address,onChange:e=>oe({...se,address:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.city")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Kuala Lumpur",value:se.city,onChange:e=>oe({...se,city:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.stateProvince")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:se.state,onChange:e=>oe({...se,state:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.postalCode")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., 50000",value:se.postalCode,onChange:e=>oe({...se,postalCode:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.cuisineType")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:se.cuisine,onChange:e=>oe({...se,cuisine:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.businessRegistrationNo")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., 202401012345",value:se.businessRegistration,onChange:e=>oe({...se,businessRegistration:e.target.value})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(M,{children:e("owner:ownerRestaurantsPage.taxIdGstNo")}),(0,h.jsx)(Y,{type:"text",placeholder:"e.g., MY1234567890",value:se.taxId,onChange:e=>oe({...se,taxId:e.target.value})})]})]})}),Fe&&Ae&&(0,h.jsx)(d.aF,{isOpen:!0,onClose:()=>Ce(!1),title:"Remove Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>Ce(!1),children:e("owner:ownerRestaurantsPage.cancel")}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Ae)try{const e=(0,x.c4)();await fetch(`/api/owner/restaurants/${Ae.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Q(s.filter(e=>e.id!==Ae.id)),Ce(!1),Ee(null)}catch(e){console.error("Error removing restaurant:",e)}},style:{background:"#EF4444"},children:" Remove Restaurant "})]}),children:(0,h.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,h.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,h.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,h.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to remove this restaurant?"}),(0,h.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,h.jsx)("strong",{style:{color:"#DC2626"},children:Ae.name})," will be unlinked from your account.",(0,h.jsx)("br",{}),"The restaurant itself will not be deleted."]})]})})]})}}}]);