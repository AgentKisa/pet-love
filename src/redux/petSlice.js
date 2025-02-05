import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный thunk для добавления питомца
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

// Создаем слайс для работы с питомцами
const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [], // список питомцев пользователя
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Дополнительные редюсеры, если необходимо
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
        // Можно добавить нового питомца в список
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPetsError } = petSlice.actions;
export default petSlice.reducer;
