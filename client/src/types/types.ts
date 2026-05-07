export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type PaymentMethod = 'UPI' | 'CASH' | 'CARD' | 'BANK_TRANSFER';

export type Expense = {
  id: string;
  date: string;
  item: string;
  amount: number;
  paymentMethod: PaymentMethod;
  categoryId: string;
  userId: string;
  category: Category;
};

export type ApiError = {
  message: string;
};
