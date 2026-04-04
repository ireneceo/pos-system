"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
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
`,a=t.Ay.button`
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
`,s=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:r,style:t}=e;return(0,i.jsx)(o,{className:r,style:t,children:n})},d=e=>{let{active:n,onClick:r,children:t,className:o}=e;return(0,i.jsx)(a,{active:n,onClick:r,className:o,children:t})},c=e=>{let{count:n,variant:r="default",showZero:t=!1}=e;return 0!==n||t?(0,i.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>o});var t=r(9950),i=r(4492);function o(e){const[n,r]=(0,i.ok)(),o=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,t.useState)(o());return[a,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ie});var t=r(9950),i=r(4752),o=r(2853),a=r(8409),s=r(2597),l=r(2653),d=r(6038),c=r(4414);const x=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,p=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,h=i.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,u=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,g=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,m=i.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=i.Ay.select`
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
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,v=i.Ay.div`
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
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,b=i.Ay.div`
  flex: 1;
  min-width: 0;
`,F=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,w=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,A=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,k=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,B=i.Ay.div`
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
`,E=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,z=i.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,S=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,_=i.Ay.button`
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
`,$=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,q=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,T=i.Ay.div`
  font-size: 14px;
`,D=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,N=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,I=i.Ay.select`
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
`,O=i.Ay.button`
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
`,L=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,P=i.Ay.div`
  margin-bottom: 20px;
`,Q=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=i.Ay.textarea`
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
`,H=i.Ay.input`
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
`,R=i.Ay.select`
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
`,J=i.Ay.div`
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
`,M=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,W=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,Y=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,Z=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,G=i.Ay.div`
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
`,K=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,V=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,X=i.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,ee=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,ne=i.Ay.div`
  flex: 1;
