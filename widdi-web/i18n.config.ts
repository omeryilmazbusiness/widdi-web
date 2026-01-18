export const locales = ['ar', 'tr', 'en', 'ku'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  tr: 'Türkçe',
  en: 'English',
  ku: 'Kurdî', // Kurmanji Kurdish (Latin alphabet)
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  ar: 'rtl',
  tr: 'ltr',
  en: 'ltr',
  ku: 'ltr', // Kurmanji uses Latin script (LTR)
};
