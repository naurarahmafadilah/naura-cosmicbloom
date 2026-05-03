import PageHeader from "../components/PageHeader";

const Contact = () => {
  return (
    <div className="space-y-12">

      <PageHeader
        title="Contact"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Contact" }
        ]}
      />

      <div className="grid grid-cols-2 gap-10">

        {/* LEFT - INFO */}
        <div className="bg-white p-10 rounded-3xl border border-[#f1e5db]">

          <p className="text-xs tracking-[3px] uppercase text-teks-soft mb-2">
            Customer Service
          </p>

          <h2 className="text-3xl font-[var(--font-playfair)] text-teks mb-4">
            Hubungi Veloura
          </h2>

          <p className="text-teks-soft text-sm leading-relaxed mb-6">
            Kami siap membantu Anda dengan pertanyaan seputar produk, pemesanan, 
            maupun informasi lainnya. Tim kami akan merespons secepat mungkin 
            untuk memberikan pengalaman terbaik.
          </p>

          <div className="space-y-4 text-sm text-teks-soft">

            <div>
              <p className="font-medium text-teks">Email</p>
              <p>support@veloura.com</p>
            </div>

            <div>
              <p className="font-medium text-teks">Phone</p>
              <p>+62 812 3456 7890</p>
            </div>

            <div>
              <p className="font-medium text-teks">Address</p>
              <p>Pekanbaru, Indonesia</p>
            </div>

          </div>

        </div>

        {/* RIGHT - FORM */}
        <div className="bg-white p-10 rounded-3xl border border-[#f1e5db]">

          <h3 className="text-2xl font-[var(--font-playfair)] text-teks mb-6">
            Kirim Pesan
          </h3>

          <form className="space-y-5">

            <div>
              <label className="text-sm text-teks-soft mb-1 block">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                           focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-teks-soft mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                           focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-teks-soft mb-1 block">
                Pesan
              </label>
              <textarea
                rows="4"
                placeholder="Tulis pesan Anda..."
                className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                           focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-full text-sm hover:opacity-90 transition">
              Kirim Pesan
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;