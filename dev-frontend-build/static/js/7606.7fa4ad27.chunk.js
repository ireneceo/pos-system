"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{7606:(e,t,i)=>{i.r(t),i.d(t,{default:()=>I});var r=i(9950),n=i(4752),o=i(4492),a=i(7960),s=i(1367),l=i(4414);const d=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,c=n.Ay.div`
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
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,x=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,m=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,u=n.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,g=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,y=n.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,b=n.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
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

  &:hover {
    border-color: #C7D2FE;
  }

  &:disabled {
    background: #F6F9FC;
    color: #8898AA;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,f=n.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,j=n.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,w=n.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,k=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,S=n.Ay.button`
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
`,A=n.Ay.button`
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
`,F=n.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,v=n.Ay.div`
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,_=n.Ay.div`
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
`,C=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,E=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,B=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,T=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`,z=n.Ay.button`
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
`,I=()=>{const{user:e}=(0,s.As)(),{restaurantId:t}=(0,o.g)(),[i,n]=(0,r.useState)("email"),[I,N]=(0,r.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:"",sms_enabled:!1,whatsapp_enabled:!1}),[P,M]=(0,r.useState)(!1),[$,O]=(0,r.useState)(!1),[G,D]=(0,r.useState)(null),[L,R]=(0,r.useState)(!1),[W,Y]=(0,r.useState)(""),[J,U]=(0,r.useState)(!1),[K,q]=(0,r.useState)(!1),[H,Q]=(0,r.useState)({success:!1,text:""}),{entityType:V,entityId:X}=(0,r.useMemo)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]);if((0,r.useEffect)(()=>{e&&Z()},[V,X]),!e)return null;const Z=async()=>{M(!0);try{const e=await fetch(`/api/notification-settings/${V}/${X}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();N(t)}}catch(e){console.error("Failed to load settings:",e)}finally{M(!1)}};return P?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(d,{children:[(0,l.jsx)(c,{children:(0,l.jsx)(p,{children:"Notification Settings"})}),(0,l.jsx)(x,{children:(0,l.jsx)(h,{children:"Loading..."})})]})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(d,{children:[(0,l.jsx)(c,{children:(0,l.jsx)(p,{children:"Notification Settings"})}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(a.j,{children:[(0,l.jsx)(a.oz,{active:"email"===i,onClick:()=>n("email"),children:"Email"}),(0,l.jsx)(a.oz,{active:"sms"===i,onClick:()=>n("sms"),children:"SMS"}),(0,l.jsx)(a.oz,{active:"whatsapp"===i,onClick:()=>n("whatsapp"),children:"WhatsApp"})]}),"email"===i&&(0,l.jsxs)(h,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(f,{type:"checkbox",checked:I.email_enabled,onChange:e=>N({...I,email_enabled:e.target.checked})}),"Enable Email Notifications"]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["SMTP Server",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"text",placeholder:"smtp.gmail.com",value:I.smtp_host,onChange:e=>N({...I,smtp_host:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["SMTP Port",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"number",placeholder:"587",value:I.smtp_port,onChange:e=>N({...I,smtp_port:parseInt(e.target.value)}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["SMTP Username",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"email",placeholder:"your-email@gmail.com",value:I.smtp_user,onChange:e=>N({...I,smtp_user:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Your full email address"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["SMTP Password",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:I.smtp_password,onChange:e=>N({...I,smtp_password:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["From Email",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"email",placeholder:"noreply@yourstore.com",value:I.from_email,onChange:e=>N({...I,from_email:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Email address shown to recipients"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:["From Name",(0,l.jsx)(y,{children:"*"})]}),(0,l.jsx)(b,{type:"text",placeholder:"Your Store Name",value:I.from_name,onChange:e=>N({...I,from_name:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Display name shown to recipients"})]})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Reply-To Email (Optional)"}),(0,l.jsx)(b,{type:"email",placeholder:"support@yourstore.com",value:I.reply_to_email,onChange:e=>N({...I,reply_to_email:e.target.value}),disabled:!I.email_enabled}),(0,l.jsx)(w,{children:"Where replies should be sent"})]}),I.email_enabled&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(S,{onClick:async()=>{O(!0),D(null);try{const e=localStorage.getItem("auth_token");if(!e)return D({type:"error",text:"No authentication token found. Please log in again."}),void O(!1);const t=await fetch(`/api/notification-settings/${V}/${X}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(I)}),i=await t.json();t.ok?D({type:"success",text:"Settings saved successfully"}):D({type:"error",text:i.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),D({type:"error",text:"An error occurred while saving settings"})}finally{O(!1)}},disabled:$,children:$?"Saving...":"Save Settings"}),(0,l.jsx)(A,{onClick:()=>{Y(""),R(!0)},children:"Send Test Email"})]}),G&&(0,l.jsx)(F,{type:G.type,children:G.text})]})]}),"sms"===i&&(0,l.jsx)(h,{children:(0,l.jsx)(v,{children:"SMS notifications are coming soon. Stay tuned for updates!"})}),"whatsapp"===i&&(0,l.jsx)(h,{children:(0,l.jsx)(v,{children:"WhatsApp notifications are coming soon. Stay tuned for updates!"})})]})]}),L&&(0,l.jsx)(_,{onClick:()=>R(!1),children:(0,l.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(E,{children:"Send Test Email"}),(0,l.jsx)(B,{children:"Enter the email address where you want to receive the test email."}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Email Address"}),(0,l.jsx)(b,{type:"email",placeholder:"test@example.com",value:W,onChange:e=>Y(e.target.value),autoFocus:!0})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)(z,{onClick:()=>R(!1),children:"Cancel"}),(0,l.jsx)(S,{onClick:async()=>{if(W){U(!0);try{const e=await fetch(`/api/notification-settings/${V}/${X}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:W})}),t=await e.json();R(!1),e.ok?Q({success:!0,text:"Test email sent successfully!"}):Q({success:!1,text:t.error||"Failed to send test email"}),q(!0)}catch(e){R(!1),Q({success:!1,text:"An error occurred while sending test email"}),q(!0)}finally{U(!1)}}},disabled:J||!W,children:J?"Sending...":"Send"})]})]})}),K&&(0,l.jsx)(_,{onClick:()=>q(!1),children:(0,l.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(E,{children:H.success?"Success":"Error"}),(0,l.jsx)(B,{children:H.text}),(0,l.jsx)(T,{children:(0,l.jsx)(S,{onClick:()=>q(!1),children:"OK"})})]})})]})}}}]);