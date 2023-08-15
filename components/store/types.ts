export type Action<T> = {
  type: string;
  data: T;
};
export type AnySessionProps = {
  session: any;
};
export type User = {
  id?: string;
  email: string;
  name: string;
};

export type UserExpense = {
  user_id: string;
  total_amount: number;
};

// in database, item_id will be the unique key that identifies expense-item document
export type ExpenseItem = {
  item_id: string;
  expense_id: string;
  name: string;
  amount: number;
  quantity: number;
  ordered_by: string[]; // can be ordered by multiple different users (load User info to UI when needed)
};

// in database, expense_id will be the unique key that identifies expense document
export type Expense = {
  expense_id: string;
  creator_id: string;
  name: string;
  date: string;
  users: UserExpense[];
  subtotal_amount: number;
  total_amount?: number;
  tax_amount?: number;
  tip_amount?: number;
  status: string;
  items?: ExpenseItem[];
};

// DATABASE VIEW
/*
// in database, item_id will be the unique key that identifies expense-item document
export type ExpenseItem = {
  expense_id: string
  name: string;
  amount: number;
  quantity: number;
  ordered_by: string[]; // can be ordered by multiple different users
};

// in database, expense_id will be the unique key that identifies expense document
export type Expense = {
  creator_id: string;
  users: UserExpense[];
  subtotal_amount: number;
  total_amount?: number;
  tax_amount?: number;
  tip_amount?: number;
  status: string;
  items?: string[];
}; 
*/
