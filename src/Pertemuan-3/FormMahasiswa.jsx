import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function FormMahasiswa() {
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    email: "",
    gender: "",
    jurusan: "",
  });

  const [error, setError] = useState({});
  const [hasil, setHasil] = useState(null);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    let err = {};

    if (!form.nama.trim()) {
      err.nama = "Nama wajib diisi";
    } else if (!/^[A-Za-z ]+$/.test(form.nama)) {
      err.nama = "Nama tidak boleh angka";
    }

    if (!form.umur) {
      err.umur = "Umur wajib diisi";
    } else if (isNaN(form.umur)) {
      err.umur = "Umur harus angka";
    }

    if (!form.email.trim()) {
      err.email = "Email wajib diisi";
    } else if (!form.email.includes("@")) {
      err.email = "Email tidak valid";
    }

    if (!form.gender) err.gender = "Pilih gender";
    if (!form.jurusan) err.jurusan = "Pilih jurusan";

    setError(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      setHasil(form);
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">

    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">

      <h2 className="text-2xl font-semibold text-center text-indigo-500 mb-6 tracking-wide">
        Form Pendaftaran Mahasiswa
      </h2>

      {/* INPUT */}
      <InputField
        label="Nama"
        name="nama"
        type="text"
        value={form.nama}
        onChange={handleChange}
        error={error.nama}
      />

      <InputField
        label="Umur"
        name="umur"
        type="text"
        value={form.umur}
        onChange={handleChange}
        error={error.umur}
      />

      <InputField
        label="Email"
        name="email"
        type="text"
        value={form.email}
        onChange={handleChange}
        error={error.email}
      />

      {/* SELECT */}
      <SelectField
        label="Gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        options={["Laki-laki", "Perempuan"]}
        error={error.gender}
      />

      <SelectField
        label="Jurusan"
        name="jurusan"
        value={form.jurusan}
        onChange={handleChange}
        options={["Informatika", "Sistem Informasi"]}
        error={error.jurusan}
      />

      {/* BUTTON */}
      {form.nama &&
        form.umur &&
        form.email &&
        form.gender &&
        form.jurusan && (
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500
            hover:to-purple-500
            text-white py-2 rounded-lg shadow-md transition duration-300">
            Submit
          </button>
        )}

      {/* OUTPUT */}
      {hasil && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 mt-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-emerald-600 mb-2">
            Hasil Input
          </h3>
          <p className="text-gray-700">Nama: {hasil.nama}</p>
          <p className="text-gray-700">Umur: {hasil.umur}</p>
          <p className="text-gray-700">Email: {hasil.email}</p>
          <p className="text-gray-700">Gender: {hasil.gender}</p>
          <p className="text-gray-700">Jurusan: {hasil.jurusan}</p>
        </div>
      )}

      </div>
    </div>
  );
}