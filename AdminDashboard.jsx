import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Wallet,
  TrendingUp,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  MoreVertical,
  PlusCircle,
  Trash2,
  Edit,
  Search,
  ChevronDown,
  ActivitySquare,
  DollarSign,
  User,
  Filter,
  Download,
  Bell,
  Home,
  ArrowLeft,
  PieChart,
  Package,
  Save
} from 'lucide-react';

/**
 * Admin Dashboard untuk GamePay
 * Mobile-first, fully responsive, integrated with main app
 */
const AdminDashboard = ({ userData, onLogout, onBackToUser }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBalance, setEditingBalance] = useState(false);
  const [adminBalance, setAdminBalance] = useState('Rp 2.450.000');
  const [balanceInput, setBalanceInput] = useState('2450000');

  // Mock Data
  const dashboardStats = [
    { label: 'Total Transaksi', value: 'Rp 45.2M', change: '+12.5%', icon: <DollarSign size={20} className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Total Pengguna', value: '8,245', change: '+8.2%', icon: <Users size={20} className="text-emerald-500" />, color: 'bg-emerald-50' },
    { label: 'Hari Ini', value: '1,234', change: '+23.1%', icon: <ShoppingCart size={20} className="text-amber-500" />, color: 'bg-amber-50' },
    { label: 'Revenue', value: 'Rp 2.3M', change: '+5.4%', icon: <TrendingUp size={20} className="text-purple-500" />, color: 'bg-purple-50' },
  ];

  const recentTransactions = [
    { id: 1, user: 'Andri Wijaya', product: 'Diamond MLBB', amount: 'Rp 75.000', status: 'Sukses', time: '10m', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { id: 2, user: 'Siti Nurhaliza', product: 'Pulsa 50rb', amount: 'Rp 50.000', status: 'Sukses', time: '25m', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, user: 'Bambang Sudrajat', product: 'Paket Data', amount: 'Rp 100.000', status: 'Pending', time: '1h', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
  ];

  const allUsers = [
    { id: 1, name: 'Andri Wijaya', email: 'andri@gmail.com', phone: '0812****7890', status: 'Aktif' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@gmail.com', phone: '0823****8901', status: 'Aktif' },
    { id: 3, name: 'Bambang Sudrajat', email: 'bambang@gmail.com', phone: '0834****9012', status: 'Aktif' },
    { id: 4, name: 'Rini Cahyani', email: 'rini@gmail.com', phone: '0845****0123', status: 'Aktif' },
  ];

  const products = [
    { id: 1, name: 'Diamond MLBB', category: 'Game', price: 'Rp 75K-750K', stock: 'Unlimited' },
    { id: 2, name: 'Pulsa Telkomsel', category: 'Pulsa', price: 'Rp 10K-500K', stock: 'Unlimited' },
    { id: 3, name: 'Paket Data', category: 'Data', price: 'Rp 25K-200K', stock: 'Unlimited' },
    { id: 4, name: 'Token Listrik', category: 'Utilitas', price: 'Rp 20K-1M', stock: 'Unlimited' },
  ];

  // Sidebar Items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transaksi', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Pengguna', icon: <Users size={20} /> },
    { id: 'products', label: 'Produk', icon: <Package size={20} /> },
    { id: 'account', label: 'Kelola Akun', icon: <User size={20} /> },
  ];

  const handleSaveBalance = () => {
    const numBalance = parseInt(balanceInput.replace(/\D/g, ''));
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(numBalance);
    setAdminBalance(formatted);
    setEditingBalance(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER - Mobile & Desktop */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Mobile Menu Button + Dashboard Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700"
            >
              {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black text-emerald-600">GamePay</h1>
              <p className="text-xs text-slate-400 md:block hidden">Admin Panel</p>
            </div>
          </div>

          {/* Right Side - Notifications & User */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg">
              <img 
                src={userData?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
                alt="Admin" 
                className="w-6 h-6 rounded-lg object-cover"
              />
              <span className="text-sm font-medium text-slate-700">{userData?.name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR - Mobile & Desktop */}
      <aside className={`
        fixed md:static top-16 left-0 h-[calc(100vh-64px)] bg-emerald-700 text-white w-64 transition-all duration-300 z-50
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto
      `}>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeMenu === item.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Back & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 space-y-2">
          <button
            onClick={onBackToUser}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-all font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to User View</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed md:hidden inset-0 bg-black/30 z-30 top-16"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="md:ml-64 mt-16 p-4 md:p-6 pb-20 md:pb-6">
        {/* Dashboard */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">Overview performa bisnis GamePay</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                  <p className="text-xs font-semibold text-emerald-600">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trend Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Trend 7 Hari</h3>
                <div className="h-48 bg-slate-50 rounded-lg flex items-end justify-around gap-2 p-4">
                  {[45, 52, 48, 61, 55, 72, 68].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-t-lg transition-all"
                      style={{ height: `${(height / 72) * 100}%`, minHeight: '30px' }}
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-600">Sukses</span>
                      <span className="text-sm font-bold text-emerald-600">85%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-600">Pending</span>
                      <span className="text-sm font-bold text-amber-600">10%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-600">Gagal</span>
                      <span className="text-sm font-bold text-red-600">5%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Transaksi Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 font-bold text-slate-600">Pengguna</th>
                      <th className="text-left py-3 font-bold text-slate-600 hidden sm:table-cell">Produk</th>
                      <th className="text-right py-3 font-bold text-slate-600">Nominal</th>
                      <th className="text-center py-3 font-bold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 font-medium text-slate-800">{tx.user}</td>
                        <td className="py-3 text-slate-600 hidden sm:table-cell">{tx.product}</td>
                        <td className="py-3 text-right font-bold text-slate-800">{tx.amount}</td>
                        <td className="py-3 text-center">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            tx.status === 'Sukses' ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Page */}
        {activeMenu === 'transactions' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Transaksi</h2>
              <p className="text-sm text-slate-500 mt-1">Kelola semua transaksi pengguna</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-bold text-slate-600">Pengguna</th>
                      <th className="text-left px-4 py-3 font-bold text-slate-600 hidden sm:table-cell">Produk</th>
                      <th className="text-right px-4 py-3 font-bold text-slate-600">Nominal</th>
                      <th className="text-center px-4 py-3 font-bold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{tx.user}</td>
                        <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{tx.product}</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-800">{tx.amount}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            tx.status === 'Sukses' ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Page */}
        {activeMenu === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Pengguna</h2>
              <p className="text-sm text-slate-500 mt-1">Kelola database pengguna</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allUsers.map((user) => (
                <div key={user.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-slate-800">{user.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{user.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Page */}
        {activeMenu === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Produk</h2>
              <p className="text-sm text-slate-500 mt-1">Kelola katalog produk</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-bold text-slate-600">Produk</th>
                      <th className="text-left px-4 py-3 font-bold text-slate-600 hidden sm:table-cell">Kategori</th>
                      <th className="text-left px-4 py-3 font-bold text-slate-600">Harga</th>
                      <th className="text-left px-4 py-3 font-bold text-slate-600">Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{product.name}</td>
                        <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{product.category}</td>
                        <td className="px-4 py-3 text-slate-600">{product.price}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {product.stock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Account Management Page */}
        {activeMenu === 'account' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">Kelola Akun</h2>
              <p className="text-sm text-slate-500 mt-1">Atur profil dan saldo admin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Admin Profile */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Profil Admin</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama</label>
                    <input 
                      type="text" 
                      defaultValue={userData?.name || 'Admin'} 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={userData?.email || 'admin@gamepay.com'} 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                  <button className="w-full px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors text-sm">
                    Simpan Perubahan
                  </button>
                </div>
              </div>

              {/* Saldo Editor */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Edit Saldo</h3>
                <div className="space-y-4">
                  {!editingBalance ? (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Saldo Saat Ini</label>
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <p className="text-2xl font-black text-emerald-600">{adminBalance}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setEditingBalance(true)}
                        className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit size={18} /> Edit Saldo
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Masukkan Angka (tanpa Rp)</label>
                        <input 
                          type="number" 
                          value={balanceInput}
                          onChange={(e) => setBalanceInput(e.target.value)}
                          placeholder="Contoh: 2450000"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleSaveBalance}
                          className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Save size={18} /> Simpan
                        </button>
                        <button 
                          onClick={() => setEditingBalance(false)}
                          className="flex-1 px-4 py-2.5 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 font-medium transition-colors text-sm"
                        >
                          Batal
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Keamanan</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors text-sm">
                  Ubah Password
                </button>
                <button className="w-full px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors text-sm">
                  Aktifkan 2FA
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
