import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiURL = 'https://randomuser.me/api/?results=5';

const fetchUsers = async (thunkAPI) => {
  try {
    const response = await fetch(apiURL);
    const { results } = await response.json();
    return results;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getUsers = createAsyncThunk('users/getUsers', fetchUsers);

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default usersSlice.reducer;
