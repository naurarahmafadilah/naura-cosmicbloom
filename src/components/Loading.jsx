export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-latar z-50">

      <div className="flex flex-col items-center">

        {/* SPINNER */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>

        {/* BRAND */}
        <h1 className="text-2xl font-[var(--font-playfair)] text-teks">
          Veloura<span className="text-primary">.</span>
        </h1>

        {/* TEXT */}
        <p className="text-teks-soft text-sm mt-2">
          Loading your experience...
        </p>

      </div>

    </div>
  );
}