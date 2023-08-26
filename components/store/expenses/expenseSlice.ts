import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense, ExpenseItem, ExpenseItemGroup } from "../types";
import { RootState } from "../store";

interface ExpensesState {
  expenses: Expense[];
  expenseItems: ExpenseItem[];
  expenseItemGroups: ExpenseItemGroup[];
}

const initialState: ExpensesState = {
  expenses: [],
  expenseItems: [],
  expenseItemGroups: [],
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      const expense = action.payload;
      state.expenses.push(expense);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const updatedExpense = action.payload;
      state.expenses.splice(
        state.expenses.findIndex(
          (expense) => expense.expense_id === updatedExpense.expense_id
        ),
        1,
        updatedExpense
      );
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.expenses = state.expenses.filter(
        (expense) => expense.expense_id !== id
      );
    },
    addExpenseItem: (state, action: PayloadAction<ExpenseItem>) => {
      const expenseItem = action.payload;
      state.expenseItems.push(expenseItem);
    },
    updateExpenseItem: (state, action: PayloadAction<ExpenseItem>) => {
      const updatedExpenseItem = action.payload;
      state.expenseItems.splice(
        state.expenseItems.findIndex(
          (expenseItem) => expenseItem.item_id === updatedExpenseItem.item_id
        ),
        1,
        updatedExpenseItem
      );
    },
    removeExpenseItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.expenseItems = state.expenseItems.filter(
        (expenseItem) => expenseItem.item_id !== id
      );
    },
    addExpenseItemGroup: (state, action: PayloadAction<ExpenseItemGroup>) => {
      const expenseItemGroup = action.payload;
      state.expenseItemGroups.push(expenseItemGroup);
    },
    updateExpenseItemGroup: (
      state,
      action: PayloadAction<ExpenseItemGroup>
    ) => {
      const updatedExpenseItemGroup = action.payload;
      state.expenseItemGroups.splice(
        state.expenseItemGroups.findIndex(
          (expenseItemGroup) =>
            expenseItemGroup.group_id === updatedExpenseItemGroup.group_id
        ),
        1,
        updatedExpenseItemGroup
      );
    },
    removeExpenseItemGroup: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.expenseItemGroups = state.expenseItemGroups.filter(
        (expenseItemGroup) => expenseItemGroup.group_id !== id
      );
    },
  },
});

// actions
export const {
  addExpense,
  addExpenseItem,
  addExpenseItemGroup,
  updateExpense,
  updateExpenseItem,
  updateExpenseItemGroup,
  removeExpense,
  removeExpenseItem,
  removeExpenseItemGroup,
} = expensesSlice.actions;

// selectors
export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpenseItems = (state: RootState) =>
  state.expenses.expenseItems;
export const selectExpenseItemGroups = (state: RootState) =>
  state.expenses.expenseItemGroups;

export default expensesSlice.reducer;
