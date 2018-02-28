"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var ContainerFactory = (function () {
    function ContainerFactory() {
    }
    ContainerFactory.prototype.circular = function (maxSize, color) {
        var circle = new PIXI.Graphics();
        circle.beginFill(color);
        circle.drawCircle(0, 0, Math.random() * maxSize);
        circle.endFill();
        return circle;
    };
    ContainerFactory.prototype.star = function (maxSize, color) {
        var star = new PIXI.Graphics();
        star.beginFill(color);
        var points = [];
        var size = Math.random() * maxSize;
        for (var i = 0; i < 5; i++) {
            points.push(new PIXI.Point(Math.cos((18 + 72 * i) / 180 * Math.PI) * size, -Math.sin((18 + 72 * i) / 180 * Math.PI) * size));
            points.push(new PIXI.Point(Math.cos((54 + 72 * i) / 180 * Math.PI) * size * 0.5, -Math.sin((54 + 72 * i) / 180 * Math.PI) * size * 0.5));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    };
    return ContainerFactory;
}());
exports.ContainerFactory = ContainerFactory;
