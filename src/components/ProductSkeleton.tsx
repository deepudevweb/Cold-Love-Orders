import { motion } from 'framer-motion';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden soft-shadow">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
