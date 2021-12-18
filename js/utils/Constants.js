define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Constants = void 0;
    class Constants {
    }
    exports.Constants = Constants;
    Constants.COLOR_HIGHLIGHT_CELL = "#FFFFFF";
    Constants.COLOR_HIGHLIGHT_NEIGHBOUR = "#333333";
    Constants.COLOR_RED = "#FF0000";
    Constants.COLOR_GREEN = "#00FF00";
    Constants.COLOR_BLUE = "#0000FF";
    // Used for algorithm visuals
    Constants.COLOR_SOURCE = "#FFFF00";
    Constants.COLOR_DESTINATION = "#555500";
    Constants.COLOR_VISITED = "#BBFFAA";
    Constants.COLOR_EXPANDED = "#FFFF00";
    Constants.CELL_TYPE_MAP = {
        0: Constants.COLOR_RED,
        1: Constants.COLOR_GREEN,
        2: Constants.COLOR_BLUE
    };
});
//# sourceMappingURL=Constants.js.map