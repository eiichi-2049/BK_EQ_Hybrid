Content.makeFrontInterface(1280, 720);

// ============================================================
//  BK_EQ_Hybrid · P0 坐标按 underlay_V2 占位圆实测
//  0=左/Pultec · 1=右/SSL · 底图 bg.png (已去占位圆)
//  实测中心/尺寸见 p0_crops/layout.json
// ============================================================

const var BG = Content.addPanel("BG", 0, 0);
BG.setPosition(0, 0, 1280, 720);
BG.loadImage("{PROJECT_FOLDER}bg.png", "bg");
BG.setImage("bg", 0, 0);

// ---------- 左 Pultec 黑钮（占位圆实测） ----------
// Row1  BOOST / BD.WITH / 3-5-10-16k
const var pBoost = Content.addKnob("pBoost", 67, 136);
pBoost.set("width", 116); pBoost.set("height", 116);
pBoost.set("mode", "Linear"); pBoost.set("min", 0); pBoost.set("max", 24);
pBoost.set("stepSize", 0.01); pBoost.set("defaultValue", 0);
pBoost.set("text", "BOOST"); pBoost.set("saveInPreset", true);
pBoost.set("showTextBox", false);
pBoost.set("mouseSensitivity", 4.0);
pBoost.set("dragDirection", "Diagonal");
pBoost.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pBoost.set("isVertical", true); pBoost.set("scaleFactor", 0.725000);
pBoost.set("numStrips", 91);

const var pBdWith = Content.addKnob("pBdWith", 210, 136);
pBdWith.set("width", 116); pBdWith.set("height", 116);
pBdWith.set("mode", "Linear"); pBdWith.set("min", 0); pBdWith.set("max", 1);
pBdWith.set("stepSize", 0.005); pBdWith.set("defaultValue", 0.5);
pBdWith.set("text", "BD.WITH"); pBdWith.set("saveInPreset", true);
pBdWith.set("showTextBox", false);
pBdWith.set("mouseSensitivity", 4.0);
pBdWith.set("dragDirection", "Diagonal");
pBdWith.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pBdWith.set("isVertical", true); pBdWith.set("scaleFactor", 0.725000);
pBdWith.set("numStrips", 91);

const var pHfSel = Content.addKnob("pHfSel", 360, 162);
pHfSel.set("width", 78); pHfSel.set("height", 78);
pHfSel.set("mode", "Linear"); pHfSel.set("min", 0); pHfSel.set("max", 3);
pHfSel.set("stepSize", 1); pHfSel.set("defaultValue", 0);
pHfSel.set("text", "3/5/10/16k"); pHfSel.set("saveInPreset", true);
pHfSel.set("showTextBox", false);
pHfSel.set("mouseSensitivity", 3.0);
pHfSel.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec_sel.png");
pHfSel.set("isVertical", true); pHfSel.set("scaleFactor", 0.487500);
pHfSel.set("numStrips", 4);

// Row2  ATTEN. / ATTEN.SEL
const var pAtten = Content.addKnob("pAtten", 65, 319);
pAtten.set("width", 116); pAtten.set("height", 116);
pAtten.set("mode", "Linear"); pAtten.set("min", 0); pAtten.set("max", 24);
pAtten.set("stepSize", 0.01); pAtten.set("defaultValue", 0);
pAtten.set("text", "ATTEN."); pAtten.set("saveInPreset", true);
pAtten.set("showTextBox", false);
pAtten.set("mouseSensitivity", 4.0);
pAtten.set("dragDirection", "Diagonal");
pAtten.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pAtten.set("isVertical", true); pAtten.set("scaleFactor", 0.725000);
pAtten.set("numStrips", 91);

const var pAttenSel = Content.addKnob("pAttenSel", 209, 319);
pAttenSel.set("width", 116); pAttenSel.set("height", 116);
pAttenSel.set("mode", "Linear"); pAttenSel.set("min", 0); pAttenSel.set("max", 3);
pAttenSel.set("stepSize", 1); pAttenSel.set("defaultValue", 0);
pAttenSel.set("text", "ATTEN.SEL"); pAttenSel.set("saveInPreset", true);
pAttenSel.set("showTextBox", false);
pAttenSel.set("mouseSensitivity", 2.5);
pAttenSel.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pAttenSel.set("isVertical", true); pAttenSel.set("scaleFactor", 0.725000);
pAttenSel.set("numStrips", 91);

