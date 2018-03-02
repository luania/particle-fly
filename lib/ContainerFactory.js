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
    function ContainerFactory(config) {
        this.multiple = false;
        this.config = config;
    }
    ContainerFactory.prototype.randomSize = function () {
        return (Math.random() * this.config.whatToDraw.range() + this.config.whatToDraw.minSize)
            * (this.multiple ? this.config.clickSizeMultiple : 1);
    };
    ContainerFactory.prototype.randomFromArray = function (arr) {
        return arr[Math.round(Math.random() * (arr.length - 1))];
    };
    ContainerFactory.prototype.circular = function () {
        var circle = new PIXI.Graphics();
        circle.beginFill(this.config.whatToDraw.monochrome ? Colors_1.Colors.white : Colors_1.Colors.random());
        circle.drawCircle(0, 0, this.randomSize());
        circle.endFill();
        return circle;
    };
    ContainerFactory.prototype.star = function () {
        var star = new PIXI.Graphics();
        star.beginFill(this.config.whatToDraw.monochrome ? Colors_1.Colors.white : Colors_1.Colors.random());
        var points = [];
        var size = this.randomSize();
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
        star.beginFill(this.config.whatToDraw.monochrome ? Colors_1.Colors.white : Colors_1.Colors.pink);
        var points = [];
        var size = this.randomSize();
        for (var _i = 0, normalStarPoints_2 = normalStarPoints; _i < normalStarPoints_2.length; _i++) {
            var p = normalStarPoints_2[_i];
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    };
    ContainerFactory.prototype.image = function () {
        var image = new PIXI.Sprite();
        var size = this.randomSize();
        var urls = this.config.whatToDraw.image.split(';');
        var url = this.randomFromArray(urls);
        image.texture = PIXI.loader.resources[url].texture;
        image.width = size * 2;
        image.height = size * 2;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        return image;
    };
    return ContainerFactory;
}());
exports.ContainerFactory = ContainerFactory;
