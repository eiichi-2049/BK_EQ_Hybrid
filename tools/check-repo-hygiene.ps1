<#
.SYNOPSIS
    BK_EQ_Hybrid 仓库体检 —— 防止把大文件/构建产物误提交进仓库。

.DESCRIPTION
    远端仓库有两条硬约束，本脚本在提交前把关：

      1. GitHub 单文件上限 100 MB（超过直接拒收，且历史里清掉很麻烦）
      2. 工作区有 1 GB 以上的构建产物与 PSD，绝不能入库

    CI 与本地共用同一份逻辑，避免两处规则漂移。

.PARAMETER WarnMB
    超过该体积就告警（默认 20 MB）。

.PARAMETER FailMB
    超过该体积视为失败（默认 50 MB）。

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File tools\check-repo-hygiene.ps1
#>
[CmdletBinding()]
param(
    [double]$WarnMB = 20,
    [double]$FailMB = 50
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
    Write-Host '== 1/3 校验被跟踪文件里没有超大文件 ==' -ForegroundColor Cyan

    $tracked = git ls-files
    if (-not $tracked) { throw 'git ls-files 无输出：请确认在仓库内运行' }

    $big  = @()
    $warn = @()
    foreach ($f in $tracked) {
        if (-not (Test-Path -LiteralPath $f)) { continue }   # 已删未提交
        $len = (Get-Item -LiteralPath $f -Force).Length
        if ($len -ge ($FailMB * 1MB)) { $big  += [pscustomobject]@{ MB = [math]::Round($len/1MB,1); Path = $f } }
        elseif ($len -ge ($WarnMB * 1MB)) { $warn += [pscustomobject]@{ MB = [math]::Round($len/1MB,1); Path = $f } }
    }

    if ($warn.Count) {
        Write-Host "  告警：以下文件 >= $WarnMB MB，确认确有必要入库：" -ForegroundColor Yellow
        $warn | Sort-Object MB -Descending | Format-Table -AutoSize | Out-String -Width 160 | Write-Host
    }

    if ($big.Count) {
        Write-Host "  失败：以下文件 >= $FailMB MB，不应入库：" -ForegroundColor Red
        $big | Sort-Object MB -Descending | Format-Table -AutoSize | Out-String -Width 160 | Write-Host
        throw "有 $($big.Count) 个文件超过 $FailMB MB"
    }
    Write-Host "  OK（跟踪 $($tracked.Count) 个文件）" -ForegroundColor Green

    Write-Host '== 2/3 校验没有把构建产物/源素材目录提交进来 ==' -ForegroundColor Cyan

    # 允许 .md/.txt 说明提及这些路径，只拦真实产物
    $forbiddenPatterns = @(
        '(^|/)Binaries/.*\.(lib|pdb|obj|exp|dll|exe|vst3)$',
        '^编码/HISE/',
        '\.(psd|psb)$',
        '\.vst3$',
        '(^|/)JuceLibraryCode/.*\.(cpp|h)$'
    )
    $hits = foreach ($f in $tracked) {
        foreach ($p in $forbiddenPatterns) {
            if ($f -match $p) { [pscustomobject]@{ Path = $f; Rule = $p }; break }
        }
    }
    if ($hits) {
        Write-Host '  失败：以下被跟踪文件命中禁止规则：' -ForegroundColor Red
        $hits | Format-Table -AutoSize | Out-String -Width 160 | Write-Host
        throw "有 $($hits.Count) 个文件命中禁止规则"
    }
    Write-Host '  OK' -ForegroundColor Green

    Write-Host '== 3/3 校验工作区没有未处理的冲突标记 ==' -ForegroundColor Cyan

    $conflict = @()
    foreach ($f in ($tracked | Where-Object { $_ -match '\.(md|txt|js|jsx|css|html|json|xml|ps1|py|cpp|h)$' })) {
        if (-not (Test-Path -LiteralPath $f)) { continue }
        $text = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $f))
        if ($text -match '(?m)^(<{7}|={7}|>{7})') { $conflict += $f }
    }
    if ($conflict) {
        Write-Host '  失败：以下文件仍含合并冲突标记：' -ForegroundColor Red
        $conflict | ForEach-Object { Write-Host "    $_" }
        throw "有 $($conflict.Count) 个文件含冲突标记"
    }
    Write-Host '  OK' -ForegroundColor Green

    Write-Host ''
    Write-Host '仓库体检通过。' -ForegroundColor Green
}
finally {
    Pop-Location
}
