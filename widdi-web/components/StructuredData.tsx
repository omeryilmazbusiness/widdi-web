'use client';

import Script from 'next/script';

interface StructuredDataProps {
  type: 'service' | 'product' | 'article' | 'faq' | 'breadcrumb';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'Widdi',
            url: 'https://widdigroup.com',
          },
          areaServed: 'Worldwide',
          serviceType: data.serviceType,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
          },
        };

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: 'Widdi',
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.headline,
          description: data.description,
          author: {
            '@type': 'Organization',
            name: 'Widdi',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Widdi',
            logo: {
              '@type': 'ImageObject',
              url: 'https://widdigroup.com/logo.png',
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified,
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.questions.map((q: any) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer,
            },
          })),
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
