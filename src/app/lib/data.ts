export const BRAND = {
  name: "Charulata",
  full: "Charulata Lifestyle",
  bengali: "চারুলতা",
  tagline: "Where heritage meets haute couture",
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  bn: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  badge?: "New" | "Bestseller" | "Hot" | "Limited";
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  discount?: number;
  stock: number;
};

const img = {
  saree1: "https://images.unsplash.com/photo-1610313461564-489bda80660a?w=1080&q=80",
  saree2: "https://images.unsplash.com/photo-1704342713962-04b1972d8bee?w=1080&q=80",
  saree3: "https://images.unsplash.com/photo-1649793061313-f19ac2768ff6?w=1080&q=80",
  saree4: "https://images.unsplash.com/photo-1769500804057-ca1391bf4617?w=1080&q=80",
  saree5: "https://images.unsplash.com/photo-1610313766495-8e0686c9d313?w=1080&q=80",
  saree6: "https://images.unsplash.com/photo-1610313766455-8041efa361ff?w=1080&q=80",
  jewel1: "https://images.unsplash.com/photo-1611583027838-515a1087afdb?w=1080&q=80",
  jewel2: "https://images.unsplash.com/photo-1626784214536-d859187e0bd0?w=1080&q=80",
  jewel3: "https://images.unsplash.com/photo-1695049918857-1e27d67782e5?w=1080&q=80",
  perfume1: "https://images.unsplash.com/photo-1591892212776-a09de24dbe84?w=1080&q=80",
  perfume2: "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=1080&q=80",
  perfume3: "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=1080&q=80",
  panjabi1: "https://images.unsplash.com/photo-1670296047577-36c2c1281a85?w=1080&q=80",
  panjabi2: "https://images.unsplash.com/photo-1744551358303-46edae8b374b?w=1080&q=80",
  panjabi3: "https://images.unsplash.com/photo-1729347917808-e3e35a462fec?w=1080&q=80",
  beauty1: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=1080&q=80",
  beauty2: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1080&q=80",
  beauty3: "https://images.unsplash.com/photo-1723150512429-bfa92988d845?w=1080&q=80",
  gadget1: "https://images.unsplash.com/photo-1633329102202-eaa697179563?w=1080&q=80",
  gadget2: "https://images.unsplash.com/photo-1639452127871-8c6ea78d2b11?w=1080&q=80",
  gadget3: "https://images.unsplash.com/photo-1761005654036-ffe7410d5d2a?w=1080&q=80",
  watch1: "https://images.unsplash.com/photo-1623998021661-dc7555b2213d?w=1080&q=80",
  watch2: "https://images.unsplash.com/photo-1633869701352-eb7af08a1bc4?w=1080&q=80",
};

export const IMG = img;

export const CATEGORIES = [
  { slug: "saree", name: "Saree", bn: "শাড়ি", count: 248, image: img.saree4 },
  { slug: "panjabi", name: "Panjabi", bn: "পাঞ্জাবি", count: 162, image: img.panjabi1 },
  { slug: "jewelry", name: "Jewelry", bn: "অলংকার", count: 96, image: img.jewel1 },
  { slug: "beauty", name: "Beauty", bn: "প্রসাধন", count: 134, image: img.beauty2 },
  { slug: "gadgets", name: "Gadgets", bn: "গ্যাজেট", count: 78, image: img.gadget1 },
];

const colors = {
  rose: { name: "Rose", hex: "#f0a8d0" },
  violet: { name: "Violet", hex: "#9333ea" },
  gold: { name: "Gold", hex: "#e8c896" },
  ivory: { name: "Ivory", hex: "#f5ecf6" },
  obsidian: { name: "Obsidian", hex: "#1a0a20" },
  emerald: { name: "Emerald", hex: "#10b981" },
};

