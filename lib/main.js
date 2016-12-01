"use strict";
var PVector_1 = require("./script/PVector");
var ParticalSystem_1 = require("./ParticalSystem");
var subscriptions = null;
var isTogged = false;
var canvas;
var particalSystem;
var conf;
exports.config = {
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
};
function activate(state) {
    canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.classList.add('partical-fly');
    document.body.appendChild(canvas);
    var mouseListener = function (ev) {
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emit();
    };
    document.body.onmousemove = mouseListener;
    document.body.onmousewheel = mouseListener;
    conf = atom.config;
    particalSystem = new ParticalSystem_1.ParticalSystem(canvas, new PVector_1.PVector(0, 0));
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
exports.activate = activate;
function deactivate() {
    subscriptions.dispose();
    canvas.remove();
}
exports.deactivate = deactivate;
function serialize() {
    return {};
}
exports.serialize = serialize;
function run() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    particalSystem.applyForce(new PVector_1.PVector(conf.get('partical-fly.wind.x'), conf.get('partical-fly.wind.y')));
    particalSystem.run();
    particalSystem.draw();
}
exports.run = run;
//# sourceMappingURL=main.js.map