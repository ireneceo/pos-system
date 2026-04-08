"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{2653:(e,n,t)=>{t.d(n,{M:()=>r});var a=t(9950),o=t(4492);function r(e){const[n,t]=(0,o.ok)(),r=(0,a.useCallback)(()=>n.get("tab")||e,[n,e]),[i,s]=(0,a.useState)(r());return[i,(0,a.useCallback)(e=>{s(e),t({tab:e})},[t])]}},3705:(e,n,t)=>{t.d(n,{cc:()=>o});var a=t(4752);const o=a.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`;a.Ay.select`
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
`,a.Ay.input`
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
`,a.Ay.div`
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
`},9647:(e,n,t)=>{t.r(n),t.d(n,{default:()=>M});var a=t(9950),o=t(4752),r=t(2853),i=t(3705),s=t(9610),l=t(1472),d=t(8409),c=t(2597),h=t(2653),g=t(2488),x=t(5030),u=t(4414);const p=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,m=o.Ay.div`
  display: grid;
  gap: 12px;
`,v=o.Ay.div`
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
`,j=o.Ay.div`
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
`,f=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,C=o.Ay.div`
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
`,k=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`,E=o.Ay.div`
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
`,_=o.Ay.div`
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
`,P=o.Ay.textarea`
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
`,z=(0,o.Ay)(g.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,M=()=>{const{t:e}=(0,x.Bd)("admin"),[n,t]=(0,h.M)("blog"),[o,M]=(0,a.useState)([]),[T,L]=(0,a.useState)([]),[,D]=(0,a.useState)(!0),[$,I]=(0,a.useState)(""),[R,Q]=(0,a.useState)("all"),[O,N]=(0,a.useState)("all"),[U,q]=(0,a.useState)(!1),[Z,W]=(0,a.useState)(null),[J,Y]=(0,a.useState)(!1),[H,K]=(0,a.useState)(null),[V,X]=(0,a.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[G,ee]=(0,a.useState)(""),ne=()=>n.includes("blog")?"blog":"faq",te=n.includes("categories");(0,a.useEffect)(()=>{ae()},[n]);const ae=async()=>{D(!0);const e=ne();try{const n={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,a]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:n}),fetch(`/api/contents?type=${e}`,{headers:n})]);if(t.ok){const e=await t.json();M(e)}if(a.ok){const e=await a.json();L(e.items||[])}}catch(n){console.error("Error fetching data:",n)}D(!1)},oe=e=>{t(e),q(!1),W(null)},re=async()=>{if(null!==Z&&void 0!==Z&&Z.title&&null!==Z&&void 0!==Z&&Z.content&&null!==Z&&void 0!==Z&&Z.category_id)try{const e=localStorage.getItem("auth_token"),n=!Z.id,t=ne();(await fetch(n?"/api/contents":`/api/contents/${Z.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:t,category_id:Z.category_id,title:Z.title,content:Z.content,excerpt:Z.excerpt,thumbnail_url:Z.thumbnail_url,status:Z.status||"draft",seo_title:Z.seo_title,seo_description:Z.seo_description,seo_keywords:Z.seo_keywords,og_image_url:Z.og_image_url,ai_summary:Z.ai_summary})})).ok&&(ee(n?"Content created successfully":"Content updated successfully"),q(!1),W(null),ae(),setTimeout(()=>ee(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},ie=T.filter(e=>!($&&!e.title.toLowerCase().includes($.toLowerCase()))&&(("all"===R||e.status===R)&&("all"===O||e.category_id===parseInt(O)))),se={total:T.length,published:T.filter(e=>"published"===e.status).length,draft:T.filter(e=>"draft"===e.status).length,categories:o.length},le=ne(),de=()=>{var n;return(0,u.jsxs)(k,{children:[(0,u.jsxs)(E,{children:[(0,u.jsxs)(A,{children:[null!==Z&&void 0!==Z&&Z.id?"Edit":"New"," ","blog"===le?"Blog Post":"FAQ Item"]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(i.cc,{variant:"secondary",onClick:()=>{q(!1),W(null)},children:"Cancel"}),(0,u.jsx)(i.cc,{variant:"secondary",onClick:()=>{W({...Z,status:"draft"}),re()},children:"Save as Draft"}),(0,u.jsx)(i.cc,{onClick:()=>{W({...Z,status:"published"}),re()},children:"Publish"})]})]}),(0,u.jsxs)(_,{children:[(0,u.jsxs)(B,{children:[(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:"Title *"}),(0,u.jsx)(s.ZQ,{value:(null===Z||void 0===Z?void 0:Z.title)||"",onChange:e=>W({...Z,title:e.target.value}),placeholder:"blog"===le?"Enter post title":"Enter question"})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:"Category *"}),(0,u.jsxs)(g.Jt,{value:(null===Z||void 0===Z||null===(n=Z.category_id)||void 0===n?void 0:n.toString())||"",onChange:e=>W({...Z,category_id:parseInt(e.target.value)}),children:[(0,u.jsx)("option",{value:"",children:e("admin:contentManagementPage.selectCategory")}),o.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===le&&(0,u.jsxs)(B,{children:[(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.excerpt")}),(0,u.jsx)(s.Lz,{value:(null===Z||void 0===Z?void 0:Z.excerpt)||"",onChange:e=>W({...Z,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.thumbnail")}),(0,u.jsxs)(S,{children:[null!==Z&&void 0!==Z&&Z.thumbnail_url?(0,u.jsx)("img",{src:Z.thumbnail_url,alt:"Thumbnail"}):(0,u.jsx)("p",{children:e("admin:contentManagementPage.clickToUploadThumbnailImage")}),(0,u.jsx)(s.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.thumbnail_url)||"",onChange:e=>W({...Z,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:"blog"===le?"Content *":"Answer *"}),(0,u.jsx)(P,{value:(null===Z||void 0===Z?void 0:Z.content)||"",onChange:e=>W({...Z,content:e.target.value}),placeholder:"blog"===le?"Write your blog post content...":"Write the answer to this question..."})]}),(0,u.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,u.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.aiSummaryForAiCitation")}),(0,u.jsx)(s.Lz,{value:(null===Z||void 0===Z?void 0:Z.ai_summary)||"",onChange:e=>W({...Z,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,u.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===Z||void 0===Z?void 0:Z.ai_summary)||"").length,"/500 characters"]})]}),"blog"===le&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(B,{children:[(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.seoTitleMax70Chars")}),(0,u.jsx)(s.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.seo_title)||"",onChange:e=>W({...Z,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.ogImageUrl")}),(0,u.jsx)(s.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.og_image_url)||"",onChange:e=>W({...Z,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.seoDescriptionMax160Chars")}),(0,u.jsx)(s.Lz,{value:(null===Z||void 0===Z?void 0:Z.seo_description)||"",onChange:e=>W({...Z,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,u.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===Z||void 0===Z?void 0:Z.seo_description)||"").length,"/160 characters"]})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.seoKeywordsCommaSeparated")}),(0,u.jsx)(s.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.seo_keywords)||"",onChange:e=>W({...Z,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(d.mc,{children:[(0,u.jsx)(d.Y9,{children:(0,u.jsx)(d.hE,{children:e("admin:contentManagementPage.content")})}),G&&(0,u.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:G}),(0,u.jsxs)(d.UC,{children:[(0,u.jsxs)(c.tU,{children:[(0,u.jsx)(c.oz,{active:"blog"===n,onClick:()=>oe("blog"),children:"Blog"}),(0,u.jsx)(c.oz,{active:"blog-categories"===n,onClick:()=>oe("blog-categories"),children:"Blog Categories"}),(0,u.jsx)(c.oz,{active:"faq"===n,onClick:()=>oe("faq"),children:"FAQ"}),(0,u.jsx)(c.oz,{active:"faq-categories"===n,onClick:()=>oe("faq-categories"),children:"FAQ Categories"})]}),te?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(g.DO,{type:"text",placeholder:"Search categories...",value:$,onChange:e=>I(e.target.value),style:{maxWidth:"300px"}}),(0,u.jsx)("div",{style:{marginLeft:"auto"},children:(0,u.jsx)(i.cc,{onClick:()=>{K({type:le}),Y(!0)},children:"Add Category"})})]}),(0,u.jsx)(m,{children:0===o.length?(0,u.jsxs)(r.pp,{children:[(0,u.jsx)("h3",{children:e("admin:contentManagementPage.noCategoriesYet")}),(0,u.jsxs)("p",{children:["Create your first category to organize your ","blog"===le?"blog posts":"FAQ items"]}),(0,u.jsx)(i.cc,{onClick:()=>{K({type:le}),Y(!0)},children:"Add Category"})]}):o.filter(e=>!$||e.name.toLowerCase().includes($.toLowerCase())).map(e=>(0,u.jsxs)(v,{isActive:e.is_active,children:[(0,u.jsx)(j,{children:e.icon||"\ud83d\udcc1"}),(0,u.jsxs)(b,{children:[(0,u.jsx)(y,{children:e.name}),(0,u.jsxs)(f,{children:[e.content_count," ","blog"===le?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(w,{onClick:()=>{K(e),Y(!0)},children:(0,u.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,u.jsx)(w,{onClick:()=>(async e=>{X({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(t.ok)ee("Category deleted successfully"),ae(),setTimeout(()=>ee(""),3e3);else{const e=await t.json();alert(e.error||"Failed to delete category")}}catch(n){console.error("Error deleting category:",n)}X({...V,show:!1})}})})(e.id),children:(0,u.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,u.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(d.MD,{children:[(0,u.jsxs)(d.hI,{children:[(0,u.jsx)(d.Os,{children:se.total}),(0,u.jsxs)(d.v0,{children:["Total ","blog"===le?"Posts":"FAQs"]})]}),(0,u.jsxs)(d.hI,{children:[(0,u.jsx)(d.Os,{children:se.published}),(0,u.jsx)(d.v0,{children:e("admin:contentManagementPage.published")})]}),(0,u.jsxs)(d.hI,{children:[(0,u.jsx)(d.Os,{children:se.draft}),(0,u.jsx)(d.v0,{children:e("admin:contentManagementPage.drafts")})]}),(0,u.jsxs)(d.hI,{children:[(0,u.jsx)(d.Os,{children:se.categories}),(0,u.jsx)(d.v0,{children:e("admin:contentManagementPage.categories")})]})]}),(0,u.jsxs)(z,{children:[(0,u.jsxs)(g.Jt,{value:R,onChange:e=>Q(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("admin:contentManagementPage.allStatus")}),(0,u.jsx)("option",{value:"published",children:e("admin:contentManagementPage.published")}),(0,u.jsx)("option",{value:"draft",children:e("admin:contentManagementPage.draft")})]}),(0,u.jsxs)(g.Jt,{value:O,onChange:e=>N(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("admin:contentManagementPage.allCategories")}),o.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,u.jsx)(g.DO,{type:"text",placeholder:"Search...",value:$,onChange:e=>I(e.target.value)}),(0,u.jsx)("div",{style:{marginLeft:"auto"},children:(0,u.jsxs)(i.cc,{onClick:()=>{W({type:le}),q(!0)},children:["New ","blog"===le?"Post":"FAQ"]})})]}),U?de():0===ie.length?(0,u.jsxs)(r.pp,{children:[(0,u.jsx)("h3",{children:e("admin:contentManagementPage.noContentYet")}),(0,u.jsxs)("p",{children:["Create your first ","blog"===le?"blog post":"FAQ item"]}),(0,u.jsxs)(i.cc,{onClick:()=>{W({type:le}),q(!0)},children:["New ","blog"===le?"Post":"FAQ"]})]}):(0,u.jsxs)(d.XI,{children:[(0,u.jsxs)(d.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,u.jsx)("span",{className:"col-info",children:e("admin:contentManagementPage.title")}),(0,u.jsx)("span",{children:e("admin:contentManagementPage.category")}),(0,u.jsx)("span",{children:e("admin:contentManagementPage.status")}),(0,u.jsx)("span",{children:e("admin:contentManagementPage.date")}),(0,u.jsx)("span",{className:"col-action",children:e("admin:contentManagementPage.actions")})]}),ie.map(e=>{var n,t;return(0,u.jsxs)(d.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,u.jsxs)("div",{className:"col-info",children:[(0,u.jsx)("strong",{children:e.title}),"blog"===le&&e.view_count>0&&(0,u.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,u.jsxs)("div",{children:[null===(n=e.category)||void 0===n?void 0:n.icon," ",null===(t=e.category)||void 0===t?void 0:t.name]}),(0,u.jsx)("div",{children:(0,u.jsx)(p,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,u.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,u.jsxs)(d.wr,{children:[(0,u.jsx)(d.rA,{onClick:()=>{W(e),q(!0)},children:"Edit"}),(0,u.jsx)(d.rA,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===t?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`}}),ee("published"===t?"Content published":"Content unpublished"),ae(),setTimeout(()=>ee(""),3e3)}catch(n){console.error("Error toggling publish:",n)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,u.jsx)(d.rA,{onClick:()=>(async e=>{X({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const n=localStorage.getItem("auth_token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}}),ee("Content deleted successfully"),ae(),setTimeout(()=>ee(""),3e3)}catch(n){console.error("Error deleting content:",n)}X({...V,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,u.jsxs)(s.aF,{isOpen:J,onClose:()=>{Y(!1),K(null)},title:null!==H&&void 0!==H&&H.id?"Edit Category":"New Category",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{Y(!1),K(null)},children:"Cancel"}),(0,u.jsx)(s.yl,{onClick:async()=>{if(null!==H&&void 0!==H&&H.name)try{const e=localStorage.getItem("auth_token"),n=!H.id,t=ne(),a=await fetch(n?"/api/contents/categories":`/api/contents/categories/${H.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:t,name:H.name,description:H.description,icon:H.icon})});if(a.ok)ee(n?"Category created successfully":"Category updated successfully"),Y(!1),K(null),ae(),setTimeout(()=>ee(""),3e3);else{const e=await a.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},children:null!==H&&void 0!==H&&H.id?"Update":"Create"})]}),children:[(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:"Name *"}),(0,u.jsx)(s.ZQ,{value:(null===H||void 0===H?void 0:H.name)||"",onChange:e=>K({...H,name:e.target.value}),placeholder:"Category name"})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.iconEmoji")}),(0,u.jsx)(s.ZQ,{value:(null===H||void 0===H?void 0:H.icon)||"",onChange:e=>K({...H,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,u.jsxs)(s.gE,{children:[(0,u.jsx)(s.lR,{children:e("admin:contentManagementPage.description")}),(0,u.jsx)(s.Lz,{value:(null===H||void 0===H?void 0:H.description)||"",onChange:e=>K({...H,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,u.jsx)(l.A,{isOpen:V.show,title:V.title,message:V.message,onConfirm:V.onConfirm,onClose:()=>X({...V,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);