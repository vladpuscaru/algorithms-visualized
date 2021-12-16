define(["require", "exports", "./gui/GridGUI"], function (require, exports, GridGUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mapDefault = document.getElementById("map_default").innerHTML;
    const debug = document.getElementById("debug");
    const gridGUI = new GridGUI_1.GridGUI(document.getElementById("canvas"), mapDefault);
    gridGUI.draw();
    // debug.innerHTML = gridGUI.debugString();
    setInterval(() => {
        gridGUI.draw();
    }, 1000 / 60);
});
//# sourceMappingURL=index.js.map