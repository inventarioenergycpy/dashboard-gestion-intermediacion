@echo off
chcp 65001 >nul
title Despliegue Automatizado - Dashboard de Gestión
color 0A

echo ==============================================================================
echo       🚀 PUBLICACIÓN AUTOMÁTICA DEL DASHBOARD EN GITHUB PAGES
echo ==============================================================================
echo.

echo [PASO 1/3] Verificando si el repositorio ya existe en GitHub...
powershell -Command "try { $r = Invoke-RestMethod -Uri 'https://api.github.com/repos/inventarioenergycpy/dashboard-gestion-intermediacion' -Method Get -ErrorAction Stop; exit 0 } catch { exit 1 }"
if %ERRORLEVEL% equ 0 (
    echo ✔ El repositorio 'dashboard-gestion-intermediacion' ya existe en GitHub.
) else (
    echo.
    echo ⚠️  El repositorio todavía no existe en tu cuenta de GitHub.
    echo 🌐 Abriendo tu navegador en la página de creación con los datos pre-cargados...
    start "" "https://github.com/new?name=dashboard-gestion-intermediacion&description=Dashboard+de+Gestion+e+Intermediacion+Financiera&public=true"
    echo.
    echo 👉 Haz clic en el botón verde "Create repository" en la página que se acaba de abrir.
    echo.
    pause
)

echo.
echo [PASO 2/3] Subiendo el código del Dashboard a GitHub...
cd /d "%~dp0"
git push -u origin master
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Hubo un inconveniente al hacer git push. Verifique haber creado el repositorio en GitHub.
    echo.
    pause
    exit /b 1
)

echo.
echo [PASO 3/3] Sincronizando repositorio central de agentes...
cd /d "%~dp0\..\antigravity-agents-repository"
if exist ".git" (
    git push origin master
)

echo.
echo ==============================================================================
echo   🎉 ¡TODO COMPLETADO CON ÉXITO!
echo.
echo   GitHub Actions está publicando tu sitio web. En 1-2 minutos estará disponible:
echo   👉 https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/
echo ==============================================================================
echo.
echo Abriendo la URL en tu navegador...
start "" "https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/"
pause
