import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeletonGrid } from '@/components/ProductSkeleton';
import { seedProducts } from '@/data/products';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await seedProducts();
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true)
          .order('name');

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 2500]);
    setSortBy('name');
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-gray-600">
            Discover our delicious range of artisanal ice creams
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-8 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] transition-all"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-gray-700"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] text-gray-700"
              >
                <option value="all">All Categories</option>
                {categories
                  .filter((c) => c !== 'all')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] text-gray-700"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 text-gray-500 hover:text-[#FF6B9D] transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-gray-100 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0"
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter((c) => c !== 'all')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 text-[#FF6B9D] font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductSkeletonGrid count={9} />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#FF6B9D] text-white rounded-full"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#FF6B9D] text-white rounded-full"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
