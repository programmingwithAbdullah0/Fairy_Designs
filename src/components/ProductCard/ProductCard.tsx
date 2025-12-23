"use client"

import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { urlFor } from "@/sanity/lib/image"
import { MessageCircle, Instagram, Send } from 'lucide-react'
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/products_sanity/${product.slug}`)
  }

  const handleContactClick = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation()
    const urls = {
      discord: "https://discord.com",
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com"
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  // Safe category name
  const getCategoryName = () => {
    if (product.category?.name) return product.category.name
    if (product.name) return product.name.split(" ")[0]
    return "Design"
  }

  return (
    <div
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-100"
      onClick={handleCardClick}
    >
      {/* Product Image with Category Badge */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {product.image && (
          <Image
            src={urlFor(product.image).width(800).height(800).quality(90).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          />
        )}
        {/* Category Badge with Gradient */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {getCategoryName()}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name || "Untitled Product"}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description || "No description available"}
        </p>

        {/* Price Section with Border Accent */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Starting from</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {product.priceMin && product.priceMax
              ? `$${product.priceMin} - $${product.priceMax}`
              : "Contact for price"}
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Contact us on</p>
          <div className="grid grid-cols-3 gap-2">
            {/* Discord Button */}
            <button
              onClick={(e) => handleContactClick(e, 'discord')}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-indigo-50 transition-all duration-300 group/btn"
              title="Contact on Discord"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-100 group-hover/btn:bg-indigo-600 group-hover/btn:scale-110 transition-all duration-300 shadow-md">
                <MessageCircle className="w-5 h-5 text-indigo-600 group-hover/btn:text-white transition-colors" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover/btn:text-indigo-600">Discord</span>
            </button>

            {/* Instagram Button */}
            <button
              onClick={(e) => handleContactClick(e, 'instagram')}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-pink-50 transition-all duration-300 group/btn"
              title="Contact on Instagram"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-100 group-hover/btn:bg-gradient-to-br group-hover/btn:from-purple-600 group-hover/btn:via-pink-600 group-hover/btn:to-orange-500 group-hover/btn:scale-110 transition-all duration-300 shadow-md">
                <Instagram className="w-5 h-5 text-pink-600 group-hover/btn:text-white transition-colors" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover/btn:text-pink-600">Instagram</span>
            </button>

            {/* TikTok Button */}
            <button
              onClick={(e) => handleContactClick(e, 'tiktok')}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 group/btn"
              title="Contact on TikTok"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 group-hover/btn:bg-black group-hover/btn:scale-110 transition-all duration-300 shadow-md">
                <Send className="w-5 h-5 text-gray-700 group-hover/btn:text-white transition-colors" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover/btn:text-gray-900">TikTok</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
