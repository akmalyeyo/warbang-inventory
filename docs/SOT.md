# SOT — Sistem Pengelolaan Persediaan dan Pelaporan Stok Toko Warbang

## 1. Ringkasan
Aplikasi web untuk mengelola data barang, mencatat barang masuk/keluar, memantau stok, dan menyajikan laporan persediaan. Fase awal berupa prototype front-end React-Vite dengan data dummy. RAD menjadi metode acuan proses pengembangan.

## 2. Tujuan
- Memusatkan informasi persediaan.
- Memudahkan pencatatan pergerakan barang.
- Menampilkan kondisi stok dan peringatan stok minimum.
- Menyediakan ringkasan dan laporan persediaan.

## 3. Pengguna dan hak akses
| Role | Hak akses konseptual |
|---|---|
| Admin | Seluruh modul |
| Petugas Gudang | Dashboard, data barang (lihat), barang masuk/keluar, monitoring |

Hak akses hanya simulasi UI, bukan otorisasi server.

## 4. Modul
### Modul 1 — Login dan Hak Akses
Form email/password, validasi sederhana, pilihan role demo Admin/Petugas Gudang, dan logout. Akun demo dicantumkan pada README.

### Modul 2 — Data Barang dan Kategori
Daftar SKU, nama barang, kategori, satuan, stok, stok minimum, dan harga. Mendukung pencarian SKU/nama, filter kategori, tambah, edit, dan hapus dengan konfirmasi. Kategori contoh: Minuman, Makanan, Snack, Aksesoris.

### Modul 3 — Barang Masuk
Form tanggal, barang, jumlah, pemasok, dan catatan. Jumlah harus positif. Transaksi tersimpan di state dummy dan menambah stok barang terkait.

### Modul 4 — Barang Keluar
Form tanggal, barang, jumlah, tujuan/penerima, dan catatan. Jumlah harus positif. Transaksi ditolak jika melebihi stok tersedia; transaksi yang valid mengurangi stok.

### Modul 5 — Monitoring Stok
Tabel stok terkini, pencarian, filter status, dan ringkasan jumlah barang. Status: Habis (stok 0), Menipis (stok > 0 dan <= minimum), Aman (stok > minimum).

### Modul 6 — Laporan Persediaan
Ringkasan nilai persediaan, jumlah SKU, barang menipis/habis, rekap stok, filter kategori, dan ekspor CSV dari browser.

### Modul 7 — Dashboard
KPI total jenis barang, total unit, barang menipis, barang habis; grafik pergerakan stok; aktivitas transaksi terbaru; daftar barang yang perlu diperhatikan.

## 5. Aturan bisnis
- SKU unik.
- Stok awal dan stok minimum >= 0.
- Jumlah transaksi berupa bilangan bulat positif.
- Barang masuk: stok akhir = stok awal + jumlah masuk.
- Barang keluar: stok akhir = stok awal - jumlah keluar, jika stok mencukupi.
- Semua ringkasan membaca state persediaan yang sama.

## 6. Data dummy
Contoh barang: Kopi Susu 250ml, Air Mineral 600ml, Roti Cokelat, Mi Instan Goreng, Keripik Singkong, dan Teh Melati 350ml. Seluruh data bersifat ilustratif.

## 7. Non-fungsional
Bahasa Indonesia; desain SaaS modern dan responsif; palet putih, abu-abu, charcoal; navigasi konsisten; form tervalidasi; feedback aksi jelas.

## 8. Batasan
Tidak ada backend/API/database/persistensi permanen. Login/role simulasi. Tidak termasuk kasir, akuntansi, barcode, multi-cabang, atau integrasi pemasok. RAD adalah metode pengembangan, bukan fitur aplikasi.

## 9. Kriteria penerimaan
Pengguna dapat login/logout demo; mengelola barang; mencatat barang masuk/keluar; mencegah stok negatif; memantau status; memfilter dan mengekspor laporan CSV; melihat dashboard konsisten; dan menggunakan UI pada desktop maupun mobile.