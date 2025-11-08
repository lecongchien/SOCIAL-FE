'use client';
import { useAppContext } from '@/components/app-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { handleErrorApi } from '@/libs/utils';
import { useLoginMutation } from '@/queries/useAuth';
import { LoginBody, LoginBodyType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const { setIsAuth } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: LoginBodyType) {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(values);
      toast({
        description: result.payload.message,
      });
      router.push('/home');
      router.refresh();
      setIsAuth(true);
    } catch (error: unknown) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  }

  return (
    <div className='bg-black w-full min-h-screen flex items-center justify-center'>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-6xl mx-4 md:mx-8 lg:mx-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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

                  src="https://i.pinimg.com/736x/f4/ec/48/f4ec4838a7dc3987190198f500d41391.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  aria-hidden
                />
              </div>
              <div className="absolute left-0 top-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
                <Image
                  width={288}
                  height={384}
                  src="https://i.pinimg.com/736x/a3/c6/b0/a3c6b0c582e3d0d17163a6afce6910d7.jpg"
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

          {/* RIGHT - login panel */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm">
              {/* Logo */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-[cursive] text-white tracking-wide">Viora</h1>
              </div>

              <Card className="bg-[#111] border-0 shadow-lg">
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Số điện thoại, tên người dùng hoặc email"
                              className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3"
                              required
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <label className="sr-only" htmlFor="password">Mật khẩu</label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                className="bg-[#222] text-white placeholder-gray-400 !border-0 !ring-0 focus:!ring-0 focus:!outline-none focus:border-0 shadow-none appearance-none rounded-sm py-2 px-3 pr-10"
                                required
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-1 flex items-center text-gray-300"
                                aria-label="Toggle password visibility"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-[#2a80ff] hover:bg-[#1f63d6] text-white font-semibold py-2 rounded-sm"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                      </Button>

                      <div className="flex items-center my-2">
                        <div className="flex-1 h-px bg-[#2a2a2a]" />
                        <div className="px-3 text-sm text-gray-400">HOẶC</div>
                        <div className="flex-1 h-px bg-[#2a2a2a]" />
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center gap-2 text-[#3897f0] hover:bg-transparent"
                        type="button"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3897f0" aria-hidden>
                          <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.356c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                        </svg>
                        Đăng nhập bằng Facebook
                      </Button>

                      <div className="text-center mt-4">
                        <Link className="text-xs text-[#9999] hover:underline" href="/forgot-password">Quên mật khẩu?</Link>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <div className="mt-4 bg-transparent text-center p-4 text-sm text-gray-400">
                Bạn chưa có tài khoản? <Link className="text-[#2a80ff] hover:underline" href="/signup">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}