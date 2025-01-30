import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk для получения новостей
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ keyword = "", page = 1, limit = 6 }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/news",
        {
          params: {
            keyword: keyword || undefined, // Передавать неопределенный параметр вместо пустой строки
            page: page,
            limit: limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
