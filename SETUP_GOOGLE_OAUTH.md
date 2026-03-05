# Setup Google OAuth Login

Panduan lengkap untuk mengintegrasikan Google Login ke dalam aplikasi GamePay.

## Langkah 1: Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru:
   - Klik dropdown di bagian atas
   - Pilih "NEW PROJECT"
   - Beri nama: "GamePay"
   - Klik "CREATE"
3. Tunggu project dibuat (bisa memakan waktu beberapa menit)

## Langkah 2: Enable Google+ API

1. Di Google Cloud Console, cari "Google+ API"
2. Klik "Google+ API" dan pilih "ENABLE"
3. Tunggu sampai enabled

## Langkah 3: Buat OAuth 2.0 Credentials

1. Buka menu **Credentials** di sidebar kiri
2. Klik tombol **+ CREATE CREDENTIALS** di atas
3. Pilih **OAuth client ID**

### Jika diminta setup OAuth Consent Screen:

1. Klik **CONFIGURE CONSENT SCREEN**
2. Pilih **External** sebagai User Type
3. Isi form:
   - **App name**: GamePay
   - **User support email**: [email Anda]
   - **Developer contact**: [email Anda]
4. Klik **SAVE AND CONTINUE**
5. Pada Scopes, klik **SAVE AND CONTINUE** (skip untuk sekarang)
6. Pada Available OAuth Scopes, klik **SAVE AND CONTINUE**
7. Klik **BACK TO DASHBOARD**

### Kembali ke Credentials:

1. Klik **+ CREATE CREDENTIALS** lagi
2. Pilih **OAuth client ID**
3. Pilih **Web application**
4. Isi nama: "GamePay Web Client"
5. Tambahkan **Authorized JavaScript origins**:
   - `http://localhost:5173`
   - `http://127.0.0.1:5173`
   - `http://localhost:3000` (jika menggunakan port lain)
6. **Authorized redirect URIs** (optional untuk development, diperlukan untuk production):
   - Sesuaikan dengan domain Anda
7. Klik **CREATE**

## Langkah 4: Copy Client ID

1. Dialog akan muncul dengan **Client ID**
2. Copy **Client ID** Anda (format: `xxxxx.apps.googleusercontent.com`)

## Langkah 5: Update File Konfigurasi

1. Buka file `index.jsx`
2. Ganti `YOUR_GOOGLE_CLIENT_ID_HERE` dengan Client ID yang sudah Anda copy:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID_DISINI.apps.googleusercontent.com'
```

Contoh:
```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'
```

## Langkah 6: Verifikasi

1. Pastikan dependencies sudah terinstall:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka aplikasi di `http://localhost:5173`

4. Test login dengan Google account Anda

## Troubleshooting

### Error: "OAuth2 Error: invalid_client"
- Pastikan Client ID sudah benar di `index.jsx`
- Periksa bahwa `http://localhost:5173` sudah terdaftar di Authorized JavaScript origins

### Login Button Tidak Muncul
- Buka Console (F12) untuk melihat error messages
- Pastikan @react-oauth/google sudah terinstall: `npm install`

### Session Terhenti Saat Refresh
- Login data saat ini disimpan di React state saja
- Untuk persistent login, simpan token di localStorage atau cookie

## Untuk Production

1. Tambahkan domain Anda ke **Authorized JavaScript origins** di Google Cloud Console
2. Setup backend untuk meng-verify Google tokens
3. Simpan user data di database
4. Implementasi token refresh mechanism

## Tips Keamanan

- **Jangan** commit Client ID ke dalam version control jika sifatnya sensitive
- Gunakan environment variables untuk menyimpan Client ID
- Selalu verify token di backend, jangan hanya di frontend

Contoh dengan environment variables (.env):
```
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

Update di index.jsx:
```javascript
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
```

## Referensi

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
