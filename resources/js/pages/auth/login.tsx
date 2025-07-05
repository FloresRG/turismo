// resources/js/Pages/Auth/Login.tsx
import { Head, useForm } from '@inertiajs/react';
import { Mail, Lock, LoaderCircle, LogIn } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <Head title="Login" />

      <div
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://i.blogs.es/48a549/gran-turismo-tm-sport_20171017140908/1366_2000.jpg')",
        }}
      >
        {/* Capa oscura + blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

        {/* Tarjeta con animación */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
          <form onSubmit={submit} className="space-y-6 font-serif text-white">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-wide">Welcome</h1>
              <p className="text-sm text-gray-300">Log in to continue racing</p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <InputError message={errors.email} />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <TextLink
                      href={route('password.request')}
                      className="text-sm text-blue-300 hover:underline"
                    >
                      Forgot?
                    </TextLink>
                  )}
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <InputError message={errors.password} />
              </div>

              {/* Remember me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={data.remember}
                  onClick={() => setData('remember', !data.remember)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-[#00e676] hover:bg-[#00c853] text-black font-bold shadow-md"
              >
                {processing ? (
                  <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <LogIn className="h-5 w-5 mr-2" />
                )}
                {processing ? 'Logging in...' : 'Log in'}
              </Button>

              {/* Status */}
              {status && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-green-400 font-medium"
                >
                  {status}
                </motion.div>
              )}
            </div>

            <div className="text-center text-sm text-gray-400 pt-6">
              Don’t have an account?{' '}
              <TextLink href={route('register')} className="text-blue-400 hover:underline">
                Sign up
              </TextLink>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
