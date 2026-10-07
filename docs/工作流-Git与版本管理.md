# 工作流 · Git 与版本管理

适用仓库：<https://github.com/eiichi-2049/BK_EQ_Hybrid>（Public · 默认分支 `main`）
本机工作区：`E:\个人EQ项目`（即仓库根目录）
最后更新：2026-10-07

---

## 1. 仓库定位

这个仓库要同时承担两件事，务必分清：

| 用途 | 内容 | 谁来改 |
|---|---|---|
| **发行门面** | 根 `README.md`（产品介绍、界面预览、下载指引）、`VST3 Plugin/<版本>/`、GitHub Releases | 面向使用者，措辞需谨慎 |
| **源码与过程记录** | `编码/`、`docs/`、`UI/`、`发布素材/` | 面向开发，可自由迭代 |

> **根 README 已改作开发入口**。原先面向使用者的那段首页文档（含 GitHub 附件插图）已存档到
> [`legacy/README.2026-07-repo.md`](../legacy/README.2026-07-repo.md)——因为 GitHub 附件图片链接只在仓库页面可显示。
> **若要恢复成对外首页**：把该文件内容覆盖回根 `README.md` 即可；开发说明则可移到 `docs/`。

远端现状：`main` 上共 13 个提交，全部是 2026-05 ~ 2026-07 期间的 README 修改，**不含任何源码**。本仓库是第一批源码提交。

> ⚠️ **本地与远端是两条无关历史。** 本地仓库是重新 `git init` 的，没有远端那 13 个提交的父链，因此首次推送**不能**用普通 `git push`（会被 `non-fast-forward` 拒绝）。见第 2 节。

---

## 2. 首次推送（需要你手动执行一次）

本机的沙箱环境无法完成网络推送，且凭据库为空，因此首次推送请在你自己的 PowerShell 里执行：

```powershell
cd E:\个人EQ项目

# 1) 修正行尾与中文路径显示（重要）
git config core.autocrlf false
git config core.quotepath false

# 2) 确认远端与分支
git remote -v                 # 应为 git@github.com:eiichi-2049/BK_EQ_Hybrid.git
git branch --show-current     # 应为 main

# 3) 推送
git push -u origin main
```

### 2.1 为什么首次推送要用 `--force-with-lease`

本地是全新历史，远端已有 13 个提交，两者没有共同祖先。直接 `git push` 必然被拒。
`--force-with-lease` 会在**确认远端仍是你已知的那个提交**后才覆盖，比 `--force` 安全——若远端被别人推过新东西，它会拒绝而不是静默丢弃。

```powershell
git push -u --force-with-lease origin main
```

**旧历史不会丢。** 推送前先把远端那个提交挂到备份分支上，GitHub 上就能完整翻到：

```powershell
# 远端 main 原指向 588d754（chore: Bold the ongoing progress statement in README）
git branch backup/readme-history 588d754
git push origin backup/readme-history
```

之后若不再需要，在 GitHub 上删掉该分支即可（提交仍可通过直接 URL 访问）。

> 若远端 `main` 的提交号已经不是 `588d754`（说明仓库被别人动过），**先停下来核对**再推。

### 2.2 认证说明（本机实测结论，省得你再踩一遍）

| 方式 | 状态 | 说明 |
|---|---|---|
| **SSH**（`git@github.com`） | ⚠️ 密钥可用但**沙箱下必失败** | 密钥 `~/.ssh/id_rsa` 已授权给 `eiichi-2049`（`ssh -T git@github.com` 能成功握手）。但从 git 内部调用会报 `couldn't create signal pipe, Win32 error 5`——这是受限运行环境的命名管道限制。**在你自己的终端里通常可用**。 |
| **HTTPS + GCM** | ⚠️ 需先登录一次 | GCM 2.8.0 已随 Git 安装。HTTPS 能正常启动辅助进程，仅缺凭证。首次 `git push` 会弹浏览器/设备码授权。 |
| **HTTPS + schannel** | ❌ 当前会报 `SEC_E_NO_CREDENTIALS` | Windows 凭据库为空时的 TLS 层报错，不是 GitHub 拒绝。登录 GCM 或改用 SSH 后即消失。 |

若 SSH 在你终端里也报同样的 pipe 错误，就走 HTTPS：

```powershell
git remote set-url origin https://github.com/eiichi-2049/BK_EQ_Hybrid.git
git push -u origin main        # 会走 GCM 授权流程
```

> 用 HTTPS 时上面的 `--force-with-lease` 同样适用，只把 remote url 换掉即可。首次推送约 243 MB，视网络需要一两分钟。

---

## 3. 分支与提交约定

### 3.1 分支

| 分支 | 用途 |
|---|---|
| `main` | 始终可编译、可发版。**不直接在上面做实验** |
| `feat/<主题>` | 新功能，如 `feat/v2-dsp-core` |
| `fix/<主题>` | 修缺陷，如 `fix/pultec-band-mapping` |
| `chore/<主题>` | 构建、素材、文档整理 |

