import { PVector } from "./script/PVector";
import { Particle } from "./script/Particle";
import { Config } from "./Config";
import { ContainerFactory } from "./ContainerFactory";
import { Colors } from "./script/Colors";
import * as PIXI from "pixi.js";

export class ParticleSystem {
    particles: Particle[] = [];
    originPosition = new PVector(0, 0);
    stage: PIXI.Container;
    config: Config;
    factory: ContainerFactory;

    constructor(stage: PIXI.Container, originPosition: PVector, config: Config) {
        this.stage = stage;
        this.originPosition = originPosition;
        this.config = config;
        this.factory = new ContainerFactory(config);
    }

    emit(multiple: boolean) {
        let countMultiple = multiple ? this.config.clickCountMultiple : 1;
        this.factory.multiple = multiple;
        for (let i = 0; i < this.config.emitEveryTime * countMultiple; i++) {
            let container = this.factory.create();
            container.position.set(this.originPosition.x, this.originPosition.y);
            if(this.config.randomInitialAngle){
                container.rotation = Math.random() * Math.PI * 2;
            }
            this.stage.addChild(container);

            let p = new Particle(container);
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
