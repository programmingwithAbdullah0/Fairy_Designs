"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { showSuccess, showError } from "@/lib/toast";

interface Category {
  _id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    priceMin: "",
    priceMax: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!id) return;
    fetchProduct();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products?id=${id}`);
      const data = await res.json();
      if (data.success && data.product) {
        const p = data.product;
        setFormData({
          name: p.name || "",
          slug: p.slug?.current || p.slug || "",
          priceMin: p.priceMin?.toString() || "",
          priceMax: p.priceMax?.toString() || "",
          description: p.description || "",
          category: p.category?._id || "",
        });
        // Store current image for preview
        if (p.image) {
          setCurrentImage(p.image);
        }
      } else {
        showError("Product not found");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      showError("Error fetching product");
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      // Handle both response formats: array or {success, categories}
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data.success && data.categories) {
        setCategories(data.categories);
      } else if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showError("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.slug ||
      !formData.priceMin ||
      !formData.priceMax
    ) {
      showError("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        slug: formData.slug,
        priceMin: parseFloat(formData.priceMin),
        priceMax: parseFloat(formData.priceMax),
        description: formData.description,
      };

      if (formData.category) {
        payload.category = { _type: "reference", _ref: formData.category };
      } else {
        payload.category = null;
      }

      // Create FormData instead of JSON since the API expects form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', payload.name);
      formDataToSend.append('slug', payload.slug);
      formDataToSend.append('priceMin', payload.priceMin.toString());
      formDataToSend.append('priceMax', payload.priceMax.toString());
      formDataToSend.append('description', payload.description);

      if (payload.category) {
        // payload.category could be an ID string or an object with _ref, handle both
        const categoryId = typeof payload.category === 'object' ? payload.category._ref : payload.category;
        formDataToSend.append('category', categoryId);
      } else {
        formDataToSend.append('category', ''); // Send empty string to clear category
      }

      // Add image if user selected a new one
      if (image) {
        formDataToSend.append('image', image);
      }
      
      const res = await fetch(`/api/products?id=${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        showSuccess("Product updated successfully");
        router.push("/admin/products");
      } else {
        showError("Error updating product: " + (data.error || "Unknown"));
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showError("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/admin/products"
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price *
            </label>
            <input
              name="priceMin"
              value={formData.priceMin}
              onChange={handleChange}
              required
              type="number"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price *
            </label>
            <input
              name="priceMax"
              value={formData.priceMax}
              onChange={handleChange}
              required
              type="number"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>

          {imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="New product preview"
                  className="w-64 h-64 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">New image selected</p>
              <button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Change Image
              </button>
            </div>
          ) : currentImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={urlFor(currentImage).width(256).height(256).url()}
                  alt="Current product"
                  className="w-64 h-64 object-cover rounded-lg mx-auto"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Current image</p>
              <button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">Click to upload product image</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/products"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
