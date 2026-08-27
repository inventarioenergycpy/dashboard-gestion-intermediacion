@echo off
chcp 65001 >nul
title Publicacion Segura de Dashboard - GitHub Pages
echo =======================================================
echo   PUBLICACION DE DASHBOARD EN GITHUB PAGES (BOVEDA)
echo =======================================================
echo.
echo 1. Desbloqueando Boveda de Credenciales con Clave...
for /f "tokens=1* delims=:" %%A in ('powershell -ExecutionPolicy Bypass -File "%~dp0scripts\vault_manager.ps1" -Action unlock') do (
    if "%%A"=="TOKEN" set "UNLOCKED_TOKEN=%%B"
)

if "%UNLOCKED_TOKEN%"=="" (
    echo.
    echo [ERROR] Boveda bloqueada o clave incorrecta tras 5 intentos.
    pause
    exit /b 2
)

echo.
echo 2. Subiendo cambios a GitHub (origin/master)...
cd /d "%~dp0"
git remote set-url origin https://inventarioenergycpy:%UNLOCKED_TOKEN%@github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git
git push -u origin master
if %ERRORLEVEL% equ 0 (
    echo.
    echo =======================================================
    echo   [EXITO] Codigo subido correctamente a GitHub.
    echo   GitHub Actions actualizara el sitio en:
    echo   https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/
    echo =======================================================
) else (
    echo.
    echo [ERROR] No se pudo completar el git push.
)
git remote set-url origin https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git
echo.
pause
