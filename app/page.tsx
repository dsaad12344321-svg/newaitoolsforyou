"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "ar";
type Tool = {
  id: number; name: string; englishName: string;
  description: Record<Language, string>;
  category: string; url: string; mark: string; accent: string; sourceUrl?: string; openSource?: boolean;
  tags: Record<Language, string[]>; featured?: boolean;
};

const tools: Tool[] = [
  {
    id: 1, name: "NotebookLM", englishName: "Google NotebookLM",
    description: {
      en: "An AI research and writing assistant that works with your sources to summarize information, answer questions, and create audio overviews.",
      ar: "مساعد بحث وكتابة يعتمد على ملفاتك ومصادرك، ويساعدك على تلخيص المعلومات وفهمها وإنشاء ملخصات صوتية."
    },
    category: "research", url: "https://notebook.google.com/", mark: "N", accent: "notebook",
    tags: { en: ["Research", "Summaries", "Learning"], ar: ["بحث", "تلخيص", "دراسة"] }, featured: true
  },
  {
    id: 2, name: "AI Free Forever", englishName: "AI Free Forever",
    description: {
      en: "A directory of AI tools and services, including options you can explore for free without a paid subscription.",
      ar: "منصة تجمع أدوات وخدمات ذكاء اصطناعي مجانية أو تتيح استخدامها دون اشتراك مدفوع."
    },
    category: "directory", url: "https://aifreeforever.com/", mark: "✳", accent: "forever",
    tags: { en: ["Free", "AI tools", "Discovery"], ar: ["مجاني", "أدوات", "اكتشاف"] }, featured: true
  },
  {
    id: 3, name: "OpenCut", englishName: "OpenCut — Open-source Video Editor",
    description: {
      en: "A free, open-source video editor and CapCut alternative. Its upcoming rewrite plans to include an MCP server, allowing AI agents to control video-editing workflows. MCP is planned for the new version; the current website still runs the classic version.",
      ar: "محرر فيديو مجاني ومفتوح المصدر، يُعد بديلاً لـ CapCut. يجري تطوير المشروع من جديد، بينما يعمل الموقع حالياً بالنسخة الكلاسيكية."
    },
    category: "video", url: "https://opencut.app/", sourceUrl: "https://github.com/OpenCut-app/OpenCut",
    openSource: true, mark: "▶", accent: "opencut",
    tags: { en: ["Open source", "MCP", "AI agents", "Video editing", "Free", "MIT license"], ar: ["مفتوح المصدر", "MCP", "وكلاء الذكاء الاصطناعي", "تحرير الفيديو", "مجاني", "ترخيص MIT"] }
  },
  {
    id: 4, name: "Chatwoot", englishName: "Chatwoot — Open-source Customer Support",
    description: {
      en: "An open-source customer support platform that brings website live chat, email, WhatsApp and social messaging into one shared inbox. Includes automation, a help center, reports and APIs; it can also be self-hosted.",
      ar: "منصة مفتوحة المصدر لخدمة العملاء تجمع محادثات الموقع والبريد الإلكتروني وواتساب ورسائل شبكات التواصل في صندوق وارد موحد. توفر الأتمتة ومركز مساعدة وتقارير وواجهات API، ويمكن استضافتها على خادمك الخاص."
    },
    category: "support", url: "https://app.chatwoot.com/app/login",
    sourceUrl: "https://github.com/chatwoot/chatwoot", openSource: true,
    mark: "C", accent: "chatwoot",
    tags: { en: ["Open source", "Customer support", "Live chat", "WhatsApp", "Omnichannel", "MIT license"], ar: ["مفتوح المصدر", "خدمة العملاء", "دردشة مباشرة", "واتساب", "قنوات متعددة", "ترخيص MIT"] }
  },
  {
    id: 5, name: "OpenWhisper", englishName: "OpenWhisper — Voice-to-Text",
    description: {
      en: "A free, open-source voice typing app for Windows and Android. Hold Ctrl+Space, speak, and your words are pasted into the app you're using, such as Word, Gmail, Slack or Notion. Requires your own OpenAI API key.",
      ar: "أداة مجانية ومفتوحة المصدر لتحويل الكلام إلى نص على Windows وAndroid. اضغط Ctrl+Space وتحدث، وسيتم إدراج النص مباشرة في التطبيق الذي تستخدمه مثل Word وGmail وSlack وNotion. تحتاج إلى مفتاح OpenAI API خاص بك."
    },
    category: "voice", url: "https://openwhisper.org/",
    sourceUrl: "https://github.com/JamesHuckle/OpenWhisper",
    mark: "🎙", accent: "openwhisper",
    tags: { en: ["Voice typing", "Speech to text", "Open source", "Windows", "Android", "OpenAI API"], ar: ["الكتابة بالصوت", "تحويل الكلام إلى نص", "مفتوح المصدر", "ويندوز", "أندرويد", "OpenAI API"] }
  },
  {
    id: 6, name: "Cap", englishName: "Cap — Open-source Screen Recorder",
    description: {
      en: "An open-source Loom alternative for recording your screen, camera, and microphone, then editing and sharing polished videos. Includes Instant and Studio modes, AI transcripts and summaries on eligible plans, self-hosting, a CLI, and a local MCP server with 76 tools for AI agents.",
      ar: "بديل مفتوح المصدر لـ Loom لتسجيل الشاشة والكاميرا والميكروفون، ثم تحرير الفيديو ومشاركته. يوفر وضعي Instant وStudio، وتفريغاً وملخصات بالذكاء الاصطناعي في الخطط المدعومة، مع إمكانية الاستضافة الذاتية وCLI وخادم MCP محلي يضم 76 أداة لوكلاء الذكاء الاصطناعي."
    },
    category: "video", url: "https://cap.so/",
    sourceUrl: "https://github.com/CapSoftware/Cap",
    mark: "C", accent: "cap",
    tags: { en: ["Screen recording", "Video editing", "Open source", "MCP", "AI agents", "Loom alternative", "Self-hosted"], ar: ["تسجيل الشاشة", "تحرير الفيديو", "مفتوح المصدر", "MCP", "وكلاء الذكاء الاصطناعي", "بديل Loom", "استضافة ذاتية"] }
  },
  {
    id: 8, name: "AppFlowy", englishName: "AppFlowy — Open-source Notion Alternative",
    description: {
      en: "An open-source workspace for notes, documents, wikis, databases and project management, with grid and Kanban views. Use its desktop and mobile apps, try the hosted cloud option, or self-host it to keep control of your data. AI features are also available, with some capabilities depending on the setup or plan.",
      ar: "مساحة عمل مفتوحة المصدر كبديل لـ Notion، تجمع الملاحظات والمستندات وقواعد المعرفة وقواعد البيانات وإدارة المشاريع، مع طرق عرض مثل Grid وKanban. يمكنك استخدام تطبيقات الكمبيوتر والهاتف، أو تجربة الخدمة السحابية، أو استضافتها بنفسك للتحكم في بياناتك. تتوفر أيضاً مزايا للذكاء الاصطناعي، وقد تختلف حسب طريقة الاستخدام أو الخطة."
    },
    category: "productivity", url: "https://appflowy.com/",
    sourceUrl: "https://github.com/AppFlowy-IO/AppFlowy",
    openSource: true, mark: "A", accent: "appflowy",
    tags: { en: ["Open source", "Notion alternative", "Productivity", "Notes", "Databases", "Kanban", "Self-hosted", "AGPL-3.0"], ar: ["مفتوح المصدر", "بديل Notion", "الإنتاجية", "ملاحظات", "قواعد البيانات", "Kanban", "استضافة ذاتية", "AGPL-3.0"] }
  },
  {
    id: 9, name: "VoiceStudio", englishName: "VoiceStudio — Local AI Voice Studio",
    description: {
      en: "An open-source, local-first AI voice studio for voice cloning and design, video dubbing, dictation, transcription, and audiobook creation. It supports a broad language catalogue (646 languages); actual voice coverage depends on the selected engine. Core local workflows can run on your own device.",
      ar: "استوديو صوتي مفتوح المصدر يعمل محلياً على جهازك، يتيح استنساخ الأصوات وتصميمها ودبلجة الفيديو والإملاء الصوتي والتفريغ النصي وإنشاء الكتب الصوتية. يضم فهرساً يصل إلى 646 لغة، لكن دعم اللغات وجودة الصوت يعتمدان على محرك التشغيل المختار."
    },
    category: "voice", url: "https://voicestudio.sh/",
    sourceUrl: "https://github.com/AiTH-Solutions/VoiceStudio.sh",
    openSource: true, mark: "🎙", accent: "openwhisper",
    tags: { en: ["Open source", "Voice cloning", "Text to speech", "Video dubbing", "Transcription", "Audiobooks", "Local AI"], ar: ["مفتوح المصدر", "استنساخ الصوت", "تحويل النص إلى كلام", "دبلجة الفيديو", "تفريغ صوتي", "كتب صوتية", "ذكاء اصطناعي محلي"] }
  },
  {
    id: 10, name: "Muapi", englishName: "Muapi — Unified Generative Media API",
    description: {
      en: "A unified platform for accessing hundreds of generative AI models through one API, covering image and video generation, editing, audio and music, lip-sync, and 3D. It also offers browser-based tools and a playground. Pricing varies by model and generation; check the current rate before running jobs.",
      ar: "منصة موحدة تتيح الوصول إلى مئات نماذج الذكاء الاصطناعي التوليدي من خلال API واحد، لإنشاء الصور والفيديو وتحريرهما، وتوليد الصوت والموسيقى ومزامنة الشفاه وإنشاء مجسمات ثلاثية الأبعاد. توفر أيضاً أدوات تعمل من المتصفح وPlayground للتجربة. تختلف التكلفة حسب النموذج وعملية التوليد."
    },
    category: "design", url: "https://muapi.ai/",
    mark: "M", accent: "forever",
    tags: { en: ["AI API", "Image generation", "Video generation", "Audio", "Music", "Lip sync", "3D", "Pay per generation"], ar: ["واجهة API", "إنشاء الصور", "إنشاء الفيديو", "الصوت", "الموسيقى", "مزامنة الشفاه", "ثلاثي الأبعاد", "الدفع حسب الاستخدام"] }
  },
  {
    id: 11, name: "Flow", englishName: "Google Flow — AI Filmmaking Tool",
    description: {
      en: "Google's AI filmmaking tool for creating cinematic video clips and scenes from text and images, with tools to build and edit visual stories. Availability and features may vary by region and Google account.",
      ar: "أداة Google لصناعة الفيديو بالذكاء الاصطناعي، تساعدك على إنشاء لقطات ومشاهد سينمائية انطلاقاً من النصوص والصور، مع أدوات لبناء القصص المرئية وتعديلها. قد يختلف توفر الأداة ومزاياها حسب المنطقة وحساب Google."
    },
    category: "video", url: "https://flow.google.com/", mark: "F", accent: "opencut",
    tags: { en: ["Google", "AI video", "Text to video", "Image to video", "Filmmaking", "Video generation"], ar: ["Google", "فيديو بالذكاء الاصطناعي", "تحويل النص إلى فيديو", "تحويل الصور إلى فيديو", "صناعة الأفلام", "توليد الفيديو"] }
  },
  {
    id: 7, name: "Notion", englishName: "Notion — All-in-one Workspace",
    description: {
      en: "An all-in-one workspace for notes, documents, wikis, project management and databases. Notion AI helps write, summarize and search your workspace, while Notion Agent and MCP connect AI tools and agents to your knowledge and workflows. Free plan available; advanced AI features depend on the plan.",
      ar: "مساحة عمل متكاملة للملاحظات والمستندات وقواعد المعرفة وإدارة المشاريع وقواعد البيانات. يساعد Notion AI في الكتابة والتلخيص والبحث داخل مساحة العمل، بينما يتيح Notion Agent وMCP ربط أدوات ووكلاء الذكاء الاصطناعي بمعلوماتك وسير العمل. تتوفر خطة مجانية، بينما تعتمد مزايا الذكاء الاصطناعي المتقدمة على نوع الاشتراك."
    },
    category: "productivity", url: "https://app.notion.com/",
    mark: "N", accent: "notion",
    tags: { en: ["Productivity", "Notes", "Project management", "Databases", "Notion AI", "MCP", "AI agents"], ar: ["الإنتاجية", "ملاحظات", "إدارة المشاريع", "قواعد البيانات", "Notion AI", "MCP", "وكلاء الذكاء الاصطناعي"] }
  },
];

