import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: signIn,
  });
}
