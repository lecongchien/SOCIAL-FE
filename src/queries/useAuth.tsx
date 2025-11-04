import authApiRequest from '@/apiRequests/auth';
import { useMutation } from '@tanstack/react-query';
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (body: { refreshToken: string }) => authApiRequest.logout(body),
  });
};

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.guestLogin,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.register,
  });
};
