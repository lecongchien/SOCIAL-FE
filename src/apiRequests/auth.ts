import http from '@/libs/http';
import {
  AccountResType,
  ChangePasswordBodyType,
} from '@/schemas/account.schema';
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from '@/schemas/auth.schema';
import { MessageResType } from '@/schemas/common.schema';
import {
  GuestLoginBodyType,
  GuestLoginResType,
} from '@/schemas/guest.schema';

const authApiRequest = {
  SGuestLogin: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>('/guest/auth/login', body),
  guestLogin: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>('/api/guest/auth/login', body, {
      baseUrl: '',
    }),
  SLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, { baseUrl: '' }),
  logoutFromNextServerToServer: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) =>
    http.post<MessageResType>(
      '/auth/logout',
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  logout: (
    body: {
      refreshToken: string;
    },
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>('/api/auth/logout', body, {
      baseUrl: '',
      signal,
    }),
  changePassword: (body: ChangePasswordBodyType) =>
    http.put<AccountResType>('/account/change-password', body),
  SRegister: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/auth/register', body),
  // register: (body: RegisterBodyType) =>
  //   http.post<RegisterResType>('/api/auth/register', body, {
  //     baseUrl: 'http://localhost:5001',
  //   }),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/api/auth/register', body),
};

export default authApiRequest;
