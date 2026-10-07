# BK_EQ_Hybrid 鈥?椤圭洰鎬昏涓庣湡瀹炶繘搴?
Pultec + SSL 鍙岄摼璺苟琛屾贩鍚?EQ锛圚ISE 鈫?VST3锛夈€傜洰鏍囷細涓€杩涗簩鍑猴紝涓棿 PARALLEL 鏃犳瀬娣峰悎锛屽父椹昏皭娉紝**Gain Staging锛氳緭鍏ュ灏?dB 杈撳嚭灏介噺淇濇寔澶氬皯 dB**銆?
鏇存柊鏃ユ湡锛?026-09-22

---

## 鐩綍鍦板浘

```text
E:\涓汉EQ椤圭洰\
鈹溾攢 README.md                 鈫?鏈枃浠讹紙鍦板浘 + 鐪熷疄杩涘害锛?鈹溾攢 docs\                     鈫?鏂囨。涓庡弬鑰?鈹? 鈹溾攢 鍒朵綔鎬濊矾-闊抽淇″彿.md
鈹? 鈹溾攢 Pultec-SSL-澶嶅埢璺嚎鍥?md  鈫?鍛?鏇茬嚎/Gain Staging/闃舵鎷嗚В
鈹? 鈹溾攢 AI寤鸿\  寤烘ā\  鎿嶄綔鎵嬪唽\  鏉傞」\
鈹溾攢 UI\                       鈫?瑙嗚璁捐锛圥SD銆佹棆閽礌鏉愩€佸簳鍥撅級
鈹溾攢 鍙戝竷绱犳潗\                  鈫?GitHub Hero 鍥句笌 LOGO
鈹斺攢 缂栫爜\
   鈹溾攢 AnalogBlend\           鈫?HISE 宸ョ▼锛堜富鎴樺満锛?   鈹溾攢 HISE\                  鈫?HISE 4.1.0 婧愮爜
   鈹溾攢 HISE-4.1.0.tar.gz
   鈹斺攢 VST3_SDK.tar.gz
```

