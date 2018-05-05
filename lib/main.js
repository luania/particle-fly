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
var conf = new Config_1.Config();
var app;
var loadding = false;
var toEmit = function (multiple) {
    if (!loadding) {
        particleSystem.emit(multiple);
    }
};
var toEmitAtPosition = function (multiple, x, y) {
    if (!loadding) {
        particleSystem.emitAtPosition(multiple, x, y);
    }
};
var refreshConfig = function () {
    conf.setData(atomApi.config);
    var whatToDraw = conf.whatToDraw;
    if (app) {
        app.stage.alpha = whatToDraw.opacity;
        var filters = [];
        if (conf.whatToDraw.blur != 0) {
            var filter = new PIXI.filters.BlurFilter();
            filter.blurX = whatToDraw.blur;
            filter.blurY = whatToDraw.blur;
            filters.push(filter);
        }
        app.stage.filters = filters;
    }
    if (whatToDraw.texture == "- custImage -") {
        loadding = true;
        if (!whatToDraw.image) {
            return;
        }
        var urls = whatToDraw.getImageArr();
        var countToLoad = 0;
        for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
            var url = urls_1[_i];
            if (PIXI.loader.resources[url])
                continue;
            PIXI.loader.add(url);
            countToLoad++;
        }
        PIXI.loader.load(function () { return loadding = false; });
        if (countToLoad == 0) {
            loadding = false;
        }
    }
    else {
        loadding = false;
    }
};
function listenEditor() {
    try {
        var editor_1 = atomApi.workspace.getActiveTextEditor();
        var editorElement_1 = editor_1.getElement();
        var scrollView_1 = editorElement_1.querySelector(".scroll-view");
        editor_1.getBuffer().onDidChangeText(function (ev) {
            for (var _i = 0, _a = ev.changes; _i < _a.length; _i++) {
                var e = _a[_i];
                var aPos = editorElement_1.pixelPositionForScreenPosition(editor_1.screenPositionForBufferPosition(e.newRange[e.newText ? "end" : "start"]));
                var rect = scrollView_1.getBoundingClientRect();
                var left = aPos.left + rect.left - editorElement_1.getScrollLeft();
                var top_1 = aPos.top + rect.top - editorElement_1.getScrollTop() + editor_1.getLineHeightInPixels();
                if (!conf.eventToDraw.onEdit) {
                    return;
                }
                toEmitAtPosition(false, left, top_1);
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}
function activate(state) {
    app = new PIXI.Application({
        width: body.clientWidth,
        height: body.clientHeight,
        antialias: true,
        transparent: true,
        resolution: 1
    });
    app.view.classList.add('pixi-view');
    body.appendChild(app.view);
    body.onmousemove = function (ev) {
        particleSystem.originPosition.x = ev.clientX;
        particleSystem.originPosition.y = ev.clientY;
        if (!conf.eventToDraw.onMouseMove || conf.eventToDraw.alwaysEmitAtMouse) {
            return;
        }
        toEmit(false);
    };
    body.onmousewheel = body.onmousemove;
    body.onmousedown = function (ev) {
        if (!conf.eventToDraw.onMouseClick) {
            return;
        }
        toEmit(true);
    };
    body.onmouseup = body.onmousedown;
    refreshConfig();
    atomApi.config.observe('particle-fly', function (newValue, previous) { return refreshConfig(); });
    listenEditor();
    atomApi.workspace.onDidStopChangingActivePaneItem(function (textEditor) {
        listenEditor();
    });
    particleSystem = new ParticleSystem_1.ParticleSystem(app.stage, new PVector_1.PVector(0, 0), conf);
    app.ticker.add(run);
}
exports.activate = activate;
function run() {
    if (conf.eventToDraw.alwaysEmitAtMouse) {
        toEmit(false);
    }
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
