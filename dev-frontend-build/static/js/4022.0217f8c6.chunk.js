"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4022],{4022:(e,r,i)=>{i.r(r),i.d(r,{default:()=>re});var t=i(9950),n=i(4752),o=i(1367),s=i(4302),a=i(4414);const d=n.Ay.div`
  min-height: 100vh;
`,l=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,c=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
`,h=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,y=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,f=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,A=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,F=n.Ay.div`
  display: grid;
  gap: 20px;
`,w=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,E=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,C=n.Ay.div`
  flex: 1;
`,k=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,I=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,D=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,R=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,T=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,q=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,N=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=n.Ay.span`
  color: #374151;
`,M=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,P=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,L=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,O=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,H=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { color: #0A2540; }
`,J=n.Ay.div`
  padding: 24px;
`,Y=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,G=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,K=n.Ay.div`
  margin-bottom: 20px;
`,V=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Q=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,X=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
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
`,Z=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ee=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,re=()=>{const{user:e}=(0,o.As)(),[r,i]=(0,t.useState)([]),[n,re]=(0,t.useState)([]),[ie,te]=(0,t.useState)(""),[ne,oe]=(0,t.useState)("all"),[se,ae]=(0,t.useState)("all"),[de,le]=(0,t.useState)("all"),[ce,pe]=(0,t.useState)("all"),[xe,he]=(0,t.useState)(!1),[ue,ge]=(0,t.useState)(!1),[ye,je]=(0,t.useState)(null),[me,fe]=(0,t.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"});(0,t.useEffect)(()=>{e&&ve()},[e]),(0,t.useEffect)(()=>{if(n.length>0){be();const e=setInterval(be,1e4);return()=>clearInterval(e)}},[n]);const ve=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),i=e.data||e;re(i.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},be=async()=>{try{const r=await fetch("/api/support-tickets");if(r.ok){const t=await r.json(),o=t.data||t,s=n.map(e=>e.id),a=o.filter(r=>r.restaurantId&&s.includes(r.restaurantId)||r.customerId===String(null===e||void 0===e?void 0:e.id));i(a)}}catch(r){console.error("Error fetching tickets:",r)}},Ae=r.filter(e=>{const r=e.subject.toLowerCase().includes(ie.toLowerCase())||e.ticketNumber.toLowerCase().includes(ie.toLowerCase()),i="all"===ne||e.status===ne,t="all"===se||e.priority===se,n="all"===de||e.category===de,o="all"===ce||String(e.restaurantId)===ce;return r&&i&&t&&n&&o}),Fe=r.filter(e=>"open"===e.status).length,we=r.filter(e=>"in-progress"===e.status).length,Ee=r.filter(e=>"resolved"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY"),ke=e=>{if(!e)return"";const r=n.find(r=>r.id===e);return r?r.name:""};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(p,{children:"System Inquiry"}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:be,children:"Refresh"}),(0,a.jsx)(h,{variant:"primary",onClick:()=>he(!0),children:"New Inquiry"})]})]}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{color:"#635BFF",children:[(0,a.jsx)(y,{children:r.length}),(0,a.jsx)(j,{children:"Total Inquiries"})]}),(0,a.jsxs)(g,{color:"#F59E0B",children:[(0,a.jsx)(y,{children:Fe}),(0,a.jsx)(j,{children:"Open"})]}),(0,a.jsxs)(g,{color:"#3B82F6",children:[(0,a.jsx)(y,{children:we}),(0,a.jsx)(j,{children:"In Progress"})]}),(0,a.jsxs)(g,{color:"#10B981",children:[(0,a.jsx)(y,{children:Ee}),(0,a.jsx)(j,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Search"}),(0,a.jsx)(b,{placeholder:"Search inquiries...",value:ie,onChange:e=>te(e.target.value)})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Restaurant"}),(0,a.jsxs)(A,{value:ce,onChange:e=>pe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,a.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Status"}),(0,a.jsxs)(A,{value:ne,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Priority"}),(0,a.jsxs)(A,{value:se,onChange:e=>ae(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(v,{children:"Category"}),(0,a.jsxs)(A,{value:de,onChange:e=>le(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,a.jsx)("option",{value:"general",children:"General"})]})]})]}),(0,a.jsxs)(F,{children:[Ae.map(e=>(0,a.jsxs)(w,{children:[(0,a.jsxs)(E,{children:[(0,a.jsxs)(C,{children:[(0,a.jsx)(k,{children:e.ticketNumber}),(0,a.jsx)(B,{children:e.subject}),(0,a.jsxs)(S,{children:[e.customerName,e.restaurantName&&(0,a.jsx)(R,{children:e.restaurantName})]})]}),(0,a.jsxs)(z,{children:[(0,a.jsx)(I,{status:e.status,children:e.status}),(0,a.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(T,{children:e.description}),e.replyMessage&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," ",e.repliedAt&&`\u2022 ${Ce(e.repliedAt)}`]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,a.jsxs)(q,{children:[(0,a.jsxs)($,{children:[(0,a.jsx)(N,{children:"Created"}),(0,a.jsx)(_,{children:Ce(e.createdAt)})]}),(0,a.jsxs)($,{children:[(0,a.jsx)(N,{children:"Category"}),(0,a.jsx)(_,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,a.jsxs)($,{children:[(0,a.jsx)(N,{children:"Restaurant"}),(0,a.jsx)(_,{children:ke(e.restaurantId)||e.restaurantName||"-"})]})]}),(0,a.jsx)(M,{children:(0,a.jsx)(P,{variant:"primary",onClick:()=>{je(e),ge(!0)},children:"View Details"})})]},e.id)),0===Ae.length&&(0,a.jsxs)(ee,{children:[(0,a.jsx)("h3",{children:"No inquiries yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit a system inquiry for your restaurants.'})]})]}),xe&&(0,a.jsx)(L,{onClick:()=>he(!1),children:(0,a.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(H,{children:[(0,a.jsx)(U,{children:"Create System Inquiry"}),(0,a.jsx)(W,{onClick:()=>he(!1),children:"\xd7"})]}),(0,a.jsxs)(J,{children:[(0,a.jsxs)(K,{children:[(0,a.jsx)(V,{children:"Restaurant *"}),(0,a.jsxs)(X,{value:me.restaurantId,onChange:e=>fe({...me,restaurantId:e.target.value}),required:!0,children:[(0,a.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,a.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(V,{children:"Subject *"}),(0,a.jsx)(Q,{type:"text",value:me.subject,onChange:e=>fe({...me,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(V,{children:"Description *"}),(0,a.jsx)(Z,{value:me.description,onChange:e=>fe({...me,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,a.jsxs)(G,{children:[(0,a.jsxs)(K,{children:[(0,a.jsx)(V,{children:"Priority"}),(0,a.jsxs)(X,{value:me.priority,onChange:e=>fe({...me,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(V,{children:"Category"}),(0,a.jsxs)(X,{value:me.category,onChange:e=>fe({...me,category:e.target.value}),children:[(0,a.jsx)("option",{value:"general",children:"General"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,a.jsxs)(Y,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(!me.restaurantId||!me.subject.trim()||!me.description.trim())return;const r=n.find(e=>e.id===parseInt(me.restaurantId));try{const i={customerId:(null===e||void 0===e?void 0:e.id)||"",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",customerEmail:(null===e||void 0===e?void 0:e.email)||"",customerRole:"manager",restaurantId:parseInt(me.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:me.subject,description:me.description,status:"open",priority:me.priority,category:me.category};(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).ok&&(be(),he(!1),fe({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}))}catch(i){console.error("Error creating ticket:",i)}},disabled:!me.restaurantId||!me.subject.trim()||!me.description.trim(),children:"Submit Inquiry"})]})]})}),ue&&ye&&(0,a.jsx)(L,{onClick:()=>ge(!1),children:(0,a.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(H,{children:[(0,a.jsx)(U,{children:"Inquiry Details"}),(0,a.jsx)(W,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,a.jsxs)(J,{children:[(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ye.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Status"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(I,{status:ye.status,children:ye.status})})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(D,{priority:ye.priority,children:ye.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Restaurant"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:ke(ye.restaurantId)||ye.restaurantName||"-"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ye.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ye.description})]}),ye.replyMessage&&(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",ye.repliedBy]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:ye.replyMessage})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Created"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ce(ye.createdAt)})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(V,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ye.category.replace("-"," ")})]})]})]}),(0,a.jsx)(s.A,{entityType:"support_ticket",entityId:ye.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,a.jsx)(Y,{children:(0,a.jsx)(h,{variant:"secondary",onClick:()=>ge(!1),children:"Close"})})]})})]})]})})}},4302:(e,r,i)=>{i.d(r,{A:()=>A});var t=i(9950),n=i(4752),o=i(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=n.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,p=n.Ay.div`
  flex: 1;
  min-width: 0;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,y=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,m=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,f=n.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,v=n.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,b=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,A=e=>{let{entityType:r,entityId:i,currentUserId:n}=e;const[A,F]=(0,t.useState)([]),[w,E]=(0,t.useState)(""),[C,k]=(0,t.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${r}/${i}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{i&&B()},[r,i]);const S=async()=>{if(w.trim()&&!C){k(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:i,content:w.trim()})})).ok&&(E(""),B())}catch(e){console.error("Error adding comment:",e)}finally{k(!1)}}},z=e=>{const r=new Date(e),i=(new Date).getTime()-r.getTime(),t=Math.floor(i/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const n=Math.floor(t/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,o.jsx)(d,{children:A.map(e=>{var r,i,t;return(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(i=e.author)||void 0===i?void 0:i.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.role)||e.author_role}),(0,o.jsx)(g,{children:z(e.createdAt)}),n&&e.author_id===n&&(0,o.jsx)(j,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,o.jsx)(y,{children:e.content})]})]},e.id)})}):(0,o.jsx)(b,{children:"No comments yet"}),(0,o.jsxs)(m,{children:[(0,o.jsx)(f,{value:w,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(v,{onClick:S,disabled:!w.trim()||C,children:"Send"})]})]})}}}]);