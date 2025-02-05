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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
    }
  }
);

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSexes.fulfilled, (state, action) => {
        state.sexes = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      });
  },
});

export const { setFilters, setPage } = noticesSlice.actions;
export default noticesSlice.reducer;
