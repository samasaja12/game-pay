# Panduan Deploy ke Domain

Ada beberapa cara untuk menghubungkan aplikasi GamePay ke domain Anda. Berikut adalah opsi terbaik:

## ✨ OPSI 1: Vercel (Paling Mudah) - Recommended

Vercel adalah platform terbaik untuk deploy React & Vite apps, gratis dan cepat.

### Langkah 1: Siapkan Repository Git
```bash
cd c:\Users\jagres\Downloads\game-pay
git init
git add .
git commit -m "Initial commit"
```

Jika belum install Git: https://git-scm.com/

### Langkah 2: Push ke GitHub
1. Buat akun di [GitHub.com](https://github.com)
2. Buat repository baru bernama `game-pay`
3. Di terminal, jalankan:
```bash
git remote add origin https://github.com/USERNAME/game-pay.git
git branch -M main
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda

### Langkah 3: Deploy ke Vercel
1. Buka [Vercel.com](https://vercel.com)
2. Klik "Sign Up" dan login dengan GitHub
3. Klik "Add New Project"
4. Pilih repository `game-pay`
5. Vercel akan auto-detect Vite project
6. Environment Variables:
   - Tambahkan: `VITE_GOOGLE_CLIENT_ID` = `772465250468-88ded9nf6f44brcmq36gj6ljcu5isud0.apps.googleusercontent.com`
7. Klik "Deploy"

Vercel akan memberikan URL: `gamepay-xyz.vercel.app`

---

## 📝 OPSI 2: Beli Domain & Update Google OAuth

### A. Beli Domain
Beli domain di:
- [Namecheap.com](https://namecheap.com) - Murah & terpercaya
- [GoDaddy.com](https://godaddy.com)
- [Domain.com](https://domain.com)
- [IDN.id](https://idn.id) - Domain .id lokal

**Contoh domain:**
- gamepay.com
- gamepay.id
- topupgame.id

### B. Connect Domain ke Vercel

1. Beli domain (misalnya: `gamepay.id`)
2. Di dashboard Vercel project, klik "Settings" > "Domains"
3. Masukkan domain Anda
4. Ikuti instruksi DNS:
   - Login ke registrar domain Anda
   - Update DNS settings sesuai instruksi Vercel
   - Tunggu 24-48 jam untuk propagasi DNS

### C. Update Google OAuth Settings

Setelah domain siap, update Google Cloud Console:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project "GamePay"
3. Buka **Credentials** > OAuth Client ID Anda
4. Edit dan tambahkan ke **Authorized JavaScript origins**:
   ```
   https://gamepay.id
   https://www.gamepay.id
   https://gamepay.id:443
   ```
5. Juga pastikan **Authorized redirect URIs**:
   ```
   https://gamepay.id
   https://www.gamepay.id/callback
   ```
6. Klik "SAVE"

---

## 🔧 OPSI 3: Netlify (Alternatif Vercel)

### Deploy Steps:
1. Buka [Netlify.com](https://netlify.com)
2. Klik "Add new site" > "Connect to Git"
3. Authorize dengan GitHub
4. Pilih repository `game-pay`
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Tambahkan environment: `VITE_GOOGLE_CLIENT_ID`
8. Deploy!

Netlify akan memberikan URL: `gamepay-xyz.netlify.app`

Untuk custom domain, setting mirip dengan Vercel (DNS configuration).

---

## 🟦 OPSI 4: Firebase Hosting

### Langkah:
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login ke Firebase:
```bash
firebase login
```

3. Initialize Firebase di project:
```bash
firebase init hosting
```

4. Build project:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy
```

Untuk custom domain, connect di Firebase Console.

---

## 💻 OPSI 5: VPS/Server Sendiri (Advanced)

Jika ingin kontrol penuh, bisa hosting di VPS (DigitalOcean, Linode, AWS, dll):

### A. Siapkan VPS
- Beli VPS dengan OS Linux (Ubuntu 20.04+)
- SSH ke server

### B. Install Dependencies
```bash
sudo apt update
sudo apt install nodejs npm nginx
```

### C. Clone & Build Project
```bash
cd /var/www
git clone https://github.com/USERNAME/game-pay.git
cd game-pay
npm install
npm run build
```

### D. Setup Nginx
Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name gamepay.id www.gamepay.id;
    
    root /var/www/game-pay/dist;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
    
    # SSL (HTTPS) - gunakan Certbot
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/gamepay.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gamepay.id/privkey.pem;
}
```

### E. Setup SSL dengan Certbot
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly -a nginx -d gamepay.id -d www.gamepay.id
```

### F. Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## ✅ Checklist Sebelum Deploy

- [ ] Google OAuth Client ID sudah disiapkan
- [ ] `.env` atau environment variables configured
- [ ] `npm run build` berjalan tanpa error
- [ ] Test di localhost/dev dulu
- [ ] Repository sudah ada di GitHub (untuk Vercel/Netlify)
- [ ] Domain sudah dibeli (kalau pakai custom domain)

---

## 📊 Perbandingan Opsi

| Opsi | Jenis | Setup | Cost | Performance |
|------|-------|-------|------|-------------|
| Vercel | Managed | Sangat mudah | Gratis | Excellent |
| Netlify | Managed | Sangat mudah | Gratis | Excellent |
| Firebase | Managed | Mudah | Gratis | Good |
| VPS | Self-hosted | Kompleks | $5-20/bulan | Excellent |

---

## 🚀 Recommended Path (Quick Start)

1. **Push ke GitHub** (5 menit)
2. **Deploy ke Vercel** (2 menit)
3. **Dapatkan URL**: gamepay-xyz.vercel.app
4. **Test aplikasi** di URL tersebut
5. **Opsional: Beli domain** & connect ke Vercel
6. **Update Google OAuth** dengan domain baru
7. **Done!** 🎉

---

## Troubleshooting

### Error: "Unauthorized Origins"
- Pastikan domain sudah ada di Google OAuth Authorized JavaScript origins
- Tunggu 5-10 menit untuk cache clear

### Build Error
```bash
# Clean cache dan rebuild
rm -rf node_modules dist
npm install
npm run build
```

### DNS tidak propagate
- Tunggu 24-48 jam
- Clear browser cache atau gunakan incognito mode
- Check status: https://mxtoolbox.com/

---

## Support

Jika ada masalah:
1. Check console browser (F12) untuk error messages
2. Check deployment logs di Vercel/Netlify dashboard
3. Test pakai `curl` atau Postman

Pertanyaan? Lihat dokumentasi:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
