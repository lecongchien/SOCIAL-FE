import { RoleValues } from '@/constants/type';
import z from 'zod';

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues),
    }),
  }),
  message: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>;

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  message: z.string(),
});

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>;

export const LogoutBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>;

export const RegisterBody = z
  .object({
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu không được quá 100 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
      ),
    name: z
      .string()
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(256, 'Tên không được quá 256 ký tự'),
    // confirmPassword: z.string(),
  })
  .strict();
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Mật khẩu xác nhận không khớp',
//   path: ['confirmPassword'],
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;
