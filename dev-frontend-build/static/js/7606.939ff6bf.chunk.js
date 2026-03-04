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
`,l=e=>{let{children:t,className:r,style:o}=e;return(0,i.jsx)(n,{className:r,style:o,children:t})},d=e=>{let{active:t,onClick:r,children:o,className:n}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:n,children:o})},c=e=>{let{count:t,variant:r="default",showZero:o=!1}=e;return 0!==t||o?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>n});var o=r(9950),i=r(4492);function n(e){const[t,r]=(0,i.ok)(),n=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,o.useState)(n());return[a,(0,o.useCallback)(e=>{s(e),r({tab:e})},[r])]}},7606:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var o=r(9950),i=r(4752),n=r(4492),a=r(2597),s=r(2653),l=r(1367),d=r(4414);const c=i.Ay.div`
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
`,w=i.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,k=i.Ay.small`
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
`,_=i.Ay.div`
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
`,P=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,I=i.Ay.div`
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
`,J=i.Ay.div`
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
`,R=i.Ay.span`
  font-size: 18px;
  flex-shrink: 0;
`,Y=i.Ay.div`
  flex: 1;
`,K=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,W=i.Ay.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`,Z=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,n.g)(),[r,i]=(0,s.M)("preferences"),[Z,q]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[H,Q]=(0,o.useState)({}),[V,X]=(0,o.useState)([]),[ee,te]=(0,o.useState)(!1),[re,oe]=(0,o.useState)(!1),[ie,ne]=(0,o.useState)(!1),[ae,se]=(0,o.useState)(!1),[le,de]=(0,o.useState)(null),[ce,pe]=(0,o.useState)(null),[xe,he]=(0,o.useState)(!1),[ue,me]=(0,o.useState)(""),[ge,fe]=(0,o.useState)(!1),[ye,be]=(0,o.useState)(!1),[je,we]=(0,o.useState)({success:!1,text:""}),ke=(0,o.useCallback)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]),{entityType:ve,entityId:Fe}=(0,o.useMemo)(()=>ke(),[ke]),Ae=(0,o.useCallback)(async()=>{ne(!0);try{const e=await fetch(`/api/notification-settings/${ve}/${Fe}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();q({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{ne(!1)}},[ve,Fe]),_e=(0,o.useCallback)(async()=>{te(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(Q(t.data.preferences||{}),X(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{te(!1)}},[]);(0,o.useEffect)(()=>{e&&(_e(),Ae())},[e,_e,Ae]);const Se=(0,o.useMemo)(()=>{const e={};return V.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[V]);if(!e)return null;return ie&&ee?(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsx)(h,{children:(0,d.jsx)(u,{children:"Loading..."})})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(x,{children:"Notification Settings"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(a.tU,{children:[(0,d.jsx)(a.oz,{active:"preferences"===r,onClick:()=>i("preferences"),children:"Notification Preferences"}),(0,d.jsx)(a.oz,{active:"email"===r,onClick:()=>i("email"),children:"Email Setup"})]}),"preferences"===r&&(0,d.jsxs)(u,{children:[(0,d.jsx)(L,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),(null===e||void 0===e?void 0:e.email)&&(0,d.jsxs)(J,{children:[(0,d.jsx)(R,{children:"\u2709"}),(0,d.jsxs)(Y,{children:["Notifications will be sent to ",(0,d.jsx)(K,{children:e.email}),(0,d.jsx)("br",{}),"To change your email, go to ",(0,d.jsx)(W,{href:"/pos/profile",children:"Profile Settings"}),"."]})]}),ee?(0,d.jsx)(L,{children:"Loading preferences..."}):0===V.length?(0,d.jsx)(L,{children:"No notification categories available for your role."}):(0,d.jsxs)(d.Fragment,{children:[Object.entries(Se).map((e,t)=>{let[r,i]=e;return(0,d.jsxs)(o.Fragment,{children:[t>0&&(0,d.jsx)(G,{}),(0,d.jsx)(N,{children:r}),i.map(e=>(0,d.jsxs)(P,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:e.label}),(0,d.jsx)(M,{children:e.description})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(U,{type:"checkbox",checked:!1!==H[e.key],onChange:()=>{return t=e.key,void Q(e=>({...e,[t]:!e[t]}));var t}}),(0,d.jsx)(D,{checked:!1!==H[e.key]})]})]},e.key))]},r)}),(0,d.jsx)(v,{children:(0,d.jsx)(F,{onClick:async()=>{oe(!0),pe(null);try{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({preferences:H})}),t=await e.json();e.ok&&t.success?pe({type:"success",text:"Notification preferences saved"}):pe({type:"error",text:t.message||"Failed to save preferences"})}catch(e){console.error("Prefs save error:",e),pe({type:"error",text:"An error occurred while saving preferences"})}finally{oe(!1)}},disabled:re,children:re?"Saving...":"Save Preferences"})}),ce&&(0,d.jsx)(_,{type:ce.type,children:ce.text})]})]}),"email"===r&&(0,d.jsxs)(u,{children:[(0,d.jsx)(L,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,d.jsxs)(w,{children:[(0,d.jsx)(j,{type:"checkbox",checked:Z.email_enabled,onChange:e=>q({...Z,email_enabled:e.target.checked})}),"Enable Custom Email (SMTP)"]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Server",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"smtp.gmail.com",value:Z.smtp_host,onChange:e=>q({...Z,smtp_host:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Port",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"number",placeholder:"587",value:Z.smtp_port,onChange:e=>q({...Z,smtp_port:parseInt(e.target.value)}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Username",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"your-email@gmail.com",value:Z.smtp_user,onChange:e=>q({...Z,smtp_user:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Your full email address"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["SMTP Password",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:Z.smtp_password,onChange:e=>q({...Z,smtp_password:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["From Email",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"email",placeholder:"noreply@yourstore.com",value:Z.from_email,onChange:e=>q({...Z,from_email:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Email address shown to recipients"})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(f,{children:["From Name",(0,d.jsx)(y,{children:"*"})]}),(0,d.jsx)(b,{type:"text",placeholder:"Your Store Name",value:Z.from_name,onChange:e=>q({...Z,from_name:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Display name shown to recipients"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(f,{children:"Reply-To Email (Optional)"}),(0,d.jsx)(b,{type:"email",placeholder:"support@yourstore.com",value:Z.reply_to_email,onChange:e=>q({...Z,reply_to_email:e.target.value}),disabled:!Z.email_enabled}),(0,d.jsx)(k,{children:"Where replies should be sent"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(F,{onClick:async()=>{se(!0),de(null);try{const e=localStorage.getItem("auth_token");if(!e)return de({type:"error",text:"No authentication token found. Please log in again."}),void se(!1);const t=await fetch(`/api/notification-settings/${ve}/${Fe}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(Z)}),r=await t.json();t.ok?de({type:"success",text:"Email settings saved successfully"}):de({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),de({type:"error",text:"An error occurred while saving settings"})}finally{se(!1)}},disabled:ae,children:ae?"Saving...":"Save Settings"}),Z.email_enabled&&(0,d.jsx)(A,{onClick:()=>{me(""),he(!0)},children:"Send Test Email"})]}),le&&(0,d.jsx)(_,{type:le.type,children:le.text})]})]})]}),xe&&(0,d.jsx)(S,{onClick:()=>he(!1),children:(0,d.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:"Send Test Email"}),(0,d.jsx)(E,{children:"Enter the email address where you want to receive the test email."}),(0,d.jsxs)(g,{children:[(0,d.jsx)(f,{children:"Email Address"}),(0,d.jsx)(b,{type:"email",placeholder:"test@example.com",value:ue,onChange:e=>me(e.target.value),autoFocus:!0})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(T,{onClick:()=>he(!1),children:"Cancel"}),(0,d.jsx)(F,{onClick:async()=>{if(ue){fe(!0);try{const e=await fetch(`/api/notification-settings/${ve}/${Fe}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:ue})}),t=await e.json();he(!1),e.ok?we({success:!0,text:"Test email sent successfully!"}):we({success:!1,text:t.error||"Failed to send test email"}),be(!0)}catch(e){he(!1),we({success:!1,text:"An error occurred while sending test email"}),be(!0)}finally{fe(!1)}}},disabled:ge||!ue,children:ge?"Sending...":"Send"})]})]})}),ye&&(0,d.jsx)(S,{onClick:()=>be(!1),children:(0,d.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(B,{children:je.success?"Success":"Error"}),(0,d.jsx)(E,{children:je.text}),(0,d.jsx)(z,{children:(0,d.jsx)(F,{onClick:()=>be(!1),children:"OK"})})]})})]})}}}]);