// Row3  ATTEN. / BOOST / 20-30-60-100
const var pAtten2 = Content.addKnob("pAtten2", 67, 506);
pAtten2.set("width", 116); pAtten2.set("height", 116);
pAtten2.set("mode", "Linear"); pAtten2.set("min", 0); pAtten2.set("max", 24);
pAtten2.set("stepSize", 0.01); pAtten2.set("defaultValue", 0);
pAtten2.set("text", "ATTEN."); pAtten2.set("saveInPreset", true);
pAtten2.set("showTextBox", false);
pAtten2.set("mouseSensitivity", 4.0);
pAtten2.set("dragDirection", "Diagonal");
pAtten2.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pAtten2.set("isVertical", true); pAtten2.set("scaleFactor", 0.725000);
pAtten2.set("numStrips", 91);

const var pBoost2 = Content.addKnob("pBoost2", 210, 506);
pBoost2.set("width", 116); pBoost2.set("height", 116);
pBoost2.set("mode", "Linear"); pBoost2.set("min", 0); pBoost2.set("max", 24);
pBoost2.set("stepSize", 0.01); pBoost2.set("defaultValue", 0);
pBoost2.set("text", "BOOST"); pBoost2.set("saveInPreset", true);
pBoost2.set("showTextBox", false);
pBoost2.set("mouseSensitivity", 4.0);
pBoost2.set("dragDirection", "Diagonal");
pBoost2.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec.png");
pBoost2.set("isVertical", true); pBoost2.set("scaleFactor", 0.725000);
pBoost2.set("numStrips", 91);

const var pLfSel = Content.addKnob("pLfSel", 360, 531);
pLfSel.set("width", 78); pLfSel.set("height", 78);
pLfSel.set("mode", "Linear"); pLfSel.set("min", 0); pLfSel.set("max", 3);
pLfSel.set("stepSize", 1); pLfSel.set("defaultValue", 0);
pLfSel.set("text", "20/30/60/100"); pLfSel.set("saveInPreset", true);
pLfSel.set("showTextBox", false);
pLfSel.set("mouseSensitivity", 3.0);
pLfSel.set("filmstripImage", "{PROJECT_FOLDER}fs_pultec_sel.png");
pLfSel.set("isVertical", true); pLfSel.set("scaleFactor", 0.487500);
pLfSel.set("numStrips", 4);

// ---------- 中 VU + PARALLEL ----------
const var vu = Content.addPanel("vu", 524, 163);
vu.setPosition(524, 163, 268, 172);
vu.loadImage("{PROJECT_FOLDER}vu_meter.png", "vuImg");
vu.setImage("vuImg", 0, 0);
vu.loadImage("{PROJECT_FOLDER}vu_needle_gold.png", "vuNG");
vu.loadImage("{PROJECT_FOLDER}vu_needle_red.png", "vuNR");
vu.loadImage("{PROJECT_FOLDER}vu_needle_ghost.png", "vuNH");

const var vuStateKnob = Content.addKnob("vuStateKnob", -200, -220);
vuStateKnob.set("width", 8); vuStateKnob.set("height", 8); vuStateKnob.set("visible", false);
vuStateKnob.set("mode", "Linear"); vuStateKnob.set("min", -25); vuStateKnob.set("max", 5);
vuStateKnob.set("stepSize", 0.01); vuStateKnob.set("defaultValue", -20);
vuStateKnob.set("saveInPreset", false); vuStateKnob.set("showTextBox", false);
const var vuHist1 = Content.addKnob("vuHist1", -200, -230);
vuHist1.set("width", 8); vuHist1.set("height", 8); vuHist1.set("visible", false);
vuHist1.set("mode", "Linear"); vuHist1.set("min", -25); vuHist1.set("max", 5);
vuHist1.set("stepSize", 0.01); vuHist1.set("defaultValue", -20);
vuHist1.set("saveInPreset", false); vuHist1.set("showTextBox", false);
const var vuHist2 = Content.addKnob("vuHist2", -200, -240);
vuHist2.set("width", 8); vuHist2.set("height", 8); vuHist2.set("visible", false);
vuHist2.set("mode", "Linear"); vuHist2.set("min", -25); vuHist2.set("max", 5);
vuHist2.set("stepSize", 0.01); vuHist2.set("defaultValue", -20);
vuHist2.set("saveInPreset", false); vuHist2.set("showTextBox", false);

