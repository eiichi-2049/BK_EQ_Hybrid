# HISE 项目「Analog Blend」启动要点（交接用）

## 目标

做一个 HISE 音频效果插件（VST3）：信号一进二，分别经过
「Pultec 风味」和「SSL 风味」两条链路，最后由中间 PARALLEL
旋钮混合，并尽量保持处理前后音量一致。

## 已确认的关键决策

1. 复刻路线：轻量路线——用 biquad 逼近 EQ 曲线 + 独立饱和/谐波层，
   不做完整 WDF/电路建模。
2. UI 以 PSD 为蓝图：左面板 Pultec、右面板 SSL、中间 PARALLEL 推拉混合。
3. 目标格式：VST3。
4. 谐波行为：插件一挂载就产生谐波，无论 EQ/Mix 是否调整都始终存在；
   只有真正 Bypass（DAW 旁通 / 插件关闭）才让谐波消失。
5. SSL 不加高通/低通滤波器。
6. 中间推拉三态用「位置变化」提示，不用颜色提示；
   直接复用 PSD 中面板已做好的状态显示图层
   （状态 混合工作 / 左侧工作 / 右侧工作）。

## 中间旋钮三态路由

- Normal（正常）：Pultec 50% + SSL 50%
- Push（按下）：Pultec 100%，SSL 旁路
- Pull（拉出）：SSL 100%，Pultec 旁路

## 参数默认值（可后续微调）

Pultec（左面板）：
- 低频 Boost：20 / 30 / 60 / 100 Hz，+13.5 dB
- 低频 Cut（ATTEN）：20 / 30 / 60 / 100 Hz，-17.5 dB
- 高频 Boost：3 / 5 / 10 / 16 kHz，+18 dB，带 Bandwidth
- 高频 Cut：5 / 10 / 20 kHz，-16 dB

SSL（右面板）：
- LF 搁架、HF 搁架：各带频率 + 增益
- LMF 中频：200 Hz–2.5 kHz，Q 约 0.1–3.5
- HMF 中频：600 Hz–7 kHz，Q 约 0.1–3.5
- Proportional-Q：增益越大 Q 越窄

## 任务清单

### 阶段 0：骨架
- 纯 FX 工程、主容器、左右两条并行链路、输出总线
- 先打通直通，编译成 VST3 出声

### 阶段 1：路由与增益
- 输入一分为二（Pultec / SSL）
- 三态路由与 Mix（0–1）
- 常驻谐波 + 真旁通逻辑

### 阶段 2：谐波/饱和层（优先）
- Pultec 管味 waveshaper
- SSL 运放味 waveshaper
- 4x 过采样（可切 8x）

### 阶段 3：Pultec EQ
- LF boost/cut 搁架、HF boost 峰值（带 Q）、HF cut 搁架
- 低频同时 boost+cut 的「魔法曲线」

### 阶段 4：SSL EQ
- LF/HF 搁架、LMF/HMF 钟形
- Proportional-Q、LMF ÷3 / HMF ×3（如面板需要）
- 搁架 overshoot（后期）

### 阶段 5：音量补偿
- RMS 匹配（约 50ms 窗口）
- 验证 unity gain

### 阶段 6：界面
- 按 PSD 搭左/右/中三块面板
- 参数映射、推拉三态、电平表
- 参数平滑防爆音

### 阶段 7：测试
- 频响 / THD / 响度一致性 / CPU 与延迟

### 阶段 8：打包
- 预设、VST3 导出、命名与版本

## 参考文件

- 制作思路文档：E:\个人EQ项目\编码\DeepSeek-整体制作思路音频信号.md
- UI 参考 PSD：E:\个人EQ项目\UI\GPT WORKS\equi 拷贝.psd
- HISE 程序：C:\Program Files\HISE.exe
