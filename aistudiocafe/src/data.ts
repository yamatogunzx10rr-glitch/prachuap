/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, RecommendationResult } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Classic Espresso Series
  {
    id: 'm1',
    name: 'Espresso',
    description: 'Double shot of our seasonal house blend. Bright citrus acidity with a deep cocoa finish.',
    price: 3.50,
    category: 'espresso',
    tags: ['House Blend', 'Classic'],
    isPopular: false
  },
  {
    id: 'm2',
    name: 'Cortado',
    description: 'Equal parts double shot espresso and velvety, warm steamed milk. Smooth and balanced.',
    price: 4.25,
    category: 'espresso',
    tags: ['Balanced', 'Local Favorite'],
    isPopular: true
  },
  {
    id: 'm3',
    name: 'Velvet Flat White',
    description: 'Ristretto shots crowned with a fine layer of silky microfoam. Pure texture.',
    price: 4.75,
    category: 'espresso',
    tags: ['Creamy', 'Microfoam'],
    badge: 'Artisan Choice'
  },
  {
    id: 'm4',
    name: 'Smoked Vanilla Latte',
    description: 'Double espresso, organic house-smoked vanilla bean syrup, steamed local milk.',
    price: 5.50,
    category: 'espresso',
    tags: ['Sweet', 'Smoked'],
    isPopular: true
  },

  // Filter & Pour Over Series
  {
    id: 'm5',
    name: 'Colombia Geisha Pour Over',
    description: 'V60 slow brew. Extremely delicate, featuring notes of white peach, jasmine, and sparkling orange.',
    price: 7.00,
    category: 'filter',
    tags: ['Single Origin', 'Delicate'],
    badge: 'Rare Batch'
  },
  {
    id: 'm6',
    name: 'Ethiopia Yirgacheffe V60',
    description: 'Bright and floral tea-like body. Bursting with bergamot, sweet lemon-candy, and blueberry undertones.',
    price: 5.50,
    category: 'filter',
    tags: ['Single Origin', 'Floral'],
    isPopular: true
  },
  {
    id: 'm7',
    name: 'Kyoto-Style Cold Brew',
    description: '12-hour slow-drip extraction. Intensely rich, low acidity, finished with a crisp, winey complexity.',
    price: 5.00,
    category: 'filter',
    tags: ['Slow Brew', 'Cold'],
    isPopular: false
  },

  // House Signatures
  {
    id: 'm8',
    name: 'Rosemary Sea Salt Latte',
    description: 'Double shot espresso, house-infused fresh rosemary milk, finished with a pinch of flaky Maldon sea salt.',
    price: 6.25,
    category: 'signature',
    tags: ['Herbaceous', 'Sweet & Salty'],
    isPopular: true,
    badge: 'Signature'
  },
  {
    id: 'm9',
    name: 'Maple Bourbon Espresso Elixir',
    description: 'Chilled espresso shaken with organic Vermont maple syrup, a hint of alcohol-free bourbon barrel extract, and cream.',
    price: 6.50,
    category: 'signature',
    tags: ['Cold', 'Rich', 'Complex'],
    isPopular: false,
    badge: 'Seasonal'
  },
  {
    id: 'm10',
    name: 'Cardamom Lavender Nitro Elixir',
    description: 'Our rich nitro cold brew infused with local organic lavender oil and sweet cardamom cold foam.',
    price: 6.00,
    category: 'signature',
    tags: ['Spiced', 'Floral', 'Creamy'],
    isPopular: true
  },

  // Artisan Pastries
  {
    id: 'p1',
    name: 'Flaky Pistachio Croissant',
    description: 'Twice-baked butter croissant loaded with creamy Sicilian pistachio frangipane and crushed roasted pistachios.',
    price: 5.50,
    category: 'pastry',
    tags: ['House-Baked', 'Nuts'],
    isPopular: true,
    badge: 'Daily Special'
  },
  {
    id: 'p2',
    name: 'Cardamom Cinnamon Bun',
    description: 'Traditional Swedish-style twisted bun flavored with crushed cardamom seeds and glazed with organic pearl sugar.',
    price: 4.75,
    category: 'pastry',
    tags: ['Warm', 'Spiced'],
    isPopular: false
  },
  {
    id: 'p3',
    name: 'Lavender Almond Scone',
    description: 'Crumbly yet moist organic almond meal scone infused with culinary lavender, topped with sweet royal icing.',
    price: 4.50,
    category: 'pastry',
    tags: ['Gluten-Free Option', 'Floral'],
    isPopular: false
  }
];

export const RECOMMENDATIONS: RecommendationResult[] = [
  {
    id: 'rec_fruity',
    beanName: 'Yirgacheffe Kochere',
    origin: 'Ethiopia (Gedeo Zone)',
    description: 'An exceptional single-origin coffee with high floral aromatics and a clean tea-like finish. Excellent for lovers of light, refreshing, and intricate cups.',
    tasteNotes: ['Jasmine', 'Lemon Zest', 'Stone Fruit', 'Earl Grey'],
    roastLevel: 'Light',
    recommendedMethod: 'V60 Pour Over',
    brewRatio: '1:16 (15g coffee / 240g water)',
    brewTemp: '93°C (199°F)',
    grindSize: 'Medium-Fine (like table salt)'
  },
  {
    id: 'rec_chocolatey',
    beanName: 'Finca El Tambo',
    origin: 'Colombia (Cauca)',
    description: 'A classic washed Colombian coffee from high-altitude volcanic soil. It delivers a deeply comforting, chocolatey, and nutty body with balanced apple acidity.',
    tasteNotes: ['Milk Chocolate', 'Roasted Hazelnut', 'Red Apple', 'Toffee'],
    roastLevel: 'Medium',
    recommendedMethod: 'AeroPress or Flat-bottom Drip',
    brewRatio: '1:15 (16g coffee / 240g water)',
    brewTemp: '94°C (201°F)',
    grindSize: 'Medium (like sand)'
  },
  {
    id: 'rec_bold',
    beanName: 'Sumatra Gayo Highlands',
    origin: 'Indonesia (Sumatra)',
    description: 'Processed using the traditional Wet-Hulled method, creating an incredibly full-bodied cup with low acidity, heavy cedar aromas, and deep spicy richness.',
    tasteNotes: ['Dark Chocolate', 'Molasses', 'Sandalwood', 'Clove'],
    roastLevel: 'Dark',
    recommendedMethod: 'French Press or Espresso',
    brewRatio: '1:12 (20g coffee / 240g water for French Press)',
    brewTemp: '91°C (195°F)',
    grindSize: 'Coarse (like sea salt)'
  },
  {
    id: 'rec_sweet_citrus',
    beanName: 'Las Lajas Honey',
    origin: 'Costa Rica (Sabanilla de Alajuela)',
    description: 'A yellow-honey process coffee that retains a portion of mucilage, giving it an intensely sweet, jammy, and stone-fruit character with gentle citrus brightness.',
    tasteNotes: ['Red Honey', 'Nectarine', 'Orange Creamsicle', 'Cacao Nibs'],
    roastLevel: 'Medium-Light',
    recommendedMethod: 'Chemex or Kalita Wave',
    brewRatio: '1:16 (15g coffee / 240g water)',
    brewTemp: '92°C (198°F)',
    grindSize: 'Medium-Coarse (like kosher salt)'
  }
];
