# BK_EQ_Hybrid

结合 **Pultec** 与 **SSL** 两种声音性格的并行混合 EQ（VST3 · Windows x64）。

> 面向使用者的产品介绍、界面预览与下载，见 **[GitHub 仓库首页](https://github.com/eiichi-2049/BK_EQ_Hybrid)** 与 **[Releases](https://github.com/eiichi-2049/BK_EQ_Hybrid/releases)**。

---

## 当前状态（重要）

| 项 | 状态 |
|---|---|
| **v1 实现** | HISE 4.1.0 制作，已完成路由 / EQ 接线 / 谐波 / PARALLEL 推拉 / VU 表。**已冻结存档**，见 [FROZEN.md](编码/AnalogBlend/FROZEN.md)，标签 `v1.0.0-hise` |
| **v2 计划** | **脱离 HISE 完全重构**，以获得更好的音质上限与表现形式。技术选型进行中，见 [技术选型-HISE替代方案.md](docs/技术选型-HISE替代方案.md) |
| **发行** | 远端 `VST3 Plugin/1.0.1/` 为 1.0.1 发行位；本地构建产物不入库 |

**v1 为什么要重做**：HISE 的 filmstrip 旋钮尺寸只由 `帧宽 × scaleFactor` 决定、与控件 rect 无关（结论见 [HANDOFF_EQ_Plugin.md](HANDOFF_EQ_Plugin.md)），导致旋钮与底图占位环无法对齐；且 UI 表现力、DSP 控制粒度都受限。

---

## 仓库结构

```text
BK_EQ_Hybrid/
├── README.md                  ← 本文件（开发入口）
├── .gitignore                 ← 只跟踪源码/文档/中小素材，约 288 MB
├── .gitattributes             ← 统一 LF 行尾，二进制不转换
│
├── 编码/
│   ├── AnalogBlend/           ← v1 · HISE 工程（已冻结，仅作参考与素材来源）
│   │   ├── FROZEN.md
│   │   ├── Scripts/ScriptProcessors/AnalogBlend/Interface.js   ← 全部 UI + 参数绑定
│   │   ├── XmlPresetBackups/AnalogBlend.xml                    ← 全部 DSP 链
│   │   ├── Images/            ← 嵌入插件的贴图（filmstrip / 底图 / VU 针）
│   │   ├── rebuild_vst3.ps1   ← 一键导出 → Projucer → MSBuild → 安装
│   │   ├── project_info.xml   ← 插件名 / 版本 / VST3 分类
│   │   └── user_info.xml      ← 厂商目录 ReiVerb Work Shop / 公司码 Rvws
│   └── HISE/                  ← HISE 4.1.0 源码（本机 vendor，**不入库**）
│
├── docs/                      ← 活文档：思路 / 路线图 / 手册 / spec
│   ├── 工作流-Git与版本管理.md      ← 本仓库的 Git / 分支 / 发行流程
│   ├── 技术选型-HISE替代方案.md
│   ├── Pultec-SSL-复刻路线图.md     ← 音色目标与分阶段计划
│   ├── HISE-打开与打包手册.md
│   ├── 制作思路-音频信号.md
│   └── compose/spec/          ← 已交付功能的规格与验收记录
│
├── tools/
│   ├── check-repo-hygiene.ps1 ← 仓库体检：超大文件 / 产物混入 / 冲突标记
│   └── install-vst3.ps1       ← 安装到本机测试位并把旧版本留档到 LEGACY
├── .github/workflows/
│   └── repo-check.yml         ← CI：每次 push/PR 跑同一份体检脚本
│
├── UI/                        ← 视觉设计源（PSD 本机保留，PNG 入库）
├── 发布素材/                   ← GitHub Hero 图与 LOGO
└── legacy/                    ← 旧文档存档（含损坏文件与远端首页文档备份）
```

本机路径 `E:\个人EQ项目` 即仓库根目录。

### 不入库的内容（有意为之）

`编码/HISE/`（HISE 源码）、`Binaries/`（编译产物，单 `Analog Blend.lib` 即 260 MB）、`*.psd`（最大的近 60 MB）、`*.vst3`、`*.lib / *.pdb / *.obj`。GitHub 单文件超 100 MB 直接拒收，且这些文件多为可重建产物。目前工作区约 1.4 GB，入库 288 MB。

---

## 快速开始

```powershell
# 1) 编译并安装 v1（HISE 路线；仅在需要复现 v1 时使用）
powershell -ExecutionPolicy Bypass -File "编码\AnalogBlend\rebuild_vst3.ps1"

# 2) v1 产物会安装到
#    E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3

# 3) 安装到本机测试位，并自动把旧版本留档到 LEGACY\
powershell -ExecutionPolicy Bypass -File "tools\install-vst3.ps1" -Label v1.0.1

# 4) 提交前跑一次仓库体检（与 CI 共用同一份脚本）
powershell -ExecutionPolicy Bypass -File "tools\check-repo-hygiene.ps1"
```

构建与提交的完整流程见 [docs/工作流-Git与版本管理.md](docs/工作流-Git与版本管理.md)。

---

## 文档索引

| 文档 | 内容 |
|---|---|
| [工作流-Git与版本管理.md](docs/工作流-Git与版本管理.md) | 分支约定、提交规范、发行流程、本机 Git 环境须知 |
| [技术选型-HISE替代方案.md](docs/技术选型-HISE替代方案.md) | v2 框架选型对比（JUCE / iPlug2 / 其他） |
| [Pultec-SSL-复刻路线图.md](docs/Pultec-SSL-复刻路线图.md) | 音色验收标准、Gain Staging 硬约束、阶段拆分 |
| [HISE-打开与打包手册.md](docs/HISE-打开与打包手册.md) | v1 工具链操作手册 |
| [制作思路-音频信号.md](docs/制作思路-音频信号.md) | 信号流与算法调研 |
| [HANDOFF_EQ_Plugin.md](HANDOFF_EQ_Plugin.md) | v1 完整交接记录：踩坑、教训、未完成项 |
| [compose/spec/](docs/compose/spec/) | 各功能的规格、验收与经验记录 |

---

## 协议

本项目仅供学习交流使用，请勿用于商业用途。详见远端首页的「协议 / License」一节。