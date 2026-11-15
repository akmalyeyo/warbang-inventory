export const seedItems = [
  { id: 1, sku: 'WBG-001', name: 'Kopi Susu 250ml', category: 'Minuman', unit: 'Botol', stock: 128, min: 30, price: 8000 },
  { id: 2, sku: 'WBG-002', name: 'Air Mineral 600ml', category: 'Minuman', unit: 'Botol', stock: 18, min: 25, price: 4000 },
  { id: 3, sku: 'WBG-003', name: 'Roti Cokelat', category: 'Makanan', unit: 'Pcs', stock: 64, min: 20, price: 6000 },
  { id: 4, sku: 'WBG-004', name: 'Mi Instan Goreng', category: 'Makanan', unit: 'Pcs', stock: 0, min: 24, price: 3500 },
  { id: 5, sku: 'WBG-005', name: 'Keripik Singkong', category: 'Snack', unit: 'Pack', stock: 42, min: 15, price: 7000 },
  { id: 6, sku: 'WBG-006', name: 'Teh Melati 350ml', category: 'Minuman', unit: 'Botol', stock: 96, min: 25, price: 5000 },
];

export const seedTx = [
  { id: 1, type: 'Masuk', itemId: 1, item: 'Kopi Susu 250ml', qty: 40, party: 'PT Segar Makmur', date: '2026-11-11', notes: 'Pengadaan stok mingguan' },
  { id: 2, type: 'Keluar', itemId: 3, item: 'Roti Cokelat', qty: 12, party: 'Penjualan toko', date: '2026-11-11', notes: 'Penjualan harian etalase' },
  { id: 3, type: 'Masuk', itemId: 5, item: 'Keripik Singkong', qty: 24, party: 'CV Camilan Jaya', date: '2026-11-10', notes: 'Restok camilan reguler' },
  { id: 4, type: 'Keluar', itemId: 2, item: 'Air Mineral 600ml', qty: 8, party: 'Penjualan toko', date: '2026-11-10', notes: 'Penjualan kasir utama' },
];

export const categories = ['Minuman', 'Makanan', 'Snack', 'Aksesoris'];

export const units = ['Pcs', 'Botol', 'Pack', 'Dus', 'Kg'];

export const statusOf = (item) => {
  if (item.stock === 0) return 'Habis';
  if (item.stock <= item.min) return 'Menipis';
  return 'Aman';
};

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);