const copy = {
  en: {
    navTools: "Explore tools", navAbout: "About",
    status: "Curated tools, updated regularly",
    eyebrow: "YOUR GATEWAY TO ARTIFICIAL INTELLIGENCE",
    titleFirst: "The right tool", titleSecond: "starts right here.",
    intro: "Discover AI tools that help you work smarter, learn faster, and create more. Everything you need, all in one place.",
    search: "Search tools by name or what you need...",
    selected: "curated tools", meta: "Discover. Try. Create.",
    library: "THE TOOL LIBRARY", heading: "Find your next favorite tool",
    subheading: "A growing collection of useful tools to help you get more done.",
    result: "results", all: "All tools", research: "Research & Learning", video: "Video & Editing", support: "Customer Support", voice: "Voice & Transcription",
    directory: "AI Directories", productivity: "Productivity", design: "Design", writing: "Writing",
    featured: "Featured", visit: "Visit tool",
    emptyTitle: "No matching tools found", emptyText: "Try another search term or choose a different category.",
    showAll: "Show all tools", bannerTitle: "Less searching. More creating.",
    bannerText: "Our goal is to help you find useful AI tools without the endless search.",
    start: "Explore tools", footer: "A simpler way to discover AI tools",
    language: "العربية", homeLabel: "AI Tools Hub home", searchLabel: "Search for a tool",
    clear: "Clear search", categoriesLabel: "Filter by category"
  },
  ar: {
    navTools: "استكشف الأدوات", navAbout: "عن الدليل",
    status: "أدوات مختارة تتجدد باستمرار",
    eyebrow: "بوابتك إلى عالم الذكاء الاصطناعي",
    titleFirst: "الأداة المناسبة", titleSecond: "تبدأ من هنا.",
    intro: "اكتشف أدوات الذكاء الاصطناعي التي تساعدك على العمل والتعلّم والإبداع. كل ما تحتاجه، في مكان واحد.",
    search: "ابحث عن أداة بالاسم أو الاستخدام...",
    selected: "أدوات مختارة", meta: "اكتشف، جرّب، أنجز",
    library: "مكتبة الأدوات", heading: "اكتشف ما يمكنك إنجازه",
    subheading: "مجموعة من الأدوات المفيدة لتبدأ بها رحلتك.",
    result: "نتيجة", all: "كل الأدوات", research: "البحث والتعلّم", video: "الفيديو والمونتاج", support: "خدمة العملاء", voice: "الصوت والتفريغ",
    directory: "دليل أدوات", productivity: "الإنتاجية", design: "التصميم", writing: "الكتابة",
    featured: "مختارة", visit: "زيارة الأداة",
    emptyTitle: "لم نعثر على أدوات مطابقة", emptyText: "جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.",
    showAll: "عرض كل الأدوات", bannerTitle: "أدوات أكثر. وقت أقل في البحث.",
    bannerText: "هدفنا أن نسهّل عليك الوصول إلى الأدوات المفيدة بسرعة.",
    start: "ابدأ الاستكشاف", footer: "دليلك المبسّط لعالم أدوات الذكاء الاصطناعي",
    language: "English", homeLabel: "AI Tools Hub الصفحة الرئيسية", searchLabel: "ابحث عن أداة",
    clear: "مسح البحث", categoriesLabel: "تصفية حسب التصنيف"
  }
} as const;

