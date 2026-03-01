"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8348],{2435:(e,r,a)=>{a.d(r,{FS:()=>n});const n=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,r,a)=>{a.d(r,{cc:()=>o.$n});var n=a(8819),t=a(4752),o=a(8829);t.Ay.select`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,t.Ay.input`
  padding: ${n.w.components.form.inputPadding};
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${n.w.typography.fontSize.sm};
  background: ${n.w.colors.surface};
  color: ${n.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: ${n.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${n.w.colors.borderHover};
  }
`,t.Ay.div`
  background: ${n.w.colors.surface};
  border-radius: ${n.w.borderRadius.md};
  border: 1px solid ${n.w.colors.borderLight};
  padding: ${n.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${n.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${n.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${n.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},8348:(e,r,a)=>{a.r(r),a.d(r,{default:()=>J});var n=a(8819),t=a(9950),o=a(4492),s=a(4752),i=a(3705),l=a(1367),d=a(2674),c=a(2435),p=a(8666),x=a(4414);const u=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=s.Ay.div`
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
`,g=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=s.Ay.div`
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

  ${e=>"primary"===e.variant?`\n    background: ${n.w.colors.primary};\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  `:`\n    background: white;\n    color: ${n.w.colors.text.muted};\n    border: 1px solid ${n.w.colors.border};\n\n    &:hover {\n      background: #F8FAFC;\n      color: ${n.w.colors.secondary};\n      border-color: #CBD5E1;\n    }\n  `}
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,f=s.Ay.div`
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
`,b=s.Ay.div`
  flex: 1;
`,C=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,F=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#DBEAFE";case"expired":case"inactive":return"#FEF2F2";case"suspended":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#1E40AF";case"expired":case"inactive":return"#DC2626";case"suspended":return"#D97706";default:return"#6B7280"}}};
`,E=s.Ay.span`
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
`,S=s.Ay.div`
  text-align: center;
`,R=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,$=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,z=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,B=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,I=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,N=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${n.w.colors.primary};
    color: ${n.w.colors.primary};
    background: #F4F3FF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
`,D=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,P=s.Ay.input`
  flex: 0 1 250px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,T=s.Ay.select`
  flex: 0 0 150px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,_=s.Ay.div`
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
`,O=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`,L=s.Ay.div`
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
`,Q=s.Ay.input`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
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
`,Z=s.Ay.div`
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
`,U=s.Ay.div`
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
`,M=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,H=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,W=s.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
  font-size: 14px;
`,J=()=>{var e;const{user:r}=(0,l.As)(),a=(0,o.Zp)(),[n,s]=(0,t.useState)([]),[J,Y]=(0,t.useState)(!1),[K,V]=(0,t.useState)(""),[G,q]=(0,t.useState)("all"),[X,ee]=(0,t.useState)({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),[re,ae]=(0,t.useState)(null),[ne,te]=(0,t.useState)(!1),[oe,se]=(0,t.useState)("create"),[ie,le]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[de,ce]=(0,t.useState)(null),[pe,xe]=(0,t.useState)([]),[ue,he]=(0,t.useState)(""),[ge,me]=(0,t.useState)(!1),[ye,je]=(0,t.useState)(!1),[ve,fe]=(0,t.useState)(null),[we,be]=(0,t.useState)("");(0,t.useEffect)(()=>{r&&Ce()},[r]);const Ce=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();if(e.success){const r=e.data.map(e=>{var r,a;return{id:e.id.toString(),name:e.name,location:e.address||"No address provided",address:e.address||"",phone:e.phone||"",email:e.email||"",cuisine:e.cuisine||e.cuisine_type||"Various",status:e.status||"inactive",plan:(e.plan_type||"Basic Plan").toLowerCase().replace(" plan",""),todaySales:0,todayOrders:0,staffCount:0,rating:4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastOrder:"No orders yet",monthlyFee:parseFloat(e.plan_amount)||29,nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],adminName:(null===(r=e.admin)||void 0===r?void 0:r.full_name)||e.admin_name||"",adminEmail:(null===(a=e.admin)||void 0===a?void 0:a.email)||"",payment_model:e.payment_model||"restaurant"}});s(r)}}}catch(e){console.error("Error fetching restaurants:",e)}},Ae=n.filter(e=>{const r=e.name.toLowerCase().includes(K.toLowerCase())||e.location.toLowerCase().includes(K.toLowerCase())||e.cuisine.toLowerCase().includes(K.toLowerCase()),a="all"===G||e.status===G;return r&&a}),Fe=n.length,Ee=n.filter(e=>"active"===e.status).length,ke=n.reduce((e,r)=>e+r.todaySales,0),Se=n.reduce((e,r)=>e+r.todayOrders,0),Re=n.reduce((e,r)=>e+r.staffCount,0),$e=e=>{const r=[];for(let a=1;a<=5;a++)r.push((0,x.jsx)(B,{filled:a<=e,children:"\u2605"},a));return r},ze=async e=>{he(e),me(!0);try{const r=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:r?{Authorization:`Bearer ${r}`}:{}});if(a.ok){const e=await a.json();xe(e.data||[])}}catch(r){console.error("Error searching admin candidates:",r)}};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{children:"Restaurants"}),(0,x.jsxs)(y,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalRestaurants:n.length,owner:null===r||void 0===r?void 0:r.name,restaurants:n.map(e=>({name:e.name,location:e.location,status:e.status,plan:e.plan,todaySales:e.todaySales,todayOrders:e.todayOrders,staffCount:e.staffCount,rating:e.rating,monthlyFee:e.monthlyFee}))},a=JSON.stringify(e,null,2),t=new Blob([a],{type:"application/json"}),o=URL.createObjectURL(t),s=document.createElement("a");s.href=o,s.download=`owner-restaurants-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},children:"Export Data"}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{ee({name:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:""}),se("create"),le({fullName:"",email:"",username:"",password:"",phone:""}),ce(null),xe([]),he(""),be(""),Y(!0)},children:"Add Restaurant"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{color:"#059669",children:[(0,x.jsx)(d.Os,{children:Fe}),(0,x.jsx)(d.v0,{children:"Total Restaurants"}),(0,x.jsx)(d.E_,{trend:"up",children:"Owned restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#2563EB",children:[(0,x.jsx)(d.Os,{children:Ee}),(0,x.jsx)(d.v0,{children:"Active Restaurants"}),(0,x.jsxs)(d.E_,{trend:"up",children:[Fe>0?Math.round(Ee/Fe*100):0,"% operational"]})]}),(0,x.jsxs)(d.hI,{color:"#7C3AED",children:[(0,x.jsxs)(d.Os,{children:["RM ",ke.toFixed(2)]}),(0,x.jsx)(d.v0,{children:"Today's Total Sales"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#DC2626",children:[(0,x.jsx)(d.Os,{children:Se}),(0,x.jsx)(d.v0,{children:"Today's Orders"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"Across all restaurants"})]}),(0,x.jsxs)(d.hI,{color:"#D97706",children:[(0,x.jsx)(d.Os,{children:Re}),(0,x.jsx)(d.v0,{children:"Total Staff"}),(0,x.jsx)(d.E_,{trend:"neutral",children:"All restaurants"})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(P,{placeholder:"Search restaurants...",value:K,onChange:e=>V(e.target.value)}),(0,x.jsxs)(T,{value:G,onChange:e=>q(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),0===Ae.length?(0,x.jsx)(W,{children:0===n.length?'No restaurants linked to your account yet. Click "Add Restaurant" to create a new one.':"No restaurants match the current filter."}):(0,x.jsx)(v,{children:Ae.map(e=>(0,x.jsxs)(f,{onClick:()=>{return r=e.id,n=e.name,void a(`/pos/owner/reports?tab=sales&restaurantId=${r}&restaurantName=${encodeURIComponent(n)}`);var r,n},children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(b,{children:[(0,x.jsx)(C,{children:e.name}),e.adminName&&(0,x.jsxs)(A,{style:{fontWeight:"600",color:"#635BFF"},children:["Admin: ",e.adminName]}),(0,x.jsxs)(A,{children:[e.location," ","Various"!==e.cuisine?`\xb7 ${e.cuisine}`:""]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(F,{status:e.status,children:e.status}),(0,x.jsx)(E,{plan:e.plan,children:e.plan})]})]}),(0,x.jsxs)(z,{children:[$e(e.rating),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[e.rating," \xb7 Last order: ",e.lastOrder]})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(S,{children:[(0,x.jsxs)(R,{children:["RM ",e.todaySales.toFixed(2)]}),(0,x.jsx)($,{children:"Today's Sales"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(R,{children:e.todayOrders}),(0,x.jsx)($,{children:"Orders"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(R,{children:e.staffCount}),(0,x.jsx)($,{children:"Staff"})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(N,{onClick:r=>((e,r)=>{e.stopPropagation(),be(""),ae(r),ee({name:r.name,email:r.email,phone:r.phone,address:r.address,city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:r.cuisine}),te(!0)})(r,e),children:"Edit"}),(0,x.jsx)(N,{onClick:r=>((e,r)=>{e.stopPropagation(),a(`/pos/owner/reports?tab=sales&restaurantId=${r.id}&restaurantName=${encodeURIComponent(r.name)}`)})(r,e),children:"View Reports"}),(0,x.jsx)(N,{onClick:r=>((e,r)=>{e.stopPropagation(),fe(r),je(!0)})(r,e),style:{color:"#DC2626",borderColor:"#FEE2E2"},children:"Remove"})]})]},e.id))})]})]}),J&&(0,x.jsx)(d.mH,{show:J,onClick:()=>Y(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Add New Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)(O,{children:[(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Restaurant Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:X.name,onChange:e=>ee({...X,name:e.target.value})})]}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,x.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,x.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===oe?"#F0EFFF":"#F9FAFB",border:"create"===oe?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"create"===oe,onChange:()=>{se("create"),ce(null)},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===oe?"#F0EFFF":"#F9FAFB",border:"assign"===oe?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,x.jsx)("input",{type:"radio",name:"adminActionOwner",checked:"assign"===oe,onChange:()=>{se("assign"),le({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===oe?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Full Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kim Owner",value:ie.fullName,onChange:e=>le({...ie,fullName:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Email *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"admin@restaurant.com",value:ie.email,onChange:e=>le({...ie,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Username *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., kim_owner",value:ie.username,onChange:e=>le({...ie,username:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Admin Password *"}),(0,x.jsx)(d.ZQ,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:ie.password,onChange:e=>le({...ie,password:e.target.value})})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Admin Phone"}),(0,x.jsx)(p.A,{value:ie.phone,onChange:e=>le({...ie,phone:e}),defaultCountry:X.country})]})]}):(0,x.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,x.jsx)(d.lR,{children:"Search and select an existing user"}),(0,x.jsxs)(L,{children:[(0,x.jsx)(Q,{type:"text",placeholder:"Type to search by name, email, or username...",value:ue,onChange:e=>ze(e.target.value),onFocus:()=>ze(ue),onBlur:()=>setTimeout(()=>me(!1),200)}),(0,x.jsx)(Z,{show:ge,children:0===pe.length?(0,x.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:ue.length>0?"No available users found":"Type to search users..."}):pe.map(e=>(0,x.jsxs)(U,{onClick:()=>(e=>{ce(e),he(e.full_name||e.username),me(!1)})(e),children:[(0,x.jsx)(M,{children:e.full_name||e.username}),(0,x.jsxs)(H,{children:[e.email," \xb7 ",e.role]})]},e.id))})]}),de&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:de.full_name||de.username}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[de.email," \xb7 ",de.role]})]}),(0,x.jsx)("button",{onClick:()=>{ce(null),he("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Email Address *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:X.email,onChange:e=>ee({...X,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Country *"}),(0,x.jsx)(d.FX,{value:X.country,onChange:e=>ee({...X,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:X.phone,onChange:e=>ee({...X,phone:e}),defaultCountry:X.country})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Address *"}),(0,x.jsx)(d.Lz,{placeholder:"Enter street address",value:X.address,onChange:e=>ee({...X,address:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"City"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:X.city,onChange:e=>ee({...X,city:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"State / Province"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:X.state,onChange:e=>ee({...X,state:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Postal Code"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:X.postalCode,onChange:e=>ee({...X,postalCode:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Cuisine Type"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:X.cuisine,onChange:e=>ee({...X,cuisine:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Business Registration No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 202401012345",value:X.businessRegistration,onChange:e=>ee({...X,businessRegistration:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., MY1234567890",value:X.taxId,onChange:e=>ee({...X,taxId:e.target.value})})]})]})}),(0,x.jsxs)(d.jl,{children:[we&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:we}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{Y(!1),be("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{e.preventDefault(),be("");try{if("create"===oe){if(!ie.fullName||!ie.email||!ie.username||!ie.password)return void be("Please fill in all required Restaurant Admin fields.");if(ie.password.length<8)return void be("Admin password must be at least 8 characters.");if(!/[a-z]/.test(ie.password)||!/[A-Z]/.test(ie.password)||!/[0-9]/.test(ie.password))return void be("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===oe&&!de)return void be("Please select an existing user as Restaurant Admin.");const e={name:X.name,address:X.address,city:X.city,state:X.state,postal_code:X.postalCode,country:X.country,phone:X.phone,email:X.email,cuisine:X.cuisine,business_registration:X.businessRegistration||void 0,tax_id:X.taxId||void 0,managerIds:[parseInt(((null===r||void 0===r?void 0:r.id)||"0").toString())],adminAction:oe,status:"active"};"create"===oe?(e.adminEmail=ie.email,e.adminPassword=ie.password,e.adminUsername=ie.username,e.adminFullName=ie.fullName,e.adminPhone=ie.phone||void 0):"assign"===oe&&(e.adminUserId=parseInt(de.id.toString()));const o=localStorage.getItem("auth_token"),s=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(e)});if(s.ok){var a;const e=await s.json(),r=e.id||(null===(a=e.data)||void 0===a?void 0:a.id);r&&await fetch(`/api/owner/restaurants/${r}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),Y(!1),await Ce()}else{var n;const e=await s.json().catch(()=>({error:"Unknown error"}));let r="Please try again.";if("string"===typeof e.error)r=e.error;else if(null!==(n=e.error)&&void 0!==n&&n.message){var t;r=e.error.message,null!==(t=e.error.details)&&void 0!==t&&t.length&&(r+=": "+e.error.details.map(e=>e.message).join(", "))}else e.message&&(r=e.message);be(`Failed to create restaurant: ${r}`)}}catch(o){console.error("Error creating restaurant:",o),be("Error creating restaurant. Please try again.")}},disabled:!X.name.trim(),children:"Add Restaurant"})]})]})}),ne&&(0,x.jsx)(d.mH,{show:ne,onClick:()=>te(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Edit Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>te(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)(O,{children:[(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Restaurant Name *"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:X.name,onChange:e=>ee({...X,name:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Email Address *"}),(0,x.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:X.email,onChange:e=>ee({...X,email:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Country *"}),(0,x.jsx)(d.FX,{value:X.country,onChange:e=>ee({...X,country:e.target.value}),children:c.FS.map(e=>(0,x.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:X.phone,onChange:e=>ee({...X,phone:e}),defaultCountry:X.country})]}),(0,x.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(d.lR,{children:"Address *"}),(0,x.jsx)(d.Lz,{placeholder:"Enter street address",value:X.address,onChange:e=>ee({...X,address:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"City"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:X.city,onChange:e=>ee({...X,city:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"State / Province"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Wilayah Persekutuan",value:X.state,onChange:e=>ee({...X,state:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Postal Code"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:X.postalCode,onChange:e=>ee({...X,postalCode:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Cuisine Type"}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:X.cuisine,onChange:e=>ee({...X,cuisine:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Business Registration No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 202401012345",value:X.businessRegistration,onChange:e=>ee({...X,businessRegistration:e.target.value})})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,x.jsx)(d.ZQ,{type:"text",placeholder:"e.g., MY1234567890",value:X.taxId,onChange:e=>ee({...X,taxId:e.target.value})})]})]})}),(0,x.jsxs)(d.jl,{children:[we&&(0,x.jsx)("div",{style:{width:"100%",padding:"10px 16px",marginBottom:"8px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px",lineHeight:"1.5"},children:we}),(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>{te(!1),be("")},children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async e=>{if(e.preventDefault(),be(""),re)try{const e=localStorage.getItem("auth_token"),r={name:X.name,email:X.email,phone:X.phone,address:X.address,city:X.city,state:X.state,postal_code:X.postalCode,country:X.country,business_registration:X.businessRegistration||void 0,tax_id:X.taxId||void 0,cuisine:X.cuisine};(await fetch(`/api/restaurants/${re.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(r)})).ok?(te(!1),ae(null),await Ce()):be("Failed to update restaurant. Please try again.")}catch(r){console.error("Error updating restaurant:",r),be("Error updating restaurant. Please try again.")}},disabled:!(null!==re&&void 0!==re&&null!==(e=re.name)&&void 0!==e&&e.trim()),children:"Update Restaurant"})]})]})}),ye&&ve&&(0,x.jsx)(d.mH,{show:ye,onClick:()=>je(!1),children:(0,x.jsxs)(_,{onClick:e=>e.stopPropagation(),style:{maxWidth:"450px"},children:[(0,x.jsxs)(d.rQ,{children:[(0,x.jsx)(d.wt,{children:"Remove Restaurant"}),(0,x.jsx)(d.Jn,{onClick:()=>je(!1),children:"\xd7"})]}),(0,x.jsx)(d.cw,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("div",{style:{width:"64px",height:"64px",borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:(0,x.jsx)("span",{style:{fontSize:"32px",color:"#DC2626"},children:"!"})}),(0,x.jsx)("h3",{style:{margin:"0 0 12px",fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Are you sure you want to remove this restaurant?"}),(0,x.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{style:{color:"#DC2626"},children:ve.name})," will be unlinked from your account.",(0,x.jsx)("br",{}),"The restaurant itself will not be deleted."]})]})}),(0,x.jsxs)(d.jl,{children:[(0,x.jsx)(i.cc,{variant:"cancel",onClick:()=>je(!1),children:"Cancel"}),(0,x.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(ve)try{const e=localStorage.getItem("auth_token");await fetch(`/api/owner/restaurants/${ve.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),s(n.filter(e=>e.id!==ve.id)),je(!1),fe(null)}catch(e){console.error("Error removing restaurant:",e)}},style:{background:"#DC2626"},children:"Remove Restaurant"})]})]})})]})}}}]);