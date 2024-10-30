import Sprite from './sprite.js';
import Spaceship from './spaceship.js';

const canvas = document.querySelector('canvas');

canvas.width = 600;
canvas.height = 400;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let sprites = []

sprites.push(new Spaceship(50, 50));

function gameMove() {
    sprites.forEach(sprite => { sprite.move(); });
}

function gameRender() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sprites.forEach(sprite => { sprite.render(ctx); });

}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    gameMove();
    gameRender();
}
gameLoop();
  
window.addEventListener('keypress', (event) => {
    const letter = event.key;
    if (letter.length === 1 && letter.match(/[a-z]/i)) {
        console.log(`Letter key pressed: ${letter}`);
        // Add your logic here to handle the letter key press
    }
});
