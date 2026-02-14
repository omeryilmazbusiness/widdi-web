'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ShowcaseItem {
  src: string;
  titleKey: string;
  descKey: string;
  category: string;
}

const showcaseItems: ShowcaseItem[] = [
  { src: '/aitech.png', titleKey: 'aitech', descKey: 'aitechDesc', category: 'AI Technology' },
  { src: '/business.png', titleKey: 'business', descKey: 'businessDesc', category: 'Business Solutions' },
  { src: '/strategical.png', titleKey: 'strategical', descKey: 'strategicalDesc', category: 'Strategy' },
  { src: '/studio.png', titleKey: 'studio', descKey: 'studioDesc', category: 'Creative Studio' },
  { src: '/studio2.png', titleKey: 'studio2', descKey: 'studio2Desc', category: 'Production' },
  { src: '/image.png', titleKey: 'innovation', descKey: 'innovationDesc', category: 'Innovation' },
];

export default function VisionShowcase() {
  const t = useTranslations('vision.showcase');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-500/30 border border-purple-400/40 rounded-full text-sm font-medium text-purple-200 mb-4">
              {t('badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">{t('title')}</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseItems.map((item, index) => (
              <div
                key={item.src}
                className="group relative bg-gradient-to-br from-gray-700/70 to-gray-800/70 rounded-2xl overflow-hidden border-2 border-gray-500/60 hover:border-purple-400/80 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={t(`items.${item.titleKey}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-100 group-hover:brightness-125"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-400/40 border border-purple-300/60 rounded-full text-xs font-medium text-white mb-2 shadow-lg">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                        {t(`items.${item.titleKey}.title`)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-800/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors drop-shadow">
                    {t(`items.${item.titleKey}.title`)}
                  </h3>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {t(`items.${item.titleKey}.description`)}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full mb-6 rounded-2xl overflow-hidden">
              <Image
                src={showcaseItems[selectedImage].src}
                alt={t(`items.${showcaseItems[selectedImage].titleKey}.title`)}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs font-medium text-purple-300 mb-3">
                {showcaseItems[selectedImage].category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`items.${showcaseItems[selectedImage].titleKey}.title`)}
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {t(`items.${showcaseItems[selectedImage].titleKey}.description`)}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          {selectedImage > 0 && (
            <button
              className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selectedImage < showcaseItems.length - 1 && (
            <button
              className="absolute right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}