// PARALLEL：面板接收手势；旋钮仅存值（在面板下方，被盖住）
const var parallelSlider = Content.addKnob("parallelSlider", 558, 458);
parallelSlider.set("width", 168); parallelSlider.set("height", 168);
parallelSlider.set("visible", false);
parallelSlider.set("mode", "Linear"); parallelSlider.set("min", 0); parallelSlider.set("max", 1);
parallelSlider.set("stepSize", 0.005); parallelSlider.set("defaultValue", 0.5);
parallelSlider.set("text", "PARALLEL"); parallelSlider.set("saveInPreset", true);
parallelSlider.set("showTextBox", false);

const var parallelPanel = Content.addPanel("parallelPanel", 558, 458);
parallelPanel.setPosition(558, 458, 176, 176);
parallelPanel.set("allowCallbacks", "All Callbacks");
parallelPanel.set("enabled", true);
parallelPanel.loadImage("{PROJECT_FOLDER}fs_parallel.png", "parStrip");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_red.png", "ringR");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_blue.png", "ringB");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_purple.png", "ringP");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_red_lock.png", "ringRL");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_blue_lock.png", "ringBL");
parallelPanel.loadImage("{PROJECT_FOLDER}ring_purple_lock.png", "ringPL");

// 模式 0=Normal 1=Push 2=Pull
const var parMode = Content.addKnob("parMode", -200, -210);
parMode.set("width", 8); parMode.set("height", 8); parMode.set("visible", false);
parMode.set("mode", "Linear"); parMode.set("min", 0); parMode.set("max", 2);
parMode.set("stepSize", 1); parMode.set("defaultValue", 0);
parMode.set("saveInPreset", false); parMode.set("showTextBox", false);

const var parDragV0 = Content.addKnob("parDragV0", -200, -250);
parDragV0.set("width", 8); parDragV0.set("height", 8); parDragV0.set("visible", false);
parDragV0.set("mode", "Linear"); parDragV0.set("min", -1); parDragV0.set("max", 2);
parDragV0.set("stepSize", 0.01); parDragV0.set("defaultValue", 0.5);
parDragV0.set("saveInPreset", false); parDragV0.set("showTextBox", false);

const var statusLeft = Content.addPanel("statusLeft", 577, 632);
statusLeft.setPosition(577, 632, 130, 22);
statusLeft.loadImage("{PROJECT_FOLDER}status_left.png", "stL");
statusLeft.setImage("stL", 0, 0);

const var statusMix = Content.addPanel("statusMix", 577, 632);
statusMix.setPosition(577, 632, 130, 22);
statusMix.loadImage("{PROJECT_FOLDER}status_mix.png", "stM");
statusMix.setImage("stM", 0, 0);

const var statusRight = Content.addPanel("statusRight", 577, 632);
statusRight.setPosition(577, 632, 130, 22);
statusRight.loadImage("{PROJECT_FOLDER}status_right.png", "stR");
statusRight.setImage("stR", 0, 0);

const var pultecGain = Content.addKnob("pultecGain", -200, -200);
pultecGain.set("visible", false); pultecGain.set("width", 8); pultecGain.set("height", 8);
pultecGain.set("mode", "Linear"); pultecGain.set("min", -100); pultecGain.set("max", 12);
pultecGain.set("stepSize", 0.01); pultecGain.set("defaultValue", -6.02);
pultecGain.set("processorId", "Pultec Wet"); pultecGain.set("parameterId", "Gain");
pultecGain.set("saveInPreset", false);
pultecGain.set("showTextBox", false);

const var sslGain = Content.addKnob("sslGain", -200, -200);
sslGain.set("visible", false); sslGain.set("width", 8); sslGain.set("height", 8);
sslGain.set("mode", "Linear"); sslGain.set("min", -100); sslGain.set("max", 12);
sslGain.set("stepSize", 0.01); sslGain.set("defaultValue", -6.02);
sslGain.set("processorId", "SSL Wet"); sslGain.set("parameterId", "Gain");
sslGain.set("saveInPreset", false);
sslGain.set("showTextBox", false);

// ---------- 右 SSL 彩钮（占位圆实测） ----------
// 红 dB | HZ
const var sDb = Content.addKnob("sDb", 822, 141);
sDb.set("width", 100); sDb.set("height", 100);
sDb.set("mode", "Linear"); sDb.set("min", -24); sDb.set("max", 24);
sDb.set("stepSize", 0.01); sDb.set("defaultValue", 0);
sDb.set("text", "dB"); sDb.set("saveInPreset", true);
sDb.set("showTextBox", false);
sDb.set("mouseSensitivity", 3.5);
sDb.set("dragDirection", "Diagonal");
sDb.set("filmstripImage", "{PROJECT_FOLDER}fs_red.png"); sDb.set("numStrips", 91);
sDb.set("isVertical", true); sDb.set("scaleFactor", 0.625000);

