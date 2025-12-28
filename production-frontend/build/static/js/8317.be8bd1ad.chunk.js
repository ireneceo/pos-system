"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8317],{3705:(e,n,a)=>{a.d(n,{cc:()=>t});var r=a(4752);const t=r.Ay.button`
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
`},4021:(e,n,a)=>{a.d(n,{i1:()=>s});var r=a(9950),t=a(1367),o=a(6038);const s=()=>{const{user:e}=(0,t.As)(),[n,a]=(0,r.useState)("RM"),[s,i]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let t=r>=0?n[r+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";a(r)}else a("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},8317:(e,n,a)=>{a.r(n),a.d(n,{default:()=>te});var r=a(9950),t=a(4492),o=a(4752),s=a(3310),i=a(3705),l=a(1367),d=a(7492),c=a(4021),p=a(6038),u=a(4414);const x=o.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,h=o.Ay.div`
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
`,g=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=o.Ay.h1`
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
`,b=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,j=o.Ay.div`
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
`,f=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,w=o.Ay.div`
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
`,F=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,E=o.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#5B21B6";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,S=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,B=o.Ay.div`
  text-align: center;
`,k=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,I=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,P=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,R=o.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,T=o.Ay.div`
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
`,z=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 10000;
`,M=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    margin: 20px;
  }
`,_=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=o.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,$=o.Ay.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,N=o.Ay.div`
  padding: 24px;
