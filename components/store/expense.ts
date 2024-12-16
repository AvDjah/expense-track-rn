import { Expense } from "@/app";
import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "ExpenseSlice",
  initialState: <Expense[]>[],
  reducers: {
    updateExpenseList: (state: Expense[], action: { payload: Expense[] }) => {
      return action.payload.sort((a, b) => {
        const timeA = new Date(a.CreatedOn.Time);
        const timeB = new Date(b.CreatedOn.Time);
        return timeA.getTime() - timeB.getTime();
      });
    },
  },
});

export const { updateExpenseList } = expenseSlice.actions;

export default expenseSlice.reducer;
