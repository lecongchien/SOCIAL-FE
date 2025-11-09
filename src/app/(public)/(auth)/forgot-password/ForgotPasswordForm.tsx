'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordType) {
    setIsLoading(true);
    try {
      // TODO: Implement forgot password API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: 'Thành công',
        description: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.',
      });
      // Optionally redirect after success
      // router.push('/login');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể gửi email. Vui lòng thử lại!',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="w-full flex items-center justify-between px-8 py-4 bg-black">
        <h1 className="text-3xl font-[cursive] text-white">Viora</h1>
        <div className="flex gap-4">
          <Link href="/login">
            <Button className="bg-[#2a80ff] text-white rounded-md px-5 py-1 font-semibold">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/signup" className="text-[#2a80ff] font-semibold hover:underline flex items-center">
            Đăng ký
          </Link>
        </div>
      </header>
      <div className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-[cursive] text-white tracking-wide">
              Viora
            </h1>
          </div>

          <Card className="bg-[#111] border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center mb-4">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-white font-semibold text-lg mb-2">
                  Gặp sự cố khi đăng nhập?
                </h2>
                <p className="text-gray-400 text-sm text-center mb-4">
                  Nhập email, số điện thoại hoặc tên người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết để truy cập lại vào tài khoản của bạn.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email, Số điện thoại hoặc Tên người dùng</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email, Số điện thoại hoặc Tên người dùng"
                            type="text"
                            className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full bg-[#2a80ff] hover:bg-[#1f63d6] text-white font-semibold py-2 rounded-sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang gửi...' : 'Gửi liên kết đăng nhập'}
                  </Button>
                </form>
              </Form>

              <div className="mt-4 text-center">
                <Link
                  href="/login"
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  Không thể đặt lại mật khẩu của bạn?
                </Link>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#111] text-gray-400">HOẶC</span>
                </div>
              </div>

              <Link
                href="/signup"
                className="block text-center text-white font-semibold hover:text-gray-300"
              >
                Tạo tài khoản mới
              </Link>
            </CardContent>
          </Card>

          <div className="mt-4 bg-transparent text-center p-4">
            <Link
              className="text-sm text-white font-semibold hover:text-gray-300"
              href="/login"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
