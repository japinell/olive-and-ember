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
    price: 12.49,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/1200px-Pizza_Margherita_stu_spivack.jpg',
    serves: '2 people (6 slices)',
    ingredients: [
      'Pizza dough ball',
      'Tomato sauce',
      'Fresh mozzarella',
      'Basil',
      'Olive oil',
      'Sea salt',
    ],
    nutrition: {
      calories: 760,
      protein: 31,
      carbs: 84,
      fat: 32,
      sugar: 8,
    },
  },
  {
    id: 'pizza-pepperoni',
    name: 'Spicy Pepperoni Pizza',
    category: 'Pizza',
    description: 'Pepperoni, chili flakes, mozzarella, and roasted garlic oil.',
    price: 13.49,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pepperoni_Pizza_%2829204589095%29.jpg/1200px-Pepperoni_Pizza_%2829204589095%29.jpg',
    serves: '2 people (6 slices)',
    ingredients: [
      'Pizza dough ball',
      'Tomato sauce',
      'Shredded mozzarella',
      'Pepperoni',
      'Chili flakes',
      'Roasted garlic oil',
    ],
    nutrition: {
      calories: 880,
      protein: 36,
      carbs: 86,
      fat: 41,
      sugar: 7,
    },
  },
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    category: 'Burgers',
    description: 'Beef patty, cheddar, lettuce, tomato, pickles, and brioche bun.',
    price: 11.49,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg',
    serves: '1 person (1 burger)',
    ingredients: [
      'Brioche burger bun',
      'Beef patty',
      'Cheddar cheese',
      'Tomato',
      'Pickle',
      'Lettuce and burger sauce',
    ],
    nutrition: {
      calories: 690,
      protein: 37,
      carbs: 48,
      fat: 38,
      sugar: 9,
    },
  },
  {
    id: 'burger-turkey-avocado',
    name: 'Turkey Avocado Burger',
    category: 'Burgers',
    description: 'Lean turkey patty, avocado, red onion, and herb aioli.',
    price: 11.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
    serves: '1 person (1 burger)',
    ingredients: [
      'Whole-grain bun',
      'Turkey patty',
      'Avocado',
      'Red onion',
      'Baby greens',
      'Herb aioli',
    ],
    nutrition: {
      calories: 610,
      protein: 35,
      carbs: 42,
      fat: 31,
      sugar: 6,
    },
  },
  {
    id: 'salad-caesar',
    name: 'Grilled Caesar Salad',
    category: 'Salads',
    description: 'Romaine, parmesan, croutons, grilled chicken, and Caesar dressing.',
    price: 9.49,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/1200px-Caesar_salad_%282%29.jpg',
    serves: '1 person (large bowl)',
    ingredients: [
      'Romaine lettuce',
      'Grilled chicken breast',
      'Croutons',
      'Caesar dressing',
      'Shaved Parmesan',
      'Lemon wedge',
    ],
    nutrition: {
      calories: 470,
      protein: 32,
      carbs: 19,
      fat: 28,
      sugar: 4,
    },
  },
  {
    id: 'salad-mediterranean',
    name: 'Mediterranean Salad',
    category: 'Salads',
    description: 'Mixed greens, cucumbers, tomatoes, olives, feta, and lemon vinaigrette.',
    price: 8.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Greece_Food_Horiatiki.JPG/1200px-Greece_Food_Horiatiki.JPG',
    serves: '1 person (large bowl)',
    ingredients: [
      'Mixed greens',
      'Cucumber',
      'Cherry tomatoes',
      'Kalamata olives',
      'Feta cheese',
      'Lemon vinaigrette',
    ],
    nutrition: {
      calories: 380,
      protein: 13,
      carbs: 24,
      fat: 24,
      sugar: 7,
    },
  },
  {
    id: 'bowl-teriyaki',
    name: 'Teriyaki Chicken Bowl',
    category: 'Bowls',
    description: 'Steamed rice, teriyaki chicken, broccoli, carrots, and sesame seeds.',
    price: 11.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/22nd_June_2012_Teriyaki_Duck.jpg/1200px-22nd_June_2012_Teriyaki_Duck.jpg',
    serves: '1 person (meal bowl)',
    ingredients: [
      'Steamed rice',
      'Teriyaki chicken',
      'Broccoli florets',
      'Sliced carrots',
      'Teriyaki glaze',
      'Toasted sesame seeds',
    ],
    nutrition: {
      calories: 640,
      protein: 39,
      carbs: 74,
      fat: 20,
      sugar: 16,
    },
  },
  {
    id: 'bowl-veggie-power',
    name: 'Veggie Power Bowl',
    category: 'Bowls',
    description: 'Quinoa, chickpeas, roasted vegetables, kale, and tahini drizzle.',
    price: 10.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/BuddhaBowlLot.jpg/1200px-BuddhaBowlLot.jpg',
    serves: '1 person (meal bowl)',
    ingredients: [
      'Cooked quinoa',
      'Chickpeas',
      'Roasted vegetables',
      'Chopped kale',
      'Tahini drizzle',
      'Lemon juice',
    ],
    nutrition: {
      calories: 560,
      protein: 20,
      carbs: 68,
      fat: 22,
      sugar: 9,
    },
  },
  {
    id: 'dessert-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description: 'Warm chocolate cake with a molten center and vanilla cream.',
    price: 5.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Chocolate_Fondant.jpg/1200px-Chocolate_Fondant.jpg',
    serves: '1 person (1 cake)',
    ingredients: [
      'Dark chocolate',
      'Unsalted butter',
      'Egg',
      'Sugar',
      'Flour',
      'Vanilla cream topping',
    ],
    nutrition: {
      calories: 430,
      protein: 6,
      carbs: 52,
      fat: 22,
      sugar: 35,
    },
  },
  {
    id: 'dessert-yogurt-parfait',
    name: 'Berry Yogurt Parfait',
    category: 'Desserts',
    description: 'Greek yogurt layered with berries, honey, and granola.',
    price: 4.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Parfait_samples_by_pinguino_in_Osaka%2C_Japan.jpg/1200px-Parfait_samples_by_pinguino_in_Osaka%2C_Japan.jpg',
    serves: '1 person (1 parfait cup)',
    ingredients: [
      'Greek yogurt',
      'Mixed berries',
      'Granola',
      'Honey',
      'Chia seeds',
    ],
    nutrition: {
      calories: 280,
      protein: 14,
      carbs: 38,
      fat: 8,
      sugar: 23,
    },
  },
  {
    id: 'drink-citrus-cooler',
    name: 'Sparkling Citrus Cooler',
    category: 'Drinks',
    description: 'Lemon-lime sparkling beverage with fresh mint and orange zest.',
    price: 2.99,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/1200px-Lemonade_-_27682817724.jpg',
    serves: '1 person (12 oz)',
    ingredients: [
      'Sparkling water',
      'Lemon juice',
      'Lime juice',
      'Orange zest',
      'Mint',
      'Ice cubes',
    ],
    nutrition: {
      calories: 110,
      protein: 0,
      carbs: 27,
      fat: 0,
      sugar: 24,
    },
  },
  {
    id: 'drink-iced-tea',
    name: 'Unsweetened Iced Tea',
    category: 'Drinks',
    description: 'Fresh-brewed black tea served chilled with lemon.',
    price: 2.49,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Y%C3%AAn_H%C3%B2a_Parkview_City_29-07-2025_Mme_Th%E1%BB%A7y_Iced_Tea_E03.jpg/1200px-Y%C3%AAn_H%C3%B2a_Parkview_City_29-07-2025_Mme_Th%E1%BB%A7y_Iced_Tea_E03.jpg',
    serves: '1 person (12 oz)',
    ingredients: [
      'Black tea',
      'Cold water',
      'Lemon',
      'Ice cubes',
    ],
    nutrition: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
      sugar: 0,
    },
  },
   {
    id: 'classic-tomato-bruschetta',
    name: 'Classic Tomato Bruschetta',
    category: 'Healthy',
    description: 'Grilled bread topped with fresh tomatoes, basil, and grated Parmesan cheese.',
    price: 8.49,
    image: getLocalHealthyImage(
      'classic-tomato-bruschetta',
      createFoodImage('bruschetta,tomato,appetizer', 101),
    ),
    serves: '2 people (4 pieces)',
    ingredients: [
      'French loaf',
      'Roma tomato',
      'Extra-virgin olive oil',
      'Fresh basil',
      'Grated Parmesan cheese',
      'Sea salt and black pepper',
    ],
    nutrition: {
      calories: 170,
      protein: 7,
      carbs: 26,
      fat: 6,
      sugar: 5,
    },
  },
  {
    id: 'mini-egg-frittatas',
    name: 'Mini Egg Frittatas',
    category: 'Healthy',
    description: 'Bite-sized egg frittatas with vegetables and cheese.',
    price: 8.99,
    image: getLocalHealthyImage(
      'mini-egg-frittatas',
      createFoodImage('egg,frittatas,healthy', 102),
    ),
    serves: '2 people (4 muffins)',
    ingredients: [
      'Eggs',
      'Diced tomatoes',
      'Shredded mozzarella cheese',
      'Parmesan cheese',
      'Fresh basil',
      'Salt and pepper',
    ],
    nutrition: {
      calories: 190,
      protein: 15,
      carbs: 4,
      fat: 14,
      sugar: 2,
    },
  },
  {
    id: 'italian-street-piadina-fold',
    name: 'Italian Street Piadina Fold',
    category: 'Healthy',
    description: 'Delicious Italian flatbread folded with fresh ingredients.',
    price: 9.99,
    image: getLocalHealthyImage(
      'italian-street-piadina-fold',
      createFoodImage('piadina,italian,healthy', 103),
    ),
    serves: '2 people (4 pieces)',
    ingredients: [
      'Smart carbs tortilla',
      'Turkey breast',
      'Shredded mozzarella cheese',
      'Parmesan cheese',
      'Fresh spinach',
      'Marinara',
      'Fresh basil',
    ],
    nutrition: {
      calories: 190,
      protein: 16,
      carbs: 17,
      fat: 8,
      sugar: 3,
    },
  },
  {
    id: 'light-tiramisu-cup',
    name: 'Light Tiramisu Cup',
    category: 'Healthy',
    description: 'A lighter version of the classic Italian dessert.',
    price: 6.99,
    image: getLocalHealthyImage(
      'light-tiramisu-cup',
      createFoodImage('tiramisu,italian,healthy', 104),
    ),
    serves: '2 people (2 cups)',
    ingredients: [
      'Non-fat Greek yogurt',
      'Sugar-free cool whip',
      'Ladyfinger cookies',
      'Brewed coffee',
      'Cocoa powder',
    ],
    nutrition: {
      calories: 150,
      protein: 10,
      carbs: 19,
      fat: 5,
      sugar: 8,
    },
  },
  {
    id: 'uova-in-purgatory',
    name: 'Uova in Purgatory',
    category: 'Healthy',
    description:
      'Poached eggs in red tomato sauce with Parmesan, fresh basil, and a side of bread.',
    price: 12.99,
    image: getLocalHealthyImage(
      'uova-in-purgatory',
      createFoodImage('uova,eggs,tomato,italian', 105),
    ),
    serves: '1 person (1 serving with bread)',
    ingredients: [
      'Chicken eggs',
      'Red tomato sauce',
      'Onions',
      'Chopped tomatoes',
      'Crushed tomatoes',
      'Salt',
      'Black pepper',
      'Parmesan cheese',
      'Fresh basil',
      'Bread',
    ],
    nutrition: {
      calories: 264,
      protein: 28,
      carbs: 47,
      fat: 22,
      sugar: 3,
    },
  },
  {
    id: 'arugula-salad',
    name: 'Arugula Salad',
    category: 'Salads',
    description:
      'Baby arugula, cherry tomatoes, cured pork, and Parmesan with lemon-honey olive oil dressing.',
    price: 14.99,
    image: getLocalHealthyImage(
      'arugula-salad',
      createFoodImage('arugula,salad,parmesan', 106),
    ),
    serves: '1 person (large bowl)',
    ingredients: [
      'Baby arugula',
      'Cherry tomatoes',
      'Cured pork',
      'Parmesan cheese',
      'Lemon juice',
      'Salt',
      'Black pepper',
      'Honey',
      'Olive oil',
    ],
    nutrition: {
      calories: 316,
      protein: 19,
      carbs: 21,
      fat: 33,
      sugar: 15,
    },
  },
  {
    id: 'grilled-italian-panini',
    name: 'Grilled Italian Panini',
    category: 'Burgers',
    description:
      'Toasted panini layered with cured pork, mozzarella, tomato, and basil pesto.',
    price: 11.49,
    image: getLocalHealthyImage(
      'grilled-italian-panini',
      createFoodImage('panini,sandwich,italian', 107),
    ),
    serves: '1 person (1 sandwich)',
    ingredients: [
      'Toasted sandwich bread',
      'Cured pork slices',
      'Fresh mozzarella',
      'Tomato slices',
      'Basil pesto',
      'Olive oil',
      'Black pepper',
    ],
    nutrition: {
      calories: 560,
      protein: 27,
      carbs: 39,
      fat: 33,
      sugar: 5,
    },
  },
  {
    id: 'dinner-spaghetti',
    name: 'Dinner Spaghetti',
    category: 'Bowls',
    description:
      'Classic spaghetti with rich tomato meat sauce and fresh basil garnish.',
    price: 13.99,
    image: getLocalHealthyImage(
      'dinner-spaghetti',
      createFoodImage('spaghetti,pasta,dinner', 108),
    ),
    serves: '1 person (dinner plate)',
    ingredients: [
      'Spaghetti pasta',
      'Tomato sauce',
      'Ground beef',
      'Garlic',
      'Onion',
      'Olive oil',
      'Fresh basil',
      'Parmesan cheese',
      'Salt and black pepper',
    ],
    nutrition: {
      calories: 640,
      protein: 28,
      carbs: 74,
      fat: 26,
      sugar: 11,
    },
  },
  {
    id: 'clam-linguine',
    name: 'Clam Linguine',
    category: 'Bowls',
    description:
      'Linguine with creamy celery-shallot sauce, topped with clams, Parmesan, and basil.',
    price: 21.99,
    image: getLocalHealthyImage(
      'clam-linguine',
      createFoodImage('clam,linguine,pasta', 109),
    ),
    serves: '1 person (dinner plate)',
    ingredients: [
      'Linguine pasta',
      'Creamy sauce',
      'Fresh celery',
      'Shallots',
      'Clams',
      'Parmesan cheese',
      'Fresh basil',
    ],
    nutrition: {
      calories: 278,
      protein: 6,
      carbs: 45,
      fat: 12,
      sugar: 10,
    },
  },
  {
    id: 'zucchini-ribbon-pomodoro',
    name: 'Zucchini Ribbon Pomodoro',
    category: 'Healthy',
    description:
      'Zucchini ribbons in rustic tomato sauce finished with grated Parmesan cheese.',
    price: 12.49,
    image: getLocalHealthyImage(
      'zucchini-ribbon-pomodoro',
      createFoodImage('zucchini,pomodoro,healthy,pasta', 110),
    ),
    serves: '1 person (dinner plate)',
    ingredients: [
      'Zucchini ribbons',
      'Tomato sauce',
      'Garlic',
      'Olive oil',
      'Parmesan cheese',
      'Fresh herbs',
      'Salt and black pepper',
    ],
    nutrition: {
      calories: 160,
      protein: 7,
      carbs: 18,
      fat: 16,
      sugar: 9,
    },
  },
]
