"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
var Particle_1 = require("./script/Particle");
var PIXI = require("pixi.js");
var randomColor = function () { return Math.round(Math.random() * 0xFFFFFF); };
var ParticleSystem = (function () {
    function ParticleSystem(stage, originPosition) {
        this.particles = [];
        this.originPosition = new PVector_1.PVector(0, 0);
        this.stage = stage;
        this.originPosition = originPosition;
    }
    ParticleSystem.prototype.emitWithMultiple = function (config, countMultiple, sizeMultiple) {
        for (var i = 0; i < config.emitEveryTime * countMultiple; i++) {
            var circle = new PIXI.Graphics();
            circle.beginFill(randomColor());
            circle.drawCircle(0, 0, Math.random() * config.maxSize * sizeMultiple);
            circle.endFill();
            circle.x = this.originPosition.x;
            circle.y = this.originPosition.y;
            this.stage.addChild(circle);
            var p = new Particle_1.Particle(circle, config.opacity);
            p.position = PVector_1.PVector.copy(this.originPosition);
            p.velocity = new PVector_1.PVector((Math.random() - 0.5) * config.maxInitialVelocity.x, (Math.random() - 0.5) * config.maxInitialVelocity.y);
            p.rateOfAging = config.rateOfAging;
            p.mass = 1 + Math.random() * 3;
            this.particles.push(p);
        }
    };
    ParticleSystem.prototype.run = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.update();
            if (p.isDead()) {
                this.stage.removeChild(p.container);
                p.container.destroy();
                this.particles.splice(this.particles.indexOf(p), 1);
            }
        }
    };
    ParticleSystem.prototype.applyForce = function (force) {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.applyForce(force);
        }
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
