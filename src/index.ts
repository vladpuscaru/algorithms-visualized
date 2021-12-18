import { GridGUI, GridGUIHTML } from "./gui/GridGUI";

const mapDefault = document.getElementById("map_default")!.innerHTML;
const debug = document.getElementById("debug")!;

const gridGUIHTML: GridGUIHTML = {
    canvas: <HTMLCanvasElement>document.getElementById("canvas"),
    strokeBtn: <HTMLInputElement>document.getElementById("stroke"),
    allowedActionsCBs: document.getElementsByClassName("allowed_actions_cb"),
    runBtn: <HTMLButtonElement>document.getElementById("run")
}

const gridGUI = new GridGUI(gridGUIHTML, mapDefault);

gridGUI.draw();
// debug.innerHTML = gridGUI.debugString();

setInterval(() => {
    gridGUI.draw();
}, 1000 / 60);
