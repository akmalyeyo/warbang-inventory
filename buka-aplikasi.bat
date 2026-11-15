@echo off
title Warbang Inventory
echo ==================================================
echo   Menjalankan Sistem Persediaan Toko Warbang
echo ==================================================
echo.

if not exist node_modules (
    echo [1/2] Dependensi (node_modules) belum ada.
    echo       Sedang menginstal dependensi (pastikan ada internet)...
    call npm install
    echo.
)

echo [2/2] Menyalakan server lokal Vite...
echo       Browser akan otomatis terbuka setelah server siap.
echo       PERHATIAN: JANGAN TUTUP JENDELA TERMINAL INI!
echo.
call npm run dev -- --open
pause
