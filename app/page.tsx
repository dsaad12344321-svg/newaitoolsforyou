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
      en: "A free, open-source video editor and CapCut alternative for creating and editing videos. The project is being rebuilt, while the current website still runs the classic version.",
      ar: "محرر فيديو مجاني ومفتوح المصدر، يُعد بديلاً لـ CapCut. يجري تطوير المشروع من جديد، بينما يعمل الموقع حالياً بالنسخة الكلاسيكية."
    },
    category: "video", url: "https://opencut.app/", sourceUrl: "https://github.com/OpenCut-app/OpenCut",
    openSource: true, mark: "▶", accent: "opencut",
    tags: { en: ["Open source", "Video editing", "Free", "MIT license"], ar: ["مفتوح المصدر", "تحرير الفيديو", "مجاني", "ترخيص MIT"] }
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
    result: "results", all: "All tools", research: "Research & Learning", video: "Video & Editing",
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
    result: "نتيجة", all: "كل الأدوات", research: "البحث والتعلّم", video: "الفيديو والمونتاج",
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

const categoryIds = ["all", "research", "video", "directory", "productivity", "design", "writing"] as const;

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
