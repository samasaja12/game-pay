# 🎮 Admin Dashboard GamePay - Setup Guide

## Daftar Isi
1. [Fitur Admin Dashboard](#fitur-admin-dashboard)
2. [Cara Mengakses](#cara-mengakses)
3. [Daftar Admin Emails](#daftar-admin-emails)
4. [Fitur Lengkap](#fitur-lengkap)
5. [Troubleshooting](#troubleshooting)

---

## Fitur Admin Dashboard

### 📊 Dashboard Overview
- **Statistik Real-time**: Total transaksi, pengguna, revenue harian
- **Trend Chart**: Visualisasi trend transaksi 7 hari terakhir
- **Status Transaksi**: Breakdown status (Sukses, Pending, Gagal)
- **Transaksi Terbaru**: Daftar transaksi terkini dengan detail lengkap

### 💳 Manajemen Transaksi
- **Search & Filter**: Cari transaksi berdasarkan nama pengguna atau produk
- **Status Badge**: Identifikasi cepat status transaksi
- **Detail Transaksi**: Lihat informasi lengkap setiap transaksi
- **Export Data**: Download laporan transaksi

### 👥 Manajemen Pengguna
- **User Cards**: Tampilan kartu pengguna yang informatif
- **Search User**: Cari berdasarkan nama atau email
- **User Profile**: Lihat detail profil pengguna (email, phone, tanggal bergabung)
- **Add User**: Tombol untuk menambah pengguna baru
- **User Status**: Pantau status aktivitas pengguna

### 📦 Manajemen Produk
- **Product List**: Daftar lengkap semua produk layanan
- **Kategori Produk**: 
  - 🎮 Game (Diamond MLBB, UC PUBG, dll)
  - 📱 Pulsa (Telkomsel, Indosat, Xl, dll)
  - 📡 Paket Data
  - ⚡ Token Listrik
  - 📺 TV Kabel
- **Edit/Delete**: Kelola produk dengan mudah
- **Harga & Komisi**: Atur harga dan komisi per produk
- **Stok Management**: Pantau ketersediaan produk

### 📈 Analytics
- **Revenue by Category**: Breakdown revenue per kategori produk
- **Top Products**: Lihat produk terlaris dan paling menguntungkan
- **Traffic & Conversion**: Metrik penting untuk performa bisnis
- **Advanced Metrics**: Data visitor, conversion rate, dan total revenue

### ⚙️ Settings
- **Profil Admin**: Update informasi admin
- **Keamanan**: Change password & 2FA
- **Notifikasi**: Atur preferensi notifikasi email
- **Maintenance Mode**: Mode maintenance untuk update sistem

---

## Cara Mengakses

### 1. **Menggunakan Email Admin Terdaftar**
Login menggunakan email yang sudah terdaftar sebagai admin:

```
Email Admin Terdaftar:
- admin@gamepay.com
- jagres@gmail.com
```

**Langkah-langkah:**
1. Buka aplikasi GamePay
2. Klik "Sign in with Google"
3. Gunakan salah satu email admin di atas
4. Sistem akan otomatis mendeteksi dan menampilkan Admin Dashboard

### 2. **Mode Testing/Development**
Untuk testing dengan email apapun:

1. Buka browser Developer Console (F12)
2. Jalankan command berikut di console:
   ```javascript
   localStorage.setItem('adminMode', 'true');
   ```
3. Refresh halaman aplikasi
4. Login dengan email apapun - Admin Dashboard akan ditampilkan

**Catatan:** Mode ini hanya untuk development. Sebelum production, hapus command ini atau implement backend authentication yang proper.

---

## Daftar Admin Emails

Admin emails didefinisikan di `app.jsx`:

```javascript
const ADMIN_EMAILS = [
  'admin@gamepay.com',
  'jagres@gmail.com' // Contoh email admin
];
```

### Menambah Email Admin Baru
Edit `app.jsx` baris ke ~41 dan tambahkan email baru:

```javascript
const ADMIN_EMAILS = [
  'admin@gamepay.com',
  'jagres@gmail.com',
  'newadmin@gmail.com' // ← Tambah di sini
];
```

### Rekomendasi untuk Production
Untuk production, sebaiknya implementasikan:
- ✅ Backend authentication yang proper
- ✅ Database untuk menyimpan admin users
- ✅ Role-based access control (RBAC)
- ✅ Audit logging untuk setiap aksi admin
- ✅ IP whitelist untuk admin access

---

## Fitur Lengkap

### Dashboard Menu (Sidebar)
```
📊 Dashboard      → Overview statistik real-time
💳 Transaksi      → Manajemen semua transaksi
👥 Pengguna       → Manajemen user database
📦 Produk         → Kelola katalog produk
📈 Analytics      → Laporan analytics mendalam
⚙️ Pengaturan     → Konfigurasi sistem
```

### Responsive Design
- ✅ Desktop: Full sidebar navigation
- ✅ Tablet: Adaptive layout dengan hamburger menu
- ✅ Mobile: Collapsible sidebar dengan hamburger menu

### Fitur UI/UX
- 🎨 Modern design dengan TailwindCSS
- ✨ Smooth animations & transitions
- 📱 Fully responsive (mobile-first)
- 🌙 Clean & professional interface
- ⚡ Fast performance optimized

---

## Troubleshooting

### Admin Dashboard tidak muncul setelah login
**Solusi:**
1. Pastikan menggunakan email yang ada di `ADMIN_EMAILS`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```
4. Refresh halaman

### Default admin email tidak berfungsi
**Solusi:**
1. Edit `ADMIN_EMAILS` di `app.jsx`
2. Gunakan email Google OAuth Anda sendiri
3. Restart development server

### Styling bermasalah
**Solusi:**
1. Pastikan TailwindCSS sudah ter-setup di `tailwind.config.js`
2. Rebuild CSS: `npm run build`
3. Clear cache dan refresh

---

## Struktur File

```
game-pay/
├── app.jsx                    ← Main app dengan admin check
├── AdminDashboard.jsx         ← Admin dashboard component
├── index.jsx                  ← Entry point
├── package.json               ← Dependencies
├── tailwind.config.js         ← TailwindCSS config
├── vite.config.js             ← Vite config
└── ADMIN_DASHBOARD_GUIDE.md   ← File ini
```

---

## Development Notes

### Component Structure
```
AdminDashboard
├── Mobile Header
├── Sidebar Navigation
├── Top Bar
└── Main Content
    ├── Dashboard Page
    ├── Transactions Page
    ├── Users Page
    ├── Products Page
    ├── Analytics Page
    └── Settings Page
```

### Mock Data
Semua data di admin dashboard adalah mock data untuk demonstrasi. Untuk integration dengan backend:

1. **API Endpoints yang dibutuhkan:**
   - `GET /api/admin/dashboard/stats` → Get statistik overview
   - `GET /api/admin/transactions` → Get daftar transaksi
   - `GET /api/admin/users` → Get daftar pengguna
   - `GET /api/admin/products` → Get daftar produk
   - `GET /api/admin/analytics` → Get data analytics

2. **State Management:**
   - Gunakan Context API atau Redux untuk global state
   - Fetch data dari backend saat component mount
   - Implement error handling & loading states

---

## Next Steps

### 1. Backend Integration
- Implement admin authentication di backend
- Create API endpoints untuk data CRUD
- Setup database models untuk admin data

### 2. Enhanced Features
- Real-time notifications
- Advanced filtering & sorting
- Data export (PDF, CSV)
- Scheduled reports
- Webhook integration

### 3. Security
- Implement 2FA untuk admin
- Add audit logging
- Setup IP whitelist
- Rate limiting untuk admin APIs

### 4. Performance
- Implement data pagination
- Add caching strategy
- Optimize database queries
- Setup CDN untuk static assets

---

## Support

Untuk pertanyaan atau issues, hubungi:
- **Email:** support@gamepay.com
- **Docs:** [Admin Dashboard Docs]
- **Issue Tracker:** [GitHub Issues]

---

**Created:** March 2026  
**Version:** 1.0.0  
**License:** MIT
