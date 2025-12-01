// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// interface Product {
//   _id: string;
//   name: string;
//   priceMin: number;
//   priceMax: number;
//   description: string;
//   image?: any;
//   category?: { _id: string; name: string };
//   // slug ko string hi rakho
//   slug: string;
// }

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

//   // Categories
//   useEffect(() => {
//     const fetchCategoriesData = async () => {
//       try {
//         await fetchCategories();
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchCategoriesData();
//   }, []);

//   // Products (category change par refetch)
//   useEffect(() => {
//     const fetchProductsData = async () => {
//       setLoading(true);
//       try {
//         await fetchProducts();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductsData();
//   }, [selectedCategory]);

//   const fetchProducts = async () => {
//     try {
//       let url = "/api/products";
//       const params = new URLSearchParams();

//       if (selectedCategory !== "all") {
//         params.append("category", selectedCategory);
//       }

//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }

//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         alert("Error fetching products: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Error fetching products");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/categories");
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.categories);
//       } else {
//         console.error("Error fetching categories:", data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const deleteProduct = async (id: string, name: string) => {
//     if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

//     setDeleteLoading(id);

//     try {
//       const response = await fetch(`/api/products?id=${id}`, {
//         method: "DELETE",
//       });

//       const result = await response.json();

//       if (result.success) {
//         setProducts(products.filter((product) => product._id !== id));
//         alert("Product deleted successfully!");
//       } else {
//         alert("Error deleting product: " + result.error);
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Error deleting product");
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   // Filter products
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (product.description &&
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()));

//     const matchesCategory =
//       selectedCategory === "all" ||
//       (product.category && product.category._id === selectedCategory) ||
//       (selectedCategory === "uncategorized" && !product.category);

//     return matchesSearch && matchesCategory;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
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

//       {/* Filters Section */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center gap-4">
//           {/* Search Filter */}
//           <div className="flex-1 flex items-center">
//             <Search className="w-5 h-5 text-gray-400 mr-3" />
//             <input
//               type="text"
//               placeholder="Search products by name or description..."
//               className="flex-1 outline-none bg-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="flex items-center md:justify-end">
//             <div className="flex items-center mr-2 text-gray-400">
//               <Filter className="w-4 h-4" />
//             </div>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="outline-none bg-transparent border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="all">All Categories</option>
//               <option value="uncategorized">Uncategorized</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-gray-500">
//               {products.length === 0
//                 ? "No products found. Add your first product!"
//                 : "No products match your search and filter criteria."}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Product
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Price Range
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Category
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4">
//                       <div className="flex items-center">
//                         {product.image ? (
//                           <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
//                             <Image
//                               src={urlFor(product.image)
//                                 .width(80)
//                                 .height(80)
//                                 .url()}
//                               alt={product.name}
//                               width={48}
//                               height={48}
//                               className="object-cover w-full h-full"
//                             />
//                           </div>
//                         ) : (
//                           <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
//                             <span className="text-xs text-gray-500">
//                               No Image
//                             </span>
//                           </div>
//                         )}
//                         <div className="min-w-0">
//                           <p className="font-medium text-gray-900 truncate">
//                             {product.name}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {/* yahan se .current hata diya */}
//                             {product.slug || "No slug"}
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
//                         {product.category?.name || "Uncategorized"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <div className="flex space-x-2">
//                         <Link
//                           href={`/admin/products/edit/${product._id}`}
//                           className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
//                           title="Edit product"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Link>
//                         <button
//                           onClick={() =>
//                             deleteProduct(product._id, product.name)
//                           }
//                           disabled={deleteLoading === product._id}
//                           className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
//                           title="Delete product"
//                         >
//                           {deleteLoading === product._id ? (
//                             <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//                           ) : (
//                             <Trash2 className="w-4 h-4" />
//                           )}
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
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  description: string;
  image?: any;
  category?: { _id: string; name: string };
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  // Removed unused loadingCategories
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category filter changes
  const fetchProducts = async () => {
    try {
      let url = "/api/products";
      const params = new URLSearchParams();

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products) {
        setProducts(data.products);
      } else {
        console.error("Unexpected response format:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    }
  };

  // Now fetchProducts is included in dependency array → warning gone!
  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeleteLoading(id);

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setProducts(prev => prev.filter(p => p._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Error: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesCategory =
      selectedCategory === "all" ||
      (product.category?._id === selectedCategory) ||
      (selectedCategory === "uncategorized" && !product.category);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center border rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search by name or description..."
              className="flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-3 py-2 outline-none"
            >
              <option value="all">All Categories</option>
              <option value="uncategorized">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {products.length === 0
              ? "No products yet. Click 'Add Product' to get started!"
              : "No products match your filters."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <Image
                              src={urlFor(product.image).width(80).height(80).url()}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.slug || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.priceMin} - ${product.priceMax}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id, product.name)}
                          disabled={deleteLoading === product._id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          {deleteLoading === product._id ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
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
  );
}
