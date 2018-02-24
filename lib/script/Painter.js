"use strict";
exports.__esModule = true;
var Painter = (function () {
    function Painter(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    Painter.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Painter.prototype.drawCircular = function (position, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        this.ctx.fill();
    };
    return Painter;
}());
exports.Painter = Painter;
//# sourceMappingURL=Painter.js.map