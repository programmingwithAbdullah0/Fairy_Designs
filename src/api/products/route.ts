
// src/api/products/route.ts
// Ek file mein sab kuch: GET + POST + PUT + DELETE → FULLY WORKING

import { NextResponse } from "next/server"
import { client, writeClient } from "@/sanity/lib/client"

// 405 error ka permanent ilaaj – ye 2 lines end mein zaroor rakhna
export const dynamic = 'force-dynamic'
export const revalidate = 0

// 1. GET → List all products
export async function GET() {
  try {
    const products = await client.fetch(`
      *[_type == "product"] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        priceMin,
        priceMax,
        description,
        "imageUrl": image.asset->url,
        "category": category-> { _id, name, "slug": slug.current }
      }
    `)
    return NextResponse.json(products)
  } catch (error) {
    console.error("GET products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// 2. POST → Add new product (with image upload)
export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const priceMin = Number(formData.get("priceMin"))
    const priceMax = Number(formData.get("priceMax"))
    const description = (formData.get("description") as string) || ""
    const categoryId = formData.get("category") as string
    const image = formData.get("image") as File | null

    if (!name || !slug || isNaN(priceMin) || isNaN(priceMax)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let imageAsset
    if (image && image.size > 0) {
      const uploaded = await writeClient.assets.upload("image", image, {
        filename: image.name.split(".")[0]
      })
      imageAsset = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } }
    }

    const product = await writeClient.create({
      _type: "product",
      name,
      slug: { _type: "slug", current: slug },
      priceMin,
      priceMax,
      description,
      image: imageAsset,
      ...(categoryId && { category: { _type: "reference", _ref: categoryId } })
    })

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    console.error("POST product error:", error)
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 })
  }
}

// 3. PUT → Edit product
export async function PUT(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Try to get ID from URL pathname first, then from query parameters
  const url = new URL(req.url);
  const pathname = url.pathname;
  let id = pathname.split('/').pop() || undefined; // Get the last part of the URL path

  // If the last part is not a valid ID format (likely 'route.ts' or similar), check query params
  if (!id || id.length < 10 || id.includes('.')) {
    id = url.searchParams.get("id") || undefined;
  }

  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 })

  try {
    const formData = await req.formData()

    const nameRaw = formData.get("name") as string | null
    const slugRaw = formData.get("slug") as string | null
    const priceMinRaw = formData.get("priceMin") as string | null
    const priceMaxRaw = formData.get("priceMax") as string | null
    const description = (formData.get("description") as string | null) || ""
    const categoryId = formData.get("category") as string | null
    const image = formData.get("image") as File | null
    
    // Validate required fields
    if (!nameRaw || !slugRaw || !priceMinRaw || !priceMaxRaw) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    const name = nameRaw
    const slug = slugRaw
    const priceMin = Number(priceMinRaw)
    const priceMax = Number(priceMaxRaw)

    const updateFields: any = {
      name,
      slug: { _type: "slug", current: slug },
      priceMin,
      priceMax,
      description,
    }

    if (categoryId) {
      updateFields.category = { _type: "reference", _ref: categoryId }
    } else {
      updateFields.category = null
    }

    if (image && image.size > 0) {
      const uploaded = await writeClient.assets.upload("image", image, {
        filename: image.name.split(".")[0]
      })
      updateFields.image = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } }
    }

    const updated = await writeClient.patch(id).set(updateFields).commit()
    return NextResponse.json({ success: true, product: updated })
  } catch (error: any) {
    console.error("PUT product error:", error)
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 })
  }
}

// 4. DELETE → Delete product
export async function DELETE(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") || undefined
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 })

  try {
    await writeClient.delete(id)
    return NextResponse.json({ success: true, message: "Product deleted" })
  } catch (error: any) {
    console.error("DELETE product error:", error)
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 })
  }
}