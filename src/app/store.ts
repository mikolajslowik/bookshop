import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import bookSlice from "../features/counter/bookSlice";
import { searchApi } from "../features/counter/services/search";

export const store = configureStore({
  reducer: {
    booksData: bookSlice,
    searchApi: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
store.subscribe(() => console.log(store.getState()));
setupListeners(store.dispatch);
