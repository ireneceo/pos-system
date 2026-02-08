"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{1472:(e,t,r)=>{r.d(t,{A:()=>o});r(9950);var n=r(9610),i=r(4414);const o=e=>{let{isOpen:t,onClose:r,onConfirm:o,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const x=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.yl,{variant:"secondary",onClick:r,children:d}),(0,i.jsx)(n.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:l})]});return(0,i.jsx)(n.aF,{isOpen:t,onClose:r,title:a,footer:x,children:(0,i.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,i.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,i.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:n,...a}=e;return(0,i.jsx)(o,{className:r,style:n,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},3705:(e,t,r)=>{r.d(t,{cc:()=>i});var n=r(4752);const i=n.Ay.button`
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
`},9647:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(9950),i=r(4492),o=r(4752),a=r(3310),s=r(3705),l=r(9610),d=r(1472),c=r(2674),x=r(1313),h=r(2488),p=r(4414);const u=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,g=o.Ay.div`
  display: grid;
  gap: 12px;
`,m=o.Ay.div`
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
`,b=o.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,y=o.Ay.div`
  flex: 1;
`,j=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,v=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,f=o.Ay.div`
  display: flex;
  gap: 8px;
`,w=o.Ay.button`
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
`,C=o.Ay.div`
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
`,k=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`,A=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
`,E=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,F=o.Ay.div`
  display: flex;
  gap: 12px;
