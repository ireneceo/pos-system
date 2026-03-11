"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>Z});var r=a(9950),t=a(4492),s=a(4752),o=a(3705),i=a(8409),l=a(9610),d=a(7617),c=a(9018),p=a(6038),u=a(2924),x=a(8666),h=a(2435),g=a(4414);const m=s.Ay.div`
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
`,A=s.Ay.div`
  text-align: center;
`,w=s.Ay.div`
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,_=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,z=s.Ay.label`
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
`,R=s.Ay.select`
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
`,P=s.Ay.select`
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
`,L=s.Ay.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,$=s.Ay.div`
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
`,O=s.Ay.input`
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
`,U=s.Ay.div`
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
`,W=s.Ay.div`
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
`,Y=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,K=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,V=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,q=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,J=s.Ay.button`
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
`,G=s.Ay.button`
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
`,Z=()=>{const{operationSettings:e}=(0,c.Pj)(),[n]=(0,t.ok)(),a=(0,t.Zp)(),[s,Z]=(0,r.useState)([]),[Q,X]=(0,r.useState)(""),[ee,ne]=(0,r.useState)("all"),[ae,re]=(0,r.useState)("all"),[te,se]=(0,r.useState)(!1),[oe,ie]=(0,r.useState)(!1),[le,de]=(0,r.useState)(""),[ce,pe]=(0,r.useState)(""),[ue,xe]=(0,r.useState)(null),[he,ge]=(0,r.useState)(null),[me,ye]=(0,r.useState)(!1),[je,be]=(0,r.useState)(""),[fe,ve]=(0,r.useState)(!1),[Ce,Fe]=(0,r.useState)([]),[Ae,we]=(0,r.useState)([]),[Se,Be]=(0,r.useState)(""),[ke,Ee]=(0,r.useState)(!1),[_e,ze]=(0,r.useState)([]),[Te,Re]=(0,r.useState)([]),[Ie,Ne]=(0,r.useState)(!1),[De,Me]=(0,r.useState)(null),[Pe,Le]=(0,r.useState)(""),[$e,Oe]=(0,r.useState)(!1),[Ue,We]=(0,r.useState)([]),[Ye,Ke]=(0,r.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[Ve,qe]=(0,r.useState)([]),[Je,He]=(0,r.useState)([]),Ge=(0,r.useMemo)(()=>(0,p.vL)(Je),[Je]),[Ze,Qe]=(0,r.useState)([]),[Xe,en]=(0,r.useState)("create"),[nn,an]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[rn,tn]=(0,r.useState)(null),[sn,on]=(0,r.useState)([]),[ln,dn]=(0,r.useState)(""),[cn,pn]=(0,r.useState)(!1),[un,xn]=(0,r.useState)("keep"),[hn,gn]=(0,r.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[mn,yn]=(0,r.useState)(null),[jn,bn]=(0,r.useState)(""),[fn,vn]=(0,r.useState)(!1),[Cn,Fn]=(0,r.useState)("all"),[An,wn]=(0,r.useState)(""),[Sn,Bn]=(0,r.useState)(!1),[kn,En]=(0,r.useState)([]);(0,r.useEffect)(()=>{Promise.all([Tn(),zn(),_n()]);const e=n.get("managerId"),a=n.get("managerName");e&&a&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:a}),re(e),Le(decodeURIComponent(a)));const r=n.get("brandId"),t=n.get("brandName");r&&t&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:r,brandName:t}),Fn(r),wn(decodeURIComponent(t)))},[]);const _n=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Qe(e)}}catch(e){console.error("Error fetching brands:",e)}},zn=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(He(n),n.length>0){const e=n[0];Ke(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},Tn=async()=>{try{const e=localStorage.getItem("auth_token"),n=e?{Authorization:`Bearer ${e}`}:{},[a,r]=await Promise.all([fetch("/api/restaurants",{headers:n}),fetch("/api/users?role=Manager",{headers:n})]);if(a.ok){const e=await a.json(),n=r.ok?await r.json():[],t=e.data||e,s=n.data||n,o=Array.isArray(t)?t:[],i=Array.isArray(s)?s:[];qe(i);const l=o.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||e.billing_cycle||"monthly",autoRenew:void 0!==e.autoRenew?e.autoRenew:void 0===e.auto_renew||e.auto_renew,discount_type:e.discount_type||"none",discount_value:e.discount_value||0,discount_reason:e.discount_reason||""}});console.log("\u2705 Formatted restaurants:",l),console.log("\u2705 Setting restaurants state with",l.length,"restaurants"),Z(l)}else console.error("\u274c Failed to fetch restaurants data"),Z([]),qe([])}catch(e){console.error("\u274c Error fetching restaurants:",e),Z([]),qe([])}},Rn=async e=>{dn(e),pn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();on(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},In=async e=>{bn(e),vn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();on(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Nn=s.filter(e=>{const n=e.name.toLowerCase().includes(Q.toLowerCase())||e.managerName.toLowerCase().includes(Q.toLowerCase())||e.cuisine.toLowerCase().includes(Q.toLowerCase()),a="all"===ee||e.status===ee,r=e.managerId===ae,t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===ae),s="all"===ae||r||t,o="all"===Cn||e.brand_id&&e.brand_id.toString()===Cn;return"all"!==ae&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:ae,managerIdMatch:r,managersArrayMatch:t,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:s.length,filteredRestaurants:Nn.length,searchTerm:Q,filterStatus:ee,filterManager:ae,restaurants:s.slice(0,2)});const Dn=s.length,Mn=s.filter(e=>"active"===e.status).length,Pn=s.reduce((e,n)=>e+n.todaySales,0),Ln=s.reduce((e,n)=>e+n.todayOrders,0),$n=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,g.jsx)(k,{filled:a<=e,children:"\u2605"},a));return n},On=Array.from(new Set(s.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:s.length,filteredCount:Nn.length,managersCount:Ve.length,uniqueManagersCount:On.length,firstRestaurant:s[0],firstFiltered:Nn[0]}),(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(i.mc,{children:[(0,g.jsxs)(i.Y9,{children:[(0,g.jsx)(i.hE,{children:"Restaurants"}),(0,g.jsxs)(i.ex,{children:[(0,g.jsx)(o.cc,{variant:"outline",onClick:()=>{const n=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Nn.map(n=>({"Restaurant Name":n.name,Manager:n.managerName,Location:n.location,Cuisine:n.cuisine,Status:n.status,Rating:n.rating,"Today Sales":(0,p.vv)(n.todaySales,e.currency),"Today Orders":n.todayOrders,"Staff Count":n.staffCount,Phone:n.phone,Email:n.email,Address:n.address,"Created At":n.createdAt}))),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),t=document.createElement("a");t.href=r,t.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(r)},children:"Export"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=Je.length>0?Je[0]:null;Ke({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?String((0,p.jL)(n,"MYR")):"49.00",currency:"MYR",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),be(""),Fe([]),ve(!1),we([]),en("create"),an({fullName:"",email:"",username:"",password:"",phone:""}),tn(null),on([]),dn(""),pn(!1),se(!0)},children:"Add Restaurant"})]})]}),(0,g.jsxs)(i.UC,{children:[(0,g.jsxs)(i.MD,{children:[(0,g.jsxs)(i.hI,{color:"#059669",children:[(0,g.jsx)(i.Os,{children:Dn}),(0,g.jsx)(i.v0,{children:"Total Restaurants"}),(0,g.jsx)(i.d1,{children:"Across all managers"})]}),(0,g.jsxs)(i.hI,{color:"#2563EB",children:[(0,g.jsx)(i.Os,{children:Mn}),(0,g.jsx)(i.v0,{children:"Active Restaurants"}),(0,g.jsxs)(i.d1,{children:[Dn>0?Math.round(Mn/Dn*100):0,"% operational"]})]}),(0,g.jsxs)(i.hI,{color:"#7C3AED",children:[(0,g.jsx)(i.Os,{children:(0,p.vv)(Pn,e.currency)}),(0,g.jsx)(i.v0,{children:"Today's Total Sales"}),(0,g.jsx)(i.d1,{children:"Combined revenue"})]}),(0,g.jsxs)(i.hI,{color:"#D97706",children:[(0,g.jsx)(i.Os,{children:Ln}),(0,g.jsx)(i.v0,{children:"Today's Orders"}),(0,g.jsx)(i.d1,{children:"All restaurants"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsxs)($,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Search managers...",value:Pe,onChange:e=>(e=>{if(Le(e),Oe(!0),e.length<1)return void We(Ve.slice(0,10));const n=Ve.filter(n=>{const a=e.toLowerCase(),r=(n.full_name||"").toLowerCase(),t=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return r.includes(a)||t.includes(a)||s.includes(a)}).slice(0,10);We(n)})(e.target.value),onFocus:()=>{Oe(!0),0===Pe.length&&We(Ve.slice(0,10))},onBlur:()=>setTimeout(()=>Oe(!1),200)}),"all"!==ae&&Pe&&(0,g.jsx)(H,{onClick:()=>{re("all"),Le(""),Oe(!1)},children:"\xd7"}),(0,g.jsxs)(U,{show:$e,children:[(0,g.jsxs)(W,{onClick:()=>{re("all"),Le(""),Oe(!1)},children:[(0,g.jsx)(Y,{children:"All Managers"}),(0,g.jsx)(K,{children:"Show all restaurants"})]}),Ue.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{re(e.id.toString()),Le(e.full_name||e.username),Oe(!1)})(e),children:[(0,g.jsx)(Y,{children:e.full_name||e.username}),(0,g.jsxs)(K,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Search brands...",value:An,onChange:e=>(e=>{if(wn(e),Bn(!0),e.length<1)return void En(Ze.slice(0,10));const n=Ze.filter(n=>{const a=e.toLowerCase(),r=(n.name||"").toLowerCase(),t=(n.code||"").toLowerCase();return r.includes(a)||t.includes(a)}).slice(0,10);En(n)})(e.target.value),onFocus:()=>{Bn(!0),0===An.length&&En(Ze.slice(0,10))},onBlur:()=>setTimeout(()=>Bn(!1),200)}),"all"!==Cn&&An&&(0,g.jsx)(H,{onClick:()=>{Fn("all"),wn(""),Bn(!1),a("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,g.jsxs)(U,{show:Sn,children:[(0,g.jsxs)(W,{onClick:()=>{Fn("all"),wn(""),Bn(!1),a("/pos/admin/restaurants",{replace:!0})},children:[(0,g.jsx)(Y,{children:"All Brands"}),(0,g.jsx)(K,{children:"Show all restaurants"})]}),kn.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{Fn(e.id.toString()),wn(e.name),Bn(!1)})(e),children:[(0,g.jsx)(Y,{children:e.name}),(0,g.jsxs)(K,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,g.jsxs)(P,{value:ee,onChange:e=>ne(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"}),(0,g.jsx)("option",{value:"trial",children:"Trial"}),(0,g.jsx)("option",{value:"expired",children:"Expired"}),(0,g.jsx)("option",{value:"suspended",children:"Suspended"}),(0,g.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,g.jsx)(M,{placeholder:"Search restaurants...",value:Q,onChange:e=>X(e.target.value)})]}),(0,g.jsx)(m,{children:0===Nn.length?(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===s.length?"Loading restaurants...":"No restaurants found matching your criteria.",(0,g.jsx)("br",{}),(0,g.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",s.length," | Filtered: ",Nn.length]})]}):Nn.map(n=>(0,g.jsxs)(y,{children:[(0,g.jsxs)(j,{children:[(0,g.jsxs)(b,{children:[(0,g.jsxs)(f,{children:[n.name," ",n.currency&&(0,g.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.currency}),n.is_demo&&(0,g.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"DEMO"})]}),(0,g.jsxs)(v,{children:["Admin: ",n.admin?`${n.admin.name} (${n.admin.email})`:"No Admin Assigned"]}),n.managers&&n.managers.length>0&&(0,g.jsxs)(v,{children:["Managers: ",n.managers.map(e=>e.name).join(", ")]}),(0,g.jsxs)(v,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,g.jsx)(C,{status:n.status,children:n.status})]}),(0,g.jsxs)(B,{children:[$n(n.rating),(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Created: ",new Date(n.createdAt).toLocaleDateString()]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(A,{children:[(0,g.jsx)(w,{children:(0,p.vv)(n.todaySales,e.currency)}),(0,g.jsx)(S,{children:"Today's Sales"})]}),(0,g.jsxs)(A,{children:[(0,g.jsx)(w,{children:n.todayOrders}),(0,g.jsx)(S,{children:"Orders"})]}),(0,g.jsxs)(A,{children:[(0,g.jsx)(w,{children:n.staffCount}),(0,g.jsx)(S,{children:"Staff"})]})]}),(0,g.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,g.jsx)(G,{onClick:()=>(e=>{ge(e),ye(!0)})(n),children:"View"}),(0,g.jsx)(N,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),a(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(n),children:"Report"}),(0,g.jsx)(N,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",Ve);const n=Je.length>0?Je[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),r=(0,p.Wh)(e.currency||"MYR"),t=e.planAmount||(n?String((0,p.jL)(n,r)):"49.00"),s={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(xe(s),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=Ve.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Re(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=Ve.find(n=>n.id.toString()===e.managerId.toString());Re(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Re([]);Be(""),ze([]),Ee(!1),xn("keep"),gn({fullName:"",email:"",username:"",password:"",phone:""}),yn(null),bn(""),vn(!1),ie(!0)})(n),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(r.ok)Z(s.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await r.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(n),style:{background:"active"===n.status?"#FEE2E2":"#ECFDF5",color:"active"===n.status?"#DC2626":"#059669",border:"1px solid "+("active"===n.status?"#FCA5A5":"#A7F3D0")},children:"active"===n.status?"Deactivate":"Activate"})]})]},n.id))}),te&&(0,g.jsxs)(i.aF,{isOpen:!0,onClose:()=>se(!1),title:"Add Restaurant",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{de(""),se(!1)},children:"Cancel"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",Ye),console.log("Selected managers:",Ae),de(""),!Ye.name||!Ye.email||!Ye.phone||!Ye.address)return void de("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===Xe){if(!nn.fullName||!nn.email||!nn.username||!nn.password)return void de("Please fill in all required Restaurant Admin fields (Full Name, Email, Username, Password).");if(nn.password.length<8)return void de("Admin password must be at least 8 characters.");if(!/[a-z]/.test(nn.password)||!/[A-Z]/.test(nn.password)||!/[0-9]/.test(nn.password))return void de("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===Xe&&!rn)return void de("Please select an existing user as Restaurant Admin.");const a={name:Ye.name,adminAction:Xe,managerIds:Ae.map(e=>parseInt(e.id.toString())),email:Ye.email,phone:Ye.phone,address:Ye.address,city:Ye.city,state:Ye.state,postal_code:Ye.postalCode,country:Ye.country,business_registration:Ye.businessRegistration,tax_id:Ye.taxId,location:Ye.address,cuisine:Ye.cuisine||"Various",status:Ye.status,planType:Ye.planType,planAmount:parseFloat(Ye.planAmount),currency:Ye.currency,billingCycle:Ye.billingCycle,payment_model:Ye.paymentModel,autoRenew:Ye.autoRenew,subscriptionStart:Ye.subscriptionStart,subscriptionEnd:Ye.subscriptionEnd};"create"===Xe?(a.adminEmail=nn.email,a.adminPassword=nn.password,a.adminUsername=nn.username,a.adminFullName=nn.fullName,a.adminPhone=nn.phone||void 0):"assign"===Xe&&(a.adminUserId=parseInt(rn.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const r=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant created successfully:",e),de(""),se(!1),await Tn()}else{var e;const a=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let r="Please try again.";if("string"===typeof a.error)r=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;r=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(r+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(r=a.message);de(r)}}catch(a){console.error("\u274c Error adding restaurant:",a),de("Error adding restaurant. Please check your connection and try again.")}},children:"Add Restaurant"})]}),children:[(0,g.jsxs)(E,{children:[(0,g.jsxs)(_,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(z,{children:"Restaurant Name *"}),(0,g.jsx)(T,{type:"text",placeholder:"Enter restaurant name",value:Ye.name,onChange:e=>Ke({...Ye,name:e.target.value})})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===Xe?"#F0EFFF":"#F9FAFB",border:"create"===Xe?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===Xe,onChange:()=>{en("create"),tn(null)},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===Xe?"#F0EFFF":"#F9FAFB",border:"assign"===Xe?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===Xe,onChange:()=>{en("assign"),an({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===Xe?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Admin Full Name *"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Kim Owner",value:nn.fullName,onChange:e=>an({...nn,fullName:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Admin Email *"}),(0,g.jsx)(T,{type:"email",placeholder:"admin@restaurant.com",value:nn.email,onChange:e=>an({...nn,email:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Admin Username *"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., kim_owner",value:nn.username,onChange:e=>an({...nn,username:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Admin Password *"}),(0,g.jsx)(T,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:nn.password,onChange:e=>an({...nn,password:e.target.value})})]}),(0,g.jsxs)(_,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(z,{children:"Admin Phone"}),(0,g.jsx)(x.A,{value:nn.phone,onChange:e=>an({...nn,phone:e}),defaultCountry:Ye.country})]})]}):(0,g.jsxs)(_,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,g.jsx)(z,{children:"Search and select an existing user"}),(0,g.jsxs)(L,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Type to search by name, email, or username...",value:ln,onChange:e=>Rn(e.target.value),onFocus:()=>Rn(ln),onBlur:()=>setTimeout(()=>pn(!1),200)}),(0,g.jsx)(U,{show:cn,children:0===sn.length?(0,g.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:ln.length>0?"No available users found":"Type to search users..."}):sn.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{tn(e),dn(e.full_name||e.username),pn(!1)})(e),children:[(0,g.jsx)(Y,{children:e.full_name||e.username}),(0,g.jsxs)(K,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),rn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:rn.full_name||rn.username}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[rn.email," \u2022 ",rn.role]})]}),(0,g.jsx)("button",{onClick:()=>{tn(null),dn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,g.jsxs)(_,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Search and select oversight managers...",value:je,onChange:e=>(e=>{if(be(e),ve(!0),e.length<1)return void Fe(Ve.slice(0,10));const n=Ve.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));Fe(n.slice(0,10))})(e.target.value),onFocus:()=>{ve(!0),Fe(Ve.slice(0,10))},onBlur:()=>setTimeout(()=>ve(!1),200)}),(0,g.jsx)(U,{show:fe,children:Ce.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{Ae.find(n=>n.id===e.id)||we([...Ae,e]),be(""),ve(!1)})(e),children:[(0,g.jsx)(Y,{children:e.full_name||e.username}),(0,g.jsxs)(K,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Ae.length>0&&(0,g.jsx)(V,{children:Ae.map(e=>(0,g.jsxs)(q,{children:[e.full_name||e.username,(0,g.jsx)(J,{onClick:()=>{return n=e.id.toString(),void we(Ae.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Email Address *"}),(0,g.jsx)(T,{type:"email",placeholder:"restaurant@example.com",value:Ye.email,onChange:e=>Ke({...Ye,email:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Phone Number *"}),(0,g.jsx)(x.A,{value:Ye.phone,onChange:e=>Ke({...Ye,phone:e}),defaultCountry:Ye.country})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Address *"}),(0,g.jsx)(I,{placeholder:"Enter restaurant address",value:Ye.address,onChange:e=>Ke({...Ye,address:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"City"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Ye.city,onChange:e=>Ke({...Ye,city:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"State / Province"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Selangor",value:Ye.state,onChange:e=>Ke({...Ye,state:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Postal Code"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 50000",value:Ye.postalCode,onChange:e=>Ke({...Ye,postalCode:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Country"}),(0,g.jsx)(R,{value:Ye.country,onChange:e=>{const n=e.target.value,a=p.xh[n]||Ye.currency,r=Ge.includes(a)?a:Ye.currency,t=Je.find(e=>e.display_name===Ye.planType);Ke({...Ye,country:n,currency:r,planAmount:t?String((0,p.jL)(t,r)):Ye.planAmount})},children:h.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Business Registration No."}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 123456-A",value:Ye.businessRegistration,onChange:e=>Ke({...Ye,businessRegistration:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Tax ID / GST No."}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 000123456789",value:Ye.taxId,onChange:e=>Ke({...Ye,taxId:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Cuisine Type"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ye.cuisine,onChange:e=>Ke({...Ye,cuisine:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Currency *"}),(0,g.jsx)(R,{value:Ye.currency,onChange:e=>{const n=e.target.value,a=Je.find(e=>e.display_name===Ye.planType);Ke({...Ye,currency:n,planAmount:a?String((0,p.jL)(a,n)):"0"})},children:Ge.map(e=>(0,g.jsxs)("option",{value:e,children:[e," (","0"===(0,p.vv)(0,e).charAt(0)?e:(0,p.vv)(0,e).split(" ")[0],")"]},e))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Plan Type *"}),(0,g.jsx)(R,{value:Ye.planType,onChange:e=>{const n=Je.find(n=>n.display_name===e.target.value);Ke({...Ye,planType:e.target.value,planAmount:n?String((0,p.jL)(n,Ye.currency)):"0"})},children:Je.filter(e=>"restaurant"===e.plan_target).map(e=>(0,g.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,p.m9)(e,Ye.currency),"/month)"]},e.id))})]}),(0,g.jsx)(_,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===Ye.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===Ye.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,g.jsx)("input",{type:"checkbox",checked:"trial"===Ye.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),Ke({...Ye,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else Ke({...Ye,status:"active",planAmount:String((0,p.jL)(Je.find(e=>e.display_name===Ye.planType)||{},Ye.currency))})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Billing Cycle *"}),(0,g.jsxs)(R,{value:Ye.billingCycle,onChange:e=>{const n=e.target.value,a=Je.find(e=>e.display_name===Ye.planType),r=a?(0,p.jL)(a,Ye.currency,n):0;Ke({...Ye,billingCycle:n,planAmount:r.toFixed(2)})},children:[(0,g.jsx)("option",{value:"monthly",children:"Monthly"}),(0,g.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Payment Model *"}),(0,g.jsxs)(R,{value:Ye.paymentModel,onChange:e=>Ke({...Ye,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,g.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,g.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Subscription Start Date *"}),(0,g.jsx)(T,{type:"date",value:Ye.subscriptionStart,onChange:e=>Ke({...Ye,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Subscription End Date *"}),(0,g.jsx)(T,{type:"date",value:Ye.subscriptionEnd,onChange:e=>Ke({...Ye,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(_,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:Ye.autoRenew,onChange:e=>Ke({...Ye,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ye.planType," - $",Ye.planAmount," (",Ye.billingCycle,")"]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Ye.paymentModel?"Brand Manager":"foodcourt_manager"===Ye.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),le&&(0,g.jsx)(l.IM,{children:le})]}),oe&&ue&&(0,g.jsxs)(i.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Edit Restaurant",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.cc,{variant:"cancel",onClick:()=>{pe(""),ie(!1)},children:"Cancel"}),(0,g.jsx)(o.cc,{variant:"danger-outline",onClick:()=>(Me(ue),void Ne(!0)),children:"Delete"}),(0,g.jsx)(o.cc,{variant:"primary",onClick:async()=>{if(ue)try{if(console.log("\ud83d\udd04 Updating restaurant:",ue),console.log("\ud83d\udd0d Selected edit managers:",Te),pe(""),!ue.name)return void pe("Please fill in all required fields.");if("create"===un){if(!hn.fullName||!hn.email||!hn.username||!hn.password)return void pe("Please fill in all required new Admin fields.")}else if("change"===un&&!mn)return void pe("Please select an existing user as new Admin.");const a={name:ue.name,managerIds:Te.map(e=>parseInt(e.id.toString())),email:ue.email||"",phone:ue.phone||"",address:ue.address||ue.location||"",location:ue.address||ue.location||"",city:ue.city||"",state:ue.state||"",postal_code:ue.postalCode||"",country:ue.country||"MY",business_registration:ue.businessRegistration||"",tax_id:ue.taxId||"",cuisine:ue.cuisine||"Various",status:ue.status,planType:ue.planType||"Basic Plan",planAmount:parseFloat(ue.planAmount||"49.00"),currency:(0,p.Wh)(ue.currency||"MYR"),billingCycle:ue.billingCycle||"monthly",payment_model:ue.paymentModel||"restaurant",autoRenew:ue.autoRenew||!0,subscriptionStart:ue.subscriptionStart,subscriptionEnd:ue.subscriptionEnd,discount_type:ue.discount_type||"none",discount_value:ue.discount_type&&"none"!==ue.discount_type&&ue.discount_value||0,discount_reason:ue.discount_reason||""};"create"===un?(a.adminAction="create",a.adminEmail=hn.email,a.adminPassword=hn.password,a.adminUsername=hn.username,a.adminFullName=hn.fullName,a.adminPhone=hn.phone||void 0):"change"===un&&(a.adminAction="change",a.adminUserId=parseInt(mn.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const r=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${ue.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant updated successfully:",e),pe(""),ie(!1),xe(null),await Tn()}else{var e;const a=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let r="Please try again.";if("string"===typeof a.error)r=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;r=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(r+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(r=a.message);pe(r)}}catch(a){console.error("\u274c Error updating restaurant:",a),pe("Error updating restaurant. Please check your connection and try again.")}},children:"Update Restaurant"})]}),children:[(0,g.jsxs)(E,{children:[(0,g.jsxs)(_,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(z,{children:"Restaurant Name *"}),(0,g.jsx)(T,{type:"text",placeholder:"Enter restaurant name",value:ue.name,onChange:e=>xe({...ue,name:e.target.value})})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),ue.admin?(0,g.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:ue.admin.name}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[ue.admin.email," ",ue.admin.phone?`\u2022 ${ue.admin.phone}`:""]})]}),"keep"===un&&(0,g.jsx)("button",{onClick:()=>xn("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:"Change Admin"})]})}):(0,g.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:"No Restaurant Admin assigned"}),"keep"===un&&(0,g.jsx)("button",{onClick:()=>xn("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:"Assign Admin"})]})}),"keep"!==un&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===un?"#F0EFFF":"#F9FAFB",border:"create"===un?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===un,onChange:()=>{xn("create"),yn(null)},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===un?"#F0EFFF":"#F9FAFB",border:"change"===un?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,g.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===un,onChange:()=>{xn("change"),gn({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]}),(0,g.jsx)("button",{onClick:()=>xn("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:"Cancel"})]}),"create"===un?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"New Admin Full Name *"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Kim Owner",value:hn.fullName,onChange:e=>gn({...hn,fullName:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"New Admin Email *"}),(0,g.jsx)(T,{type:"email",placeholder:"admin@restaurant.com",value:hn.email,onChange:e=>gn({...hn,email:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"New Admin Username *"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., kim_owner",value:hn.username,onChange:e=>gn({...hn,username:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"New Admin Password *"}),(0,g.jsx)(T,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:hn.password,onChange:e=>gn({...hn,password:e.target.value})})]})]}):(0,g.jsxs)(_,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,g.jsx)(z,{children:"Search and select an existing user"}),(0,g.jsxs)(L,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Type to search by name, email, or username...",value:jn,onChange:e=>In(e.target.value),onFocus:()=>In(jn),onBlur:()=>setTimeout(()=>vn(!1),200)}),(0,g.jsx)(U,{show:fn,children:0===sn.length?(0,g.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:jn.length>0?"No available users found":"Type to search users..."}):sn.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{yn(e),bn(e.full_name||e.username),vn(!1)})(e),children:[(0,g.jsx)(Y,{children:e.full_name||e.username}),(0,g.jsxs)(K,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),mn&&(0,g.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:mn.full_name||mn.username}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[mn.email," \u2022 ",mn.role]})]}),(0,g.jsx)("button",{onClick:()=>{yn(null),bn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,g.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,g.jsxs)(_,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(O,{type:"text",placeholder:"Search and select oversight managers...",value:Se,onChange:e=>(e=>{if(Be(e),Ee(!0),e.length<1)return void ze(Ve.slice(0,10));const n=Ve.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));ze(n.slice(0,10))})(e.target.value),onFocus:()=>{Ee(!0),0===Se.length&&ze(Ve.slice(0,10))},onBlur:()=>setTimeout(()=>Ee(!1),200)}),(0,g.jsx)(U,{show:ke,children:_e.map(e=>(0,g.jsxs)(W,{onClick:()=>(e=>{Te.find(n=>n.id===e.id)||Re([...Te,e]),Be(""),Ee(!1)})(e),children:[(0,g.jsx)(Y,{children:e.full_name||e.username}),(0,g.jsxs)(K,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Te.length>0&&(0,g.jsx)(V,{children:Te.map(e=>(0,g.jsxs)(q,{children:[e.full_name||e.username,(0,g.jsx)(J,{onClick:()=>{return n=e.id.toString(),void Re(Te.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Email Address *"}),(0,g.jsx)(T,{type:"email",placeholder:"restaurant@example.com",value:ue.email||"",onChange:e=>xe({...ue,email:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Phone Number *"}),(0,g.jsx)(x.A,{value:ue.phone||"",onChange:e=>xe({...ue,phone:e}),defaultCountry:ue.country})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Address *"}),(0,g.jsx)(I,{placeholder:"Enter restaurant address",value:ue.address||ue.location,onChange:e=>xe({...ue,address:e.target.value,location:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"City"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Kuala Lumpur",value:ue.city||"",onChange:e=>xe({...ue,city:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"State / Province"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Selangor",value:ue.state||"",onChange:e=>xe({...ue,state:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Postal Code"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 50000",value:ue.postalCode||"",onChange:e=>xe({...ue,postalCode:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Country"}),(0,g.jsx)(R,{value:ue.country||"MY",onChange:e=>xe({...ue,country:e.target.value}),children:h.FS.map(e=>(0,g.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Business Registration No."}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 123456-A",value:ue.businessRegistration||"",onChange:e=>xe({...ue,businessRegistration:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Tax ID / GST No."}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., 000123456789",value:ue.taxId||"",onChange:e=>xe({...ue,taxId:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Cuisine Type"}),(0,g.jsx)(T,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:ue.cuisine,onChange:e=>xe({...ue,cuisine:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Currency *"}),(0,g.jsx)(R,{value:(0,p.Wh)(ue.currency||"MYR"),onChange:e=>{const n=e.target.value,a=Je.find(e=>e.display_name===(ue.planType||"Basic Plan"));xe({...ue,currency:n,planAmount:a?String((0,p.jL)(a,n)):ue.planAmount})},children:Ge.map(e=>(0,g.jsx)("option",{value:e,children:e},e))})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Plan Type *"}),(0,g.jsx)(R,{value:ue.planType||"Basic Plan",onChange:e=>{const n=Je.find(n=>n.display_name===e.target.value),a=(0,p.Wh)(ue.currency||"MYR");xe({...ue,planType:e.target.value,planAmount:n?String((0,p.jL)(n,a)):"0"})},children:Je.filter(e=>"restaurant"===e.plan_target).map(e=>(0,g.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,p.m9)(e,(0,p.Wh)(ue.currency||"MYR")),"/month)"]},e.id))})]}),(0,g.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,g.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Billing Cycle *"}),(0,g.jsxs)(R,{value:ue.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a=Je.find(e=>e.display_name===(ue.planType||"Basic Plan")),r=(0,p.Wh)(ue.currency||"MYR"),t=a?(0,p.jL)(a,r,n):0;xe({...ue,billingCycle:n,planAmount:t.toFixed(2)})},children:[(0,g.jsx)("option",{value:"monthly",children:"Monthly"}),(0,g.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Payment Model *"}),(0,g.jsxs)(R,{value:ue.paymentModel||"restaurant",onChange:e=>xe({...ue,paymentModel:e.target.value}),children:[(0,g.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,g.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,g.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Subscription Start Date *"}),(0,g.jsx)(T,{type:"date",value:ue.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>xe({...ue,subscriptionStart:e.target.value})})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Subscription End Date *"}),(0,g.jsx)(T,{type:"date",value:ue.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>xe({...ue,subscriptionEnd:e.target.value})})]}),(0,g.jsx)(_,{style:{gridColumn:"1 / -1"},children:(0,g.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.autoRenew||!0,onChange:e=>xe({...ue,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,g.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"6px"},children:[(0,g.jsx)("h4",{style:{margin:0,fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:"Subscription Discount"}),(0,g.jsx)("p",{style:{margin:"4px 0 0",fontSize:"12px",color:"#6B7280"},children:"Applied automatically to System Admin subscription invoices"})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Discount Type"}),(0,g.jsxs)(R,{value:ue.discount_type||"none",onChange:e=>xe({...ue,discount_type:e.target.value,discount_value:"none"===e.target.value?0:ue.discount_value}),children:[(0,g.jsx)("option",{value:"none",children:"None"}),(0,g.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,g.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),ue.discount_type&&"none"!==ue.discount_type&&(0,g.jsxs)(_,{children:[(0,g.jsxs)(z,{children:["Discount Value ","percentage"===ue.discount_type?"(%)":"(Amount)"]}),(0,g.jsx)(T,{type:"number",min:"0",max:"percentage"===ue.discount_type?"100":void 0,step:"0.01",value:ue.discount_value||"",onChange:e=>xe({...ue,discount_value:parseFloat(e.target.value)||0}),placeholder:"percentage"===ue.discount_type?"e.g. 10":"e.g. 5.00"})]}),ue.discount_type&&"none"!==ue.discount_type&&(0,g.jsxs)(_,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(z,{children:"Discount Reason"}),(0,g.jsx)(T,{type:"text",value:ue.discount_reason||"",onChange:e=>xe({...ue,discount_reason:e.target.value}),placeholder:"e.g. Early bird discount, Loyalty discount"})]}),(0,g.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,g.jsx)("strong",{children:"Summary:"})}),(0,g.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ue.planType||"Basic Plan"," - $",ue.planAmount||"29.00"," (",ue.billingCycle||"monthly",")",ue.discount_type&&"none"!==ue.discount_type&&(ue.discount_value||0)>0&&(0,g.jsxs)("span",{style:{color:"#15803D",fontSize:"14px",marginLeft:"8px"},children:["(-","percentage"===ue.discount_type?`${ue.discount_value}%`:`$${(ue.discount_value||0).toFixed(2)}`,")"]})]}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===ue.paymentModel?"Brand Manager":"foodcourt_manager"===ue.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),ce&&(0,g.jsx)(l.IM,{children:ce})]}),me&&he&&(0,g.jsx)(i.aF,{isOpen:!0,onClose:()=>ye(!1),title:"Restaurant Details",size:"large",footer:(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(N,{onClick:()=>ye(!1),children:"Close"})}),children:(0,g.jsxs)(E,{children:[(0,g.jsxs)(_,{style:{gridColumn:"1 / -1"},children:[(0,g.jsx)(z,{children:"Restaurant Name"}),(0,g.jsx)(T,{type:"text",value:he.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Restaurant Admin"}),he.admin?(0,g.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,g.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:he.admin.name}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[he.admin.email," ",he.admin.phone?`\u2022 ${he.admin.phone}`:""]})]}):(0,g.jsx)(T,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Oversight Managers"}),(0,g.jsx)(I,{value:he.managers&&he.managers.length>0?he.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Email Address"}),(0,g.jsx)(T,{type:"email",value:he.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Phone Number"}),(0,g.jsx)(T,{type:"tel",value:(0,u.FI)(he.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Address"}),(0,g.jsx)(I,{value:he.address||he.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Cuisine Type"}),(0,g.jsx)(T,{type:"text",value:he.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Status"}),(0,g.jsx)(T,{type:"text",value:he.status?he.status.charAt(0).toUpperCase()+he.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Plan Type"}),(0,g.jsx)(T,{type:"text",value:he.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(z,{children:"Created Date"}),(0,g.jsx)(T,{type:"text",value:he.createdAt?new Date(he.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})}),(0,g.jsx)(d.A,{isOpen:Ie,title:"Delete Restaurant",message:`Are you sure you want to delete "${null===De||void 0===De?void 0:De.name}"? This action cannot be undone. All related data (orders, invoices, menu items, etc.) will be permanently removed.`,onConfirm:async()=>{if(De)try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${De.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(a.ok)Ne(!1),Me(null),pe(""),ie(!1),xe(null),await Tn();else{var e;const n=await a.json().catch(()=>({error:"Unknown error"}));let r="Please try again.";"string"===typeof n.error?r=n.error:null!==(e=n.error)&&void 0!==e&&e.message?r=n.error.message:n.message&&(r=n.message),Ne(!1),Me(null),pe(`Error deleting restaurant: ${r}`)}}catch(n){Ne(!1),Me(null),pe("Error deleting restaurant. Please check your connection and try again.")}},onCancel:()=>{Ne(!1),Me(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},2435:(e,n,a)=>{a.d(n,{FS:()=>r});const r=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>t});var r=a(4752);const t=r.Ay.button`
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
`},7617:(e,n,a)=>{a.d(n,{A:()=>u});a(9950);var r=a(4752),t=a(9610),s=a(4414);const o=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,i=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=r.Ay.div`
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
`,u=e=>{let{isOpen:n,title:a,message:r,onConfirm:u,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,s.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(i,{children:[(0,s.jsx)(l,{children:a}),(0,s.jsx)(d,{children:r})]}),(0,s.jsxs)(c,{children:[(0,s.jsx)(p,{variant:"secondary",onClick:x,children:g}),(0,s.jsx)(p,{variant:"primary",type:m,onClick:u,children:h})]})]})}):null}}}]);