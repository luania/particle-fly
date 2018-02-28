"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
var Particle_1 = require("./script/Particle");
var ContainerFactory_1 = require("./ContainerFactory");
var ParticleSystem = (function () {
    function ParticleSystem(stage, originPosition, config) {
        this.particles = [];
        this.originPosition = new PVector_1.PVector(0, 0);
        this.factory = new ContainerFactory_1.ContainerFactory();
        this.stage = stage;
        this.originPosition = originPosition;
        this.config = config;
    }
    ParticleSystem.prototype.emit = function (multiple) {
        var countMultiple = multiple ? this.config.clickCountMultiple : 1;
        this.factory.maxSize = this.config.maxSize * (multiple ? this.config.clickSizeMultiple : 1);
        this.factory.monochrome = this.config.monochrome;
        for (var i = 0; i < this.config.emitEveryTime * countMultiple; i++) {
            var container = void 0;
            switch (this.config.texture) {
                case "circular":
                    container = this.factory.circular();
                    break;
                case "star":
                    container = this.factory.star();
                    break;
                case "starSakura":
                    container = this.factory.starSakura();
                    break;
                default:
                    break;
            }
            container.position.set(this.originPosition.x, this.originPosition.y);
            this.stage.addChild(container);
            var p = new Particle_1.Particle(container);
            p.opacity = this.config.opacity;
            p.rotation = this.config.rotation;
            p.position = PVector_1.PVector.copy(this.originPosition);
            p.velocity = new PVector_1.PVector((Math.random() - 0.5) * this.config.maxInitialVelocity.x, (Math.random() - 0.5) * this.config.maxInitialVelocity.y);
            p.rateOfAging = this.config.rateOfAging;
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
