# Product Requirement Document (PRD) - Veloura Boutique CRM

Dokumen ini mencatat tahapan pengembangan Landing Page CRM Veloura Boutique berdasarkan alur AIDA (Attention, Interest, Desire, Action) dan arsitektur landing page (Area TOP, MIDDLE, BOTTOM).

---

# ==========================================
# PRD VERSI 1: Fondasi Landing Page (Area TOP)
# ==========================================

## 1. Tujuan Produk
Membangun landing page paling dasar untuk memperkenalkan sistem CRM Veloura Boutique kepada pemilik butik, manajer, dan admin toko. Fokus utama terletak pada **Area TOP** untuk menarik perhatian awal (*Attention*) pengunjung.

## 2. User Story
*   **Sebagai** pemilik butik,
*   **Saya ingin** melihat ringkasan solusi pengelolaan pelanggan secara cepat di landing page,
*   **Agar** saya tahu apakah sistem ini dapat memecahkan masalah operasional toko saya.

## 3. Functional Requirement
*   **Header / Navigation Bar**: Menampilkan branding Veloura Boutique CRM, link navigasi standar (Home, Features, Contact), serta tombol akses cepat (Login, Register).
*   **Hero Section**:
    *   Headline persuasif: "Kelola Hubungan Pelanggan dengan Lebih Mudah".
    *   Subheadline deskriptif: Menjelaskan fungsionalitas CRM (data pelanggan, membership, transaksi, promosi).
    *   Dua tombol aksi (CTA): Utama (Mulai Gratis) dan Sekunder (Lihat Demo).
    *   Visual representation: Mockup interaktif dashboard CRM.
*   **Footer Sederhana**: Teks hak cipta dan link legal singkat.

## 4. Struktur Landing Page
*   [TOP] Navigation Bar
*   [TOP] Hero Section (Headline, Subheadline, CTA, Dashboard Mockup)
*   [BOTTOM] Simple Footer

## 5. Daftar Komponen
*   `CRMLandingPage.jsx` (Halaman utama)
*   Simulasi dashboard interaktif dalam format CSS/SVG

## 6. Perubahan dari Versi Sebelumnya
*   *N/A* (Versi inisial)

## 7. Evaluasi PRD V1
*   **Kekurangan**:
    1.  Informasi produk masih sangat minim; pengunjung tidak tahu *kenapa* mereka harus memilih Veloura.
    2.  Belum menjelaskan masalah nyata (*pain points*) yang dihadapi pemilik butik.
    3.  Belum membangun kredibilitas (*trust*) karena tidak ada statistik atau pembuktian.
    4.  CTA masih lemah karena tidak didukung argumen manfaat (*benefit*).

## 8. Commit Git V1
*   **Commit Hash**: `756fd0f` (atau commit terbaru)
*   **Pesan Commit**: `feat: membuat landing page dasar CRM`
