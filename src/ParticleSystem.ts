import { PVector } from "./script/PVector";
import { Particle } from "./script/Particle";
import { Config } from "./Config";
import { ContainerFactory } from "./ContainerFactory";
import * as PIXI from "pixi.js";

export class ParticleSystem {
    particles: Particle[] = [];
    originPosition = new PVector(0, 0);
    stage: PIXI.Container;
    config: Config;
    factory = new ContainerFactory();

    constructor(stage: PIXI.Container, originPosition: PVector, config:Config) {
        this.stage = stage;
        this.originPosition = originPosition;
        this.config = config;
    }

    emit(multiple:boolean) {
        let countMultiple = multiple?this.config.clickCountMultiple:1;
        this.factory.maxSize = this.config.maxSize * (multiple?this.config.clickSizeMultiple:1);
        this.factory.monochrome = this.config.monochrome;
        for (let i = 0; i < this.config.emitEveryTime * countMultiple; i++) {
            let container;
            switch (this.config.texture) {
                case "circular":
                    container= this.factory.circular();
                    break;
                case "star":
                    container= this.factory.star();
                    break;
                case "starSakura":
                    container= this.factory.starSakura();
                    break;
                default:
                    break;
            }
            container.position.set(this.originPosition.x, this.originPosition.y);

            this.stage.addChild(container);

            let p = new Particle(container);
            p.opacity = this.config.opacity;
            p.rotation = this.config.rotation;
            p.position = PVector.copy(this.originPosition);
            p.velocity = new PVector(
                (Math.random() - 0.5) * this.config.maxInitialVelocity.x,
                (Math.random() - 0.5) * this.config.maxInitialVelocity.y
            );
            p.rateOfAging = this.config.rateOfAging;
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
