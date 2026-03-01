"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8317],{2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>o.$n});var t=a(8819),r=a(4752),o=a(8829);r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},4021:(e,n,a)=>{a.d(n,{i1:()=>s});var t=a(9950),r=a(1367),o=a(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,a]=(0,t.useState)("RM"),[s,i]=(0,t.useState)(Object.keys(o.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let r=t>=0?n[t+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";a(t)}else a("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},8317:(e,n,a)=>{a.r(n),a.d(n,{default:()=>J});var t=a(8819),r=a(9950),o=a(4492),s=a(4752),i=a(3705),l=a(1367),d=a(2674),c=a(4021),p=a(6038),u=a(2435),h=a(8666),x=a(4414);const g=s.Ay.div`
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
`,y=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=s.Ay.div`
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
  
  ${e=>"primary"===e.variant?`\n    background: ${t.w.colors.primary};\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  `:`\n    background: white;\n    color: ${t.w.colors.text.muted};\n    border: 1px solid ${t.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: ${t.w.colors.secondary};\n      border-color: #CBD5E1;\n    }\n  `}
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,C=s.Ay.div`
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
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,S=s.Ay.div`
  flex: 1;
`,A=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,E=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,R=s.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#5B21B6";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,B=s.Ay.div`
  text-align: center;
`,P=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,_=s.Ay.div`
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
`,$=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,z=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,T=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid ${t.w.colors.border};
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${t.w.colors.primary};
    color: ${t.w.colors.primary};
    background: #F4F3FF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
`,D=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 900px;
  flex-shrink: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
  }
`,M=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,N=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,O=s.Ay.input`
  flex: 0 1 250px;
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,L=s.Ay.select`
  flex: 0 0 150px;
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,Q=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,Z=s.Ay.input`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
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

  &:hover {
    border-color: #D1D5DB;
  }
