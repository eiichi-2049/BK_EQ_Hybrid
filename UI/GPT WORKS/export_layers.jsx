// Export all layers from PSD to PNGs
app.preferences.rulerUnits = Units.PIXELS;
var doc = app.activeDocument;
var outDir = new Folder("E:/个人EQ项目/编码/AnalogBlend/Images/psd_export");
if (!outDir.exists) outDir.create();
var report = [];
var n = 0;

function safe(name) {
    return String(name).replace(/[\\\/\:\*\?\"\<\>\|]/g, "_").replace(/\s+/g, "_");
}

function exportLayer(layer, prefix) {
    try {
        // hide all, show this layer (and parents)
        doc.activeLayer = layer;
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIdentifier(charIDToTypeID("Lyr "), layer.id);
        desc.putReference(charIDToTypeID("null"), ref);
        desc.putBoolean(charIDToTypeID("MkVs"), true);
        // duplicate layer to new doc
        var dup = layer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
        // Actually simpler: use export via saveAs with selected layer - isolate:
        dup.remove(); // undo approach: use layer.copy + new doc
    } catch (e) {
        report.push("ERR " + layer.name + ": " + e);
    }
}

// Simpler approach: for each art layer, make it only visible and save PNG of canvas crop to layer bounds
function walk(container, prefix) {
    for (var i = 0; i < container.layers.length; i++) {
        var l = container.layers[i];
        var nm = prefix + safe(l.name);
        if (l.typename === "LayerSet") {
            walk(l, nm + "__");
            continue;
        }
        // skip empty
        try {
            var b = l.bounds;
            var w = Number(b[2]) - Number(b[0]);
            var h = Number(b[3]) - Number(b[1]);
            if (w < 4 || h < 4) continue;
        } catch (e) { continue; }

        n++;
        // Isolate layer: hide all, show chain
        var vis = [];
        function setAllHidden(cont) {
            for (var j = 0; j < cont.layers.length; j++) {
                var x = cont.layers[j];
                vis.push([x, x.visible]);
                x.visible = false;
                if (x.typename === "LayerSet") setAllHidden(x);
            }
        }
        setAllHidden(doc);
        var cur = l;
        cur.visible = true;
        // parents visible
        try {
            while (cur.parent && cur.parent.typename !== "Document") {
                cur.parent.visible = true;
                cur = cur.parent;
            }
        } catch (e) {}

        // crop to layer bounds then save
        try {
            doc.crop(b);
        } catch (e) {}

        var f = new File(outDir.fsName + "/" + nm + ".png");
        var opts = new PNGSaveOptions();
        doc.saveAs(f, opts, true, Extension.LOWERCASE);
        report.push("OK " + nm + " " + Math.round(w) + "x" + Math.round(h));
    }
}

// Only walk top-level to avoid too many - export named groups of interest
// Full walk
try { walk(doc, ""); } catch (e) { report.push("WALKERR " + e); }

report.push("TOTAL=" + n);
report.push("OUT=" + outDir.fsName);
report.join("\n");