`,L=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  button {
    min-width: 120px;
  }
`,U=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,W=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Y=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,G=o.Ay.input`
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
`,J=o.Ay.select`
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
`,K=o.Ay.textarea`
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
`,V=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,H=o.Ay.input`
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
`,Z=o.Ay.select`
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
`,q=o.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,Q=o.Ay.input`
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

  &:hover {
    border-color: #D1D5DB;
  }
`,X=o.Ay.div`
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
`,ee=o.Ay.div`
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
`,ne=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,ae=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,re=o.Ay.button`
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
`,te=()=>{const{user:e,isAuthenticated:n}=(0,l.As)(),a=(0,t.Zp)(),[o]=(0,t.ok)(),[te,oe]=(0,r.useState)([]),[se,ie]=(0,r.useState)(!1),{defaultCurrency:le}=(0,c.i1)(),[de,ce]=(0,r.useState)("RM");(0,r.useEffect)(()=>{le&&ce(le)},[le]);const[pe,ue]=(0,r.useState)(""),[xe,he]=(0,r.useState)("all"),[ge,me]=(0,r.useState)("all"),[ye,be]=(0,r.useState)(""),[ve,je]=(0,r.useState)(!1),[fe,we]=(0,r.useState)([]),[Ce,Ae]=(0,r.useState)({name:"",managerId:"",email:"",phone:"",address:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"trial",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,brandId:""}),[Fe,Ee]=(0,r.useState)(null),[Se,Be]=(0,r.useState)(!1),[ke,Ie]=(0,r.useState)([]),[Pe,Re]=(0,r.useState)(!1),[Te,De]=(0,r.useState)(null);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Ie(e)}}catch(e){console.error("Error fetching brands:",e)}})();const e=o.get("brandId"),n=o.get("brandName");e&&n&&(me(e),be(decodeURIComponent(n)))},[o]),(0,r.useEffect)(()=>{console.log("\ud83d\ude80 useEffect TRIGGERED - RestaurantsPage"),console.log(" User state:",e),console.log("\u23f1\ufe0f User loading state:",{user:e,isAuthenticated:n});e&&(async()=>{try{if(!e)return console.log("\u23f3 User not loaded yet, skipping restaurant fetch"),void console.log("\u274c PROBLEM: User is null/undefined");console.log(" Current user object:",e),console.log("\ud83d\udd0d user.id:",null===e||void 0===e?void 0:e.id),console.log("\ud83d\udd0d user.role:",null===e||void 0===e?void 0:e.role),console.log(" Fetching restaurants (role-based filtering on server)"),console.log("\ud83c\udf10 API URL:","/api/restaurants"),console.log("\u26a1 MAKING API CALL NOW...");const n=localStorage.getItem("auth_token"),a=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${n}`}});if(console.log("\ud83d\udce1 Restaurants API response status:",a.status),a.ok){const e=await a.json();console.log("\ud83c\udfea Restaurant data from API:",e),console.log("\ud83d\udd04 Data length:",e.length),console.log("\ud83d\udccb Raw restaurant names:",e.map(e=>e.name));const n=e.map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||"No address provided",address:e.address||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(n=e.manager_id)||void 0===n?void 0:n.toString())||"1",brandName:e.manager_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null}});console.log("\u2705 Transformed restaurants:",n),console.log("\ud83c\udfaf Setting restaurants state with",n.length,"items"),console.log(" Restaurant names after transform:",n.map(e=>e.name)),oe(n)}else console.error("Failed to fetch restaurants from API"),oe([])}catch(n){console.error("Error fetching restaurants:",n),oe([])}})()},[e]);const ze=te.filter(e=>{const n=e.name.toLowerCase().includes(pe.toLowerCase())||e.location.toLowerCase().includes(pe.toLowerCase())||e.cuisine.toLowerCase().includes(pe.toLowerCase()),a="all"===xe||e.status===xe,r="all"===ge||e.brand_id&&e.brand_id.toString()===ge;return n&&a&&r}),Me=te.length,_e=te.filter(e=>"active"===e.status).length,Oe=te.reduce((e,n)=>e+n.todaySales,0),$e=te.reduce((e,n)=>e+n.todayOrders,0),Ne=te.reduce((e,n)=>e+n.staffCount,0);console.log("\ud83d\uddbc\ufe0f RENDER: Current restaurants state:",te),console.log(" RENDER: totalRestaurants =",Me);const Le=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,u.jsx)(R,{filled:a<=e,children:"\u2605"},a));return n};return(0,u.jsxs)(s.A,{children:[(0,u.jsxs)(x,{children:[(0,u.jsxs)(h,{children:[(0,u.jsx)(m,{children:"Restaurants"}),(0,u.jsxs)(y,{children:[(0,u.jsx)(b,{variant:"secondary",onClick:()=>{const n={exportDate:(new Date).toISOString(),totalRestaurants:te.length,manager:null===e||void 0===e?void 0:e.name,restaurants:te.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(n,null,2),r=new Blob([a],{type:"application/json"}),t=URL.createObjectURL(r),o=document.createElement("a");o.href=t,o.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t)},children:"Export Data"}),(0,u.jsx)(b,{variant:"primary",onClick:()=>{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"8",a=(new Date).toISOString().split("T")[0],r=new Date;r.setFullYear(r.getFullYear()+1),Ae({name:"",managerId:n,email:"",phone:"",address:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"trial",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:a,subscriptionEnd:r.toISOString().split("T")[0],autoRenew:!0,brandId:""}),ie(!0)},children:"Add Restaurant"})]})]}),(0,u.jsxs)(g,{children:[(0,u.jsxs)(d.MD,{children:[(0,u.jsxs)(d.hI,{color:"#059669",children:[(0,u.jsx)(d.Os,{children:Me}),(0,u.jsx)(d.v0,{children:"Total Restaurants"}),(0,u.jsx)(d.E_,{trend:"up",children:"+1 this month"})]}),(0,u.jsxs)(d.hI,{color:"#2563EB",children:[(0,u.jsx)(d.Os,{children:_e}),(0,u.jsx)(d.v0,{children:"Active Restaurants"}),(0,u.jsxs)(d.E_,{trend:"up",children:[Math.round(_e/Me*100),"% operational"]})]}),(0,u.jsxs)(d.hI,{color:"#7C3AED",children:[(0,u.jsx)(d.Os,{children:(0,p.vv)(Oe,de)}),(0,u.jsx)(d.v0,{children:"Today's Total Sales"}),(0,u.jsx)(d.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,u.jsxs)(d.hI,{color:"#DC2626",children:[(0,u.jsx)(d.Os,{children:$e}),(0,u.jsx)(d.v0,{children:"Today's Orders"}),(0,u.jsx)(d.E_,{trend:"up",children:"+18% vs yesterday"})]}),(0,u.jsxs)(d.hI,{color:"#D97706",children:[(0,u.jsx)(d.Os,{children:Ne}),(0,u.jsx)(d.v0,{children:"Total Staff"}),(0,u.jsx)(d.E_,{trend:"neutral",children:"All present"})]})]}),(0,u.jsxs)(V,{children:[(0,u.jsx)(H,{placeholder:"Search restaurants...",value:pe,onChange:e=>ue(e.target.value)}),(0,u.jsxs)(q,{children:[(0,u.jsx)(Q,{type:"text",placeholder:"Search brands...",value:ye,onChange:e=>(e=>{if(be(e),je(!0),e.length<1)return void we(ke.slice(0,10));const n=ke.filter(n=>{const a=e.toLowerCase(),r=(n.name||"").toLowerCase(),t=(n.code||"").toLowerCase();return r.includes(a)||t.includes(a)}).slice(0,10);we(n)})(e.target.value),onFocus:()=>{je(!0),0===ye.length&&we(ke.slice(0,10))},onBlur:()=>setTimeout(()=>je(!1),200)}),"all"!==ge&&ye&&(0,u.jsx)(re,{onClick:()=>{me("all"),be(""),je(!1),a("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,u.jsxs)(X,{show:ve,children:[(0,u.jsxs)(ee,{onClick:()=>{me("all"),be(""),je(!1),a("/pos/manager/restaurants",{replace:!0})},children:[(0,u.jsx)(ne,{children:"All Brands"}),(0,u.jsx)(ae,{children:"Show all restaurants"})]}),fe.map(e=>(0,u.jsxs)(ee,{onClick:()=>(e=>{me(e.id.toString()),be(e.name),je(!1)})(e),children:[(0,u.jsx)(ne,{children:e.name}),(0,u.jsxs)(ae,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,u.jsxs)(Z,{value:xe,onChange:e=>he(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"trial",children:"Trial"}),(0,u.jsx)("option",{value:"expired",children:"Expired"}),(0,u.jsx)("option",{value:"suspended",children:"Suspended"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,u.jsx)(v,{children:ze.map(n=>{var r;return(0,u.jsxs)(j,{onClick:()=>{return r=n.id,t=n.name,void("Brand General"===(null===e||void 0===e?void 0:e.role)?a(`/pos/brand/general/reports?tab=sales&restaurantId=${r}&restaurantName=${encodeURIComponent(t)}`):a(`/pos/manager/reports?tab=sales&restaurantId=${r}&restaurantName=${encodeURIComponent(t)}`));var r,t},children:[(0,u.jsxs)(f,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(C,{children:n.name}),n.brand_id&&(0,u.jsx)(A,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(r=ke.find(e=>e.id===n.brand_id))||void 0===r?void 0:r.name)||"Brand"}),(0,u.jsxs)(A,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(F,{status:n.status,children:n.status}),(0,u.jsx)(E,{plan:n.plan,children:n.plan})]})]}),(0,u.jsxs)(P,{children:[Le(n.rating),(0,u.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Last order: ",n.lastOrder]})]}),(0,u.jsxs)(S,{children:[(0,u.jsxs)(B,{children:[(0,u.jsx)(k,{children:(0,p.vv)(n.todaySales,de)}),(0,u.jsx)(I,{children:"Today's Sales"})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)(k,{children:n.todayOrders}),(0,u.jsx)(I,{children:"Orders"})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)(k,{children:n.staffCount}),(0,u.jsx)(I,{children:"Staff"})]})]}),(0,u.jsxs)(T,{children:[(0,u.jsx)(D,{onClick:e=>((e,n)=>{var a,r;e.stopPropagation(),Ee(n),Ae({name:n.name,managerId:n.brandId||"",email:n.email,phone:n.phone,address:n.address,cuisine:n.cuisine,planType:"basic"===n.plan?"Basic Plan":"professional"===n.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(a=n.monthlyFee)||void 0===a?void 0:a.toString())||"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,brandId:(null===(r=n.brand_id)||void 0===r?void 0:r.toString())||""}),Be(!0)})(e,n),children:"Edit"}),(0,u.jsx)(D,{onClick:r=>((n,r)=>{n.stopPropagation(),"Brand General"===(null===e||void 0===e?void 0:e.role)?a(`/pos/brand/general/reports?tab=sales&restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`):a(`/pos/manager/reports?tab=sales&restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`)})(r,n),children:"View Reports"}),(0,u.jsx)(D,{onClick:e=>((e,n)=>{e.stopPropagation(),De(n),Re(!0)})(e,n),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Delete"})]})]},n.id)})})]})]}),se&&(0,u.jsx)(z,{show:se,onClick:()=>ie(!1),children:(0,u.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(_,{children:[(0,u.jsx)(O,{children:"Add New Restaurant"}),(0,u.jsx)($,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,u.jsx)(N,{children:(0,u.jsxs)(U,{children:[(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Restaurant Name *"}),(0,u.jsx)(G,{type:"text",placeholder:"Enter restaurant name",value:Ce.name,onChange:e=>Ae({...Ce,name:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Manager *"}),(0,u.jsx)(G,{type:"text",value:(null===e||void 0===e?void 0:e.name)||"K-DINE Chain Manager",disabled:!0})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Email Address *"}),(0,u.jsx)(G,{type:"email",placeholder:"restaurant@example.com",value:Ce.email,onChange:e=>Ae({...Ce,email:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Phone Number *"}),(0,u.jsx)(G,{type:"tel",placeholder:"+60123456789",value:Ce.phone,onChange:e=>Ae({...Ce,phone:e.target.value})})]}),(0,u.jsxs)(W,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(Y,{children:"Address *"}),(0,u.jsx)(K,{placeholder:"Enter restaurant address",value:Ce.address,onChange:e=>Ae({...Ce,address:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Cuisine Type"}),(0,u.jsx)(G,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ce.cuisine,onChange:e=>Ae({...Ce,cuisine:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Brand (Franchise)"}),(0,u.jsxs)(J,{value:Ce.brandId,onChange:e=>Ae({...Ce,brandId:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"-- Independent (No Brand) --"}),ke.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",e.code,") - ",e.currency]},e.id))]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Plan Type *"}),(0,u.jsxs)(J,{value:Ce.planType,onChange:e=>{Ae({...Ce,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,u.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,de),"/month)"]}),(0,u.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,de),"/month)"]}),(0,u.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,de),"/month)"]})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Status *"}),(0,u.jsxs)(J,{value:Ce.status,onChange:e=>Ae({...Ce,status:e.target.value}),children:[(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"trial",children:"Trial"}),(0,u.jsx)("option",{value:"expired",children:"Expired"}),(0,u.jsx)("option",{value:"suspended",children:"Suspended"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,u.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,u.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Billing Cycle *"}),(0,u.jsxs)(J,{value:Ce.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},r=a[Ce.planType]||a["Basic Plan"];Ae({...Ce,billingCycle:n,planAmount:r[n]})},children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Payment Model *"}),(0,u.jsxs)(J,{value:Ce.paymentModel,onChange:e=>Ae({...Ce,paymentModel:e.target.value}),children:[(0,u.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,u.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Subscription Start Date *"}),(0,u.jsx)(G,{type:"date",value:Ce.subscriptionStart,onChange:e=>Ae({...Ce,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Subscription End Date *"}),(0,u.jsx)(G,{type:"date",value:Ce.subscriptionEnd,onChange:e=>Ae({...Ce,subscriptionEnd:e.target.value})})]}),(0,u.jsx)(W,{style:{gridColumn:"1 / -1"},children:(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,u.jsx)("input",{type:"checkbox",checked:Ce.autoRenew,onChange:e=>Ae({...Ce,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,u.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,u.jsx)("strong",{children:"Summary:"})}),(0,u.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ce.planType," - $",Ce.planAmount," (",Ce.billingCycle,")"]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===Ce.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,u.jsxs)(L,{children:[(0,u.jsx)(i.cc,{variant:"cancel",onClick:()=>ie(!1),children:"Cancel"}),(0,u.jsx)(i.cc,{variant:"primary",onClick:async n=>{n.preventDefault(),console.log("\ud83d\udd04 Restaurant submit called with data:",Ce);try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a=(null===e||void 0===e?void 0:e.name)||"Manager",r={name:Ce.name,address:Ce.address,phone:Ce.phone,email:Ce.email,cuisine:Ce.cuisine,manager_id:n,manager_name:a,plan_type:Ce.planType,plan_amount:parseFloat(Ce.planAmount),status:Ce.status,billing_cycle:Ce.billingCycle,payment_model:Ce.paymentModel,subscription_start:new Date(Ce.subscriptionStart),subscription_end:new Date(Ce.subscriptionEnd),auto_renew:Ce.autoRenew,created_by:n,brand_id:Ce.brandId?parseInt(Ce.brandId):null};console.log("\ud83c\udfd7\ufe0f Creating new restaurant:",r);const t=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(console.log("\ud83d\udce1 Create restaurant response status:",t.status),t.ok){const n=await t.json();console.log("\u2705 Restaurant created successfully:",n);const a=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"8",r=await fetch(`/api/restaurants/manager/${a}`);if(r.ok){const e=(await r.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||"No address provided",address:e.address||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(n=e.manager_id)||void 0===n?void 0:n.toString())||"1",brandName:e.manager_name||"Manager Brand",cuisine:"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:Math.floor(5e3*Math.random())+1e3,todayOrders:Math.floor(100*Math.random())+20,staffCount:Math.floor(10*Math.random())+3,rating:Math.round(10*(2*Math.random()+3))/10,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:`${Math.floor(60*Math.random())} mins ago`,monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0]}});oe(e)}ie(!1),alert(`Restaurant "${Ce.name}" added successfully with ${Ce.planType}!`),Ae({name:"",managerId:"",email:"",phone:"",address:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"trial",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,brandId:""})}else{const e=await t.text();console.error("Failed to create restaurant:",e),alert("Failed to create restaurant. Please try again.")}}catch(a){console.error("Error creating restaurant:",a),alert("Error creating restaurant. Please try again.")}},children:"Add Restaurant"})]})]})}),Se&&(0,u.jsx)(z,{show:Se,onClick:()=>Be(!1),children:(0,u.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(_,{children:[(0,u.jsx)(O,{children:"Edit Restaurant"}),(0,u.jsx)($,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,u.jsx)(N,{children:(0,u.jsxs)(U,{children:[(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Restaurant Name *"}),(0,u.jsx)(G,{type:"text",placeholder:"Enter restaurant name",value:Ce.name,onChange:e=>Ae({...Ce,name:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Manager *"}),(0,u.jsx)(G,{type:"text",value:(null===e||void 0===e?void 0:e.name)||"K-DINE Chain Manager",disabled:!0})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Email Address *"}),(0,u.jsx)(G,{type:"email",placeholder:"restaurant@example.com",value:Ce.email,onChange:e=>Ae({...Ce,email:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Phone Number *"}),(0,u.jsx)(G,{type:"tel",placeholder:"+60123456789",value:Ce.phone,onChange:e=>Ae({...Ce,phone:e.target.value})})]}),(0,u.jsxs)(W,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(Y,{children:"Address *"}),(0,u.jsx)(K,{placeholder:"Enter restaurant address",value:Ce.address,onChange:e=>Ae({...Ce,address:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Cuisine Type"}),(0,u.jsx)(G,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ce.cuisine,onChange:e=>Ae({...Ce,cuisine:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Brand (Franchise)"}),(0,u.jsxs)(J,{value:Ce.brandId,onChange:e=>Ae({...Ce,brandId:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"-- Independent (No Brand) --"}),ke.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",e.code,") - ",e.currency]},e.id))]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Plan Type *"}),(0,u.jsxs)(J,{value:Ce.planType,onChange:e=>{Ae({...Ce,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,u.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,de),"/month)"]}),(0,u.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,de),"/month)"]}),(0,u.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,de),"/month)"]})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Status *"}),(0,u.jsxs)(J,{value:Ce.status,onChange:e=>Ae({...Ce,status:e.target.value}),children:[(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"trial",children:"Trial"}),(0,u.jsx)("option",{value:"expired",children:"Expired"}),(0,u.jsx)("option",{value:"suspended",children:"Suspended"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,u.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,u.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Billing Cycle *"}),(0,u.jsxs)(J,{value:Ce.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},r=a[Ce.planType]||a["Basic Plan"];Ae({...Ce,billingCycle:n,planAmount:r[n]})},children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Payment Model *"}),(0,u.jsxs)(J,{value:Ce.paymentModel,onChange:e=>Ae({...Ce,paymentModel:e.target.value}),children:[(0,u.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,u.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Subscription Start Date *"}),(0,u.jsx)(G,{type:"date",value:Ce.subscriptionStart,onChange:e=>Ae({...Ce,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(Y,{children:"Subscription End Date *"}),(0,u.jsx)(G,{type:"date",value:Ce.subscriptionEnd,onChange:e=>Ae({...Ce,subscriptionEnd:e.target.value})})]}),(0,u.jsx)(W,{style:{gridColumn:"1 / -1"},children:(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,u.jsx)("input",{type:"checkbox",checked:Ce.autoRenew,onChange:e=>Ae({...Ce,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,u.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,u.jsx)("strong",{children:"Summary:"})}),(0,u.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ce.planType," - $",Ce.planAmount," (",Ce.billingCycle,")"]}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===Ce.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,u.jsxs)(L,{children:[(0,u.jsx)(i.cc,{variant:"cancel",onClick:()=>Be(!1),children:"Cancel"}),(0,u.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Fe)try{const e=localStorage.getItem("auth_token"),n={name:Ce.name,email:Ce.email,phone:Ce.phone,address:Ce.address,cuisine:Ce.cuisine,status:Ce.status,plan_type:Ce.planType,plan_amount:parseFloat(Ce.planAmount),brand_id:Ce.brandId?parseInt(Ce.brandId):null};console.log("\ud83d\udd04 Updating restaurant:",Fe.id,n);const a=await fetch(`/api/restaurants/${Fe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(a.ok){const e=te.map(e=>e.id===Fe.id?{...e,name:Ce.name,email:Ce.email,phone:Ce.phone,address:Ce.address,location:Ce.address,cuisine:Ce.cuisine,status:Ce.status,plan:Ce.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(Ce.planAmount),brand_id:Ce.brandId?parseInt(Ce.brandId):void 0}:e);oe(e),Be(!1),Ee(null),Ae({name:"",managerId:"",email:"",phone:"",address:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"trial",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,brandId:""}),console.log("\u2705 Restaurant updated successfully")}else{const e=await a.text();console.error("Failed to update restaurant:",e),alert("Failed to update restaurant. Please try again.")}}catch(n){console.error("Error updating restaurant:",n),alert("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]})]})}),Pe&&Te&&(0,u.jsx)(z,{show:Pe,onClick:()=>Re(!1),children:(0,u.jsxs)(M,{onClick:e=>e.stopPropagation(),style:{maxWidth:"450px"},children:[(0,u.jsxs)(_,{children:[(0,u.jsx)(O,{children:"Delete Restaurant"}),(0,u.jsx)($,{onClick:()=>Re(!1),children:"\xd7"})]}),(0,u.jsx)(N,{children:(0,u.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,u.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,u.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,u.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,u.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,u.jsx)("strong",{style:{color:"#DC2626"},children:Te.name})," will be permanently deleted.",(0,u.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,u.jsxs)(L,{children:[(0,u.jsx)(i.cc,{variant:"cancel",onClick:()=>Re(!1),children:"Cancel"}),(0,u.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Te)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${Te.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(oe(te.filter(e=>e.id!==Te.id)),Re(!1),De(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#DC2626"},children:"Delete Restaurant"})]})]})})]})}}}]);