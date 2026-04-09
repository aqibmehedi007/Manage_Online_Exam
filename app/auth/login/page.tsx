'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'EMPLOYER') {
        router.push('/employer');
      } else {
        router.push('/candidate');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Auth Navbar */}
      <nav className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
        <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
          <div className="relative h-9 w-32">
            <Image src="/logo-color.svg" alt="AKIJ Resource" fill className="object-contain object-left" />
          </div>
          <h1 className="text-xl font-bold text-[#1e293b]">Akij Resource</h1>
          <div className="w-36"></div> {/* Spacer for symmetry */}
        </div>
      </nav>

      <main className="flex-1 flex flex-col pt-20">
        <div className="flex-1 flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-10">Sign In</h2>
          
          <div className="w-full max-w-lg bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-12">
            <form className="space-y-8" onSubmit={handleLogin}>
              <div className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-primary rounded-xl"
                  required
                />
                
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-gray-200 focus:border-primary rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-primary">
                    Forget Password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm text-destructive font-medium">{error}</p>}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" 
                isLoading={loading}
              >
                Submit
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link href="/auth/register" className="font-bold text-primary hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
}
