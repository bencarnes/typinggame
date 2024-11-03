import Sprite from './sprite.js';

const image = new Image();
image.src = './public/spaceship.png';

const height = 50;
const width = 50;
const speed = 0.5;

class Spaceship extends Sprite {
    constructor(x, y, word) {
        super(image, x - width / 2, y - height / 2, width, height);
        this.word = word;
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
}

export default Spaceship;