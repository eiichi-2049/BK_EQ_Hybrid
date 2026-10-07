# BK_EQ_Hybrid 工程交接文档

> 交接给：Codex  
> 日期：2026-09-23  
> 工作区：`E:\个人EQ项目`  
> 一键编译：`powershell -ExecutionPolicy Bypass -File "E:\个人EQ项目\编码\AnalogBlend\rebuild_vst3.ps1"`  
> 操作手册：`docs\HISE-打开与打包手册.md`  
> 复刻路线：`docs\Pultec-SSL-复刻路线图.md`

---

## 1. 项目概述

### 1.1 核心目标

| 项 | 说明 |
|----|------|
| 产品名 | **BK_EQ_Hybrid**（曾用名 Analog Blend） |
| 厂商目录 | **ReiVerb Work Shop**（VST3 安装路径上级目录） |
| 品类 | 模拟风味 EQ（EQ 分类） |
| 核心卖点 | 一进二出：左 **Pultec 风味**、右 **SSL 风味**，中间 **PARALLEL** 无极混合 |
| 要解决的问题 | 一个插件里同时具备 Pultec「暖厚」与 SSL「干净紧」两种音色，可连续交叉；并附常驻谐波染色 |
| 硬约束 | **Gain Staging**：输入多少 dB，输出尽量保持多少 dB；初步不做任何用户向 gain / 无 makeup 推子 |

### 1.2 技术栈

