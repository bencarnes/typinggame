class Star {
    constructor(x, y, speed, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        const colors = ['#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD'];
        //const colors = ['#FFFFFF', '#FFFAF0', '#F0FFFF', '#FFFACD'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }

    move() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
            this.y = 0;
            this.x = Math.random() * this.canvasWidth;
        }
    }
}

export default Star;