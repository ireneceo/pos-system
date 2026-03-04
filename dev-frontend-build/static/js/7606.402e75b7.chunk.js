"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var o=r(4752),i=r(4414);const n=o.Ay.div`
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
`,a=o.Ay.button`
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
`,s=o.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:o}=e;return(0,i.jsx)(n,{className:r,style:o,children:t})},d=e=>{let{active:t,onClick:r,children:o,className:n}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:n,children:o})},c=e=>{let{count:t,variant:r="default",showZero:o=!1}=e;return 0!==t||o?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>n});var o=r(9950),i=r(4492);function n(e){const[t,r]=(0,i.ok)(),n=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,o.useState)(n());return[a,(0,o.useCallback)(e=>{s(e),r({tab:e})},[r])]}},7606:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var o=r(9950),i=r(4752),n=r(4492),a=r(2597),s=r(2653),l=r(1367),d=r(4414);const c=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=i.Ay.div`
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
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=i.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,f=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,y=i.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,b=i.Ay.input`
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
`,j=i.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,k=i.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,w=i.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,v=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,F=i.Ay.button`
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
`,_=i.Ay.button`
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
`,A=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,S=i.Ay.div`
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
`,C=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,B=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,E=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,z=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`,T=i.Ay.button`
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
`,N=i.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,I=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,P=i.Ay.div`
  flex: 1;
  min-width: 0;
`,$=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`,M=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
`,O=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`,D=i.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${e=>e.checked?"#635BFF":"#D1D5DB"};
  border-radius: 24px;
  transition: 0.2s;

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: ${e=>e.checked?"23px":"3px"};
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`,U=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,G=i.Ay.div`
  margin-top: 28px;
