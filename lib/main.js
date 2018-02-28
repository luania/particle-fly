"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
var ParticleSystem_1 = require("./ParticleSystem");
var Config_1 = require("./Config");
var Config_2 = require("./Config");
var PIXI = require("pixi.js");
exports.config = Config_2.settings;
var atomApi = window.atom;
var body = document.body;
var particleSystem;
var conf;
var app;
function activate(state) {
    conf = new Config_1.Config();
    conf.setData(atomApi.config);
    atomApi.config.observe('particle-fly', function (newValue, previous) {
        conf.setData(atomApi.config);
    });
    body.onmousemove = function (ev) {
        particleSystem.originPosition.x = ev.clientX;
        particleSystem.originPosition.y = ev.clientY;
        particleSystem.emit(conf, false);
    };
    body.onmousewheel = body.onmousemove;
    body.onmousedown = function (ev) { return particleSystem.emit(conf, true); };
    body.onmouseup = body.onmousedown;
    app = new PIXI.Application({
        width: body.clientWidth,
        height: body.clientHeight,
        antialias: true,
        transparent: true,
        resolution: 1
    });
    app.view.classList.add('pixi-view');
    body.appendChild(app.view);
    particleSystem = new ParticleSystem_1.ParticleSystem(app.stage, new PVector_1.PVector(0, 0));
    app.ticker.add(run);
}
exports.activate = activate;
function run() {
    app.renderer.resize(body.clientWidth, body.clientHeight);
    particleSystem.applyForce(conf.wind);
    particleSystem.run();
}
exports.run = run;
function deactivate() {
    app.destroy();
}
exports.deactivate = deactivate;
function serialize() {
    return {};
}
exports.serialize = serialize;
