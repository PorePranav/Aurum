export type Category = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateExpensePayload = {
  date: string;
  item: string;
  amount: number;
  paymentMethod: PaymentMethod;
  categoryId: string;
  paidTo: string;
  description: string | undefined;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Expense = {
  id: string;
  date: string;
  item: string;
  amount: number;
  paymentMethod: PaymentMethod;
  categoryId: string;
  userId: string;
  paidTo: string;
  description: string | undefined;
  category: Category;
};

export type ApiError = {
  message: string;
};

export const paymentMethods = ['CASH', 'UPI', 'CARD', 'NETBANKING'] as const;
export type PaymentMethod = (typeof paymentMethods)[number];
