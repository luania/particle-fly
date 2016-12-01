import { PVector } from "./script/PVector";
import { ParticalSystem } from "./ParticalSystem";

let subscriptions = null;
let isTogged: boolean = false;

let canvas: HTMLCanvasElement;
let particalSystem: ParticalSystem;

let conf;

export let config = {
    emitNumEveryTime: {
        type: 'integer',
        default: 3,
        minimum: 1
    },
    rateOfAging: {
        type: 'number',
        default: 0.02,
        maximum: 1
    },
    maxSize: {
        type: 'number',
        default: 10,
        minimum: 1
    },
    opacity: {
        type: 'number',
        default: 0.6,
        maximum: 1
    },
    maxInitialVelocity: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                default: 5,
                minimum: 0
            },
            y: {
                type: 'number',
                default: 5,
                minimum: 0
            }
        }
    },
    wind: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                default: 0
            },
            y: {
                type: 'number',
                default: 0
            }
        }
    }
}

export function activate(state) {
    canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.classList.add('partical-fly');

    document.body.appendChild(canvas);
    let mouseListener = function(ev: MouseEvent) {
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emit();
    }
    document.body.onmousemove = mouseListener;
    document.body.onmousewheel = mouseListener;

    conf = atom.config;

    particalSystem = new ParticalSystem(canvas, new PVector(0, 0));
    particalSystem.config = {
        emitNumEveryTime: conf.get('partical-fly.emitNumEveryTime'),
        rateOfAging: conf.get('partical-fly.rateOfAging'),
        opacity: conf.get('partical-fly.opacity'),
        maxSize: conf.get('partical-fly.maxSize'),
        maxInitialVelocity: {
            x: conf.get('partical-fly.maxInitialVelocity.x'),
            y: conf.get('partical-fly.maxInitialVelocity.y')
        }
    };
    setInterval(run, 30);
}

export function deactivate() {
    subscriptions.dispose();
    canvas.remove();
}

export function serialize() {
    return {};
}

export function run() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    particalSystem.applyForce(
        new PVector(
            conf.get('partical-fly.wind.x'),
            conf.get('partical-fly.wind.y')
        )
    );
    particalSystem.run();
    particalSystem.draw();
}
