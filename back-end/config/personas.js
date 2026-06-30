const personas = [
  {
    name: "Rose Lover",
    preferredFlowers: ["Rose"],
    secondaryFlowers: ["Tulip", "Hydrangea"],
    preferredCategories: ["Bouquet", "Flower", "Flower Pot"],
    interactionRange: { min: 20, max: 35 },
    probabilities: { click: 0.95, view: 0.90, wishlist: 0.70, cart: 0.50, purchase: 0.35 }
  },
  {
    name: "Sunflower Lover",
    preferredFlowers: ["Sunflower"],
    secondaryFlowers: ["Daisy"],
    preferredCategories: ["Bouquet", "Flower", "Key Chain"],
    interactionRange: { min: 18, max: 30 },
    probabilities: { click: 0.90, view: 0.85, wishlist: 0.60, cart: 0.40, purchase: 0.30 }
  },
  {
    name: "Lily Enthusiast",
    preferredFlowers: ["Lily"],
    secondaryFlowers: ["Rose", "Gerbera"],
    preferredCategories: ["Bouquet", "Flower Pot"],
    interactionRange: { min: 16, max: 28 },
    probabilities: { click: 0.88, view: 0.82, wishlist: 0.55, cart: 0.38, purchase: 0.28 }
  },
  {
    name: "Tulip Admirer",
    preferredFlowers: ["Tulip"],
    secondaryFlowers: ["Hydrangea", "Daisy"],
    preferredCategories: ["Bouquet", "Flower"],
    interactionRange: { min: 15, max: 26 },
    probabilities: { click: 0.85, view: 0.80, wishlist: 0.58, cart: 0.36, purchase: 0.25 }
  },
  {
    name: "Gerbera Fan",
    preferredFlowers: ["Gerbera"],
    secondaryFlowers: ["Sunflower", "Daisy"],
    preferredCategories: ["Bouquet", "Key Chain", "Flower"],
    interactionRange: { min: 14, max: 24 },
    probabilities: { click: 0.82, view: 0.78, wishlist: 0.50, cart: 0.32, purchase: 0.22 }
  },
  {
    name: "Daisy Devotee",
    preferredFlowers: ["Daisy"],
    secondaryFlowers: ["Gerbera", "Tulip"],
    preferredCategories: ["Key Chain", "Flower", "Bouquet"],
    interactionRange: { min: 12, max: 22 },
    probabilities: { click: 0.80, view: 0.75, wishlist: 0.48, cart: 0.30, purchase: 0.20 }
  },
  {
    name: "Hydrangea Lover",
    preferredFlowers: ["Hydrangea"],
    secondaryFlowers: ["Rose", "Lily"],
    preferredCategories: ["Flower Pot", "Bouquet"],
    interactionRange: { min: 15, max: 25 },
    probabilities: { click: 0.84, view: 0.79, wishlist: 0.53, cart: 0.34, purchase: 0.24 }
  },
  {
    name: "Bouquet Browser",
    preferredFlowers: ["Rose", "Lily"],
    secondaryFlowers: ["Tulip"],
    preferredCategories: ["Bouquet"],
    interactionRange: { min: 20, max: 32 },
    probabilities: { click: 0.93, view: 0.88, wishlist: 0.65, cart: 0.45, purchase: 0.32 }
  },
  {
    name: "Potted Plant Person",
    preferredFlowers: ["Hydrangea", "Lily"],
    secondaryFlowers: ["Rose"],
    preferredCategories: ["Flower Pot"],
    interactionRange: { min: 10, max: 18 },
    probabilities: { click: 0.78, view: 0.72, wishlist: 0.45, cart: 0.28, purchase: 0.19 }
  },
  {
    name: "Keychain Gifter",
    preferredFlowers: ["Daisy", "Sunflower"],
    secondaryFlowers: ["Gerbera"],
    preferredCategories: ["Key Chain"],
    interactionRange: { min: 8, max: 15 },
    probabilities: { click: 0.75, view: 0.68, wishlist: 0.40, cart: 0.25, purchase: 0.18 }
  },
  {
    name: "Window Shopper",
    preferredFlowers: ["Rose", "Tulip", "Lily"],
    secondaryFlowers: ["Sunflower", "Gerbera"],
    preferredCategories: ["Bouquet", "Flower", "Flower Pot", "Key Chain"],
    interactionRange: { min: 35, max: 55 },
    probabilities: { click: 0.97, view: 0.60, wishlist: 0.20, cart: 0.08, purchase: 0.03 }
  },
  {
    name: "Impulse Buyer",
    preferredFlowers: ["Sunflower", "Gerbera"],
    secondaryFlowers: ["Daisy", "Rose"],
    preferredCategories: ["Bouquet", "Flower"],
    interactionRange: { min: 12, max: 20 },
    probabilities: { click: 0.92, view: 0.85, wishlist: 0.40, cart: 0.55, purchase: 0.45 }
  },
  {
    name: "Budget Shopper",
    preferredFlowers: ["Daisy", "Gerbera"],
    secondaryFlowers: ["Tulip"],
    preferredCategories: ["Key Chain", "Flower"],
    interactionRange: { min: 18, max: 30 },
    probabilities: { click: 0.70, view: 0.62, wishlist: 0.35, cart: 0.22, purchase: 0.15 }
  },
  {
    name: "Luxury Buyer",
    preferredFlowers: ["Rose", "Hydrangea", "Lily"],
    secondaryFlowers: ["Tulip"],
    preferredCategories: ["Bouquet", "Flower Pot"],
    interactionRange: { min: 10, max: 18 },
    probabilities: { click: 0.91, view: 0.87, wishlist: 0.68, cart: 0.52, purchase: 0.42 }
  },
  {
    name: "Wishlist Hoarder",
    preferredFlowers: ["Lily", "Tulip", "Hydrangea"],
    secondaryFlowers: ["Rose", "Daisy"],
    preferredCategories: ["Bouquet", "Flower", "Flower Pot"],
    interactionRange: { min: 25, max: 40 },
    probabilities: { click: 0.89, view: 0.84, wishlist: 0.80, cart: 0.25, purchase: 0.10 }
  }
];


export default personas