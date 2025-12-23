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

import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { writeClient } from '@/sanity/lib/client'
import DeleteCategoryButton from './DeleteCategoryButton'

// Force dynamic rendering to avoid CDN cache issues in admin panel
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getCategories() {
  // Use writeClient (useCdn: false) to get fresh data without CDN caching
  return await writeClient.fetch(`*[_type == "category"]{
    _id, name, description,
    "slug": slug.current
  } | order(name asc)`)
}

export default async function CategoriesPage() {
  const categories = await getCategories()

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
        {categories.map((category: any) => (
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
                <DeleteCategoryButton id={category._id} />
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
