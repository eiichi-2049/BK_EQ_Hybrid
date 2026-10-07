<#
.SYNOPSIS
    把构建好的 VST3 安装到本机测试位，并把被替换的旧版本留档到 LEGACY。

.DESCRIPTION
    本机约定：

      E:\VST3\ReiVerb Work Shop\
        ├── BK_EQ_Hybrid.vst3            当前安装位（DAW 扫描此目录）
        └── LEGACY\
            ├── BK_EQ_Hybrid.vst3        上一个版本（始终是最新的那份）
            └── BK_EQ_Hybrid_<时间戳>.vst3  更早的历史版本

    LEGACY 仅作本机历史留存与对比试听，不参与发行；发行走远端
    `VST3 Plugin/<版本>/` 与 GitHub Releases。

    行为：① 校验源文件 ② 旧版本按时间戳留档 ③ 复制安装
          ④ 当前版本再复制一份到 LEGACY 作为「上一个版本」

    若 DAW 正占用目标文件会报错，请先在 DAW 里卸载插件或退出 DAW。

.PARAMETER Source
    待安装的 .vst3。默认为 HISE 工程的编译产物
    Binaries\Compiled\VST3\Analog Blend.vst3。

.PARAMETER Label
    留档文件名标签，默认取当前日期时间。可用版本号，如 v1.0.1。

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File tools\install-vst3.ps1

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File tools\install-vst3.ps1 -Label v1.0.1
#>
[CmdletBinding()]
param(
    [string]$Source,
    [string]$Label
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$installDir = 'E:\VST3\ReiVerb Work Shop'
$target     = Join-Path $installDir 'BK_EQ_Hybrid.vst3'
$legacyDir  = Join-Path $installDir 'LEGACY'
$legacyCur  = Join-Path $legacyDir  'BK_EQ_Hybrid.vst3'

if (-not $Source) {
    $Source = Join-Path $repoRoot '编码\AnalogBlend\Binaries\Compiled\VST3\Analog Blend.vst3'
}
if (-not $Label) { $Label = Get-Date -Format 'yyyyMMdd-HHmmss' }

Write-Host '== 1/4 校验源文件 ==' -ForegroundColor Cyan
if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) {
    throw "找不到源文件：$Source`n请先编译（rebuild_vst3.ps1），或用 -Source 指定路径。"
}
$src = Get-Item -LiteralPath $Source
Write-Host ("  源：{0}" -f $src.FullName)
Write-Host ("  大小：{0:N1} MB    时间：{1}" -f ($src.Length/1MB), $src.LastWriteTime)

Write-Host '== 2/4 旧版本留档 ==' -ForegroundColor Cyan
New-Item -ItemType Directory -Path $legacyDir -Force | Out-Null
if (Test-Path -LiteralPath $target -PathType Leaf) {
    $archived = Join-Path $legacyDir ("BK_EQ_Hybrid_{0}.vst3" -f $Label)
    if (Test-Path -LiteralPath $archived) { throw "留档文件已存在，请换个 -Label：$archived" }
    Copy-Item -LiteralPath $target -Destination $archived -Force
    Write-Host ("  已留档旧版本：{0}" -f (Split-Path -Leaf $archived)) -ForegroundColor Green
}
else {
    Write-Host '  安装位当前无文件，跳过留档' -ForegroundColor Yellow
}

Write-Host '== 3/4 安装到测试位 ==' -ForegroundColor Cyan
try {
    Copy-Item -LiteralPath $src.FullName -Destination $target -Force
}
catch {
    throw "复制失败，目标可能被 DAW 占用。请在 DAW 里卸载插件或退出 DAW 后重试。`n原始错误：$($_.Exception.Message)"
}
Write-Host ("  已安装：{0}" -f $target) -ForegroundColor Green

Write-Host '== 4/4 当前版本存为「上一个版本」 ==' -ForegroundColor Cyan
Copy-Item -LiteralPath $target -Destination $legacyCur -Force
Write-Host ("  已更新：{0}" -f $legacyCur) -ForegroundColor Green

Write-Host ''
Write-Host '完成。' -ForegroundColor Green
Write-Host '提示：源文件仍留在工程 Binaries 内（不入库）；如需发行，请另建远端版本目录与 Release。'
