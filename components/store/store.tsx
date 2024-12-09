import * as SecureStore from "expo-secure-store";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer, { expenseSlice } from "./expense";
import categoriesReducer from './category'
import userReducer from './user'
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    categories:  categoriesReducer,
    userToken: userReducer
  },
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()



export async function SetValueForStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  console.log("Stored user token in secure store");
}

export function GetValueFromStore(key: string): string {
  let value = SecureStore.getItem(key);
  return value || "";
}

export async function DeleteKeyFromStore(key: string) {
  await SecureStore.deleteItemAsync(key);
  console.log("Deleted Key: ", key);
}

export const USER_TOKEN_KEY = "user_token";
