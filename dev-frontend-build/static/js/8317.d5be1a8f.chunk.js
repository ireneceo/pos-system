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
`},4021:(e,a,n)=>{n.d(a,{i1:()=>i});var t=n(9950),r=n(1367),s=n(6038),o=n(9955);const i=()=>{const{user:e}=(0,r.As)(),[a,n]=(0,t.useState)("RM"),[i]=(0,t.useState)(Object.keys(s.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const a=window.location.pathname.split("/"),t=a.indexOf("restaurant");let r=t>=0?a[t+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=(0,o.c4)(),a=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(a.ok){var s;const e=await a.json(),t=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";n(t)}else n("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),p("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:a,supportedCurrencies:i,loading:l,error:c}}},8317:(e,a,n)=>{n.r(a),n.d(a,{default:()=>ee});var t=n(9950),r=n(4492),s=n(4752),o=n(3705),i=n(1367),l=n(8409),d=n(4021),c=n(6038),p=n(2435),u=n(8666),x=n(5030),h=n(9955),g=n(4414);const m=s.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,y=s.Ay.div`
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
`,b=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,v=s.Ay.h1`
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
`,f=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,F=s.Ay.div`
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
`,A=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,w=s.Ay.div`
  flex: 1;
`,S=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,B=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,P=s.Ay.span`
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
`,_=s.Ay.div`
  text-align: center;