const var sHz = Content.addKnob("sHz", 1098, 139);
sHz.set("width", 100); sHz.set("height", 100);
sHz.set("mode", "Linear"); sHz.set("min", 1500); sHz.set("max", 16000);
sHz.set("stepSize", 5); sHz.set("defaultValue", 8000);
sHz.set("text", "HZ"); sHz.set("saveInPreset", true);
sHz.set("showTextBox", false);
sHz.set("mouseSensitivity", 3.5);
sHz.set("dragDirection", "Diagonal");
sHz.set("filmstripImage", "{PROJECT_FOLDER}fs_red.png"); sHz.set("numStrips", 91);
sHz.set("isVertical", true); sHz.set("scaleFactor", 0.625000);

// 绿 HMF 三钮
const var sG1 = Content.addKnob("sG1", 823, 263);
sG1.set("width", 100); sG1.set("height", 100);
sG1.set("mode", "Linear"); sG1.set("min", -24); sG1.set("max", 24);
sG1.set("stepSize", 0.01); sG1.set("defaultValue", 0);
sG1.set("text", "HMF dB"); sG1.set("saveInPreset", true);
sG1.set("showTextBox", false);
sG1.set("mouseSensitivity", 3.5);
sG1.set("dragDirection", "Diagonal");
sG1.set("filmstripImage", "{PROJECT_FOLDER}fs_green.png"); sG1.set("numStrips", 91);
sG1.set("isVertical", true); sG1.set("scaleFactor", 0.625000);

const var sG2 = Content.addKnob("sG2", 961, 263);
sG2.set("width", 100); sG2.set("height", 100);
sG2.set("mode", "Linear"); sG2.set("min", 0.1); sG2.set("max", 5);
sG2.set("stepSize", 0.01); sG2.set("defaultValue", 1);
sG2.set("text", "HMF Q"); sG2.set("saveInPreset", true);
sG2.set("showTextBox", false);
sG2.set("mouseSensitivity", 3.5);
sG2.set("dragDirection", "Diagonal");
sG2.set("filmstripImage", "{PROJECT_FOLDER}fs_green.png"); sG2.set("numStrips", 91);
sG2.set("isVertical", true); sG2.set("scaleFactor", 0.625000);

const var sG3 = Content.addKnob("sG3", 1099, 264);
sG3.set("width", 100); sG3.set("height", 100);
sG3.set("mode", "Linear"); sG3.set("min", 600); sG3.set("max", 8000);
sG3.set("stepSize", 5); sG3.set("defaultValue", 2000);
sG3.set("text", "HMF Hz"); sG3.set("saveInPreset", true);
sG3.set("showTextBox", false);
sG3.set("mouseSensitivity", 3.5);
sG3.set("dragDirection", "Diagonal");
sG3.set("filmstripImage", "{PROJECT_FOLDER}fs_green.png"); sG3.set("numStrips", 91);
sG3.set("isVertical", true); sG3.set("scaleFactor", 0.625000);

// 蓝 LMF 三钮
const var sB1 = Content.addKnob("sB1", 822, 383);
sB1.set("width", 100); sB1.set("height", 100);
sB1.set("mode", "Linear"); sB1.set("min", -24); sB1.set("max", 24);
sB1.set("stepSize", 0.01); sB1.set("defaultValue", 0);
sB1.set("text", "LMF dB"); sB1.set("saveInPreset", true);
sB1.set("showTextBox", false);
sB1.set("mouseSensitivity", 3.5);
sB1.set("dragDirection", "Diagonal");
sB1.set("filmstripImage", "{PROJECT_FOLDER}fs_blue.png"); sB1.set("numStrips", 91);
sB1.set("isVertical", true); sB1.set("scaleFactor", 0.625000);

const var sB2 = Content.addKnob("sB2", 961, 383);
sB2.set("width", 100); sB2.set("height", 100);
sB2.set("mode", "Linear"); sB2.set("min", 0.1); sB2.set("max", 5);
sB2.set("stepSize", 0.01); sB2.set("defaultValue", 1);
sB2.set("text", "LMF Q"); sB2.set("saveInPreset", true);
sB2.set("showTextBox", false);
sB2.set("mouseSensitivity", 3.5);
sB2.set("dragDirection", "Diagonal");
sB2.set("filmstripImage", "{PROJECT_FOLDER}fs_blue.png"); sB2.set("numStrips", 91);
sB2.set("isVertical", true); sB2.set("scaleFactor", 0.625000);