| 层 | 技术 | 路径 / 版本 |
|----|------|-------------|
| 插件框架 | **HISE 4.1.0** | 源码 `编码\HISE`；安装版 `C:\Program Files\HISE.exe` |
| 工程 | HISE 纯 FX 工程 | `编码\AnalogBlend` |
| UI 脚本 | HISE Script（类 JS） | `Scripts\ScriptProcessors\AnalogBlend\Interface.js` |
| DSP | HISE 效果器 XML | `XmlPresetBackups\AnalogBlend.xml` |
| 编译 | VS 2026 · MSVC **v145** · MSBuild | `Binaries\Builds\VisualStudio2022\` |
| 目标格式 | **VST3** x64 | 安装：`E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3` |
| 元数据 | `project_info.xml` / `user_info.xml` | Name=BK_EQ_Hybrid；Company=ReiVerb Work Shop；CompanyCode=Rvws |
| 辅助 | Python+PIL（素材）、Photoshop COM（拆 PSD）、Bertom EQ Curve Analyzer 2 | |

---

## 2. 已完成进度

### 2.1 功能完成度

| 档位 | 功能 | 说明 |
|------|------|------|
| **完全可用** | 6ch 并行路由（Pultec/SSL/Bleed） | RouteFX 加法发送 + Wet 交叉 |
| **完全可用** | PARALLEL 无极交叉衰减 | 等增益 `gPultec=1−v`，`gSSL=v` |
| **完全可用** | Gain 增益绑定 | `processorId/parameterId` 直连 `Pultec Wet` / `SSL Wet` 的 `Gain` |
| **完全可用** | CurveEq 4+4 带 EQ + 旋钮映射 | Pultec EQ / SSL EQ，`idx=band*5+param` |
| **完全可用** | ShapeFX 谐波（Tanh/Atan + 4× OS） | Pultec Tanh+Bias；SSL Atan |
| **完全可用** | 编译安装链路 | `rebuild_vst3.ps1` → `E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3` |
| **完全可用** | Gain Staging 静态验收脚本 | 48 项 XML/JS 契约检查 PASS |
| **半成品** | V33 视觉皮肤 | 有黑/红/绿/蓝/棕 filmstrip，但**与底图对齐仍偏**（用户反馈「还是原来的问题」） |
| **半成品** | 右下角拖角缩放 | `applyZoom()` 重排控件；**启动时不调用**（会拉飞布局）；HISE 无全局 zoom API |
| **半成品** | VU 表头跟信号 | Panel `startTimer(30)` + `getCurrentLevel()` 画表针；绘制较简陋 |
| **半成品** | PARALLEL 推拉可发现性 | HTML 预览已做色环/双击/模式锁；**HISE 内未接 ScriptPanel 鼠标推拉** |
| **半成品** | 失真听感调参 | ShapeFX 参数已多轮下调；用户仍嫌难辨 |
| **仅占位** | SSL 比例 Q / ÷3×3 / 搁架 overshoot | 规格允许后置 |
| **仅占位** | Pultec 低频魔术（80 凸 + 200 舀） | 需 Boost+Cut 同频微偏叠加，未单独调曲线 |
| **仅占位** | RMS 音量补偿 | 明确暂缓（Gain Staging：不做 makeup） |
| **仅占位** | 状态灯三态图 | 脚本有 showStatus，显示效果待验 |
| **仅占位** | 预设 / 打包发行 / THD·CPU 测试 | 阶段 7–8 未做 |

### 2.2 界面逻辑现状

| 区域 | 控件 | 坐标（1280×720，按用户 UI 截图） |
|------|------|----------------------------------|
| 左 Pultec | BOOST / BD.WITH / 3-5-10-16k | x=75,225,385 · y≈155 |
| 左 Pultec | ATTEN. / ATTEN.SEL | y≈335 |
| 左 Pultec | ATTEN. / BOOST / 20-30-60-100 | y≈535 |
| 中 | VU 表头 | 545,155 · 250×185 |
| 中 | PARALLEL | 585,475 · 175×175 |
| 中 | 状态灯 status_left/mix/right | 615,665 |
| 右 SSL | 红 dB / HZ | 865 / 1115 · y=155 |
| 右 SSL | 绿 HMF 三钮 | 865/990/1115 · y=305 |
| 右 SSL | 蓝 LMF 三钮 | 865/990/1115 · y=455 |
| 右 SSL | 棕 LF 两钮 | 865/1115 · y=605 |
| 右下 | 缩放把手 uiScale | 1215,665 |

| UI 逻辑 | 现状 |
|---------|------|
| filmstrip 皮肤 | `filmstripImage = "{PROJECT_FOLDER}fs_*.png"`，`numStrips=91`，**纵向** 160×14560 |
| 指针 | 烘在 filmstrip 内（底+旋转指针），非独立 UV 实时转 |
| PARALLEL 映射 | **0 = 左/Pultec，1 = 右/SSL**（用户明确要求，已对调） |
| EQ 旋钮→DSP | onControl 写 CurveEq `setAttribute(band*5+param)` |
| 好拧程度 | stepSize 已加大（增益 0.1、频率 5–10、Mix 0.01） |

---

## 3. 踩坑与教训（最重要）

### 3.1 视觉 / filmstrip

| # | 坑 | 原因 | 解决 / 状态 |
|---|----|------|-------------|
| 1 | **旋钮全部消失，页面像一张截图** | HISE filmstrip **按纵向切帧**（height = 帧高×numStrips）。我们先做了**横向** 14560×160，切帧后每帧高度不对 → 画空白/不显示 | 改为**纵向** 160×(160×91)。**必须纵向** |
| 2 | 底图整页灰色 | 图只在 `imgLoader` Panel 上 `loadImage`，BG 只 `setImage`。**图池不跨组件共享** | 每个要显示图的组件**自己** `loadImage` + `setImage` |
| 3 | `filmstripImage` 绑 ID 无效 | 源码里走 `loadImageReference(ref)`，要的是**文件引用**，不是本地 prettyName | 写 `"{PROJECT_FOLDER}fs_pultec.png"` |
| 4 | Knob 上 `loadImage` 不存在 | ScriptSlider **没有** `loadImage`；只有 Panel / ScriptImage 有 | skin 用 `filmstripImage` 文件引用；显示用 Panel |
| 5 | 素材中心不齐，指针偏心 | 导出 PNG bbox 不在画布中心 | PIL：`getbbox` 裁切 → 正方形画布**居中粘贴** → 再烘 strip |
| 6 | `inline function skinKnob(k,...)` 里 `k.set` 报 **Unknown function 'set'** | HISE **不能**把组件当参数再调方法 | 全部改为**具名组件**上直接 `xxx.set(...)` |
| 7 | 启动 `applyZoom()` 后布局乱 | 初始化时缩放系数/尺寸叠加把坐标拉飞 | **启动不调 applyZoom**，仅拖角时生效 |
| 8 | 底部素材预览条 | 曾用于验证 loadImage；用户已要求删除 | 已删 |

### 3.2 脚本语法（HISE Script ≠ JS）

| # | 坑 | 原因 | 解决 |
|---|----|------|------|
| 9 | `Unknown function 'startTimer'`（Content） | Content 无此 API | 用 **`ScriptPanel.startTimer(ms)`** + `setPaintRoutine` |
| 10 | `Cannot define local variables outside of inline functions or callbacks` | paint 里用 `local` | paint 回调用 **`reg`** |
| 11 | `Unqualified assignments are not supported` | 回调里 `f = x` 未声明 | `local f = 0` 再赋值（onControl）；paint 用 `reg` |
| 12 | `setAttribute(0)` → `undefined parameter 0` | 参数下标在部分对象上不能写死 0 | `getAttributeIndex("Gain")` 或 **`processorId`+`parameterId` 绑定**（后者最终采用） |
| 13 | `Content.addSlider` 不存在 | 应用 `addKnob` | 已改 |
| 14 | `Math.log10` 可能不可用 | 用 `Math.log(x)/Math.log(10)` | 已改 |
| 15 | UI 组件不能在函数里 `addKnob` | 只能在 onInit **顶层**创建 | 已改 |

### 3.3 PARALLEL 左右逻辑（用户明确纠正）

| # | 坑 | 错误理解 | **正确逻辑（用户要求）** |
|---|----|----------|-------------------------|
| 16 | 左右声道/侧别反了 | 旧：0=SSL/右侧，1=Pultec/左侧（按硬件 Pull/Push 直译） | **0 = 左侧工作 = Pultec**<br>**1 = 右侧工作 = SSL**<br>中间连续混合 |
| 17 | 三档硬切「很生硬」 | Discrete + stepSize 0.5 | **无极连续** 0–1；状态灯只作区间指示，不回吸 |
| 18 | 推拉 Push/Pull 可发现性差 | 单击直接切换，易误触 | 设计：色环 红/蓝/紫 + **双击**切换 + **模式锁**；**HISE 内尚未实现 ScriptPanel 推拉**（仅 HTML 预览有） |

当前 `applyParallelMix`：
```
pultecGain = linToDb(1 - v)   // v=0 → Pultec 0dB
sslGain    = linToDb(v)       // v=1 → SSL 0dB
v<0.33 → 状态「左侧工作」；v>0.67 → 「右侧工作」
```

### 3.4 DSP / 增益

| # | 坑 | 原因 | 解决 |
|---|----|------|------|
| 19 | **+6 dB** 增益 | 两路 SimpleGain 都停在默认 **0 dB** 再相加（相关干声 0.5+0.5 若都是 1.0 → +6dB）；`setAttribute(0)` 未生效 | 改 `processorId/parameterId` 直连；XML 默认 −6.02；中位等增益交叉 |
| 20 | `Width="0"` 把立体声压成单声道 | HISE Width 0–100，**0=单声道** | 全部 `Width="100"` |
| 21 | 谐波「听不出」 | Saturator `WetAmount` 0–1（1=全湿）；曾误以为 100；且 −35dB bleed 太小 | ShapeFX Tanh/Atan；Bleed 提到 −24 dB 开发值 |
| 22 | 失真≠EQ 曲线 | 用户原以为染色会在 Bertom 上「看见」 | **饱和改 THD/谐波峰**；**曲线用 EQ 滤波**。见路线图 §概念 |
| 23 | MonophonicFilter 曲线仍平 | 它是 **MonophonicEffectProcessor**，不是 MasterEffect，**不进 FX 主链** | 换 **CurveEq**（MasterEffectProcessor） |
| 24 | CurveEq Type / 每带参数写错 | Type：**0=Peak, 1=LowShelf, 2=HighShelf**（不是 2/3/4）；每带 **5** 参不是 6 | 已改；`Band{i*5+0..4}` = Gain,Freq,Q,Enabled,Type |
| 25 | 离散频钮行程死区 | `pHfBoFreq max=6` 但表只有 0–3 | max=表长−1 |
| 26 | EQ「数值太小」 | 量程不足 | 增益 **±24 dB**，Q 上限 5，切频段时附带给 +18 |
| 27 | 公司码非法 | `RvWk` 不合 `Abcd` 形态 | **`Rvws`**（首字母大写 + 小写） |
| 28 | 固定 Output Bus −6 dB | 用户建议用末端 gain 压 +6 | 已加；**注意**若中位已 unity 会变 −6，需实测回调 |

### 3.5 工具链 / 环境

| # | 坑 | 原因 | 解决 |
|---|----|------|------|
| 29 | PSD 全量导出超时 | 逐层 crop+save 太慢，PS 卡死 | 只导指定层；或用户手工从 PS 拆 |
| 30 | PS COM 路径 | 2024/2025 标准路径无，但 `New-Object Photoshop.Application` 可用 | 用 COM，不必找 exe |
| 31 | VST3 被占用无法 Copy | Live 仍占句柄 | 卸载插件 / 退出 Live 再拷 |
| 32 | 中文 README 被 PowerShell 弄乱码 | `Get-Content` 无编码在 936 页误读 UTF-8 | 用 write 工具整文件重写 UTF-8 |
| 33 | XML/JS 为 CRLF | `edit` 多行匹配失败 | 单行锚点替换，或整文件重写 |
| 34 | 工具洪水 / 子代理重复 spawn | 同内容多实例抢写同一文件 | 取消副本；**编译必须父代理跑**（子代理 bash 常为 ask） |

### 3.6 尚未解决

| 项 | 状态 |
|----|------|
| 旋钮与 underlay **对齐仍偏** | 用户最后一次反馈「还是原来的问题」；已按截图重排坐标，**未在 Live 复验通过** |
| 旋钮「很难控制」 | 已加大 stepSize；手感未确认 |
| HISE 内 **推拉 Push/Pull** | 仅 HTML 预览；需 ScriptPanel mouseDown/Up/Drag |
| 拖角 **真缩放** | 有 applyZoom；体验与边界未精调 |
| VU 表针绘制 | 简易矩形表针，非 V33 金色指针弧 |
| 失真听感仍偏弱 | 参数可再推；或换 ScriptNode 不对称波形 |

---

## 4. 素材与资产路径

### 4.1 已进插件（`编码\AnalogBlend\Images\`）

| 路径 | 内容 | 对齐 |
|------|------|------|
| `Images\bg.png` | **由 underlay_V2 缩放 1280×720** | 底图 OK |
| `Images\fs_pultec.png` | 黑钮+指针 91 帧**纵向** 160×14560 | 中心已 recenter；与底图刻度仍可能偏 |
| `Images\fs_red.png` / `fs_green.png` / `fs_blue.png` / `fs_brown.png` | SSL 彩钮 filmstrip | 同上 |
| `Images\fs_parallel.png` | PARALLEL 翼钮 filmstrip | 同上 |
| `Images\knob_black.png` 等 | 单帧底盘（黑/红/绿/蓝/棕） | 已居中 |
| `Images\pointer_pultec.png` / `pointer_ssl.png` / `pointer_mix.png` | 指针层 | 已居中 |
| `Images\vu_meter.png` | VU 表盘（合成） | 与 V33 有差距 |
| `Images\zoom_grip.png` | 右下角缩放角标 | OK |
| `Images\status_left/mix/right.png` | 三态状态灯 | 来自早期 PSD 导出 |
| `Images\psd_export\*` | PS 导出 40 层原始件 | 未全部用上 |

### 4.2 源素材（用户侧 / 未嵌插件）

| 路径 | 内容 | 备注 |
|------|------|------|
| `UI\【UI Underlay Darft】\underlay_V2.png` | **当前采用的底图** | 用户指定 |
| `UI\equi_V33.png` | UI 布局对照图（三档推拉思维导图） | 坐标基准 |
| `UI\equi.psd` / `UI\GPT WORKS\equi 修改版.psd` | 主 PSD | 可继续拆层 |
| `UI\GPT WORKS\com_result.txt` | PS 布局/阴影矩形 | 对齐参考 |
| `UI\LEFT SIDE\PLUTIC KNOB*.png` | 左侧旋钮零件 | |
| `UI\RIGHT SIDE\SSL KNOB\**` | SSL 钮/外圈 | |
| `UI\_CENTER\**` | 表头/螺丝 | |
| **用户明确不提供** | 左右面板主体 P2 大切片 | 「现在的 underlay 应该够清晰了」 |

### 4.3 对齐结论

| 素材 | 状态 |
|------|------|
| underlay 底图 | ✅ 已用 |
| 旋钮/指针 **中心点** | ✅ 程序 recenter 过 |
| 旋钮 **相对底图标签** | ❌ **仍偏**（最后一次用户反馈） |
| 刻度圈/数字 | ⚠️ 部分在底图上，filmstrip 未刻数字圈 |
| 左右面板金属底 | ❌ 不单独提供，靠 underlay |

---

## 5. 用户的需求

### 5.1 手感与控制

| 需求 | 规格 |
|------|------|
| PARALLEL | **无极连续**，不要三档硬切 |
| 方向 | **0 = 左 = Pultec**；**1 = 右 = SSL**；中间混合 |
| 推拉（设计） | 正常=混合可调（可 70/30）；Push=Pultec 100%；Pull=SSL 100% |
| 可发现性 | 色环：正常红 / Push 蓝 / Pull 紫；首次 Toast；**双击**切模式；**模式锁**防误触 |
| 染色 | 要能**听出/看出**；Pultec 暖厚偶次，SSL 干净紧奇次；**过载「有点大」要收** |
| EQ | 曲线变化要**够大**（可看）；参数要**好拧** |
| Gain Staging | 输入 dB ≈ 输出 dB；**初步不做任何 gain**；后同意 Output Bus 固定 −6 dB 校准 |
| 缩放 | 右下角拖角 **真缩放 UI** + 提示 |
| 表头 | UV/表针要对**真实播放信号**反应 |
| 命名 | 插件 **BK_EQ_Hybrid**；上级目录 **ReiVerb Work Shop**（不要 Rei_Verb） |
| 工具 | 看曲线用 Bertom；看谐波用 SPAN / Plugin Doctor |
| 流程 | 改动大要先确认；允许用户从 PS 手工拆素材 |

### 5.2 已定交互对照表（思维导图）

| 状态 | 激活 | 路由 |
|------|------|------|
| 正常 Normal | 默认 | Pultec x% + SSL (1−x)%，x 可调 |
| 按下 Push | 双击/按下 | Pultec 100%，SSL 旁通 |
| 拉出 Pull | 双击/拉出 | SSL 100%，Pultec 旁通 |

---

## 6. 未完成的任务与下一步（建议 Codex 优先级）

| 优先 | 任务 | 验收 |
|------|------|------|
| **P0** | **修旋钮与 underlay 对齐** | 对照 `UI\equi_V33.png` 与 Live 截图，逐钮微调 `Interface.js` 坐标/尺寸；用户点名问题 |
| **P0** | **旋钮可玩性** | 拖动手感、吸附档、双击/右键细节 |
| **P1** | **HISE 推拉 Push/Pull** | ScriptPanel：单击=Push、上拖=Pull、旋转=混合；色环变色 |
| **P1** | **拖角真缩放** | 稳定 applyZoom，不启动自触发；边界 0.75–1.35 |
| **P1** | **VU 表针** | 金色指针+弧，跟 `getCurrentLevel` |
| **P2** | 用 PS 精修 filmstrip（用户可提供底盘/指针） | 替换合成图，对齐刻度数字 |
| **P2** | EQ 听感/量程再调 | Bertom 曲线明显；Gain Staging 不破 |
| **P2** | Pultec 低频魔术 80/200 | 曲线可验证 |
| **P3** | 比例 Q、÷3×3、overshoot | 阶段 4 收尾 |
| **P3** | 预设、安装包、测试报告 | 阶段 7–8 |

**开工建议**：先在 Live 挂插件 + Bertom，对照 `equi_V33.png` 调 `Interface.js` 一组坐标 → `rebuild_vst3.ps1` → 再下一组。不要一次改全盘再猜。

---

## 7. 技术链思维（参数 → 音频输出）

### 7.1 完整逻辑链

```text
[UI Interface.js]
  旋钮 onControl
       │
       ├─ PARALLEL ──► pultecGain/sslGain (processorId→SimpleGain.Gain, dB)
       │                    │
       │                    ▼
       │         等增益交叉：gP=1−v, gS=v（0=左 Pultec，1=右 SSL）
       │
       ├─ Pultec 钮 ──► CurveEq "Pultec EQ"  setAttribute(band*5+idx)
       └─ SSL   钮 ──► CurveEq "SSL EQ"      setAttribute(band*5+idx)

