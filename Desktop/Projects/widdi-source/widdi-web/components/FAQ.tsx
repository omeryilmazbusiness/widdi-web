'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What types of enterprises do you serve?',
      answer: 'We serve mid-size to large enterprises across various industries including finance, healthcare, retail, logistics, and technology. Our solutions are designed for companies processing high transaction volumes and requiring enterprise-grade reliability.',
    },
    {
      question: 'What is your average project timeline?',
      answer: 'Project timelines vary based on scope and complexity. Typically, our engagements range from 3-6 months for standard implementations to 12+ months for large-scale digital transformation projects. We provide detailed project plans during the consultation phase.',
    },
    {
      question: 'Do you offer 24/7 technical support?',
      answer: 'Yes, we provide 24/7/365 technical support for all enterprise clients. Our support includes dedicated account management, proactive monitoring, incident response, and regular system health checks. Response times are guaranteed through our SLA.',
    },
    {
      question: 'What security certifications do you maintain?',
      answer: 'We maintain ISO 27001, SOC 2 Type II, and GDPR compliance certifications. Our infrastructure undergoes regular security audits, penetration testing, and vulnerability assessments. We implement industry-leading security practices including encryption at rest and in transit.',
    },
    {
      question: 'Can you integrate with our existing systems?',
      answer: 'Absolutely. We specialize in seamless integration with existing enterprise systems including ERP, CRM, databases, and legacy applications. Our team has extensive experience with APIs, microservices architecture, and data migration strategies.',
    },
    {
      question: 'What is your uptime guarantee?',
      answer: 'We provide a 99.99% uptime SLA for all production environments. This includes redundant infrastructure, automated failover, and disaster recovery capabilities. SLA credits are available for any qualifying downtime as specified in your service agreement.',
    },
    {
      question: 'How do you handle data privacy and compliance?',
      answer: 'Data privacy is our top priority. We comply with GDPR, CCPA, and other regional data protection regulations. All client data is encrypted, access-controlled, and stored in compliance with applicable laws. We conduct regular compliance audits and maintain detailed documentation.',
    },
    {
      question: 'What is your pricing model?',
      answer: 'We offer flexible pricing models including fixed-price projects, time and materials, and managed services subscriptions. Pricing is customized based on project scope, complexity, and ongoing support requirements. Contact us for a detailed proposal.',
    },
    {
      question: 'Do you provide training and documentation?',
      answer: 'Yes, comprehensive training and documentation are included with all implementations. We provide technical documentation, user guides, video tutorials, and hands-on training sessions for your team. Post-launch support ensures smooth adoption.',
    },
    {
      question: 'How scalable are your solutions?',
      answer: 'Our solutions are designed for massive scale from day one. We use cloud-native architecture, microservices, and containerization to ensure horizontal scalability. Many of our clients have scaled from thousands to millions of users without infrastructure changes.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold tracking-wider backdrop-blur-sm mb-6 uppercase"
          >
            FAQ
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Find answers to common questions about our enterprise solutions and services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl bg-gray-900/50 border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <span className="text-base font-semibold text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={false}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm text-gray-400 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-sm text-gray-400 mb-6 font-light">
            Our enterprise solutions team is here to help. Get in touch for personalized assistance.
          </p>
          <motion.a
            href="/contact"
            initial={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            Contact Our Team
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
