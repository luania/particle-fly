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
var cos30 = Math.cos(Math.PI / 6);
var sin30 = Math.sin(Math.PI / 6);
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
    ContainerFactory.prototype.color = function () {
        return this.config.whatToDraw.randomColor ?
            Colors_1.Colors.random() : Colors_1.Colors.toHex(this.config.whatToDraw.color);
    };
    ContainerFactory.prototype.create = function () {
        switch (this.config.whatToDraw.texture) {
            case "circular": return this.circular();
            case "star": return this.star();
            case "cross": return this.cross();
            case "hexagram": return this.hexagram();
            case "- custImage -": return this.image();
        }
    };
    ContainerFactory.prototype.circular = function () {
        var circle = new PIXI.Graphics();
        circle.beginFill(this.color());
        circle.drawCircle(0, 0, this.randomSize());
        circle.endFill();
        return circle;
    };
    ContainerFactory.prototype.star = function () {
        var star = new PIXI.Graphics();
        star.beginFill(this.color());
        var size = this.randomSize();
        star.drawStar(0, 0, this.config.whatToDraw.starPoints, size, size / 2);
        star.endFill();
        return star;
    };
    ContainerFactory.prototype.cross = function () {
        var cross = new PIXI.Graphics();
        var size = this.randomSize();
        cross.lineStyle(size / 10, this.color());
        cross.moveTo(0, size);
        cross.lineTo(0, -size);
        cross.moveTo(size, 0);
        cross.lineTo(-size, 0);
        return cross;
    };
    ContainerFactory.prototype.hexagram = function () {
        var cross = new PIXI.Graphics();
        var size = this.randomSize();
        var cos = cos30 * size;
        var sin = sin30 * size;
        cross.lineStyle(size / 10, this.color());
        cross.moveTo(0, size);
        cross.lineTo(cos, -sin);
        cross.lineTo(-cos, -sin);
        cross.lineTo(0, size);
        cross.moveTo(0, -size);
        cross.lineTo(-cos, sin);
        cross.lineTo(cos, sin);
        cross.lineTo(0, -size);
        return cross;
    };
    ContainerFactory.prototype.image = function () {
        var image = new PIXI.Sprite();
        var size = this.randomSize();
        var urls = this.config.whatToDraw.getImageArr();
        var url = this.randomFromArray(urls);
        if (PIXI.loader.resources[url]) {
            image.texture = PIXI.loader.resources[url].texture;
            image.width = size * 2;
            image.height = size * 2;
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;
        }
        return image;
    };
    return ContainerFactory;
}());
exports.ContainerFactory = ContainerFactory;
