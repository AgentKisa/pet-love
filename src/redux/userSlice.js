import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk для получения данных пользователя
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token available");
    }

    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/users/current/full",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

// Async thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token available");
    }

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
        console.log("Fetch user data: pending");
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log("Fetch user data: fulfilled");
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log("Fetch user data: rejected", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        console.log("Update user data: pending");
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("Update user data: fulfilled");
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("Update user data: rejected", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
  /******  95724fc2-584d-4420-a9ae-ad47df48b0ff  *******/
});

export default userSlice.reducer;
