function enemy(xStart, yStart, pattern) {
	var idle = document.getElementsByClassName('enemyIdle');
	var left = document.getElementsByClassName('enemyLeft');
	var right = document.getElementsByClassName('enemyRight');

	var enemy = {
		x: xStart,
	    y: yStart,
	    pattern: pattern,
	    width: 0,
	    height: 0,
	    speed: 10,
	    minHp: 10,
	    maxHp: 10,
	    minHeat: 0,
	    maxHeat: 100,
	    
	    hit: false,
	    dead: false,
	    dying: false,
	    score: 0,
	    gun: [],
	    guns:[],
	    selectedGun: 0,
	    deaths: 0,

		bulletDelay: 0,
	    deathAnimationCounter: 0,
	    heatTimer: 0,
		animationTimer:0,
		bullets: [],
	    inventory: [],
	    image: idle,
	    shots: 0,
	    hits: 0,
	    kills: 0,
		buttonPress: false,
		frame: 0,

		gun: gun(),

		render: function(ctx, target) {
	        if(!this.dead && !this.dying) {
	            if(this.animationTimer != 10) {
	            	this.animationTimer++;
	            }
	            else {
	            	this.animationTimer = 0;
	            	if(this.frame != this.image.length-1) {
	            		this.frame++;
	            	}
	            	else
	            		this.frame = 0;
	            }

	            ctx.drawImage(this.image[this.frame], this.x, this.y);
	        }
	        else if(this.dying && !this.dead)
	        {
	            // ctx.fillRect(x + (getWidth() / 2) - 5 - deathAnimationCounter, y + (getHeight() / 2), 5, 2); // Left Line
	            // ctx.fillRect(x + (getWidth() / 2) + 5 + deathAnimationCounter, y + (getHeight() / 2), 5, 2); // Right Line
	            // ctx.fillRect(x + (getWidth() / 2), y + (getHeight() / 2) - 5 - deathAnimationCounter, 5, 2); // Top Line
	            // ctx.fillRect(x + (getWidth() / 2), y + (getHeight() / 2) + 5 + deathAnimationCounter, 5, 2); // Bottom Line
	        }

	        if(this.gun) this.gun.render(ctx);
    	},
    
	    logic: function() {
	    	this.pattern.logic(this);
	    },
    
	    rightLeftPattern: function()
	    {
	        if(!this.switchDirection) {
	            this.right = false;
	            this.left = true;
	            if(this.x - this.speed > 50)
	                this.x = this.x - this.speed;
	            else
	                this.switchDirection = false;
	        }
	        else {
	            this.right = true;
	            this.left = false;
	            if(this.x + this.speed < 1230)
	                this.x = this.x + this.speed;
	            else
	                this.switchDirection = true;
	        }
	        if(this.y + 2 > 800)
	            this.dead = true;
	        else
	            this.y = this.y + 2;
	    }
    }

	return enemy;
}