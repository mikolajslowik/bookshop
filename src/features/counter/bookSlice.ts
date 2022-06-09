import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../../app/store";

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
  error: string | unknown;
  books: Book[];
  cart: Book[];
  page: number;
  query: string;
}

const initialState: CounterState = {
  loading: false,
  error: "",
  books: [],
  cart: [],
  page: 1,
  query: "",
};

export const fetchData = createAsyncThunk("fetchData", async (_, thunkApi) => {
  let query: string = (thunkApi.getState() as RootState).booksData.query;
  // let page: number = thunkApi.getState().booksData.page;
  return axios({
    method: "GET",
    url: `http://localhost:3001/api/books?page=1&search[title]=${query}&search[author]=${query}`,
  }).then((response) => {
    console.log("response", response);
    return response.data;
  });
});

export const bookSlice = createSlice({
  name: "booksHandler",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    setQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setPage: (state, action) => {
      return {
        ...state,
        page: state.page + action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(fetchData.fulfilled, (state, action) => {
        return {
          ...state,
          books: action.payload.data,
        };
      }),
      builder.addCase(fetchData.pending, (state) => {
        return {
          ...state,
          loaing: true,
        };
      }),
      builder.addCase(fetchData.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
    );
  },
});

export const { addToCart, setQuery, setPage } = bookSlice.actions;

export const selectBooks = (state: RootState) => state.booksData.books;

export const query = (state: RootState) => state.booksData.query;

export default bookSlice.reducer;
