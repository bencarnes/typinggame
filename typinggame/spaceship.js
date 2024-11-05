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

        this.explosionSprites = [];
        this.explosionTicks = 0;
    }


    render(context) {
        if (this.state === 'dead') {
            return;
        }

        if (this.state === 'dying') {
            this.explosionSprites.forEach((sprite) => {
                sprite.render(context);
            });
            return;
        }

        super.render(context);

        
        context.font = '16px Arial Black';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.word, this.x + width / 2, this.y - height / 2);
    }

    move() {
        this.y += speed;

        if (this.state === 'dying') {
            this.explosionTicks += 1;
            if (this.explosionTicks % 10 === 0 && this.explosionSprites.length < 10) {

                const explosion = new Explosion(this.x + Math.random() * this.width * 2 - this.width, this.y + Math.random() * this.height * 2 - this.height);
                this.explosionSprites.push(explosion);
            }

            this.explosionSprites.forEach((sprite) => {
                sprite.move();
            });
        }
    }

    explode() {
        this.state = 'dying';
    }
}

export default Spaceship;