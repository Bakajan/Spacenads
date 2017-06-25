function enemy(xStart, yStart, pattern, name) {
	var idle = document.getElementsByClassName('enemyIdle');
	var left = document.getElementsByClassName('enemyLeft');
	var right = document.getElementsByClassName('enemyRight');

	var enemy = {
		x: xStart,
	    y: yStart,
	    pattern: pattern,
	    width: 0,
	    height: 0,
	    xspeed: 10,
	    yspeed: 1,
	    minHp: 2,
	    maxHp: 2,
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
	    left: left,
	    right: right,
	    idele: idle,
	    image: idle,
	    shots: 0,
	    hits: 0,
	    kills: 0,
		buttonPress: false,
		frame: 0,
		name: name,

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

	            if(left)

	            ctx.drawImage(this.image[this.frame], this.x, this.y);
	        }
	        else if(this.dying && !this.dead)
	        {
	            ctx.fillRect(this.x + (this.getWidth() / 2) - 5 - this.deathAnimationCounter, this.y + (this.getHeight() / 2), 5, 2); // Left Line
	            ctx.fillRect(this.x + (this.getWidth() / 2) + 5 + this.deathAnimationCounter, this.y + (this.getHeight() / 2), 5, 2); // Right Line
	            ctx.fillRect(this.x + (this.getWidth() / 2), this.y + (this.getHeight() / 2) - 5 - this.deathAnimationCounter, 5, 2); // Top Line
	            ctx.fillRect(this.x + (this.getWidth() / 2), this.y + (this.getHeight() / 2) + 5 + this.deathAnimationCounter, 5, 2); // Bottom Line
	        }

	        if(this.gun) this.gun.render(ctx);
    	},
    
	    logic: function() {
	    	if(this.dying) {
		    	if(this.deathAnimationCounter != 16)
	            {
	                this.deathAnimationCounter++;
	                if(this.deathAnimationCounter == 1)
	                    actor.score = actor.score + 100;
	            }
	            else if(this.deathAnimationCounter == 16)
	                this.dead = true;
        	}

	    	this.pattern.logic(this);
	    },

	    hit: function(damage) {
	    	this.minHp-=damage;
	    	if(this.minHp < 1 )
	    		this.dying = true;
	    },

	    getWidth: function() {
	    	return this.image[this.frame].width;
	    },
	    getHeight: function() {
	    	return this.image[this.frame].height;
	    },

	    collisionCheck: function(Object) {
	    	if(!Object.dead && !Object.dying) {
		    	var rect1 = {x: this.x, y: this.y, width: this.getWidth(), height: this.getHeight()};
		    	var rect2 = {x: Object.x, y: Object.y, width: Object.getWidth(), height: Object.getHeight()};

		    	if (rect1.x < rect2.x + rect2.width &&
				   rect1.x + rect1.width > rect2.x &&
				   rect1.y < rect2.y + rect2.height &&
				   rect1.height + rect1.y > rect2.y) {

				   	return true;
				}
			}
	    },
    
	    rightLeftPattern: function()
	    {
	        if(!this.switchDirection) {
	            this.right = false;
	            this.left = true;
	            if(this.x - this.xspeed > 50)
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