const var sB3 = Content.addKnob("sB3", 1098, 384);
sB3.set("width", 100); sB3.set("height", 100);
sB3.set("mode", "Linear"); sB3.set("min", 200); sB3.set("max", 3000);
sB3.set("stepSize", 5); sB3.set("defaultValue", 800);
sB3.set("text", "LMF Hz"); sB3.set("saveInPreset", true);
sB3.set("showTextBox", false);
sB3.set("mouseSensitivity", 3.5);
sB3.set("dragDirection", "Diagonal");
sB3.set("filmstripImage", "{PROJECT_FOLDER}fs_blue.png"); sB3.set("numStrips", 91);
sB3.set("isVertical", true); sB3.set("scaleFactor", 0.625000);

// 棕 LF 两钮
const var sBr1 = Content.addKnob("sBr1", 824, 516);
sBr1.set("width", 100); sBr1.set("height", 100);
sBr1.set("mode", "Linear"); sBr1.set("min", -24); sBr1.set("max", 24);
sBr1.set("stepSize", 0.01); sBr1.set("defaultValue", 0);
sBr1.set("text", "LF dB"); sBr1.set("saveInPreset", true);
sBr1.set("showTextBox", false);
sBr1.set("mouseSensitivity", 3.5);
sBr1.set("dragDirection", "Diagonal");
sBr1.set("filmstripImage", "{PROJECT_FOLDER}fs_brown.png"); sBr1.set("numStrips", 91);
sBr1.set("isVertical", true); sBr1.set("scaleFactor", 0.625000);

const var sBr2 = Content.addKnob("sBr2", 1100, 515);
sBr2.set("width", 100); sBr2.set("height", 100);
sBr2.set("mode", "Linear"); sBr2.set("min", 30); sBr2.set("max", 450);
sBr2.set("stepSize", 2); sBr2.set("defaultValue", 100);
sBr2.set("text", "LF Hz"); sBr2.set("saveInPreset", true);
sBr2.set("showTextBox", false);
sBr2.set("mouseSensitivity", 3.5);
sBr2.set("dragDirection", "Diagonal");
sBr2.set("filmstripImage", "{PROJECT_FOLDER}fs_brown.png"); sBr2.set("numStrips", 91);
sBr2.set("isVertical", true); sBr2.set("scaleFactor", 0.625000);

// ---------- 右下角缩放 ----------
const var zoomHint = Content.addPanel("zoomHint", 1035, 688);
zoomHint.setPosition(1035, 688, 170, 22);
zoomHint.set("text", "拖角缩放 100%");

// ---------- 右下角缩放：uiScale 旋钮（必定可用）+ 角标 ----------
const var zoomGrip = Content.addPanel("zoomGrip", 1215, 665);
zoomGrip.setPosition(1215, 665, 55, 55);
zoomGrip.set("allowCallbacks", "All Callbacks");
zoomGrip.set("enabled", true);
zoomGrip.loadImage("{PROJECT_FOLDER}zoom_grip.png", "zg");
zoomGrip.setImage("zg", 0, 0);

const var uiScale = Content.addKnob("uiScale", 1215, 665);
uiScale.set("width", 55); uiScale.set("height", 55);
uiScale.set("mode", "Linear");
uiScale.set("min", 0.75); uiScale.set("max", 1.35);
uiScale.set("stepSize", 0.01); uiScale.set("defaultValue", 1.0);
uiScale.set("text", "缩放"); uiScale.set("saveInPreset", true);
uiScale.set("showTextBox", false);
uiScale.set("filmstripImage", "{PROJECT_FOLDER}pointer_mix.png");
uiScale.set("numStrips", 1);
uiScale.set("isVertical", true);
uiScale.set("scaleFactor", 1.0);
uiScale.set("mouseSensitivity", 3.0);

// DSP
const var MUTE_DB = -100.0;
const var pultecEQ = Synth.getEffect("Pultec EQ");
const var sslEQ = Synth.getEffect("SSL EQ");
const var outputBus = Synth.getEffect("Output Bus");

inline function linToDb(lin)
{
    if (lin <= 0.0000001) return MUTE_DB;
    return 20.0 * Math.log(lin) / Math.log(10.0);
}

inline function showStatus(w)
{
    statusLeft.set("visible", w == "left");
    statusMix.set("visible", w == "mix");
    statusRight.set("visible", w == "right");
}

// 0=左/Pultec，1=右/SSL

