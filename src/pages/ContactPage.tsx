import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send } from 'lucide-react';

export function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 8851455076',
      href: 'tel:+918851455076',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@coldloveicecream.com',
      href: 'mailto:hello@coldloveicecream.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sun: 10:00 AM - 10:00 PM',
      href: null,
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Available for delivery across the city',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to place a custom order? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#FF6B9D]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-600 hover:text-[#FF6B9D] transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF6B9D] hover:text-white transition-colors text-gray-600"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#FF6B9D] to-[#CDB4DB] rounded-3xl p-8 text-white h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">
                Order via WhatsApp
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                The fastest way to get your favorite ice cream! Send us a message on 
                WhatsApp and we'll process your order right away.
              </p>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/918851455076"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#FF6B9D] font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
                Chat on WhatsApp
              </motion.a>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Quick Tip:</strong> Save our number 
                  +91 8851455076 to your contacts for faster ordering next time!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
