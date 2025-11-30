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

// src/app/products_sanity/page.tsx
import ProductCard from "@/components/ProductCard/ProductCard";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: any;
  priceMin?: number;
  priceMax?: number;
  description?: string;
  category?: {
    name: string;
    slug: string;
  };
}

const QUERY = `*[_type == "product" && defined(slug.current)]{
  _id,
  name,
  "slug": slug.current,
  image,
  priceMin,
  priceMax,
  description,
  category->{name, "slug": slug.current}
} | order(_createdAt desc)`;

export default async function ProductsPage() {
  const products: Product[] = await client.fetch(QUERY);

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product as any} />
        ))}
      </div>
    </main>
  );
}
