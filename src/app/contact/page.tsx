export default function ContactPage() {
  return (
    <section className="px-8 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions or want to collaborate? Reach out to us on WhatsApp or Discord.
      </p>
      <div className="space-x-4">
        <a
          href="https://wa.me/yourwhatsapplink"
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          href="https://discord.gg/yourdiscordlink"
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
          target="_blank"
        >
          Discord
        </a>
      </div>
    </section>
  );
}
