import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../i18n.config';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined and valid
  const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
