import { PVector } from "./script/PVector";
import { Particle } from "./script/Particle";
import { Config } from "./Config";
import { ContainerFactory } from "./ContainerFactory";
import * as PIXI from "pixi.js";

export class ParticleSystem {
    particles: Particle[] = [];
    originPosition = new PVector(0, 0);
    stage: PIXI.Container;
    factory = new ContainerFactory();

    constructor(stage: PIXI.Container, originPosition: PVector) {
        this.stage = stage;
        this.originPosition = originPosition;
    }

    emit(config: Config, multiple:boolean) {
        let countMultiple = multiple?config.clickCountMultiple:1;
        let sizeMultiple = multiple?config.clickSizeMultiple:1;
        for (let i = 0; i < config.emitEveryTime * countMultiple; i++) {
            let container;
            switch (config.texture) {
                case "circular":
                    container= this.factory.circular(config.maxSize * sizeMultiple);
                    break;
                case "star":
                    container= this.factory.star(config.maxSize * sizeMultiple);
                    break;
            }
            container.x = this.originPosition.x;
            container.y = this.originPosition.y;

            this.stage.addChild(container);

            let p = new Particle(container);
            p.opacity = config.opacity;
            p.rotation = config.rotation;
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
