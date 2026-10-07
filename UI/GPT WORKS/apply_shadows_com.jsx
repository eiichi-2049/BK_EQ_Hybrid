function main() {
    app.preferences.rulerUnits = Units.PIXELS;
    var doc = app.activeDocument;
    var report = [];

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
    var refs = findByName(doc, "\u9634\u5f71 1", []);
    if (refs.length === 0) {
        return "ERROR: shadow ref not found";
    }
    var ref = refs[0];
    var refB = ref.bounds;
    report.push("refBounds=[" + Math.round(Number(refB[0])) + "," + Math.round(Number(refB[1])) +
                "," + Math.round(Number(refB[2])) + "," + Math.round(Number(refB[3])) + "]");

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
    report.push("knobCount=" + knobs.length);

    for (var i = 0; i < knobs.length; i++) {
        var knob = knobs[i];
        var b = knob.bounds;
        var L = Number(b[0]), T = Number(b[1]), R = Number(b[2]), B = Number(b[3]);
        var kw = R - L, kh = B - T, kcx = (L + R) / 2, kcy = (T + B) / 2;
        var sw = kw * 1.14, sh = kh * 1.09, scx = kcx + 3, scy = kcy + 12;

        var dup = ref.duplicate();
        dup.name = "\u9634\u5f71 \u53f3 " + knob.name; // "阴影 右 ..."
        dup.rasterize(RasterizeType.ENTIRELAYER);

        var rb = ref.bounds;
        var rw = Number(rb[2]) - Number(rb[0]);
        var rh = Number(rb[3]) - Number(rb[1]);
        var rcx = (Number(rb[0]) + Number(rb[2])) / 2;
        var rcy = (Number(rb[1]) + Number(rb[3])) / 2;

        dup.resize(sw / rw * 100, sh / rh * 100, AnchorPosition.MIDDLECENTER);
        dup.translate(scx - rcx, scy - rcy);
        dup.move(knob.parent, ElementPlacement.PLACEATEND);

        var nb = dup.bounds;
        report.push(
            "knob[" + Math.round(L) + "," + Math.round(T) + "," + Math.round(R) + "," + Math.round(B) + "] " +
            "parent=" + dup.parent.name + " " +
            "shadow=[" + Math.round(Number(nb[0])) + "," + Math.round(Number(nb[1])) +
            "," + Math.round(Number(nb[2])) + "," + Math.round(Number(nb[3])) + "]"
        );
    }

    // dest: E:/<unicode: 4e2a 4eba>EQ<unicode: 9879 76ee>/UI/GPT WORKS/equi <unicode: 4fee 6539 7248>.psd
    var dest = new File("E:/\u4e2a\u4ebaEQ\u9879\u76ee/UI/GPT WORKS/equi \u4fee\u6539\u7248.psd");
    var saveOpts = new PhotoshopSaveOptions();
    saveOpts.layers = true;
    doc.saveAs(dest, saveOpts, true, Extension.LOWERCASE);

    return report.join("\n") + "\nSAVED" + "\nDEST=" + dest.fsName;
}

main();
