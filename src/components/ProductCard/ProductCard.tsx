"use client"

import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { urlFor } from "@/sanity/lib/image"

// ✅ UPDATED INTERFACE - 'any' removed
interface Product {
  name: string
  _id: string
  slug: string
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  priceMin: number
  priceMax: number
  description: string
  category?: {
    name: string
  }
}

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
    // ✅ FIXED: 'any' removed
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
      onClick={handleCardClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        {product.image && (
          <Image
            src={urlFor(product.image).width(800).height(600).fit("crop").url()}
            alt={product.name || "Product image"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
            {getCategoryName()}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          { product.name || "Untitled Product"}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* PRICE SECTION - UPDATED */}
        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-2">Starting from</p>
          <p className="text-xl font-bold text-gray-900">
            {product.priceMin && product.priceMax ? 
              `$${product.priceMin} - $${product.priceMax}` : 
              "Price not available"
            }
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-medium mb-3">Contact us on:</p>
          <div className="flex gap-2">
            {/* Discord */}
            <button
              onClick={(e) => handleContactClick(e, "discord")}
              className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              title="Discord"
              aria-label="Contact on Discord"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.03-.066V8.07a.075.075 0 00-.036-.066s-5.38-4.167-5.659-4.342a.075.075 0 00-.03-.066c-.124-.098-.248-.196-.372-.294a.077.077 0 00.008-.128c.588-.35 1.255-.636 1.872-.892a.076.076 0 00.042-.106c-.353-.699-.765-1.364-1.226-1.994a.08.08 0 00-.087-.027 19.9 19.9 0 00-5.993 3.03.082.082 0 00-.031.057c.423 4.477-.429 8.846-1.818 13.114a.07.07 0 00.032.027z" />
              </svg>
            </button>

            {/* Instagram */}
            <button
              onClick={(e) => handleContactClick(e, "instagram")}
              className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              title="Instagram"
              aria-label="Contact on Instagram"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
              </svg>
            </button>

            {/* TikTok */}
            <button
              onClick={(e) => handleContactClick(e, "tiktok")}
              className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              title="TikTok"
              aria-label="Contact on TikTok"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 11-4.8-2.4A2.4 2.4 0 009.10 13.46V9.37a8.08 8.08 0 00-7.02 4.11v3.81a4.84 4.84 0 007.68 4.42v-3.68a4.83 4.83 0 003.77 4.25h3.68V6.69z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// "use client"

// import type React from "react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { urlFor } from "@/sanity/lib/image"

// // ✅ Same interface yahan bhi use karo
// interface Product {
//   _id: string;
//   name: string;
//   slug: string;
//   image: any; 
//   priceMin?: number; 
//   priceMax?: number;
//   description?: string;
//   category: {
//     name: string;
//     slug: string;
//   };
// }

// interface ProductCardProps {
//   product: Product; // ✅ Same type use karo
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const router = useRouter()

//   const handleCardClick = () => {
//     if (product.slug) {
//       router.push(`/products_sanity/${product.slug}`)
//     }
//   }

//   const handleContactClick = (e: React.MouseEvent, platform: string) => {
//     e.stopPropagation()
//     const urls = {
//       discord: "https://discord.com",
//       instagram: "https://instagram.com", 
//       tiktok: "https://tiktok.com"
//     }
//     window.open(urls[platform as keyof typeof urls], "_blank")
//   }

//   // ✅ Price display fix karo
//   const getPriceDisplay = () => {
//     if (product.priceMin && product.priceMax) {
//       return `$${product.priceMin} - $${product.priceMax}`
//     }
//     if (product.priceMin) {
//       return `From $${product.priceMin}`
//     }
//     return "Contact for price"
//   }

//   // Safe category name
//   const getCategoryName = () => {
//     if (product.category?.name) return product.category.name
//     if (product.name) return product.name.split(" ")[0]
//     return "Design"
//   }

//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col"
//     >
//       {/* Image Container */}
//       <div className="relative h-56 w-full overflow-hidden bg-gray-100">
//         {product.image && (
//           <Image
//             src={urlFor(product.image).width(800).height(600).fit("crop").url()}
//             alt={product.name || "Product image"}
//             fill
//             className="object-cover hover:scale-105 transition-transform duration-300"
//           />
//         )}
//         <div className="absolute top-3 left-3">
//           <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
//             {getCategoryName()}
//           </span>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="p-5 flex flex-col flex-grow">
//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//           {product.name || "Untitled Product"}
//         </h3>

//         {/* Description */}
//         <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//           {product.description || "No description available"}
//         </p>

//         <div className="mb-5">
//           <p className="text-sm text-gray-500 mb-1">Starting from</p>
//           <p className="text-xl font-bold text-gray-900">{getPriceDisplay()}</p>
//         </div>

//         {/* Contact Buttons */}
//         <div className="mt-auto pt-4 border-t border-gray-200">
//           <p className="text-xs text-gray-500 font-medium mb-3">Contact us on:</p>
//           <div className="flex gap-2">
//             {/* Discord */}
//             <button
//               onClick={(e) => handleContactClick(e, "discord")}
//               className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
//             >
//               {/* Discord SVG */}
//             </button>

//             {/* Instagram */}
//             <button
//               onClick={(e) => handleContactClick(e, "instagram")}
//               className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
//             >
//               {/* Instagram SVG */}
//             </button>

//             {/* TikTok */}
//             <button
//               onClick={(e) => handleContactClick(e, "tiktok")}
//               className="flex-1 flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
//             >
//               {/* TikTok SVG */}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }