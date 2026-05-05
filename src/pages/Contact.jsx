import PageHeader from "../components/PageHeader";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <PageHeader
        title="Contact Us"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Contact" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT - INFO CARD */}
        <div className="bg-white p-12 rounded-[45px] border border-bg-soft shadow-veloura relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-bg-soft rounded-full opacity-50" />
          
          <div className="relative z-10">
            <p className="text-[10px] tracking-[4px] uppercase font-bold text-secondary-light mb-4">
              Customer Service
            </p>

            <h2 className="text-4xl font-playfair text-primary-dark mb-6">
              Hubungi <span className="italic">Veloura</span>
            </h2>

            <p className="text-secondary-dark/60 font-quicksand text-sm leading-relaxed mb-10">
              Kami siap membantu Anda dengan pertanyaan seputar koleksi, pemesanan, 
              maupun informasi butik. Tim kami akan merespons dalam 1x24 jam kerja.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-dark shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-secondary-dark/40 mb-1">Email</p>
                  <p className="text-sm font-quicksand font-bold text-primary-dark">support@veloura.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-dark shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-secondary-dark/40 mb-1">Phone</p>
                  <p className="text-sm font-quicksand font-bold text-primary-dark">+62 812 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-dark shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-secondary-dark/40 mb-1">Address</p>
                  <p className="text-sm font-quicksand font-bold text-primary-dark">Jl. Sudirman No. 123, Pekanbaru, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <div className="mt-12 p-6 bg-primary-dark rounded-[30px] flex items-center justify-between group cursor-pointer hover:bg-primary-light transition-all">
               <div className="flex items-center gap-4 text-white">
                 <FaWhatsapp size={24} />
                 <div>
                   <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Chat via WhatsApp</p>
                   <p className="text-sm font-quicksand font-bold">Fast Response Service</p>
                 </div>
               </div>
               <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>

        {/* RIGHT - CONTACT FORM */}
        <div className="bg-white p-12 rounded-[45px] border border-bg-soft shadow-sm">
          <h3 className="text-2xl font-playfair text-primary-dark mb-8">
            Kirim Pesan Langsung
          </h3>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
                Pesan
              </label>
              <textarea
                rows="5"
                placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner resize-none"
              />
            </div>

            <button className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-secondary-light transition-all shadow-lg hover:shadow-secondary-light/30">
              Kirim Sekarang →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;