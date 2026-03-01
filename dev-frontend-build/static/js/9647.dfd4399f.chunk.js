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
`},9647:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var n=r(9950),i=r(4492),o=r(4752),a=r(3705),s=r(9610),l=r(1472),d=r(7960),c=r(1313),x=r(2488),h=r(4414);const p=o.Ay.span`
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
`,y=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,j=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,v=o.Ay.div`
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
`,E=o.Ay.div`
  display: flex;
  gap: 12px;
`,F=o.Ay.div`
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
`,S=o.Ay.div`
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
`,z=(0,o.Ay)(x.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,D=()=>{const[e,t]=(0,i.ok)(),r=e.get("tab")||"blog",[o,D]=(0,n.useState)(r),[T,L]=(0,n.useState)([]),[$,I]=(0,n.useState)([]),[O,R]=(0,n.useState)(!0),[Q,P]=(0,n.useState)(""),[N,U]=(0,n.useState)("all"),[q,Z]=(0,n.useState)("all"),[J,W]=(0,n.useState)(!1),[H,M]=(0,n.useState)(null),[Y,G]=(0,n.useState)(!1),[K,V]=(0,n.useState)(null),[X,ee]=(0,n.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[te,re]=(0,n.useState)(""),ne=()=>o.includes("blog")?"blog":"faq",ie=o.includes("categories");(0,n.useEffect)(()=>{oe(),t({tab:o})},[o]);const oe=async()=>{R(!0);const e=ne();try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,n]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(r.ok){const e=await r.json();L(e)}if(n.ok){const e=await n.json();I(e.items||[])}}catch(t){console.error("Error fetching data:",t)}R(!1)},ae=e=>{D(e),W(!1),M(null)},se=async()=>{if(null!==H&&void 0!==H&&H.title&&null!==H&&void 0!==H&&H.content&&null!==H&&void 0!==H&&H.category_id)try{const e=localStorage.getItem("auth_token"),t=!H.id,r=ne();(await fetch(t?"/api/contents":`/api/contents/${H.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,category_id:H.category_id,title:H.title,content:H.content,excerpt:H.excerpt,thumbnail_url:H.thumbnail_url,status:H.status||"draft",seo_title:H.seo_title,seo_description:H.seo_description,seo_keywords:H.seo_keywords,og_image_url:H.og_image_url,ai_summary:H.ai_summary})})).ok&&(re(t?"Content created successfully":"Content updated successfully"),W(!1),M(null),oe(),setTimeout(()=>re(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},le=$.filter(e=>!(Q&&!e.title.toLowerCase().includes(Q.toLowerCase()))&&(("all"===N||e.status===N)&&("all"===q||e.category_id===parseInt(q)))),de={total:$.length,published:$.filter(e=>"published"===e.status).length,draft:$.filter(e=>"draft"===e.status).length,categories:T.length},ce=ne(),xe=()=>{var e;return(0,h.jsxs)(C,{children:[(0,h.jsxs)(k,{children:[(0,h.jsxs)(A,{children:[null!==H&&void 0!==H&&H.id?"Edit":"New"," ","blog"===ce?"Blog Post":"FAQ Item"]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(a.cc,{variant:"secondary",onClick:()=>{W(!1),M(null)},children:"Cancel"}),(0,h.jsx)(a.cc,{variant:"secondary",onClick:()=>{M({...H,status:"draft"}),se()},children:"Save as Draft"}),(0,h.jsx)(a.cc,{onClick:()=>{M({...H,status:"published"}),se()},children:"Publish"})]})]}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Title *"}),(0,h.jsx)(s.ZQ,{value:(null===H||void 0===H?void 0:H.title)||"",onChange:e=>M({...H,title:e.target.value}),placeholder:"blog"===ce?"Enter post title":"Enter question"})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Category *"}),(0,h.jsxs)(x.Jt,{value:(null===H||void 0===H||null===(e=H.category_id)||void 0===e?void 0:e.toString())||"",onChange:e=>M({...H,category_id:parseInt(e.target.value)}),children:[(0,h.jsx)("option",{value:"",children:"Select category"}),T.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===ce&&(0,h.jsxs)(B,{children:[(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Excerpt"}),(0,h.jsx)(s.Lz,{value:(null===H||void 0===H?void 0:H.excerpt)||"",onChange:e=>M({...H,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Thumbnail"}),(0,h.jsxs)(S,{children:[null!==H&&void 0!==H&&H.thumbnail_url?(0,h.jsx)("img",{src:H.thumbnail_url,alt:"Thumbnail"}):(0,h.jsx)("p",{children:"Click to upload thumbnail image"}),(0,h.jsx)(s.ZQ,{type:"text",value:(null===H||void 0===H?void 0:H.thumbnail_url)||"",onChange:e=>M({...H,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"blog"===ce?"Content *":"Answer *"}),(0,h.jsx)(_,{value:(null===H||void 0===H?void 0:H.content)||"",onChange:e=>M({...H,content:e.target.value}),placeholder:"blog"===ce?"Write your blog post content...":"Write the answer to this question..."})]}),(0,h.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,h.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"AI Summary (for AI citation)"}),(0,h.jsx)(s.Lz,{value:(null===H||void 0===H?void 0:H.ai_summary)||"",onChange:e=>M({...H,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,h.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===H||void 0===H?void 0:H.ai_summary)||"").length,"/500 characters"]})]}),"blog"===ce&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(B,{children:[(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"SEO Title (max 70 chars)"}),(0,h.jsx)(s.ZQ,{type:"text",value:(null===H||void 0===H?void 0:H.seo_title)||"",onChange:e=>M({...H,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"OG Image URL"}),(0,h.jsx)(s.ZQ,{type:"text",value:(null===H||void 0===H?void 0:H.og_image_url)||"",onChange:e=>M({...H,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"SEO Description (max 160 chars)"}),(0,h.jsx)(s.Lz,{value:(null===H||void 0===H?void 0:H.seo_description)||"",onChange:e=>M({...H,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,h.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===H||void 0===H?void 0:H.seo_description)||"").length,"/160 characters"]})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"SEO Keywords (comma separated)"}),(0,h.jsx)(s.ZQ,{type:"text",value:(null===H||void 0===H?void 0:H.seo_keywords)||"",onChange:e=>M({...H,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.mc,{children:[(0,h.jsx)(d.Y9,{children:(0,h.jsx)(d.hE,{children:"Content"})}),te&&(0,h.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:te}),(0,h.jsxs)(d.UC,{children:[(0,h.jsxs)(c.j,{children:[(0,h.jsx)(c.oz,{active:"blog"===o,onClick:()=>ae("blog"),children:"Blog"}),(0,h.jsx)(c.oz,{active:"blog-categories"===o,onClick:()=>ae("blog-categories"),children:"Blog Categories"}),(0,h.jsx)(c.oz,{active:"faq"===o,onClick:()=>ae("faq"),children:"FAQ"}),(0,h.jsx)(c.oz,{active:"faq-categories"===o,onClick:()=>ae("faq-categories"),children:"FAQ Categories"})]}),ie?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(x.DO,{type:"text",placeholder:"Search categories...",value:Q,onChange:e=>P(e.target.value),style:{maxWidth:"300px"}}),(0,h.jsx)("div",{style:{marginLeft:"auto"},children:(0,h.jsx)(a.cc,{onClick:()=>{V({type:ce}),G(!0)},children:"Add Category"})})]}),(0,h.jsx)(u,{children:0===T.length?(0,h.jsxs)(w,{children:[(0,h.jsx)("h3",{children:"No categories yet"}),(0,h.jsxs)("p",{children:["Create your first category to organize your ","blog"===ce?"blog posts":"FAQ items"]}),(0,h.jsx)(a.cc,{onClick:()=>{V({type:ce}),G(!0)},children:"Add Category"})]}):T.filter(e=>!Q||e.name.toLowerCase().includes(Q.toLowerCase())).map(e=>(0,h.jsxs)(g,{isActive:e.is_active,children:[(0,h.jsx)(m,{children:e.icon||"\ud83d\udcc1"}),(0,h.jsxs)(b,{children:[(0,h.jsx)(y,{children:e.name}),(0,h.jsxs)(j,{children:[e.content_count," ","blog"===ce?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(f,{onClick:()=>{V(e),G(!0)},children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,h.jsx)(f,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(r.ok)re("Category deleted successfully"),oe(),setTimeout(()=>re(""),3e3);else{const e=await r.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}ee({...X,show:!1})}})})(e.id),children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:de.total}),(0,h.jsxs)(d.v0,{children:["Total ","blog"===ce?"Posts":"FAQs"]})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:de.published}),(0,h.jsx)(d.v0,{children:"Published"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:de.draft}),(0,h.jsx)(d.v0,{children:"Drafts"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:de.categories}),(0,h.jsx)(d.v0,{children:"Categories"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(x.DO,{type:"text",placeholder:"Search...",value:Q,onChange:e=>P(e.target.value)}),(0,h.jsxs)(x.Jt,{value:N,onChange:e=>U(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"published",children:"Published"}),(0,h.jsx)("option",{value:"draft",children:"Draft"})]}),(0,h.jsxs)(x.Jt,{value:q,onChange:e=>Z(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),T.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,h.jsx)("div",{style:{marginLeft:"auto"},children:(0,h.jsxs)(a.cc,{onClick:()=>{M({type:ce}),W(!0)},children:["New ","blog"===ce?"Post":"FAQ"]})})]}),J?xe():0===le.length?(0,h.jsxs)(w,{children:[(0,h.jsx)("h3",{children:"No content yet"}),(0,h.jsxs)("p",{children:["Create your first ","blog"===ce?"blog post":"FAQ item"]}),(0,h.jsxs)(a.cc,{onClick:()=>{M({type:ce}),W(!0)},children:["New ","blog"===ce?"Post":"FAQ"]})]}):(0,h.jsxs)(d.XI,{children:[(0,h.jsxs)(d.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,h.jsx)("span",{children:"Title"}),(0,h.jsx)("span",{children:"Category"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Date"}),(0,h.jsx)("span",{children:"Actions"})]}),le.map(e=>{var t,r;return(0,h.jsxs)(d.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:e.title}),"blog"===ce&&e.view_count>0&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,h.jsxs)("div",{children:[null===(t=e.category)||void 0===t?void 0:t.icon," ",null===(r=e.category)||void 0===r?void 0:r.name]}),(0,h.jsx)("div",{children:(0,h.jsx)(p,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,h.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,h.jsxs)(d.wr,{children:[(0,h.jsx)(d.rA,{onClick:()=>{M(e),W(!0)},children:"Edit"}),(0,h.jsx)(d.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),r="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===r?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),re("published"===r?"Content published":"Content unpublished"),oe(),setTimeout(()=>re(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,h.jsx)(d.rA,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),re("Content deleted successfully"),oe(),setTimeout(()=>re(""),3e3)}catch(t){console.error("Error deleting content:",t)}ee({...X,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,h.jsxs)(s.aF,{isOpen:Y,onClose:()=>{G(!1),V(null)},title:null!==K&&void 0!==K&&K.id?"Edit Category":"New Category",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.yl,{variant:"secondary",onClick:()=>{G(!1),V(null)},children:"Cancel"}),(0,h.jsx)(s.yl,{onClick:async()=>{if(null!==K&&void 0!==K&&K.name)try{const e=localStorage.getItem("auth_token"),t=!K.id,r=ne(),n=await fetch(t?"/api/contents/categories":`/api/contents/categories/${K.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:r,name:K.name,description:K.description,icon:K.icon})});if(n.ok)re(t?"Category created successfully":"Category updated successfully"),G(!1),V(null),oe(),setTimeout(()=>re(""),3e3);else{const e=await n.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},children:null!==K&&void 0!==K&&K.id?"Update":"Create"})]}),children:[(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Name *"}),(0,h.jsx)(s.ZQ,{value:(null===K||void 0===K?void 0:K.name)||"",onChange:e=>V({...K,name:e.target.value}),placeholder:"Category name"})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Icon (emoji)"}),(0,h.jsx)(s.ZQ,{value:(null===K||void 0===K?void 0:K.icon)||"",onChange:e=>V({...K,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,h.jsxs)(s.gE,{children:[(0,h.jsx)(s.lR,{children:"Description"}),(0,h.jsx)(s.Lz,{value:(null===K||void 0===K?void 0:K.description)||"",onChange:e=>V({...K,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,h.jsx)(l.A,{isOpen:X.show,title:X.title,message:X.message,onConfirm:X.onConfirm,onClose:()=>ee({...X,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);