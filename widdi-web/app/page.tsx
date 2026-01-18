import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n.config';

// Root page redirects to default locale
// All actual content is in app/[locale]/page.tsx
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
