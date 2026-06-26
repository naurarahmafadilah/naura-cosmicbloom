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
*   **Commit Hash**: `756fd0f`
*   **Pesan Commit**: `feat: membuat landing page dasar CRM`

---

# ==========================================
# PRD VERSI 2: Penjelasan Masalah & Manfaat (Area MIDDLE)
# ==========================================

## 1. Tujuan Produk
Memperluas informasi pada landing page dengan menyajikan masalah nyata butik (*Pain Points*), solusi yang ditawarkan, fitur unggulan, manfaat nyata (*Benefits*), serta data statistik pendukung untuk membangkitkan minat (*Interest*) dan keinginan (*Desire*) pengunjung.

## 2. User Story
*   **Sebagai** pemilik butik yang sibuk,
*   **Saya ingin** melihat daftar kendala operasional ritel fashion yang relevan dan bagaimana Veloura CRM menyelesaikannya secara instan,
*   **Agar** saya merasa terdorong untuk mencoba sistem ini di toko saya.

## 3. Functional Requirement
*   **Problem Section**: Mengangkat 4 hambatan utama butik (Data Tercecer, Sulit Kenali VIP, Promosi Random, Analisis Buta) dengan representasi ikonik.
*   **Solution Section**: Menjelaskan bagaimana Veloura mengeliminasi cara manual melalui otomatisasi serta keuntungan efisiensi waktu & enkripsi data.
*   **Feature Section**: Menampilkan 4 pilar fitur utama (Customer Management, Membership Program, Sales Analytics, Promotion Automation) dengan kartu visual yang responsif.
*   **Benefit Section**: Menyajikan 3 manfaat langsung (Menghemat waktu, Meningkatkan loyalitas, Meningkatkan penjualan).
*   **Statistics Section**: Menampilkan data pencapaian (5000+ Pelanggan, 98% Kepuasan, 1200+ Member Aktif) sebagai bukti kredibilitas (*social proof*).
*   **CTA Sekunder**: Menyediakan formulir/ajakan cepat untuk pendaftaran uji coba 14 hari gratis.

## 4. Struktur Landing Page
*   [TOP] Navigation Bar & Hero Section
*   [MIDDLE] Problem Section
*   [MIDDLE] Solution Section
*   [MIDDLE] Feature Section
*   [MIDDLE] Benefit Section
*   [MIDDLE] Statistics Section
*   [MIDDLE] Secondary CTA Banner
*   [BOTTOM] Simple Footer

## 5. Perubahan dari Versi Sebelumnya
*   Menambahkan seluruh komponen pendukung Area MIDDLE di bawah Hero Section.
*   Menggunakan layout grid responsif dan efek hover pada kartu masalah/fitur untuk mempercantik aspek UI/UX.

## 6. Evaluasi PRD V2
*   **Kelebihan**: Alur argumentasi lebih logis dan terstruktur dari Problem menuju Solution & Benefit.
*   **Kekurangan**:
    1.  Belum ada testimoni otentik dari pengguna asli (pemilik butik) untuk memperkuat kredibilitas produk.
    2.  Pengunjung mungkin masih ragu tentang detail teknis pengoperasian (karena belum ada bagian FAQ).
    3.  Kurangnya alur visual proses kerja (*workflow*) CRM dari awal hingga akhir.
    4.  Footer belum memuat peta situs dan kontak butik resmi yang lengkap.

## 7. Commit Git V2
*   **Commit Hash**: `a6e7ab7`
*   **Pesan Commit**: `feat: menambahkan problem, solution, feature, benefit dan statistik`
