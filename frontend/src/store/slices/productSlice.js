import { createSlice } from "@reduxjs/toolkit";

const PRODUCTS_KEY = "shivanand_products";
const COMBOS_KEY = "shivanand_combos";
const OFFERS_KEY = "shivanand_offers";

const defaultProducts = [
  { id: "p1", name: "Masala Pauva", category: "pauva", price: 40, image: "/assets/pauva.png", description: "Classic spicy poha with peanuts, pomegranate and sev" },
  { id: "p2", name: "Peanut Pauva", category: "pauva", price: 45, image: "/assets/peanut_pauva.png", description: "Extra crunchy peanuts with fresh steam poha" },
  { id: "p3", name: "Corn Pauva", category: "pauva", price: 50, image: "/assets/corn_pauva.png", description: "Sweet corn and butter mixed with spicy poha" },
  { id: "p4", name: "Cheese Pauva", category: "pauva", price: 60, image: "/assets/cheese_pauva.png", description: "Loaded with premium melted cheese and herbs" },
  { id: "p5", name: "Dry Fruit Pauva", category: "pauva", price: 80, image: "/assets/dryfruit_pauva.png", description: "Rich almonds, cashews and raisins with sweet-spicy poha" },
  { id: "p6", name: "Tikka Pauva", category: "pauva", price: 70, image: "/assets/tikka_pauva.png", description: "Fusion tikka masala flavor with paneer chunks" },
  { id: "p7", name: "Belgian Chocolate Shake", category: "shake", price: 120, image: "/assets/shake.png", description: "Rich premium Belgian chocolate thick shake" },
  { id: "p8", name: "Mango Mastani Shake", category: "shake", price: 110, image: "/assets/mango_shake.png", description: "Fresh Alphonso mango pulp blend with ice cream" },
  { id: "p9", name: "Rose Petal Shake", category: "shake", price: 110, image: "/assets/rose_shake.png", description: "Refreshing rose flavored thick shake with real petals" },
  { id: "p10", name: "Oreo Thick Shake", category: "shake", price: 130, image: "/assets/oreo_shake.png", description: "Real Oreo cookies blended to perfection" },
  { id: "p11", name: "Cold Coffee with Ice Cream", category: "shake", price: 100, image: "/assets/cold_coffee.png", description: "Rich brewed coffee topped with vanilla scoop" },
];

const defaultCombos = [
  { id: "c1", name: "Quick Snack", items: "Masala Pauva + Cold Coffee", originalPrice: 140, comboPrice: 89, image: "/assets/combo.png" },
  { id: "c2", name: "Hunger Saver", items: "Cheese Pauva + Belgian Shake", originalPrice: 180, comboPrice: 169, image: "/assets/hunger_combo.png" },
  { id: "c3", name: "Friends Box", items: "2 Variety Pauva + 1 Premium Shake", originalPrice: 240, comboPrice: 229, image: "/assets/friends_combo.png" },
  { id: "c4", name: "Family Combo", items: "3 Assorted Pauva + 2 Regular Shakes", originalPrice: 350, comboPrice: 269, image: "/assets/family_combo.png" },
];

const defaultOffers = [
  { id: "o1", title: "Inaugural Offer!", description: "Flat 10% off on all combos this month", discount: 10, validTill: "2026-06-30", image: "", badge: "🔥 HOT" },
  { id: "o2", title: "Student Discount", description: "Show your ID and get 5% extra off", discount: 5, validTill: "2026-12-31", image: "", badge: "⭐ POPULAR" },
  { id: "o3", title: "Combo Delight", description: "Save more than ₹50 on our signature boxes", discount: 0, validTill: "2026-12-31", image: "", badge: "🎉 BEST VALUE" },
];

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const data = JSON.parse(raw);
    // Migration: replace /src/assets/ with /assets/
    const migratePaths = (obj) => {
      if (Array.isArray(obj)) return obj.map(migratePaths);
      if (obj !== null && typeof obj === 'object') {
        const newObj = { ...obj };
        if (typeof newObj.image === 'string' && newObj.image.startsWith('/src/assets/')) {
          newObj.image = newObj.image.replace('/src/assets/', '/assets/');
        }
        return newObj;
      }
      return obj;
    };
    return migratePaths(data);
  } catch {
    return fallback;
  }
};

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  products: loadJSON(PRODUCTS_KEY, defaultProducts),
  combos: loadJSON(COMBOS_KEY, defaultCombos),
  offers: loadJSON(OFFERS_KEY, defaultOffers),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push({ ...action.payload, id: "p" + Date.now() });
      saveJSON(PRODUCTS_KEY, state.products);
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveJSON(PRODUCTS_KEY, state.products);
    },
    addCombo(state, action) {
      state.combos.push({ ...action.payload, id: "c" + Date.now() });
      saveJSON(COMBOS_KEY, state.combos);
    },
    deleteCombo(state, action) {
      state.combos = state.combos.filter((c) => c.id !== action.payload);
      saveJSON(COMBOS_KEY, state.combos);
    },
    addOffer(state, action) {
      state.offers.push({ ...action.payload, id: "o" + Date.now() });
      saveJSON(OFFERS_KEY, state.offers);
    },
    deleteOffer(state, action) {
      state.offers = state.offers.filter((o) => o.id !== action.payload);
      saveJSON(OFFERS_KEY, state.offers);
    },
  },
});

export const { 
  addProduct, deleteProduct, 
  addCombo, deleteCombo, 
  addOffer, deleteOffer 
} = productSlice.actions;

export default productSlice.reducer;
