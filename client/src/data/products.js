const colorValues = {
  Black: '#111827', Ivory: '#FFFDF8', Pink: '#E91E63', Maroon: '#7F1D1D', Navy: '#1E3A8A', Sage: '#9CAF88', Mustard: '#D97706', Teal: '#0F766E', Lavender: '#C4B5FD', Beige: '#D6C7B0', Wine: '#722F37', Gold: '#B88746'
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const tones = ['from-pink-100 via-white to-gray-100', 'from-gray-100 via-white to-pink-50', 'from-white via-pink-50 to-gray-100', 'from-pink-200 via-white to-gray-50', 'from-gray-900 via-gray-700 to-pink-200']
const makeSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const rows = [
  ['KUR001', 'Aaravi Embroidered Straight Kurti', 'Kurti', 'Straight Kurti', 'Ivory', 3299, 4499, 27, 4.8, 142, 18, true, true, false, true, 'Cotton silk', 'Regular', 'Three-quarter', 'Mandarin', 'Embroidered', 'Festive'],
  ['KUR002', 'Meera Floral A-Line Kurti', 'Kurti', 'A-Line Kurti', 'Pink', 2499, 3299, 24, 4.6, 96, 26, false, true, false, true, 'Viscose rayon', 'Relaxed', 'Three-quarter', 'Round', 'Floral', 'Casual'],
  ['KUR003', 'Noor Chikankari Long Kurti', 'Kurti', 'Long Kurti', 'Sage', 3899, 5199, 25, 4.9, 188, 9, true, false, true, false, 'Modal cotton', 'Straight', 'Full', 'V Neck', 'Chikankari', 'Festive'],
  ['KUR004', 'Riva Printed Cotton Kurti', 'Kurti', 'Printed Kurti', 'Mustard', 1899, 2499, 24, 4.4, 64, 35, false, false, false, true, 'Cotton', 'Comfort', 'Short', 'Boat', 'Printed', 'Daily Wear'],
  ['KUR005', 'Zoya Silk Blend Kurti', 'Kurti', 'Silk Kurti', 'Wine', 4599, 5999, 23, 4.7, 117, 12, true, false, true, false, 'Silk blend', 'Regular', 'Three-quarter', 'Keyhole', 'Solid', 'Party'],
  ['KUR006', 'Ira Pastel Pleated Kurti', 'Kurti', 'Pleated Kurti', 'Lavender', 2999, 3999, 25, 4.5, 82, 22, false, true, false, false, 'Georgette', 'Flowy', 'Sleeveless', 'Round', 'Pleated', 'Brunch'],
  ['COO001', 'Kiara Linen Co-ord Set', 'Co-ord Set', 'Linen Set', 'Beige', 4999, 6999, 29, 4.8, 104, 16, true, true, false, true, 'Linen blend', 'Relaxed', 'Full', 'Collared', 'Solid', 'Resort'],
  ['COO002', 'Tara Satin Co-ord Set', 'Co-ord Set', 'Satin Set', 'Teal', 5499, 7499, 27, 4.7, 91, 11, true, false, true, true, 'Satin', 'Regular', 'Full', 'V Neck', 'Solid', 'Party'],
  ['COO003', 'Avni Printed Co-ord Set', 'Co-ord Set', 'Printed Set', 'Pink', 3799, 4999, 24, 4.5, 73, 19, false, true, false, false, 'Rayon', 'Relaxed', 'Three-quarter', 'Notched', 'Printed', 'Vacation'],
  ['COO004', 'Nysa Ribbed Knit Co-ord', 'Co-ord Set', 'Knit Set', 'Black', 4299, 5799, 26, 4.6, 88, 14, false, false, true, false, 'Rib knit', 'Slim', 'Full', 'Crew', 'Ribbed', 'Casual'],
  ['COO005', 'Saisha Embellished Co-ord', 'Co-ord Set', 'Embellished Set', 'Gold', 6999, 8999, 22, 4.9, 131, 7, true, false, true, false, 'Crepe', 'Regular', 'Cape', 'Sweetheart', 'Embellished', 'Wedding'],
  ['SUI001', 'Anika Chanderi Suit Set', 'Suit Set', 'Chanderi Suit', 'Ivory', 6299, 8499, 26, 4.9, 212, 10, true, true, true, true, 'Chanderi', 'Regular', 'Three-quarter', 'Round', 'Woven', 'Festive'],
  ['SUI002', 'Leher Printed Suit Set', 'Suit Set', 'Printed Suit', 'Navy', 4499, 5999, 25, 4.5, 78, 20, false, true, false, true, 'Cotton', 'Comfort', 'Full', 'V Neck', 'Printed', 'Office'],
  ['SUI003', 'Prisha Organza Suit Set', 'Suit Set', 'Organza Suit', 'Pink', 7599, 9999, 24, 4.8, 143, 6, true, false, true, false, 'Organza', 'Straight', 'Full', 'Round', 'Embroidered', 'Wedding'],
  ['SUI004', 'Kavya Silk Suit Set', 'Suit Set', 'Silk Suit', 'Maroon', 8199, 10999, 25, 4.9, 167, 5, true, false, true, false, 'Silk blend', 'Regular', 'Three-quarter', 'Mandarin', 'Zari', 'Festive'],
  ['SUI005', 'Mahi Minimal Suit Set', 'Suit Set', 'Minimal Suit', 'Sage', 3999, 5299, 25, 4.4, 59, 24, false, false, false, true, 'Cotton flex', 'Relaxed', 'Three-quarter', 'Round', 'Solid', 'Daily Wear'],
  ['TOP001', 'Mira Satin Wrap Top', 'Top', 'Wrap Top', 'Wine', 2499, 3299, 24, 4.6, 93, 27, false, true, false, true, 'Satin', 'Regular', 'Full', 'Wrap', 'Solid', 'Party'],
  ['TOP002', 'Ela Puff Sleeve Top', 'Top', 'Statement Top', 'Ivory', 2199, 2899, 24, 4.4, 67, 30, false, false, false, true, 'Poplin', 'Regular', 'Puff', 'Square', 'Solid', 'Brunch'],
  ['TOP003', 'Sana Embroidered Peplum Top', 'Top', 'Peplum Top', 'Black', 3199, 4299, 26, 4.7, 84, 15, true, true, false, false, 'Cotton silk', 'Fit and flare', 'Sleeveless', 'Round', 'Embroidered', 'Festive'],
  ['TOP004', 'Lina Ribbed Knit Top', 'Top', 'Knit Top', 'Lavender', 1799, 2399, 25, 4.3, 45, 38, false, false, false, false, 'Rib knit', 'Slim', 'Half', 'Crew', 'Ribbed', 'Casual'],
  ['BOT001', 'Reya Wide Leg Palazzo', 'Bottom Wear', 'Palazzo', 'Black', 2299, 2999, 23, 4.5, 71, 32, false, true, false, false, 'Viscose', 'Wide leg', 'NA', 'NA', 'Solid', 'Office'],
  ['BOT002', 'Naina Cigarette Pants', 'Bottom Wear', 'Pants', 'Ivory', 2599, 3499, 26, 4.6, 89, 21, true, false, false, true, 'Cotton stretch', 'Tapered', 'NA', 'NA', 'Solid', 'Office'],
  ['BOT003', 'Alia Pleated Skirt', 'Bottom Wear', 'Skirt', 'Pink', 2899, 3799, 24, 4.7, 76, 17, false, true, false, false, 'Georgette', 'A-line', 'NA', 'NA', 'Pleated', 'Brunch'],
  ['BOT004', 'Veda Linen Trousers', 'Bottom Wear', 'Trousers', 'Beige', 3499, 4699, 26, 4.8, 101, 13, true, false, true, false, 'Linen blend', 'Relaxed', 'NA', 'NA', 'Solid', 'Resort'],
  ['DUP001', 'Inaya Organza Dupatta', 'Dupatta', 'Organza Dupatta', 'Pink', 1599, 2199, 27, 4.5, 54, 40, false, true, false, true, 'Organza', 'Free size', 'NA', 'NA', 'Embroidered', 'Festive'],
  ['DUP002', 'Aisha Banarasi Dupatta', 'Dupatta', 'Banarasi Dupatta', 'Gold', 2999, 3999, 25, 4.9, 148, 12, true, false, true, false, 'Banarasi silk', 'Free size', 'NA', 'NA', 'Zari', 'Wedding'],
  ['DUP003', 'Myra Chiffon Dupatta', 'Dupatta', 'Chiffon Dupatta', 'Teal', 1299, 1799, 28, 4.3, 43, 44, false, false, false, true, 'Chiffon', 'Free size', 'NA', 'NA', 'Solid', 'Daily Wear'],
  ['ACC001', 'Zivaro Pearl Drop Earrings', 'Accessories', 'Earrings', 'Gold', 999, 1499, 33, 4.7, 112, 50, false, true, true, true, 'Brass pearl', 'Free size', 'NA', 'NA', 'Pearl', 'Party'],
  ['ACC002', 'Monogram Mini Sling Bag', 'Accessories', 'Bag', 'Black', 3499, 4999, 30, 4.8, 135, 18, true, true, true, false, 'Vegan leather', 'Compact', 'NA', 'NA', 'Quilted', 'Party'],
  ['ACC003', 'Verona Embellished Belt', 'Accessories', 'Belt', 'Maroon', 1399, 1999, 30, 4.4, 39, 28, false, false, false, true, 'Faux leather', 'Adjustable', 'NA', 'NA', 'Embellished', 'Festive'],
]

export const products = rows.map((row, index) => {
  const [sku, name, category, subCategory, color, price, originalPrice, discount, rating, totalReviews, stock, isFeatured, isTrending, isBestSeller, isNewArrival, fabric, fit, sleeve, neck, pattern, occasion] = row
  const slug = makeSlug(name)
  const free = category === 'Accessories' || category === 'Dupatta'
  const availableColors = [color, 'Ivory', 'Black'].filter((value, valueIndex, array) => array.indexOf(value) === valueIndex).map((name) => ({ name, value: colorValues[name] || '#E91E63' }))

  return {
    id: slug,
    sku,
    name,
    slug,
    category,
    subCategory,
    brand: 'Zivaro Fashion',
    description: `${name} is a premium ${subCategory.toLowerCase()} crafted for ${occasion.toLowerCase()} styling with refined Zivaro detailing.`,
    fabric,
    fit,
    sleeve,
    neck,
    pattern,
    occasion,
    color,
    availableColors,
    availableSizes: free ? ['Free Size'] : sizes,
    price,
    originalPrice,
    oldPrice: originalPrice,
    discount,
    discountPercent: discount,
    rating,
    totalReviews,
    reviewCount: totalReviews,
    stock,
    images: Array.from({ length: 4 }, (_, imageIndex) => ({ id: `${slug}-${imageIndex + 1}`, alt: `${name} image ${imageIndex + 1}`, tone: tones[(index + imageIndex) % tones.length] })),
    thumbnail: tones[index % tones.length],
    imageTone: tones[index % tones.length],
    isFeatured,
    isTrending,
    isBestSeller,
    isNewArrival,
    isNew: isNewArrival,
    deliveryDays: 3 + (index % 4),
    returnPolicy: '7-day easy returns and exchanges',
    badge: isNewArrival ? 'New' : isBestSeller ? 'Best Seller' : isTrending ? 'Trending' : 'Featured',
    badgeVariant: isNewArrival ? 'new' : isBestSeller ? 'bestseller' : isTrending ? 'sale' : 'neutral',
    collection: occasion,
    material: fabric,
    sizes: free ? ['Free Size'] : sizes,
    colors: availableColors,
    tags: [category, subCategory, fabric, occasion, pattern, color],
    highlights: [`Premium ${fabric}`, `${fit} silhouette`, `${pattern} finish`, `${occasion} ready`],
    specs: { Fabric: fabric, Fit: fit, Sleeve: sleeve, Neck: neck, Pattern: pattern, Occasion: occasion },
    delivery: { estimate: `Arrives in ${3 + (index % 4)}-${5 + (index % 4)} days`, shipping: 'Free delivery above ₹2,999', returns: '7-day easy returns' },
    reviews: [
      { id: `${slug}-review-1`, author: 'Aarohi', rating: Math.min(5, rating), title: 'Beautiful quality', comment: 'The fit and finish feel premium for the price.', date: '2026-05-14' },
      { id: `${slug}-review-2`, author: 'Meera', rating: Math.max(4, Math.round(rating)), title: 'Elegant and comfortable', comment: 'Looks polished and works well for the occasion.', date: '2026-06-02' },
    ],
  }
})

export const allProducts = products
export const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 8)
export const trendingProducts = products.filter((product) => product.isTrending).slice(0, 8)
export const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 8)
export const newArrivals = products.filter((product) => product.isNewArrival).slice(0, 8)
export const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`
export const getProductBySlug = (slug) => products.find((product) => product.slug === slug || product.id === slug)
