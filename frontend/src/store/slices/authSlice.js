import { createSlice } from "@reduxjs/toolkit";

const ADMIN_KEY = "shivanand_admin";
const BIO_KEY = "shivanand_bio";
const ADMIN_ID = "admin";
const ADMIN_PASS = "pauva123";

const initialState = {
  isLoggedIn: sessionStorage.getItem(ADMIN_KEY) === "true",
  shopBio: localStorage.getItem(BIO_KEY) || "Welcome to Shivanand Pauva House! We serve over 200 varieties of premium Pauva (Poha) and handcrafted thick shakes from The Shake Maker. Experience the best of Vallabh Vidyanagar's favorite cafe.",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { id, password } = action.payload;
      const ok = id === ADMIN_ID && password === ADMIN_PASS;
      if (ok) {
        state.isLoggedIn = true;
        sessionStorage.setItem(ADMIN_KEY, "true");
      }
      return state;
    },
    logout(state) {
      state.isLoggedIn = false;
      sessionStorage.removeItem(ADMIN_KEY);
    },
    updateBio(state, action) {
      state.shopBio = action.payload;
      localStorage.setItem(BIO_KEY, action.payload);
    },
  },
});

export const { login, logout, updateBio } = authSlice.actions;
export default authSlice.reducer;
