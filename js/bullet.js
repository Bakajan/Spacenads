function bullet(xStart, yStart, direction = 0) {
	var bullet = {
		type: 'bullet',

		x: xStart,
		y: yStart,
		speed: 10,
		heat: 10,

		done: false,
		targetHit: false,
		down: direction, 
		done1: false,
		done2: false,

		image: document.getElementsByClassName('shot'),
		animationTimer: 0,
		frame: 0,
		dead: false,
		dying: false,

		render: function(ctx) {
			if(!this.done) {
				ctx.drawImage(this.image[this.frame], this.x, this.y);
	    	}
		},

		logic: function(targets) {
			// Only check if hasn't hit target //
			if(!this.done) {
				/// Check if target is hit //
				for(var i = 0; i != targets.length; i++) {
					if(targets[i].collisionCheck(this)) {
						if(!targets[i].dead && !targets[i].dying) {
							 targets[i].hit(this.getDamage(), this.type);
		        			this.done = true;
	        			}
					}
				}

				// Move bullet //
				if(!this.down) // Moving up
		        {
		            if(this.y - this.speed <= 0)
		                this.done = true;
		            else
		                this.y = this.y - this.speed;
		        }
		        else
		        {
		            if(this.y + this.speed >= canvas.width)
		                this.done = true;
		            else
		                this.y = this.y + this.speed;
		        }
			}

			

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

		getWidth: function() {
	    	return this.image[this.frame].width;
	    },
	    getHeight: function() {
	    	return this.image[this.frame].height;
	    },

	    getDamage: function() {
	    	return 1;
	    }
	}

	return bullet;
}