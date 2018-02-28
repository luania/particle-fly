"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
var Particle_1 = require("./script/Particle");
var ContainerFactory_1 = require("./ContainerFactory");
var ParticleSystem = (function () {
    function ParticleSystem(stage, originPosition) {
        this.particles = [];
        this.originPosition = new PVector_1.PVector(0, 0);
        this.factory = new ContainerFactory_1.ContainerFactory();
        this.stage = stage;
        this.originPosition = originPosition;
    }
    ParticleSystem.prototype.randomColor = function (config) {
        if (config.monochrome) {
            return 0xFFFFFF;
        }
        else {
            return Math.round(Math.random() * 0xFFFFFF);
        }
    };
    ParticleSystem.prototype.emit = function (config, multiple) {
        var countMultiple = multiple ? config.clickCountMultiple : 1;
        var sizeMultiple = multiple ? config.clickSizeMultiple : 1;
        for (var i = 0; i < config.emitEveryTime * countMultiple; i++) {
            var container = void 0;
            var color = this.randomColor(config);
            switch (config.texture) {
                case "circular":
                    container = this.factory.circular(config.maxSize * sizeMultiple, color);
                    break;
                case "star":
                    container = this.factory.star(config.maxSize * sizeMultiple, color);
                    break;
            }
            container.x = this.originPosition.x;
            container.y = this.originPosition.y;
            this.stage.addChild(container);
            var p = new Particle_1.Particle(container);
            p.opacity = config.opacity;
            p.rotation = config.rotation;
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
