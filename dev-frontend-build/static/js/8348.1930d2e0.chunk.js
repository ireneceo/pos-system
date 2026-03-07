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
`},8348:(e,a,n)=>{n.r(a),n.d(a,{default:()=>q});var r=n(9950),t=n(4492),o=n(4752),s=n(2853),i=n(3705),l=n(1367),d=n(8409),c=n(2435),p=n(8666),x=n(4414);const u=o.Ay.div`
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
`,F=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=o.Ay.div`
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
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,k=o.Ay.div`
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
`,_=o.Ay.select`
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
`,P=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,$=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,L=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,U=o.Ay.input`
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
`,M=o.Ay.select`
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
`,Y=o.Ay.textarea`
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
`,W=o.Ay.div`
  position: relative;

  @media (max-width: 600px) {
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
`,G=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,q=()=>{const{user:e}=(0,l.As)(),a=(0,t.Zp)(),[n,o]=(0,r.useState)([]),[q,Z]=(0,r.useState)(!1),[Q,X]=(0,r.useState)(""),[ee,ae]=(0,r.useState)("all"),[ne,re]=(0,r.useState)({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),[te,oe]=(0,r.useState)(null),[se,ie]=(0,r.useState)(!1),[le,de]=(0,r.useState)("create"),[ce,pe]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[xe,ue]=(0,r.useState)(null),[he,ge]=(0,r.useState)([]),[me,ye]=(0,r.useState)(""),[je,be]=(0,r.useState)(!1),[fe,ve]=(0,r.useState)(!1),[Ce,Fe]=(0,r.useState)(null),[we,Ae]=(0,r.useState)("");(0,r.useEffect)(()=>{e&&Ee()},[e]);const Ee=async()=>{try{const e=localStorage.getItem("auth_token"),a=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();if(e.success){const a=e.data.map(e=>{var a,n;return{id:e.id.toString(),name:e.name,location:e.address||"No address provided",address:e.address||"",phone:e.phone||"",email:e.email||"",cuisine:e.cuisine||e.cuisine_type||"Various",status:e.status||"inactive",plan:(e.plan_type||"Basic Plan").toLowerCase().replace(" plan",""),todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastOrder:"No orders yet",monthlyFee:parseFloat(e.plan_amount)||29,nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],adminName:(null===(a=e.admin)||void 0===a?void 0:a.full_name)||e.admin_name||"",adminEmail:(null===(n=e.admin)||void 0===n?void 0:n.email)||"",payment_model:e.payment_model||"restaurant"}});o(a)}}}catch(e){console.error("Error fetching restaurants:",e)}},Be=n.filter(e=>{const a=e.name.toLowerCase().includes(Q.toLowerCase())||e.location.toLowerCase().includes(Q.toLowerCase())||e.cuisine.toLowerCase().includes(Q.toLowerCase()),n="all"===ee||e.status===ee;return a&&n}),ke=n.length,Se=n.filter(e=>"active"===e.status).length,ze=n.reduce((e,a)=>e+a.todaySales,0),Re=n.reduce((e,a)=>e+a.todayOrders,0),Ie=n.reduce((e,a)=>e+a.staffCount,0),De=e=>{const a=[];for(let n=1;n<=5;n++)a.push((0,x.jsx)(I,{filled:n<=e,children:"\u2605"},n));return a},Ne=async e=>{ye(e),be(!0);try{const a=localStorage.getItem("auth_token"),n=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(n.ok){const e=await n.json();ge(e.data||[])}}catch(a){console.error("Error searching admin candidates:",a)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{children:"Restaurants"}),(0,x.jsxs)(y,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{const a={exportDate:(new Date).toISOString(),totalRestaurants:n.length,owner:null===e||void 0===e?void 0:e.name,restaurants:n.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},r=JSON.stringify(a,null,2),t=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(t),s=document.createElement("a");s.href=o,s.download=`owner-restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},children:"Export Data"}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{re({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),de("create"),pe({fullName:"",email:"",username:"",password:"",phone:""}),ue(null),ge([]),ye(""),Ae(""),Z(!0)},children:"Add Restaurant"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{color:"#059669",children:[(0,x.jsx)(d.Os,{children:ke}),(0,x.jsx)(d.v0,{children:"Total Restaurants"}),(0,x.jsx)(d.E_,{trend:"up",children:"Owned restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#2563EB",children:[(0,x.jsx)(d.Os,{children:Se}),(0,x.jsx)(d.v0,{children:"Active Restaurants"}),(0,x.jsxs)(d.E_,{trend:"up",children:[ke>0?Math.round(Se/ke*100):0,"% operational"]})]}),(0,x.jsxs)(d.hI,{color:"#7C3AED",children:[(0,x.jsxs)(d.Os,{children:["RM ",ze.toFixed(2)]}),(0,x.jsx)(d.v0,{children:"Today's Total Sales"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#DC2626",children:[(0,x.jsx)(d.Os,{children:Re}),(0,x.jsx)(d.v0,{children:"Today's Orders"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#D97706",children:[(0,x.jsx)(d.Os,{children:Ie}),(0,x.jsx)(d.v0,{children:"Total Staff"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"All restaurants"})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(O,{placeholder:"Search restaurants...",value:Q,onChange:e=>X(e.target.value)}),(0,x.jsxs)(_,{value:ee,onChange:e=>ae(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),0===Be.length?(0,x.jsx)(s.pp,{children:0===n.length?'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.':"No restaurants match the current filter."}):(0,x.jsx)(b,{children:Be.map(e=>(0,x.jsxs)(f,{onClick:()=>{return n=e.id,r=e.name,void a(`/pos/owner/reports?tab=sales&restaurantId=${n}&restaurantName=${encodeURIComponent(r)}`);var n,r},children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)(F,{children:[e.name," ",e.currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency})]}),e.adminName&&(0,x.jsxs)(w,{style:{fontWeight:"600",color:"#635BFF"},children:["Admin: ",e.adminName]}),(0,x.jsxs)(w,{children:[e.location," ","Various"!==e.cuisine?`\xb7 ${e.cuisine}`:""]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(A,{status:e.status,children:e.status}),(0,x.jsx)(E,{plan:e.plan,children:e.plan})]})]}),(0,x.jsxs)(R,{children:[De(e.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[e.rating," \xb7 Last order: ",e.lastOrder]})]}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(k,{children:[(0,x.jsxs)(S,{children:["RM ",e.todaySales.toFixed(2)]}),(0,x.jsx)(z,{children:"Today's Sales"})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(S,{children:e.todayOrders}),(0,x.jsx)(z,{children:"Orders"})]}),(0,x.jsxs)(k,{children:[(0,x.jsx)(S,{children:e.staffCount}),(0,x.jsx)(z,{children:"Staff"})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(N,{onClick:a=>((e,a)=>{e.stopPropagation(),Ae(""),oe(a),re({name:a.name,email:a.email,phone:a.phone,address:a.address,city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:a.cuisine}),ie(!0)})(a,e),children:"Edit"}),(0,x.jsx)(N,{onClick:n=>((e,n)=>{e.stopPropagation(),a(`/pos/owner/reports?tab=sales&restaurantId=${n.id}&restaurantName=${encodeURIComponent(n.name)}`)})(n,e),children:"View Reports"}),(0,x.jsx)(N,{onClick:a=>((e,a)=>{e.stopPropagation(),Fe(a),ve(!0)})(a,e),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Remove"})]})]},e.id))})]})]}),q&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>Z(!1),title:"Add New Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[we&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",we," "]})," ",(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{Z(!1),Ae("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async a=>{a.preventDefault(),Ae("");try{if("create"===le){if(!ce.fullName||!ce.email||!ce.username||!ce.password)return void Ae("Please fill in all required Restaurant Admin fields.");if(ce.password.length<8)return void Ae("Admin password must be at least 8 characters.");if(!/[a-z]/.test(ce.password)||!/[A-Z]/.test(ce.password)||!/[0-9]/.test(ce.password))return void Ae("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===le&&!xe)return void Ae("Please select an existing user as Restaurant Admin.");const a={name:ne.name,address:ne.address,city:ne.city,state:ne.state,postal_code:ne.postalCode,country:ne.country,phone:ne.phone,email:ne.email,cuisine:ne.cuisine,business_registration:ne.businessRegistration||void 0,tax_id:ne.taxId||void 0,managerIds:[parseInt(((null===e||void 0===e?void 0:e.id)||"0").toString())],adminAction:le,status:"active"};"create"===le?(a.adminEmail=ce.email,a.adminPassword=ce.password,a.adminUsername=ce.username,a.adminFullName=ce.fullName,a.adminPhone=ce.phone||void 0):"assign"===le&&(a.adminUserId=parseInt(xe.id.toString()));const o=localStorage.getItem("auth_token"),s=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(a)});if(s.ok){var n;const e=await s.json(),a=e.id||(null===(n=e.data)||void 0===n?void 0:n.id);a&&await fetch(`/api/owner/restaurants/${a}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),Z(!1),await Ee()}else{var r;const e=await s.json().catch(()=>({error:"Unknown error"}));let a="Please try again.";if("string"===typeof e.error)a=e.error;else if(null!==(r=e.error)&&void 0!==r&&r.message){var t;a=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(a+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(a=e.message);Ae(`Failed to create restaurant: ${a}`)}}catch(o){console.error("Error creating restaurant:",o),Ae("Error creating restaurant. Please try again.")}},children:"Add Restaurant"})]}),children:(0,x.jsxs)(P,{children:[(0,x.jsxs)($,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(L,{children:"Restaurant Name *"}),(0,x.jsx)(U,{type:"text",placeholder:"Enter restaurant name",value:ne.name,onChange:e=>re({...ne,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===le?"#F0EFFF":"#F9FAFB",border:"create"===le?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"create"===le,onChange:()=>{de("create"),ue(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===le?"#F0EFFF":"#F9FAFB",border:"assign"===le?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"assign"===le,onChange:()=>{de("assign"),pe({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===le?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Admin Full Name *"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Kim Owner",value:ce.fullName,onChange:e=>pe({...ce,fullName:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Admin Email *"}),(0,x.jsx)(U,{type:"email",placeholder:"admin@restaurant.com",value:ce.email,onChange:e=>pe({...ce,email:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Admin Username *"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., kim_owner",value:ce.username,onChange:e=>pe({...ce,username:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Admin Password *"}),(0,x.jsx)(U,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:ce.password,onChange:e=>pe({...ce,password:e.target.value})})]}),(0,x.jsxs)($,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(L,{children:"Admin Phone"}),(0,x.jsx)(p.A,{value:ce.phone,onChange:e=>pe({...ce,phone:e}),defaultCountry:ne.country})]})]}):(0,x.jsxs)($,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(L,{children:"Search and select an existing user"}),(0,x.jsxs)(W,{children:[(0,x.jsx)(K,{type:"text",placeholder:"Type to search by name, email, or username...",value:me,onChange:e=>Ne(e.target.value),onFocus:()=>Ne(me),onBlur:()=>setTimeout(()=>be(!1),200)}),(0,x.jsx)(H,{show:je,children:0===he.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:me.length>0?"No available users found":"Type to search users..."}):he.map(e=>(0,x.jsxs)(J,{onClick:()=>(e=>{ue(e),ye(e.full_name||e.username),be(!1)})(e),children:[(0,x.jsx)(V,{children:e.full_name||e.username}),(0,x.jsxs)(G,{children:[e.email," \xb7 ",e.role]})]},e.id))})]}),xe&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:xe.full_name||xe.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[xe.email," \xb7 ",xe.role]})]}),(0,x.jsx)("button",{onClick:()=>{ue(null),ye("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Email Address *"}),(0,x.jsx)(U,{type:"email",placeholder:"restaurant@example.com",value:ne.email,onChange:e=>re({...ne,email:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Country *"}),(0,x.jsx)(M,{value:ne.country,onChange:e=>re({...ne,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:ne.phone,onChange:e=>re({...ne,phone:e}),defaultCountry:ne.country})]}),(0,x.jsxs)($,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(L,{children:"Address *"}),(0,x.jsx)(Y,{placeholder:"Enter street address",value:ne.address,onChange:e=>re({...ne,address:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"City"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ne.city,onChange:e=>re({...ne,city:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"State / Province"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ne.state,onChange:e=>re({...ne,state:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Postal Code"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., 50000",value:ne.postalCode,onChange:e=>re({...ne,postalCode:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Cuisine Type"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ne.cuisine,onChange:e=>re({...ne,cuisine:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Business Registration No."}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., 202401012345",value:ne.businessRegistration,onChange:e=>re({...ne,businessRegistration:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Tax ID / GST No."}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., MY1234567890",value:ne.taxId,onChange:e=>re({...ne,taxId:e.target.value})})]})]})}),se&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Edit Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[we&&(0,x.jsxs)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:[" ",we," "]})," ",(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{ie(!1),Ae("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),Ae(""),te)try{const e=localStorage.getItem("auth_token"),a={name:ne.name,email:ne.email,phone:ne.phone,address:ne.address,city:ne.city,state:ne.state,postal_code:ne.postalCode,country:ne.country,business_registration:ne.businessRegistration||void 0,tax_id:ne.taxId||void 0,cuisine:ne.cuisine};(await fetch(`/api/restaurants/${te.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(a)})).ok?(ie(!1),oe(null),await Ee()):Ae("Failed to update restaurant. Please try again.")}catch(a){console.error("Error updating restaurant:",a),Ae("Error updating restaurant. Please try again.")}},children:"Update Restaurant"})]}),children:(0,x.jsxs)(P,{children:[(0,x.jsxs)($,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(L,{children:"Restaurant Name *"}),(0,x.jsx)(U,{type:"text",placeholder:"Enter restaurant name",value:ne.name,onChange:e=>re({...ne,name:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Email Address *"}),(0,x.jsx)(U,{type:"email",placeholder:"restaurant@example.com",value:ne.email,onChange:e=>re({...ne,email:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Country *"}),(0,x.jsx)(M,{value:ne.country,onChange:e=>re({...ne,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:ne.phone,onChange:e=>re({...ne,phone:e}),defaultCountry:ne.country})]}),(0,x.jsxs)($,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(L,{children:"Address *"}),(0,x.jsx)(Y,{placeholder:"Enter street address",value:ne.address,onChange:e=>re({...ne,address:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"City"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ne.city,onChange:e=>re({...ne,city:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"State / Province"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:ne.state,onChange:e=>re({...ne,state:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Postal Code"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., 50000",value:ne.postalCode,onChange:e=>re({...ne,postalCode:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Cuisine Type"}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ne.cuisine,onChange:e=>re({...ne,cuisine:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Business Registration No."}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., 202401012345",value:ne.businessRegistration,onChange:e=>re({...ne,businessRegistration:e.target.value})})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(L,{children:"Tax ID / GST No."}),(0,x.jsx)(U,{type:"text",placeholder:"e.g., MY1234567890",value:ne.taxId,onChange:e=>re({...ne,taxId:e.target.value})})]})]})}),fe&&Ce&&(0,x.jsx)(d.aF,{isOpen:!0,onClose:()=>ve(!1),title:"Remove Restaurant",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>ve(!1),children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Ce)try{const e=localStorage.getItem("auth_token");await fetch(`/api/owner/restaurants/${Ce.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),o(n.filter(e=>e.id!==Ce.id)),ve(!1),Fe(null)}catch(e){console.error("Error removing restaurant:",e)}},style:{background:"#DC2626"},children:" Remove Restaurant "})]}),children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to remove this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:Ce.name})," will be unlinked from your account.",(0,x.jsx)("br",{}),"The restaurant itself will not be deleted."]})]})})]})}}}]);