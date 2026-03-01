"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{7606:(e,t,r)=>{r.r(t),r.d(t,{default:()=>F});var o=r(8819),s=r(9950),i=r(4752),a=r(4492),n=r(2674),l=r(1367),d=r(4414);const c=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: ${o.w.colors.background};
  min-height: 100vh;
`,p=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${o.w.colors.border};
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
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${o.w.colors.secondary};
`,h=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,m=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${o.w.colors.border};
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${o.w.colors.text.secondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,y=i.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,b=i.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${o.w.colors.secondary};
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }

  &:hover {
    border-color: #C7D2FE;
  }

  &:disabled {
    background: ${o.w.colors.backgroundAlt};
    color: ${o.w.colors.text.light};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${o.w.colors.text.placeholder};
  }
`,j=i.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,f=i.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${o.w.colors.secondary};
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,w=i.Ay.small`
  display: block;
  font-size: 12px;
  color: ${o.w.colors.text.muted};
  margin-top: 4px;
`,k=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,S=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: ${o.w.colors.primary};
  color: white;

  &:hover {
    background: ${o.w.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${o.w.colors.primary};
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`,v=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: ${o.w.colors.primary};
  border: 1px solid ${o.w.colors.primary};

  &:hover {
    background: #F0F4FF;
  }
`,_=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":`\n    background: ${o.w.colors.status.errorLightAlt};\n    color: #991B1B;\n  `}
`,$=i.Ay.div`
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  color: ${o.w.colors.text.muted};
  font-size: 14px;
  text-align: center;
`,A=i.Ay.p`
  font-size: 14px;
  color: ${o.w.colors.text.secondary};
  margin: 0 0 16px 0;
`,C=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`,E=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: ${o.w.colors.surfaceMuted};
  color: ${o.w.colors.text.dark};
  border: none;
  transition: all 0.15s;

  &:hover {
    background: ${o.w.colors.borderLight};
  }
`,F=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,a.g)(),[r,o]=(0,s.useState)("email"),[i,F]=(0,s.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:"",sms_enabled:!1,whatsapp_enabled:!1}),[T,z]=(0,s.useState)(!1),[I,N]=(0,s.useState)(!1),[M,P]=(0,s.useState)(null),[B,O]=(0,s.useState)(!1),[L,G]=(0,s.useState)(""),[D,H]=(0,s.useState)(!1),[R,W]=(0,s.useState)(!1),[Y,J]=(0,s.useState)({success:!1,text:""}),{entityType:U,entityId:K}=(0,s.useMemo)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]);if((0,s.useEffect)(()=>{e&&q()},[U,K]),!e)return null;const q=async()=>{z(!0);try{const e=await fetch(`/api/notification-settings/${U}/${K}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();F(t)}}catch(e){console.error("Failed to load settings:",e)}finally{z(!1)}};return T?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsx)(h,{children:(0,d.jsx)(m,{children:"Loading..."})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(n.j,{children:[(0,d.jsx)(n.oz,{active:"email"===r,onClick:()=>o("email"),children:"Email"}),(0,d.jsx)(n.oz,{active:"sms"===r,onClick:()=>o("sms"),children:"SMS"}),(0,d.jsx)(n.oz,{active:"whatsapp"===r,onClick:()=>o("whatsapp"),children:"WhatsApp"})]}),"email"===r&&(0,d.jsxs)(m,{children:[(0,d.jsxs)(f,{children:[(0,d.jsx)(j,{type:"checkbox",checked:i.email_enabled,onChange:e=>F({...i,email_enabled:e.target.checked})}),"Enable Email Notifications"]}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["SMTP Server",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"smtp.gmail.com",value:i.smtp_host,onChange:e=>F({...i,smtp_host:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["SMTP Port",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"number",placeholder:"587",value:i.smtp_port,onChange:e=>F({...i,smtp_port:parseInt(e.target.value)}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["SMTP Username",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"your-email@gmail.com",value:i.smtp_user,onChange:e=>F({...i,smtp_user:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Your full email address"})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["SMTP Password",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:i.smtp_password,onChange:e=>F({...i,smtp_password:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["From Email",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"noreply@yourstore.com",value:i.from_email,onChange:e=>F({...i,from_email:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsxs)(g,{children:["From Name",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"Your Store Name",value:i.from_name,onChange:e=>F({...i,from_name:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(n.gE,{children:[(0,d.jsx)(g,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(b,{type:"email",placeholder:"support@yourstore.com",value:i.reply_to_email,onChange:e=>F({...i,reply_to_email:e.target.value}),disabled:!i.email_enabled}),(0,d.jsx)(w,{children:"Where replies should be sent"})]}),i.email_enabled&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(S,{onClick:async()=>{N(!0),P(null);try{const e=localStorage.getItem("auth_token");if(!e)return P({type:"error",text:"No authentication token found. Please log in again."}),void N(!1);const t=await fetch(`/api/notification-settings/${U}/${K}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(i)}),r=await t.json();t.ok?P({type:"success",text:"Settings saved successfully"}):P({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),P({type:"error",text:"An error occurred while saving settings"})}finally{N(!1)}},disabled:I,children:I?"Saving...":"Save Settings"}),(0,d.jsx)(v,{onClick:()=>{G(""),O(!0)},children:"Send Test Email"})]}),M&&(0,d.jsx)(_,{type:M.type,children:M.text})]})]}),"sms"===r&&(0,d.jsx)(m,{children:(0,d.jsx)($,{children:"SMS notifications are coming soon. Stay tuned for updates!"})}),"whatsapp"===r&&(0,d.jsx)(m,{children:(0,d.jsx)($,{children:"WhatsApp notifications are coming soon. Stay tuned for updates!"})})]})]}),B&&(0,d.jsx)(n.mH,{onClick:()=>O(!1),children:(0,d.jsxs)(n.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(n.wt,{children:"Send Test Email"}),(0,d.jsx)(A,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(n.gE,{children:[(0,d.jsx)(g,{children:"Email Address"}),(0,d.jsx)(b,{type:"email",placeholder:"test@example.com",value:L,onChange:e=>G(e.target.value),autoFocus:!0})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(E,{onClick:()=>O(!1),children:"Cancel"}),(0,d.jsx)(S,{onClick:async()=>{if(L){H(!0);try{const e=await fetch(`/api/notification-settings/${U}/${K}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:L})}),t=await e.json();O(!1),e.ok?J({success:!0,text:"Test email sent successfully!"}):J({success:!1,text:t.error||"Failed to send test email"}),W(!0)}catch(e){O(!1),J({success:!1,text:"An error occurred while sending test email"}),W(!0)}finally{H(!1)}}},disabled:D||!L,children:D?"Sending...":"Send"})]})]})}),R&&(0,d.jsx)(n.mH,{onClick:()=>W(!1),children:(0,d.jsxs)(n.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(n.wt,{children:Y.success?"Success":"Error"}),(0,d.jsx)(A,{children:Y.text}),(0,d.jsx)(C,{children:(0,d.jsx)(S,{onClick:()=>W(!1),children:"OK"})})]})})]})}}}]);