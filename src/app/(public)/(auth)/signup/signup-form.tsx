'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRegisterMutation } from '@/queries/useAuth';
import {
  RegisterBody,
  RegisterBodyType,
} from '@/schemaValidations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      // confirmPassword: '',
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    if (registerMutation.isPending) return;

    try {
      const result = await registerMutation.mutateAsync(values);
      toast({
        title: 'Thành công',
        description: result.payload.message || 'Đăng ký thành công!',
      });
      router.push('/home');
      router.refresh();
    } catch (error) {
      const errorResponse = error as { payload?: { message?: string } };
      toast({
        title: 'Lỗi',
        description:
          errorResponse?.payload?.message ||
          'Đăng ký thất bại. Vui lòng thử lại!',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Tạo tài khoản</h1>
        <p className="text-sm text-muted-foreground">
          Nhập thông tin của bạn để tạo tài khoản
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ví dụ@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button
            className="w-full"
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Đang đăng ký...' : 'Tạo tài khoản'}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Bạn đã có tài khoản?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