单人开发时也可直接在 `main` 小步提交，但**改动大或要试错时请开分支**——v1 阶段的教训是反复试错没有回滚点，代价很高。

### 3.2 提交信息

采用 Conventional Commits，中文描述正文：

```text
<type>(<范围>): <一句话说明>

fix(ui): Pultec 旋钮绘制尺寸改为按控件 rect 反算
feat(dsp): 加入 SSL LMF ÷3 与 HMF ×3 增益分配
docs(workflow): 补充首次推送的认证说明
chore(repo): 忽略 Binaries 与大体积 PSD
```

`type`：`feat` / `fix` / `docs` / `chore` / `refactor` / `test` / `build`
`范围` 建议用：`ui` / `dsp` / `router` / `vu` / `repo` / `docs` / `assets`

### 3.3 每次提交前自检

- [ ] 没有把 `Binaries/`、`*.psd`、`*.vst3` 误加进来（见 `git status` 输出）
- [ ] 改了 `Interface.js` / DSP 的，已在 DAW 里实测过
- [ ] 文档里的路径与实际一致（尤其 `编码/AnalogBlend` 相关引用）
- [ ] 源码文件是 UTF-8

---

## 4. 什么进仓库、什么不进

规则写在 [`.gitignore`](../.gitignore)，当前量化结果：

| | 文件数 | 体积 |
|---|---|---|
| **入库** | 248 | 288 MB |
| **留本地** | 5457 | 1.16 GB |

**不入库**及原因：

| 内容 | 原因 |
|---|---|
| `编码/HISE/` | HISE 4.1.0 源码，第三方 vendor 而非本项目代码 |
| `Binaries/` | 编译产物，`Analog Blend.lib` 单个 260 MB，`.pdb` 各 59 MB |
| `*.psd` | 最大近 60 MB（`HERO IMAGE.psd`）；工作副本留本机即可 |
| `*.vst3` | 二进制产物，发行走 Releases |
| `*.lib/*.pdb/*.obj/*.exe` | 可重建产物，且 GitHub 单文件上限 100 MB |

**注意**：`UI/`（132 MB）与 `发布素材/`（90 MB）是入库的，其中 `UI/Trash/` 有 4 个废弃版各约 10 MB。
若日后仓库变大影响 clone，优先从这里瘦身（如把 `UI/Trash/` 移出仓库）。

**未启用 Git LFS**。若将来要入库 PSD，需先 `git lfs install` 并补 `.gitattributes` 规则。

### 4.1 自动化把关

| 设施 | 作用 |
|---|---|
| [`tools/check-repo-hygiene.ps1`](../tools/check-repo-hygiene.ps1) | 仓库体检：超大文件、构建产物/PSD 混入、残留冲突标记 |
| [`.github/workflows/repo-check.yml`](../.github/workflows/repo-check.yml) | 每次 push / PR 在 GitHub 上跑同一份体检脚本，另校验 `VST3 Plugin/<版本>/` 命名 |

本地提交前建议跑一次：

```powershell
powershell -ExecutionPolicy Bypass -File tools\check-repo-hygiene.ps1
```

判定阈值：单文件 ≥ 20 MB 告警，≥ 50 MB 直接失败。CI 与本地**共用同一份脚本**，避免规则漂移。

---

## 5. 构建与本地测试

### 5.1 v1（HISE，已冻结）

```powershell
powershell -ExecutionPolicy Bypass -File "编码\AnalogBlend\rebuild_vst3.ps1"
# 产物安装到 E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3
```

脚本五步：HISE `export_ci` → 关 IPP → Projucer 重生成 VS 工程 → 补 v145 工具集/关 VST2 宏 → MSBuild → 复制安装。
看日志关键行：`Loading the preset...DONE`（无 `Line xx: error`）、`完成：`、`已安装：`。

若报文件被占用：先在 DAW 里卸载插件或退出 DAW 再跑。

### 5.2 本机版本留存

```powershell
# 推荐：自动完成「旧版留档 → 安装 → 存为上一个版本」
powershell -ExecutionPolicy Bypass -File tools\install-vst3.ps1 -Label v1.0.1
```

脚本行为：校验源文件 → 把安装位旧文件按标签留档到 `LEGACY\BK_EQ_Hybrid_<标签>.vst3`
→ 复制安装 → 再把当前版本存为 `LEGACY\BK_EQ_Hybrid.vst3`（始终代表「上一个版本」）。

手动等价操作：

```powershell
Copy-Item 'E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3' `
          'E:\VST3\ReiVerb Work Shop\LEGACY\' -Force
