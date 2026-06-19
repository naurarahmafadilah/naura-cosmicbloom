import React from "react";
import { FiStar, FiUser, FiCheckCircle } from "react-icons/fi";

// Mock data review jika database kosong
const defaultReviews = [
  { id: 1, name: "Siti Rahma", rating: 5, date: "12 Mei 2026", comment: "Bahan dress-nya jatuh banget, adem dan jahitannya super rapi standar butik. Dipakai ke pesta pernikahan langsung keliatan mewah!", verified: true },
  { id: 2, name: "Amanda P.", rating: 4, date: "02 Juni 2026", comment: "Ukuran M pas di badan aku yang tinggi 160cm. Warnanya sedikit lebih soft dibanding foto produk, tapi malah jadi lebih elegan menurutku.", verified: true }
];

export default function ReviewSection({ reviews = defaultReviews }) {
  // Hitung rata-rata rating secara dinamis
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) || 0;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 space-y-6 font-quicksand">
      <h3 className="font-playfair text-lg font-bold text-slate-800 tracking-wide">Ulasan Pelanggan</h3>

      {/* RINGKASAN REKAP STARS (GRID JALUR CEPAT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 items-center">
        {/* Angka Rata-rata */}
        <div className="text-center md:border-r border-slate-200/60 last:border-0 py-2">
          <p className="text-3xl font-mono font-bold text-slate-800">{averageRating.toFixed(1)}</p>
          <div className="flex justify-center gap-0.5 my-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={14} fill={i < Math.round(averageRating) ? "currentColor" : "none"} />
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Berdasarkan {reviews.length} Ulasan</p>
        </div>

        {/* Bilah Progress Persentase (Rating Breakdown) */}
        <div className="col-span-2 space-y-1.5 px-0 md:px-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const percent = (count / reviews.length) * 100 || 0;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-3 text-slate-500 font-bold font-mono">{star}</span>
                <div className="flex-1 h-2 bg-slate-200/60 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <span className="w-6 text-right text-[10px] font-bold text-slate-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEED DAFTAR FEEDBACK / TESTIMONI */}
      <div className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <div key={review.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
            
            {/* Info Reviewer */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200/30">
                  <FiUser size={12} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-slate-800">{review.name}</h5>
                    {review.verified && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded-md border border-emerald-100">
                        <FiCheckCircle size={8} /> Pembeli Terverifikasi
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium">{review.date}</p>
                </div>
              </div>

              {/* Bintang Item */}
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={11} fill={i < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
            </div>

            {/* Isi Komentar */}
            <p className="text-xs text-slate-600 leading-relaxed pl-9">
              "{review.comment}"
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}