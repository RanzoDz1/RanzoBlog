// Standalone data-level translation maps — imported directly by components
// No dependency on React context

export const STORY_TAGS_AR: Record<string, string> = {
  "Origin Story":   "قصة البدايات",
  "Budget Travel":  "سفر بالكاد",
  "Africa":         "أفريقيا",
  "Ancient Living": "العيش القديم",
  "Northern Lights":"الشفق القطبي",
  "Danger":         "خطر",
};

export const STORY_LOCATIONS_AR: Record<string, string> = {
  "Algeria":          "الجزائر",
  "Across Europe":    "عبر أوروبا",
  "East Africa":      "شرق أفريقيا",
  "Undisclosed":      "غير مكشوف",
  "Lapland, Finland": "لابلاند، فنلندا",
  "Uganda":           "أوغندا",
};

export const APP_CATEGORIES_AR: Record<string, string> = {
  "Flights":        "رحلات جوية",
  "Hotels":         "فنادق",
  "Hostels":        "نزل",
  "Free Stays":     "إقامة مجانية",
  "Activities":     "أنشطة",
  "Transport":      "مواصلات",
  "eSIM":           "شريحة eSIM",
  "Converter":      "محوّل عملات",
  "Cost of Living": "تكلفة المعيشة",
};

export const COUNTRY_NAMES_AR: Record<string, string> = {
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
};

/** Returns Arabic translation if lang is "ar", otherwise returns the original string */
export function tr(map: Record<string, string>, key: string, lang: string): string {
  if (lang !== "ar") return key;
  return map[key] ?? key;
}
