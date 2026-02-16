// import { getProductImage } from '../config/images';

// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   description: string;
//   image_url: string;
//   quantity_info: string;
//   is_available: boolean;
//   created_at?: string;
// }

// const rawProducts = [
//   { "name":"Valentine's Special Mango Raspberry Ice Cream Cake","category":"Valentine's Day Special","price":2119,"quantity_info":"1 kg" },
//   { "name":"Dark Chocolate Caramel Crunch Mini Bar","category":"Mini Ice Cream Bars (Low Calorie)","price":149,"quantity_info":"Pack of 2" },
//   { "name":"Sugar-Free Chocolate Mini Bar","category":"Mini Ice Cream Bars (Low Calorie)","price":169,"quantity_info":"Pack of 2" },
//   { "name":"Mocha Ice Cream Sandwich","category":"Ice Cream Sandwiches (Low Calorie)","price":169,"quantity_info":"1 piece" },
//   { "name":"Vanilla Choco Chip Ice Cream Sandwich","category":"Ice Cream Sandwiches (Low Calorie)","price":169,"quantity_info":"1 piece" },
//   { "name":"Mango Strawberry Ice Cream Sandwich","category":"Ice Cream Sandwiches (Low Calorie)","price":169,"quantity_info":"1 piece" },
//   { "name":"Sugar-Free Strawberry Ice Cream","category":"Sugar Free & Vegan Ice Cream (Low Cal)","price":159,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Sugar-Free Chocolate Ice Cream","category":"Sugar Free & Vegan Ice Cream (Low Cal)","price":159,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Sugar-Free Mixed-Berry Ice Cream","category":"Sugar Free & Vegan Ice Cream (Low Cal)","price":159,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Mango Ice Cream","category":"Ice Cream Cups from Rs 79 (120ML)","price":79,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Chocolate Fudge-A-Licious Ice Cream Scoop","category":"Special","price":99,"quantity_info":"1 Scoop, 120 Ml" },
//   { "name":"Chocolate Hazelnut Ice Cream","category":"Special","price":99,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Waffle Cone","category":"Waffle Cone","price":25,"quantity_info":"1 Piece" },
//   { "name":"Salted Butter Caramel Ice Cream","category":"Ice Cream Cups from Rs 79 (120ML)","price":99,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Boozy Baileys Ice Cream","category":"Premium","price":129,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Cold Love Experience Box","category":"Taster Box","price":295,"quantity_info":"4 cups" },
//   { "name":"Ice Cream Sandwiches Family Pack","category":"Ice Cream Sandwiches (Low Calorie)","price":649,"quantity_info":"5 pieces" },
//   { "name":"Strawberry Ice Cream","category":"Classic","price":79,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Vanilla Ice Cream","category":"Classic","price":79,"quantity_info":"1 Cup, 120 Ml" },
//   { "name":"Mini Bars Family Pack","category":"Mini Ice Cream Bars (Low Calorie)","price":599,"quantity_info":"5 pieces" },
//   { "name":"Cookie Dough Choco Chip Sandwich","category":"Ice Cream Sandwiches (Low Calorie)","price":169,"quantity_info":"1 piece" },
//   { "name":"Chocolate Fudge-a-licious Ice Cream Sandwich","category":"Ice Cream Sandwiches (Low Calorie)","price":169,"quantity_info":"1 piece" },
//   { "name":"Sugar-Free Coffee Mini Bars","category":"Mini Ice Cream Bars (Low Calorie)","price":169,"quantity_info":"Pack of 2" },
//   { "name":"Classic Choco Mini Bar","category":"Mini Ice Cream Bars (Low Calorie)","price":149,"quantity_info":"Pack of 2" },
//   { "name":"Strawberry Mini Bars","category":"Mini Ice Cream Bars (Low Calorie)","price":149,"quantity_info":"Pack of 2" }
// ];

// export const products: Product[] = rawProducts.map((p, index) => ({
//   id: `prod_${index + 1}`,
//   name: p.name,
//   category: p.category,
//   price: p.price,
//   description: `Premium artisanal ${p.name.toLowerCase()}, crafted with love for the perfect indulgence.`,
//   image_url: getProductImage(p.name),
//   quantity_info: p.quantity_info,
//   is_available: true,
//   created_at: new Date().toISOString()
// }));

// export const categories = Array.from(new Set(products.map(p => p.category)));

// export const getProductById = (id: string): Product | undefined => {
//   return products.find(p => p.id === id);
// };

// export const getProductsByCategory = (category: string): Product[] => {
//   return products.filter(p => p.category === category);
// };

// export const featuredProducts = products.slice(0, 8);

// // Re-export for backward compatibility
// export { getProductImage };

// // Seed products to Supabase
// export const seedProducts = async () => {
//   const { supabase } = await import('@/lib/supabase');
  
//   // Check if products already exist
//   const { data: existingProducts, error: checkError } = await supabase
//     .from('products')
//     .select('id')
//     .limit(1);
  
//   if (checkError) {
//     console.error('Error checking products:', checkError);
//     return;
//   }
  
//   if (existingProducts && existingProducts.length > 0) {
//     console.log('Products already seeded');
//     return;
//   }
  
