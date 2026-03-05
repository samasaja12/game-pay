# Push ke GitHub untuk Cloudflare

Panduan cepat untuk push project ke GitHub agar bisa diconnect dengan Cloudflare Pages.

## 1. Setup Git Lokal

```bash
cd c:\Users\jagres\Downloads\game-pay
git init
git add .
git commit -m "Initial GamePay commit"
```

## 2. Buat Repository di GitHub

1. Buka [GitHub.com](https://github.com)
2. Login atau daftar
3. Klik **+** di kanan atas
4. Pilih **New repository**
5. Nama: `game-pay`
6. **Jangan** init README (kita sudah punya file)
7. Klik **Create repository**

## 3. Push ke GitHub

Setelah create repo, GitHub akan kasih perintah. Di terminal, jalankan:

```bash
git remote add origin https://github.com/USERNAME/game-pay.git
git branch -M main
git push -u origin main
```

**Ganti `USERNAME` dengan username GitHub Anda**

## 4. Connect dengan Cloudflare Pages

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Bagian kiri, klik **Pages**
3. Klik **Create project** → **Connect to Git**
4. Authorize Cloudflare dengan GitHub
5. Pilih repository `game-pay`
6. Setup build:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Environment Variables:
   ```
   VITE_GOOGLE_CLIENT_ID = 772465250468-88ded9nf6f44brcmq36gj6ljcu5isud0.apps.googleusercontent.com
   ```
8. Klik **Save and Deploy**

Cloudflare akan otomatis:
- Pull dari GitHub
- Build project
- Deploy ke URL: `game-pay.pages.dev`

## 5. Auto-Deploy

Setelah ini, setiap kali Anda push ke GitHub, Cloudflare otomatis:
- Pull changes
- Build ulang
- Deploy ke production

```bash
# Edit file
# Push ke GitHub
git add .
git commit -m "Update feature"
git push

# Cloudflare otomatis deploy! ✅
```

## 6. Update Google OAuth (Jika Pakai Custom Domain)

Jika Anda punya custom domain di Cloudflare:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Settings > OAuth Consent Screen > Authorized JavaScript origins
3. Tambahkan:
   ```
   https://yourdomain.com
   https://www.yourdomain.com
   ```
4. Save

## 7. Cloudflare DNS Settings (Untuk Custom Domain)

Jika domain di Cloudflare:
1. Dashboard > Domains
2. Klik domain Anda
3. Pages project akan auto-setup DNS

## Quick Commands

### Push changes ke GitHub
```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

### Check status
```bash
git status
git log --oneline
```

### Pull latest changes dari GitHub
```bash
git pull
```

---

## ✅ Checklist

- [ ] Install Git
- [ ] GitHub account dibuat
- [ ] Repository `game-pay` sudah dibuat
- [ ] Push ke GitHub berhasil
- [ ] Cloudflare Pages connected
- [ ] Build & deploy berhasil
- [ ] Akses ke `game-pay.pages.dev`
- [ ] Google OAuth tested
- [ ] Domain custom connected (opsional)

## 🎉 Done!

Sekarang setiap push ke GitHub, Cloudflare otomatis deploy. Enjoy! 🚀
