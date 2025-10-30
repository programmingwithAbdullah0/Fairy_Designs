// import Link from 'next/link'
// import { Plus, Edit, Trash2 } from 'lucide-react'
// import { client } from '@/sanity/lib/client'

// async function getCategories() {
//   return await client.fetch(`*[_type == "category"]{
//     _id, name, description,
//     "slug": slug.current
//   } | order(name asc)`)
// }

// export default async function CategoriesPage() {
//   const categories = await getCategories()

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
//         <Link 
//           href="/admin/categories/new"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Category
//         </Link>
//       </div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category: any) => (
//           <div key={category._id} className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
//               <div className="flex space-x-2">
//                 <button className="text-blue-600 hover:text-blue-800">
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button className="text-red-600 hover:text-red-800">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//             <p className="text-gray-600 text-sm mb-4">
//               {category.description || 'No description'}
//             </p>
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>Slug: {category.slug}</span>
//               <span>12 products</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Category {
  _id: string
  name: string
  description: string
  slug: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCategories(categories.filter(category => category._id !== id))
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error deleting category')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Link 
          href="/admin/categories/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/categories/edit/${category._id}`}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => deleteCategory(category._id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {category.description || 'No description'}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Slug: {category.slug}</span>
            </div>
          </div>
        ))}
        
        {categories.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No categories found. Add your first category!</p>
          </div>
        )}
      </div>
    </div>
  )
}