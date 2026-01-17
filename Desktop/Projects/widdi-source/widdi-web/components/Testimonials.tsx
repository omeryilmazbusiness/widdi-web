'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CTO',
      company: 'TechCorp Global',
      image: '👩‍💼',
      content: 'Widdi transformed our infrastructure with their AI-powered solutions. We achieved 99.99% uptime and reduced operational costs by 40%. Their team\'s expertise in high-volume systems is unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'VP of Engineering',
      company: 'DataFlow Systems',
      image: '👨‍💼',
      content: 'The cloud-native architecture delivered by Widdi scaled seamlessly from 10K to 10M users. Their DevOps practices and CI/CD pipelines are industry-leading. Highly recommended for enterprise projects.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Digital',
      company: 'FinanceHub Inc',
      image: '👩‍💻',
      content: 'Working with Widdi was a game-changer for our digital transformation. Their security-first approach and SOC 2 compliance gave us complete confidence in our partnership.',
      rating: 5,
    },
    {
      name: 'James Thompson',
      role: 'CEO',
      company: 'RetailNext',
      image: '👨‍💼',
      content: 'Widdi\'s microservices architecture enabled us to launch new features 3x faster. Their 24/7 support and proactive monitoring have been invaluable. A true technology partner.',
      rating: 5,
    },
    {
      name: 'Lisa Wang',
      role: 'Chief Product Officer',
      company: 'MedTech Solutions',
      image: '👩‍💼',
      content: 'The AI-powered SaaS platform built by Widdi processes millions of transactions daily with zero downtime. Their technical excellence and attention to detail are exceptional.',
      rating: 5,
    },
    {
      name: 'Robert Kumar',
      role: 'Director of IT',
      company: 'LogiChain Global',
      image: '👨‍��',
      content: 'Migrating to Widdi\'s cloud infrastructure was seamless. Their team managed everything from planning to execution. We now have a scalable, secure, and cost-effective solution.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold tracking-wider backdrop-blur-sm mb-6 uppercase"
          >
            Client Success Stories
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            See how we've helped 500+ enterprise clients achieve their digital transformation goals
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/40 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-light">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '500+', label: 'Enterprise Clients' },
            { value: '98%', label: 'Client Retention' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '50+', label: 'Countries Served' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800"
            >
              <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
