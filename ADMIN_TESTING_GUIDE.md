# 🧪 Admin Dashboard Testing Guide

## Quick Start untuk Testing Admin Dashboard

### Method 1: Email Admin (Recommended)
1. Tambahkan email Anda ke `ADMIN_EMAILS` di `app.jsx`:
```javascript
// app.jsx ~ line 41
const ADMIN_EMAILS = [
  'admin@gamepay.com',
  'your-email@gmail.com' // ← Tambah email Anda di sini
];
```

2. Jalankan aplikasi:
```bash
npm run dev
```

3. Login dengan Google menggunakan email yang Anda daftarkan
4. Admin Dashboard akan otomatis ditampilkan

---

### Method 2: Development Console (Cepat)
Jika ingin test tanpa perlu edit email constant:

1. Jalankan aplikasi: `npm run dev`
2. Login dengan email apapun
3. Buka DevTools (F12 → Console tab)
4. Paste code ini:
```javascript
// Mode testing - hanya untuk development!
window.__ADMIN_TEST__ = true;
location.reload();
```

**PENTING:** Ini hanya untuk testing lokal. Jangan gunakan di production!

---

## Feature Testing Checklist

### ✅ Dashboard Page
- [ ] Statistik cards menampilkan data dengan benar
- [ ] Chart trend transaksi berfungsi
- [ ] Status transaksi bar chart muncul
- [ ] Recent transactions table terlihat
- [ ] Tombol "Export" dapat diklik
- [ ] Responsive di mobile view

### ✅ Transactions Page
- [ ] Search bar berfungsi mengfilter transaksi
- [ ] Filter button menampilkan opsi
- [ ] Status badge menunjukkan warna yang tepat
- [ ] More options menu berfungsi
- [ ] Scroll horizontal pada mobile

### ✅ Users Page  
- [ ] User cards menampilkan informasi lengkap
- [ ] Search user berfungsi
- [ ] Add user button dapat diklik
- [ ] User status badge muncul
- [ ] Responsive card layout

### ✅ Products Page
- [ ] Product table menampilkan semua data
- [ ] Edit/Delete buttons muncul
- [ ] Search produk berfungsi
- [ ] Add product button dapat diklik
- [ ] Kategori produk tersegmentasi

### ✅ Analytics Page
- [ ] Revenue by category chart muncul
- [ ] Top products list terlihat
- [ ] Traffic metrics menampilkan dengan benar
- [ ] Progress bars muncul dan akurat

### ✅ Settings Page
- [ ] Profile form dapat di-edit
- [ ] Change password button muncul
- [ ] 2FA toggle berfungsi
- [ ] System settings checkboxes berfungsi
- [ ] Save changes button dapat diklik

### ✅ Navigation
- [ ] Sidebar items active state bekerja
- [ ] Mobile hamburger menu berfungsi
- [ ] Top bar breadcrumb menampilkan page name
- [ ] Logout button berfungsi dengan benar
- [ ] Responsive layout di berbagai ukuran screen

---

## Mock Data Reference

### Dashboard Stats
```javascript
{
  label: 'Total Transaksi',
  value: 'Rp 45.2M',
  change: '+12.5%',
  icon: <DollarSign />,
  color: 'bg-blue-50'
}
```

### Transaction Example
```javascript
{
  id: 1,
  user: 'Andri Wijaya',
  product: 'Diamond MLBB 250',
  amount: 'Rp 75.000',
  status: 'Sukses',        // 'Sukses', 'Pending', 'Gagal'
  time: '10 menit lalu',
  image: 'url...'
}
```

### User Example
```javascript
{
  id: 1,
  name: 'Andri Wijaya',
  email: 'andri@gmail.com',
  phone: '081234567890',
  joinDate: '15 Nov 2024',
  status: 'Aktif',          // 'Aktif', 'Inactive'
  image: 'url...'
}
```

### Product Example
```javascript
{
  id: 1,
  name: 'Diamond MLBB',
  category: 'Game',         // 'Game', 'Pulsa', 'Data', 'Utilitas', 'Hiburan'
  price: '75.000 - 750.000',
  stock: 'Unlimited',
  commission: '5%'
}
```

---

## Browser DevTools Testing

### Check Admin Status
```javascript
// Di console
sessionStorage.getItem('adminMode');
localStorage.getItem('adminMode');
```

