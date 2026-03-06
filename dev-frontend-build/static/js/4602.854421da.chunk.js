"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4602],{2488:(e,t,a)=>{a.d(t,{DO:()=>x,Jt:()=>p,Qn:()=>c});a(9950);var i=a(4752),n=a(4414);const r=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,l=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
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

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,o=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

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

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,c=e=>{let{children:t,className:a,style:i,...l}=e;return(0,n.jsx)(r,{className:a,style:i,...l,children:t})},x=e=>{let{placeholder:t="Search...",value:a,onChange:i,style:r,...d}=e;return(0,n.jsxs)(o,{style:r,children:[(0,n.jsx)(l,{placeholder:t,value:a,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,n.jsx)(s,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},p=e=>{let{children:t,...a}=e;return(0,n.jsx)(d,{...a,children:t})}},2597:(e,t,a)=>{a.d(t,{Ex:()=>c,oz:()=>d,tU:()=>s});a(9950);var i=a(4752),n=a(4414);const r=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,l=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,o=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,s=e=>{let{children:t,className:a,style:i}=e;return(0,n.jsx)(r,{className:a,style:i,children:t})},d=e=>{let{active:t,onClick:a,children:i,className:r}=e;return(0,n.jsx)(l,{active:t,onClick:a,className:r,children:i})},c=e=>{let{count:t,variant:a="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(o,{variant:a,children:t}):null}},2653:(e,t,a)=>{a.d(t,{M:()=>r});var i=a(9950),n=a(4492);function r(e){const[t,a]=(0,n.ok)(),r=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[l,o]=(0,i.useState)(r());return[l,(0,i.useCallback)(e=>{o(e),a({tab:e})},[a])]}},4602:(e,t,a)=>{a.r(t),a.d(t,{default:()=>q});var i=a(9950),n=a(4752),r=a(2853),l=a(8409),o=a(2597),s=a(2488),d=a(1367),c=a(2653),x=a(9610),p=a(7617),h=a(8666),u=a(4414);const m=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,f=n.Ay.div`
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
`,g=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,j=n.Ay.div`
  display: flex;
  gap: 12px;
`,v=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=n.Ay.div`
  padding: 32px;
`,y=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,w=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,A=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,F=n.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  th:nth-child(3) { text-align: center; }
  th:nth-child(4) { text-align: center; }
  th:nth-child(5) { text-align: right; }
`,C=n.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:last-child {
      margin-bottom: 0;
    }
  }
`,k=n.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  &:nth-child(3) { text-align: center; }
  &:nth-child(4) { text-align: center; }
  &:nth-child(5) { text-align: right; }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,_=n.Ay.div``,S=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,B=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,R=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"Restaurant Admin"===e.role?"#ECFDF5":"#EDE9FE"};
  color: ${e=>"Restaurant Admin"===e.role?"#059669":"#7C3AED"};
`,$=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,N=n.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  border-radius: 6px;
  color: ${e=>"danger"===e.variant?"#DC2626":"#6B7280"};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>"danger"===e.variant?"#FCA5A5":"#635BFF"};
    color: ${e=>"danger"===e.variant?"#B91C1C":"#635BFF"};
    background: ${e=>"danger"===e.variant?"#FEF2F2":"#F4F3FF"};
  }
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,O=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,P=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,T=n.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,I=n.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,L=n.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,U=n.Ay.div`
  position: relative;
`,Z=n.Ay.div`
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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,Q=n.Ay.div`
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,J=n.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  margin-bottom: 16px;
`,q=()=>{var e,t,a,n,q,M;const{user:W}=(0,d.As)(),[Y,H]=(0,c.M)("all"),[K,V]=(0,i.useState)([]),[G,X]=(0,i.useState)([]),[ee,te]=(0,i.useState)(!0),[ae,ie]=(0,i.useState)(""),[ne,re]=(0,i.useState)("all"),[le,oe]=(0,i.useState)("all"),[se,de]=(0,i.useState)(!1),[ce,xe]=(0,i.useState)({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:"",pin_code:""}),[pe,he]=(0,i.useState)(""),[ue,me]=(0,i.useState)(""),[fe,ge]=(0,i.useState)(!1),[je,ve]=(0,i.useState)(!1),[be,ye]=(0,i.useState)(null),[we,Ae]=(0,i.useState)(!1),[Fe,Ce]=(0,i.useState)({full_name:"",email:"",phone:"",pin_code:""}),[ke,Ee]=(0,i.useState)(null),[_e,Se]=(0,i.useState)(""),[Be,ze]=(0,i.useState)({isOpen:!1,staff:null}),[Re,$e]=(0,i.useState)(!1),[Ne,De]=(0,i.useState)(""),Oe=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),Pe=(0,i.useCallback)(async()=>{try{const e={Authorization:`Bearer ${Oe()}`},t=null===W||void 0===W?void 0:W.id,a=await fetch(`/api/restaurants/manager/${t}`,{headers:e}),i=a.ok?await a.json():[];X(i);const n={};i.forEach(e=>{n[e.id]=e.name});const r=await fetch("/api/users",{headers:e});if(r.ok){const e=await r.json(),t=(e.data||e).filter(e=>("Restaurant Admin"===e.role||"Staff"===e.role)&&(e.restaurant_id&&i.some(t=>t.id===e.restaurant_id))).map(e=>({id:e.id,username:e.username||"",full_name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,restaurant_id:e.restaurant_id,restaurantName:n[e.restaurant_id]||"Unknown",is_active:!1!==e.is_active,pin_code:e.pin_code||null,createdAt:e.createdAt}));V(t)}}catch(e){console.error("Error fetching staff data:",e)}finally{te(!1)}},[W,Oe]);(0,i.useEffect)(()=>{W&&Pe()},[W,Pe]);const Te=K.filter(e=>{var t;return("restaurant_admin"!==Y||"Restaurant Admin"===e.role)&&(("restaurant_staff"!==Y||"Staff"===e.role)&&(!(ae&&!e.full_name.toLowerCase().includes(ae.toLowerCase())&&!e.email.toLowerCase().includes(ae.toLowerCase()))&&(!("active"===ne&&!e.is_active)&&(("inactive"!==ne||!e.is_active)&&("all"===le||(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())===le)))))}),Ie={total:K.length,admins:K.filter(e=>"Restaurant Admin"===e.role).length,staff:K.filter(e=>"Staff"===e.role).length,active:K.filter(e=>e.is_active).length},Le=ue?G.filter(e=>e.name.toLowerCase().includes(ue.toLowerCase())):G,Ue=Array.from(new Map(K.filter(e=>e.restaurant_id).map(e=>[e.restaurant_id,{id:e.restaurant_id,name:e.restaurantName}])).values());return ee?(0,u.jsxs)(m,{children:[(0,u.jsx)(f,{children:(0,u.jsx)(g,{children:"Admin & Staff"})}),(0,u.jsx)(b,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]}):(0,u.jsxs)(m,{children:[(0,u.jsxs)(f,{children:[(0,u.jsx)(g,{children:"Admin & Staff"}),(0,u.jsx)(j,{children:(0,u.jsx)(v,{variant:"primary",onClick:()=>{xe({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:"",pin_code:""}),he(""),me(""),de(!0)},children:"Add Staff"})})]}),(0,u.jsxs)(b,{children:[(0,u.jsxs)(o.tU,{children:[(0,u.jsxs)(o.oz,{active:"all"===Y,onClick:()=>H("all"),children:["All ",(0,u.jsx)(o.Ex,{count:Ie.total,showZero:!0})]}),(0,u.jsxs)(o.oz,{active:"restaurant_admin"===Y,onClick:()=>H("restaurant_admin"),children:["Restaurant Admin ",(0,u.jsx)(o.Ex,{count:Ie.admins,showZero:!0})]}),(0,u.jsxs)(o.oz,{active:"restaurant_staff"===Y,onClick:()=>H("restaurant_staff"),children:["Restaurant Staff ",(0,u.jsx)(o.Ex,{count:Ie.staff,showZero:!0})]})]}),(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:Ie.total}),(0,u.jsx)(l.v0,{children:"Total"}),(0,u.jsx)(y,{children:"Admin & Staff"})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:Ie.active}),(0,u.jsx)(l.v0,{children:"Active"}),(0,u.jsxs)(y,{children:[Ie.total>0?Math.round(Ie.active/Ie.total*100):0,"% of total"]})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:Ie.admins}),(0,u.jsx)(l.v0,{children:"Restaurant Admin"}),(0,u.jsx)(y,{children:"Restaurant managers"})]}),(0,u.jsxs)(l.hI,{color:"#F59E0B",children:[(0,u.jsx)(l.Os,{children:Ie.staff}),(0,u.jsx)(l.v0,{children:"Restaurant Staff"}),(0,u.jsxs)(y,{children:["From ",Ue.length," restaurants"]})]})]}),(0,u.jsxs)(s.Qn,{children:[(0,u.jsx)(s.DO,{type:"text",placeholder:"Search by name or email...",value:ae,onChange:e=>ie(e.target.value)}),(0,u.jsxs)(s.Jt,{value:ne,onChange:e=>re(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,u.jsxs)(s.Jt,{value:le,onChange:e=>oe(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Restaurants"}),Ue.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,u.jsx)(w,{children:0===Te.length?(0,u.jsxs)(r.pp,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No admin or staff found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===K.length?"Add your first staff member":"Try adjusting your filters"})]}):(0,u.jsxs)(A,{children:[(0,u.jsx)(F,{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{children:"Name"}),(0,u.jsx)("th",{children:"Restaurant"}),(0,u.jsx)("th",{children:"Role"}),(0,u.jsx)("th",{children:"Status"}),(0,u.jsx)("th",{children:"Actions"})]})}),(0,u.jsx)("tbody",{children:Te.map(e=>(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{"data-label":"Name",children:(0,u.jsx)(E,{children:(0,u.jsxs)(_,{children:[(0,u.jsx)(S,{children:e.full_name}),(0,u.jsx)(B,{children:e.email})]})})}),(0,u.jsx)(k,{"data-label":"Restaurant",children:(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:e.restaurantName||"-"})}),(0,u.jsx)(k,{"data-label":"Role",children:(0,u.jsx)(R,{role:e.role,children:e.role})}),(0,u.jsx)(k,{"data-label":"Status",children:(0,u.jsx)(z,{active:e.is_active,children:e.is_active?"Active":"Inactive"})}),(0,u.jsx)(k,{"data-label":"",children:(0,u.jsxs)($,{children:[(0,u.jsx)(N,{onClick:()=>(e=>{ye(e),ve(!0)})(e),children:"View"}),(0,u.jsx)(N,{onClick:()=>(e=>{Ee(e),Ce({full_name:e.full_name,email:e.email,phone:e.phone,pin_code:e.pin_code||""}),Se(""),Ae(!0)})(e),children:"Edit"}),(0,u.jsx)(N,{variant:"danger",onClick:()=>ze({isOpen:!0,staff:e}),children:e.is_active?"Deactivate":"Activate"})]})})]},e.id))})]})})]}),(0,u.jsxs)(x.aF,{isOpen:se,onClose:()=>de(!1),title:"Add Staff",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(x.yl,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,u.jsx)(x.yl,{variant:"primary",onClick:async()=>{if(he(""),ce.username.trim())if(ce.full_name.trim())if(ce.email.trim())if(ce.restaurant_id)if(ce.pin_code&&4!==ce.pin_code.length)he("PIN must be 4 digits");else try{const e=Oe(),t=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:ce.username.trim(),email:ce.email.trim(),full_name:ce.full_name.trim(),phone:ce.phone.trim()||null,role:ce.role,restaurant_id:parseInt(ce.restaurant_id),pin_code:ce.pin_code||null})}),a=await t.json();if(!t.ok)return void he(a.error||"Failed to create staff");de(!1);const i=a.generatedPassword||"(check with admin)";De(`Staff member created successfully!\n\nUsername: ${ce.username}\nPassword: ${i}\n\nPlease save this information and share it securely.`),$e(!0),Pe()}catch(e){he("An error occurred. Please try again.")}else he("Please select a restaurant");else he("Email is required");else he("Full Name is required");else he("Username is required")},children:"Create"})]}),children:[pe&&(0,u.jsx)(J,{children:pe}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Role *"}),(0,u.jsxs)("select",{value:ce.role,onChange:e=>xe({...ce,role:e.target.value}),style:{width:"100%",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},children:[(0,u.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"Staff",children:"Staff"})]})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Restaurant *"}),(0,u.jsxs)(U,{children:[(0,u.jsx)(x.ZQ,{type:"text",placeholder:"Search restaurant...",value:ue,onChange:e=>{me(e.target.value),ge(!0)},onFocus:()=>ge(!0)}),fe&&Le.length>0&&(0,u.jsx)(Z,{children:Le.map(e=>(0,u.jsx)(Q,{onClick:()=>{xe({...ce,restaurant_id:e.id.toString()}),me(e.name),ge(!1)},children:e.name},e.id))})]})]}),(0,u.jsxs)(x.fh,{children:[(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Username *"}),(0,u.jsx)(x.ZQ,{type:"text",placeholder:"Username",value:ce.username,onChange:e=>xe({...ce,username:e.target.value})})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Full Name *"}),(0,u.jsx)(x.ZQ,{type:"text",placeholder:"Full name",value:ce.full_name,onChange:e=>xe({...ce,full_name:e.target.value})})]})]}),(0,u.jsxs)(x.fh,{children:[(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Email *"}),(0,u.jsx)(x.ZQ,{type:"email",placeholder:"Email",value:ce.email,onChange:e=>xe({...ce,email:e.target.value})})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Phone"}),(0,u.jsx)(h.A,{value:ce.phone,onChange:e=>xe({...ce,phone:e})})]})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"PIN Code (4 digits, for POS)"}),(0,u.jsx)(x.ZQ,{type:"text",placeholder:"e.g., 1234",maxLength:4,value:ce.pin_code,onChange:e=>xe({...ce,pin_code:e.target.value.replace(/\D/g,"")})})]}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:"Password will be auto-generated and shown after creation."})]}),(0,u.jsx)(x.aF,{isOpen:je,onClose:()=>{ve(!1),ye(null)},title:"Staff Details",size:"medium",footer:(0,u.jsx)(x.yl,{variant:"secondary",onClick:()=>{ve(!1),ye(null)},children:"Close"}),children:be&&(0,u.jsxs)(D,{children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Full Name"}),(0,u.jsx)(I,{children:be.full_name})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Username"}),(0,u.jsx)(I,{children:be.username})]})]}),(0,u.jsx)(L,{}),(0,u.jsxs)(O,{children:[(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Email"}),(0,u.jsx)(I,{children:be.email})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Phone"}),(0,u.jsx)(I,{children:be.phone||"-"})]})]}),(0,u.jsx)(L,{}),(0,u.jsxs)(O,{children:[(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Role"}),(0,u.jsx)(I,{children:(0,u.jsx)(R,{role:be.role,children:be.role})})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Status"}),(0,u.jsx)(I,{children:(0,u.jsx)(z,{active:be.is_active,children:be.is_active?"Active":"Inactive"})})]})]}),(0,u.jsx)(L,{}),(0,u.jsxs)(O,{children:[(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Restaurant"}),(0,u.jsx)(I,{children:be.restaurantName||"-"})]}),(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"PIN Code"}),(0,u.jsx)(I,{children:be.pin_code||"-"})]})]}),(0,u.jsx)(O,{children:(0,u.jsxs)(P,{children:[(0,u.jsx)(T,{children:"Joined"}),(0,u.jsx)(I,{children:be.createdAt?new Date(be.createdAt).toLocaleDateString():"-"})]})})]})}),(0,u.jsxs)(x.aF,{isOpen:we,onClose:()=>{Ae(!1),Ee(null)},title:`Edit ${(null===ke||void 0===ke?void 0:ke.role)||"Staff"}`,size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(x.yl,{variant:"secondary",onClick:()=>{Ae(!1),Ee(null)},children:"Cancel"}),(0,u.jsx)(x.yl,{variant:"primary",onClick:async()=>{if(ke)if(Se(""),Fe.full_name.trim())if(Fe.email.trim())if(Fe.pin_code&&4!==Fe.pin_code.length)Se("PIN must be 4 digits");else try{const e=Oe(),t=await fetch(`/api/users/${ke.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:Fe.full_name.trim(),email:Fe.email.trim(),phone:Fe.phone.trim()||null,pin_code:Fe.pin_code||null})}),a=await t.json();if(!t.ok)return void Se(a.error||"Failed to update");Ae(!1),Pe()}catch(e){Se("An error occurred. Please try again.")}else Se("Email is required");else Se("Full Name is required")},children:"Update"})]}),children:[_e&&(0,u.jsx)(J,{children:_e}),(0,u.jsxs)(x.fh,{children:[(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Full Name *"}),(0,u.jsx)(x.ZQ,{type:"text",value:Fe.full_name,onChange:e=>Ce({...Fe,full_name:e.target.value})})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Email *"}),(0,u.jsx)(x.ZQ,{type:"email",value:Fe.email,onChange:e=>Ce({...Fe,email:e.target.value})})]})]}),(0,u.jsxs)(x.fh,{children:[(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"Phone"}),(0,u.jsx)(h.A,{value:Fe.phone,onChange:e=>Ce({...Fe,phone:e})})]}),(0,u.jsxs)(x.gE,{children:[(0,u.jsx)(x.lR,{children:"PIN Code (4 digits)"}),(0,u.jsx)(x.ZQ,{type:"text",maxLength:4,value:Fe.pin_code,onChange:e=>Ce({...Fe,pin_code:e.target.value.replace(/\D/g,"")})})]})]}),ke&&(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:["Restaurant: ",ke.restaurantName||"-"," \xb7 Role: ",ke.role]})]}),(0,u.jsx)(p.A,{isOpen:Be.isOpen,onCancel:()=>ze({isOpen:!1,staff:null}),onConfirm:async()=>{const e=Be.staff;if(e)try{const t=Oe();(await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(ze({isOpen:!1,staff:null}),Pe())}catch(t){console.error("Error toggling staff status:",t)}},title:null!==(e=Be.staff)&&void 0!==e&&e.is_active?"Deactivate Staff":"Activate Staff",message:null!==(t=Be.staff)&&void 0!==t&&t.is_active?`Are you sure you want to deactivate "${null===(a=Be.staff)||void 0===a?void 0:a.full_name}"? They will no longer be able to log in.`:`Activate "${null===(n=Be.staff)||void 0===n?void 0:n.full_name}"? They will be able to log in again.`,confirmText:null!==(q=Be.staff)&&void 0!==q&&q.is_active?"Deactivate":"Activate",cancelText:"Cancel",type:null!==(M=Be.staff)&&void 0!==M&&M.is_active?"danger":"info"}),(0,u.jsx)(x.aF,{isOpen:Re,onClose:()=>$e(!1),title:"Staff Created",size:"small",footer:(0,u.jsx)(x.yl,{variant:"primary",onClick:()=>$e(!1),children:"OK"}),children:(0,u.jsx)("div",{style:{whiteSpace:"pre-wrap",fontSize:"14px",lineHeight:"1.6",color:"#1F2937"},children:Ne})})]})}},7617:(e,t,a)=>{a.d(t,{A:()=>p});a(9950);var i=a(4752),n=a(9610),r=a(4414);const l=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
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
`,p=e=>{let{isOpen:t,title:a,message:i,onConfirm:p,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:f="warning"}=e;return t?(0,r.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,r.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)(o,{children:[(0,r.jsx)(s,{children:a}),(0,r.jsx)(d,{children:i})]}),(0,r.jsxs)(c,{children:[(0,r.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,r.jsx)(x,{variant:"primary",type:f,onClick:p,children:u})]})]})}):null}}}]);