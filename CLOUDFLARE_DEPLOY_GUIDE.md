# Setup Cloudflare Pages - GamePay

## 📋 Prerequisites
- Akun Cloudflare (gratis)
- GitHub repository dengan kode GamePay
- Google Client ID sudah setup

## 🚀 Langkah Deploy ke Cloudflare Pages

### 1. Connect GitHub Repository ke Cloudflare
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **Pages** di sidebar
3. Klik **Create a project** > **Connect to Git**
4. Authorize Cloudflare dengan GitHub account
5. Pilih repository: `samasaja12/game-pay`
6. Klik **Begin setup**

### 2. Build Configuration
Isikan dengan settings ini:

**Framework preset:** None (atau Vite jika tersedia)

**Build command:** 
```bash
npm run build
```

**Build output directory:** 
```
dist
```

**Root directory (advanced):** 
```
/
```

### 3. Environment Variables
Di section **Environment variables**, tambahkan:

**Production:**
- `VITE_GOOGLE_CLIENT_ID` = `772465250468-88ded9nf6f44brcmq36gj6ljcu5isud0.apps.googleusercontent.com`

**Preview:**
- `VITE_GOOGLE_CLIENT_ID` = `772465250468-88ded9nf6f44brcmq36gj6ljcu5isud0.apps.googleusercontent.com`

### 4. Deploy
Klik tombol **Deploy site**

Cloudflare akan:
- Build dari GitHub
- Generate URL: `gamepay-xxx.pages.dev` (akan langsung aktif)
- Setup SSL/TLS gratis

### 5. Custom Domain (Opsional)
1. Di project settings > **Custom domains**
2. Klik **Setup custom domain**
3. Masukkan domain Anda (misalnya: `gamepay.id`)
4. Follow instruksi DNS yang diberikan Cloudflare
5. Tunggu propagasi DNS (5-48 jam)

## ⚙️ Troubleshooting

### Error: Build failed
- Pastikan `npm run build` berhasil di local
- Check apakah ada syntax errors (run `npm run build` locally)
- Pastikan semua dependencies terinstall

### Error: Pages not loading
- Clear browser cache (Ctrl+Shift+Del)
- Check di DevTools > Network tab (apakah file loaded?)
- Pastikan `base: './'` di vite.config.js

### Google OAuth Error
- Pastikan Google Client ID sudah diset di environment variables
- Add Cloudflare Pages URL ke Google OAuth authorized origins
- Di [Google Cloud Console](https://console.cloud.google.com/):
  - Authorized JavaScript origins: `https://gamepay-xxx.pages.dev`
  - Authorized redirect URIs: `https://gamepay-xxx.pages.dev/`

## 📱 Testing

Setelah deployment selesai:

1. Buka URL Cloudflare Pages Anda
2. Tunggu splash screen loading
3. Klik "Sign up" (akan redirect ke Google login)
4. Login dengan Google account
5. Jika Email di ADMIN_EMAILS array, akan access Admin Dashboard

## 🔐 Security Updates

Update Google OAuth untuk domain Cloudflare:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Select project "GamePay"
3. Pilih OAuth 2.0 Client ID
4. Edit dan add ke **Authorized JavaScript origins**:
   - `https://gamepay-xxx.pages.dev` (replace xxx dengan project name)
   - Jika sudah ada custom domain: `https://yourdomain.com`

5. Add ke **Authorized redirect URIs**:
   - `https://gamepay-xxx.pages.dev/`
   - Jika sudah ada custom domain: `https://yourdomain.com/`

## ✅ Verification Checklist

- [ ] GitHub repository connected
- [ ] Build command set to `npm run build`
- [ ] Build output directory set to `dist`
- [ ] Environment variables configured
- [ ] Deployment successful (green checkmark)
- [ ] URL accessible (no 404 errors)
- [ ] Splash screen loads
- [ ] Google login appears
- [ ] Admin button visible untuk admin users
- [ ] Admin Dashboard accessible

## 🆘 Support Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Deployment](https://developers.cloudflare.com/pages/platform/deploy-a-site/)
- [Custom Domain Setup](https://developers.cloudflare.com/pages/platform/custom-domains/)
