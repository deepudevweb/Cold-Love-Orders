import { motion } from 'framer-motion';
import { Heart, Award, Leaf, Users } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Perfection',
      description: 'Every batch is crafted with love and attention to detail, ensuring the highest quality in every scoop.',
      color: '#FF6B9D',
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'We source only the finest natural ingredients, free from artificial preservatives and flavors.',
      color: '#4ADE80',
    },
    {
      icon: Award,
      title: 'Artisanal Excellence',
      description: 'Our time-honored recipes and modern techniques create ice cream that\'s truly exceptional.',
      color: '#CDB4DB',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in giving back to our community and creating moments of joy for everyone.',
      color: '#60A5FA',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="gradient-text">Story</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cold Love Ice Cream was born from a simple dream: to create the most delightful 
            ice cream experience using only the finest natural ingredients. What started as 
            a small kitchen experiment has grown into a beloved brand, but our commitment to 
            quality and craftsmanship remains unchanged.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our <span className="gradient-text">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <value.icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB] rounded-3xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            To spread happiness, one scoop at a time. We are dedicated to creating 
            unforgettable ice cream experiences that bring people together and create 
            lasting memories. Every flavor tells a story, and every bite is a celebration 
            of life\'s sweet moments.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
