
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = 25;
    this.growth = 10;
  }
  move() {
    this.size += this.growth;
    this.growth *= 0.9;
  }
  render(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, 'red');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1 - this.size / this.maxSize;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  isLive() {
    return this.size < this.maxSize;
  }
}

export default Explosion;