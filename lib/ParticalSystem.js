"use strict";
var PVector_1 = require("./script/PVector");
var ExPartical_1 = require("./script/ExPartical");
var Painter_1 = require("./script/Painter");
var ParticalSystem = (function () {
    function ParticalSystem(canvas, originPosition, painter) {
        this.particals = [];
        this.originPosition = new PVector_1.PVector(0, 0);
        this.canvas = canvas;
        this.originPosition = originPosition;
        this.painter = painter || new Painter_1.Painter(canvas);
    }
    ParticalSystem.prototype.emit = function () {
        for (var i = 0; i < this.config.emitNumEveryTime; i++) {
            var p = new ExPartical_1.ExPartical();
            p.position = PVector_1.PVector.copy(this.originPosition);
            p.velocity = new PVector_1.PVector((Math.random() - 0.5) * this.config.maxInitialVelocity.x, (Math.random() - 0.5) * this.config.maxInitialVelocity.y);
            p.rateOfAging = this.config.rateOfAging;
            p.r = Math.round(Math.random() * 255);
            p.g = Math.round(Math.random() * 255);
            p.b = Math.round(Math.random() * 255);
            p.size = Math.random() * this.config.maxSize;
            p.mass = 1 + Math.random() * 3;
            this.particals.push(p);
        }
    };
    ParticalSystem.prototype.run = function () {
        for (var _i = 0, _a = this.particals; _i < _a.length; _i++) {
            var p = _a[_i];
            p.update();
            if (p.isDead()) {
                this.particals.splice(this.particals.indexOf(p), 1);
            }
        }
    };
    ParticalSystem.prototype.draw = function () {
        this.painter.clearCanvas();
        for (var _i = 0, _a = this.particals; _i < _a.length; _i++) {
            var p = _a[_i];
            this.painter.drawCircular(p.position, p.size, "rgba(" + p.r + "," + p.g + "," + p.b + ", " + p.lifeSpan * this.config.opacity + ")");
        }
    };
    ParticalSystem.prototype.applyForce = function (force) {
        for (var _i = 0, _a = this.particals; _i < _a.length; _i++) {
            var p = _a[_i];
            p.applyForce(force);
        }
    };
    return ParticalSystem;
}());
exports.ParticalSystem = ParticalSystem;
//# sourceMappingURL=ParticalSystem.js.map