


class Sprite {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move() {
    }

    isLive() {
        return true;
    }
}

export default Sprite;