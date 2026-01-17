'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  service: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const contactMethods = [
    {
      title: 'Enterprise Email',
      value: 'enterprise@widdigroup.com',
      description: '24/7 Support Available',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      title: 'Sales Inquiries',
      value: 'sales@widdigroup.com',
      description: 'Business Development Team',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      title: 'Global Headquarters',
      value: 'San Francisco, CA',
      description: 'Operating in 50+ Countries',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      title: 'Technical Support',
      value: 'support@widdigroup.com',
      description: 'Infrastructure & Integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
  ];

  const benefits = [
    {
      title: 'Enterprise-Grade Security',
      description: 'ISO 27001 & SOC 2 certified infrastructure',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: '99.99% Uptime SLA',
      description: 'Mission-critical reliability guarantee',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: 'Dedicated Support Team',
      description: '24/7/365 technical assistance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'Proven Track Record',
      description: '500+ successful enterprise deployments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <Hero3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold tracking-wider backdrop-blur-sm mb-6 uppercase"
          >
            Get In Touch
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Start Your Digital Transformation
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Connect with our enterprise solutions team to discuss your project requirements and explore how Widdi can accelerate your business growth
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Methods Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-5 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/40 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-105 transition-transform">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 text-sm">{method.title}</h3>
                      <p className="text-blue-400 text-sm font-medium mb-0.5 truncate">{method.value}</p>
                      <p className="text-gray-500 text-xs">{method.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-8 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Why Partner With Widdi?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="text-blue-400 mt-0.5">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                      <p className="text-gray-400 text-xs font-light">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="p-6 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-800"
            >
              <p className="text-xs text-gray-500 mb-4 text-center">Trusted by 500+ enterprise clients worldwide</p>
              <div className="flex justify-center items-center gap-6 text-gray-600">
                <div className="text-center">
                  <div className="text-xs font-semibold">ISO 27001</div>
                  <div className="text-[10px] text-gray-700">Certified</div>
                </div>
                <div className="w-px h-8 bg-gray-800"></div>
                <div className="text-center">
                  <div className="text-xs font-semibold">SOC 2 Type II</div>
                  <div className="text-[10px] text-gray-700">Compliant</div>
                </div>
                <div className="w-px h-8 bg-gray-800"></div>
                <div className="text-center">
                  <div className="text-xs font-semibold">GDPR</div>
                  <div className="text-[10px] text-gray-700">Compliant</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enterprise Consultation Form */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm shadow-xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Request Enterprise Consultation
              </h2>
              <p className="text-sm text-gray-400 mb-6 font-light">
                Fill out the form below and our team will contact you within 24 hours
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john.smith@company.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      {...register('company', { required: 'Company name is required' })}
                      className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Acme Corporation"
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1.5">{errors.company.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Solution Required *
                  </label>
                  <select
                    {...register('service', { required: 'Please select a solution' })}
                    className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a solution</option>
                    <option value="ai-saas">AI-Powered SaaS Platform</option>
                    <option value="high-volume">High-Volume System Management</option>
                    <option value="cloud-native">Cloud-Native Architecture</option>
                    <option value="digital-transformation">Digital Transformation</option>
                    <option value="devops">DevOps & CI/CD Pipeline</option>
                    <option value="security">Security & Compliance</option>
                    <option value="consulting">Enterprise Consulting</option>
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1.5">{errors.service.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Budget (USD)
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k+">$500,000+</option>
                    <option value="discuss">Prefer to discuss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Requirements *
                  </label>
                  <textarea
                    {...register('message', { required: 'Please describe your project requirements' })}
                    rows={4}
                    className="w-full px-4 py-3 text-sm rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please describe your project scope, technical requirements, and business objectives..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                <motion.button
                  initial={false}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-lg font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Consultation Request
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </motion.button>

                {submitSuccess && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 text-green-400 rounded-lg text-center font-medium text-sm border border-green-500/30 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Request submitted successfully! Our team will contact you within 24 hours.
                  </motion.div>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
