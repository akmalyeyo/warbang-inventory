# Warbang Inventory — Front-end Prototype

Prototipe aplikasi web **Pengelolaan Persediaan dan Pelaporan Stok Barang Berbasis Web pada Toko Warbang** menggunakan stack **React + Vite + TailwindCSS** dengan acuan metode Rapid Application Development (RAD).

## Cara Menjalankan Aplikasi
1. Buka folder proyek di terminal.
2. Pastikan Node.js (versi 18+) dan npm telah terpasang.
3. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka URL lokal yang muncul pada terminal (biasanya `http://localhost:5173`).
6. Untuk memeriksa build produksi:
   ```bash
   npm run build
   ```

---

## Akun Demo & Hak Akses (Simulasi Front-End)
Autentikasi dan pemilihan hak akses berjalan murni pada state lokal React (tanpa backend/database produksi):

| Peran (Role) | Kredensial Demo | Cakupan Hak Akses |
|---|---|---|
| **Admin** | Email: `admin@warbang.id`<br>Password: `warbang123` | Akses penuh ke seluruh 7 modul (dapat menambah, mengedit, menghapus master barang, serta mengekspor CSV). |
| **Petugas Gudang** | Email: `gudang@warbang.id`<br>Password: `gudang123` | Dashboard, Data Barang (hanya lihat), Barang Masuk, Barang Keluar, dan Monitoring Stok. (Menu Laporan Persediaan disembunyikan/dibatasi). |

---

## 7 Modul Sistem Persediaan Toko Warbang
1. **Modul 1 — Login dan Hak Akses**: Validasi email/password demo, pemilihan role konseptual, dan logout.
2. **Modul 2 — Data Barang dan Kategori**: Katalog master barang (SKU, nama, kategori, satuan, stok, stok minimum, harga satuan). Mendukung pencarian, filter kategori, tambah barang baru, edit, dan hapus dengan konfirmasi (khusus Admin).
3. **Modul 3 — Barang Masuk**: Form pencatatan mutasi barang masuk (tanggal, barang, jumlah positif, pemasok, catatan). Menambah stok fisik barang secara otomatis.
4. **Modul 4 — Barang Keluar**: Form pencatatan mutasi barang keluar (tanggal, barang, jumlah positif, tujuan/penerima, catatan). Mengurangi stok barang dan **secara ketat menolak transaksi jika jumlah melebihi stok tersedia** (mencegah stok negatif).
5. **Modul 5 — Monitoring Stok**: Tabel pemantauan stok real-time dengan filter status persediaan:
   - **Aman**: Stok > Stok Minimum
   - **Menipis**: Stok > 0 dan Stok ≤ Stok Minimum
   - **Habis**: Stok = 0
6. **Modul 6 — Laporan Persediaan**: Ringkasan finansial (total nilai persediaan = stok × harga), total ragam SKU, barang menipis & habis, rekap persediaan, filter kategori, dan fitur **Ekspor CSV** langsung dari browser dengan encoding UTF-8 (BOM) ramah Excel.
7. **Modul 7 — Dashboard**: KPI metrik terpusat, grafik visual pergerakan tren persediaan (Recharts AreaChart), daftar barang "Perlu Perhatian", dan riwayat transaksi terbaru.

---

## Aturan Bisnis & Integritas State
- **Single Source of Truth**: Seluruh modul (Dashboard, Master Data, Mutasi Masuk/Keluar, Monitoring, dan Laporan) membaca dan memperbarui sumber data state React yang sama secara tersinkronisasi.
- **Keunikan SKU**: Validasi mencegah penambahan atau perubahan SKU yang sama (case-insensitive).
- **Proteksi Stok Negatif**: Validasi front-end memastikan barang keluar tidak pernah menyebabkan stok di bawah 0.
- **Validasi Bilangan Bulat Positif**: Jumlah transaksi barang masuk dan keluar hanya menerima integer > 0.

---

## Batasan Ruang Lingkup
- Proyek ini adalah prototipe front-end murni dengan data dummy lokal (in-memory).
- Tidak ada backend, REST API, database permanen, autentikasi server, atau integrasi pihak ketiga.
- Melakukan refresh halaman (F5) akan mengembalikan seluruh data ke kondisi data awal (seed).
