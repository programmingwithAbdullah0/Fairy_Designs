export default function ServicesPage() {
  return (
    <section className="px-8 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Custom Design</h2>
          <p className="text-gray-600">We design unique business visuals and branding elements for your brand.</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Logo Creation</h2>
          <p className="text-gray-600">High-quality logo creation that perfectly represents your business identity.</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Product Showcase</h2>
          <p className="text-gray-600">Display your products beautifully with modern UI and animations.</p>
        </div>
      </div>
    </section>
  );
}
