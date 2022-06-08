import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: 0;
  price: 0;
  currency: string;
}

export interface CounterState {
  loading: boolean;
  error: string;
  books: Book[];
}

const initialState: CounterState = {
  loading: false,
  error: "",
  books: [],
};

export const fetchData = createAsyncThunk("fetchData", () => {
  return axios
    .get("http://localhost:3001/docs")
    .then((response) => JSON.stringify(response))
    .then((response) => console.log(response));
});

// export const incrementAsync = createAsyncThunk(
//   "fetchData",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   // }
// );

export const counterSlice = createSlice({
  name: "booksHandler",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchBooks: (builder) => {},

    addToCart: (state, action) => {
      state.books = { ...state.books };
    },
  },
});

export const { addToCart } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state;

export default counterSlice.reducer;
