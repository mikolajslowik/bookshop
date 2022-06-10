import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import bookSlice from "../features/counter/bookSlice";

export const store = configureStore({
  reducer: {
    booksData: bookSlice,
  },
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
