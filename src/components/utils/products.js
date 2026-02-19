import {
    p1, p2, p3, p11, p12, p13, p14, p15,
    BeltedLBP,
    BTS,
    BigSBP,
    BlackLW,
    BlueCW,
    BoltNTS,
    DarkBLW,
    DarkBW,
    DenimLS,
    DropSP,
    DarkGW,
    Habivour,
    HighWT,
    JasminBO,
    JasminGT,
    JeansTS,
    coco,
    couch,
    moon,
    lamps,
    woodCH,
    woodCT
} from './images'


export default [
    {
    id: 1,
    name: 'Side Ottoman',
    img: p1,
    description: 'A versatile and stylish ottoman that serves as a footrest or extra seating in any modern living room.',
    quantity: 12,
    number: 1,
    onSale: { sale: 'Sale', dis: '-16%' },
    size: ['S', 'M', 'L', 'XL'],
    subImg: [
      { img: p11, tooltip: 'red' },
      { img: p12, tooltip: 'green' },
      { img: p13, tooltip: 'blue' },
      { img: p14, tooltip: 'yellow' },
      { img: p15, tooltip: 'white' }
    ],
    price: { new: 900, old: 1000 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 2,
    name: 'Green Couch',
    img: p2,
    description: 'Deep-seated comfort with premium upholstery. This couch adds a vibrant pop of color to your interior.',
    quantity: 5,
    number: 1,
    onSale: { sale: 'Sale', dis: '-20%' },
    size: ['S', 'M', 'L'],
    color: [
      { col: 'bg-red-400', tooltip: 'red' },
      { col: 'bg-green-400', tooltip: 'green' },
      { col: 'bg-blue-400', tooltip: 'blue' }
    ],
    price: { new: 1900, old: 2000 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 3,
    name: 'Dining Chair Variant',
    img: p3,
    description: 'Ergonomically designed for long dinners. Featuring solid wood legs and a reinforced backrest.',
    quantity: 0, // Out of stock #1
    number: 1,
    price: { new: 1900 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 4,
    name: 'Belted Leather Purse',
    img: BeltedLBP,
    description: 'A chic belted leather purse perfect for keeping your essentials secure while maintaining a high-fashion look.',
    quantity: 18,
    number: 1,
    type: 'new',
    size: ['M'],
    price: { new: 3200 },
    isWishlisted: false
  },
  {
    id: 5,
    name: 'Black Leather Wallet',
    img: BlackLW,
    description: 'Slim, elegant, and made from genuine calfskin. Includes RFID blocking for extra security.',
    quantity: 20,
    number: 1,
    onSale: { sale: 'Sale', dis: '-10%' },
    price: { new: 450, old: 500 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 6,
    name: 'Denim Long Skirt',
    img: DenimLS,
    description: 'A classic silhouette redesigned for the modern era. Features a subtle front slit and high-waist fit.',
    quantity: 0, // Out of stock #2
    size: ['S', 'M', 'L'],
    color: [
      { col: 'bg-blue-600', tooltip: 'dark-blue' },
      { col: 'bg-blue-300', tooltip: 'light-blue' }
    ],
    price: { new: 1200 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 7,
    name: 'Coco Rose Body Cream',
    img: coco,
    description: 'Infused with organic rosewater and coconut oil to leave your skin feeling silky and rejuvenated.',
    quantity: 15,
    number: 1,
    type: 'popular',
    price: { new: 2500 },
    isWishlisted: false
  },
  {
    id: 8,
    name: 'Moon Fruit Night Mask',
    img: moon,
    description: 'A powerful resurfacing night mask with fruit enzymes and hyaluronic acid for a glowing morning look.',
    quantity: 7,
    number: 1,
    onSale: { sale: 'Sale', dis: '-5%' },
    price: { new: 3800, old: 4000 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 9,
    name: 'Wooden Coffee Table',
    img: woodCT,
    description: 'Minimalist craftsmanship meet durable oak. The perfect centerpiece for a Scandinavian-style home.',
    quantity: 4,
    number: 1,
    type: 'new',
    price: { new: 5000 },
    isWishlisted: false
  },
  {
    id: 10,
    name: 'Jasmin Garden T-Shirt',
    img: JasminGT,
    description: 'Lightweight cotton tee with a delicate floral embroidery. Breathable and soft for daily wear.',
    quantity: 0, // Out of stock #3
    size: ['XS', 'S', 'M', 'L', 'XL'],
    price: { new: 600 },
    type: 'new',
    isWishlisted: false
  },
    {
    id: 11,
    name: 'Bolt Navy T-Shirt',
    img: BoltNTS,
    description: 'A premium heavy-cotton tee featuring a minimalist bolt graphic. Pre-shrunk for a perfect fit after every wash.',
    quantity: 14,
    number: 1,
    size: ['S', 'M', 'L'],
    price: { new: 850 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 12,
    name: 'Dark Grey Wallet',
    img: DarkGW,
    description: 'Sophisticated charcoal-toned leather with a textured finish. Features six card slots and a hidden cash pocket.',
    quantity: 9,
    number: 1,
    onSale: { sale: 'Sale', dis: '-15%' },
    subImg: [
      { img: p11, tooltip: 'charcoal' },
      { img: p15, tooltip: 'silver' }
    ],
    price: { new: 1100, old: 1300 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 13,
    name: 'Habivour Canvas Bag',
    img: Habivour,
    description: 'Eco-friendly heavy-duty canvas bag designed for the urban explorer. Includes a padded laptop sleeve.',
    quantity: 0, // Out of stock #1
    price: { new: 2200 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 14,
    name: 'High Waist Trousers',
    img: HighWT,
    description: 'Elegant tailored trousers with a high-rise waist and wide-leg cut. Perfect for professional or evening wear.',
    quantity: 6,
    number: 1,
    size: ['S', 'M', 'L'],
    color: [
      { col: 'bg-black', tooltip: 'black' },
      { col: 'bg-stone-400', tooltip: 'beige' }
    ],
    price: { new: 3500 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 15,
    name: 'Blue Checked Wallet',
    img: BlueCW,
    description: 'A playful yet professional checked pattern on synthetic leather. Durable and water-resistant.',
    quantity: 11,
    number: 1,
    onSale: { sale: 'Sale', dis: '-5%' },
    price: { new: 950, old: 1000 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 16,
    name: 'Jasmin Blue Overcoat',
    img: JasminBO,
    description: 'A statement wool-blend overcoat in a deep royal blue. Features oversized lapels and a belted waist.',
    quantity: 3, // Low stock warning candidate
    number: 1,
    size: ['M', 'L', 'XL'],
    subImg: [
      { img: p13, tooltip: 'navy' },
      { img: p12, tooltip: 'forest' }
    ],
    price: { new: 8500 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 17,
    name: 'Jeans Texture Shirt',
    img: JeansTS,
    description: 'Soft cotton fabric printed with a high-definition denim texture for a rugged look without the stiffness.',
    quantity: 0, // Out of stock #2
    size: ['M', 'L'],
    price: { new: 1800 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 18,
    name: 'Modern Table Lamp',
    img: lamps,
    description: 'Industrial-style lighting with a brass finish. Provides a warm, ambient glow perfect for bedside reading.',
    quantity: 20,
    number: 1,
    onSale: { sale: 'Sale', dis: '-25%' },
    price: { new: 2100, old: 2800 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 19,
    name: 'Wooden Chair High-Back',
    img: woodCH,
    description: 'Hand-carved mahogany chair with a high backrest. A timeless piece of furniture for your dining room.',
    quantity: 4,
    number: 1,
    price: { new: 4200 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 20,
    name: 'Drop Shoulder Pullover',
    img: DropSP,
    description: 'Ultra-soft fleece with a relaxed drop-shoulder silhouette. Ideal for layering during colder months.',
    quantity: 0, // Out of stock #3
    size: ['S', 'M', 'L', 'XL'],
    subImg: [
      { img: p14, tooltip: 'mustard' },
      { img: p11, tooltip: 'crimson' }
    ],
    price: { new: 2600 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 21,
    name: 'BTS Signature Tote',
    img: BTS,
    description: 'Limited edition canvas tote bag with reinforced stitching and interior organizers. A must-have for the stylish commuter.',
    quantity: 12,
    number: 1,
    size: ['One Size'],
    subImg: [
      { img: p15, tooltip: 'white' },
      { img: p11, tooltip: 'merlot' }
    ],
    price: { new: 1500 },
    type: 'popular',
    isWishlisted: false
  },
  {
    id: 22,
    name: 'Big Suede Backpack',
    img: BigSBP,
    description: 'A spacious backpack crafted from premium Italian suede. Features adjustable leather straps and a vintage brass buckle.',
    quantity: 6,
    number: 1,
    onSale: { sale: 'Sale', dis: '-12%' },
    price: { new: 4200, old: 4800 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 23,
    name: 'Dark Blue Leather Wallet',
    img: DarkBLW,
    description: 'Deep navy pebbled leather wallet with a bi-fold design. Hand-stitched edges ensure long-lasting durability.',
    quantity: 19,
    number: 1,
    color: [
      { col: 'bg-blue-900', tooltip: 'navy' },
      { col: 'bg-slate-800', tooltip: 'midnight' }
    ],
    price: { new: 1100 },
    type: 'new',
    isWishlisted: false
  },
  {
    id: 24,
    name: 'Dark Bi-Fold Wallet',
    img: DarkBW,
    description: 'A classic minimalist wallet in espresso brown. Its ultra-slim profile fits perfectly in front pockets without the bulk.',
    quantity: 2, // Low stock warning
    number: 1,
    onSale: { sale: 'Sale', dis: '-30%' },
    price: { new: 700, old: 1000 },
    type: 'sale',
    isWishlisted: false
  },
  {
    id: 25,
    name: 'Modern Comfort Couch',
    img: couch,
    description: 'A luxurious three-seater couch featuring high-density foam cushions and stain-resistant fabric for the ultimate lounge experience.',
    quantity: 4,
    number: 1,
    size: ['Standard', 'Extended'],
    subImg: [
      { img: p12, tooltip: 'moss' },
      { img: p13, tooltip: 'ocean' },
      { img: p15, tooltip: 'cream' }
    ],
    price: { new: 9500 },
    type: 'new',
    isWishlisted: false
  }
    
]