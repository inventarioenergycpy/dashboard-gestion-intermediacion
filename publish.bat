@echo off
title Publicacion de Dashboard - GitHub Pages
echo =======================================================
echo   PUBLICACION DE DASHBOARD EN GITHUB PAGES
echo =======================================================
echo.
echo 1. Verificando estado del repositorio local...
git status
echo.
echo 2. Subiendo cambios a GitHub (origin/master)...
git push -u origin master
if %ERRORLEVEL% equ 0 (
    echo.
    echo =======================================================
    echo   [EXITO] Codigo subido correctamente a GitHub.
    echo   GitHub Actions iniciara el despliegue automatico en:
    echo   https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/
    echo =======================================================
) else (
    echo.
    echo [ERROR] No se pudo completar el git push.
    echo Verifique sus credenciales o permisos en GitHub.
)
echo.
pause
