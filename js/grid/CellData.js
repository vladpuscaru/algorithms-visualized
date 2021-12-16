define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CellData = void 0;
    class CellData {
        constructor(data) {
            this.color = data.color;
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });
        }
    }
    exports.CellData = CellData;
});
//# sourceMappingURL=CellData.js.map