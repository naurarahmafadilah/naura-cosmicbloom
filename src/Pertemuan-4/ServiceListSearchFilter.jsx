import { useState } from "react";
import serviceData from "./services.json";

export default function ServiceListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const filteredData = serviceData.filter((item) => {
        const matchSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchCategory = selectedCategory
            ? item.category === selectedCategory
            : true;

        const matchStatus = selectedStatus
            ? item.status === selectedStatus
            : true;

        return matchSearch && matchCategory && matchStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">

            {/* HEADER */}
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                ✨ Service Management
            </h1>

            {/* SEARCH & FILTER */}
            <div className="bg-white shadow-md rounded-xl p-4 mb-6 grid md:grid-cols-3 gap-3">
                <input
                    type="text"
                    placeholder="🔍 Search service..."
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Category</option>
                    <option value="Home Service">Home Service</option>
                    <option value="Repair">Repair</option>
                    <option value="Beauty">Beauty</option>
                    <option value="IT Service">IT Service</option>
                    <option value="Education">Education</option>
                </select>

                <select
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                </select>
            </div>

            {/* ================= GUEST VIEW ================= */}
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
                👤 Guest View
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
                    >
                        <img
                            src={`/src/assets/${item.image}`}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded"
                        />

                        <div className="p-3">
                            <h2 className="font-bold text-lg text-gray-800">
                                {item.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {item.category}
                            </p>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-blue-600 font-semibold">
                                    Rp {item.price}
                                </p>
                                <p className="text-yellow-500">
                                    ⭐ {item.rating}
                                </p>
                            </div>

                            <p className="text-xs text-gray-400 mt-2">
                                Provider: {item.provider.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= ADMIN VIEW ================= */}
            <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-700">
                👨‍💼 Admin View
            </h2>

            <div className="bg-white shadow-md rounded-xl overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Provider</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((item) => (
                            <tr
                                key={item.id}
                                className="text-center border-b hover:bg-gray-100 transition"
                            >
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2 text-blue-600 font-medium">
                                    Rp {item.price}
                                </td>
                                <td className="p-2">
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-2">{item.provider.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* RESPONSIVE INFO */}
            <p className="text-center text-sm text-gray-500 mt-6">
                📱 Responsive: 1 kolom (HP) • 2 kolom (Tablet) • 4 kolom (Desktop)
            </p>
        </div>
    );
}