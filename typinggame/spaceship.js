import Sprite from './sprite.js';

const image = new Image();
image.src = './public/spaceship.png';

const height = 25;
const width = 25;
const speed = 0.5;

class Spaceship extends Sprite {
    constructor(x, y) {
        super(image, x - width / 2, y - height / 2, width, height);
    }


    render(context) {
        super.render(context);
    }

    move() {
        this.y += speed;
    }
}

export default Spaceship;