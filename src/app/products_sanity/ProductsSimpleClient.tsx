"use client";

import { useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/types";

interface ProductsSimpleClientProps {
  initialProducts: Product[];
  categorySlug?: string;
  categoryName?: string;
}

export default function ProductsSimpleClient({
  initialProducts,
  categorySlug,
  categoryName,
}: ProductsSimpleClientProps) {
  // Filter products by category if categorySlug is provided
  const filteredProducts = useMemo(() => {
    if (!categorySlug) {
      return initialProducts; // Show all products
    }
    return initialProducts.filter(
      (product) => product.category?.slug === categorySlug
    );
  }, [initialProducts, categorySlug]);

  return (
    <div className="w-full">
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            {categoryName
              ? `No products available in ${categoryName} category yet.`
              : "No products available yet."}
          </p>
        </div>
      )}
    </div>
  );
}
