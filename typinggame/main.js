import Sprite from './sprite.js';
import Spaceship from './spaceship.js';
import Star from './star.js';

export default class Game {
    constructor(wordList) {

        this.wordList = wordList;

        this.canvas = document.querySelector('canvas');

        this.canvas.width = 1000;
        this.canvas.height = 600;
        
        this.score = 0;
        
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        
        this.sprites = []
        
        this.gameTicks = 0;

        this.createStars()
        this.spawnSpaceship();
        this.hookupUserControls();
    }

    hookupUserControls() {
        window.addEventListener('keypress', (event) => {
            const letter = event.key;
            if (letter.length === 1 && letter.match(/[a-z]/i)) {
                this.sprites.forEach(sprite => {
                    if (sprite.letterTyped) {
                        sprite.letterTyped(letter);
                    }
                });
            }
        });
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 0));
        }
        for (let i = 0; i < 50; i++) {
            this.stars.push(new Star(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 0.05));
        }
        for (let i = 0; i < 25; i++) {
            this.stars.push(new Star(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 0.125));
        }
    }

    renderBackground(context) {
        this.stars.forEach(star => { star.render(context); });
    }

    renderScore(context) {
        context.font = '16px Arial';
        context.fillStyle = 'blue';
        context.fillText(`Score: ${this.score}`, this.canvas.width - 100, this.canvas.height - 20);
    }

    gameMove() {
        this.sprites.forEach(sprite => { sprite.move(); });
        this.stars.forEach(star => { star.move(); });
    }

    gameSpawn() {
        if (this.gameTicks > 0 && this.gameTicks % 100 === 0) {
            this.spawnSpaceship();
        }

        this.sprites = [...this.sprites, ...this.sprites.filter(s => s.spawn).flatMap(s => s.spawn())];
    }


    spawnSpaceship() {
        const x = Math.random() * this.canvas.width;
        const y = -50;
        const word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.sprites.push(new Spaceship(x, y, word));
    }


    gameRender() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.renderBackground(this.ctx);

        this.sprites.forEach(sprite => { sprite.render(this.ctx); });

        this.renderScore(this.ctx);
    }

    gameCleanup() {
        this.score += this.sprites.filter(s => !s.isLive() && s.isSpaceship).length;
        this.sprites = this.sprites.filter(s => s.isLive());
    
        this.score -= this.sprites.filter(s => s.isLive() && s.isSpaceship && s.y >= this.canvas.height).length;
        this.sprites = this.sprites.filter(s => s.y < this.canvas.height);
    }

    gameLoop() {
        requestAnimationFrame(() => { this.gameLoop() });

        this.gameMove();
        this.gameRender();
        this.gameSpawn();
        this.gameCleanup();

        this.gameTicks += 1;
    }

    start() {
        this.gameLoop();
    }
}


