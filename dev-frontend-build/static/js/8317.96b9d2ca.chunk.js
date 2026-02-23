"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8317],{2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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
`},4021:(e,n,a)=>{a.d(n,{i1:()=>s});var t=a(9950),r=a(1367),o=a(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,a]=(0,t.useState)("RM"),[s,i]=(0,t.useState)(Object.keys(o.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let r=t>=0?n[t+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";a(t)}else a("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},8317:(e,n,a)=>{a.r(n),a.d(n,{default:()=>se});var t=a(9950),r=a(4492),o=a(4752),s=a(3310),i=a(3705),l=a(1367),d=a(2674),c=a(4021),p=a(6038),u=a(2435),x=a(8666),h=a(4414);const g=o.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,m=o.Ay.div`
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
`,y=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=o.Ay.div`
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
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,C=o.Ay.div`
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
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,F=o.Ay.div`
  flex: 1;
`,A=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,E=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,B=o.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#5B21B6";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,P=o.Ay.div`
  text-align: center;
`,_=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,z=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,I=o.Ay.div`
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
`,M=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  align-items: flex-start;
  justify-content: center;
  z-index: 10000;
  overflow-y: auto;
  padding: 40px 0;
`,N=o.Ay.div`
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
`,$=o.Ay.div`
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
`,L=o.Ay.button`
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
`,U=o.Ay.div`
  padding: 24px;
`,Y=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  button {
    min-width: 120px;
  }
