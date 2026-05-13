import { createSlice } from "@reduxjs/toolkit";

const REVIEWS_KEY = "pauva_reviews";

const defaultReviews = [
  {
    id: "demo-1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Best ice cream in town! The mango flavor is absolutely divine. My kids love coming here every weekend. 🍦",
    date: "2026-03-20",
    type: "review",
  },
  {
    id: "demo-2",
    name: "Rahul Patel",
    rating: 4,
    comment: "Amazing variety and great service. The chocolate truffle sundae is a must-try! Would love to see more sugar-free options.",
    date: "2026-04-01",
    type: "feedback",
  },
  {
    id: "demo-3",
    name: "Anita Desai",
    rating: 5,
    comment: "The brownies here are heavenly! Warm, fudgy, and perfectly paired with their vanilla ice cream. A must-visit! 🍫",
    date: "2026-04-10",
    type: "review",
  },
];

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  reviews: loadJSON(REVIEWS_KEY, defaultReviews),
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(state, action) {
      const newReview = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      };
      state.reviews.unshift(newReview);
      saveJSON(REVIEWS_KEY, state.reviews);
    },
    deleteReview(state, action) {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      saveJSON(REVIEWS_KEY, state.reviews);
    },
  },
});

export const { addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
