import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginUser } from "./authSlice"; // Импортируем loginUser из authSlice

// Async thunk для регистрации
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://petlove.b.goit.study/api/users/signup",
        { name, email, password }
      );
      console.log("Register response:", response.data); // Отладочное сообщение
      // Автоматически логиним пользователя после регистрации
      await dispatch(loginUser({ email, password }));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Token saved in register:", action.payload.token); // Отладочное сообщение
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
