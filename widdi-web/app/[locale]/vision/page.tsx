import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VisionShowcase from '@/components/VisionShowcase';
import VisionPageClient from './VisionPageClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vision.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function VisionPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <VisionPageClient key={locale} locale={locale} />
      <VisionShowcase key={`showcase-${locale}`} />
    </>
  );
}