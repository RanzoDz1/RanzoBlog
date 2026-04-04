"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "ar";

// ── English ───────────────────────────────────────────────────────────────────
const EN = {
  nav: {
    about: "About", travels: "Travels", stories: "Stories",
    gallery: "Gallery", collab: "Collab", workWithMe: "Work With Me",
  },
  hero: {
    eyebrow: "Algeria · Germany · Everywhere",
    tagline: "Travel. Risk.", taglineEnd: "Experience.",
    description: "Exploring the world beyond comfort zones. One border, one story, one moment at a time.",
    storiesBtn: "My Stories ↗", travelsBtn: "See My Travels", scroll: "Scroll",
  },
  about: {
    eyebrow: "About RanzoDz",
    headline1: "From Algeria,", headline2: "to everywhere.",
    bio1: "I'm Abdullah, a traveler, storyteller, and IRL streamer who left comfort behind to document the world's most raw and extraordinary moments.",
    bio2: "What started as a solo trip driven by pure fear became a relentless pursuit of the unknown. 50+ countries. 6 continents. Stories that changed me forever.",
    currentlyExploring: "Currently Exploring",
    route: "Algeria → Germany → World",
    countries: "Countries",
    tags: ["Travel Creator", "IRL Streamer", "Multilingual", "50+ Countries", "1M+ Followers", "Arabic · English · German"],
    timeline: [
      { year: "Origin",        title: "Born in Algeria",            desc: "Where the hunger for the world began." },
      { year: "The First Step", title: "First Solo Travel",         desc: "Fear turned into freedom. The world opened up." },
      { year: "New Base",      title: "Germany Becomes Home",       desc: "A new chapter. Europe as the launchpad." },
      { year: "Ongoing",       title: "The World is the Destination", desc: "50+ countries. 6 continents. Still counting." },
    ],
  },
  stories: {
    eyebrow: "Real Stories",
    headline1: "Stories from", headline2: "the road.",
    description: "Six moments that changed everything. Raw, real, unfiltered.",
  },
  travels: {
    eyebrow: "Global Footprint",
    headline1: "Every country", headline2: "tells a story.",
    description: "From the Sahara to Scandinavia, from Sub-Saharan Africa to Southeast Asia.",
    countriesStrong: "50+ countries", countriesEnd: "and counting.",
    continents: { europe: "Europe", africa: "Africa", "middle-east": "Middle East", asia: "Asia", americas: "Americas", oceania: "Oceania" },
    clickToView: "Click a country to view photos",
    photoCount: (n: number) => `${n} photo${n !== 1 ? "s" : ""}`,
  },
  gallery: {
    eyebrow: "Visual Archive",
    headline1: "The", headline2: "Gallery",
    categories: { all: "All", nature: "Nature", cities: "Cities", culture: "Culture", adventures: "Adventures" },
    seeAll: "See all",
  },
  apps: {
    eyebrow: "My Travel Toolkit",
    headline1: "Apps I ", headline2: "actually use.",
    description: "Not sponsored. Just the apps that have made 50+ countries possible.",
  },
  collab: {
    eyebrow: "Work Together",
    headline1: "Let's Create", headline2: "Something Great.",
    description: "With 1M+ followers across platforms and a highly engaged community of travelers, adventurers, and culture seekers, I bring authentic storytelling to every partnership.",
    stats: [
      { value: "72%",  label: "Travel Enthusiasts" },
      { value: "18-34", label: "Core Age Range" },
      { value: "65%",  label: "High Purchase Intent" },
      { value: "40+",  label: "Countries Reached" },
    ],
    types: [
      { icon: "📸", title: "Sponsored Content",          desc: "Your brand integrated into real travel experiences.", color: "var(--purple)" },
      { icon: "🎬", title: "Brand Promotions",           desc: "Long-form storytelling across YouTube, TikTok, and Instagram.", color: "var(--blue)" },
      { icon: "🤝", title: "Creator Collaborations",     desc: "Joint projects, IRL stream crossovers, and campaigns.", color: "var(--amber)" },
      { icon: "🌍", title: "Destination Content",        desc: "Tourism boards, hotels, and experiences.", color: "var(--purple-l)" },
    ],
    form: {
      title: "Send a Message",
      subtitle: "Tell me about your project. I read every message personally.",
      name: "Name *", namePlaceholder: "Your name",
      email: "Email *",
      brand: "Company / Brand", brandPlaceholder: "Optional",
      message: "Message *", messagePlaceholder: "Tell me about the collaboration, brand, timeline...",
      sending: "Sending...", send: "Send Message →",
      error: "Something went wrong. Email me directly at ranzodzt@gmail.com",
      successTitle: "Message Sent!", successDesc: "I'll get back to you as soon as possible.",
    },
  },
  footer: {
    tagline: "Travel · Risk · Experience",
    copyright: "© 2026 Abdullah Khalfi · @RanzoDz · All rights reserved",
  },
};

