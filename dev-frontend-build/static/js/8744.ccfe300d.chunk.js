"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var r=t(4752),o=t(4414);const i=r.Ay.div`
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
`,a=r.Ay.button`
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
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:t,style:r}=e;return(0,o.jsx)(i,{className:t,style:r,children:n})},d=e=>{let{active:n,onClick:t,children:r,className:i}=e;return(0,o.jsx)(a,{active:n,onClick:t,className:i,children:r})},c=e=>{let{count:n,variant:t="default",showZero:r=!1}=e;return 0!==n||r?(0,o.jsx)(s,{variant:t,children:n}):null}},2653:(e,n,t)=>{t.d(n,{M:()=>i});var r=t(9950),o=t(4492);function i(e){const[n,t]=(0,o.ok)(),i=(0,r.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,r.useState)(i());return[a,(0,r.useCallback)(e=>{s(e),t({tab:e})},[t])]}},8744:(e,n,t)=>{t.r(n),t.d(n,{default:()=>oe});var r=t(9950),o=t(4752),i=t(2853),a=t(8409),s=t(2597),l=t(2653),d=t(6038),c=t(4414);const p=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,x=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,h=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,u=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,g=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,m=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=o.Ay.select`
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
`,j=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=o.Ay.div`
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
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,b=o.Ay.div`
  flex: 1;
  min-width: 0;
`,F=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,w=o.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,A=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,k=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,C=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,B=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin: 8px 0 4px 0;
`,E=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,_=o.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,z=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,S=o.Ay.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`,$=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,q=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,T=o.Ay.div`
  font-size: 14px;
`,N=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,D=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,P=o.Ay.select`
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
`,I=o.Ay.button`
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
`,O=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,L=o.Ay.div`
  margin-bottom: 20px;
`,Q=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=o.Ay.textarea`
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
`,H=o.Ay.input`
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
`,R=o.Ay.select`
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
`,J=o.Ay.div`
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
`,M=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,W=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,Y=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,Z=o.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,G=o.Ay.div`
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
`,K=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,V=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,X=o.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,ee=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,ne=o.Ay.div`
  flex: 1;
`,te=["new","contacted","confirmed"],re=["invoiced","cancelled"],oe=()=>{var e,n,t,o,oe,ie,ae,se;const[le,de]=(0,r.useState)([]),[ce,pe]=(0,r.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[xe,he]=(0,r.useState)(!0),[ue,ge]=(0,r.useState)(""),[me,ve]=(0,r.useState)("all"),[je,fe]=(0,l.M)("active"),[ye,be]=(0,r.useState)(!1),[Fe,we]=(0,r.useState)(null),[Ae,ke]=(0,r.useState)(""),[Ce,Be]=(0,r.useState)(""),[Ee,_e]=(0,r.useState)(!1),[ze,Se]=(0,r.useState)(!1),[$e,qe]=(0,r.useState)(!1),[Te,Ne]=(0,r.useState)(""),[De,Pe]=(0,r.useState)([]),[Ie,Oe]=(0,r.useState)(!1),[Le,Qe]=(0,r.useState)(!1),[Ue,He]=(0,r.useState)(""),[Re,Je]=(0,r.useState)("none"),[Me,We]=(0,r.useState)(""),[Ye,Ze]=(0,r.useState)([]),[Ge,Ke]=(0,r.useState)(!1),Ve=()=>localStorage.getItem("auth_token"),Xe=(0,r.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||he(!0);const n=Ve(),t=new URLSearchParams;"all"!==me&&t.append("status",me),ue&&t.append("search",ue);const[r,o]=await Promise.all([fetch(`/api/hardware-quotes?${t}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(r.ok){const e=await r.json();de(e.data||e)}if(o.ok){const e=await o.json();pe(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{he(!1)}},[ue,me]);(0,r.useEffect)(()=>{Xe()},[Xe]),(0,r.useEffect)(()=>{const e=setInterval(()=>Xe(!0),1e4);return()=>clearInterval(e)},[Xe]);const en=le.filter(e=>("active"===je?te:re).includes(e.status)),nn=le.filter(e=>te.includes(e.status)).length,tn=le.filter(e=>re.includes(e.status)).length,rn=async e=>{try{const n=Ve(),t=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),n=e.data||e;we(n),ke(n.status),Be(n.admin_notes||""),be(!0)}}catch(n){console.error("Error loading quote detail:",n)}},on=()=>{Ne(""),Pe([]),qe(!0)},an=(0,r.useCallback)(async e=>{if(e.length<2)Pe([]);else{Oe(!0);try{const n=Ve(),t=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];Pe(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{Oe(!1)}}},[]);(0,r.useEffect)(()=>{const e=setTimeout(()=>{Te&&an(Te)},300);return()=>clearTimeout(e)},[Te,an]);const sn=(e,n,t)=>{Ze(r=>r.map((r,o)=>o===e?{...r,[n]:t}:r))},ln=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),dn=e=>e.charAt(0).toUpperCase()+e.slice(1),cn=(null===Fe||void 0===Fe?void 0:Fe.currency)||"MYR";return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(a.mc,{children:[(0,c.jsx)(a.Y9,{children:(0,c.jsx)(a.hE,{children:"Hardware Quotes"})}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{color:"#635BFF",children:[(0,c.jsx)(h,{children:ce.total}),(0,c.jsx)(u,{children:"Total"})]}),(0,c.jsxs)(x,{color:"#F59E0B",children:[(0,c.jsx)(h,{children:ce.new}),(0,c.jsx)(u,{children:"New"})]}),(0,c.jsxs)(x,{color:"#3B82F6",children:[(0,c.jsx)(h,{children:ce.contacted}),(0,c.jsx)(u,{children:"Contacted"})]}),(0,c.jsxs)(x,{color:"#10B981",children:[(0,c.jsx)(h,{children:ce.confirmed}),(0,c.jsx)(u,{children:"Confirmed"})]}),(0,c.jsxs)(x,{color:"#8B5CF6",children:[(0,c.jsx)(h,{children:ce.invoiced}),(0,c.jsx)(u,{children:"Invoiced"})]})]}),(0,c.jsxs)(s.tU,{children:[(0,c.jsxs)(s.oz,{active:"active"===je,onClick:()=>fe("active"),children:["Active Quotes (",nn,")"]}),(0,c.jsxs)(s.oz,{active:"closed"===je,onClick:()=>fe("closed"),children:["Closed Quotes (",tn,")"]})]}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{placeholder:"Search by name, email, company, quote number...",value:ue,onChange:e=>ge(e.target.value)}),(0,c.jsxs)(v,{value:me,onChange:e=>ve(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),"active"===je?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),xe?(0,c.jsx)(i.pp,{children:"Loading..."}):0===en.length?(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,c.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","active"===je?"active":"closed"," quotes"]}),(0,c.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,c.jsx)(j,{children:en.map(e=>{var n,t,r;return(0,c.jsxs)(f,{onClick:()=>rn(e),children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(F,{children:e.quote_number}),(0,c.jsx)(w,{children:e.contact_name}),(0,c.jsx)(A,{children:e.contact_email}),e.company_name&&(0,c.jsx)(k,{children:e.company_name})]}),(0,c.jsx)(C,{status:e.status,children:dn(e.status)})]}),(0,c.jsx)(B,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(t=e.package_snapshot)||void 0===t?void 0:t.name)||"N/A"}),e.addon_items&&e.addon_items.length>0&&(0,c.jsx)(E,{children:(r=e.addon_items,r&&0!==r.length?"+ "+r.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,c.jsx)(_,{children:(0,d.vv)(e.total_amount,e.currency)}),(0,c.jsxs)(z,{children:[(0,c.jsx)("span",{children:ln(e.created_at)}),"active"===je&&(0,c.jsx)(S,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=Ve();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(de(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),Xe(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),ye&&Fe&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>be(!1),title:`Quote ${Fe.quote_number}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{variant:"danger",onClick:()=>Se(!0),children:"Delete"}),(0,c.jsx)("div",{style:{flex:1}}),"confirmed"===Fe.status&&!Fe.invoice_id&&(0,c.jsx)(I,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),He(e.toISOString().split("T")[0]),Je("none"),We(""),Ze([]),Qe(!0)},children:"Create Invoice"}),(0,c.jsx)(I,{onClick:()=>be(!1),children:"Close"})]}),children:[(0,c.jsx)($,{style:{marginTop:0},children:"Quote Info"}),(0,c.jsxs)(q,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Quote Number"}),(0,c.jsx)(D,{style:{fontFamily:"monospace"},children:Fe.quote_number})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Status"}),(0,c.jsx)(D,{children:(0,c.jsxs)(P,{value:Ae,onChange:e=>(async e=>{if(Fe){ke(e);try{const n=Ve();(await fetch(`/api/hardware-quotes/${Fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(de(n=>n.map(n=>n.id===Fe.id?{...n,status:e}:n)),we(n=>n?{...n,status:e}:null),Xe(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"}),(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Created"}),(0,c.jsx)(D,{children:ln(Fe.created_at)})]})]}),(0,c.jsx)($,{children:"Customer Info"}),(0,c.jsxs)(q,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Name"}),(0,c.jsx)(D,{children:Fe.contact_name})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Email"}),(0,c.jsx)(D,{children:Fe.contact_email})]}),Fe.contact_phone&&(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Phone"}),(0,c.jsx)(D,{children:Fe.contact_phone})]}),Fe.company_name&&(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Company"}),(0,c.jsx)(D,{children:Fe.company_name})]})]}),(0,c.jsx)($,{children:"Linked User"}),Fe.user?(0,c.jsxs)(W,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)("strong",{children:Fe.user.full_name}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Fe.user.email,")"]}),(0,c.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Fe.user.role})]}),(0,c.jsx)(I,{onClick:on,children:"Change"})]}):(0,c.jsxs)(W,{style:{background:"#F9FAFB"},children:[(0,c.jsx)(Y,{style:{color:"#6B7280"},children:"Not linked"}),(0,c.jsx)(I,{variant:"primary",onClick:on,children:"Link User"})]}),(0,c.jsx)($,{children:"Quote Details"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:(null===(e=Fe.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Fe.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(t=Fe.packageProduct)||void 0===t?void 0:t.set_group)||""," - ",(null===(o=Fe.packageProduct)||void 0===o?void 0:o.set_tier)||"",")"]})]}),(0,c.jsx)("div",{style:{fontWeight:600},children:(0,d.vv)(Fe.package_price,cn)})]}),Fe.addon_items&&Fe.addon_items.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Fe.addon_items.map((e,n)=>(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,cn)})]},n))]}),(0,c.jsxs)(M,{children:[(0,c.jsx)("div",{children:"Total"}),(0,c.jsx)("div",{children:(0,d.vv)(Fe.total_amount,cn)})]})]}),Fe.message&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:"Customer Message"}),(0,c.jsx)(O,{children:Fe.message})]}),(0,c.jsx)($,{children:"Admin Notes"}),(0,c.jsxs)(L,{style:{marginBottom:0},children:[(0,c.jsx)(U,{value:Ce,onChange:e=>Be(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,c.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,c.jsx)(I,{variant:"primary",onClick:async()=>{if(Fe){_e(!0);try{const e=Ve();(await fetch(`/api/hardware-quotes/${Fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Ce})})).ok&&we(e=>e?{...e,admin_notes:Ce}:null)}catch(e){console.error("Error saving notes:",e)}finally{_e(!1)}}},disabled:Ee||Ce===(Fe.admin_notes||""),children:Ee?"Saving...":"Save Notes"})})]}),Fe.invoice&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:"Invoice"}),(0,c.jsx)(X,{children:(0,c.jsxs)(q,{style:{marginBottom:0},children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Invoice Number"}),(0,c.jsx)(D,{style:{fontFamily:"monospace"},children:Fe.invoice.invoice_number})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Status"}),(0,c.jsx)(D,{children:(0,c.jsx)(C,{status:Fe.invoice.status,children:dn(Fe.invoice.status)})})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Amount"}),(0,c.jsx)(D,{style:{fontWeight:600},children:(0,d.vv)(Fe.invoice.total_amount,Fe.invoice.currency)})]})]})})]})]}),$e&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>qe(!1),title:"Link User to Quote",footer:(0,c.jsx)(I,{onClick:()=>qe(!1),children:"Cancel"}),children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(Q,{children:"Search users by name or email"}),(0,c.jsx)(H,{value:Te,onChange:e=>Ne(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Ie&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),De.length>0&&(0,c.jsx)(Z,{children:De.map(e=>(0,c.jsxs)(G,{onClick:()=>(async e=>{if(Fe)try{const n=Ve();(await fetch(`/api/hardware-quotes/${Fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(qe(!1),rn(Fe))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,c.jsx)(K,{children:e.full_name}),(0,c.jsxs)(V,{children:[e.email," - ",e.role]})]},e.id))}),Te.length>=2&&!Ie&&0===De.length&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),Le&&Fe&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>Qe(!1),title:"Create Invoice from Quote",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{onClick:()=>Qe(!1),children:"Cancel"}),(0,c.jsx)(I,{variant:"primary",onClick:async()=>{if(Fe){Ke(!0);try{const e=Ve(),n={due_date:Ue};"none"!==Re&&Me&&(n.discount_type=Re,n.discount_value=parseFloat(Me));const t=Ye.filter(e=>e.name&&e.amount);t.length>0&&(n.additional_charges=t.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const r=await fetch(`/api/hardware-quotes/${Fe.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(r.ok)Qe(!1),be(!1),Xe();else{const e=await r.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{Ke(!1)}}},disabled:Ge,children:Ge?"Creating...":"Create Invoice"})]}),children:[(0,c.jsx)($,{style:{marginTop:0},children:"Quote Summary"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:(null===(oe=Fe.packageProduct)||void 0===oe?void 0:oe.name)||(null===(ie=Fe.package_snapshot)||void 0===ie?void 0:ie.name)||"N/A"})," (",(null===(ae=Fe.packageProduct)||void 0===ae?void 0:ae.set_group)||""," - ",(null===(se=Fe.packageProduct)||void 0===se?void 0:se.set_tier)||"",")"]}),(0,c.jsx)("div",{children:(0,d.vv)(Fe.package_price,cn)})]}),Fe.addon_items&&Fe.addon_items.map((e,n)=>(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,cn)})]},n)),(0,c.jsxs)(M,{children:[(0,c.jsx)("div",{children:"Subtotal"}),(0,c.jsx)("div",{children:(0,d.vv)(Fe.total_amount,cn)})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(Q,{children:"Due Date"}),(0,c.jsx)(H,{type:"date",value:Ue,onChange:e=>He(e.target.value)})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(Q,{children:"Discount"}),(0,c.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,c.jsxs)(R,{style:{width:"auto",minWidth:150},value:Re,onChange:e=>Je(e.target.value),children:[(0,c.jsx)("option",{value:"none",children:"No Discount"}),(0,c.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==Re&&(0,c.jsx)(H,{type:"number",min:"0",step:"0.01",value:Me,onChange:e=>We(e.target.value),placeholder:"percentage"===Re?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(Q,{children:"Additional Charges"}),Ye.map((e,n)=>(0,c.jsxs)(ee,{children:[(0,c.jsx)(ne,{children:(0,c.jsx)(H,{value:e.name,onChange:e=>sn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,c.jsx)(ne,{children:(0,c.jsx)(H,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>sn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,c.jsx)(I,{variant:"danger",onClick:()=>{return e=n,void Ze(n=>n.filter((n,t)=>t!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,c.jsx)(I,{onClick:()=>{Ze(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,c.jsxs)(M,{style:{fontSize:18},children:[(0,c.jsx)("div",{children:"Invoice Total"}),(0,c.jsx)("div",{children:(0,d.vv)((()=>{if(!Fe)return 0;let e=Fe.total_amount;return"percentage"===Re&&Me?e-=e*(parseFloat(Me)/100):"fixed"===Re&&Me&&(e-=parseFloat(Me)),Ye.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),cn)})]})]}),ze&&(0,c.jsx)(a.aF,{isOpen:!0,onClose:()=>Se(!1),title:"Confirm Delete",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{onClick:()=>Se(!1),children:"Cancel"}),(0,c.jsx)(I,{variant:"danger",onClick:async()=>{if(Fe)try{const e=Ve();await fetch(`/api/hardware-quotes/${Fe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Se(!1),be(!1),Xe()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,c.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,c.jsx)("strong",{children:null===Fe||void 0===Fe?void 0:Fe.quote_number}),"? This action cannot be undone."]})})]})})}}}]);