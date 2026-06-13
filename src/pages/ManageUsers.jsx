import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave,
  FaEdit, FaTrashAlt, FaUserShield, FaUserTag,
  FaCheckCircle, FaSpinner, FaEye, FaEnvelope, FaIdCard
} from "react-icons/fa";

import { supabase } from "../lib/supabase";

import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

const TABEL_SUPABASE = "users";

const ManageUsers = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeRoleFilter, setActiveRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // State baru untuk menghandle detail user (Modal)
  const [selectedUser, setSelectedUser] = useState(null);

  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(TABEL_SUPABASE)
        .select("*");

      if (error) throw error;

      const mappedData = data
        ? data.map((item) => ({
          id: item.id,
          name: item.name || "User",
          email: item.email,
          role: item.role || "user",
          created_at: item.created_at || new Date().toISOString(), // Opsional: untuk memperkaya detail
        }))
        : [];

      setUsers(mappedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      alert("Gagal mengambil data user dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openFormAndFocus = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameInputRef.current?.focus();
    }, 100);
  };

  const handleAddClick = () => {
    setFormData({ name: "", email: "", role: "user" });
    setEditingUserId(null);
    openFormAndFocus();
  };

  const handleEditClick = (user, e) => {
    e.stopPropagation();
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    });
    setEditingUserId(user.id);
    openFormAndFocus();
  };

  const handleDeleteClick = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const { error } = await supabase.from(TABEL_SUPABASE).delete().eq("id", id);
      if (error) throw error;
      alert("User berhasil dihapus.");
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus data:", error.message);
      alert("Gagal menghapus user dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", role: "user" });
    setEditingUserId(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Nama dan email wajib diisi.");
      return;
    }

    setLoading(true);
    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    try {
      if (editingUserId) {
        const { error } = await supabase.from(TABEL_SUPABASE).update(payload).eq("id", editingUserId);
        if (error) throw error;
        alert("Data user berhasil diperbarui.");
      } else {
        const { error } = await supabase.from(TABEL_SUPABASE).insert([payload]);
        if (error) throw error;
        alert("User baru berhasil ditambahkan.");
      }
      fetchUsers();
      handleCancel();
    } catch (error) {
      console.error("Gagal menyimpan data:", error.message);
      alert("Gagal menyimpan data ke Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const matchRole = activeRoleFilter === "all" || item.role?.toLowerCase() === activeRoleFilter.toLowerCase();
      const matchSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [users, activeRoleFilter, searchTerm]);

  const metrics = useMemo(() => {
    return {
      total: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      user: users.filter((u) => u.role === "user").length,
      active: users.length,
    };
  }, [users]);

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
                User Management
              </h1>
              {loading && <FaSpinner className="animate-spin text-[#A47174]" size={18} />}
            </div>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Halaman ini digunakan untuk melakukan CRUD data user yang terhubung langsung dengan database Supabase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] transition-all duration-300 shadow-xs"
            >
              🔄 Sinkron Data
            </button>
            <button
              onClick={handleAddClick}
              disabled={loading}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 flex items-center gap-2 transition-all duration-300 shadow-sm"
            >
              <FaPlus /> Tambah User
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-quicksand">
          {[
            { title: "Total User", value: metrics.total, icon: <FaUserShield className="text-[#4E5631]" size={18} /> },
            { title: "Admin", value: metrics.admin, icon: <FaUserTag className="text-[#A47174]" size={18} /> },
            { title: "User", value: metrics.user, icon: <FaUserTag className="text-[#4E5631]" size={18} /> },
            { title: "Aktif", value: metrics.active, icon: <FaCheckCircle className="text-emerald-600" size={18} /> }
          ].map((item, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.title}</p>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* FORM INPUT SECTION */}
        {showForm && (
          <div ref={formRef} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md mb-6 transition-all duration-300">
            <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between">
              <div>
                <h3 className="text-base font-bold font-playfair text-slate-800">
                  {editingUserId ? "Edit User" : "Tambah User Baru"}
                </h3>
                <p className="text-[11px] text-slate-400 font-quicksand mt-0.5">
                  Data akan disimpan langsung ke tabel users Supabase.
                </p>
              </div>
              <button onClick={handleCancel} className="text-slate-400 hover:text-rose-500 transition-colors">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  ref={nameInputRef}
                  label="Nama User"
                  name="name"
                  placeholder="Masukkan nama user"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 px-3 focus:outline-none focus:border-[#4E5631] transition-colors"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-[#4E5631]/90 transition-colors shadow-xs"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {editingUserId ? "Update User" : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEARCH & FILTER */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-quicksand mb-6">
          <div className="relative w-full sm:w-96 flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
            <input
              type="text"
              placeholder="Cari nama, email, atau role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631] focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FaFilter size={9} /> Filter:
            </span>
            {["all", "admin", "user"].map((role) => (
              <button
                key={role}
                onClick={() => setActiveRoleFilter(role)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase border transition-all duration-300 ${
                  activeRoleFilter === role
                    ? "bg-[#4E5631] border-[#4E5631] text-white shadow-xs"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {role === "all" ? "Semua" : role}
              </button>
            ))}
          </div>
        </div>

        {/* PREMIUM CARDS LIST */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-quicksand">
            {filteredUsers.map((item) => {
              const isAdmin = item.role?.toLowerCase() === "admin";
              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Premium Indicator Line */}
                  <div className={`h-[3px] w-full ${isAdmin ? "bg-[#A47174]" : "bg-[#4E5631]"}`} />
                  
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">{item.email}</p>
                      </div>
                      
                      <span className={`text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-lg uppercase border shrink-0 ${
                        isAdmin 
                          ? "text-[#A47174] bg-[#A47174]/5 border-[#A47174]/20" 
                          : "text-[#4E5631] bg-[#4E5631]/5 border-[#4E5631]/20"
                      }`}>
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Premium Actions Bar */}
                  <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedUser(item)}
                      className="text-[11px] font-bold text-slate-500 hover:text-[#4E5631] flex items-center gap-1.5 transition-colors"
                    >
                      <FaEye size={13} /> Detail
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleEditClick(item, e)}
                        className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:text-[#4E5631] hover:border-[#4E5631] transition-all"
                        title="Ubah Data"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(item.id, e)}
                        className="p-2 bg-white border border-rose-100 text-rose-400 rounded-lg hover:text-rose-600 hover:bg-rose-50/50 transition-all"
                        title="Hapus User"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 font-quicksand text-xs italic">
            {loading ? "Memuat data dari Supabase..." : "Data user belum tersedia."}
          </div>
        )}

        <Footer />
      </div>

      {/* PREMIUM DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-quicksand animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedUser(null)}
          />
          
          {/* Modal Box */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform scale-100 transition-transform">
            {/* Modal Decorative Header */}
            <div className={`h-2 w-full ${selectedUser.role === "admin" ? "bg-[#A47174]" : "bg-[#4E5631]"}`} />
            
            <div className="p-6">
              {/* Header Close Button */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Profile Overview</span>
                  <h3 className="text-xl font-bold font-playfair text-slate-800 mt-0.5">{selectedUser.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Detail Items */}
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg shadow-2xs">
                    <FaIdCard size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">User ID</p>
                    <p className="font-mono text-slate-700 mt-0.5 break-all select-all">{selectedUser.id}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg shadow-2xs">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Alamat Email</p>
                    <p className="font-semibold text-slate-700 mt-0.5 break-all">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg shadow-2xs">
                    <FaUserShield size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Hak Akses / Role</p>
                    <span className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 mt-1 rounded-md uppercase border ${
                      selectedUser.role === "admin" 
                        ? "text-[#A47174] bg-[#A47174]/5 border-[#A47174]/20" 
                        : "text-[#4E5631] bg-[#4E5631]/5 border-[#4E5631]/20"
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={(e) => {
                    handleEditClick(selectedUser, e);
                    setSelectedUser(null);
                  }}
                  className="px-3.5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:text-[#4E5631] hover:border-[#4E5631] transition-colors"
                >
                  Edit User
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default ManageUsers;