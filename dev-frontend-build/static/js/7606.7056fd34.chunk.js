"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7606],{2597:(e,t,r)=>{r.d(t,{Ex:()=>d,oz:()=>c,tU:()=>l});r(9950);var o=r(4752),i=r(4414);const n=o.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:o}=e;return(0,i.jsx)(n,{className:r,style:o,children:t})},c=e=>{let{active:t,onClick:r,children:o,className:n}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:n,children:o})},d=e=>{let{count:t,variant:r="default",showZero:o=!1}=e;return 0!==t||o?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>n});var o=r(9950),i=r(4492);function n(e){const[t,r]=(0,i.ok)(),n=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,o.useState)(n());return[a,(0,o.useCallback)(e=>{s(e),r({tab:e})},[r])]}},7606:(e,t,r)=>{r.r(t),r.d(t,{default:()=>R});var o=r(9950),i=r(4752),n=r(8409),a=r(4492),s=r(2597),l=r(2653),c=r(1367),d=r(4414);const p=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,x=i.Ay.div`
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
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,u=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,m=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,f=i.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,y=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,b=i.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,j=i.Ay.input`
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
`,w=i.Ay.input`
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
`,v=i.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,F=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,_=i.Ay.button`
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
`,A=i.Ay.button`
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
`,S=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,C=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,B=i.Ay.button`
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
`,E=i.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,T=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,z=i.Ay.div`
  flex: 1;
  min-width: 0;
`,N=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`,I=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
`,$=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`,P=i.Ay.span`
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
`,M=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,O=i.Ay.div`
  margin-top: 28px;
`,D=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,U=i.Ay.div`
  background: #F0F4FF;
  border: 1px solid #D6E0FF;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #425466;
  line-height: 1.5;
`,G=(i.Ay.span`
  font-size: 18px;
  flex-shrink: 0;
`,i.Ay.div`
  flex: 1;
