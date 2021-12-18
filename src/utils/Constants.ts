export class Constants {
    static readonly COLOR_HIGHLIGHT_CELL = "#FFFFFF";
    static readonly COLOR_HIGHLIGHT_NEIGHBOUR = "#333333";
    static readonly COLOR_RED = "#FF0000";
    static readonly COLOR_GREEN = "#00FF00";
    static readonly COLOR_BLUE = "#0000FF";

    // Used for algorithm visuals
    static readonly COLOR_SOURCE = "#FFFF00";
    static readonly COLOR_DESTINATION = "#555500";
    static readonly COLOR_VISITED = "#BBFFAA";
    static readonly COLOR_EXPANDED = "#FFFF00";

    static readonly CELL_TYPE_MAP = {
        0: Constants.COLOR_RED,
        1: Constants.COLOR_GREEN,
        2: Constants.COLOR_BLUE
    }
}