### Simulate Error
```javascript
// Testing error handling
console.error('Simulated error');
```

### Performance Check
```javascript
// Check component render time
performance.mark('admin-start');
// ... do action ...
performance.mark('admin-end');
performance.measure('admin', 'admin-start', 'admin-end');
performance.getEntriesByName('admin');
```

---

## Mobile Testing

### Responsive Breakpoints
- **Mobile:** < 768px (md)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Test with Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different devices:
   - iPhone 12
   - iPad
   - Galaxy S21
   - Custom resolution

### Common Mobile Issues
- [ ] Sidebar hamburger menu work properly
- [ ] Tables scroll horizontally
- [ ] Cards stack vertically
- [ ] Touch targets are >= 44x44px
- [ ] No horizontal scroll needed

---

## Performance Testing

### Lighthouse Audit
1. Open DevTools → Lighthouse
2. Run audit untuk:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Optimization Tips
```javascript
// Use React.memo untuk memoization
const StatCard = React.memo(({ stat }) => (
  // component
));

// Use useCallback untuk event handlers
const handleSearch = useCallback((query) => {
  // filter logic
}, []);

// Use useMemo untuk expensive calculations
const filteredData = useMemo(() => {
  return data.filter(item => item.includes(searchQuery));
}, [data, searchQuery]);
```

---

## Debugging Tips

### Console Logging
```javascript
// Jika perlu debug, tambah console.log di AdminDashboard.jsx
const AdminDashboard = ({ userData, onLogout }) => {
  console.log('AdminDashboard mounted with user:', userData);
  console.log('Admin mode:', true);
  
  // ...
};
```

### React DevTools Extension
1. Install React DevTools di browser
2. Inspect AdminDashboard component
3. Check props & state changes
4. Profile component rendering

### Network Tab
1. Open DevTools → Network
2. Check untuk:
   - API calls (akan ada saat backend integrated)
   - Image loading size
   - CSS/JS bundle sizes
   - Slow requests

---

## Common Issues & Solutions

### Issue: Admin Dashboard tidak muncul
```javascript
// Check di console
console.log('Is authenticated:', authState === 'authenticated');
console.log('Is admin:', isAdmin);
console.log('User email:', userData.email);
console.log('Admin emails:', ADMIN_EMAILS);
```

### Issue: Styling tidak benar
```bash
# Rebuild TailwindCSS
npm run build

# Atau clear cache
rm -rf .tailwindcss-cache
npm run dev
```

### Issue: Search tidak berfungsi
- Check `searchQuery` state update
- Verify filter logic: `includes()` case-sensitive
- Add `toLowerCase()` untuk case-insensitive search

### Issue: Mobile menu stuck
- Clear localStorage
- Check `isMobileSidebarOpen` state
- Verify event handlers di button

---

## Data Integration Checklist

Sebelum production, implementasikan:

- [ ] Backend authentication API
- [ ] Database models untuk data
- [ ] API endpoints untuk CRUD
- [ ] Error handling & validation
- [ ] Loading spinners
- [ ] Pagination untuk large datasets
- [ ] Real-time updates (WebSocket/Polling)
- [ ] Data caching strategy
- [ ] Audit logging untuk admin actions
- [ ] Role-based permissions

---

## Deployment Checklist

1. **Before Deploy:**
   - [ ] Remove test/debug code
   - [ ] Set production API endpoints
   - [ ] Enable 2FA security
   - [ ] Setup HTTPS
   - [ ] Configure CORS properly
   - [ ] Setup error monitoring (Sentry)
   - [ ] Setup analytics (Google Analytics)

2. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://api.gamepay.com
   VITE_GOOGLE_CLIENT_ID=your-client-id
   VITE_ENVIRONMENT=production
   ```

3. **Performance:**
   - [ ] Enable gzip compression
   - [ ] Setup CDN for assets
   - [ ] Implement caching headers
   - [ ] Minify & bundle optimization

---

## Support & Documentation

- **GitHub Issues:** [Report bugs]
- **Documentation:** See `ADMIN_DASHBOARD_GUIDE.md`
- **Code Comments:** Check JSDoc comments in AdminDashboard.jsx

---

**Last Updated:** March 2026
**Admin Dashboard Version:** 1.0.0
