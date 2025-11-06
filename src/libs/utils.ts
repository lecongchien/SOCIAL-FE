import { toast } from '@/components/ui/use-toast';
import envConfig from '@/config';
import { DishStatus, TableStatus } from '@/constants/type';
import { clsx, type ClassValue } from 'clsx';
import jwt from 'jsonwebtoken';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { EntityError } from './http';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = <T extends FieldValues = FieldValues>({
  error,
  setError,
  duration,
}: {
  error: unknown;
  setError?: UseFormSetError<T>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field as Parameters<UseFormSetError<T>>[0], {
        type: 'server',
        message: item.message,
      });
    });
  } else {
    const errorMessage = 
      error && typeof error === 'object' && 'payload' in error && 
      error.payload && typeof error.payload === 'object' && 'message' in error.payload
        ? String(error.payload.message)
        : 'Lỗi không xác định';
    
    toast({
      title: 'Lỗi',
      description: errorMessage,
      variant: 'destructive',
      duration: duration ?? 5000,
    });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const decodeJWT = <Payload = Record<string, unknown>>(token: string) => {
  return jwt.decode(token) as Payload;
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);
};

export const getVietnameseDishStatus = (
  status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
  switch (status) {
    case DishStatus.Available:
      return 'Có sẵn';
    case DishStatus.Unavailable:
      return 'Không có sẵn';
    default:
      return 'Ẩn';
  }
};

export const getVietnameseTableStatus = (
  status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
  switch (status) {
    case TableStatus.Available:
      return 'Có sẵn';
    case TableStatus.Reserved:
      return 'Đã đặt';
    default:
      return 'Ẩn';
  }
};

export const getTableLink = ({
  token,
  tableNumber,
}: {
  token: string;
  tableNumber: number;
}) => {
  return (
    envConfig.NEXT_PUBLIC_URL + '/tables/' + tableNumber + '?token=' + token
  );
};
