import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import friendsReducer from "./friendsSlice";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
    auth: authReducer,
    register: registerReducer,
  },
});
