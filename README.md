# BK_EQ_Hybrid（v1 · 已弃用）

> [!WARNING]
> **本仓库已停止维护，仅作存档。**
> 项目已完全重构，请前往新仓库：**[BK_EQ_Hybrid_v2](https://github.com/eiichi-2049/BK_EQ_Hybrid_v2)**

---

## 这里发生了什么

**BK_EQ_Hybrid** 是一款结合 Pultec 与 SSL 两种声音性格的并行混合 EQ（VST3 · Windows x64）。

第一版（v1）用 **HISE** 制作，完成了 6 通道并行路由、CurveEq 双链 EQ、ShapeFX 谐波层、
PARALLEL 无极混合、VU 表头与一键编译链路。
但它有一个无法在框架内解决的硬伤：**HISE 的 filmstrip 控件绘制尺寸 = 帧宽 × scaleFactor，
与控件矩形无关**，因此旋钮永远比底图上的占位环小一圈，界面无法对齐。

因此项目**脱离 HISE 完全重构**，改用 **JUCE 9**，即上面的 v2 仓库。

## 存档信息

| 项 | 说明 |
|---|---|
| 最终构建 | 2026-09-29 12:06，`BK_EQ_Hybrid.vst3`（32.9 MB） |
| 技术栈 | HISE 4.1.0 · VST3 · Windows x64 |
| 厂商目录 | ReiVerb Work Shop |
| 冻结文档 | 见 [编码/AnalogBlend/FROZEN.md](编码/AnalogBlend/FROZEN.md) |
| 完整交接记录 | 见 [HANDOFF_EQ_Plugin.md](HANDOFF_EQ_Plugin.md) |

v1 的源码与素材保留在本仓库中（标签 `v1.0.0-hise`），不再改动。
新仓库的 `legacy/` 目录下也存有 v1 的冻结说明与首页存档。

---

<i> Just break the silence.</i>
