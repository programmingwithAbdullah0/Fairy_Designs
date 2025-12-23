'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function AdminLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setError('');
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Branding Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Logo/Icon */}
            <div className="mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-purple-600"
              >
                {/* Fairy Wings + FD Letters */}
                <circle cx="32" cy="32" r="30" fill="url(#gradient)" fillOpacity="0.1" />

                {/* Left Wing */}
                <path
                  d="M20 32C20 28 18 24 15 22C13 20 10 20 10 24C10 28 12 32 15 34C18 36 20 36 20 32Z"
                  fill="url(#gradient)"
                  opacity="0.8"
                />

                {/* Right Wing */}
                <path
                  d="M44 32C44 28 46 24 49 22C51 20 54 20 54 24C54 28 52 32 49 34C46 36 44 36 44 32Z"
                  fill="url(#gradient)"
                  opacity="0.8"
                />

                {/* FD Letters */}
                <text
                  x="32"
                  y="38"
                  fontSize="20"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="url(#gradient)"
                >
                  FD
                </text>

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Brand Text */}
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent tracking-wide mb-2">
              FAIRY DESIGNS
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-sm font-medium">
              Admin Panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email Input */}
            <div>
              <input
                type="text"
                placeholder="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isLoaded}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="/admin/signup"
                className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Create one
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note (optional) */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Secured by Clerk Authentication
        </p>
      </div>
    </div>
  );
}
