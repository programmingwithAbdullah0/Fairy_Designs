// // app/page.tsx
// import { redirect } from 'next/navigation'

// export default function Home() {
//   redirect('/products_sanity')
// }

// app/page.tsx
export const revalidate = 0
export const dynamic = "force-dynamic"

// import { client } from "@/sanity/lib/client"
import ProductsPage from "./products_sanity/page"
import HeroSection from "@/components/hero_section"
// const QUERY = `*[_type=="product"]{
//   _id,
//   name, 
//   "slug": slug.current, 
//   image, 
//   priceMin,    // NEW
//   priceMax,    // NEW   
//   description,
//   category->{name}
// } | order(_createdAt desc)`

export default async function Home() {
  // const products = await client.fetch(QUERY)

  return (
    <div>
      <HeroSection/>
      <ProductsPage/>
    </div>
  )
}