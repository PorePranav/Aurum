import api from './api';
import type { LoginPayload } from '../types/types';

export async function login({ email, password }: LoginPayload) {
  const { data } = await api.post(
    '/auth/login',
    { email, password },
    { withCredentials: true },
  );

  return data.data;
}

export async function logout() {
  await api.get('/auth/logout', { withCredentials: true });
}

export async function fetchUser() {
  const { data } = await api.get('/auth/me');

  return data.data;
}
