"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4833],{2488:(e,i,a)=>{a.d(i,{DO:()=>c,Jt:()=>p,Qn:()=>x});a(9950);var t=a(4752),n=a(4414);const r=t.Ay.div`
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
`,l=t.Ay.input`
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
`,o=t.Ay.div`
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
`,s=t.Ay.button`
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
`,d=t.Ay.select`
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
`,x=e=>{let{children:i,className:a,style:t,...l}=e;return(0,n.jsx)(r,{className:a,style:t,...l,children:i})},c=e=>{let{placeholder:i="Search...",value:a,onChange:t,style:r,...d}=e;return(0,n.jsxs)(o,{style:r,children:[(0,n.jsx)(l,{placeholder:i,value:a,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,n.jsx)(s,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},p=e=>{let{children:i,...a}=e;return(0,n.jsx)(d,{...a,children:i})}},4833:(e,i,a)=>{a.r(i),a.d(i,{default:()=>J});var t=a(9950),n=a(4752),r=a(2853),l=a(8409),o=a(2488),s=a(1367),d=a(9610),x=a(7617),c=a(8666),p=a(4414);const h=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=n.Ay.div`
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
`,m=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,g=n.Ay.div`
  display: flex;
  gap: 12px;
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,j=n.Ay.div`
  padding: 32px;
`,v=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,b=n.Ay.table`
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
`,w=n.Ay.thead`
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
`,A=n.Ay.tr`
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
`,F=n.Ay.td`
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
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=n.Ay.div``,E=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,_=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,S=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"Restaurant Admin"===e.role?"#ECFDF5":"#EDE9FE"};
  color: ${e=>"Restaurant Admin"===e.role?"#059669":"#7C3AED"};
`,z=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,R=n.Ay.button`
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
`,$=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,O=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,N=n.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=n.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,P=n.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,L=n.Ay.div`
  position: relative;
`,U=n.Ay.div`
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
`,I=n.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  margin-bottom: 16px;
`,J=()=>{var e,i,a,n,J,Z;const{user:q}=(0,s.As)(),[W,M]=(0,t.useState)([]),[Y,H]=(0,t.useState)([]),[K,V]=(0,t.useState)(!0),[G,X]=(0,t.useState)(""),[ee,ie]=(0,t.useState)("all"),[ae,te]=(0,t.useState)("all"),[ne,re]=(0,t.useState)(!1),[le,oe]=(0,t.useState)({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),[se,de]=(0,t.useState)(""),[xe,ce]=(0,t.useState)(""),[pe,he]=(0,t.useState)(!1),[ue,me]=(0,t.useState)(!1),[ge,fe]=(0,t.useState)(null),[je,ve]=(0,t.useState)(!1),[ye,be]=(0,t.useState)({full_name:"",email:"",phone:""}),[we,Ae]=(0,t.useState)(null),[Fe,Ce]=(0,t.useState)(""),[ke,Ee]=(0,t.useState)({isOpen:!1,staff:null}),[_e,Be]=(0,t.useState)(!1),[Se,ze]=(0,t.useState)(""),Re=(0,t.useCallback)(()=>localStorage.getItem("auth_token"),[]),$e=(0,t.useCallback)(async()=>{try{const e={Authorization:`Bearer ${Re()}`},i=null===q||void 0===q?void 0:q.id,a=await fetch(`/api/restaurants/manager/${i}`,{headers:e}),t=a.ok?await a.json():[];H(t);const n={};t.forEach(e=>{n[e.id]=e.name});const r=await fetch("/api/users",{headers:e});if(r.ok){const e=await r.json(),i=(e.data||e).filter(e=>"Restaurant Admin"===e.role&&(e.restaurant_id&&t.some(i=>i.id===e.restaurant_id))).map(e=>({id:e.id,username:e.username||"",full_name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,restaurant_id:e.restaurant_id,restaurantName:n[e.restaurant_id]||"Unknown",is_active:!1!==e.is_active,pin_code:e.pin_code||null,createdAt:e.createdAt}));M(i)}}catch(e){console.error("Error fetching staff data:",e)}finally{V(!1)}},[q,Re]);(0,t.useEffect)(()=>{q&&$e()},[q,$e]);const Oe=W.filter(e=>{var i;return!(G&&!e.full_name.toLowerCase().includes(G.toLowerCase())&&!e.email.toLowerCase().includes(G.toLowerCase()))&&(!("active"===ee&&!e.is_active)&&(("inactive"!==ee||!e.is_active)&&("all"===ae||(null===(i=e.restaurant_id)||void 0===i?void 0:i.toString())===ae)))}),De={total:W.length,active:W.filter(e=>e.is_active).length},Ne=xe?Y.filter(e=>e.name.toLowerCase().includes(xe.toLowerCase())):Y,Te=Array.from(new Map(W.filter(e=>e.restaurant_id).map(e=>[e.restaurant_id,{id:e.restaurant_id,name:e.restaurantName}])).values());return K?(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(m,{children:"Restaurant Admin"})}),(0,p.jsx)(j,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]}):(0,p.jsxs)(h,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(m,{children:"Restaurant Admin"}),(0,p.jsx)(g,{children:(0,p.jsx)(f,{variant:"primary",onClick:()=>{oe({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),de(""),ce(""),re(!0)},children:"Add Admin"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:"#059669",children:[(0,p.jsx)(l.Os,{children:De.total}),(0,p.jsx)(l.v0,{children:"Total Admins"}),(0,p.jsxs)(v,{children:["Across ",Te.length," restaurants"]})]}),(0,p.jsxs)(l.hI,{color:"#7C3AED",children:[(0,p.jsx)(l.Os,{children:De.active}),(0,p.jsx)(l.v0,{children:"Active"}),(0,p.jsxs)(v,{children:[De.total>0?Math.round(De.active/De.total*100):0,"% of total"]})]})]}),(0,p.jsxs)(o.Qn,{children:[(0,p.jsx)(o.DO,{type:"text",placeholder:"Search by name or email...",value:G,onChange:e=>X(e.target.value)}),(0,p.jsxs)(o.Jt,{value:ee,onChange:e=>ie(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,p.jsxs)(o.Jt,{value:ae,onChange:e=>te(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),Te.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsx)(y,{children:0===Oe.length?(0,p.jsxs)(r.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No restaurant admin found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:0===W.length?"Add your first restaurant admin":"Try adjusting your filters"})]}):(0,p.jsxs)(b,{children:[(0,p.jsx)(w,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Name"}),(0,p.jsx)("th",{children:"Restaurant"}),(0,p.jsx)("th",{children:"Role"}),(0,p.jsx)("th",{children:"Status"}),(0,p.jsx)("th",{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:Oe.map(e=>(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{"data-label":"Name",children:(0,p.jsx)(C,{children:(0,p.jsxs)(k,{children:[(0,p.jsx)(E,{children:e.full_name}),(0,p.jsx)(_,{children:e.email})]})})}),(0,p.jsx)(F,{"data-label":"Restaurant",children:(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:e.restaurantName||"-"})}),(0,p.jsx)(F,{"data-label":"Role",children:(0,p.jsx)(S,{role:e.role,children:e.role})}),(0,p.jsx)(F,{"data-label":"Status",children:(0,p.jsx)(B,{active:e.is_active,children:e.is_active?"Active":"Inactive"})}),(0,p.jsx)(F,{"data-label":"",children:(0,p.jsxs)(z,{children:[(0,p.jsx)(R,{onClick:()=>(e=>{fe(e),me(!0)})(e),children:"View"}),(0,p.jsx)(R,{onClick:()=>(e=>{Ae(e),be({full_name:e.full_name,email:e.email,phone:e.phone}),Ce(""),ve(!0)})(e),children:"Edit"}),(0,p.jsx)(R,{variant:"danger",onClick:()=>Ee({isOpen:!0,staff:e}),children:e.is_active?"Deactivate":"Activate"})]})})]},e.id))})]})})]}),(0,p.jsxs)(d.aF,{isOpen:ne,onClose:()=>re(!1),title:"Add Restaurant Admin",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d.yl,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,p.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(de(""),le.username.trim())if(le.full_name.trim())if(le.email.trim())if(le.restaurant_id)try{const e=Re(),i=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:le.username.trim(),email:le.email.trim(),full_name:le.full_name.trim(),phone:le.phone.trim()||null,role:"Restaurant Admin",restaurant_id:parseInt(le.restaurant_id)})}),a=await i.json();if(!i.ok)return void de(a.error||"Failed to create staff");re(!1);const t=a.generatedPassword||"(check with admin)";ze(`Restaurant Admin created successfully!\n\nUsername: ${le.username}\nPassword: ${t}\n\nPlease save this information and share it securely.`),Be(!0),$e()}catch(e){de("An error occurred. Please try again.")}else de("Please select a restaurant");else de("Email is required");else de("Full Name is required");else de("Username is required")},children:"Create"})]}),children:[se&&(0,p.jsx)(I,{children:se}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Restaurant *"}),(0,p.jsxs)(L,{children:[(0,p.jsx)(d.ZQ,{type:"text",placeholder:"Search restaurant...",value:xe,onChange:e=>{ce(e.target.value),he(!0)},onFocus:()=>he(!0)}),pe&&Ne.length>0&&(0,p.jsx)(U,{children:Ne.map(e=>(0,p.jsx)(Q,{onClick:()=>{oe({...le,restaurant_id:e.id.toString()}),ce(e.name),he(!1)},children:e.name},e.id))})]})]}),(0,p.jsxs)(d.fh,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Username *"}),(0,p.jsx)(d.ZQ,{type:"text",placeholder:"Username",value:le.username,onChange:e=>oe({...le,username:e.target.value})})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Full Name *"}),(0,p.jsx)(d.ZQ,{type:"text",placeholder:"Full name",value:le.full_name,onChange:e=>oe({...le,full_name:e.target.value})})]})]}),(0,p.jsxs)(d.fh,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Email *"}),(0,p.jsx)(d.ZQ,{type:"email",placeholder:"Email",value:le.email,onChange:e=>oe({...le,email:e.target.value})})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Phone"}),(0,p.jsx)(c.A,{value:le.phone,onChange:e=>oe({...le,phone:e})})]})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:"Password will be auto-generated and shown after creation."})]}),(0,p.jsx)(d.aF,{isOpen:ue,onClose:()=>{me(!1),fe(null)},title:"Admin Details",size:"medium",footer:(0,p.jsx)(d.yl,{variant:"secondary",onClick:()=>{me(!1),fe(null)},children:"Close"}),children:ge&&(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Full Name"}),(0,p.jsx)(T,{children:ge.full_name})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Username"}),(0,p.jsx)(T,{children:ge.username})]})]}),(0,p.jsx)(P,{}),(0,p.jsxs)(O,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Email"}),(0,p.jsx)(T,{children:ge.email})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Phone"}),(0,p.jsx)(T,{children:ge.phone||"-"})]})]}),(0,p.jsx)(P,{}),(0,p.jsxs)(O,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Role"}),(0,p.jsx)(T,{children:(0,p.jsx)(S,{role:ge.role,children:ge.role})})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Status"}),(0,p.jsx)(T,{children:(0,p.jsx)(B,{active:ge.is_active,children:ge.is_active?"Active":"Inactive"})})]})]}),(0,p.jsx)(P,{}),(0,p.jsx)(O,{children:(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Restaurant"}),(0,p.jsx)(T,{children:ge.restaurantName||"-"})]})}),(0,p.jsx)(O,{children:(0,p.jsxs)(D,{children:[(0,p.jsx)(N,{children:"Joined"}),(0,p.jsx)(T,{children:ge.createdAt?new Date(ge.createdAt).toLocaleDateString():"-"})]})})]})}),(0,p.jsxs)(d.aF,{isOpen:je,onClose:()=>{ve(!1),Ae(null)},title:"Edit Restaurant Admin",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d.yl,{variant:"secondary",onClick:()=>{ve(!1),Ae(null)},children:"Cancel"}),(0,p.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(we)if(Ce(""),ye.full_name.trim())if(ye.email.trim())try{const e=Re(),i=await fetch(`/api/users/${we.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:ye.full_name.trim(),email:ye.email.trim(),phone:ye.phone.trim()||null})}),a=await i.json();if(!i.ok)return void Ce(a.error||"Failed to update");ve(!1),$e()}catch(e){Ce("An error occurred. Please try again.")}else Ce("Email is required");else Ce("Full Name is required")},children:"Update"})]}),children:[Fe&&(0,p.jsx)(I,{children:Fe}),(0,p.jsxs)(d.fh,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Full Name *"}),(0,p.jsx)(d.ZQ,{type:"text",value:ye.full_name,onChange:e=>be({...ye,full_name:e.target.value})})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Email *"}),(0,p.jsx)(d.ZQ,{type:"email",value:ye.email,onChange:e=>be({...ye,email:e.target.value})})]})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Phone"}),(0,p.jsx)(c.A,{value:ye.phone,onChange:e=>be({...ye,phone:e})})]}),we&&(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:["Restaurant: ",we.restaurantName||"-"," \xb7 Role: ",we.role]})]}),(0,p.jsx)(x.A,{isOpen:ke.isOpen,onCancel:()=>Ee({isOpen:!1,staff:null}),onConfirm:async()=>{const e=ke.staff;if(e)try{const i=Re();(await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(Ee({isOpen:!1,staff:null}),$e())}catch(i){console.error("Error toggling staff status:",i)}},title:null!==(e=ke.staff)&&void 0!==e&&e.is_active?"Deactivate Admin":"Activate Admin",message:null!==(i=ke.staff)&&void 0!==i&&i.is_active?`Are you sure you want to deactivate "${null===(a=ke.staff)||void 0===a?void 0:a.full_name}"? They will no longer be able to log in.`:`Activate "${null===(n=ke.staff)||void 0===n?void 0:n.full_name}"? They will be able to log in again.`,confirmText:null!==(J=ke.staff)&&void 0!==J&&J.is_active?"Deactivate":"Activate",cancelText:"Cancel",type:null!==(Z=ke.staff)&&void 0!==Z&&Z.is_active?"danger":"info"}),(0,p.jsx)(d.aF,{isOpen:_e,onClose:()=>Be(!1),title:"Admin Created",size:"small",footer:(0,p.jsx)(d.yl,{variant:"primary",onClick:()=>Be(!1),children:"OK"}),children:(0,p.jsx)("div",{style:{whiteSpace:"pre-wrap",fontSize:"14px",lineHeight:"1.6",color:"#1F2937"},children:Se})})]})}},7617:(e,i,a)=>{a.d(i,{A:()=>p});a(9950);var t=a(4752),n=a(9610),r=a(4414);const l=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,x=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,c=t.Ay.button`
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
`,p=e=>{let{isOpen:i,title:a,message:t,onConfirm:p,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return i?(0,r.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,r.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)(o,{children:[(0,r.jsx)(s,{children:a}),(0,r.jsx)(d,{children:t})]}),(0,r.jsxs)(x,{children:[(0,r.jsx)(c,{variant:"secondary",onClick:h,children:m}),(0,r.jsx)(c,{variant:"primary",type:g,onClick:p,children:u})]})]})}):null}}}]);