export const PRODUCTS: Product[] = [
  { id: "p1", slug: "rajshahi-silk-rose-saree", name: "Rajshahi Silk Rose Saree", bn: "রাজশাহী সিল্ক রোজ", category: "saree", price: 12450, oldPrice: 16800, rating: 4.9, reviews: 342, image: img.saree1, gallery: [img.saree1, img.saree4, img.saree5, img.saree6], badge: "Bestseller", colors: [colors.rose, colors.violet, colors.gold], sizes: ["Free"], discount: 26, stock: 12 },
  { id: "p2", slug: "katan-banarasi-crimson", name: "Katan Banarasi Crimson", bn: "কাতান বেনারসি", category: "saree", price: 18900, oldPrice: 22500, rating: 4.8, reviews: 211, image: img.saree2, gallery: [img.saree2, img.saree3, img.saree4], badge: "Hot", colors: [colors.rose, colors.gold], sizes: ["Free"], discount: 16, stock: 8 },
  { id: "p3", slug: "midnight-jamdani-classic", name: "Midnight Jamdani Classic", bn: "মধ্যরাতের জামদানি", category: "saree", price: 9450, rating: 4.7, reviews: 188, image: img.saree3, gallery: [img.saree3, img.saree2], colors: [colors.obsidian, colors.violet], sizes: ["Free"], stock: 22 },
  { id: "p4", slug: "ivory-tangail-handloom", name: "Ivory Tangail Handloom", bn: "টাঙ্গাইল হ্যান্ডলুম", category: "saree", price: 7250, oldPrice: 8900, rating: 4.6, reviews: 121, image: img.saree6, gallery: [img.saree6, img.saree5], badge: "New", colors: [colors.ivory, colors.gold], sizes: ["Free"], discount: 18, stock: 31 },
  { id: "p5", slug: "noor-embroidered-panjabi", name: "Noor Embroidered Panjabi", bn: "নূর কারুকাজ পাঞ্জাবি", category: "panjabi", price: 6450, oldPrice: 7900, rating: 4.8, reviews: 274, image: img.panjabi1, gallery: [img.panjabi1, img.panjabi2, img.panjabi3], badge: "Bestseller", colors: [colors.ivory, colors.gold, colors.obsidian], sizes: ["M", "L", "XL", "XXL"], discount: 18, stock: 40 },
  { id: "p6", slug: "shaan-cotton-panjabi", name: "Shaan Cotton Panjabi", bn: "শান কটন পাঞ্জাবি", category: "panjabi", price: 3450, rating: 4.5, reviews: 96, image: img.panjabi2, gallery: [img.panjabi2, img.panjabi3], colors: [colors.ivory, colors.obsidian], sizes: ["M", "L", "XL"], stock: 55 },
  { id: "p7", slug: "raja-silk-panjabi-set", name: "Raja Silk Panjabi Set", bn: "রাজা সিল্ক সেট", category: "panjabi", price: 9890, oldPrice: 11900, rating: 4.9, reviews: 187, image: img.panjabi3, gallery: [img.panjabi3, img.panjabi1], badge: "Hot", colors: [colors.gold, colors.rose], sizes: ["L", "XL", "XXL"], discount: 17, stock: 15 },
  { id: "p8", slug: "monsoon-diamond-pendant", name: "Monsoon Diamond Pendant", bn: "ডায়মন্ড পেন্ডেন্ট", category: "jewelry", price: 24500, oldPrice: 32000, rating: 5.0, reviews: 92, image: img.jewel1, gallery: [img.jewel1, img.jewel2, img.jewel3], badge: "Limited", colors: [colors.ivory, colors.gold], discount: 23, stock: 4 },
  { id: "p9", slug: "royal-sapphire-ring", name: "Royal Sapphire Ring", bn: "রয়্যাল স্যাফায়ার", category: "jewelry", price: 18750, rating: 4.9, reviews: 64, image: img.jewel2, gallery: [img.jewel2, img.jewel1], colors: [colors.gold], stock: 9 },
  { id: "p10", slug: "heritage-gold-chain", name: "Heritage Gold Chain", bn: "হেরিটেজ গোল্ড চেইন", category: "jewelry", price: 31500, oldPrice: 38900, rating: 4.8, reviews: 53, image: img.jewel3, gallery: [img.jewel3, img.jewel1], badge: "New", colors: [colors.gold], discount: 19, stock: 6 },
  { id: "p11", slug: "rose-attar-luxe-50ml", name: "Rose Attar Luxe 50ml", bn: "রোজ আতর লাক্স", category: "beauty", price: 4250, oldPrice: 5400, rating: 4.7, reviews: 421, image: img.perfume1, gallery: [img.perfume1, img.perfume2, img.perfume3], badge: "Bestseller", colors: [colors.rose, colors.gold], discount: 21, stock: 88 },
  { id: "p12", slug: "midnight-oud-parfum", name: "Midnight Oud Parfum", bn: "মিডনাইট ঊদ", category: "beauty", price: 5890, rating: 4.9, reviews: 318, image: img.perfume2, gallery: [img.perfume2, img.perfume3], colors: [colors.violet, colors.obsidian], stock: 32 },
  { id: "p13", slug: "blush-cosmetic-edit", name: "Blush Cosmetic Edit Set", bn: "ব্লাশ এডিট সেট", category: "beauty", price: 3450, oldPrice: 4250, rating: 4.6, reviews: 192, image: img.beauty1, gallery: [img.beauty1, img.beauty2, img.beauty3], badge: "Hot", colors: [colors.rose], discount: 19, stock: 60 },
  { id: "p14", slug: "studio-pro-headphones", name: "Studio Pro Headphones", bn: "স্টুডিও প্রো", category: "gadgets", price: 18900, oldPrice: 22500, rating: 4.8, reviews: 156, image: img.gadget1, gallery: [img.gadget1, img.gadget2, img.gadget3], badge: "New", colors: [colors.obsidian, colors.ivory], discount: 16, stock: 24 },
  { id: "p15", slug: "obsidian-wireless-buds", name: "Obsidian Wireless Buds", bn: "ওবসিডিয়ান বাডস", category: "gadgets", price: 8450, rating: 4.7, reviews: 248, image: img.gadget2, colors: [colors.obsidian, colors.rose], stock: 71 },
  { id: "p16", slug: "neon-luxe-headphones", name: "Neon Luxe Headphones", bn: "নিয়ন লাক্স", category: "gadgets", price: 12450, oldPrice: 14900, rating: 4.5, reviews: 87, image: img.gadget3, badge: "Limited", colors: [colors.rose, colors.violet], discount: 17, stock: 14 },
  { id: "p17", slug: "noir-chronograph-watch", name: "Noir Chronograph Watch", bn: "নয়র ক্রনোগ্রাফ", category: "gadgets", price: 22500, rating: 4.9, reviews: 71, image: img.watch1, badge: "Bestseller", colors: [colors.gold, colors.obsidian], stock: 11 },
];

