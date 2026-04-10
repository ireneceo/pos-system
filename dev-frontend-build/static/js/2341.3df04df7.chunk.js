"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>X});var t=a(9950),r=a(4492),s=a(4752),i=a(3705),o=a(8409),l=a(9610),d=a(7617),c=a(9018),u=a(6038),p=a(2924),x=a(8666),g=a(2435),h=a(5030),m=a(9955),y=a(4414);const j=s.Ay.div`
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
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,b=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,v=s.Ay.div`
  flex: 1;
`,C=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,A=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"expired":return"#FEE2E2";case"trial":return"#FEF3C7";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"expired":case"suspended":return"#DC2626";case"trial":return"#D97706";default:return"#6B7280"}}};
`,w=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,S=s.Ay.div`
  text-align: center;
`,B=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,k=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,E=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,P=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,z=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,R=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,_=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,T=s.Ay.input`
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
`,I=s.Ay.select`
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
`,N=s.Ay.textarea`
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
`,D=s.Ay.button`
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
`,M=s.Ay.div`
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
`,L=s.Ay.input`
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
`,$=s.Ay.select`
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
`,O=s.Ay.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,U=s.Ay.div`
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
`,W=s.Ay.input`
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
`,Y=s.Ay.div`
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
`,K=s.Ay.div`
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
`,V=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,q=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,J=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,G=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,H=s.Ay.button`
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
`,Z=s.Ay.button`
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
`,Q=s.Ay.button`
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
`,X=()=>{const{t:e}=(0,h.Bd)("admin"),{operationSettings:n}=(0,c.Pj)(),[a]=(0,r.ok)(),s=(0,r.Zp)(),[X,ee]=(0,t.useState)([]),[ne,ae]=(0,t.useState)(""),[te,re]=(0,t.useState)("all"),[se,ie]=(0,t.useState)("all"),[oe,le]=(0,t.useState)(!1),[de,ce]=(0,t.useState)(!1),[ue,pe]=(0,t.useState)(""),[xe,ge]=(0,t.useState)(""),[he,me]=(0,t.useState)(null),[ye,je]=(0,t.useState)(null),[fe,be]=(0,t.useState)(!1),[ve,Ce]=(0,t.useState)(""),[Fe,Ae]=(0,t.useState)(!1),[we,Se]=(0,t.useState)([]),[Be,ke]=(0,t.useState)([]),[Ee,Pe]=(0,t.useState)(""),[ze,Re]=(0,t.useState)(!1),[_e,Te]=(0,t.useState)([]),[Ie,Ne]=(0,t.useState)([]),[De,Me]=(0,t.useState)(!1),[Le,$e]=(0,t.useState)(null),[Oe,Ue]=(0,t.useState)(""),[We,Ye]=(0,t.useState)(!1),[Ke,Ve]=(0,t.useState)([]),[qe,Je]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[Ge,He]=(0,t.useState)([]),[Ze,Qe]=(0,t.useState)([]),Xe=(0,t.useMemo)(()=>(0,u.vL)(Ze),[Ze]),[en,nn]=(0,t.useState)([]),[an,tn]=(0,t.useState)("create"),[rn,sn]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[on,ln]=(0,t.useState)(!1),[dn,cn]=(0,t.useState)(""),[un,pn]=(0,t.useState)(""),[xn,gn]=(0,t.useState)(!1),[hn,mn]=(0,t.useState)(null),[yn,jn]=(0,t.useState)([]),[fn,bn]=(0,t.useState)(""),[vn,Cn]=(0,t.useState)(!1),[Fn,An]=(0,t.useState)("keep"),[wn,Sn]=(0,t.useState)({fullName:"",email:"",username:"",phone:""}),[Bn,kn]=(0,t.useState)(null),[En,Pn]=(0,t.useState)(""),[zn,Rn]=(0,t.useState)(!1),[_n,Tn]=(0,t.useState)("all"),[In,Nn]=(0,t.useState)(""),[Dn,Mn]=(0,t.useState)(!1),[Ln,$n]=(0,t.useState)([]);(0,t.useEffect)(()=>{Promise.all([Wn(),Un(),On()]);const e=a.get("managerId"),n=a.get("managerName");e&&n&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:n}),ie(e),Ue(decodeURIComponent(n)));const t=a.get("brandId"),r=a.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),Tn(t),Nn(decodeURIComponent(r)))},[]);const On=async()=>{try{const e=(0,m.c4)(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();nn(e)}}catch(e){console.error("Error fetching brands:",e)}},Un=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(Qe(n),n.length>0){const e=n[0];Je(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},Wn=async()=>{try{const e=(0,m.c4)(),n=e?{Authorization:`Bearer ${e}`}:{},[a,t]=await Promise.all([fetch("/api/restaurants",{headers:n}),fetch("/api/users?role=Manager",{headers:n})]);if(a.ok){const e=await a.json(),n=t.ok?await t.json():[],r=e.data||e,s=n.data||n,i=Array.isArray(r)?r:[],o=Array.isArray(s)?s:[];He(o);const l=i.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||e.billing_cycle||"monthly",autoRenew:void 0!==e.autoRenew?e.autoRenew:void 0===e.auto_renew||e.auto_renew,discount_type:e.discount_type||"none",discount_value:e.discount_value||0,discount_reason:e.discount_reason||""}});console.log("\u2705 Formatted restaurants:",l),console.log("\u2705 Setting restaurants state with",l.length,"restaurants"),ee(l)}else console.error("\u274c Failed to fetch restaurants data"),ee([]),He([])}catch(e){console.error("\u274c Error fetching restaurants:",e),ee([]),He([])}},Yn=async e=>{bn(e),Cn(!0);try{const n=(0,m.c4)(),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();jn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Kn=async e=>{Pn(e),Rn(!0);try{const n=(0,m.c4)(),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();jn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Vn=X.filter(e=>{const n=e.name.toLowerCase().includes(ne.toLowerCase())||e.managerName.toLowerCase().includes(ne.toLowerCase())||e.cuisine.toLowerCase().includes(ne.toLowerCase()),a="all"===te||e.status===te,t=e.managerId===se,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===se),s="all"===se||t||r,i="all"===_n||e.brand_id&&e.brand_id.toString()===_n;return"all"!==se&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:se,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&i});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:X.length,filteredRestaurants:Vn.length,searchTerm:ne,filterStatus:te,filterManager:se,restaurants:X.slice(0,2)});const qn=X.length,Jn=X.filter(e=>"active"===e.status).length,Gn=X.reduce((e,n)=>e+n.todaySales,0),Hn=X.reduce((e,n)=>e+n.todayOrders,0),Zn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,y.jsx)(P,{filled:a<=e,children:"\u2605"},a));return n},Qn=Array.from(new Set(X.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:X.length,filteredCount:Vn.length,managersCount:Ge.length,uniqueManagersCount:Qn.length,firstRestaurant:X[0],firstFiltered:Vn[0]}),(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(o.mc,{children:[(0,y.jsxs)(o.Y9,{children:[(0,y.jsx)(o.hE,{children:e("admin:restaurantsPage.restaurants")}),(0,y.jsxs)(o.ex,{children:[(0,y.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Vn.map(e=>({"Restaurant Name":e.name,Manager:e.managerName,Location:e.location,Cuisine:e.cuisine,Status:e.status,Rating:e.rating,"Today Sales":(0,u.vv)(e.todaySales,n.currency),"Today Orders":e.todayOrders,"Staff Count":e.staffCount,Phone:e.phone,Email:e.email,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:e("admin:restaurantsPage.export")}),(0,y.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=Ze.length>0?Ze[0]:null;Je({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?String((0,u.jL)(n,"MYR")):"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),Ce(""),Se([]),Ae(!1),ke([]),tn("create"),sn({fullName:"",email:"",username:"",phone:""}),mn(null),jn([]),bn(""),Cn(!1),le(!0)},children:e("admin:restaurantsPage.addRestaurant")})]})]}),(0,y.jsxs)(o.UC,{children:[(0,y.jsxs)(o.MD,{children:[(0,y.jsxs)(o.hI,{color:"#059669",children:[(0,y.jsx)(o.Os,{children:qn}),(0,y.jsx)(o.v0,{children:e("admin:restaurantsPage.totalRestaurants")}),(0,y.jsx)(o.d1,{children:e("admin:restaurantsPage.acrossAllManagers")})]}),(0,y.jsxs)(o.hI,{color:"#2563EB",children:[(0,y.jsx)(o.Os,{children:Jn}),(0,y.jsx)(o.v0,{children:e("admin:restaurantsPage.activeRestaurants")}),(0,y.jsxs)(o.d1,{children:[qn>0?Math.round(Jn/qn*100):0,"% operational"]})]}),(0,y.jsxs)(o.hI,{color:"#7C3AED",children:[(0,y.jsx)(o.Os,{children:(0,u.vv)(Gn,n.currency)}),(0,y.jsx)(o.v0,{children:e("admin:restaurantsPage.todaysTotalSales")}),(0,y.jsx)(o.d1,{children:e("admin:restaurantsPage.combinedRevenue")})]}),(0,y.jsxs)(o.hI,{color:"#D97706",children:[(0,y.jsx)(o.Os,{children:Hn}),(0,y.jsx)(o.v0,{children:e("admin:restaurantsPage.todaysOrders")}),(0,y.jsx)(o.d1,{children:e("admin:restaurantsPage.allRestaurants")})]})]}),(0,y.jsxs)(M,{children:[(0,y.jsxs)(U,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Search managers...",value:Oe,onChange:e=>(e=>{if(Ue(e),Ye(!0),e.length<1)return void Ve(Ge.slice(0,10));const n=Ge.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Ve(n)})(e.target.value),onFocus:()=>{Ye(!0),0===Oe.length&&Ve(Ge.slice(0,10))},onBlur:()=>setTimeout(()=>Ye(!1),200)}),"all"!==se&&Oe&&(0,y.jsx)(Z,{onClick:()=>{ie("all"),Ue(""),Ye(!1)},children:"\xd7"}),(0,y.jsxs)(Y,{show:We,children:[(0,y.jsxs)(K,{onClick:()=>{ie("all"),Ue(""),Ye(!1)},children:[(0,y.jsx)(V,{children:e("admin:restaurantsPage.allManagers")}),(0,y.jsx)(q,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),Ke.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{ie(e.id.toString()),Ue(e.full_name||e.username),Ye(!1)})(e),children:[(0,y.jsx)(V,{children:e.full_name||e.username}),(0,y.jsxs)(q,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,y.jsxs)(U,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Search brands...",value:In,onChange:e=>(e=>{if(Nn(e),Mn(!0),e.length<1)return void $n(en.slice(0,10));const n=en.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);$n(n)})(e.target.value),onFocus:()=>{Mn(!0),0===In.length&&$n(en.slice(0,10))},onBlur:()=>setTimeout(()=>Mn(!1),200)}),"all"!==_n&&In&&(0,y.jsx)(Z,{onClick:()=>{Tn("all"),Nn(""),Mn(!1),s("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,y.jsxs)(Y,{show:Dn,children:[(0,y.jsxs)(K,{onClick:()=>{Tn("all"),Nn(""),Mn(!1),s("/pos/admin/restaurants",{replace:!0})},children:[(0,y.jsx)(V,{children:e("admin:restaurantsPage.allBrands")}),(0,y.jsx)(q,{children:e("admin:restaurantsPage.showAllRestaurants")})]}),Ln.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{Tn(e.id.toString()),Nn(e.name),Mn(!1)})(e),children:[(0,y.jsx)(V,{children:e.name}),(0,y.jsxs)(q,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,y.jsxs)($,{value:te,onChange:e=>re(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:e("admin:restaurantsPage.allStatus")}),(0,y.jsx)("option",{value:"active",children:e("admin:restaurantsPage.active")}),(0,y.jsx)("option",{value:"inactive",children:e("admin:restaurantsPage.inactive")}),(0,y.jsx)("option",{value:"trial",children:e("admin:restaurantsPage.trial")}),(0,y.jsx)("option",{value:"expired",children:e("admin:restaurantsPage.expired")}),(0,y.jsx)("option",{value:"suspended",children:e("admin:restaurantsPage.suspended")}),(0,y.jsx)("option",{value:"cancelled",children:e("admin:restaurantsPage.cancelled")})]}),(0,y.jsx)(L,{placeholder:"Search restaurants...",value:ne,onChange:e=>ae(e.target.value)})]}),(0,y.jsx)(j,{children:0===Vn.length?(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===X.length?"Loading restaurants...":"No restaurants found matching your criteria.",(0,y.jsx)("br",{}),(0,y.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",X.length," | Filtered: ",Vn.length]})]}):Vn.map(a=>(0,y.jsxs)(f,{children:[(0,y.jsxs)(b,{children:[(0,y.jsxs)(v,{children:[(0,y.jsxs)(C,{children:[a.name," ",a.currency&&(0,y.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a.currency}),a.is_demo&&(0,y.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e("admin:restaurantsPage.demo")}),a.is_test&&(0,y.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e("admin:restaurantsPage.test")})]}),(0,y.jsxs)(F,{children:["Admin: ",a.admin?`${a.admin.name} (${a.admin.email})`:"No Admin Assigned"]}),a.managers&&a.managers.length>0&&(0,y.jsxs)(F,{children:["Managers: ",a.managers.map(e=>e.name).join(", ")]}),(0,y.jsxs)(F,{children:[a.location," \u2022 ",a.cuisine]})]}),(0,y.jsx)(A,{status:a.status,children:a.status})]}),(0,y.jsxs)(E,{children:[Zn(a.rating),(0,y.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[a.rating," \u2022 Created: ",new Date(a.createdAt).toLocaleDateString()]})]}),(0,y.jsxs)(w,{children:[(0,y.jsxs)(S,{children:[(0,y.jsx)(B,{children:(0,u.vv)(a.todaySales,n.currency)}),(0,y.jsx)(k,{children:e("admin:restaurantsPage.todaysSales")})]}),(0,y.jsxs)(S,{children:[(0,y.jsx)(B,{children:a.todayOrders}),(0,y.jsx)(k,{children:e("admin:restaurantsPage.orders")})]}),(0,y.jsxs)(S,{children:[(0,y.jsx)(B,{children:a.staffCount}),(0,y.jsx)(k,{children:e("admin:restaurantsPage.staff")})]})]}),(0,y.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,y.jsx)(Q,{onClick:()=>(e=>{je(e),be(!0)})(a),children:"View"}),(0,y.jsx)(D,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),s(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(a),children:"Report"}),(0,y.jsx)(D,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",Ge);const n=Ze.length>0?Ze[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=(0,u.Wh)(e.currency||"MYR"),r=e.planAmount||(n?String((0,u.jL)(n,t)):"49.00"),s={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:r,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(me(s),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=Ge.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Ne(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=Ge.find(n=>n.id.toString()===e.managerId.toString());Ne(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Ne([]);Pe(""),Te([]),Re(!1),An("keep"),Sn({fullName:"",email:"",username:"",phone:""}),kn(null),Pn(""),Rn(!1),ce(!0)})(a),children:"Edit"}),("suspended"===a.status||"overdue"===a.status)&&(0,y.jsx)(D,{onClick:()=>(async e=>{try{const n=(0,m.c4)(),a=await fetch(`/api/restaurants/${e.id}/restore-subscription`,{method:"POST",headers:{Authorization:`Bearer ${n}`}}),t=await a.json();t.success?await Wn():ge(t.message||"Failed to restore subscription")}catch(n){console.error("Error restoring subscription:",n)}})(a),style:{background:"#EFF6FF",color:"#2563EB",border:"1px solid #93C5FD"},children:"Restore"}),(0,y.jsx)(D,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=(0,m.c4)(),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)ee(X.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(a),style:{background:"active"===a.status?"#FEE2E2":"#ECFDF5",color:"active"===a.status?"#DC2626":"#059669",border:"1px solid "+("active"===a.status?"#FCA5A5":"#A7F3D0")},children:"active"===a.status?"Deactivate":"Activate"})]})]},a.id))}),oe&&(0,y.jsxs)(o.aF,{isOpen:!0,onClose:()=>le(!1),title:"Add Restaurant",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(i.cc,{variant:"cancel",onClick:()=>{pe(""),le(!1)},children:e("admin:restaurantsPage.cancel")}),(0,y.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",qe),console.log("Selected managers:",Be),pe(""),!qe.name||!qe.email||!qe.phone||!qe.address)return void pe("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===an){if(!rn.fullName||!rn.email||!rn.username)return void pe("Please fill in all required Restaurant Admin fields (Full Name, Email, Username).")}else if("assign"===an&&!hn)return void pe("Please select an existing user as Restaurant Admin.");const a={name:qe.name,adminAction:an,managerIds:Be.map(e=>parseInt(e.id.toString())),email:qe.email,phone:qe.phone,address:qe.address,city:qe.city,state:qe.state,postal_code:qe.postalCode,country:qe.country,business_registration:qe.businessRegistration,tax_id:qe.taxId,location:qe.address,cuisine:qe.cuisine||"Various",status:qe.status,planType:qe.planType,planAmount:parseFloat(qe.planAmount),currency:qe.currency,billingCycle:qe.billingCycle,payment_model:qe.paymentModel,autoRenew:qe.autoRenew,subscriptionStart:qe.subscriptionStart,subscriptionEnd:qe.subscriptionEnd};"create"===an?(a.adminEmail=rn.email,a.adminUsername=rn.username,a.adminFullName=rn.fullName,a.adminPhone=rn.phone||void 0):"assign"===an&&(a.adminUserId=parseInt(hn.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const t=(0,m.c4)(),r=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant created successfully:",e),pe(""),le(!1),e.generatedPassword&&(cn("Restaurant Admin created successfully."),pn(e.generatedPassword),gn(!1),ln(!0)),await Wn()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);pe(t)}}catch(a){console.error("\u274c Error adding restaurant:",a),pe("Error adding restaurant. Please check your connection and try again.")}},children:e("admin:restaurantsPage.addRestaurant")})]}),children:[(0,y.jsxs)(z,{children:[(0,y.jsxs)(R,{style:{gridColumn:"1 / -1"},children:[(0,y.jsx)(_,{children:"Restaurant Name *"}),(0,y.jsx)(T,{type:"text",placeholder:"Enter restaurant name",value:qe.name,onChange:e=>Je({...qe,name:e.target.value})})]}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,y.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,y.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===an?"#F0EFFF":"#F9FAFB",border:"create"===an?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,y.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===an,onChange:()=>{tn("create"),mn(null)},style:{accentColor:"#635BFF"}}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===an?"#F0EFFF":"#F9FAFB",border:"assign"===an?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,y.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===an,onChange:()=>{tn("assign"),sn({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]})]})]}),"create"===an?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Admin Full Name *"}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Kim Owner",value:rn.fullName,onChange:e=>sn({...rn,fullName:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Admin Email *"}),(0,y.jsx)(T,{type:"email",placeholder:"admin@restaurant.com",value:rn.email,onChange:e=>sn({...rn,email:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Admin Username *"}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., kim_owner",value:rn.username,onChange:e=>sn({...rn,username:e.target.value})})]}),(0,y.jsxs)(R,{style:{gridColumn:"1 / -1"},children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.adminPhone")}),(0,y.jsx)(x.A,{value:rn.phone,onChange:e=>sn({...rn,phone:e}),defaultCountry:qe.country})]})]}):(0,y.jsxs)(R,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,y.jsxs)(O,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Type to search by name, email, or username...",value:fn,onChange:e=>Yn(e.target.value),onFocus:()=>Yn(fn),onBlur:()=>setTimeout(()=>Cn(!1),200)}),(0,y.jsx)(Y,{show:vn,children:0===yn.length?(0,y.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:fn.length>0?"No available users found":"Type to search users..."}):yn.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{mn(e),bn(e.full_name||e.username),Cn(!1)})(e),children:[(0,y.jsx)(V,{children:e.full_name||e.username}),(0,y.jsxs)(q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),hn&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:hn.full_name||hn.username}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[hn.email," \u2022 ",hn.role]})]}),(0,y.jsx)("button",{onClick:()=>{mn(null),bn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,y.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,y.jsxs)(R,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Search and select oversight managers...",value:ve,onChange:e=>(e=>{if(Ce(e),Ae(!0),e.length<1)return void Se(Ge.slice(0,10));const n=Ge.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));Se(n.slice(0,10))})(e.target.value),onFocus:()=>{Ae(!0),Se(Ge.slice(0,10))},onBlur:()=>setTimeout(()=>Ae(!1),200)}),(0,y.jsx)(Y,{show:Fe,children:we.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{Be.find(n=>n.id===e.id)||ke([...Be,e]),Ce(""),Ae(!1)})(e),children:[(0,y.jsx)(V,{children:e.full_name||e.username}),(0,y.jsxs)(q,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Be.length>0&&(0,y.jsx)(J,{children:Be.map(e=>(0,y.jsxs)(G,{children:[e.full_name||e.username,(0,y.jsx)(H,{onClick:()=>{return n=e.id.toString(),void ke(Be.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Email Address *"}),(0,y.jsx)(T,{type:"email",placeholder:"restaurant@example.com",value:qe.email,onChange:e=>Je({...qe,email:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Phone Number *"}),(0,y.jsx)(x.A,{value:qe.phone,onChange:e=>Je({...qe,phone:e}),defaultCountry:qe.country})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Address *"}),(0,y.jsx)(N,{placeholder:"Enter restaurant address",value:qe.address,onChange:e=>Je({...qe,address:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.city")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Kuala Lumpur",value:qe.city,onChange:e=>Je({...qe,city:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.stateProvince")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Selangor",value:qe.state,onChange:e=>Je({...qe,state:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.postalCode")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 50000",value:qe.postalCode,onChange:e=>Je({...qe,postalCode:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.country")}),(0,y.jsx)(I,{value:qe.country,onChange:e=>{const n=e.target.value,a=u.xh[n]||qe.currency,t=Xe.includes(a)?a:qe.currency,r=Ze.find(e=>e.display_name===qe.planType);Je({...qe,country:n,currency:t,planAmount:r?String((0,u.jL)(r,t)):qe.planAmount})},children:g.FS.map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 123456-A",value:qe.businessRegistration,onChange:e=>Je({...qe,businessRegistration:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 000123456789",value:qe.taxId,onChange:e=>Je({...qe,taxId:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:qe.cuisine,onChange:e=>Je({...qe,cuisine:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Currency *"}),(0,y.jsx)(I,{value:qe.currency,onChange:e=>{const n=e.target.value,a=Ze.find(e=>e.display_name===qe.planType);Je({...qe,currency:n,planAmount:a?String((0,u.jL)(a,n)):"0"})},children:Xe.map(e=>(0,y.jsxs)("option",{value:e,children:[e," (","0"===(0,u.vv)(0,e).charAt(0)?e:(0,u.vv)(0,e).split(" ")[0],")"]},e))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Plan Type *"}),(0,y.jsx)(I,{value:qe.planType,onChange:e=>{const n=Ze.find(n=>n.display_name===e.target.value);Je({...qe,planType:e.target.value,planAmount:n?String((0,u.jL)(n,qe.currency)):"0"})},children:Ze.filter(e=>"restaurant"===e.plan_target).map(e=>(0,y.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,u.m9)(e,qe.currency),"/month)"]},e.id))})]}),(0,y.jsx)(R,{style:{gridColumn:"1 / -1"},children:(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===qe.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===qe.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,y.jsx)("input",{type:"checkbox",checked:"trial"===qe.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),Je({...qe,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else Je({...qe,status:"active",planAmount:String((0,u.jL)(Ze.find(e=>e.display_name===qe.planType)||{},qe.currency))})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,y.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,y.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Billing Cycle *"}),(0,y.jsxs)(I,{value:qe.billingCycle,onChange:e=>{const n=e.target.value,a=Ze.find(e=>e.display_name===qe.planType),t=a?(0,u.jL)(a,qe.currency,n):0;Je({...qe,billingCycle:n,planAmount:t.toFixed(2)})},children:[(0,y.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,y.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Payment Model *"}),(0,y.jsxs)(I,{value:qe.paymentModel,onChange:e=>Je({...qe,paymentModel:e.target.value}),children:[(0,y.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantAdmin")}),(0,y.jsx)("option",{value:"foodcourt_manager",children:e("admin:restaurantsPage.foodcourtManager")}),(0,y.jsx)("option",{value:"brand_manager",children:e("admin:restaurantsPage.brandManager")})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Subscription Start Date *"}),(0,y.jsx)(T,{type:"date",value:qe.subscriptionStart,onChange:e=>Je({...qe,subscriptionStart:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Subscription End Date *"}),(0,y.jsx)(T,{type:"date",value:qe.subscriptionEnd,onChange:e=>Je({...qe,subscriptionEnd:e.target.value})})]}),(0,y.jsx)(R,{style:{gridColumn:"1 / -1"},children:(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,y.jsx)("input",{type:"checkbox",checked:qe.autoRenew,onChange:e=>Je({...qe,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,y.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,y.jsx)("strong",{children:"Summary:"})}),(0,y.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[qe.planType," - ",(0,u.vv)(parseFloat(qe.planAmount)||0,qe.currency||"MYR")," (",qe.billingCycle,")"]}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===qe.paymentModel?"Brand Manager":"foodcourt_manager"===qe.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),ue&&(0,y.jsx)(l.IM,{children:ue})]}),de&&he&&(0,y.jsxs)(o.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Edit Restaurant",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(i.cc,{variant:"cancel",onClick:()=>{ge(""),ce(!1)},children:e("admin:restaurantsPage.cancel")}),(0,y.jsx)(i.cc,{variant:"danger-outline",onClick:()=>{return e=he,ce(!1),me(null),$e(e),void Me(!0);var e},children:e("admin:restaurantsPage.delete")}),(0,y.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(he)try{if(console.log("\ud83d\udd04 Updating restaurant:",he),console.log("\ud83d\udd0d Selected edit managers:",Ie),ge(""),!he.name)return void ge("Please fill in all required fields.");if("create"===Fn){if(!wn.fullName||!wn.email||!wn.username)return void ge("Please fill in all required new Admin fields.")}else if("change"===Fn&&!Bn)return void ge("Please select an existing user as new Admin.");const a={name:he.name,managerIds:Ie.map(e=>parseInt(e.id.toString())),email:he.email||"",phone:he.phone||"",address:he.address||he.location||"",location:he.address||he.location||"",city:he.city||"",state:he.state||"",postal_code:he.postalCode||"",country:he.country||"MY",business_registration:he.businessRegistration||"",tax_id:he.taxId||"",cuisine:he.cuisine||"Various",status:he.status,planType:he.planType||"Basic Plan",planAmount:parseFloat(he.planAmount||"49.00"),currency:(0,u.Wh)(he.currency||"MYR"),billingCycle:he.billingCycle||"monthly",payment_model:he.paymentModel||"restaurant",autoRenew:he.autoRenew||!0,subscriptionStart:he.subscriptionStart,subscriptionEnd:he.subscriptionEnd,discount_type:he.discount_type||"none",discount_value:he.discount_type&&"none"!==he.discount_type&&he.discount_value||0,discount_reason:he.discount_reason||""};"create"===Fn?(a.adminAction="create",a.adminEmail=wn.email,a.adminUsername=wn.username,a.adminFullName=wn.fullName,a.adminPhone=wn.phone||void 0):"change"===Fn&&(a.adminAction="change",a.adminUserId=parseInt(Bn.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const t=(0,m.c4)(),r=await fetch(`/api/restaurants/${he.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant updated successfully:",e),ge(""),ce(!1),me(null),await Wn()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);ge(t)}}catch(a){console.error("\u274c Error updating restaurant:",a),ge("Error updating restaurant. Please check your connection and try again.")}},children:e("admin:restaurantsPage.updateRestaurant")})]}),children:[(0,y.jsxs)(z,{children:[(0,y.jsxs)(R,{style:{gridColumn:"1 / -1"},children:[(0,y.jsx)(_,{children:"Restaurant Name *"}),(0,y.jsx)(T,{type:"text",placeholder:"Enter restaurant name",value:he.name,onChange:e=>me({...he,name:e.target.value})})]}),(0,y.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,y.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),he.admin?(0,y.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:he.admin.name}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[he.admin.email," ",he.admin.phone?`\u2022 ${he.admin.phone}`:""]})]}),"keep"===Fn&&(0,y.jsx)("button",{onClick:()=>An("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:e("admin:restaurantsPage.changeAdmin")})]})}):(0,y.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:e("admin:restaurantsPage.noRestaurantAdminAssigned")}),"keep"===Fn&&(0,y.jsx)("button",{onClick:()=>An("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:e("admin:restaurantsPage.assignAdmin")})]})}),"keep"!==Fn&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Fn?"#F0EFFF":"#F9FAFB",border:"create"===Fn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,y.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===Fn,onChange:()=>{An("create"),kn(null)},style:{accentColor:"#635BFF"}}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.createNewAccount")})]}),(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===Fn?"#F0EFFF":"#F9FAFB",border:"change"===Fn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,y.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===Fn,onChange:()=>{An("change"),Sn({fullName:"",email:"",username:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:e("admin:restaurantsPage.selectExistingUser")})]}),(0,y.jsx)("button",{onClick:()=>An("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:e("admin:restaurantsPage.cancel")})]}),"create"===Fn?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"New Admin Full Name *"}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Kim Owner",value:wn.fullName,onChange:e=>Sn({...wn,fullName:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"New Admin Email *"}),(0,y.jsx)(T,{type:"email",placeholder:"admin@restaurant.com",value:wn.email,onChange:e=>Sn({...wn,email:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"New Admin Username *"}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., kim_owner",value:wn.username,onChange:e=>Sn({...wn,username:e.target.value})})]})]}):(0,y.jsxs)(R,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.searchAndSelectAnExistingUser")}),(0,y.jsxs)(O,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Type to search by name, email, or username...",value:En,onChange:e=>Kn(e.target.value),onFocus:()=>Kn(En),onBlur:()=>setTimeout(()=>Rn(!1),200)}),(0,y.jsx)(Y,{show:zn,children:0===yn.length?(0,y.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:En.length>0?"No available users found":"Type to search users..."}):yn.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{kn(e),Pn(e.full_name||e.username),Rn(!1)})(e),children:[(0,y.jsx)(V,{children:e.full_name||e.username}),(0,y.jsxs)(q,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),Bn&&(0,y.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Bn.full_name||Bn.username}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Bn.email," \u2022 ",Bn.role]})]}),(0,y.jsx)("button",{onClick:()=>{kn(null),Pn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,y.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,y.jsxs)(R,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(W,{type:"text",placeholder:"Search and select oversight managers...",value:Ee,onChange:e=>(e=>{if(Pe(e),Re(!0),e.length<1)return void Te(Ge.slice(0,10));const n=Ge.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));Te(n.slice(0,10))})(e.target.value),onFocus:()=>{Re(!0),0===Ee.length&&Te(Ge.slice(0,10))},onBlur:()=>setTimeout(()=>Re(!1),200)}),(0,y.jsx)(Y,{show:ze,children:_e.map(e=>(0,y.jsxs)(K,{onClick:()=>(e=>{Ie.find(n=>n.id===e.id)||Ne([...Ie,e]),Pe(""),Re(!1)})(e),children:[(0,y.jsx)(V,{children:e.full_name||e.username}),(0,y.jsxs)(q,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Ie.length>0&&(0,y.jsx)(J,{children:Ie.map(e=>(0,y.jsxs)(G,{children:[e.full_name||e.username,(0,y.jsx)(H,{onClick:()=>{return n=e.id.toString(),void Ne(Ie.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Email Address *"}),(0,y.jsx)(T,{type:"email",placeholder:"restaurant@example.com",value:he.email||"",onChange:e=>me({...he,email:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Phone Number *"}),(0,y.jsx)(x.A,{value:he.phone||"",onChange:e=>me({...he,phone:e}),defaultCountry:he.country})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Address *"}),(0,y.jsx)(N,{placeholder:"Enter restaurant address",value:he.address||he.location,onChange:e=>me({...he,address:e.target.value,location:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.city")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Kuala Lumpur",value:he.city||"",onChange:e=>me({...he,city:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.stateProvince")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Selangor",value:he.state||"",onChange:e=>me({...he,state:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.postalCode")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 50000",value:he.postalCode||"",onChange:e=>me({...he,postalCode:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.country")}),(0,y.jsx)(I,{value:he.country||"MY",onChange:e=>me({...he,country:e.target.value}),children:g.FS.map(e=>(0,y.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.businessRegistrationNo")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 123456-A",value:he.businessRegistration||"",onChange:e=>me({...he,businessRegistration:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.taxIdGstNo")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., 000123456789",value:he.taxId||"",onChange:e=>me({...he,taxId:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,y.jsx)(T,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:he.cuisine,onChange:e=>me({...he,cuisine:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Currency *"}),(0,y.jsx)(I,{value:(0,u.Wh)(he.currency||"MYR"),onChange:e=>{const n=e.target.value,a=Ze.find(e=>e.display_name===(he.planType||"Basic Plan"));me({...he,currency:n,planAmount:a?String((0,u.jL)(a,n)):he.planAmount})},children:Xe.map(e=>(0,y.jsx)("option",{value:e,children:e},e))})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Plan Type *"}),(0,y.jsx)(I,{value:he.planType||"Basic Plan",onChange:e=>{const n=Ze.find(n=>n.display_name===e.target.value),a=(0,u.Wh)(he.currency||"MYR");me({...he,planType:e.target.value,planAmount:n?String((0,u.jL)(n,a)):"0"})},children:Ze.filter(e=>"restaurant"===e.plan_target).map(e=>(0,y.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,u.m9)(e,(0,u.Wh)(he.currency||"MYR")),"/month)"]},e.id))})]}),(0,y.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,y.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Billing Cycle *"}),(0,y.jsxs)(I,{value:he.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a=Ze.find(e=>e.display_name===(he.planType||"Basic Plan")),t=(0,u.Wh)(he.currency||"MYR"),r=a?(0,u.jL)(a,t,n):0;me({...he,billingCycle:n,planAmount:r.toFixed(2)})},children:[(0,y.jsx)("option",{value:"monthly",children:e("admin:restaurantsPage.monthly")}),(0,y.jsx)("option",{value:"annual",children:e("admin:restaurantsPage.annual")})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Payment Model *"}),(0,y.jsxs)(I,{value:he.paymentModel||"restaurant",onChange:e=>me({...he,paymentModel:e.target.value}),children:[(0,y.jsx)("option",{value:"restaurant",children:e("admin:restaurantsPage.restaurantAdmin")}),(0,y.jsx)("option",{value:"foodcourt_manager",children:e("admin:restaurantsPage.foodcourtManager")}),(0,y.jsx)("option",{value:"brand_manager",children:e("admin:restaurantsPage.brandManager")})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Subscription Start Date *"}),(0,y.jsx)(T,{type:"date",value:he.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>me({...he,subscriptionStart:e.target.value})})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:"Subscription End Date *"}),(0,y.jsx)(T,{type:"date",value:he.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>me({...he,subscriptionEnd:e.target.value})})]}),(0,y.jsx)(R,{style:{gridColumn:"1 / -1"},children:(0,y.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,y.jsx)("input",{type:"checkbox",checked:he.autoRenew||!0,onChange:e=>me({...he,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,y.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"6px"},children:[(0,y.jsx)("h4",{style:{margin:0,fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:"Subscription Discount"}),(0,y.jsx)("p",{style:{margin:"4px 0 0",fontSize:"12px",color:"#6B7280"},children:"Applied automatically to System Admin subscription invoices"})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.discountType")}),(0,y.jsxs)(I,{value:he.discount_type||"none",onChange:e=>me({...he,discount_type:e.target.value,discount_value:"none"===e.target.value?0:he.discount_value}),children:[(0,y.jsx)("option",{value:"none",children:e("admin:restaurantsPage.none")}),(0,y.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,y.jsx)("option",{value:"fixed",children:e("admin:restaurantsPage.fixedAmount")})]})]}),he.discount_type&&"none"!==he.discount_type&&(0,y.jsxs)(R,{children:[(0,y.jsxs)(_,{children:["Discount Value ","percentage"===he.discount_type?"(%)":"(Amount)"]}),(0,y.jsx)(T,{type:"number",min:"0",max:"percentage"===he.discount_type?"100":void 0,step:"0.01",value:he.discount_value||"",onChange:e=>me({...he,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===he.discount_type?"e.g. 10":"e.g. 5.00"})]}),he.discount_type&&"none"!==he.discount_type&&(0,y.jsxs)(R,{style:{gridColumn:"1 / -1"},children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.discountReason")}),(0,y.jsx)(T,{type:"text",value:he.discount_reason||"",onChange:e=>me({...he,discount_reason:e.target.value}),placeholder:"e.g. Early bird discount, Loyalty discount"})]}),(0,y.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,y.jsx)("strong",{children:"Summary:"})}),(0,y.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[he.planType||"Basic Plan"," - ",(0,u.vv)(parseFloat(he.planAmount||"0"),he.currency||"MYR")," (",he.billingCycle||"monthly",")",he.discount_type&&"none"!==he.discount_type&&(he.discount_value||0)>0&&(0,y.jsxs)("span",{style:{color:"#15803D",fontSize:"14px",marginLeft:"8px"},children:["(-","percentage"===he.discount_type?`${he.discount_value}%`:(0,u.vv)(he.discount_value||0,he.currency||"MYR"),")"]})]}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===he.paymentModel?"Brand Manager":"foodcourt_manager"===he.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),xe&&(0,y.jsx)(l.IM,{children:xe})]}),fe&&ye&&(0,y.jsx)(o.aF,{isOpen:!0,onClose:()=>be(!1),title:"Restaurant Details",size:"large",footer:(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(D,{onClick:()=>be(!1),children:e("admin:restaurantsPage.close")})}),children:(0,y.jsxs)(z,{children:[(0,y.jsxs)(R,{style:{gridColumn:"1 / -1"},children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.restaurantName")}),(0,y.jsx)(T,{type:"text",value:ye.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.restaurantAdmin")}),ye.admin?(0,y.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,y.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:ye.admin.name}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[ye.admin.email," ",ye.admin.phone?`\u2022 ${ye.admin.phone}`:""]})]}):(0,y.jsx)(T,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.oversightManagers")}),(0,y.jsx)(N,{value:ye.managers&&ye.managers.length>0?ye.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.emailAddress")}),(0,y.jsx)(T,{type:"email",value:ye.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.phoneNumber")}),(0,y.jsx)(T,{type:"tel",value:(0,p.FI)(ye.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.address")}),(0,y.jsx)(N,{value:ye.address||ye.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.cuisineType")}),(0,y.jsx)(T,{type:"text",value:ye.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.status")}),(0,y.jsx)(T,{type:"text",value:ye.status?ye.status.charAt(0).toUpperCase()+ye.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.planType")}),(0,y.jsx)(T,{type:"text",value:ye.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(_,{children:e("admin:restaurantsPage.createdDate")}),(0,y.jsx)(T,{type:"text",value:ye.createdAt?new Date(ye.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})}),(0,y.jsx)(d.A,{isOpen:De,title:"Delete Restaurant",message:`Are you sure you want to delete "${null===Le||void 0===Le?void 0:Le.name}"?\n\n\u2022 All orders, menu items, categories, and options will be deleted\n\u2022 All invoices and payment records will be deleted\n\u2022 All staff accounts linked to this restaurant will be disconnected\n\u2022 Kitchen stations, floor plans, and import history will be deleted\n\u2022 Activity logs will be preserved (restaurant reference cleared)\n\nThis action cannot be undone.`,onConfirm:async()=>{if(Le)try{const n=(0,m.c4)(),a=await fetch(`/api/restaurants/${Le.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(a.ok)Me(!1),$e(null),ge(""),ce(!1),me(null),await Wn();else{var e;const n=await a.json().catch(()=>({error:"Unknown error"}));let t="Please try again.";"string"===typeof n.error?t=n.error:null!==(e=n.error)&&void 0!==e&&e.message?t=n.error.message:n.message&&(t=n.message),Me(!1),$e(null),ge(`Error deleting restaurant: ${t}`)}}catch(n){Me(!1),$e(null),ge("Error deleting restaurant. Please check your connection and try again.")}},onCancel:()=>{Me(!1),$e(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]}),on&&(0,y.jsxs)(o.aF,{isOpen:!0,onClose:()=>ln(!1),title:"Password Generated",size:"small",footer:(0,y.jsxs)(y.Fragment,{children:[un&&(0,y.jsx)(i.cc,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(un),gn(!0),setTimeout(()=>gn(!1),2e3)},children:xn?"Copied!":"Copy Password"}),(0,y.jsx)(i.cc,{onClick:()=>ln(!1),children:e("admin:restaurantsPage.done")})]}),children:[(0,y.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[dn," Please share this password securely. They should change it after first login."]}),un&&(0,y.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:e("admin:restaurantsPage.temporaryPassword")}),(0,y.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:un})]}),(0,y.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:e("admin:restaurantsPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})})}},2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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