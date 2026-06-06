import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTimes, FaSave, FaTrashAlt, FaSearch, FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

// Import komponen internal yang sama dengan komponen Sale
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import collectionData from "../data/collectionsData.json"; // Pastikan file JSON sudah dibuat

const Collection = () => {
  // State yang mirip dengan logic di Sale ditambah fitur penampung filter
  const [collections, setCollections] = useState(collectionData || []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fitur Baru: State untuk melihat detail koleksi (Modal)
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Fitur Admin: State untuk pencarian dan filter kategori
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // State form disesuaikan variabelnya + Fitur Admin: status publikasi (isPublished)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    category: "",
    totalItems: "",
    img: "",
    isPublished: true // Default langsung aktif/terpublikasi
  });

  const fallbackImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=80";

  // Handle change input (Persis seperti di Sale)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fitur Admin: Toggle status publish/draft langsung dari form
  const handleTogglePublishForm = () => {
    setFormData((prev) => ({ ...prev, isPublished: !prev.isPublished }));
  };

  // Fitur Admin: Toggle status publish/draft langsung dari kartu koleksi (Quick Action)
  const handleTogglePublishCard = (id) => {
    setCollections(collections.map(item =>
      item.id === id ? { ...item, isPublished: !item.isPublished } : item
    ));
  };

  // Fungsi Edit (Persis seperti di Sale)
  const handleEditClick = (item) => {
    setFormData({
      id: item.id || "",
      name: item.name || "",
      slug: item.slug || "",
      category: item.category || "",
      totalItems: item.totalItems || "",
      img: item.img || "",
      isPublished: item.isPublished !== undefined ? item.isPublished : true
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fungsi Hapus (Persis seperti di Sale)
  const handleDeleteClick = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus koleksi ini dari pusat data?")) {
      setCollections(collections.filter(item => item.id !== id));
    }
  };

  // Fungsi Batal/Reset (Persis seperti di Sale)
  const handleCancel = () => {
    setFormData({ id: "", name: "", slug: "", category: "", totalItems: "", img: "", isPublished: true });
    setEditingId(null);
    setShowForm(false);
  };

  // Fungsi Submit Form Tambah/Edit (Persis seperti di Sale + Auto Slug Generator)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    // Fitur Admin: Otomatis buat slug jika admin mengosongkannya
    const finalSlug = formData.slug
      ? formData.slug.toLowerCase().trim().replace(/\s+/g, "-")
      : formData.name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

    if (editingId) {
      // Update data lama
      const updatedData = collections.map((item) =>
        item.id === editingId
          ? {
            ...item,
            name: formData.name,
            slug: finalSlug,
            category: formData.category || "Uncategorized",
            totalItems: formData.totalItems || "0",
            img: formData.img || fallbackImage,
            isPublished: formData.isPublished
          }
          : item
      );
      setCollections(updatedData);
    } else {
      // Tambah data baru
      const newItem = {
        id: formData.id || Math.floor(1000 + Math.random() * 9000).toString(),
        name: formData.name,
        slug: finalSlug,
        category: formData.category || "Uncategorized",
        totalItems: formData.totalItems || "0",
        img: formData.img || fallbackImage,
        isPublished: formData.isPublished
      };
      setCollections([newItem, ...collections]);
    }
    handleCancel();
  };

  // Fitur Admin: Logika filter pencarian dan drop-down kategori secara bersamaan
  const filteredCollections = collections.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Fitur Admin: Mengambil daftar kategori unik secara dinamis untuk opsi filter
  const categoriesList = ["All", ...new Set(collections.map(item => item.category).filter(Boolean))];

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">

        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Kurasi Koleksi VIP & Haute Couture
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
              Gerbang otorisasi produk eksklusif dan lini terbatas Veloura. Atur batasan akses SKU berbasis tier keanggotaan, kurasi mahakarya *Atelier*, serta kelola reservasi privat untuk klien VVIP.
            </p>
          </div>

          <div className="font-quicksand">
            <button
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-5 py-2.5 bg-[#4E5631] text-white rounded-xl text-xs font-bold tracking-wider hover:opacity-90 shadow-sm transition-all flex items-center gap-2 cursor-pointer uppercase"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Panel" : "Buat Koleksi Baru"}
            </button>
          </div>
        </div>

        {/* Form Input Section (Persis strukturnya dengan Sale + Fitur Saklar Status) */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm mb-8 animate-fade-in">
            <div className="border-b border-bg-soft pb-3 mb-4 flex justify-between items-center">
              <h3 className="text-sm font-bold font-quicksand text-primary-dark">
                {editingId ? "⚙️ Modifikasi Parameter Koleksi" : "✨ Registrasi Koleksi Rilisan Baru"}
              </h3>
              <button onClick={handleCancel} className="text-primary-dark/30 hover:text-primary-dark cursor-pointer"><FaTimes size={14} /></button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="Nama Koleksi" name="name" placeholder="Contoh: Winter Warmth 2026" value={formData.name} onChange={handleInputChange} required />
                <InputField label="Slug URL (Opsional - Otomatis Terisi)" name="slug" placeholder="Contoh: winter-warmth-2026" value={formData.slug} onChange={handleInputChange} />
                <InputField label="Kategori Divisi" name="category" placeholder="Contoh: Outerwear" value={formData.category} onChange={handleInputChange} />
                <InputField label="Kuantitas Item Terikat" name="totalItems" placeholder="Contoh: 28" value={formData.totalItems} onChange={handleInputChange} />
                <div className="md:col-span-2">
                  <InputField label="Tautan URL Gambar Sampul" name="img" placeholder="Masukkan link gambar resolusi tinggi..." value={formData.img} onChange={handleInputChange} />
                </div>
              </div>

              {/* Fitur Admin Tambahan di Form: Pengaturan Visibilitas Toko */}
              <div className="flex items-center gap-3 bg-bg-soft/50 p-3 rounded-lg border border-border-subtle w-fit">
                <span className="font-bold text-primary-dark/70">Status Publikasi:</span>
                <button
                  type="button"
                  onClick={handleTogglePublishForm}
                  className={`px-3 py-1.5 rounded-md font-bold tracking-wide text-[11px] transition-all cursor-pointer ${formData.isPublished
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                >
                  {formData.isPublished ? "🟢 LIVE (Terbuka di Etalase)" : "🟡 DRAFT (Disembunyikan)"}
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-bg-soft">
                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-bg-soft text-primary-dark/80 rounded-xl font-bold hover:bg-border-subtle cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl font-bold hover:opacity-90 flex items-center gap-1.5 uppercase cursor-pointer"><FaSave size={11} /> Simpan Data</button>
              </div>
            </form>
          </div>
        )}

        {/* Fitur Admin Baru: Kontrol Filter & Live Search Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-2xs mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center font-quicksand">
          {/* Live Search */}
          <div className="relative w-full sm:w-80 flex items-center">
            <FaSearch className="absolute left-3 text-primary-dark/30 text-xs" />
            <input
              type="text"
              placeholder="Cari koleksi spesifik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs h-9 bg-bg-soft pl-9 pr-4 rounded-xl border border-border-subtle focus:outline-none focus:border-[#4E5631]/50"
            />
          </div>
          {/* Filter Kategori Dinamis */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
            <span className="text-primary-dark/50 font-bold">Filter Divisi:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 bg-white border border-border-subtle rounded-xl px-3 font-semibold text-primary-dark focus:outline-none cursor-pointer"
            >
              {categoriesList.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid Tampilan Item Koleksi (Persis strukturnya dengan Sale + Fitur Badge Status) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((item) => (
              <div
                key={item.id}
                className={`group relative bg-white p-3 rounded-xl border shadow-2xs transition-all duration-300 hover:-translate-y-1 ${item.isPublished === false ? "border-amber-300/60 bg-amber-50/10" : "border-border-subtle"
                  }`}
              >
                <div className="block relative overflow-hidden rounded-lg bg-bg-soft aspect-[3/4]">
                  <img
                    src={item.img || fallbackImage}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 ${item.isPublished === false ? "opacity-65 grayscale-30" : ""
                      }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />

                  {/* Badge Kanan Atas: Jumlah Item */}
                  <div className="absolute top-3 right-3 bg-[#4E5631] text-white text-[9px] font-bold px-2 py-1 rounded-md z-20 uppercase">
                    {item.totalItems || 0} ITEMS
                  </div>

                  {/* Fitur Admin: Badge Kiri Atas Penanda Status Draf/Live */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded shadow-sm tracking-wider uppercase text-center ${item.isPublished !== false
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-500 text-white"
                      }`}>
                      {item.isPublished !== false ? "LIVE" : "DRAFT"}
                    </span>
                  </div>

                  {/* Action Buttons (Hover) + Fitur Cepat Ganti Status Publikasi */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-white hover:bg-slate-50 text-primary-dark p-2 rounded-lg shadow-md border border-border-subtle cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit size={11} />
                      </button>
                      <button
                        onClick={() => setSelectedCollection(item)}
                        className="bg-white hover:bg-slate-50 text-[#4E5631] p-2 rounded-lg shadow-md border border-border-subtle cursor-pointer"
                        title="Lihat Detail"
                      >
                        <FaInfoCircle size={11} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="bg-white hover:bg-rose-50 text-rose-600 p-2 rounded-lg shadow-md border border-border-subtle cursor-pointer"
                        title="Hapus"
                      >
                        <FaTrashAlt size={11} />
                      </button>
                    </div>

                    {/* Quick Switch Visibility */}
                    <button
                      onClick={() => handleTogglePublishCard(item.id)}
                      className="bg-white hover:bg-slate-50 text-slate-700 px-2 py-1.5 rounded-lg shadow-md border border-border-subtle text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      title="Ubah Visibilitas Instan"
                    >
                      {item.isPublished !== false ? <FaEyeSlash size={11} /> : <FaEye size={11} />}
                      {item.isPublished !== false ? "Draft-kan" : "Live-kan"}
                    </button>
                  </div>

                  {/* Link Detail (Sama dengan format Sale) */}
                  <Link
                    to={`/collection/${item.slug || item.id}`}
                    className="absolute inset-0 bg-primary-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10"
                  >
                    <div className="bg-white text-primary-dark w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center shadow-xs mb-10">
                      Preview Etalase
                    </div>
                  </Link>
                </div>

                {/* Bagian Teks Bawah Gambar */}
                <div className="mt-3 text-center space-y-0.5">
                  <span className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-widest font-quicksand">
                    {item.category || "Uncategorized"}
                  </span>
                  <Link to={`/collection/${item.slug || item.id}`}>
                    <h3 className="text-sm font-bold font-playfair text-primary-dark group-hover:text-[#4E5631] transition-colors line-clamp-1 px-1">
                      {item.name}
                    </h3>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-primary-dark/40 font-quicksand text-xs italic bg-white rounded-xl border border-dashed border-border-subtle">
              Tidak ditemukan data koleksi yang cocok dengan kata kunci pencarian Anda.
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MODAL POPUP: DETAIL PARAMETER DATA KOLEKSI */}
        {/* ========================================================================= */}
        {selectedCollection && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-quicksand animate-fade-in">
            <div className="bg-white max-w-md w-full rounded-2xl overflow-hidden border border-border-subtle shadow-xl flex flex-col max-h-[90vh]">
              {/* Gambar modal */}
              <div className="relative aspect-video w-full bg-bg-soft">
                <img
                  src={selectedCollection.img || fallbackImage}
                  alt={selectedCollection.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-dark flex items-center justify-center shadow-sm cursor-pointer transition-all"
                >
                  <FaTimes size={14} />
                </button>
                <div className="absolute bottom-3 left-3 bg-[#4E5631] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {selectedCollection.totalItems || 0} ITEMS
                </div>
              </div>

              {/* Konten detail */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
                <div>
                  <span className="text-[9px] text-[#A47174] font-extrabold tracking-widest uppercase">
                    {selectedCollection.category || "Uncategorized"}
                  </span>
                  <h2 className="text-lg font-bold font-playfair text-[#4E5631] mt-0.5">
                    {selectedCollection.name}
                  </h2>
                </div>

                <div className="space-y-2 border-t border-b border-bg-soft py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-dark/40 font-bold">ID Koleksi:</span>
                    <span className="font-mono bg-bg-soft px-2 py-0.5 rounded text-[11px] font-semibold text-primary-dark/80">{selectedCollection.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-dark/40 font-bold">Slug URL:</span>
                    <span className="font-mono bg-bg-soft px-2 py-0.5 rounded text-[11px] text-[#4E5631] font-semibold break-all max-w-[200px] truncate" title={selectedCollection.slug}>
                      {selectedCollection.slug || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-dark/40 font-bold">Status Visibilitas:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${selectedCollection.isPublished !== false
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                      }`}>
                      {selectedCollection.isPublished !== false ? "LIVE (Etalase Aktif)" : "DRAFT (Disembunyikan)"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      handleEditClick(selectedCollection);
                      setSelectedCollection(null);
                    }}
                    className="flex-1 py-2 bg-bg-soft text-primary-dark rounded-xl font-bold hover:bg-border-subtle transition-all cursor-pointer text-center"
                  >
                    Ubah Parameter
                  </button>
                  <Link
                    to={`/collection/${selectedCollection.slug || selectedCollection.id}`}
                    className="flex-1 py-2 bg-[#4E5631] text-white rounded-xl font-bold hover:opacity-90 transition-all text-center"
                  >
                    Buka Etalase
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Bawah */}
        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Collection;