// import ProductCard from "@/components/ProductCard/ProductCard";
// import { client } from "@/sanity/lib/client";


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

// const QUERY = `*[_type=="product"]{
//   _id, 
//   name,
//   "slug": slug.current, 
//   image, 
//   priceMin,
//   priceMax, 
//   description,
//   category->{name, "slug": slug.current}
// } | order(_createdAt desc)`

// export default async function ProductsPage() {
//   const products: Product[] = await client.fetch(QUERY)

//   return (
//     <main className="p-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product: Product) => (
//           <ProductCard key={product._id} product={product as any} />
//         ))}
//       </div>
//     </main>
//   )
// }

import { client } from "@/sanity/lib/client";
import { Product, Category } from "@/types";
import ProductsSimpleClient from "./ProductsSimpleClient";

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)]{
  _id,
  name,
  "slug": slug.current,
  image,
  priceMin,
  priceMax,
  description,
  category->{_id, name, "slug": slug.current}
} | order(_createdAt desc)`;

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams?: Promise<{ category?: string; search?: string }> | { category?: string; search?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  // Handle both Promise and direct object for searchParams
  const params = searchParams instanceof Promise ? await searchParams : searchParams || {};
  const categorySlug = params.category;
  const searchQuery = params.search;

  const products = await client.fetch<Product[]>(PRODUCTS_QUERY);

  // Find category name if filtering by category
  let categoryName = "All Products";
  let filteredProducts = products;

  if (categorySlug) {
    const category = await client.fetch<Category | null>(
      `*[_type == "category" && slug.current == $slug][0]{name}`,
      { slug: categorySlug }
    );
    if (category) {
      categoryName = category.name;
      filteredProducts = products.filter(
        (p) => p.category?.slug === categorySlug
      );
    }
  }

  // Handle search from navbar
  if (searchQuery) {
    const search = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search) ||
        product.category?.name.toLowerCase().includes(search)
    );
  }

  return (
    <main id="services" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 capitalize">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-lg">
            {categorySlug
              ? `Showing ${filteredProducts.length} ${
                  filteredProducts.length === 1 ? "product" : "products"
                } in ${categoryName}`
              : searchQuery
              ? `Showing ${filteredProducts.length} ${
                  filteredProducts.length === 1 ? "result" : "results"
                } for "${searchQuery}"`
              : "Explore our collection of premium designs and services"}
          </p>
        </div>

        <ProductsSimpleClient
          initialProducts={filteredProducts}
          categorySlug={categorySlug}
          categoryName={categoryName}
        />
      </div>
    </main>
  );
}