`,U=s.Ay.div`
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
`,W=s.Ay.div`
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
`,Y=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,H=s.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
`,G=s.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`,J=()=>{const{user:e}=(0,l.As)(),n=(0,o.Zp)(),[a]=(0,o.ok)(),[t,s]=(0,r.useState)([]),[J,K]=(0,r.useState)(!1),{defaultCurrency:X}=(0,c.i1)(),[V,q]=(0,r.useState)("RM");(0,r.useEffect)(()=>{X&&q(X)},[X]);const[ee,ne]=(0,r.useState)(""),[ae,te]=(0,r.useState)("all"),[re,oe]=(0,r.useState)("all"),[se,ie]=(0,r.useState)(""),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)([]),[ue,he]=(0,r.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),[xe,ge]=(0,r.useState)(null),[me,ye]=(0,r.useState)(!1),[je,ve]=(0,r.useState)([]),[be,fe]=(0,r.useState)("create"),[Ce,we]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[Se,Ae]=(0,r.useState)(null),[Fe,Ee]=(0,r.useState)([]),[Re,ke]=(0,r.useState)(""),[Be,Pe]=(0,r.useState)(!1),[_e,Ie]=(0,r.useState)(!1),[$e,ze]=(0,r.useState)(null),[Te,De]=(0,r.useState)("");(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();ve(e)}}catch(e){console.error("Error fetching brands:",e)}})();const e=a.get("brandId"),n=a.get("brandName");e&&n&&(oe(e),ie(decodeURIComponent(n)))},[a]),(0,r.useEffect)(()=>{e&&(async()=>{try{if(!e)return;const n=localStorage.getItem("auth_token"),a=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=(await a.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:e.managerId||(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"1",brandName:e.managerName||e.admin_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});s(e)}else console.error("Failed to fetch restaurants from API"),s([])}catch(n){console.error("Error fetching restaurants:",n),s([])}})()},[e]);const Me=t.filter(e=>{const n=e.name.toLowerCase().includes(ee.toLowerCase())||e.location.toLowerCase().includes(ee.toLowerCase())||e.cuisine.toLowerCase().includes(ee.toLowerCase()),a="all"===ae||e.status===ae,t="all"===re||e.brand_id&&e.brand_id.toString()===re;return n&&a&&t}),Ne=t.length,Oe=t.filter(e=>"active"===e.status).length,Le=t.reduce((e,n)=>e+n.todaySales,0),Qe=t.reduce((e,n)=>e+n.todayOrders,0),Ze=t.reduce((e,n)=>e+n.staffCount,0),Ue=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,x.jsx)($,{filled:a<=e,children:"\u2605"},a));return n},We=async e=>{ke(e),Pe(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();Ee(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(g,{children:[(0,x.jsxs)(m,{children:[(0,x.jsx)(j,{children:"Restaurants"}),(0,x.jsxs)(v,{children:[(0,x.jsx)(b,{variant:"secondary",onClick:()=>{const n={exportDate:(new Date).toISOString(),totalRestaurants:t.length,manager:null===e||void 0===e?void 0:e.name,restaurants:t.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(n,null,2),r=new Blob([a],{type:"application/json"}),o=URL.createObjectURL(r),s=document.createElement("a");s.href=o,s.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},children:"Export Data"}),(0,x.jsx)(b,{variant:"primary",onClick:()=>{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"8",a=(new Date).toISOString().split("T")[0],t=new Date;t.setFullYear(t.getFullYear()+1),he({name:"",managerId:n,email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:a,subscriptionEnd:t.toISOString().split("T")[0],autoRenew:!0,enableTrial:!1}),fe("create"),we({fullName:"",email:"",username:"",password:"",phone:""}),Ae(null),Ee([]),ke(""),De(""),K(!0)},children:"Add Restaurant"})]})]}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{color:"#059669",children:[(0,x.jsx)(d.Os,{children:Ne}),(0,x.jsx)(d.v0,{children:"Total Restaurants"}),(0,x.jsx)(d.E_,{trend:"up",children:"+1 this month"})]}),(0,x.jsxs)(d.hI,{color:"#2563EB",children:[(0,x.jsx)(d.Os,{children:Oe}),(0,x.jsx)(d.v0,{children:"Active Restaurants"}),(0,x.jsxs)(d.E_,{trend:"up",children:[Math.round(Oe/Ne*100),"% operational"]})]}),(0,x.jsxs)(d.hI,{color:"#7C3AED",children:[(0,x.jsx)(d.Os,{children:(0,p.vv)(Le,V)}),(0,x.jsx)(d.v0,{children:"Today's Total Sales"}),(0,x.jsx)(d.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,x.jsxs)(d.hI,{color:"#DC2626",children:[(0,x.jsx)(d.Os,{children:Qe}),(0,x.jsx)(d.v0,{children:"Today's Orders"}),(0,x.jsx)(d.E_,{trend:"up",children:"+18% vs yesterday"})]}),(0,x.jsxs)(d.hI,{color:"#D97706",children:[(0,x.jsx)(d.Os,{children:Ze}),(0,x.jsx)(d.v0,{children:"Total Staff"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"All present"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(O,{placeholder:"Search restaurants...",value:ee,onChange:e=>ne(e.target.value)}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(Z,{type:"text",placeholder:"Search brands...",value:se,onChange:e=>(e=>{if(ie(e),de(!0),e.length<1)return void pe(je.slice(0,10));const n=je.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);pe(n)})(e.target.value),onFocus:()=>{de(!0),0===se.length&&pe(je.slice(0,10))},onBlur:()=>setTimeout(()=>de(!1),200)}),"all"!==re&&se&&(0,x.jsx)(G,{onClick:()=>{oe("all"),ie(""),de(!1),n("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,x.jsxs)(U,{show:le,children:[(0,x.jsxs)(W,{onClick:()=>{oe("all"),ie(""),de(!1),n("/pos/manager/restaurants",{replace:!0})},children:[(0,x.jsx)(Y,{children:"All Brands"}),(0,x.jsx)(H,{children:"Show all restaurants"})]}),ce.map(e=>(0,x.jsxs)(W,{onClick:()=>(e=>{oe(e.id.toString()),ie(e.name),de(!1)})(e),children:[(0,x.jsx)(Y,{children:e.name}),(0,x.jsxs)(H,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,x.jsxs)(L,{value:ae,onChange:e=>te(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,x.jsx)(f,{children:Me.map(a=>{var t;return(0,x.jsxs)(C,{onClick:()=>{return t=a.id,r=a.name,void("Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`));var t,r},children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(A,{children:a.name}),a.brand_id&&(0,x.jsx)(F,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(t=je.find(e=>e.id===a.brand_id))||void 0===t?void 0:t.name)||"Brand"}),(0,x.jsxs)(F,{children:[a.location," \u2022 ",a.cuisine]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(E,{status:a.status,children:a.status}),(0,x.jsx)(R,{plan:a.plan,children:a.plan})]})]}),(0,x.jsxs)(I,{children:[Ue(a.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \u2022 Last order: ",a.lastOrder]})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:(0,p.vv)(a.todaySales,V)}),(0,x.jsx)(_,{children:"Today's Sales"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:a.todayOrders}),(0,x.jsx)(_,{children:"Orders"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:a.staffCount}),(0,x.jsx)(_,{children:"Staff"})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{onClick:e=>((e,n)=>{var a;e.stopPropagation(),De(""),ge(n);const t=n.payment_model,r="brand_manager"===t?"manager":"restaurant"===t?"restaurant":"manager";he({name:n.name,managerId:"",email:n.email,phone:n.phone,address:n.address,city:n.city||"",state:n.state||"",postalCode:n.postalCode||"",country:n.country||"MY",businessRegistration:n.businessRegistration||"",taxId:n.taxId||"",cuisine:n.cuisine,planType:"basic"===n.plan?"Basic Plan":"professional"===n.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(a=n.monthlyFee)||void 0===a?void 0:a.toString())||"29.00",status:n.status||"active",billingCycle:"monthly",paymentModel:r,subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),ye(!0)})(e,a),children:"Edit"}),(0,x.jsx)(T,{onClick:t=>((a,t)=>{a.stopPropagation(),"Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`)})(t,a),children:"View Reports"}),(0,x.jsx)(T,{onClick:e=>((e,n)=>{e.stopPropagation(),ze(n),Ie(!0)})(e,a),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Delete"})]})]},a.id)})})]})]}),J&&(0,x.jsx)(d.mH,{show:J,onClick:()=>K(!1),children:(0,x.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Add New Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>K(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)(M,{children:[(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Restaurant Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:ue.name,onChange:e=>he({...ue,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===be?"#F0EFFF":"#F9FAFB",border:"create"===be?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"create"===be,onChange:()=>{fe("create"),Ae(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===be?"#F0EFFF":"#F9FAFB",border:"assign"===be?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"assign"===be,onChange:()=>{fe("assign"),we({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===be?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Full Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kim Owner",value:Ce.fullName,onChange:e=>we({...Ce,fullName:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Email *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"admin@restaurant.com",value:Ce.email,onChange:e=>we({...Ce,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Username *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., kim_owner",value:Ce.username,onChange:e=>we({...Ce,username:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Password *"}),(0,x.jsx)(d.ZQ,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:Ce.password,onChange:e=>we({...Ce,password:e.target.value})})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Admin Phone"}),(0,x.jsx)(h.A,{value:Ce.phone,onChange:e=>we({...Ce,phone:e}),defaultCountry:ue.country})]})]}):(0,x.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(d.lR,{children:"Search and select an existing user"}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(Z,{type:"text",placeholder:"Type to search by name, email, or username...",value:Re,onChange:e=>We(e.target.value),onFocus:()=>We(Re),onBlur:()=>setTimeout(()=>Pe(!1),200)}),(0,x.jsx)(U,{show:Be,children:0===Fe.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:Re.length>0?"No available users found":"Type to search users..."}):Fe.map(e=>(0,x.jsxs)(W,{onClick:()=>(e=>{Ae(e),ke(e.full_name||e.username),Pe(!1)})(e),children:[(0,x.jsx)(Y,{children:e.full_name||e.username}),(0,x.jsxs)(H,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Se&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Se.full_name||Se.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Se.email," \u2022 ",Se.role]})]}),(0,x.jsx)("button",{onClick:()=>{Ae(null),ke("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Email Address *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:ue.email,onChange:e=>he({...ue,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Country *"}),(0,x.jsx)(d.FX,{value:ue.country,onChange:e=>he({...ue,country:e.target.value}),children:u.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Phone Number *"}),(0,x.jsx)(h.A,{value:ue.phone,onChange:e=>he({...ue,phone:e}),defaultCountry:ue.country})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Address *"}),(0,x.jsx)(d.Lz,{placeholder:"Enter street address",value:ue.address,onChange:e=>he({...ue,address:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"City"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ue.city,onChange:e=>he({...ue,city:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"State / Province"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ue.state,onChange:e=>he({...ue,state:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Postal Code"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:ue.postalCode,onChange:e=>he({...ue,postalCode:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Cuisine Type"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ue.cuisine,onChange:e=>he({...ue,cuisine:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Business Registration No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 202401012345",value:ue.businessRegistration,onChange:e=>he({...ue,businessRegistration:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., MY1234567890",value:ue.taxId,onChange:e=>he({...ue,taxId:e.target.value})})]}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Plan Type *"}),(0,x.jsxs)(d.FX,{value:ue.planType,onChange:e=>{he({...ue,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,x.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,V),"/month)"]}),(0,x.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,V),"/month)"]}),(0,x.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,V),"/month)"]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Billing Cycle *"}),(0,x.jsxs)(d.FX,{value:ue.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[ue.planType]||a["Basic Plan"];he({...ue,billingCycle:n,planAmount:t[n]})},children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Payment Model *"}),(0,x.jsxs)(d.FX,{value:ue.paymentModel,onChange:e=>he({...ue,paymentModel:e.target.value}),children:[(0,x.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Subscription Start Date *"}),(0,x.jsx)(d.ZQ,{type:"date",value:ue.subscriptionStart,onChange:e=>he({...ue,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Subscription End Date *"}),(0,x.jsx)(d.ZQ,{type:"date",value:ue.subscriptionEnd,onChange:e=>he({...ue,subscriptionEnd:e.target.value})})]}),(0,x.jsx)(d.gE,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:ue.autoRenew,onChange:e=>he({...ue,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Summary:"})}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ue.planType," - $",ue.planAmount," (",ue.billingCycle,")"]}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===ue.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,x.jsxs)(d.jl,{children:[Te&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Te}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{K(!1),De("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async n=>{n.preventDefault(),De("");try{if("create"===be){if(!Ce.fullName||!Ce.email||!Ce.username||!Ce.password)return void De("Please fill in all required Restaurant Admin fields.");if(Ce.password.length<8)return void De("Admin password must be at least 8 characters.");if(!/[a-z]/.test(Ce.password)||!/[A-Z]/.test(Ce.password)||!/[0-9]/.test(Ce.password))return void De("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===be&&!Se)return void De("Please select an existing user as Restaurant Admin.");const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";let r=null,o=null;"Brand General"!==(null===e||void 0===e?void 0:e.role)&&"Brand Manager"!==(null===e||void 0===e?void 0:e.role)||(r=(null===e||void 0===e?void 0:e.brand_id)||null),"Foodcourt General"!==(null===e||void 0===e?void 0:e.role)&&"Foodcourt Manager"!==(null===e||void 0===e?void 0:e.role)||(o=(null===e||void 0===e?void 0:e.foodcourt_id)||null);const i={name:ue.name,address:ue.address,city:ue.city,state:ue.state,postal_code:ue.postalCode,country:ue.country,phone:ue.phone,email:ue.email,cuisine:ue.cuisine,business_registration:ue.businessRegistration||void 0,tax_id:ue.taxId||void 0,managerIds:[parseInt(n.toString())],adminAction:be,plan_type:ue.planType,plan_amount:parseFloat(ue.planAmount),status:"active",billing_cycle:ue.billingCycle,payment_model:"manager"===ue.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant",subscription_start:new Date(ue.subscriptionStart),subscription_end:new Date(ue.subscriptionEnd),auto_renew:ue.autoRenew,created_by:n,brand_id:r,foodcourt_id:o};"create"===be?(i.adminEmail=Ce.email,i.adminPassword=Ce.password,i.adminUsername=Ce.username,i.adminFullName=Ce.fullName,i.adminPhone=Ce.phone||void 0):"assign"===be&&(i.adminUserId=parseInt(Se.id.toString()));const l=localStorage.getItem("auth_token"),d=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify(i)});if(d.ok){await d.json();const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=(await n.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"",brandName:e.admin_name||"",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});s(e)}K(!1),he({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),fe("create"),we({fullName:"",email:"",username:"",password:"",phone:""}),Ae(null),Ee([]),ke("")}else{var a;const e=await d.json().catch(()=>({error:"Unknown error"}));console.error("Failed to create restaurant:",e);let n="Please try again.";if("string"===typeof e.error)n=e.error;else if(null!==(a=e.error)&&void 0!==a&&a.message){var t;n=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(n+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(n=e.message);De(`Failed to create restaurant: ${n}`)}}catch(r){console.error("Error creating restaurant:",r),De("Error creating restaurant. Please try again.")}},disabled:!ue.name.trim(),children:"Add Restaurant"})]})]})}),me&&(0,x.jsx)(d.mH,{show:me,onClick:()=>ye(!1),children:(0,x.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Edit Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)(M,{children:[(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Restaurant Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:ue.name,onChange:e=>he({...ue,name:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Email Address *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:ue.email,onChange:e=>he({...ue,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Country *"}),(0,x.jsx)(d.FX,{value:ue.country,onChange:e=>he({...ue,country:e.target.value}),children:u.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Phone Number *"}),(0,x.jsx)(h.A,{value:ue.phone,onChange:e=>he({...ue,phone:e}),defaultCountry:ue.country})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Address *"}),(0,x.jsx)(d.Lz,{placeholder:"Enter street address",value:ue.address,onChange:e=>he({...ue,address:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"City"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ue.city,onChange:e=>he({...ue,city:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"State / Province"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ue.state,onChange:e=>he({...ue,state:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Postal Code"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:ue.postalCode,onChange:e=>he({...ue,postalCode:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Cuisine Type"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ue.cuisine,onChange:e=>he({...ue,cuisine:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Business Registration No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 202401012345",value:ue.businessRegistration,onChange:e=>he({...ue,businessRegistration:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., MY1234567890",value:ue.taxId,onChange:e=>he({...ue,taxId:e.target.value})})]}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Plan Type *"}),(0,x.jsxs)(d.FX,{value:ue.planType,onChange:e=>{he({...ue,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,x.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,V),"/month)"]}),(0,x.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,V),"/month)"]}),(0,x.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,V),"/month)"]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Billing Cycle *"}),(0,x.jsxs)(d.FX,{value:ue.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[ue.planType]||a["Basic Plan"];he({...ue,billingCycle:n,planAmount:t[n]})},children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Payment Model *"}),(0,x.jsxs)(d.FX,{value:ue.paymentModel,onChange:e=>he({...ue,paymentModel:e.target.value}),children:[(0,x.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Subscription Start Date *"}),(0,x.jsx)(d.ZQ,{type:"date",value:ue.subscriptionStart,onChange:e=>he({...ue,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Subscription End Date *"}),(0,x.jsx)(d.ZQ,{type:"date",value:ue.subscriptionEnd,onChange:e=>he({...ue,subscriptionEnd:e.target.value})})]}),(0,x.jsx)(d.gE,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:ue.autoRenew,onChange:e=>he({...ue,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Summary:"})}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ue.planType," - $",ue.planAmount," (",ue.billingCycle,")"]}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===ue.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,x.jsxs)(d.jl,{children:[Te&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Te}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{ye(!1),De("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async n=>{if(n.preventDefault(),De(""),xe)try{const n=localStorage.getItem("auth_token"),a={name:ue.name,email:ue.email,phone:ue.phone,address:ue.address,city:ue.city,state:ue.state,postal_code:ue.postalCode,country:ue.country,business_registration:ue.businessRegistration||void 0,tax_id:ue.taxId||void 0,cuisine:ue.cuisine,plan_type:ue.planType,plan_amount:parseFloat(ue.planAmount),payment_model:"manager"===ue.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"},r=await fetch(`/api/restaurants/${xe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a)});if(r.ok){const n=t.map(n=>n.id===xe.id?{...n,name:ue.name,email:ue.email,phone:ue.phone,address:ue.address,location:ue.address,cuisine:ue.cuisine,status:ue.status,plan:ue.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(ue.planAmount),payment_model:"manager"===ue.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"}:n);s(n),ye(!1),ge(null),he({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1})}else{const e=await r.text();console.error("Failed to update restaurant:",e),De("Failed to update restaurant. Please try again.")}}catch(a){console.error("Error updating restaurant:",a),De("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]})]})}),_e&&$e&&(0,x.jsx)(d.mH,{show:_e,onClick:()=>Ie(!1),children:(0,x.jsxs)(D,{onClick:e=>e.stopPropagation(),style:{maxWidth:"450px"},children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Delete Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>Ie(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:$e.name})," will be permanently deleted.",(0,x.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,x.jsxs)(d.jl,{children:[(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>Ie(!1),children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async()=>{if($e)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${$e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(s(t.filter(e=>e.id!==$e.id)),Ie(!1),ze(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#DC2626"},children:"Delete Restaurant"})]})]})})]})}}}]);