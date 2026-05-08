import api from './api';

export async function fetchCategories() {
  const { data } = await api.get('/categories', { withCredentials: true });

  return data.data;
}
