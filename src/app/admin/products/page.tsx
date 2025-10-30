// import Link from 'next/link'
// import { Plus, Search, Edit, Trash2 } from 'lucide-react'
// import { client } from '@/sanity/lib/client'
// import Image from 'next/image'
// import { urlFor } from '@/sanity/lib/image'

// async function getProducts() {
//   return await client.fetch(`*[_type == "product"]{
//     _id, name, price, description, image,
//     "category": category->name,
//     "slug": slug.current
//   } | order(_createdAt desc)`)
// }

// export default async function ProductsPage() {
//   const products = await getProducts()

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//         <Link 
//           href="/admin/products/new"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Product
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
//         <div className="flex items-center">
//           <Search className="w-5 h-5 text-gray-400 mr-3" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="flex-1 outline-none"
//           />
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product: any) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     {product.image && (
//                       <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
//                         <Image
//                           src={urlFor(product.image).width(80).height(80).url()}
//                           alt={product.name}
//                           width={40}
//                           height={40}
//                           className="object-cover"
//                         />
//                       </div>
//                     )}
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="font-medium text-gray-900">${product.price}</span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     {product.category || 'Uncategorized'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button className="text-red-600 hover:text-red-800">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Plus, Search, Edit, Trash2 } from 'lucide-react'
// import Image from 'next/image'
// import { urlFor } from '@/sanity/lib/image'

// interface Product {
//   _id: string
//   name: string
//   priceMin: number
//   priceMax: number
//   description: string
//   image?: any
//   category?: string
//   slug: string
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('/api/products')
//       const data = await response.json()
//       if (data.success) {
//         setProducts(data.products)
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteProduct = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this product?')) return

//     try {
//       const response = await fetch(`/api/products?id=${id}`, {
//         method: 'DELETE'
//       })

//       if (response.ok) {
//         setProducts(products.filter(product => product._id !== id))
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error)
//       alert('Error deleting product')
//     }
//   }

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   )

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//         <Link 
//           href="/admin/products/new"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Product
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
//         <div className="flex items-center">
//           <Search className="w-5 h-5 text-gray-400 mr-3" />
//           <input
//             type="text"
//             placeholder="Search products by name or description..."
//             className="flex-1 outline-none bg-transparent"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-gray-500">
//               {products.length === 0 ? 'No products found. Add your first product!' : 'No products match your search.'}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Range</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4">
//                       <div className="flex items-center">
//                         {product.image && (
//                           <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
//                             <Image
//                               src={urlFor(product.image).width(80).height(80).url()}
//                               alt={product.name}
//                               width={40}
//                               height={40}
//                               className="object-cover w-full h-full"
//                             />
//                           </div>
//                         )}
//                         <div className="min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                           <p className="text-sm text-gray-500 truncate">
//                             {product.description || 'No description'}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className="font-medium text-gray-900">
//                         ${product.priceMin} - ${product.priceMax}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {product.category || 'Uncategorized'}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex space-x-2">
//                         <Link
//                           href={`/admin/products/edit/${product._id}`}
//                           className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Link>
//                         <button 
//                           onClick={() => deleteProduct(product._id)}
//                           className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Product {
  _id: string
  name: string
  priceMin: number
  priceMax: number
  description: string
  image?: any
  category?: string
  slug: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      } else {
        alert('Error fetching products: ' + data.error)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Error fetching products')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    setDeleteLoading(id)
    
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        setProducts(products.filter(product => product._id !== id))
        alert('Product deleted successfully!')
      } else {
        alert('Error deleting product: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product')
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link 
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            className="flex-1 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {products.length === 0 ? 'No products found. Add your first product!' : 'No products match your search.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {product.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={urlFor(product.image).width(80).height(80).url()}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {product.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900">
                        ${product.priceMin} - ${product.priceMax}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product._id, product.name)}
                          disabled={deleteLoading === product._id}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete product"
                        >
                          {deleteLoading === product._id ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}