[DSP AnalogBlend.xml · 6ch 内部总线]
  In L/R (ch0/1)
    ├─ RouteFX To SSL  : add ch0→2, ch1→3
    ├─ RouteFX To Bleed: add ch0→4, ch1→5
    │
    ├─ ch0/1: CurveEq Pultec EQ → ShapeFX Pultec Sat (Tanh+Bias, 4×OS)
    │         → SimpleGain Pultec Wet (gP)
    ├─ ch2/3: CurveEq SSL EQ → ShapeFX SSL Sat (Atan, 4×OS)
    │         → SimpleGain SSL Wet (gS)
    └─ ch4/5: ShapeFX Bleed Sat → SimpleGain Bleed Level (−24 dB 常驻)
    │
    ├─ RouteFX Mix SSL   : add ch2→0, ch3→1
    ├─ RouteFX Mix Bleed : add ch4→0, ch5→1
    └─ SimpleGain Output Bus (Gain=−6 dB 校准) → Host Out (只映射 ch0/1)
```

### 7.2 参数契约（CurveEq）

| 字段 | 含义 |
|------|------|
| 每带 5 参 | 0=Gain(dB), 1=Freq(Hz), 2=Q, 3=Enabled, 4=Type |
| Type | **0=Peak, 1=LowShelf, 2=HighShelf** |
| 索引 | `band * 5 + param` |
| 模块 ID | `Pultec EQ`（ch0/1）· `SSL EQ`（ch2/3） |

### 7.3 核心算法卡点

| 环节 | 现状 | 卡点 |
|------|------|------|
| EQ 曲线 | CurveEq 固定性格带 + UI 映射 | **低频魔术、比例 Q、overshoot 未做**；量程/听感待标定 |
| 谐波 | ShapeFX Tanh（+Bias 偶次）/ Atan（奇次） | **对称软削，管/运放不等价**；真不对称需 ScriptNode/SNEX 或 WDF |
| 增益 | 等增益交叉 + Output −6 dB | **无 RMS 测量**；依赖 Autogain；null test 未自动化 |
| 过采样 | ShapeFX 4× | 滤波/EQ 段不过采样 |
| UI 绑定 | onControl → setAttribute | 映射表分散在 Interface.js；无参数平滑（拧钮可能爆音） |
| 对齐 | 坐标硬编码 | **与 underlay 视觉对齐未闭环**——产品观感主风险 |

### 7.4 关键文件速查

| 文件 | 职责 |
|------|------|
| `编码\AnalogBlend\Scripts\ScriptProcessors\AnalogBlend\Interface.js` | UI + 绑定 + mix + zoom |
| `编码\AnalogBlend\XmlPresetBackups\AnalogBlend.xml` | 全部 DSP |
| `编码\AnalogBlend\rebuild_vst3.ps1` | 导出→Projucer→MSBuild→安装 |
| `编码\AnalogBlend\Images\*` | 嵌入 VST3 的贴图 |
| `docs\HISE-打开与打包手册.md` | 自己改工程/打包 |
| `docs\Pultec-SSL-复刻路线图.md` | 音色与阶段规划 |
| `docs\compose\spec\gui-eq-complete.md` | GUI 绑定规格与报告 |
| `index.html` + `gui.css` + `gui.js` | 浏览器验收台（推拉/缩放交互原型） |

---

**交接完成。优先修：旋钮对齐 + 手感；再做 HISE 推拉与缩放。**
