"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
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
`,d=e=>{let{children:n,className:r,style:t}=e;return(0,i.jsx)(o,{className:r,style:t,children:n})},l=e=>{let{active:n,onClick:r,children:t,className:o}=e;return(0,i.jsx)(a,{active:n,onClick:r,className:o,children:t})},c=e=>{let{count:n,variant:r="default",showZero:t=!1}=e;return 0!==n||t?(0,i.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>o});var t=r(9950),i=r(4492);function o(e){const[n,r]=(0,i.ok)(),o=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,t.useState)(o());return[a,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>de});var t=r(9950),i=r(4752),o=r(2853),a=r(8409),s=r(2597),d=r(2653),l=r(6038),c=r(4414);const x=i.Ay.div`
  min-height: 100vh;
`,p=i.Ay.div`
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
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,u=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,j=i.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,v=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=i.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,b=i.Ay.select`
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
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=i.Ay.div`
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
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,C=i.Ay.div`
  flex: 1;
  min-width: 0;
`,k=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,B=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,E=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,z=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,S=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,_=i.Ay.div`
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
`,$=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,q=i.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,T=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=i.Ay.button`
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
`,N=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,I=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,O=i.Ay.div`
  font-size: 14px;
`,L=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,P=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,Q=i.Ay.select`
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
`,U=i.Ay.button`
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
`,H=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,R=i.Ay.div`
  margin-bottom: 20px;
`,J=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,M=i.Ay.textarea`
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
`,W=i.Ay.input`
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
`,Y=i.Ay.select`
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
`,Z=i.Ay.div`
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
`,G=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,K=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,V=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,X=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,ee=i.Ay.div`
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
`,ne=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,re=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,te=i.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,ie=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,oe=i.Ay.div`
  flex: 1;
`,ae=["new","contacted","confirmed"],se=["invoiced","cancelled"],de=()=>{const[e,n]=(0,t.useState)([]),[r,i]=(0,t.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[de,le]=(0,t.useState)(!0),[ce,xe]=(0,t.useState)(""),[pe,he]=(0,t.useState)("all"),[ue,ge]=(0,d.M)("active"),[me,je]=(0,t.useState)(!1),[fe,ve]=(0,t.useState)(null),[ye,be]=(0,t.useState)(""),[Fe,we]=(0,t.useState)(""),[Ae,Ce]=(0,t.useState)(!1),[ke,Be]=(0,t.useState)(!1),[Ee,ze]=(0,t.useState)(!1),[Se,_e]=(0,t.useState)(""),[$e,qe]=(0,t.useState)([]),[Te,De]=(0,t.useState)(!1),[Ne,Ie]=(0,t.useState)(!1),[Oe,Le]=(0,t.useState)(""),[Pe,Qe]=(0,t.useState)("none"),[Ue,He]=(0,t.useState)(""),[Re,Je]=(0,t.useState)([]),[Me,We]=(0,t.useState)(!1),Ye=()=>localStorage.getItem("auth_token"),Ze=(0,t.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||le(!0);const r=Ye(),t=new URLSearchParams;"all"!==pe&&t.append("status",pe),ce&&t.append("search",ce);const[o,a]=await Promise.all([fetch(`/api/hardware-quotes?${t}`,{headers:{Authorization:`Bearer ${r}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${r}`}})]);if(o.ok){const e=await o.json();n(e.data||e)}if(a.ok){const e=await a.json();i(e.data||e)}}catch(r){console.error("Error loading hardware quotes:",r)}finally{le(!1)}},[ce,pe]);(0,t.useEffect)(()=>{Ze()},[Ze]),(0,t.useEffect)(()=>{const e=setInterval(()=>Ze(!0),1e4);return()=>clearInterval(e)},[Ze]);const Ge=e.filter(e=>("active"===ue?ae:se).includes(e.status)),Ke=e.filter(e=>ae.includes(e.status)).length,Ve=e.filter(e=>se.includes(e.status)).length,Xe=async e=>{try{const n=Ye(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;ve(n),be(n.status),we(n.admin_notes||""),je(!0)}}catch(n){console.error("Error loading quote detail:",n)}},en=()=>{_e(""),qe([]),ze(!0)},nn=(0,t.useCallback)(async e=>{if(e.length<2)qe([]);else{De(!0);try{const n=Ye(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];qe(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{De(!1)}}},[]);(0,t.useEffect)(()=>{const e=setTimeout(()=>{Se&&nn(Se)},300);return()=>clearTimeout(e)},[Se,nn]);const rn=(e,n,r)=>{Je(t=>t.map((t,i)=>i===e?{...t,[n]:r}:t))},tn=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),on=e=>e.charAt(0).toUpperCase()+e.slice(1),an=(null===fe||void 0===fe?void 0:fe.currency)||"MYR";return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(p,{children:(0,c.jsx)(h,{children:"Hardware Quotes"})}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{color:"#635BFF",children:[(0,c.jsx)(j,{children:r.total}),(0,c.jsx)(f,{children:"Total"})]}),(0,c.jsxs)(m,{color:"#F59E0B",children:[(0,c.jsx)(j,{children:r.new}),(0,c.jsx)(f,{children:"New"})]}),(0,c.jsxs)(m,{color:"#3B82F6",children:[(0,c.jsx)(j,{children:r.contacted}),(0,c.jsx)(f,{children:"Contacted"})]}),(0,c.jsxs)(m,{color:"#10B981",children:[(0,c.jsx)(j,{children:r.confirmed}),(0,c.jsx)(f,{children:"Confirmed"})]}),(0,c.jsxs)(m,{color:"#8B5CF6",children:[(0,c.jsx)(j,{children:r.invoiced}),(0,c.jsx)(f,{children:"Invoiced"})]})]}),(0,c.jsxs)(s.tU,{children:[(0,c.jsxs)(s.oz,{active:"active"===ue,onClick:()=>ge("active"),children:["Active Quotes (",Ke,")"]}),(0,c.jsxs)(s.oz,{active:"closed"===ue,onClick:()=>ge("closed"),children:["Closed Quotes (",Ve,")"]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(y,{placeholder:"Search by name, email, company, quote number...",value:ce,onChange:e=>xe(e.target.value)}),(0,c.jsxs)(b,{value:pe,onChange:e=>he(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),"active"===ue?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),de?(0,c.jsx)(o.pp,{children:"Loading..."}):0===Ge.length?(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,c.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","active"===ue?"active":"closed"," quotes"]}),(0,c.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,c.jsx)(F,{children:Ge.map(e=>{return(0,c.jsxs)(w,{onClick:()=>Xe(e),children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)(C,{children:[(0,c.jsx)(k,{children:e.quote_number}),(0,c.jsx)(B,{children:e.name}),(0,c.jsx)(E,{children:e.email}),e.company_name&&(0,c.jsx)(z,{children:e.company_name})]}),(0,c.jsx)(S,{status:e.status,children:on(e.status)})]}),(0,c.jsx)(_,{children:e.package_name}),e.addon_items&&e.addon_items.length>0&&(0,c.jsx)($,{children:(r=e.addon_items,r&&0!==r.length?"+ "+r.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,c.jsx)(q,{children:(0,l.vv)(e.total_amount,e.currency)}),(0,c.jsxs)(T,{children:[(0,c.jsx)("span",{children:tn(e.createdAt)}),"active"===ue&&(0,c.jsx)(D,{onClick:r=>{r.stopPropagation(),(async e=>{try{const r=Ye();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(n(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),Ze(!0))}catch(r){console.error("Error closing quote:",r)}})(e)},children:"Close"})]})]},e.id);var r})})]}),me&&fe&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>je(!1),title:`Quote ${fe.quote_number}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(U,{variant:"danger",onClick:()=>Be(!0),children:"Delete"}),(0,c.jsx)("div",{style:{flex:1}}),"confirmed"===fe.status&&!fe.invoice_id&&(0,c.jsx)(U,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),Le(e.toISOString().split("T")[0]),Qe("none"),He(""),Je([]),Ie(!0)},children:"Create Invoice"}),(0,c.jsx)(U,{onClick:()=>je(!1),children:"Close"})]}),children:[(0,c.jsx)(N,{style:{marginTop:0},children:"Quote Info"}),(0,c.jsxs)(I,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Quote Number"}),(0,c.jsx)(P,{style:{fontFamily:"monospace"},children:fe.quote_number})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Status"}),(0,c.jsx)(P,{children:(0,c.jsxs)(Q,{value:ye,onChange:e=>(async e=>{if(fe){be(e);try{const r=Ye();(await fetch(`/api/hardware-quotes/${fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(n(n=>n.map(n=>n.id===fe.id?{...n,status:e}:n)),ve(n=>n?{...n,status:e}:null),Ze(!0))}catch(r){console.error("Error updating status:",r)}}})(e.target.value),children:[(0,c.jsx)("option",{value:"new",children:"New"}),(0,c.jsx)("option",{value:"contacted",children:"Contacted"}),(0,c.jsx)("option",{value:"confirmed",children:"Confirmed"}),(0,c.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Created"}),(0,c.jsx)(P,{children:tn(fe.createdAt)})]})]}),(0,c.jsx)(N,{children:"Customer Info"}),(0,c.jsxs)(I,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Name"}),(0,c.jsx)(P,{children:fe.name})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Email"}),(0,c.jsx)(P,{children:fe.email})]}),fe.phone&&(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Phone"}),(0,c.jsx)(P,{children:fe.phone})]}),fe.company_name&&(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Company"}),(0,c.jsx)(P,{children:fe.company_name})]})]}),(0,c.jsx)(N,{children:"Linked User"}),fe.user?(0,c.jsxs)(K,{children:[(0,c.jsxs)(V,{children:[(0,c.jsx)("strong",{children:fe.user.full_name}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",fe.user.email,")"]}),(0,c.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:fe.user.role})]}),(0,c.jsx)(U,{onClick:en,children:"Change"})]}):(0,c.jsxs)(K,{style:{background:"#F9FAFB"},children:[(0,c.jsx)(V,{style:{color:"#6B7280"},children:"Not linked"}),(0,c.jsx)(U,{variant:"primary",onClick:en,children:"Link User"})]}),(0,c.jsx)(N,{children:"Quote Details"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,c.jsxs)(Z,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:fe.package_name}),(0,c.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",fe.set_group," - ",fe.set_tier,")"]})]}),(0,c.jsx)("div",{style:{fontWeight:600},children:(0,l.vv)(fe.package_price,an)})]}),fe.addon_items&&fe.addon_items.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),fe.addon_items.map((e,n)=>(0,c.jsxs)(Z,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,l.vv)(e.price*e.quantity,an)})]},n))]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("div",{children:"Total"}),(0,c.jsx)("div",{children:(0,l.vv)(fe.total_amount,an)})]})]}),fe.message&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{children:"Customer Message"}),(0,c.jsx)(H,{children:fe.message})]}),(0,c.jsx)(N,{children:"Admin Notes"}),(0,c.jsxs)(R,{style:{marginBottom:0},children:[(0,c.jsx)(M,{value:Fe,onChange:e=>we(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,c.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,c.jsx)(U,{variant:"primary",onClick:async()=>{if(fe){Ce(!0);try{const e=Ye();(await fetch(`/api/hardware-quotes/${fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Fe})})).ok&&ve(e=>e?{...e,admin_notes:Fe}:null)}catch(e){console.error("Error saving notes:",e)}finally{Ce(!1)}}},disabled:Ae||Fe===(fe.admin_notes||""),children:Ae?"Saving...":"Save Notes"})})]}),fe.invoice&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{children:"Invoice"}),(0,c.jsx)(te,{children:(0,c.jsxs)(I,{style:{marginBottom:0},children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Invoice Number"}),(0,c.jsx)(P,{style:{fontFamily:"monospace"},children:fe.invoice.invoice_number})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Status"}),(0,c.jsx)(P,{children:(0,c.jsx)(S,{status:fe.invoice.status,children:on(fe.invoice.status)})})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(L,{children:"Amount"}),(0,c.jsx)(P,{style:{fontWeight:600},children:(0,l.vv)(fe.invoice.total_amount,fe.invoice.currency)})]})]})})]})]}),Ee&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ze(!1),title:"Link User to Quote",footer:(0,c.jsx)(U,{onClick:()=>ze(!1),children:"Cancel"}),children:[(0,c.jsxs)(R,{children:[(0,c.jsx)(J,{children:"Search users by name or email"}),(0,c.jsx)(W,{value:Se,onChange:e=>_e(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Te&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),$e.length>0&&(0,c.jsx)(X,{children:$e.map(e=>(0,c.jsxs)(ee,{onClick:()=>(async e=>{if(fe)try{const n=Ye();(await fetch(`/api/hardware-quotes/${fe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(ze(!1),Xe(fe))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,c.jsx)(ne,{children:e.full_name}),(0,c.jsxs)(re,{children:[e.email," - ",e.role]})]},e.id))}),Se.length>=2&&!Te&&0===$e.length&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),Ne&&fe&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ie(!1),title:"Create Invoice from Quote",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(U,{onClick:()=>Ie(!1),children:"Cancel"}),(0,c.jsx)(U,{variant:"primary",onClick:async()=>{if(fe){We(!0);try{const e=Ye(),n={due_date:Oe};"none"!==Pe&&Ue&&(n.discount_type=Pe,n.discount_value=parseFloat(Ue));const r=Re.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const t=await fetch(`/api/hardware-quotes/${fe.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(t.ok)Ie(!1),je(!1),Ze();else{const e=await t.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{We(!1)}}},disabled:Me,children:Me?"Creating...":"Create Invoice"})]}),children:[(0,c.jsx)(N,{style:{marginTop:0},children:"Quote Summary"}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,c.jsxs)(Z,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:fe.package_name})," (",fe.set_group," - ",fe.set_tier,")"]}),(0,c.jsx)("div",{children:(0,l.vv)(fe.package_price,an)})]}),fe.addon_items&&fe.addon_items.map((e,n)=>(0,c.jsxs)(Z,{children:[(0,c.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,c.jsx)("div",{children:(0,l.vv)(e.price*e.quantity,an)})]},n)),(0,c.jsxs)(G,{children:[(0,c.jsx)("div",{children:"Subtotal"}),(0,c.jsx)("div",{children:(0,l.vv)(fe.total_amount,an)})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(J,{children:"Due Date"}),(0,c.jsx)(W,{type:"date",value:Oe,onChange:e=>Le(e.target.value)})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(J,{children:"Discount"}),(0,c.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,c.jsxs)(Y,{style:{width:"auto",minWidth:150},value:Pe,onChange:e=>Qe(e.target.value),children:[(0,c.jsx)("option",{value:"none",children:"No Discount"}),(0,c.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==Pe&&(0,c.jsx)(W,{type:"number",min:"0",step:"0.01",value:Ue,onChange:e=>He(e.target.value),placeholder:"percentage"===Pe?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(J,{children:"Additional Charges"}),Re.map((e,n)=>(0,c.jsxs)(ie,{children:[(0,c.jsx)(oe,{children:(0,c.jsx)(W,{value:e.name,onChange:e=>rn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,c.jsx)(oe,{children:(0,c.jsx)(W,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>rn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,c.jsx)(U,{variant:"danger",onClick:()=>{return e=n,void Je(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,c.jsx)(U,{onClick:()=>{Je(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,c.jsxs)(G,{style:{fontSize:18},children:[(0,c.jsx)("div",{children:"Invoice Total"}),(0,c.jsx)("div",{children:(0,l.vv)((()=>{if(!fe)return 0;let e=fe.total_amount;return"percentage"===Pe&&Ue?e-=e*(parseFloat(Ue)/100):"fixed"===Pe&&Ue&&(e-=parseFloat(Ue)),Re.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),an)})]})]}),ke&&(0,c.jsx)(a.aF,{isOpen:!0,onClose:()=>Be(!1),title:"Confirm Delete",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(U,{onClick:()=>Be(!1),children:"Cancel"}),(0,c.jsx)(U,{variant:"danger",onClick:async()=>{if(fe)try{const e=Ye();await fetch(`/api/hardware-quotes/${fe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Be(!1),je(!1),Ze()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,c.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,c.jsx)("strong",{children:null===fe||void 0===fe?void 0:fe.quote_number}),"? This action cannot be undone."]})})]})})}}}]);