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
`},8348:(e,n,a)=>{a.r(n),a.d(n,{default:()=>re});var r=a(9950),t=a(4492),o=a(4752),s=a(2853),i=a(3705),d=a(1367),l=a(8409),c=a(2435),p=a(8666),x=a(4414);const u=o.Ay.div`
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
`,C=o.Ay.div`
  flex: 1;
`,w=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,A=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,E=o.Ay.span`
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
`,B=o.Ay.div`
  text-align: center;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,z=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,R=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,I=o.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,D=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,N=o.Ay.button`
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
`,T=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,_=o.Ay.input`
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
`,P=o.Ay.select`
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
`,O=o.Ay.div`
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
`,$=o.Ay.div`
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
  margin: auto 0;
`,L=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=o.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,M=o.Ay.button`
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
`,W=o.Ay.div`
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
`,K=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,H=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,J=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,V=o.Ay.input`
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
`,G=o.Ay.select`
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
`,q=o.Ay.textarea`
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
`,Z=o.Ay.div`
  position: relative;

  @media (max-width: 600px) {
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
`,re=()=>{const{user:e}=(0,d.As)(),n=(0,t.Zp)(),[a,o]=(0,r.useState)([]),[re,te]=(0,r.useState)(!1),[oe,se]=(0,r.useState)(""),[ie,de]=(0,r.useState)("all"),[le,ce]=(0,r.useState)({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),[pe,xe]=(0,r.useState)(null),[ue,he]=(0,r.useState)(!1),[ge,me]=(0,r.useState)("create"),[ye,je]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[be,fe]=(0,r.useState)(null),[ve,Ce]=(0,r.useState)([]),[we,Fe]=(0,r.useState)(""),[Ae,Ee]=(0,r.useState)(!1),[ke,Be]=(0,r.useState)(!1),[Se,ze]=(0,r.useState)(null),[Re,Ie]=(0,r.useState)("");(0,r.useEffect)(()=>{e&&De()},[e]);const De=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.success){const n=e.data.map(e=>{var n,a;return{id:e.id.toString(),name:e.name,location:e.address||"No address provided",address:e.address||"",phone:e.phone||"",email:e.email||"",cuisine:e.cuisine||e.cuisine_type||"Various",status:e.status||"inactive",plan:(e.plan_type||"Basic Plan").toLowerCase().replace(" plan",""),todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastOrder:"No orders yet",monthlyFee:parseFloat(e.plan_amount)||29,nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],adminName:(null===(n=e.admin)||void 0===n?void 0:n.full_name)||e.admin_name||"",adminEmail:(null===(a=e.admin)||void 0===a?void 0:a.email)||"",payment_model:e.payment_model||"restaurant"}});o(n)}}}catch(e){console.error("Error fetching restaurants:",e)}},Ne=a.filter(e=>{const n=e.name.toLowerCase().includes(oe.toLowerCase())||e.location.toLowerCase().includes(oe.toLowerCase())||e.cuisine.toLowerCase().includes(oe.toLowerCase()),a="all"===ie||e.status===ie;return n&&a}),Te=a.length,_e=a.filter(e=>"active"===e.status).length,Pe=a.reduce((e,n)=>e+n.todaySales,0),Oe=a.reduce((e,n)=>e+n.todayOrders,0),$e=a.reduce((e,n)=>e+n.staffCount,0),Le=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,x.jsx)(I,{filled:a<=e,children:"\u2605"},a));return n},Ue=async e=>{Fe(e),Ee(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();Ce(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{children:"Restaurants"}),(0,x.jsxs)(y,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{const n={exportDate:(new Date).toISOString(),totalRestaurants:a.length,owner:null===e||void 0===e?void 0:e.name,restaurants:a.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},r=JSON.stringify(n,null,2),t=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(t),s=document.createElement("a");s.href=o,s.download=`owner-restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},children:"Export Data"}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{ce({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),me("create"),je({fullName:"",email:"",username:"",password:"",phone:""}),fe(null),Ce([]),Fe(""),Ie(""),te(!0)},children:"Add Restaurant"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:Te}),(0,x.jsx)(l.v0,{children:"Total Restaurants"}),(0,x.jsx)(l.E_,{trend:"up",children:"Owned restaurants"})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:_e}),(0,x.jsx)(l.v0,{children:"Active Restaurants"}),(0,x.jsxs)(l.E_,{trend:"up",children:[Te>0?Math.round(_e/Te*100):0,"% operational"]})]}),(0,x.jsxs)(l.hI,{color:"#7C3AED",children:[(0,x.jsxs)(l.Os,{children:["RM ",Pe.toFixed(2)]}),(0,x.jsx)(l.v0,{children:"Today's Total Sales"}),(0,x.jsx)(l.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:Oe}),(0,x.jsx)(l.v0,{children:"Today's Orders"}),(0,x.jsx)(l.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:$e}),(0,x.jsx)(l.v0,{children:"Total Staff"}),(0,x.jsx)(l.E_,{trend:"neutral",children:"All restaurants"})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(_,{placeholder:"Search restaurants...",value:oe,onChange:e=>se(e.target.value)}),(0,x.jsxs)(P,{value:ie,onChange:e=>de(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),0===Ne.length?(0,x.jsx)(s.pp,{children:0===a.length?'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.':"No restaurants match the current filter."}):(0,x.jsx)(b,{children:Ne.map(e=>(0,x.jsxs)(f,{onClick:()=>{return a=e.id,r=e.name,void n(`/pos/owner/reports?tab=sales&restaurantId=${a}&restaurantName=${encodeURIComponent(r)}`);var a,r},children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[e.name," ",e.currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency})]}),e.adminName&&(0,x.jsxs)(F,{style:{fontWeight:"600",color:"#635BFF"},children:["Admin: ",e.adminName]}),(0,x.jsxs)(F,{children:[e.location," ","Various"!==e.cuisine?`\xb7 ${e.cuisine}`:""]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(A,{status:e.status,children:e.status}),(0,x.jsx)(E,{plan:e.plan,children:e.plan})]})]}),(0,x.jsxs)(R,{children:[Le(e.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[e.rating," \xb7 Last order: ",e.lastOrder]})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(B,{children:[(0,x.jsxs)(S,{children:["RM ",e.todaySales.toFixed(2)]}),(0,x.jsx)(z,{children:"Today's Sales"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(S,{children:e.todayOrders}),(0,x.jsx)(z,{children:"Orders"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(S,{children:e.staffCount}),(0,x.jsx)(z,{children:"Staff"})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(N,{onClick:n=>((e,n)=>{e.stopPropagation(),Ie(""),xe(n),ce({name:n.name,email:n.email,phone:n.phone,address:n.address,city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:n.cuisine}),he(!0)})(n,e),children:"Edit"}),(0,x.jsx)(N,{onClick:a=>((e,a)=>{e.stopPropagation(),n(`/pos/owner/reports?tab=sales&restaurantId=${a.id}&restaurantName=${encodeURIComponent(a.name)}`)})(a,e),children:"View Reports"}),(0,x.jsx)(N,{onClick:n=>((e,n)=>{e.stopPropagation(),ze(n),Be(!0)})(n,e),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Remove"})]})]},e.id))})]})]}),re&&(0,x.jsx)(O,{show:re,onClick:()=>te(!1),children:(0,x.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Add New Restaurant"}),(0,x.jsx)(M,{onClick:()=>te(!1),children:"\xd7"})]}),(0,x.jsx)(W,{children:(0,x.jsxs)(K,{children:[(0,x.jsxs)(H,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(J,{children:"Restaurant Name *"}),(0,x.jsx)(V,{type:"text",placeholder:"Enter restaurant name",value:le.name,onChange:e=>ce({...le,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===ge?"#F0EFFF":"#F9FAFB",border:"create"===ge?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"create"===ge,onChange:()=>{me("create"),fe(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===ge?"#F0EFFF":"#F9FAFB",border:"assign"===ge?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"assign"===ge,onChange:()=>{me("assign"),je({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===ge?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Admin Full Name *"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Kim Owner",value:ye.fullName,onChange:e=>je({...ye,fullName:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Admin Email *"}),(0,x.jsx)(V,{type:"email",placeholder:"admin@restaurant.com",value:ye.email,onChange:e=>je({...ye,email:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Admin Username *"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., kim_owner",value:ye.username,onChange:e=>je({...ye,username:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Admin Password *"}),(0,x.jsx)(V,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:ye.password,onChange:e=>je({...ye,password:e.target.value})})]}),(0,x.jsxs)(H,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(J,{children:"Admin Phone"}),(0,x.jsx)(p.A,{value:ye.phone,onChange:e=>je({...ye,phone:e}),defaultCountry:le.country})]})]}):(0,x.jsxs)(H,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(J,{children:"Search and select an existing user"}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(Q,{type:"text",placeholder:"Type to search by name, email, or username...",value:we,onChange:e=>Ue(e.target.value),onFocus:()=>Ue(we),onBlur:()=>setTimeout(()=>Ee(!1),200)}),(0,x.jsx)(X,{show:Ae,children:0===ve.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:we.length>0?"No available users found":"Type to search users..."}):ve.map(e=>(0,x.jsxs)(ee,{onClick:()=>(e=>{fe(e),Fe(e.full_name||e.username),Ee(!1)})(e),children:[(0,x.jsx)(ne,{children:e.full_name||e.username}),(0,x.jsxs)(ae,{children:[e.email," \xb7 ",e.role]})]},e.id))})]}),be&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:be.full_name||be.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[be.email," \xb7 ",be.role]})]}),(0,x.jsx)("button",{onClick:()=>{fe(null),Fe("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Email Address *"}),(0,x.jsx)(V,{type:"email",placeholder:"restaurant@example.com",value:le.email,onChange:e=>ce({...le,email:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Country *"}),(0,x.jsx)(G,{value:le.country,onChange:e=>ce({...le,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:le.phone,onChange:e=>ce({...le,phone:e}),defaultCountry:le.country})]}),(0,x.jsxs)(H,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(J,{children:"Address *"}),(0,x.jsx)(q,{placeholder:"Enter street address",value:le.address,onChange:e=>ce({...le,address:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"City"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Kuala Lumpur",value:le.city,onChange:e=>ce({...le,city:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"State / Province"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:le.state,onChange:e=>ce({...le,state:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Postal Code"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., 50000",value:le.postalCode,onChange:e=>ce({...le,postalCode:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Cuisine Type"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:le.cuisine,onChange:e=>ce({...le,cuisine:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Business Registration No."}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., 202401012345",value:le.businessRegistration,onChange:e=>ce({...le,businessRegistration:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Tax ID / GST No."}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., MY1234567890",value:le.taxId,onChange:e=>ce({...le,taxId:e.target.value})})]})]})}),(0,x.jsxs)(Y,{children:[Re&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Re}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{te(!1),Ie("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async n=>{n.preventDefault(),Ie("");try{if("create"===ge){if(!ye.fullName||!ye.email||!ye.username||!ye.password)return void Ie("Please fill in all required Restaurant Admin fields.");if(ye.password.length<8)return void Ie("Admin password must be at least 8 characters.");if(!/[a-z]/.test(ye.password)||!/[A-Z]/.test(ye.password)||!/[0-9]/.test(ye.password))return void Ie("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===ge&&!be)return void Ie("Please select an existing user as Restaurant Admin.");const n={name:le.name,address:le.address,city:le.city,state:le.state,postal_code:le.postalCode,country:le.country,phone:le.phone,email:le.email,cuisine:le.cuisine,business_registration:le.businessRegistration||void 0,tax_id:le.taxId||void 0,managerIds:[parseInt(((null===e||void 0===e?void 0:e.id)||"0").toString())],adminAction:ge,status:"active"};"create"===ge?(n.adminEmail=ye.email,n.adminPassword=ye.password,n.adminUsername=ye.username,n.adminFullName=ye.fullName,n.adminPhone=ye.phone||void 0):"assign"===ge&&(n.adminUserId=parseInt(be.id.toString()));const o=localStorage.getItem("auth_token"),s=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(n)});if(s.ok){var a;const e=await s.json(),n=e.id||(null===(a=e.data)||void 0===a?void 0:a.id);n&&await fetch(`/api/owner/restaurants/${n}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),te(!1),await De()}else{var r;const e=await s.json().catch(()=>({error:"Unknown error"}));let n="Please try again.";if("string"===typeof e.error)n=e.error;else if(null!==(r=e.error)&&void 0!==r&&r.message){var t;n=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(n+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(n=e.message);Ie(`Failed to create restaurant: ${n}`)}}catch(o){console.error("Error creating restaurant:",o),Ie("Error creating restaurant. Please try again.")}},children:"Add Restaurant"})]})]})}),ue&&(0,x.jsx)(O,{show:ue,onClick:()=>he(!1),children:(0,x.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Edit Restaurant"}),(0,x.jsx)(M,{onClick:()=>he(!1),children:"\xd7"})]}),(0,x.jsx)(W,{children:(0,x.jsxs)(K,{children:[(0,x.jsxs)(H,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(J,{children:"Restaurant Name *"}),(0,x.jsx)(V,{type:"text",placeholder:"Enter restaurant name",value:le.name,onChange:e=>ce({...le,name:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Email Address *"}),(0,x.jsx)(V,{type:"email",placeholder:"restaurant@example.com",value:le.email,onChange:e=>ce({...le,email:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Country *"}),(0,x.jsx)(G,{value:le.country,onChange:e=>ce({...le,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:le.phone,onChange:e=>ce({...le,phone:e}),defaultCountry:le.country})]}),(0,x.jsxs)(H,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(J,{children:"Address *"}),(0,x.jsx)(q,{placeholder:"Enter street address",value:le.address,onChange:e=>ce({...le,address:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"City"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Kuala Lumpur",value:le.city,onChange:e=>ce({...le,city:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"State / Province"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:le.state,onChange:e=>ce({...le,state:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Postal Code"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., 50000",value:le.postalCode,onChange:e=>ce({...le,postalCode:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Cuisine Type"}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:le.cuisine,onChange:e=>ce({...le,cuisine:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Business Registration No."}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., 202401012345",value:le.businessRegistration,onChange:e=>ce({...le,businessRegistration:e.target.value})})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(J,{children:"Tax ID / GST No."}),(0,x.jsx)(V,{type:"text",placeholder:"e.g., MY1234567890",value:le.taxId,onChange:e=>ce({...le,taxId:e.target.value})})]})]})}),(0,x.jsxs)(Y,{children:[Re&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:Re}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{he(!1),Ie("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Ie(""),pe)try{const e=localStorage.getItem("auth_token"),n={name:le.name,email:le.email,phone:le.phone,address:le.address,city:le.city,state:le.state,postal_code:le.postalCode,country:le.country,business_registration:le.businessRegistration||void 0,tax_id:le.taxId||void 0,cuisine:le.cuisine};(await fetch(`/api/restaurants/${pe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)})).ok?(he(!1),xe(null),await De()):Ie("Failed to update restaurant. Please try again.")}catch(n){console.error("Error updating restaurant:",n),Ie("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]})]})}),ke&&Se&&(0,x.jsx)(O,{show:ke,onClick:()=>Be(!1),children:(0,x.jsxs)($,{onClick:e=>e.stopPropagation(),style:{maxWidth:"450px"},children:[(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Remove Restaurant"}),(0,x.jsx)(M,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,x.jsx)(W,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to remove this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:Se.name})," will be unlinked from your account.",(0,x.jsx)("br",{}),"The restaurant itself will not be deleted."]})]})}),(0,x.jsxs)(Y,{children:[(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>Be(!1),children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Se)try{const e=localStorage.getItem("auth_token");await fetch(`/api/owner/restaurants/${Se.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),o(a.filter(e=>e.id!==Se.id)),Be(!1),ze(null)}catch(e){console.error("Error removing restaurant:",e)}},style:{background:"#DC2626"},children:"Remove Restaurant"})]})]})})]})}}}]);