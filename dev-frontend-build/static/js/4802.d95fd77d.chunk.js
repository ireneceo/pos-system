"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Z});var o=n(9950),t=n(4752),i=n(2853),a=n(8409),s=n(1367),l=n(4302),d=n(7455),p=n(4185),c=n(5030),u=n(4414);const x=t.Ay.div`
  min-height: 100vh;
`,h=t.Ay.div`
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
`,g=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,w=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,y=t.Ay.div`
  display: flex;
  gap: 12px;
`,j=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,b=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=t.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,I=(t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,t.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`),A=t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,q=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,O=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,P=t.Ay.div`
  flex: 1;
  min-width: 0;
`,E=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,C=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,B=t.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,S=t.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,z=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=t.Ay.div`
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
`,D=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=t.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=t.Ay.span`
  color: #374151;
`,Y=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,J=t.Ay.div`
  margin-bottom: 20px;
`,M=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=t.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,W=t.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,G=t.Ay.textarea`
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
`,H=t.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,K=t.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,Q=t.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,V=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,X=t.Ay.div`
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
`,Z=()=>{const{t:e}=(0,c.Bd)("owner"),{user:r}=(0,s.As)(),[n,t]=(0,o.useState)([]),[Z,ee]=(0,o.useState)([]),[re,ne]=(0,o.useState)(""),[oe,te]=(0,o.useState)("all"),[ie,ae]=(0,o.useState)("all"),[se,le]=(0,o.useState)("all"),[de,pe]=(0,o.useState)("all"),[ce,ue]=(0,o.useState)(!1),[xe,he]=(0,o.useState)(null),[ge,we]=(0,o.useState)("open"),[ye,je]=(0,o.useState)({}),[me,fe]=(0,o.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[be,ve]=(0,o.useState)([]);(0,o.useEffect)(()=>{r&&Fe()},[r]),(0,o.useEffect)(()=>{if(Z.length>0){Ie();const e=setInterval(Ie,1e4);return()=>clearInterval(e)}},[Z]);const Fe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;ee(n.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Ie=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/operation-tickets?userId=${null===r||void 0===r?void 0:r.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json(),r=Array.isArray(e)?e:[];t(r),Ae(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ae=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),je(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},qe=n.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase()),n="all"===oe||e.status===oe,o="all"===ie||e.priority===ie,t="all"===se||e.category===se,i="all"===de||String(e.restaurantId)===de;return r&&n&&o&&t&&i}),ke=n.filter(e=>"open"===e.status).length,Oe=n.filter(e=>"in-progress"===e.status).length,Pe=n.filter(e=>"resolved"===e.status).length,Ee=e=>new Date(e).toLocaleString("en-MY");return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(x,{children:[(0,u.jsxs)(h,{children:[(0,u.jsx)(w,{children:e("owner:ownerOperationInquiryPage.operationInquiry")}),(0,u.jsx)(y,{children:(0,u.jsx)(j,{variant:"primary",onClick:()=>ue(!0),children:e("owner:ownerOperationInquiryPage.newInquiry")})})]}),(0,u.jsxs)(g,{children:[(0,u.jsxs)(m,{children:[(0,u.jsxs)(f,{color:"#635BFF",children:[(0,u.jsx)(b,{children:n.length}),(0,u.jsx)(v,{children:e("owner:ownerOperationInquiryPage.totalInquiries")})]}),(0,u.jsxs)(f,{color:"#F59E0B",children:[(0,u.jsx)(b,{children:ke}),(0,u.jsx)(v,{children:e("owner:ownerOperationInquiryPage.open")})]}),(0,u.jsxs)(f,{color:"#3B82F6",children:[(0,u.jsx)(b,{children:Oe}),(0,u.jsx)(v,{children:e("owner:ownerOperationInquiryPage.inProgress")})]}),(0,u.jsxs)(f,{color:"#10B981",children:[(0,u.jsx)(b,{children:Pe}),(0,u.jsx)(v,{children:e("owner:ownerOperationInquiryPage.resolved")})]})]}),(0,u.jsxs)(F,{children:[(0,u.jsxs)(A,{value:de,onChange:e=>pe(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allRestaurants")}),Z.map(e=>(0,u.jsx)("option",{value:String(e.id),children:e.name},e.id))]}),(0,u.jsxs)(A,{value:oe,onChange:e=>te(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allStatus")}),(0,u.jsx)("option",{value:"open",children:e("owner:ownerOperationInquiryPage.open")}),(0,u.jsx)("option",{value:"in-progress",children:e("owner:ownerOperationInquiryPage.inProgress")}),(0,u.jsx)("option",{value:"resolved",children:e("owner:ownerOperationInquiryPage.resolved")}),(0,u.jsx)("option",{value:"closed",children:e("owner:ownerOperationInquiryPage.closed")})]}),(0,u.jsxs)(A,{value:ie,onChange:e=>ae(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allPriority")}),(0,u.jsx)("option",{value:"urgent",children:e("owner:ownerOperationInquiryPage.urgent")}),(0,u.jsx)("option",{value:"high",children:e("owner:ownerOperationInquiryPage.high")}),(0,u.jsx)("option",{value:"medium",children:e("owner:ownerOperationInquiryPage.medium")}),(0,u.jsx)("option",{value:"low",children:e("owner:ownerOperationInquiryPage.low")})]}),(0,u.jsxs)(A,{value:se,onChange:e=>le(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allCategories")}),(0,u.jsx)("option",{value:"schedule",children:e("owner:ownerOperationInquiryPage.schedule")}),(0,u.jsx)("option",{value:"inventory",children:e("owner:ownerOperationInquiryPage.inventory")}),(0,u.jsx)("option",{value:"staff",children:e("owner:ownerOperationInquiryPage.staff")}),(0,u.jsx)("option",{value:"menu",children:e("owner:ownerOperationInquiryPage.menu")}),(0,u.jsx)("option",{value:"customer",children:e("owner:ownerOperationInquiryPage.customer")}),(0,u.jsx)("option",{value:"other",children:e("owner:ownerOperationInquiryPage.other")})]}),(0,u.jsx)(I,{placeholder:"Search inquiries...",value:re,onChange:e=>ne(e.target.value)})]}),(0,u.jsxs)(q,{children:[qe.map(r=>(0,u.jsxs)(k,{onClick:()=>(e=>{he(e),we(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(r),children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(P,{children:[(0,u.jsx)(E,{children:r.ticketNumber}),(0,u.jsx)(C,{children:r.subject}),(0,u.jsxs)(B,{children:[(0,u.jsxs)("span",{children:["From: ",r.requesterName," (",r.requesterRole,")"]}),(0,u.jsx)(S,{children:r.restaurantName})]})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(_,{status:r.status,children:r.status}),(0,u.jsx)($,{priority:r.priority,children:r.priority})]})]}),(0,u.jsx)(N,{children:r.description}),(0,u.jsxs)(D,{children:[(0,u.jsxs)(R,{children:[(0,u.jsx)(T,{children:e("owner:ownerOperationInquiryPage.created")}),(0,u.jsx)(L,{children:Ee(r.createdAt)})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(T,{children:e("owner:ownerOperationInquiryPage.category")}),(0,u.jsx)(L,{style:{textTransform:"capitalize"},children:r.category})]}),ye[String(r.id)]&&(0,u.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ye[String(r.id)].total_comments,ye[String(r.id)].unread_count>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ye[String(r.id)].unread_count," new"]})]})]})]},r.id)),0===qe.length&&(0,u.jsxs)(i.pp,{children:[(0,u.jsx)("h3",{children:e("owner:ownerOperationInquiryPage.noOperationInquiries")}),(0,u.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),ce&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>ue(!1),title:"Create Operation Inquiry",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(j,{variant:"secondary",onClick:()=>ue(!1),children:e("owner:ownerOperationInquiryPage.cancel")}),(0,u.jsx)(j,{variant:"primary",onClick:async()=>{if(!me.restaurantId||!me.subject.trim()||!me.description.trim())return;const e=Z.find(e=>e.id===parseInt(me.restaurantId));try{const n=localStorage.getItem("auth_token"),o={restaurantId:parseInt(me.restaurantId),restaurantName:(null===e||void 0===e?void 0:e.name)||"",subject:me.subject,description:me.description,priority:me.priority,category:me.category,inquiryType:"owner",managerId:null===r||void 0===r?void 0:r.id,managerName:(null===r||void 0===r?void 0:r.name)||"Restaurant Owner",attachments:be.length>0?be:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(o)})).ok&&(Ie(),ue(!1),fe({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),ve([]))}catch(n){console.error("Error creating ticket:",n)}},disabled:!me.restaurantId||!me.subject.trim()||!me.description.trim(),children:e("owner:ownerOperationInquiryPage.submitInquiry")})]}),children:[(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Restaurant *"}),(0,u.jsxs)(W,{value:me.restaurantId,onChange:e=>fe({...me,restaurantId:e.target.value}),required:!0,children:[(0,u.jsx)("option",{value:"",children:e("owner:ownerOperationInquiryPage.selectRestaurant")}),Z.map(e=>(0,u.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Subject *"}),(0,u.jsx)(U,{type:"text",value:me.subject,onChange:e=>fe({...me,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Description *"}),(0,u.jsx)(G,{value:me.description,onChange:e=>fe({...me,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:e("owner:ownerOperationInquiryPage.attachments")}),(0,u.jsx)(d.A,{files:be,onChange:ve,maxFiles:5})]}),(0,u.jsxs)(Y,{children:[(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:e("owner:ownerOperationInquiryPage.priority")}),(0,u.jsxs)(W,{value:me.priority,onChange:e=>fe({...me,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"low",children:e("owner:ownerOperationInquiryPage.low")}),(0,u.jsx)("option",{value:"medium",children:e("owner:ownerOperationInquiryPage.medium")}),(0,u.jsx)("option",{value:"high",children:e("owner:ownerOperationInquiryPage.high")}),(0,u.jsx)("option",{value:"urgent",children:e("owner:ownerOperationInquiryPage.urgent")})]})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:e("owner:ownerOperationInquiryPage.category")}),(0,u.jsxs)(W,{value:me.category,onChange:e=>fe({...me,category:e.target.value}),children:[(0,u.jsx)("option",{value:"schedule",children:e("owner:ownerOperationInquiryPage.schedule")}),(0,u.jsx)("option",{value:"inventory",children:e("owner:ownerOperationInquiryPage.inventory")}),(0,u.jsx)("option",{value:"staff",children:e("owner:ownerOperationInquiryPage.staff")}),(0,u.jsx)("option",{value:"menu",children:e("owner:ownerOperationInquiryPage.menu")}),(0,u.jsx)("option",{value:"customer",children:e("owner:ownerOperationInquiryPage.customer")}),(0,u.jsx)("option",{value:"other",children:e("owner:ownerOperationInquiryPage.other")})]})]})]})]}),xe&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>he(null),title:xe.ticketNumber,size:"large",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(j,{variant:"secondary",onClick:()=>he(null),children:e("owner:ownerOperationInquiryPage.close")})}),children:[(0,u.jsxs)(H,{children:[(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"Subject:"}),(0,u.jsx)(V,{children:xe.subject})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"Restaurant:"}),(0,u.jsx)(V,{children:xe.restaurantName})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"From:"}),(0,u.jsxs)(V,{children:[xe.requesterName," (",xe.requesterRole,")"]})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"Priority:"}),(0,u.jsx)(V,{children:(0,u.jsx)($,{priority:xe.priority,children:xe.priority})})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"Category:"}),(0,u.jsx)(V,{style:{textTransform:"capitalize"},children:xe.category})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(Q,{children:"Created:"}),(0,u.jsx)(V,{children:Ee(xe.createdAt)})]})]}),(0,u.jsx)(M,{children:e("owner:ownerOperationInquiryPage.description")}),(0,u.jsx)(X,{children:xe.description}),(null===xe||void 0===xe?void 0:xe.attachments)&&xe.attachments.length>0&&(0,u.jsx)(p.A,{attachments:xe.attachments}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:e("owner:ownerOperationInquiryPage.status")}),(0,u.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,u.jsxs)(W,{value:ge,onChange:e=>we(e.target.value),style:{flex:1},children:[(0,u.jsx)("option",{value:"open",children:e("owner:ownerOperationInquiryPage.open")}),(0,u.jsx)("option",{value:"in-progress",children:e("owner:ownerOperationInquiryPage.inProgress")}),(0,u.jsx)("option",{value:"resolved",children:e("owner:ownerOperationInquiryPage.resolved")}),(0,u.jsx)("option",{value:"closed",children:e("owner:ownerOperationInquiryPage.closed")})]}),ge!==xe.status&&(0,u.jsx)(j,{variant:"primary",onClick:async()=>{if(xe&&ge!==xe.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${xe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ge})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===xe.id?{...e,...n}:e)),he(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,u.jsx)(l.A,{entityType:"operation_ticket",entityId:String(xe.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>je(e=>{const r={...e},n=String(xe.id);return r[n]&&(r[n]={...r[n],unread_count:0}),r})})]})]})]})})}}}]);