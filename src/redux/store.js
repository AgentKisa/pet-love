import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import friendsReducer from "./friendsSlice";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import userReducer from "./userSlice";
import petReducer from "./petSlice";
import noticesReducer from "./noticesSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    pets: petReducer,
    notices: noticesReducer,
  },
});
