'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Widdi\'s services, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you may not access or use our services.',
        'We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.',
      ],
    },
    {
      title: 'Service Description',
      content: [
        'Widdi provides enterprise-grade AI-powered software solutions, including SaaS platforms, high-volume system management, and cloud architecture services.',
        'Our services are designed for business and enterprise use and are subject to the specific terms of your service agreement.',
        'We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.',
      ],
    },
    {
      title: 'Account Registration',
      content: [
        'You must provide accurate, complete, and current information during registration.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to notify us immediately of any unauthorized access to your account.',
        'You may not use another user\'s account without permission.',
      ],
    },
    {
      title: 'Acceptable Use',
      content: [
        'You agree not to use our services for any unlawful or prohibited purpose.',
        'You may not attempt to gain unauthorized access to any part of our services or systems.',
        'You may not interfere with or disrupt the integrity or performance of our services.',
        'You may not use our services to transmit viruses, malware, or any malicious code.',
        'You may not copy, modify, or distribute our proprietary content without authorization.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content, features, and functionality of our services are owned by Widdi and protected by international copyright, trademark, and other intellectual property laws.',
        'You retain ownership of any data you upload to our services.',
        'You grant us a limited license to use your data solely to provide our services to you.',
        'Our trademarks, logos, and service marks may not be used without prior written consent.',
      ],
    },
    {
      title: 'Service Level Agreement (SLA)',
      content: [
        'We commit to maintaining 99.99% uptime for our enterprise services as detailed in your service agreement.',
        'Scheduled maintenance windows will be communicated in advance.',
        'SLA credits may be available for qualifying downtime as specified in your agreement.',
        'Support response times are defined based on your service tier.',
      ],
    },
    {
      title: 'Payment Terms',
      content: [
        'Fees for our services are specified in your service agreement and are payable in advance.',
        'All fees are non-refundable except as required by law or as specified in your agreement.',
        'We reserve the right to change our pricing with 30 days\' notice to existing customers.',
        'Failure to pay may result in suspension or termination of services.',
      ],
    },
    {
      title: 'Data Protection and Privacy',
      content: [
        'We process your data in accordance with our Privacy Policy and applicable data protection laws.',
        'We implement industry-standard security measures to protect your data.',
        'You are responsible for ensuring your use of our services complies with applicable data protection regulations.',
      ],
    },
    {
      title: 'Warranties and Disclaimers',
      content: [
        'Our services are provided "as is" without warranties of any kind, except as specified in your service agreement.',
        'We do not warrant that our services will be uninterrupted, error-free, or completely secure.',
        'We disclaim all implied warranties including merchantability and fitness for a particular purpose.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, Widdi shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
        'Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.',
      ],
    },
    {
      title: 'Termination',
      content: [
        'You may terminate your account at any time by contacting our support team.',
        'We may suspend or terminate your access for violation of these terms or for any other reason with reasonable notice.',
        'Upon termination, your right to use our services will immediately cease.',
        'Provisions that by their nature should survive termination shall survive.',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        'These terms are governed by the laws of the State of California, United States.',
        'Any disputes shall be resolved in the state or federal courts located in San Francisco, California.',
        'You agree to submit to the personal jurisdiction of these courts.',
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
            className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold tracking-wider backdrop-blur-sm mb-6 uppercase"
          >
            Legal
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Terms of Service
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
          className="mb-12 p-6 rounded-xl bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30"
        >
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            These Terms of Service ("Terms") govern your access to and use of Widdi's services, software, and websites 
            (collectively, the "Services"). Please read these Terms carefully before using our Services.
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
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-bold">
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
          <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
          <p className="text-sm text-gray-400 mb-6 font-light">
            If you have any questions about these Terms of Service, please contact our legal team:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-light">legal@widdigroup.com</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Contact Legal Team
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm"
        >
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </Link>
          <span className="hidden sm:block text-gray-700">•</span>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
