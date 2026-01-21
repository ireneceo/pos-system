"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>ie});var t=a(9950),r=a(4492),s=a(4752),o=a(3310),i=a(3705),l=a(7492),d=a(9610),c=a(9018),u=a(6038),p=a(2924),x=a(2874),h=a(4414);const g=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,m=s.Ay.div`
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
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,j=s.Ay.div`
  flex: 1;
`,b=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,f=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"cancelled":default:return"#F3F4F6";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"cancelled":default:return"#6B7280";case"trial":return"#D97706";case"expired":case"suspended":return"#DC2626"}}};
`,C=s.Ay.div`
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
`,F=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,k=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,B=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
`,E=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
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
`,I=s.Ay.div`
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
`,R=s.Ay.button`
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
`,P=s.Ay.div`
  padding: 24px;
`,M=s.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,_=s.Ay.div`
  display: grid;
  gap: 16px;
`,z=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,D=s.Ay.label`
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
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`,N=s.Ay.select`
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
`,L=s.Ay.textarea`
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
  
  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`,O=s.Ay.button`
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
`,U=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

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
`,V=s.Ay.select`
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
`,W=s.Ay.div`
  position: relative;
  width: 100%;
`,K=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,q=s.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 150px;

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
`,J=s.Ay.div`
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
`,G=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,Z=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,X=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,ee=s.Ay.button`
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
`,ne=s.Ay.button`
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
`,ae=s.Ay.button`
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
`,te=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,re=s.Ay.div`
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
`,se=s.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,oe=s.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,ie=()=>{const{operationSettings:e}=(0,c.Pj)(),[n]=(0,r.ok)(),a=(0,r.Zp)(),[s,ie]=(0,t.useState)([]),[le,de]=(0,t.useState)(""),[ce,ue]=(0,t.useState)("all"),[pe,xe]=(0,t.useState)("all"),[he,ge]=(0,t.useState)(!1),[me,ye]=(0,t.useState)(!1),[je,be]=(0,t.useState)(!1),[ve,fe]=(0,t.useState)(""),[Ce,we]=(0,t.useState)(""),[Ae,Fe]=(0,t.useState)(""),[Se,ke]=(0,t.useState)(null),[Be,Ee]=(0,t.useState)(null),[Ie,Te]=(0,t.useState)(!1),[Re,Pe]=(0,t.useState)(""),[Me,_e]=(0,t.useState)(!1),[ze,De]=(0,t.useState)([]),[$e,Ne]=(0,t.useState)([]),[Le,Oe]=(0,t.useState)(""),[Ue,Ye]=(0,t.useState)(!1),[Ve,We]=(0,t.useState)([]),[Ke,qe]=(0,t.useState)([]),[He,Je]=(0,t.useState)(""),[Ge,Ze]=(0,t.useState)(!1),[Qe,Xe]=(0,t.useState)([]),[en,nn]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[an,tn]=(0,t.useState)([]),[rn,sn]=(0,t.useState)([]),[on,ln]=(0,t.useState)([]),[dn,cn]=(0,t.useState)("all"),[un,pn]=(0,t.useState)(""),[xn,hn]=(0,t.useState)(!1),[gn,mn]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udfaf RestaurantsPage useEffect triggered"),console.log("\ud83c\udfaf searchParams:",n.toString()),bn(),jn(),yn();const e=n.get("managerId"),a=n.get("managerName");e&&a&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:a}),xe(e),Je(decodeURIComponent(a)));const t=n.get("brandId"),r=n.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),cn(t),pn(decodeURIComponent(r)))},[]);const yn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();ln(e)}}catch(e){console.error("Error fetching brands:",e)}},jn=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(sn(n),n.length>0){const e=n[0];nn(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},bn=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API (using same method as StaffManagementPage)...");const e=await fetch("/api/restaurants");if(console.log("\ud83d\udce1 Restaurants API response status:",e.status),e.ok){const n=await e.json();console.log("\u2705 Restaurants API response:",n);const a=await fetch("/api/users?role=Manager");console.log("\ud83d\udce1 Managers API response status:",a.status);const t=a.ok?await a.json():[];console.log("\u2705 Managers API response:",t);const r=n.data||n,s=t.data||t,o=Array.isArray(r)?r:[],i=Array.isArray(s)?s:[];console.log("\u2705 Setting available managers:",i),tn(i);const l=o.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",brand_id:e.brand_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||"monthly",autoRenew:void 0===e.autoRenew||e.autoRenew}});console.log("\u2705 Formatted restaurants:",l),console.log("\u2705 Setting restaurants state with",l.length,"restaurants"),ie(l)}else console.error("\u274c Failed to fetch restaurants data"),ie([]),tn([])}catch(e){console.error("\u274c Error fetching restaurants:",e),ie([]),tn([])}},vn=s.filter(e=>{const n=e.name.toLowerCase().includes(le.toLowerCase())||e.managerName.toLowerCase().includes(le.toLowerCase())||e.cuisine.toLowerCase().includes(le.toLowerCase()),a="all"===ce||e.status===ce,t=e.managerId===pe,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===pe),s="all"===pe||t||r,o="all"===dn||e.brand_id&&e.brand_id.toString()===dn;return"all"!==pe&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:pe,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:s.length,filteredRestaurants:vn.length,searchTerm:le,filterStatus:ce,filterManager:pe,restaurants:s.slice(0,2)});const fn=s.length,Cn=s.filter(e=>"active"===e.status).length,wn=s.reduce((e,n)=>e+n.todaySales,0),An=s.reduce((e,n)=>e+n.todayOrders,0),Fn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,h.jsx)(k,{filled:a<=e,children:"\u2605"},a));return n},Sn=Array.from(new Set(s.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:s.length,filteredCount:vn.length,managersCount:an.length,uniqueManagersCount:Sn.length,firstRestaurant:s[0],firstFiltered:vn[0]}),(0,h.jsx)(o.A,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Restaurants"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(i.cc,{variant:"outline",onClick:()=>{const n=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(vn.map(n=>({"Restaurant Name":n.name,Manager:n.managerName,Location:n.location,Cuisine:n.cuisine,Status:n.status,Rating:n.rating,"Today Sales":(0,u.vv)(n.todaySales,e.currency),"Today Orders":n.todayOrders,"Staff Count":n.staffCount,Phone:n.phone,Email:n.email,Address:n.address,"Created At":n.createdAt}))),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:"Export"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=rn.length>0?rn[0]:null;nn({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?n.base_price_monthly:"29.00",status:"active",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),Pe(""),De([]),_e(!1),Ne([]),ge(!0)},children:"Add Restaurant"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:fn}),(0,h.jsx)(l.v0,{children:"Total Restaurants"}),(0,h.jsx)(l.d1,{children:"Across all managers"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:Cn}),(0,h.jsx)(l.v0,{children:"Active Restaurants"}),(0,h.jsxs)(l.d1,{children:[fn>0?Math.round(Cn/fn*100):0,"% operational"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:(0,u.vv)(wn,e.currency)}),(0,h.jsx)(l.v0,{children:"Today's Total Sales"}),(0,h.jsx)(l.d1,{children:"Combined revenue"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsx)(l.Os,{children:An}),(0,h.jsx)(l.v0,{children:"Today's Orders"}),(0,h.jsx)(l.d1,{children:"All restaurants"})]})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(Y,{placeholder:"Search restaurants...",value:le,onChange:e=>de(e.target.value)}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{type:"text",placeholder:"Search managers...",value:He,onChange:e=>(e=>{if(Je(e),Ze(!0),e.length<1)return void Xe(an.slice(0,10));const n=an.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Xe(n)})(e.target.value),onFocus:()=>{Ze(!0),0===He.length&&Xe(an.slice(0,10))},onBlur:()=>setTimeout(()=>Ze(!1),200)}),"all"!==pe&&He&&(0,h.jsx)(ne,{onClick:()=>{xe("all"),Je(""),Ze(!1)},children:"\xd7"}),(0,h.jsxs)(H,{show:Ge,children:[(0,h.jsxs)(J,{onClick:()=>{xe("all"),Je(""),Ze(!1)},children:[(0,h.jsx)(G,{children:"All Managers"}),(0,h.jsx)(Z,{children:"Show all restaurants"})]}),Qe.map(e=>(0,h.jsxs)(J,{onClick:()=>(e=>{xe(e.id.toString()),Je(e.full_name||e.username),Ze(!1)})(e),children:[(0,h.jsx)(G,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{type:"text",placeholder:"Search brands...",value:un,onChange:e=>(e=>{if(pn(e),hn(!0),e.length<1)return void mn(on.slice(0,10));const n=on.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);mn(n)})(e.target.value),onFocus:()=>{hn(!0),0===un.length&&mn(on.slice(0,10))},onBlur:()=>setTimeout(()=>hn(!1),200)}),"all"!==dn&&un&&(0,h.jsx)(ne,{onClick:()=>{cn("all"),pn(""),hn(!1),a("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,h.jsxs)(H,{show:xn,children:[(0,h.jsxs)(J,{onClick:()=>{cn("all"),pn(""),hn(!1),a("/pos/admin/restaurants",{replace:!0})},children:[(0,h.jsx)(G,{children:"All Brands"}),(0,h.jsx)(Z,{children:"Show all restaurants"})]}),gn.map(e=>(0,h.jsxs)(J,{onClick:()=>(e=>{cn(e.id.toString()),pn(e.name),hn(!1)})(e),children:[(0,h.jsx)(G,{children:e.name}),(0,h.jsxs)(Z,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,h.jsxs)(V,{value:ce,onChange:e=>ue(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)(g,{children:0===vn.length?(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===s.length?"\ud83d\udd04 Loading restaurants...":"\ud83d\udced No restaurants found matching your criteria.",(0,h.jsx)("br",{}),(0,h.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",s.length," | Filtered: ",vn.length]})]}):vn.map(n=>(0,h.jsxs)(m,{children:[(0,h.jsxs)(y,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(b,{children:n.name}),(0,h.jsx)(v,{children:n.managers&&n.managers.length>0?n.managers.map(e=>`${e.name}${e.isPrimary?" (Primary)":""}`).join(", "):n.managerName||"No Manager Assigned"}),(0,h.jsxs)(v,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,h.jsx)(f,{status:n.status,children:n.status})]}),(0,h.jsxs)(S,{children:[Fn(n.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Created: ",new Date(n.createdAt).toLocaleDateString()]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:(0,u.vv)(n.todaySales,e.currency)}),(0,h.jsx)(F,{children:"Today's Sales"})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:n.todayOrders}),(0,h.jsx)(F,{children:"Orders"})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:n.staffCount}),(0,h.jsx)(F,{children:"Staff"})]})]}),(0,h.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,h.jsx)(ae,{onClick:()=>(e=>{Ee(e),Te(!0)})(n),children:"View"}),(0,h.jsx)(O,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),a(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(n),children:"Report"}),(0,h.jsx)(O,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",an);const n=rn.length>0?rn[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=e.planAmount||(n?n.base_price_monthly:"29.00"),r={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(ke(r),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=an.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),qe(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=an.find(n=>n.id.toString()===e.managerId.toString());qe(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),qe([]);Oe(""),We([]),Ye(!1),ye(!0)})(n),children:"Edit"}),(0,h.jsx)(O,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)ie(s.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(n),style:{background:"active"===n.status?"#FEE2E2":"#ECFDF5",color:"active"===n.status?"#DC2626":"#059669",border:"1px solid "+("active"===n.status?"#FCA5A5":"#A7F3D0")},children:"active"===n.status?"Deactivate":"Activate"})]})]},n.id))}),he&&(0,h.jsx)(B,{show:he,onClick:()=>ge(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(I,{children:[(0,h.jsx)(T,{children:"Add Restaurant"}),(0,h.jsx)(R,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(_,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Restaurant Name *"}),(0,h.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:en.name,onChange:e=>nn({...en,name:e.target.value})})]}),(0,h.jsxs)(z,{style:{position:"relative"},children:[(0,h.jsx)(D,{children:"Managers (Multiple selection supported)"}),(0,h.jsxs)(W,{children:[(0,h.jsx)(q,{type:"text",placeholder:"Type to search and select managers...",value:Re,onChange:e=>(e=>{if(Pe(e),_e(!0),e.length<2)return void De([]);const n=an.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));De(n.slice(0,5))})(e.target.value),onFocus:()=>{_e(!0),0===Re.length&&De(an.slice(0,10))},onBlur:()=>setTimeout(()=>_e(!1),200)}),(0,h.jsx)(H,{show:Me,children:ze.map(e=>(0,h.jsxs)(J,{onClick:()=>(e=>{$e.find(n=>n.id===e.id)||Ne([...$e,e]),Pe(""),_e(!1)})(e),children:[(0,h.jsx)(G,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email]})]},e.id))})]}),$e.length>0&&(0,h.jsx)(Q,{children:$e.map(e=>(0,h.jsxs)(X,{children:[e.full_name||e.username,(0,h.jsx)(ee,{onClick:()=>{return n=e.id.toString(),void Ne($e.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Email Address *"}),(0,h.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:en.email,onChange:e=>nn({...en,email:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Phone Number *"}),(0,h.jsx)(x.A,{value:en.phone,onChange:e=>nn({...en,phone:e}),defaultCountry:en.country})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Address *"}),(0,h.jsx)(L,{placeholder:"Enter restaurant address",value:en.address,onChange:e=>nn({...en,address:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"City"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Kuala Lumpur",value:en.city,onChange:e=>nn({...en,city:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"State / Province"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Selangor",value:en.state,onChange:e=>nn({...en,state:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Postal Code"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 50000",value:en.postalCode,onChange:e=>nn({...en,postalCode:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Country"}),(0,h.jsxs)(N,{value:en.country,onChange:e=>nn({...en,country:e.target.value}),children:[(0,h.jsx)("option",{value:"MY",children:"Malaysia"}),(0,h.jsx)("option",{value:"SG",children:"Singapore"}),(0,h.jsx)("option",{value:"TH",children:"Thailand"}),(0,h.jsx)("option",{value:"KR",children:"South Korea"}),(0,h.jsx)("option",{value:"ID",children:"Indonesia"}),(0,h.jsx)("option",{value:"PH",children:"Philippines"}),(0,h.jsx)("option",{value:"VN",children:"Vietnam"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Business Registration No."}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 123456-A",value:en.businessRegistration,onChange:e=>nn({...en,businessRegistration:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Tax ID / GST No."}),(0,h.jsx)($,{type:"text",placeholder:"e.g., 000123456789",value:en.taxId,onChange:e=>nn({...en,taxId:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:en.cuisine,onChange:e=>nn({...en,cuisine:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Plan Type *"}),(0,h.jsx)(N,{value:en.planType,onChange:e=>{var n;const a=rn.find(n=>n.display_name===e.target.value);nn({...en,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:rn.map(n=>(0,h.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,u.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Status *"}),(0,h.jsxs)(N,{value:en.status,onChange:e=>nn({...en,status:e.target.value}),children:[(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Billing Cycle *"}),(0,h.jsxs)(N,{value:en.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[en.planType]||a["Basic Plan"];nn({...en,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Payment Model *"}),(0,h.jsxs)(N,{value:en.paymentModel,onChange:e=>nn({...en,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Subscription Start Date *"}),(0,h.jsx)($,{type:"date",value:en.subscriptionStart,onChange:e=>nn({...en,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Subscription End Date *"}),(0,h.jsx)($,{type:"date",value:en.subscriptionEnd,onChange:e=>nn({...en,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(z,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:en.autoRenew,onChange:e=>nn({...en,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[en.planType," - $",en.planAmount," (",en.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===en.paymentModel?"Brand Manager":"foodcourt_manager"===en.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),Ce&&(0,h.jsx)(d.IM,{children:Ce})]}),(0,h.jsxs)(M,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{we(""),ge(!1)},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",en),console.log("Selected managers:",$e),we(""),!en.name||0===$e.length||!en.email||!en.phone||!en.address)return void we("Please fill in all required fields. At least one manager must be selected.");const e=parseInt($e[0].id.toString()),n={name:en.name,managerId:e,managerIds:$e.map(e=>parseInt(e.id.toString())),email:en.email,phone:en.phone,address:en.address,city:en.city,state:en.state,postal_code:en.postalCode,country:en.country,business_registration:en.businessRegistration,tax_id:en.taxId,location:en.address,cuisine:en.cuisine||"Various",status:en.status,planType:en.planType,planAmount:parseFloat(en.planAmount),billingCycle:en.billingCycle,payment_model:en.paymentModel,autoRenew:en.autoRenew,subscriptionStart:en.subscriptionStart,subscriptionEnd:en.subscriptionEnd};console.log("\ud83d\udce4 Sending restaurant data:",n);const a=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant created successfully:",e),we(""),ge(!1),await bn()}else{const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",e),we(`Error creating restaurant: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error adding restaurant:",e),we("Error adding restaurant. Please check your connection and try again.")}},children:"Add Restaurant"})]})]})}),me&&Se&&(0,h.jsx)(B,{show:me,onClick:()=>ye(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(I,{children:[(0,h.jsx)(T,{children:"Edit Restaurant"}),(0,h.jsx)(R,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(_,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Restaurant Name *"}),(0,h.jsx)($,{type:"text",placeholder:"Enter restaurant name",value:Se.name,onChange:e=>ke({...Se,name:e.target.value})})]}),(0,h.jsxs)(z,{style:{position:"relative"},children:[(0,h.jsx)(D,{children:"Managers (Multiple selection supported)"}),(0,h.jsxs)(W,{children:[(0,h.jsx)(q,{type:"text",placeholder:"Type to search and select managers...",value:Le,onChange:e=>(e=>{if(Oe(e),Ye(!0),e.length<1)return void We(an.slice(0,10));const n=an.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));We(n.slice(0,10))})(e.target.value),onFocus:()=>{Ye(!0),0===Le.length&&We(an.slice(0,10))},onBlur:()=>setTimeout(()=>Ye(!1),200)}),(0,h.jsx)(H,{show:Ue,children:Ve.map(e=>(0,h.jsxs)(J,{onClick:()=>(e=>{Ke.find(n=>n.id===e.id)||qe([...Ke,e]),Oe(""),Ye(!1)})(e),children:[(0,h.jsx)(G,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email]})]},e.id))})]}),Ke.length>0&&(0,h.jsx)(Q,{children:Ke.map(e=>(0,h.jsxs)(X,{children:[e.full_name||e.username,(0,h.jsx)(ee,{onClick:()=>{return n=e.id.toString(),void qe(Ke.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Email Address *"}),(0,h.jsx)($,{type:"email",placeholder:"restaurant@example.com",value:Se.email||"",onChange:e=>ke({...Se,email:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Phone Number *"}),(0,h.jsx)(x.A,{value:Se.phone||"",onChange:e=>ke({...Se,phone:e}),defaultCountry:Se.country})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Address *"}),(0,h.jsx)(L,{placeholder:"Enter restaurant address",value:Se.address||Se.location,onChange:e=>ke({...Se,address:e.target.value,location:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)($,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Se.cuisine,onChange:e=>ke({...Se,cuisine:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Plan Type *"}),(0,h.jsx)(N,{value:Se.planType||"Basic Plan",onChange:e=>{var n;const a=rn.find(n=>n.display_name===e.target.value);ke({...Se,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:rn.map(n=>(0,h.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,u.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Status *"}),(0,h.jsxs)(N,{value:Se.status,onChange:e=>ke({...Se,status:e.target.value}),children:[(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Billing Cycle *"}),(0,h.jsxs)(N,{value:Se.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Se.planType||"Basic Plan"]||a["Basic Plan"];ke({...Se,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Payment Model *"}),(0,h.jsxs)(N,{value:Se.paymentModel||"restaurant",onChange:e=>ke({...Se,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Subscription Start Date *"}),(0,h.jsx)($,{type:"date",value:Se.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>ke({...Se,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Subscription End Date *"}),(0,h.jsx)($,{type:"date",value:Se.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>ke({...Se,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(z,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:Se.autoRenew||!0,onChange:e=>ke({...Se,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Se.planType||"Basic Plan"," - $",Se.planAmount||"29.00"," (",Se.billingCycle||"monthly",")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Se.paymentModel?"Brand Manager":"foodcourt_manager"===Se.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),Ae&&(0,h.jsx)(d.IM,{children:Ae})]}),(0,h.jsxs)(M,{children:[(0,h.jsx)(i.cc,{variant:"cancel",onClick:()=>{Fe(""),ye(!1)},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"danger-outline",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`))try{console.log("Deleting restaurant:",e.id),Fe("");const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(console.log("\ud83d\udce1 Restaurant delete API response status:",a.status),a.ok)console.log("\u2705 Restaurant deleted successfully"),Fe(""),ye(!1),ke(null),fe("Restaurant deleted successfully!"),be(!0),await bn();else{const e=await a.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to delete restaurant:",e),Fe(`Error deleting restaurant: ${e.error||"Please try again."}`)}}catch(n){console.error("\u274c Error deleting restaurant:",n),Fe("Error deleting restaurant. Please check your connection and try again.")}})(Se),children:"Delete"}),(0,h.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Se)try{if(console.log("\ud83d\udd04 Updating restaurant:",Se),console.log("\ud83d\udd0d Selected edit managers:",Ke),Fe(""),!Se.name||0===Ke.length)return void Fe("Please fill in all required fields. At least one manager must be selected.");const e=parseInt(Ke[0].id.toString()),n={name:Se.name,managerId:e,managerIds:Ke.map(e=>parseInt(e.id.toString())),email:Se.email||"",phone:Se.phone||"",address:Se.address||Se.location||"",location:Se.address||Se.location||"",cuisine:Se.cuisine||"Various",status:Se.status,planType:Se.planType||"Basic Plan",planAmount:parseFloat(Se.planAmount||"29.00"),billingCycle:Se.billingCycle||"monthly",payment_model:Se.paymentModel||"restaurant",autoRenew:Se.autoRenew||!0,subscriptionStart:Se.subscriptionStart,subscriptionEnd:Se.subscriptionEnd};console.log("\ud83d\udce4 Sending restaurant update data:",n);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${Se.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Restaurant update API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant updated successfully:",e),Fe(""),ye(!1),ke(null),await bn()}else{const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",e),Fe(`Error updating restaurant: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating restaurant:",e),Fe("Error updating restaurant. Please check your connection and try again.")}},children:"Update Restaurant"})]})]})}),Ie&&Be&&(0,h.jsx)(B,{show:Ie,onClick:()=>Te(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(I,{children:[(0,h.jsx)(T,{children:"Restaurant Details"}),(0,h.jsx)(R,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,h.jsx)(P,{children:(0,h.jsxs)(_,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Restaurant Name"}),(0,h.jsx)($,{type:"text",value:Be.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(D,{children:["Manager",Be.managers&&Be.managers.length>1?"s":""]}),(0,h.jsx)(L,{value:Be.managers&&Be.managers.length>0?Be.managers.map((e,n)=>`${n+1}. ${e.name}${e.isPrimary?" (Primary)":""} - ${e.email}`).join("\n"):Be.managerName||"No Manager Assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"80px"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Email Address"}),(0,h.jsx)($,{type:"email",value:Be.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Phone Number"}),(0,h.jsx)($,{type:"tel",value:(0,p.FI)(Be.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Address"}),(0,h.jsx)(L,{value:Be.address||Be.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)($,{type:"text",value:Be.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Status"}),(0,h.jsx)($,{type:"text",value:"active"===Be.status?"Active":"Inactive",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Plan Type"}),(0,h.jsx)($,{type:"text",value:Be.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{children:"Created Date"}),(0,h.jsx)($,{type:"text",value:Be.createdAt?new Date(Be.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})})]})}),je&&(0,h.jsx)(B,{show:je,onClick:()=>be(!1),children:(0,h.jsxs)(te,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(re,{children:"\u2713"}),(0,h.jsx)(se,{children:"Success!"}),(0,h.jsx)(oe,{children:ve}),(0,h.jsx)(i.cc,{variant:"primary",onClick:()=>be(!1),children:"OK"})]})})]})]})})}},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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
`}}]);