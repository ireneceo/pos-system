"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{7606:(e,t,i)=>{i.r(t),i.d(t,{default:()=>N});var n=i(9950),s=i(4752),r=i(4492),a=i(3310),o=i(7492),l=i(1367),d=i(4414);const c=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=s.Ay.div`
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
`,x=s.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=s.Ay.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,u=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=s.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,y=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,b=s.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,j=s.Ay.input`
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
`,f=s.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,w=s.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,A=s.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,k=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,S=s.Ay.button`
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
`,v=s.Ay.button`
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
`,F=s.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,_=s.Ay.div`
  padding: 40px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,C=s.Ay.div`
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
`,E=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,B=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,T=s.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,z=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`,I=s.Ay.button`
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
`,N=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,r.g)(),[i,s]=(0,n.useState)("email"),[N,P]=(0,n.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:"",sms_enabled:!1,whatsapp_enabled:!1}),[$,M]=(0,n.useState)(!1),[O,D]=(0,n.useState)(!1),[G,L]=(0,n.useState)(null),[R,W]=(0,n.useState)(!1),[Y,J]=(0,n.useState)(""),[U,K]=(0,n.useState)(!1),[q,H]=(0,n.useState)(!1),[Q,V]=(0,n.useState)({success:!1,text:""}),{entityType:X,entityId:Z}=(()=>{var i,n;return t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:null!==(i=e.role)&&void 0!==i&&i.includes("Manager")||null!==(n=e.role)&&void 0!==n&&n.includes("General")?{entityType:"manager",entityId:Number(e.id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1}})();if((0,n.useEffect)(()=>{e&&ee()},[X,Z,e,t]),!e)return null;const ee=async()=>{M(!0);try{const e=await fetch(`/api/notification-settings/${X}/${Z}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(e.ok){const t=await e.json();P(t)}}catch(e){console.error("Failed to load settings:",e)}finally{M(!1)}};return $?(0,d.jsx)(a.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsx)(h,{children:(0,d.jsx)(m,{children:"Loading..."})})]})}):(0,d.jsxs)(a.A,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"email"===i,onClick:()=>s("email"),children:"Email"}),(0,d.jsx)(o.oz,{active:"sms"===i,onClick:()=>s("sms"),children:"SMS"}),(0,d.jsx)(o.oz,{active:"whatsapp"===i,onClick:()=>s("whatsapp"),children:"WhatsApp"})]}),"email"===i&&(0,d.jsxs)(m,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(f,{type:"checkbox",checked:N.email_enabled,onChange:e=>P({...N,email_enabled:e.target.checked})}),"Enable Email Notifications"]}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["SMTP Server",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"text",placeholder:"smtp.gmail.com",value:N.smtp_host,onChange:e=>P({...N,smtp_host:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["SMTP Port",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"number",placeholder:"587",value:N.smtp_port,onChange:e=>P({...N,smtp_port:parseInt(e.target.value)}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["SMTP Username",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"email",placeholder:"your-email@gmail.com",value:N.smtp_user,onChange:e=>P({...N,smtp_user:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Your full email address"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["SMTP Password",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:N.smtp_password,onChange:e=>P({...N,smtp_password:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["From Email",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"email",placeholder:"noreply@yourstore.com",value:N.from_email,onChange:e=>P({...N,from_email:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:["From Name",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"text",placeholder:"Your Store Name",value:N.from_name,onChange:e=>P({...N,from_name:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(y,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(j,{type:"email",placeholder:"support@yourstore.com",value:N.reply_to_email,onChange:e=>P({...N,reply_to_email:e.target.value}),disabled:!N.email_enabled}),(0,d.jsx)(A,{children:"Where replies should be sent"})]}),N.email_enabled&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(S,{onClick:async()=>{D(!0),L(null);try{(await fetch(`/api/notification-settings/${X}/${Z}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(N)})).ok?L({type:"success",text:"Settings saved successfully"}):L({type:"error",text:"Failed to save settings"})}catch(e){L({type:"error",text:"An error occurred while saving settings"})}finally{D(!1)}},disabled:O,children:O?"Saving...":"Save Settings"}),(0,d.jsx)(v,{onClick:()=>{J(""),W(!0)},children:"Send Test Email"})]}),G&&(0,d.jsx)(F,{type:G.type,children:G.text})]})]}),"sms"===i&&(0,d.jsx)(m,{children:(0,d.jsx)(_,{children:"SMS notifications are coming soon. Stay tuned for updates!"})}),"whatsapp"===i&&(0,d.jsx)(m,{children:(0,d.jsx)(_,{children:"WhatsApp notifications are coming soon. Stay tuned for updates!"})})]})]}),R&&(0,d.jsx)(C,{onClick:()=>W(!1),children:(0,d.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:"Send Test Email"}),(0,d.jsx)(T,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(g,{children:[(0,d.jsx)(y,{children:"Email Address"}),(0,d.jsx)(j,{type:"email",placeholder:"test@example.com",value:Y,onChange:e=>J(e.target.value),autoFocus:!0})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(I,{onClick:()=>W(!1),children:"Cancel"}),(0,d.jsx)(S,{onClick:async()=>{if(Y){K(!0);try{const e=await fetch(`/api/notification-settings/${X}/${Z}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({testEmail:Y})}),t=await e.json();W(!1),e.ok?V({success:!0,text:"Test email sent successfully!"}):V({success:!1,text:t.error||"Failed to send test email"}),H(!0)}catch(e){W(!1),V({success:!1,text:"An error occurred while sending test email"}),H(!0)}finally{K(!1)}}},disabled:U||!Y,children:U?"Sending...":"Send"})]})]})}),q&&(0,d.jsx)(C,{onClick:()=>H(!1),children:(0,d.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:Q.success?"Success":"Error"}),(0,d.jsx)(T,{children:Q.text}),(0,d.jsx)(z,{children:(0,d.jsx)(S,{onClick:()=>H(!1),children:"OK"})})]})})]})}}}]);