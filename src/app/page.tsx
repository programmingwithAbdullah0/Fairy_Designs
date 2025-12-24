
export const revalidate = 0
export const dynamic = "force-dynamic"

import ProductsPage from "./products_sanity/page"
import HeroSection from "@/components/hero_section"

export default async function Home() {
  return (
    <div>
      <HeroSection/>
      <ProductsPage/>
    </div>
  )
}