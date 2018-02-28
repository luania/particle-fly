"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var Colors_1 = require("./script/Colors");
var point = function (x, y) { return new PIXI.Point(x, y); };
var normalStarPoints = [];
for (var i = 0; i < 5; i++) {
    var angle = (72 * i) / 180 * Math.PI;
    var angle2 = (36 + 72 * i) / 180 * Math.PI;
    normalStarPoints.push(point(Math.cos(angle), -Math.sin(angle)));
    normalStarPoints.push(point(Math.cos(angle2) * 0.5, -Math.sin(angle2) * 0.5));
}
var ContainerFactory = (function () {
    function ContainerFactory() {
        this.maxSize = 1;
        this.monochrome = false;
    }
    ContainerFactory.prototype.circular = function () {
        var circle = new PIXI.Graphics();
        circle.beginFill(this.monochrome ? Colors_1.Colors.white : Colors_1.Colors.randomColor());
        circle.drawCircle(0, 0, Math.random() * this.maxSize);
        circle.endFill();
        return circle;
    };
    ContainerFactory.prototype.star = function () {
        var star = new PIXI.Graphics();
        star.beginFill(this.monochrome ? Colors_1.Colors.white : Colors_1.Colors.randomColor());
        var points = [];
        var size = Math.random() * this.maxSize;
        for (var _i = 0, normalStarPoints_1 = normalStarPoints; _i < normalStarPoints_1.length; _i++) {
            var p = normalStarPoints_1[_i];
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    };
    ContainerFactory.prototype.starSakura = function () {
        var star = new PIXI.Graphics();
        star.beginFill(this.monochrome ? Colors_1.Colors.white : Colors_1.Colors.pink);
        var points = [];
        var size = Math.random() * this.maxSize;
        for (var _i = 0, normalStarPoints_2 = normalStarPoints; _i < normalStarPoints_2.length; _i++) {
            var p = normalStarPoints_2[_i];
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    };
    return ContainerFactory;
}());
exports.ContainerFactory = ContainerFactory;
