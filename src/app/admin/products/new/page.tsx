// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { ArrowLeft, Upload } from 'lucide-react'
// import Link from 'next/link'

// interface Category {
//   _id: string
//   name: string
// }

// export default function NewProductPage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [categories, setCategories] = useState<Category[]>([])
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     priceMin: '',
//     priceMax: '',
//     description: '',
//     category: ''
//   })

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('/api/categories')
//       const data = await response.json()
//       if (data.success) {
//         setCategories(data.categories)
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           priceMin: parseFloat(formData.priceMin),
//           priceMax: parseFloat(formData.priceMax)
//         }),
//       })

//       const result = await response.json()

//       if (result.success) {
//         router.push('/admin/products')
//         router.refresh()
//       } else {
//         alert('Error creating product: ' + result.error)
//       }
//     } catch (error) {
//       console.error('Error creating product:', error)
//       alert('Error creating product')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <Link href="/admin/products" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
//           <ArrowLeft className="w-5 h-5" />
//         </Link>
//         <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Name *
//             </label>
//             <input
//               type="text"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter product name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Slug *
//             </label>
//             <input
//               type="text"
//               name="slug"
//               required
//               value={formData.slug}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="product-slug"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Minimum Price *
//             </label>
//             <input
//               type="number"
//               name="priceMin"
//               required
//               step="0.01"
//               min="0"
//               value={formData.priceMin}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="0.00"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Maximum Price *
//             </label>
//             <input
//               type="number"
//               name="priceMax"
//               required
//               step="0.01"
//               min="0"
//               value={formData.priceMax}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="0.00"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select category</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             rows={4}
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter product description"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Product Image
//           </label>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//             <p className="text-sm text-gray-600">Image upload will be implemented separately</p>
//             <p className="text-xs text-gray-500 mt-1">Currently handled through Sanity Studio</p>
//           </div>
//         </div>

//         <div className="flex space-x-3">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
//           >
//             {loading ? 'Creating...' : 'Create Product'}
//           </button>
//           <Link
//             href="/admin/products"
//             className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </Link>
//         </div>
//       </form>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { showSuccess, showError } from '@/lib/toast'
// import Image from 'next/image'

interface Category {
  _id: string
  name: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    priceMin: '',
    priceMax: '',
    description: '',
    category: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()

      // Handle both response formats: array or {success, categories}
      if (Array.isArray(data)) {
        setCategories(data)
      } else if (data.success && data.categories) {
        setCategories(data.categories)
      } else if (data.categories) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        showError('Please select an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size should be less than 5MB')
        return
      }

      setImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.slug || !formData.priceMin || !formData.priceMax) {
      showError('Please fill all required fields')
      return
    }

    if (!image) {
      showError('Please select a product image')
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('slug', formData.slug)
      formDataToSend.append('priceMin', formData.priceMin)
      formDataToSend.append('priceMax', formData.priceMax)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('category', formData.category)

      if (image) {
        formDataToSend.append('image', image)
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        showSuccess('Product created successfully!')
        router.push('/admin/products')
        router.refresh()
      } else {
        showError('Error creating product: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      showError('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // File size format function
  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="product-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price *
            </label>
            <input
              type="number"
              name="priceMin"
              required
              step="0.01"
              min="0"
              value={formData.priceMin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price *
            </label>
            <input
              type="number"
              name="priceMax"
              required
              step="0.01"
              min="0"
              value={formData.priceMax}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
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
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image *
          </label>
          
          {imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="relative inline-block">
                {/* Display the image preview */}
                <img
                  src={imagePreview}
                  alt="Product preview"
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
              <p className="text-sm text-gray-500 mt-2">
                {image?.name} {image && `(${formatFileSize(image.size)})`}
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="hidden"
              />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload product image
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </>
            ) : (
              'Create Product'
            )}
          </button>
          <Link
            href="/admin/products"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}