export const TESTIMONIALS = [
  { name: "Tasnim Rahman", role: "Lifestyle Editor, Dhaka", text: "Charulata redefined what luxury feels like in Bangladesh. The detail on my Banarasi was breathtaking — like wearing a poem.", rating: 5, avatar: "TR" },
  { name: "Imran Hossain", role: "Architect, Chittagong", text: "From the unboxing to the embroidery, every touchpoint feels deliberate. Apple-level polish for our heritage wear.", rating: 5, avatar: "IH" },
  { name: "Anika Chowdhury", role: "Bride to be", text: "I bought my entire trousseau here. The team curated looks for every ceremony. Worth every taka.", rating: 5, avatar: "AC" },
  { name: "Rafiul Karim", role: "Tech Founder", text: "Their gadgets line is legit. Studio Pro headphones rival the big names but feel made for us.", rating: 4, avatar: "RK" },
];

export const FAQS = [
  { q: "How long does delivery take inside Bangladesh?", a: "Dhaka metro deliveries arrive within 24–48 hours. Outside Dhaka, expect 2–4 business days through our luxury courier partners (Sundarban, Pathao, RedX)." },
  { q: "Do you offer Cash on Delivery?", a: "Yes, Cash on Delivery is available for all 64 districts. A small advance may apply on orders above ৳15,000 to confirm authenticity." },
  { q: "Are the sarees handcrafted?", a: "Every Jamdani, Katan and Tangail piece is hand-loomed by master weavers from Rupshi, Mirpur and Tangail — usually 14–60 days per garment." },
  { q: "What is the return policy?", a: "7-day no-questions exchange on unworn items with tags intact. Custom-stitched and altered pieces are final sale." },
  { q: "Can I join the VIP Club?", a: "Yes — spend ৳25,000 in a calendar year or apply for an invite. VIPs receive private previews, complimentary alteration, and first dibs on limited drops." },
];

export const PARTNERS = [
  "The Daily Star",
  "Prothom Alo",
  "Vogue Bangladesh",
  "ICE Today",
  "Dhaka Tribune",
  "Canvas",
  "Bangla Tribune",
  "The Business Standard",
];
