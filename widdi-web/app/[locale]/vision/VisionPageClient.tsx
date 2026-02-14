'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamic import for neural background (client-only, no SSR)
const NeuralNetworkBackground = dynamic(
  () => import('@/components/NeuralNetworkBackground'),
  { ssr: false }
);

export default function VisionPageClient({ locale }: { locale: string }) {
  const t = useTranslations('vision');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Neural Network Background - Layer 0 (client-only) */}
      {isMounted && <NeuralNetworkBackground intensity="medium" />}
      
      {/* Dark Gradient Overlay for Readability - Layer 1 */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1,
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)'
        }} 
      />
      
      {/* Page Content - Layer 2 */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-blue-400">{t('hero.badge')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400 mb-4">
                {t('whatWeDo.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('whatWeDo.title')}</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {t('whatWeDo.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-medium text-green-400 mb-4">
                {t('principles.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('principles.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('principles.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['dataFirst', 'scalable', 'transparent', 'pragmatic', 'secure'].map((principle) => (
                <div key={principle} className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {t(`principles.items.${principle}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t(`principles.items.${principle}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400 mb-4">
                {t('solutions.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('solutions.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('solutions.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['automation', 'crm', 'search', 'vision', 'analytics', 'llm'].map((solution) => (
                <div
                  key={solution}
                  className="group p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {t(`solutions.items.${solution}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t(`solutions.items.${solution}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-medium text-orange-400 mb-4">
                {t('useCases.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('useCases.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('useCases.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {['ecommerce', 'finance', 'healthcare', 'manufacturing'].map((useCase) => (
                <div key={useCase} className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {t(`useCases.items.${useCase}.title`)}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        {t(`useCases.items.${useCase}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {t.raw(`useCases.items.${useCase}.examples`).map((example: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <svg className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-medium text-green-400 mb-4">
                {t('process.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('process.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('process.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['discovery', 'prototype', 'deploy', 'improve'].map((step, index) => (
                <div key={step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {t(`process.steps.${step}.number`)}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t(`process.steps.${step}.title`)}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t(`process.steps.${step}.description`)}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-purple-500 to-transparent" style={{ width: 'calc(100% - 4rem)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-medium text-red-400 mb-4">
                {t('security.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('security.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('security.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {['dataPrivacy', 'compliance', 'onPrem'].map((item) => (
                <div key={item} className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-linear-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {t(`security.items.${item}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t(`security.items.${item}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-sm font-medium text-yellow-400 mb-4">
                {t('proof.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('proof.title')}</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t('proof.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['project1', 'project2', 'project3'].map((project) => (
                <div
                  key={project}
                  className="group bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {t(`proof.items.${project}.title`)}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {t(`proof.items.${project}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.raw(`proof.items.${project}.tags`).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-medium text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-900/30 via-purple-900/30 to-black/50 relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
              {t('cta.badge')}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {t('cta.title')}
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={`/${locale}/contact`}>
                <button className="px-8 py-4 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105">
                  {t('cta.primaryButton')}
                </button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <button className="px-8 py-4 bg-white/5 border-2 border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all">
                  {t('cta.secondaryButton')}
                </button>
              </Link>
            </div>

            <p className="text-sm text-gray-400">
              {t('cta.contactInfo')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
