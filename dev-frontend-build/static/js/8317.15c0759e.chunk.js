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
`},4021:(e,n,a)=>{a.d(n,{i1:()=>s});var t=a(9950),r=a(1367),o=a(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,a]=(0,t.useState)("RM"),[s]=(0,t.useState)(Object.keys(o.DL)),[i,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let r=t>=0?n[t+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return a("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";a(t)}else a("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),a("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:i,error:d}}},8317:(e,n,a)=>{a.r(n),a.d(n,{default:()=>Q});var t=a(9950),r=a(4492),o=a(4752),s=a(3705),i=a(1367),l=a(8409),d=a(4021),c=a(6038),p=a(2435),u=a(8666),x=a(4414);const h=o.Ay.div`
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
`,y=o.Ay.h1`
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
`,b=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,j=o.Ay.div`
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
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,F=o.Ay.div`
  flex: 1;
`,w=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,S=o.Ay.span`
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
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,_=o.Ay.div`
  text-align: center;
`,k=o.Ay.div`
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,N=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,P=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,O=o.Ay.input`
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
`,$=o.Ay.select`
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
`,L=o.Ay.textarea`
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
`,U=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,Y=o.Ay.input`
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
`,W=o.Ay.select`
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
`,G=o.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,K=o.Ay.input`
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
`,H=o.Ay.div`
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
`,J=o.Ay.div`
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
`,Z=o.Ay.button`
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
`,Q=()=>{const{user:e}=(0,i.As)(),n=(0,r.Zp)(),[a]=(0,r.ok)(),[o,Q]=(0,t.useState)([]),[X,ee]=(0,t.useState)(!1),{defaultCurrency:ne}=(0,d.i1)(),[ae,te]=(0,t.useState)("RM");(0,t.useEffect)(()=>{ne&&te(ne)},[ne]);const[re,oe]=(0,t.useState)(""),[se,ie]=(0,t.useState)("all"),[le,de]=(0,t.useState)("all"),[ce,pe]=(0,t.useState)(""),[ue,xe]=(0,t.useState)(!1),[he,ge]=(0,t.useState)([]),[me,ye]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),[ve,be]=(0,t.useState)(null),[je,fe]=(0,t.useState)(!1),[Ce,Fe]=(0,t.useState)([]),[we,Ae]=(0,t.useState)("create"),[Se,Ee]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[Be,_e]=(0,t.useState)(null),[ke,ze]=(0,t.useState)([]),[Ie,Re]=(0,t.useState)(""),[Te,De]=(0,t.useState)(!1),[Me,Ne]=(0,t.useState)(!1),[Pe,Oe]=(0,t.useState)(null),[$e,Le]=(0,t.useState)(""),[Ue,Ye]=(0,t.useState)([]);(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Fe(e)}}catch(e){console.error("Error fetching brands:",e)}})();(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);Ye(n),n.length>0&&ye(e=>({...e,planType:n[0].display_name,planAmount:n[0].base_price_monthly}))}}catch(e){console.error("Error fetching plans:",e)}})();const e=a.get("brandId"),n=a.get("brandName");e&&n&&(de(e),pe(decodeURIComponent(n)))},[a]),(0,t.useEffect)(()=>{e&&(async()=>{try{if(!e)return;const n=localStorage.getItem("auth_token"),a=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=(await a.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:e.managerId||(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"1",brandName:e.managerName||e.admin_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});Q(e)}else console.error("Failed to fetch restaurants from API"),Q([])}catch(n){console.error("Error fetching restaurants:",n),Q([])}})()},[e]);const We=o.filter(e=>{const n=e.name.toLowerCase().includes(re.toLowerCase())||e.location.toLowerCase().includes(re.toLowerCase())||e.cuisine.toLowerCase().includes(re.toLowerCase()),a="all"===se||e.status===se,t="all"===le||e.brand_id&&e.brand_id.toString()===le;return n&&a&&t}),Ge=o.length,Ke=o.filter(e=>"active"===e.status).length,He=o.reduce((e,n)=>e+n.todaySales,0),Je=o.reduce((e,n)=>e+n.todayOrders,0),Ve=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,x.jsx)(R,{filled:a<=e,children:"\u2605"},a));return n},qe=async e=>{Re(e),De(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();ze(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(y,{children:"Restaurants"}),(0,x.jsxs)(v,{children:[(0,x.jsx)(b,{variant:"secondary",onClick:()=>{const n={exportDate:(new Date).toISOString(),totalRestaurants:o.length,manager:null===e||void 0===e?void 0:e.name,restaurants:o.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(n,null,2),t=new Blob([a],{type:"application/json"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:"Export Data"}),(0,x.jsx)(b,{variant:"primary",onClick:()=>{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"8",a=(new Date).toISOString().split("T")[0],t=new Date;t.setFullYear(t.getFullYear()+1),ye({name:"",managerId:n,email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:a,subscriptionEnd:t.toISOString().split("T")[0],autoRenew:!0,enableTrial:!1}),Ae("create"),Ee({fullName:"",email:"",username:"",password:"",phone:""}),_e(null),ze([]),Re(""),Le(""),ee(!0)},children:"Add Restaurant"})]})]}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:Ge}),(0,x.jsx)(l.v0,{children:"Total Restaurants"}),(0,x.jsx)(l.E_,{trend:"up",children:"+1 this month"})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:Ke}),(0,x.jsx)(l.v0,{children:"Active Restaurants"}),(0,x.jsxs)(l.E_,{trend:"up",children:[Math.round(Ke/Ge*100),"% operational"]})]}),(0,x.jsxs)(l.hI,{color:"#7C3AED",children:[(0,x.jsx)(l.Os,{children:(0,c.vv)(He,ae)}),(0,x.jsx)(l.v0,{children:"Today's Total Sales"}),(0,x.jsx)(l.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:Je}),(0,x.jsx)(l.v0,{children:"Today's Orders"}),(0,x.jsx)(l.E_,{trend:"up",children:"+18% vs yesterday"})]})]}),(0,x.jsxs)(U,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(K,{type:"text",placeholder:"Search brands...",value:ce,onChange:e=>(e=>{if(pe(e),xe(!0),e.length<1)return void ge(Ce.slice(0,10));const n=Ce.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);ge(n)})(e.target.value),onFocus:()=>{xe(!0),0===ce.length&&ge(Ce.slice(0,10))},onBlur:()=>setTimeout(()=>xe(!1),200)}),"all"!==le&&ce&&(0,x.jsx)(Z,{onClick:()=>{de("all"),pe(""),xe(!1),n("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,x.jsxs)(H,{show:ue,children:[(0,x.jsxs)(J,{onClick:()=>{de("all"),pe(""),xe(!1),n("/pos/manager/restaurants",{replace:!0})},children:[(0,x.jsx)(V,{children:"All Brands"}),(0,x.jsx)(q,{children:"Show all restaurants"})]}),he.map(e=>(0,x.jsxs)(J,{onClick:()=>(e=>{de(e.id.toString()),pe(e.name),xe(!1)})(e),children:[(0,x.jsx)(V,{children:e.name}),(0,x.jsxs)(q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,x.jsxs)(W,{value:se,onChange:e=>ie(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,x.jsx)(Y,{placeholder:"Search restaurants...",value:re,onChange:e=>oe(e.target.value)})]}),(0,x.jsx)(j,{children:We.map(a=>{var t;return(0,x.jsxs)(f,{onClick:()=>{return t=a.id,r=a.name,void("Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t}&restaurantName=${encodeURIComponent(r)}`));var t,r},children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(w,{children:[a.name," ",a.currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a.currency})]}),a.brand_id&&(0,x.jsx)(A,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(t=Ce.find(e=>e.id===a.brand_id))||void 0===t?void 0:t.name)||"Brand"}),(0,x.jsxs)(A,{children:[a.location," \u2022 ",a.cuisine]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(S,{status:a.status,children:a.status}),(0,x.jsx)(E,{plan:a.plan,children:a.plan})]})]}),(0,x.jsxs)(I,{children:[Ve(a.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \u2022 Last order: ",a.lastOrder]})]}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(k,{children:(0,c.vv)(a.todaySales,ae)}),(0,x.jsx)(z,{children:"Today's Sales"})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)(k,{children:a.todayOrders}),(0,x.jsx)(z,{children:"Orders"})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)(k,{children:a.staffCount}),(0,x.jsx)(z,{children:"Staff"})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(D,{onClick:e=>((e,n)=>{var a;e.stopPropagation(),Le(""),be(n);const t=n.payment_model,r="brand_manager"===t?"manager":"restaurant"===t?"restaurant":"manager";ye({name:n.name,managerId:"",email:n.email,phone:n.phone,address:n.address,city:n.city||"",state:n.state||"",postalCode:n.postalCode||"",country:n.country||"MY",businessRegistration:n.businessRegistration||"",taxId:n.taxId||"",cuisine:n.cuisine,planType:"basic"===n.plan?"Basic Plan":"professional"===n.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(a=n.monthlyFee)||void 0===a?void 0:a.toString())||"29.00",status:n.status||"active",billingCycle:"monthly",paymentModel:r,subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),fe(!0)})(e,a),children:"Edit"}),(0,x.jsx)(D,{onClick:t=>((a,t)=>{a.stopPropagation(),"Brand General"===(null===e||void 0===e?void 0:e.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`)})(t,a),children:"View Reports"}),(0,x.jsx)(D,{onClick:e=>((e,n)=>{e.stopPropagation(),Oe(n),Ne(!0)})(e,a),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Delete"})]})]},a.id)})})]})]}),X&&(0,x.jsx)(l.aF,{isOpen:!0,onClose:()=>ee(!1),title:"Add New Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[$e&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",$e," "]})," ",(0,x.jsx)(s.cc,{variant:"cancel",onClick:()=>{ee(!1),Le("")},children:"Cancel"}),(0,x.jsx)(s.cc,{variant:"primary",onClick:async n=>{n.preventDefault(),Le("");try{if("create"===we){if(!Se.fullName||!Se.email||!Se.username||!Se.password)return void Le("Please fill in all required Restaurant Admin fields.");if(Se.password.length<8)return void Le("Admin password must be at least 8 characters.");if(!/[a-z]/.test(Se.password)||!/[A-Z]/.test(Se.password)||!/[0-9]/.test(Se.password))return void Le("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===we&&!Be)return void Le("Please select an existing user as Restaurant Admin.");const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";let r=null,o=null;"Brand General"!==(null===e||void 0===e?void 0:e.role)&&"Brand Manager"!==(null===e||void 0===e?void 0:e.role)||(r=(null===e||void 0===e?void 0:e.brand_id)||null),"Foodcourt General"!==(null===e||void 0===e?void 0:e.role)&&"Foodcourt Manager"!==(null===e||void 0===e?void 0:e.role)||(o=(null===e||void 0===e?void 0:e.foodcourt_id)||null);const s={name:me.name,address:me.address,city:me.city,state:me.state,postal_code:me.postalCode,country:me.country,phone:me.phone,email:me.email,cuisine:me.cuisine,business_registration:me.businessRegistration||void 0,tax_id:me.taxId||void 0,managerIds:[parseInt(n.toString())],adminAction:we,plan_type:me.planType,plan_amount:parseFloat(me.planAmount),status:"active",billing_cycle:me.billingCycle,payment_model:"manager"===me.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant",subscription_start:new Date(me.subscriptionStart),subscription_end:new Date(me.subscriptionEnd),auto_renew:me.autoRenew,created_by:n,brand_id:r,foodcourt_id:o};"create"===we?(s.adminEmail=Se.email,s.adminPassword=Se.password,s.adminUsername=Se.username,s.adminFullName=Se.fullName,s.adminPhone=Se.phone||void 0):"assign"===we&&(s.adminUserId=parseInt(Be.id.toString()));const i=localStorage.getItem("auth_token"),l=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(s)});if(l.ok){await l.json();const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=(await n.json()).map(e=>{var n,a;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||"",brandName:e.admin_name||"",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(a=e.planType||e.plan_type)||void 0===a?void 0:a.toLowerCase().replace(" plan",""))||"basic",todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});Q(e)}ee(!1),ye({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Ae("create"),Ee({fullName:"",email:"",username:"",password:"",phone:""}),_e(null),ze([]),Re("")}else{var a;const e=await l.json().catch(()=>({error:"Unknown error"}));console.error("Failed to create restaurant:",e);let n="Please try again.";if("string"===typeof e.error)n=e.error;else if(null!==(a=e.error)&&void 0!==a&&a.message){var t;n=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(n+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(n=e.message);Le(`Failed to create restaurant: ${n}`)}}catch(r){console.error("Error creating restaurant:",r),Le("Error creating restaurant. Please try again.")}},children:"Add Restaurant"})]}),children:(0,x.jsxs)(M,{children:[(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(P,{children:"Restaurant Name *"}),(0,x.jsx)(O,{type:"text",placeholder:"Enter restaurant name",value:me.name,onChange:e=>ye({...me,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===we?"#F0EFFF":"#F9FAFB",border:"create"===we?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"create"===we,onChange:()=>{Ae("create"),_e(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===we?"#F0EFFF":"#F9FAFB",border:"assign"===we?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"assign"===we,onChange:()=>{Ae("assign"),Ee({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===we?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Admin Full Name *"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Kim Owner",value:Se.fullName,onChange:e=>Ee({...Se,fullName:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Admin Email *"}),(0,x.jsx)(O,{type:"email",placeholder:"admin@restaurant.com",value:Se.email,onChange:e=>Ee({...Se,email:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Admin Username *"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., kim_owner",value:Se.username,onChange:e=>Ee({...Se,username:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Admin Password *"}),(0,x.jsx)(O,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:Se.password,onChange:e=>Ee({...Se,password:e.target.value})})]}),(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(P,{children:"Admin Phone"}),(0,x.jsx)(u.A,{value:Se.phone,onChange:e=>Ee({...Se,phone:e}),defaultCountry:me.country})]})]}):(0,x.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(P,{children:"Search and select an existing user"}),(0,x.jsxs)(G,{children:[(0,x.jsx)(K,{type:"text",placeholder:"Type to search by name, email, or username...",value:Ie,onChange:e=>qe(e.target.value),onFocus:()=>qe(Ie),onBlur:()=>setTimeout(()=>De(!1),200)}),(0,x.jsx)(H,{show:Te,children:0===ke.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:Ie.length>0?"No available users found":"Type to search users..."}):ke.map(e=>(0,x.jsxs)(J,{onClick:()=>(e=>{_e(e),Re(e.full_name||e.username),De(!1)})(e),children:[(0,x.jsx)(V,{children:e.full_name||e.username}),(0,x.jsxs)(q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Be&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Be.full_name||Be.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Be.email," \u2022 ",Be.role]})]}),(0,x.jsx)("button",{onClick:()=>{_e(null),Re("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Email Address *"}),(0,x.jsx)(O,{type:"email",placeholder:"restaurant@example.com",value:me.email,onChange:e=>ye({...me,email:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Country *"}),(0,x.jsx)($,{value:me.country,onChange:e=>ye({...me,country:e.target.value}),children:p.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Phone Number *"}),(0,x.jsx)(u.A,{value:me.phone,onChange:e=>ye({...me,phone:e}),defaultCountry:me.country})]}),(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(P,{children:"Address *"}),(0,x.jsx)(L,{placeholder:"Enter street address",value:me.address,onChange:e=>ye({...me,address:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"City"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Kuala Lumpur",value:me.city,onChange:e=>ye({...me,city:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"State / Province"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:me.state,onChange:e=>ye({...me,state:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Postal Code"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., 50000",value:me.postalCode,onChange:e=>ye({...me,postalCode:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Cuisine Type"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:me.cuisine,onChange:e=>ye({...me,cuisine:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Business Registration No."}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., 202401012345",value:me.businessRegistration,onChange:e=>ye({...me,businessRegistration:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Tax ID / GST No."}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., MY1234567890",value:me.taxId,onChange:e=>ye({...me,taxId:e.target.value})})]}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Plan Type *"}),(0,x.jsx)($,{value:me.planType,onChange:e=>{var n;const a=Ue.find(n=>n.display_name===e.target.value);ye({...me,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:Ue.map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.vv)(parseFloat(e.base_price_monthly),ae),"/month)"]},e.id))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Billing Cycle *"}),(0,x.jsxs)($,{value:me.billingCycle,onChange:e=>{const n=e.target.value,a=Ue.find(e=>e.display_name===me.planType),t=parseFloat(null===a||void 0===a?void 0:a.base_price_monthly)||29,r=parseFloat(null===a||void 0===a?void 0:a.base_price_annual)||10*t;ye({...me,billingCycle:n,planAmount:"annual"===n?r.toFixed(2):t.toFixed(2)})},children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Payment Model *"}),(0,x.jsxs)($,{value:me.paymentModel,onChange:e=>ye({...me,paymentModel:e.target.value}),children:[(0,x.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Subscription Start Date *"}),(0,x.jsx)(O,{type:"date",value:me.subscriptionStart,onChange:e=>ye({...me,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Subscription End Date *"}),(0,x.jsx)(O,{type:"date",value:me.subscriptionEnd,onChange:e=>ye({...me,subscriptionEnd:e.target.value})})]}),(0,x.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:me.autoRenew,onChange:e=>ye({...me,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Summary:"})}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[me.planType," - $",me.planAmount," (",me.billingCycle,")"]}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===me.paymentModel?"Manager":"Restaurant"]})]})]})}),je&&(0,x.jsx)(l.aF,{isOpen:!0,onClose:()=>fe(!1),title:"Edit Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[$e&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",$e," "]})," ",(0,x.jsx)(s.cc,{variant:"cancel",onClick:()=>{fe(!1),Le("")},children:"Cancel"}),(0,x.jsx)(s.cc,{variant:"primary",onClick:async n=>{if(n.preventDefault(),Le(""),ve)try{const n=localStorage.getItem("auth_token"),a={name:me.name,email:me.email,phone:me.phone,address:me.address,city:me.city,state:me.state,postal_code:me.postalCode,country:me.country,business_registration:me.businessRegistration||void 0,tax_id:me.taxId||void 0,cuisine:me.cuisine,plan_type:me.planType,plan_amount:parseFloat(me.planAmount),payment_model:"manager"===me.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"},t=await fetch(`/api/restaurants/${ve.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a)});if(t.ok){const n=o.map(n=>n.id===ve.id?{...n,name:me.name,email:me.email,phone:me.phone,address:me.address,location:me.address,cuisine:me.cuisine,status:me.status,plan:me.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(me.planAmount),payment_model:"manager"===me.paymentModel?"Foodcourt General"===(null===e||void 0===e?void 0:e.role)||"Foodcourt Manager"===(null===e||void 0===e?void 0:e.role)?"foodcourt_manager":"brand_manager":"restaurant"}:n);Q(n),fe(!1),be(null),ye({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1})}else{const e=await t.text();console.error("Failed to update restaurant:",e),Le("Failed to update restaurant. Please try again.")}}catch(a){console.error("Error updating restaurant:",a),Le("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]}),children:(0,x.jsxs)(M,{children:[(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(P,{children:"Restaurant Name *"}),(0,x.jsx)(O,{type:"text",placeholder:"Enter restaurant name",value:me.name,onChange:e=>ye({...me,name:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Email Address *"}),(0,x.jsx)(O,{type:"email",placeholder:"restaurant@example.com",value:me.email,onChange:e=>ye({...me,email:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Country *"}),(0,x.jsx)($,{value:me.country,onChange:e=>ye({...me,country:e.target.value}),children:p.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Phone Number *"}),(0,x.jsx)(u.A,{value:me.phone,onChange:e=>ye({...me,phone:e}),defaultCountry:me.country})]}),(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(P,{children:"Address *"}),(0,x.jsx)(L,{placeholder:"Enter street address",value:me.address,onChange:e=>ye({...me,address:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"City"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Kuala Lumpur",value:me.city,onChange:e=>ye({...me,city:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"State / Province"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:me.state,onChange:e=>ye({...me,state:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Postal Code"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., 50000",value:me.postalCode,onChange:e=>ye({...me,postalCode:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Cuisine Type"}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:me.cuisine,onChange:e=>ye({...me,cuisine:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Business Registration No."}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., 202401012345",value:me.businessRegistration,onChange:e=>ye({...me,businessRegistration:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Tax ID / GST No."}),(0,x.jsx)(O,{type:"text",placeholder:"e.g., MY1234567890",value:me.taxId,onChange:e=>ye({...me,taxId:e.target.value})})]}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Plan Type *"}),(0,x.jsx)($,{value:me.planType,onChange:e=>{var n;const a=Ue.find(n=>n.display_name===e.target.value);ye({...me,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:Ue.map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.vv)(parseFloat(e.base_price_monthly),ae),"/month)"]},e.id))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Billing Cycle *"}),(0,x.jsxs)($,{value:me.billingCycle,onChange:e=>{const n=e.target.value,a=Ue.find(e=>e.display_name===me.planType),t=parseFloat(null===a||void 0===a?void 0:a.base_price_monthly)||29,r=parseFloat(null===a||void 0===a?void 0:a.base_price_annual)||10*t;ye({...me,billingCycle:n,planAmount:"annual"===n?r.toFixed(2):t.toFixed(2)})},children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Payment Model *"}),(0,x.jsxs)($,{value:me.paymentModel,onChange:e=>ye({...me,paymentModel:e.target.value}),children:[(0,x.jsx)("option",{value:"manager",children:"Manager Pays"}),(0,x.jsx)("option",{value:"restaurant",children:"Restaurant Pays"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Subscription Start Date *"}),(0,x.jsx)(O,{type:"date",value:me.subscriptionStart,onChange:e=>ye({...me,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(P,{children:"Subscription End Date *"}),(0,x.jsx)(O,{type:"date",value:me.subscriptionEnd,onChange:e=>ye({...me,subscriptionEnd:e.target.value})})]}),(0,x.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:me.autoRenew,onChange:e=>ye({...me,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Summary:"})}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[me.planType," - $",me.planAmount," (",me.billingCycle,")"]}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===me.paymentModel?"Manager":"Restaurant"]})]})]})}),Me&&Pe&&(0,x.jsx)(l.aF,{isOpen:!0,onClose:()=>Ne(!1),title:"Delete Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.cc,{variant:"cancel",onClick:()=>Ne(!1),children:"Cancel"}),(0,x.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(Pe)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${Pe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(Q(o.filter(e=>e.id!==Pe.id)),Ne(!1),Oe(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#DC2626"},children:" Delete Restaurant "})]}),children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:Pe.name})," will be permanently deleted.",(0,x.jsx)("br",{}),"This action cannot be undone."]})]})})]})}}}]);