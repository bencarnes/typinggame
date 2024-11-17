import Sprite from './sprite.js';
import Spaceship from './spaceship.js';
import Star from './star.js';
import Words from './words.js';

const canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 600;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let sprites = []

let gameTicks = 0;

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
    if (gameTicks > 0 && gameTicks % 100 === 0) {
        spawnSpaceship();
    }

    sprites = [...sprites, ...sprites.filter(s => s.spawn).flatMap(s => s.spawn())];
}

function spawnSpaceship() {
    const x = Math.random() * canvas.width;
    const y = -50;
    const word = Words.getRandWord('leftUpper');
    sprites.push(new Spaceship(x, y, word));
}

spawnSpaceship();

function gameCleanup() {
    sprites = sprites.filter(s => s.isLive());

    sprites = sprites.filter(s => s.y < canvas.height);
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    gameMove();
    gameRender();
    gameSpawn();
    gameCleanup();

    gameTicks += 1;
}
gameLoop();
  
window.addEventListener('keypress', (event) => {
    const letter = event.key;
    if (letter.length === 1 && letter.match(/[a-z]/i)) {
        sprites.forEach(sprite => {
            if (sprite.letterTyped) {
                sprite.letterTyped(letter);
            }
        });
    }
});
