#target photoshop
app.bringToFront();

var originalRuler = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

function main() {
    var doc = app.activeDocument;

    function findByName(container, name, results) {
        results = results || [];
        for (var i = 0; i < container.layers.length; i++) {
            var l = container.layers[i];
            if (l.name === name) {
                results.push(l);
            }
            if (l.typename === "LayerSet") {
                findByName(l, name, results);
            }
        }
        return results;
    }

    // \u9634\u5f71 = "阴影"
    var shadowName = "\u9634\u5f71 1";
    var refs = findByName(doc, shadowName, []);
    if (refs.length === 0) {
        alert("\u627e\u4e0d\u5230\u56fe\u5c42\uff1a" + shadowName);
        return;
    }
    var ref = refs[0];

    // \u65cb\u94ae = "旋钮"
    var knobNames = [
        "HZ \u65cb\u94ae",
        "Q \u65cb\u94ae",
        "DB \u65cb\u94ae"
    ];
    var sslPrefix = "SSL KNOB COLORED V2";

    function isKnob(layer) {
        if (layer.typename === "LayerSet") {
            return false;
        }
        var n = layer.name;
        for (var i = 0; i < knobNames.length; i++) {
            if (n === knobNames[i]) {
                return true;
            }
        }
        return n.indexOf(sslPrefix) === 0;
    }

    function addShadow(knob) {
        var b = knob.bounds;
        var L = Number(b[0]);
        var T = Number(b[1]);
        var R = Number(b[2]);
        var B = Number(b[3]);
        var kw = R - L;
        var kh = B - T;
        var kcx = (L + R) / 2;
        var kcy = (T + B) / 2;

        var sw = kw * 1.14;
        var sh = kh * 1.09;
        var scx = kcx + 3;
        var scy = kcy + 12;

        var dup = ref.duplicate();
        dup.name = "\u9634\u5f71 \u53f3 " + knob.name; // "阴影 右 ..."
        dup.rasterize(RasterizeType.ENTIRELAYER);
        dup.bounds = [
            scx - sw / 2,
            scy - sh / 2,
            scx + sw / 2,
            scy + sh / 2
        ];
        dup.move(knob.parent, ElementPlacement.PLACEATEND);
    }

    // 先收集所有旋钮，再逐个添加，避免边遍历边改图层导致错位
    var knobs = [];
    function collect(container) {
        for (var i = 0; i < container.layers.length; i++) {
            var l = container.layers[i];
            if (l.typename === "LayerSet") {
                collect(l);
            } else if (isKnob(l)) {
                knobs.push(l);
            }
        }
    }
    collect(doc);

    for (var i = 0; i < knobs.length; i++) {
        addShadow(knobs[i]);
    }

    alert("\u5df2\u4e3a " + knobs.length + " \u4e2a\u53f3\u9762\u677f\u65cb\u94ae\u6dfb\u52a0\u9634\u5f71\u3002");
}

try {
    main();
} catch (e) {
    alert("\u51fa\u9519\uff1a" + e.message);
} finally {
    app.preferences.rulerUnits = originalRuler;
}