鎻掍欢鍚嶏細**BK_EQ_Hybrid**  
浣滆€呯洰褰曪細`ReiVerb Work Shop`  
瀹夎浜х墿锛歚E:\VST3\ReiVerb Work Shop\BK_EQ_Hybrid.vst3`

---

## 闃舵杩涘害

| 闃舵 | 鍐呭 | 鐘舵€?| 璇存槑 |
|------|------|------|------|
| 0 楠ㄦ灦 | FX 宸ョ▼銆佺紪璇戝嚭 VST3 | **瀹屾垚** | 宸插畨瑁?ReiVerb Work Shop 鐩綍 |
| 1 璺敱涓庡鐩?| 涓€杩涗簩銆佹棤鏋?Mix銆佸父椹昏皭娉綅 | **宸插疄鐜?* | 杩炵画浜ゅ弶琛板噺锛沺rocessorId 缁戝畾 Pultec/SSL Wet锛涚姸鎬佺伅浠呮寚绀?|
| 2 璋愭尝/楗卞拰 | 绠″懗 / 杩愭斁鍛炽€佽繃閲囨牱 | **ShapeFX Tanh/Atan + 4脳 OS** | Pultec Tanh Bias0.22 Gain+9 路 SSL Atan Gain+5 路 Bleed 鈭?4 dB |
| 3 Pultec EQ | 鎼佹灦 + 宄板€?+ 浣庨榄旀硶鏇茬嚎 | **杩涜涓?* | CurveEq 鎬ф牸鏇茬嚎宸叉湁锛屽畬鏁存棆閽槧灏勮繘琛屼腑 |
| 4 SSL EQ | 鎼佹灦 / 閽熷舰 / 姣斾緥 Q / 梅3脳3 | **杩涜涓?* | CurveEq 鎬ф牸鏇茬嚎宸叉湁锛屽畬鏁存棆閽槧灏勮繘琛屼腑 |
| 5 闊抽噺琛ュ伩 | **Gain Staging锛欼/O 瀵归綈** | **鏍″噯涓?* | Output Bus 褰撳墠 鈭? dB 浣?I/O 鏍″噯锛涚洰鏍囪緭鍏モ増杈撳嚭 |
| 6 鐣岄潰 | 鍏ㄥ鏃嬮挳銆佺數骞宠〃 | **杩涜涓?* | 鏃嬮挳甯冨眬瀹屾垚銆佺粦瀹氳繘琛屼腑锛沠ilmstrip 宸插祵鍏?|
| 7 娴嬭瘯 | 棰戝搷 / THD / CPU | 鏈仛 | |
| 8 鎵撳寘 | 棰勮銆佺増鏈€佸彂琛?| 鏈仛 | 鐗堟湰 0.1.0 |

---

## Gain Staging锛堢‖绾︽潫 路 2026-09-22锛?
> **杈撳叆澶氬皯 dB锛岃緭鍑哄敖閲忎繚鎸佸灏?dB銆?*

- 鍏ㄧ▼ 鈮?0 dB 閫氳繃锛涙彃浠朵笉鏄€屾洿鍝嶃€嶅伐鍏?- **Output Bus 褰撳墠 鈭? dB 浣?I/O 鏍″噯**锛涚洰鏍囦粛涓鸿緭鍏モ増杈撳嚭
- 楗卞拰灞?**Autogain=1**锛屽姞鏌撲笉鍔犲搷
- PARALLEL 0.5 绛夊鐩婃眰鍜?鈮?0 dB锛涚鐐瑰崟璺?鈮?0 dB
- Bleed 寰堝皬锛堚垝24 dB锛夛紝涓嶅緱鎶搷搴?- 楠屾敹锛氭梺閫氬搷搴﹀樊 < ~0.3 dB
- 鍝嶅害鍋忕Щ鍏堜慨閾捐矾 / 鏍″噯鍊硷紝**涓嶅姞杈撳嚭琛ュ伩鎺ㄥ瓙**
- 闃舵 5 RMS makeup **鏆傜紦**

璇﹁ `docs\Pultec-SSL-澶嶅埢璺嚎鍥?md` 搂0銆?
---

## 闃舵 1 淇″彿鎷撴墤锛? 閫氶亾锛?
```text
杈撳叆 L/R (ch0,1)
    鈹溾攢 RouteFX To SSL   : send 0鈫?, 1鈫?
    鈹溾攢 RouteFX To Bleed : send 0鈫?, 1鈫?
    鈹?    鈹溾攢 [ch0,1] Pultec 鈫?ShapeFX "Pultec Sat" (Tanh) 鈫?SimpleGain "Pultec Wet"
    鈹溾攢 [ch2,3] SSL    鈫?ShapeFX "SSL Sat"    (Atan) 鈫?SimpleGain "SSL Wet"
    鈹斺攢 [ch4,5] 璋愭尝鏃佽矾 鈫?ShapeFX "Bleed Sat" 鈫?SimpleGain "Bleed Level"
    鈹?    鈹溾攢 RouteFX Mix SSL   : send 2鈫?, 3鈫?
    鈹溾攢 RouteFX Mix Bleed : send 4鈫?, 5鈫?
    鈹斺攢 SimpleGain "Output Bus" (鈭? dB 鏍″噯) 鈫?涓绘満绔嬩綋澹?(鍙槧灏?ch0,1)
