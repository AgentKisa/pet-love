// redux/noticesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/notices",
        { params }
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
  /*************  ✨ Codeium Command 🌟  *************/
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        console.log("Fetching notice by ID: fulfilled", action.payload);
        state.loading = false;
        state.notice = action.payload;
        state.error = null;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        console.log("Fetching notice by ID: rejected", action.payload);
        state.loading = false;
        state.notice = null;
        state.error = action.payload;
      });
  },
  /******  b3259411-e7a8-4c73-a339-894671932ed6  *******/
});

export const { setFilters, setPage, clearNotice } = noticesSlice.actions;
export default noticesSlice.reducer;