`,B=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`,_=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,S=o.Ay.textarea`
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
`,D=(0,o.Ay)(h.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,T=()=>{const[e,t]=(0,i.ok)(),r=e.get("tab")||"blog",[o,T]=(0,n.useState)(r),[L,$]=(0,n.useState)([]),[I,O]=(0,n.useState)([]),[R,Q]=(0,n.useState)(!0),[P,N]=(0,n.useState)(""),[U,q]=(0,n.useState)("all"),[Z,J]=(0,n.useState)("all"),[W,H]=(0,n.useState)(!1),[M,Y]=(0,n.useState)(null),[G,K]=(0,n.useState)(!1),[V,X]=(0,n.useState)(null),[ee,te]=(0,n.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[re,ne]=(0,n.useState)(""),ie=()=>o.includes("blog")?"blog":"faq",oe=o.includes("categories");(0,n.useEffect)(()=>{ae(),t({tab:o})},[o]);const ae=async()=>{Q(!0);const e=ie();try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,n]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(r.ok){const e=await r.json();$(e)}if(n.ok){const e=await n.json();O(e.items||[])}}catch(t){console.error("Error fetching data:",t)}Q(!1)},se=e=>{T(e),H(!1),Y(null)},le=async()=>{if(null!==M&&void 0!==M&&M.title&&null!==M&&void 0!==M&&M.content&&null!==M&&void 0!==M&&M.category_id)try{const e=localStorage.getItem("auth_token"),t=!M.id,r=ie();(await fetch(t?"/api/contents":`/api/contents/${M.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,category_id:M.category_id,title:M.title,content:M.content,excerpt:M.excerpt,thumbnail_url:M.thumbnail_url,status:M.status||"draft",seo_title:M.seo_title,seo_description:M.seo_description,seo_keywords:M.seo_keywords,og_image_url:M.og_image_url,ai_summary:M.ai_summary})})).ok&&(ne(t?"Content created successfully":"Content updated successfully"),H(!1),Y(null),ae(),setTimeout(()=>ne(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},de=I.filter(e=>!(P&&!e.title.toLowerCase().includes(P.toLowerCase()))&&(("all"===U||e.status===U)&&("all"===Z||e.category_id===parseInt(Z)))),ce={total:I.length,published:I.filter(e=>"published"===e.status).length,draft:I.filter(e=>"draft"===e.status).length,categories:L.length},xe=ie(),he=()=>{var e;return(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[null!==M&&void 0!==M&&M.id?"Edit":"New"," ","blog"===xe?"Blog Post":"FAQ Item"]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(s.cc,{variant:"secondary",onClick:()=>{H(!1),Y(null)},children:"Cancel"}),(0,p.jsx)(s.cc,{variant:"secondary",onClick:()=>{Y({...M,status:"draft"}),le()},children:"Save as Draft"}),(0,p.jsx)(s.cc,{onClick:()=>{Y({...M,status:"published"}),le()},children:"Publish"})]})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(_,{children:[(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Title *"}),(0,p.jsx)(l.ZQ,{value:(null===M||void 0===M?void 0:M.title)||"",onChange:e=>Y({...M,title:e.target.value}),placeholder:"blog"===xe?"Enter post title":"Enter question"})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Category *"}),(0,p.jsxs)(h.Jt,{value:(null===M||void 0===M||null===(e=M.category_id)||void 0===e?void 0:e.toString())||"",onChange:e=>Y({...M,category_id:parseInt(e.target.value)}),children:[(0,p.jsx)("option",{value:"",children:"Select category"}),L.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===xe&&(0,p.jsxs)(_,{children:[(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Excerpt"}),(0,p.jsx)(l.Lz,{value:(null===M||void 0===M?void 0:M.excerpt)||"",onChange:e=>Y({...M,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Thumbnail"}),(0,p.jsxs)(z,{children:[null!==M&&void 0!==M&&M.thumbnail_url?(0,p.jsx)("img",{src:M.thumbnail_url,alt:"Thumbnail"}):(0,p.jsx)("p",{children:"Click to upload thumbnail image"}),(0,p.jsx)(l.ZQ,{type:"text",value:(null===M||void 0===M?void 0:M.thumbnail_url)||"",onChange:e=>Y({...M,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"blog"===xe?"Content *":"Answer *"}),(0,p.jsx)(S,{value:(null===M||void 0===M?void 0:M.content)||"",onChange:e=>Y({...M,content:e.target.value}),placeholder:"blog"===xe?"Write your blog post content...":"Write the answer to this question..."})]}),(0,p.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,p.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"AI Summary (for AI citation)"}),(0,p.jsx)(l.Lz,{value:(null===M||void 0===M?void 0:M.ai_summary)||"",onChange:e=>Y({...M,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===M||void 0===M?void 0:M.ai_summary)||"").length,"/500 characters"]})]}),"blog"===xe&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(_,{children:[(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"SEO Title (max 70 chars)"}),(0,p.jsx)(l.ZQ,{type:"text",value:(null===M||void 0===M?void 0:M.seo_title)||"",onChange:e=>Y({...M,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"OG Image URL"}),(0,p.jsx)(l.ZQ,{type:"text",value:(null===M||void 0===M?void 0:M.og_image_url)||"",onChange:e=>Y({...M,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"SEO Description (max 160 chars)"}),(0,p.jsx)(l.Lz,{value:(null===M||void 0===M?void 0:M.seo_description)||"",onChange:e=>Y({...M,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===M||void 0===M?void 0:M.seo_description)||"").length,"/160 characters"]})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"SEO Keywords (comma separated)"}),(0,p.jsx)(l.ZQ,{type:"text",value:(null===M||void 0===M?void 0:M.seo_keywords)||"",onChange:e=>Y({...M,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,p.jsxs)(a.A,{children:[(0,p.jsxs)(c.mc,{children:[(0,p.jsx)(c.Y9,{children:(0,p.jsx)(c.hE,{children:"Content"})}),re&&(0,p.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:re}),(0,p.jsxs)(c.UC,{children:[(0,p.jsxs)(x.j,{children:[(0,p.jsx)(x.oz,{active:"blog"===o,onClick:()=>se("blog"),children:"Blog"}),(0,p.jsx)(x.oz,{active:"blog-categories"===o,onClick:()=>se("blog-categories"),children:"Blog Categories"}),(0,p.jsx)(x.oz,{active:"faq"===o,onClick:()=>se("faq"),children:"FAQ"}),(0,p.jsx)(x.oz,{active:"faq-categories"===o,onClick:()=>se("faq-categories"),children:"FAQ Categories"})]}),oe?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(h.DO,{type:"text",placeholder:"Search categories...",value:P,onChange:e=>N(e.target.value),style:{maxWidth:"300px"}}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsx)(s.cc,{onClick:()=>{X({type:xe}),K(!0)},children:"Add Category"})})]}),(0,p.jsx)(g,{children:0===L.length?(0,p.jsxs)(C,{children:[(0,p.jsx)("h3",{children:"No categories yet"}),(0,p.jsxs)("p",{children:["Create your first category to organize your ","blog"===xe?"blog posts":"FAQ items"]}),(0,p.jsx)(s.cc,{onClick:()=>{X({type:xe}),K(!0)},children:"Add Category"})]}):L.filter(e=>!P||e.name.toLowerCase().includes(P.toLowerCase())).map(e=>(0,p.jsxs)(m,{isActive:e.is_active,children:[(0,p.jsx)(b,{children:e.icon||"\ud83d\udcc1"}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:e.name}),(0,p.jsxs)(v,{children:[e.content_count," ","blog"===xe?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(w,{onClick:()=>{X(e),K(!0)},children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,p.jsx)(w,{onClick:()=>(async e=>{te({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(r.ok)ne("Category deleted successfully"),ae(),setTimeout(()=>ne(""),3e3);else{const e=await r.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}te({...ee,show:!1})}})})(e.id),children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:ce.total}),(0,p.jsxs)(c.v0,{children:["Total ","blog"===xe?"Posts":"FAQs"]})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:ce.published}),(0,p.jsx)(c.v0,{children:"Published"})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:ce.draft}),(0,p.jsx)(c.v0,{children:"Drafts"})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:ce.categories}),(0,p.jsx)(c.v0,{children:"Categories"})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(h.DO,{type:"text",placeholder:"Search...",value:P,onChange:e=>N(e.target.value)}),(0,p.jsxs)(h.Jt,{value:U,onChange:e=>q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"published",children:"Published"}),(0,p.jsx)("option",{value:"draft",children:"Draft"})]}),(0,p.jsxs)(h.Jt,{value:Z,onChange:e=>J(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),L.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsxs)(s.cc,{onClick:()=>{Y({type:xe}),H(!0)},children:["New ","blog"===xe?"Post":"FAQ"]})})]}),W?he():0===de.length?(0,p.jsxs)(C,{children:[(0,p.jsx)("h3",{children:"No content yet"}),(0,p.jsxs)("p",{children:["Create your first ","blog"===xe?"blog post":"FAQ item"]}),(0,p.jsxs)(s.cc,{onClick:()=>{Y({type:xe}),H(!0)},children:["New ","blog"===xe?"Post":"FAQ"]})]}):(0,p.jsxs)(c.XI,{children:[(0,p.jsxs)(c.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsx)("span",{children:"Title"}),(0,p.jsx)("span",{children:"Category"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Date"}),(0,p.jsx)("span",{children:"Actions"})]}),de.map(e=>{var t,r;return(0,p.jsxs)(c.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:e.title}),"blog"===xe&&e.view_count>0&&(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,p.jsxs)("div",{children:[null===(t=e.category)||void 0===t?void 0:t.icon," ",null===(r=e.category)||void 0===r?void 0:r.name]}),(0,p.jsx)("div",{children:(0,p.jsx)(u,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,p.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,p.jsxs)(c.wr,{children:[(0,p.jsx)(c.rA,{onClick:()=>{Y(e),H(!0)},children:"Edit"}),(0,p.jsx)(c.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),r="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===r?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),ne("published"===r?"Content published":"Content unpublished"),ae(),setTimeout(()=>ne(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,p.jsx)(c.rA,{onClick:()=>(async e=>{te({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),ne("Content deleted successfully"),ae(),setTimeout(()=>ne(""),3e3)}catch(t){console.error("Error deleting content:",t)}te({...ee,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,p.jsxs)(l.aF,{isOpen:G,onClose:()=>{K(!1),X(null)},title:null!==V&&void 0!==V&&V.id?"Edit Category":"New Category",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>{K(!1),X(null)},children:"Cancel"}),(0,p.jsx)(l.yl,{onClick:async()=>{if(null!==V&&void 0!==V&&V.name)try{const e=localStorage.getItem("auth_token"),t=!V.id,r=ie(),n=await fetch(t?"/api/contents/categories":`/api/contents/categories/${V.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,name:V.name,description:V.description,icon:V.icon})});if(n.ok)ne(t?"Category created successfully":"Category updated successfully"),K(!1),X(null),ae(),setTimeout(()=>ne(""),3e3);else{const e=await n.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},children:null!==V&&void 0!==V&&V.id?"Update":"Create"})]}),children:[(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Name *"}),(0,p.jsx)(l.ZQ,{value:(null===V||void 0===V?void 0:V.name)||"",onChange:e=>X({...V,name:e.target.value}),placeholder:"Category name"})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Icon (emoji)"}),(0,p.jsx)(l.ZQ,{value:(null===V||void 0===V?void 0:V.icon)||"",onChange:e=>X({...V,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,p.jsxs)(l.gE,{children:[(0,p.jsx)(l.lR,{children:"Description"}),(0,p.jsx)(l.Lz,{value:(null===V||void 0===V?void 0:V.description)||"",onChange:e=>X({...V,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,p.jsx)(d.A,{isOpen:ee.show,title:ee.title,message:ee.message,onConfirm:ee.onConfirm,onClose:()=>te({...ee,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);