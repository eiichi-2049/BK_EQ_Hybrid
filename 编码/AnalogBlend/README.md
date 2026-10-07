# Analog Blend — HISE 工程

对应项目总览：`E:\个人EQ项目\README.md`

- 纯 FX 工程（导出用 `-t:effect`）
- 版本 0.1.0 · PluginCode `Abln` · Bundle `com.hise.analogblend`
- 目标：Pultec + SSL 双链路并行混合 EQ（VST3）

## 当前状态（2026-09-22）

| 项 | 状态 |
|----|------|
| 阶段 0 骨架 + VST3 编译安装 | 完成 |
| 阶段 1 路由 / PARALLEL 无极 Mix / 常驻谐波位 | **已实现**（2026-09-22 连续交叉衰减 + 编译安装） |
| 阶段 2 谐波/饱和初版 | **已实现**（Pultec Sat / SSL Sat / Bleed Sat；暂无过采样） |
| 界面 | 底图 + PARALLEL 无极；全套旋钮素材在 `Images\`，待阶段 6 |
| 阶段 3–5 DSP | 未做 |

### 阶段 1 信号结构

6 通道内部总线（详见项目 README）：

- ch0/1 Pultec 路径 → `Pultec Wet`（Mix 控制）
- ch2/3 SSL 路径 → `SSL Wet`（Mix 控制）
- ch4/5 常驻谐波旁路 → `Bleed Sat`（Saturator 占位）→ `Bleed Level`（−35 dB）
- `RouteFX` 做复制（To SSL / To Bleed）与合并（Mix SSL / Mix Bleed）
- 主机输出只取 ch0/1

PARALLEL 无极连续：0.0 = SSL only · 0.5 = 50/50 · 1.0 = Pultec only（等增益交叉衰减，不吸附）。  
谐波旁路不受 Mix 影响（开发期 −12 dB）；真旁通仅 DAW。

## 目录

- `XmlPresetBackups\AnalogBlend.xml` — DSP 结构
- `Scripts\ScriptProcessors\AnalogBlend\Interface.js` — 界面与 Mix 联动
- `Images\` — 底图 / filmstrip / 状态图
- `project_info.xml` / `user_info.xml` — 工程元数据
- `rebuild_vst3.ps1` — 一键重编译
- `UI预览.png` — 界面预览（装修稿，非最终交互截图）

## 常用命令

```text
.\rebuild_vst3.ps1
```

脚本：HISE 导出 → 关 IPP → Projucer → v145 补丁 → MSBuild → 复制到 `E:\VST3`。

## 编译环境

- HISE 4.1.0 源码：`E:\个人EQ项目\编码\HISE`
- Visual Studio 2026 Community（MSVC v145）
- VST3：JUCE 内置 SDK（`tools\SDK\VST3 SDK` 仅满足 HISE 路径检查）

## 说明

- 旧文档若写「界面装修完成」，仅表示 **素材嵌入完成**；交互旋钮未全部接线。
- 不要使用嵌套 `Type="EffectChain"` 作为 FX 子节点——HISE 工厂无法创建它，会导致 restore 失败。并行用多通道 + `RouteFX`。
