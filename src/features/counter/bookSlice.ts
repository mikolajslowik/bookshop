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
  amount: number;
}

export interface CounterState {
  totalRecords: number;
  loading: boolean;
  error: string | unknown;
  books: Book[];
  cart: Book[];
  page: number;
  query: string;
}

const initialState: CounterState = {
  totalRecords: 0,
  loading: false,
  error: "",
  books: [],
  cart: [],
  page: 1,
  query: "",
};

const removeDuplicates = (array: any[], prop: any) => {
  return array.filter((item, index, arr) => {
    return (
      index ===
      arr.findIndex((foundItem) => {
        return foundItem[prop] === item[prop];
      })
    );
  });
};

export const fetchData: any = createAsyncThunk(
  "fetchData",
  async (_, thunkApi) => {
    let query: string = (thunkApi.getState() as RootState).booksData.query;
    let page: number = (thunkApi.getState() as RootState).booksData.page;
    return axios({
      method: "GET",
      url: `http://localhost:3001/api/books?page=${page}&search[title]=${query}&search[author]=${query}`,
    }).then((response) => {
      return response;
    });
  }
);

export const bookSlice = createSlice({
  name: "booksHandler",
  initialState,
  reducers: {
    changeAmount: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload.amount],
      };
    },
    addToCart: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((el) => {
          return el.id !== action.payload.id;
        }),
      };
    },
    removeEverythingFromCart: (state) => {
      return {
        ...state,
        cart: [],
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
          totalRecords: action.payload.data.metadata.total_records,
          books: removeDuplicates(
            [...state.books, ...action.payload.data.data],
            "id"
          ),
        };
      }),
      builder.addCase(fetchData.pending, (state) => {
        return {
          ...state,
          loading: true,
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

export const {
  addToCart,
  setQuery,
  setPage,
  removeFromCart,
  removeEverythingFromCart,
} = bookSlice.actions;

export const booksData = (state: RootState) => state.booksData;

export const selectBooks = (state: RootState) => state.booksData.books;

export const query = (state: RootState) => state.booksData.query;

export const page = (state: RootState) => state.booksData.page;

export const cart = (state: RootState) => state.booksData.cart;

export const loading = (state: RootState) => state.booksData.loading;

export const totalRecords = (state: RootState) => state.booksData.totalRecords;

export default bookSlice.reducer;