```

### PARALLEL 鏃犳瀬杩炵画娣峰悎锛?鈥?锛屼笉鍚搁檮锛?
| 浣嶇疆 | Pultec Wet | SSL Wet | 鐘舵€佺伅锛堜粎鎸囩ず锛?|
|------|------------|---------|------------------|
| 0.0锛圫SL锛?| 鈭掆垶 | 0 dB | status_right |
| 0.5锛堝悇鍗婏級 | 鈭?.02 dB | 鈭?.02 dB | status_mix |
| 1.0锛圥ultec锛?| 0 dB | 鈭掆垶 | status_left |

- 闊抽鍊?*杩炵画浜ゅ弶琛板噺**锛坄gPultec = mix`锛宍gSSL = 1鈭抦ix`锛?- **processorId 缁戝畾** `Pultec Wet` / `SSL Wet`
- 鐘舵€佺伅鎸夊尯闂村垏鎹紝涓嶅弽鍚戝惛闄勬棆閽?- 璋愭尝鏃佽矾涓嶅彈 Mix 褰卞搷锛涚湡鏃侀€氫粎 DAW

### 璋愭尝灞傦紙ShapeFX锛?
| 妯″潡 | 鏇茬嚎 | 鍙傛暟 |
|------|------|------|
| Pultec Sat | Tanh + Bias 0.22 | Gain +9 dB 路 OS 4脳 路 Autogain |
| SSL Sat | Atan | Gain +5 dB 路 OS 4脳 路 Autogain |
| Bleed Sat | Tanh | Level 鈭?4 dB |

`Width` 涓€寰?100锛圚ISE 0=鍗曞０閬擄級銆?
---

## GUI锛?280脳720锛?
| 鍖哄煙 | 鍐呭 |
|------|------|
| 宸?| Pultec 8 鏃嬮挳 |
| 涓?| PARALLEL + 鐘舵€佺伅 |
| 鍙?| SSL 10 鏃嬮挳 + 澶栧湀 |

- filmstrip 宸插祵鍏?- 鏃嬮挳甯冨眬瀹屾垚锛岀粦瀹氳繘琛屼腑

---

## CurveEq锛堟€ф牸 / 浜掕ˉ鏇茬嚎锛?
- **浜掕ˉ/鎬ф牸鏇茬嚎**锛堥潪绾嚎鎬т华琛ㄦ洸绾匡級
- Type 鏋氫妇锛歚Peak=0` 路 `LowShelf=1` 路 `HighShelf=2`
- 姣忓甫 **5 鍙傛暟**

---

## 姒傚康澶囧繕

- **澶辩湡 鈮?EQ 鏇茬嚎**锛欱ertom 鐪嬫洸绾匡紝SPAN / Plugin Doctor 鐪嬭皭娉?
---

## 宸ョ▼瑕佺偣

- 椤圭洰锛歚缂栫爜\AnalogBlend`锛圚ISE 4.1.0锛?- 涓€閿噸缂栵細`缂栫爜\AnalogBlend\rebuild_vst3.ps1`
- DSP 婧愶細`缂栫爜\AnalogBlend\XmlPresetBackups\AnalogBlend.xml`
- 鐣岄潰鑴氭湰锛歚缂栫爜\AnalogBlend\Scripts\ScriptProcessors\AnalogBlend\Interface.js`

## 鍐崇瓥澶囧繕

1. 杞婚噺澶嶅埢锛歜iquad/CurveEq 閫艰繎 EQ + 鐙珛楗卞拰灞傦紝涓嶅仛瀹屾暣 WDF
2. UI 浠?PSD 涓鸿摑鍥撅細宸?Pultec / 鍙?SSL / 涓?PARALLEL锛?280脳720
3. 鐩爣鏍煎紡 VST3锛涘垎绫?EQ锛涙彃浠跺悕 BK_EQ_Hybrid锛圧eiVerb Work Shop锛?4. 璋愭尝鎸傝浇鍗冲瓨鍦紝浠?DAW 鐪熸梺閫氭墠娑堝け
5. SSL 涓嶅姞楂橀€?浣庨€?6. 涓夋€佺敤浣嶇疆/鐘舵€佸浘灞傛彁绀猴紝涓嶇敤棰滆壊鎻愮ず
7. **Gain Staging锛堢‖绾︽潫锛?*锛氳緭鍏ュ灏?dB 杈撳嚭灏介噺淇濇寔澶氬皯 dB锛汷utput Bus 褰撳墠 鈭? dB 浣?I/O 鏍″噯銆傝瑙?`docs\Pultec-SSL-澶嶅埢璺嚎鍥?md` 搂0
8. **澶辩湡 鈮?EQ 鏇茬嚎**锛欱ertom 鐪嬫洸绾匡紝SPAN / Plugin Doctor 鐪嬭皭娉?
---

## 涓轰綍涓嶇敤宓屽 EffectChain

HISE 鐨?`EffectProcessorChain` 涓嶈兘浣滀负鍙︿竴鏉?FX 閾剧殑瀛愬鐞嗗櫒琚?`createProcessor` 鍒涘缓銆傚苟琛屽繀椤婚潬 **澶氶€氶亾缂撳啿 + RouteFX 鐨?Send 鐭╅樀** 鍋氬鍒?鍚堝苟锛屽啀鐢ㄥ悇 MasterEffect 鐨?RoutingMatrix 鎸囧畾瀹冨鐞嗗摢涓€瀵归€氶亾銆?

