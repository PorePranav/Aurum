import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { login as loginApi } from '../../services/apiAuth';
import type { ApiError, LoginPayload, User } from '../../types/types';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation<User, AxiosError<ApiError>, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('Logged in successfully');
      navigate('/expenses');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  return {
    login,
    isPending,
    error,
  };
}