`,W=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,G=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,K=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,H=o.Ay.input`
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
`,V=o.Ay.textarea`
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
`,q=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,Z=o.Ay.input`
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
`,Q=o.Ay.select`
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
`,X=o.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,ee=o.Ay.input`
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
`,ne=o.Ay.div`
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
`,ae=o.Ay.div`
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
`,te=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,re=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,oe=o.Ay.button`
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
`,se=()=>{const{user:e}=(0,l.As)(),n=(0,r.Zp)(),[a]=(0,r.ok)(),[o,se]=(0,t.useState)([]),[ie,le]=(0,t.useState)(!1),{defaultCurrency:de}=(0,c.i1)(),[ce,pe]=(0,t.useState)("RM");(0,t.useEffect)(()=>{de&&pe(de)},[de]);const[ue,xe]=(0,t.useState)(""),[he,ge]=(0,t.useState)("all"),[me,ye]=(0,t.useState)("all"),[be,ve]=(0,t.useState)(""),[je,fe]=(0,t.useState)(!1),[Ce,we]=(0,t.useState)([]),[Fe,Ae]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),[Se,Ee]=(0,t.useState)(null),[Be,ke]=(0,t.useState)(!1),[Pe,_e]=(0,t.useState)([]),[ze,Ie]=(0,t.useState)("create"),[Re,Te]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[De,Me]=(0,t.useState)(null),[Ne,$e]=(0,t.useState)([]),[Oe,Le]=(0,t.useState)(""),[Ue,Ye]=(0,t.useState)(!1),[We,Ge]=(0,t.useState)(!1),[Ke,He]=(0,t.useState)(null),[Je,Ve]=(0,t.useState)("");(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();_e(e)}}catch(e){console.error("Error fetching brands:",e)}})();const e=a.get("brandId"),n=a.get("brandName");e&&n&&(ye(e),ve(decodeURIComponent(n)))},[a]),(0,t.useEffect)(()=>{e&&(async()=>{try{if(!e)return;const n=localStorage.getItem("auth_token"),a=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=(await a.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:e.managerId||(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"1",brandName:e.managerName||e.admin_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});se(e)}else console.error("Failed to fetch restaurants from API"),se([])}catch(n){console.error("Error fetching restaurants:",n),se([])}})()},[e]);const qe=o.filter(e=>{const n=e.name.toLowerCase().includes(ue.toLowerCase())||e.location.toLowerCase().includes(ue.toLowerCase())||e.cuisine.toLowerCase().includes(ue.toLowerCase()),a="all"===he||e.status===he,t="all"===me||e.brand_id&&e.brand_id.toString()===me;return n&&a&&t}),Ze=o.length,Qe=o.filter(e=>"active"===e.status).length,Xe=o.reduce((e,n)=>e+n.todaySales,0),en=o.reduce((e,n)=>e+n.todayOrders,0),nn=o.reduce((e,n)=>e+n.staffCount,0),an=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,h.jsx)(R,{filled:a<=e,children:"\u2605"},a));return n},tn=async e=>{Le(e),Ye(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();$e(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}};return(0,h.jsxs)(s.A,{children:[(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(b,{children:"Restaurants"}),(0,h.jsxs)(v,{children:[(0,h.jsx)(j,{variant:"secondary",onClick:()=>{const n={exportDate:(new Date).toISOString(),totalRestaurants:o.length,manager:null===e||void 0===e?void 0:e.name,restaurants:o.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(n,null,2),t=new Blob([a],{type:"application/json"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:"Export Data"}),(0,h.jsx)(j,{variant:"primary",onClick:()=>{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"8",a=(new Date).toISOString().split("T")[0],t=new Date;t.setFullYear(t.getFullYear()+1),Ae({name:"",managerId:n,email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:a,subscriptionEnd:t.toISOString().split("T")[0],autoRenew:!0,enableTrial:!1}),Ie("create"),Te({fullName:"",email:"",username:"",password:"",phone:""}),Me(null),$e([]),Le(""),Ve(""),le(!0)},children:"Add Restaurant"})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{color:"#059669",children:[(0,h.jsx)(d.Os,{children:Ze}),(0,h.jsx)(d.v0,{children:"Total Restaurants"}),(0,h.jsx)(d.E_,{trend:"up",children:"+1 this month"})]}),(0,h.jsxs)(d.hI,{color:"#2563EB",children:[(0,h.jsx)(d.Os,{children:Qe}),(0,h.jsx)(d.v0,{children:"Active Restaurants"}),(0,h.jsxs)(d.E_,{trend:"up",children:[Math.round(Qe/Ze*100),"% operational"]})]}),(0,h.jsxs)(d.hI,{color:"#7C3AED",children:[(0,h.jsx)(d.Os,{children:(0,p.vv)(Xe,ce)}),(0,h.jsx)(d.v0,{children:"Today's Total Sales"}),(0,h.jsx)(d.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,h.jsxs)(d.hI,{color:"#DC2626",children:[(0,h.jsx)(d.Os,{children:en}),(0,h.jsx)(d.v0,{children:"Today's Orders"}),(0,h.jsx)(d.E_,{trend:"up",children:"+18% vs yesterday"})]}),(0,h.jsxs)(d.hI,{color:"#D97706",children:[(0,h.jsx)(d.Os,{children:nn}),(0,h.jsx)(d.v0,{children:"Total Staff"}),(0,h.jsx)(d.E_,{trend:"neutral",children:"All present"})]})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)(Z,{placeholder:"Search restaurants...",value:ue,onChange:e=>xe(e.target.value)}),(0,h.jsxs)(X,{children:[(0,h.jsx)(ee,{type:"text",placeholder:"Search brands...",value:be,onChange:e=>(e=>{if(ve(e),fe(!0),e.length<1)return void we(Pe.slice(0,10));const n=Pe.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);we(n)})(e.target.value),onFocus:()=>{fe(!0),0===be.length&&we(Pe.slice(0,10))},onBlur:()=>setTimeout(()=>fe(!1),200)}),"all"!==me&&be&&(0,h.jsx)(oe,{onClick:()=>{ye("all"),ve(""),fe(!1),n("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,h.jsxs)(ne,{show:je,children:[(0,h.jsxs)(ae,{onClick:()=>{ye("all"),ve(""),fe(!1),n("/pos/manager/restaurants",{replace:!0})},children:[(0,h.jsx)(te,{children:"All Brands"}),(0,h.jsx)(re,{children:"Show all restaurants"})]}),Ce.map(e=>(0,h.jsxs)(ae,{onClick:()=>(e=>{ye(e.id.toString()),ve(e.name),fe(!1)})(e),children:[(0,h.jsx)(te,{children:e.name}),(0,h.jsxs)(re,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,h.jsxs)(Q,{value:he,onChange:e=>ge(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)(f,{children:qe.map(a=>{var t;return(0,h.jsxs)(C,{onClick:()=>{return t=a.id,r=a.name,void("Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`));var t,r},children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{children:a.name}),a.brand_id&&(0,h.jsx)(S,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(t=Pe.find(e=>e.id===a.brand_id))||void 0===t?void 0:t.name)||"Brand"}),(0,h.jsxs)(S,{children:[a.location," \u2022 ",a.cuisine]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(E,{status:a.status,children:a.status}),(0,h.jsx)(B,{plan:a.plan,children:a.plan})]})]}),(0,h.jsxs)(I,{children:[an(a.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \u2022 Last order: ",a.lastOrder]})]}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:(0,p.vv)(a.todaySales,ce)}),(0,h.jsx)(z,{children:"Today's Sales"})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:a.todayOrders}),(0,h.jsx)(z,{children:"Orders"})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:a.staffCount}),(0,h.jsx)(z,{children:"Staff"})]})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)(D,{onClick:e=>((e,n)=>{var a;e.stopPropagation(),Ve(""),Ee(n);const t=n.payment_model,r="brand_manager"===t?"manager":"restaurant"===t?"restaurant":"manager";Ae({name:n.name,managerId:"",email:n.email,phone:n.phone,address:n.address,city:n.city||"",state:n.state||"",postalCode:n.postalCode||"",country:n.country||"MY",businessRegistration:n.businessRegistration||"",taxId:n.taxId||"",cuisine:n.cuisine,planType:"basic"===n.plan?"Basic Plan":"professional"===n.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(a=n.monthlyFee)||void 0===a?void 0:a.toString())||"29.00",status:n.status||"active",billingCycle:"monthly",paymentModel:r,subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),ke(!0)})(e,a),children:"Edit"}),(0,h.jsx)(D,{onClick:t=>((a,t)=>{a.stopPropagation(),"Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`)})(t,a),children:"View Reports"}),(0,h.jsx)(D,{onClick:e=>((e,n)=>{e.stopPropagation(),He(n),Ge(!0)})(e,a),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Delete"})]})]},a.id)})})]})]}),ie&&(0,h.jsx)(M,{show:ie,onClick:()=>le(!1),children:(0,h.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)($,{children:[(0,h.jsx)(O,{children:"Add New Restaurant"}),(0,h.jsx)(L,{onClick:()=>le(!1),children:"\xd7"})]}),(0,h.jsx)(U,{children:(0,h.jsxs)(W,{children:[(0,h.jsxs)(G,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(K,{children:"Restaurant Name *"}),(0,h.jsx)(H,{type:"text",placeholder:"Enter restaurant name",value:Fe.name,onChange:e=>Ae({...Fe,name:e.target.value})})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===ze?"#F0EFFF":"#F9FAFB",border:"create"===ze?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"create"===ze,onChange:()=>{Ie("create"),Me(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===ze?"#F0EFFF":"#F9FAFB",border:"assign"===ze?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"assign"===ze,onChange:()=>{Ie("assign"),Te({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===ze?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Admin Full Name *"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Kim Owner",value:Re.fullName,onChange:e=>Te({...Re,fullName:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Admin Email *"}),(0,h.jsx)(H,{type:"email",placeholder:"admin@restaurant.com",value:Re.email,onChange:e=>Te({...Re,email:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Admin Username *"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., kim_owner",value:Re.username,onChange:e=>Te({...Re,username:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Admin Password *"}),(0,h.jsx)(H,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:Re.password,onChange:e=>Te({...Re,password:e.target.value})})]}),(0,h.jsxs)(G,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(K,{children:"Admin Phone"}),(0,h.jsx)(x.A,{value:Re.phone,onChange:e=>Te({...Re,phone:e}),defaultCountry:Fe.country})]})]}):(0,h.jsxs)(G,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(K,{children:"Search and select an existing user"}),(0,h.jsxs)(X,{children:[(0,h.jsx)(ee,{type:"text",placeholder:"Type to search by name, email, or username...",value:Oe,onChange:e=>tn(e.target.value),onFocus:()=>tn(Oe),onBlur:()=>setTimeout(()=>Ye(!1),200)}),(0,h.jsx)(ne,{show:Ue,children:0===Ne.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:Oe.length>0?"No available users found":"Type to search users..."}):Ne.map(e=>(0,h.jsxs)(ae,{onClick:()=>(e=>{Me(e),Le(e.full_name||e.username),Ye(!1)})(e),children:[(0,h.jsx)(te,{children:e.full_name||e.username}),(0,h.jsxs)(re,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),De&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:De.full_name||De.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[De.email," \u2022 ",De.role]})]}),(0,h.jsx)("button",{onClick:()=>{Me(null),Le("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Email Address *"}),(0,h.jsx)(H,{type:"email",placeholder:"restaurant@example.com",value:Fe.email,onChange:e=>Ae({...Fe,email:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Country *"}),(0,h.jsx)(J,{value:Fe.country,onChange:e=>Ae({...Fe,country:e.target.value}),children:u.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Phone Number *"}),(0,h.jsx)(x.A,{value:Fe.phone,onChange:e=>Ae({...Fe,phone:e}),defaultCountry:Fe.country})]}),(0,h.jsxs)(G,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(K,{children:"Address *"}),(0,h.jsx)(V,{placeholder:"Enter street address",value:Fe.address,onChange:e=>Ae({...Fe,address:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"City"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Fe.city,onChange:e=>Ae({...Fe,city:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"State"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:Fe.state,onChange:e=>Ae({...Fe,state:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Postal Code"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., 50000",value:Fe.postalCode,onChange:e=>Ae({...Fe,postalCode:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Cuisine Type"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Fe.cuisine,onChange:e=>Ae({...Fe,cuisine:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Business Registration No."}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., 202401012345",value:Fe.businessRegistration,onChange:e=>Ae({...Fe,businessRegistration:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Tax ID"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., MY1234567890",value:Fe.taxId,onChange:e=>Ae({...Fe,taxId:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Plan Type *"}),(0,h.jsxs)(J,{value:Fe.planType,onChange:e=>{Ae({...Fe,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,h.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,ce),"/month)"]}),(0,h.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,ce),"/month)"]}),(0,h.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,ce),"/month)"]})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Billing Cycle *"}),(0,h.jsxs)(J,{value:Fe.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Fe.planType]||a["Basic Plan"];Ae({...Fe,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Payment Model *"}),(0,h.jsxs)(J,{value:Fe.paymentModel,onChange:e=>Ae({...Fe,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Subscription Start Date *"}),(0,h.jsx)(H,{type:"date",value:Fe.subscriptionStart,onChange:e=>Ae({...Fe,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Subscription End Date *"}),(0,h.jsx)(H,{type:"date",value:Fe.subscriptionEnd,onChange:e=>Ae({...Fe,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(G,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:Fe.autoRenew,onChange:e=>Ae({...Fe,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Fe.planType," - $",Fe.planAmount," (",Fe.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===Fe.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,h.jsxs)(Y,{children:[Je&&(0,h.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Je}),(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{le(!1),Ve("")},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async n=>{n.preventDefault(),Ve("");try{if("create"===ze){if(!Re.fullName||!Re.email||!Re.username||!Re.password)return void Ve("Please fill in all required Restaurant Admin fields.");if(Re.password.length<8)return void Ve("Admin password must be at least 8 characters.");if(!/[a-z]/.test(Re.password)||!/[A-Z]/.test(Re.password)||!/[0-9]/.test(Re.password))return void Ve("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===ze&&!De)return void Ve("Please select an existing user as Restaurant Admin.");const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";let r=null,o=null;"Brand General"!==(null===e||void 0===e?void 0:e.role)&&"Brand Manager"!==(null===e||void 0===e?void 0:e.role)||(r=(null===e||void 0===e?void 0:e.brand_id)||null),"Foodcourt General"!==(null===e||void 0===e?void 0:e.role)&&"Foodcourt Manager"!==(null===e||void 0===e?void 0:e.role)||(o=(null===e||void 0===e?void 0:e.foodcourt_id)||null);const s={name:Fe.name,address:Fe.address,city:Fe.city,state:Fe.state,postal_code:Fe.postalCode,country:Fe.country,phone:Fe.phone,email:Fe.email,cuisine:Fe.cuisine,business_registration:Fe.businessRegistration||void 0,tax_id:Fe.taxId||void 0,managerIds:[parseInt(n.toString())],adminAction:ze,plan_type:Fe.planType,plan_amount:parseFloat(Fe.planAmount),status:"active",billing_cycle:Fe.billingCycle,payment_model:"manager"===Fe.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant",subscription_start:new Date(Fe.subscriptionStart),subscription_end:new Date(Fe.subscriptionEnd),auto_renew:Fe.autoRenew,created_by:n,brand_id:r,foodcourt_id:o};"create"===ze?(s.adminEmail=Re.email,s.adminPassword=Re.password,s.adminUsername=Re.username,s.adminFullName=Re.fullName,s.adminPhone=Re.phone||void 0):"assign"===ze&&(s.adminUserId=parseInt(De.id.toString()));const i=localStorage.getItem("auth_token"),l=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(s)});if(l.ok){await l.json();const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=(await n.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"",brandName:e.admin_name||"",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});se(e)}le(!1),Ae({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Ie("create"),Te({fullName:"",email:"",username:"",password:"",phone:""}),Me(null),$e([]),Le("")}else{var a;const e=await l.json().catch(()=>({error:"Unknown error"}));console.error("Failed to create restaurant:",e);let n="Please try again.";if("string"===typeof e.error)n=e.error;else if(null!==(a=e.error)&&void 0!==a&&a.message){var t;n=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(n+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(n=e.message);Ve(`Failed to create restaurant: ${n}`)}}catch(r){console.error("Error creating restaurant:",r),Ve("Error creating restaurant. Please try again.")}},children:"Add Restaurant"})]})]})}),Be&&(0,h.jsx)(M,{show:Be,onClick:()=>ke(!1),children:(0,h.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)($,{children:[(0,h.jsx)(O,{children:"Edit Restaurant"}),(0,h.jsx)(L,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,h.jsx)(U,{children:(0,h.jsxs)(W,{children:[(0,h.jsxs)(G,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(K,{children:"Restaurant Name *"}),(0,h.jsx)(H,{type:"text",placeholder:"Enter restaurant name",value:Fe.name,onChange:e=>Ae({...Fe,name:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Email Address *"}),(0,h.jsx)(H,{type:"email",placeholder:"restaurant@example.com",value:Fe.email,onChange:e=>Ae({...Fe,email:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Country *"}),(0,h.jsx)(J,{value:Fe.country,onChange:e=>Ae({...Fe,country:e.target.value}),children:u.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Phone Number *"}),(0,h.jsx)(x.A,{value:Fe.phone,onChange:e=>Ae({...Fe,phone:e}),defaultCountry:Fe.country})]}),(0,h.jsxs)(G,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(K,{children:"Address *"}),(0,h.jsx)(V,{placeholder:"Enter street address",value:Fe.address,onChange:e=>Ae({...Fe,address:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"City"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Fe.city,onChange:e=>Ae({...Fe,city:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"State"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:Fe.state,onChange:e=>Ae({...Fe,state:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Postal Code"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., 50000",value:Fe.postalCode,onChange:e=>Ae({...Fe,postalCode:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Cuisine Type"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Fe.cuisine,onChange:e=>Ae({...Fe,cuisine:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Business Registration No."}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., 202401012345",value:Fe.businessRegistration,onChange:e=>Ae({...Fe,businessRegistration:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Tax ID"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., MY1234567890",value:Fe.taxId,onChange:e=>Ae({...Fe,taxId:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Plan Type *"}),(0,h.jsxs)(J,{value:Fe.planType,onChange:e=>{Ae({...Fe,planType:e.target.value,planAmount:{"Basic Plan":"29.00","Professional Plan":"99.00","Enterprise Plan":"199.00"}[e.target.value]||"29.00"})},children:[(0,h.jsxs)("option",{value:"Basic Plan",children:["Basic Plan (",(0,p.vv)(29,ce),"/month)"]}),(0,h.jsxs)("option",{value:"Professional Plan",children:["Professional Plan (",(0,p.vv)(99,ce),"/month)"]}),(0,h.jsxs)("option",{value:"Enterprise Plan",children:["Enterprise Plan (",(0,p.vv)(199,ce),"/month)"]})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Billing Cycle *"}),(0,h.jsxs)(J,{value:Fe.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Fe.planType]||a["Basic Plan"];Ae({...Fe,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Payment Model *"}),(0,h.jsxs)(J,{value:Fe.paymentModel,onChange:e=>Ae({...Fe,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Subscription Start Date *"}),(0,h.jsx)(H,{type:"date",value:Fe.subscriptionStart,onChange:e=>Ae({...Fe,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(G,{children:[(0,h.jsx)(K,{children:"Subscription End Date *"}),(0,h.jsx)(H,{type:"date",value:Fe.subscriptionEnd,onChange:e=>Ae({...Fe,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(G,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:Fe.autoRenew,onChange:e=>Ae({...Fe,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Fe.planType," - $",Fe.planAmount," (",Fe.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===Fe.paymentModel?"Manager":"Restaurant"]})]})]})}),(0,h.jsxs)(Y,{children:[Je&&(0,h.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Je}),(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{ke(!1),Ve("")},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async n=>{if(n.preventDefault(),Ve(""),Se)try{const n=localStorage.getItem("auth_token"),a={name:Fe.name,email:Fe.email,phone:Fe.phone,address:Fe.address,city:Fe.city,state:Fe.state,postal_code:Fe.postalCode,country:Fe.country,business_registration:Fe.businessRegistration||void 0,tax_id:Fe.taxId||void 0,cuisine:Fe.cuisine,plan_type:Fe.planType,plan_amount:parseFloat(Fe.planAmount),payment_model:"manager"===Fe.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"},t=await fetch(`/api/restaurants/${Se.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a)});if(t.ok){const n=o.map(n=>n.id===Se.id?{...n,name:Fe.name,email:Fe.email,phone:Fe.phone,address:Fe.address,location:Fe.address,cuisine:Fe.cuisine,status:Fe.status,plan:Fe.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(Fe.planAmount),payment_model:"manager"===Fe.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"}:n);se(n),ke(!1),Ee(null),Ae({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1})}else{const e=await t.text();console.error("Failed to update restaurant:",e),Ve("Failed to update restaurant. Please try again.")}}catch(a){console.error("Error updating restaurant:",a),Ve("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]})]})}),We&&Ke&&(0,h.jsx)(M,{show:We,onClick:()=>Ge(!1),children:(0,h.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"450px"},children:[(0,h.jsxs)($,{children:[(0,h.jsx)(O,{children:"Delete Restaurant"}),(0,h.jsx)(L,{onClick:()=>Ge(!1),children:"\xd7"})]}),(0,h.jsx)(U,{children:(0,h.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,h.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,h.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,h.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,h.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,h.jsx)("strong",{style:{color:"#DC2626"},children:Ke.name})," will be permanently deleted.",(0,h.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>Ge(!1),children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Ke)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${Ke.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(se(o.filter(e=>e.id!==Ke.id)),Ge(!1),He(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#DC2626"},children:"Delete Restaurant"})]})]})})]})}}}]);