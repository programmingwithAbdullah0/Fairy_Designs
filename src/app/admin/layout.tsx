// import Link from 'next/link'
// import { Package, Tags, Settings, Home } from 'lucide-react'

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-slate-800 text-white">
//         <div className="p-6">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="mt-6">
//           <Link href="/admin" className="flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700">
//             <Home className="w-5 h-5 mr-3" />
//             Dashboard
//           </Link>
//           <Link href="/admin/products" className="flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700">
//             <Package className="w-5 h-5 mr-3" />
//             Products
//           </Link>
//           <Link href="/admin/categories" className="flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700">
//             <Tags className="w-5 h-5 mr-3" />
//             Categories
//           </Link>
//           <Link href="/admin/settings" className="flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700">
//             <Settings className="w-5 h-5 mr-3" />
//             Settings
//           </Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <header className="bg-white shadow-sm border-b">
//           <div className="px-6 py-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-600">Admin User</span>
//               </div>
//             </div>
//           </div>
//         </header>
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Tags, Settings, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/categories', icon: Tags, label: 'Categories' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 lg:justify-start">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive 
                    ? 'bg-slate-700 text-white border-r-4 border-blue-500' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mr-4 text-gray-600 p-1 rounded hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}