import { Package, Tags, TrendingUp, Users } from "lucide-react";
import { writeClient } from "@/sanity/lib/client";
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

// Use writeClient to bypass CDN cache and get fresh data for admin dashboard
async function getStats() {
  const products = await writeClient.fetch(`count(*[_type == "product"])`);
  const categories = await writeClient.fetch(`count(*[_type == "category"])`);
  const recentProducts =
    await writeClient.fetch(`*[_type == "product"] | order(_createdAt desc)[0...5]{
    name, _createdAt
  }`);

  return { products, categories, recentProducts };
}

// Force dynamic rendering to ensure fresh data on every visit
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  const stats = await getStats();
  const user = await currentUser();

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Categories",
      value: stats.categories,
      icon: Tags,
      color: "bg-green-500",
    },
    {
      title: "Active Users",
      value: "1.2K",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      {/* Admin Header with User Info */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm border p-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Fairy Designs Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, {user?.fullName || user?.firstName || user?.username || 'Admin'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/admin/login" />
          <SignOutButton>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-200">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.color} text-white mr-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Products
        </h2>
        <div className="space-y-3">
          {stats.recentProducts.map((product: any, index: number) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">
                  New product: {product.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(product._createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {stats.recentProducts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No products yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
