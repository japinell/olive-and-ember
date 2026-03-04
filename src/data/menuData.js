export const foodCategories = [
  'All',
  'Healthy',
  'Salads',
  'Bowls',
  'Burgers',
  'Pizza',
  'Desserts',
  'Drinks',
]

const createFoodImage = (tags, lockId) =>
  `https://loremflickr.com/800/450/${encodeURIComponent(tags)}.jpg?lock=${lockId}`

const localAssetImages = import.meta.glob('../assets/**/*.{jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const normalizeImageKey = (value) =>
  value
    .toLowerCase()
    .replace(/\.(jpg|jpeg)$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getLocalHealthyImage = (itemId, fallbackImage) => {
  const normalizedId = normalizeImageKey(itemId)
  const assetPaths = Object.keys(localAssetImages)

  const exactMatchPath = assetPaths.find((path) => {
    const fileName = path.split('/').pop() || ''
    return normalizeImageKey(fileName) === normalizedId
  })

  if (exactMatchPath) {
    return localAssetImages[exactMatchPath]
  }

  const matchedImagePath = assetPaths.find((path) =>
    normalizeImageKey(path).includes(normalizedId),
  )

  if (!matchedImagePath) {
    return fallbackImage
  }

  return localAssetImages[matchedImagePath]
}

export const foodMenu = [ 
  {
    id: 'pizza-margherita',
    name: 'Margherita Pizza',
    category: 'Pizza',
    description: 'Wood-fired crust, tomato sauce, fresh mozzarella, and basil.',
    price: 13.5,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/1200px-Pizza_Margherita_stu_spivack.jpg',
    serves: '2 people (6 slices)',
    ingredients: [
      '1 pizza dough ball',
      '1/2 cup tomato sauce',
      '5 oz fresh mozzarella',
      '6 basil leaves',
      '1 tbsp olive oil',
      'Pinch of sea salt',
    ],
    nutrition: {
      calories: 760,
      protein: 31,
      carbs: 84,
      fat: 32,
    },
  },
  {
    id: 'pizza-pepperoni',
    name: 'Spicy Pepperoni Pizza',
    category: 'Pizza',
    description: 'Pepperoni, chili flakes, mozzarella, and roasted garlic oil.',
    price: 15,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pepperoni_Pizza_%2829204589095%29.jpg/1200px-Pepperoni_Pizza_%2829204589095%29.jpg',
    serves: '2 people (6 slices)',
    ingredients: [
      '1 pizza dough ball',
      '1/2 cup tomato sauce',
      '1 cup shredded mozzarella',
      '20 pepperoni slices',
      '1/2 tsp chili flakes',
      '1 tsp roasted garlic oil',
    ],
    nutrition: {
      calories: 880,
      protein: 36,
      carbs: 86,
      fat: 41,
    },
  },
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    category: 'Burgers',
    description: 'Beef patty, cheddar, lettuce, tomato, pickles, and brioche bun.',
    price: 12.75,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg',
    serves: '1 person (1 burger)',
    ingredients: [
      '1 brioche burger bun',
      '1 beef patty (6 oz)',
      '1 cheddar cheese slice',
      '2 tomato slices',
      '2 pickle slices',
      'Lettuce leaves and burger sauce',
    ],
    nutrition: {
      calories: 690,
      protein: 37,
      carbs: 48,
      fat: 38,
    },
  },
  {
    id: 'burger-turkey-avocado',
    name: 'Turkey Avocado Burger',
    category: 'Burgers',
    description: 'Lean turkey patty, avocado, red onion, and herb aioli.',
    price: 13.25,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
    serves: '1 person (1 burger)',
    ingredients: [
      '1 whole-grain bun',
      '1 turkey patty (6 oz)',
      '1/4 avocado (sliced)',
      '3 red onion rings',
      'Handful of baby greens',
      '1 tbsp herb aioli',
    ],
    nutrition: {
      calories: 610,
      protein: 35,
      carbs: 42,
      fat: 31,
    },
  },
  {
    id: 'salad-caesar',
    name: 'Grilled Caesar Salad',
    category: 'Salads',
    description: 'Romaine, parmesan, croutons, grilled chicken, and Caesar dressing.',
    price: 11.5,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/1200px-Caesar_salad_%282%29.jpg',
    serves: '1 person (large bowl)',
    ingredients: [
      '2 cups romaine lettuce',
      '4 oz grilled chicken breast',
      '1/4 cup croutons',
      '2 tbsp Caesar dressing',
      '2 tbsp shaved parmesan',
      'Lemon wedge',
    ],
    nutrition: {
      calories: 470,
      protein: 32,
      carbs: 19,
      fat: 28,
    },
  },
  {
    id: 'salad-mediterranean',
    name: 'Mediterranean Salad',
    category: 'Salads',
    description: 'Mixed greens, cucumbers, tomatoes, olives, feta, and lemon vinaigrette.',
    price: 10.95,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Greece_Food_Horiatiki.JPG/1200px-Greece_Food_Horiatiki.JPG',
    serves: '1 person (large bowl)',
    ingredients: [
      '2 cups mixed greens',
      '1/2 cup cucumber slices',
      '1/2 cup cherry tomatoes',
      '8 kalamata olives',
      '1/4 cup feta cheese',
      '2 tbsp lemon vinaigrette',
    ],
    nutrition: {
      calories: 380,
      protein: 13,
      carbs: 24,
      fat: 24,
    },
  },
  {
    id: 'bowl-teriyaki',
    name: 'Teriyaki Chicken Bowl',
    category: 'Bowls',
    description: 'Steamed rice, teriyaki chicken, broccoli, carrots, and sesame seeds.',
    price: 12.95,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/22nd_June_2012_Teriyaki_Duck.jpg/1200px-22nd_June_2012_Teriyaki_Duck.jpg',
    serves: '1 person (meal bowl)',
    ingredients: [
      '1 cup steamed rice',
      '5 oz teriyaki chicken',
      '1/2 cup broccoli florets',
      '1/3 cup sliced carrots',
      '1 tbsp teriyaki glaze',
      '1 tsp toasted sesame seeds',
    ],
    nutrition: {
      calories: 640,
      protein: 39,
      carbs: 74,
      fat: 20,
    },
  },
  {
    id: 'bowl-veggie-power',
    name: 'Veggie Power Bowl',
    category: 'Bowls',
    description: 'Quinoa, chickpeas, roasted vegetables, kale, and tahini drizzle.',
    price: 11.95,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/BuddhaBowlLot.jpg/1200px-BuddhaBowlLot.jpg',
    serves: '1 person (meal bowl)',
    ingredients: [
      '1 cup cooked quinoa',
      '1/2 cup chickpeas',
      '1 cup roasted vegetables',
      '1 cup chopped kale',
      '1 tbsp tahini drizzle',
      '1 tsp lemon juice',
    ],
    nutrition: {
      calories: 560,
      protein: 20,
      carbs: 68,
      fat: 22,
    },
  },
  {
    id: 'dessert-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description: 'Warm chocolate cake with a molten center and vanilla cream.',
    price: 7.25,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Chocolate_Fondant.jpg/1200px-Chocolate_Fondant.jpg',
    serves: '1 person (1 cake)',
    ingredients: [
      '2 oz dark chocolate',
      '2 tbsp unsalted butter',
      '1 egg',
      '2 tbsp sugar',
      '2 tbsp flour',
      'Vanilla cream topping',
    ],
    nutrition: {
      calories: 430,
      protein: 6,
      carbs: 52,
      fat: 22,
    },
  },
  {
    id: 'dessert-yogurt-parfait',
    name: 'Berry Yogurt Parfait',
    category: 'Desserts',
    description: 'Greek yogurt layered with berries, honey, and granola.',
    price: 6.75,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Parfait_samples_by_pinguino_in_Osaka%2C_Japan.jpg/1200px-Parfait_samples_by_pinguino_in_Osaka%2C_Japan.jpg',
    serves: '1 person (1 parfait cup)',
    ingredients: [
      '3/4 cup Greek yogurt',
      '1/2 cup mixed berries',
      '1/4 cup granola',
      '1 tbsp honey',
      '1 tsp chia seeds',
    ],
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 38,
      fat: 8,
    },
  },
  {
    id: 'drink-citrus-cooler',
    name: 'Sparkling Citrus Cooler',
    category: 'Drinks',
    description: 'Lemon-lime sparkling beverage with fresh mint and orange zest.',
    price: 4.95,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/1200px-Lemonade_-_27682817724.jpg',
    serves: '1 person (12 oz)',
    ingredients: [
      '8 oz sparkling water',
      '1 tbsp lemon juice',
      '1 tbsp lime juice',
      '1 tsp orange zest',
      '2 mint leaves',
      'Ice cubes',
    ],
    nutrition: {
      calories: 110,
      protein: 0,
      carbs: 27,
      fat: 0,
    },
  },
  {
    id: 'drink-iced-tea',
    name: 'Unsweetened Iced Tea',
    category: 'Drinks',
    description: 'Fresh-brewed black tea served chilled with lemon.',
    price: 3.95,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Y%C3%AAn_H%C3%B2a_Parkview_City_29-07-2025_Mme_Th%E1%BB%A7y_Iced_Tea_E03.jpg/1200px-Y%C3%AAn_H%C3%B2a_Parkview_City_29-07-2025_Mme_Th%E1%BB%A7y_Iced_Tea_E03.jpg',
    serves: '1 person (12 oz)',
    ingredients: [
      '1 black tea bag',
      '10 oz cold water',
      '1 lemon wedge',
      'Ice cubes',
    ],
    nutrition: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
    },
  },
   {
    id: 'classic-tomato-bruschetta',
    name: 'Classic Tomato Bruschetta',
    category: 'Healthy',
    description: 'Grilled bread topped with fresh tomatoes, basil, and grated Parmesan cheese.',
    price: 13.25,
    image: getLocalHealthyImage(
      'classic-tomato-bruschetta',
      createFoodImage('bruschetta,tomato,appetizer', 101),
    ),
    serves: '2 people (4 pieces)',
    ingredients: [
      '4 slices French loaf',
      '1 Roma tomato (small dice)',
      '1 tbsp extra-virgin olive oil',
      '4 fresh basil leaves, finely chopped',
      '1 tsp grated Parmesan cheese',
      'Pinch of sea salt and black pepper',
    ],
    nutrition: {
      calories: 100,
      protein: 3,
      carbs: 13,
      fat: 5,
    },
  },
  {
    id: 'mini-egg-frittatas',
    name: 'Mini Egg Frittatas',
    category: 'Healthy',
    description: 'Bite-sized egg frittatas with vegetables and cheese.',
    price: 13.95,
    image: getLocalHealthyImage(
      'mini-egg-frittatas',
      createFoodImage('egg,frittatas,healthy', 102),
    ),
    serves: '2 people (4 muffins)',
    ingredients: [
      '3 large eggs',
      '2 tbsp diced tomatoes',
      '2 tbsp shredded mozzarella cheese',
      '1 tbsp Parmesan cheese',
      '1 tbsp fresh basil, finely chopped',
      'Salt and pepper to taste',
    ],
    nutrition: {
      calories: 120,
      protein: 9,
      carbs: 5,
      fat: 8,
    },
  },
  {
    id: 'italian-street-piadina-fold',
    name: 'Italian Street Piadina Fold',
    category: 'Healthy',
    description: 'Delicious Italian flatbread folded with fresh ingredients.',
    price: 14.85,
    image: getLocalHealthyImage(
      'italian-street-piadina-fold',
      createFoodImage('piadina,italian,healthy', 103),
    ),
    serves: '2 people (4 pieces)',
    ingredients: [
      '1 small or thin 8" smart carbs tortilla',
      '2 slices turkey breast',
      '2 tbsp shredded mozzarella cheese (not 1/2 cup)',
      '1 tbsp Parmesan cheese',
      'Small handful of fresh spinach leaves',
      '1 tbsp marinara (very thin spread)',
      'Fresh basil leaves for garnish',
    ],
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 16,
      fat: 10,
    },
  },
  {
    id: 'light-tiramisu-cup',
    name: 'Light Tiramisu Cup',
    category: 'Healthy',
    description: 'A lighter version of the classic Italian dessert.',
    price: 15.25,
    image: getLocalHealthyImage(
      'light-tiramisu-cup',
      createFoodImage('tiramisu,italian,healthy', 104),
    ),
    serves: '2 people (2 cups)',
    ingredients: [
      '4 oz non-fat Greek yogurt',
      '1 cup sugar-free cool whip',
      '4 ladyfinger cookies, broken into pieces',
      '1/4 cup brewed coffee (cooled)',      
      'Cocoa powder for dusting',
    ],
    nutrition: {
      calories: 550,
      protein: 8,
      carbs: 45,
      fat: 40,
    },
  },
]
