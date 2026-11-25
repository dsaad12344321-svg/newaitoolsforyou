"use client";

import { useMemo, useState } from "react";

type Tool = {
  id: number;
  name: string;
  englishName: string;
  description: string;
  category: string;
  categoryLabel: string;
  url: string;
  mark: string;
  accent: string;
  tags: string[];
  featured?: boolean;
};

const tools: Tool[] = [
  {
    id: 1,
    name: "NotebookLM",
    englishName: "Google NotebookLM",
    description: "مساعد بحث وكتابة يعتمد على ملفاتك ومصادرك، ويساعدك على تلخيص المعلومات وفهمها وإنشاء ملخصات صوتية.",
    category: "research",
    categoryLabel: "البحث والتعلّم",
    url: "https://notebook.google.com/",
    mark: "N",
    accent: "notebook",
    tags: ["بحث", "تلخيص", "دراسة"],
    featured: true,
  },
  {
    id: 2,
    name: "AI Free Forever",
    englishName: "AI Free Forever",
    description: "منصة تجمع أدوات وخدمات ذكاء اصطناعي مجانية أو تتيح استخدامها دون اشتراك مدفوع.",
    category: "directory",
    categoryLabel: "دليل أدوات",
    url: "https://aifreeforever.com/",
    mark: "✳",
    accent: "forever",
    tags: ["مجاني", "أدوات", "اكتشاف"],
    featured: true,
  },
];

const categories = [
  { id: "all", label: "كل الأدوات" },
  { id: "research", label: "البحث والتعلّم" },
  { id: "directory", label: "دليل أدوات" },
  { id: "productivity", label: "الإنتاجية" },
  { id: "design", label: "التصميم" },
  { id: "writing", label: "الكتابة" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const searchable = [tool.name, tool.englishName, tool.description, tool.categoryLabel, ...tool.tags]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [query, activeCategory]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="AI Tools Hub الصفحة الرئيسية">
          <span className="brand-mark">✳</span>
          <span>AI Tools <b>Hub</b></span>
        </a>
        <nav className="top-links" aria-label="التنقل الرئيسي">
          <a href="#tools">استكشف الأدوات</a>
          <a href="#about">عن الدليل</a>
        </nav>
        <span className="top-note"><i /> دليل يتجدد باستمرار</span>
      </header>

      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span>✦</span> بوابتك إلى عالم الذكاء الاصطناعي</div>
          <h1>الأداة المناسبة<br /><span>تبدأ من هنا.</span></h1>
          <p className="hero-copy">اكتشف أدوات الذكاء الاصطناعي التي تساعدك على العمل والتعلّم والإبداع. كل ما تحتاجه، في مكان واحد.</p>
          <div className="search-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن أداة بالاسم أو الاستخدام..."
              aria-label="ابحث عن أداة"
            />
            {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="مسح البحث">×</button>}
            <kbd>⌕</kbd>
          </div>
          <div className="hero-meta"><span><b>{tools.length.toLocaleString("ar-EG")}</b> أدوات مختارة</span><span className="meta-dot">•</span><span>اكتشف، جرّب، أنجز</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="art-core"><span>✳</span></div>
          <div className="float-card float-top"><span className="mini-icon purple">✦</span><span>ذكاء يصنع الفرق</span></div>
          <div className="float-card float-bottom"><span className="mini-icon mint">⌘</span><span>أفكار بلا حدود</span></div>
          <span className="spark spark-a">✧</span><span className="spark spark-b">✦</span>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading">
          <div>
            <div className="section-kicker">مكتبة الأدوات</div>
            <h2>اكتشف ما يمكنك إنجازه</h2>
            <p>مجموعة من الأدوات المفيدة لتبدأ بها رحلتك.</p>
          </div>
          <div className="result-count"><span>{filteredTools.length}</span> نتيجة</div>
        </div>

        <div className="category-row" aria-label="تصفية حسب التصنيف">
          {categories.map((category) => (
            <button
              key={category.id}
              className={activeCategory === category.id ? "category-chip active" : "category-chip"}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredTools.length ? (
          <div className="tools-grid">
            {filteredTools.map((tool) => (
              <article className="tool-card" key={tool.id}>
                <div className="card-topline">
                  <div className={`tool-logo ${tool.accent}`}>{tool.mark}</div>
                  {tool.featured && <span className="featured-label"><span>✦</span> مختارة</span>}
                </div>
                <div className="tool-category">{tool.categoryLabel}</div>
                <h3>{tool.name}</h3>
                <div className="english-name">{tool.englishName}</div>
                <p className="tool-description">{tool.description}</p>
                <div className="tag-row">{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="visit-link" href={tool.url} target="_blank" rel="noopener noreferrer">
                  <span>زيارة الأداة</span><span className="external-arrow">↗</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>⌕</span>
            <h3>لم نعثر على أدوات مطابقة</h3>
            <p>جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.</p>
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }}>عرض كل الأدوات</button>
          </div>
        )}
      </section>

      <section className="bottom-banner" id="about">
        <div className="banner-symbol">✳</div>
        <div><h2>أدوات أكثر. وقت أقل في البحث.</h2><p>هدفنا أن نسهّل عليك الوصول إلى الأدوات المفيدة بسرعة.</p></div>
        <a href="#tools">ابدأ الاستكشاف <span>↗</span></a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">✳</span><span>AI Tools <b>Hub</b></span></a>
        <span>دليلك المبسّط لعالم أدوات الذكاء الاصطناعي</span>
        <span>© {new Date().getFullYear()} AI Tools Hub</span>
      </footer>
    </main>
  );
}
