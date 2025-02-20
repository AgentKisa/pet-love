// redux/noticesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (params, { rejectWithValue }) => {
    try {
      // Удаляем пустые параметры
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      const response = await axios.get(
        "https://petlove.b.goit.study/api/notices",
        { params: filteredParams }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "notices/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/notices/categories"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchSexes = createAsyncThunk(
  "notices/fetchSexes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/notices/sex"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "notices/fetchSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/notices/species"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchCities = createAsyncThunk(
  "notices/fetchCities",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/cities/",
        { params: { keyword } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Новый thunk для получения объявления по id
export const fetchNoticeById = createAsyncThunk(
  "notices/fetchNoticeById",
  async ({ id, token }, { rejectWithValue }) => {
    // Принимаем token как аргумент
    try {
      const response = await axios.get(
        `https://petlove.b.goit.study/api/notices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
          },
        }
      );
      console.log("API Response Data:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Ошибка запроса"); // Упрощаем обработку ошибок
    }
  }
);

export const addFavorite = createAsyncThunk(
  "notices/addFavorite",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://petlove.b.goit.study/api/notices/favorites/add/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { id };
    } catch (err) {
      // Если ошибка 409 (Conflict), возвращаем специальное значение
      const errorMessage =
        err.response?.data?.message || "Error adding favorite";
      return rejectWithValue({ id, message: errorMessage });
    }
  }
);

// Удаление объявления из избранного
export const removeFavorite = createAsyncThunk(
  "notices/removeFavorite",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://petlove.b.goit.study/api/notices/favorites/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { id };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error removing favorite";
      return rejectWithValue({ id, message: errorMessage });
    }
  }
);

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: [],
    notice: null,
    page: 1,
    perPage: 6,
    totalPages: 1,
    filters: {},
    categories: [],
    sexes: [],
    species: [],
    cities: [],
    loading: false,
    loadingID: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearNotice(state) {
      state.notice = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        console.log("Fetching notices: pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        console.log("Fetching notices: fulfilled", action.payload);
        state.loading = false;
        state.notices = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        console.log("Fetching notices: rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log("Fetching categories: fulfilled", action.payload);
        state.categories = action.payload;
      })
      .addCase(fetchSexes.fulfilled, (state, action) => {
        console.log("Fetching sexes: fulfilled", action.payload);
        state.sexes = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        console.log("Fetching species: fulfilled", action.payload);
        state.species = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log("Fetching cities: fulfilled", action.payload);
        state.cities = action.payload;
      })
      .addCase(fetchNoticeById.pending, (state) => {
        console.log("Fetching notice by ID: pending");
        state.loadingID = true;
        state.error = null;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        console.log("Fetching notice by ID: fulfilled", action.payload);
        state.loadingID = false;
        state.notice = action.payload;
        state.error = null;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        console.log("Fetching notice by ID: rejected", action.payload);
        state.loadingID = false;
        state.notice = null;
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const index = state.notices.findIndex(
          (n) => n._id === action.payload.id
        );
        if (index !== -1) {
          state.notices[index].isFavorite = true;
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        // Если ошибка 409, считаем, что объявление уже добавлено в избранное
        if (action.payload?.message?.includes("already added")) {
          const index = state.notices.findIndex(
            (n) => n._id === action.payload.id
          );
          if (index !== -1) {
            state.notices[index].isFavorite = true;
          }
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const index = state.notices.findIndex(
          (n) => n._id === action.payload.id
        );
        if (index !== -1) {
          state.notices[index].isFavorite = false;
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        // Если ошибка 409 для удаления, считаем, что объявление не находится в избранном
        if (action.payload?.message?.includes("not found")) {
          const index = state.notices.findIndex(
            (n) => n._id === action.payload.id
          );
          if (index !== -1) {
            state.notices[index].isFavorite = false;
          }
        } else {
          state.error = action.payload.message;
        }
      });
  },
});

export const { setFilters, setPage, clearNotice } = noticesSlice.actions;
export default noticesSlice.reducer;
