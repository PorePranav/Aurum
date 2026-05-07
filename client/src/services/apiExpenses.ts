import api from './api';

export async function fetchExpenses() {
  const { data } = await api.post('/expenses/', { withCredentials: true });

  return data.data;
}
