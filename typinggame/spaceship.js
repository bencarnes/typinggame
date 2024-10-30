import Sprite from './sprite.js';

const image = new Image();
image.src = './public/spaceship.png';

const height = 50;
const width = 50;

class Spaceship extends Sprite {
    constructor(x, y) {
        super(image, x - width / 2, y - height / 2, width, height);
    }


    render(context) {
        super.render(context);
    }

    move() {
        this.y += 1;
    }
}

export default Spaceship;