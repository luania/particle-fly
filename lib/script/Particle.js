"use strict";
exports.__esModule = true;
var PVector_1 = require("./PVector");
var Particle = (function () {
    function Particle(container) {
        this.position = new PVector_1.PVector(0, 0);
        this.velocity = new PVector_1.PVector(0, 0);
        this.acceleration = new PVector_1.PVector(0, 0);
        this.lifeSpan = 1;
        this.mass = 1;
        this.rateOfAging = 0.05;
        this.rotation = 1;
        this.container = container;
    }
    Particle.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifeSpan -= this.rateOfAging;
        this.container.position.set(this.position.x, this.position.y);
        this.container.alpha = this.lifeSpan;
        this.container.rotation += Math.PI / 180 * this.rotation;
    };
    Particle.prototype.applyForce = function (force) {
        this.acceleration.add(PVector_1.PVector.div(force, this.mass));
    };
    Particle.prototype.isDead = function () {
        return this.lifeSpan <= 0;
    };
    return Particle;
}());
exports.Particle = Particle;
