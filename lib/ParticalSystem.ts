import { PVector } from "./script/PVector";
import { Partical } from "./script/Partical";
import { ExPartical } from "./script/ExPartical";
import { Painter } from "./script/Painter";

export class ParticalSystem {
    canvas: HTMLCanvasElement;
    painter: Painter;

    particals: ExPartical[] = [];
    originPosition = new PVector(0, 0);

    config: any;

    constructor(canvas: HTMLCanvasElement, originPosition: PVector, painter?: Painter) {
        this.canvas = canvas;
        this.originPosition = originPosition;
        this.painter = painter || new Painter(canvas);
    }

    emit() {
        for (let i = 0; i < this.config.emitNumEveryTime; i++) {
            let p = new ExPartical();
            p.position = PVector.copy(this.originPosition);
            p.velocity = new PVector((Math.random() - 0.5) * this.config.maxInitialVelocity.x, (Math.random() - 0.5) * this.config.maxInitialVelocity.y);
            p.rateOfAging = this.config.rateOfAging;
            p.r = Math.round(Math.random() * 255);
            p.g = Math.round(Math.random() * 255);
            p.b = Math.round(Math.random() * 255);
            p.size = Math.random() * this.config.maxSize;
            p.mass = 1 + Math.random() * 3;
            this.particals.push(p);
        }
    }

    run() {
        for (let p of this.particals) {
            p.update();
            if (p.isDead()) {
                this.particals.splice(this.particals.indexOf(p), 1);
            }
        }
    }

    draw() {
        this.painter.clearCanvas();
        for (let p of this.particals) {
            this.painter.drawCircular(
                p.position,
                p.size,
                "rgba(" + p.r + "," + p.g + "," + p.b + ", " + p.lifeSpan * this.config.opacity + ")"
            );
        }
    }

    applyForce(force: PVector) {
        for (let p of this.particals) {
            p.applyForce(force);
        }
    }
}
