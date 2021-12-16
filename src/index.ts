import { GridGUI } from "./gui/GridGUI";

const mapDefault = document.getElementById("map_default")!.innerHTML;
const debug = document.getElementById("debug")!;
const gridGUI = new GridGUI(<HTMLCanvasElement>document.getElementById("canvas"), mapDefault);

gridGUI.draw();
// debug.innerHTML = gridGUI.debugString();

setInterval(() => {
    gridGUI.draw();
}, 1000/ 60);
