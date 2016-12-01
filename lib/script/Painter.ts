import { PVector } from "./PVector";

export class Painter {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircular(position: PVector, size: number, color: String) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}
