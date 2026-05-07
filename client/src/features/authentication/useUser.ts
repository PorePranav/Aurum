import { useQuery } from '@tanstack/react-query';

import { fetchUser as fetchUserApi } from '../../services/apiAuth';
import type { ApiError, User } from '../../types/types';

export function useUser() {
  const {
    data: user,
    isPending,
    error,
  } = useQuery<User, ApiError>({
    queryKey: ['user'],
    queryFn: fetchUserApi,
    retry: 1,
  });

  return {
    user,
    isPending,
    error,
  };
}
