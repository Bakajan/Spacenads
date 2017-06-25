function actor(xStart, yStart) {
	var idle = document.getElementsByClassName('actorIdle');
	var left = document.getElementsByClassName('actorLeft');
	var right = document.getElementsByClassName('actorRight');

	var actor = {
		x: xStart,
	    y: yStart,
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

	            if(buttonsPressed.reverse().includes(leftButton)) {
	            	this.image = left;
	            	if(this.x - this.speed > 0)
	                    this.x = this.x - this.speed;
	            }
	            else if(buttonsPressed.reverse().includes(rightButton)) {
	            	this.image = right;
	            	if(this.x + this.image[this.frame].width + this.speed < canvas.width)
	                    this.x = this.x + this.speed;
	            }
	            if(!buttonsPressed.includes(leftButton) && !buttonsPressed.includes(rightButton)){
	            	this.image = idle;
	            }

	            if(buttonsPressed.includes(fireButton)) {
	            	this.gun.fireBullet(this.x + (this.image[this.frame].width / 2), this.y);
	            }

	            ctx.drawImage(this.image[this.frame], this.x, this.y);
	        }
	        else if(this.dying && !this.dead)
	        {
	            ctx.fillRect(this.x + (this.getWidth() / 2) - 5 - this.deathAnimationCounter, this.y + (this.getHeight() / 2), 5, 2); // Left Line
	            ctx.fillRect(this.x + (this.getWidth() / 2) + 5 + this.deathAnimationCounter, this.y + (this.getHeight() / 2), 5, 2); // Right Line
	            ctx.fillRect(this.x + (this.getWidth() / 2), this.y + (this.getHeight() / 2) - 5 - this.deathAnimationCounter, 5, 2); // Top Line
	            ctx.fillRect(this.x + (this.getWidth() / 2), this.y + (this.getHeight() / 2) + 5 + this.deathAnimationCounter, 5, 2); // Bottom Line
	        }

	        if(this.gun) this.gun.render(ctx, screen.enemies);
    	},
    
	    logic: function() {
	        if(this.dying)
	        {
	            if(this.deathAnimationCounter != 16)
	                this.deathAnimationCounter++;
	            else
	                this.dead = true;
	        }
	    },

	    getWidth: function() {
	    	return this.image[this.frame].width;
	    },
	    getHeight: function() {
	    	return this.image[this.frame].height;
	    },

	    hit: function(damage) {
	    	this.minHp-=damage;
	    	if(this.minHp < 1 )
	    		this.dying = true;
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
	    }
    }

    return actor;
}

actor = actor(65, window.innerHeight - 200);