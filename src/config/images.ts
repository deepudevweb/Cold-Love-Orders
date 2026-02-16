// Product Images Configuration
// Maps product names to their ImageKit URLs

export const productImages: Record<string, string> = {
  // Ice Cream Sandwiches (Low Calorie)
  "Chocolate Fudge-a-licious Ice Cream Sandwich": "https://ik.imagekit.io/deepu0090/Chocolate%20Fudge-a-licious%20Ice%20Cream%20Sandwich%20(1).jpg",
  "Mango Strawberry Ice Cream Sandwich": "https://ik.imagekit.io/deepu0090/Mango%20Strawberry%20Ice%20Cream%20Sandwich%20(1).jpg",
  "Vanilla Choco Chip Ice Cream Sandwich": "https://ik.imagekit.io/deepu0090/Vanilla%20Choco%20Chip%20Ice%20Cream%20Sandwich%20(1)%20(1).jpg",
  "Mocha Ice Cream Sandwich": "https://ik.imagekit.io/deepu0090/Mocha%20Ice%20Cream%20Sandwich%20(1).jpg",
  "Cookie Dough Choco Chip Sandwich": "https://ik.imagekit.io/deepu0090/Cookie%20Dough%20Choco%20Chip%20Sandwich%20(1).jpg",
  
  // Mini Ice Cream Bars (Low Calorie)
  "Strawberry Mini Bars": "https://ik.imagekit.io/deepu0090/Strawberry%20Mini%20Bar%20(2).png",
  "Classic Choco Mini Bar": "https://ik.imagekit.io/deepu0090/Classic%20Choco%20Mini%20Bar%20(1).jpg",
  "Dark Chocolate Caramel Crunch Mini Bar": "https://ik.imagekit.io/deepu0090/Dark%20Chocolate%20Caramel%20Crunch%20Mini%20Bar%20(1).jpg",
  
  // Sugar Free & Vegan Ice Cream (Low Cal)
  "Sugar-Free Mixed-Berry Ice Cream": "https://ik.imagekit.io/deepu0090/Sugar-Free%20Mixed-Berry%20Ice%20Cream%20-1%20Cup,%20120%20Ml-%20(1).jpg.png",
  "Sugar-Free Chocolate Ice Cream": "https://ik.imagekit.io/deepu0090/Sugar-Free%20Chocolate%20Ice%20Cream%20-1%20Cup,%20120%20Ml-%20(1).jpg.png",
  
  // Additional products from new URLs
  "Mango Ice Cream": "https://ik.imagekit.io/deepu0090/Mangi_ice_Cream.jpg",
  "Cookie Dough Ice Cream": "https://ik.imagekit.io/deepu0090/COOKIE_DOUGH.png",
  "Strawberry Ice Cream": "https://ik.imagekit.io/deepu0090/sTRAWBERRRY.jpg",
  "Salted Butter Caramel Ice Cream": "https://ik.imagekit.io/deepu0090/salted_butter_caramel.png",
  "Valentine's Special Mango Raspberry Ice Cream Cake": "https://ik.imagekit.io/deepu0090/valentine_cake.jpg",
};

// Helper function to get image URL for a product
export const getProductImage = (productName: string): string => {
  // Try exact match first
  if (productImages[productName]) {
    return productImages[productName];
  }
  
  // Try partial match for products with similar names
  const normalizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const [key, url] of Object.entries(productImages)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if product name contains key or vice versa
    if (normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName)) {
      return url;
    }
    
    // Check for key words match - more flexible matching
    const keyWords = normalizedKey.split(/(?=[A-Z])/).filter(w => w.length > 2);
    const nameWords = normalizedName.split(/(?=[A-Z])/).filter(w => w.length > 2);
    
    const commonWords = keyWords.filter(kw => 
      nameWords.some(nw => nw.includes(kw) || kw.includes(nw))
    );
    
    if (commonWords.length >= 2) {
      return url;
    }
  }
  
  // Fallback to placeholder with unique seed based on product name
  const seed = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}/400/400`;
};

// Logo
export const logoImage = "https://ik.imagekit.io/deepu0090/Cold%20Love_Logo%20mockup_Horizontal_with%20ice%20cream_black%20(1).png";

// Default placeholder
export const placeholderImage = "https://picsum.photos/400";