inline function applyParallelMix(raw)
{
    local v = raw;
    if (v < 0.0) v = 0.0;
    if (v > 1.0) v = 1.0;
    pultecGain.setValue(linToDb(1.0 - v));
    sslGain.setValue(linToDb(v));
    if (v < 0.33) showStatus("left");
    else if (v > 0.67) showStatus("right");
    else showStatus("mix");
    parallelSlider.setValue(v);
    parallelPanel.repaint();
    return v;
}

inline function applyParMode()
{
    local m = Math.round(parMode.getValue());
    if (m <= 0)
    {
        // Normal：回到可混合
        showStatus("mix");
    }
    else if (m == 1)
        applyParallelMix(0.0); // Push = Pultec 100%
    else
        applyParallelMix(1.0); // Pull = SSL 100%
    parallelPanel.repaint();
}

inline function applyZoom()
{
    local z = uiScale.getValue();
    BG.setPosition(0, 0, Math.round(1280 * z), Math.round(720 * z));
    pBoost.setPosition(Math.round(67*z), Math.round(136*z), Math.round(116*z), Math.round(116*z));
    pBdWith.setPosition(Math.round(210*z), Math.round(136*z), Math.round(116*z), Math.round(116*z));
    pHfSel.setPosition(Math.round(360*z), Math.round(162*z), Math.round(78*z), Math.round(78*z));
    pAtten.setPosition(Math.round(65*z), Math.round(319*z), Math.round(116*z), Math.round(116*z));
    pAttenSel.setPosition(Math.round(209*z), Math.round(319*z), Math.round(116*z), Math.round(116*z));
    pAtten2.setPosition(Math.round(67*z), Math.round(506*z), Math.round(116*z), Math.round(116*z));
    pBoost2.setPosition(Math.round(210*z), Math.round(506*z), Math.round(116*z), Math.round(116*z));
    pLfSel.setPosition(Math.round(360*z), Math.round(531*z), Math.round(78*z), Math.round(78*z));
    vu.setPosition(Math.round(524*z), Math.round(163*z), Math.round(268*z), Math.round(172*z));
    parallelPanel.setPosition(Math.round(558*z), Math.round(458*z), Math.round(176*z), Math.round(176*z));
    parallelSlider.setPosition(Math.round(558*z), Math.round(458*z), Math.round(168*z), Math.round(168*z));
    statusLeft.setPosition(Math.round(577*z), Math.round(632*z), Math.round(130*z), Math.round(22*z));
    statusMix.setPosition(Math.round(577*z), Math.round(632*z), Math.round(130*z), Math.round(22*z));
    statusRight.setPosition(Math.round(577*z), Math.round(632*z), Math.round(130*z), Math.round(22*z));
    sDb.setPosition(Math.round(822*z), Math.round(141*z), Math.round(100*z), Math.round(100*z));
    sHz.setPosition(Math.round(1098*z), Math.round(139*z), Math.round(100*z), Math.round(100*z));
    sG1.setPosition(Math.round(823*z), Math.round(263*z), Math.round(100*z), Math.round(100*z));
    sG2.setPosition(Math.round(961*z), Math.round(263*z), Math.round(100*z), Math.round(100*z));
    sG3.setPosition(Math.round(1099*z), Math.round(264*z), Math.round(100*z), Math.round(100*z));
    sB1.setPosition(Math.round(822*z), Math.round(383*z), Math.round(100*z), Math.round(100*z));
    sB2.setPosition(Math.round(961*z), Math.round(383*z), Math.round(100*z), Math.round(100*z));
    sB3.setPosition(Math.round(1098*z), Math.round(384*z), Math.round(100*z), Math.round(100*z));
    sBr1.setPosition(Math.round(824*z), Math.round(516*z), Math.round(100*z), Math.round(100*z));
    sBr2.setPosition(Math.round(1100*z), Math.round(515*z), Math.round(100*z), Math.round(100*z));
    zoomGrip.setPosition(Math.round(1215*z), Math.round(665*z), Math.round(55*z), Math.round(55*z));
    uiScale.setPosition(Math.round(1215*z), Math.round(665*z), Math.round(55*z), Math.round(55*z));
    zoomHint.setPosition(Math.round(1035*z), Math.round(688*z), Math.round(170*z), Math.round(22*z));
    zoomHint.set("text", "拖角缩放 " + Math.round(z * 100) + "%");
    pBoost.set("scaleFactor", 0.725 * z); pBdWith.set("scaleFactor", 0.725 * z);
    pHfSel.set("scaleFactor", 0.4875 * z); pAtten.set("scaleFactor", 0.725 * z);
    pAttenSel.set("scaleFactor", 0.725 * z); pAtten2.set("scaleFactor", 0.725 * z);
    pBoost2.set("scaleFactor", 0.725 * z); pLfSel.set("scaleFactor", 0.4875 * z);
    sDb.set("scaleFactor", 0.625 * z); sHz.set("scaleFactor", 0.625 * z);
    sG1.set("scaleFactor", 0.625 * z); sG2.set("scaleFactor", 0.625 * z); sG3.set("scaleFactor", 0.625 * z);
    sB1.set("scaleFactor", 0.625 * z); sB2.set("scaleFactor", 0.625 * z); sB3.set("scaleFactor", 0.625 * z);
    sBr1.set("scaleFactor", 0.625 * z); sBr2.set("scaleFactor", 0.625 * z);
}

