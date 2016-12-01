import { PVector } from "./PVector";


export class Partical {
    position: PVector = new PVector(0, 0);
    velocity: PVector = new PVector(0, 0);
    acceleration: PVector = new PVector(0, 0);
    lifeSpan: number = 1;
    mass: number = 1;
    rateOfAging = 5;

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifeSpan -= this.rateOfAging;
    }

    applyForce(force: PVector) {
        this.acceleration.add(PVector.div(force, this.mass));
    }

    isDead() {
        return this.lifeSpan <= 0;
    }
}
