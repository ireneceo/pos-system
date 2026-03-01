"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{1472:(e,t,r)=>{r.d(t,{A:()=>i});r(9950);var n=r(9610),o=r(4414);const i=e=>{let{isOpen:t,onClose:r,onConfirm:i,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const x=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.yl,{variant:"secondary",onClick:r,children:d}),(0,o.jsx)(n.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:i,children:l})]});return(0,o.jsx)(n.aF,{isOpen:t,onClose:r,title:a,footer:x,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,l=e=>{let{children:t,className:r,style:n,...a}=e;return(0,o.jsx)(i,{className:r,style:n,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,o.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,o.jsx)(s,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
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
`,a=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,o.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,o.jsx)(a,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,o.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),o=r(4492);function i(e){const[t,r]=(0,o.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},3705:(e,t,r)=>{r.d(t,{cc:()=>o});var n=r(4752);const o=n.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9647:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var n=r(9950),o=r(4752),i=r(3705),a=r(9610),s=r(1472),l=r(6649),d=r(2597),c=r(2653),x=r(2488),h=r(4414);const p=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,u=o.Ay.div`
  display: grid;
  gap: 12px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,m=o.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,b=o.Ay.div`
  flex: 1;
`,v=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,y=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,j=o.Ay.div`
  display: flex;
  gap: 8px;
`,f=o.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`,w=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h3 {
    font-size: 18px;
    color: #1F2937;
    margin: 16px 0 8px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin-bottom: 24px;
  }
`,C=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
`,A=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,F=o.Ay.div`
  display: flex;
  gap: 12px;
`,E=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,_=o.Ay.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,z=o.Ay.div`
  border: 2px dashed #E5E7EB;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: #F9FAFB;
  }

  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin: 0;
  }
