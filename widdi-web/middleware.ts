import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: false,
});

export default intlMiddleware;

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for every page
    '/(ar|tr|en|ku)/:path*',
    // Enable redirects that add missing locales
    '/((?!_next|_vercel|api|.*\\..*).*)'
  ]
};