```

`LEGACY\` 仅作本机历史留存与对比试听，**不参与发行**。

> **注意**：`E:\VST3\...` 在工作区之外。受限运行环境下写入会被拒绝并报
> `Access to the path ... is denied`——那**不是** DAW 占用，是文件系统权限边界。
> 该脚本请在你自己的终端里执行。

### 5.3 编码约定

仓库内文本文件统一 **LF**（由 [`.gitattributes`](../.gitattributes) 强制）。本机 `core.autocrlf=true` 已在第 2 节让你改成 `false`，避免整文件换行差异污染 diff。

---

## 6. 发行流程

远端已有的版本目录约定：`VST3 Plugin/<版本号>/`（现存 `1.0.1`）。

```powershell
# 1) 确认 main 干净且可编译
git status                      # 应为 clean
powershell -ExecutionPolicy Bypass -File "编码\AnalogBlend\rebuild_vst3.ps1"

# 2) 同步版本号：编码\AnalogBlend\project_info.xml 的 <Version>
#    以及本次发行的实际产物

# 3) 打标签（与版本号一致）
git tag -a v1.0.2 -m "BK_EQ_Hybrid v1.0.2"
git push origin v1.0.2

# 4) 在 GitHub 建 Release：附上 BK_EQ_Hybrid.vst3
#    https://github.com/eiichi-2049/BK_EQ_Hybrid/releases/new

# 5) 如需入库版本目录（可选，注意单文件 100 MB 限制）
#    把产物放到 "VST3 Plugin/1.0.2/" 后提交
```

**发行产物一律走 Releases**（`VST3 Plugin/` 目录为辅）。当前 VST3 约 32.9 MB，未超限，但入库会让仓库每次发版膨胀，故默认不入库。

### 标签命名

| 标签 | 含义 |
|---|---|
| `v1.0.0-hise` | v1 HISE 实现的冻结基线（存档用，不是发行版） |
| `v1.0.1` | 与远端 `VST3 Plugin/1.0.1/` 对应 |
| `v2.0.0` | v2 重构首个发行版 |

---

## 7. 本项目的文档驱动写法

`docs/compose/spec/` 下每个功能一份 markdown，已形成固定格式（v1 阶段沿用了 3 份：`gui-eq-complete`、`vu-meter-audio`、`p1-ui-control`）。**新功能请沿用**：

```markdown
---
feature: <短名>
status: draft | delivered
updated: YYYY-MM-DD
branch: <分支名>
commits: <短 sha 列表>
---

# <标题>

## Report
**What was built** — 一两句，说清最终交付了什么
**Verification** — 用什么命令/手段验证过，结果如何
**Journey log** — 踩到的坑与结论（这段最有价值，别省）

## [S1] Problem        ← 要解决什么
## [S2] Design         ← 方案、参数表、接口契约
## [S3] Out of Scope   ← 明确不做什么

## Tasks
- [x] T1: <任务> — acceptance: <可验收判据> (covers: S2.x)
```

好处是：交付后仍能回答「当时为什么这么设计」「验证到什么程度」，且 `covers:` 让任务与设计条目可追溯。

---

## 8. 本机环境备忘

| 项 | 值 |
|---|---|
| 工作区 / 仓库根 | `E:\个人EQ项目` |
| 远端 | `git@github.com:eiichi-2049/BK_EQ_Hybrid.git`（默认 `main`） |
| Git | 2.55.0.windows.2 |
| 提交身份 | `Eiichi-2049 <eiichi2049@gmail.com>`（本机全局） |
| 远端历史作者 | `842058850water@gmail.com`（旧提交，无需改动） |
| 凭据 | **未配置**，首次推送需认证（见第 2 节） |
| HISE | 安装版 `C:\Program Files\HISE.exe`；源码 `编码\HISE` |
| MSBuild | VS 18 Community · MSVC v145 |
| VST3 安装位 | `E:\VST3\ReiVerb Work Shop\` |
| DAW | Ableton Live |

### 已知的历史遗留问题

1. **旧 `README.md` 字节级损坏** — UTF-8 内容被按 cp936 再编码过一次，`encode('gbk')` 也无法还原。已存档为 [`legacy/README.corrupt-2026-09-22.md`](../legacy/README.corrupt-2026-09-22.md)，**不要试图修**，需要内容请重写。
2. **`UI预览.png` 不是真实渲染** — 合成图，缺 VU 表盘与 PARALLEL 面板，不可用作对齐基准。
3. **`index.html` / `gui.js` / `gui.css` 已失效** — JS 引用了大量不存在的 DOM。保留原因：若 v2 走 WebView 前端路线，其 CSS 视觉与交互思路可复用；否则可删。
4. **`E:\VST3\...` 在工作区外** — 受限环境下写入被拒（`Access ... denied`），与 DAW 占用是不同的原因，别混淆。安装类脚本请在自己终端跑。
5. **`.ps1` 脚本需存为 UTF-8 with BOM** — PowerShell 5.1 会按 ANSI 读取无 BOM 的 UTF-8 文件，中文会把引号解析坏（本仓库的 `tools\*.ps1` 均已加 BOM）。
