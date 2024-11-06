import Sprite from './sprite.js';
import Spaceship from './spaceship.js';
import Star from './star.js';

const canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 600;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let sprites = []

let spaceship = new Spaceship(50, 50, "test");
sprites.push(spaceship);
setTimeout(() => spaceship.explode(), 5000);

let stars = [];
for (let i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, 0));
}
for (let i = 0; i < 50; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, 0.05));
}
for (let i = 0; i < 25; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, 0.125));
}


function gameMove() {
    sprites.forEach(sprite => { sprite.move(); });
    stars.forEach(star => { star.move(); });
}

function renderBackground(context) {
    stars.forEach(star => { star.render(context); });
}

function gameRender() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground(ctx);

    sprites.forEach(sprite => { sprite.render(ctx); });
}

function gameSpawn() {
    sprites = [...sprites, ...sprites.filter(s => s.spawn).flatMap(s => s.spawn())];
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    gameMove();
    gameRender();
    gameSpawn();
}
gameLoop();
  
window.addEventListener('keypress', (event) => {
    const letter = event.key;
    if (letter.length === 1 && letter.match(/[a-z]/i)) {
        console.log(`Letter key pressed: ${letter}`);
        // Add your logic here to handle the letter key press
    }
});
