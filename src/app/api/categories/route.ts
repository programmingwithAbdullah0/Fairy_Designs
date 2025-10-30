import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const categories = await client.fetch(`*[_type == "category"]{
      _id, name, description,
      "slug": slug.current
    } | order(name asc)`)

    return NextResponse.json({ success: true, categories })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, slug, description } = await request.json()

    const category = await client.create({
      _type: 'category',
      name,
      slug: {
        _type: 'slug',
        current: slug
      },
      description
    })

    return NextResponse.json({ success: true, category })
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
        { success: false, error: 'Category ID is required' },
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