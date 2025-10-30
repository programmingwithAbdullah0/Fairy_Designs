import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const products = await client.fetch(`*[_type == "product"]{
      _id,
      name,
      priceMin,
      priceMax, 
      description,
      image,
      "category": category->name,
      "categoryId": category->_id,
      "slug": slug.current
    } | order(_createdAt desc)`)

    return NextResponse.json({ success: true, products })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, priceMin, priceMax, description, category } = await request.json()

    const product = await client.create({
      _type: 'product',
      name,
      slug: {
        _type: 'slug',
        current: slug
      },
      priceMin: parseFloat(priceMin),
      priceMax: parseFloat(priceMax),
      description,
      category: category ? {
        _type: 'reference',
        _ref: category
      } : undefined
    })

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await client.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}