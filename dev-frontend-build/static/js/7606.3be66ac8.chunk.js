"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),a=r(4414);const i=n.Ay.div`
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
`,o=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,a.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,a.jsx)(o,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,a.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),a=r(4492);function i(e){const[t,r]=(0,a.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},7606:(e,t,r)=>{r.r(t),r.d(t,{default:()=>I});var n=r(9950),a=r(4752),i=r(4492),o=r(2597),s=r(2653),l=r(1367),d=r(4414);const c=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=a.Ay.div`
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
`,x=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=a.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,b=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,y=a.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,f=a.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,j=a.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,w=a.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,k=a.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,v=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,F=a.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #635BFF;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`,A=a.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #635BFF;
  border: 1px solid #635BFF;

  &:hover {
    background: #F0F4FF;
  }
`,S=a.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,_=a.Ay.div`
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,C=a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`,E=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,B=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,z=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,T=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`,N=a.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #F3F4F6;
  color: #374151;
  border: none;
  transition: all 0.15s;

  &:hover {
    background: #E5E7EB;
  }
`,I=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,i.g)(),[r,a]=(0,s.M)("email"),[I,$]=(0,n.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:"",sms_enabled:!1,whatsapp_enabled:!1}),[M,P]=(0,n.useState)(!1),[O,D]=(0,n.useState)(!1),[G,U]=(0,n.useState)(null),[L,R]=(0,n.useState)(!1),[W,Y]=(0,n.useState)(""),[J,K]=(0,n.useState)(!1),[Z,q]=(0,n.useState)(!1),[H,Q]=(0,n.useState)({success:!1,text:""}),{entityType:V,entityId:X}=(0,n.useMemo)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]);if((0,n.useEffect)(()=>{e&&ee()},[V,X]),!e)return null;const ee=async()=>{P(!0);try{const e=await fetch(`/api/notification-settings/${V}/${X}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();$(t)}}catch(e){console.error("Failed to load settings:",e)}finally{P(!1)}};return M?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsx)(h,{children:(0,d.jsx)(u,{children:"Loading..."})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(o.tU,{children:[(0,d.jsx)(o.oz,{active:"email"===r,onClick:()=>a("email"),children:"Email"}),(0,d.jsx)(o.oz,{active:"sms"===r,onClick:()=>a("sms"),children:"SMS"}),(0,d.jsx)(o.oz,{active:"whatsapp"===r,onClick:()=>a("whatsapp"),children:"WhatsApp"})]}),"email"===r&&(0,d.jsxs)(u,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(j,{type:"checkbox",checked:I.email_enabled,onChange:e=>$({...I,email_enabled:e.target.checked})}),"Enable Email Notifications"]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["SMTP Server",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"text",placeholder:"smtp.gmail.com",value:I.smtp_host,onChange:e=>$({...I,smtp_host:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["SMTP Port",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"number",placeholder:"587",value:I.smtp_port,onChange:e=>$({...I,smtp_port:parseInt(e.target.value)}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["SMTP Username",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"email",placeholder:"your-email@gmail.com",value:I.smtp_user,onChange:e=>$({...I,smtp_user:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Your full email address"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["SMTP Password",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:I.smtp_password,onChange:e=>$({...I,smtp_password:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["From Email",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"email",placeholder:"noreply@yourstore.com",value:I.from_email,onChange:e=>$({...I,from_email:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:["From Name",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(f,{type:"text",placeholder:"Your Store Name",value:I.from_name,onChange:e=>$({...I,from_name:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(b,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(f,{type:"email",placeholder:"support@yourstore.com",value:I.reply_to_email,onChange:e=>$({...I,reply_to_email:e.target.value}),disabled:!I.email_enabled}),(0,d.jsx)(k,{children:"Where replies should be sent"})]}),I.email_enabled&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(F,{onClick:async()=>{D(!0),U(null);try{const e=localStorage.getItem("auth_token");if(!e)return U({type:"error",text:"No authentication token found. Please log in again."}),void D(!1);const t=await fetch(`/api/notification-settings/${V}/${X}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(I)}),r=await t.json();t.ok?U({type:"success",text:"Settings saved successfully"}):U({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),U({type:"error",text:"An error occurred while saving settings"})}finally{D(!1)}},disabled:O,children:O?"Saving...":"Save Settings"}),(0,d.jsx)(A,{onClick:()=>{Y(""),R(!0)},children:"Send Test Email"})]}),G&&(0,d.jsx)(S,{type:G.type,children:G.text})]})]}),"sms"===r&&(0,d.jsx)(u,{children:(0,d.jsx)(_,{children:"SMS notifications are coming soon. Stay tuned for updates!"})}),"whatsapp"===r&&(0,d.jsx)(u,{children:(0,d.jsx)(_,{children:"WhatsApp notifications are coming soon. Stay tuned for updates!"})})]})]}),L&&(0,d.jsx)(C,{onClick:()=>R(!1),children:(0,d.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:"Send Test Email"}),(0,d.jsx)(z,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(g,{children:[(0,d.jsx)(b,{children:"Email Address"}),(0,d.jsx)(f,{type:"email",placeholder:"test@example.com",value:W,onChange:e=>Y(e.target.value),autoFocus:!0})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(N,{onClick:()=>R(!1),children:"Cancel"}),(0,d.jsx)(F,{onClick:async()=>{if(W){K(!0);try{const e=await fetch(`/api/notification-settings/${V}/${X}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:W})}),t=await e.json();R(!1),e.ok?Q({success:!0,text:"Test email sent successfully!"}):Q({success:!1,text:t.error||"Failed to send test email"}),q(!0)}catch(e){R(!1),Q({success:!1,text:"An error occurred while sending test email"}),q(!0)}finally{K(!1)}}},disabled:J||!W,children:J?"Sending...":"Send"})]})]})}),Z&&(0,d.jsx)(C,{onClick:()=>q(!1),children:(0,d.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:H.success?"Success":"Error"}),(0,d.jsx)(z,{children:H.text}),(0,d.jsx)(T,{children:(0,d.jsx)(F,{onClick:()=>q(!1),children:"OK"})})]})})]})}}}]);