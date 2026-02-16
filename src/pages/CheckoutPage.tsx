import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Check, Loader2, Phone, User, MapPin, Gift } from 'lucide-react';
import { supabase, type Order, type Referral } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';

interface CheckoutPageProps {
  onBack: () => void;
}

interface FormData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  referralCode: string;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [referralData, setReferralData] = useState<Referral | null>(null);
  
  const totalPrice = getTotalPrice();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const referralCode = watch('referralCode');

  // Check for referral code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      validateReferral(refCode);
    }
  }, []);

  // Validate referral code
  const validateReferral = async (code: string) => {
    if (!code) {
      setReferralValid(null);
      setReferralData(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referral_code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !data) {
        setReferralValid(false);
        setReferralData(null);
      } else {
        setReferralValid(true);
        setReferralData(data);
      }
    } catch {
      setReferralValid(false);
      setReferralData(null);
    }
  };

  // Debounce referral validation
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (referralCode) {
        validateReferral(referralCode);
      } else {
        setReferralValid(null);
        setReferralData(null);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [referralCode]);

  const generateOrderNumber = () => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    return `ORD${timestamp}`;
  };

  const sendWhatsAppMessage = (order: Order) => {
    const itemsList = order.order_items
      .map((item) => `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
      .join('%0A');

    const message = `🍨 *New Order - Cold Love Ice Cream*%0A%0A` +
      `*Order Number:* ${order.order_number}%0A` +
      `*Customer:* ${order.customer_name}%0A` +
      `*Phone:* ${order.customer_phone}%0A` +
      `*Address:* ${order.delivery_address}%0A%0A` +
      `*Items:*%0A${itemsList}%0A%0A` +
      `*Total:* ₹${order.total_amount}%0A` +
      `*Referral:* ${order.referral_code || 'DIRECT'}%0A` +
      `*Status:* Pending`;

    window.open(`https://wa.me/918810544170?text=${message}`, '_blank');
  };

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      const order: Order = {
        order_number: newOrderNumber,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        delivery_address: data.deliveryAddress,
        order_items: items,
        total_amount: totalPrice,
        referral_code: referralData?.referral_code || null,
        status: 'pending',
      };

      // Insert order
      const { error: orderError } = await supabase.from('orders').insert(order);

      if (orderError) throw orderError;

      // Update referral stats if applicable
      if (referralData) {
        await supabase
          .from('referrals')
          .update({
            total_orders: referralData.total_orders + 1,
            total_revenue: referralData.total_revenue + totalPrice,
          })
          .eq('id', referralData.id);
      }

      // Send WhatsApp notification
      sendWhatsAppMessage(order);

      // Clear cart and show success
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you shortly to confirm.
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p className="text-lg font-bold text-[#FF6B9D]">{orderNumber}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB] text-white font-semibold rounded-2xl"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFF3E0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B9D] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Delivery Details
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    {...register('customerName', { required: 'Name is required' })}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] transition-all"
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    {...register('customerPhone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number',
                      },
                    })}
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] transition-all"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </label>
                  <textarea
                    {...register('deliveryAddress', { required: 'Address is required' })}
                    rows={3}
                    placeholder="Enter your complete delivery address"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#FF6B9D] transition-all resize-none"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>
                  )}
                </div>

                {/* Referral Code */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Gift className="w-4 h-4" />
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <input
                      {...register('referralCode')}
                      type="text"
                      placeholder="Enter referral code"
                      className={`w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 transition-all uppercase ${
                        referralValid === true
                          ? 'ring-2 ring-green-500'
                          : referralValid === false
                          ? 'ring-2 ring-red-500'
                          : 'focus:ring-[#FF6B9D]'
                      }`}
                    />
                    <AnimatePresence>
                      {referralValid !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {referralValid ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <span className="text-red-500 text-xs">Invalid</span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {referralValid === true && referralData && (
                    <p className="text-green-600 text-sm mt-1">
                      Referred by: {referralData.referral_name}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full mt-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#CDB4DB] text-white font-semibold rounded-2xl shadow-lg shadow-[#FF6B9D]/25 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">{item.quantity_info}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#FF6B9D]">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-[#FF6B9D]">₹{totalPrice}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
