"use strict";
var PVector_1 = require("./PVector");
var Partical = (function () {
    function Partical() {
        this.position = new PVector_1.PVector(0, 0);
        this.velocity = new PVector_1.PVector(0, 0);
        this.acceleration = new PVector_1.PVector(0, 0);
        this.lifeSpan = 1;
        this.mass = 1;
        this.rateOfAging = 5;
    }
    Partical.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifeSpan -= this.rateOfAging;
    };
    Partical.prototype.applyForce = function (force) {
        this.acceleration.add(PVector_1.PVector.div(force, this.mass));
    };
    Partical.prototype.isDead = function () {
        return this.lifeSpan <= 0;
    };
    return Partical;
}());
exports.Partical = Partical;
//# sourceMappingURL=Partical.js.map