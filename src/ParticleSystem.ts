import { PVector } from "./script/PVector";
import { Particle } from "./script/Particle";
import { Config } from "./Config";
import * as PIXI from "pixi.js";

let randomColor = () => Math.round(Math.random() * 0xFFFFFF);

export class ParticleSystem {
    particles: Particle[] = [];
    originPosition = new PVector(0, 0);
    stage: PIXI.Container;

    constructor(stage: PIXI.Container, originPosition: PVector) {
        this.stage = stage;
        this.originPosition = originPosition;
    }

    emitWithMultiple(config: Config, countMultiple: number, sizeMultiple: number) {
        for (let i = 0; i < config.emitEveryTime * countMultiple; i++) {
            let circle = new PIXI.Graphics();
            circle.beginFill(randomColor());
            circle.drawCircle(0, 0, Math.random() * config.maxSize * sizeMultiple);
            circle.endFill();
            circle.x = this.originPosition.x;
            circle.y = this.originPosition.y;

            this.stage.addChild(circle);

            let p = new Particle(circle, config.opacity);
            p.position = PVector.copy(this.originPosition);
            p.velocity = new PVector(
                (Math.random() - 0.5) * config.maxInitialVelocity.x,
                (Math.random() - 0.5) * config.maxInitialVelocity.y
            );
            p.rateOfAging = config.rateOfAging;
            p.mass = 1 + Math.random() * 3;
            this.particles.push(p);
        }
    }

    run() {
        for (let p of this.particles) {
            p.update();
            if (p.isDead()) {
                this.stage.removeChild(p.container);
                p.container.destroy();
                this.particles.splice(this.particles.indexOf(p), 1);
            }
        }
    }

    applyForce(force: PVector) {
        for (let p of this.particles) {
            p.applyForce(force);
        }
    }
}