`,L=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,J=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,n.g)(),[r,i]=(0,s.M)("preferences"),[J,R]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[Y,K]=(0,o.useState)({}),[W,Z]=(0,o.useState)([]),[q,H]=(0,o.useState)(!1),[Q,V]=(0,o.useState)(!1),[X,ee]=(0,o.useState)(!1),[te,re]=(0,o.useState)(!1),[oe,ie]=(0,o.useState)(null),[ne,ae]=(0,o.useState)(null),[se,le]=(0,o.useState)(!1),[de,ce]=(0,o.useState)(""),[pe,xe]=(0,o.useState)(!1),[he,ue]=(0,o.useState)(!1),[me,ge]=(0,o.useState)({success:!1,text:""}),fe=(0,o.useCallback)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]),{entityType:ye,entityId:be}=(0,o.useMemo)(()=>fe(),[fe]),je=(0,o.useCallback)(async()=>{ee(!0);try{const e=await fetch(`/api/notification-settings/${ye}/${be}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();R({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{ee(!1)}},[ye,be]),ke=(0,o.useCallback)(async()=>{H(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(K(t.data.preferences||{}),Z(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{H(!1)}},[]);(0,o.useEffect)(()=>{e&&(ke(),je())},[e,ke,je]);const we=(0,o.useMemo)(()=>{const e={};return W.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[W]);if(!e)return null;return X&&q?(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsx)(h,{children:(0,d.jsx)(u,{children:"Loading..."})})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(a.tU,{children:[(0,d.jsx)(a.oz,{active:"preferences"===r,onClick:()=>i("preferences"),children:"Notification Preferences"}),(0,d.jsx)(a.oz,{active:"email"===r,onClick:()=>i("email"),children:"Email Setup"})]}),"preferences"===r&&(0,d.jsxs)(u,{children:[(0,d.jsx)(L,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),q?(0,d.jsx)(L,{children:"Loading preferences..."}):0===W.length?(0,d.jsx)(L,{children:"No notification categories available for your role."}):(0,d.jsxs)(d.Fragment,{children:[Object.entries(we).map((e,t)=>{let[r,i]=e;return(0,d.jsxs)(o.Fragment,{children:[t>0&&(0,d.jsx)(G,{}),(0,d.jsx)(N,{children:r}),i.map(e=>(0,d.jsxs)(I,{children:[(0,d.jsxs)(P,{children:[(0,d.jsx)($,{children:e.label}),(0,d.jsx)(M,{children:e.description})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(U,{type:"checkbox",checked:!1!==Y[e.key],onChange:()=>{return t=e.key,void K(e=>({...e,[t]:!e[t]}));var t}}),(0,d.jsx)(D,{checked:!1!==Y[e.key]})]})]},e.key))]},r)}),(0,d.jsx)(v,{children:(0,d.jsx)(F,{onClick:async()=>{V(!0),ae(null);try{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({preferences:Y})}),t=await e.json();e.ok&&t.success?ae({type:"success",text:"Notification preferences saved"}):ae({type:"error",text:t.message||"Failed to save preferences"})}catch(e){console.error("Prefs save error:",e),ae({type:"error",text:"An error occurred while saving preferences"})}finally{V(!1)}},disabled:Q,children:Q?"Saving...":"Save Preferences"})}),ne&&(0,d.jsx)(A,{type:ne.type,children:ne.text})]})]}),"email"===r&&(0,d.jsxs)(u,{children:[(0,d.jsx)(L,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,d.jsxs)(k,{children:[(0,d.jsx)(j,{type:"checkbox",checked:J.email_enabled,onChange:e=>R({...J,email_enabled:e.target.checked})}),"Enable Custom Email (SMTP)"]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Server",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"smtp.gmail.com",value:J.smtp_host,onChange:e=>R({...J,smtp_host:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Port",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"number",placeholder:"587",value:J.smtp_port,onChange:e=>R({...J,smtp_port:parseInt(e.target.value)}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Username",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"your-email@gmail.com",value:J.smtp_user,onChange:e=>R({...J,smtp_user:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Your full email address"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Password",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:J.smtp_password,onChange:e=>R({...J,smtp_password:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["From Email",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"noreply@yourstore.com",value:J.from_email,onChange:e=>R({...J,from_email:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["From Name",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"Your Store Name",value:J.from_name,onChange:e=>R({...J,from_name:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(f,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(b,{type:"email",placeholder:"support@yourstore.com",value:J.reply_to_email,onChange:e=>R({...J,reply_to_email:e.target.value}),disabled:!J.email_enabled}),(0,d.jsx)(w,{children:"Where replies should be sent"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(F,{onClick:async()=>{re(!0),ie(null);try{const e=localStorage.getItem("auth_token");if(!e)return ie({type:"error",text:"No authentication token found. Please log in again."}),void re(!1);const t=await fetch(`/api/notification-settings/${ye}/${be}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(J)}),r=await t.json();t.ok?ie({type:"success",text:"Email settings saved successfully"}):ie({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),ie({type:"error",text:"An error occurred while saving settings"})}finally{re(!1)}},disabled:te,children:te?"Saving...":"Save Settings"}),J.email_enabled&&(0,d.jsx)(_,{onClick:()=>{ce(""),le(!0)},children:"Send Test Email"})]}),oe&&(0,d.jsx)(A,{type:oe.type,children:oe.text})]})]})]}),se&&(0,d.jsx)(S,{onClick:()=>le(!1),children:(0,d.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:"Send Test Email"}),(0,d.jsx)(E,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(g,{children:[(0,d.jsx)(f,{children:"Email Address"}),(0,d.jsx)(b,{type:"email",placeholder:"test@example.com",value:de,onChange:e=>ce(e.target.value),autoFocus:!0})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(T,{onClick:()=>le(!1),children:"Cancel"}),(0,d.jsx)(F,{onClick:async()=>{if(de){xe(!0);try{const e=await fetch(`/api/notification-settings/${ye}/${be}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:de})}),t=await e.json();le(!1),e.ok?ge({success:!0,text:"Test email sent successfully!"}):ge({success:!1,text:t.error||"Failed to send test email"}),ue(!0)}catch(e){le(!1),ge({success:!1,text:"An error occurred while sending test email"}),ue(!0)}finally{xe(!1)}}},disabled:pe||!de,children:pe?"Sending...":"Send"})]})]})}),he&&(0,d.jsx)(S,{onClick:()=>ue(!1),children:(0,d.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:me.success?"Success":"Error"}),(0,d.jsx)(E,{children:me.text}),(0,d.jsx)(z,{children:(0,d.jsx)(F,{onClick:()=>ue(!1),children:"OK"})})]})})]})}}}]);