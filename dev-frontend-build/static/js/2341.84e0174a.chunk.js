"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>ie});var t=a(9950),r=a(4492),s=a(4752),o=a(3705),i=a(2674),l=a(9610),d=a(9018),c=a(6038),p=a(2924),u=a(8666),x=a(2435),h=a(4414);const g=s.Ay.div`
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
`,f=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,v=s.Ay.span`
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
`,F=s.Ay.div`
  text-align: center;
`,w=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,A=s.Ay.div`
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
  align-items: flex-start;
  padding: 40px 0;
  overflow-y: auto;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
`,E=s.Ay.div`
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
`,I=s.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,T=s.Ay.button`
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
`,_=s.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
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
`,N=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,D=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,M=s.Ay.input`
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
`,$=s.Ay.select`
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
`,L=s.Ay.textarea`
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
  position: relative;
  z-index: 100;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,W=s.Ay.input`
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
`,Y=s.Ay.select`
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
`,K=s.Ay.div`
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
`,V=s.Ay.input`
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
`,J=s.Ay.div`
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
`,H=s.Ay.div`
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
`,ie=()=>{const{operationSettings:e}=(0,d.Pj)(),[n]=(0,r.ok)(),a=(0,r.Zp)(),[s,ie]=(0,t.useState)([]),[le,de]=(0,t.useState)(""),[ce,pe]=(0,t.useState)("all"),[ue,xe]=(0,t.useState)("all"),[he,ge]=(0,t.useState)(!1),[me,ye]=(0,t.useState)(!1),[je,be]=(0,t.useState)(!1),[fe,ve]=(0,t.useState)(""),[Ce,Fe]=(0,t.useState)(""),[we,Ae]=(0,t.useState)(""),[Se,ke]=(0,t.useState)(null),[Be,Ee]=(0,t.useState)(null),[ze,Ie]=(0,t.useState)(!1),[Te,Re]=(0,t.useState)(""),[_e,Pe]=(0,t.useState)(!1),[Ne,De]=(0,t.useState)([]),[Me,$e]=(0,t.useState)([]),[Le,Oe]=(0,t.useState)(""),[Ue,We]=(0,t.useState)(!1),[Ye,Ke]=(0,t.useState)([]),[qe,Ve]=(0,t.useState)([]),[Je,Ge]=(0,t.useState)(""),[He,Ze]=(0,t.useState)(!1),[Qe,Xe]=(0,t.useState)([]),[en,nn]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[an,tn]=(0,t.useState)([]),[rn,sn]=(0,t.useState)([]),[on,ln]=(0,t.useState)([]),[dn,cn]=(0,t.useState)("create"),[pn,un]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[xn,hn]=(0,t.useState)(null),[gn,mn]=(0,t.useState)([]),[yn,jn]=(0,t.useState)(""),[bn,fn]=(0,t.useState)(!1),[vn,Cn]=(0,t.useState)("keep"),[Fn,wn]=(0,t.useState)({fullName:"",email:"",username:"",password:"",phone:""}),[An,Sn]=(0,t.useState)(null),[kn,Bn]=(0,t.useState)(""),[En,zn]=(0,t.useState)(!1),[In,Tn]=(0,t.useState)("all"),[Rn,_n]=(0,t.useState)(""),[Pn,Nn]=(0,t.useState)(!1),[Dn,Mn]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udfaf RestaurantsPage useEffect triggered"),console.log("\ud83c\udfaf searchParams:",n.toString()),On(),Ln(),$n();const e=n.get("managerId"),a=n.get("managerName");e&&a&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:a}),xe(e),Ge(decodeURIComponent(a)));const t=n.get("brandId"),r=n.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),Tn(t),_n(decodeURIComponent(r)))},[]);const $n=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();ln(e)}}catch(e){console.error("Error fetching brands:",e)}},Ln=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(sn(n),n.length>0){const e=n[0];nn(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},On=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API (using same method as StaffManagementPage)...");const e=localStorage.getItem("auth_token"),n=e?{Authorization:`Bearer ${e}`}:{},a=await fetch("/api/restaurants",{headers:n});if(console.log("\ud83d\udce1 Restaurants API response status:",a.status),a.ok){const e=await a.json();console.log("\u2705 Restaurants API response:",e);const t=await fetch("/api/users?role=Manager",{headers:n});console.log("\ud83d\udce1 Managers API response status:",t.status);const r=t.ok?await t.json():[];console.log("\u2705 Managers API response:",r);const s=e.data||e,o=r.data||r,i=Array.isArray(s)?s:[],l=Array.isArray(o)?o:[];console.log("\u2705 Setting available managers:",l),tn(l);const d=i.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",admin:e.admin||null,managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",email:e.email||"",phone:e.phone||"",address:e.address||"",country:e.country||"",brand_id:e.brand_id||null,foodcourt_id:e.foodcourt_id||null,paymentModel:e.payment_model||"restaurant",subscriptionStart:e.subscriptionStart||null,subscriptionEnd:e.subscriptionEnd||null,planType:e.planType||"Basic Plan",planAmount:e.planAmount||"29.00",billingCycle:e.billingCycle||"monthly",autoRenew:void 0===e.autoRenew||e.autoRenew}});console.log("\u2705 Formatted restaurants:",d),console.log("\u2705 Setting restaurants state with",d.length,"restaurants"),ie(d)}else console.error("\u274c Failed to fetch restaurants data"),ie([]),tn([])}catch(e){console.error("\u274c Error fetching restaurants:",e),ie([]),tn([])}},Un=async e=>{jn(e),fn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();mn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Wn=async e=>{Bn(e),zn(!0);try{const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/available-admins?q=${encodeURIComponent(e)}`,{headers:n?{Authorization:`Bearer ${n}`}:{}});if(a.ok){const e=await a.json();mn(e.data||[])}}catch(n){console.error("Error searching admin candidates:",n)}},Yn=s.filter(e=>{const n=e.name.toLowerCase().includes(le.toLowerCase())||e.managerName.toLowerCase().includes(le.toLowerCase())||e.cuisine.toLowerCase().includes(le.toLowerCase()),a="all"===ce||e.status===ce,t=e.managerId===ue,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===ue),s="all"===ue||t||r,o="all"===In||e.brand_id&&e.brand_id.toString()===In;return"all"!==ue&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:ue,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:s.length,filteredRestaurants:Yn.length,searchTerm:le,filterStatus:ce,filterManager:ue,restaurants:s.slice(0,2)});const Kn=s.length,qn=s.filter(e=>"active"===e.status).length,Vn=s.reduce((e,n)=>e+n.todaySales,0),Jn=s.reduce((e,n)=>e+n.todayOrders,0),Gn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,h.jsx)(k,{filled:a<=e,children:"\u2605"},a));return n},Hn=Array.from(new Set(s.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:s.length,filteredCount:Yn.length,managersCount:an.length,uniqueManagersCount:Hn.length,firstRestaurant:s[0],firstFiltered:Yn[0]}),(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(i.mc,{children:[(0,h.jsxs)(i.Y9,{children:[(0,h.jsx)(i.hE,{children:"Restaurants"}),(0,h.jsxs)(i.ex,{children:[(0,h.jsx)(o.cc,{variant:"outline",onClick:()=>{const n=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Yn.map(n=>({"Restaurant Name":n.name,Manager:n.managerName,Location:n.location,Cuisine:n.cuisine,Status:n.status,Rating:n.rating,"Today Sales":(0,c.vv)(n.todaySales,e.currency),"Today Orders":n.todayOrders,"Staff Count":n.staffCount,Phone:n.phone,Email:n.email,Address:n.address,"Created At":n.createdAt}))),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:"Export"}),(0,h.jsx)(o.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=rn.length>0?rn[0]:null;nn({name:"",managerId:"",email:"",phone:"",address:"",city:"",state:"",postalCode:"",country:"MY",businessRegistration:"",taxId:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?n.base_price_monthly:"29.00",status:"active",enableTrial:!0,billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),Re(""),De([]),Pe(!1),$e([]),cn("create"),un({fullName:"",email:"",username:"",password:"",phone:""}),hn(null),mn([]),jn(""),fn(!1),ge(!0)},children:"Add Restaurant"})]})]}),(0,h.jsxs)(i.UC,{children:[(0,h.jsxs)(i.MD,{children:[(0,h.jsxs)(i.hI,{color:"#059669",children:[(0,h.jsx)(i.Os,{children:Kn}),(0,h.jsx)(i.v0,{children:"Total Restaurants"}),(0,h.jsx)(i.d1,{children:"Across all managers"})]}),(0,h.jsxs)(i.hI,{color:"#2563EB",children:[(0,h.jsx)(i.Os,{children:qn}),(0,h.jsx)(i.v0,{children:"Active Restaurants"}),(0,h.jsxs)(i.d1,{children:[Kn>0?Math.round(qn/Kn*100):0,"% operational"]})]}),(0,h.jsxs)(i.hI,{color:"#7C3AED",children:[(0,h.jsx)(i.Os,{children:(0,c.vv)(Vn,e.currency)}),(0,h.jsx)(i.v0,{children:"Today's Total Sales"}),(0,h.jsx)(i.d1,{children:"Combined revenue"})]}),(0,h.jsxs)(i.hI,{color:"#D97706",children:[(0,h.jsx)(i.Os,{children:Jn}),(0,h.jsx)(i.v0,{children:"Today's Orders"}),(0,h.jsx)(i.d1,{children:"All restaurants"})]})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(W,{placeholder:"Search restaurants...",value:le,onChange:e=>de(e.target.value)}),(0,h.jsxs)(q,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Search managers...",value:Je,onChange:e=>(e=>{if(Ge(e),Ze(!0),e.length<1)return void Xe(an.slice(0,10));const n=an.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Xe(n)})(e.target.value),onFocus:()=>{Ze(!0),0===Je.length&&Xe(an.slice(0,10))},onBlur:()=>setTimeout(()=>Ze(!1),200)}),"all"!==ue&&Je&&(0,h.jsx)(ne,{onClick:()=>{xe("all"),Ge(""),Ze(!1)},children:"\xd7"}),(0,h.jsxs)(J,{show:He,children:[(0,h.jsxs)(G,{onClick:()=>{xe("all"),Ge(""),Ze(!1)},children:[(0,h.jsx)(H,{children:"All Managers"}),(0,h.jsx)(Z,{children:"Show all restaurants"})]}),Qe.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{xe(e.id.toString()),Ge(e.full_name||e.username),Ze(!1)})(e),children:[(0,h.jsx)(H,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Search brands...",value:Rn,onChange:e=>(e=>{if(_n(e),Nn(!0),e.length<1)return void Mn(on.slice(0,10));const n=on.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);Mn(n)})(e.target.value),onFocus:()=>{Nn(!0),0===Rn.length&&Mn(on.slice(0,10))},onBlur:()=>setTimeout(()=>Nn(!1),200)}),"all"!==In&&Rn&&(0,h.jsx)(ne,{onClick:()=>{Tn("all"),_n(""),Nn(!1),a("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,h.jsxs)(J,{show:Pn,children:[(0,h.jsxs)(G,{onClick:()=>{Tn("all"),_n(""),Nn(!1),a("/pos/admin/restaurants",{replace:!0})},children:[(0,h.jsx)(H,{children:"All Brands"}),(0,h.jsx)(Z,{children:"Show all restaurants"})]}),Dn.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{Tn(e.id.toString()),_n(e.name),Nn(!1)})(e),children:[(0,h.jsx)(H,{children:e.name}),(0,h.jsxs)(Z,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,h.jsxs)(Y,{value:ce,onChange:e=>pe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,h.jsx)(g,{children:0===Yn.length?(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===s.length?"\ud83d\udd04 Loading restaurants...":"\ud83d\udced No restaurants found matching your criteria.",(0,h.jsx)("br",{}),(0,h.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",s.length," | Filtered: ",Yn.length]})]}):Yn.map(n=>(0,h.jsxs)(m,{children:[(0,h.jsxs)(y,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(b,{children:n.name}),(0,h.jsxs)(f,{children:["Admin: ",n.admin?`${n.admin.name} (${n.admin.email})`:"No Admin Assigned"]}),n.managers&&n.managers.length>0&&(0,h.jsxs)(f,{children:["Managers: ",n.managers.map(e=>e.name).join(", ")]}),(0,h.jsxs)(f,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,h.jsx)(v,{status:n.status,children:n.status})]}),(0,h.jsxs)(S,{children:[Gn(n.rating),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Created: ",new Date(n.createdAt).toLocaleDateString()]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:(0,c.vv)(n.todaySales,e.currency)}),(0,h.jsx)(A,{children:"Today's Sales"})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:n.todayOrders}),(0,h.jsx)(A,{children:"Orders"})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:n.staffCount}),(0,h.jsx)(A,{children:"Staff"})]})]}),(0,h.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,h.jsx)(ae,{onClick:()=>(e=>{Ee(e),Ie(!0)})(n),children:"View"}),(0,h.jsx)(O,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),a(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(n),children:"Report"}),(0,h.jsx)(O,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",an);const n=rn.length>0?rn[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=e.planAmount||(n?n.base_price_monthly:"29.00"),r={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(ke(r),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=an.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),Ve(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=an.find(n=>n.id.toString()===e.managerId.toString());Ve(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),Ve([]);Oe(""),Ke([]),We(!1),Cn("keep"),wn({fullName:"",email:"",username:"",password:"",phone:""}),Sn(null),Bn(""),zn(!1),ye(!0)})(n),children:"Edit"}),(0,h.jsx)(O,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)ie(s.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(n),style:{background:"active"===n.status?"#FEE2E2":"#ECFDF5",color:"active"===n.status?"#DC2626":"#059669",border:"1px solid "+("active"===n.status?"#FCA5A5":"#A7F3D0")},children:"active"===n.status?"Deactivate":"Activate"})]})]},n.id))}),he&&(0,h.jsx)(B,{show:he,onClick:()=>ge(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(I,{children:"Add Restaurant"}),(0,h.jsx)(T,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,h.jsxs)(R,{children:[(0,h.jsxs)(P,{children:[(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(D,{children:"Restaurant Name *"}),(0,h.jsx)(M,{type:"text",placeholder:"Enter restaurant name",value:en.name,onChange:e=>nn({...en,name:e.target.value})})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin *"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"16px",marginTop:"12px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===dn?"#F0EFFF":"#F9FAFB",border:"create"===dn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"radio",name:"adminAction",checked:"create"===dn,onChange:()=>{cn("create"),hn(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"assign"===dn?"#F0EFFF":"#F9FAFB",border:"assign"===dn?"2px solid #635BFF":"2px solid #E5E7EB",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"radio",name:"adminAction",checked:"assign"===dn,onChange:()=>{cn("assign"),un({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]})]})]}),"create"===dn?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Admin Full Name *"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Kim Owner",value:pn.fullName,onChange:e=>un({...pn,fullName:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Admin Email *"}),(0,h.jsx)(M,{type:"email",placeholder:"admin@restaurant.com",value:pn.email,onChange:e=>un({...pn,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Admin Username *"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., kim_owner",value:pn.username,onChange:e=>un({...pn,username:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Admin Password *"}),(0,h.jsx)(M,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:pn.password,onChange:e=>un({...pn,password:e.target.value})})]}),(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(D,{children:"Admin Phone"}),(0,h.jsx)(u.A,{value:pn.phone,onChange:e=>un({...pn,phone:e}),defaultCountry:en.country})]})]}):(0,h.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(D,{children:"Search and select an existing user"}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Type to search by name, email, or username...",value:yn,onChange:e=>Un(e.target.value),onFocus:()=>Un(yn),onBlur:()=>setTimeout(()=>fn(!1),200)}),(0,h.jsx)(J,{show:bn,children:0===gn.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:yn.length>0?"No available users found":"Type to search users..."}):gn.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{hn(e),jn(e.full_name||e.username),fn(!1)})(e),children:[(0,h.jsx)(H,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),xn&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:xn.full_name||xn.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[xn.email," \u2022 ",xn.role]})]}),(0,h.jsx)("button",{onClick:()=>{hn(null),jn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers (Optional)"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,h.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Search and select oversight managers...",value:Te,onChange:e=>(e=>{if(Re(e),Pe(!0),e.length<1)return void De(an.slice(0,10));const n=an.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())||n.email&&n.email.toLowerCase().includes(e.toLowerCase()));De(n.slice(0,10))})(e.target.value),onFocus:()=>{Pe(!0),De(an.slice(0,10))},onBlur:()=>setTimeout(()=>Pe(!1),200)}),(0,h.jsx)(J,{show:_e,children:Ne.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{Me.find(n=>n.id===e.id)||$e([...Me,e]),Re(""),Pe(!1)})(e),children:[(0,h.jsx)(H,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),Me.length>0&&(0,h.jsx)(Q,{children:Me.map(e=>(0,h.jsxs)(X,{children:[e.full_name||e.username,(0,h.jsx)(ee,{onClick:()=>{return n=e.id.toString(),void $e(Me.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Email Address *"}),(0,h.jsx)(M,{type:"email",placeholder:"restaurant@example.com",value:en.email,onChange:e=>nn({...en,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Phone Number *"}),(0,h.jsx)(u.A,{value:en.phone,onChange:e=>nn({...en,phone:e}),defaultCountry:en.country})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Address *"}),(0,h.jsx)(L,{placeholder:"Enter restaurant address",value:en.address,onChange:e=>nn({...en,address:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"City"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Kuala Lumpur",value:en.city,onChange:e=>nn({...en,city:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"State / Province"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Selangor",value:en.state,onChange:e=>nn({...en,state:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Postal Code"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 50000",value:en.postalCode,onChange:e=>nn({...en,postalCode:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Country"}),(0,h.jsx)($,{value:en.country,onChange:e=>nn({...en,country:e.target.value}),children:x.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Business Registration No."}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 123456-A",value:en.businessRegistration,onChange:e=>nn({...en,businessRegistration:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Tax ID / GST No."}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 000123456789",value:en.taxId,onChange:e=>nn({...en,taxId:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:en.cuisine,onChange:e=>nn({...en,cuisine:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Plan Type *"}),(0,h.jsx)($,{value:en.planType,onChange:e=>{var n;const a=rn.find(n=>n.display_name===e.target.value);nn({...en,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:rn.map(n=>(0,h.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,c.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,h.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===en.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===en.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"checkbox",checked:"trial"===en.status,onChange:e=>{if(e.target.checked){const e=new Date,n=new Date;n.setDate(n.getDate()+7),nn({...en,status:"trial",subscriptionStart:e.toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0],planAmount:"0.00"})}else{var n,a;nn({...en,status:"active",planAmount:(null===(n=rn.find(e=>e.display_name===en.planType))||void 0===n||null===(a=n.base_price_monthly)||void 0===a?void 0:a.toString())||"29.00"})}},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"New restaurant will start with a 7-day free trial period"})]})]})}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Billing Cycle *"}),(0,h.jsxs)($,{value:en.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[en.planType]||a["Basic Plan"];nn({...en,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Payment Model *"}),(0,h.jsxs)($,{value:en.paymentModel,onChange:e=>nn({...en,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Subscription Start Date *"}),(0,h.jsx)(M,{type:"date",value:en.subscriptionStart,onChange:e=>nn({...en,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Subscription End Date *"}),(0,h.jsx)(M,{type:"date",value:en.subscriptionEnd,onChange:e=>nn({...en,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:en.autoRenew,onChange:e=>nn({...en,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[en.planType," - $",en.planAmount," (",en.billingCycle,")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===en.paymentModel?"Brand Manager":"foodcourt_manager"===en.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),Ce&&(0,h.jsx)(l.IM,{children:Ce})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)(o.cc,{variant:"cancel",onClick:()=>{Fe(""),ge(!1)},children:"Cancel"}),(0,h.jsx)(o.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",en),console.log("Selected managers:",Me),Fe(""),!en.name||!en.email||!en.phone||!en.address)return void Fe("Please fill in all required fields (Name, Email, Phone, Address).");if("create"===dn){if(!pn.fullName||!pn.email||!pn.username||!pn.password)return void Fe("Please fill in all required Restaurant Admin fields (Full Name, Email, Username, Password).");if(pn.password.length<8)return void Fe("Admin password must be at least 8 characters.");if(!/[a-z]/.test(pn.password)||!/[A-Z]/.test(pn.password)||!/[0-9]/.test(pn.password))return void Fe("Admin password must contain uppercase, lowercase letters and a number.")}else if("assign"===dn&&!xn)return void Fe("Please select an existing user as Restaurant Admin.");const a={name:en.name,adminAction:dn,managerIds:Me.map(e=>parseInt(e.id.toString())),email:en.email,phone:en.phone,address:en.address,city:en.city,state:en.state,postal_code:en.postalCode,country:en.country,business_registration:en.businessRegistration,tax_id:en.taxId,location:en.address,cuisine:en.cuisine||"Various",status:en.status,planType:en.planType,planAmount:parseFloat(en.planAmount),billingCycle:en.billingCycle,payment_model:en.paymentModel,autoRenew:en.autoRenew,subscriptionStart:en.subscriptionStart,subscriptionEnd:en.subscriptionEnd};"create"===dn?(a.adminEmail=pn.email,a.adminPassword=pn.password,a.adminUsername=pn.username,a.adminFullName=pn.fullName,a.adminPhone=pn.phone||void 0):"assign"===dn&&(a.adminUserId=parseInt(xn.id.toString())),console.log("\ud83d\udce4 Sending restaurant data:",a);const t=localStorage.getItem("auth_token"),r=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant created successfully:",e),Fe(""),ge(!1),await On()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);Fe(t)}}catch(a){console.error("\u274c Error adding restaurant:",a),Fe("Error adding restaurant. Please check your connection and try again.")}},children:"Add Restaurant"})]})]})}),me&&Se&&(0,h.jsx)(B,{show:me,onClick:()=>ye(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(I,{children:"Edit Restaurant"}),(0,h.jsx)(T,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,h.jsxs)(R,{children:[(0,h.jsxs)(P,{children:[(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(D,{children:"Restaurant Name *"}),(0,h.jsx)(M,{type:"text",placeholder:"Enter restaurant name",value:Se.name,onChange:e=>ke({...Se,name:e.target.value})})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"8px",marginBottom:"4px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Restaurant Admin"})}),Se.admin?(0,h.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Se.admin.name}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Se.admin.email," ",Se.admin.phone?`\u2022 ${Se.admin.phone}`:""]})]}),"keep"===vn&&(0,h.jsx)("button",{onClick:()=>Cn("change"),style:{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#92400E"},children:"Change Admin"})]})}):(0,h.jsx)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:"No Restaurant Admin assigned"}),"keep"===vn&&(0,h.jsx)("button",{onClick:()=>Cn("create"),style:{background:"#635BFF",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"12px",fontWeight:"600",color:"#fff"},children:"Assign Admin"})]})}),"keep"!==vn&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",display:"flex",gap:"16px",marginTop:"8px"},children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"create"===vn?"#F0EFFF":"#F9FAFB",border:"create"===vn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"editAdminAction",checked:"create"===vn,onChange:()=>{Cn("create"),Sn(null)},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Create New Account"})]}),(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",padding:"8px 16px",borderRadius:"8px",background:"change"===vn?"#F0EFFF":"#F9FAFB",border:"change"===vn?"2px solid #635BFF":"2px solid #E5E7EB"},children:[(0,h.jsx)("input",{type:"radio",name:"editAdminAction",checked:"change"===vn,onChange:()=>{Cn("change"),wn({fullName:"",email:"",username:"",password:"",phone:""})},style:{accentColor:"#635BFF"}}),(0,h.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Select Existing User"})]}),(0,h.jsx)("button",{onClick:()=>Cn("keep"),style:{background:"none",border:"1px solid #E5E7EB",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"13px",color:"#6B7280"},children:"Cancel"})]}),"create"===vn?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"New Admin Full Name *"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Kim Owner",value:Fn.fullName,onChange:e=>wn({...Fn,fullName:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"New Admin Email *"}),(0,h.jsx)(M,{type:"email",placeholder:"admin@restaurant.com",value:Fn.email,onChange:e=>wn({...Fn,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"New Admin Username *"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., kim_owner",value:Fn.username,onChange:e=>wn({...Fn,username:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"New Admin Password *"}),(0,h.jsx)(M,{type:"password",placeholder:"Min 8 chars, uppercase + lowercase + number",value:Fn.password,onChange:e=>wn({...Fn,password:e.target.value})})]})]}):(0,h.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:100},children:[(0,h.jsx)(D,{children:"Search and select an existing user"}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Type to search by name, email, or username...",value:kn,onChange:e=>Wn(e.target.value),onFocus:()=>Wn(kn),onBlur:()=>setTimeout(()=>zn(!1),200)}),(0,h.jsx)(J,{show:En,children:0===gn.length?(0,h.jsx)("div",{style:{padding:"12px 16px",color:"#6B7280",fontSize:"13px"},children:kn.length>0?"No available users found":"Type to search users..."}):gn.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{Sn(e),Bn(e.full_name||e.username),zn(!1)})(e),children:[(0,h.jsx)(H,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.email," \u2022 ",e.role]})]},e.id))})]}),An&&(0,h.jsxs)("div",{style:{marginTop:"8px",padding:"12px 16px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:An.full_name||An.username}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[An.email," \u2022 ",An.role]})]}),(0,h.jsx)("button",{onClick:()=>{Sn(null),Bn("")},style:{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:"18px",fontWeight:"600"},children:"\xd7"})]})]})]}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"16px",marginBottom:"4px"},children:[(0,h.jsx)("h3",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540",borderBottom:"1px solid #E5E7EB",paddingBottom:"8px"},children:"Oversight Managers"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Brand/Foodcourt managers who oversee this restaurant"})]}),(0,h.jsxs)(N,{style:{position:"relative",gridColumn:"1 / -1",zIndex:90},children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{type:"text",placeholder:"Search and select oversight managers...",value:Le,onChange:e=>(e=>{if(Oe(e),We(!0),e.length<1)return void Ke(an.slice(0,10));const n=an.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));Ke(n.slice(0,10))})(e.target.value),onFocus:()=>{We(!0),0===Le.length&&Ke(an.slice(0,10))},onBlur:()=>setTimeout(()=>We(!1),200)}),(0,h.jsx)(J,{show:Ue,children:Ye.map(e=>(0,h.jsxs)(G,{onClick:()=>(e=>{qe.find(n=>n.id===e.id)||Ve([...qe,e]),Oe(""),We(!1)})(e),children:[(0,h.jsx)(H,{children:e.full_name||e.username}),(0,h.jsxs)(Z,{children:[e.username," \u2022 ",e.email," \u2022 ",e.role]})]},e.id))})]}),qe.length>0&&(0,h.jsx)(Q,{children:qe.map(e=>(0,h.jsxs)(X,{children:[e.full_name||e.username,(0,h.jsx)(ee,{onClick:()=>{return n=e.id.toString(),void Ve(qe.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Email Address *"}),(0,h.jsx)(M,{type:"email",placeholder:"restaurant@example.com",value:Se.email||"",onChange:e=>ke({...Se,email:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Phone Number *"}),(0,h.jsx)(u.A,{value:Se.phone||"",onChange:e=>ke({...Se,phone:e}),defaultCountry:Se.country})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Address *"}),(0,h.jsx)(L,{placeholder:"Enter restaurant address",value:Se.address||Se.location,onChange:e=>ke({...Se,address:e.target.value,location:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"City"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Kuala Lumpur",value:Se.city||"",onChange:e=>ke({...Se,city:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"State / Province"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Selangor",value:Se.state||"",onChange:e=>ke({...Se,state:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Postal Code"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 50000",value:Se.postalCode||"",onChange:e=>ke({...Se,postalCode:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Country"}),(0,h.jsx)($,{value:Se.country||"MY",onChange:e=>ke({...Se,country:e.target.value}),children:x.FS.map(e=>(0,h.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Business Registration No."}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 123456-A",value:Se.businessRegistration||"",onChange:e=>ke({...Se,businessRegistration:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Tax ID / GST No."}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., 000123456789",value:Se.taxId||"",onChange:e=>ke({...Se,taxId:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)(M,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Se.cuisine,onChange:e=>ke({...Se,cuisine:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Plan Type *"}),(0,h.jsx)($,{value:Se.planType||"Basic Plan",onChange:e=>{var n;const a=rn.find(n=>n.display_name===e.target.value);ke({...Se,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:rn.map(n=>(0,h.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,c.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,h.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,h.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Billing Cycle *"}),(0,h.jsxs)($,{value:Se.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Se.planType||"Basic Plan"]||a["Basic Plan"];ke({...Se,billingCycle:n,planAmount:t[n]})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Payment Model *"}),(0,h.jsxs)($,{value:Se.paymentModel||"restaurant",onChange:e=>ke({...Se,paymentModel:e.target.value}),children:[(0,h.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Subscription Start Date *"}),(0,h.jsx)(M,{type:"date",value:Se.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>ke({...Se,subscriptionStart:e.target.value})})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Subscription End Date *"}),(0,h.jsx)(M,{type:"date",value:Se.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>ke({...Se,subscriptionEnd:e.target.value})})]}),(0,h.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:Se.autoRenew||!0,onChange:e=>ke({...Se,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,h.jsx)("strong",{children:"Summary:"})}),(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Se.planType||"Basic Plan"," - $",Se.planAmount||"29.00"," (",Se.billingCycle||"monthly",")"]}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","brand_manager"===Se.paymentModel?"Brand Manager":"foodcourt_manager"===Se.paymentModel?"Foodcourt Manager":"Restaurant Admin"]})]})]}),we&&(0,h.jsx)(l.IM,{children:we})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)(o.cc,{variant:"cancel",onClick:()=>{Ae(""),ye(!1)},children:"Cancel"}),(0,h.jsx)(o.cc,{variant:"danger-outline",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`))try{console.log("Deleting restaurant:",e.id),Ae("");const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${a}`}});if(console.log("\ud83d\udce1 Restaurant delete API response status:",t.status),t.ok)console.log("\u2705 Restaurant deleted successfully"),Ae(""),ye(!1),ke(null),ve("Restaurant deleted successfully!"),be(!0),await On();else{var n;const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to delete restaurant:",e);let a="Please try again.";"string"===typeof e.error?a=e.error:null!==(n=e.error)&&void 0!==n&&n.message?a=e.error.message:e.message&&(a=e.message),Ae(`Error deleting restaurant: ${a}`)}}catch(a){console.error("\u274c Error deleting restaurant:",a),Ae("Error deleting restaurant. Please check your connection and try again.")}})(Se),children:"Delete"}),(0,h.jsx)(o.cc,{variant:"primary",onClick:async()=>{if(Se)try{if(console.log("\ud83d\udd04 Updating restaurant:",Se),console.log("\ud83d\udd0d Selected edit managers:",qe),Ae(""),!Se.name)return void Ae("Please fill in all required fields.");if("create"===vn){if(!Fn.fullName||!Fn.email||!Fn.username||!Fn.password)return void Ae("Please fill in all required new Admin fields.")}else if("change"===vn&&!An)return void Ae("Please select an existing user as new Admin.");const a={name:Se.name,managerIds:qe.map(e=>parseInt(e.id.toString())),email:Se.email||"",phone:Se.phone||"",address:Se.address||Se.location||"",location:Se.address||Se.location||"",city:Se.city||"",state:Se.state||"",postal_code:Se.postalCode||"",country:Se.country||"MY",business_registration:Se.businessRegistration||"",tax_id:Se.taxId||"",cuisine:Se.cuisine||"Various",status:Se.status,planType:Se.planType||"Basic Plan",planAmount:parseFloat(Se.planAmount||"29.00"),billingCycle:Se.billingCycle||"monthly",payment_model:Se.paymentModel||"restaurant",autoRenew:Se.autoRenew||!0,subscriptionStart:Se.subscriptionStart,subscriptionEnd:Se.subscriptionEnd};"create"===vn?(a.adminAction="create",a.adminEmail=Fn.email,a.adminPassword=Fn.password,a.adminUsername=Fn.username,a.adminFullName=Fn.fullName,a.adminPhone=Fn.phone||void 0):"change"===vn&&(a.adminAction="change",a.adminUserId=parseInt(An.id.toString())),console.log("\ud83d\udce4 Sending restaurant update data:",a);const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${Se.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Restaurant update API response status:",r.status),r.ok){const e=await r.json();console.log("\u2705 Restaurant updated successfully:",e),Ae(""),ye(!1),ke(null),await On()}else{var e;const a=await r.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",a);let t="Please try again.";if("string"===typeof a.error)t=a.error;else if(null!==(e=a.error)&&void 0!==e&&e.message){var n;t=a.error.message,null!==(n=a.error.details)&&void 0!==n&&n.length&&(t+=": "+a.error.details.map(e=>e.message).join(", "))}else a.message&&(t=a.message);Ae(t)}}catch(a){console.error("\u274c Error updating restaurant:",a),Ae("Error updating restaurant. Please check your connection and try again.")}},children:"Update Restaurant"})]})]})}),ze&&Be&&(0,h.jsx)(B,{show:ze,onClick:()=>Ie(!1),children:(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(I,{children:"Restaurant Details"}),(0,h.jsx)(T,{onClick:()=>Ie(!1),children:"\xd7"})]}),(0,h.jsx)(R,{children:(0,h.jsxs)(P,{children:[(0,h.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,h.jsx)(D,{children:"Restaurant Name"}),(0,h.jsx)(M,{type:"text",value:Be.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Restaurant Admin"}),Be.admin?(0,h.jsxs)("div",{style:{padding:"10px 12px",background:"#F0EFFF",borderRadius:"8px",border:"1px solid #D4D0FF"},children:[(0,h.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"14px"},children:Be.admin.name}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:[Be.admin.email," ",Be.admin.phone?`\u2022 ${Be.admin.phone}`:""]})]}):(0,h.jsx)(M,{type:"text",value:"No Admin Assigned",disabled:!0,style:{backgroundColor:"#FEF2F2",color:"#DC2626"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Oversight Managers"}),(0,h.jsx)(L,{value:Be.managers&&Be.managers.length>0?Be.managers.map((e,n)=>`${n+1}. ${e.name} - ${e.email} (${e.role})`).join("\n"):"No oversight managers assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"60px"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Email Address"}),(0,h.jsx)(M,{type:"email",value:Be.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Phone Number"}),(0,h.jsx)(M,{type:"tel",value:(0,p.FI)(Be.phone)||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Address"}),(0,h.jsx)(L,{value:Be.address||Be.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Cuisine Type"}),(0,h.jsx)(M,{type:"text",value:Be.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Status"}),(0,h.jsx)(M,{type:"text",value:Be.status?Be.status.charAt(0).toUpperCase()+Be.status.slice(1):"Unknown",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Plan Type"}),(0,h.jsx)(M,{type:"text",value:Be.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)(D,{children:"Created Date"}),(0,h.jsx)(M,{type:"text",value:Be.createdAt?new Date(Be.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})})]})}),je&&(0,h.jsx)(B,{show:je,onClick:()=>be(!1),children:(0,h.jsxs)(te,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(re,{children:"\u2713"}),(0,h.jsx)(se,{children:"Success!"}),(0,h.jsx)(oe,{children:fe}),(0,h.jsx)(o.cc,{variant:"primary",onClick:()=>be(!1),children:"OK"})]})})]})]})})}},2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
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