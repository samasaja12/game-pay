# Install Git dan Push ke GitHub

## ⚠️ Git belum terinstall

Anda perlu install Git terlebih dahulu sebelum bisa push ke GitHub.

## 1. Install Git di Windows

### Option A: Download dari Website
1. Buka [git-scm.com](https://git-scm.com/)
2. Klik **Download for Windows**
3. Install dengan default settings
4. **Restart PowerShell/Terminal**

### Option B: Menggunakan Chocolatey (Jika sudah install)
```powershell
choco install git
```

### Option C: Menggunakan Windows Package Manager
```powershell
winget install Git.Git
```

## 2. Verify Install

Setelah install, buka terminal baru dan jalankan:
```bash
git --version
```

Jika output seperti: `git version 2.x.x` → Git sudah terinstall ✅

## 3. Setup Git Config (First Time Only)

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@gmail.com"
```

## 4. Setelah Git Installed

Buka terminal di folder `game-pay` dan jalankan:

```bash
cd c:\Users\jagres\Downloads\game-pay

# Initialize repository
git init

# Add semua file
git add .

# Commit
git commit -m "Initial GamePay commit"
```

## 5. Buat Repository di GitHub

1. Buka [GitHub.com](https://github.com)
2. Login
3. Klik **+** di kanan atas
4. Pilih **New repository**
5. Nama: `game-pay`
6. Klik **Create repository**

## 6. Push ke GitHub

Copy 4 command dari halaman GitHub (setelah Create Repository):

```bash
git remote add origin https://github.com/USERNAME/game-pay.git
git branch -M main
git push -u origin main
```

**Ganti `USERNAME` dengan username GitHub Anda**

Ketika push, GitHub akan minta authenticate.

---

## Next Steps

Setelah Git install:
1. Run: `git init`
2. Run: `git add .`
3. Run: `git commit -m "Initial commit"`
4. Create GitHub repo
5. Run: `git push`

---

Silakan install Git dulu, kemudian hubungi saya untuk lanjut push! 🚀
