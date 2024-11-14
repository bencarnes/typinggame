import Sprite from './sprite.js';
import Explosion from './explosion.js';

const image = new Image();
image.src = './public/spaceship.png';

const height = 50;
const width = 50;
const speed = 0.5;

class Spaceship extends Sprite {
    constructor(x, y, word) {
        super(image, x - width / 2, y - height / 2, width, height);
        this.word = word;
        this.state = 'alive';

        this.explosionTicks = 0;
        this.explosionCount = 0;
        this.maxExplosionCount = 10;
        this.typeAttempt = [];
    }


    render(context) {

        super.render(context);

        context.font = '16px Arial Black';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.word, this.x + width / 2, this.y - height / 2);
    }

    move() {
        this.y += speed;

    }

    spawn() {
        if (this.state === 'dying') {
            this.explosionTicks += 1;
            if (this.explosionTicks % 10 === 0 && this.explosionCount < this.maxExplosionCount) {
                const explosion = new Explosion(this.x + Math.random() * this.width * 2 - this.width, this.y + Math.random() * this.height * 2 - this.height);
                this.explosionCount += 1;
                return [explosion];
            }

            if (this.explosionCount >= this.maxExplosionCount) {
                this.state = 'dead';
            }
        }
        return [];
    }

    isLive() {
        return this.state !== 'dead';
    }

    letterTyped(letter) {
        this.typeAttempt.push(letter);
        if (this.typeAttempt.length > this.word.length) {
            this.typeAttempt.shift();
        }
        if (this.typeAttempt.join('') === this.word) {
            this.explode();
        }
    }

    explode() {
        this.state = 'dying';
    }
}

export default Spaceship;