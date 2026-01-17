'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'We collect information you provide directly to us, including name, email address, company information, and any other information you choose to provide when using our services.',
        'We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, operating system, and usage data.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide, maintain, and improve our services and develop new features',
        'To process transactions and send related information including confirmations and invoices',
        'To send technical notices, updates, security alerts, and support messages',
        'To respond to your comments, questions, and provide customer service',
        'To monitor and analyze trends, usage, and activities in connection with our services',
      ],
    },
    {
      title: 'Information Sharing and Disclosure',
      content: [
        'We do not share, sell, rent, or trade your personal information with third parties for their promotional purposes.',
        'We may share your information with third-party service providers who perform services on our behalf, subject to confidentiality obligations.',
        'We may disclose your information if required by law or in response to valid legal requests.',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information, including encryption, access controls, and secure data storage.',
        'Our infrastructure is ISO 27001 and SOC 2 Type II certified, ensuring the highest security standards.',
        'We regularly conduct security audits and vulnerability assessments to maintain data protection.',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.',
        'When you delete your account, we will delete or anonymize your personal information within 30 days.',
        'We may retain certain information for legitimate business purposes or as required by law.',
      ],
    },
    {
      title: 'Your Rights (GDPR)',
      content: [
        'Right to access: You can request a copy of your personal data',
        'Right to rectification: You can request correction of inaccurate data',
        'Right to erasure: You can request deletion of your personal data',
        'Right to data portability: You can request transfer of your data',
        'Right to object: You can object to processing of your personal data',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar tracking technologies to collect and track information about your use of our services.',
        'You can control cookies through your browser settings and opt-out of certain tracking.',
        'For more information, please see our Cookie Policy.',
      ],
    },
    {
      title: 'International Data Transfers',
      content: [
        'Your information may be transferred to and processed in countries other than your country of residence.',
        'We ensure appropriate safeguards are in place for international data transfers in compliance with GDPR.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold tracking-wider backdrop-blur-sm mb-6 uppercase"
          >
            Legal
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-400 font-light">
            Last updated: January 15, 2026
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-6 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30"
        >
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            At Widdi, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our services. We are committed to protecting your personal 
            data and complying with applicable data protection laws, including GDPR and CCPA.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm text-gray-400 leading-relaxed font-light pl-11">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-900/40 border border-gray-800"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-sm text-gray-400 mb-6 font-light">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-light">privacy@widdigroup.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-light">San Francisco, CA, United States</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/contact">
              <motion.button
                initial={false}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Contact Our Team
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
