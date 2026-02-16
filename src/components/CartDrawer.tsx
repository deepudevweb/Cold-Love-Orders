import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B9D]/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B9D]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
                  <p className="text-sm text-gray-500">{items.length} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-[#E0F7FA] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-[#CDB4DB]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Add some delicious ice cream to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{item.quantity_info}</p>
                        <p className="text-[#FF6B9D] font-bold mt-2">
                          ₹{item.price}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-[#FF6B9D] flex items-center justify-center hover:bg-[#ff4d8a] transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-800">₹{totalPrice}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB] text-white font-semibold rounded-2xl shadow-lg shadow-[#FF6B9D]/25 hover:shadow-xl transition-shadow"
                >
                  Proceed to Checkout
                </motion.button>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
