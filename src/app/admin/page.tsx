import { Package, Tags, TrendingUp, Users } from "lucide-react";
import { client } from "@/sanity/lib/client";

async function getStats() {
  const products = await client.fetch(`count(*[_type == "product"])`);
  const categories = await client.fetch(`count(*[_type == "category"])`);
  const recentProducts =
    await client.fetch(`*[_type == "product"] | order(_createdAt desc)[0...5]{
    name, _createdAt
  }`);

  return { products, categories, recentProducts };
}

export default async function AdminDashboard() {
  const stats = await getStats();

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

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
