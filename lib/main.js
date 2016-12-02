"use strict";
var PVector_1 = require("./script/PVector");
var ParticalSystem_1 = require("./ParticalSystem");
var Config_1 = require("./Config");
var Config_2 = require("./Config");
exports.config = Config_2.settings;
var canvas;
var particalSystem;
var conf;
function activate(state) {
    canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.classList.add('partical-fly');
    document.body.appendChild(canvas);
    conf = new Config_1.Config();
    var listener1 = function (ev) {
        conf.setData(atom.config);
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emit(conf);
    };
    var listener2 = function (ev) {
        conf.setData(atom.config);
        particalSystem.originPosition.x = ev.clientX;
        particalSystem.originPosition.y = ev.clientY;
        particalSystem.emitWithMultiple(conf, conf.clickCountMultiple, conf.clickSizeMultiple);
    };
    document.body.onmousemove = listener1;
    document.body.onmousewheel = listener1;
    document.body.onmousedown = listener2;
    document.body.onmouseup = listener2;
    particalSystem = new ParticalSystem_1.ParticalSystem(canvas, new PVector_1.PVector(0, 0));
    setInterval(run, 30);
}
exports.activate = activate;
function deactivate() {
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
    particalSystem.applyForce(conf.wind);
    particalSystem.run();
    particalSystem.draw(conf.opacity);
}
exports.run = run;
//# sourceMappingURL=main.js.map