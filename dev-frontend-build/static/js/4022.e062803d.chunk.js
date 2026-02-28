"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4022],{4022:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Z});var i=t(9950),n=t(4752),o=t(1367),a=t(4302),s=t(4414);const l=n.Ay.div`
  min-height: 100vh;
`,d=n.Ay.div`
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
`,m=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=n.Ay.div`
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
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=n.Ay.div`
  flex: 1;
`,C=n.Ay.div`
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
`,z=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,S=n.Ay.div`
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
`,_=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=n.Ay.span`
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
`,$=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,q=n.Ay.span`
  color: #374151;
`,P=n.Ay.div`
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
`,L=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,M=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=n.Ay.button`
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
`,W=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,H=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,K=n.Ay.div`
  margin-bottom: 20px;
`,Y=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Q=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,X=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,Z=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,Z]=(0,i.useState)([]),[ee,re]=(0,i.useState)(""),[te,ie]=(0,i.useState)("all"),[ne,oe]=(0,i.useState)("all"),[ae,se]=(0,i.useState)("all"),[le,de]=(0,i.useState)("all"),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,ge]=(0,i.useState)(null),[me,ye]=(0,i.useState)("open"),[fe,je]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}),[ve,be]=(0,i.useState)([]),[Ae,we]=(0,i.useState)({});(0,i.useEffect)(()=>{e&&Fe()},[e]),(0,i.useEffect)(()=>{if(n.length>0){ke();const e=setInterval(ke,1e4);return()=>clearInterval(e)}},[n]);const Fe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;Z(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},ke=async()=>{try{const r=await fetch("/api/support-tickets");if(r.ok){const i=await r.json(),o=i.data||i,a=n.map(e=>e.id),s=o.filter(r=>r.restaurantId&&a.includes(r.restaurantId)||r.customerId===String(null===e||void 0===e?void 0:e.id));t(s),Ee(s)}}catch(r){console.error("Error fetching tickets:",r)}},Ee=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),we(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Ce=r.filter(e=>{const r=e.subject.toLowerCase().includes(ee.toLowerCase())||e.ticketNumber.toLowerCase().includes(ee.toLowerCase()),t="all"===te||e.status===te,i="all"===ne||e.priority===ne,n="all"===ae||e.category===ae,o="all"===le||String(e.restaurantId)===le;return r&&t&&i&&n&&o}),Be=r.filter(e=>"open"===e.status).length,ze=r.filter(e=>"in-progress"===e.status).length,Se=r.filter(e=>"resolved"===e.status).length,Ie=e=>new Date(e).toLocaleString("en-MY"),_e=e=>{if(!e)return"";const r=n.find(r=>r.id===e);return r?r.name:""};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"System Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:ke,children:"Refresh"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>pe(!0),children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(m,{children:r.length}),(0,s.jsx)(y,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(m,{children:Be}),(0,s.jsx)(y,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(m,{children:ze}),(0,s.jsx)(y,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(m,{children:Se}),(0,s.jsx)(y,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Search"}),(0,s.jsx)(b,{placeholder:"Search inquiries...",value:ee,onChange:e=>re(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Restaurant"}),(0,s.jsxs)(A,{value:le,onChange:e=>de(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Status"}),(0,s.jsxs)(A,{value:te,onChange:e=>ie(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Priority"}),(0,s.jsxs)(A,{value:ne,onChange:e=>oe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Category"}),(0,s.jsxs)(A,{value:ae,onChange:e=>se(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"technical",children:"Technical"}),(0,s.jsx)("option",{value:"billing",children:"Billing"}),(0,s.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,s.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,s.jsx)("option",{value:"general",children:"General"})]})]})]}),(0,s.jsxs)(w,{children:[Ce.map(e=>(0,s.jsxs)(F,{onClick:()=>{ge(e),ye(e.status),he(!0)},children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(z,{children:[e.customerName,e.restaurantName&&(0,s.jsx)(N,{children:e.restaurantName})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(I,{status:e.status,children:e.status}),(0,s.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(T,{children:e.description}),(0,s.jsxs)($,{children:[(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Created"}),(0,s.jsx)(q,{children:Ie(e.createdAt)})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Category"}),(0,s.jsx)(q,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Restaurant"}),(0,s.jsx)(q,{children:_e(e.restaurantId)||e.restaurantName||"-"})]}),Ae[e.id]&&(0,s.jsx)(D,{children:(0,s.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",Ae[e.id].total_comments,Ae[e.id].unread_count>0&&(0,s.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[Ae[e.id].unread_count," new"]})]})})]})]},e.id)),0===Ce.length&&(0,s.jsxs)(X,{children:[(0,s.jsx)("h3",{children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit a system inquiry for your restaurants.'})]})]}),ce&&(0,s.jsx)(P,{onClick:()=>pe(!1),children:(0,s.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(M,{children:"Create System Inquiry"}),(0,s.jsx)(U,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,s.jsxs)(J,{children:[(0,s.jsxs)(K,{children:[(0,s.jsx)(Y,{children:"Restaurant *"}),(0,s.jsxs)(Q,{value:fe.restaurantId,onChange:e=>je({...fe,restaurantId:e.target.value}),required:!0,children:[(0,s.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,s.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,s.jsxs)(K,{children:[(0,s.jsx)(Y,{children:"Subject *"}),(0,s.jsx)(G,{type:"text",value:fe.subject,onChange:e=>je({...fe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(K,{children:[(0,s.jsx)(Y,{children:"Description *"}),(0,s.jsx)(V,{value:fe.description,onChange:e=>je({...fe,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,s.jsxs)(H,{children:[(0,s.jsxs)(K,{children:[(0,s.jsx)(Y,{children:"Priority"}),(0,s.jsxs)(Q,{value:fe.priority,onChange:e=>je({...fe,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(K,{children:[(0,s.jsx)(Y,{children:"Category"}),(0,s.jsxs)(Q,{value:fe.category,onChange:e=>je({...fe,category:e.target.value}),children:[(0,s.jsx)("option",{value:"general",children:"General"}),(0,s.jsx)("option",{value:"technical",children:"Technical"}),(0,s.jsx)("option",{value:"billing",children:"Billing"}),(0,s.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,s.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(!fe.restaurantId||!fe.subject.trim()||!fe.description.trim())return;const r=n.find(e=>e.id===parseInt(fe.restaurantId));try{const t={customerId:(null===e||void 0===e?void 0:e.id)||"",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",customerEmail:(null===e||void 0===e?void 0:e.email)||"",customerRole:"manager",restaurantId:parseInt(fe.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:fe.subject,description:fe.description,status:"open",priority:fe.priority,category:fe.category};(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok&&(ke(),pe(!1),je({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}))}catch(t){console.error("Error creating ticket:",t)}},disabled:!fe.restaurantId||!fe.subject.trim()||!fe.description.trim(),children:"Submit Inquiry"})]})]})}),xe&&ue&&(0,s.jsx)(P,{onClick:()=>he(!1),children:(0,s.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(M,{children:"Inquiry Details"}),(0,s.jsx)(U,{onClick:()=>he(!1),children:"\xd7"})]}),(0,s.jsxs)(J,{children:[(0,s.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Ticket Number"}),(0,s.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ue.ticketNumber})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Status"}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,s.jsxs)(Q,{value:me,onChange:e=>ye(e.target.value),style:{flex:1},children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]}),me!==ue.status&&(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(ue)try{(await fetch(`/api/support-tickets/${ue.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:me})})).ok&&(t(e=>e.map(e=>e.id===ue.id?{...e,status:me}:e)),ge(e=>e?{...e,status:me}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Priority"}),(0,s.jsx)("div",{style:{padding:"8px 0"},children:(0,s.jsx)(_,{priority:ue.priority,children:ue.priority})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Restaurant"}),(0,s.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:_e(ue.restaurantId)||ue.restaurantName||"-"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Subject"}),(0,s.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ue.subject})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Description"}),(0,s.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ue.description})]}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Created"}),(0,s.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ie(ue.createdAt)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Y,{children:"Category"}),(0,s.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ue.category.replace("-"," ")})]})]})]}),(0,s.jsx)(a.A,{entityType:"support_ticket",entityId:ue.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>we(e=>{const r={...e};return r[ue.id]&&(r[ue.id]={...r[ue.id],unread_count:0}),r})})]}),(0,s.jsx)(W,{children:(0,s.jsx)(h,{variant:"secondary",onClick:()=>he(!1),children:"Close"})})]})})]})]})})}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),i=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,n.jsx)(x,{children:t.map((e,r)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},r))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,r)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,i})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>$});var i=t(9950),n=t(4752),o=t(4185),a=t(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
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
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,u=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=n.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=n.Ay.p`
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
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=n.Ay.textarea`
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
`,w=n.Ay.div`
  display: flex;
  gap: 4px;
`,F=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,k=n.Ay.button`
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
`,E=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,B=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,z=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,S=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,I=n.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=n.Ay.input`
  display: none;
`,N=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,$=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:$}=e;const[D,R]=(0,i.useState)([]),[q,P]=(0,i.useState)(""),[O,L]=(0,i.useState)(!1),[M,U]=(0,i.useState)([]),[J,W]=(0,i.useState)(!1),[H,K]=(0,i.useState)(""),[Y,G]=(0,i.useState)(!1),Q=(0,i.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&R(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{t&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),$&&$()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const X=async()=>{if(J)return;const e=q.trim(),i=M.length>0;if((e||i)&&!Y){G(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:q.trim(),attachments:i?M:void 0,is_internal:O||void 0})})).ok&&(P(""),U([]),L(!1),V())}catch(n){console.error("Error adding comment:",n)}finally{G(!1)}}},Z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var r,t,i;return(0,a.jsxs)(c,{isInternal:e.is_internal,children:[(0,a.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),e.is_internal&&(0,a.jsx)(m,{children:"Internal"}),(0,a.jsx)(y,{children:Z(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(j,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&V()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(E,{children:"No comments yet"}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(A,{value:q,onChange:e=>P(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:O?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=Q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(k,{onClick:X,disabled:!q.trim()&&0===M.length||Y||J,children:"Send"})]})]}),(0,a.jsx)(N,{children:(0,a.jsxs)(T,{children:[(0,a.jsx)("input",{type:"checkbox",checked:O,onChange:e=>L(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(M.length>0||J||H)&&(0,a.jsxs)(C,{children:[J&&(0,a.jsx)(S,{children:"Uploading..."}),H&&(0,a.jsx)(I,{children:H}),M.map((e,r)=>(0,a.jsxs)(B,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(z,{onClick:()=>(e=>{const r=M[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),U(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(_,{ref:Q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-M.length,i=Array.from(r).slice(0,t);if(0!==i.length){W(!0),K("");try{const e=new FormData;i.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data?U(e=>[...e,...n.data]):K(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),K("File upload failed. Please try again.")}finally{W(!1)}}}})]})}}}]);