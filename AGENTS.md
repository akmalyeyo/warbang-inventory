# AGENTS.md — Kontrak Kerja Proyek Warbang

## Identitas & sumber kebenaran
Proyek: **Pengelolaan Persediaan dan Pelaporan Stok Barang Berbasis Web pada Toko Warbang**.  
Stack: React + Vite + TailwindCSS. Metode pengembangan acuan: RAD.  
`docs/SOT.md` adalah Single Source of Truth (SOT) untuk tujuan, modul, alur, istilah, dan batasan.

## Batasan fase
- Kerjakan front-end saja dengan data dummy.
- Dilarang membuat backend, API, database, autentikasi produksi, deployment, atau integrasi eksternal.
- Jangan menambah modul/fitur di luar tujuh modul tanpa persetujuan.
- Nyatakan dengan jelas bahwa data dan login hanya simulasi.

## UI/UX
- Bahasa antarmuka Indonesia.
- Brand Warbang, palet putih/abu-abu/charcoal.
- Gaya SaaS modern-futuristik yang minimal, bersih, responsif, dan aksesibel.
- Jaga konsistensi navigasi, spacing, tipografi, tabel, badge, modal, validasi, dan feedback aksi.
- Semua kontrol yang terlihat harus memiliki perilaku front-end yang jelas.

## Teknis
- Gunakan React functional components dan hooks.
- Gunakan TailwindCSS untuk styling.
- Buat komponen reusable; pisahkan data dummy dari tampilan.
- Hindari dependency tambahan tanpa alasan.
- Pastikan `npm run build` berhasil.

## Aturan bisnis
- SKU harus unik; stok dan stok minimum tidak boleh negatif.
- Barang masuk menambah stok.
- Barang keluar mengurangi stok dan ditolak bila jumlah melebihi stok tersedia.
- Status: Habis jika stok 0; Menipis jika stok > 0 dan <= stok minimum; Aman jika stok > stok minimum.
- Dashboard, monitoring, dan laporan harus membaca state persediaan yang sama.

## Definition of Done
Ketujuh modul tersedia, navigasi berjalan, form tervalidasi, transaksi mengubah stok, laporan dapat diekspor CSV, layout responsif, build berhasil, dan dokumentasi tetap sinkron dengan implementasi.