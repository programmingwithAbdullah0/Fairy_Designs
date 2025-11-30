// import { client } from "@/sanity/lib/client"
// import ProductDetailClient from "./ProductDetailClient"
// import { notFound } from "next/navigation";

// const PRODUCT_QUERY = `*[_type=="product" && slug.current==$slug][0]{
//   _id, 
//   name, 
//   "slug": slug.current, 
//   image, 
//   priceMin,    
//   priceMax,     
//   description,
//   category->{name, "slug": slug.current}
// }`

// export default async function ProductDetail({ params }: { params: { slug: string } }) {
//   // Check if slug is null or empty
//   if (!params.slug) {
//     notFound(); // This will trigger the 404 page
//   }

//   const product = await client.fetch(PRODUCT_QUERY, { slug: params.slug })

//   if (!product) {
//     notFound(); // This will trigger the 404 page
//   }

//   return <ProductDetailClient product={product} />
// }

// export const revalidate = 0
// export const dynamic = "force-dynamic"

// src/app/products_sanity/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image,
  priceMin,
  priceMax,
  description,
  category->{name, "slug": slug.current}
}`;

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  if (!params?.slug) {
    notFound();
  }

  const product = await client.fetch(PRODUCT_QUERY, {
    slug: params.slug,
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
