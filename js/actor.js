function actor(xStart, yStart) {
	var idle = document.getElementsByClassName('actorIdle');
	var left = document.getElementsByClassName('actorLeft');
	var right = document.getElementsByClassName('actorRight');

	var bulletIcon = document.getElementsByClassName('bulletIcon');
	var vBulletIcon = document.getElementsByClassName('vBulletIcon');

	var actor = {
		type: 'actor',

		x: xStart,
	    y: yStart,
	    speed: 10,
	    minHp: 10,
	    maxHp: 10,
	    
	    hit: false,
	    dead: false,
	    dying: false,
	    score: 0,
	    deaths: 0,

	    deathAnimationCounter: 0,
		animationTimer:0,
	    inventory: [],
	    image: idle,
	    shots: 0,
	    hits: 0,
	    kills: 0,
		buttonPress: false,
		frame: 0,

		dodgeSpeed: 100,
		dodgeHeat: 25,
		afterimages: [],

		gun: gun(0, [
			{
				icon: vBulletIcon[0],
				make: function(x,y,dir) { return vbullet(x,y,dir) }
			},
			{
				icon: bulletIcon[0],
				make: function(x,y,dir) { return bullet(x,y,dir) }
			}
		]),

		render: function(ctx, target) {
	        if(!this.dead && !this.dying) {
	        	if(this.afterimages.length > 0) {
	        		var i = this.afterimages.length
					while (i--) {
					    this.afterimages[i].render(ctx);
					    if(this.afterimages[i].alpha <= 0)
					    	this.afterimages.splice(i, 1);
					}
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
	    	if(!this.dead && !this.dying) {
	    		this.timers();
	    		this.move();
	            this.dodge();
	            this.selectAmmo();
	        }
	        else if(this.dying && !this.dead) {
	            if(this.deathAnimationCounter != 16)
	                this.deathAnimationCounter++;
	            else
	                this.dead = true;
	        }
	        else {
                if(buttonsPressed.includes(27)) {
                    screen = stage();
                    screen.width = canvas.width;
                    screen.height = canvas.height;
                    this.minHp = this.maxHp;
                    this.dead = false;
                    this.dying = false;
                    this.score = 0;
                    var x = this.x;
                    var y = this.y;
                    var dir = this.direction;
                    this.gun = gun(0, [
					{
						icon: vBulletIcon[0],
						make: function(x,y,dir) { return vbullet(x,y,dir) }
					},
					{
						icon: bulletIcon[0],
						make: function(x,y,dir) { return bullet(x,y,dir) }
					}
		])
                    screen.render(ctx);
                }
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
	    	if(this.minHp < 1 ) {
	    		this.dying = true;
	    		this.minHp = 0;
	    	}
	    },

	    timers: function() {
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
	    },

	    move: function() {
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
            	if(this.gun.fireBullet(this.x + (this.image[this.frame].width / 2), this.y))
            		this.shots++;
            }
	    },

	    dodge: function() {
	    	if(buttonsPressed.indexOf(90) != -1 && (buttonsPressed.indexOf(leftButton) != -1 || buttonsPressed.indexOf(rightButton) != -1) ) {
	         	if(this.gun.heatGenerated + this.dodgeHeat <= this.gun.heatTolerance) {
	         		var to;
	         		var start = this.x;
	         		var y =this.y;
	             	var imageCopy = this.image[this.frame];
	             	if(buttonsPressed.includes(leftButton)) {
	             		if(this.x - this.dodgeSpeed > 0) {
	             			to = this.x - this.dodgeSpeed;
	             			this.x = this.x - this.dodgeSpeed;
	             		}
	             		else  {
	             			to = 0;
	             			this.x = 0;
	             		}

	             		for(var i = 0; i != 10; i++) {
	             			var image = {
	             				x: start - ((start - to)/(i + 1)),
	             				y: y,
	             				image: imageCopy,
	             				alpha: 1/(i+1),
	             				render(ctx) {
	             					ctx.save();
	             					ctx.globalAlpha = this.alpha;
	             					ctx.drawImage(this.image, this.x, this.y);
	             					ctx.restore();
	             					this.alpha-=.01;
	             				}
	             			}
	             			this.afterimages.push(image);
	             		}
	             	}
	             	else if(buttonsPressed.includes(rightButton)) {
	             		if(this.x + this.dodgeSpeed + this.getWidth() <= canvas.width) {
	             			to = this.x + this.dodgeSpeed;
	             			this.x = this.x + this.dodgeSpeed;
	             		}
	             		else {
	             			to = canvas.width - this.getWidth();
	             			this.x = canvas.width - this.getWidth();
	             		}

	             		for(var i = 0; i != 10; i++) {
	             			var image = {
	             				x: start + ((to - start)/(i + 1)),
	             				y: y,
	             				image: imageCopy,
	             				alpha: 1/(i+1),
	             				render(ctx) {
	             					ctx.save();
	             					ctx.globalAlpha = this.alpha;
	             					ctx.drawImage(this.image, this.x, this.y);
	             					ctx.restore();
	             					this.alpha-=.01;
	             				}
	             			}
	             			this.afterimages.push(image);
	             		}
	             	}

	             	this.gun.heatGenerated += this.dodgeHeat;
	         	}
	     	 }

	     	// Remove dodge key to avoid activating multiple dodges //
	     	var index = buttonsPressed.indexOf(90);
	     	if (index > -1) {
				buttonsPressed.splice(index, 1);
			}
	    },

	    selectAmmo: function() {
	    	var button = findButton(buttons, 88);
	    	if(button) {
	    		if(!button.isUsed) {
	    			this.gun.changeAmmo();
	    			button.isUsed = true;
	    		}
	    	}
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

	    reset: function() {
	    	this.maxHp = 10;
	    	this.minHp = this.maxHp;
	    	this.speed = 10;
		    this.dead = false;
		    this.dying = false;
		    this.score = 0;
		    this.hits = 0;
		    this.shots = 0;
		    this.kills = 0;
		    var x = this.x;
		    var y = this.y;
		    var dir = this.direction;
		    this.gun = gun(0, [function(x,y,dir) { return vbullet(x,y,dir) }, function(x,y,dir) { return bullet(x,y,dir) }]);
		    this.hit = false;

		    this.deathAnimationCounter = 0;
			this.animationTimer = 0;
		    this.inventory = [];
		    this.image = document.getElementsByClassName('actorIdle');;
			this.frame = 0;

			this.dodgeSpeed = 100;
			this.dodgeHeat = 25;
			this.afterimages = [];
	    }
    }

    return actor;
}

var actor = actor(65, window.innerHeight - 200);