$ErrorActionPreference = 'Stop'
$ws = (Get-Location).Path
$psd = (Get-ChildItem -LiteralPath $ws -Filter '*.psd' | Select-Object -First 1).FullName
$jsx = Join-Path $ws 'apply_shadows_com.jsx'
$code = [System.IO.File]::ReadAllText($jsx, [System.Text.Encoding]::UTF8)
$log = Join-Path $ws 'com_result.txt'

try {
    $ps = New-Object -ComObject Photoshop.Application
    try { $ps.Visible = $true } catch {}
    Start-Sleep -Milliseconds 1200
    $doc = $ps.Open($psd)
    Start-Sleep -Milliseconds 500
    $result = $ps.DoJavaScript($code, $null, 1)
    $text = [string]$result
    [System.IO.File]::WriteAllText($log, $text, (New-Object System.Text.UTF8Encoding($true)))
    Write-Output '=== RESULT ==='
    Write-Output $text

    $destLine = ($text -split "`r?`n" | Where-Object { $_ -like 'DEST=*' } | Select-Object -First 1)
    if ($destLine) {
        $dest = $destLine -replace '^DEST=', ''
        $doc.Close(2)
        $null = $ps.Open($dest)
        Write-Output "OPENED=$dest"
    }
} catch {
    $msg = $_.Exception.Message
    [System.IO.File]::WriteAllText($log, 'ERROR: ' + $msg, (New-Object System.Text.UTF8Encoding($true)))
    Write-Output '=== ERROR ==='
    Write-Output $msg
}
