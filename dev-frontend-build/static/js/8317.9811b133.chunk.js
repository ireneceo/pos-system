"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8317],{2435:(e,a,n)=>{n.d(a,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,a,n)=>{n.d(a,{cc:()=>r});var t=n(4752);const r=t.Ay.button`
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
`},4021:(e,a,n)=>{n.d(a,{i1:()=>o});var t=n(9950),r=n(1367),s=n(6038);const o=()=>{const{user:e}=(0,r.As)(),[a,n]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(s.DL)),[i,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const a=window.location.pathname.split("/"),t=a.indexOf("restaurant");let r=t>=0?a[t+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(a.ok){var s;const e=await a.json(),t=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";n(t)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:a,supportedCurrencies:o,loading:i,error:d}}},8317:(e,a,n)=>{n.r(a),n.d(a,{default:()=>X});var t=n(9950),r=n(4492),s=n(4752),o=n(3705),i=n(1367),l=n(8409),d=n(4021),c=n(6038),p=n(2435),u=n(8666),x=n(5030),h=n(4414);const g=s.Ay.div`
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
`,b=s.Ay.h1`
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
`,j=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
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
`,F=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,A=s.Ay.div`
  flex: 1;
`,w=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=s.Ay.div`
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
`,B=s.Ay.span`
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
`,P=s.Ay.div`
  text-align: center;
`,_=s.Ay.div`
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
`,R=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,T=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,D=s.Ay.button`
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
`,M=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,N=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,O=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,$=s.Ay.input`
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
`,L=s.Ay.select`
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
`,W=s.Ay.textarea`
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
`,Y=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,U=s.Ay.input`
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
`,G=s.Ay.select`
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
`,K=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,H=s.Ay.input`
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
`,J=s.Ay.div`
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
`,Q=s.Ay.button`
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
`,X=()=>{const{t:e}=(0,x.Bd)("admin"),{user:a}=(0,i.As)(),n=(0,r.Zp)(),[s]=(0,r.ok)(),[X,ee]=(0,t.useState)([]),[ae,ne]=(0,t.useState)(!1),{defaultCurrency:te}=(0,d.i1)(),[re,se]=(0,t.useState)("RM");(0,t.useEffect)(()=>{te&&se(te)},[te]);const[oe,ie]=(0,t.useState)(""),[le,de]=(0,t.useState)("all"),[ce,pe]=(0,t.useState)("all"),[ue,xe]=(0,t.useState)(""),[he,ge]=(0,t.useState)(!1),[me,ye]=(0,t.useState)([]),[be,ve]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),[je,fe]=(0,t.useState)(null),[Ce,Fe]=(0,t.useState)(!1),[Ae,we]=(0,t.useState)([]),[Se,Ee]=(0,t.useState)("create"),[Be,ke]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[Pe,_e]=(0,t.useState)(!1),[ze,Ie]=(0,t.useState)(""),[Re,Te]=(0,t.useState)(""),[De,Me]=(0,t.useState)(!1),[Ne,Oe]=(0,t.useState)(null),[$e,Le]=(0,t.useState)([]),[We,Ye]=(0,t.useState)(""),[Ue,Ge]=(0,t.useState)(!1),[Ke,He]=(0,t.useState)(!1),[Je,Ve]=(0,t.useState)(null),[qe,Ze]=(0,t.useState)(""),[Qe,Xe]=(0,t.useState)([]);(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),a=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();we(e)}}catch(e){console.error("Error fetching brands:",e)}})();(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const a=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);Xe(a),a.length>0&&ve(e=>({...e,planType:a[0].display_name,planAmount:String((0,c.jL)(a[0],(0,c.Wh)(re)))}))}}catch(e){console.error("Error fetching plans:",e)}})();const e=s.get("brandId"),a=s.get("brandName");e&&a&&(pe(e),xe(decodeURIComponent(a)))},[s]),(0,t.useEffect)(()=>{a&&(async()=>{try{if(!a)return;const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=(await n.json()).map(e=>{var a,n;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:e.managerId||(null===(a=e.admin_id)||void 0===a?void 0:a.toString())||"1",brandName:e.managerName||e.admin_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(n=e.planType||e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic",todaySales:parseFloat(e.todaySales)||0,todayOrders:parseInt(e.todayOrders)||0,staffCount:parseInt(e.staffCount)||0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});ee(e)}else console.error("Failed to fetch restaurants from API"),ee([])}catch(e){console.error("Error fetching restaurants:",e),ee([])}})()},[a]);const ea=X.filter(e=>{const a=e.name.toLowerCase().includes(oe.toLowerCase())||e.location.toLowerCase().includes(oe.toLowerCase())||e.cuisine.toLowerCase().includes(oe.toLowerCase()),n="all"===le||e.status===le,t="all"===ce||e.brand_id&&e.brand_id.toString()===ce;return a&&n&&t}),aa=X.length,na=X.filter(e=>"active"===e.status).length,ta=X.reduce((e,a)=>e+a.todaySales,0),ra=X.reduce((e,a)=>e+a.todayOrders,0),sa=e=>{const a=[];for(let n=1;n<=5;n++)a.push((0,h.jsx)(R,{filled:n<=e,children:"\u2605"},n));return a},oa=async e=>{Ye(e),Ge(!0);try{const a=localStorage.getItem("auth_token"),n=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(n.ok){const e=await n.json();Le(e.data||[])}}catch(a){console.error("Error searching admin candidates:",a)}};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(b,{children:e("admin:restaurantsPage.restaurants")}),(0,h.jsxs)(v,{children:[(0,h.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalRestaurants:X.length,manager:null===a||void 0===a?void 0:a.name,restaurants:X.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},n=JSON.stringify(e,null,2),t=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:e("admin:restaurantsPage.exportData")}),(0,h.jsx)(j,{variant:"primary",onClick:()=>{const e=(null===a||void 0===a?void 0:a.managerId)||(null===a||void 0===a?void 0:a.id)||"8",n=(new Date).toISOString().split("T")[0],t=new Date;t.setFullYear(t.getFullYear()+1),ve({name:"",managerId:e,email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:n,subscriptionEnd:t.toISOString().split("T")[0],autoRenew:!0,enableTrial:!1}),Ee("create"),ke({fullName:"",email:"",username:"",phone:""}),Oe(null),Le([]),Ye(""),Ze(""),ne(!0)},children:e("admin:restaurantsPage.addRestaurant")})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:aa}),(0,h.jsx)(l.v0,{children:e("admin:restaurantsPage.totalRestaurants")}),(0,h.jsx)(l.E_,{trend:"up",children:"+1 this month"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:na}),(0,h.jsx)(l.v0,{children:e("admin:restaurantsPage.activeRestaurants")}),(0,h.jsxs)(l.E_,{trend:"up",children:[Math.round(na/aa*100),"% operational"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:(0,c.vv)(ta,re)}),(0,h.jsx)(l.v0,{children:e("admin:restaurantsPage.todaysTotalSales")}),(0,h.jsx)(l.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,h.jsxs)(l.hI,{color:"#DC2626",children:[(0,h.jsx)(l.Os,{children:ra}),(0,h.jsx)(l.v0,{children:e("admin:restaurantsPage.todaysOrders")}),(0,h.jsx)(l.E_,{trend:"up",children:"+18% vs yesterday"})]})]}),(0,h.jsxs)(Y,{children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(H,{type:"text",placeholder:"Search brands...",value:ue,onChange:e=>(e=>{if(xe(e),ge(!0),e.length<1)return void ye(Ae.slice(0,10));const a=Ae.filter(a=>{const n=e.toLowerCase(),t=(a.name||"").toLowerCase(),r=(a.code||"").toLowerCase();return t.includes(n)||r.includes(n)}).slice(0,10);ye(a)})(e.target.value),onFocus:()=>{ge(!0),0===ue.length&&ye(Ae.slice(0,10))},onBlur:()=>setTimeout(()=>ge(!1),200)}),"all"!==ce&&ue&&(0,h.jsx)(Q,{onClick:()=>{pe("all"),xe(""),ge(!1),n("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,h.jsxs)(J,{show:he,children:[(0,h.jsxs)(V,{onClick:()=>{pe("all"),xe(""),ge(!1),n("/pos/manager/restaurants",{replace:!0})},children:[(0,h.jsx)(q,{children:e("admin:restaurantsPage.allBrands")}),(0,h.jsx)(Z,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),me.map(e=>(0,h.jsxs)(V,{onClick:()=>(e=>{pe(e.id.toString()),xe(e.name),ge(!1)})(e),children:[(0,h.jsx)(q,{children:e.name}),(0,h.jsxs)(Z,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,h.jsxs)(G,{value:le,onChange:e=>de(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("admin:restaurantsPage.allStatus")}),(0,h.jsx)("option",{value:"active",children:e("admin:restaurantsPage.active")}),(0,h.jsx)("option",{value:"trial",children:e("admin:restaurantsPage.trial")}),(0,h.jsx)("option",{value:"expired",children:e("admin:restaurantsPage.expired")}),(0,h.jsx)("option",{value:"suspended",children:e("admin:restaurantsPage.suspended")}),(0,h.jsx)("option",{value:"cancelled",children:e("admin:restaurantsPage.cancelled")})]}),(0,h.jsx)(U,{placeholder:"Search restaurants...",value:oe,onChange:e=>ie(e.target.value)})]}),(0,h.jsx)(f,{children:ea.map(t=>{var r;return(0,h.jsxs)(C,{onClick:()=>{return e=t.id,r=t.name,void("Brand General"===(null===a||void 0===a?void 0:a.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`));var e,r},children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{children:[t.name," ",t.currency&&(0,h.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:t.currency})]}),t.brand_id&&(0,h.jsx)(S,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(r=Ae.find(e=>e.id===t.brand_id))||void 0===r?void 0:r.name)||"Brand"}),(0,h.jsxs)(S,{children:[t.location," \u2022 ",t.cuisine]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(E,{status:t.status,children:t.status}),(0,h.jsx)(B,{plan:t.plan,children:t.plan})]})]}),(0,h.jsxs)(I,{children:[sa(t.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[t.rating," \u2022 Last order: ",t.lastOrder]})]}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:(0,c.vv)(t.todaySales,re)}),(0,h.jsx)(z,{children:e("admin:restaurantsPage.todaysSales")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:t.todayOrders}),(0,h.jsx)(z,{children:e("admin:restaurantsPage.orders")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{children:t.staffCount}),(0,h.jsx)(z,{children:e("admin:restaurantsPage.staff")})]})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)(D,{onClick:e=>((e,a)=>{var n;e.stopPropagation(),Ze(""),fe(a);const t=a.payment_model,r="brand_manager"===t?"manager":"restaurant"===t?"restaurant":"manager";ve({name:a.name,managerId:"",email:a.email,phone:a.phone,address:a.address,city:a.city||"",state:a.state||"",postalCode:a.postalCode||"",country:a.country||"MY",businessRegistration:a.businessRegistration||"",taxId:a.taxId||"",cuisine:a.cuisine,planType:"basic"===a.plan?"Basic Plan":"professional"===a.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(n=a.monthlyFee)||void 0===n?void 0:n.toString())||"29.00",currency:a.currency||"MYR",status:a.status||"active",billingCycle:a.billing_cycle||a.billingCycle||"monthly",paymentModel:r,subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Fe(!0)})(e,t),children:e("admin:restaurantsPage.edit")}),(0,h.jsx)(D,{onClick:e=>((e,t)=>{e.stopPropagation(),"Brand General"===(null===a||void 0===a?void 0:a.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`)})(e,t),children:e("admin:restaurantsPage.viewReports")}),(0,h.jsx)(D,{onClick:e=>((e,a)=>{e.stopPropagation(),Ve(a),He(!0)})(e,t),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:e("admin:restaurantsPage.delete")})]})]},t.id)})})]})]}),ae&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Add New Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[qe&&(0,h.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",qe," "]})," ",(0,h.jsx)(o.cc,{variant:"cancel",onClick:()=>{ne(!1),Ze("")},children:e("admin:restaurantsPage.cancel")}),(0,h.jsx)(o.cc,{variant:"primary",onClick:async e=>{e.preventDefault(),Ze("");try{if("create"===Se){if(!Be.fullName||!Be.email||!Be.username)return void Ze("Please fill in all required Restaurant Admin fields (Full Name, Email, Username).")}else if("assign"===Se&&!Ne)return void Ze("Please select an existing user as Restaurant Admin.");const e=(null===a||void 0===a?void 0:a.managerId)||(null===a||void 0===a?void 0:a.id)||"2";let r=null,s=null;"Brand General"!==(null===a||void 0===a?void 0:a.role)&&"Brand Manager"!==(null===a||void 0===a?void 0:a.role)||(r=(null===a||void 0===a?void 0:a.brand_id)||null),"Foodcourt General"!==(null===a||void 0===a?void 0:a.role)&&"Foodcourt Manager"!==(null===a||void 0===a?void 0:a.role)||(s=(null===a||void 0===a?void 0:a.foodcourt_id)||null);const o={name:be.name,address:be.address,city:be.city,state:be.state,postal_code:be.postalCode,country:be.country,phone:be.phone,email:be.email,cuisine:be.cuisine,business_registration:be.businessRegistration||void 0,tax_id:be.taxId||void 0,managerIds:[parseInt(e.toString())],adminAction:Se,plan_type:be.planType,plan_amount:parseFloat(be.planAmount),currency:be.currency,status:"active",billing_cycle:be.billingCycle,payment_model:"manager"===be.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant",subscription_start:new Date(be.subscriptionStart),subscription_end:new Date(be.subscriptionEnd),auto_renew:be.autoRenew,created_by:e,brand_id:r,foodcourt_id:s};"create"===Se?(o.adminEmail=Be.email,o.adminUsername=Be.username,o.adminFullName=Be.fullName,o.adminPhone=Be.phone||void 0):"assign"===Se&&(o.adminUserId=parseInt(Ne.id.toString()));const i=localStorage.getItem("auth_token"),l=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(o)});if(l.ok){const e=await l.json();e.generatedPassword&&(Ie("Restaurant Admin created successfully."),Te(e.generatedPassword),Me(!1),_e(!0));const a=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${a}`}});if(n.ok){const e=(await n.json()).map(e=>{var a,n;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(a=e.admin_id)||void 0===a?void 0:a.toString())||"",brandName:e.admin_name||"",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(n=e.planType||e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic",todaySales:parseFloat(e.todaySales)||0,todayOrders:parseInt(e.todayOrders)||0,staffCount:parseInt(e.staffCount)||0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});ee(e)}ne(!1),ve({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Ee("create"),ke({fullName:"",email:"",username:"",phone:""}),Oe(null),Le([]),Ye("")}else{var n;const e=await l.json().catch(()=>({error:"Unknown error"}));console.error("Failed to create restaurant:",e);let a="Please try again.";if("string"===typeof e.error)a=e.error;else if(null!==(n=e.error)&&void 0!==n&&n.message){var t;a=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(a+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(a=e.message);Ze(`Failed to create restaurant: ${a}`)}}catch(r){console.error("Error creating restaurant:",r),Ze("Error creating restaurant. Please try again.")}},children:e("admin:restaurantsPage.addRestaurant")})]}),children:(0,h.jsxs)(M,{children:[(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(O,{children:"Restaurant Name *"}),(0,h.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:be.name,onChange:e=>ve({...be,name:e.target.value})})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Se?"#F0EFFF":"#F9FAFB",border:"create"===Se?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"create"===Se,onChange:()=>{Ee("create"),Oe(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===Se?"#F0EFFF":"#F9FAFB",border:"assign"===Se?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"assign"===Se,onChange:()=>{Ee("assign"),ke({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]})]})]}),"create"===Se?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Admin Full Name *"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Kim Owner",value:Be.fullName,onChange:e=>ke({...Be,fullName:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Admin Email *"}),(0,h.jsx)($,{type:"email",placeholder:"admin@restaurant.com",value:Be.email,onChange:e=>ke({...Be,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Admin Username *"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., kim_owner",value:Be.username,onChange:e=>ke({...Be,username:e.target.value})})]}),(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.adminPhone")}),(0,h.jsx)(u.A,{value:Be.phone,onChange:e=>ke({...Be,phone:e}),defaultCountry:be.country})]})]}):(0,h.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,h.jsxs)(K,{children:[(0,h.jsx)(H,{type:"text",placeholder:"Type to search by name, email, or username...",value:We,onChange:e=>oa(e.target.value),onFocus:()=>oa(We),onBlur:()=>setTimeout(()=>Ge(!1),200)}),(0,h.jsx)(J,{show:Ue,children:0===$e.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:We.length>0?"No available users found":"Type to search users..."}):$e.map(e=>(0,h.jsxs)(V,{onClick:()=>(e=>{Oe(e),Ye(e.full_name||e.username),Ge(!1)})(e),children:[(0,h.jsx)(q,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Ne&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Ne.full_name||Ne.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Ne.email," \u2022 ",Ne.role]})]}),(0,h.jsx)("button",{onClick:()=>{Oe(null),Ye("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Email Address *"}),(0,h.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:be.email,onChange:e=>ve({...be,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Country *"}),(0,h.jsx)(L,{value:be.country,onChange:e=>ve({...be,country:e.target.value}),children:p.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Phone Number *"}),(0,h.jsx)(u.A,{value:be.phone,onChange:e=>ve({...be,phone:e}),defaultCountry:be.country})]}),(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(O,{children:"Address *"}),(0,h.jsx)(W,{placeholder:"Enter street address",value:be.address,onChange:e=>ve({...be,address:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.city")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Kuala Lumpur",value:be.city,onChange:e=>ve({...be,city:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.stateProvince")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:be.state,onChange:e=>ve({...be,state:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.postalCode")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 50000",value:be.postalCode,onChange:e=>ve({...be,postalCode:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.cuisineType")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:be.cuisine,onChange:e=>ve({...be,cuisine:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 202401012345",value:be.businessRegistration,onChange:e=>ve({...be,businessRegistration:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., MY1234567890",value:be.taxId,onChange:e=>ve({...be,taxId:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Plan Type *"}),(0,h.jsx)(L,{value:be.planType,onChange:e=>{const a=Qe.find(a=>a.display_name===e.target.value);ve({...be,planType:e.target.value,planAmount:a?String((0,c.jL)(a,(0,c.Wh)(re))):"0"})},children:Qe.map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.m9)(e,(0,c.Wh)(re)),"/month)"]},e.id))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Billing Cycle *"}),(0,h.jsxs)(L,{value:be.billingCycle,onChange:e=>{const a=e.target.value,n=Qe.find(e=>e.display_name===be.planType),t=(0,c.Wh)(re),r=n?(0,c.jL)(n,t,a):0;ve({...be,billingCycle:a,planAmount:r.toFixed(2)})},children:[(0,h.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,h.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Payment Model *"}),(0,h.jsxs)(L,{value:be.paymentModel,onChange:e=>ve({...be,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"manager",children:e("admin:restaurantsPage.managerPays")}),(0,h.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantPays")})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Subscription Start Date *"}),(0,h.jsx)($,{type:"date",value:be.subscriptionStart,onChange:e=>ve({...be,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Subscription End Date *"}),(0,h.jsx)($,{type:"date",value:be.subscriptionEnd,onChange:e=>ve({...be,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:be.autoRenew,onChange:e=>ve({...be,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[be.planType," - ",(0,c.vv)(parseFloat(be.planAmount)||0,be.currency||"MYR")," (",be.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===be.paymentModel?"Manager":"Restaurant"]})]})]})}),Ce&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>Fe(!1),title:"Edit Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[qe&&(0,h.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",qe," "]})," ",(0,h.jsx)(o.cc,{variant:"cancel",onClick:()=>{Fe(!1),Ze("")},children:e("admin:restaurantsPage.cancel")}),(0,h.jsx)(o.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Ze(""),je)try{const e=localStorage.getItem("auth_token"),n={name:be.name,email:be.email,phone:be.phone,address:be.address,city:be.city,state:be.state,postal_code:be.postalCode,country:be.country,business_registration:be.businessRegistration||void 0,tax_id:be.taxId||void 0,cuisine:be.cuisine,plan_type:be.planType,plan_amount:parseFloat(be.planAmount),currency:be.currency,billing_cycle:be.billingCycle,payment_model:"manager"===be.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant"},t=await fetch(`/api/restaurants/${je.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(t.ok){const e=X.map(e=>e.id===je.id?{...e,name:be.name,email:be.email,phone:be.phone,address:be.address,location:be.address,cuisine:be.cuisine,status:be.status,plan:be.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(be.planAmount),payment_model:"manager"===be.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant"}:e);ee(e),Fe(!1),fe(null),ve({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,currency:"",enableTrial:!1})}else{const e=await t.text();console.error("Failed to update restaurant:",e),Ze("Failed to update restaurant. Please try again.")}}catch(n){console.error("Error updating restaurant:",n),Ze("Error updating restaurant. Please try again.")}},children:e("admin:restaurantsPage.updateRestaurant")})]}),children:(0,h.jsxs)(M,{children:[(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(O,{children:"Restaurant Name *"}),(0,h.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:be.name,onChange:e=>ve({...be,name:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Email Address *"}),(0,h.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:be.email,onChange:e=>ve({...be,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Country *"}),(0,h.jsx)(L,{value:be.country,onChange:e=>ve({...be,country:e.target.value}),children:p.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Phone Number *"}),(0,h.jsx)(u.A,{value:be.phone,onChange:e=>ve({...be,phone:e}),defaultCountry:be.country})]}),(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(O,{children:"Address *"}),(0,h.jsx)(W,{placeholder:"Enter street address",value:be.address,onChange:e=>ve({...be,address:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.city")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Kuala Lumpur",value:be.city,onChange:e=>ve({...be,city:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.stateProvince")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:be.state,onChange:e=>ve({...be,state:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.postalCode")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 50000",value:be.postalCode,onChange:e=>ve({...be,postalCode:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.cuisineType")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:be.cuisine,onChange:e=>ve({...be,cuisine:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 202401012345",value:be.businessRegistration,onChange:e=>ve({...be,businessRegistration:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,h.jsx)($,{type:"text",placeholder:"e.g., MY1234567890",value:be.taxId,onChange:e=>ve({...be,taxId:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Plan Type *"}),(0,h.jsx)(L,{value:be.planType,onChange:e=>{const a=Qe.find(a=>a.display_name===e.target.value);ve({...be,planType:e.target.value,planAmount:a?String((0,c.jL)(a,(0,c.Wh)(re))):"0"})},children:Qe.map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.m9)(e,(0,c.Wh)(re)),"/month)"]},e.id))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Billing Cycle *"}),(0,h.jsxs)(L,{value:be.billingCycle,onChange:e=>{const a=e.target.value,n=Qe.find(e=>e.display_name===be.planType),t=(0,c.Wh)(re),r=n?(0,c.jL)(n,t,a):0;ve({...be,billingCycle:a,planAmount:r.toFixed(2)})},children:[(0,h.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,h.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Payment Model *"}),(0,h.jsxs)(L,{value:be.paymentModel,onChange:e=>ve({...be,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"manager",children:e("admin:restaurantsPage.managerPays")}),(0,h.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantPays")})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Subscription Start Date *"}),(0,h.jsx)($,{type:"date",value:be.subscriptionStart,onChange:e=>ve({...be,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(O,{children:"Subscription End Date *"}),(0,h.jsx)($,{type:"date",value:be.subscriptionEnd,onChange:e=>ve({...be,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:be.autoRenew,onChange:e=>ve({...be,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[be.planType," - ",(0,c.vv)(parseFloat(be.planAmount)||0,be.currency||"MYR")," (",be.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===be.paymentModel?"Manager":"Restaurant"]})]})]})}),Ke&&Je&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>He(!1),title:"Delete Restaurant",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.cc,{variant:"cancel",onClick:()=>He(!1),children:e("admin:restaurantsPage.cancel")}),(0,h.jsx)(o.cc,{variant:"primary",onClick:async()=>{if(Je)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${Je.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(ee(X.filter(e=>e.id!==Je.id)),He(!1),Ve(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#EF4444"},children:" Delete Restaurant "})]}),children:(0,h.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,h.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,h.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,h.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,h.jsxs)("div",{style:{textAlign:"left",margin:"0 auto",maxWidth:"320px"},children:[(0,h.jsxs)("p",{style:{margin:"0 0 12px",fontSize:"14px",color:"#6B7280"},children:[(0,h.jsx)("strong",{style:{color:"#DC2626"},children:Je.name})," and all its data will be permanently deleted:"]}),(0,h.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA",fontSize:"13px",color:"#991B1B",lineHeight:"1.6"},children:[(0,h.jsx)("div",{children:"\u2022 All orders, menu items, and categories"}),(0,h.jsx)("div",{children:"\u2022 All invoices and payment records"}),(0,h.jsx)("div",{children:"\u2022 Staff accounts linked to this restaurant"}),(0,h.jsx)("div",{children:"\u2022 Kitchen stations and floor plans"}),(0,h.jsx)("div",{style:{marginTop:"8px",fontWeight:"600"},children:e("admin:restaurantsPage.thisActionCannotBeUndone")})]})]})]})}),Pe&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:()=>_e(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[Re&&(0,h.jsx)(o.cc,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Re),Me(!0),setTimeout(()=>Me(!1),2e3)},children:De?"Copied!":"Copy Password"}),(0,h.jsx)(o.cc,{onClick:()=>_e(!1),children:e("admin:restaurantsPage.done")})]}),children:[(0,h.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[ze," Please share this password securely. They should change it after first login."]}),Re&&(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:e("admin:restaurantsPage.temporaryPassword")}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Re})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:e("admin:restaurantsPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})}}}]);