//   // Prepare products for insertion
//   const productsToInsert = products.map((product) => ({
//     name: product.name,
//     category: product.category,
//     price: product.price,
//     description: product.description,
//     image_url: product.image_url,
//     quantity_info: product.quantity_info,
//     is_available: product.is_available,
//   }));
  
//   const { error: insertError } = await supabase
//     .from('products')
//     .insert(productsToInsert);
  
//   if (insertError) {
//     console.error('Error seeding products:', insertError);
//   } else {
//     console.log('Products seeded successfully');
//   }
// };


export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  quantity_info: string;
  is_available: boolean;
  created_at?: string;
}

const rawProducts = [
  {
    name: "Valentine's Special Mango Raspberry Ice Cream Cake",
    category: "Valentine's Day Special",
    price: 2119,
    quantity_info: "1 kg",
    image_url:
      "https://ik.imagekit.io/deepu0090/1000026682.png",
  },
  {
    name: "Dark Chocolate Caramel Crunch Mini Bar",
    category: "Mini Ice Cream Bars (Low Calorie)",
    price: 149,
    quantity_info: "Pack of 2",
    image_url:
      "https://ik.imagekit.io/deepu0090/Dark%20Chocolate%20Caramel%20Crunch%20Mini%20Bar%20(1).jpg",
  },
  {
    name: "Classic Choco Mini Bar",
    category: "Mini Ice Cream Bars (Low Calorie)",
    price: 149,
    quantity_info: "Pack of 2",
    image_url:
      "https://ik.imagekit.io/deepu0090/Classic%20Choco%20Mini%20Bar%20(1).jpg",
  },
  {
    name: "Strawberry Mini Bars",
    category: "Mini Ice Cream Bars (Low Calorie)",
    price: 149,
    quantity_info: "Pack of 2",
    image_url:
      "https://ik.imagekit.io/deepu0090/Strawberry%20Mini%20Bar%20(2).png",
  },
  {
    name: "Mocha Ice Cream Sandwich",
    category: "Ice Cream Sandwiches (Low Calorie)",
    price: 169,
    quantity_info: "1 piece",
    image_url:
      "https://ik.imagekit.io/deepu0090/Mocha%20Ice%20Cream%20Sandwich%20(1).jpg",
  },
  {
    name: "Vanilla Choco Chip Ice Cream Sandwich",
    category: "Ice Cream Sandwiches (Low Calorie)",
    price: 169,
    quantity_info: "1 piece",
    image_url:
      "https://ik.imagekit.io/deepu0090/Vanilla%20Choco%20Chip%20Ice%20Cream%20Sandwich%20(1)%20(1).jpg",
  },
  {
    name: "Mango Strawberry Ice Cream Sandwich",
    category: "Ice Cream Sandwiches (Low Calorie)",
    price: 169,
    quantity_info: "1 piece",
    image_url:
      "https://ik.imagekit.io/deepu0090/Mango%20Strawberry%20Ice%20Cream%20Sandwich%20(1).jpg",
  },
  {
    name: "Sugar-Free Chocolate Ice Cream",
    category: "Sugar Free & Vegan Ice Cream (Low Cal)",
    price: 159,
    quantity_info: "1 Cup, 120 Ml",
    image_url:
      "https://ik.imagekit.io/deepu0090/Sugar-Free%20Chocolate%20Ice%20Cream.jpg",
  },
  {
    name: "Sugar-Free Mixed-Berry Ice Cream",
    category: "Sugar Free & Vegan Ice Cream (Low Cal)",
    price: 159,
    quantity_info: "1 Cup, 120 Ml",
    image_url:
      "https://ik.imagekit.io/deepu0090/Sugar-Free%20Mixed-Berry%20Ice%20Cream.jpg",
  },
  {
    name: "Mango Ice Cream",
    category: "Ice Cream Cups from Rs 79 (120ML)",
    price: 79,
    quantity_info: "1 Cup, 120 Ml",
    image_url:
      "https://ik.imagekit.io/deepu0090/Mangi_ice_Cream.jpg",
  },
  {
    name: "Salted Butter Caramel Ice Cream",
    category: "Ice Cream Cups from Rs 79 (120ML)",
    price: 99,
    quantity_info: "1 Cup, 120 Ml",
    image_url:
      "https://ik.imagekit.io/deepu0090/salted_butter_caramel.png",
  },
];


export const products: Product[] = rawProducts.map((p, index) => ({
  id: `prod_${index + 1}`,
  name: p.name,
  category: p.category,
  price: p.price,
  description: `Premium artisanal ${p.name.toLowerCase()}, crafted with love for the perfect indulgence.`,
  image_url: p.image_url,
  quantity_info: p.quantity_info,
  is_available: true,
  created_at: new Date().toISOString(),
}));


export const categories = Array.from(new Set(products.map(p => p.category)));

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter(p => p.category === category);

export const featuredProducts = products.slice(0, 8);


export const seedProducts = async () => {
  const { supabase } = await import('@/lib/supabase');

  const productsToInsert = products.map((product) => ({
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    image_url: product.image_url,
    quantity_info: product.quantity_info,
    is_available: product.is_available,
  }));

  const { error } = await supabase
    .from('products')
    .upsert(productsToInsert, { onConflict: 'name' });

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log('Products upserted successfully');
  }
};
