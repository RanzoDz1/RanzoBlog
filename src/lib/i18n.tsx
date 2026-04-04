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
    continents: { europe: "Europe", africa: "Africa", middleeast: "Middle East", asia: "Asia", americas: "Americas", oceania: "Oceania" },
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
  // ── Data-level translation maps ────────────────────────────────────────────
  data: {
    storyTags: {
      "Origin Story":   "Origin Story",
      "Budget Travel":  "Budget Travel",
      "Africa":         "Africa",
      "Ancient Living": "Ancient Living",
      "Northern Lights":"Northern Lights",
      "Danger":         "Danger",
    } as Record<string, string>,
    storyLocations: {
      "Algeria":          "Algeria",
      "Across Europe":    "Across Europe",
      "East Africa":      "East Africa",
      "Undisclosed":      "Undisclosed",
      "Lapland, Finland": "Lapland, Finland",
      "Uganda":           "Uganda",
    } as Record<string, string>,
    appCategories: {
      "Flights":        "Flights",
      "Hotels":         "Hotels",
      "Hostels":        "Hostels",
      "Free Stays":     "Free Stays",
      "Activities":     "Activities",
      "Transport":      "Transport",
      "eSIM":           "eSIM",
      "Converter":      "Converter",
      "Cost of Living": "Cost of Living",
    } as Record<string, string>,
    countryNames: {
      // Europe
      "Austria":                "Austria",
      "Belgium":                "Belgium",
      "Bosnia and Herzegovina": "Bosnia and Herzegovina",
      "Bulgaria":               "Bulgaria",
      "Croatia":                "Croatia",
      "Denmark":                "Denmark",
      "Finland":                "Finland",
      "France":                 "France",
      "Germany":                "Germany",
      "Greece":                 "Greece",
      "Hungary":                "Hungary",
      "Italy":                  "Italy",
      "Liechtenstein":          "Liechtenstein",
      "Luxembourg":             "Luxembourg",
      "Netherlands":            "Netherlands",
      "Norway":                 "Norway",
      "Poland":                 "Poland",
      "Portugal":               "Portugal",
      "Romania":                "Romania",
      "Slovakia":               "Slovakia",
      "Slovenia":               "Slovenia",
      "Spain":                  "Spain",
      "Sweden":                 "Sweden",
      "Switzerland":            "Switzerland",
      // Africa
      "Algeria":   "Algeria",
      "Botswana":  "Botswana",
      "Kenya":     "Kenya",
      "Morocco":   "Morocco",
      "Rwanda":    "Rwanda",
      "Tanzania":  "Tanzania",
      "Tunisia":   "Tunisia",
      "Uganda":    "Uganda",
      "Zambia":    "Zambia",
      "Zimbabwe":  "Zimbabwe",
      // Middle East
      "Qatar":         "Qatar",
      "Saudi Arabia":  "Saudi Arabia",
      "Turkey":        "Turkey",
      "UAE":           "UAE",
      // Asia
      "China":     "China",
      "Indonesia": "Indonesia",
      "Malaysia":  "Malaysia",
      "Thailand":  "Thailand",
    } as Record<string, string>,
  },
};