// ---------- PARALLEL 推拉面板 ----------
parallelPanel.setPaintRoutine(function(g)
{
    reg v = 0.5;
    reg parM = 0.0;
    v = parallelSlider.getValue();
    parM = Math.round(parMode.getValue());

    // 本体 filmstrip：fs_parallel 纵向 91 帧 160px
    reg fr = 0.0;
    fr = Math.round(v * 90.0);
    g.drawImage("parStrip", [8, 8, 160, 160], 0, fr * 160);

    // 色环：Normal红 Push蓝 Pull紫；模式锁定加点环
    if (parM == 1)
        g.drawImage("ringBL", [0, 0, 176, 176], 0, 0);
    else if (parM == 2)
        g.drawImage("ringPL", [0, 0, 176, 176], 0, 0);
    else
        g.drawImage("ringR", [0, 0, 176, 176], 0, 0);
});

inline function onParallelMouse(e)
{
    local parM = Math.round(parMode.getValue());

    // 双击：循环
    if (e.doubleClick && e.mouseUp)
    {
        local nextM = parM + 1;
        if (nextM > 2) nextM = 0;
        parMode.setValue(nextM);
        applyParMode();
        return;
    }

    // 按下：记录起点
    if (e.clicked || (e.drag && !e.isDragOnly))
    {
        parDragV0.setValue(parallelSlider.getValue());
        return;
    }

    // 单击抬起 → Push
    if (e.mouseUp && !e.isDragOnly)
    {
        local moved = e.dragX * e.dragX + e.dragY * e.dragY;
        if (moved < 64.0 && !e.doubleClick)
        {
            parMode.setValue(1);
            applyParMode();
            return;
        }
    }

    // 上拖 → Pull
    if (e.isDragOnly && e.dragY <= -20.0)
    {
        parMode.setValue(2);
        applyParMode();
        return;
    }

    // 拖动调混合（Normal）
    if (e.isDragOnly && parM == 0)
    {
        local v0 = parDragV0.getValue();
        local v2 = v0 - e.dragY * 0.006;
        applyParallelMix(v2);
        zoomHint.set("text", "MIX " + Math.round(parallelSlider.getValue() * 100) + "%");
    }
}

parallelPanel.setMouseCallback(onParallelMouse);

// ---------- 拖角缩放 ----------
inline function onZoomMouse(e)
{
    zoomHint.set("text", "ZOOM " + e.x + "," + e.y);
    if (e.doubleClick && e.mouseUp)
    {
        uiScale.setValue(1.0);
        applyZoom();
        return;
    }
    if (e.isDragOnly)
    {
        // 对角拖动：向右下为放大
        local z = 1.0 + (e.dragX + e.dragY) * 0.0025;
        if (z < 0.75) z = 0.75;
        if (z > 1.35) z = 1.35;
        uiScale.setValue(z);
        applyZoom();
    }
}

zoomGrip.setMouseCallback(onZoomMouse);

// 表盘 268x172；针 strip 220x220，轴心 (110,110) → 面板 (132.8,101.1)
// drawImage 的 yOffset = 帧号 * 220
const var VU_PX = 132.8;
const var VU_PY = 101.1;
const var VU_FRAME = 220;
const var VU_N = 41;

inline function vuLevelToVu(lin)
{
    local x = lin;
    if (x > 4.0) x = 4.0;
    if (x < 0.00001) return -20.0;
    local db = 20.0 * Math.log(x) / Math.log(10.0);
    return db + 18.0;
}

inline function vuFrameFor(vuVal)
{
    local v = vuVal;
    if (v < -20.0) v = -20.0;
    if (v > 3.0) v = 3.0;
    local t = (v + 20.0) / 23.0;
    return t * (VU_N - 1);
}

