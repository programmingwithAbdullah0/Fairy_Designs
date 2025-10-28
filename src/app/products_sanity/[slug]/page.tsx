import { client } from "@/sanity/lib/client"
import ProductDetailClient from "./ProductDetailClient"

const PRODUCT_QUERY = `*[_type=="product" && slug.current==$slug][0]{
  _id, 
  name, 
  "slug": slug.current, 
  image, 
  priceMin,    
  priceMax,     
  description,
  category->{name, "slug": slug.current}
}`

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await client.fetch(PRODUCT_QUERY, { slug: params.slug })

  if (!product) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <a href="/products_sanity" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Products
          </a>
        </div>
      </div>
    )
  }

  return <ProductDetailClient product={product} />
}

export const revalidate = 0
export const dynamic = "force-dynamic"