`,re=["new","contacted","confirmed"],te=["invoiced","cancelled"],ie=()=>{const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[ie,oe]=(0,t.useState)(!0),[ae,se]=(0,t.useState)(""),[le,de]=(0,t.useState)("all"),[ce,xe]=(0,l.M)("active"),[pe,he]=(0,t.useState)(!1),[ue,ge]=(0,t.useState)(null),[me,je]=(0,t.useState)(""),[fe,ve]=(0,t.useState)(""),[ye,be]=(0,t.useState)(!1),[Fe,we]=(0,t.useState)(!1),[Ae,Ce]=(0,t.useState)(!1),[ke,Be]=(0,t.useState)(""),[Ee,ze]=(0,t.useState)([]),[Se,_e]=(0,t.useState)(!1),[$e,qe]=(0,t.useState)(!1),[Te,De]=(0,t.useState)(""),[Ne,Ie]=(0,t.useState)("none"),[Oe,Le]=(0,t.useState)(""),[Pe,Qe]=(0,t.useState)([]),[Ue,He]=(0,t.useState)(!1),Re=()=>localStorage.getItem("auth_token"),Je=(0,t.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||oe(!0);const r=Re(),t=new URLSearchParams;"all"!==le&&t.append("status",le),ae&&t.append("search",ae);const[o,a]=await Promise.all([fetch(`/api/hardware-quotes?${t}`,{headers:{Authorization:`Bearer ${r}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${r}`}})]);if(o.ok){const e=await o.json();n(e.data||e)}if(a.ok){const e=await a.json();i(e.data||e)}}catch(r){console.error("Error loading hardware quotes:",r)}finally{oe(!1)}},[ae,le]);(0,t.useEffect)(()=>{Je()},[Je]),(0,t.useEffect)(()=>{const e=setInterval(()=>Je(!0),1e4);return()=>clearInterval(e)},[Je]);const Me=e.filter(e=>("active"===ce?re:te).includes(e.status)),We=e.filter(e=>re.includes(e.status)).length,Ye=e.filter(e=>te.includes(e.status)).length,Ze=async e=>{try{const n=Re(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;ge(n),je(n.status),ve(n.admin_notes||""),he(!0)}}catch(n){console.error("Error loading quote detail:",n)}},Ge=()=>{Be(""),ze([]),Ce(!0)},Ke=(0,t.useCallback)(async e=>{if(e.length<2)ze([]);else{_e(!0);try{const n=Re(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];ze(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{_e(!1)}}},[]);(0,t.useEffect)(()=>{const e=setTimeout(()=>{ke&&Ke(ke)},300);return()=>clearTimeout(e)},[ke,Ke]);const Ve=(e,n,r)=>{Qe(t=>t.map((t,i)=>i===e?{...t,[n]:r}:t))},Xe=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),en=e=>e.charAt(0).toUpperCase()+e.slice(1),nn=(null===ue||void 0===ue?void 0:ue.currency)||"MYR";return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(a.mc,{children:[(0,c.jsx)(a.Y9,{children:(0,c.jsx)(a.hE,{children:"Hardware Quotes"})}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(p,{color:"#635BFF",children:[(0,c.jsx)(h,{children:r.total}),(0,c.jsx)(u,{children:"Total"})]}),(0,c.jsxs)(p,{color:"#F59E0B",children:[(0,c.jsx)(h,{children:r.new}),(0,c.jsx)(u,{children:"New"})]}),(0,c.jsxs)(p,{color:"#3B82F6",children:[(0,c.jsx)(h,{children:r.contacted}),(0,c.jsx)(u,{children:"Contacted"})]}),(0,c.jsxs)(p,{color:"#10B981",children:[(0,c.jsx)(h,{children:r.confirmed}),(0,c.jsx)(u,{children:"Confirmed"})]}),(0,c.jsxs)(p,{color:"#8B5CF6",children:[(0,c.jsx)(h,{children:r.invoiced}),(0,c.jsx)(u,{children:"Invoiced"})]})]}),(0,c.jsxs)(s.tU,{children:[(0,c.jsxs)(s.oz,{active:"active"===ce,onClick:()=>xe("active"),children:["Active Quotes (",We,")"]}),(0,c.jsxs)(s.oz,{active:"closed"===ce,onClick:()=>xe("closed"),children:["Closed Quotes (",Ye,")"]})]}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{placeholder:"Search by name, email, company, quote number...",value:ae,onChange:e=>se(e.target.value)}),(0,c.jsxs)(j,{value:le,onChange:e=>de(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),"active"===ce?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),ie?(0,c.jsx)(o.pp,{children:"Loading..."}):0===Me.length?(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,c.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","active"===ce?"active":"closed"," quotes"]}),(0,c.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,c.jsx)(f,{children:Me.map(e=>{return(0,c.jsxs)(v,{onClick:()=>Ze(e),children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(F,{children:e.quote_number}),(0,c.jsx)(w,{children:e.name}),(0,c.jsx)(A,{children:e.email}),e.company_name&&(0,c.jsx)(C,{children:e.company_name})]}),(0,c.jsx)(k,{status:e.status,children:en(e.status)})]}),(0,c.jsx)(B,{children:e.package_name}),e.addon_items&&e.addon_items.length>0&&(0,c.jsx)(E,{children:(r=e.addon_items,r&&0!==r.length?"+ "+r.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,c.jsx)(z,{children:(0,d.vv)(e.total_amount,e.currency)}),(0,c.jsxs)(S,{children:[(0,c.jsx)("span",{children:Xe(e.createdAt)}),"active"===ce&&(0,c.jsx)(_,{onClick:r=>{r.stopPropagation(),(async e=>{try{const r=Re();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(n(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),Je(!0))}catch(r){console.error("Error closing quote:",r)}})(e)},children:"Close"})]})]},e.id);var r})})]}),pe&&ue&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>he(!1),title:`Quote ${ue.quote_number}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{variant:"danger",onClick:()=>we(!0),children:"Delete"}),(0,c.jsx)("div",{style:{flex:1}}),"confirmed"===ue.status&&!ue.invoice_id&&(0,c.jsx)(O,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),De(e.toISOString().split("T")[0]),Ie("none"),Le(""),Qe([]),qe(!0)},children:"Create Invoice"}),(0,c.jsx)(O,{onClick:()=>he(!1),children:"Close"})]}),children:[(0,c.jsx)($,{style:{marginTop:0},children:"Quote Info"}),(0,c.jsxs)(q,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Quote Number"}),(0,c.jsx)(N,{style:{fontFamily:"monospace"},children:ue.quote_number})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Status"}),(0,c.jsx)(N,{children:(0,c.jsxs)(I,{value:me,onChange:e=>(async e=>{if(ue){je(e);try{const r=Re();(await fetch(`/api/hardware-quotes/${ue.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(n(n=>n.map(n=>n.id===ue.id?{...n,status:e}:n)),ge(n=>n?{...n,status:e}:null),Je(!0))}catch(r){console.error("Error updating status:",r)}}})(e.target.value),children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"}),(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Created"}),(0,c.jsx)(N,{children:Xe(ue.createdAt)})]})]}),(0,c.jsx)($,{children:"Customer Info"}),(0,c.jsxs)(q,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Name"}),(0,c.jsx)(N,{children:ue.name})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Email"}),(0,c.jsx)(N,{children:ue.email})]}),ue.phone&&(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Phone"}),(0,c.jsx)(N,{children:ue.phone})]}),ue.company_name&&(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Company"}),(0,c.jsx)(N,{children:ue.company_name})]})]}),(0,c.jsx)($,{children:"Linked User"}),ue.user?(0,c.jsxs)(W,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)("strong",{children:ue.user.full_name}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",ue.user.email,")"]}),(0,c.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:ue.user.role})]}),(0,c.jsx)(O,{onClick:Ge,children:"Change"})]}):(0,c.jsxs)(W,{style:{background:"#F9FAFB"},children:[(0,c.jsx)(Y,{style:{color:"#6B7280"},children:"Not linked"}),(0,c.jsx)(O,{variant:"primary",onClick:Ge,children:"Link User"})]}),(0,c.jsx)($,{children:"Quote Details"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:ue.package_name}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",ue.set_group," - ",ue.set_tier,")"]})]}),(0,c.jsx)("div",{style:{fontWeight:600},children:(0,d.vv)(ue.package_price,nn)})]}),ue.addon_items&&ue.addon_items.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),ue.addon_items.map((e,n)=>(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,d.vv)(e.price*e.quantity,nn)})]},n))]}),(0,c.jsxs)(M,{children:[(0,c.jsx)("div",{children:"Total"}),(0,c.jsx)("div",{children:(0,d.vv)(ue.total_amount,nn)})]})]}),ue.message&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:"Customer Message"}),(0,c.jsx)(L,{children:ue.message})]}),(0,c.jsx)($,{children:"Admin Notes"}),(0,c.jsxs)(P,{style:{marginBottom:0},children:[(0,c.jsx)(U,{value:fe,onChange:e=>ve(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,c.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,c.jsx)(O,{variant:"primary",onClick:async()=>{if(ue){be(!0);try{const e=Re();(await fetch(`/api/hardware-quotes/${ue.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:fe})})).ok&&ge(e=>e?{...e,admin_notes:fe}:null)}catch(e){console.error("Error saving notes:",e)}finally{be(!1)}}},disabled:ye||fe===(ue.admin_notes||""),children:ye?"Saving...":"Save Notes"})})]}),ue.invoice&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:"Invoice"}),(0,c.jsx)(X,{children:(0,c.jsxs)(q,{style:{marginBottom:0},children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Invoice Number"}),(0,c.jsx)(N,{style:{fontFamily:"monospace"},children:ue.invoice.invoice_number})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Status"}),(0,c.jsx)(N,{children:(0,c.jsx)(k,{status:ue.invoice.status,children:en(ue.invoice.status)})})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Amount"}),(0,c.jsx)(N,{style:{fontWeight:600},children:(0,d.vv)(ue.invoice.total_amount,ue.invoice.currency)})]})]})})]})]}),Ae&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ce(!1),title:"Link User to Quote",footer:(0,c.jsx)(O,{onClick:()=>Ce(!1),children:"Cancel"}),children:[(0,c.jsxs)(P,{children:[(0,c.jsx)(Q,{children:"Search users by name or email"}),(0,c.jsx)(H,{value:ke,onChange:e=>Be(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Se&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Ee.length>0&&(0,c.jsx)(Z,{children:Ee.map(e=>(0,c.jsxs)(G,{onClick:()=>(async e=>{if(ue)try{const n=Re();(await fetch(`/api/hardware-quotes/${ue.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(Ce(!1),Ze(ue))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,c.jsx)(K,{children:e.full_name}),(0,c.jsxs)(V,{children:[e.email," - ",e.role]})]},e.id))}),ke.length>=2&&!Se&&0===Ee.length&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),$e&&ue&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>qe(!1),title:"Create Invoice from Quote",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{onClick:()=>qe(!1),children:"Cancel"}),(0,c.jsx)(O,{variant:"primary",onClick:async()=>{if(ue){He(!0);try{const e=Re(),n={due_date:Te};"none"!==Ne&&Oe&&(n.discount_type=Ne,n.discount_value=parseFloat(Oe));const r=Pe.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const t=await fetch(`/api/hardware-quotes/${ue.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(t.ok)qe(!1),he(!1),Je();else{const e=await t.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{He(!1)}}},disabled:Ue,children:Ue?"Creating...":"Create Invoice"})]}),children:[(0,c.jsx)($,{style:{marginTop:0},children:"Quote Summary"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:ue.package_name})," (",ue.set_group," - ",ue.set_tier,")"]}),(0,c.jsx)("div",{children:(0,d.vv)(ue.package_price,nn)})]}),ue.addon_items&&ue.addon_items.map((e,n)=>(0,c.jsxs)(J,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,d.vv)(e.price*e.quantity,nn)})]},n)),(0,c.jsxs)(M,{children:[(0,c.jsx)("div",{children:"Subtotal"}),(0,c.jsx)("div",{children:(0,d.vv)(ue.total_amount,nn)})]})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)(Q,{children:"Due Date"}),(0,c.jsx)(H,{type:"date",value:Te,onChange:e=>De(e.target.value)})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)(Q,{children:"Discount"}),(0,c.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,c.jsxs)(R,{style:{width:"auto",minWidth:150},value:Ne,onChange:e=>Ie(e.target.value),children:[(0,c.jsx)("option",{value:"none",children:"No Discount"}),(0,c.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==Ne&&(0,c.jsx)(H,{type:"number",min:"0",step:"0.01",value:Oe,onChange:e=>Le(e.target.value),placeholder:"percentage"===Ne?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)(Q,{children:"Additional Charges"}),Pe.map((e,n)=>(0,c.jsxs)(ee,{children:[(0,c.jsx)(ne,{children:(0,c.jsx)(H,{value:e.name,onChange:e=>Ve(n,"name",e.target.value),placeholder:"Charge name"})}),(0,c.jsx)(ne,{children:(0,c.jsx)(H,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Ve(n,"amount",e.target.value),placeholder:"Amount"})}),(0,c.jsx)(O,{variant:"danger",onClick:()=>{return e=n,void Qe(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,c.jsx)(O,{onClick:()=>{Qe(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,c.jsxs)(M,{style:{fontSize:18},children:[(0,c.jsx)("div",{children:"Invoice Total"}),(0,c.jsx)("div",{children:(0,d.vv)((()=>{if(!ue)return 0;let e=ue.total_amount;return"percentage"===Ne&&Oe?e-=e*(parseFloat(Oe)/100):"fixed"===Ne&&Oe&&(e-=parseFloat(Oe)),Pe.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),nn)})]})]}),Fe&&(0,c.jsx)(a.aF,{isOpen:!0,onClose:()=>we(!1),title:"Confirm Delete",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{onClick:()=>we(!1),children:"Cancel"}),(0,c.jsx)(O,{variant:"danger",onClick:async()=>{if(ue)try{const e=Re();await fetch(`/api/hardware-quotes/${ue.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),we(!1),he(!1),Je()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,c.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,c.jsx)("strong",{children:null===ue||void 0===ue?void 0:ue.quote_number}),"? This action cannot be undone."]})})]})})}}}]);