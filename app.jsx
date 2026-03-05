import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AdminDashboard from './AdminDashboard';
import { 
  Gamepad2, 
  History, 
  User, 
  ChevronRight, 
  Smartphone,
  Trophy,
  Zap,
  Wallet, 
  QrCode,
  Bell,
  ArrowUpRight,
  PlusCircle,
  Eye,
  EyeOff,
  Send,
  Globe,
  Tv,
  Lightbulb,
  CreditCard,
  ShoppingBag,
  MoreHorizontal,
  Home,
  ArrowLeft,
  Coins,
  ShieldCheck,
  Settings,
  LogOut,
  HelpCircle,
  CheckCircle,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
  CreditCard as CardIcon,
  BarChart3
} from 'lucide-react';

/**
 * Komponen Utama Aplikasi GamePay
 * Fitur: Splash Screen, Login Eksklusif dengan Google, Beranda, Riwayat, Dompet, dan Profil.
 */
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showBalance, setShowBalance] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const [authState, setAuthState] = useState('login'); // 'login', 'authenticated'
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: '',
    sub: ''
  });

  // Admin emails list (dapat disesuaikan dengan backend)
  const ADMIN_EMAILS = [
    'admin@gamepay.com',
    'jagres@gmail.com',
    'abdullahrosid102@gmail.com' // Admin user
  ];

  // Efek Splash Screen selama 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle Google Login dengan Real Token
  const handleGoogleLoginSuccess = (credentialResponse) => {
    setIsLoggingIn(true);
    try {
      // Decode JWT token untuk mendapatkan user info
      const credential = credentialResponse.credential;
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      
      // Simpan user data
      setUserData({
        name: decodedToken.name,
        email: decodedToken.email,
        image: decodedToken.picture,
        sub: decodedToken.sub
      });

      // Cek apakah user adalah admin
      const adminStatus = ADMIN_EMAILS.includes(decodedToken.email);
      setIsAdmin(adminStatus);

      // Simulasi delay untuk proses auth
      setTimeout(() => {
        setIsLoggingIn(false);
        setAuthState('authenticated');
        // Jika admin, langsung ke admin dashboard
        if (adminStatus) {
          setActiveTab('admin-dashboard');
        }
      }, 1500);
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsLoggingIn(false);
      alert('Login gagal. Silakan coba lagi.');
    }
  };

  const handleGoogleLoginError = () => {
    setIsLoggingIn(false);
    alert('Login dengan Google gagal. Silakan coba lagi.');
  };

  // Data untuk 5 Banner Slide
  const promoBanners = [
    { id: 1, title: 'Cashback 80%', subtitle: 'Topup Game Favorit', color: 'bg-indigo-600', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Promo Merdeka', subtitle: 'Diskon Paket Data', color: 'bg-red-600', img: 'https://images.unsplash.com/photo-1562813733-2a7b69f03221?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Flash Sale', subtitle: 'Token Listrik Murah', color: 'bg-yellow-500', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Weekend Deal', subtitle: 'Voucher Google Play', color: 'bg-emerald-600', img: 'https://images.unsplash.com/photo-1614680376593-902f74cc0d41?auto=format&fit=crop&q=80&w=600' },
    { id: 5, title: 'New User Bonus', subtitle: 'Saldo Gratis Rp10rb', color: 'bg-blue-600', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600' },
  ];

  // Auto-slide logic
  useEffect(() => {
    if (authState === 'authenticated') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promoBanners.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [authState]);

  const mainMenus = [
    { icon: <Gamepad2 size={22} />, label: 'Topup Game', color: 'text-emerald-600' },
    { icon: <Smartphone size={22} />, label: 'Pulsa', color: 'text-blue-500' },
    { icon: <Globe size={22} />, label: 'Paket Data', color: 'text-cyan-500' },
    { icon: <Lightbulb size={22} />, label: 'Listrik PLN', color: 'text-yellow-500' },
    { icon: <Tv size={22} />, label: 'TV Kabel', color: 'text-red-500' },
    { icon: <CreditCard size={22} />, label: 'Angsuran', color: 'text-indigo-500' },
    { icon: <ShoppingBag size={22} />, label: 'Belanja', color: 'text-pink-500' },
    { icon: <MoreHorizontal size={22} />, label: 'Lainnya', color: 'text-slate-400' },
  ];

  // Render Splash Screen
  if (isSplashScreen) {
    return (
      <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="relative flex flex-col items-center animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mb-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-50 opacity-20 animate-pulse"></div>
             <Zap size={48} className="text-emerald-600 relative z-10 animate-bounce" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black tracking-[0.2em] uppercase mb-2">GamePay</h1>
          <p className="text-emerald-100 text-sm font-medium tracking-widest uppercase opacity-80">Topup Game Terpercaya</p>
          <div className="mt-12 flex flex-col items-center gap-4 w-48">
            <div className="h-1 w-full bg-emerald-700/50 rounded-full overflow-hidden">
              <div className="h-full bg-white w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Memuat Data...</span>
          </div>
        </div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
          @keyframes blob { 0% { transform: scale(1); } 33% { transform: scale(1.1); } 66% { transform: scale(0.9); } 100% { transform: scale(1); } }
          .animation-delay-2000 { animation-delay: 2s; }
          .animate-blob { animation: blob 7s infinite; }
        `}} />
      </div>
    );
  }

  // Render Login Screen (Simplified to Google Only)
  if (authState === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col px-8 justify-center animate-in fade-in duration-500">
        <div className="mb-12 text-center">
          <div className="inline-flex p-5 bg-emerald-50 rounded-[2.5rem] text-emerald-600 mb-8 shadow-inner">
            <Zap size={48} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">GamePay</h2>
          <p className="text-slate-400 text-base font-medium mt-3 px-4">Akses instan ke semua kebutuhan gaming Anda dalam satu ketukan.</p>
        </div>

        <div className="space-y-6">
          {/* Tombol Login Google dengan React OAuth */}
          <div className="w-full flex justify-center">
            {isLoggingIn ? (
              <div className="w-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses Login...</span>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                theme="outline"
                size="large"
                text="signin_with"
                width="320"
              />
            )}
          </div>
          
          <div className="text-center px-10">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Dengan masuk, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi kami.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Authenticated App
  if (authState === 'authenticated') {
    // Jika admin dan view admin-dashboard, tampilkan AdminDashboard
    if (isAdmin && activeTab === 'admin-dashboard') {
      return (
        <AdminDashboard 
          userData={userData} 
          onLogout={() => {
            setAuthState('login');
            setIsAdmin(false);
            setActiveTab('home');
          }}
          onBackToUser={() => setActiveTab('profile')}
        />
      );
    }

    // Jika user bukan admin atau admin view normal, tampilkan app normal
    return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans select-none overflow-x-hidden animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      {activeTab === 'home' && (
        <header className="bg-emerald-600 text-white relative rounded-b-[2.5rem] overflow-hidden">
          <div className="sticky top-0 z-50 bg-emerald-600 px-5 pt-6 pb-4 shadow-md shadow-emerald-700/10">
            <div className="flex justify-between items-center relative">
              <div className="flex items-center gap-3 bg-white/10 p-1.5 pr-4 rounded-full backdrop-blur-md border border-white/20">
                <div className="bg-white text-emerald-600 p-2 rounded-full shadow-sm">
                  <Zap size={18} fill="currentColor" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight">
                    {showBalance ? 'Rp 2.450.000' : 'Rp ÔÇóÔÇóÔÇóÔÇóÔÇóÔÇóÔÇóÔÇó'}
                  </span>
                  <button onClick={() => setShowBalance(!showBalance)} className="hover:text-emerald-200">
                    {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-[0.2em] uppercase">GamePay</h1>
                <div className="bg-white/10 p-2 rounded-full">
                  <Bell size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-6">
            <div className="mt-4 grid grid-cols-4 gap-2 relative z-10">
              {[
                { icon: <PlusCircle size={20} />, label: 'Isi Saldo' },
                { icon: <Send size={20} />, label: 'Kirim' },
                { icon: <Smartphone size={20} />, label: 'Pulsa' },
                { icon: <Globe size={20} />, label: 'Data' }
              ].map((item, idx) => (
                <button key={idx} className="flex flex-col items-center gap-2 group active:scale-95 transition-all">
                  <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 group-hover:bg-white/25 transition-colors shadow-sm text-white">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-32 bg-emerald-700/40 border-t border-white/10 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <h3 className="text-lg font-black leading-tight text-white drop-shadow-md italic uppercase tracking-tighter">
                Solusi Topup<br/>Tercepat & Termurah
              </h3>
            </div>
          </div>
        </header>
      )}

      {activeTab === 'history' && (
        <header className="sticky top-0 z-50 bg-emerald-600 px-5 py-4 shadow-lg shadow-emerald-900/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">Aktivitas</h2>
          </div>
        </header>
      )}

      {activeTab === 'wallet' && (
        <header className="sticky top-0 z-50 bg-emerald-600 px-6 py-5 shadow-lg shadow-emerald-900/10">
          <h2 className="text-lg font-black text-white tracking-widest uppercase text-center">Dompet Saya</h2>
        </header>
      )}

      {activeTab === 'profile' && (
        <header className="bg-white px-6 pt-8 pb-6 border-b border-slate-100 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={userData.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                  alt="User Profile" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 p-0.5"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle size={10} fill="currentColor" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">{userData.name || 'User'}</h2>
                  <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 active:bg-slate-200 cursor-pointer">
                    <QrCode size={18} />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-0.5 tracking-wider uppercase">{userData.email}</p>
              </div>
            </div>
            <button className="bg-slate-50 p-2.5 rounded-xl text-slate-400">
              <Bell size={20} />
            </button>
          </div>
        </header>
      )}

      {/* KONTEN UTAMA */}
      <main className={`max-w-md mx-auto px-5 pb-40 relative z-30 ${activeTab === 'home' ? '-mt-8' : 'mt-4'}`}>
        
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-[1.25rem] shadow-xl shadow-slate-200/40 p-5 border border-slate-100 grid grid-cols-4 gap-y-6 gap-x-2">
              {mainMenus.map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-2 active:scale-90 transition-all">
                  <div className={`p-1 ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative group">
              <div className="overflow-hidden rounded-[1.5rem] shadow-lg shadow-slate-200/50 aspect-[21/9] bg-white border border-slate-100">
                <div 
                  className="flex transition-transform duration-700 ease-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {promoBanners.map((banner) => (
                    <div key={banner.id} className="min-w-full h-full relative overflow-hidden">
                      <img src={banner.img} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      <div className={`absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex flex-col justify-center px-6`}>
                        <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Promo Khusus</span>
                        <h4 className="text-white text-lg font-black leading-tight">{banner.title}</h4>
                        <p className="text-white/80 text-[10px] font-medium mt-1 uppercase tracking-wider">{banner.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                    <div className="flex gap-3 items-center">
                      <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                        <ArrowUpRight size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-800">Diamond MLBB 250</p>
                        <p className="text-[10px] text-slate-400">Hari ini ÔÇó 10:30</p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600 text-sm">Rp 75.000</p>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="relative overflow-hidden bg-emerald-600 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-200">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
                <Wallet size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                      <Zap size={16} fill="white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Saldo Utama</span>
                  </div>
                  <PlusCircle size={24} className="opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium opacity-70">Total Saldo Aktif</p>
                  <h3 className="text-3xl font-black tracking-tight">Rp 2.450.000</h3>
                </div>
                <div className="mt-8 flex justify-between items-end">
                   <div className="text-[10px] font-mono tracking-widest opacity-50 uppercase">Member Since 2024</div>
                   <div className="bg-white text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Verified</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              <div className="p-4 bg-emerald-50/50">
                <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1 px-1">Akun Saya</h3>
              </div>
              {isAdmin && (
                <button 
                  onClick={() => setActiveTab('admin-dashboard')}
                  className="w-full flex items-center justify-between p-5 hover:bg-emerald-50 transition-colors group text-left bg-emerald-50/50 border-b border-emerald-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-2xl bg-white border border-emerald-200 shadow-sm text-emerald-600">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-700">Admin Dashboard</p>
                      <p className="text-[10px] text-emerald-600 font-medium">Kelola aplikasi & data</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-emerald-500 group-hover:text-emerald-700 transition-colors" />
                </button>
              )}
              {[
                { icon: <ShieldCheck size={20} />, label: 'Keamanan Akun', sub: 'PIN, Password, Biometrik', color: 'text-blue-500' },
                { icon: <CardIcon size={20} />, label: 'Metode Pembayaran', sub: 'Kartu Debit/Kredit, E-Wallet', color: 'text-purple-500' },
                { icon: <Trophy size={20} />, label: 'Level Member', sub: 'Cek keuntungan tier kamu', color: 'text-amber-500' },
                { icon: <HelpCircle size={20} />, label: 'Pusat Bantuan', sub: 'CS 24/7 Fast Response', color: 'text-indigo-500' },
                { icon: <Settings size={20} />, label: 'Pengaturan Aplikasi', sub: 'Notifikasi, Bahasa, Tema', color: 'text-slate-500' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group text-left">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))}
              <button 
                onClick={() => {
                  setAuthState('login');
                  setActiveTab('home');
                }}
                className="w-full flex items-center gap-4 p-5 text-red-500 hover:bg-red-50 transition-colors"
              >
                 <div className="p-2.5 rounded-2xl bg-white border border-red-100 shadow-sm">
                    <LogOut size={20} />
                 </div>
                 <span className="text-sm font-bold">Keluar Aplikasi</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* NAVIGASI BAWAH */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8">
        <nav className="max-w-md mx-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-[2.5rem] flex items-center justify-between p-2 relative">
          {[
            { id: 'home', icon: <Home size={22} />, label: 'Beranda' },
            { id: 'history', icon: <History size={22} />, label: 'Riwayat' },
            { id: 'scan', icon: <QrCode size={28} />, label: 'Scan', special: true },
            { id: 'wallet', icon: <Wallet size={22} />, label: 'Dompet' },
            { id: 'profile', icon: <User size={22} />, label: 'Profil' }
          ].map((item) => (
            item.special ? (
              <div key={item.id} className="flex-shrink-0 px-2 -mt-10 mb-2 relative z-50">
                <button className="bg-emerald-600 text-white p-4 rounded-3xl shadow-lg shadow-emerald-200 border-4 border-white active:scale-90 transition-transform flex items-center justify-center">
                  {item.icon}
                </button>
              </div>
            ) : (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`flex-1 flex flex-col items-center py-2 transition-colors ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`}
              >
                {item.icon}
                <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
              </button>
            )
          ))}
        </nav>
      </div>
    </div>
    );
  }
};

export default App;
