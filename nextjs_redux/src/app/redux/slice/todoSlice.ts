import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    status: "pending",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoList.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.status = "success";
      state.todoList = action.payload;
    });
    builder.addCase(getTodoList.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const getTodoList = createAsyncThunk(
  "getTodoList",
  async (_, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }
    return response.json();
  }
);
