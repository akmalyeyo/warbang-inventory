import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Activity,
  FileBarChart2,
  Warehouse,
  Search,
  Bell,
  Plus,
  Download,
  LogOut,
  X,
  Menu,
  Boxes,
  AlertTriangle,
  Clock3,
  Trash2,
  Pencil,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  seedItems,
  seedTx,
  categories,
  units,
  statusOf,
  rupiah,
} from './data';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'items', label: 'Data Barang', icon: Package },
  { id: 'in', label: 'Barang Masuk', icon: ArrowDownToLine },
  { id: 'out', label: 'Barang Keluar', icon: ArrowUpFromLine },
  { id: 'monitor', label: 'Monitoring Stok', icon: Activity },
  { id: 'reports', label: 'Laporan Persediaan', icon: FileBarChart2 },
];

function StatusBadge({ status }) {
  let colorStyle = 'bg-gray-100 text-gray-700 border-gray-200';
  if (status === 'Aman' || status === 'Masuk') {
    colorStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Menipis') {
    colorStyle = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === 'Habis') {
    colorStyle = 'bg-red-50 text-red-700 border-red-200';
  } else if (status === 'Keluar') {
    colorStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colorStyle}`}
    >
      {status === 'Habis' && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
      {status === 'Menipis' && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
      {status === 'Aman' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      {status}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl transition-all">
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <X size={18} />
          </button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('admin@warbang.id');
  const [password, setPassword] = useState('warbang123');
  const [role, setRole] = useState('Admin');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Email dan password wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password minimal 6 karakter.');
      return;
    }
    setErrorMsg('');
    onLogin(role);
  };

  const setDemoCredentials = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Admin') {
      setEmail('admin@warbang.id');
      setPassword('warbang123');
    } else {
      setEmail('gudang@warbang.id');
      setPassword('gudang123');
    }
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f4f5f7]">
      {/* Kolom Kiri: Branding & Nilai Tambah */}
      <section className="hidden lg:flex flex-col justify-between bg-[#202124] p-12 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-gray-900 shadow-sm">
            <Warehouse size={22} />
          </span>
          <div>
            <b className="text-xl tracking-tight">warbang.</b>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Inventory System</p>
          </div>
        </div>

        <div className="max-w-lg">
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-gray-300">
            Prototipe Front-End · RAD
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight">
            Persediaan rapi,
            <br />
            <span className="text-gray-400">bisnis terkendali.</span>
          </h1>
          <p className="mt-4 leading-7 text-gray-300 text-sm">
            Satu ruang kerja terpadu untuk Toko Warbang: catat pergerakan barang masuk dan keluar, pantau stok minimum, dan ekspor laporan persediaan secara akurat.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { num: '01', title: 'Kontrol Stok', desc: 'Cegah stok habis & stok minus' },
              { num: '02', title: 'Data Terpusat', desc: 'Sinkronisasi antar modul' },
              { num: '03', title: 'Laporan Cepat', desc: 'Ringkasan nilai & ekspor CSV' },
            ].map((f) => (
              <div key={f.num} className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs">
                <span className="font-mono text-gray-400 font-bold">{f.num}</span>
                <p className="mt-2 font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-[11px] text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 Toko Warbang · Front-end Prototype</span>
          <span>Data In-Memory (Simulasi)</span>
        </div>
      </section>

      {/* Kolom Kanan: Form Login */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-900 text-white">
              <Warehouse size={20} />
            </span>
            <span className="text-xl font-bold">warbang.</span>
          </div>

          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Autentikasi Front-End
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Masuk ke Workspace
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Pilih peran pengguna demo untuk menguji hak akses modul.
          </p>

          {/* Tombol Cepat Akun Demo */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDemoCredentials('Admin')}
              className={`rounded-xl border p-2.5 text-left text-xs transition ${
                role === 'Admin'
                  ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">Demo Admin</div>
              <div className={`text-[10px] ${role === 'Admin' ? 'text-gray-300' : 'text-gray-400'}`}>
                Akses penuh 7 modul
              </div>
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('Petugas Gudang')}
              className={`rounded-xl border p-2.5 text-left text-xs transition ${
                role === 'Petugas Gudang'
                  ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">Demo Petugas Gudang</div>
              <div
                className={`text-[10px] ${
                  role === 'Petugas Gudang' ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                Operasional gudang
              </div>
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">Alamat Email</label>
              <input
                className="field"
                type="email"
                placeholder="nama@warbang.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                className="field"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Masuk Sebagai (Role Hak Akses)</label>
              <select
                className="field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin (Akses Seluruh Modul)</option>
                <option value="Petugas Gudang">
                  Petugas Gudang (Dashboard, Data Barang, Barang Masuk/Keluar, Monitoring)
                </option>
              </select>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100">
                <AlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button type="submit" className="primary w-full py-3 mt-2">
              Masuk ke Aplikasi <ChevronRight size={16} />
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-500 shadow-sm">
            <div className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
              <ShieldCheck size={16} className="text-gray-700" />
              <span>Simulasi Kredensial Demo (README)</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-gray-600">
              <p>• Admin: admin@warbang.id / warbang123</p>
              <p>• Petugas Gudang: gudang@warbang.id / gudang123</p>
            </div>
            <p className="mt-2 text-[10px] text-gray-400">
              *Autentikasi ini berjalan murni di sisi front-end dengan state lokal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  // Autentikasi & Hak Akses
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Admin'); // 'Admin' | 'Petugas Gudang'
  const [activePage, setActivePage] = useState('dashboard');

  // Sumber State Tunggal (Single Source of Truth) untuk Seluruh Modul
  const [items, setItems] = useState(seedItems);
  const [transactions, setTransactions] = useState(seedTx);

  // Filter & Pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [txSearchQuery, setTxSearchQuery] = useState('');

  // Modal, Konfirmasi Hapus & Notifikasi Toast
  const [activeModal, setActiveModal] = useState(''); // '' | 'item' | 'in' | 'out' | 'deleteItem'
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedTxItemId, setSelectedTxItemId] = useState(seedItems[0]?.id || 1);
  const [txQtyInput, setTxQtyInput] = useState(1);
  const [toast, setToast] = useState(null); // { message, type }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feedback Notifikasi
  const notify = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Navigasi yang diizinkan sesuai role
  const permittedNav = useMemo(() => {
    return navigationItems.filter((n) => {
      if (userRole === 'Admin') return true;
      // Petugas Gudang tidak memiliki akses ke Laporan Persediaan
      return n.id !== 'reports';
    });
  }, [userRole]);

  // Handler navigasi halaman dengan proteksi role
  const navigateTo = (pageId) => {
    if (userRole !== 'Admin' && pageId === 'reports') {
      notify('Akses terbatas. Laporan persediaan khusus Administrator.', 'warning');
      setActivePage('dashboard');
      return;
    }
    setActivePage(pageId);
    setSearchQuery('');
    setTxSearchQuery('');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
    notify('Berhasil keluar dari workspace.', 'info');
  };

  // Metrik Persediaan Bersama (Shared Metrics)
  const lowStockItems = useMemo(
    () => items.filter((x) => statusOf(x) === 'Menipis'),
    [items]
  );
  const outOfStockItems = useMemo(
    () => items.filter((x) => statusOf(x) === 'Habis'),
    [items]
  );
  const safeStockItems = useMemo(
    () => items.filter((x) => statusOf(x) === 'Aman'),
    [items]
  );
  const totalUnits = useMemo(
    () => items.reduce((acc, curr) => acc + curr.stock, 0),
    [items]
  );
  const totalValuation = useMemo(
    () => items.reduce((acc, curr) => acc + curr.stock * curr.price, 0),
    [items]
  );

  // Grafik Tren Bergerak Dinamis Berdasarkan Transaksi Terkini
  const dynamicMonthlyChart = useMemo(() => {
    const totalIn = transactions
      .filter((t) => t.type === 'Masuk')
      .reduce((acc, curr) => acc + curr.qty, 0);
    const totalOut = transactions
      .filter((t) => t.type === 'Keluar')
      .reduce((acc, curr) => acc + curr.qty, 0);

    return [
      { m: 'Jun', masuk: 180, keluar: 130 },
      { m: 'Jul', masuk: 220, keluar: 160 },
      { m: 'Agu', masuk: 190, keluar: 145 },
      { m: 'Sep', masuk: 260, keluar: 180 },
      { m: 'Okt', masuk: 230, keluar: 195 },
      { m: 'Nov', masuk: 226 + totalIn, keluar: 190 + totalOut },
    ];
  }, [transactions]);

  // Filter Data Barang & Monitoring
  const filteredItems = useMemo(() => {
    return items.filter((x) => {
      const matchSearch = (x.name + ' ' + x.sku)
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchCategory =
        selectedCategory === 'Semua' || x.category === selectedCategory;
      const matchStatus =
        activePage !== 'monitor' ||
        statusFilter === 'Semua' ||
        statusOf(x) === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, searchQuery, selectedCategory, statusFilter, activePage]);

  // Transaksi Terfilter sesuai modul aktif & kata kunci pencarian
  const currentTransactions = useMemo(() => {
    let list = transactions;
    if (activePage === 'in') {
      list = transactions.filter((t) => t.type === 'Masuk');
    } else if (activePage === 'out') {
      list = transactions.filter((t) => t.type === 'Keluar');
    }

    if (txSearchQuery) {
      const q = txSearchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.item.toLowerCase().includes(q) ||
          t.party.toLowerCase().includes(q) ||
          (t.notes && t.notes.toLowerCase().includes(q))
      );
    }
    return list;
  }, [transactions, activePage, txSearchQuery]);

  // Simpan / Edit Barang (Modul 2)
  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (userRole !== 'Admin') {
      notify('Hanya Administrator yang dapat mengelola data barang.', 'warning');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const sku = formData.get('sku')?.toString().trim().toUpperCase();
    const name = formData.get('name')?.toString().trim();
    const category = formData.get('category')?.toString();
    const unit = formData.get('unit')?.toString();
    const stock = parseInt(formData.get('stock')?.toString() || '0', 10);
    const min = parseInt(formData.get('min')?.toString() || '0', 10);
    const price = parseInt(formData.get('price')?.toString() || '0', 10);

    if (!sku || !name) {
      notify('SKU dan Nama barang wajib diisi.', 'warning');
      return;
    }

    if (stock < 0 || min < 0 || price < 0 || isNaN(stock) || isNaN(min) || isNaN(price)) {
      notify('Stok, stok minimum, dan harga tidak boleh bernilai negatif.', 'warning');
      return;
    }

    // Validasi keunikan SKU (case-insensitive)
    const duplicate = items.some(
      (item) => item.sku.toLowerCase() === sku.toLowerCase() && item.id !== editingItem?.id
    );
    if (duplicate) {
      notify(`SKU "${sku}" sudah digunakan oleh barang lain. Gunakan SKU unik.`, 'warning');
      return;
    }

    if (editingItem) {
      // Perbarui Barang
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, sku, name, category, unit, stock, min, price }
            : item
        )
      );
      notify(`Data barang "${name}" berhasil diperbarui.`, 'success');
    } else {
      // Tambah Barang Baru
      const newItem = {
        id: Date.now(),
        sku,
        name,
        category,
        unit,
        stock,
        min,
        price,
      };
      setItems((prev) => [newItem, ...prev]);
      notify(`Barang baru "${name}" berhasil ditambahkan.`, 'success');
    }

    setActiveModal('');
    setEditingItem(null);
  };

  // Konfirmasi & Eksekusi Hapus Barang (Modul 2)
  const openDeleteDialog = (item) => {
    if (userRole !== 'Admin') {
      notify('Hanya Administrator yang berhak menghapus data barang.', 'warning');
      return;
    }
    setItemToDelete(item);
    setActiveModal('deleteItem');
  };

  const confirmDeleteItem = () => {
    if (!itemToDelete) return;
    setItems((prev) => prev.filter((x) => x.id !== itemToDelete.id));
    notify(`Barang "${itemToDelete.name}" berhasil dihapus dari sistem.`, 'info');
    setActiveModal('');
    setItemToDelete(null);
  };

  // Simpan Transaksi Barang Masuk / Keluar (Modul 3 & 4)
  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemId = parseInt(formData.get('item')?.toString() || '0', 10);
    const qty = parseInt(formData.get('qty')?.toString() || '0', 10);
    const date = formData.get('date')?.toString() || new Date().toISOString().split('T')[0];
    const party = formData.get('party')?.toString().trim();
    const notes = formData.get('notes')?.toString().trim() || '-';
    const isIncoming = activeModal === 'in';

    const targetItem = items.find((x) => x.id === itemId);

    if (!targetItem) {
      notify('Pilih barang yang valid dalam daftar.', 'warning');
      return;
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      notify('Jumlah transaksi harus berupa bilangan bulat positif (> 0).', 'warning');
      return;
    }

    if (!party) {
      notify(
        isIncoming ? 'Nama pemasok wajib diisi.' : 'Tujuan / penerima barang wajib diisi.',
        'warning'
      );
      return;
    }

    // Aturan Bisnis Modul 4: Barang Keluar ditolak jika melebihi stok tersedia
    if (!isIncoming && qty > targetItem.stock) {
      notify(
        `Transaksi ditolak! Stok ${targetItem.name} tidak mencukupi (Tersedia: ${targetItem.stock}, Diminta: ${qty}).`,
        'warning'
      );
      return;
    }

    // Perbarui stok pada state tunggal
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              stock: isIncoming ? item.stock + qty : item.stock - qty,
            }
          : item
      )
    );

    // Tambah riwayat transaksi ke daftar
    const newTx = {
      id: Date.now(),
      type: isIncoming ? 'Masuk' : 'Keluar',
      itemId: targetItem.id,
      item: targetItem.name,
      qty,
      party,
      date,
      notes,
    };
    setTransactions((prev) => [newTx, ...prev]);

    setActiveModal('');
    notify(
      isIncoming
        ? `Berhasil mencatat barang masuk: +${qty} ${targetItem.unit} ${targetItem.name}.`
        : `Berhasil mencatat barang keluar: -${qty} ${targetItem.unit} ${targetItem.name}.`,
      'success'
    );
  };

  // Ekspor Laporan Persediaan ke CSV (Modul 6)
  const handleExportCsv = () => {
    if (userRole !== 'Admin') {
      notify('Akses terbatas. Ekspor laporan hanya untuk Administrator.', 'warning');
      return;
    }

    const dataToExport = filteredItems.length > 0 ? filteredItems : items;

    const headers = [
      'SKU',
      'Nama Barang',
      'Kategori',
      'Satuan',
      'Stok Saat Ini',
      'Stok Minimum',
      'Harga Satuan (IDR)',
      'Total Nilai (IDR)',
      'Status Persediaan',
    ];

    const rows = dataToExport.map((x) => [
      x.sku,
      x.name,
      x.category,
      x.unit,
      x.stock,
      x.min,
      x.price,
      x.stock * x.price,
      statusOf(x),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const str = String(value ?? '');
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\r\n');

    // Menambahkan BOM \ufeff agar karakter UTF-8 terbaca dengan benar di Excel & LibreOffice
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `laporan-persediaan-warbang-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    notify(
      `Laporan persediaan (${dataToExport.length} barang) berhasil diekspor ke file CSV.`,
      'success'
    );
  };

  // Reset Data Dummy ke Data Awal Seed
  const handleResetSeedData = () => {
    if (window.confirm('Kembalikan seluruh data barang dan riwayat transaksi ke data awal bawaan?')) {
      setItems(seedItems);
      setTransactions(seedTx);
      notify('Data persediaan berhasil dikembalikan ke data awal bawaan.', 'info');
    }
  };

  // Jika belum login, tampilkan layar login
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={(selectedRole) => {
          setUserRole(selectedRole);
          setIsLoggedIn(true);
          setActivePage('dashboard');
          notify(`Selamat datang, ${selectedRole}! Mode demo aktif.`, 'info');
        }}
      />
    );
  }

  // Barang yang sedang dipilih pada modal transaksi saat ini
  const activeTxTargetItem = items.find((x) => x.id === selectedTxItemId) || items[0];

  // Judul halaman saat ini
  const activeNavObj = navigationItems.find((n) => n.id === activePage);
  const activeTitle = activeNavObj ? activeNavObj.label : 'Dashboard';

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#202124]">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigasi Utama */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-[76px] items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-900 text-white shadow-sm">
              <Warehouse size={20} />
            </span>
            <div>
              <b className="text-lg tracking-tight text-gray-900">warbang.</b>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Inventory System</p>
            </div>
          </div>
          <button
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace Info Card */}
        <div className="m-4 rounded-xl border border-gray-100 bg-gray-50/80 p-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white border border-gray-200 text-gray-700">
              <Warehouse size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <b className="block truncate text-xs font-semibold text-gray-800">Toko Warbang</b>
              <p className="text-[10px] text-gray-400">Workspace Utama</p>
            </div>
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
              Demo
            </span>
          </div>
        </div>

        {/* Menu Navigasi Sesuai Hak Akses */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {permittedNav.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span>{item.label}</span>
                {item.id === 'monitor' && lowStockItems.length + outOfStockItems.length > 0 && (
                  <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                    {lowStockItems.length + outOfStockItems.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Tombol Reset Data Demo */}
        <div className="px-4 pb-2">
          <button
            onClick={handleResetSeedData}
            title="Reset data ke kondisi awal seed"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition"
          >
            <RotateCcw size={13} />
            <span>Reset Data Contoh</span>
          </button>
        </div>

        {/* Profil Pengguna & Tombol Logout */}
        <div className="m-4 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-sm">
              {userRole === 'Admin' ? 'AD' : 'PG'}
            </div>
            <div className="min-w-0 flex-1">
              <b className="block truncate text-xs font-semibold text-gray-800">
                {userRole === 'Admin' ? 'Administrator' : 'Petugas Gudang'}
              </b>
              <span className="block truncate text-[10px] text-gray-500">{userRole}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar dari sesi demo"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-[11px] font-medium text-gray-400">Toko Warbang / Persediaan</p>
              <h1 className="text-lg font-bold text-gray-900">{activeTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Lonceng Peringatan Notifikasi Stok */}
            <button
              onClick={() => {
                if (lowStockItems.length + outOfStockItems.length > 0) {
                  notify(
                    `Peringatan: Terdapat ${outOfStockItems.length} barang habis dan ${lowStockItems.length} barang menipis!`,
                    'warning'
                  );
                } else {
                  notify('Seluruh stok barang saat ini berada dalam level aman.', 'info');
                }
              }}
              title="Periksa status peringatan stok"
              className="relative rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 transition"
            >
              <Bell size={17} />
              {lowStockItems.length + outOfStockItems.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>

            <span className="hidden text-xs text-gray-500 md:inline-block">
              Simulasi Front-End · In-Memory
            </span>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">{userRole}</span>
            </div>
          </div>
        </header>

        {/* Area Kerja / Main Container */}
        <main className="flex-1 mx-auto w-full max-w-[1500px] p-5 md:p-8">
          {/* Action Bar / Title Row */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {activePage === 'dashboard'
                  ? 'Ikhtisar Operasional'
                  : activePage === 'reports'
                  ? 'Pelaporan Finansial & Stok'
                  : 'Manajemen Data'}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                {activePage === 'dashboard'
                  ? 'Ringkasan Persediaan Toko Warbang'
                  : activeTitle}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activePage === 'items' && userRole === 'Admin' && (
                <button
                  className="primary shadow-sm"
                  onClick={() => {
                    setEditingItem(null);
                    setActiveModal('item');
                  }}
                >
                  <Plus size={16} />
                  <span>Tambah Barang Baru</span>
                </button>
              )}

              {activePage === 'in' && (
                <button
                  className="primary shadow-sm"
                  onClick={() => {
                    setSelectedTxItemId(items[0]?.id || 1);
                    setTxQtyInput(1);
                    setActiveModal('in');
                  }}
                >
                  <Plus size={16} />
                  <span>Catat Barang Masuk</span>
                </button>
              )}

              {activePage === 'out' && (
                <button
                  className="primary shadow-sm"
                  onClick={() => {
                    setSelectedTxItemId(items[0]?.id || 1);
                    setTxQtyInput(1);
                    setActiveModal('out');
                  }}
                >
                  <Plus size={16} />
                  <span>Catat Barang Keluar</span>
                </button>
              )}

              {activePage === 'reports' && userRole === 'Admin' && (
                <button
                  className="primary shadow-sm"
                  onClick={handleExportCsv}
                >
                  <Download size={16} />
                  <span>Ekspor Laporan CSV</span>
                </button>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MODUL 7: DASHBOARD                                         */}
          {/* ========================================================= */}
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              {/* Kartu Ringkasan Metrik (KPI) */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="panel p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Jenis Barang
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-gray-700">
                      <Package size={20} />
                    </span>
                  </div>
                  <b className="mt-3 block text-3xl font-extrabold text-gray-900">
                    {items.length}
                  </b>
                  <p className="mt-2 text-xs text-gray-400">SKU aktif dalam sistem</p>
                </div>

                <div className="panel p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Unit Tersedia
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-gray-700">
                      <Boxes size={20} />
                    </span>
                  </div>
                  <b className="mt-3 block text-3xl font-extrabold text-gray-900">
                    {totalUnits.toLocaleString('id-ID')}
                  </b>
                  <p className="mt-2 text-xs text-gray-400">Akumulasi fisik seluruh stok</p>
                </div>

                <div className="panel p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Stok Menipis
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                      <AlertTriangle size={20} />
                    </span>
                  </div>
                  <b className="mt-3 block text-3xl font-extrabold text-amber-600">
                    {lowStockItems.length}
                  </b>
                  <p className="mt-2 text-xs text-gray-400">Stok ≤ batas minimum</p>
                </div>

                <div className="panel p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Stok Habis
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-700 border border-red-100">
                      <Activity size={20} />
                    </span>
                  </div>
                  <b className="mt-3 block text-3xl font-extrabold text-red-600">
                    {outOfStockItems.length}
                  </b>
                  <p className="mt-2 text-xs text-gray-400">Memerlukan restock segera</p>
                </div>
              </div>

              {/* Grid: Grafik Pergerakan Stok & Daftar Perhatian */}
              <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                {/* Grafik Pergerakan Persediaan */}
                <section className="panel p-6">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Pergerakan Persediaan Barang
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Tren barang masuk dan keluar (bereaksi langsung terhadap mutasi baru)
                      </p>
                    </div>
                    <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
                      Periode: Jun - Nov 2026
                    </span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dynamicMonthlyChart}>
                        <defs>
                          <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1f2937" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#1f2937" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="m" axisLine={false} tickLine={false} stroke="#9ca3af" />
                        <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="masuk"
                          name="Barang Masuk"
                          stroke="#111827"
                          fill="url(#colorMasuk)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="keluar"
                          name="Barang Keluar"
                          stroke="#9ca3af"
                          fill="url(#colorKeluar)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                      <span>Barang Masuk</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                      <span>Barang Keluar</span>
                    </span>
                  </div>
                </section>

                {/* Perlu Perhatian (Stok Menipis & Habis) */}
                <section className="panel p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900">Perlu Perhatian</h3>
                      <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                        {outOfStockItems.length + lowStockItems.length} barang
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      Barang dengan stok nol atau di bawah batas minimum
                    </p>

                    <div className="mt-5 space-y-3">
                      {[...outOfStockItems, ...lowStockItems].slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3"
                        >
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.sku} · Min: {item.min} {item.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <b className="block text-sm font-bold text-gray-900">
                              {item.stock} {item.unit}
                            </b>
                            <div className="mt-1">
                              <StatusBadge status={statusOf(item)} />
                            </div>
                          </div>
                        </div>
                      ))}

                      {outOfStockItems.length === 0 && lowStockItems.length === 0 && (
                        <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-6 text-center text-xs text-emerald-700">
                          <CheckCircle2 size={24} className="mx-auto mb-2 text-emerald-600" />
                          Semua stok berada dalam kondisi aman.
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('monitor')}
                    className="mt-6 flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span>Buka Monitoring Stok Lengkap</span>
                    <ChevronRight size={14} />
                  </button>
                </section>
              </div>

              {/* Aktivitas Transaksi Terbaru */}
              <section className="panel p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Aktivitas Transaksi Terbaru</h3>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Pencatatan pergerakan barang terkini di sistem
                    </p>
                  </div>
                  <Clock3 size={18} className="text-gray-400" />
                </div>

                <div className="divide-y divide-gray-100">
                  {transactions.slice(0, 5).map((t) => (
                    <div key={t.id} className="flex items-center gap-4 py-3.5 first:pt-2 last:pb-1">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl border ${
                          t.type === 'Masuk'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {t.type === 'Masuk' ? (
                          <ArrowDownToLine size={18} />
                        ) : (
                          <ArrowUpFromLine size={18} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <b className="text-sm font-semibold text-gray-900">{t.item}</b>
                          <StatusBadge status={t.type} />
                        </div>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {t.party} · {t.date} {t.notes && t.notes !== '-' ? `· "${t.notes}"` : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-mono text-sm font-bold ${
                            t.type === 'Masuk' ? 'text-emerald-700' : 'text-slate-800'
                          }`}
                        >
                          {t.type === 'Masuk' ? '+' : '-'}
                          {t.qty}
                        </span>
                      </div>
                    </div>
                  ))}

                  {transactions.length === 0 && (
                    <p className="py-8 text-center text-xs text-gray-400">
                      Belum ada riwayat transaksi.
                    </p>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODUL 2: DATA BARANG & MODUL 5: MONITORING & MODUL 6: LAPORAN */}
          {/* ========================================================= */}
          {(activePage === 'items' || activePage === 'monitor' || activePage === 'reports') && (
            <div className="space-y-6">
              {/* Ringkasan Spesifik Modul */}
              {activePage === 'monitor' && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="panel p-5 border-l-4 border-l-emerald-500">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Stok Aman
                    </p>
                    <b className="mt-2 block text-3xl font-extrabold text-gray-900">
                      {safeStockItems.length}
                    </b>
                    <p className="mt-1 text-xs text-emerald-600">Stok di atas batas minimum</p>
                  </div>
                  <div className="panel p-5 border-l-4 border-l-amber-500">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Stok Menipis
                    </p>
                    <b className="mt-2 block text-3xl font-extrabold text-amber-600">
                      {lowStockItems.length}
                    </b>
                    <p className="mt-1 text-xs text-amber-600">Perlu pemesanan ulang</p>
                  </div>
                  <div className="panel p-5 border-l-4 border-l-red-500">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Stok Habis
                    </p>
                    <b className="mt-2 block text-3xl font-extrabold text-red-600">
                      {outOfStockItems.length}
                    </b>
                    <p className="mt-1 text-xs text-red-600">Stok barang kosong (0)</p>
                  </div>
                </div>
              )}

              {activePage === 'reports' && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="panel p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Nilai Persediaan
                    </p>
                    <b className="mt-2 block text-2xl font-extrabold text-gray-900">
                      {rupiah(totalValuation)}
                    </b>
                    <p className="mt-1 text-xs text-gray-400">Akumulasi (Stok × Harga Satuan)</p>
                  </div>
                  <div className="panel p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Ragam SKU
                    </p>
                    <b className="mt-2 block text-2xl font-extrabold text-gray-900">
                      {items.length} Barang
                    </b>
                    <p className="mt-1 text-xs text-gray-400">Terdaftar di master data</p>
                  </div>
                  <div className="panel p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Barang Menipis
                    </p>
                    <b className="mt-2 block text-2xl font-extrabold text-amber-600">
                      {lowStockItems.length}
                    </b>
                    <p className="mt-1 text-xs text-gray-400">Perlu reorder</p>
                  </div>
                  <div className="panel p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Barang Habis
                    </p>
                    <b className="mt-2 block text-2xl font-extrabold text-red-600">
                      {outOfStockItems.length}
                    </b>
                    <p className="mt-1 text-xs text-gray-400">Segera restock</p>
                  </div>
                </div>
              )}

              {/* Tabel Data Master / Monitoring / Laporan */}
              <div className="panel overflow-hidden">
                {/* Filter & Toolbar */}
                <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1 sm:max-w-md">
                    <Search
                      className="absolute left-3.5 top-3 text-gray-400 pointer-events-none"
                      size={16}
                    />
                    <input
                      className="field pl-10 pr-9"
                      placeholder="Cari berdasarkan SKU atau nama barang..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                        title="Hapus pencarian"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-500">Kategori:</span>
                      <select
                        className="field sm:w-40"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="Semua">Semua Kategori</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {activePage === 'monitor' && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-gray-500">Status:</span>
                        <select
                          className="field sm:w-36"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="Semua">Semua Status</option>
                          <option value="Aman">Aman</option>
                          <option value="Menipis">Menipis</option>
                          <option value="Habis">Habis</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tabel Konten */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-gray-50/75 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="px-5 py-3.5 font-semibold">SKU & Nama Barang</th>
                        <th className="px-5 py-3.5 font-semibold">Kategori</th>
                        <th className="px-5 py-3.5 font-semibold">Stok Fisik</th>
                        <th className="px-5 py-3.5 font-semibold">Batas Minimum</th>
                        <th className="px-5 py-3.5 font-semibold">Harga Satuan</th>
                        {activePage === 'reports' && (
                          <th className="px-5 py-3.5 font-semibold">Nilai Persediaan</th>
                        )}
                        <th className="px-5 py-3.5 font-semibold">Status</th>
                        {activePage === 'items' && userRole === 'Admin' && (
                          <th className="px-5 py-3.5 font-semibold text-right">Aksi</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredItems.map((item) => {
                        const status = statusOf(item);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50/60 transition">
                            <td className="px-5 py-4">
                              <div className="font-semibold text-gray-900">{item.name}</div>
                              <div className="mt-0.5 font-mono text-xs text-gray-400">
                                {item.sku} · {item.unit}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-gray-600">
                              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-bold text-gray-900">{item.stock}</span>{' '}
                              <span className="text-xs text-gray-400">{item.unit}</span>
                            </td>
                            <td className="px-5 py-4 text-gray-600">
                              {item.min} <span className="text-xs text-gray-400">{item.unit}</span>
                            </td>
                            <td className="px-5 py-4 text-gray-700">{rupiah(item.price)}</td>
                            {activePage === 'reports' && (
                              <td className="px-5 py-4 font-semibold text-gray-900">
                                {rupiah(item.stock * item.price)}
                              </td>
                            )}
                            <td className="px-5 py-4">
                              <StatusBadge status={status} />
                            </td>
                            {activePage === 'items' && userRole === 'Admin' && (
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    title="Edit Data Barang"
                                    onClick={() => {
                                      setEditingItem(item);
                                      setActiveModal('item');
                                    }}
                                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                                  >
                                    <Pencil size={15} />
                                  </button>
                                  <button
                                    title="Hapus Barang"
                                    onClick={() => openDeleteDialog(item)}
                                    className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50 hover:border-red-200 transition"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}

                      {filteredItems.length === 0 && (
                        <tr>
                          <td
                            colSpan={activePage === 'reports' ? 8 : 7}
                            className="p-12 text-center text-gray-400"
                          >
                            <Package size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm font-medium">Tidak ada data barang yang cocok.</p>
                            <p className="mt-1 text-xs">
                              Coba ubah kata kunci pencarian atau sesuaikan filter kategori/status.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer Informasi Tabel */}
                <footer className="flex flex-wrap items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3 text-xs text-gray-500">
                  <span>
                    Menampilkan <b className="text-gray-800">{filteredItems.length}</b> dari total{' '}
                    <b className="text-gray-800">{items.length}</b> barang terdaftar
                  </span>
                  <span>Data In-Memory · Sinkron dengan Dashboard & Monitoring</span>
                </footer>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODUL 3: BARANG MASUK & MODUL 4: BARANG KELUAR             */}
          {/* ========================================================= */}
          {(activePage === 'in' || activePage === 'out') && (
            <div className="space-y-6">
              {/* Statistik Modul Transaksi */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="panel p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Jumlah Transaksi Tercatat
                  </p>
                  <b className="mt-2 block text-3xl font-extrabold text-gray-900">
                    {currentTransactions.length}
                  </b>
                  <p className="mt-1 text-xs text-gray-400">
                    Total riwayat {activePage === 'in' ? 'barang masuk' : 'barang keluar'}
                  </p>
                </div>

                <div className="panel p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total Unit {activePage === 'in' ? 'Masuk' : 'Keluar'}
                  </p>
                  <b className="mt-2 block text-3xl font-extrabold text-gray-900">
                    {currentTransactions.reduce((acc, t) => acc + t.qty, 0).toLocaleString('id-ID')}
                  </b>
                  <p className="mt-1 text-xs text-gray-400">
                    {activePage === 'in' ? 'Penambahan stok fisik' : 'Pengurangan stok fisik'}
                  </p>
                </div>

                <div className="panel p-5 flex items-center gap-3">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl border ${
                      activePage === 'in'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {activePage === 'in' ? (
                      <ArrowDownToLine size={24} />
                    ) : (
                      <ArrowUpFromLine size={24} />
                    )}
                  </span>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <b>Prinsip Ketelitian:</b> Setiap mutasi stok wajib tervalidasi agar data
                    monitoring dan laporan persediaan tetap presisi.
                  </div>
                </div>
              </div>

              {/* Tabel Riwayat Transaksi */}
              <div className="panel overflow-hidden">
                <div className="border-b border-gray-100 p-4">
                  <div className="relative max-w-md">
                    <Search
                      className="absolute left-3.5 top-3 text-gray-400 pointer-events-none"
                      size={16}
                    />
                    <input
                      className="field pl-10 pr-9"
                      placeholder={`Cari berdasarkan nama barang, ${
                        activePage === 'in' ? 'pemasok' : 'tujuan'
                      }, atau catatan...`}
                      value={txSearchQuery}
                      onChange={(e) => setTxSearchQuery(e.target.value)}
                    />
                    {txSearchQuery && (
                      <button
                        onClick={() => setTxSearchQuery('')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                        title="Hapus pencarian"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-gray-50/75 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="px-5 py-3.5 font-semibold">Tanggal</th>
                        <th className="px-5 py-3.5 font-semibold">Jenis</th>
                        <th className="px-5 py-3.5 font-semibold">Nama Barang</th>
                        <th className="px-5 py-3.5 font-semibold">Jumlah</th>
                        <th className="px-5 py-3.5 font-semibold">
                          {activePage === 'in' ? 'Pemasok' : 'Tujuan / Penerima'}
                        </th>
                        <th className="px-5 py-3.5 font-semibold">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50/60 transition">
                          <td className="px-5 py-4 text-gray-600 font-mono text-xs">{tx.date}</td>
                          <td className="px-5 py-4">
                            <StatusBadge status={tx.type} />
                          </td>
                          <td className="px-5 py-4 font-semibold text-gray-900">{tx.item}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`font-mono font-bold ${
                                tx.type === 'Masuk' ? 'text-emerald-700' : 'text-slate-800'
                              }`}
                            >
                              {tx.type === 'Masuk' ? '+' : '-'}
                              {tx.qty}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-600">{tx.party}</td>
                          <td className="px-5 py-4 text-xs text-gray-500 italic">
                            {tx.notes || '-'}
                          </td>
                        </tr>
                      ))}

                      {currentTransactions.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-10 text-center text-gray-400">
                            Tidak ada riwayat transaksi yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <footer className="border-t border-gray-100 bg-gray-50/50 px-5 py-3 text-xs text-gray-400">
                  Menampilkan {currentTransactions.length} transaksi · Mutasi tercatat mengubah stok
                  secara langsung.
                </footer>
              </div>
            </div>
          )}

          {/* SOT & Batasan Footer Notice */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400">
            <span>
              <b>Toko Warbang</b> · Pengelolaan Persediaan & Pelaporan Stok (Prototipe Front-End)
            </span>
            <div className="flex items-center gap-4">
              <span>Metode: Rapid Application Development (RAD)</span>
              <span>Data In-Memory</span>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: TAMBAH / EDIT BARANG (MODUL 2)                     */}
      {/* ========================================================= */}
      {activeModal === 'item' && (
        <Modal
          title={editingItem ? 'Edit Data Barang' : 'Tambah Barang Baru'}
          onClose={() => {
            setActiveModal('');
            setEditingItem(null);
          }}
        >
          <form
            key={editingItem ? editingItem.id : 'new-item-form'}
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={handleItemSubmit}
          >
            <div>
              <label className="label">Kode SKU (Harus Unik)</label>
              <input
                className="field font-mono"
                name="sku"
                defaultValue={editingItem?.sku || ''}
                placeholder="Contoh: WBG-007"
                required
              />
            </div>

            <div>
              <label className="label">Nama Barang</label>
              <input
                className="field"
                name="name"
                defaultValue={editingItem?.name || ''}
                placeholder="Contoh: Kopi Susu Botol"
                required
              />
            </div>

            <div>
              <label className="label">Kategori</label>
              <select
                className="field"
                name="category"
                defaultValue={editingItem?.category || 'Minuman'}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Satuan</label>
              <select className="field" name="unit" defaultValue={editingItem?.unit || 'Pcs'}>
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Stok Awal / Fisik</label>
              <input
                className="field"
                name="stock"
                type="number"
                min="0"
                step="1"
                defaultValue={editingItem?.stock ?? 0}
                required
              />
            </div>

            <div>
              <label className="label">Batas Stok Minimum</label>
              <input
                className="field"
                name="min"
                type="number"
                min="0"
                step="1"
                defaultValue={editingItem?.min ?? 10}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Harga Satuan (IDR)</label>
              <input
                className="field"
                name="price"
                type="number"
                min="0"
                step="500"
                defaultValue={editingItem?.price ?? 5000}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 sm:col-span-2 border-t border-gray-100">
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setActiveModal('');
                  setEditingItem(null);
                }}
              >
                Batal
              </button>
              <button type="submit" className="primary">
                {editingItem ? 'Simpan Perubahan' : 'Simpan Barang'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL: KONFIRMASI HAPUS BARANG (MODUL 2)                  */}
      {/* ========================================================= */}
      {activeModal === 'deleteItem' && itemToDelete && (
        <Modal
          title="Konfirmasi Penghapusan Barang"
          onClose={() => {
            setActiveModal('');
            setItemToDelete(null);
          }}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-xs text-red-800">
              <AlertTriangle size={20} className="shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-red-900">Perhatian: Tindakan Tidak Dapat Dibatalkan</p>
                <p className="mt-1 leading-relaxed">
                  Apakah Anda yakin ingin menghapus barang <b>"{itemToDelete.name}"</b> (SKU: <code>{itemToDelete.sku}</code>)?
                  Barang ini akan dihapus dari katalog persediaan.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600 space-y-1">
              <p>• Kategori: <b>{itemToDelete.category}</b></p>
              <p>• Stok Tersisa: <b>{itemToDelete.stock} {itemToDelete.unit}</b></p>
              <p>• Nilai Satuan: <b>{rupiah(itemToDelete.price)}</b></p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setActiveModal('');
                  setItemToDelete(null);
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteItem}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                <Trash2 size={16} />
                <span>Ya, Hapus Barang</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL: BARANG MASUK / BARANG KELUAR (MODUL 3 & 4)         */}
      {/* ========================================================= */}
      {(activeModal === 'in' || activeModal === 'out') && (
        <Modal
          title={
            activeModal === 'in'
              ? 'Catat Transaksi Barang Masuk'
              : 'Catat Transaksi Barang Keluar'
          }
          onClose={() => setActiveModal('')}
        >
          <form className="space-y-4" onSubmit={handleTransactionSubmit}>
            <div>
              <label className="label">Pilih Barang</label>
              <select
                name="item"
                className="field"
                required
                value={selectedTxItemId}
                onChange={(e) => setSelectedTxItemId(parseInt(e.target.value, 10))}
              >
                {items.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.sku} — {x.name} (Stok Saat Ini: {x.stock} {x.unit}{x.stock === 0 ? ' · Kosong' : ''})
                  </option>
                ))}
              </select>
            </div>

            {/* Panel Pratinjau Dampak Stok */}
            {activeTxTargetItem && (
              <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Stok Saat Ini:</span>
                  <span className="font-bold text-gray-800">
                    {activeTxTargetItem.stock} {activeTxTargetItem.unit}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-gray-200/60 pt-1">
                  <span className="text-gray-500">
                    Proyeksi Stok Setelah Mutasi:
                  </span>
                  <span
                    className={`font-bold ${
                      activeModal === 'out' && txQtyInput > activeTxTargetItem.stock
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {activeModal === 'in'
                      ? `${activeTxTargetItem.stock + (Number(txQtyInput) || 0)} ${activeTxTargetItem.unit}`
                      : `${activeTxTargetItem.stock - (Number(txQtyInput) || 0)} ${activeTxTargetItem.unit}`}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Jumlah (Unit Positif)</label>
                <input
                  name="qty"
                  className="field"
                  type="number"
                  min="1"
                  step="1"
                  value={txQtyInput}
                  onChange={(e) => setTxQtyInput(parseInt(e.target.value, 10) || 0)}
                  placeholder="Contoh: 10"
                  required
                />
              </div>

              <div>
                <label className="label">Tanggal Transaksi</label>
                <input
                  name="date"
                  className="field"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                {activeModal === 'in' ? 'Pemasok / Supplier' : 'Tujuan / Nama Penerima'}
              </label>
              <input
                name="party"
                className="field"
                placeholder={
                  activeModal === 'in'
                    ? 'Contoh: PT Segar Makmur'
                    : 'Contoh: Penjualan Kasir Toko'
                }
                required
              />
            </div>

            <div>
              <label className="label">Catatan Transaksi</label>
              <input
                name="notes"
                className="field"
                placeholder="Contoh: Restok mingguan / pengadaan etalase"
              />
            </div>

            {activeModal === 'out' && activeTxTargetItem && txQtyInput > activeTxTargetItem.stock && (
              <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>
                  Jumlah yang diminta ({txQtyInput} unit) melebihi stok yang tersedia ({activeTxTargetItem.stock} unit).
                  Transaksi ini akan ditolak untuk mencegah stok negatif.
                </span>
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                className="secondary"
                onClick={() => setActiveModal('')}
              >
                Batal
              </button>
              <button type="submit" className="primary">
                Simpan Transaksi
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* TOAST FEEDBACK NOTIFIKASI                                 */}
      {/* ========================================================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all">
          {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
          {toast.type === 'warning' && <AlertTriangle size={18} className="text-amber-400" />}
          {toast.type === 'info' && <AlertCircle size={18} className="text-gray-300" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
