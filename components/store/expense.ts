import { Expense } from "@/app";
import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "ExpenseSlice",
  initialState: <Expense[]>[],
  reducers: {
    updateExpenseList: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateExpenseList } = expenseSlice.actions;

export default expenseSlice.reducer;
