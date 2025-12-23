'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { showSuccess, showError } from '@/lib/toast';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: ''
  });

  // Ab sirf EK category fetch kar rahe hain using ?id= query
  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories?id=${params.id}`);
      const data = await response.json();

      if (data.success && data.category) {
        setFormData({
          name: data.category.name,
          slug: data.category.slug || data.category.slug?.current || '',
          description: data.category.description || ''
        });
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      showError('Failed to load category');
      setNotFound(true);
    } finally {
      setLoadingCategory(false);
    }
  };

  // Ab dependency sahi hai → warning gayab!
  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]); // params.id change hone par bhi refetch hoga (future-proof)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      showError('Name and Slug are required!');
      return;
    }

    setLoading(true);

    try {
      // Use FormData to match API route expectations
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('slug', formData.slug);
      fd.append('description', formData.description);

      const response = await fetch(`/api/categories?id=${params.id}`, {
        method: 'PUT',
        body: fd,
      });

      const result = await response.json();

      if (result.success) {
        showSuccess('Category updated successfully!');
        router.push('/admin/categories');
        router.refresh();
      } else {
        showError('Error: ' + (result.error || 'Failed to update'));
      }
    } catch (error) {
      console.error('Update failed:', error);
      showError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loadingCategory) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Category not found</p>
        <Link href="/admin/categories" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/categories" className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., T-Shirts"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., t-shirts"
            />
            <p className="text-xs text-gray-500 mt-1">Use lowercase and hyphens only</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              maxLength={300}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              placeholder="Describe this category..."
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.description.length}/300
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
            <Link
              href="/admin/categories"
              className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}