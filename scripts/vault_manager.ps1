param (
    [string]$Action = "unlock",
    [string]$CustomToken = "",
    [string]$Passphrase = ""
)

$VaultPath = Join-Path $PSScriptRoot "..\config\token_vault.json"

function Encrypt-String([string]$PlainText, [string]$Password) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    $key = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Password))
    $aes = [System.Security.Cryptography.Aes]::Create()
    $aes.Key = $key
    $aes.GenerateIV()
    $encryptor = $aes.CreateEncryptor()
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($PlainText)
    $encrypted = $encryptor.TransformFinalBlock($bytes, 0, $bytes.Length)
    $combined = $aes.IV + $encrypted
    return [Convert]::ToBase64String($combined)
}

function Decrypt-String([string]$CipherBase64, [string]$Password) {
    try {
        $sha = [System.Security.Cryptography.SHA256]::Create()
        $key = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Password))
        $bytes = [Convert]::FromBase64String($CipherBase64)
        if ($bytes.Length -lt 17) { return $null }
        $iv = $bytes[0..15]
        $encrypted = $bytes[16..($bytes.Length - 1)]
        $aes = [System.Security.Cryptography.Aes]::Create()
        $aes.Key = $key
        $aes.IV = $iv
        $decryptor = $aes.CreateDecryptor()
        $decrypted = $decryptor.TransformFinalBlock($encrypted, 0, $encrypted.Length)
        return [System.Text.Encoding]::UTF8.GetString($decrypted)
    } catch {
        return $null
    }
}

if ($Action -eq "encrypt") {
    $tokenToEncrypt = if ($CustomToken) { $CustomToken } else { $env:GITHUB_TOKEN }
    if (!$tokenToEncrypt) {
        $tokenToEncrypt = Read-Host "Ingrese el Token de GitHub a cifrar (ghp_...)"
    }
    $pass = if ($Passphrase) { $Passphrase } else { "mapache91" }
    
    $cipher = Encrypt-String -PlainText $tokenToEncrypt -Password $pass
    $configDir = Split-Path $VaultPath -Parent
    if (!(Test-Path $configDir)) { New-Item -ItemType Directory -Path $configDir -Force | Out-Null }
    
    $vaultObj = [PSCustomObject]@{
        github_user = "inventarioenergycpy"
        auth_type = "encrypted_pat_aes256"
        created_at = (Get-Date -Format "yyyy-MM-dd HH:mm")
        max_attempts = 5
        vault_data = $cipher
        recovery_url = "https://github.com/settings/tokens/new?description=Antigravity+Deploy&scopes=repo,workflow"
    }
    
    $vaultObj | ConvertTo-Json -Depth 5 | Set-Content -Path $VaultPath -Encoding UTF8
    Write-Host "Token cifrado y guardado exitosamente en $VaultPath"
    exit 0
}

if ($Action -eq "unlock") {
    if (!(Test-Path $VaultPath)) {
        Write-Host "Error: No se encontro el archivo de boveda: $VaultPath"
        exit 1
    }

    $vault = Get-Content $VaultPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $maxAttempts = 5
    $attemptsLeft = $maxAttempts

    Write-Host "=============================================================================="
    Write-Host "       BOVEDA SEGURA DE CREDENCIALES GITHUB - ENERGY CPY"
    Write-Host "=============================================================================="
    Write-Host "Para aplicar los cambios y realizar el despliegue debes ingresar la clave maestra."
    Write-Host "Tienes $maxAttempts intentos para desbloquear el token."
    Write-Host ""

    while ($attemptsLeft -gt 0) {
        $inputPass = Read-Host "Ingrese la clave de seguridad (Intentos restantes: $attemptsLeft)"
        
        $decryptedToken = Decrypt-String -CipherBase64 $vault.vault_data -Password $inputPass
        
        if ($decryptedToken -and $decryptedToken.StartsWith("ghp_")) {
            Write-Host ""
            Write-Host "Clave correcta. Token de GitHub desbloqueado exitosamente."
            $env:UNLOCKED_GITHUB_TOKEN = $decryptedToken
            # Escribir temporalmente en variable de entorno de sesion
            [System.Environment]::SetEnvironmentVariable("UNLOCKED_GITHUB_TOKEN", $decryptedToken, "Process")
            # Salida del token para pipe
            Write-Output "TOKEN:$decryptedToken"
            exit 0
        } else {
            $attemptsLeft--
            if ($attemptsLeft -gt 0) {
                Write-Host "Clave incorrecta. Te quedan $attemptsLeft intento(s). Reintenta..."
            }
        }
    }

    Write-Host ""
    Write-Host "=============================================================================="
    Write-Host " SE HAN AGOTADO LOS 5 INTENTOS DE CLAVE DE SEGURIDAD"
    Write-Host "=============================================================================="
    Write-Host "Por razones de seguridad, la operacion ha sido bloqueada."
    Write-Host ""
    Write-Host "Para continuar, genera un nuevo Token en tu cuenta de GitHub en el siguiente enlace:"
    Write-Host "   $($vault.recovery_url)"
    Write-Host ""
    Write-Host "Luego, copia el nuevo token (que comienza con 'ghp_') y pegalo en el chat de Antigravity para reconfigurar tu boveda."
    Write-Host ""
    
    Start-Process $vault.recovery_url -ErrorAction SilentlyContinue
    exit 2
}
