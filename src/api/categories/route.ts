import { NextResponse } from "next/server";
import { client, writeClient } from "@/sanity/lib/client";

// Important: These lines help prevent 405 errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

// 1. GET → List all categories
export async function GET() {
  try {
    const categories = await client.fetch(`
      *[_type == "category"] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        description,
        image
      }
    `);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// 2. POST → Add new category
export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = (formData.get("description") as string) || "";
    const image = formData.get("image") as File | null;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    let imageAsset;
    if (image && image.size > 0) {
      const imageBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      const uploaded = await writeClient.assets.upload("image", buffer, {
        filename: image.name.split(".")[0]
      });
      imageAsset = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } };
    }

    const category = await writeClient.create({
      _type: "category",
      name,
      slug: { _type: "slug", current: slug },
      description,
      image: imageAsset,
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    console.error("POST category error:", error);
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}

// 3. PUT → Edit category
export async function PUT(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || undefined;
  
  if (!id) {
    return NextResponse.json({ error: "Category ID required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = (formData.get("description") as string) || "";
    const image = formData.get("image") as File | null;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const updateFields: any = {
      name,
      slug: { _type: "slug", current: slug },
      description,
    };

    if (image && image.size > 0) {
      const imageBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      const uploaded = await writeClient.assets.upload("image", buffer, {
        filename: image.name.split(".")[0]
      });
      updateFields.image = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } };
    }

    const updated = await writeClient.patch(id).set(updateFields).commit();
    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    console.error("PUT category error:", error);
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
  }
}

// 4. DELETE → Delete category
export async function DELETE(req: Request) {
  if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || undefined;
  
  if (!id) {
    return NextResponse.json({ error: "Category ID required" }, { status: 400 });
  }

  try {
    await writeClient.delete(id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    console.error("DELETE category error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}