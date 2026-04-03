"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>re});var i=r(9950),t=r(4752),o=r(2853),a=r(8409),s=r(6038),d=r(4414);const l=t.Ay.div`
  min-height: 100vh;
`,c=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,x=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,p=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,m=t.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,g=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,j=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,f=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=t.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=t.Ay.div`
  flex: 1;
  min-width: 0;
`,A=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
  font-family: monospace;
`,C=t.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,k=t.Ay.div`
  font-size: 14px;
  color: #635BFF;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=t.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#3B82F6";case"confirmed":return"#10B981";case"invoiced":return"#635BFF";case"cancelled":return"#6B7280";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#92400E";case"contacted":case"confirmed":case"invoiced":case"cancelled":return"#FFFFFF";default:return"#6B7280"}}};
`,E=t.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin: 8px 0;
`,S=t.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 8px 0;
`,z=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,_=t.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #635BFF;
`,T=t.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,q=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,$=t.Ay.div`
  font-size: 14px;
`,I=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,N=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,D=t.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,L=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,O=t.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,P=t.Ay.div`
  margin-bottom: 20px;
`,Q=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,R=t.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,H=t.Ay.select`
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
  }
`,J=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,W=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,M=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,Y=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,V=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,G=t.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F0F4FF;
  }

  &:last-child {
    border-bottom: none;
  }
`,K=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,X=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Z=t.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,ee=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,ne=t.Ay.div`
  flex: 1;
`,re=()=>{const[e,n]=(0,i.useState)([]),[r,t]=(0,i.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[re,ie]=(0,i.useState)(!0),[te,oe]=(0,i.useState)(""),[ae,se]=(0,i.useState)("all"),[de,le]=(0,i.useState)(!1),[ce,xe]=(0,i.useState)(null),[pe,he]=(0,i.useState)(""),[ue,me]=(0,i.useState)(""),[ge,je]=(0,i.useState)(!1),[fe,ve]=(0,i.useState)(!1),[ye,be]=(0,i.useState)(!1),[Fe,we]=(0,i.useState)(""),[Ae,Ce]=(0,i.useState)([]),[ke,Be]=(0,i.useState)(!1),[Ee,Se]=(0,i.useState)(!1),[ze,_e]=(0,i.useState)(""),[Te,qe]=(0,i.useState)("none"),[$e,Ie]=(0,i.useState)(""),[Ne,De]=(0,i.useState)([]),[Le,Oe]=(0,i.useState)(!1),Pe=()=>localStorage.getItem("auth_token"),Qe=(0,i.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||ie(!0);const r=Pe(),i=new URLSearchParams;"all"!==ae&&i.append("status",ae),te&&i.append("search",te);const[o,a]=await Promise.all([fetch(`/api/hardware-quotes?${i}`,{headers:{Authorization:`Bearer ${r}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${r}`}})]);if(o.ok){const e=await o.json();n(e.data||e)}if(a.ok){const e=await a.json();t(e.data||e)}}catch(r){console.error("Error loading hardware quotes:",r)}finally{ie(!1)}},[te,ae]);(0,i.useEffect)(()=>{Qe()},[Qe]),(0,i.useEffect)(()=>{const e=setInterval(()=>Qe(!0),1e4);return()=>clearInterval(e)},[Qe]);const Ue=async e=>{try{const n=Pe(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;xe(n),he(n.status),me(n.admin_notes||""),le(!0)}}catch(n){console.error("Error loading quote detail:",n)}},Re=()=>{we(""),Ce([]),be(!0)},He=(0,i.useCallback)(async e=>{if(e.length<2)Ce([]);else{Be(!0);try{const n=Pe(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];Ce(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{Be(!1)}}},[]);(0,i.useEffect)(()=>{const e=setTimeout(()=>{Fe&&He(Fe)},300);return()=>clearTimeout(e)},[Fe,He]);const Je=(e,n,r)=>{De(i=>i.map((i,t)=>t===e?{...i,[n]:r}:i))},We=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Me=e=>e.charAt(0).toUpperCase()+e.slice(1),Ye=(null===ce||void 0===ce?void 0:ce.currency)||"MYR";return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(x,{children:"Hardware Quotes"})}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(h,{children:[(0,d.jsxs)(u,{color:"#635BFF",children:[(0,d.jsx)(m,{children:r.total}),(0,d.jsx)(g,{children:"Total"})]}),(0,d.jsxs)(u,{color:"#F59E0B",children:[(0,d.jsx)(m,{children:r.new}),(0,d.jsx)(g,{children:"New"})]}),(0,d.jsxs)(u,{color:"#3B82F6",children:[(0,d.jsx)(m,{children:r.contacted}),(0,d.jsx)(g,{children:"Contacted"})]}),(0,d.jsxs)(u,{color:"#10B981",children:[(0,d.jsx)(m,{children:r.confirmed}),(0,d.jsx)(g,{children:"Confirmed"})]}),(0,d.jsxs)(u,{color:"#635BFF",children:[(0,d.jsx)(m,{children:r.invoiced}),(0,d.jsx)(g,{children:"Invoiced"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{value:ae,onChange:e=>se(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"new",children:"New"}),(0,d.jsx)("option",{value:"contacted",children:"Contacted"}),(0,d.jsx)("option",{value:"confirmed",children:"Confirmed"}),(0,d.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,d.jsx)(f,{placeholder:"Search by name, email, company, quote number...",value:te,onChange:e=>oe(e.target.value)})]}),re?(0,d.jsx)(o.pp,{children:"Loading..."}):0===e.length?(0,d.jsx)(o.pp,{children:"No hardware quotes found"}):(0,d.jsx)(y,{children:e.map(e=>(0,d.jsxs)(b,{onClick:()=>Ue(e),children:[(0,d.jsxs)(F,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:e.quote_number}),(0,d.jsx)(C,{children:e.name}),(0,d.jsx)(k,{children:e.email})]}),(0,d.jsx)(B,{status:e.status,children:Me(e.status)})]}),(0,d.jsxs)(E,{children:[e.package_name," - ",e.set_group,"/",e.set_tier]}),(0,d.jsx)(S,{children:(0,s.vv)(e.total_amount,e.currency)}),(0,d.jsxs)(z,{children:[(0,d.jsx)("span",{children:We(e.createdAt)}),(0,d.jsx)(_,{children:"View Details"})]})]},e.id))})]}),de&&ce&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>le(!1),title:`Quote ${ce.quote_number}`,footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(L,{variant:"danger",onClick:()=>ve(!0),children:"Delete"}),(0,d.jsx)("div",{style:{flex:1}}),"confirmed"===ce.status&&!ce.invoice_id&&(0,d.jsx)(L,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),_e(e.toISOString().split("T")[0]),qe("none"),Ie(""),De([]),Se(!0)},children:"Create Invoice"}),(0,d.jsx)(L,{onClick:()=>le(!1),children:"Close"})]}),children:[(0,d.jsx)(T,{style:{marginTop:0},children:"Quote Info"}),(0,d.jsxs)(q,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Quote Number"}),(0,d.jsx)(N,{style:{fontFamily:"monospace"},children:ce.quote_number})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Status"}),(0,d.jsx)(N,{children:(0,d.jsxs)(D,{value:pe,onChange:e=>(async e=>{if(ce){he(e);try{const r=Pe();(await fetch(`/api/hardware-quotes/${ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(n(n=>n.map(n=>n.id===ce.id?{...n,status:e}:n)),xe(n=>n?{...n,status:e}:null),Qe(!0))}catch(r){console.error("Error updating status:",r)}}})(e.target.value),children:[(0,d.jsx)("option",{value:"new",children:"New"}),(0,d.jsx)("option",{value:"contacted",children:"Contacted"}),(0,d.jsx)("option",{value:"confirmed",children:"Confirmed"}),(0,d.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Created"}),(0,d.jsx)(N,{children:We(ce.createdAt)})]})]}),(0,d.jsx)(T,{children:"Customer Info"}),(0,d.jsxs)(q,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Name"}),(0,d.jsx)(N,{children:ce.name})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Email"}),(0,d.jsx)(N,{children:ce.email})]}),ce.phone&&(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Phone"}),(0,d.jsx)(N,{children:ce.phone})]}),ce.company_name&&(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Company"}),(0,d.jsx)(N,{children:ce.company_name})]})]}),(0,d.jsx)(T,{children:"Linked User"}),ce.user?(0,d.jsxs)(M,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)("strong",{children:ce.user.full_name}),(0,d.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",ce.user.email,")"]}),(0,d.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:ce.user.role})]}),(0,d.jsx)(L,{onClick:Re,children:"Change"})]}):(0,d.jsxs)(M,{style:{background:"#F9FAFB"},children:[(0,d.jsx)(Y,{style:{color:"#6B7280"},children:"Not linked"}),(0,d.jsx)(L,{variant:"primary",onClick:Re,children:"Link User"})]}),(0,d.jsx)(T,{children:"Quote Details"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,d.jsxs)(J,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("strong",{children:ce.package_name}),(0,d.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",ce.set_group," - ",ce.set_tier,")"]})]}),(0,d.jsx)("div",{style:{fontWeight:600},children:(0,s.vv)(ce.package_price,Ye)})]}),ce.addon_items&&ce.addon_items.length>0&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),ce.addon_items.map((e,n)=>(0,d.jsxs)(J,{children:[(0,d.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,d.jsx)("div",{children:(0,s.vv)(e.price*e.quantity,Ye)})]},n))]}),(0,d.jsxs)(W,{children:[(0,d.jsx)("div",{children:"Total"}),(0,d.jsx)("div",{children:(0,s.vv)(ce.total_amount,Ye)})]})]}),ce.message&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(T,{children:"Customer Message"}),(0,d.jsx)(O,{children:ce.message})]}),(0,d.jsx)(T,{children:"Admin Notes"}),(0,d.jsxs)(P,{style:{marginBottom:0},children:[(0,d.jsx)(U,{value:ue,onChange:e=>me(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,d.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,d.jsx)(L,{variant:"primary",onClick:async()=>{if(ce){je(!0);try{const e=Pe();(await fetch(`/api/hardware-quotes/${ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:ue})})).ok&&xe(e=>e?{...e,admin_notes:ue}:null)}catch(e){console.error("Error saving notes:",e)}finally{je(!1)}}},disabled:ge||ue===(ce.admin_notes||""),children:ge?"Saving...":"Save Notes"})})]}),ce.invoice&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(T,{children:"Invoice"}),(0,d.jsx)(Z,{children:(0,d.jsxs)(q,{style:{marginBottom:0},children:[(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Invoice Number"}),(0,d.jsx)(N,{style:{fontFamily:"monospace"},children:ce.invoice.invoice_number})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Status"}),(0,d.jsx)(N,{children:(0,d.jsx)(B,{status:ce.invoice.status,children:Me(ce.invoice.status)})})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(I,{children:"Amount"}),(0,d.jsx)(N,{style:{fontWeight:600},children:(0,s.vv)(ce.invoice.total_amount,ce.invoice.currency)})]})]})})]})]}),ye&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>be(!1),title:"Link User to Quote",footer:(0,d.jsx)(L,{onClick:()=>be(!1),children:"Cancel"}),children:[(0,d.jsxs)(P,{children:[(0,d.jsx)(Q,{children:"Search users by name or email"}),(0,d.jsx)(R,{value:Fe,onChange:e=>we(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),ke&&(0,d.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Ae.length>0&&(0,d.jsx)(V,{children:Ae.map(e=>(0,d.jsxs)(G,{onClick:()=>(async e=>{if(ce)try{const n=Pe();(await fetch(`/api/hardware-quotes/${ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(be(!1),Ue(ce))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,d.jsx)(K,{children:e.full_name}),(0,d.jsxs)(X,{children:[e.email," - ",e.role]})]},e.id))}),Fe.length>=2&&!ke&&0===Ae.length&&(0,d.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),Ee&&ce&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>Se(!1),title:"Create Invoice from Quote",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(L,{onClick:()=>Se(!1),children:"Cancel"}),(0,d.jsx)(L,{variant:"primary",onClick:async()=>{if(ce){Oe(!0);try{const e=Pe(),n={due_date:ze};"none"!==Te&&$e&&(n.discount_type=Te,n.discount_value=parseFloat($e));const r=Ne.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const i=await fetch(`/api/hardware-quotes/${ce.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(i.ok)Se(!1),le(!1),Qe();else{const e=await i.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{Oe(!1)}}},disabled:Le,children:Le?"Creating...":"Create Invoice"})]}),children:[(0,d.jsx)(T,{style:{marginTop:0},children:"Quote Summary"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,d.jsxs)(J,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("strong",{children:ce.package_name})," (",ce.set_group," - ",ce.set_tier,")"]}),(0,d.jsx)("div",{children:(0,s.vv)(ce.package_price,Ye)})]}),ce.addon_items&&ce.addon_items.map((e,n)=>(0,d.jsxs)(J,{children:[(0,d.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,d.jsx)("div",{children:(0,s.vv)(e.price*e.quantity,Ye)})]},n)),(0,d.jsxs)(W,{children:[(0,d.jsx)("div",{children:"Subtotal"}),(0,d.jsx)("div",{children:(0,s.vv)(ce.total_amount,Ye)})]})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(Q,{children:"Due Date"}),(0,d.jsx)(R,{type:"date",value:ze,onChange:e=>_e(e.target.value)})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(Q,{children:"Discount"}),(0,d.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,d.jsxs)(H,{style:{width:"auto",minWidth:150},value:Te,onChange:e=>qe(e.target.value),children:[(0,d.jsx)("option",{value:"none",children:"No Discount"}),(0,d.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==Te&&(0,d.jsx)(R,{type:"number",min:"0",step:"0.01",value:$e,onChange:e=>Ie(e.target.value),placeholder:"percentage"===Te?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(Q,{children:"Additional Charges"}),Ne.map((e,n)=>(0,d.jsxs)(ee,{children:[(0,d.jsx)(ne,{children:(0,d.jsx)(R,{value:e.name,onChange:e=>Je(n,"name",e.target.value),placeholder:"Charge name"})}),(0,d.jsx)(ne,{children:(0,d.jsx)(R,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Je(n,"amount",e.target.value),placeholder:"Amount"})}),(0,d.jsx)(L,{variant:"danger",onClick:()=>{return e=n,void De(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,d.jsx)(L,{onClick:()=>{De(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,d.jsxs)(W,{style:{fontSize:18},children:[(0,d.jsx)("div",{children:"Invoice Total"}),(0,d.jsx)("div",{children:(0,s.vv)((()=>{if(!ce)return 0;let e=ce.total_amount;return"percentage"===Te&&$e?e-=e*(parseFloat($e)/100):"fixed"===Te&&$e&&(e-=parseFloat($e)),Ne.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Ye)})]})]}),fe&&(0,d.jsx)(a.aF,{isOpen:!0,onClose:()=>ve(!1),title:"Confirm Delete",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(L,{onClick:()=>ve(!1),children:"Cancel"}),(0,d.jsx)(L,{variant:"danger",onClick:async()=>{if(ce)try{const e=Pe();await fetch(`/api/hardware-quotes/${ce.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),ve(!1),le(!1),Qe()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,d.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,d.jsx)("strong",{children:null===ce||void 0===ce?void 0:ce.quote_number}),"? This action cannot be undone."]})})]})})}}}]);