const categoryIds = ["all", "research", "video", "support", "voice", "directory", "productivity", "design", "writing"] as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("ai-tools-language");
    if (saved === "ar" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("ai-tools-language", language);
  }, [language]);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const searchable = [
        tool.name, tool.englishName, tool.description.en, tool.description.ar,
        ...tool.tags.en, ...tool.tags.ar
      ].join(" ").toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [query, activeCategory]);

  return (
    <main className="site-shell" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="brand" href="#" aria-label={t.homeLabel}>
          <span className="brand-mark">✳</span><span>AI Tools <b>Hub</b></span>
        </a>
        <nav className="top-links" aria-label="Main navigation">
          <a href="#tools">{t.navTools}</a><a href="#about">{t.navAbout}</a>
        </nav>
        <div className="header-actions">
          <span className="top-note"><i />{t.status}</span>
          <button className="language-switch" onClick={() => setLanguage(language === "en" ? "ar" : "en")} aria-label="Switch language">
            <span>文A</span>{t.language}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span>✦</span>{t.eyebrow}</div>
          <h1>{t.titleFirst}<br /><span>{t.titleSecond}</span></h1>
          <p className="hero-copy">{t.intro}</p>
          <div className="search-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.searchLabel} />
            {query && <button className="clear-search" onClick={() => setQuery("")} aria-label={t.clear}>×</button>}
            <kbd>⌕</kbd>
          </div>
          <div className="hero-meta"><span><b>{tools.length.toLocaleString(language === "ar" ? "ar-EG" : "en-US")}</b> {t.selected}</span><span className="meta-dot">•</span><span>{t.meta}</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="art-core"><span>✳</span></div>
          <div className="float-card float-top"><span className="mini-icon purple">✦</span><span>{language === "en" ? "Smart tools, real impact" : "ذكاء يصنع الفرق"}</span></div>
          <div className="float-card float-bottom"><span className="mini-icon mint">⌘</span><span>{language === "en" ? "Ideas without limits" : "أفكار بلا حدود"}</span></div>
          <span className="spark spark-a">✧</span><span className="spark spark-b">✦</span>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading">
          <div><div className="section-kicker">{t.library}</div><h2>{t.heading}</h2><p>{t.subheading}</p></div>
          <div className="result-count"><span>{filteredTools.length}</span> {t.result}</div>
        </div>
        <div className="category-row" aria-label={t.categoriesLabel}>
          {categoryIds.map((id) => (
            <button key={id} className={activeCategory === id ? "category-chip active" : "category-chip"} onClick={() => setActiveCategory(id)}>
              {t[id]}
            </button>
          ))}
        </div>
        {filteredTools.length ? (
          <div className="tools-grid">
            {filteredTools.map((tool) => (
              <article className="tool-card" key={tool.id}>
                <div className="card-topline">
                  <div className={`tool-logo ${tool.accent}`}>{tool.mark}</div>
                  {tool.featured && <span className="featured-label"><span>✦</span> {t.featured}</span>}
                </div>
                <div className="tool-category">{t[tool.category as keyof typeof t]}</div>
                <h3>{tool.name}</h3><div className="english-name">{tool.englishName}</div>
                <p className="tool-description">{tool.description[language]}</p>
                <div className="tag-row">{tool.tags[language].map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="tool-links">
                  <a className="visit-link" href={tool.url} target="_blank" rel="noopener noreferrer">
                    <span>{t.visit}</span><span className="external-arrow">↗</span>
                  </a>
                  {tool.sourceUrl && <a className="source-link" href={tool.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <span>{language === "en" ? "View source on GitHub" : "عرض الكود على GitHub"}</span><span className="external-arrow">↗</span>
                  </a>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><span>⌕</span><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p>
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }}>{t.showAll}</button>
          </div>
        )}
      </section>

      <section className="bottom-banner" id="about">
        <div className="banner-symbol">✳</div>
        <div><h2>{t.bannerTitle}</h2><p>{t.bannerText}</p></div>
        <a href="#tools">{t.start} <span>↗</span></a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">✳</span><span>AI Tools <b>Hub</b></span></a>
        <span>{t.footer}</span><span>© {new Date().getFullYear()} AI Tools Hub</span>
      </footer>
    </main>
  );
}
