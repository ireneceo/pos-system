"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>se});var i=t(9950),n=t(4752),o=t(1367),s=t(4302),a=t(7455),d=t(4185),l=t(4414);const c=n.Ay.div`
  min-height: 100vh;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,u=n.Ay.div`
  display: flex;
  gap: 12px;
`,g=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,j=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,f=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,w=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,F=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,k=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,E=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=n.Ay.div`
  flex: 1;
  min-width: 0;
`,S=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,z=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,I=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,q=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,_=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,R=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,N=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,O=n.Ay.div`
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
`,P=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,T=n.Ay.span`
  color: #374151;
`,L=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,M=n.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,U=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,Y=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,H=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,J=n.Ay.button`
  background: none; border: none; font-size: 24px; color: #6B7C93;
  cursor: pointer; padding: 0; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  &:hover { color: #0A2540; }
`,W=n.Ay.div`
  padding: 24px;
`,G=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,Q=n.Ay.div`
  margin-bottom: 20px;
`,V=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,X=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,Z=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,ee=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,re=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,te=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,ie=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,ne=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,oe=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`,se=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,se]=(0,i.useState)([]),[ae,de]=(0,i.useState)(""),[le,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)("all"),[he,ue]=(0,i.useState)("all"),[ge,je]=(0,i.useState)("all"),[me,fe]=(0,i.useState)(!1),[ye,be]=(0,i.useState)(null),[ve,we]=(0,i.useState)("open"),[Ae,Fe]=(0,i.useState)({}),[ke,Ce]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[Ee,Be]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&Se()},[e]),(0,i.useEffect)(()=>{if(n.length>0){ze();const e=setInterval(ze,1e4);return()=>clearInterval(e)}},[n]);const Se=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;se(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},ze=async()=>{try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json(),r=Array.isArray(e)?e:[];t(r),Ie(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},Ie=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Fe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},qe=r.filter(e=>{const r=e.subject.toLowerCase().includes(ae.toLowerCase())||e.ticketNumber.toLowerCase().includes(ae.toLowerCase()),t="all"===le||e.status===le,i="all"===pe||e.priority===pe,n="all"===he||e.category===he,o="all"===ge||String(e.restaurantId)===ge;return r&&t&&i&&n&&o}),_e=r.filter(e=>"open"===e.status).length,Re=r.filter(e=>"in-progress"===e.status).length,Ne=r.filter(e=>"resolved"===e.status).length,$e=e=>new Date(e).toLocaleString("en-MY");return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Operation Inquiry"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:ze,children:"Refresh"}),(0,l.jsx)(g,{variant:"primary",onClick:()=>fe(!0),children:"New Inquiry"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(j,{children:[(0,l.jsxs)(m,{color:"#635BFF",children:[(0,l.jsx)(f,{children:r.length}),(0,l.jsx)(y,{children:"Total Inquiries"})]}),(0,l.jsxs)(m,{color:"#F59E0B",children:[(0,l.jsx)(f,{children:_e}),(0,l.jsx)(y,{children:"Open"})]}),(0,l.jsxs)(m,{color:"#3B82F6",children:[(0,l.jsx)(f,{children:Re}),(0,l.jsx)(y,{children:"In Progress"})]}),(0,l.jsxs)(m,{color:"#10B981",children:[(0,l.jsx)(f,{children:Ne}),(0,l.jsx)(y,{children:"Resolved"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)(w,{children:"Search"}),(0,l.jsx)(A,{placeholder:"Search inquiries...",value:ae,onChange:e=>de(e.target.value)})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(w,{children:"Restaurant"}),(0,l.jsxs)(F,{value:ge,onChange:e=>je(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,l.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(w,{children:"Status"}),(0,l.jsxs)(F,{value:le,onChange:e=>ce(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(w,{children:"Priority"}),(0,l.jsxs)(F,{value:pe,onChange:e=>xe(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"low",children:"Low"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(w,{children:"Category"}),(0,l.jsxs)(F,{value:he,onChange:e=>ue(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Categories"}),(0,l.jsx)("option",{value:"schedule",children:"Schedule"}),(0,l.jsx)("option",{value:"inventory",children:"Inventory"}),(0,l.jsx)("option",{value:"staff",children:"Staff"}),(0,l.jsx)("option",{value:"menu",children:"Menu"}),(0,l.jsx)("option",{value:"customer",children:"Customer"}),(0,l.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,l.jsxs)(k,{children:[qe.map(e=>(0,l.jsxs)(C,{onClick:()=>(e=>{be(e),we(e.status)})(e),children:[(0,l.jsxs)(E,{children:[(0,l.jsxs)(B,{children:[(0,l.jsx)(S,{children:e.ticketNumber}),(0,l.jsx)(z,{children:e.subject}),(0,l.jsxs)(I,{children:[(0,l.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,l.jsx)(q,{children:e.restaurantName})]})]}),(0,l.jsxs)(_,{children:[(0,l.jsx)(R,{status:e.status,children:e.status}),(0,l.jsx)(N,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)($,{children:e.description}),(0,l.jsxs)(O,{children:[(0,l.jsxs)(D,{children:[(0,l.jsx)(P,{children:"Created"}),(0,l.jsx)(T,{children:$e(e.createdAt)})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(P,{children:"Category"}),(0,l.jsx)(T,{style:{textTransform:"capitalize"},children:e.category})]}),Ae[String(e.id)]&&(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",Ae[String(e.id)].total_comments,Ae[String(e.id)].unread_count>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[Ae[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===qe.length&&(0,l.jsxs)(L,{children:[(0,l.jsx)("h3",{children:"No operation inquiries"}),(0,l.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),me&&(0,l.jsx)(M,{onClick:()=>fe(!1),children:(0,l.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(Y,{children:[(0,l.jsx)(H,{children:"Create Operation Inquiry"}),(0,l.jsx)(J,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,l.jsxs)(W,{children:[(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Restaurant *"}),(0,l.jsxs)(Z,{value:ke.restaurantId,onChange:e=>Ce({...ke,restaurantId:e.target.value}),required:!0,children:[(0,l.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,l.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Subject *"}),(0,l.jsx)(X,{type:"text",value:ke.subject,onChange:e=>Ce({...ke,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Description *"}),(0,l.jsx)(ee,{value:ke.description,onChange:e=>Ce({...ke,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Attachments"}),(0,l.jsx)(a.A,{files:Ee,onChange:Be,maxFiles:5})]}),(0,l.jsxs)(K,{children:[(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Priority"}),(0,l.jsxs)(Z,{value:ke.priority,onChange:e=>Ce({...ke,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"low",children:"Low"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Category"}),(0,l.jsxs)(Z,{value:ke.category,onChange:e=>Ce({...ke,category:e.target.value}),children:[(0,l.jsx)("option",{value:"schedule",children:"Schedule"}),(0,l.jsx)("option",{value:"inventory",children:"Inventory"}),(0,l.jsx)("option",{value:"staff",children:"Staff"}),(0,l.jsx)("option",{value:"menu",children:"Menu"}),(0,l.jsx)("option",{value:"customer",children:"Customer"}),(0,l.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,l.jsxs)(G,{children:[(0,l.jsx)(g,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,l.jsx)(g,{variant:"primary",onClick:async()=>{if(!ke.restaurantId||!ke.subject.trim()||!ke.description.trim())return;const r=n.find(e=>e.id===parseInt(ke.restaurantId));try{const t=localStorage.getItem("auth_token"),i={restaurantId:parseInt(ke.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:ke.subject,description:ke.description,priority:ke.priority,category:ke.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",attachments:Ee.length>0?Ee:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})).ok&&(ze(),fe(!1),Ce({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),Be([]))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ke.restaurantId||!ke.subject.trim()||!ke.description.trim(),children:"Submit Inquiry"})]})]})}),ye&&(0,l.jsx)(M,{onClick:()=>be(null),children:(0,l.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(Y,{children:[(0,l.jsx)(H,{children:ye.ticketNumber}),(0,l.jsx)(J,{onClick:()=>be(null),children:"\xd7"})]}),(0,l.jsxs)(W,{children:[(0,l.jsxs)(re,{children:[(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"Subject:"}),(0,l.jsx)(ne,{children:ye.subject})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"Restaurant:"}),(0,l.jsx)(ne,{children:ye.restaurantName})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"From:"}),(0,l.jsxs)(ne,{children:[ye.requesterName," (",ye.requesterRole,")"]})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"Priority:"}),(0,l.jsx)(ne,{children:(0,l.jsx)(N,{priority:ye.priority,children:ye.priority})})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"Category:"}),(0,l.jsx)(ne,{style:{textTransform:"capitalize"},children:ye.category})]}),(0,l.jsxs)(te,{children:[(0,l.jsx)(ie,{children:"Created:"}),(0,l.jsx)(ne,{children:$e(ye.createdAt)})]})]}),(0,l.jsx)(V,{children:"Description"}),(0,l.jsx)(oe,{children:ye.description}),(null===ye||void 0===ye?void 0:ye.attachments)&&ye.attachments.length>0&&(0,l.jsx)(d.A,{attachments:ye.attachments}),(0,l.jsxs)(Q,{children:[(0,l.jsx)(V,{children:"Status"}),(0,l.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,l.jsxs)(Z,{value:ve,onChange:e=>we(e.target.value),style:{flex:1},children:[(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),ve!==ye.status&&(0,l.jsx)(g,{variant:"primary",onClick:async()=>{if(ye&&ve!==ye.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ye.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ve})});if(r.ok){const e=await r.json(),i=e.data||e;t(e=>e.map(e=>e.id===ye.id?{...e,...i}:e)),be(e=>e?{...e,...i}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,l.jsx)(s.A,{entityType:"operation_ticket",entityId:String(ye.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>Fe(e=>{const r={...e},t=String(ye.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);