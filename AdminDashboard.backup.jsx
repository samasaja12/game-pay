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
  PieChart,
  Package,
  ShieldCheck,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';

/**
 * Admin Dashboard GamePay
 * Fitur: Sidebar Responsif (Slide-in), Ikon Hamburg, Dashboard Stats.
 * Fokus: Mobile Friendly & Transisi Kiri ke Kanan.
 */
const AdminDashboard = ({ userData, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data Produk (Sesuai Versi Terakhir)
  const [productList, setProductList] = useState([
    { id: 1, name: 'Diamond MLBB', category: 'Game', price: '75.000 - 750.000', stock: 'Unlimited', commission: '5%' },
    { id: 2, name: 'Pulsa Telkomsel', category: 'Pulsa', price: '10.000 - 500.000', stock: 'Unlimited', commission: '2%' },
    { id: 3, name: 'Paket Data', category: 'Data', price: '25.000 - 200.000', stock: 'Unlimited', commission: '3%' },
    { id: 4, name: 'Token Listrik PLN', category: 'Utilitas', price: '20.000 - 1.000.000', stock: 'Unlimited', commission: '1.5%' },
    { id: 5, name: 'TV Kabel', category: 'Hiburan', price: '50.000 - 300.000', stock: '500', commission: '2.5%' },
  ]);

  // Statistik Dashboard
  const dashboardStats = [
    { label: 'Total Transaksi', value: 'Rp 45.2M', change: '+12.5%', icon: <DollarSign size={24} className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Total Pengguna', value: '8,245', change: '+8.2%', icon: <Users size={24} className="text-emerald-500" />, color: 'bg-emerald-50' },
    { label: 'Transaksi Hari Ini', value: '1,234', change: '+23.1%', icon: <ShoppingCart size={24} className="text-amber-500" />, color: 'bg-amber-50' },
    { label: 'Revenue', value: 'Rp 2.3M', change: '+5.4%', icon: <TrendingUp size={24} className="text-purple-500" />, color: 'bg-purple-50' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transaksi', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Pengguna', icon: <Users size={20} /> },
    { id: 'products', label: 'Produk', icon: <Package size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart size={20} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row overflow-x-hidden">
      
      {/* --- OVERLAY MOBILE --- */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      ></div>

      {/* --- SIDEBAR (Transisi Kiri ke Kanan) --- */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen bg-slate-800 text-white w-72 flex flex-col z-[70] transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter">
            <span className="text-emerald-400">Game</span>Pay <span className="text-slate-400 font-light text-sm ml-1">Admin</span>
          </h1>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-3 bg-slate-800/50">
          <div className="flex items-center gap-3 px-3 py-3 bg-slate-700/30 rounded-xl border border-slate-700">
            <img
              src={userData?.image}
              alt="Admin"
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-emerald-500/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white">{userData?.name}</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold"
          >
            <LogOut size={20} />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* --- AREA KONTEN UTAMA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* --- HEADER DENGAN ICON HAMBURG --- */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Tombol Hamburg untuk Mobile */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all active:scale-95"
            >
              <Menu size={22} />
            </button>
            
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-800 capitalize leading-tight">
                {sidebarItems.find(item => item.id === activeMenu)?.label}
              </h2>
              <div className="hidden sm:flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live System</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
            <img
              src={userData?.image}
              alt="Profile"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-emerald-500/20 sm:hidden"
            />
            <button className="hidden sm:flex px-4 py-2.5 bg-slate-800 text-white text-xs rounded-xl hover:bg-slate-700 transition-all font-black items-center gap-2 shadow-sm">
              <Download size={14} />
              Export
            </button>
          </div>
        </header>

        {/* --- AREA TAMPILAN DATA --- */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full pb-24">
          
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 md:space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {dashboardStats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
                      {stat.icon}
                    </div>
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{stat.value}</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <TrendingUp size={10} className="mr-1" /> {stat.change}
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart/Analytics Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-black text-slate-800">Trend Transaksi</h3>
                    <select className="bg-slate-50 text-[10px] font-black p-2 rounded-lg border-none focus:ring-0 uppercase tracking-tighter">
                      <option>7 Hari</option>
                      <option>30 Hari</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {[35, 62, 42, 85, 55, 75, 95].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                        <div 
                          className="w-full bg-emerald-500/10 hover:bg-emerald-500 rounded-t-xl transition-all duration-300 relative"
                          style={{ height: `${val}%` }}
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {val}k
                          </div>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">H-{6-i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 mb-6">Metode Bayar</h3>
                    <div className="space-y-5">
                      {[
                        { label: 'E-Wallet', val: 65, color: 'bg-blue-500' },
                        { label: 'Transfer Bank', val: 25, color: 'bg-emerald-500' },
                        { label: 'Retail', val: 10, color: 'bg-amber-500' }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase tracking-widest">
                            <span className="text-slate-500">{item.label}</span>
                            <span className="text-slate-800">{item.val}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500">
                        <ActivitySquare size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status Server</p>
                        <p className="text-xs font-black text-slate-700">99.9% Uptime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu !== 'dashboard' && (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center animate-in fade-in duration-500">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 {sidebarItems.find(i => i.id === activeMenu)?.icon}
               </div>
               <h3 className="text-xl font-black text-slate-800 mb-2">Modul {sidebarItems.find(i => i.id === activeMenu)?.label}</h3>
               <p className="text-slate-500 max-w-xs mx-auto text-sm">Sedang menyiapkan tampilan data untuk perangkat mobile Anda.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// --- Entry Point ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const mockUser = {
    name: 'Dimas Ardianto',
    email: 'dimas@gamepay.id',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl w-full max-w-md text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">GamePay Admin</h1>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-4.5 bg-emerald-500 text-white font-black rounded-2xl mt-4"
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard 
      userData={mockUser} 
      onLogout={() => setIsLoggedIn(false)} 
    />
  );
};

export default App;