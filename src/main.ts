import { PVector } from "./script/PVector";
import { ParticalSystem } from "./ParticalSystem";
import { Config } from "./Config";
import { settings } from "./Config";

export let config = settings;

let canvas: HTMLCanvasElement;
let particalSystem: ParticalSystem;
let conf: Config;

export function activate(state:any) {
    canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.classList.add('partical-fly');

    document.body.appendChild(canvas);
    conf = new Config();
    let listener1 = function(ev: MouseEvent) {
        conf.setData(atom.config);
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emit(conf);
    }
    let listener2 = function(ev: MouseEvent) {
        conf.setData(atom.config);
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emitWithMultiple(conf, conf.clickCountMultiple, conf.clickSizeMultiple);
    }
    document.body.onmousemove = listener1;
    document.body.onmousewheel = listener1;
    document.body.onmousedown = listener2;
    document.body.onmouseup = listener2;

    particalSystem = new ParticalSystem(canvas, new PVector(0, 0));

    requestAnimationFrame(run);
}

export function deactivate() {
    canvas.remove();
}

export function serialize() {
    return {};  
}

export function run() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    particalSystem.applyForce(conf.wind);
    particalSystem.run();
    particalSystem.draw(conf.opacity);
    requestAnimationFrame(run);
}
