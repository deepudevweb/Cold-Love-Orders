import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imhwibvrkdcekjthqfgu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltaHdpYnZya2RjZWtqdGhxZmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTc3ODcsImV4cCI6MjA4Njc3Mzc4N30.p_Bapmscdu8A1GDgLLViLtaGE0DoKTj4jeb5ytdKeWA';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  quantity_info: string;
  is_available: boolean;
  created_at: string;
};

export type Order = {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  order_items: CartItem[];
  total_amount: number;
  referral_code: string | null;
  status: string;
  created_at?: string;
};

export type Referral = {
  id: string;
  referral_code: string;
  referral_name: string;
  referral_phone: string;
  total_orders: number;
  total_revenue: number;
  is_active: boolean;
  created_at: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  quantity_info: string;
};
