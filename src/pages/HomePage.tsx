import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Heart, Leaf, Truck, Award, Sparkles } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeletonGrid } from '@/components/ProductSkeleton';
import { seedProducts } from '@/data/products';

import 'swiper/css';
import 'swiper/css/pagination';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Seed products if needed
        await seedProducts();

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true)
          .limit(8);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every scoop is crafted with passion and care',
      color: '#FF6B9D',
      bgColor: '#FFE4EC',
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'Only the finest natural ingredients used',
      color: '#4ADE80',
      bgColor: '#DCFCE7',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and safe delivery to your doorstep',
      color: '#60A5FA',
      bgColor: '#DBEAFE',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Award-winning artisanal ice cream recipes',
      color: '#CDB4DB',
      bgColor: '#F3E8FF',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0F7FA] via-[#FFF3E0] to-[#FFE4EC]" />
        
        {/* Floating Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B9D]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#CDB4DB]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFC971]/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B9D]" />
              <span className="text-sm font-medium text-gray-700">
                Premium Artisanal Ice Cream
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Taste the{' '}
              <span className="gradient-text">Cold Love</span>
              <br />
              Experience
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Indulge in our handcrafted artisanal ice cream, made with love and the finest
              natural ingredients. Every scoop tells a story of passion and perfection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB] text-white font-semibold rounded-full shadow-lg shadow-[#FF6B9D]/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                View Menu
              </motion.button>
            </div>
          </motion.div>

          {/* Floating Ice Cream Icons */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-20 hidden lg:block"
          >
            <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl">
              🍦
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-40 left-20 hidden lg:block"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl">
              🍨
            </div>
          </motion.div>
        </div>

        {/* Wavy Bottom */}
        <div className="wavy-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#FFF3E0"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="gradient-text">Delights</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved flavors, crafted to perfection for your indulgence
            </p>
          </motion.div>

          {isLoading ? (
            <ProductSkeletonGrid count={4} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {featuredProducts.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('products')}
              className="px-8 py-3 border-2 border-[#FF6B9D] text-[#FF6B9D] font-semibold rounded-full hover:bg-[#FF6B9D] hover:text-white transition-all"
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="gradient-text">Cold Love</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in creating moments of joy through exceptional ice cream experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl transition-all duration-300"
                style={{ backgroundColor: feature.bgColor }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Experience Cold Love?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Order now and get your favorite artisanal ice cream delivered fresh to your doorstep
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('products')}
              className="px-10 py-4 bg-white text-[#FF6B9D] font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
