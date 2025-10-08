export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string; // e.g., "Sushi & Sashimi Rolls", "Grilled Favorites"
  }
  
  export interface Restaurant {
    id: string;
    name: string;
    coverImageUrl: string; // The main "Netflix poster" image
    rating: number;
    cuisine: string;
    description: string;
    menu: FoodItem[]; // The list of all food items
  }