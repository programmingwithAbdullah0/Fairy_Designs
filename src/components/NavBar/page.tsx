// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // Icon library (built-in with shadcn/lucide)

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Brand / Logo */}
//         <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition">
//           Fairy<span className="text-pink-600"> Designs</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 font-medium text-gray-700">
//           <Link href="/" className="hover:text-pink-600 transition">Home</Link>
//           <Link href="/about" className="hover:text-pink-600 transition">About</Link>
//           <Link href="/services" className="hover:text-pink-600 transition">Services</Link>
//           <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
//         </div>

//         {/* CTA Button */}
//         <div className="hidden md:block">
//           <a
//             href="https://wa.me/yourwhatsapplink"
//             target="_blank"
//             className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition"
//           >
//             WhatsApp
//           </a>
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-gray-700 focus:outline-none"
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <div className="flex flex-col items-center space-y-4 py-4">
//             <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Home</Link>
//             <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-pink-600">About</Link>
//             <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Services</Link>
//             <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Contact</Link>
//             <a
//               href="https://wa.me/yourwhatsapplink"
//               target="_blank"
//               className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
//             >
//               WhatsApp
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



// "use client"

// import type React from "react"

// import Link from "next/link"
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isProductsOpen, setIsProductsOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const router = useRouter()

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       router.push(`/?search=${encodeURIComponent(searchQuery)}`)
//       setSearchQuery("")
//       setIsOpen(false)
//     }
//   }

//   return (
//     <nav className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Brand / Logo */}
//         <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition">
//           Fairy<span className="text-pink-600"> Designs</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
//           <Link href="/" className="hover:text-pink-600 transition">
//             Home
//           </Link>

//           <div className="relative group">
//             <button className="hover:text-pink-600 transition flex items-center gap-1">
//               Products
//               <svg
//                 className="w-4 h-4 transition group-hover:rotate-180"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//               </svg>
//             </button>
//             <div className="absolute left-0 mt-0 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//               <Link
//                 href="/?category=logo"
//                 className="block px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition rounded-t-lg"
//               >
//                 Logo Designs
//               </Link>
//               <Link
//                 href="/?category=banner"
//                 className="block px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition rounded-b-lg"
//               >
//                 Banner Designs
//               </Link>
//             </div>
//           </div>

//           <Link href="/about" className="hover:text-pink-600 transition">
//             About
//           </Link>
//           <Link href="/contact" className="hover:text-pink-600 transition">
//             Contact
//           </Link>
//         </div>

//         {/* Desktop Search Bar */}
//         <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
//           <input
//             type="text"
//             placeholder="Search designs..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-40"
//           />
//           <button type="submit" className="text-gray-600 hover:text-pink-600 transition">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>
//         </form>

//         {/* Mobile Menu Icon with Animation */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 focus:outline-none">
//           <span
//             className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
//           ></span>
//           <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
//           <span
//             className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
//           ></span>
//         </button>
//       </div>

//       {/* Mobile Slide-in Menu */}
//       <div
//         className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-out overflow-hidden ${
//           isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="flex flex-col space-y-1 py-4 px-6">
//           <Link href="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
//             Home
//           </Link>

//           {/* Mobile Products Dropdown */}
//           <button
//             onClick={() => setIsProductsOpen(!isProductsOpen)}
//             className="py-2 text-left hover:text-pink-600 transition flex items-center justify-between"
//           >
//             Products
//             <svg
//               className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </button>

//           {isProductsOpen && (
//             <div className="pl-4 space-y-2">
//               <Link
//                 href="/?category=logo"
//                 onClick={() => {
//                   setIsOpen(false)
//                   setIsProductsOpen(false)
//                 }}
//                 className="block py-2 text-sm hover:text-pink-600 transition"
//               >
//                 Logo Designs
//               </Link>
//               <Link
//                 href="/?category=banner"
//                 onClick={() => {
//                   setIsOpen(false)
//                   setIsProductsOpen(false)
//                 }}
//                 className="block py-2 text-sm hover:text-pink-600 transition"
//               >
//                 Banner Designs
//               </Link>
//             </div>
//           )}

//           <Link href="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
//             About
//           </Link>
//           <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
//             Contact
//           </Link>

//           {/* Mobile Search Bar */}
//           <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-1"
//             />
//             <button type="submit" className="text-gray-600 hover:text-pink-600 transition">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </form>
//         </div>
//       </div>
//     </nav>
//   )
// }


"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition">
          Fairy<span className="text-pink-600"> Designs</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-pink-600 transition">
            Home
          </Link>
          <div className="relative group">
            <button className="hover:text-pink-600 transition flex items-center gap-1">
              Products
              <svg
                className="w-4 h-4 transition group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <div className="absolute left-0 mt-0 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/?category=logo"
                className="block px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition rounded-t-lg"
              >
                Logo Designs
              </Link>
              <Link
                href="/?category=banner"
                className="block px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition rounded-b-lg"
              >
                Banner Designs
              </Link>
            </div>
          </div>
          <Link href="/services" className="hover:text-pink-600 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-pink-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-pink-600 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-40"
          />
          <button type="submit" className="text-gray-600 hover:text-pink-600 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        {/* Mobile Menu Icon with Animation */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 focus:outline-none">
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span
            className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Slide-in Menu (Right Side) */}
      <div
        className={`md:hidden fixed top-16 right-0 bg-white shadow-lg transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? "w-64 translate-x-0 opacity-100" : "w-0 translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-1 py-4 px-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
            Home
          </Link>
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="py-2 text-left hover:text-pink-600 transition flex items-center justify-between"
          >
            Products
            <svg
              className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          {isProductsOpen && (
            <div className="pl-4 space-y-2">
              <Link
                href="/?category=logo"
                onClick={() => {
                  setIsOpen(false);
                  setIsProductsOpen(false);
                }}
                className="block py-2 text-sm hover:text-pink-600 transition"
              >
                Logo Designs
              </Link>
              <Link
                href="/?category=banner"
                onClick={() => {
                  setIsOpen(false);
                  setIsProductsOpen(false);
                }}
                className="block py-2 text-sm hover:text-pink-600 transition"
              >
                Banner Designs
              </Link>
            </div>
          )}
          <Link href="/services" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
            Services
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 hover:text-pink-600 transition">
            Contact
          </Link>
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-1"
            />
            <button type="submit" className="text-gray-600 hover:text-pink-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