vu.setPaintRoutine(function(g)
{
    reg state = vuStateKnob.getValue();
    reg h1 = vuHist1.getValue();
    reg h2 = vuHist2.getValue();

    reg lv = 0.0;
    if (outputBus)
        lv = outputBus.getCurrentLevel();
    reg target = vuLevelToVu(lv);

    // 阻尼
    reg coef = 0.095;
    if (target > state) coef = 0.26;
    state = state + (target - state) * coef;
    vuStateKnob.setValue(state);
    vuHist2.setValue(h1);
    vuHist1.setValue(state);

    g.drawImage("vuImg", [0, 0, 268, 172], 0, 0);

    // 残影
    g.drawImage("vuNH", [VU_PX - 110.0, VU_PY - 110.0, VU_FRAME, VU_FRAME], 0, Math.round(vuFrameFor(h2)) * VU_FRAME);
    g.drawImage("vuNH", [VU_PX - 110.0, VU_PY - 110.0, VU_FRAME, VU_FRAME], 0, Math.round(vuFrameFor(h1)) * VU_FRAME);

    // 主针
    if (state >= 0.0)
        g.drawImage("vuNR", [VU_PX - 110.0, VU_PY - 110.0, VU_FRAME, VU_FRAME], 0, Math.round(vuFrameFor(state)) * VU_FRAME);
    else
        g.drawImage("vuNG", [VU_PX - 110.0, VU_PY - 110.0, VU_FRAME, VU_FRAME], 0, Math.round(vuFrameFor(state)) * VU_FRAME);
});
vu.startTimer(30);

parallelPanel.set("allowCallbacks", "All Callbacks");
zoomGrip.set("allowCallbacks", "All Callbacks");
applyParallelMix(0.5);
// 不调用 applyZoom — 启动保持布局

function onNoteOn() {}
function onNoteOff() {}
function onController() {}
function onTimer() {}

function onControl(number, value)
{
    if (number == parMode)
        applyParMode();
    else if (number == uiScale)
        applyZoom();
    else if (number == pBoost && pultecEQ)
        pultecEQ.setAttribute(0, value);
    else if (number == pBdWith && pultecEQ)
        pultecEQ.setAttribute(12, 5.0 - value * 4.5);
    else if (number == pHfSel && pultecEQ)
    {
        local f = 3000.0;
        if (value <= 0.5) f = 3000.0;
        else if (value <= 1.5) f = 5000.0;
        else if (value <= 2.5) f = 10000.0;
        else f = 16000.0;
        pultecEQ.setAttribute(11, f);
        pultecEQ.setAttribute(10, 18.0);
    }
    else if (number == pAtten && pultecEQ)
        pultecEQ.setAttribute(6, -value);
    else if (number == pAttenSel && pultecEQ)
    {
        local f2 = 20.0;
        if (value <= 0.5) f2 = 20.0;
        else if (value <= 1.5) f2 = 30.0;
        else if (value <= 2.5) f2 = 60.0;
        else f2 = 100.0;
        pultecEQ.setAttribute(1, f2);
    }
    else if (number == pAtten2 && pultecEQ)
        pultecEQ.setAttribute(15, -value);
    else if (number == pBoost2 && pultecEQ)
        pultecEQ.setAttribute(0, value);
    else if (number == pLfSel && pultecEQ)
    {
        local f3 = 20.0;
        if (value <= 0.5) f3 = 20.0;
        else if (value <= 1.5) f3 = 30.0;
        else if (value <= 2.5) f3 = 60.0;
        else f3 = 100.0;
        pultecEQ.setAttribute(1, f3);
        pultecEQ.setAttribute(5, 18.0);
    }
    else if (number == sDb && sslEQ) sslEQ.setAttribute(0, value);
    else if (number == sHz && sslEQ) sslEQ.setAttribute(1, value);
    else if (number == sG1 && sslEQ) sslEQ.setAttribute(5, value);
    else if (number == sG2 && sslEQ) sslEQ.setAttribute(7, value);
    else if (number == sG3 && sslEQ) sslEQ.setAttribute(6, value);
    else if (number == sB1 && sslEQ) sslEQ.setAttribute(10, value);
    else if (number == sB2 && sslEQ) sslEQ.setAttribute(12, value);
    else if (number == sB3 && sslEQ) sslEQ.setAttribute(11, value);
    else if (number == sBr1 && sslEQ) sslEQ.setAttribute(15, value);
    else if (number == sBr2 && sslEQ) sslEQ.setAttribute(16, value);
}
