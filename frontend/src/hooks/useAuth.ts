import { useEffect } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import { login, register, me } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // 🔥 Critical fix:
      // After login, force /users/me to refetch
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error
  };
}

export function useAuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isError) {
      setUser(null);
    }
  }, [data, isError, setUser]);

  return { isLoading };
}
