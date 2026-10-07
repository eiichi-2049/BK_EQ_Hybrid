# HISE 打开工程与打包 VST3 手册（BK_EQ_Hybrid）

适用：Windows · HISE 4.1.0 · VS 2026（MSVC v145）  
工程：`E:\个人EQ项目\编码\AnalogBlend`  
一键脚本：`E:\个人EQ项目\编码\AnalogBlend\rebuild_vst3.ps1`

---

## 一、打开 HISE

### 方式 A：安装版（推荐）
1. 运行 `C:\Program Files\HISE.exe`  
   （若无，在开始菜单搜 **HISE**）
2. 首次可能问 **HISE 路径 / Project 路径**，可先跳过，用菜单打开工程。

### 方式 B：从源码目录
- 源码在 `E:\个人EQ项目\编码\HISE`
- 若编译过，可找 `HISE.exe` 或 `tools\Projucer\Projucer.exe`（工程工具，不是 HISE 本体）

### 打开本工程
1. HISE 菜单 **File → Open Project…**
2. 选文件夹：`E:\个人EQ项目\编码\AnalogBlend`
3. 应看到项目名 **Analog Blend / BK_EQ_Hybrid**（名称在 project_info.xml）

---

## 二、工程里改什么

| 文件 | 作用 | 改 UI/逻辑 |
|------|------|------------|
| `Scripts\ScriptProcessors\AnalogBlend\Interface.js` | **全部界面 + 旋钮绑定** | 挪坐标、换图、改事件 |
| `XmlPresetBackups\AnalogBlend.xml` | DSP 链（EQ/饱和/路由） | 改效果器 |
| `Images\*.png` | 贴图（底图、filmstrip、图标） | 换素材后同名覆盖 |
| `project_info.xml` | 插件名、版本、Bundle | 改 **Name=BK_EQ_Hybrid** |
| `user_info.xml` | **作者目录名** | **Company=ReiVerb Work Shop** |

### 在 HISE 里改界面（推荐）
1. 打开工程后，左侧找 **Interface** 脚本（Interface.js）
2. 或菜单 **View → Interface Editor / Script Interface**
3. 画布逻辑尺寸 **1280×720**
4. 改完记得 **保存脚本**

### 素材约定（重要）
- filmstrip 用 **纵向** 长条：`宽=帧宽`，`高=帧宽×91`，自上而下 −135°→+135°
- 脚本里写法：`knob.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");`
- 图放 `Images\`，不要嵌套子文件夹
- 每个要显示图的 **Panel** 必须自己 `loadImage` + `setImage`（不能只在别的组件上 load）

---

## 三、打包 VST3

### 路线 1：一键脚本（最稳）
```powershell
powershell -ExecutionPolicy Bypass -File "E:\个人EQ项目\编码\AnalogBlend\rebuild_vst3.ps1"
```

脚本会：
1. HISE 导出工程与资源（生成 `Binaries\Source\PresetData.cpp` 等）
2. 关 IPP、Projucer 重生成 VS 工程
3. 补丁工具集 v145 + 关 VST2 兼容宏
4. MSBuild 编译
5. 复制到 `E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3`

**看日志关键字**：
- `Loading the preset...DONE` 且无 `Line xx: ... error` → 脚本 OK
- `完成：...BK_EQ_Hybrid.vst3` → 编译 OK
- `已安装：E:\VST3\...` → 拷贝 OK

若报 **文件被占用**：先在 Live 里卸载插件，或完全退出 Live 再跑脚本。

### 路线 2：HISE 菜单导出
1. HISE 菜单 **Export → Compile Project As → VST3**  
   （有的版本叫 **Compile to Plugin / Multi-Export**）
2. 目标平台 **Windows x64**，格式 **VST3**
3. 导出后仍建议跑一遍脚本里的 **Projucer + MSBuild**（或整个 `rebuild_vst3.ps1`）  
   因为本机工具集补丁（v145、关 IPP）写在脚本里。

### 路线 3：只编译不打包
在 `Binaries\Builds\VisualStudio2022\` 打开 `Analog Blend.sln`，选 **Release | x64**，生成 **Analog Blend_VST3**。  
产物：`Binaries\Compiled\VST3\Analog Blend.vst3`，再手动复制到：
```
E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3
```

---

## 四、在 Ableton Live 里加载

1. 选项 → 插件 → **重新扫描** VST3  
   （或把 `E:\VST3\ReiVerb Work Shop\` 加入 VST3 搜索路径）
2. 插件名：**BK_EQ_Hybrid**  
   厂商目录：**ReiVerb Work Shop**
3. 挂到 MIDI/音频轨后打开 GUI

---

## 五、常见问题

| 现象 | 处理 |
|------|------|
| 脚本 `function not found` / `local` 报错 | 只在 `inline function` 或回调里用 `local`；paint 回调用 `reg`；组件方法必须写在**具名组件**上（不能写在函数参数上） |
| 旋钮是默认灰皮 | `filmstripImage` 要 `"{PROJECT_FOLDER}文件.png"`；图条必须**纵向**；`numStrips` 与帧数一致 |
| 图不显示 | 组件上自己 `loadImage` 再 `setImage` |
| 拷贝 VST3 失败 | Live 占用 → 卸载插件/退出 Live |
| 公司代码非法 | `user_info.xml` 的 `CompanyCode` 必须像 `Abcd`（首字母大写，4 字符） |
| 改了脚本无效 | 确认保存的是 `Interface.js`，再跑 `rebuild_vst3.ps1` |

---

## 六、当前 DSP 映射（改 EQ 时对照）

CurveEq：`Pultec EQ` / `SSL EQ`，每带 5 参数：`Gain, Freq, Q, Enabled, Type`  
`Type`: 0=Peak, 1=LowShelf, 2=HighShelf  
索引：`band*5 + param`

PARALLEL：0 = 左/Pultec，1 = 右/SSL（等增益交叉，`Pultec Wet` / `SSL Wet`）

---

## 七、建议自测顺序

1. 只改 `Interface.js` 里一个旋钮 `x, y` → 重编 → 看位置  
2. 换一张 `Images\fs_pultec.png` → 重编 → 看皮肤  
3. 改 `AnalogBlend.xml` 一个 Gain → Bertom 看曲线  

先跑 `rebuild_vst3.ps1`，比在 HISE 里点导出更不容易踩工具集坑。
