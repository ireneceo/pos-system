"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>V});var t=a(8819),r=a(9950),s=a(4492),o=a(4752),i=a(3705),l=a(2674),d=a(9610),c=a(9018),p=a(6038),u=a(2924),g=a(8666),x=a(2435),h=a(4414);const m=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,y=o.Ay.div`
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
`,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,v=o.Ay.div`
  flex: 1;
`,f=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,C=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"cancelled":default:return"#F3F4F6";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"cancelled":default:return"#6B7280";case"trial":return"#D97706";case"expired":case"suspended":return"#DC2626"}}};
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,F=o.Ay.div`
  text-align: center;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,A=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,E=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,k=o.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,R=o.Ay.div`
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
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,_=o.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${t.w.colors.border};
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: ${t.w.colors.primary};
    color: ${t.w.colors.primary};
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,T=o.Ay.div`
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
`,z=o.Ay.input`
  flex: 0 1 220px;
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
`,I=o.Ay.select`
  flex: 0 0 140px;
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
`,$=o.Ay.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,P=o.Ay.div`
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
`,N=o.Ay.input`
  padding: 12px 16px;
  padding-right: 32px;
  border: 1px solid ${t.w.colors.border};
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
`,D=o.Ay.div`
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
`,M=o.Ay.div`
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
`,L=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,O=o.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
`,Q=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,Z=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,U=o.Ay.button`
  background: none;
  border: none;
  color: ${t.w.colors.text.placeholder};
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    color: #DC2626;
  }
`,W=o.Ay.button`
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
    color: ${t.w.colors.text.muted};
  }
`,Y=o.Ay.button`
  padding: 6px 12px;
  background: ${t.w.colors.primary};
  border: 1px solid #635BFF;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    background: ${t.w.colors.primaryHover};
    border-color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`,H=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,K=o.Ay.div`
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
`,J=o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,X=o.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,V=()=>{var e;const{operationSettings:n}=(0,c.Pj)(),[a]=(0,s.ok)(),t=(0,s.Zp)(),[o,V]=(0,r.useState)([]),[q,G]=(0,r.useState)(""),[ee,ne]=(0,r.useState)("all"),[ae,te]=(0,r.useState)("all"),[re,se]=(0,r.useState)(!1),[oe,ie]=(0,r.useState)(!1),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(""),[ue,ge]=(0,r.useState)(""),[xe,he]=(0,r.useState)(""),[me,ye]=(0,r.useState)(null),[je,ve]=(0,r.useState)(null),[fe,be]=(0,r.useState)(!1),[Ce,we]=(0,r.useState)(""),[Fe,Se]=(0,r.useState)(!1),[Ae,Ee]=(0,r.useState)([]),[ke,Re]=(0,r.useState)([]),[Be,_e]=(0,r.useState)(""),[Te,ze]=(0,r.useState)(!1),[Ie,$e]=(0,r.useState)([]),[Pe,Ne]=(0,r.useState)([]),[De,Me]=(0,r.useState)(""),[Le,Oe]=(0,r.useState)(!1),[Qe,Ze]=(0,r.useState)([]),[Ue,We]=(0,r.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[Ye,He]=(0,r.useState)([]),[Ke,Je]=(0,r.useState)([]),[Xe,Ve]=(0,r.useState)([]),[qe,Ge]=(0,r.useState)("create"),[en,nn]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[an,tn]=(0,r.useState)(null),[rn,sn]=(0,r.useState)([]),[on,ln]=(0,r.useState)(""),[dn,cn]=(0,r.useState)(!1),[pn,un]=(0,r.useState)("keep"),[gn,xn]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[hn,mn]=(0,r.useState)(null),[yn,jn]=(0,r.useState)(""),[vn,fn]=(0,r.useState)(!1),[bn,Cn]=(0,r.useState)("all"),[wn,Fn]=(0,r.useState)(""),[Sn,An]=(0,r.useState)(!1),[En,kn]=(0,r.useState)([]);(0,r.useEffect)(()=>{console.log("\ud83c\udfaf RestaurantsPage useEffect triggered"),console.log("\ud83c\udfaf searchParams:",a.toString()),_n(),Bn(),Rn();const e=a.get("managerId"),n=a.get("managerName");e&&n&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:n}),te(e),Me(decodeURIComponent(n)));const t=a.get("brandId"),r=a.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),Cn(t),Fn(decodeURIComponent(r)))},[]);const Rn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Ve(e)}}catch(e){console.error("Error fetching brands:",e)}},Bn=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(Je(n),n.length>0){const e=n[0];We(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},_n=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API (using same method as StaffManagementPage)...");const e=localStorage.getItem("auth_token"),n=e?{Authorization:`Bearer ${e}`}:{},a=await fetch("/api/restaurants",{headers:n});if(console.log("\ud83d\udce1 Restaurants API response status:",a.status),a.ok){const e=await a.json();console.log("\u2705 Restaurants API response:",e);const t=await fetch("/api/users?role=Manager",{headers:n});console.log("\ud83d\udce1 Managers API response status:",t.status);const r=t.ok?await t.json():[];console.log("\u2705 Managers API response:",r);const s=e.data||e,o=r.data||r,i=Array.isArray(s)?s:[],l=Array.isArray(o)?o:[];console.log("\u2705 Setting available managers:",l),He(l);const d=i.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||"monthly",autoRenew:void 0===e.autoRenew||e.autoRenew,discount_type:e.discount_type||"none",discount_value:e.discount_value||0,discount_reason:e.discount_reason||""}});console.log("\u2705 Formatted restaurants:",d),console.log("\u2705 Setting restaurants state with",d.length,"restaurants"),V(d)}else console.error("\u274c Failed to fetch restaurants data"),V([]),He([])}catch(e){console.error("\u274c Error fetching restaurants:",e),V([]),He([])}},Tn=async e=>{ln(e),cn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();sn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},zn=async e=>{jn(e),fn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();sn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},In=o.filter(e=>{const n=e.name.toLowerCase().includes(q.toLowerCase())||e.managerName.toLowerCase().includes(q.toLowerCase())||e.cuisine.toLowerCase().includes(q.toLowerCase()),a="all"===ee||e.status===ee,t=e.managerId===ae,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===ae),s="all"===ae||t||r,o="all"===bn||e.brand_id&&e.brand_id.toString()===bn;return"all"!==ae&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:ae,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:o.length,filteredRestaurants:In.length,searchTerm:q,filterStatus:ee,filterManager:ae,restaurants:o.slice(0,2)});const $n=o.length,Pn=o.filter(e=>"active"===e.status).length,Nn=o.reduce((e,n)=>e+n.todaySales,0),Dn=o.reduce((e,n)=>e+n.todayOrders,0),Mn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,h.jsx)(k,{filled:a<=e,children:"\u2605"},a));return n},Ln=Array.from(new Set(o.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:o.length,filteredCount:In.length,managersCount:Ye.length,uniqueManagersCount:Ln.length,firstRestaurant:o[0],firstFiltered:In[0]}),(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Restaurants"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(In.map(e=>({"Restaurant Name":e.name,Manager:e.managerName,Location:e.location,Cuisine:e.cuisine,Status:e.status,Rating:e.rating,"Today Sales":(0,p.vv)(e.todaySales,n.currency),"Today Orders":e.todayOrders,"Staff Count":e.staffCount,Phone:e.phone,Email:e.email,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:"Export"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=Ke.length>0?Ke[0]:null;We({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?n.base_price_monthly:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),we(""),Ee([]),Se(!1),Re([]),Ge("create"),nn({fullName:"",email:"",username:"",password:"",phone:""}),tn(null),sn([]),ln(""),cn(!1),se(!0)},children:"Add Restaurant"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:$n}),(0,h.jsx)(l.v0,{children:"Total Restaurants"}),(0,h.jsx)(l.d1,{children:"Across all managers"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:Pn}),(0,h.jsx)(l.v0,{children:"Active Restaurants"}),(0,h.jsxs)(l.d1,{children:[$n>0?Math.round(Pn/$n*100):0,"% operational"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:(0,p.vv)(Nn,n.currency)}),(0,h.jsx)(l.v0,{children:"Today's Total Sales"}),(0,h.jsx)(l.d1,{children:"Combined revenue"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsx)(l.Os,{children:Dn}),(0,h.jsx)(l.v0,{children:"Today's Orders"}),(0,h.jsx)(l.d1,{children:"All restaurants"})]})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)(z,{placeholder:"Search restaurants...",value:q,onChange:e=>G(e.target.value)}),(0,h.jsxs)(P,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Search managers...",value:De,onChange:e=>(e=>{if(Me(e),Oe(!0),e.length<1)return void Ze(Ye.slice(0,10));const n=Ye.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Ze(n)})(e.target.value),onFocus:()=>{Oe(!0),0===De.length&&Ze(Ye.slice(0,10))},onBlur:()=>setTimeout(()=>Oe(!1),200)}),"all"!==ae&&De&&(0,h.jsx)(W,{onClick:()=>{te("all"),Me(""),Oe(!1)},children:"\xd7"}),(0,h.jsxs)(D,{show:Le,children:[(0,h.jsxs)(M,{onClick:()=>{te("all"),Me(""),Oe(!1)},children:[(0,h.jsx)(L,{children:"All Managers"}),(0,h.jsx)(O,{children:"Show all restaurants"})]}),Qe.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{te(e.id.toString()),Me(e.full_name||e.username),Oe(!1)})(e),children:[(0,h.jsx)(L,{children:e.full_name||e.username}),(0,h.jsxs)(O,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Search brands...",value:wn,onChange:e=>(e=>{if(Fn(e),An(!0),e.length<1)return void kn(Xe.slice(0,10));const n=Xe.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);kn(n)})(e.target.value),onFocus:()=>{An(!0),0===wn.length&&kn(Xe.slice(0,10))},onBlur:()=>setTimeout(()=>An(!1),200)}),"all"!==bn&&wn&&(0,h.jsx)(W,{onClick:()=>{Cn("all"),Fn(""),An(!1),t("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,h.jsxs)(D,{show:Sn,children:[(0,h.jsxs)(M,{onClick:()=>{Cn("all"),Fn(""),An(!1),t("/pos/admin/restaurants",{replace:!0})},children:[(0,h.jsx)(L,{children:"All Brands"}),(0,h.jsx)(O,{children:"Show all restaurants"})]}),En.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{Cn(e.id.toString()),Fn(e.name),An(!1)})(e),children:[(0,h.jsx)(L,{children:e.name}),(0,h.jsxs)(O,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,h.jsxs)(I,{value:ee,onChange:e=>ne(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)(m,{children:0===In.length?(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===o.length?"\ud83d\udd04 Loading restaurants...":"\ud83d\udced No restaurants found matching your criteria.",(0,h.jsx)("br",{}),(0,h.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",o.length," | Filtered: ",In.length]})]}):In.map(e=>(0,h.jsxs)(y,{children:[(0,h.jsxs)(j,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(f,{children:e.name}),(0,h.jsxs)(b,{children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:"No Admin Assigned"]}),e.managers&&e.managers.length>0&&(0,h.jsxs)(b,{children:["Managers: ",e.managers.map(e=>e.name).join(", ")]}),(0,h.jsxs)(b,{children:[e.location," \u2022 ",e.cuisine]})]}),(0,h.jsx)(C,{status:e.status,children:e.status})]}),(0,h.jsxs)(E,{children:[Mn(e.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[e.rating," \u2022 Created: ",new Date(e.createdAt).toLocaleDateString()]})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(S,{children:(0,p.vv)(e.todaySales,n.currency)}),(0,h.jsx)(A,{children:"Today's Sales"})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(S,{children:e.todayOrders}),(0,h.jsx)(A,{children:"Orders"})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(S,{children:e.staffCount}),(0,h.jsx)(A,{children:"Staff"})]})]}),(0,h.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,h.jsx)(Y,{onClick:()=>(e=>{ve(e),be(!0)})(e),children:"View"}),(0,h.jsx)(_,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),t(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(e),children:"Report"}),(0,h.jsx)(_,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",Ye);const n=Ke.length>0?Ke[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=e.planAmount||(n?n.base_price_monthly:"29.00"),r={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(ye(r),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=Ye.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Ne(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=Ye.find(n=>n.id.toString()===e.managerId.toString());Ne(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Ne([]);_e(""),$e([]),ze(!1),un("keep"),xn({fullName:"",email:"",username:"",password:"",phone:""}),mn(null),jn(""),fn(!1),ie(!0)})(e),children:"Edit"}),(0,h.jsx)(_,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)V(o.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(e),style:{background:"active"===e.status?"#FEE2E2":"#ECFDF5",color:"active"===e.status?"#DC2626":"#059669",border:"1px solid "+("active"===e.status?"#FCA5A5":"#A7F3D0")},children:"active"===e.status?"Deactivate":"Activate"})]})]},e.id))}),re&&(0,h.jsx)(d.mH,{show:re,onClick:()=>se(!1),children:(0,h.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(d.rQ,{children:[(0,h.jsx)(d.wt,{children:"Add Restaurant"}),(0,h.jsx)(d.Jn,{onClick:()=>se(!1),children:"\xd7"})]}),(0,h.jsxs)(d.cw,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(d.lR,{children:"Restaurant Name *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:Ue.name,onChange:e=>We({...Ue,name:e.target.value})})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===qe?"#F0EFFF":"#F9FAFB",border:"create"===qe?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===qe,onChange:()=>{Ge("create"),tn(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===qe?"#F0EFFF":"#F9FAFB",border:"assign"===qe?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===qe,onChange:()=>{Ge("assign"),nn({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===qe?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Admin Full Name *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kim Owner",value:en.fullName,onChange:e=>nn({...en,fullName:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Admin Email *"}),(0,h.jsx)(d.ZQ,{type:"email",placeholder:"admin@restaurant.com",value:en.email,onChange:e=>nn({...en,email:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Admin Username *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., kim_owner",value:en.username,onChange:e=>nn({...en,username:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Admin Password *"}),(0,h.jsx)(d.ZQ,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:en.password,onChange:e=>nn({...en,password:e.target.value})})]}),(0,h.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(d.lR,{children:"Admin Phone"}),(0,h.jsx)(g.A,{value:en.phone,onChange:e=>nn({...en,phone:e}),defaultCountry:Ue.country})]})]}):(0,h.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(d.lR,{children:"Search and select an existing user"}),(0,h.jsxs)($,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Type to search by name, email, or username...",value:on,onChange:e=>Tn(e.target.value),onFocus:()=>Tn(on),onBlur:()=>setTimeout(()=>cn(!1),200)}),(0,h.jsx)(D,{show:dn,children:0===rn.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:on.length>0?"No available users found":"Type to search users..."}):rn.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{tn(e),ln(e.full_name||e.username),cn(!1)})(e),children:[(0,h.jsx)(L,{children:e.full_name||e.username}),(0,h.jsxs)(O,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),an&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:an.full_name||an.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[an.email," \u2022 ",an.role]})]}),(0,h.jsx)("button",{onClick:()=>{tn(null),ln("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,h.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,h.jsxs)($,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Search and select oversight managers...",value:Ce,onChange:e=>(e=>{if(we(e),Se(!0),e.length<1)return void Ee(Ye.slice(0,10));const n=Ye.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));Ee(n.slice(0,10))})(e.target.value),onFocus:()=>{Se(!0),Ee(Ye.slice(0,10))},onBlur:()=>setTimeout(()=>Se(!1),200)}),(0,h.jsx)(D,{show:Fe,children:Ae.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{ke.find(n=>n.id===e.id)||Re([...ke,e]),we(""),Se(!1)})(e),children:[(0,h.jsx)(L,{children:e.full_name||e.username}),(0,h.jsxs)(O,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),ke.length>0&&(0,h.jsx)(Q,{children:ke.map(e=>(0,h.jsxs)(Z,{children:[e.full_name||e.username,(0,h.jsx)(U,{onClick:()=>{return n=e.id.toString(),void Re(ke.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Email Address *"}),(0,h.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:Ue.email,onChange:e=>We({...Ue,email:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Phone Number *"}),(0,h.jsx)(g.A,{value:Ue.phone,onChange:e=>We({...Ue,phone:e}),defaultCountry:Ue.country})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Address *"}),(0,h.jsx)(d.Lz,{placeholder:"Enter restaurant address",value:Ue.address,onChange:e=>We({...Ue,address:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"City"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Ue.city,onChange:e=>We({...Ue,city:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"State / Province"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Selangor",value:Ue.state,onChange:e=>We({...Ue,state:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Postal Code"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:Ue.postalCode,onChange:e=>We({...Ue,postalCode:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Country"}),(0,h.jsx)(d.FX,{value:Ue.country,onChange:e=>We({...Ue,country:e.target.value}),children:x.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Business Registration No."}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 123456-A",value:Ue.businessRegistration,onChange:e=>We({...Ue,businessRegistration:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 000123456789",value:Ue.taxId,onChange:e=>We({...Ue,taxId:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Cuisine Type"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ue.cuisine,onChange:e=>We({...Ue,cuisine:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Plan Type *"}),(0,h.jsx)(d.FX,{value:Ue.planType,onChange:e=>{var n;const a=Ke.find(n=>n.display_name===e.target.value);We({...Ue,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:Ke.map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,p.vv)(parseFloat(e.base_price_monthly),n.currency),"/month)"]},e.id))})]}),(0,h.jsx)(d.gE,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===Ue.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===Ue.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"checkbox",checked:"trial"===Ue.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),We({...Ue,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else{var n,a;We({...Ue,status:"active",planAmount:(null===(n=Ke.find(e=>e.display_name===Ue.planType))||void 0===n||null===(a=n.base_price_monthly)||void 0===a?void 0:a.toString())||"29.00"})}},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Billing Cycle *"}),(0,h.jsxs)(d.FX,{value:Ue.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Ue.planType]||a["Basic Plan"];We({...Ue,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Payment Model *"}),(0,h.jsxs)(d.FX,{value:Ue.paymentModel,onChange:e=>We({...Ue,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Subscription Start Date *"}),(0,h.jsx)(d.ZQ,{type:"date",value:Ue.subscriptionStart,onChange:e=>We({...Ue,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Subscription End Date *"}),(0,h.jsx)(d.ZQ,{type:"date",value:Ue.subscriptionEnd,onChange:e=>We({...Ue,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(d.gE,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:Ue.autoRenew,onChange:e=>We({...Ue,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ue.planType," - $",Ue.planAmount," (",Ue.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Ue.paymentModel?"Brand Manager":"foodcourt_manager"===Ue.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),ue&&(0,h.jsx)(d.IM,{children:ue})]}),(0,h.jsxs)(d.jl,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{ge(""),se(!1)},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",Ue),console.log("Selected managers:",ke),ge(""),!Ue.name||!Ue.email||!Ue.phone||!Ue.address)return void ge("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===qe){if(!en.fullName||!en.email||!en.username||!en.password)return void ge("Please fill in all required Restaurant Admin fields (Full Name, Email, Username, Password).");if(en.password.length<8)return void ge("Admin password must be at least 8 characters.");if(!/[a-z]/.test(en.password)||!/[A-Z]/.test(en.password)||!/[0-9]/.test(en.password))return void ge("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===qe&&!an)return void ge("Please select an existing user as Restaurant Admin.");const a={name:Ue.name,adminAction:qe,managerIds:ke.map(e=>parseInt(e.id.toString())),email:Ue.email,phone:Ue.phone,address:Ue.address,city:Ue.city,state:Ue.state,postal_code:Ue.postalCode,country:Ue.country,business_registration:Ue.businessRegistration,tax_id:Ue.taxId,location:Ue.address,cuisine:Ue.cuisine||"Various",status:Ue.status,planType:Ue.planType,planAmount:parseFloat(Ue.planAmount),billingCycle:Ue.billingCycle,payment_model:Ue.paymentModel,autoRenew:Ue.autoRenew,subscriptionStart:Ue.subscriptionStart,subscriptionEnd:Ue.subscriptionEnd};"create"===qe?(a.adminEmail=en.email,a.adminPassword=en.password,a.adminUsername=en.username,a.adminFullName=en.fullName,a.adminPhone=en.phone||void 0):"assign"===qe&&(a.adminUserId=parseInt(an.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const t=localStorage.getItem("auth_token"),r=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant created successfully:",e),ge(""),se(!1),await _n()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);ge(t)}}catch(a){console.error("\u274c Error adding restaurant:",a),ge("Error adding restaurant. Please check your connection and try again.")}},disabled:!Ue.name.trim(),children:"Add Restaurant"})]})]})}),oe&&me&&(0,h.jsx)(d.mH,{show:oe,onClick:()=>ie(!1),children:(0,h.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(d.rQ,{children:[(0,h.jsx)(d.wt,{children:"Edit Restaurant"}),(0,h.jsx)(d.Jn,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,h.jsxs)(d.cw,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(d.lR,{children:"Restaurant Name *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"Enter restaurant name",value:me.name,onChange:e=>ye({...me,name:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),me.admin?(0,h.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:me.admin.name}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[me.admin.email," ",me.admin.phone?`\u2022 ${me.admin.phone}`:""]})]}),"keep"===pn&&(0,h.jsx)("button",{onClick:()=>un("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:"Change Admin"})]})}):(0,h.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:"No Restaurant Admin assigned"}),"keep"===pn&&(0,h.jsx)("button",{onClick:()=>un("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:"Assign Admin"})]})}),"keep"!==pn&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===pn?"#F0EFFF":"#F9FAFB",border:"create"===pn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===pn,onChange:()=>{un("create"),mn(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===pn?"#F0EFFF":"#F9FAFB",border:"change"===pn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===pn,onChange:()=>{un("change"),xn({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]}),(0,h.jsx)("button",{onClick:()=>un("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:"Cancel"})]}),"create"===pn?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"New Admin Full Name *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kim Owner",value:gn.fullName,onChange:e=>xn({...gn,fullName:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"New Admin Email *"}),(0,h.jsx)(d.ZQ,{type:"email",placeholder:"admin@restaurant.com",value:gn.email,onChange:e=>xn({...gn,email:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"New Admin Username *"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., kim_owner",value:gn.username,onChange:e=>xn({...gn,username:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"New Admin Password *"}),(0,h.jsx)(d.ZQ,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:gn.password,onChange:e=>xn({...gn,password:e.target.value})})]})]}):(0,h.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(d.lR,{children:"Search and select an existing user"}),(0,h.jsxs)($,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Type to search by name, email, or username...",value:yn,onChange:e=>zn(e.target.value),onFocus:()=>zn(yn),onBlur:()=>setTimeout(()=>fn(!1),200)}),(0,h.jsx)(D,{show:vn,children:0===rn.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:yn.length>0?"No available users found":"Type to search users..."}):rn.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{mn(e),jn(e.full_name||e.username),fn(!1)})(e),children:[(0,h.jsx)(L,{children:e.full_name||e.username}),(0,h.jsxs)(O,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),hn&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:hn.full_name||hn.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[hn.email," \u2022 ",hn.role]})]}),(0,h.jsx)("button",{onClick:()=>{mn(null),jn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,h.jsxs)(d.gE,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,h.jsxs)($,{children:[(0,h.jsx)(N,{type:"text",placeholder:"Search and select oversight managers...",value:Be,onChange:e=>(e=>{if(_e(e),ze(!0),e.length<1)return void $e(Ye.slice(0,10));const n=Ye.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));$e(n.slice(0,10))})(e.target.value),onFocus:()=>{ze(!0),0===Be.length&&$e(Ye.slice(0,10))},onBlur:()=>setTimeout(()=>ze(!1),200)}),(0,h.jsx)(D,{show:Te,children:Ie.map(e=>(0,h.jsxs)(M,{onClick:()=>(e=>{Pe.find(n=>n.id===e.id)||Ne([...Pe,e]),_e(""),ze(!1)})(e),children:[(0,h.jsx)(L,{children:e.full_name||e.username}),(0,h.jsxs)(O,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Pe.length>0&&(0,h.jsx)(Q,{children:Pe.map(e=>(0,h.jsxs)(Z,{children:[e.full_name||e.username,(0,h.jsx)(U,{onClick:()=>{return n=e.id.toString(),void Ne(Pe.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Email Address *"}),(0,h.jsx)(d.ZQ,{type:"email",placeholder:"restaurant@example.com",value:me.email||"",onChange:e=>ye({...me,email:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Phone Number *"}),(0,h.jsx)(g.A,{value:me.phone||"",onChange:e=>ye({...me,phone:e}),defaultCountry:me.country})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Address *"}),(0,h.jsx)(d.Lz,{placeholder:"Enter restaurant address",value:me.address||me.location,onChange:e=>ye({...me,address:e.target.value,location:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"City"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Kuala Lumpur",value:me.city||"",onChange:e=>ye({...me,city:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"State / Province"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Selangor",value:me.state||"",onChange:e=>ye({...me,state:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Postal Code"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 50000",value:me.postalCode||"",onChange:e=>ye({...me,postalCode:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Country"}),(0,h.jsx)(d.FX,{value:me.country||"MY",onChange:e=>ye({...me,country:e.target.value}),children:x.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Business Registration No."}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 123456-A",value:me.businessRegistration||"",onChange:e=>ye({...me,businessRegistration:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Tax ID / GST No."}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., 000123456789",value:me.taxId||"",onChange:e=>ye({...me,taxId:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Cuisine Type"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:me.cuisine,onChange:e=>ye({...me,cuisine:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Plan Type *"}),(0,h.jsx)(d.FX,{value:me.planType||"Basic Plan",onChange:e=>{var n;const a=Ke.find(n=>n.display_name===e.target.value);ye({...me,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:Ke.map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,p.vv)(parseFloat(e.base_price_monthly),n.currency),"/month)"]},e.id))})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Billing Cycle *"}),(0,h.jsxs)(d.FX,{value:me.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[me.planType||"Basic Plan"]||a["Basic Plan"];ye({...me,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Payment Model *"}),(0,h.jsxs)(d.FX,{value:me.paymentModel||"restaurant",onChange:e=>ye({...me,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Subscription Start Date *"}),(0,h.jsx)(d.ZQ,{type:"date",value:me.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>ye({...me,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Subscription End Date *"}),(0,h.jsx)(d.ZQ,{type:"date",value:me.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>ye({...me,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(d.gE,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:me.autoRenew||!0,onChange:e=>ye({...me,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"6px"},children:[(0,h.jsx)("h4",{style:{margin:0,fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:"Subscription Discount"}),(0,h.jsx)("p",{style:{margin:"4px 0 0",fontSize:"12px",color:"#6B7280"},children:"Applied automatically to System Admin subscription invoices"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Discount Type"}),(0,h.jsxs)(d.FX,{value:me.discount_type||"none",onChange:e=>ye({...me,discount_type:e.target.value,discount_value:"none"===e.target.value?0:me.discount_value}),children:[(0,h.jsx)("option",{value:"none",children:"None"}),(0,h.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,h.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),me.discount_type&&"none"!==me.discount_type&&(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Discount Value ","percentage"===me.discount_type?"(%)":"(Amount)"]}),(0,h.jsx)(d.ZQ,{type:"number",min:"0",max:"percentage"===me.discount_type?"100":void 0,step:"0.01",value:me.discount_value||"",onChange:e=>ye({...me,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===me.discount_type?"e.g. 10":"e.g. 5.00"})]}),me.discount_type&&"none"!==me.discount_type&&(0,h.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(d.lR,{children:"Discount Reason"}),(0,h.jsx)(d.ZQ,{type:"text",value:me.discount_reason||"",onChange:e=>ye({...me,discount_reason:e.target.value}),placeholder:"e.g. Early bird discount, Loyalty discount"})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[me.planType||"Basic Plan"," - $",me.planAmount||"29.00"," (",me.billingCycle||"monthly",")",me.discount_type&&"none"!==me.discount_type&&(me.discount_value||0)>0&&(0,h.jsxs)("span",{style:{color:"#15803D",fontSize:"14px",marginLeft:"8px"},children:["(-","percentage"===me.discount_type?`${me.discount_value}%`:`$${(me.discount_value||0).toFixed(2)}`,")"]})]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===me.paymentModel?"Brand Manager":"foodcourt_manager"===me.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),xe&&(0,h.jsx)(d.IM,{children:xe})]}),(0,h.jsxs)(d.jl,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{he(""),ie(!1)},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"danger-outline",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`))try{console.log("Deleting restaurant:",e.id),he("");const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${a}`}});if(console.log("\ud83d\udce1 Restaurant delete API response status:",t.status),t.ok)console.log("\u2705 Restaurant deleted successfully"),he(""),ie(!1),ye(null),pe("Restaurant deleted successfully!"),de(!0),await _n();else{var n;const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to delete restaurant:",e);let a="Please try again.";"string"===typeof e.error?a=e.error:null!==(n=e.error)&&void 0!==n&&n.message?a=e.error.message:e.message&&(a=e.message),he(`Error deleting restaurant: ${a}`)}}catch(a){console.error("\u274c Error deleting restaurant:",a),he("Error deleting restaurant. Please check your connection and try again.")}})(me),children:"Delete"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(me)try{if(console.log("\ud83d\udd04 Updating restaurant:",me),console.log("\ud83d\udd0d Selected edit managers:",Pe),he(""),!me.name)return void he("Please fill in all required fields.");if("create"===pn){if(!gn.fullName||!gn.email||!gn.username||!gn.password)return void he("Please fill in all required new Admin fields.")}else if("change"===pn&&!hn)return void he("Please select an existing user as new Admin.");const a={name:me.name,managerIds:Pe.map(e=>parseInt(e.id.toString())),email:me.email||"",phone:me.phone||"",address:me.address||me.location||"",location:me.address||me.location||"",city:me.city||"",state:me.state||"",postal_code:me.postalCode||"",country:me.country||"MY",business_registration:me.businessRegistration||"",tax_id:me.taxId||"",cuisine:me.cuisine||"Various",status:me.status,planType:me.planType||"Basic Plan",planAmount:parseFloat(me.planAmount||"29.00"),billingCycle:me.billingCycle||"monthly",payment_model:me.paymentModel||"restaurant",autoRenew:me.autoRenew||!0,subscriptionStart:me.subscriptionStart,subscriptionEnd:me.subscriptionEnd,discount_type:me.discount_type||"none",discount_value:me.discount_type&&"none"!==me.discount_type&&me.discount_value||0,discount_reason:me.discount_reason||""};"create"===pn?(a.adminAction="create",a.adminEmail=gn.email,a.adminPassword=gn.password,a.adminUsername=gn.username,a.adminFullName=gn.fullName,a.adminPhone=gn.phone||void 0):"change"===pn&&(a.adminAction="change",a.adminUserId=parseInt(hn.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${me.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant updated successfully:",e),he(""),ie(!1),ye(null),await _n()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);he(t)}}catch(a){console.error("\u274c Error updating restaurant:",a),he("Error updating restaurant. Please check your connection and try again.")}},disabled:!(null!==me&&void 0!==me&&null!==(e=me.name)&&void 0!==e&&e.trim()),children:"Update Restaurant"})]})]})}),fe&&je&&(0,h.jsx)(d.mH,{show:fe,onClick:()=>be(!1),children:(0,h.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(d.rQ,{children:[(0,h.jsx)(d.wt,{children:"Restaurant Details"}),(0,h.jsx)(d.Jn,{onClick:()=>be(!1),children:"\xd7"})]}),(0,h.jsx)(d.cw,{children:(0,h.jsxs)(B,{children:[(0,h.jsxs)(d.gE,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(d.lR,{children:"Restaurant Name"}),(0,h.jsx)(d.ZQ,{type:"text",value:je.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Restaurant Admin"}),je.admin?(0,h.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:je.admin.name}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[je.admin.email," ",je.admin.phone?`\u2022 ${je.admin.phone}`:""]})]}):(0,h.jsx)(d.ZQ,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Oversight Managers"}),(0,h.jsx)(d.Lz,{value:je.managers&&je.managers.length>0?je.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Email Address"}),(0,h.jsx)(d.ZQ,{type:"email",value:je.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Phone Number"}),(0,h.jsx)(d.ZQ,{type:"tel",value:(0,u.FI)(je.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Address"}),(0,h.jsx)(d.Lz,{value:je.address||je.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Cuisine Type"}),(0,h.jsx)(d.ZQ,{type:"text",value:je.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Status"}),(0,h.jsx)(d.ZQ,{type:"text",value:je.status?je.status.charAt(0).toUpperCase()+je.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Plan Type"}),(0,h.jsx)(d.ZQ,{type:"text",value:je.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Created Date"}),(0,h.jsx)(d.ZQ,{type:"text",value:je.createdAt?new Date(je.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})})]})}),le&&(0,h.jsx)(d.mH,{show:le,onClick:()=>de(!1),children:(0,h.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(K,{children:"\u2713"}),(0,h.jsx)(J,{children:"Success!"}),(0,h.jsx)(X,{children:ce}),(0,h.jsx)(i.cc,{variant:"primary",onClick:()=>de(!1),children:"OK"})]})})]})]})})}},2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>s.$n});var t=a(8819),r=a(4752),s=a(8829);r.Ay.select`
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
`}}]);