'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRegisterMutation } from '@/queries/useAuth';
import { RegisterBody, RegisterBodyType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
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
    <div className="w-full max-w-6xl mx-4 md:mx-8 lg:mx-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* left artwork can be added at page level; keep blank for symmetry with login */}
      <div className="hidden md:flex items-center justify-center">
        <div className="relative w-[420px] h-[540px]">
          <div className="absolute -left-6 -top-6 w-72 h-96 rounded-3xl transform rotate-6 shadow-2xl overflow-hidden">
            <Image
              width={288}
              height={384}
              quality={100}
              src="https://i.pinimg.com/736x/35/3b/25/353b2512e2d3393bd324486559800f0f.jpg"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden
            />
          </div>
          <div className="absolute left-6 top-6 w-72 h-96 rounded-3xl transform -rotate-6 shadow-2xl overflow-hidden">
            <Image
              width={288}
              height={384}
              quality={100}
              src="https://i.pinimg.com/736x/a3/c6/b0/a3c6b0c582e3d0d17163a6afce6910d7.jpg"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden
            />
          </div>
          <div className="absolute left-0 top-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            <Image
              width={288}
              height={384}
              src="https://i.pinimg.com/736x/f4/ec/48/f4ec4838a7dc3987190198f500d41391.jpg"
              alt=""
              quality={100}
              className="w-full h-full object-cover"
              aria-hidden
            />
            <div className="absolute -right-6 top-10 bg-gradient-to-tr from-pink-500 to-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">❤</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-[cursive] text-white tracking-wide">
              Viora
            </h1>
          </div>

          <Card className="bg-[#111] border-0 shadow-lg">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Họ và tên"
                            className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3"
                            {...field}
                          />
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
                        <FormControl>
                          <Input
                            placeholder="Email của bạn"
                            type="email"
                            className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3"
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
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Mật khẩu'
                              className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-1 flex items-center text-gray-300 p-1"
                              aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full bg-[#2a80ff] hover:bg-[#1f63d6] text-white font-semibold py-2 rounded-sm"
                    type="submit"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending
                      ? 'Đang đăng ký...'
                      : 'Tạo tài khoản'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-4 bg-transparent text-center p-4 text-sm text-gray-400">
            Bạn đã có tài khoản?{' '}
            <Link
              className="text-[#2a80ff] hover:underline"
              href="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
