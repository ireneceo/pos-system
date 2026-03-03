"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>re});var t=a(9950),r=a(4492),s=a(4752),o=a(3705),i=a(8409),l=a(9610),d=a(7617),c=a(9018),p=a(6038),u=a(2924),x=a(8666),h=a(2435),g=a(4414);const m=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,y=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,j=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,b=s.Ay.div`
  flex: 1;
`,f=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,C=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"cancelled":default:return"#F3F4F6";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"cancelled":default:return"#6B7280";case"trial":return"#D97706";case"expired":case"suspended":return"#DC2626"}}};
`,F=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,w=s.Ay.div`
  text-align: center;
`,A=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,S=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,B=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,k=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,E=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  overflow-y: auto;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
`,_=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  flex-shrink: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { 
      transform: translateY(-50px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
`,z=s.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,T=s.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,I=s.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,R=s.Ay.div`
  padding: 24px;
`,P=s.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,N=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,D=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,M=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,$=s.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`,L=s.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,O=s.Ay.textarea`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`,U=s.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,W=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  z-index: 100;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,Y=s.Ay.input`
  flex: 0 1 220px;
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
  flex: 0 0 140px;
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
`,V=s.Ay.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,q=s.Ay.div`
  position: relative;
  flex: 0 0 180px;
  min-width: 0;
  z-index: 50;

  &:focus-within {
    z-index: 60;
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,J=s.Ay.input`
  padding: 12px 16px;
  padding-right: 32px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`,H=s.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 250px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: ${e=>e.show?"block":"none"};
`,G=s.Ay.div`
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
`,X=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,ee=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,ne=s.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    color: #DC2626;
  }
`,ae=s.Ay.button`
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
`,te=s.Ay.button`
  padding: 6px 12px;
  background: #635BFF;
  border: 1px solid #635BFF;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    background: #5A51E6;
    border-color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`,re=(s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,s.Ay.div`
  width: 60px;
  height: 60px;
  background: #10B981;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`,s.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,s.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,()=>{const{operationSettings:e}=(0,c.Pj)(),[n]=(0,r.ok)(),a=(0,r.Zp)(),[s,re]=(0,t.useState)([]),[se,oe]=(0,t.useState)(""),[ie,le]=(0,t.useState)("all"),[de,ce]=(0,t.useState)("all"),[pe,ue]=(0,t.useState)(!1),[xe,he]=(0,t.useState)(!1),[ge,me]=(0,t.useState)(!1),[ye,je]=(0,t.useState)(""),[be,fe]=(0,t.useState)(""),[ve,Ce]=(0,t.useState)(""),[Fe,we]=(0,t.useState)(null),[Ae,Se]=(0,t.useState)(null),[Be,ke]=(0,t.useState)(!1),[Ee,_e]=(0,t.useState)(""),[ze,Te]=(0,t.useState)(!1),[Ie,Re]=(0,t.useState)([]),[Pe,Ne]=(0,t.useState)([]),[De,Me]=(0,t.useState)(""),[$e,Le]=(0,t.useState)(!1),[Oe,Ue]=(0,t.useState)([]),[We,Ye]=(0,t.useState)([]),[Ke,Ve]=(0,t.useState)(!1),[qe,Je]=(0,t.useState)(null),[He,Ge]=(0,t.useState)(""),[Ze,Qe]=(0,t.useState)(!1),[Xe,en]=(0,t.useState)([]),[nn,an]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[tn,rn]=(0,t.useState)([]),[sn,on]=(0,t.useState)([]),[ln,dn]=(0,t.useState)([]),[cn,pn]=(0,t.useState)("create"),[un,xn]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[hn,gn]=(0,t.useState)(null),[mn,yn]=(0,t.useState)([]),[jn,bn]=(0,t.useState)(""),[fn,vn]=(0,t.useState)(!1),[Cn,Fn]=(0,t.useState)("keep"),[wn,An]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[Sn,Bn]=(0,t.useState)(null),[kn,En]=(0,t.useState)(""),[_n,zn]=(0,t.useState)(!1),[Tn,In]=(0,t.useState)("all"),[Rn,Pn]=(0,t.useState)(""),[Nn,Dn]=(0,t.useState)(!1),[Mn,$n]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udfaf RestaurantsPage useEffect triggered"),console.log("\ud83c\udfaf searchParams:",n.toString()),Un(),On(),Ln();const e=n.get("managerId"),a=n.get("managerName");e&&a&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:a}),ce(e),Ge(decodeURIComponent(a)));const t=n.get("brandId"),r=n.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),In(t),Pn(decodeURIComponent(r)))},[]);const Ln=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();dn(e)}}catch(e){console.error("Error fetching brands:",e)}},On=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(on(n),n.length>0){const e=n[0];an(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},Un=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API (using same method as StaffManagementPage)...");const e=localStorage.getItem("auth_token"),n=e?{Authorization:`Bearer ${e}`}:{},a=await fetch("/api/restaurants",{headers:n});if(console.log("\ud83d\udce1 Restaurants API response status:",a.status),a.ok){const e=await a.json();console.log("\u2705 Restaurants API response:",e);const t=await fetch("/api/users?role=Manager",{headers:n});console.log("\ud83d\udce1 Managers API response status:",t.status);const r=t.ok?await t.json():[];console.log("\u2705 Managers API response:",r);const s=e.data||e,o=r.data||r,i=Array.isArray(s)?s:[],l=Array.isArray(o)?o:[];console.log("\u2705 Setting available managers:",l),rn(l);const d=i.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||"monthly",autoRenew:void 0===e.autoRenew||e.autoRenew,discount_type:e.discount_type||"none",discount_value:e.discount_value||0,discount_reason:e.discount_reason||""}});console.log("\u2705 Formatted restaurants:",d),console.log("\u2705 Setting restaurants state with",d.length,"restaurants"),re(d)}else console.error("\u274c Failed to fetch restaurants data"),re([]),rn([])}catch(e){console.error("\u274c Error fetching restaurants:",e),re([]),rn([])}},Wn=async e=>{bn(e),vn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();yn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Yn=async e=>{En(e),zn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();yn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Kn=s.filter(e=>{const n=e.name.toLowerCase().includes(se.toLowerCase())||e.managerName.toLowerCase().includes(se.toLowerCase())||e.cuisine.toLowerCase().includes(se.toLowerCase()),a="all"===ie||e.status===ie,t=e.managerId===de,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===de),s="all"===de||t||r,o="all"===Tn||e.brand_id&&e.brand_id.toString()===Tn;return"all"!==de&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:de,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:s.length,filteredRestaurants:Kn.length,searchTerm:se,filterStatus:ie,filterManager:de,restaurants:s.slice(0,2)});const Vn=s.length,qn=s.filter(e=>"active"===e.status).length,Jn=s.reduce((e,n)=>e+n.todaySales,0),Hn=s.reduce((e,n)=>e+n.todayOrders,0),Gn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,g.jsx)(k,{filled:a<=e,children:"\u2605"},a));return n},Zn=Array.from(new Set(s.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:s.length,filteredCount:Kn.length,managersCount:tn.length,uniqueManagersCount:Zn.length,firstRestaurant:s[0],firstFiltered:Kn[0]}),(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(i.mc,{children:[(0,g.jsxs)(i.Y9,{children:[(0,g.jsx)(i.hE,{children:"Restaurants"}),(0,g.jsxs)(i.ex,{children:[(0,g.jsx)(o.cc,{variant:"outline",onClick:()=>{const n=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Kn.map(n=>({"Restaurant Name":n.name,Manager:n.managerName,Location:n.location,Cuisine:n.cuisine,Status:n.status,Rating:n.rating,"Today Sales":(0,p.vv)(n.todaySales,e.currency),"Today Orders":n.todayOrders,"Staff Count":n.staffCount,Phone:n.phone,Email:n.email,Address:n.address,"Created At":n.createdAt}))),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:"Export"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=sn.length>0?sn[0]:null;an({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?n.base_price_monthly:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),_e(""),Re([]),Te(!1),Ne([]),pn("create"),xn({fullName:"",email:"",username:"",password:"",phone:""}),gn(null),yn([]),bn(""),vn(!1),ue(!0)},children:"Add Restaurant"})]})]}),(0,g.jsxs)(i.UC,{children:[(0,g.jsxs)(i.MD,{children:[(0,g.jsxs)(i.hI,{color:"#059669",children:[(0,g.jsx)(i.Os,{children:Vn}),(0,g.jsx)(i.v0,{children:"Total Restaurants"}),(0,g.jsx)(i.d1,{children:"Across all managers"})]}),(0,g.jsxs)(i.hI,{color:"#2563EB",children:[(0,g.jsx)(i.Os,{children:qn}),(0,g.jsx)(i.v0,{children:"Active Restaurants"}),(0,g.jsxs)(i.d1,{children:[Vn>0?Math.round(qn/Vn*100):0,"% operational"]})]}),(0,g.jsxs)(i.hI,{color:"#7C3AED",children:[(0,g.jsx)(i.Os,{children:(0,p.vv)(Jn,e.currency)}),(0,g.jsx)(i.v0,{children:"Today's Total Sales"}),(0,g.jsx)(i.d1,{children:"Combined revenue"})]}),(0,g.jsxs)(i.hI,{color:"#D97706",children:[(0,g.jsx)(i.Os,{children:Hn}),(0,g.jsx)(i.v0,{children:"Today's Orders"}),(0,g.jsx)(i.d1,{children:"All restaurants"})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(Y,{placeholder:"Search restaurants...",value:se,onChange:e=>oe(e.target.value)}),(0,g.jsxs)(q,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Search managers...",value:He,onChange:e=>(e=>{if(Ge(e),Qe(!0),e.length<1)return void en(tn.slice(0,10));const n=tn.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);en(n)})(e.target.value),onFocus:()=>{Qe(!0),0===He.length&&en(tn.slice(0,10))},onBlur:()=>setTimeout(()=>Qe(!1),200)}),"all"!==de&&He&&(0,g.jsx)(ae,{onClick:()=>{ce("all"),Ge(""),Qe(!1)},children:"\xd7"}),(0,g.jsxs)(H,{show:Ze,children:[(0,g.jsxs)(G,{onClick:()=>{ce("all"),Ge(""),Qe(!1)},children:[(0,g.jsx)(Z,{children:"All Managers"}),(0,g.jsx)(Q,{children:"Show all restaurants"})]}),Xe.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{ce(e.id.toString()),Ge(e.full_name||e.username),Qe(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Search brands...",value:Rn,onChange:e=>(e=>{if(Pn(e),Dn(!0),e.length<1)return void $n(ln.slice(0,10));const n=ln.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);$n(n)})(e.target.value),onFocus:()=>{Dn(!0),0===Rn.length&&$n(ln.slice(0,10))},onBlur:()=>setTimeout(()=>Dn(!1),200)}),"all"!==Tn&&Rn&&(0,g.jsx)(ae,{onClick:()=>{In("all"),Pn(""),Dn(!1),a("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,g.jsxs)(H,{show:Nn,children:[(0,g.jsxs)(G,{onClick:()=>{In("all"),Pn(""),Dn(!1),a("/pos/admin/restaurants",{replace:!0})},children:[(0,g.jsx)(Z,{children:"All Brands"}),(0,g.jsx)(Q,{children:"Show all restaurants"})]}),Mn.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{In(e.id.toString()),Pn(e.name),Dn(!1)})(e),children:[(0,g.jsx)(Z,{children:e.name}),(0,g.jsxs)(Q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,g.jsxs)(K,{value:ie,onChange:e=>le(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"}),(0,g.jsx)("option",{value:"trial",children:"Trial"}),(0,g.jsx)("option",{value:"expired",children:"Expired"}),(0,g.jsx)("option",{value:"suspended",children:"Suspended"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,g.jsx)(m,{children:0===Kn.length?(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===s.length?"\ud83d\udd04 Loading restaurants...":"\ud83d\udced No restaurants found matching your criteria.",(0,g.jsx)("br",{}),(0,g.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",s.length," | Filtered: ",Kn.length]})]}):Kn.map(n=>(0,g.jsxs)(y,{children:[(0,g.jsxs)(j,{children:[(0,g.jsxs)(b,{children:[(0,g.jsxs)(f,{children:[n.name," ",n.currency&&(0,g.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.currency})]}),(0,g.jsxs)(v,{children:["Admin: ",n.admin?`${n.admin.name} (${n.admin.email})`:"No Admin Assigned"]}),n.managers&&n.managers.length>0&&(0,g.jsxs)(v,{children:["Managers: ",n.managers.map(e=>e.name).join(", ")]}),(0,g.jsxs)(v,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,g.jsx)(C,{status:n.status,children:n.status})]}),(0,g.jsxs)(B,{children:[Gn(n.rating),(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Created: ",new Date(n.createdAt).toLocaleDateString()]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(w,{children:[(0,g.jsx)(A,{children:(0,p.vv)(n.todaySales,e.currency)}),(0,g.jsx)(S,{children:"Today's Sales"})]}),(0,g.jsxs)(w,{children:[(0,g.jsx)(A,{children:n.todayOrders}),(0,g.jsx)(S,{children:"Orders"})]}),(0,g.jsxs)(w,{children:[(0,g.jsx)(A,{children:n.staffCount}),(0,g.jsx)(S,{children:"Staff"})]})]}),(0,g.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,g.jsx)(te,{onClick:()=>(e=>{Se(e),ke(!0)})(n),children:"View"}),(0,g.jsx)(U,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),a(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(n),children:"Report"}),(0,g.jsx)(U,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",tn);const n=sn.length>0?sn[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=e.planAmount||(n?n.base_price_monthly:"29.00"),r={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(we(r),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=tn.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Ye(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=tn.find(n=>n.id.toString()===e.managerId.toString());Ye(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Ye([]);Me(""),Ue([]),Le(!1),Fn("keep"),An({fullName:"",email:"",username:"",password:"",phone:""}),Bn(null),En(""),zn(!1),he(!0)})(n),children:"Edit"}),(0,g.jsx)(U,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)re(s.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(n),style:{background:"active"===n.status?"#FEE2E2":"#ECFDF5",color:"active"===n.status?"#DC2626":"#059669",border:"1px solid "+("active"===n.status?"#FCA5A5":"#A7F3D0")},children:"active"===n.status?"Deactivate":"Activate"})]})]},n.id))}),pe&&(0,g.jsx)(E,{show:pe,onClick:()=>ue(!1),children:(0,g.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(z,{children:[(0,g.jsx)(T,{children:"Add Restaurant"}),(0,g.jsx)(I,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,g.jsxs)(R,{children:[(0,g.jsxs)(N,{children:[(0,g.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(M,{children:"Restaurant Name *"}),(0,g.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:nn.name,onChange:e=>an({...nn,name:e.target.value})})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===cn?"#F0EFFF":"#F9FAFB",border:"create"===cn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===cn,onChange:()=>{pn("create"),gn(null)},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===cn?"#F0EFFF":"#F9FAFB",border:"assign"===cn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===cn,onChange:()=>{pn("assign"),xn({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===cn?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Admin Full Name *"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Kim Owner",value:un.fullName,onChange:e=>xn({...un,fullName:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Admin Email *"}),(0,g.jsx)($,{type:"email",placeholder:"admin@restaurant.com",value:un.email,onChange:e=>xn({...un,email:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Admin Username *"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., kim_owner",value:un.username,onChange:e=>xn({...un,username:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Admin Password *"}),(0,g.jsx)($,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:un.password,onChange:e=>xn({...un,password:e.target.value})})]}),(0,g.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(M,{children:"Admin Phone"}),(0,g.jsx)(x.A,{value:un.phone,onChange:e=>xn({...un,phone:e}),defaultCountry:nn.country})]})]}):(0,g.jsxs)(D,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,g.jsx)(M,{children:"Search and select an existing user"}),(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Type to search by name, email, or username...",value:jn,onChange:e=>Wn(e.target.value),onFocus:()=>Wn(jn),onBlur:()=>setTimeout(()=>vn(!1),200)}),(0,g.jsx)(H,{show:fn,children:0===mn.length?(0,g.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:jn.length>0?"No available users found":"Type to search users..."}):mn.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{gn(e),bn(e.full_name||e.username),vn(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),hn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:hn.full_name||hn.username}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[hn.email," \u2022 ",hn.role]})]}),(0,g.jsx)("button",{onClick:()=>{gn(null),bn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,g.jsxs)(D,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Search and select oversight managers...",value:Ee,onChange:e=>(e=>{if(_e(e),Te(!0),e.length<1)return void Re(tn.slice(0,10));const n=tn.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));Re(n.slice(0,10))})(e.target.value),onFocus:()=>{Te(!0),Re(tn.slice(0,10))},onBlur:()=>setTimeout(()=>Te(!1),200)}),(0,g.jsx)(H,{show:ze,children:Ie.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{Pe.find(n=>n.id===e.id)||Ne([...Pe,e]),_e(""),Te(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Pe.length>0&&(0,g.jsx)(X,{children:Pe.map(e=>(0,g.jsxs)(ee,{children:[e.full_name||e.username,(0,g.jsx)(ne,{onClick:()=>{return n=e.id.toString(),void Ne(Pe.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Email Address *"}),(0,g.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:nn.email,onChange:e=>an({...nn,email:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Phone Number *"}),(0,g.jsx)(x.A,{value:nn.phone,onChange:e=>an({...nn,phone:e}),defaultCountry:nn.country})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Address *"}),(0,g.jsx)(O,{placeholder:"Enter restaurant address",value:nn.address,onChange:e=>an({...nn,address:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"City"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Kuala Lumpur",value:nn.city,onChange:e=>an({...nn,city:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"State / Province"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Selangor",value:nn.state,onChange:e=>an({...nn,state:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Postal Code"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 50000",value:nn.postalCode,onChange:e=>an({...nn,postalCode:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Country"}),(0,g.jsx)(L,{value:nn.country,onChange:e=>an({...nn,country:e.target.value}),children:h.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Business Registration No."}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 123456-A",value:nn.businessRegistration,onChange:e=>an({...nn,businessRegistration:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Tax ID / GST No."}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 000123456789",value:nn.taxId,onChange:e=>an({...nn,taxId:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Cuisine Type"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:nn.cuisine,onChange:e=>an({...nn,cuisine:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Plan Type *"}),(0,g.jsx)(L,{value:nn.planType,onChange:e=>{var n;const a=sn.find(n=>n.display_name===e.target.value);an({...nn,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:sn.map(n=>(0,g.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,p.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,g.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===nn.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===nn.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"checkbox",checked:"trial"===nn.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),an({...nn,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else{var n,a;an({...nn,status:"active",planAmount:(null===(n=sn.find(e=>e.display_name===nn.planType))||void 0===n||null===(a=n.base_price_monthly)||void 0===a?void 0:a.toString())||"29.00"})}},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Billing Cycle *"}),(0,g.jsxs)(L,{value:nn.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[nn.planType]||a["Basic Plan"];an({...nn,billingCycle:n,planAmount:t[n]})},children:[(0,g.jsx)("option",{value:"monthly",children:"Monthly"}),(0,g.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Payment Model *"}),(0,g.jsxs)(L,{value:nn.paymentModel,onChange:e=>an({...nn,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,g.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,g.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Subscription Start Date *"}),(0,g.jsx)($,{type:"date",value:nn.subscriptionStart,onChange:e=>an({...nn,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Subscription End Date *"}),(0,g.jsx)($,{type:"date",value:nn.subscriptionEnd,onChange:e=>an({...nn,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:nn.autoRenew,onChange:e=>an({...nn,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[nn.planType," - $",nn.planAmount," (",nn.billingCycle,")"]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===nn.paymentModel?"Brand Manager":"foodcourt_manager"===nn.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),be&&(0,g.jsx)(l.IM,{children:be})]}),(0,g.jsxs)(P,{children:[(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{fe(""),ue(!1)},children:"Cancel"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",nn),console.log("Selected managers:",Pe),fe(""),!nn.name||!nn.email||!nn.phone||!nn.address)return void fe("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===cn){if(!un.fullName||!un.email||!un.username||!un.password)return void fe("Please fill in all required Restaurant Admin fields (Full Name, Email, Username, Password).");if(un.password.length<8)return void fe("Admin password must be at least 8 characters.");if(!/[a-z]/.test(un.password)||!/[A-Z]/.test(un.password)||!/[0-9]/.test(un.password))return void fe("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===cn&&!hn)return void fe("Please select an existing user as Restaurant Admin.");const a={name:nn.name,adminAction:cn,managerIds:Pe.map(e=>parseInt(e.id.toString())),email:nn.email,phone:nn.phone,address:nn.address,city:nn.city,state:nn.state,postal_code:nn.postalCode,country:nn.country,business_registration:nn.businessRegistration,tax_id:nn.taxId,location:nn.address,cuisine:nn.cuisine||"Various",status:nn.status,planType:nn.planType,planAmount:parseFloat(nn.planAmount),billingCycle:nn.billingCycle,payment_model:nn.paymentModel,autoRenew:nn.autoRenew,subscriptionStart:nn.subscriptionStart,subscriptionEnd:nn.subscriptionEnd};"create"===cn?(a.adminEmail=un.email,a.adminPassword=un.password,a.adminUsername=un.username,a.adminFullName=un.fullName,a.adminPhone=un.phone||void 0):"assign"===cn&&(a.adminUserId=parseInt(hn.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const t=localStorage.getItem("auth_token"),r=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant created successfully:",e),fe(""),ue(!1),await Un()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);fe(t)}}catch(a){console.error("\u274c Error adding restaurant:",a),fe("Error adding restaurant. Please check your connection and try again.")}},children:"Add Restaurant"})]})]})}),xe&&Fe&&(0,g.jsx)(E,{show:xe,onClick:()=>he(!1),children:(0,g.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(z,{children:[(0,g.jsx)(T,{children:"Edit Restaurant"}),(0,g.jsx)(I,{onClick:()=>he(!1),children:"\xd7"})]}),(0,g.jsxs)(R,{children:[(0,g.jsxs)(N,{children:[(0,g.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(M,{children:"Restaurant Name *"}),(0,g.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:Fe.name,onChange:e=>we({...Fe,name:e.target.value})})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),Fe.admin?(0,g.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Fe.admin.name}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Fe.admin.email," ",Fe.admin.phone?`\u2022 ${Fe.admin.phone}`:""]})]}),"keep"===Cn&&(0,g.jsx)("button",{onClick:()=>Fn("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:"Change Admin"})]})}):(0,g.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:"No Restaurant Admin assigned"}),"keep"===Cn&&(0,g.jsx)("button",{onClick:()=>Fn("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:"Assign Admin"})]})}),"keep"!==Cn&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Cn?"#F0EFFF":"#F9FAFB",border:"create"===Cn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===Cn,onChange:()=>{Fn("create"),Bn(null)},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===Cn?"#F0EFFF":"#F9FAFB",border:"change"===Cn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===Cn,onChange:()=>{Fn("change"),An({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]}),(0,g.jsx)("button",{onClick:()=>Fn("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:"Cancel"})]}),"create"===Cn?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"New Admin Full Name *"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Kim Owner",value:wn.fullName,onChange:e=>An({...wn,fullName:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"New Admin Email *"}),(0,g.jsx)($,{type:"email",placeholder:"admin@restaurant.com",value:wn.email,onChange:e=>An({...wn,email:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"New Admin Username *"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., kim_owner",value:wn.username,onChange:e=>An({...wn,username:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"New Admin Password *"}),(0,g.jsx)($,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:wn.password,onChange:e=>An({...wn,password:e.target.value})})]})]}):(0,g.jsxs)(D,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,g.jsx)(M,{children:"Search and select an existing user"}),(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Type to search by name, email, or username...",value:kn,onChange:e=>Yn(e.target.value),onFocus:()=>Yn(kn),onBlur:()=>setTimeout(()=>zn(!1),200)}),(0,g.jsx)(H,{show:_n,children:0===mn.length?(0,g.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:kn.length>0?"No available users found":"Type to search users..."}):mn.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{Bn(e),En(e.full_name||e.username),zn(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Sn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Sn.full_name||Sn.username}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Sn.email," \u2022 ",Sn.role]})]}),(0,g.jsx)("button",{onClick:()=>{Bn(null),En("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,g.jsxs)(D,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{type:"text",placeholder:"Search and select oversight managers...",value:De,onChange:e=>(e=>{if(Me(e),Le(!0),e.length<1)return void Ue(tn.slice(0,10));const n=tn.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));Ue(n.slice(0,10))})(e.target.value),onFocus:()=>{Le(!0),0===De.length&&Ue(tn.slice(0,10))},onBlur:()=>setTimeout(()=>Le(!1),200)}),(0,g.jsx)(H,{show:$e,children:Oe.map(e=>(0,g.jsxs)(G,{onClick:()=>(e=>{We.find(n=>n.id===e.id)||Ye([...We,e]),Me(""),Le(!1)})(e),children:[(0,g.jsx)(Z,{children:e.full_name||e.username}),(0,g.jsxs)(Q,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),We.length>0&&(0,g.jsx)(X,{children:We.map(e=>(0,g.jsxs)(ee,{children:[e.full_name||e.username,(0,g.jsx)(ne,{onClick:()=>{return n=e.id.toString(),void Ye(We.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Email Address *"}),(0,g.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:Fe.email||"",onChange:e=>we({...Fe,email:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Phone Number *"}),(0,g.jsx)(x.A,{value:Fe.phone||"",onChange:e=>we({...Fe,phone:e}),defaultCountry:Fe.country})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Address *"}),(0,g.jsx)(O,{placeholder:"Enter restaurant address",value:Fe.address||Fe.location,onChange:e=>we({...Fe,address:e.target.value,location:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"City"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Fe.city||"",onChange:e=>we({...Fe,city:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"State / Province"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Selangor",value:Fe.state||"",onChange:e=>we({...Fe,state:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Postal Code"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 50000",value:Fe.postalCode||"",onChange:e=>we({...Fe,postalCode:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Country"}),(0,g.jsx)(L,{value:Fe.country||"MY",onChange:e=>we({...Fe,country:e.target.value}),children:h.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Business Registration No."}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 123456-A",value:Fe.businessRegistration||"",onChange:e=>we({...Fe,businessRegistration:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Tax ID / GST No."}),(0,g.jsx)($,{type:"text",placeholder:"e.g., 000123456789",value:Fe.taxId||"",onChange:e=>we({...Fe,taxId:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Cuisine Type"}),(0,g.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Fe.cuisine,onChange:e=>we({...Fe,cuisine:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Plan Type *"}),(0,g.jsx)(L,{value:Fe.planType||"Basic Plan",onChange:e=>{var n;const a=sn.find(n=>n.display_name===e.target.value);we({...Fe,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:sn.map(n=>(0,g.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,p.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Billing Cycle *"}),(0,g.jsxs)(L,{value:Fe.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Fe.planType||"Basic Plan"]||a["Basic Plan"];we({...Fe,billingCycle:n,planAmount:t[n]})},children:[(0,g.jsx)("option",{value:"monthly",children:"Monthly"}),(0,g.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Payment Model *"}),(0,g.jsxs)(L,{value:Fe.paymentModel||"restaurant",onChange:e=>we({...Fe,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,g.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,g.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Subscription Start Date *"}),(0,g.jsx)($,{type:"date",value:Fe.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>we({...Fe,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Subscription End Date *"}),(0,g.jsx)($,{type:"date",value:Fe.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>we({...Fe,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:Fe.autoRenew||!0,onChange:e=>we({...Fe,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"6px"},children:[(0,g.jsx)("h4",{style:{margin:0,fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:"Subscription Discount"}),(0,g.jsx)("p",{style:{margin:"4px 0 0",fontSize:"12px",color:"#6B7280"},children:"Applied automatically to System Admin subscription invoices"})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Discount Type"}),(0,g.jsxs)(L,{value:Fe.discount_type||"none",onChange:e=>we({...Fe,discount_type:e.target.value,discount_value:"none"===e.target.value?0:Fe.discount_value}),children:[(0,g.jsx)("option",{value:"none",children:"None"}),(0,g.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,g.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),Fe.discount_type&&"none"!==Fe.discount_type&&(0,g.jsxs)(D,{children:[(0,g.jsxs)(M,{children:["Discount Value ","percentage"===Fe.discount_type?"(%)":"(Amount)"]}),(0,g.jsx)($,{type:"number",min:"0",max:"percentage"===Fe.discount_type?"100":void 0,step:"0.01",value:Fe.discount_value||"",onChange:e=>we({...Fe,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===Fe.discount_type?"e.g. 10":"e.g. 5.00"})]}),Fe.discount_type&&"none"!==Fe.discount_type&&(0,g.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(M,{children:"Discount Reason"}),(0,g.jsx)($,{type:"text",value:Fe.discount_reason||"",onChange:e=>we({...Fe,discount_reason:e.target.value}),placeholder:"e.g. Early bird discount, Loyalty discount"})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Fe.planType||"Basic Plan"," - $",Fe.planAmount||"29.00"," (",Fe.billingCycle||"monthly",")",Fe.discount_type&&"none"!==Fe.discount_type&&(Fe.discount_value||0)>0&&(0,g.jsxs)("span",{style:{color:"#15803D",fontSize:"14px",marginLeft:"8px"},children:["(-","percentage"===Fe.discount_type?`${Fe.discount_value}%`:`$${(Fe.discount_value||0).toFixed(2)}`,")"]})]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Fe.paymentModel?"Brand Manager":"foodcourt_manager"===Fe.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),ve&&(0,g.jsx)(l.IM,{children:ve})]}),(0,g.jsxs)(P,{children:[(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{Ce(""),he(!1)},children:"Cancel"}),(0,g.jsx)(o.cc,{variant:"danger-outline",onClick:()=>(Je(Fe),void Ve(!0)),children:"Delete"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async()=>{if(Fe)try{if(console.log("\ud83d\udd04 Updating restaurant:",Fe),console.log("\ud83d\udd0d Selected edit managers:",We),Ce(""),!Fe.name)return void Ce("Please fill in all required fields.");if("create"===Cn){if(!wn.fullName||!wn.email||!wn.username||!wn.password)return void Ce("Please fill in all required new Admin fields.")}else if("change"===Cn&&!Sn)return void Ce("Please select an existing user as new Admin.");const a={name:Fe.name,managerIds:We.map(e=>parseInt(e.id.toString())),email:Fe.email||"",phone:Fe.phone||"",address:Fe.address||Fe.location||"",location:Fe.address||Fe.location||"",city:Fe.city||"",state:Fe.state||"",postal_code:Fe.postalCode||"",country:Fe.country||"MY",business_registration:Fe.businessRegistration||"",tax_id:Fe.taxId||"",cuisine:Fe.cuisine||"Various",status:Fe.status,planType:Fe.planType||"Basic Plan",planAmount:parseFloat(Fe.planAmount||"29.00"),billingCycle:Fe.billingCycle||"monthly",payment_model:Fe.paymentModel||"restaurant",autoRenew:Fe.autoRenew||!0,subscriptionStart:Fe.subscriptionStart,subscriptionEnd:Fe.subscriptionEnd,discount_type:Fe.discount_type||"none",discount_value:Fe.discount_type&&"none"!==Fe.discount_type&&Fe.discount_value||0,discount_reason:Fe.discount_reason||""};"create"===Cn?(a.adminAction="create",a.adminEmail=wn.email,a.adminPassword=wn.password,a.adminUsername=wn.username,a.adminFullName=wn.fullName,a.adminPhone=wn.phone||void 0):"change"===Cn&&(a.adminAction="change",a.adminUserId=parseInt(Sn.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${Fe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant updated successfully:",e),Ce(""),he(!1),we(null),await Un()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);Ce(t)}}catch(a){console.error("\u274c Error updating restaurant:",a),Ce("Error updating restaurant. Please check your connection and try again.")}},children:"Update Restaurant"})]})]})}),Be&&Ae&&(0,g.jsx)(E,{show:Be,onClick:()=>ke(!1),children:(0,g.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(z,{children:[(0,g.jsx)(T,{children:"Restaurant Details"}),(0,g.jsx)(I,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,g.jsx)(R,{children:(0,g.jsxs)(N,{children:[(0,g.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(M,{children:"Restaurant Name"}),(0,g.jsx)($,{type:"text",value:Ae.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Restaurant Admin"}),Ae.admin?(0,g.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Ae.admin.name}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[Ae.admin.email," ",Ae.admin.phone?`\u2022 ${Ae.admin.phone}`:""]})]}):(0,g.jsx)($,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Oversight Managers"}),(0,g.jsx)(O,{value:Ae.managers&&Ae.managers.length>0?Ae.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Email Address"}),(0,g.jsx)($,{type:"email",value:Ae.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Phone Number"}),(0,g.jsx)($,{type:"tel",value:(0,u.FI)(Ae.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Address"}),(0,g.jsx)(O,{value:Ae.address||Ae.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Cuisine Type"}),(0,g.jsx)($,{type:"text",value:Ae.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Status"}),(0,g.jsx)($,{type:"text",value:Ae.status?Ae.status.charAt(0).toUpperCase()+Ae.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Plan Type"}),(0,g.jsx)($,{type:"text",value:Ae.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(M,{children:"Created Date"}),(0,g.jsx)($,{type:"text",value:Ae.createdAt?new Date(Ae.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})})]})}),(0,g.jsx)(d.A,{isOpen:Ke,title:"Delete Restaurant",message:`Are you sure you want to delete "${null===qe||void 0===qe?void 0:qe.name}"? This action cannot be undone. All related data (orders, invoices, menu items, etc.) will be permanently removed.`,onConfirm:async()=>{if(qe)try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${qe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(a.ok)Ve(!1),Je(null),Ce(""),he(!1),we(null),await Un();else{var e;const n=await a.json().catch(()=>({error:"Unknown error"}));let t="Please try again.";"string"===typeof n.error?t=n.error:null!==(e=n.error)&&void 0!==e&&e.message?t=n.error.message:n.message&&(t=n.message),Ve(!1),Je(null),Ce(`Error deleting restaurant: ${t}`)}}catch(n){Ve(!1),Je(null),Ce("Error deleting restaurant. Please check your connection and try again.")}},onCancel:()=>{Ve(!1),Je(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})})},2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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
`},7617:(e,n,a)=>{a.d(n,{A:()=>u});a(9950);var t=a(4752),r=a(9610),s=a(4414);const o=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,i=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,u=e=>{let{isOpen:n,title:a,message:t,onConfirm:u,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,s.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(i,{children:[(0,s.jsx)(l,{children:a}),(0,s.jsx)(d,{children:t})]}),(0,s.jsxs)(c,{children:[(0,s.jsx)(p,{variant:"secondary",onClick:x,children:g}),(0,s.jsx)(p,{variant:"primary",type:m,onClick:u,children:h})]})]})}):null}}}]);