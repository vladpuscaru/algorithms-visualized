define(["require", "exports", "./gui/GridGUI"], function (require, exports, GridGUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mapDefault = document.getElementById("map_default").innerHTML;
    const debug = document.getElementById("debug");
    const gridGUIHTML = {
        canvas: document.getElementById("canvas"),
        strokeBtn: document.getElementById("stroke"),
        runBtn: document.getElementById("run"),
        clearBtn: document.getElementById("clear"),
        allowedActionsCBs: document.getElementsByClassName("allowed_actions_cb"),
        algorithm: document.getElementById("algorithm")
    };
    const gridGUI = new GridGUI_1.GridGUI(gridGUIHTML, mapDefault);
    gridGUI.draw();
    // debug.innerHTML = gridGUI.debugString();
    setInterval(() => {
        gridGUI.draw();
    }, 1000 / 60);
});
//# sourceMappingURL=index.js.map