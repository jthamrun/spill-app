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

export type UserExpenseGroup = {
  user_id: string;
  total_amount: number;
};


export type ExpenseItemGroup = {
  group_id: string;
  item_id: string;
  splitOption: "equal" | "individual";
  splitAmount?: UserExpenseGroup[]; // only used if splitOption is "individual", if "equal", then just manually set it to have equal amount
}

// in database, item_id will be the unique key that identifies expense-item document
export type ExpenseItem = {
  item_id: string;
  expense_id: string;
  name: string;
  amount: number;
  quantity: number;
  groups: string[];
};

// in database, expense_id will be the unique key that identifies expense document
export type Expense = {
  expense_id: string;
  creator_id: string;
  name: string;
  date: string;
  subtotal_amount: number;
  total_amount?: number;
  tax_amount?: number;
  tip_amount?: number;
  status: string;
};

// DATABASE VIEW (1st proposal)
/*
// in database, item_id will be the unique key that identifies expense-item document
export type ExpenseItem = {
  expense_id: string
  name: string;
  amount: number;
  quantity: number;
  groups: string[];
};

export type ExpenseItemGroup = {
  group_id: string;
  item_id: string;
  splitOption: string; // "equal" or "individual"
  // ordered_by: string[];
  splitAmount?: { user_id: string; total_amount: number; }[]; // if splitOption is "equal", then amount is the same for all
}

// in database, expense_id will be the unique key that identifies expense document
export type Expense = {
  creator_id: string;
  name: string;
  date: string;
  users: string[]; // later in code, used seperately
  subtotal_amount: number;
  total_amount?: number;
  tax_amount?: number;
  tip_amount?: number;
  status: string;
  items?: string[]; // later in code, used seperately
  inviteId?: string;
}; 
*/

// DATABASE VIEW (2nd proposal)
/*
// all info in one expense document

// in database, expense_id will be the unique key that identifies expense document
export type Expense = {
  creator_id: string;
  name: string;
  date: string;
  users: string[];
  subtotal_amount: number;
  total_amount?: number;
  tax_amount?: number;
  tip_amount?: number;
  status: string;
  items?: ExpenseItem[];
  inviteId?: string;
}; 

export type ExpenseItem = {
  expense_id: string;
  name: string;
  amount: number;
  quantity: number;
  groups: ExpenseItemGroup[]; // can be ordered by multiple different users
};

export type ExpenseItemGroup = {
  item_id: string;
  splitOption: string; // "equal" or "individual"
  // ordered_by: string[];
  splitAmount?: {user_id: string, amount: number}[]; // if splitOption is "equal", then amount is the same for all
}
*/

