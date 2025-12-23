"use client";

import { useState } from 'react';
import { ArrowLeft, MessageCircle, Instagram, Send, Mail, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  title?: string;
  slug: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  priceMin: number;
  priceMax: number;
  description: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = 'fairydesigns@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast.error('Failed to copy email');
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    toast.success(`Opening ${platform}...`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultContact = {
    discord: 'https://discord.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Product Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit">
            {product.image && (
              <Image
                src={urlFor(product.image).width(800).height(800).fit('crop').url()}
                alt={product.name || 'Product image'}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            )}
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500">{product.category?.name || 'Uncategorized'}</p>
            </div>

            {/* Price Range */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">PRICE RANGE</p>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                {product.priceMin && product.priceMax
                  ? `$${product.priceMin} - $${product.priceMax}`
                  : 'Price not available'}
              </p>
              <p className="text-xs text-gray-500">All prices in US Dollars</p>
            </div>

            {/* About This Design */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">ABOUT THIS DESIGN</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">CONTACT US</h3>

              {/* Social Media Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handleSocialClick('Discord', defaultContact.discord)}
                  className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Discord</span>
                </button>

                <button
                  onClick={() => handleSocialClick('Instagram', defaultContact.instagram)}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>

                <button
                  onClick={() => handleSocialClick('TikTok', defaultContact.tiktok)}
                  className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>TikTok</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>

              {/* Email Address with Copy */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Email Address</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-gray-900 font-mono text-sm">fairydesigns@gmail.com</p>
                  <button
                    onClick={handleCopyEmail}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      emailCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                    title="Copy email"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
