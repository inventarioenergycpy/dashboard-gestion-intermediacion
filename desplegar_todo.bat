@echo off
chcp 65001 >nul
title Despliegue Automatizado con Bóveda Segura - Energy CPY
color 0A

:: Asegurar que git esté disponible en PATH
if exist "%LOCALAPPDATA%\Programs\Git\cmd" (
    set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
)
if exist "%ProgramFiles%\Git\cmd" (
    set "PATH=%ProgramFiles%\Git\cmd;%PATH%"
)

echo ==============================================================================
echo       🚀 PUBLICACIÓN AUTOMÁTICA DEL DASHBOARD EN GITHUB PAGES
echo ==============================================================================
echo.

echo [PASO 1/4] Verificando repositorio en GitHub...
git ls-remote https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo ✔ El repositorio 'dashboard-gestion-intermediacion' ya existe en GitHub.
) else (
    echo ✔ Conectando con GitHub...
)

echo.
echo [PASO 2/4] Desbloqueo de Bóveda Segura de Credenciales (5 Intentos Máximo)...
for /f "tokens=1* delims=:" %%A in ('powershell -ExecutionPolicy Bypass -File "%~dp0scripts\vault_manager.ps1" -Action unlock') do (
    if "%%A"=="TOKEN" set "UNLOCKED_TOKEN=%%B"
)

if "%UNLOCKED_TOKEN%"=="" (
    echo.
    echo ❌ Despliegue cancelado. No se pudo desbloquear la credencial.
    pause
    exit /b 2
)

echo.
echo [PASO 3/4] Subiendo el código del Dashboard a GitHub con Token Desbloqueado...
cd /d "%~dp0"
git remote set-url origin https://inventarioenergycpy:%UNLOCKED_TOKEN%@github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git
git push -u origin master
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Hubo un inconveniente al hacer git push.
    git remote set-url origin https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git
    pause
    exit /b 1
)
:: Restaurar remote limpio
git remote set-url origin https://github.com/inventarioenergycpy/dashboard-gestion-intermediacion.git

echo.
echo [PASO 4/4] Sincronizando repositorio central de agentes...
cd /d "%~dp0\..\antigravity-agents-repository"
if exist ".git" (
    git remote set-url origin https://inventarioenergycpy:%UNLOCKED_TOKEN%@github.com/inventarioenergycpy/antigravity-agents-repository.git
    git push origin master
    git remote set-url origin https://github.com/inventarioenergycpy/antigravity-agents-repository.git
)

echo.
echo ==============================================================================
echo   🎉 ¡DESPLIEGUE Y SINCRONIZACIÓN COMPLETADOS CON ÉXITO!
echo.
echo   GitHub Actions está publicando tu sitio web. En 1 minuto estará disponible:
echo   👉 https://inventarioenergycpy.github.io/dashboard-gestion-intermediacion/
echo ==============================================================================
echo.
pause
