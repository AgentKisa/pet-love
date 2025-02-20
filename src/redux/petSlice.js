// redux/petSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный thunk для добавления питомца (уже есть)
export const addPet = createAsyncThunk(
  "pets/addPet",
  async (petData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token available");
    }
    try {
      const response = await axios.post(
        "https://petlove.b.goit.study/api/users/current/pets/add",
        petData,
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

// Новый thunk для удаления питомца
export const removePet = createAsyncThunk(
  "pets/removePet",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token available");
    }
    try {
      const response = await axios.delete(
        `https://petlove.b.goit.study/api/users/current/pets/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Можно вернуть id, чтобы затем удалить его из состояния
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [], // список питомцев пользователя
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearPetsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Добавляем нового питомца в список
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removePet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Удаляем питомца по id
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      })
      .addCase(removePet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPetsError } = petSlice.actions;
export default petSlice.reducer;