// ── Arabic ────────────────────────────────────────────────────────────────────
const AR: typeof EN = {
  nav: {
    about: "عني", travels: "رحلاتي", stories: "قصصي",
    gallery: "المعرض", collab: "تعاون", workWithMe: "اعمل معي",
  },
  hero: {
    eyebrow: "الجزائر · ألمانيا · في كل مكان",
    tagline: "السفر. المجازفة.", taglineEnd: "التجربة.",
    description: "أستكشف العالم بعيداً عن منطقة الراحة. حدود واحدة، قصة واحدة، لحظة واحدة في كل مرة.",
    storiesBtn: "قصصي ↗", travelsBtn: "اكتشف رحلاتي", scroll: "مرر",
  },
  about: {
    eyebrow: "عن رانزو",
    headline1: "من الجزائر،", headline2: "إلى كل مكان.",
    bio1: "أنا عبد الله، مسافر وراوي قصص ومُبثّ مباشر، تركت الراحة خلفي لأوثّق أكثر لحظات العالم حقيقيةً وإثارةً.",
    bio2: "ما بدأ كرحلة منفردة مدفوعةً بالخوف المحض تحوّل إلى مطاردة لا تهدأ للمجهول. أكثر من 50 دولة. 6 قارات. قصص غيّرتني إلى الأبد.",
    currentlyExploring: "أستكشف الآن",
    route: "الجزائر ← ألمانيا ← العالم",
    countries: "دولة",
    tags: ["صانع محتوى سفر", "مُبثّ مباشر", "متعدد اللغات", "50+ دولة", "+مليون متابع", "العربية · الإنجليزية · الألمانية"],
    timeline: [
      { year: "البداية",      title: "وُلدت في الجزائر",     desc: "هنا بدأت الشهية للعالم." },
      { year: "الخطوة الأولى", title: "أول رحلة منفردة",      desc: "تحوّل الخوف إلى حرية. انفتح العالم." },
      { year: "قاعدة جديدة",  title: "ألمانيا تصبح وطناً",   desc: "فصلٌ جديد. أوروبا كمنطلق للعالم." },
      { year: "مستمر",        title: "العالم هو الوجهة",      desc: "أكثر من 50 دولة. 6 قارات. والعدّ مستمر." },
    ],
  },
  stories: {
    eyebrow: "قصص حقيقية",
    headline1: "قصص من", headline2: "الطريق.",
    description: "ست لحظات غيّرت كل شيء. خام، حقيقية، بلا تجميل.",
  },
  travels: {
    eyebrow: "البصمة العالمية",
    headline1: "كل دولة", headline2: "تحكي قصة.",
    description: "من الصحراء إلى سكانديناڤيا، ومن أفريقيا جنوب الصحراء إلى جنوب شرق آسيا.",
    countriesStrong: "أكثر من 50 دولة", countriesEnd: "والعدّ مستمر.",
    continents: { europe: "أوروبا", africa: "أفريقيا", "middle-east": "الشرق الأوسط", asia: "آسيا", americas: "الأمريكتان", oceania: "أوقيانوسيا" },
    clickToView: "اختر دولة لعرض الصور",
    photoCount: (n: number) => `${n} صورة`,
  },
  gallery: {
    eyebrow: "الأرشيف البصري",
    headline1: "", headline2: "المعرض",
    categories: { all: "الكل", nature: "طبيعة", cities: "مدن", culture: "ثقافة", adventures: "مغامرات" },
    seeAll: "عرض الكل",
  },
  apps: {
    eyebrow: "أدوات السفر",
    headline1: "تطبيقات ", headline2: "أستخدمها فعلاً.",
    description: "بلا رعاية. فقط التطبيقات التي أتاحت لي السفر إلى أكثر من 50 دولة.",
  },
  collab: {
    eyebrow: "نعمل معاً",
    headline1: "لنصنع", headline2: "شيئاً عظيماً.",
    description: "مع أكثر من مليون متابع عبر المنصات وجمهور متفاعل من المسافرين والمغامرين وعشاق الثقافات، أُضفي على كل شراكة طابعاً من القصص الحقيقية.",
    stats: [
      { value: "72%",  label: "عشاق السفر" },
      { value: "18-34", label: "الفئة العمرية الأساسية" },
      { value: "65%",  label: "نية شراء مرتفعة" },
      { value: "40+",  label: "دولة وصلها المحتوى" },
    ],
    types: [
      { icon: "📸", title: "محتوى مموّل",               desc: "علامتك التجارية مدمجة في تجارب سفر حقيقية.", color: "var(--purple)" },
      { icon: "🎬", title: "ترويج العلامات التجارية",   desc: "محتوى قصصي طويل عبر يوتيوب وتيك توك وإنستغرام.", color: "var(--blue)" },
      { icon: "🤝", title: "تعاون مع صُنّاع المحتوى",  desc: "مشاريع مشتركة وبثّ مباشر وحملات إعلانية.", color: "var(--amber)" },
      { icon: "🌍", title: "محتوى الوجهات السياحية",   desc: "هيئات السياحة والفنادق والتجارب.", color: "var(--purple-l)" },
    ],
    form: {
      title: "أرسل رسالة",
      subtitle: "أخبرني عن مشروعك. أقرأ كل رسالة بنفسي.",
      name: "الاسم *", namePlaceholder: "اسمك",
      email: "البريد الإلكتروني *",
      brand: "الشركة / العلامة التجارية", brandPlaceholder: "اختياري",
      message: "الرسالة *", messagePlaceholder: "أخبرني عن التعاون والعلامة التجارية والجدول الزمني...",
      sending: "جارٍ الإرسال...", send: "أرسل الرسالة ←",
      error: "حدث خطأ ما. راسلني مباشرةً على ranzodzt@gmail.com",
      successTitle: "تم إرسال الرسالة!", successDesc: "سأتواصل معك في أقرب وقت ممكن.",
    },
  },
  footer: {
    tagline: "سفر · مجازفة · تجربة",
    copyright: "© 2026 عبد الله خلفي · @RanzoDz · جميع الحقوق محفوظة",
  },
};

export type Translations = typeof EN;

// ── Context ───────────────────────────────────────────────────────────────────
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Translations }>({
  lang: "en", setLang: () => {}, t: EN,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ranzo-lang") as Lang;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    const isAr = lang === "ar";
    document.documentElement.dir  = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ranzo-lang", l);
  };

  return <Ctx.Provider value={{ lang, setLang, t: lang === "ar" ? AR : EN }}>{children}</Ctx.Provider>;
}

export function useT() { return useContext(Ctx); }