`),L=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,J=i.Ay.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`,R=()=>{const{user:e}=(0,c.As)(),{restaurantId:t}=(0,a.g)(),[r,i]=(0,l.M)("preferences"),[R,Y]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[K,W]=(0,o.useState)({}),[Z,q]=(0,o.useState)([]),[H,Q]=(0,o.useState)(!1),[V,X]=(0,o.useState)(!1),[ee,te]=(0,o.useState)(!1),[re,oe]=(0,o.useState)(!1),[ie,ne]=(0,o.useState)(null),[ae,se]=(0,o.useState)(null),[le,ce]=(0,o.useState)(!1),[de,pe]=(0,o.useState)(""),[xe,he]=(0,o.useState)(!1),[ue,me]=(0,o.useState)(!1),[ge,fe]=(0,o.useState)({success:!1,text:""}),ye=(0,o.useCallback)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]),{entityType:be,entityId:je}=(0,o.useMemo)(()=>ye(),[ye]),we=(0,o.useCallback)(async()=>{te(!0);try{const e=await fetch(`/api/notification-settings/${be}/${je}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();Y({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{te(!1)}},[be,je]),ke=(0,o.useCallback)(async()=>{Q(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(W(t.data.preferences||{}),q(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{Q(!1)}},[]);(0,o.useEffect)(()=>{e&&(ke(),we())},[e,ke,we]);const ve=(0,o.useMemo)(()=>{const e={};return Z.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[Z]);if(!e)return null;return ee&&H?(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:(0,d.jsx)(h,{children:"Notification Settings"})}),(0,d.jsx)(u,{children:(0,d.jsx)(m,{children:"Loading..."})})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:(0,d.jsx)(h,{children:"Notification Settings"})}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(s.tU,{children:[(0,d.jsx)(s.oz,{active:"preferences"===r,onClick:()=>i("preferences"),children:"Notification Preferences"}),(0,d.jsx)(s.oz,{active:"email"===r,onClick:()=>i("email"),children:"Email Setup"})]}),"preferences"===r&&(0,d.jsxs)(m,{children:[(0,d.jsx)(D,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),(null===e||void 0===e?void 0:e.email)&&(0,d.jsx)(U,{children:(0,d.jsxs)(G,{children:["Notifications will be sent to ",(0,d.jsx)(L,{children:e.email}),(0,d.jsx)("br",{}),"To change your email, go to ",(0,d.jsx)(J,{href:"/pos/profile",children:"Profile Settings"}),"."]})}),H?(0,d.jsx)(D,{children:"Loading preferences..."}):0===Z.length?(0,d.jsx)(D,{children:"No notification categories available for your role."}):(0,d.jsxs)(d.Fragment,{children:[Object.entries(ve).map((e,t)=>{let[r,i]=e;return(0,d.jsxs)(o.Fragment,{children:[t>0&&(0,d.jsx)(O,{}),(0,d.jsx)(E,{children:r}),i.map(e=>(0,d.jsxs)(T,{children:[(0,d.jsxs)(z,{children:[(0,d.jsx)(N,{children:e.label}),(0,d.jsx)(I,{children:e.description})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{type:"checkbox",checked:!1!==K[e.key],onChange:()=>{return t=e.key,void W(e=>({...e,[t]:!e[t]}));var t}}),(0,d.jsx)(P,{checked:!1!==K[e.key]})]})]},e.key))]},r)}),(0,d.jsx)(F,{children:(0,d.jsx)(_,{onClick:async()=>{X(!0),se(null);try{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({preferences:K})}),t=await e.json();e.ok&&t.success?se({type:"success",text:"Notification preferences saved"}):se({type:"error",text:t.message||"Failed to save preferences"})}catch(e){console.error("Prefs save error:",e),se({type:"error",text:"An error occurred while saving preferences"})}finally{X(!1)}},disabled:V,children:V?"Saving...":"Save Preferences"})}),ae&&(0,d.jsx)(S,{type:ae.type,children:ae.text})]})]}),"email"===r&&(0,d.jsxs)(m,{children:[(0,d.jsx)(D,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,d.jsxs)(k,{children:[(0,d.jsx)(w,{type:"checkbox",checked:R.email_enabled,onChange:e=>Y({...R,email_enabled:e.target.checked})}),"Enable Custom Email (SMTP)"]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["SMTP Server",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"text",placeholder:"smtp.gmail.com",value:R.smtp_host,onChange:e=>Y({...R,smtp_host:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["SMTP Port",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"number",placeholder:"587",value:R.smtp_port,onChange:e=>Y({...R,smtp_port:parseInt(e.target.value)}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["SMTP Username",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"email",placeholder:"your-email@gmail.com",value:R.smtp_user,onChange:e=>Y({...R,smtp_user:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Your full email address"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["SMTP Password",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:R.smtp_password,onChange:e=>Y({...R,smtp_password:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["From Email",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"email",placeholder:"noreply@yourstore.com",value:R.from_email,onChange:e=>Y({...R,from_email:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(y,{children:["From Name",(0,d.jsx)(b,{children:"*"})]}),(0,d.jsx)(j,{type:"text",placeholder:"Your Store Name",value:R.from_name,onChange:e=>Y({...R,from_name:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)(y,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(j,{type:"email",placeholder:"support@yourstore.com",value:R.reply_to_email,onChange:e=>Y({...R,reply_to_email:e.target.value}),disabled:!R.email_enabled}),(0,d.jsx)(v,{children:"Where replies should be sent"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(_,{onClick:async()=>{oe(!0),ne(null);try{const e=localStorage.getItem("auth_token");if(!e)return ne({type:"error",text:"No authentication token found. Please log in again."}),void oe(!1);const t=await fetch(`/api/notification-settings/${be}/${je}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(R)}),r=await t.json();t.ok?ne({type:"success",text:"Email settings saved successfully"}):ne({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),ne({type:"error",text:"An error occurred while saving settings"})}finally{oe(!1)}},disabled:re,children:re?"Saving...":"Save Settings"}),R.email_enabled&&(0,d.jsx)(A,{onClick:()=>{pe(""),ce(!0)},children:"Send Test Email"})]}),ie&&(0,d.jsx)(S,{type:ie.type,children:ie.text})]})]})]}),le&&(0,d.jsxs)(n.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Send Test Email",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(B,{onClick:()=>ce(!1),children:"Cancel"}),(0,d.jsx)(_,{onClick:async()=>{if(de){he(!0);try{const e=await fetch(`/api/notification-settings/${be}/${je}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:de})}),t=await e.json();ce(!1),e.ok?fe({success:!0,text:"Test email sent successfully!"}):fe({success:!1,text:t.error||"Failed to send test email"}),me(!0)}catch(e){ce(!1),fe({success:!1,text:"An error occurred while sending test email"}),me(!0)}finally{he(!1)}}},disabled:xe||!de,children:xe?"Sending...":"Send"})]}),children:[(0,d.jsx)(C,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(f,{children:[(0,d.jsx)(y,{children:"Email Address"}),(0,d.jsx)(j,{type:"email",placeholder:"test@example.com",value:de,onChange:e=>pe(e.target.value),autoFocus:!0})]})]}),ue&&(0,d.jsx)(n.aF,{isOpen:!0,onClose:()=>me(!1),title:ge.success?"Success":"Error",footer:(0,d.jsx)(_,{onClick:()=>me(!1),children:"OK"}),children:(0,d.jsx)(C,{children:ge.text})})]})}}}]);