`,S=(0,o.Ay)(x.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,D=()=>{const[e,t]=(0,c.M)("blog"),[r,o]=(0,n.useState)([]),[D,T]=(0,n.useState)([]),[L,$]=(0,n.useState)(!0),[I,O]=(0,n.useState)(""),[R,N]=(0,n.useState)("all"),[Q,P]=(0,n.useState)("all"),[U,q]=(0,n.useState)(!1),[Z,J]=(0,n.useState)(null),[M,W]=(0,n.useState)(!1),[H,Y]=(0,n.useState)(null),[G,K]=(0,n.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[V,X]=(0,n.useState)(""),ee=()=>e.includes("blog")?"blog":"faq",te=e.includes("categories");(0,n.useEffect)(()=>{re()},[e]);const re=async()=>{$(!0);const e=ee();try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,n]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(r.ok){const e=await r.json();o(e)}if(n.ok){const e=await n.json();T(e.items||[])}}catch(t){console.error("Error fetching data:",t)}$(!1)},ne=e=>{t(e),q(!1),J(null)},oe=async()=>{if(null!==Z&&void 0!==Z&&Z.title&&null!==Z&&void 0!==Z&&Z.content&&null!==Z&&void 0!==Z&&Z.category_id)try{const e=localStorage.getItem("auth_token"),t=!Z.id,r=ee();(await fetch(t?"/api/contents":`/api/contents/${Z.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,category_id:Z.category_id,title:Z.title,content:Z.content,excerpt:Z.excerpt,thumbnail_url:Z.thumbnail_url,status:Z.status||"draft",seo_title:Z.seo_title,seo_description:Z.seo_description,seo_keywords:Z.seo_keywords,og_image_url:Z.og_image_url,ai_summary:Z.ai_summary})})).ok&&(X(t?"Content created successfully":"Content updated successfully"),q(!1),J(null),re(),setTimeout(()=>X(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},ie=D.filter(e=>!(I&&!e.title.toLowerCase().includes(I.toLowerCase()))&&(("all"===R||e.status===R)&&("all"===Q||e.category_id===parseInt(Q)))),ae={total:D.length,published:D.filter(e=>"published"===e.status).length,draft:D.filter(e=>"draft"===e.status).length,categories:r.length},se=ee(),le=()=>{var e;return(0,h.jsxs)(C,{children:[(0,h.jsxs)(k,{children:[(0,h.jsxs)(A,{children:[null!==Z&&void 0!==Z&&Z.id?"Edit":"New"," ","blog"===se?"Blog Post":"FAQ Item"]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(i.cc,{variant:"secondary",onClick:()=>{q(!1),J(null)},children:"Cancel"}),(0,h.jsx)(i.cc,{variant:"secondary",onClick:()=>{J({...Z,status:"draft"}),oe()},children:"Save as Draft"}),(0,h.jsx)(i.cc,{onClick:()=>{J({...Z,status:"published"}),oe()},children:"Publish"})]})]}),(0,h.jsxs)(E,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Title *"}),(0,h.jsx)(a.ZQ,{value:(null===Z||void 0===Z?void 0:Z.title)||"",onChange:e=>J({...Z,title:e.target.value}),placeholder:"blog"===se?"Enter post title":"Enter question"})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Category *"}),(0,h.jsxs)(x.Jt,{value:(null===Z||void 0===Z||null===(e=Z.category_id)||void 0===e?void 0:e.toString())||"",onChange:e=>J({...Z,category_id:parseInt(e.target.value)}),children:[(0,h.jsx)("option",{value:"",children:"Select category"}),r.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===se&&(0,h.jsxs)(B,{children:[(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Excerpt"}),(0,h.jsx)(a.Lz,{value:(null===Z||void 0===Z?void 0:Z.excerpt)||"",onChange:e=>J({...Z,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Thumbnail"}),(0,h.jsxs)(z,{children:[null!==Z&&void 0!==Z&&Z.thumbnail_url?(0,h.jsx)("img",{src:Z.thumbnail_url,alt:"Thumbnail"}):(0,h.jsx)("p",{children:"Click to upload thumbnail image"}),(0,h.jsx)(a.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.thumbnail_url)||"",onChange:e=>J({...Z,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"blog"===se?"Content *":"Answer *"}),(0,h.jsx)(_,{value:(null===Z||void 0===Z?void 0:Z.content)||"",onChange:e=>J({...Z,content:e.target.value}),placeholder:"blog"===se?"Write your blog post content...":"Write the answer to this question..."})]}),(0,h.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,h.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"AI Summary (for AI citation)"}),(0,h.jsx)(a.Lz,{value:(null===Z||void 0===Z?void 0:Z.ai_summary)||"",onChange:e=>J({...Z,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,h.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===Z||void 0===Z?void 0:Z.ai_summary)||"").length,"/500 characters"]})]}),"blog"===se&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"SEO Title (max 70 chars)"}),(0,h.jsx)(a.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.seo_title)||"",onChange:e=>J({...Z,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"OG Image URL"}),(0,h.jsx)(a.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.og_image_url)||"",onChange:e=>J({...Z,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"SEO Description (max 160 chars)"}),(0,h.jsx)(a.Lz,{value:(null===Z||void 0===Z?void 0:Z.seo_description)||"",onChange:e=>J({...Z,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,h.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===Z||void 0===Z?void 0:Z.seo_description)||"").length,"/160 characters"]})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"SEO Keywords (comma separated)"}),(0,h.jsx)(a.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.seo_keywords)||"",onChange:e=>J({...Z,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.mc,{children:[(0,h.jsx)(l.Y9,{children:(0,h.jsx)(l.hE,{children:"Content"})}),V&&(0,h.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:V}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(d.tU,{children:[(0,h.jsx)(d.oz,{active:"blog"===e,onClick:()=>ne("blog"),children:"Blog"}),(0,h.jsx)(d.oz,{active:"blog-categories"===e,onClick:()=>ne("blog-categories"),children:"Blog Categories"}),(0,h.jsx)(d.oz,{active:"faq"===e,onClick:()=>ne("faq"),children:"FAQ"}),(0,h.jsx)(d.oz,{active:"faq-categories"===e,onClick:()=>ne("faq-categories"),children:"FAQ Categories"})]}),te?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(x.DO,{type:"text",placeholder:"Search categories...",value:I,onChange:e=>O(e.target.value),style:{maxWidth:"300px"}}),(0,h.jsx)("div",{style:{marginLeft:"auto"},children:(0,h.jsx)(i.cc,{onClick:()=>{Y({type:se}),W(!0)},children:"Add Category"})})]}),(0,h.jsx)(u,{children:0===r.length?(0,h.jsxs)(w,{children:[(0,h.jsx)("h3",{children:"No categories yet"}),(0,h.jsxs)("p",{children:["Create your first category to organize your ","blog"===se?"blog posts":"FAQ items"]}),(0,h.jsx)(i.cc,{onClick:()=>{Y({type:se}),W(!0)},children:"Add Category"})]}):r.filter(e=>!I||e.name.toLowerCase().includes(I.toLowerCase())).map(e=>(0,h.jsxs)(g,{isActive:e.is_active,children:[(0,h.jsx)(m,{children:e.icon||"\ud83d\udcc1"}),(0,h.jsxs)(b,{children:[(0,h.jsx)(v,{children:e.name}),(0,h.jsxs)(y,{children:[e.content_count," ","blog"===se?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{onClick:()=>{Y(e),W(!0)},children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,h.jsx)(f,{onClick:()=>(async e=>{K({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(r.ok)X("Category deleted successfully"),re(),setTimeout(()=>X(""),3e3);else{const e=await r.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}K({...G,show:!1})}})})(e.id),children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{children:[(0,h.jsx)(l.Os,{children:ae.total}),(0,h.jsxs)(l.v0,{children:["Total ","blog"===se?"Posts":"FAQs"]})]}),(0,h.jsxs)(l.hI,{children:[(0,h.jsx)(l.Os,{children:ae.published}),(0,h.jsx)(l.v0,{children:"Published"})]}),(0,h.jsxs)(l.hI,{children:[(0,h.jsx)(l.Os,{children:ae.draft}),(0,h.jsx)(l.v0,{children:"Drafts"})]}),(0,h.jsxs)(l.hI,{children:[(0,h.jsx)(l.Os,{children:ae.categories}),(0,h.jsx)(l.v0,{children:"Categories"})]})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(x.DO,{type:"text",placeholder:"Search...",value:I,onChange:e=>O(e.target.value)}),(0,h.jsxs)(x.Jt,{value:R,onChange:e=>N(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"published",children:"Published"}),(0,h.jsx)("option",{value:"draft",children:"Draft"})]}),(0,h.jsxs)(x.Jt,{value:Q,onChange:e=>P(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),r.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,h.jsx)("div",{style:{marginLeft:"auto"},children:(0,h.jsxs)(i.cc,{onClick:()=>{J({type:se}),q(!0)},children:["New ","blog"===se?"Post":"FAQ"]})})]}),U?le():0===ie.length?(0,h.jsxs)(w,{children:[(0,h.jsx)("h3",{children:"No content yet"}),(0,h.jsxs)("p",{children:["Create your first ","blog"===se?"blog post":"FAQ item"]}),(0,h.jsxs)(i.cc,{onClick:()=>{J({type:se}),q(!0)},children:["New ","blog"===se?"Post":"FAQ"]})]}):(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,h.jsx)("span",{children:"Title"}),(0,h.jsx)("span",{children:"Category"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Date"}),(0,h.jsx)("span",{children:"Actions"})]}),ie.map(e=>{var t,r;return(0,h.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:e.title}),"blog"===se&&e.view_count>0&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,h.jsxs)("div",{children:[null===(t=e.category)||void 0===t?void 0:t.icon," ",null===(r=e.category)||void 0===r?void 0:r.name]}),(0,h.jsx)("div",{children:(0,h.jsx)(p,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,h.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.rA,{onClick:()=>{J(e),q(!0)},children:"Edit"}),(0,h.jsx)(l.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),r="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===r?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),X("published"===r?"Content published":"Content unpublished"),re(),setTimeout(()=>X(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,h.jsx)(l.rA,{onClick:()=>(async e=>{K({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),X("Content deleted successfully"),re(),setTimeout(()=>X(""),3e3)}catch(t){console.error("Error deleting content:",t)}K({...G,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,h.jsxs)(a.aF,{isOpen:M,onClose:()=>{W(!1),Y(null)},title:null!==H&&void 0!==H&&H.id?"Edit Category":"New Category",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a.yl,{variant:"secondary",onClick:()=>{W(!1),Y(null)},children:"Cancel"}),(0,h.jsx)(a.yl,{onClick:async()=>{if(null!==H&&void 0!==H&&H.name)try{const e=localStorage.getItem("auth_token"),t=!H.id,r=ee(),n=await fetch(t?"/api/contents/categories":`/api/contents/categories/${H.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,name:H.name,description:H.description,icon:H.icon})});if(n.ok)X(t?"Category created successfully":"Category updated successfully"),W(!1),Y(null),re(),setTimeout(()=>X(""),3e3);else{const e=await n.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},children:null!==H&&void 0!==H&&H.id?"Update":"Create"})]}),children:[(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Name *"}),(0,h.jsx)(a.ZQ,{value:(null===H||void 0===H?void 0:H.name)||"",onChange:e=>Y({...H,name:e.target.value}),placeholder:"Category name"})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Icon (emoji)"}),(0,h.jsx)(a.ZQ,{value:(null===H||void 0===H?void 0:H.icon)||"",onChange:e=>Y({...H,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,h.jsxs)(a.gE,{children:[(0,h.jsx)(a.lR,{children:"Description"}),(0,h.jsx)(a.Lz,{value:(null===H||void 0===H?void 0:H.description)||"",onChange:e=>Y({...H,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,h.jsx)(s.A,{isOpen:G.show,title:G.title,message:G.message,onConfirm:G.onConfirm,onClose:()=>K({...G,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);