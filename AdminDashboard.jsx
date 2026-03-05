import React, { useState } from 'react';
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
  PieChart,
  Package
} from 'lucide-react';

/**
 * Admin Dashboard untuk GamePay
 * Fitur: Overview, Transaksi, Pengguna, Produk Layanan
 */
const AdminDashboard = ({ userData, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const dashboardStats = [
    { label: 'Total Transaksi', value: 'Rp 45.2M', change: '+12.5%', icon: <DollarSign size={24} className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Total Pengguna', value: '8,245', change: '+8.2%', icon: <Users size={24} className="text-emerald-500" />, color: 'bg-emerald-50' },
    { label: 'Transaksi Hari Ini', value: '1,234', change: '+23.1%', icon: <ShoppingCart size={24} className="text-amber-500" />, color: 'bg-amber-50' },
    { label: 'Revenue', value: 'Rp 2.3M', change: '+5.4%', icon: <TrendingUp size={24} className="text-purple-500" />, color: 'bg-purple-50' },
  ];

  const recentTransactions = [
    { id: 1, user: 'Andri Wijaya', product: 'Diamond MLBB 250', amount: 'Rp 75.000', status: 'Sukses', time: '10 menit lalu', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { id: 2, user: 'Siti Nurhaliza', product: 'Pulsa 50rb', amount: 'Rp 50.000', status: 'Sukses', time: '25 menit lalu', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, user: 'Bambang Sudrajat', product: 'Paket Data 10GB', amount: 'Rp 100.000', status: 'Pending', time: '1 jam lalu', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
    { id: 4, user: 'Rini Cahyani', product: 'Token Listrik 200rb', amount: 'Rp 200.000', status: 'Sukses', time: '2 jam lalu', image: 'https://images.unsplash.com/photo-1516611590645-c69f49bbd0cd?auto=format&fit=crop&q=80&w=100' },
    { id: 5, user: 'Hendra Kusuma', product: 'Topup Game PUBG', amount: 'Rp 150.000', status: 'Gagal', time: '3 jam lalu', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
  ];

  const allUsers = [
    { id: 1, name: 'Andri Wijaya', email: 'andri@gmail.com', phone: '081234567890', joinDate: '15 Nov 2024', status: 'Aktif', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@gmail.com', phone: '082345678901', joinDate: '10 Nov 2024', status: 'Aktif', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Bambang Sudrajat', email: 'bambang@gmail.com', phone: '083456789012', joinDate: '05 Nov 2024', status: 'Aktif', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
    { id: 4, name: 'Rini Cahyani', email: 'rini@gmail.com', phone: '084567890123', joinDate: '01 Nov 2024', status: 'Aktif', image: 'https://images.unsplash.com/photo-1516611590645-c69f49bbd0cd?auto=format&fit=crop&q=80&w=100' },
  ];

  const products = [
    { id: 1, name: 'Diamond MLBB', category: 'Game', price: '75.000 - 750.000', stock: 'Unlimited', commission: '5%' },
    { id: 2, name: 'Pulsa Telkomsel', category: 'Pulsa', price: '10.000 - 500.000', stock: 'Unlimited', commission: '2%' },
    { id: 3, name: 'Paket Data', category: 'Data', price: '25.000 - 200.000', stock: 'Unlimited', commission: '3%' },
    { id: 4, name: 'Token Listrik PLN', category: 'Utilitas', price: '20.000 - 1.000.000', stock: 'Unlimited', commission: '1.5%' },
    { id: 5, name: 'TV Kabel', category: 'Hiburan', price: '50.000 - 300.000', stock: '500', commission: '2.5%' },
  ];

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransactions = recentTransactions.filter(tx =>
    tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sidebar Items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transaksi', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Pengguna', icon: <Users size={20} /> },
    { id: 'products', label: 'Produk', icon: <Package size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart size={20} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-800 text-white px-4 py-4 flex justify-between items-center z-40">
        <h1 className="font-black text-lg">GamePay Admin</h1>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-screen bg-slate-800 text-white w-64 flex flex-col transition-all duration-300 z-50
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-700 hidden md:block">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-emerald-400">Game</span>Pay Admin
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 mt-16 md:mt-0">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeMenu === item.id
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-3">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg">
            <img
              src={userData?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
              alt="Admin"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{userData?.name || 'Admin'}</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pt-20 md:pt-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {sidebarItems.find(item => item.id === activeMenu)?.label}
            </h2>
            <p className="text-sm text-slate-400">Kelola data dan layanan GamePay</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <Bell size={20} />
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
              <Download size={16} className="inline mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {/* DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                      {stat.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                    <p className="text-sm font-semibold text-emerald-600">{stat.change} dari bulan lalu</p>
                  </div>
                ))}
              </div>

              {/* Charts & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Trend Transaksi (7 Hari)</h3>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-end justify-around gap-2 p-4">
                    {[45, 52, 48, 61, 55, 72, 68].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-t-lg transition-all"
                        style={{ height: `${(height / 72) * 100}%`, minHeight: '30px' }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Status Transaksi</h3>
                  <div className="space-y-3">
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Transaksi Terbaru</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 font-bold text-slate-600">Pengguna</th>
                        <th className="text-left py-3 font-bold text-slate-600">Produk</th>
                        <th className="text-right py-3 font-bold text-slate-600">Nominal</th>
                        <th className="text-center py-3 font-bold text-slate-600">Status</th>
                        <th className="text-left py-3 font-bold text-slate-600">Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.slice(0, 5).map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={tx.image} alt={tx.user} className="w-8 h-8 rounded-lg object-cover" />
                              <span className="font-medium text-slate-800">{tx.user}</span>
                            </div>
                          </td>
                          <td className="py-3 text-slate-600">{tx.product}</td>
                          <td className="py-3 text-right font-bold text-slate-800">{tx.amount}</td>
                          <td className="py-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              tx.status === 'Sukses' ? 'bg-emerald-100 text-emerald-700' :
                              tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-600">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TRANSACTIONS */}
          {activeMenu === 'transactions' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2 font-medium">
                  <Filter size={18} />
                  Filter
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Pengguna</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Produk</th>
                        <th className="text-right px-6 py-4 font-bold text-slate-600">Nominal</th>
                        <th className="text-center px-6 py-4 font-bold text-slate-600">Status</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Waktu</th>
                        <th className="text-center px-6 py-4 font-bold text-slate-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={tx.image} alt={tx.user} className="w-8 h-8 rounded-lg object-cover" />
                              <span className="font-medium text-slate-800">{tx.user}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{tx.product}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-800">{tx.amount}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              tx.status === 'Sukses' ? 'bg-emerald-100 text-emerald-700' :
                              tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{tx.time}</td>
                          <td className="px-6 py-4 text-center">
                            <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors inline-block">
                              <MoreVertical size={16} className="text-slate-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeMenu === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 font-medium">
                  <PlusCircle size={18} />
                  Tambah Pengguna
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <img src={user.image} alt={user.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-800">{user.name}</h4>
                          <p className="text-sm text-slate-500">{user.email}</p>
                          <p className="text-xs text-slate-400 mt-1">{user.phone}</p>
                        </div>
                      </div>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-slate-400" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500">Bergabung</p>
                        <p className="text-sm font-bold text-slate-800">{user.joinDate}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeMenu === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 font-medium">
                  <PlusCircle size={18} />
                  Tambah Produk
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Nama Produk</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Kategori</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Harga</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Stok</th>
                        <th className="text-left px-6 py-4 font-bold text-slate-600">Komisi</th>
                        <th className="text-center px-6 py-4 font-bold text-slate-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                          <td className="px-6 py-4 text-slate-600">{product.category}</td>
                          <td className="px-6 py-4 text-slate-600">{product.price}</td>
                          <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{product.stock}</span></td>
                          <td className="px-6 py-4 font-bold text-slate-800">{product.commission}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <Edit size={16} />
                              </button>
                              <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeMenu === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue per Kategori</h3>
                  <div className="space-y-4">
                    {[
                      { category: 'Game', percentage: 35, value: 'Rp 15.8M' },
                      { category: 'Pulsa', percentage: 25, value: 'Rp 11.3M' },
                      { category: 'Data', percentage: 20, value: 'Rp 9.0M' },
                      { category: 'Listrik', percentage: 15, value: 'Rp 6.8M' },
                      { category: 'TV Kabel', percentage: 5, value: 'Rp 2.3M' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-slate-700">{item.category}</span>
                          <span className="font-bold text-slate-800">{item.value}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Top Produk</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Diamond MLBB 250', sales: '1,245 terjual', revenue: 'Rp 9.3M' },
                      { name: 'Pulsa Telkomsel 50rb', sales: '892 terjual', revenue: 'Rp 4.5M' },
                      { name: 'Paket Data 10GB', sales: '756 terjual', revenue: 'Rp 7.5M' },
                      { name: 'Token Listrik 200rb', sales: '432 terjual', revenue: 'Rp 8.6M' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.sales}</p>
                        </div>
                        <p className="font-bold text-emerald-600">{item.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Traffic & Konversi</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">45.2K</p>
                    <p className="text-xs text-slate-500 mt-1">Pengunjung</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">18.2%</p>
                    <p className="text-xs text-slate-500 mt-1">Konversi</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">8.5K</p>
                    <p className="text-xs text-slate-500 mt-1">Transaksi</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">Rp 45.2M</p>
                    <p className="text-xs text-slate-500 mt-1">Total Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeMenu === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Profil Akun</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Admin</label>
                      <input type="text" defaultValue={userData?.name || 'Admin'} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                      <input type="email" defaultValue={userData?.email || 'admin@gamepay.com'} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500" />
                    </div>
                    <button className="w-full mt-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors">
                      Simpan Perubahan
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Keamanan</h3>
                  <div className="space-y-4">
                    <button className="w-full px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                      Ubah Password
                    </button>
                    <button className="w-full px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                      Aktifkan 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Pengaturan Sistem</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-bold text-slate-800">Notifikasi Email</p>
                      <p className="text-sm text-slate-500">Terima notifikasi transaksi penting</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-bold text-slate-800">Maintenance Mode</p>
                      <p className="text-sm text-slate-500">Nonaktifkan aplikasi untuk maintenance</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
