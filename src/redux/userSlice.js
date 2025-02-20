// redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { removePet } from "./petSlice"; // импортируем removePet thunk

// Async thunk для получения данных пользователя (уже есть)
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No token available");
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/users/current/full",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout()); // Вызываем логаут, если токен невалидный
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk для обновления данных пользователя (уже есть)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No token available");
    try {
      const response = await axios.patch(
        "https://petlove.b.goit.study/api/users/current/edit",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Обновляем список питомцев в userData при успешном удалении
      .addCase(removePet.fulfilled, (state, action) => {
        if (state.userData && state.userData.pets) {
          state.userData.pets = state.userData.pets.filter(
            (pet) => pet._id !== action.payload
          );
        }
      });
  },
});

export default userSlice.reducer;