// ── Arabic ────────────────────────────────────────────────────────────────────
const AR: typeof EN = {
  nav: {
    about: "عني", travels: "رحلاتي", stories: "قصصي",
    gallery: "المعرض", collab: "تعاون", workWithMe: "تواصل معي",
  },
  hero: {
    eyebrow: "الجزائر · ألمانيا · في كل مكان",
    tagline: "سفر. مجازفة.", taglineEnd: "تجربة.",
    description: "أستكشف العالم بعيداً عن منطقة الراحة. حدود، قصة، لحظة في كل مرة.",
    storiesBtn: "قصصي ↗", travelsBtn: "اكتشف رحلاتي", scroll: "مرر",
  },
  about: {
    eyebrow: "عن رانزو",
    headline1: "من الجزائر،", headline2: "إلى كل مكان.",
    bio1: "أنا عبد الله، مسافر وراوي قصص وبثّاث مباشر، تركت الراحة خلفي لأوثّق أصدق لحظات العالم وأكثرها إثارةً.",
    bio2: "ما بدأ كرحلة خوف فردية تحوّل إلى شغف لا يتوقف بالمجهول. أكثر من 50 دولة. 6 قارات. قصص غيّرتني للأبد.",
    currentlyExploring: "أستكشف الآن",
    route: "الجزائر ← ألمانيا ← العالم",
    countries: "دولة",
    tags: ["صانع محتوى سفر", "بثّ مباشر", "متعدد اللغات", "+50 دولة", "+مليون متابع", "العربية · الإنجليزية · الألمانية"],
    timeline: [
      { year: "البداية",       title: "وُلدت في الجزائر",     desc: "هنا بدأت شهوة العالم." },
      { year: "الخطوة الأولى", title: "أول رحلة منفردة",      desc: "الخوف تحوّل إلى حرية. العالم انفتح." },
      { year: "قاعدة جديدة",  title: "ألمانيا صارت وطناً",   desc: "فصل جديد. أوروبا كمنطلق للعالم." },
      { year: "مستمر",         title: "العالم هو الوجهة",     desc: "أكثر من 50 دولة. 6 قارات. والعدّ مستمر." },
    ],
  },
  stories: {
    eyebrow: "قصص حقيقية",
    headline1: "قصص من", headline2: "الطريق.",
    description: "ست لحظات غيّرت كل شيء. حقيقية وبلا تجميل.",
  },
  travels: {
    eyebrow: "البصمة العالمية",
    headline1: "كل دولة", headline2: "تحكي قصة.",
    description: "من الصحراء إلى سكانديناڤيا، ومن أفريقيا جنوب الصحراء إلى جنوب شرق آسيا.",
    countriesStrong: "أكثر من 50 دولة", countriesEnd: "والعدّ مستمر.",
    continents: { europe: "أوروبا", africa: "أفريقيا", middleeast: "الشرق الأوسط", asia: "آسيا", americas: "الأمريكتان", oceania: "أوقيانوسيا" },
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
    description: "بدون رعاية. فقط التطبيقات اللي خلّت السفر لأكثر من 50 دولة ممكناً.",
  },
  collab: {
    eyebrow: "نعمل معاً",
    headline1: "نصنع", headline2: "شيئاً يستحق.",
    description: "بأكثر من مليون متابع على مختلف المنصات وجمهور من المسافرين والمغامرين وعشّاق الثقافات، أضع في كل شراكة قصة حقيقية تلمس الناس.",
    stats: [
      { value: "72%",  label: "عشاق السفر" },
      { value: "18-34", label: "الفئة العمرية الأساسية" },
      { value: "65%",  label: "رغبة شراء عالية" },
      { value: "40+",  label: "دولة وصلها المحتوى" },
    ],
    types: [
      { icon: "📸", title: "محتوى مموّل",              desc: "علامتك التجارية داخل تجارب سفر حقيقية.", color: "var(--purple)" },
      { icon: "🎬", title: "ترويج العلامات",            desc: "محتوى قصصي طويل على يوتيوب وتيك توك وإنستغرام.", color: "var(--blue)" },
      { icon: "🤝", title: "تعاون مع صنّاع المحتوى",   desc: "مشاريع مشتركة وبثّ مباشر وحملات إعلانية.", color: "var(--amber)" },
      { icon: "🌍", title: "محتوى الوجهات السياحية",   desc: "هيئات السياحة والفنادق والتجارب.", color: "var(--purple-l)" },
    ],
    form: {
      title: "أرسل رسالة",
      subtitle: "أخبرني عن مشروعك. أقرأ كل رسالة بنفسي.",
      name: "الاسم *", namePlaceholder: "اسمك",
      email: "البريد الإلكتروني *",
      brand: "الشركة / العلامة التجارية", brandPlaceholder: "اختياري",
      message: "الرسالة *", messagePlaceholder: "أخبرني عن التعاون والعلامة التجارية والجدول الزمني...",
      sending: "جاري الإرسال...", send: "أرسل الرسالة ←",
      error: "في مشكلة. راسلني مباشرةً على ranzodzt@gmail.com",
      successTitle: "تم إرسال الرسالة!", successDesc: "سأرد عليك بأقرب وقت.",
    },
  },
  footer: {
    tagline: "سفر · مجازفة · تجربة",
    copyright: "© 2026 عبد الله خلفي · @RanzoDz · جميع الحقوق محفوظة",
  },
  // ── Data-level translation maps ────────────────────────────────────────────
  data: {
    storyTags: {
      "Origin Story":   "قصة البدايات",
      "Budget Travel":  "سفر بالكاد",
      "Africa":         "أفريقيا",
      "Ancient Living": "العيش القديم",
      "Northern Lights":"الشفق القطبي",
      "Danger":         "خطر",
    } as Record<string, string>,
    storyLocations: {
      "Algeria":          "الجزائر",
      "Across Europe":    "عبر أوروبا",
      "East Africa":      "شرق أفريقيا",
      "Undisclosed":      "غير مكشوف",
      "Lapland, Finland": "لابلاند، فنلندا",
      "Uganda":           "أوغندا",
    } as Record<string, string>,
    appCategories: {
      "Flights":        "رحلات جوية",
      "Hotels":         "فنادق",
      "Hostels":        "نزل",
      "Free Stays":     "إقامة مجانية",
      "Activities":     "أنشطة",
      "Transport":      "مواصلات",
      "eSIM":           "شريحة eSIM",
      "Converter":      "محوّل عملات",
      "Cost of Living": "تكلفة المعيشة",
    } as Record<string, string>,
    countryNames: {
      // Europe
      "Austria":                "النمسا",
      "Belgium":                "بلجيكا",
      "Bosnia and Herzegovina": "البوسنة والهرسك",
      "Bulgaria":               "بلغاريا",
      "Croatia":                "كرواتيا",
      "Denmark":                "الدنمارك",
      "Finland":                "فنلندا",
      "France":                 "فرنسا",
      "Germany":                "ألمانيا",
      "Greece":                 "اليونان",
      "Hungary":                "هنغاريا",
      "Italy":                  "إيطاليا",
      "Liechtenstein":          "ليختنشتاين",
      "Luxembourg":             "لوكسمبورغ",
      "Netherlands":            "هولندا",
      "Norway":                 "النرويج",
      "Poland":                 "بولندا",
      "Portugal":               "البرتغال",
      "Romania":                "رومانيا",
      "Slovakia":               "سلوفاكيا",
      "Slovenia":               "سلوفينيا",
      "Spain":                  "إسبانيا",
      "Sweden":                 "السويد",
      "Switzerland":            "سويسرا",
      // Africa
      "Algeria":   "الجزائر",
      "Botswana":  "بوتسوانا",
      "Kenya":     "كينيا",
      "Morocco":   "المغرب",
      "Rwanda":    "رواندا",
      "Tanzania":  "تنزانيا",
      "Tunisia":   "تونس",
      "Uganda":    "أوغندا",
      "Zambia":    "زامبيا",
      "Zimbabwe":  "زيمبابوي",
      // Middle East
      "Qatar":        "قطر",
      "Saudi Arabia": "السعودية",
      "Turkey":       "تركيا",
      "UAE":          "الإمارات",
      // Asia
      "China":     "الصين",
      "Indonesia": "إندونيسيا",
      "Malaysia":  "ماليزيا",
      "Thailand":  "تايلاند",
    } as Record<string, string>,
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
