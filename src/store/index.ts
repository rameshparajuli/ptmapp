import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import languageReducer from "./languageSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
