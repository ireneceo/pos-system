"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>Q});var t=a(9950),r=a(4492),s=a(4752),i=a(3705),o=a(8409),l=a(9610),d=a(7617),c=a(9018),u=a(6038),p=a(2924),x=a(8666),g=a(2435),h=a(5030),m=a(4414);const y=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,j=s.Ay.div`
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
`,f=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,b=s.Ay.div`
  flex: 1;
`,v=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,F=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"expired":return"#FEE2E2";case"trial":return"#FEF3C7";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"expired":case"suspended":return"#DC2626";case"trial":return"#D97706";default:return"#6B7280"}}};
`,A=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,w=s.Ay.div`
  text-align: center;
`,S=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,B=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,E=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,P=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,z=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,_=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,R=s.Ay.input`
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
`,T=s.Ay.select`
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
`,I=s.Ay.textarea`
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
`,N=s.Ay.button`
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
`,D=s.Ay.div`
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
`,M=s.Ay.input`
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
`,L=s.Ay.select`
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
`,$=s.Ay.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,O=s.Ay.div`
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
`,U=s.Ay.input`
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
`,W=s.Ay.div`
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
`,Y=s.Ay.div`
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
`,K=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,V=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,q=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,J=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,G=s.Ay.button`
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
`,H=s.Ay.button`
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
`,Z=s.Ay.button`
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
`,Q=()=>{const{t:e}=(0,h.Bd)("admin"),{operationSettings:n}=(0,c.Pj)(),[a]=(0,r.ok)(),s=(0,r.Zp)(),[Q,X]=(0,t.useState)([]),[ee,ne]=(0,t.useState)(""),[ae,te]=(0,t.useState)("all"),[re,se]=(0,t.useState)("all"),[ie,oe]=(0,t.useState)(!1),[le,de]=(0,t.useState)(!1),[ce,ue]=(0,t.useState)(""),[pe,xe]=(0,t.useState)(""),[ge,he]=(0,t.useState)(null),[me,ye]=(0,t.useState)(null),[je,fe]=(0,t.useState)(!1),[be,ve]=(0,t.useState)(""),[Ce,Fe]=(0,t.useState)(!1),[Ae,we]=(0,t.useState)([]),[Se,Be]=(0,t.useState)([]),[ke,Ee]=(0,t.useState)(""),[Pe,ze]=(0,t.useState)(!1),[_e,Re]=(0,t.useState)([]),[Te,Ie]=(0,t.useState)([]),[Ne,De]=(0,t.useState)(!1),[Me,Le]=(0,t.useState)(null),[$e,Oe]=(0,t.useState)(""),[Ue,We]=(0,t.useState)(!1),[Ye,Ke]=(0,t.useState)([]),[Ve,qe]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[Je,Ge]=(0,t.useState)([]),[He,Ze]=(0,t.useState)([]),Qe=(0,t.useMemo)(()=>(0,u.vL)(He),[He]),[Xe,en]=(0,t.useState)([]),[nn,an]=(0,t.useState)("create"),[tn,rn]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[sn,on]=(0,t.useState)(!1),[ln,dn]=(0,t.useState)(""),[cn,un]=(0,t.useState)(""),[pn,xn]=(0,t.useState)(!1),[gn,hn]=(0,t.useState)(null),[mn,yn]=(0,t.useState)([]),[jn,fn]=(0,t.useState)(""),[bn,vn]=(0,t.useState)(!1),[Cn,Fn]=(0,t.useState)("keep"),[An,wn]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[Sn,Bn]=(0,t.useState)(null),[kn,En]=(0,t.useState)(""),[Pn,zn]=(0,t.useState)(!1),[_n,Rn]=(0,t.useState)("all"),[Tn,In]=(0,t.useState)(""),[Nn,Dn]=(0,t.useState)(!1),[Mn,Ln]=(0,t.useState)([]);(0,t.useEffect)(()=>{Promise.all([Un(),On(),$n()]);const e=a.get("managerId"),n=a.get("managerName");e&&n&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:n}),se(e),Oe(decodeURIComponent(n)));const t=a.get("brandId"),r=a.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),Rn(t),In(decodeURIComponent(r)))},[]);const $n=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();en(e)}}catch(e){console.error("Error fetching brands:",e)}},On=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(Ze(n),n.length>0){const e=n[0];qe(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},Un=async()=>{try{const e=localStorage.getItem("auth_token"),n=e?{Authorization:`Bearer ${e}`}:{},[a,t]=await Promise.all([fetch("/api/restaurants",{headers:n}),fetch("/api/users?role=Manager",{headers:n})]);if(a.ok){const e=await a.json(),n=t.ok?await t.json():[],r=e.data||e,s=n.data||n,i=Array.isArray(r)?r:[],o=Array.isArray(s)?s:[];Ge(o);const l=i.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||e.billing_cycle||"monthly",autoRenew:void 0!==e.autoRenew?e.autoRenew:void 0===e.auto_renew||e.auto_renew,discount_type:e.discount_type||"none",discount_value:e.discount_value||0,discount_reason:e.discount_reason||""}});console.log("\u2705 Formatted restaurants:",l),console.log("\u2705 Setting restaurants state with",l.length,"restaurants"),X(l)}else console.error("\u274c Failed to fetch restaurants data"),X([]),Ge([])}catch(e){console.error("\u274c Error fetching restaurants:",e),X([]),Ge([])}},Wn=async e=>{fn(e),vn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();yn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Yn=async e=>{En(e),zn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();yn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Kn=Q.filter(e=>{const n=e.name.toLowerCase().includes(ee.toLowerCase())||e.managerName.toLowerCase().includes(ee.toLowerCase())||e.cuisine.toLowerCase().includes(ee.toLowerCase()),a="all"===ae||e.status===ae,t=e.managerId===re,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===re),s="all"===re||t||r,i="all"===_n||e.brand_id&&e.brand_id.toString()===_n;return"all"!==re&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:re,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&i});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:Q.length,filteredRestaurants:Kn.length,searchTerm:ee,filterStatus:ae,filterManager:re,restaurants:Q.slice(0,2)});const Vn=Q.length,qn=Q.filter(e=>"active"===e.status).length,Jn=Q.reduce((e,n)=>e+n.todaySales,0),Gn=Q.reduce((e,n)=>e+n.todayOrders,0),Hn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,m.jsx)(E,{filled:a<=e,children:"\u2605"},a));return n},Zn=Array.from(new Set(Q.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:Q.length,filteredCount:Kn.length,managersCount:Je.length,uniqueManagersCount:Zn.length,firstRestaurant:Q[0],firstFiltered:Kn[0]}),(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(o.mc,{children:[(0,m.jsxs)(o.Y9,{children:[(0,m.jsx)(o.hE,{children:e("admin:restaurantsPage.restaurants")}),(0,m.jsxs)(o.ex,{children:[(0,m.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Kn.map(e=>({"Restaurant Name":e.name,Manager:e.managerName,Location:e.location,Cuisine:e.cuisine,Status:e.status,Rating:e.rating,"Today Sales":(0,u.vv)(e.todaySales,n.currency),"Today Orders":e.todayOrders,"Staff Count":e.staffCount,Phone:e.phone,Email:e.email,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:e("admin:restaurantsPage.export")}),(0,m.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=He.length>0?He[0]:null;qe({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?String((0,u.jL)(n,"MYR")):"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),ve(""),we([]),Fe(!1),Be([]),an("create"),rn({fullName:"",email:"",username:"",phone:""}),hn(null),yn([]),fn(""),vn(!1),oe(!0)},children:e("admin:restaurantsPage.addRestaurant")})]})]}),(0,m.jsxs)(o.UC,{children:[(0,m.jsxs)(o.MD,{children:[(0,m.jsxs)(o.hI,{color:"#059669",children:[(0,m.jsx)(o.Os,{children:Vn}),(0,m.jsx)(o.v0,{children:e("admin:restaurantsPage.totalRestaurants")}),(0,m.jsx)(o.d1,{children:e("admin:restaurantsPage.acrossAllManagers")})]}),(0,m.jsxs)(o.hI,{color:"#2563EB",children:[(0,m.jsx)(o.Os,{children:qn}),(0,m.jsx)(o.v0,{children:e("admin:restaurantsPage.activeRestaurants")}),(0,m.jsxs)(o.d1,{children:[Vn>0?Math.round(qn/Vn*100):0,"% operational"]})]}),(0,m.jsxs)(o.hI,{color:"#7C3AED",children:[(0,m.jsx)(o.Os,{children:(0,u.vv)(Jn,n.currency)}),(0,m.jsx)(o.v0,{children:e("admin:restaurantsPage.todaysTotalSales")}),(0,m.jsx)(o.d1,{children:e("admin:restaurantsPage.combinedRevenue")})]}),(0,m.jsxs)(o.hI,{color:"#D97706",children:[(0,m.jsx)(o.Os,{children:Gn}),(0,m.jsx)(o.v0,{children:e("admin:restaurantsPage.todaysOrders")}),(0,m.jsx)(o.d1,{children:e("admin:restaurantsPage.allRestaurants")})]})]}),(0,m.jsxs)(D,{children:[(0,m.jsxs)(O,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Search managers...",value:$e,onChange:e=>(e=>{if(Oe(e),We(!0),e.length<1)return void Ke(Je.slice(0,10));const n=Je.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Ke(n)})(e.target.value),onFocus:()=>{We(!0),0===$e.length&&Ke(Je.slice(0,10))},onBlur:()=>setTimeout(()=>We(!1),200)}),"all"!==re&&$e&&(0,m.jsx)(H,{onClick:()=>{se("all"),Oe(""),We(!1)},children:"\xd7"}),(0,m.jsxs)(W,{show:Ue,children:[(0,m.jsxs)(Y,{onClick:()=>{se("all"),Oe(""),We(!1)},children:[(0,m.jsx)(K,{children:e("admin:restaurantsPage.allManagers")}),(0,m.jsx)(V,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),Ye.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{se(e.id.toString()),Oe(e.full_name||e.username),We(!1)})(e),children:[(0,m.jsx)(K,{children:e.full_name||e.username}),(0,m.jsxs)(V,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,m.jsxs)(O,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Search brands...",value:Tn,onChange:e=>(e=>{if(In(e),Dn(!0),e.length<1)return void Ln(Xe.slice(0,10));const n=Xe.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);Ln(n)})(e.target.value),onFocus:()=>{Dn(!0),0===Tn.length&&Ln(Xe.slice(0,10))},onBlur:()=>setTimeout(()=>Dn(!1),200)}),"all"!==_n&&Tn&&(0,m.jsx)(H,{onClick:()=>{Rn("all"),In(""),Dn(!1),s("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,m.jsxs)(W,{show:Nn,children:[(0,m.jsxs)(Y,{onClick:()=>{Rn("all"),In(""),Dn(!1),s("/pos/admin/restaurants",{replace:!0})},children:[(0,m.jsx)(K,{children:e("admin:restaurantsPage.allBrands")}),(0,m.jsx)(V,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),Mn.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{Rn(e.id.toString()),In(e.name),Dn(!1)})(e),children:[(0,m.jsx)(K,{children:e.name}),(0,m.jsxs)(V,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,m.jsxs)(L,{value:ae,onChange:e=>te(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:e("admin:restaurantsPage.allStatus")}),(0,m.jsx)("option",{value:"active",children:e("admin:restaurantsPage.active")}),(0,m.jsx)("option",{value:"inactive",children:e("admin:restaurantsPage.inactive")}),(0,m.jsx)("option",{value:"trial",children:e("admin:restaurantsPage.trial")}),(0,m.jsx)("option",{value:"expired",children:e("admin:restaurantsPage.expired")}),(0,m.jsx)("option",{value:"suspended",children:e("admin:restaurantsPage.suspended")}),(0,m.jsx)("option",{value:"cancelled",children:e("admin:restaurantsPage.cancelled")})]}),(0,m.jsx)(M,{placeholder:"Search restaurants...",value:ee,onChange:e=>ne(e.target.value)})]}),(0,m.jsx)(y,{children:0===Kn.length?(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===Q.length?"Loading restaurants...":"No restaurants found matching your criteria.",(0,m.jsx)("br",{}),(0,m.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",Q.length," | Filtered: ",Kn.length]})]}):Kn.map(a=>(0,m.jsxs)(j,{children:[(0,m.jsxs)(f,{children:[(0,m.jsxs)(b,{children:[(0,m.jsxs)(v,{children:[a.name," ",a.currency&&(0,m.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a.currency}),a.is_demo&&(0,m.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e("admin:restaurantsPage.demo")}),a.is_test&&(0,m.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e("admin:restaurantsPage.test")})]}),(0,m.jsxs)(C,{children:["Admin: ",a.admin?`${a.admin.name} (${a.admin.email})`:"No Admin Assigned"]}),a.managers&&a.managers.length>0&&(0,m.jsxs)(C,{children:["Managers: ",a.managers.map(e=>e.name).join(", ")]}),(0,m.jsxs)(C,{children:[a.location," \u2022 ",a.cuisine]})]}),(0,m.jsx)(F,{status:a.status,children:a.status})]}),(0,m.jsxs)(k,{children:[Hn(a.rating),(0,m.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \u2022 Created: ",new Date(a.createdAt).toLocaleDateString()]})]}),(0,m.jsxs)(A,{children:[(0,m.jsxs)(w,{children:[(0,m.jsx)(S,{children:(0,u.vv)(a.todaySales,n.currency)}),(0,m.jsx)(B,{children:e("admin:restaurantsPage.todaysSales")})]}),(0,m.jsxs)(w,{children:[(0,m.jsx)(S,{children:a.todayOrders}),(0,m.jsx)(B,{children:e("admin:restaurantsPage.orders")})]}),(0,m.jsxs)(w,{children:[(0,m.jsx)(S,{children:a.staffCount}),(0,m.jsx)(B,{children:e("admin:restaurantsPage.staff")})]})]}),(0,m.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,m.jsx)(Z,{onClick:()=>(e=>{ye(e),fe(!0)})(a),children:"View"}),(0,m.jsx)(N,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),s(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(a),children:"Report"}),(0,m.jsx)(N,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",Je);const n=He.length>0?He[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=(0,u.Wh)(e.currency||"MYR"),r=e.planAmount||(n?String((0,u.jL)(n,t)):"49.00"),s={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:r,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(he(s),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=Je.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Ie(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=Je.find(n=>n.id.toString()===e.managerId.toString());Ie(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Ie([]);Ee(""),Re([]),ze(!1),Fn("keep"),wn({fullName:"",email:"",username:"",phone:""}),Bn(null),En(""),zn(!1),de(!0)})(a),children:"Edit"}),("suspended"===a.status||"overdue"===a.status)&&(0,m.jsx)(N,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${e.id}/restore-subscription`,{method:"POST",headers:{Authorization:`Bearer ${n}`}}),t=await a.json();t.success?await Un():xe(t.message||"Failed to restore subscription")}catch(n){console.error("Error restoring subscription:",n)}})(a),style:{background:"#EFF6FF",color:"#2563EB",border:"1px solid #93C5FD"},children:"Restore"}),(0,m.jsx)(N,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)X(Q.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(a),style:{background:"active"===a.status?"#FEE2E2":"#ECFDF5",color:"active"===a.status?"#DC2626":"#059669",border:"1px solid "+("active"===a.status?"#FCA5A5":"#A7F3D0")},children:"active"===a.status?"Deactivate":"Activate"})]})]},a.id))}),ie&&(0,m.jsxs)(o.aF,{isOpen:!0,onClose:()=>oe(!1),title:"Add Restaurant",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i.cc,{variant:"cancel",onClick:()=>{ue(""),oe(!1)},children:e("admin:restaurantsPage.cancel")}),(0,m.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",Ve),console.log("Selected managers:",Se),ue(""),!Ve.name||!Ve.email||!Ve.phone||!Ve.address)return void ue("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===nn){if(!tn.fullName||!tn.email||!tn.username)return void ue("Please fill in all required Restaurant Admin fields (Full Name, Email, Username).")}else if("assign"===nn&&!gn)return void ue("Please select an existing user as Restaurant Admin.");const a={name:Ve.name,adminAction:nn,managerIds:Se.map(e=>parseInt(e.id.toString())),email:Ve.email,phone:Ve.phone,address:Ve.address,city:Ve.city,state:Ve.state,postal_code:Ve.postalCode,country:Ve.country,business_registration:Ve.businessRegistration,tax_id:Ve.taxId,location:Ve.address,cuisine:Ve.cuisine||"Various",status:Ve.status,planType:Ve.planType,planAmount:parseFloat(Ve.planAmount),currency:Ve.currency,billingCycle:Ve.billingCycle,payment_model:Ve.paymentModel,autoRenew:Ve.autoRenew,subscriptionStart:Ve.subscriptionStart,subscriptionEnd:Ve.subscriptionEnd};"create"===nn?(a.adminEmail=tn.email,a.adminUsername=tn.username,a.adminFullName=tn.fullName,a.adminPhone=tn.phone||void 0):"assign"===nn&&(a.adminUserId=parseInt(gn.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const t=localStorage.getItem("auth_token"),r=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant created successfully:",e),ue(""),oe(!1),e.generatedPassword&&(dn("Restaurant Admin created successfully."),un(e.generatedPassword),xn(!1),on(!0)),await Un()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);ue(t)}}catch(a){console.error("\u274c Error adding restaurant:",a),ue("Error adding restaurant. Please check your connection and try again.")}},children:e("admin:restaurantsPage.addRestaurant")})]}),children:[(0,m.jsxs)(P,{children:[(0,m.jsxs)(z,{style:{gridColumn:"1 / -1"},children:[(0,m.jsx)(_,{children:"Restaurant Name *"}),(0,m.jsx)(R,{type:"text",placeholder:"Enter restaurant name",value:Ve.name,onChange:e=>qe({...Ve,name:e.target.value})})]}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,m.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,m.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===nn?"#F0EFFF":"#F9FAFB",border:"create"===nn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,m.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===nn,onChange:()=>{an("create"),hn(null)},style:{accentColor:"#635BFF"}}),(0,m.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===nn?"#F0EFFF":"#F9FAFB",border:"assign"===nn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,m.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===nn,onChange:()=>{an("assign"),rn({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,m.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]})]})]}),"create"===nn?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Admin Full Name *"}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Kim Owner",value:tn.fullName,onChange:e=>rn({...tn,fullName:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Admin Email *"}),(0,m.jsx)(R,{type:"email",placeholder:"admin@restaurant.com",value:tn.email,onChange:e=>rn({...tn,email:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Admin Username *"}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., kim_owner",value:tn.username,onChange:e=>rn({...tn,username:e.target.value})})]}),(0,m.jsxs)(z,{style:{gridColumn:"1 / -1"},children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.adminPhone")}),(0,m.jsx)(x.A,{value:tn.phone,onChange:e=>rn({...tn,phone:e}),defaultCountry:Ve.country})]})]}):(0,m.jsxs)(z,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,m.jsxs)($,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Type to search by name, email, or username...",value:jn,onChange:e=>Wn(e.target.value),onFocus:()=>Wn(jn),onBlur:()=>setTimeout(()=>vn(!1),200)}),(0,m.jsx)(W,{show:bn,children:0===mn.length?(0,m.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:jn.length>0?"No available users found":"Type to search users..."}):mn.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{hn(e),fn(e.full_name||e.username),vn(!1)})(e),children:[(0,m.jsx)(K,{children:e.full_name||e.username}),(0,m.jsxs)(V,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),gn&&(0,m.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:gn.full_name||gn.username}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[gn.email," \u2022 ",gn.role]})]}),(0,m.jsx)("button",{onClick:()=>{hn(null),fn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,m.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,m.jsxs)(z,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,m.jsxs)($,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Search and select oversight managers...",value:be,onChange:e=>(e=>{if(ve(e),Fe(!0),e.length<1)return void we(Je.slice(0,10));const n=Je.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));we(n.slice(0,10))})(e.target.value),onFocus:()=>{Fe(!0),we(Je.slice(0,10))},onBlur:()=>setTimeout(()=>Fe(!1),200)}),(0,m.jsx)(W,{show:Ce,children:Ae.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{Se.find(n=>n.id===e.id)||Be([...Se,e]),ve(""),Fe(!1)})(e),children:[(0,m.jsx)(K,{children:e.full_name||e.username}),(0,m.jsxs)(V,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Se.length>0&&(0,m.jsx)(q,{children:Se.map(e=>(0,m.jsxs)(J,{children:[e.full_name||e.username,(0,m.jsx)(G,{onClick:()=>{return n=e.id.toString(),void Be(Se.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Email Address *"}),(0,m.jsx)(R,{type:"email",placeholder:"restaurant@example.com",value:Ve.email,onChange:e=>qe({...Ve,email:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Phone Number *"}),(0,m.jsx)(x.A,{value:Ve.phone,onChange:e=>qe({...Ve,phone:e}),defaultCountry:Ve.country})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Address *"}),(0,m.jsx)(I,{placeholder:"Enter restaurant address",value:Ve.address,onChange:e=>qe({...Ve,address:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.city")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Ve.city,onChange:e=>qe({...Ve,city:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.stateProvince")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Selangor",value:Ve.state,onChange:e=>qe({...Ve,state:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.postalCode")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 50000",value:Ve.postalCode,onChange:e=>qe({...Ve,postalCode:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.country")}),(0,m.jsx)(T,{value:Ve.country,onChange:e=>{const n=e.target.value,a=u.xh[n]||Ve.currency,t=Qe.includes(a)?a:Ve.currency,r=He.find(e=>e.display_name===Ve.planType);qe({...Ve,country:n,currency:t,planAmount:r?String((0,u.jL)(r,t)):Ve.planAmount})},children:g.FS.map(e=>(0,m.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 123456-A",value:Ve.businessRegistration,onChange:e=>qe({...Ve,businessRegistration:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 000123456789",value:Ve.taxId,onChange:e=>qe({...Ve,taxId:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ve.cuisine,onChange:e=>qe({...Ve,cuisine:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Currency *"}),(0,m.jsx)(T,{value:Ve.currency,onChange:e=>{const n=e.target.value,a=He.find(e=>e.display_name===Ve.planType);qe({...Ve,currency:n,planAmount:a?String((0,u.jL)(a,n)):"0"})},children:Qe.map(e=>(0,m.jsxs)("option",{value:e,children:[e," (","0"===(0,u.vv)(0,e).charAt(0)?e:(0,u.vv)(0,e).split(" ")[0],")"]},e))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Plan Type *"}),(0,m.jsx)(T,{value:Ve.planType,onChange:e=>{const n=He.find(n=>n.display_name===e.target.value);qe({...Ve,planType:e.target.value,planAmount:n?String((0,u.jL)(n,Ve.currency)):"0"})},children:He.filter(e=>"restaurant"===e.plan_target).map(e=>(0,m.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,u.m9)(e,Ve.currency),"/month)"]},e.id))})]}),(0,m.jsx)(z,{style:{gridColumn:"1 / -1"},children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===Ve.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===Ve.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,m.jsx)("input",{type:"checkbox",checked:"trial"===Ve.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),qe({...Ve,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else qe({...Ve,status:"active",planAmount:String((0,u.jL)(He.find(e=>e.display_name===Ve.planType)||{},Ve.currency))})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,m.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,m.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Billing Cycle *"}),(0,m.jsxs)(T,{value:Ve.billingCycle,onChange:e=>{const n=e.target.value,a=He.find(e=>e.display_name===Ve.planType),t=a?(0,u.jL)(a,Ve.currency,n):0;qe({...Ve,billingCycle:n,planAmount:t.toFixed(2)})},children:[(0,m.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,m.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Payment Model *"}),(0,m.jsxs)(T,{value:Ve.paymentModel,onChange:e=>qe({...Ve,paymentModel:e.target.value}),children:[(0,m.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantAdmin")}),(0,m.jsx)("option",{value:"foodcourt_manager",children:e("admin:restaurantsPage.foodcourtManager")}),(0,m.jsx)("option",{value:"brand_manager",children:e("admin:restaurantsPage.brandManager")})]})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Subscription Start Date *"}),(0,m.jsx)(R,{type:"date",value:Ve.subscriptionStart,onChange:e=>qe({...Ve,subscriptionStart:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Subscription End Date *"}),(0,m.jsx)(R,{type:"date",value:Ve.subscriptionEnd,onChange:e=>qe({...Ve,subscriptionEnd:e.target.value})})]}),(0,m.jsx)(z,{style:{gridColumn:"1 / -1"},children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,m.jsx)("input",{type:"checkbox",checked:Ve.autoRenew,onChange:e=>qe({...Ve,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,m.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,m.jsx)("strong",{children:"Summary:"})}),(0,m.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ve.planType," - ",(0,u.vv)(parseFloat(Ve.planAmount)||0,Ve.currency||"MYR")," (",Ve.billingCycle,")"]}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Ve.paymentModel?"Brand Manager":"foodcourt_manager"===Ve.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),ce&&(0,m.jsx)(l.IM,{children:ce})]}),le&&ge&&(0,m.jsxs)(o.aF,{isOpen:!0,onClose:()=>de(!1),title:"Edit Restaurant",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i.cc,{variant:"cancel",onClick:()=>{xe(""),de(!1)},children:e("admin:restaurantsPage.cancel")}),(0,m.jsx)(i.cc,{variant:"danger-outline",onClick:()=>{return e=ge,de(!1),he(null),Le(e),void De(!0);var e},children:e("admin:restaurantsPage.delete")}),(0,m.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(ge)try{if(console.log("\ud83d\udd04 Updating restaurant:",ge),console.log("\ud83d\udd0d Selected edit managers:",Te),xe(""),!ge.name)return void xe("Please fill in all required fields.");if("create"===Cn){if(!An.fullName||!An.email||!An.username)return void xe("Please fill in all required new Admin fields.")}else if("change"===Cn&&!Sn)return void xe("Please select an existing user as new Admin.");const a={name:ge.name,managerIds:Te.map(e=>parseInt(e.id.toString())),email:ge.email||"",phone:ge.phone||"",address:ge.address||ge.location||"",location:ge.address||ge.location||"",city:ge.city||"",state:ge.state||"",postal_code:ge.postalCode||"",country:ge.country||"MY",business_registration:ge.businessRegistration||"",tax_id:ge.taxId||"",cuisine:ge.cuisine||"Various",status:ge.status,planType:ge.planType||"Basic Plan",planAmount:parseFloat(ge.planAmount||"49.00"),currency:(0,u.Wh)(ge.currency||"MYR"),billingCycle:ge.billingCycle||"monthly",payment_model:ge.paymentModel||"restaurant",autoRenew:ge.autoRenew||!0,subscriptionStart:ge.subscriptionStart,subscriptionEnd:ge.subscriptionEnd,discount_type:ge.discount_type||"none",discount_value:ge.discount_type&&"none"!==ge.discount_type&&ge.discount_value||0,discount_reason:ge.discount_reason||""};"create"===Cn?(a.adminAction="create",a.adminEmail=An.email,a.adminUsername=An.username,a.adminFullName=An.fullName,a.adminPhone=An.phone||void 0):"change"===Cn&&(a.adminAction="change",a.adminUserId=parseInt(Sn.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${ge.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant updated successfully:",e),xe(""),de(!1),he(null),await Un()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);xe(t)}}catch(a){console.error("\u274c Error updating restaurant:",a),xe("Error updating restaurant. Please check your connection and try again.")}},children:e("admin:restaurantsPage.updateRestaurant")})]}),children:[(0,m.jsxs)(P,{children:[(0,m.jsxs)(z,{style:{gridColumn:"1 / -1"},children:[(0,m.jsx)(_,{children:"Restaurant Name *"}),(0,m.jsx)(R,{type:"text",placeholder:"Enter restaurant name",value:ge.name,onChange:e=>he({...ge,name:e.target.value})})]}),(0,m.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,m.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),ge.admin?(0,m.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:ge.admin.name}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[ge.admin.email," ",ge.admin.phone?`\u2022 ${ge.admin.phone}`:""]})]}),"keep"===Cn&&(0,m.jsx)("button",{onClick:()=>Fn("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:e("admin:restaurantsPage.changeAdmin")})]})}):(0,m.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:e("admin:restaurantsPage.noRestaurantAdminAssigned")}),"keep"===Cn&&(0,m.jsx)("button",{onClick:()=>Fn("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:e("admin:restaurantsPage.assignAdmin")})]})}),"keep"!==Cn&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Cn?"#F0EFFF":"#F9FAFB",border:"create"===Cn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,m.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===Cn,onChange:()=>{Fn("create"),Bn(null)},style:{accentColor:"#635BFF"}}),(0,m.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===Cn?"#F0EFFF":"#F9FAFB",border:"change"===Cn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,m.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===Cn,onChange:()=>{Fn("change"),wn({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,m.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]}),(0,m.jsx)("button",{onClick:()=>Fn("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:e("admin:restaurantsPage.cancel")})]}),"create"===Cn?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"New Admin Full Name *"}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Kim Owner",value:An.fullName,onChange:e=>wn({...An,fullName:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"New Admin Email *"}),(0,m.jsx)(R,{type:"email",placeholder:"admin@restaurant.com",value:An.email,onChange:e=>wn({...An,email:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"New Admin Username *"}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., kim_owner",value:An.username,onChange:e=>wn({...An,username:e.target.value})})]})]}):(0,m.jsxs)(z,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,m.jsxs)($,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Type to search by name, email, or username...",value:kn,onChange:e=>Yn(e.target.value),onFocus:()=>Yn(kn),onBlur:()=>setTimeout(()=>zn(!1),200)}),(0,m.jsx)(W,{show:Pn,children:0===mn.length?(0,m.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:kn.length>0?"No available users found":"Type to search users..."}):mn.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{Bn(e),En(e.full_name||e.username),zn(!1)})(e),children:[(0,m.jsx)(K,{children:e.full_name||e.username}),(0,m.jsxs)(V,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Sn&&(0,m.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Sn.full_name||Sn.username}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Sn.email," \u2022 ",Sn.role]})]}),(0,m.jsx)("button",{onClick:()=>{Bn(null),En("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,m.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,m.jsxs)(z,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,m.jsxs)($,{children:[(0,m.jsx)(U,{type:"text",placeholder:"Search and select oversight managers...",value:ke,onChange:e=>(e=>{if(Ee(e),ze(!0),e.length<1)return void Re(Je.slice(0,10));const n=Je.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));Re(n.slice(0,10))})(e.target.value),onFocus:()=>{ze(!0),0===ke.length&&Re(Je.slice(0,10))},onBlur:()=>setTimeout(()=>ze(!1),200)}),(0,m.jsx)(W,{show:Pe,children:_e.map(e=>(0,m.jsxs)(Y,{onClick:()=>(e=>{Te.find(n=>n.id===e.id)||Ie([...Te,e]),Ee(""),ze(!1)})(e),children:[(0,m.jsx)(K,{children:e.full_name||e.username}),(0,m.jsxs)(V,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Te.length>0&&(0,m.jsx)(q,{children:Te.map(e=>(0,m.jsxs)(J,{children:[e.full_name||e.username,(0,m.jsx)(G,{onClick:()=>{return n=e.id.toString(),void Ie(Te.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Email Address *"}),(0,m.jsx)(R,{type:"email",placeholder:"restaurant@example.com",value:ge.email||"",onChange:e=>he({...ge,email:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Phone Number *"}),(0,m.jsx)(x.A,{value:ge.phone||"",onChange:e=>he({...ge,phone:e}),defaultCountry:ge.country})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Address *"}),(0,m.jsx)(I,{placeholder:"Enter restaurant address",value:ge.address||ge.location,onChange:e=>he({...ge,address:e.target.value,location:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.city")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ge.city||"",onChange:e=>he({...ge,city:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.stateProvince")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Selangor",value:ge.state||"",onChange:e=>he({...ge,state:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.postalCode")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 50000",value:ge.postalCode||"",onChange:e=>he({...ge,postalCode:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.country")}),(0,m.jsx)(T,{value:ge.country||"MY",onChange:e=>he({...ge,country:e.target.value}),children:g.FS.map(e=>(0,m.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 123456-A",value:ge.businessRegistration||"",onChange:e=>he({...ge,businessRegistration:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., 000123456789",value:ge.taxId||"",onChange:e=>he({...ge,taxId:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,m.jsx)(R,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ge.cuisine,onChange:e=>he({...ge,cuisine:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Currency *"}),(0,m.jsx)(T,{value:(0,u.Wh)(ge.currency||"MYR"),onChange:e=>{const n=e.target.value,a=He.find(e=>e.display_name===(ge.planType||"Basic Plan"));he({...ge,currency:n,planAmount:a?String((0,u.jL)(a,n)):ge.planAmount})},children:Qe.map(e=>(0,m.jsx)("option",{value:e,children:e},e))})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Plan Type *"}),(0,m.jsx)(T,{value:ge.planType||"Basic Plan",onChange:e=>{const n=He.find(n=>n.display_name===e.target.value),a=(0,u.Wh)(ge.currency||"MYR");he({...ge,planType:e.target.value,planAmount:n?String((0,u.jL)(n,a)):"0"})},children:He.filter(e=>"restaurant"===e.plan_target).map(e=>(0,m.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,u.m9)(e,(0,u.Wh)(ge.currency||"MYR")),"/month)"]},e.id))})]}),(0,m.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,m.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Billing Cycle *"}),(0,m.jsxs)(T,{value:ge.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a=He.find(e=>e.display_name===(ge.planType||"Basic Plan")),t=(0,u.Wh)(ge.currency||"MYR"),r=a?(0,u.jL)(a,t,n):0;he({...ge,billingCycle:n,planAmount:r.toFixed(2)})},children:[(0,m.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,m.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Payment Model *"}),(0,m.jsxs)(T,{value:ge.paymentModel||"restaurant",onChange:e=>he({...ge,paymentModel:e.target.value}),children:[(0,m.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantAdmin")}),(0,m.jsx)("option",{value:"foodcourt_manager",children:e("admin:restaurantsPage.foodcourtManager")}),(0,m.jsx)("option",{value:"brand_manager",children:e("admin:restaurantsPage.brandManager")})]})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Subscription Start Date *"}),(0,m.jsx)(R,{type:"date",value:ge.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>he({...ge,subscriptionStart:e.target.value})})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:"Subscription End Date *"}),(0,m.jsx)(R,{type:"date",value:ge.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>he({...ge,subscriptionEnd:e.target.value})})]}),(0,m.jsx)(z,{style:{gridColumn:"1 / -1"},children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,m.jsx)("input",{type:"checkbox",checked:ge.autoRenew||!0,onChange:e=>he({...ge,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,m.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"6px"},children:[(0,m.jsx)("h4",{style:{margin:0,fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:"Subscription Discount"}),(0,m.jsx)("p",{style:{margin:"4px 0 0",fontSize:"12px",color:"#6B7280"},children:"Applied automatically to System Admin subscription invoices"})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.discountType")}),(0,m.jsxs)(T,{value:ge.discount_type||"none",onChange:e=>he({...ge,discount_type:e.target.value,discount_value:"none"===e.target.value?0:ge.discount_value}),children:[(0,m.jsx)("option",{value:"none",children:e("admin:restaurantsPage.none")}),(0,m.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,m.jsx)("option",{value:"fixed",children:e("admin:restaurantsPage.fixedAmount")})]})]}),ge.discount_type&&"none"!==ge.discount_type&&(0,m.jsxs)(z,{children:[(0,m.jsxs)(_,{children:["Discount Value ","percentage"===ge.discount_type?"(%)":"(Amount)"]}),(0,m.jsx)(R,{type:"number",min:"0",max:"percentage"===ge.discount_type?"100":void 0,step:"0.01",value:ge.discount_value||"",onChange:e=>he({...ge,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===ge.discount_type?"e.g. 10":"e.g. 5.00"})]}),ge.discount_type&&"none"!==ge.discount_type&&(0,m.jsxs)(z,{style:{gridColumn:"1 / -1"},children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.discountReason")}),(0,m.jsx)(R,{type:"text",value:ge.discount_reason||"",onChange:e=>he({...ge,discount_reason:e.target.value}),placeholder:"e.g. Early bird discount, Loyalty discount"})]}),(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,m.jsx)("strong",{children:"Summary:"})}),(0,m.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ge.planType||"Basic Plan"," - ",(0,u.vv)(parseFloat(ge.planAmount||"0"),ge.currency||"MYR")," (",ge.billingCycle||"monthly",")",ge.discount_type&&"none"!==ge.discount_type&&(ge.discount_value||0)>0&&(0,m.jsxs)("span",{style:{color:"#15803D",fontSize:"14px",marginLeft:"8px"},children:["(-","percentage"===ge.discount_type?`${ge.discount_value}%`:(0,u.vv)(ge.discount_value||0,ge.currency||"MYR"),")"]})]}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===ge.paymentModel?"Brand Manager":"foodcourt_manager"===ge.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),pe&&(0,m.jsx)(l.IM,{children:pe})]}),je&&me&&(0,m.jsx)(o.aF,{isOpen:!0,onClose:()=>fe(!1),title:"Restaurant Details",size:"large",footer:(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(N,{onClick:()=>fe(!1),children:e("admin:restaurantsPage.close")})}),children:(0,m.jsxs)(P,{children:[(0,m.jsxs)(z,{style:{gridColumn:"1 / -1"},children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.restaurantName")}),(0,m.jsx)(R,{type:"text",value:me.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.restaurantAdmin")}),me.admin?(0,m.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,m.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:me.admin.name}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[me.admin.email," ",me.admin.phone?`\u2022 ${me.admin.phone}`:""]})]}):(0,m.jsx)(R,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.oversightManagers")}),(0,m.jsx)(I,{value:me.managers&&me.managers.length>0?me.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.emailAddress")}),(0,m.jsx)(R,{type:"email",value:me.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.phoneNumber")}),(0,m.jsx)(R,{type:"tel",value:(0,p.FI)(me.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.address")}),(0,m.jsx)(I,{value:me.address||me.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,m.jsx)(R,{type:"text",value:me.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.status")}),(0,m.jsx)(R,{type:"text",value:me.status?me.status.charAt(0).toUpperCase()+me.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.planType")}),(0,m.jsx)(R,{type:"text",value:me.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(z,{children:[(0,m.jsx)(_,{children:e("admin:restaurantsPage.createdDate")}),(0,m.jsx)(R,{type:"text",value:me.createdAt?new Date(me.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})}),(0,m.jsx)(d.A,{isOpen:Ne,title:"Delete Restaurant",message:`Are you sure you want to delete "${null===Me||void 0===Me?void 0:Me.name}"?\n\n\u2022 All orders, menu items, categories, and options will be deleted\n\u2022 All invoices and payment records will be deleted\n\u2022 All staff accounts linked to this restaurant will be disconnected\n\u2022 Kitchen stations, floor plans, and import history will be deleted\n\u2022 Activity logs will be preserved (restaurant reference cleared)\n\nThis action cannot be undone.`,onConfirm:async()=>{if(Me)try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${Me.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(a.ok)De(!1),Le(null),xe(""),de(!1),he(null),await Un();else{var e;const n=await a.json().catch(()=>({error:"Unknown error"}));let t="Please try again.";"string"===typeof n.error?t=n.error:null!==(e=n.error)&&void 0!==e&&e.message?t=n.error.message:n.message&&(t=n.message),De(!1),Le(null),xe(`Error deleting restaurant: ${t}`)}}catch(n){De(!1),Le(null),xe("Error deleting restaurant. Please check your connection and try again.")}},onCancel:()=>{De(!1),Le(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]}),sn&&(0,m.jsxs)(o.aF,{isOpen:!0,onClose:()=>on(!1),title:"Password Generated",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[cn&&(0,m.jsx)(i.cc,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(cn),xn(!0),setTimeout(()=>xn(!1),2e3)},children:pn?"Copied!":"Copy Password"}),(0,m.jsx)(i.cc,{onClick:()=>on(!1),children:e("admin:restaurantsPage.done")})]}),children:[(0,m.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[ln," Please share this password securely. They should change it after first login."]}),cn&&(0,m.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:e("admin:restaurantsPage.temporaryPassword")}),(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:cn})]}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:e("admin:restaurantsPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})})}},2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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
`},7617:(e,n,a)=>{a.d(n,{A:()=>x});a(9950);var t=a(7119),r=a(4752),s=a(9610),i=a(4414);const o=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,u=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=r.Ay.button`
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
`,x=e=>{let{isOpen:n,title:a,message:r,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return n?t.createPortal((0,i.jsx)(s.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(d,{children:a}),(0,i.jsx)(c,{children:r})]}),(0,i.jsxs)(u,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:g,children:m}),(0,i.jsx)(p,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}}}]);