`,z=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,R=s.Ay.div`
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
`,T=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,D=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,M=s.Ay.button`
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
`,N=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,O=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,$=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,L=s.Ay.input`
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
`,Y=s.Ay.textarea`
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
`,U=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,G=s.Ay.input`
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
`,K=s.Ay.select`
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
`,H=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
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

  &:hover {
    border-color: #D1D5DB;
  }
`,V=s.Ay.div`
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
`,q=s.Ay.div`
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
`,Z=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,Q=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,X=s.Ay.button`
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
`,ee=()=>{const{t:e}=(0,x.Bd)("admin"),{user:a}=(0,i.As)(),n=(0,r.Zp)(),[s]=(0,r.ok)(),[ee,ae]=(0,t.useState)([]),[ne,te]=(0,t.useState)(!1),{defaultCurrency:re}=(0,d.i1)(),[se,oe]=(0,t.useState)("RM");(0,t.useEffect)(()=>{re&&oe(re)},[re]);const[ie,le]=(0,t.useState)(""),[de,ce]=(0,t.useState)("all"),[pe,ue]=(0,t.useState)("all"),[xe,he]=(0,t.useState)(""),[ge,me]=(0,t.useState)(!1),[ye,be]=(0,t.useState)([]),[ve,je]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),[fe,Ce]=(0,t.useState)(null),[Fe,Ae]=(0,t.useState)(!1),[we,Se]=(0,t.useState)([]),[Ee,Be]=(0,t.useState)("create"),[Pe,ke]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[_e,ze]=(0,t.useState)(!1),[Re,Ie]=(0,t.useState)(""),[Te,De]=(0,t.useState)(""),[Me,Ne]=(0,t.useState)(!1),[Oe,$e]=(0,t.useState)(null),[Le,We]=(0,t.useState)([]),[Ye,Ue]=(0,t.useState)(""),[Ge,Ke]=(0,t.useState)(!1),[He,Je]=(0,t.useState)(!1),[Ve,qe]=(0,t.useState)(null),[Ze,Qe]=(0,t.useState)(""),[Xe,ea]=(0,t.useState)([]);(0,t.useEffect)(()=>{(async()=>{try{const e=(0,h.c4)(),a=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();Se(e)}}catch(e){console.error("Error fetching brands:",e)}})();(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const a=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);ea(a),a.length>0&&je(e=>({...e,planType:a[0].display_name,planAmount:String((0,c.jL)(a[0],(0,c.Wh)(se)))}))}}catch(e){console.error("Error fetching plans:",e)}})();const e=s.get("brandId"),a=s.get("brandName");e&&a&&(ue(e),he(decodeURIComponent(a)))},[s]),(0,t.useEffect)(()=>{a&&(async()=>{try{if(!a)return;const e=(0,h.c4)(),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=(await n.json()).map(e=>{var a,n;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:e.managerId||(null===(a=e.admin_id)||void 0===a?void 0:a.toString())||"1",brandName:e.managerName||e.admin_name||"Manager Brand",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(n=e.planType||e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic",todaySales:parseFloat(e.todaySales)||0,todayOrders:parseInt(e.todayOrders)||0,staffCount:parseInt(e.staffCount)||0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});ae(e)}else console.error("Failed to fetch restaurants from API"),ae([])}catch(e){console.error("Error fetching restaurants:",e),ae([])}})()},[a]);const aa=ee.filter(e=>{const a=e.name.toLowerCase().includes(ie.toLowerCase())||e.location.toLowerCase().includes(ie.toLowerCase())||e.cuisine.toLowerCase().includes(ie.toLowerCase()),n="all"===de||e.status===de,t="all"===pe||e.brand_id&&e.brand_id.toString()===pe;return a&&n&&t}),na=ee.length,ta=ee.filter(e=>"active"===e.status).length,ra=ee.reduce((e,a)=>e+a.todaySales,0),sa=ee.reduce((e,a)=>e+a.todayOrders,0),oa=e=>{const a=[];for(let n=1;n<=5;n++)a.push((0,g.jsx)(T,{filled:n<=e,children:"\u2605"},n));return a},ia=async e=>{Ue(e),Ke(!0);try{const a=(0,h.c4)(),n=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(n.ok){const e=await n.json();We(e.data||[])}}catch(a){console.error("Error searching admin candidates:",a)}};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(v,{children:e("admin:restaurantsPage.restaurants")}),(0,g.jsxs)(j,{children:[(0,g.jsx)(f,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalRestaurants:ee.length,manager:null===a||void 0===a?void 0:a.name,restaurants:ee.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},n=JSON.stringify(e,null,2),t=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(t),s=document.createElement("a");s.href=r,s.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:e("admin:restaurantsPage.exportData")}),(0,g.jsx)(f,{variant:"primary",onClick:()=>{const e=(null===a||void 0===a?void 0:a.managerId)||(null===a||void 0===a?void 0:a.id)||"8",n=(new Date).toISOString().split("T")[0],t=new Date;t.setFullYear(t.getFullYear()+1),je({name:"",managerId:e,email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:n,subscriptionEnd:t.toISOString().split("T")[0],autoRenew:!0,enableTrial:!1}),Be("create"),ke({fullName:"",email:"",username:"",phone:""}),$e(null),We([]),Ue(""),Qe(""),te(!0)},children:e("admin:restaurantsPage.addRestaurant")})]})]}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(l.MD,{children:[(0,g.jsxs)(l.hI,{color:"#059669",children:[(0,g.jsx)(l.Os,{children:na}),(0,g.jsx)(l.v0,{children:e("admin:restaurantsPage.totalRestaurants")}),(0,g.jsx)(l.E_,{trend:"up",children:"+1 this month"})]}),(0,g.jsxs)(l.hI,{color:"#2563EB",children:[(0,g.jsx)(l.Os,{children:ta}),(0,g.jsx)(l.v0,{children:e("admin:restaurantsPage.activeRestaurants")}),(0,g.jsxs)(l.E_,{trend:"up",children:[Math.round(ta/na*100),"% operational"]})]}),(0,g.jsxs)(l.hI,{color:"#7C3AED",children:[(0,g.jsx)(l.Os,{children:(0,c.vv)(ra,se)}),(0,g.jsx)(l.v0,{children:e("admin:restaurantsPage.todaysTotalSales")}),(0,g.jsx)(l.E_,{trend:"up",children:"+24% vs yesterday"})]}),(0,g.jsxs)(l.hI,{color:"#DC2626",children:[(0,g.jsx)(l.Os,{children:sa}),(0,g.jsx)(l.v0,{children:e("admin:restaurantsPage.todaysOrders")}),(0,g.jsx)(l.E_,{trend:"up",children:"+18% vs yesterday"})]})]}),(0,g.jsxs)(U,{children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Search brands...",value:xe,onChange:e=>(e=>{if(he(e),me(!0),e.length<1)return void be(we.slice(0,10));const a=we.filter(a=>{const n=e.toLowerCase(),t=(a.name||"").toLowerCase(),r=(a.code||"").toLowerCase();return t.includes(n)||r.includes(n)}).slice(0,10);be(a)})(e.target.value),onFocus:()=>{me(!0),0===xe.length&&be(we.slice(0,10))},onBlur:()=>setTimeout(()=>me(!1),200)}),"all"!==pe&&xe&&(0,g.jsx)(X,{onClick:()=>{ue("all"),he(""),me(!1),n("/pos/manager/restaurants",{replace:!0})},children:"\xd7"}),(0,g.jsxs)(V,{show:ge,children:[(0,g.jsxs)(q,{onClick:()=>{ue("all"),he(""),me(!1),n("/pos/manager/restaurants",{replace:!0})},children:[(0,g.jsx)(Z,{children:e("admin:restaurantsPage.allBrands")}),(0,g.jsx)(Q,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),ye.map(e=>(0,g.jsxs)(q,{onClick:()=>(e=>{ue(e.id.toString()),he(e.name),me(!1)})(e),children:[(0,g.jsx)(Z,{children:e.name}),(0,g.jsxs)(Q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,g.jsxs)(K,{value:de,onChange:e=>ce(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:e("admin:restaurantsPage.allStatus")}),(0,g.jsx)("option",{value:"active",children:e("admin:restaurantsPage.active")}),(0,g.jsx)("option",{value:"trial",children:e("admin:restaurantsPage.trial")}),(0,g.jsx)("option",{value:"expired",children:e("admin:restaurantsPage.expired")}),(0,g.jsx)("option",{value:"suspended",children:e("admin:restaurantsPage.suspended")}),(0,g.jsx)("option",{value:"cancelled",children:e("admin:restaurantsPage.cancelled")})]}),(0,g.jsx)(G,{placeholder:"Search restaurants...",value:ie,onChange:e=>le(e.target.value)})]}),(0,g.jsx)(C,{children:aa.map(t=>{var r;return(0,g.jsxs)(F,{onClick:()=>{return e=t.id,r=t.name,void("Brand General"===(null===a||void 0===a?void 0:a.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${e}&restaurantName=${encodeURIComponent(r)}`));var e,r},children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(S,{children:[t.name," ",t.currency&&(0,g.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:t.currency})]}),t.brand_id&&(0,g.jsx)(E,{style:{fontWeight:"600",color:"#635BFF"},children:(null===(r=we.find(e=>e.id===t.brand_id))||void 0===r?void 0:r.name)||"Brand"}),(0,g.jsxs)(E,{children:[t.location," \u2022 ",t.cuisine]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)(B,{status:t.status,children:t.status}),(0,g.jsx)(P,{plan:t.plan,children:t.plan})]})]}),(0,g.jsxs)(I,{children:[oa(t.rating),(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[t.rating," \u2022 Last order: ",t.lastOrder]})]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:(0,c.vv)(t.todaySales,se)}),(0,g.jsx)(R,{children:e("admin:restaurantsPage.todaysSales")})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:t.todayOrders}),(0,g.jsx)(R,{children:e("admin:restaurantsPage.orders")})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:t.staffCount}),(0,g.jsx)(R,{children:e("admin:restaurantsPage.staff")})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{onClick:e=>((e,a)=>{var n;e.stopPropagation(),Qe(""),Ce(a);const t=a.payment_model,r="brand_manager"===t?"manager":"restaurant"===t?"restaurant":"manager";je({name:a.name,managerId:"",email:a.email,phone:a.phone,address:a.address,city:a.city||"",state:a.state||"",postalCode:a.postalCode||"",country:a.country||"MY",businessRegistration:a.businessRegistration||"",taxId:a.taxId||"",cuisine:a.cuisine,planType:"basic"===a.plan?"Basic Plan":"professional"===a.plan?"Professional Plan":"Enterprise Plan",planAmount:(null===(n=a.monthlyFee)||void 0===n?void 0:n.toString())||"29.00",currency:a.currency||"MYR",status:a.status||"active",billingCycle:a.billing_cycle||a.billingCycle||"monthly",paymentModel:r,subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Ae(!0)})(e,t),children:e("admin:restaurantsPage.edit")}),(0,g.jsx)(M,{onClick:e=>((e,t)=>{e.stopPropagation(),"Brand General"===(null===a||void 0===a?void 0:a.role)?n(`/pos/brand/general/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`):n(`/pos/manager/reports?tab=sales&restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`)})(e,t),children:e("admin:restaurantsPage.viewReports")}),(0,g.jsx)(M,{onClick:e=>((e,a)=>{e.stopPropagation(),qe(a),Je(!0)})(e,t),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:e("admin:restaurantsPage.delete")})]})]},t.id)})})]})]}),ne&&(0,g.jsx)(l.aF,{isOpen:!0,onClose:()=>te(!1),title:"Add New Restaurant",footer:(0,g.jsxs)(g.Fragment,{children:[Ze&&(0,g.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Ze," "]})," ",(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{te(!1),Qe("")},children:e("admin:restaurantsPage.cancel")}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async e=>{e.preventDefault(),Qe("");try{if("create"===Ee){if(!Pe.fullName||!Pe.email||!Pe.username)return void Qe("Please fill in all required Restaurant Admin fields (Full Name, Email, Username).")}else if("assign"===Ee&&!Oe)return void Qe("Please select an existing user as Restaurant Admin.");const e=(null===a||void 0===a?void 0:a.managerId)||(null===a||void 0===a?void 0:a.id)||"2";let r=null,s=null;"Brand General"!==(null===a||void 0===a?void 0:a.role)&&"Brand Manager"!==(null===a||void 0===a?void 0:a.role)||(r=(null===a||void 0===a?void 0:a.brand_id)||null),"Foodcourt General"!==(null===a||void 0===a?void 0:a.role)&&"Foodcourt Manager"!==(null===a||void 0===a?void 0:a.role)||(s=(null===a||void 0===a?void 0:a.foodcourt_id)||null);const o={name:ve.name,address:ve.address,city:ve.city,state:ve.state,postal_code:ve.postalCode,country:ve.country,phone:ve.phone,email:ve.email,cuisine:ve.cuisine,business_registration:ve.businessRegistration||void 0,tax_id:ve.taxId||void 0,managerIds:[parseInt(e.toString())],adminAction:Ee,plan_type:ve.planType,plan_amount:parseFloat(ve.planAmount),currency:ve.currency,status:"active",billing_cycle:ve.billingCycle,payment_model:"manager"===ve.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant",subscription_start:new Date(ve.subscriptionStart),subscription_end:new Date(ve.subscriptionEnd),auto_renew:ve.autoRenew,created_by:e,brand_id:r,foodcourt_id:s};"create"===Ee?(o.adminEmail=Pe.email,o.adminUsername=Pe.username,o.adminFullName=Pe.fullName,o.adminPhone=Pe.phone||void 0):"assign"===Ee&&(o.adminUserId=parseInt(Oe.id.toString()));const i=(0,h.c4)(),l=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(o)});if(l.ok){const e=await l.json();e.generatedPassword&&(Ie("Restaurant Admin created successfully."),De(e.generatedPassword),Ne(!1),ze(!0));const a=(0,h.c4)(),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${a}`}});if(n.ok){const e=(await n.json()).map(e=>{var a,n;return{id:e.id.toString(),name:e.name,branchName:e.name,location:e.address||e.location||"No address provided",address:e.address||e.location||"No address provided",phone:e.phone||"No phone provided",email:e.email||"No email provided",brandId:(null===(a=e.admin_id)||void 0===a?void 0:a.toString())||"",brandName:e.admin_name||"",cuisine:e.cuisine||"Various",status:e.status,plan:(null===(n=e.planType||e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic",todaySales:parseFloat(e.todaySales)||0,todayOrders:parseInt(e.todayOrders)||0,staffCount:parseInt(e.staffCount)||0,rating:4.5,createdAt:new Date(e.createdAt).toISOString().split("T")[0],lastOrder:"No orders yet",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||29,nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],brand_id:e.brand_id||null,payment_model:e.payment_model||"restaurant"}});ae(e)}te(!1),je({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",currency:"MYR",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,enableTrial:!1}),Be("create"),ke({fullName:"",email:"",username:"",phone:""}),$e(null),We([]),Ue("")}else{var n;const e=await l.json().catch(()=>({error:"Unknown error"}));console.error("Failed to create restaurant:",e);let a="Please try again.";if("string"===typeof e.error)a=e.error;else if(null!==(n=e.error)&&void 0!==n&&n.message){var t;a=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(a+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(a=e.message);Qe(`Failed to create restaurant: ${a}`)}}catch(r){console.error("Error creating restaurant:",r),Qe("Error creating restaurant. Please try again.")}},children:e("admin:restaurantsPage.addRestaurant")})]}),children:(0,g.jsxs)(N,{children:[(0,g.jsxs)(O,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)($,{children:"Restaurant Name *"}),(0,g.jsx)(L,{type:"text",placeholder:"Enter restaurant name",value:ve.name,onChange:e=>je({...ve,name:e.target.value})})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Ee?"#F0EFFF":"#F9FAFB",border:"create"===Ee?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"create"===Ee,onChange:()=>{Be("create"),$e(null)},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===Ee?"#F0EFFF":"#F9FAFB",border:"assign"===Ee?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"adminActionMgr",checked:"assign"===Ee,onChange:()=>{Be("assign"),ke({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]})]})]}),"create"===Ee?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Admin Full Name *"}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Kim Owner",value:Pe.fullName,onChange:e=>ke({...Pe,fullName:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Admin Email *"}),(0,g.jsx)(L,{type:"email",placeholder:"admin@restaurant.com",value:Pe.email,onChange:e=>ke({...Pe,email:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Admin Username *"}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., kim_owner",value:Pe.username,onChange:e=>ke({...Pe,username:e.target.value})})]}),(0,g.jsxs)(O,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.adminPhone")}),(0,g.jsx)(u.A,{value:Pe.phone,onChange:e=>ke({...Pe,phone:e}),defaultCountry:ve.country})]})]}):(0,g.jsxs)(O,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,g.jsxs)(H,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Type to search by name, email, or username...",value:Ye,onChange:e=>ia(e.target.value),onFocus:()=>ia(Ye),onBlur:()=>setTimeout(()=>Ke(!1),200)}),(0,g.jsx)(V,{show:Ge,children:0===Le.length?(0,g.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:Ye.length>0?"No available users found":"Type to search users..."}):Le.map(e=>(0,g.jsxs)(q,{onClick:()=>(e=>{$e(e),Ue(e.full_name||e.username),Ke(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Oe&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Oe.full_name||Oe.username}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Oe.email," \u2022 ",Oe.role]})]}),(0,g.jsx)("button",{onClick:()=>{$e(null),Ue("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Email Address *"}),(0,g.jsx)(L,{type:"email",placeholder:"restaurant@example.com",value:ve.email,onChange:e=>je({...ve,email:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Country *"}),(0,g.jsx)(W,{value:ve.country,onChange:e=>je({...ve,country:e.target.value}),children:p.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Phone Number *"}),(0,g.jsx)(u.A,{value:ve.phone,onChange:e=>je({...ve,phone:e}),defaultCountry:ve.country})]}),(0,g.jsxs)(O,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)($,{children:"Address *"}),(0,g.jsx)(Y,{placeholder:"Enter street address",value:ve.address,onChange:e=>je({...ve,address:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.city")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ve.city,onChange:e=>je({...ve,city:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.stateProvince")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ve.state,onChange:e=>je({...ve,state:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.postalCode")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., 50000",value:ve.postalCode,onChange:e=>je({...ve,postalCode:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.cuisineType")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ve.cuisine,onChange:e=>je({...ve,cuisine:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., 202401012345",value:ve.businessRegistration,onChange:e=>je({...ve,businessRegistration:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., MY1234567890",value:ve.taxId,onChange:e=>je({...ve,taxId:e.target.value})})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Plan Type *"}),(0,g.jsx)(W,{value:ve.planType,onChange:e=>{const a=Xe.find(a=>a.display_name===e.target.value);je({...ve,planType:e.target.value,planAmount:a?String((0,c.jL)(a,(0,c.Wh)(se))):"0"})},children:Xe.map(e=>(0,g.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.m9)(e,(0,c.Wh)(se)),"/month)"]},e.id))})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Billing Cycle *"}),(0,g.jsxs)(W,{value:ve.billingCycle,onChange:e=>{const a=e.target.value,n=Xe.find(e=>e.display_name===ve.planType),t=(0,c.Wh)(se),r=n?(0,c.jL)(n,t,a):0;je({...ve,billingCycle:a,planAmount:r.toFixed(2)})},children:[(0,g.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,g.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Payment Model *"}),(0,g.jsxs)(W,{value:ve.paymentModel,onChange:e=>je({...ve,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"manager",children:e("admin:restaurantsPage.managerPays")}),(0,g.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantPays")})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Subscription Start Date *"}),(0,g.jsx)(L,{type:"date",value:ve.subscriptionStart,onChange:e=>je({...ve,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Subscription End Date *"}),(0,g.jsx)(L,{type:"date",value:ve.subscriptionEnd,onChange:e=>je({...ve,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(O,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:ve.autoRenew,onChange:e=>je({...ve,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ve.planType," - ",(0,c.vv)(parseFloat(ve.planAmount)||0,ve.currency||"MYR")," (",ve.billingCycle,")"]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===ve.paymentModel?"Manager":"Restaurant"]})]})]})}),Fe&&(0,g.jsx)(l.aF,{isOpen:!0,onClose:()=>Ae(!1),title:"Edit Restaurant",footer:(0,g.jsxs)(g.Fragment,{children:[Ze&&(0,g.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",Ze," "]})," ",(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{Ae(!1),Qe("")},children:e("admin:restaurantsPage.cancel")}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Qe(""),fe)try{const e=(0,h.c4)(),n={name:ve.name,email:ve.email,phone:ve.phone,address:ve.address,city:ve.city,state:ve.state,postal_code:ve.postalCode,country:ve.country,business_registration:ve.businessRegistration||void 0,tax_id:ve.taxId||void 0,cuisine:ve.cuisine,plan_type:ve.planType,plan_amount:parseFloat(ve.planAmount),currency:ve.currency,billing_cycle:ve.billingCycle,payment_model:"manager"===ve.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant"},t=await fetch(`/api/restaurants/${fe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(t.ok){const e=ee.map(e=>e.id===fe.id?{...e,name:ve.name,email:ve.email,phone:ve.phone,address:ve.address,location:ve.address,cuisine:ve.cuisine,status:ve.status,plan:ve.planType.toLowerCase().replace(" plan",""),monthlyFee:parseFloat(ve.planAmount),payment_model:"manager"===ve.paymentModel?"Foodcourt General"===(null===a||void 0===a?void 0:a.role)||"Foodcourt Manager"===(null===a||void 0===a?void 0:a.role)?"foodcourt_manager":"brand_manager":"restaurant"}:e);ae(e),Ae(!1),Ce(null),je({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",subscriptionStart:"",subscriptionEnd:"",autoRenew:!0,currency:"",enableTrial:!1})}else{const e=await t.text();console.error("Failed to update restaurant:",e),Qe("Failed to update restaurant. Please try again.")}}catch(n){console.error("Error updating restaurant:",n),Qe("Error updating restaurant. Please try again.")}},children:e("admin:restaurantsPage.updateRestaurant")})]}),children:(0,g.jsxs)(N,{children:[(0,g.jsxs)(O,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)($,{children:"Restaurant Name *"}),(0,g.jsx)(L,{type:"text",placeholder:"Enter restaurant name",value:ve.name,onChange:e=>je({...ve,name:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Email Address *"}),(0,g.jsx)(L,{type:"email",placeholder:"restaurant@example.com",value:ve.email,onChange:e=>je({...ve,email:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Country *"}),(0,g.jsx)(W,{value:ve.country,onChange:e=>je({...ve,country:e.target.value}),children:p.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Phone Number *"}),(0,g.jsx)(u.A,{value:ve.phone,onChange:e=>je({...ve,phone:e}),defaultCountry:ve.country})]}),(0,g.jsxs)(O,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)($,{children:"Address *"}),(0,g.jsx)(Y,{placeholder:"Enter street address",value:ve.address,onChange:e=>je({...ve,address:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.city")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ve.city,onChange:e=>je({...ve,city:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.stateProvince")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ve.state,onChange:e=>je({...ve,state:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.postalCode")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., 50000",value:ve.postalCode,onChange:e=>je({...ve,postalCode:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.cuisineType")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ve.cuisine,onChange:e=>je({...ve,cuisine:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., 202401012345",value:ve.businessRegistration,onChange:e=>je({...ve,businessRegistration:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,g.jsx)(L,{type:"text",placeholder:"e.g., MY1234567890",value:ve.taxId,onChange:e=>je({...ve,taxId:e.target.value})})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Plan Type *"}),(0,g.jsx)(W,{value:ve.planType,onChange:e=>{const a=Xe.find(a=>a.display_name===e.target.value);je({...ve,planType:e.target.value,planAmount:a?String((0,c.jL)(a,(0,c.Wh)(se))):"0"})},children:Xe.map(e=>(0,g.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,c.m9)(e,(0,c.Wh)(se)),"/month)"]},e.id))})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Billing Cycle *"}),(0,g.jsxs)(W,{value:ve.billingCycle,onChange:e=>{const a=e.target.value,n=Xe.find(e=>e.display_name===ve.planType),t=(0,c.Wh)(se),r=n?(0,c.jL)(n,t,a):0;je({...ve,billingCycle:a,planAmount:r.toFixed(2)})},children:[(0,g.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,g.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Payment Model *"}),(0,g.jsxs)(W,{value:ve.paymentModel,onChange:e=>je({...ve,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"manager",children:e("admin:restaurantsPage.managerPays")}),(0,g.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantPays")})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Subscription Start Date *"}),(0,g.jsx)(L,{type:"date",value:ve.subscriptionStart,onChange:e=>je({...ve,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)($,{children:"Subscription End Date *"}),(0,g.jsx)(L,{type:"date",value:ve.subscriptionEnd,onChange:e=>je({...ve,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(O,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:ve.autoRenew,onChange:e=>je({...ve,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ve.planType," - ",(0,c.vv)(parseFloat(ve.planAmount)||0,ve.currency||"MYR")," (",ve.billingCycle,")"]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===ve.paymentModel?"Manager":"Restaurant"]})]})]})}),He&&Ve&&(0,g.jsx)(l.aF,{isOpen:!0,onClose:()=>Je(!1),title:"Delete Restaurant",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>Je(!1),children:e("admin:restaurantsPage.cancel")}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async()=>{if(Ve)try{const e=(0,h.c4)();(await fetch(`/api/restaurants/${Ve.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok?(ae(ee.filter(e=>e.id!==Ve.id)),Je(!1),qe(null)):console.error("Failed to delete restaurant")}catch(e){console.error("Error deleting restaurant:",e)}},style:{background:"#EF4444"},children:" Delete Restaurant "})]}),children:(0,g.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,g.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,g.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,g.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to delete this restaurant?"}),(0,g.jsxs)("div",{style:{textAlign:"left",margin:"0 auto",maxWidth:"320px"},children:[(0,g.jsxs)("p",{style:{margin:"0 0 12px",fontSize:"14px",color:"#6B7280"},children:[(0,g.jsx)("strong",{style:{color:"#DC2626"},children:Ve.name})," and all its data will be permanently deleted:"]}),(0,g.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA",fontSize:"13px",color:"#991B1B",lineHeight:"1.6"},children:[(0,g.jsx)("div",{children:"\u2022 All orders, menu items, and categories"}),(0,g.jsx)("div",{children:"\u2022 All invoices and payment records"}),(0,g.jsx)("div",{children:"\u2022 Staff accounts linked to this restaurant"}),(0,g.jsx)("div",{children:"\u2022 Kitchen stations and floor plans"}),(0,g.jsx)("div",{style:{marginTop:"8px",fontWeight:"600"},children:e("admin:restaurantsPage.thisActionCannotBeUndone")})]})]})]})}),_e&&(0,g.jsxs)(l.aF,{isOpen:!0,onClose:()=>ze(!1),title:"Password Generated",size:"small",footer:(0,g.jsxs)(g.Fragment,{children:[Te&&(0,g.jsx)(o.cc,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Te),Ne(!0),setTimeout(()=>Ne(!1),2e3)},children:Me?"Copied!":"Copy Password"}),(0,g.jsx)(o.cc,{onClick:()=>ze(!1),children:e("admin:restaurantsPage.done")})]}),children:[(0,g.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[Re," Please share this password securely. They should change it after first login."]}),Te&&(0,g.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:e("admin:restaurantsPage.temporaryPassword")}),(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Te})]}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:e("admin:restaurantsPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})}}}]);